<template>
  <div class="q-pa-md">
    <!-- 態度の強さリード文 -->
    <p class="text-subtitle1 text-black">続いて、もう1つのトピックの考えについてもお尋ねします。</p>
    <p class="text-subtitle1 text-black">あなたは先ほど、<span class="text-red-9 text-bold">学問やビジネスでのAIの積極的活用に{{ props.agreeAI }}</span>と答えました。</p>
    <p class="text-subtitle1 text-black">1.それを踏まえて、あなたの考えに最もよく当てはまる選択肢を選んでください。</p>
    <div style="height: 40px;"></div>
    <!-- 態度の強さ質問項目 -->
    <div v-for="(prop, i) in itemListAttitudeStrength">
      <p class="text-subtitle1 text-black" style="margin-bottom: 0px;">{{ prop.question }}</p>
      <br/>
      <div class="row q-mb-xl">
        <div class="col-2" align="center" :style="prop.answer === '1' ? 'background-color: #CCEBFF;': ''">
          <div v-html="prop.option1"></div>
          <q-radio 
            v-model="prop.answer"
            checked-icon="task_alt" 
            unchecked-icon="panorama_fish_eye" 
            :val="prop.value1"
          />
        </div>
        <div class="col-2" align="center" :style="prop.answer === '2' ? 'background-color: #CCEBFF;': ''">
          <div v-html="prop.option2"></div>
          <q-radio 
            v-model="prop.answer"
            checked-icon="task_alt" 
            unchecked-icon="panorama_fish_eye" 
            :val="prop.value2"
          />
        </div>
        <div class="col-2" align="center" :style="prop.answer === '3' ? 'background-color: #CCEBFF;': ''">
          <div v-html="prop.option3"></div>
          <q-radio 
            v-model="prop.answer"
            checked-icon="task_alt" 
            unchecked-icon="panorama_fish_eye" 
            :val="prop.value3"
          />
        </div>
        <div class="col-2" align="center" :style="prop.answer === '4' ? 'background-color: #CCEBFF;': ''">
          <div v-html="prop.option4"></div>
          <q-radio 
            v-model="prop.answer"
            checked-icon="task_alt" 
            unchecked-icon="panorama_fish_eye" 
            :val="prop.value4"
          />
        </div>
        <div class="col-2" align="center" :style="prop.answer === '5' ? 'background-color: #CCEBFF;': ''">
          <div v-html="prop.option5"></div>
          <q-radio 
            v-model="prop.answer"
            checked-icon="task_alt" 
            unchecked-icon="panorama_fish_eye" 
            :val="prop.value5"
          />
        </div>
        <div class="col-2" align="center" :style="prop.answer === '6' ? 'background-color: #CCEBFF;': ''">
          <div v-html="prop.option6"></div>
          <q-radio 
            v-model="prop.answer"
            checked-icon="task_alt" 
            unchecked-icon="panorama_fish_eye" 
            :val="prop.value6"
          />
        </div>
      </div>
    </div>
    <div style="height: 30px;"></div>
    <q-separator />
    <div style="height: 60px;"></div>
    <!-- 道徳的確信リード文 -->
    <p class="text-subtitle1 text-black">2.以下に続けて各質問を読み、あなたの考えに最もよく当てはまる選択肢を選んでください。</p>
    <div style="height: 40px;"></div>
    <p class="text-subtitle1 text-black">『<span class="text-red-9 text-bold">学問やビジネスでのAIの積極的活用に{{ props.agreeAI }}</span>だというあなたの考えは・・・』</p>
    <div style="height: 40px;"></div>
    <!-- 道徳的確信質問項目 -->
    <div v-for="(prop, i) in itemListMoralConviction">
      <p class="text-subtitle1 text-black" style="margin-bottom: 0px;">{{ prop.question }}</p>
      <br/>
      <div class="row q-mb-xl">
        <div class="col-2" align="center" :style="prop.answer === '1' ? 'background-color: #CCEBFF;': ''">
          <p v-html="prop.option1"></p>
          <q-radio 
            v-model="prop.answer"
            checked-icon="task_alt" 
            unchecked-icon="panorama_fish_eye" 
            :val="prop.value1"
          />
        </div>
        <div class="col-2" align="center" :style="prop.answer === '2' ? 'background-color: #CCEBFF;': ''">
          <p v-html="prop.option2"></p>
          <q-radio 
            v-model="prop.answer"
            checked-icon="task_alt" 
            unchecked-icon="panorama_fish_eye" 
            :val="prop.value2"
          />
        </div>
        <div class="col-2" align="center" :style="prop.answer === '3' ? 'background-color: #CCEBFF;': ''">
          <p v-html="prop.option3"></p>
          <q-radio 
            v-model="prop.answer"
            checked-icon="task_alt" 
            unchecked-icon="panorama_fish_eye" 
            :val="prop.value3"
          />
        </div>
        <div class="col-2" align="center" :style="prop.answer === '4' ? 'background-color: #CCEBFF;': ''">
          <p v-html="prop.option4"></p>
          <q-radio 
            v-model="prop.answer"
            checked-icon="task_alt" 
            unchecked-icon="panorama_fish_eye" 
            :val="prop.value4"
          />
        </div>
        <div class="col-2" align="center" :style="prop.answer === '5' ? 'background-color: #CCEBFF;': ''">
          <p v-html="prop.option5"></p>
          <q-radio 
            v-model="prop.answer"
            checked-icon="task_alt" 
            unchecked-icon="panorama_fish_eye" 
            :val="prop.value5"
          />
        </div>
      </div>
    </div>
    <!-- 次のページへ進む -->
    <div align="right">
        <q-btn 
            v-if="itemListAttitudeStrength[0].answer === '' || itemListAttitudeStrength[1].answer === '' || itemListAttitudeStrength[2].answer === '' || itemListMoralConviction[0].answer === '' || itemListMoralConviction[1].answer === '' || itemListMoralConviction[2].answer === '' || itemListMoralConviction[3].answer === ''"
            label="次のページへ"
            flat
            class="bg-grey text-white"
        ></q-btn>
        <q-btn 
            v-else
            label="次のページへ"
            flat
            class="bg-blue-7 text-white"
            @click="toPage6"
        ></q-btn>
    </div>
  </div>
