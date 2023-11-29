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

    <!-- 画面上部(クイズ時) -->
    <div class="row" style="width: 100%; height: 180px;" v-if="visible6">
      
      <!-- 問題文の表示・正解不正解表示 -->
      <div class="col-10 row items-center q-pa-lg">
        <span class="text-h5">次の問題が始まるまでに、今回のクイズの結果を踏まえて音量を調節し、相手に音のシグナルを送信してください。</span>          
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
          class="text-h5 q-mt-md quiz-option"
          inline
        />
      </div>

      <!-- 回答終了 & 正解は... -->
      <div v-if="visible4" class="locate-center now-loading">
        <p class="text-bold text-h4 text-center fade-in">回答終了！</p>
        <br/>
        <p class="text-bold text-h4 text-center fade-in">正解は...</p>
      </div>

      <!-- あなた&パートナーの結果 -->
      <div v-if="visible5" class="locate-center quiz-result">
        <p class="text-bold text-h4 text-center fade-in">A. {{ quizData[questionNumber].options[Number(quizData[questionNumber].correctAnswer)-1].label.slice(3) }}</p>
        <br/>
        <p class=" text-h4 text-center fade-in" :style="correctOrWrong === '正解' ? 'color: red' : 'color: blue'">あなた：{{ correctOrWrong }}</p>
        <br/>
        <p class="text-h4 text-center fade-in" :style="quizData[questionNumber].partnerAnswer === '正解' ? 'color: red' : 'color: blue'">パートナー：{{ quizData[questionNumber].partnerAnswer }}</p>
      </div>

      <!-- シグナル表示 -->
      <div v-if="visible6" class="row" style="width: 100%;">
        <div class="col-2"></div>
        <q-slider
          v-model="quizData[questionNumber].attackVolume"
          :min="0"
          :max="100"
          color="green"
          :marker-labels="markerLabel"
          label-always
          class="col-8"
        />
      </div>
      <div v-if="visible6" style="height: 40px;"></div>
      <div v-if="visible6" class="row" style="width: 100%;">
        <div class="col-5"></div>
        <q-btn
          class="bg-green text-white col-2"
          label="シグナル"
          style="height: 50px; font-size: 19px; font-weight: bold;"
          icon="sensors"
          @click="activateSound()"
        />
      </div>
    </q-card>
    <br>
    <q-dialog v-model="seamless" seamless position="top">
      <q-card style="width: 350px">

        <q-card-section class="row items-center no-wrap">
          <div class="col-5">
            <div class="text-weight-bold">パートナーからの</div>
            <div class="text-weight-bold">色のシグナル</div>
          </div>

          <q-chip class="col-7" :color="quizData[questionNumber].colorSignal" size="40px"/>

        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- 初回のみ表示... -->
    <div v-if="visible7" class="locate-center now-loading">
      <p class="text-bold text-h4 text-center fade-in">これが一連のクイズの流れです</p>
      <br/>
      <p class="text-bold text-h4 text-center fade-in">それでは、本番に移ります</p>
    </div>

    <!-- 最後のみ表示... -->
    <div v-if="visible8" class="locate-center now-loading">
      <p class="text-bold text-h4 text-center fade-in">以上で、ゲームの回答は終了です</p>
      <br/>
      <p class="text-bold text-h4 text-center fade-in">それでは、合計スコアの発表に移ります</p>
    </div>

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

  //通信中表示
  setTimeout(async() => {
    visible1.value = false;

    //テスト用問題を実行
    executeTask();

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
const visible6 = ref<boolean>(false);
const visible7 = ref<boolean>(false);
const visible8 = ref<boolean>(false);

//測定データ
const score = ref<number>(0);

//ゲームで表示するデータ
const dialog = ref<string>('残り時間');
const correctOrWrong = ref<string>('正解');
const seamless = ref<boolean>(false);
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
  colorSignal: string,
}
const quizData = ref<Array<quizDataType>>([
  {
    number: 0,
    questionTitle: '練習問題',
    correctAnswer: '1',
    partnerAnswer: '正解',
    question: 'Q. <span class="text-bold">「一つの行為や苦労で、二つの目的を同時に果たすたとえ」</span>として用いられる四字熟語は次のうちどれか？',
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
    colorSignal: 'green-7',
  },
  {
    number: 1,
    questionTitle: '第１問',
    correctAnswer: '3',
    partnerAnswer: '正解',
    question: 'Q. <span class="text-bold">世界で一番高い山</span>の名前は次のうちどれか？',
    options: [
        {
          label: '1. マッターホルン',
          value: '1'
        },
        {
          label: '2. 富士山',
          value: '2'
        },
        {
          label: '3. エベレスト',
          value: '3'
        },
        {
          label: '4. モンブラン',
          value: '4'
        }
      ],
    participantsAnswer: '',
    attackVolume: 0,
    attackCount: 0,
    colorSignal: 'green-5',
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
    colorSignal: 'green-3',
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
    colorSignal: 'green-10',
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
    colorSignal: 'green-9',
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
    colorSignal: 'green-4',
  }
]);

//ゲームを実行する処理
const executeTask = async() => {

    //第〇問表示
    dialog.value = '残り時間';
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

      //10秒カウントダウン開始
      intervalId.value = null;
      await startCountdown(10);
      
      //16秒カウント
      setTimeout(async() => {

        //カウントダウンが0になったら、回答終了
        visible3.value = false;
        visible4.value = true;

        //正解まで3秒カウント
        setTimeout(async() => {

          //正解の場合と不正解の場合で表示を切り替え
          if(quizData.value[questionNumber.value].participantsAnswer === quizData.value[questionNumber.value].correctAnswer){
            correctOrWrong.value = '正解';
          }else{
            correctOrWrong.value = '不正解';
          };

          //正解発表
          visible4.value = false;
          visible5.value = true;

          //正解の場合と不正解の場合で音を変更
          if(quizData.value[questionNumber.value].participantsAnswer === quizData.value[questionNumber.value].correctAnswer){
            //ピンポン
            const audioCorrect = new Audio('https://hasoseso-gunnar.github.io/MC2024_Exp_02/correct.mp3');
            const volumeFloatCorrect = parseFloat(String(props.volume)) / 100;
            audioCorrect.volume = volumeFloatCorrect;
            audioCorrect.play();
          }else{
            //ブッブー
            const audioWrong = new Audio('https://hasoseso-gunnar.github.io/MC2024_Exp_02/wrong.mp3');
            const volumeFloatWrong = parseFloat(String(props.volume)) / 100;
            audioWrong.volume = volumeFloatWrong;
            audioWrong.play();
          };

          //シグナル表示まで3秒カウント
          setTimeout(async() => {

            //シグナル表示
            visible5.value = false;
            visible6.value = true;
                
            //2秒後待ってからパートナーのシグナルを5秒間表示
            setTimeout(async() => {
              setTimeout(async() => {
                seamless.value = true;
              });
            }, 2000);

            //5秒カウントダウン開始
            intervalId.value = null;
            await startCountdown(10);

            dialog.value = '次の問題まで<br/>残り時間'

            //次の問題へ
            setTimeout(async() => {

              seamless.value = false;

              //練習問題
              if(questionNumber.value === 0){

                //メッセージ表示
                setTimeout(async() => {
                  visible6.value = false;
                  visible7.value = true;
                  
                  //次の問題へ
                  setTimeout(async() => {

                    questionNumber.value += 1;
                    visible7.value = false;
                    executeTask();

                  }, 3000)

                }, 3000);

              //最後の問題
              }else if(questionNumber.value === 5){

                //シグナル表示
                visible6.value = false;
                visible8.value = true;

                //メッセージ表示
                setTimeout(async() => {

                  questionNumber.value += 1;
                  visible7.value = false;
                  toPage15();

                }, 3000)

              //それ以外
              }else{
                questionNumber.value += 1;
                visible6.value = false;
                executeTask();
              }
            }, 3000);

          }, 3000);

        }, 3000);

      }, 11000);
      
  },  2000);

};

