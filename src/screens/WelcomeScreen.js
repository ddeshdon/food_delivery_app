import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Image 
            source={require('../../assets/Logo.jpg')} 
            style={styles.logoImage}
          />
        </View>
        <Text style={styles.sloganText}>Good food, delivered with heart</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.getStartedButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#B8E6E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    overflow: 'hidden',
  },
  logoImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  logoText: {
    fontSize: 40,
    marginBottom: 10,
  },
  brandText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C5F5D',
  },
  subText: {
    fontSize: 12,
    color: '#2C5F5D',
    fontWeight: '600',
  },
  sloganText: {
    fontSize: 24,
    color: '#2C5F5D',
    fontWeight: '500',
    fontStyle: 'italic',
    marginTop: 5,
    textAlign: 'center',
  },
  getStartedButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});