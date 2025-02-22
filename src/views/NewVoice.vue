<template>
  <LayOut>
    <div class="card-container">
      <Card
        title="选择输入样本语言"
      >
        <div class="card-block">
          <div class="block-title">语言</div>
          <DropDownSelector
            :visible-selection="lanConfig.visibleLanguages"
            :has-more="true"
            :all-selection="lanConfig.allLanguages"
            style="width: 540px;"
          />
        </div>
        <div class="card-block" style="padding-right: 0;">
          <div class="block-title">方言</div>
          <DropDownSelector
            :visible-selection="lanConfig.localLanguage"
            :has-more="false"
            style="width: 540px;"
          />
        </div>
      </Card>
      <Card
        title="上传音频文件样本"
        description="5s-30s"
      >
        <div class="card-block" style="display: block;">
          <el-upload
            class="el-upload"
            drag
            action=""
            multiple
            style="display: block;"
          >
              <div class="el-upload__text">
                可拖拽至此上传或<em>点击上传</em>
              </div>
              <div class="el-upload__text">
                支持格式: mp3、ogg、aac、opus、wav
              </div>
              <!-- <template #tip>
                <div class="el-upload__tip">
                  jpg/png files with a size less than 500kb
                </div>
              </template> -->
          </el-upload>
        </div>
    </Card>
    </div>
  </LayOut>
</template>
<script setup lang="ts">
import LayOut from '@/components/layouts/LayOut.vue';
import Card from '@/components/card/CarD.vue';
import DropDownSelector from '@/components/dropDownSelecter/dropDownSelector.vue';
import lanConfig from '@/assets/constants';
import { ElUpload } from 'element-plus';
</script>
<style lang="scss" scoped>
.card-container {
  width: 100%;
  display: flex;
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
}

</style>
