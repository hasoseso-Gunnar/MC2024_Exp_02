<template>
  <div class="q-pa-md">
    <p class="text-subtitle1 text-black text-bold">これより、ゲームのルールについて説明します。</p>
    <p>※このページは30秒経過すると、ページ下部のボタンから次のステップへ進めるようになります。</p>
    <p class="text-subtitle1 text-black">また、本調査では相手との遠隔でのコミュニケーションを通して、どれだけ課題の結果が変化するかを検証しています。</p>
    <p class="text-subtitle1 text-black">コミュニケーション方法の一環として、ゲームの中でパートナーに対してあなたは<span class="text-bold">シグナルを送る</span>ことができます。</p>
    <p class="text-subtitle1 text-black">シグナルには<span class="text-bold">「音のシグナル」</span>と<span class="text-bold">「色のシグナル」</span>の2種類があります。</p>
    <br>
    <p class="text-subtitle1 text-black">今回、<span class="text-bold text-red-9">あなたは音のシグナルを出す役割</span>を与えられました。</p>
    <p class="text-subtitle1 text-black">各問題に回答したのちに正解が表示されるタイミングで、以下のスライダーを用いて音量を調整してシグナルを発信してください。</p>
    <p class="text-subtitle1 text-black">また、<span class="text-bold">次のページに進む前にシグナル音を1回以上聞いて</span>ください。</p>
    <div style="height: 40px;"></div>
    <div class="row">
      <div class="col-2"></div>
      <q-slider
        v-model="volume"
        :min="0"
        :max="100"
        color="green"
        :marker-labels="markerLabel"
        label-always
        class="col-8"
      />
    </div>
    <div style="height: 40px;"></div>
    <div class="row">
      <div class="col-5"></div>
      <q-btn
        class="bg-green text-white col-2"
        label="シグナル"
        style="height: 50px; font-size: 19px; font-weight: bold;"
        icon="sensors"
        @click="activateSound"
      />
    </div>
    <div style="height: 30px;"></div>
    <span >※ボタンを最初に押した際に、音が出ない場合がありますが、端末が音源のデータを読み込むのに時間が掛かっているためです。</span>
    <br>
    <span>※音が聞こえない場合は、音が聞こえるまでボタンを押してください。</span>
    <div style="height: 60px;"></div>
    <p class="text-subtitle1 text-black">なお、相手からは<span class="text-bold">「色のシグナル」</span>が送られてきます。相手の意図を汲み取り、二人で協力して問題を解いてください。</p>
    <div style="height: 80px;"></div>
    <div align="right">
      <q-btn 
            v-if="thirtySecondsPassed === false || soundCount === 0"
            label="次のページへ"
            flat
            class="bg-grey text-white"
        ></q-btn>
        <q-btn 
            v-else
            label="次のページへ"
            flat
            class="bg-blue-7 text-white"
            @click="toPage12"
        ></q-btn>
    </div>
  </div>
</template>
<script setup  lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";

//親からの受け取りデータ
const props = defineProps(['uri','UUID','condition']);

//ページ読み込んだ際の処理
onMounted(async()=>{
  //20秒待つ
  setTimeout(async() => {
    thirtySecondsPassed.value = true;
  }, 30000);
});

//20秒カウント過ぎたかどうか
const thirtySecondsPassed = ref<boolean>(false);

//音量に関する変数
const volume = ref<number>(0);
const markerLabel = ref<any>([        
    { value: 0, label: '0' },
    { value: 20, label: '20' },
    { value: 40, label: '40' },
    { value: 60, label: '60' },
    { value: 80, label: '80' },
    { value: 100, label: '100' },
  ]);
const soundCount = ref<number>(0);

//音を出す関数
const activateSound = () => {
  //音源を指定
  const audio = new Audio('https://hasoseso-gunnar.github.io/MC2024_Exp_02/attack.mp3');
  // 音量を取得（0～1の範囲に変換）
  const volumeFloat = parseFloat(String(volume.value)) / 100;
  // 音量を設定
  audio.volume = volumeFloat;
  //音源を再生
  audio.play();

  //音源を聞いた回数をカウント
  soundCount.value += 1
};

//次のページへ
const toPage12 = function(){
  window.scrollTo(0, 0);  
  const body: string = `volume=${volume.value}&condition=${props.condition}`;
  postData('page11', body);  
  execEmit();
};

const emit = defineEmits(['eventEmit'])
const execEmit = () => {
  emit('eventEmit', { 'tab': 'page12', 'progress': Math.floor(0.55*100)/100 ,'volume': volume.value })
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