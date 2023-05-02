<script lang="ts">

</script>

<script setup lang="ts">
import { Search,ShoppingCart,Box,Money,MagicStick } from '@element-plus/icons-vue'
import {UseMarketStore } from "../stores/PiniaMarketStore"
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

let searchby = ref('');
let search = ref('');

let refmystore = storeToRefs(UseMarketStore());

// cette fonction permet de filtrer, par rapport au Nom, Price ou a l'ID
function SearchProduct()
{
      // Le string qui doit match, cette valeur est la valeur dans labarre de recherche
    const matchwhitch:string =  `^${search.value.toLowerCase()}.*`
    
    // Check si le type de recherche est Default (0) ou Name (1)
     if(searchby.value == "" || searchby.value=="1")
      {
        // On parcour tout le panier d el'utilisateur
      for(let x = 0;x < refmystore.Market.value.length;x++)
          // Si il y a un match alors il sera visible donc non null, sinon il sera null dontc pas visible
          refmystore.Market.value[x].IsVisible = (refmystore.Market.value[x].productName.toLowerCase().match(matchwhitch) != null)
    
      } else if(searchby.value=="2")   // Check si le type de recherche est le Prix (2)
      {
         // On parcour tout le panier d el'utilisateur
        for(let x = 0;x < refmystore.Market.value.length;x++)
          refmystore.Market.value[x].IsVisible = ((refmystore.Market.value[x].productPrice).toString().match(matchwhitch) != null)
     
      } else if(searchby.value=="3")    // Check si le type de recherche est l'ID (3)
      {
         // On parcour tout le panier d el'utilisateur
        for(let x = 0;x < refmystore.Market.value.length;x++)
           // Si il y a un match alors il sera visible donc non null, sinon il sera null dontc pas visible
          refmystore.Market.value[x].IsVisible = (refmystore.Market.value[x].productId.toLowerCase().match(matchwhitch) != null)

      }  
}

</script>

<template>
   

<el-header id="Header">
  <RouterLink to="/" name="title" >BoostShop</RouterLink>

  <div id="searchbar-container">
    <el-input style="width: 650px;height: 40px;"
    v-model="search"
    placeholder="Search ..."

    @change="SearchProduct"
    
    @focus="SearchProduct"

  >
    <template #prepend  id="searchbar"  >
      <el-select @change="SearchProduct" :value="0" v-model="searchby" placeholder="Default" name="seachbar-select" style="width: 115px;">
        <el-option label="Name" value="1" />
        <el-option label="Price" value="2" />
        <el-option label="ProductId" value="3" />
      </el-select>
    </template>
    <template #append>
      <el-button id="search-item-button" :icon="Search" @click="SearchProduct" />
      
    </template>
  </el-input>
</div>
<span  v-if="refmystore.MyBasket.value.length > 0" id="total-price">{{refmystore.totalPrice}}&nbsp;€</span>
<RouterLink  id="shop-cart"  to="MyMarket" ><el-icon><ShoppingCart /></el-icon>
  <span id="mybasket-number" v-if="refmystore.MyBasket.value.length > 0">{{ refmystore.MyBasket.value.length }}</span>
</RouterLink>


</el-header>
<div id="info">
 <div name="info-container">
  <el-icon><Box /></el-icon>
  <span>Un achat > 100 € ? expédition gratuite !</span>
 </div>

 <div name="info-container">
  <el-icon><Money /></el-icon>
  <span>Remboursement en moins d'un mois</span>
 </div>

 <div name="info-container">
  <el-icon><MagicStick /></el-icon>
  <span>Support 24/7</span>
 </div>
 
</div>

</template>




<style scoped>

#info
{
  width: calc(100% - 60px);
  height: 55px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 30px 0 30px;
  background-color: rgba(0,0,0,0.05);
  min-width: 1035px;
  user-select: none;
}

div[name="info-container"]
{
  width: 80px;

}

div[name="info-container"]
{
   display: flex;
   justify-content: left;
   align-items: center;
   min-width: max-content;
   padding-right: 35px;
  
}

div[name="info-container"] svg
{
  width: 35px;
  height:35px;
  opacity: 0.7;
}

div[name="info-container"] i
{
  width: 35px;
}

div[name="info-container"]  span
{
  margin-left: 10px;
  min-width: max-content;
}

#mybasket-number
{
  position: absolute;
  margin: -26px 0 0 38px;
  outline:  none;
  text-decoration: none;
  color: white;
  border:none;
  background-color: chocolate;
  width:18px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 18px;
  border-radius: 50%;
  text-align: center;
  font-size: 0.75em;
}

</style>