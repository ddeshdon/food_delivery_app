import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 3; // 3 cards per row spacing

export default function HomePageScreen({ navigation }) {
  const categories = [
    { title: 'Breakfast', image: 'https://i.imgur.com/8Km9tLL.jpg' },
    { title: 'Lunch', image: 'https://i.imgur.com/5A6bZfX.jpg' },
    { title: 'Dinner', image: 'https://i.imgur.com/3X8Q6sW.jpg' },
    { title: 'Beverage', image: 'https://i.imgur.com/0y0y0y0.jpg' },
    { title: 'Dessert', image: 'https://i.imgur.com/9g4ZKqf.jpg' },
  ];

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Category</Text>

        <View style={styles.categoriesRow}>
          {categories.map((c, i) => (
            <TouchableOpacity key={i} style={styles.categoryCard} onPress={() => {}}>
              <Image source={{ uri: c.image }} style={styles.categoryImage} resizeMode="cover" />
              <View style={styles.categoryLabelRow}>
                <Text style={styles.categoryLabel}>{c.title}</Text>
                <Text style={styles.chevron}>›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Near you</Text>

        {/* Placeholder content to push bottom nav into view */}
        <View style={{ height: 220 }} />
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}><Text style={styles.navIcon}>🏠</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Text style={styles.navIcon}>🔍</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Text style={styles.navIcon}>💬</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Text style={styles.navIcon}>👤</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Styles intentionally reuse the color palette and typography from WelcomeScreen
  screen: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },
  container: {
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 48,
    fontWeight: '800',
    color: '#ffffff',
    // Use a soft gradient-like background by placing titles over a light container
    backgroundColor: 'rgba(180,200,240,0.85)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 12,
  },
  categoriesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#dcdcdc',
    marginBottom: 12,
    borderRadius: 4,
    overflow: 'hidden',
  },
  categoryImage: {
    height: 100,
    width: '100%',
  },
  categoryLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  categoryLabel: {
    fontSize: 16,
    color: '#111',
    fontWeight: '600',
  },
  chevron: {
    fontSize: 18,
    color: '#222',
  },
  bottomNav: {
    height: 72,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
  },
});