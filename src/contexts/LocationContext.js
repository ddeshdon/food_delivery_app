import React, { createContext, useContext, useState } from 'react';

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

// Restaurant locations (latitude, longitude)
const RESTAURANT_LOCATIONS = {
  'NICO NICO - Café & Brunch Place': { lat: 14.0697, lng: 100.6058, address: 'Siam Square, Bangkok' },
  'Din Tai Fung': { lat: 13.7447, lng: 100.5597, address: 'CentralWorld, Bangkok' },
  'Tsuru Udon': { lat: 13.7563, lng: 100.5018, address: 'Silom, Bangkok' },
  'Hey Gusto': { lat: 13.7308, lng: 100.5418, address: 'Sathorn, Bangkok' },
  'Thong Smith': { lat: 13.7650, lng: 100.5380, address: 'Phloenchit, Bangkok' },
  'Khao Jaan-Prod': { lat: 13.7278, lng: 100.524, address: 'Lumpini, Bangkok' },
  'Laem Charoen Seafood': { lat: 13.7462, lng: 100.5346, address: 'Chong Nonsi, Bangkok' },
  'Nose Tea': { lat: 13.7539, lng: 100.5014, address: 'Sala Daeng, Bangkok' },
  'Boost Juice': { lat: 13.7444, lng: 100.5603, address: 'Ratchadamri, Bangkok' },
  'Yolo Thailand': { lat: 13.7367, lng: 100.5480, address: 'Ploenchit, Bangkok' },
  'Azabusabo Thailand': { lat: 13.7307, lng: 100.5418, address: 'Sathorn Road, Bangkok' }
};

export const LocationProvider = ({ children }) => {
  // Default user location (Thammasat University)
  const [userLocation, setUserLocation] = useState({
    lat: 14.0699,
    lng: 100.6070,
    address: 'Thammasat University, Pathum Thani 12120'
  });

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
  };

  // Calculate delivery time (distance / 50 km/h converted to minutes)
  const calculateDeliveryTime = (restaurantName) => {
    const restaurantLocation = RESTAURANT_LOCATIONS[restaurantName];
    if (!restaurantLocation) return 30; // Default 30 minutes if restaurant not found

    const distance = calculateDistance(
      userLocation.lat, userLocation.lng,
      restaurantLocation.lat, restaurantLocation.lng
    );

    // Speed: 50 km/h, convert to minutes
    const timeInHours = distance / 50;
    const timeInMinutes = Math.ceil(timeInHours * 60);
    
    // Minimum 10 minutes, maximum 60 minutes for realistic delivery times
    return Math.max(10, Math.min(60, timeInMinutes));
  };

  const getRestaurantLocation = (restaurantName) => {
    return RESTAURANT_LOCATIONS[restaurantName] || null;
  };

  const getDistanceToRestaurant = (restaurantName) => {
    const restaurantLocation = RESTAURANT_LOCATIONS[restaurantName];
    if (!restaurantLocation) return 0;

    return calculateDistance(
      userLocation.lat, userLocation.lng,
      restaurantLocation.lat, restaurantLocation.lng
    );
  };

  const value = {
    userLocation,
    setUserLocation,
    calculateDeliveryTime,
    getRestaurantLocation,
    getDistanceToRestaurant,
    restaurantLocations: RESTAURANT_LOCATIONS
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;