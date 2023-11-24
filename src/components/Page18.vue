<template>
  <div class="q-pa-md">
    <p class="text-subtitle1 text-black">社会的・経済的・政治的な問題に関する考え方の違いについて、「保守的－リベラル」と区分されることがあります。</p>
    <p class="text-subtitle1 text-black">以下の質問を読んで、あなた自身の立場に最も近い数字を選んでください。</p>
    <br>
    <div v-for="(prop, i) in itemList">
      <p class="text-subtitle1 text-black" v-html="prop.question1"></p>
      <p class="text-subtitle1 text-black" v-html="prop.question2"></p>
      <br/>
      <div class="row q-mb-xl">
        <div class="seven-options" align="center" :style="prop.answer === '1' ? 'background-color: #CCEBFF;': ''">
          <div v-html="prop.option1"></div>
          <q-radio 
            v-model="prop.answer"
            checked-icon="task_alt" 
            unchecked-icon="panorama_fish_eye" 
            :val="prop.value1"
          />
        </div>
        <div class="seven-options" align="center" :style="prop.answer === '2' ? 'background-color: #CCEBFF;': ''">
          <div v-html="prop.option2"></div>
          <q-radio 
            v-model="prop.answer"
            checked-icon="task_alt" 
            unchecked-icon="panorama_fish_eye" 
            :val="prop.value2"
          />
        </div>
        <div class="seven-options" align="center" :style="prop.answer === '3' ? 'background-color: #CCEBFF;': ''">
          <div v-html="prop.option3"></div>
          <q-radio 
            v-model="prop.answer"
            checked-icon="task_alt" 
            unchecked-icon="panorama_fish_eye" 
            :val="prop.value3"
          />
        </div>
        <div class="seven-options" align="center" :style="prop.answer === '4' ? 'background-color: #CCEBFF;': ''">
          <div v-html="prop.option4"></div>
          <q-radio 
            v-model="prop.answer"
            checked-icon="task_alt" 
            unchecked-icon="panorama_fish_eye" 
            :val="prop.value4"
          />
        </div>
        <div class="seven-options" align="center" :style="prop.answer === '5' ? 'background-color: #CCEBFF;': ''">
          <div v-html="prop.option5"></div>
          <q-radio 
            v-model="prop.answer"
            checked-icon="task_alt" 
            unchecked-icon="panorama_fish_eye" 
            :val="prop.value5"
          />
        </div>
        <div class="seven-options" align="center" :style="prop.answer === '6' ? 'background-color: #CCEBFF;': ''">
          <div v-html="prop.option6"></div>
          <q-radio 
            v-model="prop.answer"
            checked-icon="task_alt" 
            unchecked-icon="panorama_fish_eye" 
            :val="prop.value6"
          />
        </div>
        <div class="seven-options" align="center" :style="prop.answer === '7' ? 'background-color: #CCEBFF;': ''">
          <div v-html="prop.option7"></div>
          <q-radio 
            v-model="prop.answer"
            checked-icon="task_alt" 
            unchecked-icon="panorama_fish_eye" 
            :val="prop.value7"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="q-pa-md q-mt-xl">
    <div align="right">
        <q-btn 
            v-if="itemList[0].answer === '' || itemList[1].answer === '' || itemList[2].answer === ''"
            label="次のページへ"
            flat
            class="bg-grey text-white"
        ></q-btn>
        <q-btn 
            v-else
            label="次のページへ"
            flat
            class="bg-blue-7 text-white"
            @click="toPage19"
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
  option3: string,
  option4: string,
  option5: string,
  option6: string,
  option7: string,
  value1: string,
  value2: string,
  value3: string,
  value4: string,
  value5: string,
  value6: string,
  value7: string,
  answer: string,
}

