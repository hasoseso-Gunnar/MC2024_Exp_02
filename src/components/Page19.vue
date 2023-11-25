<template>
  <p class="text-h5 text-black text-bold text-underline text-center">データ使用に関する同意のお願い</p>
  <br/>
  <p class="text-h6 text-bold text-red-9 text-center">※まだ画面を閉じないでください。</p>
  <br/>
  <p class="description">改めて、研究にご協力いただき、ありがとうございました。</p>
  <p class="description">これから、本研究の目的について、改めて説明します。</p>
  <br/>
  <p class="title text-underline">本研究の目的と手続きについて</p>
  <p class="description">本研究では、他者との意見の一致や不一致が起きる際、それが好き・嫌いなど「好み」に関して起きる場合と、正しい・間違っているといった「道徳」に関して起きる場合で、相手に与えるペナルティーがどのように変化するかを調べています。</p>
  <br/>
  <q-img 
    loading="eager"
    src="https://hasoseso-gunnar.github.io/MC2024_Exp_02/referee_yellowcard.png"
    width="150px"
    class="q-mb-lg"
    style="margin-left: 45%;"
  ></q-img>
  <br/>
  <p class="description">調査では、事前に実験実施者によってプログラムされた行動をとる架空の参加者をパートナーとして提示し、日本での積極的な移民の受け入れについて、意見の一致あるいは不一致を経験していただきました。</p>
  <p class="description">このように意見が同じ・あるいは異なるパートナーに対し、「音のシグナル」としてクイズで協力する相手にどれだけの音量を聞かせるか、どういった内容の返信の記述を行うかを測定しました。</p>
  <p class="description">あなたが出した「音のシグナル」はコンピューターに対して行ったものですので、実際に音を聞いた人はいません。ご安心ください。</p>
  <br/>
  <p class="description text-bold">なお、この実験は今後も継続して参りますので、実験内容は他の人に言ったりSNSに投稿したりしないよう、よろしくお願いいたします。</p>
  <br/>
  <p class="description">最後に、研究の目的上、必要なことではありましたが、冒頭、皆さまに実際の目的とは異なる説明をしたことにつきまして、お詫びいたします。また、本研究に最後までご協力いただきましたこと、改めて、心より御礼申し上げます。</p>
  <br/>
  <br/>
  <p class="title text-underline">データ分析への同意について（お願い）</p>
  <p class="description">質問調査での回答データを分析に含めることついて、改めて同意をいただきたく存じます。万が一ご自身の回答を分析に含められたくない場合は、「同意しない」と回答してください。その場合、あなたの回答は分析から除外されます。</p>
  <br/>
  <p class="description text-bold text-red-9">なお、回答を分析に含めることについて同意しない場合でも、報酬を受け取ることができます。</p>
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