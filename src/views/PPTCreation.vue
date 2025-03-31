<template>
  <LayOut>
    <div class="container">
      <div class="title">
        上传PPT
      </div>
      <Card
        title="选择输入样本语言"
      >
        <DropDownSelector
          :visible-selection="lanConfig.visibleLanguages"
          :has-more="true"
          :all-selection="lanConfig.allLanguages"
          style="width: 86%;"
        />
      </Card>
      <Card
        title="上传PPT"
        description="不超过20MB"
      >
      <div class="card-block" style="display: block;">
        <el-upload
          class="el-upload"
          drag
          action=""
          style="display: block;"
        >
          <div style="height: 270px;display: flex;flex-direction: column;justify-content: center;align-items: center;">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              可拖拽至此上传或<em>点击上传</em>
            </div>
          </div>

        </el-upload>
      </div>

      </Card>
    </div>
    <div class="container">
      <div class="title">
        生成语音
      </div>
      <Card
        title="语音样本库"
      >
        <div class="select-language" @click="voiceDialogVisible = true">
          <img src="@/assets/icons/selecVoice.png" style="width: 500px;height: 55px;position: relative;left: 5%;top: 20%;" />
        </div>
      </Card>
      <voiceDialog
        v-model="voiceDialogVisible"
      >
      </voiceDialog>
      <Card
        title="设置"
      >
        <div class="card-block" style="justify-content: center;align-items:center;gap: 40px;">
          自动播放
          <text style="color: #9E9E9E;">转换成功后直接播放</text>
          <el-switch />
        </div>
        <div class="card-block" style="justify-content: center;align-items:center;gap: 46px;">
          试听模式
          <text style="color: #9E9E9E;">只转换前50个字符</text>
          <el-switch />
        </div>
        <div class="card-block" style="justify-content: center;align-items:center;">
          <el-button type="primary" style="width: 55%;">开始转换</el-button>
        </div>
      </Card>
      <Card
        title="调节音频"
      >
        <div class="card-block" style="justify-content: center;align-items:center;gap: 15px;">
          <el-button type="primary" style="width: 35px;height: 35px;border-radius: 100%;">
            <img src="@/assets/icons/begin.png" style="width: 1.9em;">
            <!-- <img src="@/assets/icons/pause.png" style="width: 0.8em;"> -->
          </el-button>
           <text style="line-height: 35px;">00:07</text>
           <el-slider style="width: 200px;"/>
           <text style="line-height: 35px;">00:15</text>
           <div style="display: flex;align-items: center;">
            <img src="@/assets/icons/voice.png" style="width: 1.5em;height: 1.1em;" >
          </div>
           <el-button type="primary" style="width: 140px;" @click="isShowMore=!isShowMore">
            <img src="@/assets/icons/dots.png" style="width: 0.8em;height: 1.3em;" >
            更多声音调节选项
          </el-button>
        </div>
        <div class="card-block">
          <div class="more-voice" v-if="isShowMore">
            <el-dropdown @command="SpeedSelect">
              <el-button>
                倍速
                <span v-if="Speed!==''">:{{Speed}}</span>
                <el-icon class="el-icon--right" v-else><arrow-up /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="0.4"><span style="width: 100%;;text-align: center;">0.4</span></el-dropdown-item>
                  <el-dropdown-item command="0.6"><span style="width: 100%;;text-align: center;">0.6</span></el-dropdown-item>
                  <el-dropdown-item command="0.8"><span style="width: 100%;;text-align: center;">0.8</span></el-dropdown-item>
                  <el-dropdown-item command=""><span style="width: 100%;;text-align: center;">1.0</span></el-dropdown-item>
                  <el-dropdown-item command="1.2"><span style="width: 100%;;text-align: center;">1.2</span></el-dropdown-item>
                  <el-dropdown-item command="1.4"><span style="width: 100%;;text-align: center;">1.4</span></el-dropdown-item>
                  <el-dropdown-item command="1.6"><span style="width: 100%;;text-align: center;">1.6</span></el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-dropdown @command="VoiceSelect">
              <el-button>
                音调<span v-if="Voice!==''">:{{Voice}}</span>
                <el-icon class="el-icon--right" v-else><arrow-up /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="+50%"><span style="width: 100%;;text-align: center;">升高50%</span></el-dropdown-item>
                  <el-dropdown-item command="+25%"><span style="width: 100%;;text-align: center;">升高25%</span></el-dropdown-item>
                  <el-dropdown-item command="+10%"><span style="width: 100%;;text-align: center;">升高10%</span></el-dropdown-item>
                  <el-dropdown-item command=""><span style="width: 100%;;text-align: center;">原声调</span></el-dropdown-item>
                  <el-dropdown-item command="-10%"><span style="width: 100%;;text-align: center;">降低10%</span></el-dropdown-item>
                  <el-dropdown-item command="-25%"><span style="width: 100%;;text-align: center;">降低25%</span></el-dropdown-item>
                  <el-dropdown-item command="-50%"><span style="width: 100%;;text-align: center;">降低50%</span></el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="card-block" style="justify-content: center;align-items:center;gap: 5px;padding: 10px;">
          选择音频格式
          <el-radio-group>
            <el-radio label="mp3" />
            <el-radio label="ogg" />
            <el-radio label="aac" />
            <el-radio label="opus" />
            <el-radio label="wav" />
          </el-radio-group>
          <el-button type="primary">一键导入</el-button>
        </div>
      </Card>
    </div>
  </LayOut>