</template>
<script setup  lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";

//ページ読み込み時に配列をランダムに並び替え
onMounted(()=>{
  shuffle(itemListMoralConviction.value);
});

//質問項目をシャッフルする関数
const shuffle = (list: any) => {
  return list.sort(() => Math.random() - 0.5);
};

//親からの受け取りデータ
const props = defineProps(['agreeAI','uri','UUID']);

//型定義
interface itemListTypeAttitudeStrength{
  seed: number,
  question: string,
  option1: string,
  option2: string,
  option3: string,
  option4: string,
  option5: string,
  option6: string,
  value1: string,
  value2: string,
  value3: string,
  value4: string,
  value5: string,
  value6: string,
  answer: string,
}

interface itemListTypeMoralConvition{
  seed: number,
  question: string,
  option1: string,
  option2: string,
  option3: string,
  option4: string,
  option5: string,
  value1: string,
  value2: string,
  value3: string,
  value4: string,
  value5: string,
  answer: string,
}

//質問項目設定
const itemListAttitudeStrength = ref<Array<itemListTypeAttitudeStrength>>([
  {
    seed: 1,
    question: `AIの活用に${props.agreeAI}というあなたの考えの強さについて回答してください`,
    option1: '非常に弱い<br/><span class="option-value">1</span>',
    option2: '　<br/><span class="option-value">2</span>',
    option3: '　<br/><span class="option-value">3</span>',
    option4: '　<br/><span class="option-value">4</span>',
    option5: '　<br/><span class="option-value">5</span>',
    option6: '非常に強い<br/><span class="option-value">6</span>',
    value1: '1',
    value2: '2',
    value3: '3',
    value4: '4',
    value5: '5',
    value6: '6',
    answer: '',   
  },
  {
    seed: 2,
    question: `AIの活用に${props.agreeAI}することがあなたにとってどの程度重要か回答してください`,
    option1: 'まったく重要でない<br/><span class="option-value">1</span>',
    option2: '　<br/><span class="option-value">2</span>',
    option3: '　<br/><span class="option-value">3</span>',
    option4: '　<br/><span class="option-value">4</span>',
    option5: '　<br/><span class="option-value">5</span>',
    option6: '非常に重要である<br/><span class="option-value">6</span>',
    value1: '1',
    value2: '2',
    value3: '3',
    value4: '4',
    value5: '5',
    value6: '6',
    answer: '',   
  },
  {
    seed: 3,
    question: `AIの活用に${props.agreeAI}ということがあなたにとってどの程度明確か回答してください`,
    option1: 'まったく明確でない<br/><span class="option-value">1</span>',
    option2: '　<br/><span class="option-value">2</span>',
    option3: '　<br/><span class="option-value">3</span>',
    option4: '　<br/><span class="option-value">4</span>',
    option5: '　<br/><span class="option-value">5</span>',
    option6: '非常に明確である<br/><span class="option-value">6</span>',
    value1: '1',
    value2: '2',
    value3: '3',
    value4: '4',
    value5: '5',
    value6: '6',
    answer: '',   
  },
]);

