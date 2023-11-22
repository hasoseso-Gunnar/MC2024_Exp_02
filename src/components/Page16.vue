<template>
  <div class="q-pa-md">
    <p class="text-subtitle1 text-black">以下に続けて各質問を読み、<span class="text-bold text-red-9">正しい内容</span>を選択してください。</p>
    <div style="height: 40px;"></div>
    <p class="text-subtitle1 text-black">『先ほど一緒に<span class="text-red-9 text-bold">協力課題を行ったパートナー</span>は・・・』</p>
    <div style="height: 40px;"></div>
    <div v-for="(prop, i) in itemList">
      <p class="text-subtitle1 text-black" style="margin-bottom: 0px;">{{ prop.question }}</p>
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
            @click="toPage17"
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
  question: string,
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
    question: '日本での移民の積極的な受け入れに賛成でしたか？反対でしたか？',
    option1: '賛成',
    option2: '反対',
    value1: '1',
    value2: '2',
    answer: '',
  },
  {
    seed: 2,
    question: '防衛費の財源確保のための将来的な増税に賛成でしたか？反対でしたか？',
    option1: '賛成',
    option2: '反対',
    value1: '1',
    value2: '2',
    answer: '',
  },
  {
    seed: 3,
    question: 'AIの積極的な利用に賛成でしたか？反対でしたか？',
    option1: '賛成',
    option2: '反対',
    value1: '1',
    value2: '2',
    answer: '',
  },
  {
    seed: 4,
    question: '住宅街に出没したクマの駆除に賛成でしたか？反対でしたか？',
    option1: '賛成',
    option2: '反対',
    value1: '1',
    value2: '2',
    answer: '',
  },
  {
    seed: 5,
    question: '現在の食生活に昆虫食を取り入れることに賛成でしたか？反対でしたか？',
    option1: '賛成',
    option2: '反対',
    value1: '1',
    value2: '2',
    answer: '',
  },
]);

//次のページへ
const toPage17 = function(){
  window.scrollTo(0, 0);  
  const body: string = `manipulationCheck1=${itemList.value.find((e:any) => e.seed === 1)?.answer}&manipulationCheck2=${itemList.value.find((e:any) => e.seed === 2)?.answer}&manipulationCheck3=${itemList.value.find((e:any) => e.seed === 3)?.answer}&manipulationCheck4=${itemList.value.find((e:any) => e.seed === 4)?.answer}&manipulationCheck5=${itemList.value.find((e:any) => e.seed === 5)?.answer}`;
  postData('page16', body);
  execEmit();
};

const emit = defineEmits(['eventEmit']);
const execEmit = () => {emit('eventEmit', { 'tab': 'page17', 'progress': 1.0});
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