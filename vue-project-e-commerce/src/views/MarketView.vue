
<script setup lang="ts">



import {UseMarketStore } from "../stores/PiniaMarketStore"
import { Plus } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { ref,computed } from 'vue'

let refmystore = storeToRefs(UseMarketStore());
let mystore = UseMarketStore();

</script>

<template>

    <ul class="card_produit">
        <template v-if="refmystore.Market.value.length > 0" v-for="(item, index) in refmystore.Market.value" :key="index"  >
        <li  v-if="item.IsVisible==true" >

            <el-card  >
                <br />
                <div class="image-product_card">
                  
                <img
                  :src="item.productPicture"
                  
                />
              </div>
                <div style="padding: 14px">
                  <span>{{ item.productName }}</span>
                  <div class="bottom">
                    <span>{{ item.productPrice  }} €&nbsp;&nbsp;</span>
                    <el-button size="small" :icon="Plus"  @click="()=>mystore.AddProductOnMyBasek(item)" ></el-button>
                  </div>
                </div>
              </el-card>
        </li>
    </template>
  </ul>
  <br />
</template>