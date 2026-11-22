import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors as c, currency, font } from '../theme/tokens';
import { Product } from '../data/catalog';
export type IconName = React.ComponentProps<typeof Ionicons>['name'];
export const Icon = ({name,size=21,color=c.ink}:{name:IconName;size?:number;color?:string}) => <Ionicons name={name} size={size} color={color}/>;
export function Header({onBell,onMenu,unread,onCart,cart}:{onBell:()=>void;onMenu:()=>void;unread:number;onCart:()=>void;cart:number}){
 return <View style={s.header}>
  <Pressable style={s.iconButton} accessibilityLabel="Abrir cardápio" onPress={onMenu}><View style={s.hamburger}><View style={s.hamburgerStroke}/><View style={s.hamburgerStroke}/><View style={s.hamburgerStroke}/></View></Pressable>
  <View pointerEvents="none" style={s.brand}><Icon name="cafe-outline" size={19} color={c.coffee}/><Text style={s.brandText}>CIDOCA</Text><Text style={s.brandSub}>—  CAFETERIA  —</Text></View>
  <View style={s.actions}><Pressable accessibilityLabel="Notificações" onPress={onBell} style={s.iconButton}><Icon name="notifications-outline" size={23}/>{unread>0&&<View style={s.countDot}><Text style={s.countText}>{unread}</Text></View>}</Pressable><Pressable accessibilityLabel="Carrinho" onPress={onCart} style={s.iconButton}><Icon name="bag-handle-outline" size={23}/>{cart>0&&<View style={s.countDot}><Text style={s.countText}>{cart}</Text></View>}</Pressable></View>
 </View>
}
export function BottomNav({tab,onTab}:{tab:string;onTab:(tab:string)=>void}){
 const tabs:{name:string;icon:IconName;active:IconName}[]=[{name:'Início',icon:'home-outline',active:'home'},{name:'Cardápio',icon:'restaurant-outline',active:'restaurant'},{name:'Pedido',icon:'bag-outline',active:'bag'},{name:'Prêmios',icon:'gift-outline',active:'gift'},{name:'Perfil',icon:'person-outline',active:'person'}];
 return <View style={s.nav}>{tabs.map(t=>{const active=tab===t.name;const center=t.name==='Pedido';return <Pressable accessibilityLabel={t.name} key={t.name} onPress={()=>onTab(t.name)} style={[s.navItem,center&&s.navCenter]}><Icon name={center?'cafe-outline':active?t.active:t.icon} size={center?26:22} color={center?c.white:active?c.espresso:c.ink}/><Text numberOfLines={1} style={[s.navText,active&&s.navTextActive,center&&s.navTextCenter]}>{center?'Pedir':t.name}</Text></Pressable>})}</View>
}
export function ProductTile({item,onPress,width,height}:{item:Product;onPress:()=>void;width:number;height?:number}){
 return <Pressable onPress={onPress} style={[s.tile,{width,height}]}><View style={s.photoFrame}><Image style={s.photo} source={{uri:item.image}}/>{item.badge&&<Text style={s.badge}>{item.badge}</Text>}</View><View style={s.tileBody}><Text numberOfLines={1} style={s.tileName}>{item.name}</Text><View style={s.rating}><Icon name="star" color={c.gold} size={11}/><Text style={s.ratingText}>{item.rating} · CIDOCA</Text></View><View style={s.tileBottom}><Text numberOfLines={1} style={s.tilePrice}>{currency(item.price)}</Text><View style={s.tilePlus}><Icon name="add" size={17} color={c.white}/></View></View></View></Pressable>
}
export function PrimaryButton({label,onPress,amount,disabled=false}:{label:string;onPress:()=>void;amount?:string;disabled?:boolean}){
 return <Pressable disabled={disabled} onPress={onPress} style={[s.primary,disabled&&{opacity:.45}]}><Text style={s.primaryText}>{label}</Text>{amount&&<Text style={s.primaryAmount}>{amount}</Text>}<Icon name="arrow-forward" color={c.white} size={17}/></Pressable>
}
const s=StyleSheet.create({
 hamburger:{width:24,height:19,justifyContent:'space-between',paddingVertical:2},hamburgerStroke:{height:2,width:23,backgroundColor:c.ink,borderRadius:2},
 header:{height:80,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:16},brand:{position:'absolute',left:98,right:98,alignItems:'center',justifyContent:'center'},brandText:{fontFamily:font.display,fontSize:23,lineHeight:27,color:c.espresso,letterSpacing:.2},brandSub:{fontFamily:font.bold,color:c.coffee,fontSize:7,letterSpacing:2},actions:{flexDirection:'row',gap:3},iconButton:{width:35,height:44,alignItems:'center',justifyContent:'center'},countDot:{position:'absolute',right:1,top:4,borderRadius:10,minWidth:15,height:15,paddingHorizontal:2,alignItems:'center',justifyContent:'center',backgroundColor:c.espresso},countText:{color:c.white,fontSize:9,fontFamily:font.bold},
 nav:{height:66,borderTopWidth:1,borderColor:c.line,backgroundColor:c.surface,borderTopLeftRadius:22,borderTopRightRadius:22,flexDirection:'row',paddingHorizontal:7,alignItems:'center',justifyContent:'space-around',overflow:'visible'},
 navItem:{flex:1,minWidth:0,height:57,justifyContent:'center',alignItems:'center',gap:4,borderRadius:14},
 navCenter:{height:74,flex:0,flexBasis:73,borderRadius:40,marginTop:-28,backgroundColor:c.espresso,borderWidth:4,borderColor:c.surface,elevation:5},
 navText:{fontFamily:font.medium,fontSize:10,color:c.ink},
 navTextActive:{fontFamily:font.bold,color:c.espresso},
 navTextCenter:{color:c.white,fontFamily:font.medium,fontSize:10},
 tile:{backgroundColor:c.surface,borderRadius:17,borderWidth:1,borderColor:c.line,overflow:'hidden'},photoFrame:{height:'53%',minHeight:72,backgroundColor:c.latte},photo:{height:'100%',width:'100%'},badge:{position:'absolute',left:7,top:7,color:c.white,fontSize:8,fontFamily:font.bold,backgroundColor:c.espresso,overflow:'hidden',borderRadius:6,paddingHorizontal:6,paddingVertical:4},tileBody:{flex:1,justifyContent:'space-between',paddingHorizontal:10,paddingVertical:7},tileName:{fontFamily:font.bold,fontSize:12,color:c.ink},rating:{flexDirection:'row',alignItems:'center',gap:4},ratingText:{fontSize:10,color:c.muted,fontFamily:font.medium},tileBottom:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:3},tilePrice:{fontSize:13,color:c.espresso,fontFamily:font.extra,flexShrink:1},tilePlus:{width:25,height:25,borderRadius:13,alignItems:'center',justifyContent:'center',backgroundColor:c.coffee},
 primary:{height:51,borderRadius:15,backgroundColor:c.espresso,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:12,paddingHorizontal:16},primaryText:{color:c.white,fontFamily:font.bold,fontSize:13,flexShrink:1},primaryAmount:{color:'#F6E3CE',fontFamily:font.extra,fontSize:13,marginLeft:'auto'}
});
