<template>
  <LayOut>
    <div class="card-container">
      <Card title="输入样本语言" class="top-block">
        <div class="card-block">
          <div class="block-title">语言</div>
          <DropDownSelector
            :visible-selection="lanConfig.visibleLanguages1"
            :has-more="true"
            :all-selection="lanConfig.allLanguages"
            style="width: 91%; border: none"
          />
        </div>
        <div class="card-block" style="padding-right: 0">
          <div class="block-title">方言</div>
          <DropDownSelector
            :visible-selection="lanConfig.localLanguage"
            :has-more="false"
            style="width: 94%; border: none"
          />
        </div>
      </Card>
      <Card title="音频文件样本" description="5s-30s" class="bottome-block">
        <div class="card-block" style="display: block">
          <div class="upload-demo">
            <div style="margin-top: 2em; gap: 10px; display: flex">
              <record-button v-model:audio-url="audioUrl"/>
              <el-upload
                class="upload-demo"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                multiple
                :limit="1"
                style="border: none;height: 40px;"
              >
                <el-button type="primary" class="uploading" plain @click="uploadAudio()">
                  <img src="@/assets/icons/upload.png" style="margin: 7px"/>点击上传
                </el-button>
              </el-upload>
            </div>
            <div class="upload-text" style="position: relative; top: 13%; color: #6b7280">
              可拖拽至此上传或点击上传
            </div>
            <div class="upload-text" style="position: relative; top: 13%; color: #6b7280">
              支持格式: mp3、ogg、aac、opus、wav
            </div>
          </div>
        </div>
        <div class="card-block" style="display: flex;align-items: center">
          <audio :src="audioUrl" controls style="width: 450px"></audio>
          <el-button type="info" size="large" style="width: 140px;opacity: .5;" @click="isShowMore=!isShowMore">
            <img src="@/assets/icons/dots.png" style="width: 0.8em;height: 1.3em;">
            更多声音调节选项
          </el-button>
          <div class="more-voice" v-if="isShowMore">
            <el-dropdown @command="SpeedSelect">
              <el-button>
                倍速
                <span v-if="Speed!==''">:{{ Speed }}</span>
                <el-icon class="el-icon--right" v-else>
                  <arrow-up/>
                </el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="0.4"><span
                    style="width: 100%;;text-align: center;">0.4</span></el-dropdown-item>
                  <el-dropdown-item command="0.6"><span
                    style="width: 100%;;text-align: center;">0.6</span></el-dropdown-item>
                  <el-dropdown-item command="0.8"><span
                    style="width: 100%;;text-align: center;">0.8</span></el-dropdown-item>
                  <el-dropdown-item command=""><span
                    style="width: 100%;;text-align: center;">1.0</span></el-dropdown-item>
                  <el-dropdown-item command="1.2"><span
                    style="width: 100%;;text-align: center;">1.2</span></el-dropdown-item>
                  <el-dropdown-item command="1.4"><span
                    style="width: 100%;;text-align: center;">1.4</span></el-dropdown-item>
                  <el-dropdown-item command="1.6"><span
                    style="width: 100%;;text-align: center;">1.6</span></el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-dropdown @command="VoiceSelect">
              <el-button>
                音调<span v-if="Voice!==''">:{{ Voice }}</span>
                <el-icon class="el-icon--right" v-else>
                  <arrow-up/>
                </el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="+50%"><span style="width: 100%;;text-align: center;">升高50%</span>
                  </el-dropdown-item>
                  <el-dropdown-item command="+25%"><span style="width: 100%;;text-align: center;">升高25%</span>
                  </el-dropdown-item>
                  <el-dropdown-item command="+10%"><span style="width: 100%;;text-align: center;">升高10%</span>
                  </el-dropdown-item>
                  <el-dropdown-item command=""><span
                    style="width: 100%;;text-align: center;">原声调</span></el-dropdown-item>
                  <el-dropdown-item command="-10%"><span style="width: 100%;;text-align: center;">降低10%</span>
                  </el-dropdown-item>
                  <el-dropdown-item command="-25%"><span style="width: 100%;;text-align: center;">降低25%</span>
                  </el-dropdown-item>
                  <el-dropdown-item command="-50%"><span style="width: 100%;;text-align: center;">降低50%</span>
                  </el-dropdown-item>
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
        <div class="card-block">
          <el-button
            type="info"
            plain
            style="width: 100%;"
            @click="collectionDialogVisible = true"
          >
            收藏声音
          </el-button>
          <CollectionDialog
            v-model="collectionDialogVisible"
          />
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
import RecordButton from "@/components/recordButton/recordButton.vue";
import CollectionDialog from '@/components/collectionDialog/collectionDialog.vue';
import { ElMessage } from 'element-plus';

const audioUrl = ref()
const isShowMore = ref(false);
const Speed = ref("");
const Voice = ref("");
const Volume = ref("");
function uploadAudio() {
      // 生成进度
      const progress = ref(0);
    // 定时器
    let timer: number = 0;

    // 开始生成
      progress.value = 0;

      // 模拟生成进度
      timer = setInterval(() => {
        progress.value += 1;
        if (progress.value >= 30) {
          clearInterval(timer);
          setTimeout(() => {
            audioUrl.value = "上传的原音频.mp3";
              ElMessage.success('上传成功');
          }, 100);
        }
      }, 100);

}

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

</script>
<style lang="scss" scoped>
.card-container {
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  .card {
    height: auto;
    width: 95%;
    .card-block {
      width: 100%;
      .block-title {
        height: 30px;
        font-size: 16px;
        line-height: 35px;
        color: #4B5563;
      }

      .more-voice {
        display: flex;
        align-items: center;
        gap: 25px;
        width: 40%;
        height: 30px;
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
