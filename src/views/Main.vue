<template>

  <!-- 進捗表示 -->
  <q-linear-progress :value="progress" color="blue"/>
  <div class="text-right">進捗率：{{ (progress*100) }}%</div>

  <q-tabs
    v-model="tab"
    class="text-teal"
    style="display: none;"
  >
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
    <q-tab name="page13" label="Page13"/>
    <q-tab name="page14" label="Page14"/>
    <q-tab name="page15" label="Page15"/>
    <q-tab name="page16" label="Page16"/>
    <q-tab name="page17" label="Page17"/>
    <q-tab name="page18" label="Page18"/>
    <q-tab name="page19" label="Page19"/>
    <q-tab name="page20" label="Page20"/>
    <q-tab name="page21" label="Page21"/>
    <q-tab name="forcedEnd" label="forcedEnd"/>
  </q-tabs>
  <q-tab-panels
    v-model="tab"
    animated
  >
    <q-tab-panel name="page1">
      <Page1 
        @eventEmit="execEvent" 
        :uri="uri" 
      />
    </q-tab-panel>
    <q-tab-panel name="page2">
      <Page2 
        @eventEmit="execEvent" 
        :uri="uri" 
        :UUID="UUID"
      />
    </q-tab-panel>
    <q-tab-panel name="page3">
      <Page3 
        @eventEmit="execEvent" 
        :uri="uri" 
        :UUID="UUID"
      />
    </q-tab-panel>
    <q-tab-panel name="page4">
      <Page4 
        @eventEmit="execEvent" 
        :uri="uri" 
        :UUID="UUID"
      />
    </q-tab-panel>
    <q-tab-panel name="page5">
      <Page5 
        @eventEmit="execEvent" 
        :uri="uri" 
        :UUID="UUID" 
        :agreeImmigrant="agreeImmigrant"
      />
    </q-tab-panel>
    <q-tab-panel name="page6">
      <Page6 
        @eventEmit="execEvent" 
        :uri="uri" 
        :UUID="UUID" 
        :agreeImmigrant="agreeImmigrant"
      />
    </q-tab-panel>
    <q-tab-panel name="page7">
      <Page7 
        @eventEmit="execEvent" 
        :uri="uri" 
        :UUID="UUID" 
        :agreeAI="agreeAI"
      />
    </q-tab-panel>
    <q-tab-panel name="page8">
      <Page8 
        @eventEmit="execEvent" 
        :uri="uri" 
        :UUID="UUID" 
        :agreeAI="agreeAI"
      />
    </q-tab-panel>
    <q-tab-panel name="page9">
      <Page9 
        @eventEmit="execEvent" 
        :uri="uri" 
        :UUID="UUID" 
        :condition="condition"
      />
    </q-tab-panel>
    <q-tab-panel name="page10">
      <Page10 
        @eventEmit="execEvent" 
        :uri="uri" 
        :UUID="UUID"
      />
    </q-tab-panel>
    <q-tab-panel name="page11">
      <Page11 
        @eventEmit="execEvent"
      />
    </q-tab-panel>
    <q-tab-panel name="page12">
      <Page12 
        @eventEmit="execEvent"
        :uri="uri"
        :UUID="UUID"
        :agreeImmigrant="agreeImmigrant"
        :agreeDefenseCost="agreeDefenseCost"
        :agreeAI="agreeAI"
        :agreeBear="agreeBear"
        :agreeInsect="agreeInsect"
        :condition="condition"
        />
    </q-tab-panel>
    <q-tab-panel name="page13">
      <Page13
        @eventEmit="execEvent"
      />
    </q-tab-panel>
    <q-tab-panel name="page14">
      <Page14
        @eventEmit="execEvent"
        :uri="uri" 
        :UUID="UUID"
        :volume="volume"
      />
    </q-tab-panel>
    <q-tab-panel name="page15">
      <Page15
        @eventEmit="execEvent"
      />
    </q-tab-panel>
    <q-tab-panel name="page16">
      <Page16
        @eventEmit="execEvent" 
        :uri="uri" 
        :UUID="UUID"
      />
    </q-tab-panel>
    <q-tab-panel name="page17">
      <Page17
        @eventEmit="execEvent" 
        :uri="uri" 
        :UUID="UUID"
        :agreeImmigrant="agreeImmigrant"
        :condition="condition"
      />
    </q-tab-panel>
    <q-tab-panel name="page18">
      <Page18
        @eventEmit="execEvent" 
        :uri="uri" 
        :UUID="UUID"
      />
    </q-tab-panel>
    <q-tab-panel name="page19">
      <Page19
        @eventEmit="execEvent" 
        :uri="uri" 
        :UUID="UUID"
      />
    </q-tab-panel>
    <q-tab-panel name="page20">
      <Page20
        @eventEmit="execEvent" 
        :uri="uri" 
        :UUID="UUID"
      />
    </q-tab-panel>
    <q-tab-panel name="page21">
      <Page21/>
    </q-tab-panel>
    <q-tab-panel name="forcedEnd">
      <forcedEnd 
        @eventEmit="execEvent" 
        :uri="uri"
        :UUID="UUID"
      />
    </q-tab-panel>
  </q-tab-panels>
</template>
<script setup lang="ts">
import { ref, onMounted, toRefs } from "vue";
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
import Page12 from "@/components/Page12.vue";
import Page13 from "@/components/Page13.vue";
import Page14 from "@/components/Page14.vue";
import Page15 from "@/components/Page15.vue";
import Page16 from "@/components/Page16.vue";
import Page17 from "@/components/Page17.vue";
import Page18 from "@/components/Page18.vue";
import Page19 from "@/components/Page19.vue";
import Page20 from "@/components/Page20.vue";
import Page21 from "@/components/Page21.vue";

const $q = useQuasar();

//共通設定
const progress = ref<number>(0);
const tab = ref<string>('page1');
const uri = ref<string>('https://script.google.com/macros/s/AKfycbzEoN9TPGUXjLeS8fUn2rIaoBa0YwEVEqM2rlQ7iOAa2zDndR6NhXjm1dHEf8u44VpC/exec');
const UUID = ref<string>('');

//実験条件に必要な変数
const agreeImmigrant = ref<string>('');
const agreeDefenseCost = ref<string>('');
const agreeAI = ref<string>('');
const agreeBear = ref<string>('');
const agreeInsect = ref<string>('');
const condition = ref<number>(0);
const volume = ref<number>(0);

//実験を開始した際に実験条件をランダムに割り当て(1→態度一致,2→態度不一致)
condition.value = Math.random() < 0.5 ? 1 : 2;


//子コンポーネントからのデータ受け取り
const execEvent = (data: any) => {
  tab.value = data.tab;
  progress.value = data.progress;
  //受け渡しデータが存在している時のみ受け入れる変数(UUID・移民受け入れ賛否・AI利用賛否・実験条件・適性音量)
  UUID.value = !data.UUID ? UUID.value :  data.UUID;
  agreeImmigrant.value = !data.agreeImmigrant ? agreeImmigrant.value :  data.agreeImmigrant;
  agreeDefenseCost.value = !data.agreeDefenseCost ? agreeDefenseCost.value :  data.agreeDefenseCost;
  agreeAI.value = !data.agreeAI ? agreeAI.value :  data.agreeAI;
  agreeBear.value = !data.agreeBear ? agreeBear.value :  data.agreeBear;
  agreeInsect.value = !data.agreeInsect ? agreeInsect.value :  data.agreeInsect;
  volume.value = !data.volume ? volume.value :  data.volume;
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