<template>

  <!-- 進捗表示 -->
  <q-linear-progress :value="progress" color="blue"/>

  <q-tabs
    v-model="tab"
    class="text-teal"
    style="display: none;"
  >
    <q-tab name="page1" label="Page1"/>
    <q-tab name="page2" label="Page2"/>
    <q-tab name="page3" label="Page3"/>
    <q-tab name="page4" label="Page4"/>
  </q-tabs>
  <q-tab-panels
    v-model="tab"
    animated
  >
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

    </q-tab-panel>
  </q-tab-panels>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import Page1 from "@/components/Page1.vue";
import Page2 from "@/components/Page2.vue";
import Page3 from "@/components/Page3.vue";
import Page4 from "@/components/Page4.vue";
import Page5 from "@/components/Page5.vue";

const $q = useQuasar();

//共通設定
const progress = ref<number>(0);
const tab = ref<string>('page1');

//子コンポーネントからのデータ受け取り
const execEvent = (data: any) => {
  tab.value = data.tab
  progress.value = data.progress
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
</style>