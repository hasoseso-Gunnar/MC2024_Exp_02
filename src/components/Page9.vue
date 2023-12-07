<template>
  <div class="q-pa-md">
    <p>※このページは30秒経過すると、ページ下部のボタンから次のステップへ進めるようになります。</p>
    <br/>
    <p class="text-subtitle1 text-black">ここからは、この調査に同時に参加している<span class="text-bold">他の参加者と一緒に</span>ゲームを行います。</p>
    <br/>
    <p class="text-subtitle1 text-black">ゲームでは、あなたとパートナーで同時にそれぞれ<span class="text-bold">5問のクイズに回答</span>します。</p>
    <p class="text-subtitle1 text-black">クイズでは一般知識レベルの問題が出題され、質問に対する回答を20秒以内に4つの選択肢から選んで回答します。</p>
    <br>
    <span >※以下の画像は、実際のゲーム画面です。クイズはこのような形で出題され、回答することを求められます。</span>
    <div style="height: 30px;"></div>
    <q-img 
      loading="eager"
      src="https://hasoseso-gunnar.github.io/MC2024_Exp_02/gameExample1.jpg"
      width="80%"
      class="q-mb-lg"
      style="margin-left: 10%;"
    />
    <div style="height: 30px;"></div>
    <p class="text-subtitle1 text-black">クイズに1問正解するたびに1点加点されます。そのため、あなた1人で最大5点獲得できます。</p>
    <p class="text-subtitle1 text-black">このクイズをパートナーも同時に行うため、お互いの<span class="text-bold">最大合計スコアは10点</span>となります。できるだけ高得点を狙いましょう。</p>
    <p class="text-subtitle1 text-black">また、ゲームを行う前に合計スコアとは関係のない<span class="text-bold">1問練習用のクイズを出題します</span>。そこで再度ルールと手順を確認してください。</p>
    <div style="height: 40px;"></div>
    <p class="text-subtitle1 text-black">なお、このゲームでは上記の基本的なルールに加えて、<span class="text-bold text-red-9">2つの特殊なルール</span>があります。</p>
    <br>
    <p class="text-subtitle1 text-black">①ゲームをより円滑に進めるために、あなたとパートナーが<span class="text-bold">これまでに回答した情報の一部についてゲーム開始前に表示</span>されます。</p>
    <p class="text-subtitle1 text-black">表示される情報は<span class="text-bold">「性別」「年齢」「4つのトピックに関するそれぞれの賛否」</span>です。</p>
    <p class="text-subtitle1 text-black">プロフィール情報の一部について、ゲームの後で正しく記憶しているかどうか確認しますので、しっかりと覚えてください。</p>
    <br>
    <p class="text-subtitle1 text-black">②本調査では、オンラインでのコミュニケーション時の行動について調べています。</p>
    <p class="text-subtitle1 text-black">コミュニケーション方法の一環として、ゲームの中であなたとパートナーは<span class="text-bold">お互いにシグナルを送ります</span>。</p>
    <p class="text-subtitle1 text-black">シグナルには<span class="text-bold">「音のシグナル」</span>と<span class="text-bold">「色のシグナル」</span>の2種類があります。</p>
    <p class="text-subtitle1 text-black">どちらのシグナルを送信する役割になるかは、パートナーとのマッチング後にランダムに決まります。</p>
    <p class="text-subtitle1 text-black">また、シグナルを送信する具体的な方法についても、マッチング後に役割が決まってから説明します。</p>
    <br>
    <div style="height: 30px;"></div>
    <p class="text-subtitle1 text-black">以上が、ゲームのルールです。</p>
    <p class="text-subtitle1 text-black text-bold">上記のルールを理解し、ゲームを開始する準備が出来ましたら、「マッチングを開始する」ボタンを押してください。</p>
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