<template>
  <div class="q-pa-md">
    <p class="text-subtitle1 text-black">以下の文章は、特定のトピックに関するパートナーのコメントです。ここでは、2つ記述したうちの1つをランダムに取り上げています。</p>
    <div style="height: 30px;"></div>
    <q-card
      dense
      flat 
      bordered
      class="q-pt-md q-pl-md q-pr-md"
    > 
      <p class="text-subtitle1 text-black">【パートナーのコメント内容】</p>
      <!-- 賛成パートナー -->
      <p class="text-subtitle1 text-black" v-if="(props.condition === '1' && props.agreeImmigrant === '賛成') || (props.condition === '2' && props.agreeImmigrant === '反対')">
        日本は今、自国民のみの力によって少子化を解決できない段階まで来ています。このような状況を打破するために、外国から労働力を招き入れることは非常に合理的だと思います。治安の悪化や不法入国者の増加などが懸念されていますが、それは厳格な入国制限などによって解決できる問題で、日本の存続の危機という問題に比べれば些細な問題だと思います。
      </p>
      <!-- 反対パートナー -->
      <p class="text-subtitle1 text-black" v-else>
        積極的な移民の受け入れを行うことで、治安の悪化や不法入国者の増加などが予想されます。平穏に日常生活を送れなくなることは、少子化という将来的な問題を解決する以前に、現在を生きる我々にとって大きな問題です。外国からの労働力に頼る前に、まずは日本国内で少子化を解決して労働人口を増加させることができないかを検討することが先決だと思います。        
      </p>
    </q-card>
    <div style="height: 50px;"></div>
    <p class="text-subtitle1 text-black">以上の文章を読み、コメント欄に<span class="text-bold">『この文章にもし返信するとしたら何を伝えるか』</span>を100～200文字で記述してください。</p>
    <p class="text-subtitle1 text-black">なお、あなたがここで記述した内容は、<span class="text-bold text-red-9">パートナーに知られることは決してありません。</span></p>
    <div style="height: 40px;"></div>
    <q-input 
      v-model="openEndedQuesiton"
      type="textarea"
      label="あなたの返信内容"
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
  <div class="q-pa-md q-mt-md">
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
            @click="toPage18"
        ></q-btn>
    </div>
  </div>
</template>
<script setup  lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";

//親からの受け取りデータ
const props = defineProps(['uri','UUID','agreeImmigrant','condition']);

//コメント内容
const openEndedQuesiton = ref<string>('');
const openEndedFinished = ref<boolean>(false);

//コメント内容が規定の文字数か判定
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
const toPage18 = function(){
  window.scrollTo(0, 0);
  const body: string = `replyOEQ=${openEndedQuesiton.value}`;
  postData('page17', body);  
  execEmit();
};

const emit = defineEmits(['eventEmit'])
const execEmit = () => {
  emit('eventEmit', { 'tab': 'page18', 'progress': 0.85})
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