<template>
  <div class="q-pa-md">

    <q-card 
      class="relative-position task-card" 
      flat 
      bordered
    >
      <q-card-section class="q-pb-none">
        <div class="text-h6">　</div>
      </q-card-section>

      <q-card-section>
        <div v-if="showSimulatedReturnData">
          <div class="row justify-center">
            <q-icon 
              name="fact_check"  
              color="blue"
              class="q-mb-md"
              size="80px"
            />
          </div>
          <p class="text-h5 text-center">パートナーの操作が完了しました</p>
          <p class="text-h5 text-center" v-if="visibleCountDown">それでは、まず最初に練習用のクイズを1問行います</p>
          <p class="text-h4 text-center text-bold" v-if="visibleCountDown">{{ count }}</p>
        </div>
      </q-card-section>
      <div v-if="visible">
        <div class="row justify-center">
            <q-spinner-cube
              color="blue" 
              size="80px"
            />
        </div>
        <p class="text-h5 text-center q-mt-md">まだパートナーがあなたのプロフィールを閲覧中です...</p>
      </div>
    </q-card>
    <br>
  </div>
</template>
<script setup  lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";

//ページ読み込んだ際の処理
onMounted(async()=>{

  //検索中表示を終わらせる処理
  setTimeout(async() => {
      visible.value = false;
      showSimulatedReturnData.value = true;

      //カウントダウン開始
      setTimeout(async() => {

        visibleCountDown.value = true;
        await startCountdown();

        //カウントダウン開始
        setTimeout(async() => {
          //次のページへ
          toPage14();

        }, 5000)

      }, 2000);

  }, 4000);
});

//読み込み中の画面を制御する変数
const visible = ref<boolean>(true);
const showSimulatedReturnData = ref<boolean>(false);
const visibleCountDown = ref<boolean>(false);

const count = ref<number>(5);
const intervalId = ref<any>(null);

const startCountdown = async() => {
  count.value = 5;
  clearInterval(intervalId);
  intervalId.value = setInterval(() => {
    if (count.value > 0) {
      count.value--;
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
};

//次のページへ
const toPage14 = function(){
  window.scrollTo(0, 0);  
  execEmit();
};

const emit = defineEmits(['eventEmit'])
const execEmit = () => {
  emit('eventEmit', { 'tab': 'page14', 'progress': 1.0})
}

</script>
<style lang="scss">
.task-card{
  height: 350px;
}
</style>