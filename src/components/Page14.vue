<template>
  <div class="q-pa-md">

    <q-card 
      class="task-card" 
      flat 
      bordered
    >

    <!-- 画面上部(クイズ時) -->
    <div class="row" style="width: 100%; height: 180px;" v-if="visible3">
        
      <!-- 問題文の表示・正解不正解表示 -->
      <div class="col-10 row items-center q-pa-lg">
        <span class="text-h5" v-html="quizData[questionNumber].question"></span>          
      </div>

      <!-- 右上の枠 -->
      <div class="col-2 column items-center">
        <div class="circle-window">
          <span class="text-h4 text-bold">{{ countDown }}</span>
        </div>
        <div class="rectangular-window">
          <span v-html="dialog"></span>
        </div>
      </div>
    </div>

    <!-- 通信中 -->
      <div v-if="visible1" class="locate-center now-loading">
        <q-spinner-hourglass 
          color="blue" 
          size="80px"
        />      
      </div>
      <p v-if="visible1" class="text-blue text-h5 q-mt-md">読み込み中です...</p>

      <!-- 第〇問 -->
      <p v-if="visible2" class="text-bold text-h4 locate-center">
        {{ quizData[questionNumber].questionTitle }}
      </p>

      <!-- クイズの選択肢 -->
      <div v-if="visible3">
        <q-option-group
          v-model="quizData[questionNumber].participantsAnswer"
          :options="quizData[questionNumber].options"
          color="primary"
          class="text-h5 q-mt-md"
          inline
        />
      </div>

      <!-- 回答終了 & 正解は... -->
      <div v-if="visible4" class="locate-center now-loading">
        <p class="text-bold text-h4 text-center fade-in">回答終了！</p>
        <br/>
        <p class="text-bold text-h4 text-center fade-in">正解は...</p>
      </div>

      <!-- シグナル表示 -->
      <div v-if="visible5" class="row">
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
      <div v-if="visible5" style="height: 40px;"></div>
      <div v-if="visible5" class="row">
        <div class="col-5"></div>
        <q-btn
          class="bg-green text-white col-2"
          label="シグナル"
          style="height: 50px; font-size: 19px; font-weight: bold;"
          icon="sensors"
          @click="activateSound(questionNumber)"
        />
      </div>
    </q-card>
    <br>
    <!-- <div align="right">
      <q-btn 
          label="次のページへ"
          flat
          class="bg-blue-7 text-white"
          @click="toPage15"
      ></q-btn>
    </div> -->
  </div>
</template>
<script setup  lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";

//ページ読み込んだ際の処理
onMounted(async()=>{

  //通信中表示
  setTimeout(async() => {
    visible1.value = false;

    //テスト用問題を実行
    executeTask(0);

  }, 1000);
});

//親からの受け取りデータ
const props = defineProps(['uri','UUID','volume']);

//読み込み中の画面を制御する変数
const visible1 = ref<boolean>(true);
const visible2 = ref<boolean>(false);
const visible3 = ref<boolean>(false);
const visible4 = ref<boolean>(false);
const visible5 = ref<boolean>(false);


//測定データ
const quizTest = ref<string>('');
const quiz1 = ref<string>('');
const quiz2 = ref<string>('');
const quiz3 = ref<string>('');
const quiz4 = ref<string>('');
const quiz5 = ref<string>('');
const attackVolumeTest = ref<number>(0);
const attackVolume1 = ref<number>(0);
const attackVolume2 = ref<number>(0);
const attackVolume3 = ref<number>(0);
const attackVolume4 = ref<number>(0);
const attackVolume5 = ref<number>(0);
const attackCountTest = ref<number>(0);
const attackCount1 = ref<number>(0);
const attackCount2 = ref<number>(0);
const attackCount3 = ref<number>(0);
const attackCount4 = ref<number>(0);
const attackCount5 = ref<number>(0);
const score = ref<number>(0);

