import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const COLOR = { cream: '#F9F5F0', paper: '#FFFCF8', coffee: '#4A2415', brown: '#703D25', text: '#251A15', soft: '#71645D', line: '#E9DFD6' };
type IconName = React.ComponentProps<typeof Ionicons>['name'];
type Product = { id: string; name: string; description: string; price: number; image: string; rating: string; tag?: string; category: string };
const photos = {
  coffee: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=85',
  cappuccino: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=700&q=85',
  muffin: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=700&q=85',
  sandwich: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=700&q=85',
  iced: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=900&q=85',
  croissant: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=700&q=85',
};
const products: Product[] = [
  { id: 'cappuccino', name: 'Cappuccino', description: 'Café expresso cremoso com leite vaporizado', price: 16.9, image: photos.cappuccino, rating: '4,8', tag: 'MAIS PEDIDO', category: 'Cafés' },
  { id: 'muffin', name: 'Muffin de Chocolate', description: 'Macio, intenso e feito com chocolate', price: 12.9, image: photos.muffin, rating: '4,7', tag: 'DA CASA', category: 'Doces' },
  { id: 'sanduiche', name: 'Sanduíche da Casa', description: 'Pão artesanal, queijo e ingredientes frescos', price: 26.9, image: photos.sandwich, rating: '4,6', tag: 'POPULAR', category: 'Salgados' },
  { id: 'gelado', name: 'Café Gelado', description: 'Expresso com leite, gelo e muito sabor', price: 18.9, image: photos.iced, rating: '4,9', category: 'Bebidas' },
  { id: 'croissant', name: 'Croissant', description: 'Massa amanteigada e crocante', price: 14.9, image: photos.croissant, rating: '4,8', category: 'Padaria' },
];
const groups: { title: string; icon: IconName; match: string }[] = [
  { title: 'Cafés', icon: 'cafe-outline', match: 'Cafés' },
  { title: 'Padaria', icon: 'restaurant-outline', match: 'Padaria' },
  { title: 'Salgados', icon: 'fast-food-outline', match: 'Salgados' },
  { title: 'Doces', icon: 'ice-cream-outline', match: 'Doces' },
  { title: 'Bebidas', icon: 'wine-outline', match: 'Bebidas' },
  { title: 'Todos', icon: 'grid-outline', match: 'Todos' },
];
const brl = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
function Icon({ name, size = 22, color = COLOR.text }: { name: IconName; size?: number; color?: string }) {
  return <Ionicons name={name} size={size} color={color}/>;
}
function Steam({ index }: { index: number }) {
  const drift = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(Animated.sequence([
      Animated.delay(index * 220),
      Animated.timing(drift, { toValue: 1, duration: 1550, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      Animated.timing(drift, { toValue: 0, duration: 0, useNativeDriver: true }),
    ]));
    loop.start();
    return () => loop.stop();
  }, [drift, index]);
  return <Animated.View style={[styles.steam, { left: 19 + index * 15, transform: [{ translateY: drift.interpolate({ inputRange: [0, 1], outputRange: [6, -31] }) }, { translateX: drift.interpolate({ inputRange: [0, 1], outputRange: [0, index % 2 ? 7 : -7] }) }], opacity: drift.interpolate({ inputRange: [0, .3, 1], outputRange: [0, .7, 0] }) }]}/>;
}
function Loading({ onSkip }: { onSkip: () => void }) {
  const enter = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(enter, { toValue: 1, duration: 900, useNativeDriver: true }).start();
    // Keep the opening short; do not block navigation while images download.
    const timer = setTimeout(onSkip, 2300);
    return () => clearTimeout(timer);
  }, [enter, onSkip]);
  return <View style={styles.loading}>
    <Animated.View style={{ alignItems: 'center', opacity: enter, transform: [{ scale: enter.interpolate({ inputRange: [0, 1], outputRange: [.88, 1] }) }] }}>
      <View style={styles.steamArea}><Steam index={0}/><Steam index={1}/><Steam index={2}/></View>
      <Icon name="cafe" color="#F4E6D4" size={72}/>
      <Text style={styles.loadBrand}>CIDOCA</Text><Text style={styles.loadSub}>CAFETERIA</Text>
      <Text style={styles.loadCopy}>Seu momento merece um bom café.</Text>
    </Animated.View>
    <View style={styles.loadingLine}><Animated.View style={[styles.loadingFill, { transform: [{ scaleX: enter }] }]}/></View>
  </View>;
}
function ProductCard({ product, width, onOpen }: { product: Product; width: number; onOpen: () => void }) {
  return <Pressable style={[styles.productCard, { width }]} onPress={onOpen}>
    <View style={styles.productPhotoArea}>
      <Image source={{ uri: product.image }} style={styles.productPhoto} resizeMode="cover"/>
      {product.tag ? <View style={styles.tag}><Text style={styles.tagText}>{product.tag}</Text></View> : null}
    </View>
    <View style={styles.cardBody}>
      <Text style={styles.productTitle} numberOfLines={1}>{product.name}</Text>
      <Text style={styles.productDescription} numberOfLines={2}>{product.description}</Text>
      <View style={styles.ratingRow}><Icon name="star" size={12} color="#B57A37"/><Text style={styles.rating}>{product.rating} • Avaliado por clientes</Text></View>
      <View style={styles.cardBottom}><Text style={styles.price} numberOfLines={1}>{brl(product.price)}</Text><View style={styles.addRound}><Icon name="add" color="white" size={19}/></View></View>
    </View>
  </Pressable>;
}
export default function App() {
  const { width } = useWindowDimensions();
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState('Início');
  const [category, setCategory] = useState('Todos');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [notice, setNotice] = useState(false);
  const cardWidth = Math.max(140, Math.min(190, (width - 50) / 2.65));
  const results = products.filter(p => (category === 'Todos' || category === p.category) && (p.name + ' ' + p.description).toLowerCase().includes(search.trim().toLowerCase()));
  const open = (p: Product) => { setQty(1); setSelected(p); };
  const add = (p: Product, amount = 1) => { setCartCount(c => c + amount); setCartTotal(t => t + amount * p.price); setSelected(null); };
  if (!ready) return <Loading onSkip={() => setReady(true)}/>;
  return <SafeAreaView style={styles.root}><StatusBar barStyle="dark-content" backgroundColor={COLOR.cream}/>
    {selected ? <View style={styles.flex}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 104 }}>
        <ImageBackground source={{ uri: selected.image }} style={[styles.detailHero, { height: Math.min(390, width * .85) }]}>
          <LinearGradient colors={['rgba(0,0,0,.37)', 'transparent']} style={StyleSheet.absoluteFill}/>
          <Pressable style={styles.back} onPress={() => setSelected(null)}><Icon name="arrow-back" color="white"/></Pressable>
        </ImageBackground>
        <View style={styles.detailContents}><Text style={styles.detailCategory}>CIDOCA • {selected.category.toUpperCase()}</Text><Text style={styles.detailName}>{selected.name}</Text><View style={styles.ratingRow}><Icon name="star" size={15} color="#B57A37"/><Text style={styles.detailRating}> {selected.rating} • Preparado com carinho</Text></View><Text style={styles.detailDescription}>{selected.description}. Ingredientes selecionados para acompanhar o seu melhor momento.</Text><View style={styles.detailDivider}/><Text style={styles.detailLabel}>Quantidade</Text><View style={styles.quantity}><Pressable onPress={() => setQty(q => Math.max(1, q - 1))} style={styles.quantityIcon}><Icon name="remove"/></Pressable><Text style={styles.quantityText}>{qty}</Text><Pressable onPress={() => setQty(q => q + 1)} style={styles.quantityIcon}><Icon name="add"/></Pressable></View></View>
      </ScrollView>
      <View style={styles.detailBottom}><Pressable style={styles.addCartButton} onPress={() => add(selected, qty)}><Icon name="bag-add-outline" color="white"/><Text style={styles.addCartText}>Adicionar ao pedido</Text><Text style={styles.addCartText}>{brl(selected.price * qty)}</Text></Pressable></View>
    </View> : <View style={styles.flex}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Pressable onPress={() => setNotice(v => !v)} style={styles.iconTap}><Icon name="menu-outline" size={27}/></Pressable>
          <View style={styles.brand}><Icon name="cafe" size={22} color={COLOR.coffee}/><Text style={styles.brandName}>CIDOCA</Text><View style={styles.brandSubline}><View style={styles.littleLine}/><Text style={styles.brandSmall}>CAFETERIA</Text><View style={styles.littleLine}/></View></View>
          <View style={styles.headerRight}><Pressable onPress={() => setNotice(v => !v)} style={styles.iconTap}><Icon name="notifications-outline" size={23}/><View style={styles.badge}><Text style={styles.badgeText}>1</Text></View></Pressable><Pressable onPress={() => setTab('Pedido')} style={styles.iconTap}><Icon name="cart-outline" size={24}/>{cartCount > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{cartCount}</Text></View>}</Pressable></View>
        </View>
        {notice && <View style={styles.notice}><Text style={styles.noticeText}>Bem-vindo à Cafeteria CIDOCA! Faça seu pedido com carinho.</Text></View>}
        {tab === 'Pedido' ? <View style={styles.emptyPage}><Icon name="bag-handle-outline" color={COLOR.coffee} size={43}/><Text style={styles.emptyTitle}>Seu pedido</Text><Text style={styles.emptyText}>{cartCount ? `${cartCount} item(ns) • ${brl(cartTotal)}` : 'Seu carrinho está vazio por enquanto.'}</Text><Text style={styles.emptyText}>Pagamento e entrega serão adicionados em breve.</Text><Pressable style={styles.primaryAction} onPress={() => setTab('Início')}><Text style={styles.primaryText}>Ver o cardápio</Text></Pressable></View> :
        tab === 'Recompensas' || tab === 'Perfil' ? <View style={styles.emptyPage}><Icon name={tab === 'Perfil' ? 'person-circle-outline' : 'gift-outline'} color={COLOR.coffee} size={45}/><Text style={styles.emptyTitle}>{tab}</Text><Text style={styles.emptyText}>Estamos preparando esta área para você.</Text><Pressable style={styles.primaryAction} onPress={() => setTab('Início')}><Text style={styles.primaryText}>Voltar ao início</Text></Pressable></View> : <>
        <View style={styles.searchRow}><View style={styles.searchBox}><Icon name="search-outline" size={21}/><TextInput style={styles.searchInput} placeholder="Buscar cafés, lanches e mais..." placeholderTextColor="#96877E" value={search} onChangeText={setSearch} returnKeyType="search"/></View><Pressable style={styles.filter} onPress={() => setCategory(category === 'Todos' ? 'Cafés' : 'Todos')}><Icon name="options-outline" size={22}/></Pressable></View>
        {tab === 'Início' && !search ? <Pressable style={[styles.hero, { height: Math.min(248, Math.max(190, width * .52)) }]} onPress={() => open(products[0])}>
          <ImageBackground source={{ uri: photos.coffee }} style={StyleSheet.absoluteFill} imageStyle={{ borderRadius: 25 }}>
            <LinearGradient colors={['rgba(19,9,5,.91)', 'rgba(28,13,6,.55)', 'rgba(30,10,0,.10)']} locations={[0, .55, 1]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[StyleSheet.absoluteFill, { borderRadius: 25 }]}/>
          </ImageBackground>
          <View style={styles.heroContent}><Text style={styles.heroScript}>Bom café</Text><Text style={styles.heroTitle}>Bons momentos</Text><Text style={styles.heroCopy}>Feito com carinho para{ '\n' }aquecer o seu dia.</Text><View style={styles.heroAction}><Text style={styles.heroActionText}>PEDIR AGORA</Text><View style={styles.heroActionIcon}><Icon name="arrow-forward" color={COLOR.coffee} size={17}/></View></View></View>
          <View style={styles.heroDots}><View style={styles.heroDotActive}/><View style={styles.heroDot}/><View style={styles.heroDot}/></View>
        </Pressable> : null}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>{groups.map(g => <Pressable key={g.title} onPress={() => setCategory(g.match)} style={styles.categoryItem}><View style={[styles.categoryCircle, category === g.match && styles.categoryCircleActive]}><Icon name={g.icon} size={26} color={category === g.match ? 'white' : COLOR.coffee}/></View><Text style={styles.categoryText} numberOfLines={1}>{g.title}</Text></Pressable>)}</ScrollView>
        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{search ? 'Resultados' : category === 'Todos' ? 'Queridinhos da casa' : category}</Text><Pressable onPress={() => { setShowAll(v => !v); setCategory('Todos'); }}><Text style={styles.seeAll}>{showAll ? 'Ver menos' : 'Ver tudo'}　→</Text></Pressable></View>
        {results.length ? showAll || search || category !== 'Todos' ? <View style={[styles.grid, { paddingHorizontal: 16 }]}>{results.map(p => <ProductCard key={p.id} product={p} width={(width - 42) / 2} onOpen={() => open(p)}/>)}</View> : <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productList}>{results.map(p => <ProductCard key={p.id} product={p} width={cardWidth} onOpen={() => open(p)}/>)}</ScrollView> : <View style={styles.noResults}><Text style={styles.emptyText}>Nenhum produto encontrado.</Text><Pressable onPress={() => { setSearch(''); setCategory('Todos'); }}><Text style={styles.reset}>Limpar filtros</Text></Pressable></View>}
        {tab === 'Início' && !search && <Pressable style={styles.weekend} onPress={() => open(products[3])}><Image source={{ uri: photos.iced }} style={styles.weekendPhoto}/><View style={styles.weekendCopy}><Text style={styles.weekendOverline}>ESPECIAL DA SEMANA</Text><Text style={styles.weekendTitle}>Uma pausa{ '\n' }mais gostosa</Text><Text style={styles.weekendDesc}>Experimente o nosso café gelado</Text><View style={styles.weekendCTA}><Text style={styles.weekendCTAText}>CONHECER　→</Text></View></View></Pressable>}
        </>}
      </ScrollView>
      <View style={styles.bottomNav}>{([{ title: 'Início', icon: 'home-outline' }, { title: 'Cardápio', icon: 'book-outline' }, { title: 'Pedido', icon: 'cafe-outline' }, { title: 'Recompensas', icon: 'gift-outline' }, { title: 'Perfil', icon: 'person-outline' }] as { title: string; icon: IconName }[]).map(i => <Pressable onPress={() => { setTab(i.title); if (i.title === 'Cardápio') { setShowAll(true); setCategory('Todos'); } else if (i.title === 'Início') setShowAll(false); }} key={i.title} style={[styles.tabItem, i.title === 'Pedido' && styles.tabCenter]}><Icon name={i.icon} color={i.title === 'Pedido' ? 'white' : tab === i.title ? COLOR.brown : COLOR.text} size={i.title === 'Pedido' ? 27 : 23}/><Text numberOfLines={1} style={[styles.tabLabel, i.title === 'Pedido' && { color: 'white' }, tab === i.title && i.title !== 'Pedido' && { color: COLOR.brown, fontWeight: '700' }]}>{i.title}</Text></Pressable>)}</View>
    </View>}
  </SafeAreaView>;
}
const styles = StyleSheet.create({
  flex: { flex: 1 }, root: { flex: 1, backgroundColor: COLOR.cream }, scrollContent: { paddingBottom: 112 }, row: { flexDirection: 'row' },
  header: { height: 89, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 17 }, iconTap: { width: 33, height: 42, alignItems: 'center', justifyContent: 'center' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 7 }, brand: { alignItems: 'center', marginLeft: 35 }, brandName: { color: COLOR.coffee, fontFamily: 'serif', fontSize: 26, fontWeight: '700', letterSpacing: -.7, lineHeight: 30 }, brandSubline: { flexDirection: 'row', alignItems: 'center', gap: 6 }, brandSmall: { color: COLOR.coffee, fontSize: 8, letterSpacing: 2.1, fontWeight: '700' }, littleLine: { width: 13, height: 1, backgroundColor: COLOR.coffee },
  badge: { backgroundColor: COLOR.coffee, borderRadius: 9, minWidth: 15, height: 15, position: 'absolute', right: 0, top: 3, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 2 }, badgeText: { fontSize: 9, fontWeight: '700', color: 'white' },
  notice: { marginHorizontal: 17, marginBottom: 8, padding: 12, backgroundColor: '#EDE4D9', borderRadius: 12 }, noticeText: { color: COLOR.coffee, fontSize: 12 },
  searchRow: { flexDirection: 'row', marginHorizontal: 16, gap: 10, marginBottom: 15 }, searchBox: { flex: 1, minWidth: 0, height: 49, borderRadius: 26, backgroundColor: 'white', borderWidth: 1, borderColor: COLOR.line, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, gap: 10, elevation: 2 }, searchInput: { flex: 1, minWidth: 0, color: COLOR.text, fontSize: 13, height: 47 }, filter: { width: 49, height: 49, borderRadius: 25, backgroundColor: 'white', borderWidth: 1, borderColor: COLOR.line, alignItems: 'center', justifyContent: 'center', elevation: 2 },
  hero: { marginHorizontal: 16, borderRadius: 25, overflow: 'hidden', justifyContent: 'center' }, heroContent: { marginLeft: 22, width: '75%' }, heroScript: { color: '#E2C4A6', fontFamily: 'serif', fontSize: 20, fontStyle: 'italic' }, heroTitle: { color: '#FFF8EF', fontFamily: 'serif', fontSize: 28, fontWeight: '700', marginTop: 1 }, heroCopy: { color: '#FAF4EF', fontSize: 12, lineHeight: 18, marginTop: 8 }, heroAction: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 13, backgroundColor: COLOR.coffee, borderRadius: 24, paddingLeft: 16, paddingRight: 6, height: 34, marginTop: 15 }, heroActionText: { color: 'white', fontSize: 10, fontWeight: '800', letterSpacing: .5 }, heroActionIcon: { width: 24, height: 24, borderRadius: 14, backgroundColor: '#FFF6EA', alignItems: 'center', justifyContent: 'center' }, heroDots: { position: 'absolute', bottom: 10, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 5 }, heroDot: { width: 6, height: 6, borderRadius: 5, backgroundColor: '#C0ADA2' }, heroDotActive: { width: 7, height: 7, borderRadius: 5, backgroundColor: 'white' },
  categories: { paddingHorizontal: 13, paddingTop: 19, paddingBottom: 12, gap: 8 }, categoryItem: { alignItems: 'center', width: 65, gap: 6 }, categoryCircle: { width: 56, height: 56, borderRadius: 30, backgroundColor: '#FDFBF8', borderWidth: 1, borderColor: COLOR.line, alignItems: 'center', justifyContent: 'center', elevation: 2 }, categoryCircleActive: { backgroundColor: COLOR.coffee, borderColor: COLOR.coffee }, categoryText: { fontSize: 11, color: COLOR.text, fontWeight: '500', maxWidth: 64 },
  sectionHeader: { marginHorizontal: 16, marginTop: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, sectionTitle: { color: COLOR.text, fontSize: 18, letterSpacing: -.5, fontWeight: '800', flexShrink: 1 }, seeAll: { color: COLOR.brown, fontSize: 12, marginLeft: 8 },
  productList: { paddingHorizontal: 16, gap: 9, paddingBottom: 6 }, grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingBottom: 8 }, productCard: { backgroundColor: COLOR.paper, borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: COLOR.line, elevation: 2 }, productPhotoArea: { width: '100%', height: 118, backgroundColor: '#E6D7C7' }, productPhoto: { width: '100%', height: '100%' }, tag: { position: 'absolute', top: 8, left: 8, backgroundColor: COLOR.coffee, paddingHorizontal: 7, paddingVertical: 4, borderRadius: 7 }, tagText: { color: 'white', fontSize: 8, fontWeight: '800' },
  cardBody: { padding: 9, minHeight: 113 }, productTitle: { fontSize: 12, fontWeight: '800', color: COLOR.text }, productDescription: { fontSize: 10, lineHeight: 13, color: COLOR.soft, height: 28, marginTop: 3 }, ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 }, rating: { color: COLOR.soft, fontSize: 9, flexShrink: 1 }, cardBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6, gap: 2 }, price: { color: COLOR.text, fontSize: 14, fontWeight: '800', flexShrink: 1 }, addRound: { width: 26, height: 26, borderRadius: 14, backgroundColor: COLOR.coffee, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  weekend: { height: 125, backgroundColor: '#EADCCF', marginHorizontal: 16, marginTop: 15, borderRadius: 18, overflow: 'hidden' }, weekendPhoto: { position: 'absolute', right: 0, height: '100%', width: '43%' }, weekendCopy: { paddingTop: 12, paddingLeft: 18, width: '70%' }, weekendOverline: { fontSize: 9, color: COLOR.brown, letterSpacing: .8, fontWeight: '800' }, weekendTitle: { fontFamily: 'serif', fontSize: 23, lineHeight: 24, color: COLOR.coffee }, weekendDesc: { color: COLOR.coffee, fontSize: 10, marginTop: 4 }, weekendCTA: { alignSelf: 'flex-start', marginTop: 7, backgroundColor: COLOR.coffee, borderRadius: 14, paddingVertical: 4, paddingHorizontal: 10 }, weekendCTAText: { color: 'white', fontSize: 9, fontWeight: '700' },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 78, backgroundColor: '#FFFCF8', borderTopLeftRadius: 22, borderTopRightRadius: 22, borderTopWidth: 1, borderColor: COLOR.line, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 6 }, tabItem: { minWidth: 0, flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4 }, tabCenter: { flex: 0, width: 71, height: 71, borderRadius: 38, backgroundColor: COLOR.coffee, marginTop: -24, borderWidth: 3, borderColor: COLOR.cream, elevation: 6 }, tabLabel: { fontSize: 9, color: COLOR.text },
  noResults: { padding: 30, alignItems: 'center' }, reset: { color: COLOR.brown, fontWeight: '800', marginTop: 10 }, emptyPage: { margin: 20, alignItems: 'center', paddingVertical: 70, gap: 12 }, emptyTitle: { fontSize: 24, color: COLOR.text, fontWeight: '800' }, emptyText: { color: COLOR.soft, fontSize: 13, textAlign: 'center' }, primaryAction: { marginTop: 17, paddingHorizontal: 25, paddingVertical: 12, backgroundColor: COLOR.coffee, borderRadius: 25 }, primaryText: { color: 'white', fontWeight: '700' },
  detailHero: { width: '100%' }, back: { position: 'absolute', top: 18, left: 18, width: 42, height: 42, borderRadius: 23, backgroundColor: '#0006', alignItems: 'center', justifyContent: 'center' }, detailContents: { padding: 21 }, detailCategory: { color: COLOR.brown, fontWeight: '800', fontSize: 11, letterSpacing: 1 }, detailName: { color: COLOR.text, fontWeight: '800', fontSize: 29, marginTop: 5 }, detailRating: { color: COLOR.soft, fontSize: 12 }, detailDescription: { color: COLOR.soft, fontSize: 14, lineHeight: 23, marginTop: 17 }, detailDivider: { height: 1, backgroundColor: COLOR.line, marginVertical: 21 }, detailLabel: { fontSize: 15, color: COLOR.text, fontWeight: '700' }, quantity: { flexDirection: 'row', alignItems: 'center', gap: 22, marginTop: 15 }, quantityIcon: { width: 38, height: 38, backgroundColor: '#E8DED2', borderRadius: 19, justifyContent: 'center', alignItems: 'center' }, quantityText: { fontSize: 18, fontWeight: '800', color: COLOR.text }, detailBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: COLOR.paper, padding: 15, borderTopWidth: 1, borderColor: COLOR.line }, addCartButton: { height: 54, borderRadius: 17, backgroundColor: COLOR.coffee, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', gap: 8, paddingHorizontal: 10 }, addCartText: { color: 'white', fontSize: 13, fontWeight: '800' },
  loading: { flex: 1, backgroundColor: '#32190F', justifyContent: 'center', alignItems: 'center' }, steamArea: { width: 78, height: 51, position: 'relative', marginBottom: 3 }, steam: { position: 'absolute', bottom: 0, height: 36, width: 6, borderRadius: 8, backgroundColor: '#EAD7C2' }, loadBrand: { color: '#FFF8EF', fontFamily: 'serif', fontSize: 45, fontWeight: '700', letterSpacing: 4, marginTop: 12 }, loadSub: { color: '#E8D1B9', fontSize: 11, fontWeight: '700', letterSpacing: 5 }, loadCopy: { color: '#DCC3AD', fontSize: 12, marginTop: 28 }, loadingLine: { position: 'absolute', bottom: 86, width: 110, height: 3, borderRadius: 3, backgroundColor: '#6C4A37', overflow: 'hidden' }, loadingFill: { width: '100%', height: '100%', backgroundColor: '#F5E3CF' },
});
