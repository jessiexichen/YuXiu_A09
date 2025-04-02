<template>
  <el-dialog
    v-model="dialogVisible"
    title="正在创建语音"
    width="40%"
    :show-close="false"
    custom-class="voice-creation-dialog"
    align-center
  >
    <div class="loading-content">
      <div class="loading-animation">
        <div class="loading-dots">
          <div class="dot dot1"></div>
          <div class="dot dot2"></div>
          <div class="dot dot3"></div>
        </div>
      </div>
      <div class="loading-text">{{ currentStatus }}</div>
    </div>

    <div class="progress-container" v-if="showProgress">
      <el-progress :percentage="progressPercentage" :text-inside="true" :stroke-width="8"></el-progress>
      <div class="progress-text">{{ progressText }}</div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { ElMessage } from "element-plus";

// 弹窗是否可见
const dialogVisible = defineModel<boolean>();
const audioVisible = defineModel<boolean>("audioVisible");

// 当前加载状态
const currentStatus = ref("正在处理语音模型...");

// 是否显示进度条
const showProgress = ref(false);

// 进度百分比
const progressPercentage = ref(0);

// 进度文本
const progressText = ref("0%");

// 关闭弹窗
const closeDialog = () => {
  dialogVisible.value = false;
  audioVisible.value = true;
  resetLoading();
};

watch(dialogVisible, () => {
  if(dialogVisible.value) {
    startLoading()
  }
});
// 开始加载动画
const startLoading = () => {
  // 模拟加载过程
  const statuses = [
    "正在处理语音模型...",
    "正在生成语音数据...",
    "正在优化语音质量...",
    "正在准备音频文件..."
  ];

  let index = 0;
  const statusInterval = setInterval(() => {
    if (index < statuses.length) {
      currentStatus.value = statuses[index];
      index++;
    } else {
      clearInterval(statusInterval);
      showProgress.value = true;
      startProgress();
    }
  }, 100);
};

// 开始进度条动画
const startProgress = () => {
  const progressInterval = setInterval(() => {
    if (progressPercentage.value < 100) {
      progressPercentage.value += 5;
      progressText.value = `${progressPercentage.value}%`;
    } else {
      clearInterval(progressInterval);
      setTimeout(() => {
        closeDialog();
        ElMessage.success("转换成功！");
      }, 100);
    }
  }, 50);
};

// 重置加载状态
const resetLoading = () => {
  currentStatus.value = "正在处理语音模型...";
  showProgress.value = false;
  progressPercentage.value = 0;
  progressText.value = "0%";
};

// 暴露方法供父组件调用
defineExpose({
  closeDialog,
});
</script>

<style scoped>
.voice-creation-dialog {
  border-radius: 10px;
  overflow: hidden;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
}

.loading-animation {
  margin-bottom: 20px;
}

.loading-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #3b7eff;
  animation: pulse 1.5s infinite ease-in-out;
}

.dot1 {
  animation-delay: 0s;
}

.dot2 {
  animation-delay: 0.3s;
}

.dot3 {
  animation-delay: 0.6s;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(0.5);
    opacity: 0.5;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
}

.loading-text {
  font-size: 14px;
  color: #666;
}

.progress-container {
  padding: 20px;
  width: 100%;
}

.progress-text {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}
</style>
