<template>
  <div class="q-pa-md">
    <p class="text-subtitle1 text-black">以下に続けて各質問を読み、<span class="text-bold text-red-9">正しい内容</span>を選択してください。</p>
    <div style="height: 40px;"></div>
    <p class="text-subtitle1 text-black">『先ほど一緒に<span class="text-red-9 text-bold">ゲームを行ったパートナー</span>は・・・』</p>
    <div style="height: 40px;"></div>
    <div v-for="(prop, i) in itemList">
      <p class="text-subtitle1 text-black" style="margin-bottom: 0px;" v-html="prop.question"></p>
      <br/>
      <div class="row q-mb-xl">
        <div class="col-1"></div>
        <div class="col-2" align="center" :style="prop.answer === '1' ? 'background-color: #CCEBFF; border: 5px solid white;': 'background: rgba(0,0,0,.08); border: 5px solid white;'">
          <p>{{ prop.option1 }}</p>
          <q-radio 
            v-model="prop.answer"
            checked-icon="task_alt" 
            unchecked-icon="panorama_fish_eye" 
            :val="prop.value1"
          />
        </div>
        <div class="col-2" align="center" :style="prop.answer === '2' ? 'background-color: #CCEBFF; border: 5px solid white;': 'background: rgba(0,0,0,.08); border: 5px solid white;'">
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
            v-if="itemList[0].answer === '' || itemList[1].answer === '' || itemList[2].answer === '' || itemList[3].answer === ''"
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
    question: '<span class="text-bold">日本での移民の積極的な受け入れ</span>に賛成でしたか？反対でしたか？',
    option1: '賛成',
    option2: '反対',
    value1: '1',
    value2: '2',
    answer: '',
  },
  {
    seed: 2,
    question: '<span class="text-bold">防衛費の財源確保のための将来的な増税</span>に賛成でしたか？反対でしたか？',
    option1: '賛成',
    option2: '反対',
    value1: '1',
    value2: '2',
    answer: '',
  },
  {
    seed: 3,
    question: '<span class="text-bold">AI（人工知能）の積極的な利用</span>に賛成でしたか？反対でしたか？',
    option1: '賛成',
    option2: '反対',
    value1: '1',
    value2: '2',
    answer: '',
  },
  {
    seed: 4,
    question: '<span class="text-bold">住宅街に出没したクマの駆除</span>に賛成でしたか？反対でしたか？',
    option1: '賛成',
    option2: '反対',
    value1: '1',
    value2: '2',
    answer: '',
  }
]);

//次のページへ
const toPage17 = function(){
  window.scrollTo(0, 0);  
  const body: string = `manipulationCheck1=${itemList.value.find((e:any) => e.seed === 1)?.answer}&manipulationCheck2=${itemList.value.find((e:any) => e.seed === 2)?.answer}&manipulationCheck3=${itemList.value.find((e:any) => e.seed === 3)?.answer}&manipulationCheck4=${itemList.value.find((e:any) => e.seed === 4)?.answer}`;
  postData('page16', body);
  execEmit();
};

const emit = defineEmits(['eventEmit']);
const execEmit = () => {emit('eventEmit', { 'tab': 'page17', 'progress': 0.8});
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
		.then(async(res) => {
      const data = await res.json();
      //成功したとき
      if(data.type === 'complete'){
        result = 'complete';
      
      //エラーが発生したとき
      }else{

        //エラー用リクエスト
        const requestOptionsError: any = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `route=error&uuid=${props.UUID}&dateTime=${new Date().toLocaleString("ja-JP", {timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit"}).replace(/\//g, '-')}&error=リクエストエラー&page=${route}`,
        };

        await fetch(props.uri, requestOptionsError)
          .then((res) => {
            console.log(res.json());
            result = 'error';
          });
        }
    })
		.catch(async(err) => {

      //エラー用リクエスト
      const requestOptionsError: any = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `route=error&uuid=${props.UUID}&dateTime=${new Date().toLocaleString("ja-JP", {timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit"}).replace(/\//g, '-')}&error=${err}&page=${route}&data=${body}`,
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