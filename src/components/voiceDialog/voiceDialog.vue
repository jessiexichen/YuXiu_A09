<template>
  <el-dialog v-model="dialogVisible" title="选择语音声音" width="50%" scrollable :before-close="handleClose"
    custom-class="voice-dialog">
    <div class="dialog-content">
      <div class="tabs">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="基础声音" name="basic">
            <div class="basic-language">
              <div class="block-title">语言</div>
              <DropDownSelector :visible-selection="lanConfig.visibleLanguages" :has-more="true"
                :all-selection="lanConfig.allLanguages" v-model="selectedLanguage.language" />
            </div>
            <div class="basic-language">
              <div class="block-title">风格</div>
              <DropDownSelector :visible-selection="lanConfig.langType" :has-more="false" v-model="selectedLanguage.langType" />
            </div>
            <div class="basic-language">
              <div class="block-title">性别</div>
              <DropDownSelector :visible-selection="['男', '女']" :has-more="false" v-model="selectedLanguage.sex" />
            </div>
            <div class="dialog-footer">
              <el-button @click="handleClose">取消</el-button>
              <el-button type="primary" @click="useNormVoice()">
                使用声音
              </el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="我的声音" name="my-voices">
            <div class="search-filter" style="margin-bottom: 10px;">
              <el-input v-model="searchQuery" placeholder="搜索" prefix-icon="Search" clearable
                style="width: 50%; margin-right: 10px"></el-input>
              <span>分组</span>
              <el-select v-model="filterGroup" placeholder="选择分组" style="width: 20%; margin-left: 10px" clearable>
                <el-option label="全部" value=""></el-option>
                <el-option v-for="group in useCollection().groups" :key="group" :label="group"
                  :value="group"></el-option>
              </el-select>
              <el-button type="primary" @click="dialogVisible = false; router.push('/new-voice')"
                style="width: 15%;margin-left: 10px;">构建新声音</el-button>
            </div>
            <el-scrollbar height="600px">
              <div class="voice-list">
                <el-card v-for="voice in filteredPopularVoices_my" :key="voice.id" class="voice-item" shadow="hover">
                  <div class="voice-content">
                    <el-avatar :size="50" :src="useAvatar().avatarUrl" />
                    <div class="voice-info">
                      <div class="voice-name">
                        {{ voice.name }}
                      </div>
                      <div class="voice-description">
                        <img src="@/assets/icons/play.png" style="width: 1em;height: 1.2em;">
                        <span style="position: relative;bottom: 3px;left: 10px;">{{ voice.description }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="voice-use">
                    <el-button type="primary" size="default" @click="useMyVoice(voice)">
                      使用声音
                    </el-button>
                  </div>
                </el-card>
              </div>
            </el-scrollbar>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { lanConfig } from "@/assets/constants";
import DropDownSelector from '@/components/dropDownSelecter/dropDownSelector.vue';
import { useAvatar, useCollection } from "@/stores";
import router from "@/router";
import type { Voice } from "@/types/voice";
import type { SelectedVoice } from "@/types/voice";
import { ElMessage } from "element-plus";

const selectedVoice = defineModel<SelectedVoice>("selectedVoice");

// 对话框是否可见
const dialogVisible = defineModel<boolean>("dialogVisible");

// 当前选中的标签
const activeTab = ref("basic");

// 关闭对话框
const handleClose = () => {
  dialogVisible.value = false;
  selectedLanguage.value.langType = undefined;
  selectedLanguage.value.language = undefined;
  selectedLanguage.value.sex = undefined;
};

// 使用声音
function useNormVoice() {
  if (!selectedVoice.value) return;
  if(selectedVoice.value.tags) selectedVoice.value.tags = [];

  if(selectedLanguage.value.language === undefined) {
    ElMessage.error("有未选择的tag");return;
  }

  if(selectedLanguage.value.langType === undefined) {ElMessage.error("有未选择的tag");return;}
  if(selectedLanguage.value.sex === undefined) {ElMessage.error("有未选择的tag");return;}
  selectedVoice.value.type = "normal";
  selectedVoice.value.tags.push(selectedLanguage.value.language);
  selectedVoice.value.tags.push(selectedLanguage.value.langType, selectedLanguage.value.sex);

  selectedVoice.value.type = "normal";
  handleClose();
}

function useMyVoice(voice: Voice) {
  if(selectedVoice.value?.type) selectedVoice.value.type = "";

  if (!selectedVoice.value) return;
  selectedVoice.value.name = voice.name;
  selectedVoice.value.language = "普通话";
  selectedVoice.value.avatar = useAvatar().avatarUrl;
  handleClose();
};

const selectedLanguage = ref({language: undefined, langType: undefined, sex: undefined});
const searchQuery = ref("")
const filterGroup = ref("");

const filteredPopularVoices_my = computed(() => {
  const query = searchQuery.value.toLowerCase();
  const groupFilter = filterGroup.value;

  return useCollection().voices.filter((voice) => {
    // 搜索框过滤
    const matchesSearch = voice.name.toLowerCase().includes(query);

    // 分组过滤
    const matchesGroup = groupFilter ? voice.group === groupFilter : true;

    return matchesSearch && matchesGroup;
  });
});

</script>
<style lang="scss">
.el-card__body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
<style lang="scss" scoped>
.tabs {
  margin-top: 10px;
}

//基础声音css
.basic-language {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 9fr;
  padding: 10px 0 5px 10px;
  margin-bottom: 5px;
}

.select-language {
  width: 90%;
  height: 100px;
  border: 2px dashed #E5E7EB;
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
}

.voice-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
