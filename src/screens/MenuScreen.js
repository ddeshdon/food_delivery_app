import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  FlatList,
  Modal,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PlaceholderImage from '../components/PlaceholderImage';
import { useCart } from '../contexts/CartContext';
import { useOrder } from '../contexts/OrderContext';
import { useLocation } from '../contexts/LocationContext';

const restaurantMenus = {
  'NICO NICO - Café & Brunch Place': [
    { id: '1', name: 'Chicken Burger', price: 189, imageName: 'chicken_burger.jpg', rating: 4.5 },
    { id: '2', name: 'Crab Cake Salad', price: 260, imageName: 'crab_cake_salad.jpg', rating: 4.7 },
    { id: '3', name: 'Eggs & Chashu Toast', price: 165, imageName: 'eggs_chashu_toast.jpg', rating: 4.6 },
    { id: '4', name: 'Grilled Cheese Salad', price: 150, imageName: 'grilled_cheese_salad.jpg', rating: 4.3 },
    { id: '5', name: 'Katsu Sando', price: 180, imageName: 'katsu_sando.jpg', rating: 4.4 },
    { id: '6', name: 'Saba Tofu Salad', price: 240, imageName: 'saba_tofu_salad.jpg', rating: 4.8 },
    { id: '7', name: 'Smoked Salmon Curry', price: 220, imageName: 'smoked_salmon_curry.jpg', rating: 4.2 },
    { id: '8', name: 'Spicy Tuna Toast', price: 170, imageName: 'spicy_tuna_toast.jpg', rating: 4.5 },
    { id: '9', name: 'Wasabi Crab Toast', price: 185, imageName: 'wasabi_crab_toast.jpg', rating: 4.6 },
    { id: '10', name: 'YUDANE Bread', price: 120, imageName: 'yudane_bread.jpg', rating: 4.3 }
  ],

  'Din Tai Fung': [
    { id: '11', name: 'Seaweed & Beancurd Salad', price: 145 },
    { id: '12', name: 'Shrimp & Kurobuta Pork Dumplings', price: 230 },
    { id: '13', name: 'Shrimp & Kurobuta Pork Wonton Soup', price: 220 },
    { id: '14', name: 'Broccoli with Garlic', price: 150 },
    { id: '15', name: 'Black Pepper Beef Tenderloin', price: 360 },
    { id: '16', name: 'Noodles with Sesame Sauce', price: 160 },
    { id: '17', name: 'Braised Beef Noodle Soup', price: 280 },
    { id: '18', name: 'Tofu Puff & Glass Noodle Soup', price: 150 },
    { id: '19', name: 'Shrimp Fried Rice', price: 220 },
    { id: '20', name: 'Red Bean Sticky Rice Wrap', price: 120 }
  ],

  'Tsuru Udon': [
    { id: '21', name: 'Hiyashi Oroshi', price: 180 },
    { id: '22', name: 'Niku Bukkake', price: 220 },
    { id: '23', name: 'Yamakake', price: 190 },
    { id: '24', name: 'Mentai Cream', price: 210 },
    { id: '25', name: 'Carbonara Udon', price: 210 },
    { id: '26', name: 'Gyu Stamina Yaki', price: 230 },
    { id: '27', name: 'Gyudon', price: 195 },
    { id: '28', name: 'Salmon Don', price: 240 },
    { id: '29', name: 'Batacon', price: 180 },
    { id: '30', name: 'Gyu Jyaga', price: 195 }
  ],

  'Hey Gusto': [
    { id: '31', name: 'Burrata Fresh Tomatoes', price: 280 },
    { id: '32', name: 'Burrata Italian Ham', price: 320 },
    { id: '33', name: 'Australian Striploin Steak', price: 690 },
    { id: '34', name: 'Spaghetti with Bacon', price: 180 },
    { id: '35', name: 'Signature Truffle', price: 390 },
    { id: '36', name: 'Pepperoni Classic', price: 260 },
    { id: '37', name: 'Seafood', price: 320 },
    { id: '38', name: 'Salmon Grill Steak', price: 420 },
    { id: '39', name: 'Tiramisu', price: 180 },
    { id: '40', name: 'Ice cream', price: 90 }
  ],

  'Khao Jaan-Prod': [
    { id: '51', name: 'Spicy Mixed Vegetable Curry with Chicken', price: 150 },
    { id: '52', name: 'Steamed Curried Fish', price: 160 },
    { id: '53', name: 'Shrimp Paste Chili Dip', price: 140 },
    { id: '54', name: 'Pad Thai with Shrimp', price: 180 },
    { id: '55', name: 'Grilled Shrimp', price: 260 },
    { id: '56', name: 'Thai Herb Baked Chicken', price: 160 },
    { id: '57', name: 'Thai Grilled Chicken', price: 140 },
    { id: '58', name: 'Pork Leg Curry with Cha-Muang Leaves', price: 170 },
    { id: '59', name: 'Black Pepper Fried Rice', price: 150 },
    { id: '60', name: 'Chinese Chives with Egg', price: 120 }
  ],

  'Laem Charoen Seafood': [
    { id: '61', name: 'Fried Snow Fish with Fish Sauce', price: 420 },
    { id: '62', name: 'Grouper in Southern Thai Sour Curry', price: 380 },
    { id: '63', name: 'Steamed Curry Fish Custard', price: 180 },
    { id: '64', name: 'Green Curry with Fish Balls', price: 220 },
    { id: '65', name: 'Tod Man Pla', price: 180 },
    { id: '66', name: 'Stir-fried Crab with Black Pepper', price: 550 },
    { id: '67', name: 'Tiger Prawns Baked with Ginger and Scallion', price: 390 },
    { id: '68', name: 'White Shrimp Stir-fried with Chili', price: 280 },
    { id: '69', name: 'Pla Neung Manao', price: 420 },
    { id: '70', name: 'Crab Curry', price: 480 }
  ],

  'Nose Tea': [
    { id: '71', name: 'Sassy Cactus', price: 85 },
    { id: '72', name: 'Grape Tea', price: 90 },
    { id: '73', name: 'Nose tea signature', price: 95 },
    { id: '74', name: 'Chocolate Signature', price: 105 },
    { id: '75', name: 'Thai Tea Signature', price: 90 },
    { id: '76', name: 'OLYMPUS Taro', price: 110 },
    { id: '77', name: 'Mandarin Tea', price: 95 },
    { id: '78', name: 'Lemon Tea', price: 85 },
    { id: '79', name: 'Peachy Green Tea', price: 95 },
    { id: '80', name: 'Lychee Tea', price: 95 }
  ],

  'Boost Juice': [
    { id: '81', name: 'Mini Me Mango', price: 125 },
    { id: '82', name: 'Immunity Juice', price: 135 },
    { id: '83', name: 'Vita C Detox Juice', price: 135 },
    { id: '84', name: 'Blueberry Blast', price: 140 },
    { id: '85', name: 'King William Chocolate', price: 145 },
    { id: '86', name: 'Raspberry Mango Crush', price: 135 },
    { id: '87', name: 'Strawberry Protein', price: 150 },
    { id: '88', name: 'Cookie and Cream', price: 145 },
    { id: '89', name: 'Banana Buzz', price: 130 },
    { id: '90', name: 'Superfruit Energy', price: 150 }
  ],

  'Yole Thailand': [
    { id: '91', name: 'Peanut Butter', price: 155 },
    { id: '92', name: 'SIGNATURE CUPS', price: 165 },
    { id: '93', name: 'IBIZA', price: 170 },
    { id: '94', name: 'WAFFLE BOWL', price: 180 },
    { id: '95', name: 'CONES', price: 110 },
    { id: '96', name: 'BUBBLE WAFFLE', price: 190 },
    { id: '97', name: 'YOLE BOX', price: 170 },
    { id: '98', name: 'SHAKES', price: 160 },
    { id: '99', name: 'TWIST', price: 135 },
    { id: '100', name: 'Pistachio', price: 175 }
  ],

  'Azabusabo Thailand': [
    { id: '101', name: 'Yuzu', price: 120 },
    { id: '102', name: 'Chocolate', price: 120 },
    { id: '103', name: 'Vanilla', price: 115 },
    { id: '104', name: 'Matcha', price: 125 },
    { id: '105', name: 'Mix flavor(yuzu&choco)', price: 130 },
    { id: '106', name: 'Mix flavor(vanilla&matcha)', price: 135 },
    { id: '107', name: 'Monaka Ice cream', price: 140 },
    { id: '108', name: 'Single Cup', price: 95 },
    { id: '109', name: 'Double Cup', price: 150 },
    { id: '110', name: 'Double Cone', price: 155 }
  ]
};


