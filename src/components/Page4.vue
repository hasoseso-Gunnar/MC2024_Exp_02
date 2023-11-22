<template>
  <div class="q-pa-md">
    <p class="text-subtitle1 text-black">ここからは、先ほどあなたが回答した5つのトピックのうち、ランダムに2つを取り上げます。</p>
    <br>
    <p class="text-subtitle1 text-black">それぞれのトピックに続く質問項目について、回答してください。</p>
    <div align="right">
        <q-btn 
            label="次のページへ"
            flat
            class="bg-blue-7 text-white"
            @click="toPage5"
        ></q-btn>
    </div>
  </div>
</template>
<script setup  lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";

//親からの受け取りデータ
const props = defineProps(['uri','UUID']);

//次のページへ
const toPage5 = function(){
  window.scrollTo(0, 0);  
  execEmit();
};

const emit = defineEmits(['eventEmit'])
const execEmit = () => {
  emit('eventEmit', { 'tab': 'page5', 'progress': 0.4})
}

</script>
<style lang="scss">

</style>