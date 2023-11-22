<template>
  <div class="q-pa-md">
    <p class="text-subtitle1 text-black">次に<span class="text-bold">さまざまな物事についてのあなたの賛否</span>をお尋ねします。</p>
    <br>
    <div v-for="(prop, i) in itemList">
      <p class="text-subtitle1 text-black" style="margin-bottom: 0px;">{{ prop.question1 }}</p>
      <p class="text-subtitle1 text-black" v-html="prop.question2"></p>
      <br/>
      <div class="row q-mb-xl">
        <div class="col-1"></div>
        <div class="col-2" align="center" :style="prop.answer === '1' ? 'background-color: #CCEBFF;': ''">
          <p>{{ prop.option1 }}</p>
          <q-radio 
            v-model="prop.answer"
            checked-icon="task_alt" 
            unchecked-icon="panorama_fish_eye" 
            :val="prop.value1"
          />
        </div>
        <div class="col-2" align="center" :style="prop.answer === '2' ? 'background-color: #CCEBFF;': ''">
          <p>{{ prop.option2 }}</p>
          <q-radio 
            v-model="prop.answer"
            checked-icon="task_alt" 
            unchecked-icon="panorama_fish_eye" 
            :val="prop.value2"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="q-pa-md q-mt-xl">
    <div align="right">
        <q-btn 
            v-if="itemList[0].answer === '' || itemList[1].answer === '' || itemList[2].answer === '' || itemList[3].answer === '' || itemList[4].answer === ''"
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

//親からの受け取りデータ
const props = defineProps(['uri','UUID']);

//ページ読み込み時に配列をランダムに並び替え
onMounted(()=>{
  shuffle(itemList.value);
});

//質問項目をシャッフルする関数
const shuffle = (list: any) => {
  return list.sort(() => Math.random() - 0.5);
};

//型定義
interface itemListType{
  seed: number,
  question1: string,
  question2: string,
  option1: string,
  option2: string,
  value1: string,
  value2: string,
  answer: string,
}

//質問項目設定
const itemList = ref<Array<itemListType>>([
  {
    seed: 1,
    question1: '近年、少子化に伴う労働人口の増加の解決手段として、日本への移民の積極的受け入れが議論されています。',
    question2: 'あなたは、<span class="text-bold">日本での移民の積極的な受け入れ</span>について、賛成ですか？反対ですか？',
    option1: '賛成',
    option2: '反対',
    value1: '1',
    value2: '2',
    answer: '',
  },
  {
    seed: 2,
    question1: '現在、政府は物価高に対応するために所得税の減税や非課税世帯への給付を行う一方、防衛費の財源確保のために将来的に増税を行うと公表しています。',
    question2: 'あなたは、<span class="text-bold">防衛費の財源確保のために将来的に増税を行う</span>について、賛成ですか？反対ですか？',
    option1: '賛成',
    option2: '反対',
    value1: '1',
    value2: '2',
    answer: '',
  },
  {
    seed: 3,
    question1: '近年、文章や画像などの自動生成を行う生成系AIの技術が目覚ましく発展しています。',
    question2: 'あなたは、<span class="text-bold">学問やビジネスなどでのAIの積極的な利用</span>について、賛成ですか？反対ですか？',
    option1: '賛成',
    option2: '反対',
    value1: '1',
    value2: '2',
    answer: '',
  },
  {
    seed: 4,
    question1: '現在、日本各地でクマの住宅街での出没が社会問題となっており、実際に人が襲われるケースなどが出てきています。',
    question2: 'あなたは、<span class="text-bold">住宅街に出没したクマを例外なく駆除すること</span>について、賛成ですか？反対ですか？',
    option1: '賛成',
    option2: '反対',
    value1: '1',
    value2: '2',
    answer: '',
  },
  {
    seed: 5,
    question1: '近年、持続可能性などの観点から肉魚に代わるタンパク源として昆虫食が注目されています。',
    question2: 'あなたは、<span class="text-bold">現在の食生活に昆虫食を取り入れること</span>について、賛成ですか？反対ですか？',
    option1: '賛成',
    option2: '反対',
    value1: '1',
    value2: '2',
    answer: '',
  },
]);

//プロフィール情報提示などで使用する変数
const agreeImmigrant = ref<string>('');
const agreeDefenseCost = ref<string>('');
const agreeAI = ref<string>('');
const agreeBear = ref<string>('');
const agreeInsect = ref<string>('');

//次のページへ
const toPage4 = function(){
  window.scrollTo(0, 0);  
  const body: string = `agree1=${itemList.value.find((e:any) => e.seed === 1)?.answer}&agree2=${itemList.value.find((e:any) => e.seed === 2)?.answer}&agree3=${itemList.value.find((e:any) => e.seed === 3)?.answer}&agree4=${itemList.value.find((e:any) => e.seed === 4)?.answer}&agree5=${itemList.value.find((e:any) => e.seed === 5)?.answer}`;
  postData('page3', body);
  execEmit();
};

const emit = defineEmits(['eventEmit'])
const execEmit = () => {
  itemList.value.forEach((e:any)=>{
    if(e.seed === 1){
      agreeImmigrant.value = e.answer === '1' ? '賛成' :  '反対';
    }else if(e.seed === 2){
      agreeDefenseCost.value = e.answer === '1' ? '賛成' :  '反対';
    }else if(e.seed === 3){
      agreeAI.value = e.answer === '1' ? '賛成' :  '反対';
    }else if(e.seed === 4){
      agreeBear.value = e.answer === '1' ? '賛成' :  '反対';
    }else if(e.seed === 5){
      agreeInsect.value = e.answer === '1' ? '賛成' :  '反対';
    }
  });
  emit('eventEmit', { 
    'tab': 'page4', 
    'progress': 0.15, 
    'agreeImmigrant' : agreeImmigrant.value, 
    'agreeDefenseCost': agreeDefenseCost.value, 
    'agreeAI' : agreeAI.value,
    'agreeBear' : agreeBear.value,
    'agreeInsect' : agreeInsect.value,
  });
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

</style>