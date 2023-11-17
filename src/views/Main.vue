<template>

  <!-- 進捗表示 -->
  <q-linear-progress :value="progress" color="blue"/>

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
    <q-tab-panel name="page7">
      <Page8 @eventEmit="execEvent" :agreeAI="agreeAI"/>
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

const $q = useQuasar();

//共通設定
const progress = ref<number>(0);
const tab = ref<string>('page1');
const agreeImmigrant = ref<string>('');
const agreeAI = ref<string>('');

//子コンポーネントからのデータ受け取り
const execEvent = (data: any) => {
  tab.value = data.tab;
  progress.value = data.progress;
  //受け渡しデータが存在している時のみ受け入れ
  agreeImmigrant.value = !data.agreeImmigrant ? agreeImmigrant.value :  data.agreeImmigrant;
  agreeAI.value = !data.agreeAI ? agreeAI.value :  data.agreeAI;

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