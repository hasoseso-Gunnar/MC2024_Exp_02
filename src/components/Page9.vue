<template>
  <div class="q-pa-md">
    <p>※このページは30秒経過すると、ページ下部の「マッチングを開始する」ボタンから次のステップへ進めるようになります。</p>
    <p class="text-subtitle1 text-black">ここからは、この調査に同時に参加している<span class="text-bold">他の参加者と一緒に</span>ゲームを行います。</p>
    <br/>
    <p class="text-subtitle1 text-black">ゲームでは、あなたとパートナーで同時にそれぞれ<span class="text-bold">5問のクイズに回答</span>します。</p>
    <p class="text-subtitle1 text-black">クイズは一般知識レベルの問題が出題され、質問に対する回答を20秒以内に4つの選択肢から選んで回答する形式です。</p>
    <br>
    <span >※以下の画像は、実際のゲーム画面の例です。</span>
    <br>
    <q-img 
      loading="eager"
      src="https://hasoseso-gunnar.github.io/MC2024_Exp_02/referee_yellowcard.png"
      width="150px"
      class="q-mb-lg"
      style="margin-left: 45%;"
    ></q-img>
    <div style="height: 30px;"></div>
    <p class="text-subtitle1 text-black">クイズに1問正解するたびに1点加点されます。そのため、あなた1人で最大5点獲得できます。</p>
    <p class="text-subtitle1 text-black">このクイズをパートナーも同時に行うため、お互いの<span class="text-bold">最大合計スコアは10点</span>となります。できるだけ高得点を狙いましょう。</p>
    <p class="text-subtitle1 text-black">また、ゲームを行う前に合計スコアとは関係のない<span class="text-bold">1問練習用のクイズを出題します</span>。そこで再度ルールと手順を確認してください。</p>
    <div style="height: 40px;"></div>
    <p class="text-subtitle1 text-black"></p>
    <p class="text-subtitle1 text-black">②ゲームをより円滑に進めるために、協力相手の参加者(パートナー)には<span class="text-bold">あなたがここまで回答した情報の一部が事前</span>に提示されます。</p>
    <p class="text-subtitle1 text-black">提示される情報は<span class="text-bold">「性別」「年齢」「4つのトピックに関するそれぞれの賛否」</span>です。</p>
    <br>
    <div style="height: 30px;"></div>
    <div align="right">
        <q-btn 
          v-if="thirtySecondsPassed === false"
          label="マッチングを開始する"
          flat
          class="bg-grey text-white"
        ></q-btn>
        <q-btn 
          v-else
          label="マッチングを開始する"
          flat
          class="bg-blue-7 text-white"
          @click="toPage10"
        ></q-btn>
    </div>
  </div>
</template>
<script setup  lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";

//ページ読み込んだ際の処理
onMounted(async()=>{
  //30秒待つ
  setTimeout(async() => {
    thirtySecondsPassed.value = true;
  }, 30000);
});

//30秒カウント過ぎたかどうか
const thirtySecondsPassed = ref<boolean>(false);

//次のページへ
const toPage10 = function(){
  window.scrollTo(0, 0);  
  execEmit();
};

const emit = defineEmits(['eventEmit'])
const execEmit = () => {
  emit('eventEmit', { 'tab': 'page10', 'progress': 0.45})
}



</script>
<style lang="scss">

</style>