</template>
<script setup lang="ts">
import LayOut from '@/components/layouts/LayOut.vue';
import Card from '@/components/card/CarD.vue';
import DropDownSelector from '@/components/dropDownSelecter/dropDownSelector.vue';
import voiceDialog from '@/components/voiceDialog/voiceDialog.vue';
import { ElSwitch, ElButton, ElRadioGroup, ElSlider } from 'element-plus';
import { lanConfig } from '@/assets/constants';
import { ref } from 'vue';

const selectedLanguage = ref("")

const isShowMore = ref(false);
const Speed = ref("");
const Voice = ref("");

function SpeedSelect(command: string) {
  Speed.value = command;
}
function VoiceSelect(command: string) {
  Voice.value = command;
}

const voiceDialogVisible = ref(false)
</script>

<style lang="scss" scoped>
.container {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 1600px){
    width: 750px;
  }
  .title {
    margin-top: 20px;
    height: 5%;
    font-size: 24px;
    font-weight: 500;
    line-height: 28px;
  }

  .card {
    width: 92%;
    .card-block {
      display: flex;
      flex-direction: row;
      justify-content: start;
      gap: 5px;
      width: 100%;
      height: 100%;
      padding-top: 10px;
      padding-bottom: 5px;
      .block-title {
        display: flex;
        height: 100%;
        width: 5%;
        padding-top: 6px;
        align-items: start;
        flex-grow: 1;
      }

      .more-voice {
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 20px;
        width: 100%;
        height: 30px;
      }
    }

    .basic-language {
      display: grid;
      width: 100%;
      grid-template-columns: 1fr 9fr;
      padding: 10px 0 5px 10px;
    }

    .select-language {
      width: 90%;
      height: 100px;
      border: 2px dashed #E5E7EB;
      border-radius: 8px;
      box-sizing: border-box;
      cursor: pointer;
    }
  }

  .icon-container {
    display: flex;
    gap: 15px;
    width: 100%;
    height: 100%;
    justify-content: start;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
      cursor: pointer;
      object-fit: cover;
      object-position: start;
    }
  }

  .input-container {
    display: flex;
    flex-direction: column;
    padding: 15px;
    width: 100%;
    height: 250px;
    border: 1px solid var(--el-border-color-light);
    border-radius: 10px;

    .input-field {
      width: 100%;
      height: 100%;
    }
  }
}

</style>
