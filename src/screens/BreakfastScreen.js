import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PlaceholderImage from '../components/PlaceholderImage';
import { useOrder } from '../contexts/OrderContext';
import { useLocation } from '../contexts/LocationContext';

const breakfastRestaurants = [
  {
    id: '1',
    name: 'NICO NICO - Café & Brunch Place',
    imageName: 'nico_nico.jpg',
  },
  {
    id: '2',
    name: 'Din Tai Fung',
    imageName: 'din_tai_fung.jpg',
  }
];

export default function BreakfastScreen({ navigation }) {
  const { hasActiveOrder } = useOrder();
  const { getDistanceToRestaurant, calculateDeliveryTime } = useLocation();

  const handleRestaurantPress = (restaurantName) => {
    if (hasActiveOrder()) {
      Alert.alert(
        'Order In Progress',
        'You have an active order being delivered. Please wait for it to complete before browsing other restaurants.',
        [
          { text: 'OK' },
          { text: 'Track Order', onPress: () => navigation.navigate('OrderTracking') }
        ]
      );
      return;
    }
    
    navigation.navigate('Menu', { 
      restaurantName: restaurantName,
      category: 'Breakfast'
    });
  };

  const renderRestaurant = (item) => {
    const distance = getDistanceToRestaurant(item.name);
    const deliveryTime = calculateDeliveryTime(item.name);
    const deliveryFee = 20; // Fixed delivery fee
    
    return (
      <TouchableOpacity 
        key={item.id}
        style={styles.restaurantCard}
        onPress={() => handleRestaurantPress(item.name)}
      >
        <PlaceholderImage 
          width={120} 
          height={100} 
          text={item.imageName}
          style={styles.restaurantImage}
        />
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <View style={styles.restaurantDetails}>
            <View style={styles.detailItem}>
              <Ionicons name="bicycle" size={16} color="#666" />
              <Text style={styles.detailText}>฿{deliveryFee}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="location" size={16} color="#666" />
              <Text style={styles.detailText}>{distance.toFixed(1)} km</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="time" size={16} color="#666" />
              <Text style={styles.detailText}>{deliveryTime} min</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.deliverText}>Deliver to : Thammasat University</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        <Text style={styles.pageTitle}>Breakfast</Text>
        
        {breakfastRestaurants.map((restaurant) => renderRestaurant(restaurant))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#E8F4FD',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
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
  headerContent: {
    flex: 1,
  },
  deliverText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  restaurantCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  restaurantImage: {
    borderRadius: 10,
    marginRight: 15,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  restaurantDetails: {
    flexDirection: 'column',
    gap: 5,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});