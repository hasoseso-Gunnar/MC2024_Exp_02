<template>
  <div class="q-pa-md">
    <p class="text-subtitle1 text-black">本調査の募集内容・注意事項について、再度ご確認ください。</p>
    <br>
    <p class="text-subtitle1 text-black text-bold text-underline">本調査への回答は、必ずパソコン（Windows, Mac等）またはタブレット端末 (iPad等) から行ってください。</p>
    <p class="text-subtitle1 text-black">スマートフォンや携帯電話などからは回答できません。</p>
    <br>
    <p class="text-subtitle1 text-black text-bold text-underline">本調査は、日本国籍を持つ18歳以上・65歳以下の方が対象です。</p>
    <p class="text-subtitle1 text-black">日本国籍を持たない方、17歳以下・66歳以上の方は参加できません。</p>
    <br>
    <p class="text-subtitle1 text-black text-bold text-underline">質問文をよく読んでください。</p>
    <p class="text-subtitle1 text-black">質問項目を明らかに読んでいないと判断された場合は、自動的にこのページに遷移されます。</p>
    <br>
    <p class="text-subtitle1 text-black text-bold text-underline">回答を始める前に、必ずLancersサイト内の「作業をはじめる」ボタンを押してください。</p>
    <p class="text-subtitle1 text-black">「作業をはじめる」のボタンを押さずに回答を始めると、報酬を受け取ることができない場合があります。</p>
    <br>
    <p class="text-black">※タブを閉じて、アンケートを終了してください。</p>
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
  emit('eventEmit', { 'tab': 'page5', 'progress': 1.0})
}

</script>
<style lang="scss">
p.text-underline{
  text-decoration: underline;
}
</style>