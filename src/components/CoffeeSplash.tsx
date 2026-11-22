import React,{useEffect,useRef} from 'react';
import {Animated,Easing,StyleSheet,Text,View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {colors as c,font} from '../theme/tokens';
import {Icon} from './Ui';
function Vapor({delay,offset}:{delay:number;offset:number}){
 const a=useRef(new Animated.Value(0)).current;
 useEffect(()=>{const loop=Animated.loop(Animated.sequence([Animated.delay(delay),Animated.timing(a,{toValue:1,duration:1500,easing:Easing.out(Easing.sin),useNativeDriver:true}),Animated.timing(a,{toValue:0,duration:0,useNativeDriver:true})]));loop.start();return()=>loop.stop()},[a,delay]);
 return <Animated.View style={[s.vapor,{left:offset,opacity:a.interpolate({inputRange:[0,.3,.8,1],outputRange:[0,.65,.3,0]}),transform:[{translateY:a.interpolate({inputRange:[0,1],outputRange:[10,-36]})},{translateX:a.interpolate({inputRange:[0,1],outputRange:[0,offset%2?7:-6]})}]}]}/>;
}
export function CoffeeSplash({onDone}:{onDone:()=>void}){
 const opacity=useRef(new Animated.Value(0)).current;const rise=useRef(new Animated.Value(20)).current;
 useEffect(()=>{const anim=Animated.parallel([Animated.timing(opacity,{toValue:1,duration:780,easing:Easing.out(Easing.quad),useNativeDriver:true}),Animated.timing(rise,{toValue:0,duration:850,easing:Easing.out(Easing.cubic),useNativeDriver:true})]);anim.start();const id=setTimeout(onDone,2100);return()=>{clearTimeout(id);anim.stop()}},[opacity,rise,onDone]);
 return <LinearGradient colors={['#23110B','#452718','#28130D']} style={s.root}><Animated.View style={[s.center,{opacity,transform:[{translateY:rise}]}]}><View style={s.steamWrap}><Vapor delay={0} offset={14}/><Vapor delay={190} offset={32}/><Vapor delay={380} offset={50}/></View><View style={s.ring}><Icon name="cafe-outline" color="#F4E4D3" size={64}/></View><Text style={s.logo}>CIDOCA</Text><Text style={s.caption}>C A F E T E R I A</Text><View style={s.hairline}/><Text style={s.tagline}>Um momento só seu.</Text></Animated.View><View style={s.foot}><View style={s.progress}/><Text style={s.footText}>PREPARANDO SEU CAFÉ</Text></View></LinearGradient>
}
const s=StyleSheet.create({root:{flex:1,justifyContent:'center',alignItems:'center'},center:{alignItems:'center'},steamWrap:{height:56,width:70,position:'relative'},vapor:{position:'absolute',bottom:3,width:5,height:32,borderRadius:7,backgroundColor:'#F2D5BC'},ring:{width:120,height:120,borderRadius:60,borderColor:'#987256',borderWidth:1,alignItems:'center',justifyContent:'center'},logo:{fontFamily:font.display,fontSize:42,color:'#F8EDE0',letterSpacing:3,marginTop:24},caption:{fontFamily:font.bold,fontSize:10,color:'#DABF9E',letterSpacing:2},hairline:{height:1,width:44,backgroundColor:'#B68B63',marginTop:25},tagline:{fontFamily:font.body,fontSize:14,color:'#E4CDB6',marginTop:19},foot:{position:'absolute',bottom:64,alignItems:'center',gap:14},progress:{width:38,height:2,borderRadius:2,backgroundColor:'#D9B58E'},footText:{fontFamily:font.semibold,color:'#BFA88F',fontSize:9,letterSpacing:2}});
