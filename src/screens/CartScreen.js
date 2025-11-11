import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PlaceholderImage from '../components/PlaceholderImage';
import { useCart } from '../contexts/CartContext';
import { useLocation } from '../contexts/LocationContext';
import { useOrder } from '../contexts/OrderContext';

const CartScreen = ({ navigation }) => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartItemCount } = useCart();
  const { userLocation, calculateDeliveryTime, getDistanceToRestaurant } = useLocation();
  const { hasActiveOrder, createOrder } = useOrder();
  const [orderNote, setOrderNote] = useState('');
  const [couponCode, setCouponCode] = useState('');

  const deliveryFee = 20;
  const foodTotal = getCartTotal();
  const totalAmount = foodTotal + deliveryFee;

  const removeItem = (itemId) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => removeFromCart(itemId)
        }
      ]
    );
  };

  const applyCoupon = () => {
    if (couponCode.trim()) {
      Alert.alert('Coupon', 'Coupon functionality will be implemented soon!');
    }
  };

  const placeOrder = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to your cart before placing an order.');
      return;
    }

    // Check if user already has an active order
    if (hasActiveOrder()) {
      Alert.alert(
        'Active Order In Progress', 
        'You already have an order being delivered. Please wait for it to complete before placing a new order.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Get the restaurant name from the first item (assuming all items are from the same restaurant)
    const restaurantName = cartItems[0].restaurantName;
    const deliveryTimeMinutes = calculateDeliveryTime(restaurantName);
    const distance = getDistanceToRestaurant(restaurantName);

    Alert.alert(
      'Confirm Order',
      `Place order for ${totalAmount} Bath?\n\nRestaurant: ${restaurantName}\nDistance: ${distance.toFixed(1)} km\nEstimated delivery time: ${deliveryTimeMinutes} minutes`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Order now', 
          onPress: () => {
            // Create the order
            const orderData = {
              items: cartItems,
              restaurantName,
              totalAmount,
              deliveryTimeMinutes,
              userLocation,
              deliveryAddress: userLocation.address
            };

            const newOrder = createOrder(orderData);
            clearCart();

            Alert.alert(
              'Order Placed!', 
              `Your order #${newOrder.id} has been confirmed!\n\nEstimated delivery: ${deliveryTimeMinutes} minutes\n\nYou can track your order progress in the app.`,
              [
                { text: 'Track Order', onPress: () => navigation.navigate('OrderTracking') },
                { text: 'OK', onPress: () => navigation.navigate('Home') }
              ]
            );
          }
        }
      ]
    );
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemCard}>
      <View style={styles.quantitySelector}>
        <Text style={styles.quantityNumber}>{item.quantity}</Text>
      </View>
      
      <View style={styles.itemImageContainer}>
        <PlaceholderImage imageName={item.imageName} style={styles.itemImage} />
      </View>
      
      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.itemRestaurant}>{item.restaurantName}</Text>
        <Text style={styles.itemPrice}>{item.price} Bath</Text>
      </View>
      
      <View style={styles.quantityControls}>
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Ionicons name="remove" size={16} color="#666" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Ionicons name="add" size={16} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#E8E0F0" barStyle="dark-content" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>CART, 0 Items</Text>
        </View>

        {/* Empty Cart */}
        <View style={styles.emptyCart}>
          <Ionicons name="cart-outline" size={100} color="#ccc" />
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <Text style={styles.emptyCartSubtext}>Add some delicious items to get started!</Text>
          
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.browseButtonText}>Browse Restaurants</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#E8E0F0" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
          <Text style={styles.headerTitle}>CART, {getCartItemCount()} Items</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Delivery Info */}
        <View style={styles.deliveryInfoSection}>
          <Text style={styles.sectionTitle}>Delivery Info:</Text>
          <View style={styles.addressContainer}>
            <Ionicons name="location" size={16} color="#666" style={styles.locationIcon} />
            <Text style={styles.addressText}>{userLocation.address}</Text>
          </View>
        </View>

        {/* Your Order */}
        <View style={styles.orderSection}>
          <View style={styles.orderHeader}>
            <Text style={styles.sectionTitle}>Your Order:</Text>
            <TouchableOpacity>
              <Text style={styles.addMenuText}>Add menu</Text>
            </TouchableOpacity>
          </View>

          {/* Cart Items */}
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Order Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Food</Text>
            <Text style={styles.summaryValue}>{foodTotal} Bath</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery</Text>
            <Text style={styles.summaryValue}>{deliveryFee} Bath</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{totalAmount} Bath</Text>
          </View>
        </View>

        {/* Add Note */}
        <View style={styles.noteSection}>
          <TouchableOpacity style={styles.addNoteButton}>
            <Text style={styles.addNoteText}>Add Note</Text>
          </TouchableOpacity>
        </View>

        {/* Coupon */}
        <View style={styles.couponSection}>
          <View style={styles.couponContainer}>
            <Text style={styles.couponLabel}>Coupon</Text>
            <TouchableOpacity onPress={applyCoupon}>
              <Text style={styles.applyText}>Apply {'>'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Order Button */}
      <View style={styles.orderButtonContainer}>
        <TouchableOpacity style={styles.orderButton} onPress={placeOrder}>
          <View style={styles.orderButtonContent}>
            <View style={styles.orderButtonLeft}>
              <Text style={styles.orderButtonNumber}>1</Text>
            </View>
            <Text style={styles.orderButtonText}>Order now</Text>
            <Text style={styles.orderButtonPrice}>{totalAmount} Bath</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E0F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#E8E0F0',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  deliveryInfoSection: {
    backgroundColor: '#fff',
    margin: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationIcon: {
    marginTop: 2,
    marginRight: 8,
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  orderSection: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addMenuText: {
    color: '#9C27B0',
    fontSize: 14,
    fontWeight: '600',
  },
  cartItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  quantitySelector: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  quantityNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemInfo: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  itemRestaurant: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityControls: {
    flexDirection: 'row',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  summarySection: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 8,
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  noteSection: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
  },
  addNoteButton: {
    padding: 16,
    alignItems: 'center',
  },
  addNoteText: {
    fontSize: 16,
    color: '#ccc',
  },
  couponSection: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  couponContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  couponLabel: {
    fontSize: 16,
    color: '#333',
  },
  applyText: {
    fontSize: 14,
    color: '#9C27B0',
    fontWeight: '600',
  },
  orderButtonContainer: {
    padding: 16,
    backgroundColor: '#E8E0F0',
  },
  orderButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  orderButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  orderButtonLeft: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  orderButtonNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  orderButtonPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyCartSubtext: {
    fontSize: 16,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#9C27B0',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CartScreen;