//カウントダウンに必要な変数
const countDown = ref<number>(10);
const intervalId = ref<any>(null);

//カウントダウンを行う関数
const startCountdown = async(index: number) => {
  countDown.value = index;
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
const activateSound = () => {
  
  //音源を指定
  const audio = new Audio('https://hasoseso-gunnar.github.io/MC2024_Exp_02/attack.mp3');
  // 音量を取得（0～1の範囲に変換）
  const volumeFloat = parseFloat(String(quizData.value[questionNumber.value].attackVolume)) / 100;
  // 音量を設定
  audio.volume = volumeFloat;
  //音源を再生
  audio.play();

  //音源を聞いた回数をカウント
  quizData.value[questionNumber.value].attackCount += 1
};


//次のページへ
const toPage15 = async function(){
  window.scrollTo(0, 0);
  const body: string = `quizTest=${quizData.value[0].participantsAnswer}quiz1=${quizData.value[1].participantsAnswer}&quiz2=${quizData.value[2].participantsAnswer}&quiz3=${quizData.value[3].participantsAnswer}&quiz4=${quizData.value[4].participantsAnswer}&quiz5=${quizData.value[5].participantsAnswer}&attackVolumeTest=${quizData.value[0].attackVolume}&attackVolume1=${quizData.value[1].attackVolume}&attackVolume2=${quizData.value[2].attackVolume}&attackVolume3=${quizData.value[3].attackVolume}&attackVolume4=${quizData.value[4].attackVolume}&attackVolume5=${quizData.value[5].attackVolume}&attackCountTest=${quizData.value[0].attackCount}&attackCount1=${quizData.value[1].attackCount}&attackCount2=${quizData.value[2].attackCount}&attackCount3=${quizData.value[3].attackCount}&attackCount4=${quizData.value[4].attackCount}&attackCount5=${quizData.value[5].attackCount}&score=${score.value}`;
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

.locate-center.quiz-result{
  margin-top: 80px;
}

.quiz-option div.q-radio{
  margin-right: 50px;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 10px 20px 10px 10px;
}

.quiz-option div.q-radio[aria-checked="true"]{
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