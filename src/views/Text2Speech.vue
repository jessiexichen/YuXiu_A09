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
          :placeholder=placeholder
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
          <img src="@/assets/icons/selecVoice.png" style="width: 500px;height: 55px;position: relative;left: 5%;top: 20%;" v-if="selectedVoice.name==='默认' && selectedVoice.type === ''" />
          <div class="voice-content" v-else-if="selectedVoice.type === 'normal'">
            <div class="voice-description" v-for="tag in selectedVoice.tags" :key="tag">
              <el-tag :type="handleType(tag)">{{ tag }}</el-tag>
            </div>
            <div class="icon">
              <img src="@/assets/icons/restore.svg">
            </div>
          </div>
          <div class="voice-content" v-else>
            <el-avatar :size="50" :src="selectedVoice.avatar" />
            <div class="voice-name">
              {{ selectedVoice.name }}
            </div>
            <div class="voice-description">
              <el-tag :type="handleType(selectedVoice.language)">{{ selectedVoice.language }}</el-tag>
            </div>
            <div class="icon">
              <img src="@/assets/icons/restore.svg">
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
          <el-button type="primary" style="width: 55%;" @click="transformDialogVisible = !transformDialogVisible;">开始转换</el-button>
        </div>
        <TransformDialog
          v-model="transformDialogVisible"
          v-model:audio-visible="audioVisible"

        />
      </Card>
      <Card
        title="调节音频"
        v-if="audioVisible"
      >
        <div class="card-block" style="align-items: center;justify-content: center;gap: 15px;">
          <Audio
          :key="audioSrc"
            v-model="newTime"
            v-model:is-playing="isPlaying"
            v-model:audio-src="audioSrc"
          />
           <el-button type="primary" style="width: 140px;" @click="isShowMore=!isShowMore">
            <img src="@/assets/icons/dots.png" style="width: 0.8em;height: 1.3em;" >
            更多声音调节选项
          </el-button>
        </div>

        <div class="card-block">
          <div class="more-voice" v-if="isShowMore">
            <el-button type="primary" @click="audioVisible=false;transformDialogVisible = !transformDialogVisible;audioSrc=audioUrlTest[2];isPlaying=false" v-if="settingChanged">应用设置</el-button>
            <el-dropdown @command="SpeedSelect">
              <el-button>
                倍速
                <span v-if="Speed!==''">:{{Speed}}</span>
                <el-icon class="el-icon--right" v-else><arrow-up /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="0.5"><span style="width: 100%;;text-align: center;">0.5</span></el-dropdown-item>
                  <el-dropdown-item command="0.7"><span style="width: 100%;;text-align: center;">0.7</span></el-dropdown-item>
                  <el-dropdown-item command="0.9"><span style="width: 100%;;text-align: center;">0.9</span></el-dropdown-item>
                  <el-dropdown-item command=""><span style="width: 100%;;text-align: center;">1.0</span></el-dropdown-item>
                  <el-dropdown-item command="1.1"><span style="width: 100%;;text-align: center;">1.1</span></el-dropdown-item>
                  <el-dropdown-item command="1.3"><span style="width: 100%;;text-align: center;">1.3</span></el-dropdown-item>
                  <el-dropdown-item command="1.5"><span style="width: 100%;;text-align: center;">1.5</span></el-dropdown-item>
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
                响度<span v-if="Volume!==''">:{{Volume}}</span>
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
            <img src="@/assets/icons/star.png" @click="collectionDialogVisible = true;haveStared=true" v-if="!haveStared" style="cursor: pointer;">
            <img src="@/assets/icons/star_fill.png" v-else style="cursor: pointer;">
            <CollectionDialog
              v-model="collectionDialogVisible"
            />
          </div>
        </div>
        <div class="card-block" style="justify-content: center;align-items:center;gap: 5px;padding: 10px;">
          选择音频格式
          <el-radio-group v-model="audioFormat">
            <el-radio label="mp3" />
            <el-radio label="ogg" />
            <el-radio label="aac" />
            <el-radio label="opus" />
            <el-radio label="wav" />
          </el-radio-group>
          <el-button type="primary" @click="downloadAudio()">下载音频</el-button>
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
import { ElInput, ElSwitch, ElButton, ElRadioGroup } from 'element-plus';
import { computed, ref, watch } from 'vue';
import { audioUrlTest, lanConfig, textTest } from '@/assets/constants';
import type { SelectedVoice } from '@/types/voice';
import { useAvatar } from '@/stores';
import TransformDialog from '@/components/transformDialog/transformDialog.vue';
import Audio from '@/components/audio/audio.vue';
import CollectionDialog from '@/components/collectionDialog/collectionDialog.vue';

const text = ref("")
const placeholder = ref("请输入文本内容...")

const autoPlay = ref(true)
const tryMode = ref(false)
const isPlaying = ref(false)


const voiceDialogVisible = ref(false)
const isShowMore = ref(false);
const Speed = ref("");
const Voice = ref("");
const Volume = ref("");
const settingChanged = computed(() => {
  return Speed.value !== "" || Voice.value !== "" || Volume.value !== "";
});

function SpeedSelect(command: string) {
  Speed.value = command;
}
function VoiceSelect(command: string) {
  Voice.value = command;
}
function VolumeSelect(command: string) {
  Volume.value = command;
}

const collectionDialogVisible = ref(false);
const haveStared = ref(false);

const selectedVoice = ref<SelectedVoice>({
  type: "",
  tags: ["普通话"],
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
const testNumber = 18;
const audioSrc = ref("语音合成/"+audioUrlTest[testNumber]);
watch(selectedVoice.value, () => {
  placeholder.value = textTest[testNumber]
})

const transformDialogVisible = ref(false)

const audioVisible = ref(false)
const newTime = ref(0)
const audioFormat = ref("mp3")

const downloadAudio = () => {
  const a = document.createElement('a');
  a.href = audioUrlTest[1];
  a.download = audioUrlTest[1]; // 设置下载的文件名
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
watch(audioVisible, () => {
  if(!audioVisible.value) return;
    // 生成进度
    const progress = ref(0);
    // 定时器
    let timer: number = 0;

    // 开始生成
      progress.value = 0;

      // 模拟生成进度
      timer = setInterval(() => {
        progress.value += 1;
        if (progress.value >= 3) {
          clearInterval(timer);
          setTimeout(() => {
            if(autoPlay.value){
            isPlaying.value = true;
          }
          }, 100);
        }
      }, 100);
})
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
        position: relative;
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
