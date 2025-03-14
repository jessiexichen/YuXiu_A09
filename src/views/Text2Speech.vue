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
        title="随机生成文本内容"
      >
        <div style="width: 80%;display:flex;gap: 2%;overflow: hidden;">
          <NormButton
          v-for="(item, index) in lanConfig.contentType"
          :key="index"
          :font="item"
        />
        </div>
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
        <div class ="card-block" style="font-weight: bold;border-bottom: 1px solid var(--el-border-color);padding: 2px;">基础声音</div>
        <div class="card-block">
          <div class="block-title">语言</div>
          <DropDownSelector
            :visible-selection="lanConfig.visibleLanguages"
            :has-more="true"
            :all-selection="lanConfig.allLanguages"
            style="width: 90%;"
          />
        </div>
        <div class="card-block" style="padding-right: 0;">
          <div class="block-title">方言</div>
          <DropDownSelector
            :visible-selection="lanConfig.localLanguage"
            :has-more="false"
          />
        </div>
        <div class="card-block">
          <div class="block-title">风格</div>
          <DropDownSelector
            :visible-selection="lanConfig.langType"
            :has-more="false"
          />
        </div>
        <div class="card-block">
          <div class="block-title">方言</div>
          <div>
            <NormButton font="男"/>
            <NormButton font="女"/>
          </div>
        </div>
        <div class="card-block" style="font-weight: bold;">
          热门人物声音
        </div>
        <div class="card-block" style="font-weight: bold;">

        </div>
        <div class="card-block" style="font-weight: bold;">
          我的声音
        </div>
        <div class="card-block" style="font-weight: bold;">

        </div>
      </Card>
      <Card
        title="设置"
      >
        <div class="card-block" style="justify-content: center;align-items:center;gap: 40px;">
          自动播放
          <text style="color: #9E9E9E;">转换成功后直接播放</text>
          <el-switch />
        </div>
        <div class="card-block" style="justify-content: center;align-items:center;gap: 46px;">
          试听模式
          <text style="color: #9E9E9E;">只转换前50个字符</text>
          <el-switch />
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
           <div style="display: flex;align-items: center;">
            <img src="@/assets/icons/voice.png" style="width: 1.5em;height: 1.1em;" >
          </div>
           <el-button type="primary" style="width: 140px;">
            <img src="@/assets/icons/：.png" style="width: 0.8em;height: 1.3em;" >
            更多声音调节选项
          </el-button>
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
import NormButton from '@/components/button/normButton.vue';
import { ElInput, ElSwitch, ElButton, ElRadioGroup, ElSlider } from 'element-plus';
import { ref } from 'vue';
import { lanConfig } from '@/assets/constants';
const text = ref("")


</script>

<script lang="ts">

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
