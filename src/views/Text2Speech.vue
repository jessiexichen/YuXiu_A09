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
        <div>1</div>
      </Card>
    </div>
    <div class="container">
      <div class="title">
        生成语音
      </div>
    </div>
  </LayOut>
</template>
<script setup lang="ts">
import LayOut from '@/components/layouts/LayOut.vue';
import Card from '@/components/card/CarD.vue';
import DropDownSelector from '@/components/dropDownSelecter/dropDownSelector.vue';
</script>

<script lang="ts">
const visibleLanguages = ["普通话", "英语", "法语", "俄语", "西班牙语"]
const allLanguages = ["普通话", "英语", "法语", "俄语", "西班牙语", "阿拉伯语", "日语", "韩语"]
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
  }
}

</style>
