<template>

  <!-- 進捗表示 -->
  <q-linear-progress :value="progress" color="blue"/>
  <div class="text-right">進捗率：{{ (progress*100) }}%</div>

  <q-tabs
    v-model="tab"
    class="text-teal"
    style="display: none;"
  >
    <q-tab name="forcedEnd" label="forcedEnd"/>
    <q-tab name="page1" label="Page1"/>
    <q-tab name="page2" label="Page2"/>
    <q-tab name="page3" label="Page3"/>
    <q-tab name="page4" label="Page4"/>
    <q-tab name="page5" label="Page5"/>
    <q-tab name="page6" label="Page6"/>
    <q-tab name="page7" label="Page7"/>
    <q-tab name="page8" label="Page8"/>
    <q-tab name="page9" label="Page9"/>
    <q-tab name="page10" label="Page10"/>
    <q-tab name="page11" label="Page11"/>
    <q-tab name="page12" label="Page12"/>
  </q-tabs>
  <q-tab-panels
    v-model="tab"
    animated
  >
    <q-tab-panel name="forcedEnd">
      <forcedEnd @eventEmit="execEvent"/>
    </q-tab-panel>
    <q-tab-panel name="page1">
      <Page1 @eventEmit="execEvent"/>
    </q-tab-panel>
    <q-tab-panel name="page2">
      <Page2 @eventEmit="execEvent"/>
    </q-tab-panel>
    <q-tab-panel name="page3">
      <Page3 @eventEmit="execEvent"/>
    </q-tab-panel>
    <q-tab-panel name="page4">
      <Page4 @eventEmit="execEvent"/>
    </q-tab-panel>
    <q-tab-panel name="page5">
      <Page5 @eventEmit="execEvent" :agreeImmigrant="agreeImmigrant"/>
    </q-tab-panel>
    <q-tab-panel name="page6">
      <Page6 @eventEmit="execEvent" :agreeImmigrant="agreeImmigrant"/>
    </q-tab-panel>
    <q-tab-panel name="page7">
      <Page7 @eventEmit="execEvent" :agreeAI="agreeAI"/>
    </q-tab-panel>
    <q-tab-panel name="page8">
      <Page8 @eventEmit="execEvent" :agreeAI="agreeAI"/>
    </q-tab-panel>
    <q-tab-panel name="page9">
      <Page9 @eventEmit="execEvent"/>
    </q-tab-panel>
    <q-tab-panel name="page10">
      <Page10 @eventEmit="execEvent"/>
    </q-tab-panel>
    <q-tab-panel name="page11">
      <Page11 
        @eventEmit="execEvent"
        :agreeImmigrant="agreeImmigrant"
        :agreeDefenseCost="agreeDefenseCost"
        :agreeAI="agreeAI"
        :agreeBear="agreeBear"
        :agreeInsect="agreeInsect"
        :experimentCondition="experimentCondition"
      />
    </q-tab-panel>
    <q-tab-panel name="page12">
      <Page12 @eventEmit="execEvent"/>
    </q-tab-panel>
  </q-tab-panels>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import forcedEnd from "@/components/forcedEnd.vue";
import Page1 from "@/components/Page1.vue";
import Page2 from "@/components/Page2.vue";
import Page3 from "@/components/Page3.vue";
import Page4 from "@/components/Page4.vue";
import Page5 from "@/components/Page5.vue";
import Page6 from "@/components/Page6.vue";
import Page7 from "@/components/Page7.vue";
import Page8 from "@/components/Page8.vue";
import Page9 from "@/components/Page9.vue";
import Page10 from "@/components/Page10.vue";
import Page11 from "@/components/Page11.vue";

const $q = useQuasar();

//共通設定
const progress = ref<number>(0);
const tab = ref<string>('page1');
const agreeImmigrant = ref<string>('');
const agreeDefenseCost = ref<string>('');
const agreeAI = ref<string>('');
const agreeBear = ref<string>('');
const agreeInsect = ref<string>('');
const experimentCondition = ref<number>(0);

//ページを読み込んだ際に実験条件をランダムに割り当て(1→態度一致,2→態度不一致)
experimentCondition.value = Math.random() < 0.5 ? 1 : 2;
console.log(experimentCondition.value)

//子コンポーネントからのデータ受け取り
const execEvent = (data: any) => {
  tab.value = data.tab;
  progress.value = data.progress;
  //受け渡しデータが存在している時のみ受け入れる変数(移民受け入れ賛否・AI利用賛否・実験条件)
  agreeImmigrant.value = !data.agreeImmigrant ? agreeImmigrant.value :  data.agreeImmigrant;
  agreeDefenseCost.value = !data.agreeDefenseCost ? agreeDefenseCost.value :  data.agreeDefenseCost;
  agreeAI.value = !data.agreeAI ? agreeAI.value :  data.agreeAI;
  agreeBear.value = !data.agreeBear ? agreeBear.value :  data.agreeBear;
  agreeInsect.value = !data.agreeInsect ? agreeInsect.value :  data.agreeInsect;
};

</script>
<style>
.description{
    font-size: 16px;
    color: black;
    margin-bottom: 8px;
}

.title{
    font-size: 19px;
    color: black;
    font-weight: bold;
}
p.text-subtitle1{
  font-size: 19px;
}
</style>