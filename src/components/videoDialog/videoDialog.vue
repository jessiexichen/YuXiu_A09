<template>
  <el-dialog
    v-model="dialogVisible"
    title="视频播放"
    width="55%"
    :before-close="handleClose"
  >
    <div style="display: flex; justify-content: center; align-items: center;">
      <video
        ref="videoPlayer"
        controls
        style="width: 100%; max-width: 800px; border-radius: 8px;"
      >
        <source :src="videoSrc" type="video/mp4" />
          您的浏览器不支持视频播放。
        </video>
      </div>
    </el-dialog>
</template>
<script lang="ts" setup>
const dialogVisible = defineModel<boolean>("dialogVisible");
const videoSrc = defineModel<string>("videoSrc");

const handleClose = () => {
  dialogVisible.value = false;
};
</script>
