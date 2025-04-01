<template>
  <el-button type="primary" plain @click="visible = true">
    <img src="@/assets/icons/record.png" style="margin: 7px"/> 点击录制
  </el-button>

  <el-dialog v-model="visible" title="录制声音" width="400px" @close="resetRecording" align-center>
    <div class="waveform-container">
      <canvas ref="canvasRef" class="waveform"></canvas>
    </div>
    <p>{{ (duration / 1000).toFixed(1) }}s</p>
    <div class="record-container">
      <el-button round size="large" @click="toggleRecording" :disabled="stopDisabled">
        <img
          v-if="!isRecording"
          src="@/assets/icons/mic.svg"
          style="width: 20px; height: 20px; margin: 10px"
        />
        <img v-else src="@/assets/icons/stop.svg" style="width: 20px; height: 20px; margin: 10px"/>
      </el-button>
    </div>

    <!-- 添加预览按钮，录制完成后可以播放 -->
    <div v-if="audioUrl" class="preview-container">
      <audio :src="audioUrl" controls></audio>
      <el-button type="success" size="small" @click="confirmAudio">确认使用</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import {ElNotification} from "element-plus";
import {ref, onBeforeUnmount, defineModel} from "vue";

const audioUrl = defineModel<string | null>("audioUrl")

const visible = ref(false);
const isRecording = ref(false);
const mediaRecorder = ref<MediaRecorder | null>(null);
const audioChunks = ref<Blob[]>([]);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const audioBlob = ref<Blob | null>(null);

const stopDisabled = ref(false);

let audioContext: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let dataArray: Uint8Array | null = null;
let animationFrameId: number | null = null;
let stream: MediaStream | null = null;
let timeInterval = 0,
  timeOut = 0;
let startAt: Date = new Date();

// 开始/停止录音
const toggleRecording = async () => {
  if (isRecording.value) {
    stopRecording();
    ElNotification.success("录制成功");
  } else {
    await startRecording();
    ElNotification.info("开始录制");
  }
};

const duration = ref(0);

// 开始录音
const startRecording = async () => {
  if (isRecording.value) return;

  // 清除之前的录音数据
  audioUrl.value = null;
  audioBlob.value = null;
  audioChunks.value = [];

  startAt = new Date();
  stopDisabled.value = true;
  timeOut = setTimeout(() => {
    stopDisabled.value = false;
  }, 5000);
  timeInterval = setInterval(() => {
    duration.value = new Date().getTime() - startAt.getTime();
  }, 80);

  try {
    stream = await navigator.mediaDevices.getUserMedia({audio: true});
    audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 256;
    dataArray = new Uint8Array(analyser.frequencyBinCount);

    mediaRecorder.value = new MediaRecorder(stream);
    mediaRecorder.value.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.value.push(event.data);
      }
    };

    mediaRecorder.value.onstop = () => {
      // 录制结束后，创建音频Blob和URL
      audioBlob.value = new Blob(audioChunks.value, {type: 'audio/wav'});
      audioUrl.value = URL.createObjectURL(audioBlob.value);
    };

    mediaRecorder.value.start();
    isRecording.value = true;

    drawWaveform(); // 开始绘制波形
  } catch (error) {
    console.error("录音启动失败:", error);
    ElNotification.error("录音启动失败，请检查麦克风权限");
    resetRecording();
  }
};

// 停止录音
const stopRecording = () => {
  if (mediaRecorder.value && mediaRecorder.value.state !== 'inactive') {
    mediaRecorder.value.stop();
  }
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  isRecording.value = false;
  clearInterval(timeInterval);
  clearTimeout(timeOut);
};

// 确认使用录制的音频
const confirmAudio = () => {
  if (audioBlob.value) {
    ElNotification.success("音频已保存");
    visible.value = false;
  }
};

// 绘制波形
const drawWaveform = () => {
  if (!canvasRef.value || !analyser || !dataArray) return;

  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");

  const draw = () => {
    if (!ctx || !analyser || !dataArray) return;

    analyser.getByteTimeDomainData(dataArray);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.beginPath();

    const sliceWidth = canvas.width / dataArray.length;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * canvas.height) / 2;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      x += sliceWidth;
    }
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    animationFrameId = requestAnimationFrame(draw);
  };

  animationFrameId = requestAnimationFrame(draw);
};

// 清理资源
const resetRecording = () => {
  stopRecording();
  duration.value = 0;
  timeInterval = 0;
  timeOut = 0;
  mediaRecorder.value = null;
  // 不清除audioChunks和audioBlob，保持录制的内容可用
};

onBeforeUnmount(() => {
  stopRecording();
  // 清理URL对象，避免内存泄漏
  if (audioUrl.value) {
    URL.revokeObjectURL(audioUrl.value);
  }
});
</script>

<style scoped>
.record-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
}

.waveform-container {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  margin-bottom: 10px;
  border: 1px solid #ccc;
}

.waveform {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
}

.preview-container audio {
  width: 100%;
  margin-bottom: 10px;
}

.el-button.el-button--primary {
  border: none;
  height: 45px;
  width: 120px;
  z-index: 1;
}

.el-button:disabled {
  background-color: #ccc !important; /* 自定义灰色背景 */
  color: #666 !important; /* 字体颜色变浅 */
  border-color: #bbb !important; /* 让边框也变灰 */
  cursor: not-allowed; /* 鼠标指针变成禁止状态 */
}
</style>
