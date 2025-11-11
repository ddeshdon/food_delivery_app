import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Image,
  FlatList,
  TextInput,
  Alert
} from 'react-native';
import PlaceholderImage from '../components/PlaceholderImage';
import { useOrder } from '../contexts/OrderContext';
import { useLocation } from '../contexts/LocationContext';

const categories = [
  { id: '1', name: 'Breakfast', imageName: 'breakfast.jpg' },
  { id: '2', name: 'Lunch', imageName: 'lunch.jpg' },
  { id: '3', name: 'Dinner', imageName: 'dinner.jpg' },
  { id: '4', name: 'Beverage', imageName: 'beverage.jpg' },
  { id: '5', name: 'Dessert', imageName: 'dessert.jpg' }
];

const promotions = [
  {
    id: '1',
    title: '25% off*',
    code: 'FINFIRST25',
    description: 'Min150 Bath'
  },
  {
    id: '2',
    title: '50 Bath off*',
    code: 'FINFIRST50',
    description: 'Save 50B using this code'
  }
];

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { hasActiveOrder } = useOrder();
  const { userLocation } = useLocation();
  const [restaurants, setRestaurants] = useState([]);

  // Real restaurant data from our app
  const realRestaurants = [
    { id: '1', name: 'NICO NICO - Café & Brunch Place', rating: 4.5, deliveryTime: '18 min', imageName: 'nico_nico.jpg' },
    { id: '2', name: 'Din Tai Fung', rating: 4.8, deliveryTime: '48 min', imageName: 'din_tai_fung.jpg' },
    { id: '3', name: 'Tsuru Udon', rating: 4.6, deliveryTime: '54 min', imageName: 'tsuru_udon.jpg' },
    { id: '4', name: 'Hey Gusto', rating: 4.4, deliveryTime: '35 min', imageName: 'hey_gusto.jpg' },
    { id: '5', name: 'Thong Smith', rating: 4.7, deliveryTime: '28 min', imageName: 'thong_smith.jpg' },
    { id: '6', name: 'Nose Tea', rating: 4.3, deliveryTime: '15 min', imageName: 'nose_tea.jpg' },
  ];

  useEffect(() => {
    setRestaurants(realRestaurants);
  }, []);

  const handleCategoryPress = (categoryName) => {
    if (hasActiveOrder()) {
      Alert.alert(
        'Order In Progress',
        'You have an active order being delivered. Please wait for it to complete before browsing restaurants.',
        [
          { text: 'OK' },
          { text: 'Track Order', onPress: () => navigation.navigate('OrderTracking') }
        ]
      );
      return;
    }
    
    navigation.navigate(categoryName);
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryCard}
      onPress={() => handleCategoryPress(item.name)}
    >
      <View style={styles.categoryImageContainer}>
        <PlaceholderImage 
          width={80} 
          height={60} 
          text={item.imageName}
          style={styles.categoryImage}
        />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
      <Text style={styles.categoryArrow}>{'>'}</Text>
    </TouchableOpacity>
  );

  const renderPromotion = ({ item }) => (
    <View style={styles.promotionCard}>
      {/* Orange top section */}
      <View style={styles.promotionTopSection}>
        <View style={styles.promotionIcon}>
          <Text style={styles.promotionIconText}>🎯</Text>
        </View>
        <Text style={styles.promotionTitle}>{item.title}</Text>
        <Text style={styles.promotionCode}>{item.code}</Text>
        <Text style={styles.promotionDescription}>{item.description}</Text>
      </View>
      
      {/* White bottom section */}
      <View style={styles.promotionBottomSection}>
        <TouchableOpacity style={styles.applyCodeButton}>
          <Text style={styles.applyCodeText}>Apply Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
    
    // Determine category based on restaurant name
    let category = 'Breakfast'; // default
    if (restaurantName === 'Tsuru Udon' || restaurantName === 'Hey Gusto') {
      category = 'Lunch';
    } else if (restaurantName === 'Thong Smith') {
      category = 'Dinner';
    } else if (restaurantName === 'Nose Tea') {
      category = 'Beverage';
    }
    
    navigation.navigate('Menu', { 
      restaurantName: restaurantName,
      category: category 
    });
  };

  const renderRestaurant = ({ item }) => (
    <TouchableOpacity 
      style={styles.restaurantCard}
      onPress={() => handleRestaurantPress(item.name)}
    >
      <PlaceholderImage 
        width={60} 
        height={60} 
        text={item.imageName}
        style={styles.restaurantImage}
      />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantRating}>⭐ {item.rating}</Text>
        <Text style={styles.deliveryTime}>{item.deliveryTime}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.appName}>MA Food Delivery</Text>
        
        {/* Location Display */}
        <View style={styles.locationContainer}>
          <Text style={styles.locationLabel}>📍 Delivering to:</Text>
          <Text style={styles.locationText}>{userLocation.address}</Text>
        </View>
        
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search restaurants or food..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Categories Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Category</Text>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.categoriesGrid}
        />
      </View>

      {/* Promotions Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Promotion</Text>
          <TouchableOpacity>
            <Text style={styles.viewMore}>View more {'>>'}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={promotions}
          renderItem={renderPromotion}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.promotionsList}
        />
      </View>

      {/* Near You Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Near you</Text>
        <FlatList
          data={restaurants}
          renderItem={renderRestaurant}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#E8E8E8',
    padding: 20,
    paddingTop: 50,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  locationContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  locationLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  searchContainer: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  searchInput: {
    paddingVertical: 12,
    fontSize: 16,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  viewMore: {
    color: '#999',
    fontSize: 14,
  },
  categoriesGrid: {
    gap: 15,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    margin: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryImageContainer: {
    width: 80,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  categoryArrow: {
    fontSize: 16,
    color: '#999',
  },
  promotionsList: {
    gap: 15,
  },
  promotionCard: {
    borderRadius: 15,
    width: 200,
    marginRight: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  promotionTopSection: {
    backgroundColor: '#FF6B35',
    padding: 20,
  },
  promotionBottomSection: {
    backgroundColor: 'white',
    padding: 15,
    alignItems: 'center',
  },
  promotionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  promotionIconText: {
    fontSize: 20,
  },
  promotionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  promotionCode: {
    fontSize: 12,
    color: 'white',
    opacity: 0.9,
    marginBottom: 5,
  },
  promotionDescription: {
    fontSize: 11,
    color: 'white',
    opacity: 0.8,
    marginBottom: 15,
  },
  applyCodeButton: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  applyCodeText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
  },
  restaurantCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    resizeMode: 'cover',
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  restaurantRating: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  deliveryTime: {
    fontSize: 12,
    color: '#999',
  },
});