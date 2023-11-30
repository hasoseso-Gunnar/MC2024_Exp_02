<template>
  <div class="q-pa-md">
    <p class="text-subtitle1 text-black text-bold">これより、ゲーム内でのシグナルの送り方について説明します。</p>
    <p>※このページは30秒経過すると、ページ下部のボタンから次のステップへ進めるようになります。</p>
    <br/>
    <p class="text-subtitle1 text-black">今回、<span class="text-bold text-red-9">あなたは音のシグナルを出す役割</span>を与えられました。</p>
    <p class="text-subtitle1 text-black">逆に、相手からは<span class="text-bold">「色のシグナル」</span>が送られてきます。</p>
    <div style="height: 30px;"></div>
    <p class="text-subtitle1 text-black">シグナル音は、パートナーがクイズに正解した場合は「ピンポンピンポン」と鳴る正解音、不正解の場合は「ブブー」と鳴る不正解音を鳴らすことになります。</p>
    <p class="text-subtitle1 text-black">以下の画像のように、各問題に回答したのちに正解が表示される画面で、スライダーを用いて音量を調整してパートナーに音を聞かせてください。</p>
    <br>
    <q-img 
      loading="eager"
      src="https://hasoseso-gunnar.github.io/MC2024_Exp_02/referee_yellowcard.png"
      width="150px"
      class="q-mb-lg"
      style="margin-left: 45%;"
    />
    <br/>
    <p class="text-subtitle1 text-black">また、ゲームを開始する前に、実際に音声を聞きながら以下のスライダーを操作して<span class="text-bold">「正解音」と「不正解音」のそれぞれについて、自分が適正だと思う音量を設定</span>してください。</p>
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
    <span>※サンプル音は何回聞いて頂いても大丈夫です。</span>
    <br>
    <span>※お使いの機器の音量も調節してください。</span>
    <br>
    <span>※ボタンを最初に押した際に、音が出ない場合がありますが、端末が音源のデータを読み込むのに時間が掛かっているためです。</span>
    <br>
    <span>※音が聞こえない場合は、音が聞こえるまでボタンを押し続けてください。</span>
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
  //30秒待つ
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