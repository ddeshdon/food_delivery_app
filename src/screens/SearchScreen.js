import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PlaceholderImage from '../components/PlaceholderImage';
import { useOrder } from '../contexts/OrderContext';
import { useLocation } from '../contexts/LocationContext';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const { hasActiveOrder } = useOrder();
  const { getDistanceToRestaurant, calculateDeliveryTime } = useLocation();

  // All restaurants with their menu items for search - using exact data from our MenuScreen
  useEffect(() => {
    const restaurants = [
      {
        id: 1,
        name: 'NICO NICO - Café & Brunch Place',
        category: 'Breakfast',
        description: 'Cozy café serving delicious brunch and breakfast items with a modern twist.',
        image: 'nico_nico.jpg',
        menuItems: [
          'Chicken Burger', 'Crab Cake Salad', 'Eggs & Chashu toast', 'Grilled Cheese Salad', 'Katsu Sando',
          'Saba Tofu Salad', 'Smoked Salmon Curry', 'Spicy tuna Toast', 'Wasabi Crab Toast', 'YUDANE Bread'
        ]
      },
      {
        id: 2,
        name: 'Din Tai Fung',
        category: 'Breakfast',
        description: 'World-famous Taiwanese restaurant chain specializing in xiaolongbao and noodles.',
        image: 'din_tai_fung.jpg',
        menuItems: [
          'Seaweed & Beancurd Salad', 'Shrimp & Kurobuta Pork Dumplings', 'Shrimp & Kurobuta Pork Wonton Soup', 'Broccoli with Garlic', 'Black Pepper Beef Tenderloin',
          'Noodles with Sesame Sauce', 'Braised Beef Noodle Soup', 'Tofu Puff & Glass Noodle Soup', 'Shrimp Fried Rice', 'Red Bean Sticky Rice Wrap'
        ]
      },
      {
        id: 3,
        name: 'Tsuru Udon',
        category: 'Lunch',
        description: 'Authentic Japanese udon noodles and traditional Japanese dishes.',
        image: 'tsuru_udon.jpg',
        menuItems: [
          'Hiyashi Oroshi', 'Niku Bukkake', 'Yamakake', 'Mentai Cream', 'Carbonara Udon',
          'Gyu Stamina Yaki', 'Gyudon', 'Salmon Don', 'Batacon', 'Gyu Jyaga'
        ]
      },
      {
        id: 4,
        name: 'Hey Gusto',
        category: 'Lunch',
        description: 'Italian restaurant offering fresh pasta, pizza, and Mediterranean cuisine.',
        image: 'hey_gusto.jpg',
        menuItems: [
          'Burrata Fresh Tomatoes', 'Burrata Italian Ham', 'Australian Striploin Steak', 'Spaghetti with bacon', 'Signature Truffle',
          'Pepperoni Classic', 'Seafood', 'Salmon Grill Steak', 'Tiramisu', 'Ice cream'
        ]
      },
      {
        id: 6,
        name: 'Khao Jaan-Prod',
        category: 'Dinner',
        description: 'Royal Thai cuisine restaurant offering traditional recipes and premium ingredients.',
        image: 'khao_jaan_prod.jpg',
        menuItems: [
          'Spicy Mixed Vegetable Curry', 'Steamed Curried Fish', 'Shrimp Paste Chili Dip', 'Pad Thai with Shrimp', 'Grilled Shrimp',
          'Thai Herb Baked Chicken', 'Thai Grilled Chicken', 'Pork Leg Curry', 'Black Pepper Fried Rice', 'Chinese Chives with Egg'
        ]
      },
      {
        id: 7,
        name: 'Laem Charoen Seafood',
        category: 'Dinner',
        description: 'Famous Thai seafood restaurant chain known for authentic flavors and fresh seafood.',
        image: 'laem_charoen_seafood.jpg',
        menuItems: [
          'Fried Snow Fish', 'Grouper Curry', 'Steamed Curry Fish', 'Green Curry Fish Balls', 'Tod Man Pla',
          'Crab Black Pepper', 'Tiger Prawns', 'White Shrimp Chili', 'Pla Neung Manao', 'Crab Curry'
        ]
      },
      {
        id: 8,
        name: 'Nose Tea',
        category: 'Beverage',
        description: 'Trendy tea house offering premium bubble tea and specialty drinks.',
        image: 'nose_tea.jpg',
        menuItems: [
          'Sassy Cactus', 'Grape Tea', 'Nose tea signature', 'Chocolate Signature', 'Thai Tea Signature',
          'OLYMPUS Taro', 'Mandarin Tea', 'Lemon Tea', 'Peachy Green Tea', 'Lychee Tea'
        ]
      },
      {
        id: 9,
        name: 'Boost Juice',
        category: 'Beverage',
        description: 'Fresh juice bar offering healthy smoothies, juices, and protein shakes.',
        image: 'boost_juice.jpg',
        menuItems: [
          'Mini Me Mango', 'Immunity Juice', 'Vita C Detox Juice', 'Blueberry Blast', 'King William Chocolate',
          'Raspberry Mango Crush', 'Strawberry Protein', 'Cookie and Cream', 'Banana Buzz', 'Superfruit Energy'
        ]
      },
      {
        id: 10,
        name: 'Yole Thailand',
        category: 'Dessert',
        description: 'Modern frozen yogurt shop with creative toppings and healthy options.',
        image: 'yole_thailand.jpg',
        menuItems: [
          'Peanut Butter', 'SIGNATURE CUPS', 'IBIZA', 'WAFFLE BOWL', 'CONES',
          'BUBBLE WAFFLE', 'YOLE BOX', 'SHAKES', 'TWIST', 'Pistachio'
        ]
      },
      {
        id: 11,
        name: 'Azabusabo Thailand',
        category: 'Dessert',
        description: 'Premium Japanese-style ice cream with authentic flavors and artisanal quality.',
        image: 'azabusabo_thailand.jpg',
        menuItems: [
          'Yuzu', 'Chocolate', 'Vanilla', 'Matcha', 'Mix flavor(yuzu&choco)',
          'Mix flavor(vanilla& matcha)', 'Monaka Ice cream', 'Single Cup', 'Double Cup', 'Double Cone'
        ]
      }
    ];
    setAllRestaurants(restaurants);
  }, []);

  // Search function
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = [];
    
    allRestaurants.forEach(restaurant => {
      // Search by restaurant name
      const nameMatch = restaurant.name.toLowerCase().includes(query.toLowerCase());
      
      if (nameMatch) {
        results.push({
          type: 'restaurant',
          ...restaurant
        });
      }
      
      // Search by individual menu items
      restaurant.menuItems.forEach(item => {
        if (item.toLowerCase().includes(query.toLowerCase())) {
          results.push({
            type: 'food',
            id: `${restaurant.id}-${item}`,
            name: item,
            restaurantName: restaurant.name,
            restaurantId: restaurant.id,
            category: restaurant.category,
            distance: restaurant.distance,
            image: restaurant.image,
            foodImage: `${item.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')}.jpg`
          });
        }
      });
    });

    // Remove duplicates and sort (restaurants first, then food items)
    const uniqueResults = results.filter((result, index, self) => 
      index === self.findIndex(r => r.id === result.id)
    );
    
    const sortedResults = uniqueResults.sort((a, b) => {
      if (a.type === 'restaurant' && b.type === 'food') return -1;
      if (a.type === 'food' && b.type === 'restaurant') return 1;
      return 0;
    });

    setSearchResults(sortedResults);
  };

  useEffect(() => {
    performSearch(searchQuery);
  }, [searchQuery, allRestaurants]);

  const handleRestaurantPress = (item) => {
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
      restaurantName: item.type === 'restaurant' ? item.name : item.restaurantName,
      category: item.category 
    });
  };

  const renderSearchResult = ({ item }) => {
    // Calculate real distance and time
    const distance = getDistanceToRestaurant(item.type === 'restaurant' ? item.name : item.restaurantName);
    const deliveryTime = calculateDeliveryTime(item.type === 'restaurant' ? item.name : item.restaurantName);
    const distanceText = `${deliveryTime} min, ${distance.toFixed(1)} km`;
    
    if (item.type === 'restaurant') {
      return (
        <TouchableOpacity 
          style={styles.restaurantCard}
          onPress={() => handleRestaurantPress(item)}
        >
          <View style={styles.restaurantImageContainer}>
            <PlaceholderImage 
              imageName={item.image} 
              width={80}
              height={80}
              style={styles.restaurantImage} 
            />
          </View>
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>{item.name}</Text>
            <Text style={styles.restaurantDescription} numberOfLines={2}>
              {item.description}
            </Text>
            <View style={styles.restaurantMeta}>
              <Ionicons name="location-outline" size={14} color="#666" />
              <Text style={styles.restaurantDistance}>{distanceText}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Ionicons name="bookmark-outline" size={14} color="#666" style={styles.bookmarkIcon} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      // Food item result - don't show image for food items in search
      return (
        <TouchableOpacity 
          style={styles.foodCard}
          onPress={() => handleRestaurantPress(item)}
        >
          <View style={styles.foodInfo}>
            <Text style={styles.foodName}>{item.name}</Text>
            <Text style={styles.foodRestaurant}>from {item.restaurantName}</Text>
            <View style={styles.foodMeta}>
              <Ionicons name="restaurant-outline" size={14} color="#666" />
              <Text style={styles.foodCategory}>{item.category}</Text>
              <Text style={styles.foodDistance}>{distanceText}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#E8E0F0" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.micButton}>
          <Ionicons name="mic" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      <View style={styles.content}>
        {searchQuery.trim() === '' ? (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={80} color="#ccc" />
            <Text style={styles.emptyStateText}>Search for restaurants and food items</Text>
          </View>
        ) : searchResults.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="sad-outline" size={80} color="#ccc" />
            <Text style={styles.emptyStateText}>No results found</Text>
            <Text style={styles.emptyStateSubtext}>Try searching with different keywords</Text>
          </View>
        ) : (
          <FlatList
            data={searchResults}
            renderItem={renderSearchResult}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.resultsList}
          />
        )}
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
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    marginLeft: 8,
  },
  micButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  resultsList: {
    paddingVertical: 8,
  },
  restaurantCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  restaurantImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
  },
  restaurantInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  restaurantDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginBottom: 8,
  },
  restaurantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  restaurantDistance: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookmarkIcon: {
    marginLeft: 8,
  },
  foodCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#9C27B0',
  },
  foodInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  foodRestaurant: {
    fontSize: 13,
    color: '#9C27B0',
    fontWeight: '600',
    marginBottom: 8,
  },
  foodMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodCategory: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    marginRight: 8,
  },
  foodDistance: {
    fontSize: 12,
    color: '#666',
    marginLeft: 'auto',
  },
});

export default SearchScreen;