//質問項目設定
const itemList = ref<Array<itemListType>>([
  {
    seed: 1,
    question1: '<span class="text-bold text-underline">環境や人権などの社会的なことがらについて</span>',
    question2: '<span class="text-bold">「保守的」</span>を<span class="text-underline"/>伝統的な価値を重視し急激な変革よりも安定を望む立場</span>、<span class="text-bold">「リベラル」</span>を<span class="text-underline"/>現状維持よりも改革を重視し弱者の地位向上を志向する立場</span>と定義するなら、あなたはどちらかというと、社会的に保守的ですか？リベラルですか？',
    option1: 'かなり<br/>リベラル<br/><span class="option-value">1</span>',
    option2: '　<br/>リベラル<br/><span class="option-value">2</span>',
    option3: 'やや<br/>リベラル<br/><span class="option-value">3</span>',
    option4: '<br/>中立<br/><span class="option-value">4</span>',
    option5: 'やや<br/>保守的<br/><span class="option-value">5</span>',
    option6: '　<br/>保守的<br/><span class="option-value">6</span>',
    option7: 'かなり<br/>保守的<br/><span class="option-value">7</span>',
    value1: '1',
    value2: '2',
    value3: '3',
    value4: '4',
    value5: '5',
    value6: '6',
    value7: '7',
    answer: '',
  },
  {
    seed: 2,
    question1: '<span class="text-bold text-underline">経済的なことがらについて</span>',
    question2: '<span class="text-bold">「保守的」</span>を<span class="text-underline"/>競争原理に基づく自由な経済活動を望む立場</span>、<span class="text-bold">「リベラル」</span>を<span class="text-underline"/>政府の規制等に基づく平等な富の分配を望む立場</span>と定義するなら、あなたはどちらかというと、経済的に保守的ですか？リベラルですか？',
    option1: 'かなり<br/>リベラル<br/><span class="option-value">1</span>',
    option2: '　<br/>リベラル<br/><span class="option-value">2</span>',
    option3: 'やや<br/>リベラル<br/><span class="option-value">3</span>',
    option4: '<br/>中立<br/><span class="option-value">4</span>',
    option5: 'やや<br/>保守的<br/><span class="option-value">5</span>',
    option6: '　<br/>保守的<br/><span class="option-value">6</span>',
    option7: 'かなり<br/>保守的<br/><span class="option-value">7</span>',
    value1: '1',
    value2: '2',
    value3: '3',
    value4: '4',
    value5: '5',
    value6: '6',
    value7: '7',
    answer: '',
  },
  {
    seed: 3,
    question1: '<span class="text-bold text-underline">政治的な志向について</span>',
    question2: '<span class="text-bold">「保守的」</span>を<span class="text-underline"/>社会の制度を作ったり政治力を用いたりする目的が、安定した社会を築くためだと考える立場</span>、<span class="text-bold">「リベラル」</span>をそれらが<span class="text-underline"/>社会の改革のためにあると考える立場</span>と定義するなら、あなたはどちらかというと、政治的に保守的ですか？リベラルですか？',
    option1: 'かなり<br/>リベラル<br/><span class="option-value">1</span>',
    option2: '　<br/>リベラル<br/><span class="option-value">2</span>',
    option3: 'やや<br/>リベラル<br/><span class="option-value">3</span>',
    option4: '<br/>中立<br/><span class="option-value">4</span>',
    option5: 'やや<br/>保守的<br/><span class="option-value">5</span>',
    option6: '　<br/>保守的<br/><span class="option-value">6</span>',
    option7: 'かなり<br/>保守的<br/><span class="option-value">7</span>',
    value1: '1',
    value2: '2',
    value3: '3',
    value4: '4',
    value5: '5',
    value6: '6',
    value7: '7',
    answer: '',
  }
]);

//次のページへ
const toPage19 = function(){
  window.scrollTo(0, 0);  
  const body: string = `socialIdeology=${itemList.value.find((e:any) => e.seed === 1)?.answer}&economicIdeology=${itemList.value.find((e:any) => e.seed === 2)?.answer}&politicalIdeology=${itemList.value.find((e:any) => e.seed === 3)?.answer}`;
  postData('page18', body);
  execEmit();
};

const emit = defineEmits(['eventEmit'])
const execEmit = () => {
  emit('eventEmit', { 'tab': 'page19', 'progress': 0.9 });
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
div.seven-options{
  width: calc(100% / 7);
}
span.text-underline{
  text-decoration: underline;
}
</style>