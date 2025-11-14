import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// Import restaurant logos
const logoMap = {
  'nico_nico.jpg': require('../../assets/image/logo/nico_nico.jpg'),
  'din_tai_fung.jpg': require('../../assets/image/logo/din_tai_fung.jpg'),
  'tsuru_udon.jpg': require('../../assets/image/logo/tsuru_udon.jpg'),
  'hey_gusto.jpg': require('../../assets/image/logo/hey_gusto.jpg'),
  'khao_jaan_prod.jpg': require('../../assets/image/logo/khao_jaan_prod.jpg'),
  'laem_charoen_seafood.jpg': require('../../assets/image/logo/laem_chareon_seafood.jpg'),
  'nose_tea.jpg': require('../../assets/image/logo/nose_tea.jpg'),
  'nose_tea.png': require('../../assets/image/logo/nose_tea.jpg'),
  'boost_juice.jpg': require('../../assets/image/logo/boost.jpg'),
  'yole_thailand.jpg': require('../../assets/image/logo/yole_thailand.jpg'),
  'azabusabo_thailand.jpg': require('../../assets/image/logo/azabusabo_thailand.jpg'),
  // Category images
  'breakfast.jpg': require('../../assets/image/logo/breakfast.jpg'),
  'lunch.jpg': require('../../assets/image/logo/lunch.jpg'),
  'dinner.jpg': require('../../assets/image/logo/dinner.jpg'),
  'beverage.jpg': require('../../assets/image/logo/beverage.jpg'),
  'dessert.jpg': require('../../assets/image/logo/dessert.jpg'),
};

