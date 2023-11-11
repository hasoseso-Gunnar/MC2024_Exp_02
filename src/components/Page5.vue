<template>
  <div class="q-pa-md">
    <p class="text-subtitle1 text-black">以下に続けて各質問を読み、あなたの考えに最もよく当てはまる選択肢を選んでください。</p>
    <div style="height: 40px;"></div>
    <p class="text-subtitle1 text-black">『<span class="text-red-9">選択的夫婦別姓制度</span>に関するあなたの考えは・・・』</p>
    <div style="height: 40px;"></div>
    <p class="text-subtitle1 text-black">あなたが根底に持っている道徳的な信念や信条を、どのくらい反映していますか？</p>
    <div class="row">
        <div class="col-2" align="center">
            <p>全く反映していない</p>
            <q-radio v-model="radioMC1" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="1" />
        </div>
        <div class="col-2" align="center">
            <p>少し反映している</p>
            <q-radio v-model="radioMC1" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="2" />
        </div>
        <div class="col-2" align="center">
            <p>ある程度反映している</p>
            <q-radio v-model="radioMC1" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="3" />
        </div>
        <div class="col-2" align="center">
            <p>強く反映している</p>
            <q-radio v-model="radioMC1" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="4" />
        </div>
        <div class="col-2" align="center">
            <p>非常に強く反映している</p>
            <q-radio v-model="radioMC1" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="5" />
        </div>
    </div>
    <div style="height: 40px;"></div>
    <p class="text-subtitle1 text-black">基本的な善悪についての、あなたの考え方と、どのくらい関係していますか？</p>
    <div class="row">
        <div class="col-2" align="center">
            <p>全く関係していない</p>
            <q-radio v-model="radioMC2" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="1" />
        </div>
        <div class="col-2" align="center">
            <p>少し関係している</p>
            <q-radio v-model="radioMC2" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="2" />
        </div>
        <div class="col-2" align="center">
            <p>ある程度関係している</p>
            <q-radio v-model="radioMC2" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="3" />
        </div>
        <div class="col-2" align="center">
            <p>強く反映している</p>
            <q-radio v-model="radioMC2" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="4" />
        </div>
        <div class="col-2" align="center">
            <p>非常に強く関係している</p>
            <q-radio v-model="radioMC2" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="5" />
        </div>
    </div>
    <div style="height: 40px;"></div>
    <p class="text-subtitle1 text-black">どのくらい、道徳的な原則に基づくものですか？</p>
    <div class="row">
        <div class="col-2" align="center">
            <p>全く基づかない</p>
            <q-radio v-model="radioMC3" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="1" />
        </div>
        <div class="col-2" align="center">
            <p>少し基づく</p>
            <q-radio v-model="radioMC3" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="2" />
        </div>
        <div class="col-2" align="center">
            <p>ある程度基づく</p>
            <q-radio v-model="radioMC3" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="3" />
        </div>
        <div class="col-2" align="center">
            <p>強く基づく</p>
            <q-radio v-model="radioMC3" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="4" />
        </div>
        <div class="col-2" align="center">
            <p>非常に強く基づく</p>
            <q-radio v-model="radioMC3" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="5" />
        </div>
    </div>
    <div style="height: 40px;"></div>
    <p class="text-subtitle1 text-black">どのくらい、道徳的なスタンスを表していますか？</p>
    <div class="row">
        <div class="col-2" align="center">
            <p>全く表していない</p>
            <q-radio v-model="radioMC4" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="1" />
        </div>
        <div class="col-2" align="center">
            <p>少し表している</p>
            <q-radio v-model="radioMC4" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="2" />
        </div>
        <div class="col-2" align="center">
            <p>ある程度表している</p>
            <q-radio v-model="radioMC4" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="3" />
        </div>
        <div class="col-2" align="center">
            <p>強く表している</p>
            <q-radio v-model="radioMC4" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="4" />
        </div>
        <div class="col-2" align="center">
            <p>非常に強く表している</p>
            <q-radio v-model="radioMC4" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="5" />
        </div>
    </div>
    <div align="right">
        <q-btn 
            v-if="radioAgreeToImmigrantion === '' || radioMC1 === '' || radioMC2 === '' || radioMC3 === '' || radioMC4 === ''"
            label="次のページへ"
            flat
            class="bg-grey text-white"
        ></q-btn>
        <q-btn 
            v-else
            label="次のページへ"
            flat
            class="bg-blue-7 text-white"
            @click="toPage5"
        ></q-btn>
    </div>
  </div>
</template>
<script setup  lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";


//ラジオボタン設定
const radioAgreeToImmigrantion = ref<string>('');
const radioMC1 = ref<string>('');
const radioMC2 = ref<string>('');
const radioMC3 = ref<string>('');
const radioMC4 = ref<string>('');
const radioCA = ref<string>('');

//次のページへ
const toPage5 = function(){
  window.scrollTo(0, 0);  
  execEmit();
};

const emit = defineEmits(['eventEmit'])
const execEmit = () => {
  emit('eventEmit', { 'tab': 'page5', 'progress': 0.4})
}

</script>
<style lang="scss">

</style>