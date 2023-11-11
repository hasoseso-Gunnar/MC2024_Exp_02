<template>
  <div class="q-pa-md">
    <p class="text-subtitle1 text-black">最初にあなた自身のことを教えてください。</p>
    <br>
    <p class="text-subtitle1 text-black">1. 性別</p>
    <q-select 
      :options="sexOptions"
      v-model="sex"
      outlined
      style="width: 20%;"
      dense
    />
    <br/>
    <p class="text-subtitle1 text-black">2. 年齢</p>
    <q-select 
      :options="ageOptions"
      v-model="age"
      outlined
      style="width: 20%;"
      dense
    />
    <br/>
    <p class="text-subtitle1 text-black">3. 国籍</p>
    <q-select 
      :options="nationalityOptions"
      v-model="nationality"
      outlined
      style="width: 20%;"
      dense
    />
    <br/>
    <p class="text-subtitle1 text-black">4. 最終学歴</p>
    <q-select 
      :options="schoolOptions"
      v-model="school"
      outlined
      style="width: 20%;"
      dense
    />
    <br/>
    <p class="text-subtitle1 text-black">5. 現在使用しているデバイス</p>
    <q-select 
      :options="deviceOptions"
      v-model="device"
      outlined
      style="width: 20%;"
      dense
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


//取得するデータ設定
const sex = ref<string>('');
const age = ref<string>('');
const nationality = ref<string>('');
const school = ref<string>('');
const device = ref<string>('');

//選択肢設定
const sexOptions = ref<Array<string>>(['男性','女性','その他']);
const ageOptions = ref<Array<string>>(Array.from({length: 48}, (_, index) => (index + 18).toString()));
const nationalityOptions = ref<Array<string>>(['日本','その他']);
const schoolOptions = ref<Array<string>>(['中学校','高等学校','専門学校','短期大学','4年制大学','大学院']);
const deviceOptions = ref<Array<string>>(['PC','スマートフォン','タブレット端末','その他']);

//次のページへ
const toPage3 = function(){
  window.scrollTo(0, 0);  
  execEmit();
};

const emit = defineEmits(['eventEmit'])
const execEmit = () => {
  emit('eventEmit', { 'tab': 'page3', 'progress': 0.2})
}

</script>
<style lang="scss">

</style>