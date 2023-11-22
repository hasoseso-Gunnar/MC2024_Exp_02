<template>
  <div class="q-pa-md">
    <q-card 
      class="finish-card" 
      flat 
      bordered
    >
      <!-- 表示1 -->
      <p class="text-h4 text-bold fade-in" v-if="visible1">結果発表</p>
      <!-- 表示2 -->
      <p class="text-h6 q-mb-xl fade-in" v-if="visible2">
      今回の協力課題でのパートナーとの合計スコアは
      </p>
      <p class="text-h6 q-mb-xl fade-in" v-if="visible2">
        <span class="text-h4 text-bold">{{ (score + 1) }}点</span>
      </p>
      <p class="text-h6 q-mb-xl fade-in" v-if="visible2">
      でした。
      </p>
      <!-- 表示3 -->
      <p class="text-h5 fade-in" v-if="visible3">
        これにて<span class="text-bold">協力課題は終了</span>です。
      </p>
      <p class="text-subtitle1 fade-in" v-if="visible3">
        引き続き、残りの質問に回答してください。
      </p>
      <p class="text-subtitle1 fade-in" v-if="visible3">
        ※この先のタスクで音は出ません。
      </p>
    </q-card>
    <div style="height: 40px;"></div>
    <div align="right">
      <q-btn 
        v-if="visible3 === false"
        label="次のページへ"
        flat
        class="bg-grey text-white"
        ></q-btn>
        <q-btn 
          v-else
          label="次のページへ"
          flat
          class="bg-blue-7 text-white"
          @click="toPage16"
        ></q-btn>
    </div>
  </div>
</template>
<script setup  lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";


//ページ読み込んだ際の処理
onMounted(async()=>{

  //表示1→表示2
  setTimeout(async() => {
      visible1.value = false;
      visible2.value = true;

    //表示2→表示3
    setTimeout(async() => {
      visible2.value = false;
      visible3.value = true;

    }, 4000);    

  }, 3000);
});

//結果の表示周りの処理
const visible1 = ref<boolean>(true);
const visible2 = ref<boolean>(false);
const visible3 = ref<boolean>(false);
const score = ref<number>(0);

//次のページへ
const toPage16 = function(){
  window.scrollTo(0, 0);  
  execEmit();
};

const emit = defineEmits(['eventEmit'])
const execEmit = () => {
  emit('eventEmit', { 'tab': 'page16', 'progress': 1.0})
}

</script>
<style lang="scss">
.finish-card{
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
p.fade-in {
  opacity: 0;
  animation: fadeIn 0.5s ease-in forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>