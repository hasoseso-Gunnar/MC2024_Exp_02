<template>
  <p class="text-h5 text-black text-bold" style="text-decoration: underline;">データ使用に関する同意のお願い</p>
  <br/>
  <p class="text-h6 text-bold text-red-9">※まだ画面を閉じないでください。</p>
  <br/>
  <p class="description">改めて、研究にご協力いただき、ありがとうございました。</p>
  <p class="description">これから、本研究の目的について、改めて説明します。</p>
  <br/>
  <p class="title">研究目的</p>
  <p class="description">本研究は、新型コロナウイルスの感染予防について、自分の意見を「正しい」ものと考えることがもたらす影響について調べています。</p>
  <p class="description">具体的には、いくつかの予防行動に関する考え方と、その考え方が異なる人々との付き合い方について尋ねました。</p>
  <br/>
  <br/>
  <p class="title">データ分析への同意確認</p>
  <p class="description">最後に、あなたの回答を分析に含めてもよいかどうかを、改めて伺います。</p>
  <p class="description">事前にお伝えした通り、本研究は匿名回答のため、個人が特定されることはありません。</p>
  <br/>
  <p class="title">調査実施機関：</p>
  <p class="description">名古屋大学 大学院情報学研究科</p>
  <p class="description">社会心理学研究室</p>
  <br/>
  <br/>
  <p class="description" style="font-size: 19px;">あなたは上記の説明を理解し、自身のデータが分析されることに同意しますか。</p>
  <br/>
  <div class="row">
    <div class="col-4" align="center" :style="radioAgree === '1' ? 'background-color: #CCEBFF;': ''">
      <p class="description" style="font-size: 19px;">同意する</p>
      <q-radio 
        v-model="radioAgree" 
        size="xl" 
        checked-icon="task_alt" 
        unchecked-icon="panorama_fish_eye" 
        val="1"
      />
    </div>
    <div class="col-4" align="center" :style="radioAgree === '0' ? 'background-color: #CCEBFF;': ''">
      <p class="description" style="font-size: 19px;">同意しない</p>
      <q-radio 
        v-model="radioAgree" 
        size="xl" 
        checked-icon="task_alt" 
        unchecked-icon="panorama_fish_eye" 
        val="0"
      />
    </div>
  </div>
  <div class="q-mt-xl" align="right">
      <q-btn 
        v-if="radioAgree === ''"
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
        :loading="loading"
        @click="toPage20"
      ></q-btn>
  </div>
</template>
<script setup  lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";

//親からの受け取りデータ
const props = defineProps(['uri','UUID']);

//変数
const radioAgree = ref<string>('');
const loading = ref<boolean>(false);

//次のページへ
const toPage20 = async function(){
  loading.value = true;
  const body: string = `agreeData=${radioAgree.value}&endDateTime=${new Date().toLocaleString("ja-JP", {timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit"}).replace(/\//g, '-')}`;
  await postData('page19', body);
  loading.value = false;
  window.scrollTo(0, 0);
  execEmit();
};

const emit = defineEmits(['eventEmit'])
const execEmit = () => {
  emit('eventEmit', { 'tab': 'page20', 'progress': 1.0 });
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