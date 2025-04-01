<template>
  <LayOut>
    <div class="container">
      <div class="title">
        输入文本
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
        title="输入文本内容"
      >
        <ElInput
          v-model="text"
          type="textarea"
          show-word-limit
          placeholder="请输入文本内容..."
          maxlength="2000"
          resize="none"
          :clearable=true
          input-style="height: 400px;width: 100%;"
          class="input-field"
        />
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
          <img src="@/assets/icons/selecVoice.png" style="width: 500px;height: 55px;position: relative;left: 5%;top: 20%;" v-if="selectedVoice.name==='默认'" />
          <div class="voice-content" v-else>
            <el-avatar :size="50" :src="selectedVoice.avatar" />
            <div class="voice-name">
              {{ selectedVoice.name }}
            </div>
            <div class="voice-description">
              <el-tag :type="handleType(selectedVoice.language)">{{ selectedVoice.language }}</el-tag>
            </div>
            <div class="icon" style="right: 60px;">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="24" height="24" viewBox="0 0 24 24"><defs><clipPath id="master_svg0_185_7296"><rect x="0" y="0" width="24" height="24" rx="0"/></clipPath></defs><g clip-path="url(#master_svg0_185_7296)"><g><path d="M12,4C14.5905,4,16.893900000000002,5.23053,18.3573,7.14274L16,9.5L22,9.5L22,3.5L19.7814,5.71863C17.9494,3.452,15.1444,2,12,2C6.47715,2,2,6.47715,2,12L4,12C4,7.58172,7.58172,4,12,4ZM20,12C20,16.418300000000002,16.418300000000002,20,12,20C9.409510000000001,20,7.10605,18.7695,5.64274,16.857300000000002L8,14.5L2,14.5L2,20.5L4.21863,18.2814C6.05062,20.548,8.85557,22,12,22C17.5228,22,22,17.5228,22,12L20,12Z" fill="#A6A6A6" fill-opacity="1" style="mix-blend-mode:passthrough"/></g></g></svg>
            </div>
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="18.414228439331055" height="18.414249420166016" viewBox="0 0 18.414228439331055 18.414249420166016"><g><path d="M7.79293,9.20715L0,1.41421L1.41421,0L9.20713,7.79285L17,0L18.4142,1.41421L10.6213,9.20715L18.4142,17L17,18.4142L9.20713,10.6213L1.41421,18.4142L0,17L7.79293,9.20715Z" fill="#A6A6A6" fill-opacity="1" style="mix-blend-mode:passthrough"/></g></svg>
            </div>
          </div>
        </div>
      </Card>
      <voiceDialog
        v-model:dialog-visible="voiceDialogVisible"
        v-model:selected-voice="selectedVoice"
      />
      <Card
        title="设置"
      >
        <div class="card-block" style="justify-content: center;align-items:center;gap: 40px;">
          自动播放
          <text style="color: #9E9E9E;">转换成功后直接播放</text>
          <el-switch v-model="autoPlay" />
        </div>
        <div class="card-block" style="justify-content: center;align-items:center;gap: 46px;">
          试听模式
          <text style="color: #9E9E9E;">只转换前50个字符</text>
          <el-switch v-model="tryMode" />
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
            <el-dropdown @command="VolumeSelect">
              <el-button>
                音量<span v-if="Volume!==''">:{{Volume}}</span>
                <el-icon class="el-icon--right" v-else><arrow-up /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="50%"><span style="width: 100%;;text-align: center;">50%</span></el-dropdown-item>
                  <el-dropdown-item command="70%"><span style="width: 100%;;text-align: center;">70%</span></el-dropdown-item>
                  <el-dropdown-item command="90%"><span style="width: 100%;;text-align: center;">90%</span></el-dropdown-item>
                  <el-dropdown-item command=""><span style="width: 100%;;text-align: center;">100%</span></el-dropdown-item>
                  <el-dropdown-item command="110%"><span style="width: 100%;;text-align: center;">110%</span></el-dropdown-item>
                  <el-dropdown-item command="130%"><span style="width: 100%;;text-align: center;">130%</span></el-dropdown-item>
                  <el-dropdown-item command="150%"><span style="width: 100%;;text-align: center;">150%</span></el-dropdown-item>
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
          <el-button type="primary">下载音频</el-button>
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
import { ElInput, ElSwitch, ElButton, ElRadioGroup, ElSlider } from 'element-plus';
import { ref } from 'vue';
import { lanConfig } from '@/assets/constants';
import type { SelectedVoice } from '@/types/voice';
import { useAvatar } from '@/stores';
const text = ref("")

const autoPlay = ref(true)
const tryMode = ref(true)

const voiceDialogVisible = ref(false)
const isShowMore = ref(false);
const Speed = ref("");
const Voice = ref("");
const Volume = ref("");

function SpeedSelect(command: string) {
  Speed.value = command;
}
function VoiceSelect(command: string) {
  Voice.value = command;
}
function VolumeSelect(command: string) {
  Volume.value = command;
}

const selectedVoice = ref<SelectedVoice>({
  name: "默认",
  language: "普通话",
  avatar: useAvatar().avatarUrl,
})

const handleType = (language: string) => {
  if (language === "普通话") {
    return "success";
  } else if (language === "日语") {
    return "warning";
  } else if (language === "英语") {
    return "primary";
  }
}

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
      justify-content: space-between;
      gap: 5px;
      width: 100%;
      height: 100%;
      padding: 10px 0 5px 10px;
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
        margin-right: 40px;
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

      .voice-content {
        width: 100%;
        position: relative;
        display: flex;
        padding: 0 15px 0 25px;
        height: 100%;
        align-items: center;
        justify-self: start;
        gap: 20px;
        .icon {
          position: absolute;
          right: 20px;
          line-height: 50%;
        }
      }
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
