<template>
  <p class="text-h5 text-black text-bold text-underline text-center">データ使用に関する同意のお願い</p>
  <br/>
  <p class="text-h6 text-bold text-red-9 text-center">※まだ画面を閉じないでください。</p>
  <br/>
  <p class="description">研究にご協力いただき、ありがとうございました。</p>
  <p class="description">これより、本研究の目的について改めて説明します。</p>
  <br/>
  <p class="title text-underline">本研究の目的と手続きについて</p>
  <p class="description">本研究では、自身と意見が一致・不一致する他者とのコミュニケーションにおいて、どのような行動をとるかを調べています。</p>
  <p class="description">今回は、ゲームで協力するパートナーに対し、「音のシグナル」としてどれだけの音量を聞かせるか、どういった内容のコメントを行うかを調べました。</p>
  <br/>
  <q-img 
    loading="eager"
    src="https://hasoseso-gunnar.github.io/MC2024_Exp_02/referee_yellowcard.png"
    width="150px"
    class="q-mb-lg"
    style="margin-left: 45%;"
  ></q-img>
  <br/>
  <p class="description">本調査では、同時に調査に回答している実在する他者とマッチングしたように提示しましたが、実際にはあらかじめプログラムされた動作であり、パートナーもプログラムされた架空の人物です。</p>
  <p class="description">あなたが出した「音のシグナル」はコンピューターに対して行ったため、実際に音を聞いた人はいません。ご安心ください。</p>
  <br/>
  <p class="description text-bold">この実験内容について、他の人に伝えたりSNSに投稿したり一切しないよう、よろしくお願いいたします。</p>
  <br/>
  <p class="description">研究の目的上必要なことではありましたが、冒頭で皆さまに実際の目的とは異なる説明をしたことにつきまして、お詫びいたします。また、本研究に最後までご協力いただき、ありがとうございます。</p>
  <br/>
  <br/>
  <p class="title text-underline">データ分析への同意について（お願い）</p>
  <p class="description">質問調査での回答データを分析に含めることついて、改めて同意をいただきたく存じます。万が一ご自身の回答を分析に含められたくない場合は、「同意しない」を選択してください。その場合、あなたの回答は分析から除外されます。</p>
  <p class="description text-bold text-red-9">なお、「同意しない」を選択した場合でも、報酬を受け取ることができます。</p>
  <br/>
  <br/>
  <p class="description text-center" style="font-size: 19px;">あなたは上記の説明を理解し、自身のデータが分析されることに同意しますか。</p>
  <br/>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-4" align="center" :style="radioAgree === '1' ? 'background-color: #CCEBFF; border: 5px solid white;': 'background: rgba(0,0,0,.08); border: 5px solid white;'">
      <p class="description" style="font-size: 19px;">同意する</p>
      <q-radio 
        v-model="radioAgree" 
        size="xl" 
        checked-icon="task_alt" 
        unchecked-icon="panorama_fish_eye" 
        val="1"
      />
    </div>
    <div class="col-4" align="center" :style="radioAgree === '0' ? 'background-color: #CCEBFF; border: 5px solid white;': 'background: rgba(0,0,0,.08); border: 5px solid white;'">
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
        label="ID発行画面へ"
        flat
        :ripple="false"
        class="bg-grey text-white"
      ></q-btn>
      <q-btn 
        v-else
        label="ID発行画面へ"
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
  emit('eventEmit', { 'tab': 'page20', 'progress': 0.95 });
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