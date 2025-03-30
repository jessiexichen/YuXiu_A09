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
           <el-button type="primary" style="width: 140px;" @click="isShowMore=!isShowMore">
            <img src="@/assets/icons/：.png" style="width: 0.8em;height: 1.3em;" >
            更多声音调节选项
          </el-button>
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
        <div class="card-block">
          <el-button
            type="info"
            plain
            style="width: 100%;"
            @click="Collect()"
          >
          收藏声音
        </el-button>
        <el-dialog
          v-model="dialogVisible"
          width="50%"
          align-center
          :before-close="handleClose"
        >
          <el-form
            ref="formRef"
            :model="form"
            :rules="rules"
            label-width="80px"
            status-icon
          >
            <el-form-item label="命名" prop="name">
              <el-input
                v-model="form.name"
                placeholder="请输入"
                clearable
              ></el-input>
            </el-form-item>

            <el-form-item label="分组" prop="group">
              <el-input
                v-model="form.group"
                placeholder="默认收藏夹"
                clearable
              ></el-input>
            </el-form-item>
          </el-form>

          <template #footer>
            <span class="dialog-footer">
              <el-button @click="handleClose">取消</el-button>
              <el-button type="primary" @click="submitForm">确定</el-button>
            </span>
          </template>
        </el-dialog>
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
import { ref ,reactive } from 'vue';
import { ElMessage, ElMessageBox, ElDialog } from 'element-plus'

const isPlaying = ref(false);

function play() {
  isPlaying.value = !isPlaying.value;
}

const isShowMore = ref(false);
const Speed = ref("");
const Voice = ref("");

function SpeedSelect(command: string) {
  Speed.value = command;
}
function VoiceSelect(command: string) {
  Voice.value = command;
}
function Collect() {
  dialogVisible.value = true;
}
const dialogVisible = ref(false);
const formRef = ref();

const  form = reactive({
  name: "",
  group: "",
});

const  rules = reactive({
  name: [
    { required: true, message: "请输入命名", trigger: "blur" },
    { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" },
  ],
  group: [
    { required: true, message: "请输入分组", trigger: "blur" },
    { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" },
  ],
});


const  handleClose = () => {
  dialogVisible.value = false;
  formRef.value.resetFields();
};

const  submitForm = () => {
formRef.value.validate((valid: boolean) => {
  if (valid) {
    ElMessageBox.confirm("确定要添加收藏吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "info",
    })
    .then(() => {
      // 提交表单逻辑
      ElMessage.success("收藏成功！");
      handleClose();
    })
    .catch(() => {
      ElMessage.info("已取消收藏");
    });
    } else {
        ElMessage.error("表单验证失败，请检查输入内容！");
        return false;
      }
  });
};

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
