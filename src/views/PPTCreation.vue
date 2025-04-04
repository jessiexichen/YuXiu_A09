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
          :action="uploadUrl"
          :before-upload="beforeUpload"
          :http-request="handleUpload"
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
        <div class="card-block" style="justify-content: center;align-items:center;gap: 55px;">
          讲解模式
          <text style="color: #9E9E9E;">增加额外的讲解</text>
          <el-switch v-model="specialistMode" />
        </div>
        <div class="card-block" style="justify-content: center;align-items:center;">
          <el-button type="primary" style="width: 55%;" @click="startTransform()">开始转换</el-button>
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
        <div class="card-block" style="justify-content: center;align-items:center;gap: 15px;">
            <Audio
              v-model="newTime"
              v-model:is-playing="isPlaying"
              v-model:audio-src="audioUrl"
            />
           <el-dropdown @command="PageSelect">
              <el-button>
                <span>第{{ page }}页</span><el-icon><arrow-down /></el-icon>
              </el-button>
              <template #dropdown >
                <el-input-number v-model="page" style="width: 100px;margin-left: 10px;" min="1" max="20" />
              </template>
           </el-dropdown>
        </div>
        <div class="card-block">
          <div class="more-voice">
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
            <el-button type="primary" style="width: 140px;" @click="buidVideo()">
              生成视频
            </el-button>
            <el-dialog
              v-model="videoDialogVisible"
              title="正在生成视频"
              width="30%"
              :show-close="false"
              align-center
            >
              <div v-if="isGenerating">
                <el-progress :percentage="progress" :text-inside="true" :stroke-width="24" />
                <div style="margin-top: 20px; text-align: center;">
                  请稍后...
                </div>
              </div>
              <div v-else>
                <div style="text-align: center; font-size: 18px; color: #67C23A;">
                  生成成功
                </div>
                <div style="text-align: center; margin-top: 15px;">
                  请到生成历史查看
                </div>
                <div style="text-align: center; margin-top: 20px;">
                  <el-link type="primary" :underline="true" @click="goToHistory">
                    <strong style="font-weight: bold; text-decoration: underline;">跳转</strong>
                  </el-link>
                </div>
              </div>
            </el-dialog>
          </div>
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
import { ElSwitch, ElButton, ElMessage } from 'element-plus';
import { lanConfig } from '@/assets/constants';
import { computed, ref, watch } from 'vue';
import type { SelectedVoice } from '@/types/voice';
import { useAvatar } from '@/stores';
import TransformDialog from '@/components/transformDialog/transformDialog.vue';
import Audio from '@/components/audio/audio.vue';
import router from '@/router';


const selectedVoice = ref<SelectedVoice>({
  type: "",
  tags: ["普通话"],
  name: "默认",
  language: "普通话",
  avatar: useAvatar().avatarUrl,
})


const autoPlay = ref(false)
const tryMode = ref(false)
const specialistMode = ref(false)

const Speed = ref("");
const Voice = ref("");
const Volume = ref("");

const page = ref(1)

function SpeedSelect(command: string) {
  Speed.value = command;
}
function VoiceSelect(command: string) {
  Voice.value = command;
}
function VolumeSelect(command: string) {
  Volume.value = command;
}
function PageSelect(command: number) {
  page.value = command;
}

const handleType = (language: string) => {
  if (language === "普通话") {
    return "success";
  } else if (language === "日语") {
    return "warning";
  } else if (language === "英语") {
    return "primary";
  }
}

const voiceDialogVisible = ref(false)
const videoDialogVisible = ref(false)
const transformDialogVisible = ref(false)
const audioVisible = ref(false)
const isPlaying = ref(false)
const audioUrl = computed(() => {
  if(specialistMode.value){
    return "DNA是主要的遗传物质_讲解视频.mp3";
  }
  else{
    return "DNA是主要的遗传物质_基础视频.mp3";
  }
})

watch(audioVisible, () => {
  if(!audioVisible.value) {
    isPlaying.value = false;
    return;
  }
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

//PPT上传
const uploadUrl = "https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"

const beforeUpload = (file:File) => {
  // 检查文件类型
  const isPPT = file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
                file.type === "application/vnd.ms-powerpoint";
  const isLt20MB = file.size / 1024 / 1024 < 20;

  if (!isPPT) {
    ElMessage.error("只能上传PPT或PPTX文件！");
    return false;
  }
  if (!isLt20MB) {
    ElMessage.error("上传的PPT文件大小不能超过20MB！");
    return false;
  }
  return true;
};

const newTime = ref(0)
//用来实现变化页面然后更新时间
watch(page, () => {
  updateTime();
})
const updateTime = () => {
  if(page.value == undefined){
    page.value = 1;
  }
  if(page.value == 1){
    newTime.value = 1;
  }
  if(page.value == 2){
    newTime.value = 2;
  }
  if(page.value == 3){
    newTime.value = 13;
  }
  if(page.value == 4){
    newTime.value = 33;
  }
  if(page.value == 5){
    newTime.value = 47;
  }
  if(page.value == 6){
    newTime.value = 65;
  }
  if(page.value == 7){
    newTime.value = 80;
  }
  if(page.value == 8){
    newTime.value = 90;
  }
  if(page.value == 9){
    newTime.value = 100;
  }
}
const startTransform = () => {
  audioVisible.value = false;
  transformDialogVisible.value = true;
  page.value = 1;
}

const buidVideo = () => {
  videoDialogVisible.value = true;
  startGenerating();
}
    // 是否正在生成
    const isGenerating = ref(true);
    // 生成进度
    const progress = ref(0);
    // 定时器
    let timer: number = 0;

    // 开始生成
    const startGenerating = () => {
      isGenerating.value = true;
      progress.value = 0;

      // 模拟生成进度
      timer = setInterval(() => {
        progress.value += 10;
        if (progress.value >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            isGenerating.value = false;
          }, 100);
        }
      }, 100);
    };

    // 跳转到生成历史
const goToHistory = () => {
  router.push('/tranhistory');
  ElMessage.success('跳转到生成历史');
  // 这里可以实现跳转逻辑
  videoDialogVisible.value = false;
  closeDialog()
};

// 关闭弹窗时清理定时器
const closeDialog = () => {
  clearInterval(timer);
};
</script>

<script lang="ts">
    // 模拟上传处理函数
    function handleUpload(file) {
      // 阻止默认上传行为
      const isPPT = file.file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
                    file.file.type === 'application/vnd.ms-powerpoint';

      if (!isPPT) {
        this.$message.error('只能上传PPT文件');
        return;
      }

      const isLt20M = file.file.size / 1024 / 1024 < 20;
      if (!isLt20M) {
        this.$message.error('上传的文件大小不能超过 20MB!');
        return;
      }

      // 模拟上传进度
      const progress = {
        percent: 0,
        status: 'uploading'
      };

      showProgress(progress);

      // 模拟上传过程
      setTimeout(() => {
        // 模拟上传完成
        progress.percent = 100;
        progress.status = 'success';
        showProgress(progress);

        // 模拟上传成功后的回调
        ElMessage.success('上传成功');

        // 这里可以处理上传成功后的逻辑
        console.log('文件上传成功:', file.file.name);
      }, 2000);
    }

    // 显示上传进度
    function showProgress(progress) {
      ElMessage.info(`上传进度: ${progress.percent}%`);

      // 如果需要显示进度条，可以在这里实现
      // 例如使用 Element Plus 的 el-progress 组件
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
        position: relative;
        left: 5%;
        align-items: center;
        justify-content: center;
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