export default function MenuScreen({ navigation, route }) {
  const { restaurantName = 'NICO NICO - Café & Brunch Place' } = route?.params || {};
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const { addToCart, getCartItemCount } = useCart();
  const { hasActiveOrder } = useOrder();
  const { getDistanceToRestaurant, calculateDeliveryTime } = useLocation();
  
  // Get menu items for the current restaurant
  const menuItems = restaurantMenus[restaurantName] || restaurantMenus['NICO NICO - Café & Brunch Place'];
  
  // Different background colors for different restaurants
  const backgroundColor = (restaurantName === 'NICO NICO - Café & Brunch Place' || restaurantName === 'Din Tai Fung' || restaurantName === 'Tsuru Udon' || restaurantName === 'Hey Gusto' || restaurantName === 'Khao Jaan-Prod' || restaurantName === 'Laem Charoen Seafood' || restaurantName === 'Nose Tea' || restaurantName === 'Boost Juice' || restaurantName === 'Yolo Thailand' || restaurantName === 'Azabusabo Thailand') ? '#E8E0F0' : '#F5F5F5';

  const handleAddToCart = (item) => {
    // Check if user already has an active order
    if (hasActiveOrder()) {
      Alert.alert(
        'Order In Progress',
        'You have an active order being delivered. Please wait for it to complete before placing a new order.',
        [
          { text: 'OK' },
          { text: 'Track Order', onPress: () => navigation.navigate('OrderTracking') }
        ]
      );
      return;
    }

    setSelectedItem(item);
    setQuantity(1);
    setShowModal(true);
  };

  const confirmAddToCart = () => {
    const cartItem = {
      ...selectedItem,
      restaurantName: restaurantName,
      totalPrice: selectedItem.price * quantity
    };
    
    addToCart(cartItem, quantity);
    setShowModal(false);
    
    // Show success feedback
    Alert.alert('Added to Cart!', `${selectedItem.name} x${quantity} added to your cart`, [
      { text: 'OK', style: 'default' }
    ]);
  };

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItemCard}>
      <PlaceholderImage 
        width="100%" 
        height={100} 
        text={item.imageName}
        restaurantName={restaurantName}
        style={styles.menuItemImage}
      />
      <View style={styles.menuItemInfo}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemPrice}>{item.price} Bath</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={12} color="#FFD700" />
          <Text style={styles.rating}> {item.rating}</Text>
        </View>
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.addToCartText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.restaurantTitle}>{restaurantName}</Text>
      </View>

      {/* Delivery Info */}
      <View style={styles.deliveryInfo}>
        <Text style={styles.deliveryText}>Deliver to : Thammasat University</Text>
        <View style={styles.locationDetailsContainer}>
          <Ionicons name="location" size={14} color="#666" />
          <Text style={styles.locationDetails}>
            Distance: {getDistanceToRestaurant(restaurantName).toFixed(1)} km
          </Text>
          <Ionicons name="time" size={14} color="#666" style={{ marginLeft: 10 }} />
          <Text style={styles.locationDetails}>
            Est. delivery: {calculateDeliveryTime(restaurantName)} min
          </Text>
        </View>
      </View>

      {/* Menu Grid */}
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        numColumns={restaurantName === 'NICO NICO - Café & Brunch Place' || restaurantName === 'Din Tai Fung' || restaurantName === 'Tsuru Udon' || restaurantName === 'Hey Gusto' || restaurantName === 'Khao Jaan-Prod' || restaurantName === 'Laem Charoen Seafood' || restaurantName === 'Nose Tea' || restaurantName === 'Boost Juice' || restaurantName === 'Yolo Thailand' || restaurantName === 'Azabusabo Thailand' ? 3 : 2}
        contentContainerStyle={styles.menuGrid}
        showsVerticalScrollIndicator={false}
      />

      {/* Cart Icon with Badge */}
      {getCartItemCount() > 0 && (
        <TouchableOpacity 
          style={styles.cartFloatingButton}
          onPress={() => navigation.navigate('Main', { screen: 'Cart' })}
        >
          <Ionicons name="cart" size={28} color="white" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{getCartItemCount()}</Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Quantity Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add to Cart</Text>
            
            {selectedItem && (
              <View style={styles.selectedItemInfo}>
                <Text style={styles.selectedItemName}>{selectedItem.name}</Text>
                <Text style={styles.selectedItemPrice}>{selectedItem.price} Bath</Text>
              </View>
            )}
            
            <View style={styles.quantityContainer}>
              <Text style={styles.quantityLabel}>Quantity:</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                
                <Text style={styles.quantityDisplay}>{quantity}</Text>
                
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.confirmButton}
                onPress={confirmAddToCart}
              >
                <Text style={styles.confirmButtonText}>
                  Add {selectedItem ? (selectedItem.price * quantity) : 0} Bath
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  backIcon: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  restaurantTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  deliveryInfo: {
    backgroundColor: '#E8F4FD',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  deliveryText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  locationDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationDetails: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  menuGrid: {
    padding: 15,
    paddingBottom: 100,
  },
  menuItemCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemImage: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  menuItemInfo: {
    padding: 12,
  },
  menuItemName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    minHeight: 35,
    textAlign: 'center',
  },
  menuItemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 5,
    textAlign: 'center',
  },
  ratingContainer: {
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rating: {
    fontSize: 10,
    color: '#666',
  },
  addToCartButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  cartFloatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#FF6B35',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  selectedItemInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  selectedItemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginTop: 5,
  },
  quantityContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  quantityLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#E0E0E0',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityDisplay: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});