const itemListMoralConviction = ref<Array<itemListTypeMoralConvition>>([
  {
    seed: 1,
    question: 'あなたが根底に持っている道徳的な信念や信条を，どのくらい反映していますか？',
    option1: 'まったく<br/>反映していない<br/><span class="option-value">1</span>',
    option2: '少し<br/>反映している<br/><span class="option-value">2</span>',
    option3: 'ある程度<br/>反映している<br/><span class="option-value">3</span>',
    option4: '強く<br/>反映している<br/><span class="option-value">4</span>',
    option5: '非常に強く<br/>反映している<br/><span class="option-value">5</span>',
    value1: '1',
    value2: '2',
    value3: '3',
    value4: '4',
    value5: '5',
    answer: '',
  },
  {
    seed: 2,
    question: '基本的な善悪についての，あなたの考え方と，どのくらい関係していますか？',
    option1: 'まったく<br/>関係していない<br/><span class="option-value">1</span>',
    option2: '少し<br/>関係している<br/><span class="option-value">2</span>',
    option3: 'ある程度<br/>関係している<br/><span class="option-value">3</span>',
    option4: '強く<br/>関係している<br/><span class="option-value">4</span>',
    option5: '非常に強く<br/>関係している<br/><span class="option-value">5</span>',
    value1: '1',
    value2: '2',
    value3: '3',
    value4: '4',
    value5: '5',
    answer: '',
  },
  {
    seed: 3,
    question: 'どのくらい，道徳的な原則に基づくものですか？',
    option1: 'まったく<br/>基づかない<br/><span class="option-value">1</span>',
    option2: '少し<br/>基づく<br/><span class="option-value">2</span>',
    option3: 'ある程度<br/>基づく<br/><span class="option-value">3</span>',
    option4: '強く<br/>基づく<br/><span class="option-value">4</span>',
    option5: '非常に強く<br/>基づく<br/><span class="option-value">5</span>',
    value1: '1',
    value2: '2',
    value3: '3',
    value4: '4',
    value5: '5',
    answer: '',
  },
  {
    seed: 4,
    question: 'どのくらい，道徳的なスタンスを表していますか？',
    option1: 'まったく<br/>表していない<br/><span class="option-value">1</span>',
    option2: '少し<br/>表している<br/><span class="option-value">2</span>',
    option3: 'ある程度<br/>表している<br/><span class="option-value">3</span>',
    option4: '強く<br/>表している<br/><span class="option-value">4</span>',
    option5: '非常に強く<br/>表している<br/><span class="option-value">5</span>',
    value1: '1',
    value2: '2',
    value3: '3',
    value4: '4',
    value5: '5',
    answer: '',
  }
]);

//次のページへ
const toPage6 = function(){
  window.scrollTo(0, 0);  
  const body: string = `AIAS=${itemListAttitudeStrength.value.find((e:any) => e.seed === 1)?.answer}&AIAI=${itemListAttitudeStrength.value.find((e:any) => e.seed === 2)?.answer}&AIAC=${itemListAttitudeStrength.value.find((e:any) => e.seed === 3)?.answer}&AIMC1=${itemListMoralConviction.value.find((e:any) => e.seed === 1)?.answer}&AIMC2=${itemListMoralConviction.value.find((e:any) => e.seed === 2)?.answer}&AIMC3=${itemListMoralConviction.value.find((e:any) => e.seed === 3)?.answer}&AIMC4=${itemListMoralConviction.value.find((e:any) => e.seed === 4)?.answer}`;
  postData('page7', body);
  execEmit();
};

const emit = defineEmits(['eventEmit'])
const execEmit = () => {
  emit('eventEmit', { 'tab': 'page8', 'progress': 0.35})
}

//データを送信する関数
const postData = async(route: string, body: string) => {
  
  //GASにリクエストを送る
	const requestOptions: any = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: `route=${route}&uuid=${props.UUID}&` + body,
	};

	let result: string = '';

	await fetch(props.uri, requestOptions)
		.then((res) => {
      console.log(res.json());
      result = 'complete';
    })
		.catch(async(err) => {

      //エラー用リクエスト
      const requestOptionsError: any = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `route=error&uuid=${props.UUID}&dateTime=${new Date().toISOString().slice(0, 19).replace('T', ' ')}&error=${err}&page=${route}&data=${body}`,
      };

      await fetch(props.uri, requestOptionsError)
        .then((res) => {
          console.log(res.json());
          result = 'error';
        });
      });

  return result;
};

</script>
<style lang="scss">
span.option-value{
  font-size: 18px;
  margin-bottom: 0px;
}
</style>