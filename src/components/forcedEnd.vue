<template>
  <div class="q-pa-md">
    <p class="text-subtitle1 text-black">回答して頂いた内容について、本調査への参加条件を満たさないものが含まれていました。</p>
    <br>
    <p class="text-subtitle1 text-black">※このページは、自動的にリダイレクトします。</p>
  </div>
</template>
<script setup  lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";

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