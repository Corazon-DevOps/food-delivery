export type Product = { id:string; name:string; category:string; description:string; price:number; image:string; rating:string; badge?:string };
export type CartItem = { product:Product; quantity:number };
export const products:Product[] = [
 {id:'cap',name:'Cappuccino',category:'Cafés',description:'Expresso, leite cremoso e uma finalização delicada.',price:16.9,rating:'4,9',badge:'MAIS PEDIDO',image:'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=900&q=85'},
 {id:'muf',name:'Muffin de chocolate',category:'Doces',description:'Massa macia com chocolate intenso.',price:12.9,rating:'4,8',badge:'DA CASA',image:'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=900&q=85'},
 {id:'san',name:'Sanduíche artesanal',category:'Salgados',description:'Camadas frescas e pão dourado.',price:26.9,rating:'4,7',image:'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=900&q=85'},
 {id:'ice',name:'Café gelado',category:'Bebidas',description:'Expresso sobre gelo e leite fresco.',price:18.9,rating:'4,9',image:'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=900&q=85'},
 {id:'cro',name:'Croissant',category:'Padaria',description:'Folhado amanteigado e crocante.',price:14.9,rating:'4,8',image:'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=900&q=85'},
];
export const promotions = [
 {title:'Seu café, seu ritual.',eyebrow:'UM BOM DIA COMEÇA AQUI',subtitle:'A pausa que transforma o dia.',image:'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=85',id:'cap'},
 {title:'Gelado na medida.',eyebrow:'ESPECIAL DA CIDOCA',subtitle:'Mais frescor em cada gole.',image:'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1200&q=85',id:'ice'},
 {title:'Um momento doce.',eyebrow:'FEITO COM CARINHO',subtitle:'Pequenos prazeres da casa.',image:'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=1200&q=85',id:'muf'},
];
