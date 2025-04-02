<template>
  <div style="display: flex;justify-content: center; align-items: center;gap: 15px;">
    <el-button
      type="primary"
      style="width: 35px; height: 35px; border-radius: 50%;"
      @click="togglePlay"
    >
      <img src="@/assets/icons/begin.png" style="width: 1.9em;" v-if="!isPlaying">
      <img src="@/assets/icons/pause.png" style="width: 0.8em;" v-else>
    </el-button>
    <text style="line-height: 35px;">{{ currentTime }}</text>
    <el-slider
      style="width: 200px;"
      v-model="progress"
      @input="updateProgress"
      :show-tooltip=false
    />
    <text style="line-height: 35px;">{{ totalDuration }}</text>
  </div>
</template>

<script lang="ts" setup>
import { audioUrlTest } from '@/assets/constants';
import { ref, onMounted, watch, defineModel } from 'vue';

const newTime = defineModel<number>();

watch(newTime, () => {
  console.log(newTime.value+"555")
  if(!newTime.value) return;
  updateTime(newTime.value)
})

    // 音频播放状态
    const isPlaying = ref(false);
    // 音频进度
    const progress = ref(0);
    // 当前播放时间
    const currentTime = ref('00:00');
    // 音频总时长
    const totalDuration = ref('00:00');
    // 音频实例
    const audio = new Audio();

    // 设置要播放的本地音频文件路径
    const audioSrc = ref(audioUrlTest[0]); // 您可以在这里指定音频文件路径

    // 初始化音频
    onMounted(() => {
      audio.src = audioSrc.value;
      console.log(audio.src)
      audio.addEventListener('loadedmetadata', () => {
        // 获取音频总时长
        const duration = audio.duration;
        totalDuration.value = formatTime(duration);
      });

      audio.addEventListener('timeupdate', () => {
        // 更新播放进度
        progress.value = (audio.currentTime / audio.duration) * 100;
        currentTime.value = formatTime(audio.currentTime);
      });
    });

    // 播放/暂停切换
    const togglePlay = () => {
      if (isPlaying.value) {
        audio.pause();
      } else {
        audio.play();
      }
      isPlaying.value = !isPlaying.value;
    };

    // 更新进度条
    const updateProgress = (value: number) => {
      const newTime = (audio.duration * value) / 100;
      progress.value = value;
      audio.currentTime = newTime;
    };
    // 用指定时间点更新时间
    const updateTime = (time: number) => {
      audio.currentTime = time;
      currentTime.value = formatTime(time);
      progress.value = (time / audio.duration) * 100;
    }


    // 格式化时间
    const formatTime = (seconds: number): string => {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
</script>
