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
          :visible-selection="visibleLanguages"
          :has-more="true"
          :all-selection="allLanguages"
        />
      </Card>
      <Card
        title="随机生成文本内容"
      >
        <div style="width: 80%;display:flex;gap: 2%;overflow: hidden;">
          <NormButton
          v-for="(item, index) in contentType"
          :key="index"
          :font="item"
        />
        </div>
      </Card>
      <Card
        title="输入文本内容"
      >
        <div
          class="input-container"
        >
          <div style="height: 15%;">
            1
          </div>
          <div style="height: 80%;">
          </div>
        </div>
      </Card>
    </div>
    <div class="container">
      <div class="title">
        生成语音
      </div>
      <Card>
        <DropDownSelector
          :visible-selection="localLanguage"
          :has-more="false"
        />
      </Card>
    </div>
  </LayOut>
</template>
<script setup lang="ts">
import LayOut from '@/components/layouts/LayOut.vue';
import Card from '@/components/card/CarD.vue';
import DropDownSelector from '@/components/dropDownSelecter/dropDownSelector.vue';
import NormButton from '@/components/button/normButton.vue';

</script>

<script lang="ts">
const visibleLanguages = ["中文", "英语", "法语", "俄语", "西班牙语", "阿拉伯语"]
const allLanguages = ["中文", "英语", "法语", "俄语", "西班牙语", "阿拉伯语", "日语", "韩语"]

const contentType = ["诗歌", "新闻", "散文", "俗语"]

const localLanguage = ["普通话", "广东", "四川", "上海", "郑州", "长沙", "天津", "闽南"]
</script>

<style lang="scss" scoped>
.container {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  .title {
    margin-top: 20px;
    height: 5%;
    font-size: 24px;
    font-weight: 500;
    line-height: 28px;
  }

  .card {
    width: 92%;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    padding: 15px;
    width: 100%;
    height: 250px;
    border: 1px solid var(--el-border-color-light);
    border-radius: 10px;
  }
}

</style>