// Import menu images for each restaurant
const menuImages = {
  'NICO NICO - Café & Brunch Place': {
    'chicken_burger.jpg': require('../../assets/image/logo/menu/NICONICO/Chicken_Burger.jpg'),
    'crab_cake_salad.jpg': require('../../assets/image/logo/menu/NICONICO/Crab_Cake_Salad.jpg'),
    'eggs_chashu_toast.jpg': require('../../assets/image/logo/menu/NICONICO/Eggs_&_Chashu_toast.jpg'),
    'grilled_cheese_salad.jpg': require('../../assets/image/logo/menu/NICONICO/Grilled_Cheese_Salad.jpg'),
    'katsu_sando.jpg': require('../../assets/image/logo/menu/NICONICO/Katsu_Sando.jpg'),
    'saba_tofu_salad.jpg': require('../../assets/image/logo/menu/NICONICO/Saba_Tofu_Salad.jpg'),
    'smoked_salmon_curry.jpg': require('../../assets/image/logo/menu/NICONICO/Smoked_Salmon_Curry.jpg'),
    'spicy_tuna_toast.jpg': require('../../assets/image/logo/menu/NICONICO/Spicy_tuna_Toast.jpg'),
    'wasabi_crab_toast.jpg': require('../../assets/image/logo/menu/NICONICO/Wasabi_Crab_Toast.jpg'),
    'yudane_bread.jpg': require('../../assets/image/logo/menu/NICONICO/YUDANE_Bread.jpg'),
  },
  'Din Tai Fung': {
    'black_pepper_beef.jpg': require('../../assets/image/logo/menu/DinTaiFung/Black_Pepper_Beef_Tenderloin.jpg'),
    'braised_beef_noodle_soup.jpg': require('../../assets/image/logo/menu/DinTaiFung/Braised_Beef_Noodle_Soup.jpg'),
    'broccoli_garlic.jpg': require('../../assets/image/logo/menu/DinTaiFung/Broccoli_with_Garlic.jpg'),
    'noodles_sesame_sauce.jpg': require('../../assets/image/logo/menu/DinTaiFung/Noodles_with_Sesame_Sauce.jpg'),
    'red_bean_sticky_rice.jpg': require('../../assets/image/logo/menu/DinTaiFung/Red_Bean_Sticky_Rice_Wrap.jpg'),
    'seaweed_beancurd_salad.jpg': require('../../assets/image/logo/menu/DinTaiFung/Seaweed_&_Beancurd_Salad.jpg'),
    'shrimp_pork_wonton_soup.jpg': require('../../assets/image/logo/menu/DinTaiFung/Shrimp_&_Kurobuta_Pork_Wonton_Soup.jpg'),
    'shrimp_pork_dumplings.jpg': require('../../assets/image/logo/menu/DinTaiFung/Shrimp_&_Kurobuta_Pork_Dumplings.jpg'),
    'shrimp_fried_rice.jpg': require('../../assets/image/logo/menu/DinTaiFung/Shrimp_Fried_Rice.jpg'),
    'tofu_glass_noodle_soup.jpg': require('../../assets/image/logo/menu/DinTaiFung/Tofu_Puff_&_Glass_Noodle_Soup.jpg'),
  },
  'Tsuru Udon': {
    'batacon.jpg': require('../../assets/image/logo/menu/TsuruUdon/Batacon.jpg'),
    'carbonara_udon.jpg': require('../../assets/image/logo/menu/TsuruUdon/Carbonara_Udon.jpg'),
    'gyu_jyaga.jpg': require('../../assets/image/logo/menu/TsuruUdon/Gyu_Jyaga.jpg'),
    'gyu_stamina_yaki.jpg': require('../../assets/image/logo/menu/TsuruUdon/Gyu_Stamina_Yaki.jpg'),
    'gyudon.jpg': require('../../assets/image/logo/menu/TsuruUdon/Gyudon.jpg'),
    'hiyashi_oroshi.jpg': require('../../assets/image/logo/menu/TsuruUdon/Hiyashi_Oroshi.jpg'),
    'mentai_cream.jpg': require('../../assets/image/logo/menu/TsuruUdon/Mentai_Cream.jpg'),
    'niku_bukkake.jpg': require('../../assets/image/logo/menu/TsuruUdon/Niku_Bukkake.jpg'),
    'salmon_don.jpg': require('../../assets/image/logo/menu/TsuruUdon/Salmon_Don.jpg'),
    'yamakake.jpg': require('../../assets/image/logo/menu/TsuruUdon/Yamakake.jpg'),
  },
  'Nose Tea': {
    'chocolate_signature.jpg': require('../../assets/image/logo/menu/NoseTea/Chocolate_Signature.jpg'),
    'grape_tea.jpg': require('../../assets/image/logo/menu/NoseTea/Grape_Tea.jpg'),
    'lemon_tea.jpg': require('../../assets/image/logo/menu/NoseTea/Lemon_Tea.jpg'),
    'lychee_tea.jpg': require('../../assets/image/logo/menu/NoseTea/Lychee_Tea.jpg'),
    'mandarin_tea.jpg': require('../../assets/image/logo/menu/NoseTea/Mandarin_Tea.jpg'),
    'nose_tea_signature.jpg': require('../../assets/image/logo/menu/NoseTea/Nose_tea_signature.jpg'),
    'olympus_taro.jpg': require('../../assets/image/logo/menu/NoseTea/OLYMPUS_Taro.jpg'),
    'peachy_green_tea.jpg': require('../../assets/image/logo/menu/NoseTea/Peachy_Green_Tea.jpg'),
    'sassy_cactus.jpg': require('../../assets/image/logo/menu/NoseTea/Sassy_Cacao.jpg'),
    'thai_tea_signature.jpg': require('../../assets/image/logo/menu/NoseTea/Thai_Tea_Signature.jpg'),
  },
  'Hey Gusto': {
    'burrata_fresh_tomatoes.jpg': require('../../assets/image/logo/menu/HeyGusto/Burrata_Fresh_Tomatoes.jpg'),
    'burrata_italian_ham.jpg': require('../../assets/image/logo/menu/HeyGusto/Burrata_Italian_Ham.jpg'),
    'australian_striploin_steak.jpg': require('../../assets/image/logo/menu/HeyGusto/Australian_Striploin_Steak.jpg'),
    'spaghetti_with_bacon.jpg': require('../../assets/image/logo/menu/HeyGusto/Spaghetti_with_bacon.jpg'),
    'signature_truffle.jpg': require('../../assets/image/logo/menu/HeyGusto/Signature_Traffle.jpg'),
    'pepperoni_classic.jpg': require('../../assets/image/logo/menu/HeyGusto/Pepperoni_Classic.jpg'),
    'seafood.jpg': require('../../assets/image/logo/menu/HeyGusto/Seafood.jpg'),
    'salmon_grill_steak.jpg': require('../../assets/image/logo/menu/HeyGusto/Salmon_Grill_Steak.jpg'),
    'tiramisu.jpg': require('../../assets/image/logo/menu/HeyGusto/Tiramisu.jpg'),
    'ice_cream.jpg': require('../../assets/image/logo/menu/HeyGusto/Ice-cream.jpg'),
  },
  'Khao Jaan-Prod': {
    'spicy_mixed_vegetable_curry.jpg': require('../../assets/image/logo/menu/KhaoJaanProd/Spicy_Mixed_Vegetable_Curry_with_Chicken.jpg'),
    'steamed_curried_fish.jpg': require('../../assets/image/logo/menu/KhaoJaanProd/Steamed_Curried_Fish.jpg'),
    'shrimp_paste_chili_dip.jpg': require('../../assets/image/logo/menu/KhaoJaanProd/Shrimp_Paste_Chili_Dip.jpg'),
    'pad_thai_shrimp.jpg': require('../../assets/image/logo/menu/KhaoJaanProd/Pad_Thai_with_Shrimp.jpg'),
    'grilled_shrimp.jpg': require('../../assets/image/logo/menu/KhaoJaanProd/Grilled_Shrimp.jpg'),
    'thai_herb_baked_chicken.jpg': require('../../assets/image/logo/menu/KhaoJaanProd/Thai_Herb_Baked_Chicken.jpg'),
    'thai_grilled_chicken.jpg': require('../../assets/image/logo/menu/KhaoJaanProd/Thai_Grilled_Chicken.jpg'),
    'pork_leg_curry.jpg': require('../../assets/image/logo/menu/KhaoJaanProd/Pork_Leg_Curry_with_Cha-Muang_Leaves.jpg'),
    'black_pepper_fried_rice.jpg': require('../../assets/image/logo/menu/KhaoJaanProd/Black_Pepper_Fried_Rice.jpg'),
    'chinese_chives_egg.jpg': require('../../assets/image/logo/menu/KhaoJaanProd/Chinese_Chives_with_Egg.jpg'),
  },
  'Laem Charoen Seafood': {
    'fried_snow_fish.jpg': require('../../assets/image/logo/menu/LaemCharoenSeafood/Fried_Snow_Fish_with_Fish_Sauce.jpg'),
    'grouper_southern_curry.jpg': require('../../assets/image/logo/menu/LaemCharoenSeafood/Grouper_in_Southern_Thai_Sour_Curry.jpg'),
    'steamed_curry_fish_custard.jpg': require('../../assets/image/logo/menu/LaemCharoenSeafood/Steamed_Curry_Fish_Custard.jpg'),
    'green_curry_fish_balls.jpg': require('../../assets/image/logo/menu/LaemCharoenSeafood/Green_Curry_with_Fish_Balls.jpg'),
    'tod_man_pla.jpg': require('../../assets/image/logo/menu/LaemCharoenSeafood/Tod_Mun_Pla.jpg'),
    'stir_fried_crab_pepper.jpg': require('../../assets/image/logo/menu/LaemCharoenSeafood/Stir-fried_Crab_with_Black_Pepper.jpg'),
    'tiger_prawns_ginger.jpg': require('../../assets/image/logo/menu/LaemCharoenSeafood/Tiger_Prawns_Baked_with_Butter_and_Garlic.jpg'),
    'white_shrimp_chili.jpg': require('../../assets/image/logo/menu/LaemCharoenSeafood/White_Shrimp_Stir-fried_with_Chili_and_Salt.jpg'),
    'pla_neung_manao.jpg': require('../../assets/image/logo/menu/LaemCharoenSeafood/Pla_Neung_Manao.jpg'),
    'crab_curry.jpg': require('../../assets/image/logo/menu/LaemCharoenSeafood/Crab_Curry.jpg'),
  },
  'Boost Juice': {
    'mini_me_mango.jpg': require('../../assets/image/logo/menu/BoostJuice/Mini_Me_Mango.jpg'),
    'immunity_juice.jpg': require('../../assets/image/logo/menu/BoostJuice/Immunity_Juice.jpg'),
    'vita_c_detox_juice.jpg': require('../../assets/image/logo/menu/BoostJuice/Vita_C_Detox_Juice.jpg'),
    'blueberry_blast.jpg': require('../../assets/image/logo/menu/BoostJuice/Blueberry_Blast.jpg'),
    'king_william_chocolate.jpg': require('../../assets/image/logo/menu/BoostJuice/King_William_Chocolate.jpg'),
    'raspberry_mango_crush.jpg': require('../../assets/image/logo/menu/BoostJuice/Raspberry_Mango_Crush.jpg'),
    'strawberry_protein.jpg': require('../../assets/image/logo/menu/BoostJuice/Strawberry_Protein.jpg'),
    'cookie_and_cream.jpg': require('../../assets/image/logo/menu/BoostJuice/Cookie_and_Cream.jpg'),
    'banana_buzz.jpg': require('../../assets/image/logo/menu/BoostJuice/Banana_Buzz.jpg'),
    'superfruit_energy.jpg': require('../../assets/image/logo/menu/BoostJuice/SuperFruit_Energy.jpg'),
  },
  'Yole Thailand': {
    'peanut_butter.jpg': require('../../assets/image/logo/menu/Yole/Peanut_Butter.jpg'),
    'signature_cups.jpg': require('../../assets/image/logo/menu/Yole/SIGNATURE_CUPS.jpg'),
    'ibiza.jpg': require('../../assets/image/logo/menu/Yole/IBIZA.jpg'),
    'waffle_bowl.jpg': require('../../assets/image/logo/menu/Yole/WAFFLE_BOWL.jpg'),
    'cones.jpg': require('../../assets/image/logo/menu/Yole/CONES.jpg'),
    'bubble_waffle.jpg': require('../../assets/image/logo/menu/Yole/BUBBLE_WAFFLE.jpg'),
    'yole_box.jpg': require('../../assets/image/logo/menu/Yole/YOLÉ_BOX.jpg'),
    'shakes.jpg': require('../../assets/image/logo/menu/Yole/SHAKES.jpg'),
    'twist.jpg': require('../../assets/image/logo/menu/Yole/TWIST.jpg'),
    'pistachio.jpg': require('../../assets/image/logo/menu/Yole/Pistachio.jpg'),
  },
  'Azabusabo Thailand': {
    'yuzu.jpg': require('../../assets/image/logo/menu/AzabusaboThailand/Yuzu.jpg'),
    'chocolate.jpg': require('../../assets/image/logo/menu/AzabusaboThailand/Chocolate.jpg'),
    'vanilla.jpg': require('../../assets/image/logo/menu/AzabusaboThailand/Vanilla.jpg'),
    'matcha.jpg': require('../../assets/image/logo/menu/AzabusaboThailand/Matcha.jpg'),
    'mix_flavor_yuzu_choco.jpg': require('../../assets/image/logo/menu/AzabusaboThailand/Mix_favor(yuzu&choc).jpg'),
    'mix_flavor_vanilla_matcha.jpg': require('../../assets/image/logo/menu/AzabusaboThailand/Mix_favor(vanilla&_matcha).jpg'),
    'monaka_ice_cream.jpg': require('../../assets/image/logo/menu/AzabusaboThailand/Monaka_Ice-cream.jpg'),
    'single_cup.jpg': require('../../assets/image/logo/menu/AzabusaboThailand/Single_Cup.jpg'),
    'double_cup.jpg': require('../../assets/image/logo/menu/AzabusaboThailand/Double_Cup.jpg'),
    'double_cone.jpg': require('../../assets/image/logo/menu/AzabusaboThailand/Double_Cone.jpg'),
  },
};

const PlaceholderImage = ({ width, height, text, style, imageName, restaurantName }) => {
  // Use imageName prop if provided, otherwise fall back to text prop
  const imageKey = imageName || text;
  
  // Try to find menu image first
  if (restaurantName && menuImages[restaurantName] && menuImages[restaurantName][imageKey]) {
    return (
      <Image
        source={menuImages[restaurantName][imageKey]}
        style={[{ width, height, borderRadius: 8 }, style]}
        resizeMode="cover"
      />
    );
  }
  
  // Fallback to logo map
  if (logoMap[imageKey]) {
    return (
      <Image
        source={logoMap[imageKey]}
        style={[{ width, height, borderRadius: 8 }, style]}
        resizeMode="cover"
      />
    );
  }

  // Fallback to placeholder if image not found
  return (
    <View style={[styles.placeholder, { width, height }, style]}>
      <Text style={styles.placeholderText}>{imageKey || 'No Image'}</Text>
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
    paddingHorizontal: 5,
  },
});

export default PlaceholderImage;