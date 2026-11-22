import React,{useCallback,useMemo,useState} from 'react';
import {StatusBar,StyleSheet,View,useWindowDimensions} from 'react-native';
import {SafeAreaProvider,SafeAreaView} from 'react-native-safe-area-context';
import {useFonts} from 'expo-font';
import {DMSans_400Regular,DMSans_500Medium,DMSans_600SemiBold,DMSans_700Bold,DMSans_800ExtraBold} from '@expo-google-fonts/dm-sans';
import {PlayfairDisplay_600SemiBold,PlayfairDisplay_700Bold} from '@expo-google-fonts/playfair-display';
import {colors as c} from './src/theme/tokens';
import {CartItem,Product} from './src/data/catalog';
import {Header,BottomNav} from './src/components/Ui';
import {CoffeeSplash} from './src/components/CoffeeSplash';
import {ProductSheet} from './src/components/ProductSheet';
import {HomeScreen} from './src/screens/HomeScreen';
import {MenuScreen} from './src/screens/MenuScreen';
import {CheckoutScreen} from './src/screens/CheckoutScreen';
import {NotificationsScreen,Notice} from './src/screens/NotificationsScreen';
import {RewardsScreen} from './src/screens/RewardsScreen';
import {ProfileScreen} from './src/screens/ProfileScreen';
type Tab='Início'|'Cardápio'|'Pedido'|'Prêmios'|'Perfil'|'Avisos';
const initialNotices:Notice[]=[{id:'welcome',title:'Bem-vindo à CIDOCA',message:'Cada xícara guarda uma pausa especial. Descubra os sabores da casa.',time:'Agora',read:false,icon:'cafe-outline'},{id:'club',title:'Clube CIDOCA',message:'Estamos preparando vantagens para quem ama café.',time:'Novidades',read:false,icon:'gift-outline'}];
function Cidoca(){
 const {height}=useWindowDimensions();const [loaded]=useFonts({DMSans_400Regular,DMSans_500Medium,DMSans_600SemiBold,DMSans_700Bold,DMSans_800ExtraBold,PlayfairDisplay_600SemiBold,PlayfairDisplay_700Bold});
 const [splash,setSplash]=useState(true);const finish=useCallback(()=>setSplash(false),[]);
 const [tab,setTab]=useState<Tab>('Início');const [selected,setSelected]=useState<Product|null>(null);const [cart,setCart]=useState<CartItem[]>([]);const [notices,setNotices]=useState<Notice[]>(initialNotices);
 const count=cart.reduce((total,line)=>total+line.quantity,0);const unread=notices.filter(n=>!n.read).length;
 const addToCart=(product:Product,quantity:number)=>{setCart(lines=>{const found=lines.some(l=>l.product.id===product.id);return found?lines.map(l=>l.product.id===product.id?{...l,quantity:l.quantity+quantity}:l):[...lines,{product,quantity}]});setSelected(null);setTab('Pedido')};
 const changeCart=(product:Product,diff:number)=>setCart(lines=>lines.map(l=>l.product.id===product.id?{...l,quantity:Math.max(0,l.quantity+diff)}:l).filter(l=>l.quantity>0));
 const onTab=(name:string)=>setTab(name as Tab);const openMenu=()=>setTab('Cardápio');
 if(!loaded||splash)return <CoffeeSplash onDone={finish}/>;
 // The content height comes from flex after safe-area insets; proportional sizing uses a conservative screen estimate.
 const available=Math.max(400,height-210);
 return <SafeAreaView edges={['top','bottom','left','right']} style={s.safe}><StatusBar barStyle="dark-content" backgroundColor={c.background}/><Header onBell={()=>setTab('Avisos')} unread={unread} onCart={()=>setTab('Pedido')} cart={count}/><View style={s.content}>
 {tab==='Início'?<HomeScreen availableHeight={available} onMenu={openMenu} onOpen={setSelected}/>:tab==='Cardápio'?<MenuScreen availableHeight={available} onOpen={setSelected}/>:tab==='Pedido'?<CheckoutScreen availableHeight={available} items={cart} onChange={changeCart} onMenu={openMenu}/>:tab==='Prêmios'?<RewardsScreen onMenu={openMenu}/>:tab==='Perfil'?<ProfileScreen onNotice={()=>setTab('Avisos')}/>:<NotificationsScreen items={notices} onRead={id=>setNotices(v=>v.map(n=>n.id===id?{...n,read:true}:n))} onReadAll={()=>setNotices(v=>v.map(n=>({...n,read:true})))}/>}</View><BottomNav tab={tab} onTab={onTab}/><ProductSheet product={selected} onClose={()=>setSelected(null)} onAdd={addToCart}/></SafeAreaView>
}
export default function App(){return <SafeAreaProvider><Cidoca/></SafeAreaProvider>}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:c.background},content:{flex:1,minHeight:0}});
