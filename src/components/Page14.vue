<template>
  <div class="q-pa-md">

    <q-card 
      class="relative-position task-card" 
      flat 
      bordered
    >
      <div>作成中</div>
    </q-card>
    <br>
    <div align="right">
      <q-btn 
          label="次のページへ"
          flat
          class="bg-blue-7 text-white"
          @click="toPage15"
      ></q-btn>
    </div>
  </div>
</template>
<script setup  lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";

//ページ読み込んだ際の処理
onMounted(async()=>{

  //検索中表示を終わらせる処理
  setTimeout(async() => {
      visible.value = false;
      showSimulatedReturnData.value = true;

  }, 4000);
});

//親からの受け取りデータ
const props = defineProps(['uri','UUID']);

//読み込み中の画面を制御する変数
const visible = ref<boolean>(true);
const showSimulatedReturnData = ref<boolean>(false);
const visibleCountDown = ref<boolean>(false);

//測定データ
const quiz1 = ref<string>('');
const quiz2 = ref<string>('');
const quiz3 = ref<string>('');
const quiz4 = ref<string>('');
const quiz5 = ref<string>('');
const attackVolume1 = ref<number>(0);
const attackVolume2 = ref<number>(0);
const attackVolume3 = ref<number>(0);
const attackVolume4 = ref<number>(0);
const attackVolume5 = ref<number>(0);
const attackCount1 = ref<number>(0);
const attackCount2 = ref<number>(0);
const attackCount3 = ref<number>(0);
const attackCount4 = ref<number>(0);
const attackCount5 = ref<number>(0);
const score = ref<number>(0);

//次のページへ
const toPage15 = async function(){
  window.scrollTo(0, 0);
  const body: string = `quiz1=${quiz1.value}&quiz2=${quiz2.value}&quiz3=${quiz3.value}&quiz4=${quiz4.value}&quiz5=${quiz5.value}&attackVolume1=${attackVolume1.value}&attackVolume2=${attackVolume2.value}&attackVolume3=${attackVolume3.value}&attackVolume4=${attackVolume4.value}&attackVolume5=${attackVolume5.value}&attackCount1=${attackCount1.value}&attackCount2=${attackCount2.value}&attackCount3=${attackCount3.value}&attackCount4=${attackCount4.value}&attackCount5=${attackCount5.value}&score=${score.value}`;
  await postData('page14', body);  
  execEmit();
};

const emit = defineEmits(['eventEmit'])
const execEmit = () => {
  emit('eventEmit', { 'tab': 'page15', 'progress': 0.7})
};

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
.task-card{
  height: 350px;
}
</style>