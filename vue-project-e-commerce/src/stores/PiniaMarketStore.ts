import { ref,computed } from 'vue'
import { defineStore } from 'pinia'
import { ElNotification } from 'element-plus'
import VueCookies  from 'vue-cookies'

import axios from 'axios'

// c'est le type de donnée pour le fichier JSON Product.json
export type ProduitData =
{
   productId      : string,
   productName    : string,
   productEAN     : string,
   productPicture : string,
   productPrice   : number
   IsVisible      : Boolean // Pour le filtre
}

// Pour le panier de l'utilisateur
type UserMarket  =
{
  productNumber  : number
}

//  On fait un extend des types ProduitData et UserMarket
type UserMarketProduct = ProduitData & UserMarket;


// Pour la fonction GetProductById
type ProduitReturnType = 
{
   Produit:UserMarketProduct|undefined,
   Index:number | undefined
}

// le store du magasin
export const UseMarketStore = defineStore('marketstore',  () => {

  // Le market qui va contenir tout les articles (products.json)
  var  Market:any = ref<Array<ProduitData>>(Array<ProduitData>());

  // Le market qui va contenir tout les articles de l'utilisateur (products.json)
  var  MyBasket:any= ref<Array<UserMarketProduct>>(Array<UserMarketProduct>());

  // On crée une valeur précalculée qui sera appelée à chaque fois que le panier de l'utilisateur changera
  var totalPrice:any = computed(()=>{

    var totalprice = 0;
    
    // On multiple par le nombre de produit et par le prix du produit  pour chaque article dans le panier de l'utilisateur
    for(let p = 0;p < MyBasket.value.length;p++)
          totalprice += (MyBasket.value[p] as UserMarketProduct).productNumber * (MyBasket.value[p] as UserMarketProduct).productPrice
      
    return totalprice
  }
  
  )

  // On récupère le store de l'utilisateur
  const user_basket_data =  (VueCookies as any).get("UserBasket")

      // Si l'utilisateur avait un panier non vide, donc un cookie 'UserBasket' on le recupère
      if(user_basket_data != null)
            MyBasket.value = <Array<ProduitData>>user_basket_data

  // On utilise axios pour recupere les produit fournit dans le fichier products.json
  axios.get<Array<ProduitData>>("http://localhost:5173/products.json").then(r=>
  {
     for(let product of r.data)
     {
        // Pour le filtre plus tard, visible par défaut car aucun filtre n'est appliqué
        product.IsVisible = true;

        // On push les produit dans le Market
        Market.value.push(product);

      }

      return Market
  });  

  // Pour obtenir le produit & l'index dans le panier de l'utilisateur sinon renvoie undefined
  function GetProductById(Id:String) : ProduitReturnType | undefined 
  {
    for(let p = 0;p < MyBasket.value.length;p++)
    {
      if(MyBasket.value[p].productId == Id)
        return <ProduitReturnType>{Produit:MyBasket.value[p], Index: p};
    }

    return undefined;
  }

  // Pour ajouter un produit dans le panier de l'utilisateur
  const AddProductOnMyBasek = (Produit:ProduitData) => {

    let produit_data:ProduitData|ProduitReturnType|undefined = GetProductById(Produit.productId);

    console.log(`Ajout du produit ${Produit.productName} `);
   
    // Si c'est undefine, cela veut dire que le produit 
    // n'est pas encore dans le panier de l'utilisateur
    if(produit_data == undefined)
     {
        produit_data = <ProduitReturnType>{ Produit : <UserMarketProduct>Produit,Index : (MyBasket.value.length-1) };
        (produit_data.Produit as UserMarketProduct).productNumber = 1;
        MyBasket.value.push(produit_data.Produit);

    }else if (produit_data != undefined) // Sinon il incrémente le nombr ede produit
       (produit_data as any).Produit.productNumber += 1;

      // On sauvegarde le panier de l'utilisateur dans les cookies qui a un durée de vie de 30 jour 
      (VueCookies as any).set("UserBasket",JSON.stringify(MyBasket.value),"30d")

      var totalprice = 0;
    
      for(let p = 0;p < MyBasket.value.length;p++)
            totalprice += (MyBasket.value[p] as UserMarketProduct).productNumber * (MyBasket.value[p] as UserMarketProduct).productPrice
       
      totalPrice.value = totalprice

      // On fait une notification qui inclut le nom du produit, le nombre actuel dans le panier ainsi que le prix
      ElNotification({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `Name : ${Produit.productName}<br />Quantity : ${produit_data?.Produit?.productNumber} <br/>Prix : ${(produit_data?.Produit?.productPrice as number)*(produit_data?.Produit?.productNumber as number)} €<br/>Article ajouté au panier !`,
        type: 'success',
        duration:2500,
        offset:50
      })
  }

  // cette fonction permet de modifier le nombre de produit dans le panier de l'utilisateur,
  // si on incrémente ou décrémente
  const SetProductNumber = (ProductId:string,_Number:number) => 
  {
    
    // On récupere le produit par son ID
    let current_product = GetProductById(ProductId);

    // On check si il est pas undefine (si il est ou pas dans le panier de l'utilisateur)
    if(current_product == undefined)
         return

         // On debug le nombre produit dans le panier de l'utilisateur
    console.log(`Changement du nombre de produit pour ${current_product.Produit?.productName} `);

    // On modifie le nombre de produit dans le panier de l'utilisateur
    (current_product.Produit as UserMarketProduct).productNumber = _Number;

     // On sauvegarde le panier de l'utilisateur dans les cookies qui a un durée de vie de 30 jour
    (VueCookies as any).set("UserBasket",JSON.stringify(MyBasket.value),"30d")

    var totalprice = 0;

    for(let p = 0;p < MyBasket.value.length;p++)
          totalprice += (MyBasket.value[p] as UserMarketProduct).productNumber * (MyBasket.value[p] as UserMarketProduct).productPrice
     
    totalPrice.value = totalprice
  }

  // Cette fonction permet de supprimer un article dans le panier de l'utilisateur
  const  DeletFromMyBasket = (ProductId:string) => {

    // ON check si le panier de l'utilisateur n'est pas vide
    if(MyBasket.value.length <= 0)
       return;


    // On récupere le produit par son ID
    let current_product = GetProductById(ProductId);

    // On debug le produit supprimé du panier de l'utilisateur
    console.log(`Le produit ${current_product?.Produit?.productName} est supprimé du panier de l'utilisateur `);

    // On check si il est undefine (si il est ou pas dans le panier de l'utilisateur)
    if(current_product == undefined)
     return;

      // On supprime l'article que l'utilisateur veur supprimer
     MyBasket.value.splice(current_product?.Index,1);

    // On sauvegarde le panier de l'utilisateur dans les cookies qui a un durée de vie de 30 jour
    (VueCookies as any).set("UserBasket",JSON.stringify(MyBasket.value),"30d")
    
    var totalprice = 0;

    for(let p = 0;p < MyBasket.value.length;p++)
          totalprice += (MyBasket.value[p] as UserMarketProduct).productNumber * (MyBasket.value[p] as UserMarketProduct).productPrice
     
    totalPrice.value = totalprice

  }

  // On retourne les methode et reference qui vont plus tard  être utilsier
  return { Market, MyBasket,totalPrice, DeletFromMyBasket,AddProductOnMyBasek,SetProductNumber }
  
})
