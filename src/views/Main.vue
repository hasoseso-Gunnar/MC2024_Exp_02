<template>

    <!-- 進捗表示 -->
    <q-linear-progress :value="progress" color="blue" class="q-mt-md" />

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
            <p class="description" style="color: red;">※ただし、報酬支払後はデータを除外できません。</p>
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
                    <q-radio v-model="radioAgree" size="xl" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="agree"/>
                </div>
                <div class="col-4" align="center" :style="radioAgree === 'disagree' ? 'background-color: #CCEBFF;': ''">
                    <p class="description" style="font-size: 19px;">同意しない</p>
                    <q-radio v-model="radioAgree" size="xl" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="disagree"/>
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
        </q-tab-panel>
        <q-tab-panel name="page2">
            <div class="q-pa-md">
                <p class="text-subtitle1 text-black">1. あなたは選択的夫婦別姓制度制度に賛成ですか？反対ですか？</p>
                <div class="row">
                    <div class="col-2" align="center">
                        <p>賛成</p>
                        <q-radio v-model="radioAgreeToImmigrantion" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="agree" />
                    </div>
                    <div class="col-2" align="center">
                        <p>反対</p>
                        <q-radio v-model="radioAgreeToImmigrantion" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="disagree" />
                    </div>
                </div>
            </div>
            <div class="q-pa-md q-mt-xl">
                <p class="text-subtitle1 text-black">2. 以下に続けて各質問を読み、あなたの考えに最もよく当てはまる選択肢を選んでください。</p>
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
                    ></q-btn>
                </div>
            </div>
        </q-tab-panel>
        <q-tab-panel name="page3">
            <div class="q-pa-md">
                <p class="text-subtitle1 text-black">この次のセクションからは、「選択的夫婦別姓制度」に関して人物との会話を行ってもらいます。</p>
                <p class="text-subtitle1 text-black">また、この人物はあなたと{{ opinion }}意見を持っています。</p>
                <div style="height: 40px;"></div>
                <p class="text-subtitle1 text-black">以上のことを踏まえ、会話を始める前に以下の質問について回答してください。</p>
                <div style="height: 40px;"></div>
                <p class="text-subtitle1 text-black">この後の会話を通してどのくらい相手の意見は変わると思いますか？</p>
                <div class="row">
                    <div class="col-2" align="center">
                        <p>全く変わらない</p>
                        <q-radio v-model="radioCA" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="1" />
                    </div>
                    <div class="col-2" align="center">
                        <p>少ししか変わらない</p>
                        <q-radio v-model="radioCA" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="2" />
                    </div>
                    <div class="col-2" align="center">
                        <p>ある程度変わる</p>
                        <q-radio v-model="radioCA" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="3" />
                    </div>
                    <div class="col-2" align="center">
                        <p>かなり変わる</p>
                        <q-radio v-model="radioCA" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="4" />
                    </div>
                    <div class="col-2" align="center">
                        <p>完全に変わる</p>
                        <q-radio v-model="radioCA" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="5" />
                    </div>
                </div>
                <div align="right">
                    <q-btn 
                        v-if="radioCA === ''"
                        label="次のページへ"
                        flat
                        class="bg-grey text-white"
                    ></q-btn>
                    <q-btn 
                        v-else
                        label="次のページへ"
                        flat
                        class="bg-blue-7 text-white"
                    ></q-btn>
                </div>
            </div>
        </q-tab-panel>
        <q-tab-panel name="page4">

        </q-tab-panel>
    </q-tab-panels>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

//進捗バー
const progress = ref<number>(0);

//タブ設定
const tab = ref<string>('page1');

//ラジオボタン設定
//1ページ目
const radioAgree = ref<string>('');

//2ページ目
const radioAgreeToImmigrantion = ref<string>('');
const radioMC1 = ref<string>('');
const radioMC2 = ref<string>('');
const radioMC3 = ref<string>('');
const radioMC4 = ref<string>('');
const radioCA = ref<string>('');

//次のページへ
const toPage2 = function(){
    tab.value = "page2";
    progress.value = 0.25
};


//賛成・反対系
const opinion = ref<string>('同じ');
const agree = ref<string>('');


</script>
<style scoped>
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