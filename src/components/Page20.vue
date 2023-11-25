<template>
  <p class="text-h6 text-bold text-red-9">※まだ画面を閉じないでください。</p>
  <br/>
  <p class="description text-bold text-red-9">※ブラウザの「更新」ボタンを押さないようにしてください。</p>
  <p class="description text-bold text-red-9">※ID番号の発行処理が正常に行われず、報酬の受け取りができなくなる場合があります。</p>
  <br/>
  <p class="description">以下のIDは、本研究への参加にあたり、あなた一人に発行されるIDです。</p>
  <br/>
  <p class="description">あなたのID番号は、　　<span class="text-bold text-h5">{{ rewardId }}</span>　　です。</p>
  <br/>
  <p class="description">上記ID番号をメモ帳などに保存してください。</p>
  <p class="description text-bold text-red-9">以降、ID番号を再確認することは出来ません。必ずメモ帳などに保存してください。</p>
  <br/>
  <p class="description text-bold text-red-9">報酬を受け取るには、上記ID番号をLancersの作業画面に正しく入力する必要があります。</p>
  <br/>
  <div class="q-mt-xl" align="right">
    <q-btn 
        v-if="loading === true"
        label="次のページへ"
        flat
        :ripple="false"
        class="bg-grey text-white"
      ></q-btn>
      <q-btn 
        v-else
        label="次のページへ"
        flat
        class="bg-blue-7 text-white"
        @click="toPage21"
      ></q-btn>
  </div>
</template>
<script setup  lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";

//ページを読み込んだ際にIDを発行し、表示
onMounted(async()=>{

  //読み込み開始
  loading.value = true;

  //ID発行
  const min = 10000000000 ;
  const max = 19999999999 ;
  const randomNumber = Math.floor(Math.random() * (max + 1 - min)) + min;
  rewardId.value = ('' + randomNumber).slice(-10);

  //リクエストを作成し、データ送信
  const body: string = `rewardId=${rewardId.value}`;
  await postData('page20', body);

  //読み込み終了
  loading.value = false;
});

//親からの受け取りデータ
const props = defineProps(['uri','UUID']);

//変数
const rewardId = ref<string>('');
const loading = ref<boolean>(false);

//次のページへ
const toPage21 = async function(){
  window.scrollTo(0, 0);
  execEmit();
};

const emit = defineEmits(['eventEmit'])
const execEmit = () => {
  emit('eventEmit', { 'tab': 'page21', 'progress': 1.0 });
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
p.text-underline{
  text-decoration: underline;
}
</style>