<template>
  <div class="q-pa-md">
    <p class="text-subtitle1 text-black">次に、学問やビジネスでのAIの積極的活用に{{ props.agreeAI }}する理由を、下記の自由記述欄に<span class="text-bold text-red-9">100～200文字</span>で記述してください。</p>
    <br>
    <q-input 
      v-model="openEndedQuesiton"
      type="textarea"
      dense
      outlined
      :rules="[
          val => val.length >= 100 || '100文字以上で記述してください',
          val => val.length <= 200 || '200文字以内で記述してください',
        ]"
      lazy-rules
      counter
      maxlength="200"
      @update:model-value="checkTextLength"
    >
    </q-input>
  </div>
  <div class="q-pa-md q-mt-xl">
    <div align="right">
        <q-btn 
            v-if="!openEndedFinished"
            label="次のページへ"
            flat
            class="bg-grey text-white"
        ></q-btn>
        <q-btn 
            v-else
            label="次のページへ"
            flat
            class="bg-blue-7 text-white"
            @click="toPage9"
        ></q-btn>
    </div>
  </div>
</template>
<script setup  lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";

//親からの受け取りデータ
const props = defineProps(['agreeAI']);

//自由記述内容
const openEndedQuesiton = ref<string>('');
const openEndedFinished = ref<boolean>(false);

//自由記述内容が規定の文字数か判定
const checkTextLength = () => {
  //100文字以上200文字以下の場合
  if(openEndedQuesiton.value.length >= 100 && openEndedQuesiton.value.length <= 200){
    openEndedFinished.value = true;
  //それ以外の場合
  }else{
    openEndedFinished.value = false;
  }
};

//次のページへ
const toPage9 = function(){
  window.scrollTo(0, 0);  
  execEmit();
};

const emit = defineEmits(['eventEmit'])
const execEmit = () => {
  emit('eventEmit', { 'tab': 'page9', 'progress': 0.8})
}

</script>
<style lang="scss">

</style>