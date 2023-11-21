<template>
  <div class="q-pa-md">
    <p class="text-subtitle1 text-black">最初に，あなた自身のことについて伺います。</p>
    <br>
    <p class="text-subtitle1 text-black">1. あなたの<span class="text-bold">性別</span>について回答してください。</p>
    <q-select 
      :options="sexOptions"
      v-model="sex"
      outlined
      style="width: 20%;"
      dense
      class="q-mb-lg"
    />
    <br/>
    <p class="text-subtitle1 text-black">2. あなたの<span class="text-bold">年齢</span>について回答してください。</p>
    <q-select 
      :options="ageOptions"
      v-model="age"
      outlined
      style="width: 20%;"
      dense
      class="q-mb-lg"
    />
    <br/>
    <p class="text-subtitle1 text-black">3. あなたの<span class="text-bold">国籍</span>について回答してください。</p>
    <q-select 
      :options="nationalityOptions"
      v-model="nationality"
      outlined
      style="width: 20%;"
      dense
      class="q-mb-lg"
    />
    <br/>
    <p class="text-subtitle1 text-black">4. あなたの<span class="text-bold">世帯年収</span>について回答してください。</p>
    <q-select 
      :options="householdIncomeOptions"
      v-model="householdIncome"
      outlined
      style="width: 20%;"
      dense
      class="q-mb-lg"
    />
    <br/>
    <p class="text-subtitle1 text-black">5. あなたの<span class="text-bold">最終学歴</span>について回答してください。</p>
    <q-select 
      :options="schoolOptions"
      v-model="school"
      outlined
      style="width: 20%;"
      dense
      class="q-mb-lg"
    />
    <br/>
    <p class="text-subtitle1 text-black">6. あなたが<span class="text-bold">本調査への回答に使用している機器</span>について回答してください。</p>
    <q-select 
      :options="deviceOptions"
      v-model="device"
      outlined
      style="width: 20%;"
      dense
      class="q-mb-lg"
    />
  </div>
  <div class="q-pa-md q-mt-xl">
    <div align="right">
        <q-btn 
            v-if="sex === '' || age === '' || nationality === '' || school === '' || device === ''"
            label="次のページへ"
            flat
            class="bg-grey text-white"
        ></q-btn>
        <q-btn 
            v-else
            label="次のページへ"
            flat
            class="bg-blue-7 text-white"
            @click="toPage3"
        ></q-btn>
    </div>
  </div>
</template>
<script setup  lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";

//親からの受け取りデータ
const props = defineProps(['uri','UUID']);

//取得するデータ設定
const sex = ref<string>('');
const age = ref<string>('');
const nationality = ref<string>('');
const householdIncome = ref<string>('');
const school = ref<string>('');
const device = ref<string>('');

//選択肢設定
const sexOptions = ref<Array<string>>(['男性','女性','その他']);
const ageOptions = ref<Array<string>>(['17歳以下', ...Array.from({length: 48}, (_, index) => (index + 18).toString()+'歳'), '66歳以上']);
const nationalityOptions = ref<Array<string>>(['日本','その他']);
const householdIncomeOptions = ref<Array<string>>([
  '100万円以下',
  '101万円～200万円',
  '201万円～300万円',
  '301万円～400万円',
  '401万円～500万円',
  '501万円～600万円',
  '601万円～700万円',
  '701万円～800万円',
  '801万円～900万円',
  '901万円～1000万円',
  '1001万円以上',
]);
const schoolOptions = ref<Array<string>>(['中学校卒業','高等学校卒業','短期大学/専門学校卒業','高等専門学校卒業','四年制大学卒業','大学院修士(博士前期)課程卒業','大学院博士(博士後期)課程卒業']);
const deviceOptions = ref<Array<string>>(['パソコン (Windows, Mac等)','タブレット端末 (iPad等)','その他 (スマートフォン、携帯電話等)']);

//次のページへ
const toPage3 = function(){
  window.scrollTo(0, 0);  
  const body: string = `sex=${sex.value}&age=${age.value}&nationality=${nationality.value}&householdIncome=${householdIncome.value}&school=${school.value}&device=${device.value}`;
  postData('page2', body);
  execEmit();
};

const emit = defineEmits(['eventEmit'])
const execEmit = () => {
  //実験に参加できる条件を満たしていない場合
  if(age.value === '17歳以下' || age.value === '66歳以上' || nationality.value === 'その他' || device.value === 'その他 (スマートフォン、携帯電話等)'){
    emit('eventEmit', { 'tab': 'forcedEnd', 'progress': 1.0});
  
  //それ以外は次のページへ
  }else{
    emit('eventEmit', { 'tab': 'page3', 'progress': 0.2});
  }
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
		.then((res) => {
      console.log(res.json());
      result = 'complete';
    })
		.catch((err) => {
      console.log(err);
      result = 'error';
    });

  return result;
};

</script>
<style lang="scss">

</style>