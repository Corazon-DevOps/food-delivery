import React,{useEffect,useMemo,useState} from 'react';
import {Image,ImageBackground,Pressable,StyleSheet,Text,TextInput,useWindowDimensions,View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {colors as c,font,currency} from '../theme/tokens';
import {products,promotions,Product} from '../data/catalog';
import {Icon} from '../components/Ui';

const categories=[
 {name:'Cafés',icon:'cafe-outline' as const},
 {name:'Padaria',icon:'nutrition-outline' as const},
 {name:'Salgados',icon:'layers-outline' as const},
 {name:'Doces',icon:'ice-cream-outline' as const},
 {name:'Bebidas',icon:'wine-outline' as const},
 {name:'Mais',icon:'ellipse-outline' as const},
];
const promos=[
 {...promotions[0],lead:'Bom café',headline:'Boas vibrações'},
 {...promotions[1],lead:'Uma pausa',headline:'Refrescante'},
 {...promotions[2],lead:'Feito com amor',headline:'Momentos doces'},
];
export function HomeScreen({onOpen,onMenu,availableHeight}:{onOpen:(p:Product)=>void;onMenu:()=>void;availableHeight:number}){
 const {width}=useWindowDimensions();
 const [current,setCurrent]=useState(0);
 const [query,setQuery]=useState('');
 const [category,setCategory]=useState('Cafés');
 useEffect(()=>{const timer=setInterval(()=>setCurrent(v=>(v+1)%promos.length),5200);return()=>clearInterval(timer)},[]);
 const compact=availableHeight<665;
 const short=availableHeight<565;
 const gap=compact?7:11;
 const bannerHeight=Math.max(145,Math.min(short?160:compact?190:224,availableHeight*.31));
 const categoryHeight=compact?72:83;
 const cardHeight=Math.max(158,Math.min(220,availableHeight-(bannerHeight+categoryHeight+(compact?218:240))));
 const promoHeight=short?72:compact?91:108;
 const cardWidth=(width-32-14)/3;
 const shown=useMemo(()=>{
  const search=query.trim().toLocaleLowerCase('pt-BR');
  const all=search?products.filter(p=>(p.name+' '+p.description).toLocaleLowerCase('pt-BR').includes(search)):products;
  return all.slice(0,3);
 },[query]);
 const promo=promos[current];
 const product=products.find(p=>p.id===promo.id)||products[0];
 return <View style={s.root}>
   <View style={[s.searchRow,{marginBottom:gap}]}>
     <View style={s.searchBox}><Icon name="search-outline" color={c.ink} size={21}/><TextInput value={query} onChangeText={setQuery} placeholder="Buscar cafés, lanches e mais..." placeholderTextColor="#867C74" style={s.searchInput}/></View>
     <Pressable onPress={onMenu} style={s.filter} accessibilityLabel="Abrir cardápio e filtros"><Icon name="options-outline" size={21} color={c.ink}/></Pressable>
   </View>
   <View style={[s.banner,{height:bannerHeight,marginBottom:gap}]}>
    <Pressable onPress={()=>onOpen(product)} style={StyleSheet.absoluteFill}>
      <ImageBackground source={{uri:promo.image}} resizeMode="cover" style={StyleSheet.absoluteFill}>
       <LinearGradient colors={['rgba(20,9,5,.95)','rgba(20,9,5,.65)','rgba(20,9,5,.01)']} locations={[0,.46,1]} start={{x:0,y:0}} end={{x:1,y:0}} style={StyleSheet.absoluteFill}/>
      </ImageBackground>
      <View style={s.heroWords}>
        <Text style={[s.script,{fontSize:short?17:20}]} numberOfLines={1}>{promo.lead}</Text>
        <Text style={[s.heroHeadline,{fontSize:short?23:compact?27:31,lineHeight:short?26:compact?31:34}]} numberOfLines={2}>{promo.headline}</Text>
        <Text style={s.heroDesc} numberOfLines={3}>{promo.subtitle}{'\n'}Preparado para seu dia.</Text>
        <View style={s.heroCta}><Text style={s.heroCtaText}>PEDIR AGORA</Text><View style={s.heroArrow}><Icon name="arrow-forward" size={15} color={c.espresso}/></View></View>
      </View>
    </Pressable>
    <View style={s.dots}>{promos.map((item,i)=><Pressable key={item.id} onPress={()=>setCurrent(i)} style={[s.dot,current===i&&s.dotActive]} accessibilityLabel={'Mostrar promoção '+(i+1)}/>)}</View>
   </View>
   <View style={[s.categories,{height:categoryHeight,marginBottom:gap}]}>
     {categories.map(cat=><Pressable key={cat.name} onPress={()=>{setCategory(cat.name);onMenu()}} style={s.category} accessibilityLabel={'Explorar '+cat.name}>
       <View style={[s.categoryCircle,category===cat.name&&s.categorySelected]}><Icon name={cat.icon} color={category===cat.name?c.white:c.espresso} size={compact?22:25}/></View>
       <Text style={s.categoryLabel} numberOfLines={1}>{cat.name}</Text>
     </Pressable>)}
   </View>
   <View style={[s.section,{marginBottom:gap-2}]}>
    <Text style={s.sectionTitle}>Mais pedidos</Text>
    <Pressable onPress={onMenu} style={s.seeAll}><Text style={s.seeAllText}>Ver tudo</Text><Icon name="arrow-forward" size={14} color={c.espresso}/></Pressable>
   </View>
   <View style={[s.cards,{height:cardHeight,marginBottom:gap}]}>
    {shown.map((p,i)=><Pressable key={p.id} onPress={()=>onOpen(p)} style={[s.card,{width:cardWidth}]}>
      <View style={[s.cardImageFrame,{height:Math.round(cardHeight*.49)}]}>
       <Image source={{uri:p.image}} style={s.cardImage} resizeMode="cover"/>
       <View style={s.cardTag}><Text style={s.cardTagText}>{i===0?'MAIS PEDIDO':i===1?'DA CASA':'POPULAR'}</Text></View>
      </View>
      <View style={s.cardContent}>
        <Text style={s.cardName} numberOfLines={2}>{p.name}</Text>
        {!short&&<Text style={s.cardDescription} numberOfLines={2}>{p.description}</Text>}
        <View style={s.rating}><Icon name="star" size={11} color="#AE7A3E"/><Text style={s.ratingText}>{p.rating} (1,2 mil+)</Text></View>
        <View style={s.cardFooter}><Text style={s.cardPrice} numberOfLines={1}>{currency(p.price)}</Text><View style={s.plus}><Icon name="add" size={17} color={c.white}/></View></View>
      </View>
    </Pressable>)}
    {shown.length===0&&<Text style={s.empty}>Nenhum produto encontrado.</Text>}
   </View>
   <Pressable onPress={()=>onOpen(products.find(p=>p.id==='ice')||products[0])} style={[s.secondBanner,{height:promoHeight}]}>
    <Image source={{uri:products.find(p=>p.id==='ice')?.image}} style={s.promoPhoto} resizeMode="cover"/>
    <LinearGradient colors={['#F1E2D1','#EEDACA','rgba(238,218,202,.05)']} start={{x:0,y:0}} end={{x:1,y:0}} locations={[0,.6,1]} style={StyleSheet.absoluteFill}/>
    <View style={s.promoCopy}><Text style={s.promoKicker}>ESPECIAL DA SEMANA</Text><Text style={[s.promoTitle,{fontSize:short?19:25}]}>20% OFF</Text><Text style={s.promoDesc} numberOfLines={1}>Em cafés selecionados</Text><View style={s.promoButton}><Text style={s.promoButtonText}>CONFERIR  →</Text></View></View>
    <View style={s.discount}><Text style={s.discountValue}>20%</Text><Text style={s.discountLabel}>OFF</Text></View>
   </Pressable>
 </View>
}
const s=StyleSheet.create({
 root:{flex:1,paddingHorizontal:16,paddingTop:1,overflow:'hidden'},
 searchRow:{height:44,flexDirection:'row',gap:8},
 searchBox:{flex:1,minWidth:0,backgroundColor:'#FFFFFF',borderRadius:25,borderWidth:1,borderColor:'#E7DFD9',flexDirection:'row',alignItems:'center',paddingHorizontal:15,gap:11,elevation:1},
 searchInput:{flex:1,minWidth:0,fontFamily:font.body,fontSize:12,color:c.ink,paddingVertical:0},
 filter:{width:44,height:44,borderRadius:24,backgroundColor:'#FFFFFF',borderWidth:1,borderColor:'#E9E0D9',alignItems:'center',justifyContent:'center',elevation:2},
 banner:{overflow:'hidden',borderRadius:24,backgroundColor:'#26160F'},
 heroWords:{position:'absolute',top:0,bottom:0,left:20,justifyContent:'center',width:'59%',paddingBottom:8},
 script:{fontFamily:font.display,color:'#F4DCC3',fontStyle:'italic',lineHeight:23},
 heroHeadline:{fontFamily:font.display,color:'#FFFFFF',letterSpacing:-.55,marginTop:1},
 heroDesc:{fontFamily:font.body,fontSize:11,color:'#F8EDE2',lineHeight:15,marginTop:6},
 heroCta:{marginTop:12,alignSelf:'flex-start',flexDirection:'row',alignItems:'center',borderRadius:25,backgroundColor:c.espresso,height:33,paddingLeft:14,paddingRight:5,gap:12},
 heroCtaText:{fontFamily:font.bold,color:'#FFFFFF',fontSize:10,letterSpacing:.3},
 heroArrow:{width:24,height:24,borderRadius:15,backgroundColor:'#FFFFFF',alignItems:'center',justifyContent:'center'},
 dots:{position:'absolute',bottom:9,flexDirection:'row',alignSelf:'center',gap:5},
 dot:{width:6,height:6,borderRadius:4,backgroundColor:'#BCABA0'},
 dotActive:{backgroundColor:'#FFFFFF',width:7,height:7},
 categories:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:3},
 category:{flex:1,minWidth:0,alignItems:'center',justifyContent:'center',gap:5},
 categoryCircle:{width:48,height:48,borderRadius:27,borderWidth:1,borderColor:'#EBE3DC',backgroundColor:'#FFFFFF',alignItems:'center',justifyContent:'center',elevation:1},
 categorySelected:{backgroundColor:c.espresso,borderColor:c.espresso,elevation:3},
 categoryLabel:{fontFamily:font.medium,color:c.ink,fontSize:10},
 section:{height:30,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
 sectionTitle:{fontFamily:font.extra,color:c.ink,fontSize:17,letterSpacing:-.4},
 seeAll:{flexDirection:'row',alignItems:'center',gap:5},
 seeAllText:{fontFamily:font.medium,color:c.ink,fontSize:11},
 cards:{flexDirection:'row',gap:7,justifyContent:'space-between'},
 card:{backgroundColor:'#FFFFFF',borderRadius:13,borderWidth:1,borderColor:'#ECE5DE',overflow:'hidden',elevation:2},
 cardImageFrame:{width:'100%',backgroundColor:'#E2C5A9'},
 cardImage:{width:'100%',height:'100%'},
 cardTag:{position:'absolute',top:7,left:6,backgroundColor:c.espresso,borderRadius:7,paddingVertical:3,paddingHorizontal:5},
 cardTagText:{fontFamily:font.bold,color:'#FFFFFF',fontSize:7},
 cardContent:{flex:1,justifyContent:'space-between',paddingHorizontal:8,paddingTop:6,paddingBottom:7},
 cardName:{fontFamily:font.bold,color:c.ink,fontSize:11,lineHeight:13},
 cardDescription:{fontFamily:font.body,color:c.muted,fontSize:9,lineHeight:11},
 rating:{flexDirection:'row',alignItems:'center',gap:3},
 ratingText:{fontFamily:font.medium,fontSize:9,color:c.muted},
 cardFooter:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:2},
 cardPrice:{fontFamily:font.extra,fontSize:12,color:c.espresso,flexShrink:1},
 plus:{width:24,height:24,borderRadius:14,backgroundColor:c.espresso,alignItems:'center',justifyContent:'center'},
 secondBanner:{overflow:'hidden',borderRadius:16,backgroundColor:'#EFE0CF'},
 promoPhoto:{position:'absolute',right:0,top:0,bottom:0,width:'52%',height:'100%'},
 promoCopy:{paddingLeft:17,justifyContent:'center',height:'100%',width:'70%'},
 promoKicker:{fontFamily:font.bold,color:'#986840',fontSize:9,letterSpacing:.6},
 promoTitle:{fontFamily:font.display,color:c.espresso,lineHeight:27},
 promoDesc:{fontFamily:font.body,fontSize:10,color:c.ink},
 promoButton:{backgroundColor:c.espresso,alignSelf:'flex-start',paddingVertical:4,paddingHorizontal:11,borderRadius:15,marginTop:5},
 promoButtonText:{fontFamily:font.bold,fontSize:9,color:c.white},
 discount:{position:'absolute',right:10,top:10,width:50,height:50,borderRadius:28,backgroundColor:c.espresso,alignItems:'center',justifyContent:'center'},
 discountValue:{color:c.white,fontFamily:font.display,fontSize:17,lineHeight:19},
 discountLabel:{color:c.white,fontFamily:font.bold,fontSize:10},
 empty:{fontFamily:font.medium,color:c.muted,fontSize:12}
});