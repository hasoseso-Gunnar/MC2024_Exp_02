<template>
  <div class="q-pa-md">
    <p>※このページは20秒経過すると、ページ下部の「ゲームを開始する」ボタンから次の画面に進むことができます。</p>
    <br/>
    <p class="text-subtitle1 text-black">これは、先ほどの質問項目での<span class="text-bold text-red-9">パートナーの回答内容</span>です。</p>
    <p class="text-subtitle1 text-black text-bold">プロフィール情報の一部について、ゲームの後で正しく記憶しているかどうか確認しますので、しっかりと覚えてください。</p>
    <div style="height: 40px;"></div>
    <p class="text-h6 text-black text-bold" style="margin-left: 20%;">【パートナーの情報】</p>
    <!-- プロフィール情報 -->
    <q-markup-table 
      separator="cell" 
      flat 
      bordered
      style="width: 60%; margin-left: 20%;"
    >
      <tbody>
        <!-- 性別 -->
        <tr class="row q-tr--no-hover">
          <td class="text-left col-9 row items-center" style="height: 90px;">
            <p class="text-subtitle1" style="margin-bottom: 0px;">性別</p>
          </td>
          <td class="justify-center col-3 row items-center" style="height: 90px;">
            <p class="text-subtitle1" style="margin-bottom: 0px;">{{ props.sex }}</p>
          </td>
        </tr>
        <!-- 年齢 -->
        <tr class="row q-tr--no-hover">
          <td class="text-left col-9 row items-center" style="height: 90px;">
            <p class="text-subtitle1" style="margin-bottom: 0px;">年齢</p>
          </td>
          <td class="justify-center col-3 row items-center" style="height: 90px;">
            <p class="text-subtitle1" style="margin-bottom: 0px;">{{ props.age }}</p>
          </td>
        </tr>
        <!-- 移民 -->
        <tr class="row q-tr--no-hover">
          <td class="text-left col-9 row items-center">
            <p class="text-subtitle1" style="margin-bottom: 0px;">日本での移民の積極的な受け入れ</p>
          </td>
          <td class="text-center col-3">
            <q-icon 
              :name="props.condition === 1 && props.agreeImmigrant === '賛成' ? 'sentiment_satisfied' : props.condition === 2 && props.agreeImmigrant === '反対' ? 'sentiment_satisfied' : 'sentiment_dissatisfied'"
              size="48px"
              :color="props.condition === 1 && props.agreeImmigrant === '賛成' ? 'blue' : props.condition === 2 && props.agreeImmigrant === '反対' ? 'blue' : 'red'"
            />
            <p class="text-subtitle1" style="margin-bottom: 0px;">{{ (props.condition === 2 && props.agreeImmigrant === '賛成' ? '反対' : props.condition === 2 && props.agreeImmigrant === '反対' ? '賛成' : props.agreeImmigrant) }}</p>
          </td>
        </tr>
        <!-- 防衛費 -->
        <tr class="row q-tr--no-hover">
          <td class="text-left col-9 row items-center">
            <p class="text-subtitle1" style="margin-bottom: 0px;">防衛費の財源確保のための将来的な増税</p>
          </td>
          <td class="text-center col-3">
            <q-icon 
              :name="props.agreeDefenseCost === '賛成' ? 'sentiment_satisfied' : 'sentiment_dissatisfied'"
              :color="props.agreeDefenseCost === '賛成' ? 'blue' : 'red'"
              size="48px"
            />
            <p class="text-subtitle1" style="margin-bottom: 0px;">{{ props.agreeDefenseCost }}</p>
          </td>
        </tr>
        <!-- AI -->
        <tr class="row q-tr--no-hover">
          <td class="text-left col-9 row items-center">
            <p class="text-subtitle1" style="margin-bottom: 0px;">AI（人工知能）の積極的な利用</p>
          </td>
          <td class="text-center col-3">
            <q-icon 
              :name="props.agreeAI === '賛成' ? 'sentiment_satisfied' : 'sentiment_dissatisfied'"
              :color="props.agreeAI === '賛成' ? 'blue' : 'red'"
              size="48px"
            />
            <p class="text-subtitle1" style="margin-bottom: 0px;">{{ props.agreeAI }}</p>
          </td>
        </tr>
        <!-- クマ -->
        <tr class="row q-tr--no-hover">
          <td class="text-left col-9 row items-center">
            <p class="text-subtitle1" style="margin-bottom: 0px;">住宅街に出没したクマの駆除</p>
          </td>
          <td class="text-center col-3">
            <q-icon 
              :name="props.agreeBear === '賛成' ? 'sentiment_satisfied' : 'sentiment_dissatisfied'"
              :color="props.agreeBear === '賛成' ? 'blue' : 'red'"
              size="48px"
            />
            <p class="text-subtitle1" style="margin-bottom: 0px;">{{ props.agreeBear }}</p>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
  <div class="q-pa-md q-mt-xl">
    <div align="right">
        <q-btn 
            v-if="twentySecondsPassed === false"
            label="ゲームを開始する"
            flat
            class="bg-grey text-white"
        ></q-btn>
        <q-btn 
            v-else
            label="ゲームを開始する"
            flat
            class="bg-blue-7 text-white"
            @click="toPage13"
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
    twentySecondsPassed.value = true;
  }, 20000);
});

//20秒カウント過ぎたかどうか
const twentySecondsPassed = ref<boolean>(false);

//親からの受け取りデータ
const props = defineProps(['uri','UUID','sex','age','agreeImmigrant','agreeDefenseCost','agreeAI','agreeBear','condition']);

//次のページへ
const toPage13 = function(){
  window.scrollTo(0, 0);  
  execEmit();
};

const emit = defineEmits(['eventEmit'])
const execEmit = () => {
  emit('eventEmit', { 'tab': 'page13', 'progress': 0.6})
}

</script>
<style lang="scss">

</style>