//協力課題で表示するデータ
const dialog = ref<string>('残り時間');
const markerLabel = ref<any>([        
  { value: 0, label: '0' },
  { value: 20, label: '20' },
  { value: 40, label: '40' },
  { value: 60, label: '60' },
  { value: 80, label: '80' },
  { value: 100, label: '100' },
]);
const questionNumber = ref<number>(0);
interface optionsType{
  label: string,
  value: string,
}
interface quizDataType{
  number: number,
  questionTitle: string,
  correctAnswer: string,
  partnerAnswer: string,
  question: string,
  options: Array<optionsType>,
  participantsAnswer: string,
  attackVolume: number,
  attackCount: number,
}
const quizData = ref<Array<quizDataType>>([
  {
    number: 0,
    questionTitle: '練習問題',
    correctAnswer: '1',
    partnerAnswer: '正解',
    question: 'Q. 「一つの行為や苦労で、二つの目的を同時に果たすたとえ」として用いられる四字熟語は次のうちどれか？',
    options: [
        {
          label: '1. 一石二鳥',
          value: '1'
        },
        {
          label: '2. 一生懸命',
          value: '2'
        },
        {
          label: '3. 安全第一',
          value: '3'
        },
        {
          label: '4. 一長一短',
          value: '4'
        }
      ],
    participantsAnswer: '',
    attackVolume: 0,
    attackCount: 0,
  },
  {
    number: 1,
    questionTitle: '第１問',
    correctAnswer: '1',
    partnerAnswer: '不正解',
    question: 'Q. 「一つの行為や苦労で、二つの目的を同時に果たすたとえ」として用いられる四字熟語は次のうちどれか？',
    options: [
        {
          label: '1. 一石二鳥',
          value: '1'
        },
        {
          label: '2. 一生懸命',
          value: '2'
        },
        {
          label: '3. 安全第一',
          value: '3'
        },
        {
          label: '4. 一長一短',
          value: '4'
        }
      ],
    participantsAnswer: '',
    attackVolume: 0,
    attackCount: 0,
  },
  {
    number: 2,
    questionTitle: '第２問',
    correctAnswer: '1',
    partnerAnswer: '不正解',
    question: 'Q. 「一つの行為や苦労で、二つの目的を同時に果たすたとえ」として用いられる四字熟語は次のうちどれか？',
    options: [
        {
          label: '1. 一石二鳥',
          value: '1'
        },
        {
          label: '2. 一生懸命',
          value: '2'
        },
        {
          label: '3. 安全第一',
          value: '3'
        },
        {
          label: '4. 一長一短',
          value: '4'
        }
      ],
    participantsAnswer: '',
    attackVolume: 0,
    attackCount: 0,
  },
  {
    number: 3,
    questionTitle: '第３問',
    correctAnswer: '1',
    partnerAnswer: '不正解',
    question: 'Q. 「一つの行為や苦労で、二つの目的を同時に果たすたとえ」として用いられる四字熟語は次のうちどれか？',
    options: [
        {
          label: '1. 一石二鳥',
          value: '1'
        },
        {
          label: '2. 一生懸命',
          value: '2'
        },
        {
          label: '3. 安全第一',
          value: '3'
        },
        {
          label: '4. 一長一短',
          value: '4'
        }
      ],
    participantsAnswer: '',
    attackVolume: 0,
    attackCount: 0,
  },
  {
    number: 4,
    questionTitle: '第４問',
    correctAnswer: '1',
    partnerAnswer: '不正解',
    question: 'Q. 「一つの行為や苦労で、二つの目的を同時に果たすたとえ」として用いられる四字熟語は次のうちどれか？',
    options: [
        {
          label: '1. 一石二鳥',
          value: '1'
        },
        {
          label: '2. 一生懸命',
          value: '2'
        },
        {
          label: '3. 安全第一',
          value: '3'
        },
        {
          label: '4. 一長一短',
          value: '4'
        }
      ],
    participantsAnswer: '',
    attackVolume: 0,
    attackCount: 0,
  },
  {
    number: 5,
    questionTitle: '第５問',
    correctAnswer: '1',
    partnerAnswer: '不正解',
    question: 'Q. 「一つの行為や苦労で、二つの目的を同時に果たすたとえ」として用いられる四字熟語は次のうちどれか？',
    options: [
        {
          label: '1. 一石二鳥',
          value: '1'
        },
        {
          label: '2. 一生懸命',
          value: '2'
        },
        {
          label: '3. 安全第一',
          value: '3'
        },
        {
          label: '4. 一長一短',
          value: '4'
        }
      ],
    participantsAnswer: '',
    attackVolume: 0,
    attackCount: 0,
  }
]);

//協力課題を実行する処理
const executeTask = async(index: number) => {

    //第〇問表示
    visible2.value = true;

    //デデン
    const audio = new Audio('https://hasoseso-gunnar.github.io/MC2024_Exp_02/deden.mp3');
    const volumeFloat = parseFloat(String(props.volume)) / 100;
    audio.volume = volumeFloat;
    audio.play();

    //クイズ開始
    setTimeout(async() => {
      //第〇問非表示
      visible2.value = false;

      //問題セクション表示
      visible3.value = true;

      //カウントダウン開始
      await startCountdown();
      
      //16秒カウント
      setTimeout(async() => {

        //カウントダウンが0になったら、回答終了
        visible3.value = false;
        visible4.value = true;

        //正解まで3秒カウント
        setTimeout(async() => {

        }, 3000);

      }, 16000);
      
  },  2000);

};

//カウントダウンに必要な変数
const countDown = ref<number>(15);
const intervalId = ref<any>(null);

//カウントダウンを行う関数
const startCountdown = async() => {
  countDown.value = 15;
  clearInterval(intervalId);
  intervalId.value = setInterval(() => {
    if (countDown.value > 0) {
      countDown.value--;
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
};

//音を出す関数
const activateSound = (index: number) => {
  
  //音源を指定
  const audio = new Audio('https://hasoseso-gunnar.github.io/MC2024_Exp_02/attack.mp3');
  // 音量を取得（0～1の範囲に変換）
  const volumeFloat = parseFloat(String(quizData.value[index].attackVolume)) / 100;
  // 音量を設定
  audio.volume = volumeFloat;
  //音源を再生
  audio.play();

  //音源を聞いた回数をカウント
  quizData.value[index].attackCount += 1
};


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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.locate-center{
  margin-top: 130px;
}

.locate-center.now-loading{
  margin-top: 110px;
}

div.circle-window{
  border: 1px solid rgba(0, 0, 0, 0.5) ; 
  border-radius: 50% ; 
  width: 60px ; 
  height: 60px ; 
  display: flex ; 
  justify-content: center ; 
  align-items: center ;
  margin-top: 10px;
}

div.rectangular-window{
  border: 1px solid rgba(0, 0, 0, 0.4) ; 
  border-radius: 5% ; 
  padding: 5px 10px;
  display: flex ; 
  justify-content: center ; 
  align-items: center ;
  margin-top: 5px;
}

div.rectangular-window span{
  font-size: 15px;
  text-align: center;
}

div.q-radio{
  margin-right: 50px;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 10px 20px 10px 10px;
}

div.q-radio[aria-checked="true"]{
  border: 1px solid var(--q-primary) !important;
  color: var(--q-primary) !important;
}

p.fade-in {
  opacity: 0;
  animation: fadeIn 0.5s ease-in forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>