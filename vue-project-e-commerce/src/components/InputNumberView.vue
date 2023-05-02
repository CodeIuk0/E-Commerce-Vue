<script lang="ts">

</script>

<script setup lang="ts">

import { requiredNumber } from 'element-plus/es/components/table-v2/src/common';
import { RouterLink } from 'vue-router'
import { ref,defineProps } from 'vue'

// On definie le sprops pour ce composant
const props = defineProps({
    _min: { 
        type:    Number,
        required: true
    },

    _max: { 
        type:    Number,
        required: true
    },

    _value: { 
        type:    Number,
        required: true,
        default: 1
    },

    _step: { 
        type:    Number,
        required: true
    },

    _callback: { 
        type:    Function,
        required: true
    }

  });

let num = ref(props._value)

</script>




<template>
    <el-input-number v-model="num" :value = "10"  :step="_step" :min="_min" :max="_max" @change="_callback" />
</template>
