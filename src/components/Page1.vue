<template>
  <p class="text-h5 text-black" style="text-decoration: underline; font-weight: bold;">さまざまな物事への考え方に関する調査</p>
  <p class="description">この度は、研究にご協力いただきありがとうございます。</p>
  <p class="description">回答を始める前に、以下の点についてご確認ください。</p>
  <br/>
  <p class="title">１．研究目的</p>
  <p class="description">本研究では、さまざまな物事への考え方について調べます。</p>
  <br/>
  <p class="title">２．研究概要および実施方法</p>
  <p class="description">所要時間は 約15分 です。</p>
  <p class="description">ウェブ上でさまざまな質問に回答していただきます。</p>
  <br/>
  <p class="title">３．研究への参加について</p>
  <p class="description">本研究への参加は強制ではありません。</p>
  <br/>
  <p class="description" style="text-decoration: underline; font-weight: bold;">本研究にご参加いただける方について</p>
  <p class="description">日本国籍をお持ちの方を対象としています。</p>
  <br/>
  <p class="description" style="text-decoration: underline; font-weight: bold;">同意とその撤回について</p>
  <p class="description">参加に同意しなかった場合でも不利益は生じません。</p>
  <p class="description">同意した場合も、同意を撤回して参加を中止できます。</p>
  <p class="description">その場合でも不利益は生じず、データは分析から除外されます。</p>
  <p class="description text-red-9">※ただし、報酬支払後はデータを除外できません。</p>
  <br/>
  <p class="title">４．個人情報の取り扱い</p>
  <p class="description">本研究は無記名で行われます。</p>
  <p class="description">データは統計的に処理され、個人が特定されることはありません。</p>
  <br/>
  <p class="title">５．データの保管</p>
  <p class="description">パスワードをかけて保管され、研究目的でのみ使用されます。</p>
  <p class="description">データは、研究終了から5年が経過した後、速やかに破棄されます。</p>
  <br/>
  <p class="title">６．結果の公表</p>
  <p class="description">学会発表や学術論文などの形式で公表される可能性があります。</p>
  <p class="description">また、匿名化済のデータがウェブ上で公開される場合があります。</p>
  <br/>
  <p class="title">7．本調査での回答上の注意</p>
  <p class="description text-red-9 text-bold">①必ず、パソコンやタブレット端末から実験に参加してください。</p>
  <p class="description">※スマートフォンやその他の端末では正常にページが表示されない場合があります。</p>
  <br>
  <p class="description text-red-9 text-bold">②調査への回答の最中に、「ページを再読み込みする」「ウィンドウを閉じる」などのブラウザ上の操作を行わないでください。</p>
  <p class="description">※正常に調査が完了しない場合や、回答の進捗が初期化されてしまう可能性があります。</p>
  <br/>
  <p class="description text-red-9 text-bold">③本調査では、途中で音が出る箇所がありますので、必ず端末のミュートを解除してください。</p>
  <p class="description">※イヤホンやヘッドホンを装着するか、周りに音を聞かれてもよい環境での回答を推奨します。</p>
  <br/>
  <p class="title">調査実施機関：</p>
  <p class="description">名古屋大学 大学院情報学研究科</p>
  <p class="description">社会心理学研究室</p>
  <br/>
  <br/>
  <p class="description" style="font-size: 19px;">あなたは上記の説明を理解し，本研究への参加に同意しますか。</p>
  <br/>
  <div class="row">
    <div class="col-4" align="center" :style="radioAgree === 'agree' ? 'background-color: #CCEBFF;': ''">
      <p class="description" style="font-size: 19px;">同意する</p>
      <q-radio 
        v-model="radioAgree" 
        size="xl" 
        checked-icon="task_alt" 
        unchecked-icon="panorama_fish_eye" 
        val="agree"
      />
    </div>
    <div class="col-4" align="center" :style="radioAgree === 'disagree' ? 'background-color: #CCEBFF;': ''">
      <p class="description" style="font-size: 19px;">同意しない</p>
      <q-radio 
        v-model="radioAgree" 
        size="xl" 
        checked-icon="task_alt" 
        unchecked-icon="panorama_fish_eye" 
        val="disagree"
      />
    </div>
  </div>
  <div class="row q-mt-xl">
    <div class="col-6"></div>
      <q-btn 
        v-if="radioAgree === ''"
        label="次のページへ"
        flat
        :ripple="false"
        class="bg-grey text-white"
      ></q-btn>
      <q-btn 
        v-else
        label="次のページへ"
        flat
        class="bg-blue-7 text-white"
        @click="toPage2"
      ></q-btn>
  </div>
</template>
<script setup  lang="ts">
import { ref, onMounted } from "vue";


//ラジオボタン設定
const radioAgree = ref<string>('');

//次のページへ
const toPage2 = function(){
  window.scrollTo(0, 0);  
  execEmit();
};

const emit = defineEmits(['eventEmit'])
const execEmit = () => {
  //実験参加へ同意する場合
  if(radioAgree.value === 'agree'){
    emit('eventEmit', { 'tab': 'page2', 'progress': 0.1});
    
  //実験参加へ同意しない場合は強制終了
  }else{
    emit('eventEmit', { 'tab': 'forcedEnd', 'progress': 1.0});
  }
}

</script>
<style lang="scss">

</style>