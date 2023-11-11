<template>
  <div class="q-pa-md">
    <p class="text-subtitle1 text-black">次にさまざまな物事についてのあなたの賛否・好みをお尋ねします。</p>
    <br>
    <div v-for="(prop, i) in itemList">
      <p class="text-subtitle1 text-black">{{ (i+1) }}. {{ prop.question1 }}</p>
      <br/>
      <div class="row">
        <div class="col-2" align="center">
          <p>{{ prop.option1 }}</p>
          <q-radio 
            v-model="prop.variable" 
            checked-icon="task_alt" 
            unchecked-icon="panorama_fish_eye" 
            :val="prop.answer1"
          />
        </div>
        <div class="col-2" align="center">
          <p>{{ prop.option2 }}</p>
          <q-radio 
            v-model="prop.variable" 
            checked-icon="task_alt" 
            unchecked-icon="panorama_fish_eye" 
            :val="prop.answer2"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="q-pa-md q-mt-xl">
    <div align="right">
        <q-btn 
            v-if="agree1 === '' || agree2 === '' || agree3 === '' || agree4 === '' || agree5 === ''"
            label="次のページへ"
            flat
            class="bg-grey text-white"
        ></q-btn>
        <q-btn 
            v-else
            label="次のページへ"
            flat
            class="bg-blue-7 text-white"
            @click="toPage4"
        ></q-btn>
    </div>
  </div>
</template>
<script setup  lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";

//ページ読み込み時に配列をランダムに並び替え
onMounted(()=>{
  shuffle(itemList.value);
});

//ラジオボタン設定
const agree1 = ref<string>('');
const agree2 = ref<string>('');
const agree3 = ref<string>('');
const agree4 = ref<string>('');
const agree5 = ref<string>('');

interface itemListType{
  seed: number,
  question1: string,
  question2: string,
  option1: string,
  option2: string,
  answer1: string,
  answer2: string,
  variable: string,
}

//質問項目設定
const itemList = ref<Array<itemListType>>([
  {
    seed: 1,
    question1: 'a',
    question2: 'a',
    option1: '賛成',
    option2: '反対',
    answer1: '1',
    answer2: '2',
    variable: agree1.value,
  },
  {
    seed: 2,
    question1: 'i',
    question2: 'i',
    option1: '賛成',
    option2: '反対',
    answer1: '1',
    answer2: '2',
    variable: agree2.value,
  },
  {
    seed: 3,
    question1: 'u',
    question2: 'u',
    option1: '賛成',
    option2: '反対',
    answer1: '1',
    answer2: '2',
    variable: agree3.value,
  },
  {
    seed: 4,
    question1: '',
    question2: '',
    option1: '賛成',
    option2: '反対',
    answer1: '1',
    answer2: '2',
    variable: agree4.value,
  },
  {
    seed: 5,
    question1: '',
    question2: '',
    option1: '賛成',
    option2: '反対',
    answer1: '1',
    answer2: '2',
    variable: agree5.value,
  },
])

//質問項目をシャッフルする関数
const shuffle = (list: any) => {
  return list.sort(() => Math.random() - 0.5);
};

//次のページへ
const toPage4 = function(){
  window.scrollTo(0, 0);  
  execEmit();
};

const emit = defineEmits(['eventEmit'])
const execEmit = () => {
  emit('eventEmit', { 'tab': 'page4', 'progress': 0.3})
}

</script>
<style lang="scss">

</style>