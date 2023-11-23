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

//次のページへ
const toPage15 = function(){
  window.scrollTo(0, 0);  
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
          body: `route=error&uuid=${props.UUID}&dateTime=${new Date().toISOString().slice(0, 19).replace('T', ' ')}&error=リクエストエラー&page=${route}`,
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
.task-card{
  height: 350px;
}
</style>