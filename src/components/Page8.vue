<template>
  <div class="q-pa-md">
    <p class="text-subtitle1 text-black">次に、<span class="text-bold">あなたが学問やビジネスでのAIの積極的活用に{{ props.agreeAI }}する理由</span>を、下記の自由記述欄に100～200文字で記述してください。</p>
    <br>
    <q-input 
      v-model="openEndedQuesiton"
      type="textarea"
      dense
      outlined
      :rules="[
          val => val.length >= 100 || '100文字以上で記述してください',
          val => val.length <= 200 || '200文字以内で記述してください',
        ]"
      lazy-rules
      counter
      maxlength="200"
      @update:model-value="checkTextLength"
    >
    </q-input>
  </div>
  <div class="q-pa-md q-mt-xl">
    <div align="right">
        <q-btn 
            v-if="!openEndedFinished"
            label="次のページへ"
            flat
            class="bg-grey text-white"
        ></q-btn>
        <q-btn 
            v-else
            label="次のページへ"
            flat
            class="bg-blue-7 text-white"
            @click="toPage9"
        ></q-btn>
    </div>
  </div>
</template>
<script setup  lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";

//親からの受け取りデータ
const props = defineProps(['agreeAI','uri','UUID']);

//自由記述内容
const openEndedQuesiton = ref<string>('');
const openEndedFinished = ref<boolean>(false);

//自由記述内容が規定の文字数か判定
const checkTextLength = () => {
  //100文字以上200文字以下の場合
  if(openEndedQuesiton.value.length >= 100 && openEndedQuesiton.value.length <= 200){
    openEndedFinished.value = true;
  //それ以外の場合
  }else{
    openEndedFinished.value = false;
  }
};

//次のページへ
const toPage9 = function(){
  window.scrollTo(0, 0);  
  const body: string = `AIOEQ=${openEndedQuesiton.value}`;
  postData('page8', body);  
  execEmit();
};

const emit = defineEmits(['eventEmit'])
const execEmit = () => {
  emit('eventEmit', { 'tab': 'page9', 'progress': 0.4})
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