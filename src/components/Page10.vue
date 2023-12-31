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
          <div class="f-modal-alert">
            <div class="f-modal-icon f-modal-success animate">
              <span class="f-modal-line f-modal-tip animateSuccessTip"></span>
              <span class="f-modal-line f-modal-long animateSuccessLong"></span>
              <div class="f-modal-placeholder"></div>
              <div class="f-modal-fix"></div>
            </div>
          </div>
          <p class="text-h5 text-center">パートナーが見つかりました！</p>
          <p class="text-subtitle1 text-center">※5秒後に自動的に次のステップに進みます。</p>
        </div>
      </q-card-section>
      <div v-if="visible">
        <div class="row justify-center">
            <q-spinner-hourglass 
              color="blue" 
              size="80px"
            />
        </div>
        <p class="text-blue text-h5 text-center">パートナーを検索中です...</p>
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
  }, 5000);
  //次のページへ移動させる処理
  setTimeout(async() => {
    toPage11();
  }, 10000);
});

//読み込み中の画面を制御する変数
const visible = ref<boolean>(true);
const showSimulatedReturnData = ref<boolean>(false);

//次のページへ
const toPage11 = function(){
  window.scrollTo(0, 0);  
  execEmit();
};

const emit = defineEmits(['eventEmit'])
const execEmit = () => {
  emit('eventEmit', { 'tab': 'page11', 'progress': 0.5})
}

</script>
<style lang="scss">
.task-card{
  height: 300px;
}
.f-modal-alert .f-modal-icon {
	border-radius: 50%;
	border: 4px solid gray;
	box-sizing: content-box;
	height: 80px;
	margin: 20px auto;
	padding: 0;
	position: relative;
	width: 80px;

	// Success icon
	&.f-modal-success,
	&.f-modal-error {
		border-color: #A5DC86;

		&:after,
		&:before {
			background: #fff;
			content: '';
			height: 120px;
			position: absolute;
			transform: rotate(45deg);
			width: 60px;
		}

		&:before {
			border-radius: 120px 0 0 120px;
			left: -33px;
			top: -7px;
			transform-origin: 60px 60px;
			transform: rotate(-45deg);
		}

		&:after {
			border-radius: 0 120px 120px 0;
			left: 30px;
			top: -11px;
			transform-origin: 0 60px;
			transform: rotate(-45deg);
		}

		.f-modal-placeholder {
			border-radius: 50%;
			border: 4px solid rgba(165, 220, 134, .2);
			box-sizing: content-box;
			height: 80px;
			left: -4px;
			position: absolute;
			top: -4px;
			width: 80px;
			z-index: 2;
		}

		.f-modal-fix {
			background-color: #fff;
			height: 90px;
			left: 28px;
			position: absolute;
			top: 8px;
			transform: rotate(-45deg);
			width: 5px;
			z-index: 1;
		}

		.f-modal-line {
			background-color: #A5DC86;
			border-radius: 2px;
			display: block;
			height: 5px;
			position: absolute;
			z-index: 2;

			&.f-modal-tip {
				left: 14px;
				top: 46px;
				transform: rotate(45deg);
				width: 25px;
			}

			&.f-modal-long {
				right: 8px;
				top: 38px;
				transform: rotate(-45deg);
				width: 47px;
			}
		}
	}
}

.animateSuccessTip {
	animation: animateSuccessTip .75s;
}

.animateSuccessLong {
	animation: animateSuccessLong .75s;
}

.f-modal-icon.f-modal-success.animate:after {
	animation: rotatePlaceholder 4.25s ease-in;
}

.f-modal-icon.f-modal-error.animate:after {
	animation: rotatePlaceholder 4.25s ease-in;
}

.animateErrorIcon {
	animation: animateErrorIcon .5s;
}

.animateXLeft {
	animation: animateXLeft .75s;
}

.animateXRight {
	animation: animateXRight .75s;
}

.scaleWarning {
    animation: scaleWarning 0.75s infinite alternate;
}

.pulseWarningIns {
    animation: pulseWarningIns 0.75s infinite alternate;
}

@keyframes animateSuccessTip {
	0%,54% {
		width: 0;
		left: 1px;
		top: 19px;
	}

	70% {
		width: 50px;
		left: -8px;
		top: 37px;
	}

	84% {
		width: 17px;
		left: 21px;
		top: 48px;
	}

	100% {
		width: 25px;
		left: 14px;
		top: 45px;
	}
}

@keyframes animateSuccessLong {
	0%,65% {
		width: 0;
		right: 46px;
		top: 54px;
	}

	84% {
		width: 55px;
		right: 0;
		top: 35px;
	}

	100% {
		width: 47px;
		right: 8px;
		top: 38px;
	}
}

@keyframes rotatePlaceholder {
	0%,5% {
		transform: rotate(-45deg);
	}

	100%,12% {
		transform: rotate(-405deg);
	}
}

@keyframes animateErrorIcon {
	0% {
		transform: rotateX(100deg);
		opacity: 0;
	}

	100% {
		transform: rotateX(0deg);
		opacity: 1;
	}
}

@keyframes animateXLeft {
	0%,
	65% {
		left: 82px;
		top: 95px;
		width: 0;
	}

	84% {
		left: 14px;
		top: 33px;
		width: 47px;
	}

	100% {
		left: 17px;
		top: 37px;
		width: 47px;
	}
}

@keyframes animateXRight {
	0%,
	65% {
		right: 82px;
		top: 95px;
		width: 0;
	}

	84% {
		right: 14px;
		top: 33px;
		width: 47px;
	}

	100% {
		right: 16px;
		top: 37px;
		width: 47px;
	}
}

@keyframes scaleWarning {
	0% {
		transform: scale(1);
	}
	
	30% {
		transform: scale(1.02);
	}
	
	100% {
		transform: scale(1);
	}
}

@keyframes pulseWarning {
	0% {
		background-color: #fff;
		transform: scale(1);
		opacity: 0.5;
	}

	30% {
		background-color: #fff;
		transform: scale(1);
		opacity: 0.5;
	}

	100% {
		background-color: #F8BB86;
		transform: scale(2);
		opacity: 0;
	}
}

@keyframes pulseWarningIns {
    0% {
        background-color: #F8D486;
    }

    100% {
        background-color: #F8BB86;
    }
}

</style>