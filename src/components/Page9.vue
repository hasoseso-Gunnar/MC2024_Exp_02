<template>
  <div class="q-pa-md">
    <p class="text-subtitle1 text-black">ここからは、この調査に同時に参加している<span class="text-bold">他の参加者と協力</span>してタスクを行います。</p>
    <p class="text-subtitle1 text-black">また、協力課題をより円滑に進めるために、協力相手の参加者(パートナー)には<span class="text-bold">あなたがここまで回答した情報の一部が事前</span>に提示されます。</p>
    <p class="text-subtitle1 text-black">提示される情報は<span class="text-bold">「性別」「年齢」「5つのトピックに関するそれぞれの賛否」</span>です。</p>
    <br>
    <p class="text-subtitle1 text-black">また、このタスクでは音が出ますので、大きすぎず、小さすぎない、<span class="text-red-9 text-bold">適切な音量</span>を事前に設定してください。</p>
    <p class="text-subtitle1 text-black">※スライダーの下の「サンプル音」ボタンを押すと実際に音が出ますので、サンプル音を聞きながら音量を調節してください。</p>
    <div style="height: 80px;"></div>
    <div class="row">
      <div class="col-2"></div>
      <q-slider
        v-model="volume"
        :min="0"
        :max="100"
        color="blue"
        :marker-labels="markerLabel"
        label-always
        class="col-8"
      />
    </div>
    <div style="height: 40px;"></div>
    <div class="row">
      <div class="col-5"></div>
      <q-btn
        class="bg-blue text-white col-2"
        label="サンプル音"
        style="height: 50px; font-size: 19px; font-weight: bold;"
        icon="volume_up"
        @click="activateSound"
      />
    </div>

    <div style="height: 100px;"></div>
    <p class="text-subtitle1 text-black">適切な音量が設定できましたら、以下の「この音量で適切である」ボタンをクリックして、次のページに進んでください。</p>
    <p class="text-subtitle1 text-black">次のページに進むと、すぐに<span class="text-bold">他の参加者とのマッチングが開始</span>されます。</p>
    <div style="height: 40px;"></div>
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4" align="center" :style="volumeFine === '1' ? 'background-color: #CCEBFF;': ''">
        <p class="description" style="font-size: 19px;">この音量で適切である</p>
          <q-radio 
            v-model="volumeFine" 
            size="xl" 
            checked-icon="task_alt" 
            unchecked-icon="panorama_fish_eye" 
            val="1"
          />
      </div>
    </div>
    <div align="right">
        <q-btn 
          v-if="volume === 0 || volumeFine !== '1'"
          label="次のページへ"
          flat
          class="bg-grey text-white"
        ></q-btn>
        <q-btn 
          v-else
          label="次のページへ"
          flat
          class="bg-blue-7 text-white"
          @click="toPage10"
        ></q-btn>
    </div>
  </div>
</template>
<script setup  lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";


//音量に関する変数
const volume = ref<number>(0);
const markerLabel = ref<any>([        
    { value: 0, label: '0' },
    { value: 20, label: '20' },
    { value: 40, label: '40' },
    { value: 60, label: '60' },
    { value: 80, label: '80' },
    { value: 100, label: '100' },
  ])

const volumeFine = ref<string>('0');

//音を出す関数
const activateSound = () =>{

};

//次のページへ
const toPage10 = function(){
  window.scrollTo(0, 0);  
  execEmit();
};

const emit = defineEmits(['eventEmit'])
const execEmit = () => {
  emit('eventEmit', { 'tab': 'page10', 'progress': 0.9})
}

</script>
<style lang="scss">

</style>