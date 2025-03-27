<template>
  <LayOut>
    <div class="card-container">
      <Card
        title="输入样本语言"
        class="top-block"
      >
        <div class="card-block">
          <div class="block-title">语言</div>
          <DropDownSelector
            :visible-selection="lanConfig.visibleLanguages1"
            :has-more="true"
            :all-selection="lanConfig.allLanguages"
            style="width: 91%;border: none;"
          />
        </div>
        <div class="card-block" style="padding-right: 0;">
          <div class="block-title">方言</div>
          <DropDownSelector
            :visible-selection="lanConfig.localLanguage"
            :has-more="false"
            style="width: 94%;border: none;"
          />
        </div>
      </Card>
      <Card
        title="音频文件样本"
        description="5s-30s"
        class="bottome-block"
      >
        <div class="card-block" style="display: block;">
          <div
            class="upload-demo"
          >
            <div style="position: relative;top: 8%;">
              <el-button type="primary" class="recording" plain>
                <img src="@/assets/icons/record.png" style="">点击录制
              </el-button>
              <el-button type="primary" class="uploading" plain>
                <img src="@/assets/icons/upload.png" style="">点击上传
              </el-button>
            </div>
            <div class="upload-text" style="position: relative;top: 13%;color: #6B7280;">
              可拖拽至此上传或点击上传
            </div>
            <div class="upload-text" style="position: relative;top: 13%;color: #6B7280;">
              支持格式: mp3、ogg、aac、opus、wav
            </div>
            <!-- <template #tip>
              <div class="el-upload__tip">
                jpg/png files with a size less than 500kb
              </div>
            </template> -->
          </div>
        </div>
        <div class="card-block">
          <el-button type="primary" style="width: 35px;height: 35px;border-radius: 100%;" @click="play()">
            <img src="@/assets/icons/begin.png" style="width: 1.9em;" v-if="!isPlaying">
            <img src="@/assets/icons/pause.png" style="width: 0.7em;" v-else>
          </el-button>
           <text style="line-height: 35px;">00:07</text>
           <el-slider style="width: 200px;"/>
           <text style="line-height: 35px;">00:15</text>
           <div style="display: flex;align-items: center;">
            <img src="@/assets/icons/voice.png" style="width: 1.5em;height: 1.1em;" >
          </div>
           <el-button type="primary" style="width: 140px;">
            <img src="@/assets/icons/：.png" style="width: 0.8em;height: 1.3em;" >
            更多声音调节选项
          </el-button>
        </div>
        <div class="card-block">
          <el-button
            type="info"
            plain
            style="width: 100%;"
            @click="Collect()"
          >
          收藏声音
        </el-button>
        </div>
    </Card>
    </div>
  </LayOut>
</template>
<script setup lang="ts">
import LayOut from '@/components/layouts/LayOut.vue';
import Card from '@/components/card/CarD.vue';
import DropDownSelector from '@/components/dropDownSelecter/dropDownSelector.vue';
import { lanConfig } from '@/assets/constants';
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'

const isPlaying = ref(false);

function play() {
  isPlaying.value = !isPlaying.value;
}

function Collect() {
  ElMessageBox.prompt('Please input your e-mail', 'Tip', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputPattern:
      /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    inputErrorMessage: 'Invalid Email',
  })
    .then(({ value }) => {
      ElMessage({
        type: 'success',
        message: `Your email is:${value}`,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Input canceled',
      })
    })
}
</script>
<style lang="scss" scoped>
.card-container {
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .card {
    width: 95%;
    .card-block {
      width: 100%;
      .block-title {
        height: 30px;
        font-size: 16px;
        line-height: 35px;
        color: #4B5563;
      }
    }
  }

  .top-block {
    position: relative;
    top: 4%;
  }
  .bottome-block {
    position: relative;
    top: 6%;
  }
}

.upload-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 300px;
  border: 1px dashed #ccc;
  border-radius: 5px;
  cursor: pointer;


  .el-button.el-button--primary {
    border: none;
    height: 45px;
    width: 120px;
    z-index: 1;
  }

}

</style>
