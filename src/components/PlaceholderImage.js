import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlaceholderImage = ({ width, height, text, style }) => {
  return (
    <View style={[styles.placeholder, { width, height }, style]}>
      <Text style={styles.placeholderText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  placeholderText: {
    color: '#888',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default PlaceholderImage;