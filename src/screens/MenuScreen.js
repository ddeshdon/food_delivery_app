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
    { id: '1', name: 'Chicken Burger', price: 120, imageName: 'chicken_burger.jpg', rating: 4.5 },
    { id: '2', name: 'Crab Cake Salad', price: 150, imageName: 'crab_cake_salad.jpg', rating: 4.7 },
    { id: '3', name: 'Eggs & Chashu toast', price: 135, imageName: 'eggs_chashu_toast.jpg', rating: 4.6 },
    { id: '4', name: 'Grilled Cheese Salad', price: 95, imageName: 'grilled_cheese_salad.jpg', rating: 4.3 },
    { id: '5', name: 'Katsu Sando', price: 85, imageName: 'katsu_sando.jpg', rating: 4.4 },
    { id: '6', name: 'Saba Tofu Salad', price: 180, imageName: 'saba_tofu_salad.jpg', rating: 4.8 },
    { id: '7', name: 'Smoked Salmon Curry', price: 65, imageName: 'smoked_salmon_curry.jpg', rating: 4.2 },
    { id: '8', name: 'Spicy tuna Toast', price: 110, imageName: 'spicy_tuna_toast.jpg', rating: 4.5 },
    { id: '9', name: 'Wasabi Crab Toast', price: 125, imageName: 'wasabi_crab_toast.jpg', rating: 4.6 },
    { id: '10', name: 'YUDANE Bread', price: 95, imageName: 'yudane_bread.jpg', rating: 4.3 }
  ],
  'Din Tai Fung': [
    { id: '11', name: 'Seaweed & Beancurd Salad', price: 120, imageName: 'seaweed_beancurd_salad.jpg', rating: 4.3 },
    { id: '12', name: 'Shrimp & Kurobuta Pork Dumplings', price: 120, imageName: 'shrimp_pork_dumplings.jpg', rating: 4.6 },
    { id: '13', name: 'Shrimp & Kurobuta Pork Wonton Soup', price: 120, imageName: 'shrimp_pork_wonton_soup.jpg', rating: 4.5 },
    { id: '14', name: 'Broccoli with Garlic', price: 120, imageName: 'broccoli_garlic.jpg', rating: 4.3 },
    { id: '15', name: 'Black Pepper Beef Tenderloin', price: 120, imageName: 'black_pepper_beef.jpg', rating: 4.5 },
    { id: '16', name: 'Noodles with Sesame Sauce', price: 120, imageName: 'noodles_sesame_sauce.jpg', rating: 4.4 },
    { id: '17', name: 'Braised Beef Noodle Soup', price: 120, imageName: 'braised_beef_noodle_soup.jpg', rating: 4.5 },
    { id: '18', name: 'Tofu Puff & Glass Noodle Soup', price: 120, imageName: 'tofu_glass_noodle_soup.jpg', rating: 4.2 },
    { id: '19', name: 'Shrimp Fried Rice', price: 120, imageName: 'shrimp_fried_rice.jpg', rating: 4.6 },
    { id: '20', name: 'Red Bean Sticky Rice Wrap', price: 120, imageName: 'red_bean_sticky_rice.jpg', rating: 4.4 }
  ],
  'Tsuru Udon': [
    { id: '21', name: 'Hiyashi Oroshi', price: 120, imageName: 'hiyashi_oroshi.jpg', rating: 4.5 },
    { id: '22', name: 'Niku Bukkake', price: 120, imageName: 'niku_bukkake.jpg', rating: 4.6 },
    { id: '23', name: 'Yamakake', price: 120, imageName: 'yamakake.jpg', rating: 4.5 },
    { id: '24', name: 'Mentai Cream', price: 120, imageName: 'mentai_cream.jpg', rating: 4.4 },
    { id: '25', name: 'Carbonara Udon', price: 120, imageName: 'carbonara_udon.jpg', rating: 4.5 },
    { id: '26', name: 'Gyu Stamina Yaki', price: 120, imageName: 'gyu_stamina_yaki.jpg', rating: 4.6 },
    { id: '27', name: 'Gyudon', price: 120, imageName: 'gyudon.jpg', rating: 4.5 },
    { id: '28', name: 'Salmon Don', price: 120, imageName: 'salmon_don.jpg', rating: 4.7 },
    { id: '29', name: 'Batacon', price: 120, imageName: 'batacon.jpg', rating: 4.5 },
    { id: '30', name: 'Gyu Jyaga', price: 120, imageName: 'gyu_jyaga.jpg', rating: 4.4 }
  ],
  'Hey Gusto': [
    { id: '31', name: 'Burrata Fresh Tomatoes', price: 120, imageName: 'burrata_fresh_tomatoes.jpg', rating: 4.4 },
    { id: '32', name: 'Burrata Italian Ham', price: 120, imageName: 'burrata_italian_ham.jpg', rating: 4.6 },
    { id: '33', name: 'Australian Striploin Steak', price: 120, imageName: 'australian_striploin_steak.jpg', rating: 4.6 },
    { id: '34', name: 'Spaghetti with bacon', price: 120, imageName: 'spaghetti_with_bacon.jpg', rating: 4.4 },
    { id: '35', name: 'Signature Truffle', price: 120, imageName: 'signature_truffle.jpg', rating: 4.7 },
    { id: '36', name: 'Pepperoni Classic', price: 120, imageName: 'pepperoni_classic.jpg', rating: 4.5 },
    { id: '37', name: 'Seafood', price: 120, imageName: 'seafood.jpg', rating: 4.5 },
    { id: '38', name: 'Salmon Grill Steak', price: 120, imageName: 'salmon_grill_steak.jpg', rating: 4.6 },
    { id: '39', name: 'Tiramisu', price: 120, imageName: 'tiramisu.jpg', rating: 4.5 },
    { id: '40', name: 'Ice cream', price: 120, imageName: 'ice_cream.jpg', rating: 4.3 }
  ],
  'Khao Jaan-Prod': [
    { id: '51', name: 'Spicy Mixed Vegetable Curry with Chicken', price: 120, imageName: 'spicy_mixed_vegetable_curry.jpg', rating: 4.5 },
    { id: '52', name: 'Steamed Curried Fish', price: 120, imageName: 'steamed_curried_fish.jpg', rating: 4.6 },
    { id: '53', name: 'Shrimp Paste Chili Dip', price: 120, imageName: 'shrimp_paste_chili_dip.jpg', rating: 4.5 },
    { id: '54', name: 'Pad Thai with Shrimp', price: 120, imageName: 'pad_thai_shrimp.jpg', rating: 4.4 },
    { id: '55', name: 'Grilled Shrimp', price: 120, imageName: 'grilled_shrimp.jpg', rating: 4.6 },
    { id: '56', name: 'Thai Herb Baked Chicken', price: 120, imageName: 'thai_herb_baked_chicken.jpg', rating: 4.5 },
    { id: '57', name: 'Thai Grilled Chicken', price: 120, imageName: 'thai_grilled_chicken.jpg', rating: 4.5 },
    { id: '58', name: 'Pork Leg Curry with Cha-Muang Leaves', price: 120, imageName: 'pork_leg_curry.jpg', rating: 4.4 },
    { id: '59', name: 'Black Pepper Fried Rice', price: 120, imageName: 'black_pepper_fried_rice.jpg', rating: 4.6 },
    { id: '60', name: 'Chinese Chives with Egg', price: 120, imageName: 'chinese_chives_egg.jpg', rating: 4.3 }
  ],
  'Laem Charoen Seafood': [
    { id: '61', name: 'Fried Snow Fish with Fish Sauce', price: 120, imageName: 'fried_snow_fish.jpg', rating: 4.5 },
    { id: '62', name: 'Grouper in Southern Thai Sour Curry', price: 120, imageName: 'grouper_southern_curry.jpg', rating: 4.6 },
    { id: '63', name: 'Steamed Curry Fish Custard', price: 120, imageName: 'steamed_curry_fish_custard.jpg', rating: 4.5 },
    { id: '64', name: 'Green Curry with Fish Balls', price: 120, imageName: 'green_curry_fish_balls.jpg', rating: 4.4 },
    { id: '65', name: 'Tod Man Pla', price: 120, imageName: 'tod_man_pla.jpg', rating: 4.5 },
    { id: '66', name: 'Stir-fried Crab with Black Pepper', price: 120, imageName: 'stir_fried_crab_pepper.jpg', rating: 4.6 },
    { id: '67', name: 'Tiger Prawns Baked with Ginger and Scallion', price: 120, imageName: 'tiger_prawns_ginger.jpg', rating: 4.3 },
    { id: '68', name: 'White Shrimp Stir-fried with Chili and Sea Asparagus', price: 120, imageName: 'white_shrimp_chili.jpg', rating: 4.5 },
    { id: '69', name: 'Pla Neung Manao', price: 120, imageName: 'pla_neung_manao.jpg', rating: 4.4 },
    { id: '70', name: 'Crab Curry', price: 120, imageName: 'crab_curry.jpg', rating: 4.6 }
  ],
  'Nose Tea': [
    { id: '71', name: 'Sassy Cactus', price: 120, imageName: 'sassy_cactus.jpg', rating: 4.5 },
    { id: '72', name: 'Grape Tea', price: 120, imageName: 'grape_tea.jpg', rating: 4.6 },
    { id: '73', name: 'Nose tea signature', price: 120, imageName: 'nose_tea_signature.jpg', rating: 4.6 },
    { id: '74', name: 'Chocolate Signature', price: 120, imageName: 'chocolate_signature.jpg', rating: 4.4 },
    { id: '75', name: 'Thai Tea Signature', price: 120, imageName: 'thai_tea_signature.jpg', rating: 4.5 },
    { id: '76', name: 'OLYMPUS Taro', price: 120, imageName: 'olympus_taro.jpg', rating: 4.7 },
    { id: '77', name: 'Mandarin Tea', price: 120, imageName: 'mandarin_tea.jpg', rating: 4.5 },
    { id: '78', name: 'Lemon Tea', price: 120, imageName: 'lemon_tea.jpg', rating: 4.4 },
    { id: '79', name: 'Peachy Green Tea', price: 120, imageName: 'peachy_green_tea.jpg', rating: 4.5 },
    { id: '80', name: 'Lychee Tea', price: 120, imageName: 'lychee_tea.jpg', rating: 4.6 }
  ],
  'Boost Juice': [
    { id: '81', name: 'Mini Me Mango', price: 120, imageName: 'mini_me_mango.jpg', rating: 4.5 },
    { id: '82', name: 'Immunity Juice', price: 120, imageName: 'immunity_juice.jpg', rating: 4.6 },
    { id: '83', name: 'Vita C Detox Juice', price: 120, imageName: 'vita_c_detox_juice.jpg', rating: 4.5 },
    { id: '84', name: 'Blueberry Blast', price: 120, imageName: 'blueberry_blast.jpg', rating: 4.4 },
    { id: '85', name: 'King William Chocolate', price: 120, imageName: 'king_william_chocolate.jpg', rating: 4.7 },
    { id: '86', name: 'Raspberry Mango Crush', price: 120, imageName: 'raspberry_mango_crush.jpg', rating: 4.5 },
    { id: '87', name: 'Strawberry Protein', price: 120, imageName: 'strawberry_protein.jpg', rating: 4.6 },
    { id: '88', name: 'Cookie and Cream', price: 120, imageName: 'cookie_and_cream.jpg', rating: 4.4 },
    { id: '89', name: 'Banana Buzz', price: 120, imageName: 'banana_buzz.jpg', rating: 4.5 },
    { id: '90', name: 'Superfruit Energy', price: 120, imageName: 'superfruit_energy.jpg', rating: 4.7 }
  ],
  'Yole Thailand': [
    { id: '91', name: 'Peanut Butter', price: 120, imageName: 'peanut_butter.jpg', rating: 4.5 },
    { id: '92', name: 'SIGNATURE CUPS', price: 120, imageName: 'signature_cups.jpg', rating: 4.6 },
    { id: '93', name: 'IBIZA', price: 120, imageName: 'ibiza.jpg', rating: 4.5 },
    { id: '94', name: 'WAFFLE BOWL', price: 120, imageName: 'waffle_bowl.jpg', rating: 4.6 },
    { id: '95', name: 'CONES', price: 120, imageName: 'cones.jpg', rating: 4.4 },
    { id: '96', name: 'BUBBLE WAFFLE', price: 120, imageName: 'bubble_waffle.jpg', rating: 4.7 },
    { id: '97', name: 'YOLE BOX', price: 120, imageName: 'yole_box.jpg', rating: 4.5 },
    { id: '98', name: 'SHAKES', price: 120, imageName: 'shakes.jpg', rating: 4.6 },
    { id: '99', name: 'TWIST', price: 120, imageName: 'twist.jpg', rating: 4.5 },
    { id: '100', name: 'Pistachio', price: 120, imageName: 'pistachio.jpg', rating: 4.7 }
  ],
  'Azabusabo Thailand': [
    { id: '101', name: 'Yuzu', price: 120, imageName: 'yuzu.jpg', rating: 4.5 },
    { id: '102', name: 'Chocolate', price: 120, imageName: 'chocolate.jpg', rating: 4.6 },
    { id: '103', name: 'Vanilla', price: 120, imageName: 'vanilla.jpg', rating: 4.5 },
    { id: '104', name: 'Matcha', price: 120, imageName: 'matcha.jpg', rating: 4.5 },
    { id: '105', name: 'Mix flavor(yuzu&choco)', price: 120, imageName: 'mix_flavor_yuzu_choco.jpg', rating: 4.4 },
    { id: '106', name: 'Mix flavor(vanilla& matcha)', price: 120, imageName: 'mix_flavor_vanilla_matcha.jpg', rating: 4.6 },
    { id: '107', name: 'Monaka Ice cream', price: 120, imageName: 'monaka_ice_cream.jpg', rating: 4.6 },
    { id: '108', name: 'Single Cup', price: 120, imageName: 'single_cup.jpg', rating: 4.4 },
    { id: '109', name: 'Double Cup', price: 120, imageName: 'double_cup.jpg', rating: 4.5 },
    { id: '110', name: 'Double Cone', price: 120, imageName: 'double_cone.jpg', rating: 4.5 }
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