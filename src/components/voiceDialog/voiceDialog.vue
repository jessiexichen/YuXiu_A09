<template>
  <el-dialog
    v-model="dialogVisible"
    title="选择语音声音"
    width="50%"
    scrollable
    :before-close="handleClose"
    custom-class="voice-dialog"
    >
    <div class="dialog-content">
      <div class="tabs">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="基础声音" name="basic">
            <div class="basic-language">
              <div class="block-title">语言</div>
              <DropDownSelector
                :visible-selection="lanConfig.visibleLanguages"
                :has-more="true"
                :all-selection="lanConfig.allLanguages"
                v-model="selectedLanguage"
              />
            </div>
            <div class="basic-language" style="padding-right: 0;" v-if="selectedLanguage === '中文'">
              <div class="block-title">方言</div>
              <DropDownSelector
                :visible-selection="lanConfig.localLanguage"
                :has-more="false"
              />
            </div>
            <div class="basic-language">
              <div class="block-title">风格</div>
              <DropDownSelector
                :visible-selection="lanConfig.langType"
                :has-more="false"
              />
            </div>
            <div class="basic-language">
              <div class="block-title">方言</div>
              <DropDownSelector
                :visible-selection="['男','女']"
                :has-more="false"
              />
            </div>
              <div class="dialog-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button
                  type="primary"
                  @click="useVoice()"
                >
                  使用声音
                </el-button>
              </div>
          </el-tab-pane>
          <el-tab-pane label="热门人物声音" name="popular">
            <div class="search-filter" style="margin-bottom: 10px;">
              <el-input
                v-model="searchQuery"
                placeholder="搜索"
                prefix-icon="Search"
                clearable
                style="width: 70%; margin-right: 10px"
              ></el-input>
              <span>语言</span>
              <el-select
                v-model="selectedLanguage1"
                placeholder="选择语言"
                style="width: 20%; margin-left: 10px"
                clearable
              >
                <el-option label="普通话" value="普通话"></el-option>
                <el-option label="英语" value="英语"></el-option>
                <el-option label="日语" value="日语"></el-option>
              </el-select>
            </div>
            <el-scrollbar height="600px">
              <div class="voice-list">
              <el-card
                v-for="voice in filteredPopularVoices"
                :key="voice.id"
                class="voice-item"
                shadow="hover"
              >
                <div class="voice-content">
                  <el-avatar>
                    <img :src=voice.avatar />
                  </el-avatar>
                  <div class="voice-info">
                    <div class="voice-name">
                      {{ voice.name }}
                      <el-tag :type="handleType(voice.language)" size="small" style="position: relative;left: 2%;">{{ voice.language }}</el-tag>
                    </div>
                    <div class="voice-description">
                      <img src="@/assets/icons/play.png" style="width: 1em;height: 1.2em;" >
                      <span style="position: relative;bottom: 3px;left: 10px;">{{ voice.description }}</span>
                    </div>
                  </div>
                </div>
                <div class="voice-use">
                  <el-button
                    type="primary"
                    size="default"
                    @click="useVoice(voice)"
                  >
                    使用声音
                  </el-button>
                </div>
              </el-card>
            </div>
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane label="我的声音" name="my-voices">
            <div class="search-filter" style="margin-bottom: 10px;">
              <el-input
                v-model="searchQuery"
                placeholder="搜索"
                prefix-icon="Search"
                clearable
                style="width: 50%; margin-right: 10px"
              ></el-input>
              <span>分组</span>
              <el-select
                v-model="filterGroup"
                placeholder="选择语言"
                style="width: 20%; margin-left: 10px"
                clearable
              >
                <el-option label="全部" value=""></el-option>
                <el-option v-for="group in useCollection().groups" :key="group" :label="group" :value="group"></el-option>
              </el-select>
              <el-button type="primary" @click="dialogVisible=false;router.push('/new-voice')" style="width: 15%;margin-left: 10px;">构建新声音</el-button>
            </div>
            <el-scrollbar height="600px">
              <div class="voice-list">
              <el-card
                v-for="voice in filteredPopularVoices_my"
                :key="voice.id"
                class="voice-item"
                shadow="hover"
              >
                <div class="voice-content">
                  <el-avatar :size="50" :src="useAvatar().avatarUrl" />
                  <div class="voice-info">
                    <div class="voice-name">
                      {{ voice.name }}
                    </div>
                    <div class="voice-description">
                      <img src="@/assets/icons/play.png" style="width: 1em;height: 1.2em;" >
                      <span style="position: relative;bottom: 3px;left: 10px;">{{ voice.description }}</span>
                    </div>
                  </div>
                </div>
                <div class="voice-use">
                  <el-button
                    type="primary"
                    size="default"
                    @click="useVoice(voice)"
                  >
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
import type { Voice } from "@/types/voice";
import { popularVoices,lanConfig } from "@/assets/constants";
import DropDownSelector from '@/components/dropDownSelecter/dropDownSelector.vue';
import { useAvatar, useCollection } from "@/stores";
import router from "@/router";

// 定义 props
const props = defineProps({
  myVoices: {
    type: Array as () => Voice[],
    default: () => [],
  },
  showCreateButton: {
    type: Boolean,
    default: true,
  },
});


// 定义 emits
const emit = defineEmits(["update:modelValue", "use-voice", "create-voice"]);

// 对话框是否可见
const dialogVisible = defineModel<boolean>()

// 当前选中的标签
const activeTab = ref("popular");

// 关闭对话框
const handleClose = () => {
  dialogVisible.value = false;
  emit("update:modelValue", false);
};

// 使用声音
const useVoice = (voice) => {
  emit("use-voice", voice);
};

const selectedLanguage = ref("")
const selectedLanguage1 = ref("")
const searchQuery = ref("")

const handleType = (language: string) => {
  if (language === "普通话") {
    return "success";
  } else if (language === "日语") {
    return "warning";
  } else if (language === "英语") {
    return "primary";
  }
}

const filteredPopularVoices = computed(() => {
  return popularVoices.filter((voice) => {
    if (voice.language !== selectedLanguage1.value && selectedLanguage1.value !== "") {
      return false;
    }
    else if(!voice.name.includes(searchQuery.value)){
      return false;
    }
    return true
  });
});

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

.voice-item {
  display: flex;
  align-items: center;
  padding: 15px;
}


.voice-content {
  display: flex;
  gap: 10px;
  width: 100%;
  .voice-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 15px;
  }
  .voice-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

.voice-use {
  display: flex;
  button {
    position: relative;
    left: 7%;
  }
}




.voice-name {
  font-weight: 500;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

</style>
