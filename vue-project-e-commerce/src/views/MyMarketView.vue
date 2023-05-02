<script setup lang="ts">

import {UseMarketStore } from "../stores/PiniaMarketStore"
import { CircleClose } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import InputNumberView from "@/components/InputNumberView.vue"
import EmptyMakretView from "@/components/EmptyMakretView.vue"

let refmystore = storeToRefs(UseMarketStore());
let mystore = UseMarketStore();
</script>


<template>
  <ul class="card_produit">
    <li v-if="refmystore.MyBasket.value.length > 0" v-for="(item, index) in refmystore.MyBasket.value" :key="index">

        <el-card>
          <div class="top" style="margin-left:20px;width:90%">
            <span>{{item.productPrice*item.productNumber}} €</span>
            <el-popconfirm title="Etes vous sûr ?" @confirm="()=>mystore.DeletFromMyBasket(item.productId)">
              <template #reference>
                <el-button type="danger" :icon="CircleClose" circle />
              </template>
            </el-popconfirm>
        </div>
            <img
              :src="item.productPicture"
              class="image"
            />
            <div style="padding: 14px">
              <span>{{ item.productName }}</span>
              <div class="bottom">
                <InputNumberView :_step="1"  :_value="item.productNumber" :_min="1" :_max="99" :_callback="(e:number)=>mystore.SetProductNumber(item.productId,e)" />
              </div>
            </div>
          </el-card>
    </li>
    <div v-else id="empty-user-market" ><EmptyMakretView /></div>
</ul>
</template>
