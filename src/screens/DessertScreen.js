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
import PlaceholderImage from '../components/PlaceholderImage';
import { useOrder } from '../contexts/OrderContext';

const dessertRestaurants = [
  {
    id: '1',
    name: 'Yolo Thailand',
    imageName: 'yolo_thailand.jpg',
    deliveryFee: '฿35',
    distance: '1.3km',
    deliveryTime: '23min'
  },
  {
    id: '2',
    name: 'Azabusabo Thailand',
    imageName: 'azabusabo_thailand.jpg',
    deliveryFee: '฿35',
    distance: '1.3km', 
    deliveryTime: '23min'
  }
];

export default function DessertScreen({ navigation }) {
  const { hasActiveOrder } = useOrder();

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
      category: 'Dessert'
    });
  };

  const renderRestaurant = ({ item }) => (
    <TouchableOpacity 
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
            <Text style={styles.detailIcon}>🚴</Text>
            <Text style={styles.detailText}>{item.deliveryFee}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>📍</Text>
            <Text style={styles.detailText}>{item.distance}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>⏱️</Text>
            <Text style={styles.detailText}>{item.deliveryTime}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

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
          <Text style={styles.deliverText}>🏫 Deliver to : Thammasat University</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        <Text style={styles.pageTitle}>Dessert</Text>
        
        {dessertRestaurants.map((restaurant) => (
          <View key={restaurant.id}>
            {renderRestaurant({ item: restaurant })}
          </View>
        ))}
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
    fontWeight: '600',
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
  },
  detailIcon: {
    fontSize: 14,
    marginRight: 5,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});