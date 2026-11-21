import React, { useState } from 'react';
import { Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const C = { bg: '#110D0B', panel: '#302824', orange: '#FF7909', white: '#FFFFFF', muted: '#CFC4BE' };
const images = {
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1000&q=85',
  cheese: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=900&q=85',
  chicken: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=900&q=85',
  bbq: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=900&q=85',
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
  fries: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
  drink: 'https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?w=400&q=80',
};
type Food = { id: string; name: string; price: number; rating: string; image: string; bestseller?: boolean };
const foods: Food[] = [
  { id: 'cheese', name: 'Cheese Burger', price: 149, rating: '4.6 (2.1K)', image: images.cheese },
  { id: 'chicken', name: 'Spicy Chicken Burger', price: 179, rating: '4.8 (3.4K)', image: images.chicken, bestseller: true },
  { id: 'bbq', name: 'BBQ Burger', price: 189, rating: '4.7 (1.9K)', image: images.bbq },
];
const categories = [{ name: 'Burger', image: images.cheese }, { name: 'Pizza', image: images.pizza }, { name: 'Chicken', image: images.chicken }, { name: 'Fries', image: images.fries }, { name: 'Drinks', image: images.drink }];
type IconName = React.ComponentProps<typeof Ionicons>['name'];
function Icon({ name, color = 'white', size = 20 }: { name: IconName; color?: string; size?: number }) { return <Ionicons name={name} color={color} size={size}/>; }
function Circle({ name, onPress, color }: { name: IconName; onPress?: () => void; color?: string }) { return <Pressable onPress={onPress} style={s.circle}><Icon name={name} size={19} color={color}/></Pressable>; }
export default function App() {
  const [item, setItem] = useState<Food | null>(null);
  const [category, setCategory] = useState('Burger');
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('Home');
  const [liked, setLiked] = useState<string[]>([]);
  const [cart, setCart] = useState(0);
  const [count, setCount] = useState(1);
  const [size, setSize] = useState('Regular');
  const [extras, setExtras] = useState<Record<string, boolean>>({ Cheese: true, Patty: false, Bacon: true });
  const like = (id: string) => setLiked(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);
  const show = (food: Food) => { setItem(food); setCount(1); setSize('Regular'); setExtras({ Cheese: true, Patty: false, Bacon: true }); };
  const price = item ? (item.price + (size === 'Large' ? 30 : size === 'X-Large' ? 60 : 0) + (extras.Cheese ? 20 : 0) + (extras.Patty ? 50 : 0) + (extras.Bacon ? 40 : 0)) * count : 0;
  const visible = foods.filter(f => f.name.toLowerCase().includes(search.toLowerCase()) && (tab !== 'Favorite' || liked.includes(f.id)));
  return <SafeAreaView style={s.root}><StatusBar barStyle="light-content" backgroundColor={C.bg}/>
    {item ? <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <ImageBackground source={{ uri: item.image }} style={s.hero} resizeMode="cover">
          <LinearGradient colors={['rgba(15,10,8,.7)', 'transparent', C.bg]} style={StyleSheet.absoluteFill}/>
          <View style={s.heroHeader}><Circle name="chevron-back" onPress={() => setItem(null)}/><View style={s.row}><Circle name="share-social-outline"/><Circle name={liked.includes(item.id) ? 'heart' : 'heart-outline'} color={liked.includes(item.id) ? '#F6534E' : 'white'} onPress={() => like(item.id)}/></View></View>
        </ImageBackground>
        <View style={s.details}>
          <Text style={s.chip}>Bestseller</Text>
          <View style={s.titleRow}><Text style={s.productDetailTitle}>{item.name}</Text><Text style={s.detailPrice}>₹{item.price}</Text></View>
          <View style={[s.row, { alignItems: 'center', marginTop: 10 }]}><Icon name="star" size={15} color={C.orange}/><Text style={s.info}> 4.8 (3,420 reviews)　│　◷ 15–20 min</Text></View>
          <Text style={s.desc}>Crispy chicken patty with fresh lettuce, tomato, onion, cheddar cheese and our special spicy sauce.</Text>
          <View style={s.rule}/><Text style={s.panelHeading}>Customize Your Burger</Text>
          <View style={s.sizeRow}><Text style={s.info}>Size</Text><View style={s.row}>{['Regular', 'Large', 'X-Large'].map(k => <Pressable key={k} onPress={() => setSize(k)} style={[s.sizeChip, size === k && s.sizeActive]}><Text style={s.sizeLabel}>{k}</Text></Pressable>)}</View></View>
          <View style={s.rule}/>
          {([{ key: 'Cheese', label: 'Add Extra Cheese (+₹20)' }, { key: 'Patty', label: 'Add Extra Patty (+₹50)' }, { key: 'Bacon', label: 'Add Bacon (+₹40)' }]).map(e => <Pressable key={e.key} onPress={() => setExtras(v => ({ ...v, [e.key]: !v[e.key] }))} style={s.extra}><Text style={s.extraText}>{e.label}</Text><View style={[s.toggle, extras[e.key] && s.toggleOn]}><View style={[s.toggleDot, extras[e.key] && { alignSelf: 'flex-end', backgroundColor: 'white' }]}/></View></Pressable>)}
        </View>
      </ScrollView>
      <View style={s.bottom}><View style={s.quantity}><Pressable onPress={() => setCount(c => Math.max(1, c - 1))} style={s.quantityButton}><Icon name="remove"/></Pressable><Text style={s.count}>{count}</Text><Pressable onPress={() => setCount(c => c + 1)} style={s.quantityButton}><Icon name="add"/></Pressable></View><Pressable style={s.cta} onPress={() => { setCart(x => x + count); setItem(null); setTab('Cart'); }}><Icon name="cart-outline"/><Text style={s.ctaLabel}>Add to Cart</Text><Text style={s.ctaLabel}>₹{price}</Text></Pressable></View>
    </View> : <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#342016', '#160F0C', C.bg]} style={s.content}>
          <View style={s.top}><Circle name="menu-outline"/><View style={s.row}><Icon name="location" color={C.orange} size={16}/><Text style={s.location}> Saharsa, Bihar ⌄</Text></View><View style={s.row}><Circle name="notifications-outline"/><View style={s.avatar}><Text>👨🏻</Text></View></View></View>
          <Text style={s.greeting}>Hi, Mannu 👋</Text>
          <Text style={s.headline}>Good Food,{'\n'}Good <Text style={{ color: C.orange }}>Mood!</Text></Text>
          <Text style={s.tagline}>Order your favorite food from top{'\n'}restaurants near you.</Text>
          <View style={s.search}><Icon name="search-outline"/><TextInput value={search} onChangeText={setSearch} placeholder="Search for food, restaurant..." placeholderTextColor="#C1B7B1" style={s.input}/><Icon name="options-outline"/></View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.categoryRow}>{categories.map(cat => <Pressable key={cat.name} onPress={() => setCategory(cat.name)} style={[s.category, category === cat.name && s.activeCategory]}><Image source={{ uri: cat.image }} style={s.catPhoto}/><Text style={s.catText}>{cat.name}</Text></Pressable>)}</ScrollView>
          <Pressable style={s.promo} onPress={() => show(foods[1])}>
            <LinearGradient colors={['#684035', '#271714', '#42251B']} style={StyleSheet.absoluteFill}/>
            <View style={s.promoText}><Text style={s.small}>⚡ Today's Special</Text><Text style={s.promoHeading}>Spicy Burger{'\n'}Combo</Text><Text style={s.small}>Burger + Fries + Drink</Text><View style={s.order}><Text style={s.orderLabel}>Order Now　→</Text></View></View>
            <Image source={{ uri: images.burger }} style={s.promoBurger}/>
            <View style={s.sale}><Text style={s.saleText}>Flat</Text><Text style={s.salePercent}>30%</Text><Text style={s.saleText}>OFF</Text></View>
          </Pressable>
          <View style={s.dots}><View style={s.activeDot}/><View style={s.dot}/><View style={s.dot}/></View>
          <View style={s.section}><Text style={s.sectionHeading}>{tab === 'Favorite' ? 'Your Favorites' : tab === 'Cart' ? 'Your Cart' : 'Popular Now'}</Text><Text style={s.viewAll}>View All</Text></View>
          {tab === 'Cart' ? <View style={s.cartNote}><Text style={s.panelHeading}>{cart} items in cart</Text><Text style={s.desc}>Checkout will be implemented in the next milestone.</Text></View> : <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.products}>{visible.length ? visible.map(f => <Pressable key={f.id} onPress={() => show(f)} style={s.product}>{f.bestseller && <Text style={s.productBadge}>Bestseller</Text>}<Pressable onPress={() => like(f.id)} style={s.favorite}><Icon name={liked.includes(f.id) ? 'heart' : 'heart-outline'} color={liked.includes(f.id) ? '#FA5244' : 'white'}/></Pressable><Image source={{ uri: f.image }} style={s.photo}/><Text style={s.foodName}>{f.name}</Text><Text style={s.foodRating}>⭐ {f.rating}</Text><View style={s.productFooter}><Text style={s.foodPrice}>₹{f.price}</Text><View style={s.add}><Icon name="add"/></View></View></Pressable>) : <Text style={s.info}>No products found.</Text>}</ScrollView>}
        </LinearGradient>
      </ScrollView>
      <View style={s.nav}>{([{ name: 'Home', icon: 'home-outline' }, { name: 'Explore', icon: 'compass-outline' }, { name: 'Cart', icon: 'cart-outline' }, { name: 'Favorite', icon: 'heart-outline' }, { name: 'Profile', icon: 'person-outline' }] as { name: string; icon: IconName }[]).map(n => <Pressable onPress={() => setTab(n.name)} key={n.name} style={s.navItem}><Icon name={tab === n.name && n.name === 'Home' ? 'home' : n.icon} color={tab === n.name ? C.orange : 'white'} size={21}/>{n.name === 'Cart' && cart > 0 && <View style={s.bubble}><Text style={s.bubbleText}>{cart}</Text></View>}<Text style={[s.navText, tab === n.name && { color: C.orange }]}>{n.name}</Text></Pressable>)}</View>
    </View>}
  </SafeAreaView>;
}
const s = StyleSheet.create({
 root: { flex: 1, backgroundColor: C.bg }, row: { flexDirection: 'row', alignItems: 'center', gap: 8 }, content: { minHeight: '100%', paddingTop: 12 },
 circle: { width: 34, height: 34, borderRadius: 20, backgroundColor: 'rgba(110,93,84,.45)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,.1)' },
 top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 22, height: 43 }, location: { color: 'white', fontSize: 11 }, avatar: { width: 34, height: 34, borderRadius: 20, backgroundColor: '#47372F', alignItems: 'center', justifyContent: 'center' },
 greeting: { marginTop: 13, marginHorizontal: 24, color: 'white', fontSize: 16 }, headline: { color: 'white', fontSize: 35, fontWeight: '900', lineHeight: 37, letterSpacing: -1.2, marginHorizontal: 24, marginTop: 4 },
 tagline: { color: C.muted, marginHorizontal: 24, marginTop: 7, fontSize: 12, lineHeight: 17 },
 search: { marginHorizontal: 22, marginTop: 17, height: 45, borderRadius: 24, backgroundColor: 'rgba(110,95,87,.42)', borderWidth: 1, borderColor: 'rgba(255,255,255,.16)', flexDirection: 'row', gap: 10, paddingHorizontal: 14, alignItems: 'center' }, input: { flex: 1, color: 'white', fontSize: 11 },
 categoryRow: { paddingHorizontal: 22, gap: 8, paddingTop: 17 }, category: { width: 63, height: 78, alignItems: 'center', justifyContent: 'center', gap: 5, borderRadius: 15, backgroundColor: '#282221', borderWidth: 1, borderColor: '#40342E' }, activeCategory: { backgroundColor: '#693A17', borderColor: C.orange, elevation: 6 }, catPhoto: { width: 46, height: 46, borderRadius: 11 }, catText: { fontSize: 10, color: 'white' },
 promo: { marginHorizontal: 18, marginTop: 15, height: 165, overflow: 'hidden', borderRadius: 17, borderWidth: 1, borderColor: 'rgba(255,255,255,.15)' }, promoText: { zIndex: 2, marginLeft: 15, marginTop: 14 }, small: { color: '#EEE0D5', fontSize: 10 }, promoHeading: { color: 'white', fontSize: 23, lineHeight: 25, fontWeight: '800', marginVertical: 5 }, order: { marginTop: 12, backgroundColor: C.orange, borderRadius: 22, paddingVertical: 9, width: 108, alignItems: 'center' }, orderLabel: { color: 'white', fontSize: 11, fontWeight: '700' }, promoBurger: { position: 'absolute', right: -3, bottom: 0, width: '53%', height: 125, borderRadius: 18 }, sale: { position: 'absolute', top: 7, right: 10, borderRadius: 35, width: 55, height: 55, backgroundColor: '#F9A019', justifyContent: 'center', alignItems: 'center' }, saleText: { fontSize: 9, color: '#221108', fontWeight: '600' }, salePercent: { fontSize: 17, color: '#221108', fontWeight: '900', lineHeight: 18 },
 dots: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5, marginTop: 9 }, dot: { width: 5, height: 5, borderRadius: 5, backgroundColor: '#685952' }, activeDot: { width: 11, height: 5, backgroundColor: C.orange, borderRadius: 5 },
 section: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 22, marginTop: 13, marginBottom: 12 }, sectionHeading: { fontSize: 16, fontWeight: '800', color: 'white' }, viewAll: { color: 'white', fontSize: 11 },
 products: { paddingHorizontal: 20, paddingBottom: 15, gap: 10 }, product: { width: 136, minHeight: 182, borderRadius: 15, backgroundColor: '#29211E', borderWidth: 1, borderColor: '#50413B', padding: 10, overflow: 'hidden' }, productBadge: { position: 'absolute', top: 7, left: 7, zIndex: 3, fontSize: 8, color: 'white', backgroundColor: '#D94731', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 8, overflow: 'hidden' }, favorite: { position: 'absolute', top: 7, right: 7, zIndex: 3 }, photo: { width: '100%', height: 95, borderRadius: 12 }, foodName: { color: 'white', fontSize: 12, fontWeight: '700', marginTop: 6, minHeight: 28 }, foodRating: { fontSize: 10, color: C.muted }, productFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }, foodPrice: { color: 'white', fontSize: 14, fontWeight: '800' }, add: { backgroundColor: C.orange, width: 26, height: 26, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
 nav: { position: 'absolute', bottom: 12, left: 15, right: 15, height: 67, borderRadius: 22, backgroundColor: 'rgba(42,39,39,.97)', borderWidth: 1, borderColor: '#494240', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }, navItem: { width: 55, alignItems: 'center', gap: 4 }, navText: { color: '#E2DBD6', fontSize: 9 }, bubble: { position: 'absolute', right: 10, top: -7, width: 14, height: 14, borderRadius: 9, backgroundColor: C.orange, alignItems: 'center', justifyContent: 'center' }, bubbleText: { color: 'white', fontSize: 9 }, cartNote: { marginHorizontal: 20, padding: 20, borderRadius: 18, backgroundColor: C.panel },
 hero: { width: '100%', height: 365 }, heroHeader: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 20 },
 details: { marginHorizontal: 15, marginTop: -25, backgroundColor: '#332C28', borderRadius: 23, borderWidth: 1, borderColor: 'rgba(255,255,255,.15)', padding: 17 },
 chip: { alignSelf: 'flex-start', fontSize: 10, backgroundColor: '#BD571C', color: 'white', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 7, overflow: 'hidden' },
 titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginTop: 8 }, productDetailTitle: { flex: 1, color: 'white', fontSize: 21, fontWeight: '800' }, detailPrice: { color: C.orange, fontSize: 22, fontWeight: '700' }, info: { color: '#F0EAE6', fontSize: 11 },
 desc: { color: '#DDD4CE', fontSize: 11, lineHeight: 17, marginTop: 13 }, rule: { height: 1, backgroundColor: 'rgba(255,255,255,.13)', marginVertical: 15 }, panelHeading: { color: 'white', fontSize: 15, fontWeight: '800' },
 sizeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }, sizeChip: { paddingHorizontal: 12, paddingVertical: 9, backgroundColor: '#403936', borderRadius: 20, borderWidth: 1, borderColor: '#514842', marginLeft: 5 }, sizeActive: { backgroundColor: C.orange, borderColor: C.orange }, sizeLabel: { color: 'white', fontSize: 10 },
 extra: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 42, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,.08)' }, extraText: { color: 'white', fontSize: 11 }, toggle: { width: 38, height: 22, borderRadius: 14, backgroundColor: '#77716E', paddingHorizontal: 3, justifyContent: 'center' }, toggleOn: { backgroundColor: C.orange }, toggleDot: { width: 16, height: 16, borderRadius: 9, backgroundColor: '#D5D1D0' },
 bottom: { position: 'absolute', bottom: 12, left: 15, right: 15, height: 59, flexDirection: 'row', gap: 9 }, quantity: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: 17, borderWidth: 1, borderColor: '#514844', backgroundColor: '#332C29', paddingHorizontal: 8 }, quantityButton: { backgroundColor: '#554B46', borderRadius: 9, width: 29, height: 29, alignItems: 'center', justifyContent: 'center' }, count: { color: 'white', fontSize: 14 }, cta: { flex: 1, backgroundColor: C.orange, borderRadius: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 9 }, ctaLabel: { color: 'white', fontSize: 13, fontWeight: '700' }
});
