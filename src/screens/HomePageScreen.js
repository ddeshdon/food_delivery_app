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
const PROMO_CARD_WIDTH = (width - 60) / 2;

export default function HomePageScreen({ navigation }) {
  const categories = [
    { title: 'Breakfast', image: 'https://i.imgur.com/8Km9tLL.jpg' },
    { title: 'Lunch', image: 'https://i.imgur.com/5A6bZfX.jpg' },
    { title: 'Dinner', image: 'https://i.imgur.com/3X8Q6sW.jpg' },
    { title: 'Beverage', image: 'https://i.imgur.com/0y0y0y0.jpg' },
    { title: 'Dessert', image: 'https://i.imgur.com/9g4ZKqf.jpg' },
  ];

  const promos = [
    { titleTop: '25% off*', code: 'FINFIRST25', desc: 'Min150 Bath' },
    { titleTop: '50 Bath off*', code: 'FINFIRST50', desc: 'Save 50B using this code' },
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

        <View style={styles.promoHeaderRow}>
          <Text style={styles.sectionTitle}>Promotion</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.viewMore}>View more ››</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promoScroll} contentContainerStyle={{ paddingRight: 20 }}>
          {promos.map((p, i) => (
            <View key={i} style={styles.promoCard}>
              <View style={styles.promoTop}>
                <View style={styles.promoDot} />
                <Text style={styles.promoTopText}>{p.titleTop}</Text>
              </View>
              <View style={styles.promoBottom}>
                <Text style={styles.promoCode}>{p.code}</Text>
                <Text style={styles.promoDesc}>{p.desc}</Text>
                <TouchableOpacity style={styles.applyBtn}>
                  <Text style={styles.applyText}>Apply Code</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

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
  promoHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 12,
  },
  viewMore: {
    color: '#9b9b9b',
    fontSize: 14,
  },
  promoScroll: {
    marginBottom: 8,
  },
  promoCard: {
    width: PROMO_CARD_WIDTH,
    marginRight: 14,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    // shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    // elevation for Android
    elevation: 3,
  },
  promoTop: {
    backgroundColor: '#D95A2D',
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  promoDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#fff',
    marginRight: 12,
  },
  promoTopText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  promoBottom: {
    backgroundColor: '#fff',
    padding: 14,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  promoCode: {
    fontWeight: '800',
    fontSize: 12,
    color: '#444',
    marginBottom: 4,
  },
  promoDesc: {
    fontSize: 12,
    color: '#777',
    marginBottom: 10,
  },
  applyBtn: {
    alignSelf: 'stretch',
    paddingVertical: 8,
    borderRadius: 8,
    borderColor: '#e6e6e6',
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  applyText: {
    color: '#333',
    fontWeight: '600',
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