import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
  ScrollView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useOrder } from '../contexts/OrderContext';
import { useLocation } from '../contexts/LocationContext';

const OrderTrackingScreen = ({ navigation }) => {
  const { activeOrder, getRemainingDeliveryTime, completeOrder, cancelOrder } = useOrder();
  const { getDistanceToRestaurant } = useLocation();
  const [remainingTime, setRemainingTime] = useState(0);
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    if (!activeOrder) {
      navigation.navigate('Home');
      return;
    }

    // Update remaining time every second
    const interval = setInterval(() => {
      const timeLeft = getRemainingDeliveryTime();
      setRemainingTime(timeLeft);

      // Calculate progress (0 to 1)
      const totalTime = activeOrder.deliveryTimeMinutes;
      const elapsed = totalTime - timeLeft;
      const progressValue = Math.min(1, Math.max(0, elapsed / totalTime));

      // Animate progress bar
      Animated.timing(progress, {
        toValue: progressValue,
        duration: 500,
        useNativeDriver: false,
      }).start();

      // Auto-redirect when order is completed
      if (timeLeft <= 0) {
        setTimeout(() => {
          Alert.alert(
            'Order Delivered!',
            'Your order has been successfully delivered. Enjoy your meal!',
            [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
          );
        }, 1000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeOrder]);

  const handleCancelOrder = () => {
    Alert.alert(
      'Cancel Order',
      'Are you sure you want to cancel your order? This action cannot be undone.',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            cancelOrder();
            Alert.alert('Order Cancelled', 'Your order has been cancelled.', [
              { text: 'OK', onPress: () => navigation.navigate('Main', { screen: 'Home' }) }
            ]);
          }
        }
      ]
    );
  };

  const formatTime = (minutes) => {
    if (minutes <= 0) return '0 min';
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hrs > 0) {
      return `${hrs}h ${mins}m`;
    }
    return `${mins} min`;
  };

  const getOrderStatus = () => {
    if (remainingTime <= 0) return 'Delivered';
    if (remainingTime <= 5) return 'Arriving Soon';
    if (remainingTime <= activeOrder?.deliveryTimeMinutes / 2) return 'On the Way';
    return 'Preparing';
  };

  const getStatusColor = () => {
    const status = getOrderStatus();
    switch (status) {
      case 'Delivered': return '#4CAF50';
      case 'Arriving Soon': return '#FF9800';
      case 'On the Way': return '#2196F3';
      default: return '#9C27B0';
    }
  };

  if (!activeOrder) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#E8E0F0" barStyle="dark-content" />
        <View style={styles.noOrderContainer}>
          <Ionicons name="receipt-outline" size={100} color="#ccc" />
          <Text style={styles.noOrderText}>No Active Orders</Text>
          <Text style={styles.noOrderSubtext}>You don't have any orders in progress</Text>
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

  const distance = getDistanceToRestaurant(activeOrder.restaurantName);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#E8E0F0" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Tracking</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Order Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
            <Text style={[styles.statusText, { color: getStatusColor() }]}>{getOrderStatus()}</Text>
          </View>
          
          <Text style={styles.orderIdText}>Order #{activeOrder.id}</Text>
          <Text style={styles.restaurantText}>{activeOrder.restaurantName}</Text>
          
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <Animated.View 
                style={[
                  styles.progressFill, 
                  { 
                    width: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%']
                    }),
                    backgroundColor: getStatusColor()
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {remainingTime > 0 ? `${formatTime(remainingTime)} remaining` : 'Delivered!'}
            </Text>
          </View>
        </View>

        {/* Delivery Info */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Delivery Information</Text>
          
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Estimated Delivery Time</Text>
              <Text style={styles.infoValue}>
                {new Date(activeOrder.estimatedDeliveryTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color="#666" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Delivery Address</Text>
              <Text style={styles.infoValue}>{activeOrder.deliveryAddress}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="navigate-outline" size={20} color="#666" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Distance</Text>
              <Text style={styles.infoValue}>{distance.toFixed(1)} km</Text>
            </View>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Order Summary</Text>
          
          {activeOrder.items.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <Text style={styles.itemQuantity}>{item.quantity}x</Text>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price * item.quantity} Bath</Text>
            </View>
          ))}
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>{activeOrder.totalAmount} Bath</Text>
          </View>
        </View>

        {/* Cancel Order Button */}
        {remainingTime > 5 && (
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelOrder}>
              <Text style={styles.cancelButtonText}>Cancel Order</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
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
    paddingHorizontal: 16,
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderIdText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  restaurantText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
    width: 30,
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9C27B0',
  },
  actionContainer: {
    marginVertical: 16,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ff4444',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#ff4444',
    fontSize: 16,
    fontWeight: '600',
  },
  noOrderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  noOrderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  noOrderSubtext: {
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

export default OrderTrackingScreen;