<template>
  <div class="q-pa-md">
    <p class="text-subtitle1 text-black text-bold">これより、協力課題のルールについて説明します。</p>
    <p>※このページは30秒経過すると、ページ下部のボタンから次のステップへ進めるようになります。</p>
    <br/>
    <p class="text-subtitle1 text-black">協力課題では、あなたとパートナーでそれぞれ<span class="text-bold">5問のクイズに回答</span>します。</p>
    <p class="text-subtitle1 text-black">クイズは以下の(例)のように一般知識レベルの問題が出題され、それを4択の選択肢の中から選んで回答します。</p>
    <br>
    <p class="text-subtitle1 text-black">(例) 全国に都道府県は合計いくつありますか？(正解: ③)</p>
    <div class="row">
      <p class="col-1 text-subtitle1 text-black"></p>
      <p class="col-1 text-subtitle1 text-black">① 32</p>
      <p class="col-1 text-subtitle1 text-black">② 39</p>
      <p class="col-1 text-subtitle1 text-black">③ 47</p>
      <p class="col-1 text-subtitle1 text-black">④ 56</p>
    </div>
    <br>

    <p class="text-subtitle1 text-black">クイズに1問正解するたびに1点加算されますので、あなた1人で最大5点獲得できます。</p>
    <p class="text-subtitle1 text-black">このクイズをパートナーも同時に行うため、お互いの<span class="text-bold">最大合計スコアは10点</span>となります。できるだけ高得点を狙いましょう。</p>
    <p class="text-subtitle1 text-black">なお、実際の協力課題を行う前に<span class="text-bold">1問練習用のクイズを行います</span>ので、そこで再度ルールと手順を確認してください。</p>
    <div style="height: 60px;"></div>
    <p class="text-subtitle1 text-black">また、本調査では相手との遠隔でのコミュニケーションを通して、どれだけ課題の結果が変化するかを検証しています。</p>
    <p class="text-subtitle1 text-black">コミュニケーション方法の一環として、協力課題の中でパートナーに対してあなたは<span class="text-bold">シグナルを送る</span>ことができます。</p>
    <p class="text-subtitle1 text-black">シグナルには<span class="text-bold">「音のシグナル」</span>と<span class="text-bold">「色のシグナル」</span>の2種類があります。</p>
    <br>
    <p class="text-subtitle1 text-black">今回、<span class="text-bold text-red-9">あなたは音のシグナルを出す役割</span>を与えられました。</p>
    <p class="text-subtitle1 text-black">各問題に回答したのちに正解が表示されるタイミングで、以下のスライダーを用いて音量を調整してシグナルを発信してください。</p>
    <div style="height: 40px;"></div>
    <div class="row">
      <div class="col-2"></div>
      <q-slider
        v-model="volume"
        :min="0"
        :max="100"
        color="green"
        :marker-labels="markerLabel"
        label-always
        class="col-8"
      />
    </div>
    <div style="height: 40px;"></div>
    <div class="row">
      <div class="col-5"></div>
      <q-btn
        class="bg-green text-white col-2"
        label="シグナル"
        style="height: 50px; font-size: 19px; font-weight: bold;"
        icon="sensors"
        @click="activateSound"
      />
    </div>
    <div style="height: 60px;"></div>
    <p class="text-subtitle1 text-black">なお、相手からは<span class="text-bold">「色のシグナル」</span>が送られてきます。相手の意図を汲み取り、二人で協力して問題を解いてください。</p>
    <div style="height: 80px;"></div>
    <div align="right">
      <q-btn 
            v-if="thirtySecondsPassed === false"
            label="次のページへ"
            flat
            class="bg-grey text-white"
        ></q-btn>
        <q-btn 
            v-else
            label="次のページへ"
            flat
            class="bg-blue-7 text-white"
            @click="toPage12"
        ></q-btn>
    </div>
  </div>
</template>
<script setup  lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";

//ページ読み込んだ際の処理
onMounted(async()=>{
  //20秒待つ
  setTimeout(async() => {
    thirtySecondsPassed.value = true;
  }, 30000);
});

//20秒カウント過ぎたかどうか
const thirtySecondsPassed = ref<boolean>(false);

//音量に関する変数
const volume = ref<number>(0);
const markerLabel = ref<any>([        
    { value: 0, label: '0' },
    { value: 20, label: '20' },
    { value: 40, label: '40' },
    { value: 60, label: '60' },
    { value: 80, label: '80' },
    { value: 100, label: '100' },
  ]);

//音を出す関数
const activateSound = () => {

};

//次のページへ
const toPage12 = function(){
  window.scrollTo(0, 0);  
  execEmit();
};

const emit = defineEmits(['eventEmit'])
const execEmit = () => {
  emit('eventEmit', { 'tab': 'page12', 'progress': 1.0})
}

</script>
<style lang="scss">

</style>