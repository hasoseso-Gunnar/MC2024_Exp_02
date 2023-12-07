<template>
  <div class="q-pa-md">
    <p>※このページは30秒経過すると、ページ下部のボタンから次のステップへ進めるようになります。</p>
    <br/>
    <p class="text-subtitle1 text-black">これより、ゲーム内でのシグナルの送り方について説明します。</p>
    <br/>
    <p class="text-subtitle1 text-black">今回、<span class="text-bold text-red-9">あなたは音のシグナルを出す役割</span>を与えられました。</p>
    <div style="height: 30px;"></div>
    <p class="text-subtitle1 text-black">シグナル音は、パートナーがクイズに<span class="text-bold text-red-9">正解した場合は「ピンポンピンポン」</span>と鳴る正解音、<span class="text-bold text-red-9">不正解の場合は「ブブー」</span>と鳴る不正解音を鳴らすことになります。</p>
    <p class="text-subtitle1 text-black">以下の画像のように、シグナル音はパートナーの回答結果が表示される画面で、スライダーを用いて音量を調整して送信してください。</p>
    <br>
    <q-img 
      loading="eager"
      src="https://hasoseso-gunnar.github.io/MC2024_Exp_02/gameExample2.jpg"
      width="80%"
      class="q-mb-lg"
      style="margin-left: 10%;"
    />
    <br/>
    <p class="text-subtitle1 text-black">一方で、<span class="text-bold">パートナーからは「色のシグナル」</span>が送られてきます。</p>
    <p class="text-subtitle1 text-black">上記の画像のように、シグナル音の発信と同じタイミングでパートナーから「色のシグナル」が送られてきますので、できるだけ意図を汲み取るようにしてください。</p>
    <div style="height: 30px;"></div>
    <p class="text-subtitle1 text-black">また、ゲームを開始する前に、<span class="text-bold">実際にシグナル音を聞きながら</span>以下のスライダーを操作して<span class="text-bold text-red-9">「正解音」と「不正解音」のそれぞれについて、自分が適正だと思う音量を設定</span>してください。</p>
    <div style="height: 10px;"></div>
    <span>※サンプル音は何回聞いて頂いても大丈夫です。(最低でも1回以上聞いてください)</span>
    <br>
    <span>※適性音量が定まらない際は、お使いの機器の音量も調節してください。</span>
    <br>
    <span>※ボタンを最初に押した際に、音が出ない場合がありますが、端末が音源のデータを読み込むのに時間が掛かっているためです。</span>
    <br>
    <span>※音が聞こえない場合は、音が聞こえるまでボタンを押し続けてください。</span>
    <div style="height: 80px;"></div>
    <div class="row">
      <div class="col-2"></div>
      <q-slider
        v-model="volumeCorrect"
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
        label="正解音"
        style="height: 50px; font-size: 19px; font-weight: bold;"
        icon="sensors"
        @click="activateSoundCorrect"
      />
    </div>
    <div style="height: 80px;"></div>
    <div class="row">
      <div class="col-2"></div>
      <q-slider
        v-model="volumeWrong"
        :min="0"
        :max="100"
        color="red"
        :marker-labels="markerLabel"
        label-always
        class="col-8"
      />
    </div>
    <div style="height: 40px;"></div>
    <div class="row">
      <div class="col-5"></div>
      <q-btn
        class="bg-red text-white col-2"
        label="不正解音"
        style="height: 50px; font-size: 19px; font-weight: bold;"
        icon="sensors"
        @click="activateSoundWrong"
      />
    </div>
    <div style="height: 60px;"></div>
    <div align="right">
      <q-btn 
            v-if="thirtySecondsPassed === false || soundCountCorrect === 0 || soundCountWrong === 0"
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
  //30秒待つ
  setTimeout(async() => {
    thirtySecondsPassed.value = true;
  }, 30000);
});

//20秒カウント過ぎたかどうか
const thirtySecondsPassed = ref<boolean>(false);

//音量に関する変数
const volumeCorrect = ref<number>(0);
const volumeWrong = ref<number>(0);
const soundCountCorrect = ref<number>(0);
const soundCountWrong = ref<number>(0);
const markerLabel = ref<any>([        
    { value: 0, label: '0' },
    { value: 20, label: '20' },
    { value: 40, label: '40' },
    { value: 60, label: '60' },
    { value: 80, label: '80' },
    { value: 100, label: '100' },
  ]);

//正解音を出す関数
const activateSoundCorrect = () => {
  const audio = new Audio('https://hasoseso-gunnar.github.io/MC2024_Exp_02/correct.mp3');
  const volumeFloat = parseFloat(String(volumeCorrect.value)) / 100;
  audio.volume = volumeFloat;
  audio.play();
  soundCountCorrect.value += 1
};

//不正解音を出す関数
const activateSoundWrong = () => {
  const audio = new Audio('https://hasoseso-gunnar.github.io/MC2024_Exp_02/wrong.mp3');
  const volumeFloat = parseFloat(String(volumeWrong.value)) / 100;
  audio.volume = volumeFloat;
  audio.play();
  soundCountWrong.value += 1
};

//次のページへ
const toPage12 = function(){
  window.scrollTo(0, 0);  
  const body: string = `volumeCorrect=${volumeCorrect.value}&volumeWrong=${volumeWrong.value}&condition=${props.condition}`;
  postData('page11', body);  
  execEmit();
};

const emit = defineEmits(['eventEmit'])
const execEmit = () => {
  emit('eventEmit', { 'tab': 'page12', 'progress': Math.round(0.55 * 100) / 100,'volume': volumeCorrect.value })
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

</style>