<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="60%"
    :before-close="handleClose"
    custom-class="voice-dialog"
  >
    <div class="dialog-content">
      <div class="tabs">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="基础声音" name="basic">
            <div class="custom-content">
            </div>
          </el-tab-pane>
          <el-tab-pane label="热门人物声音" name="popular">
            <div class="voice-list">
              <el-card
                v-for="voice in popularVoices"
                :key="voice.id"
                class="voice-item"
                shadow="hover"
              >
                <div class="voice-content">
                  <div class="voice-avatar">
                    <img :src="voice.avatar" alt="人物头像" />
                  </div>
                  <div class="voice-info">
                    <div class="voice-name">
                      {{ voice.name }}
                      <el-tag type="success" size="small">{{ voice.language }}</el-tag>
                    </div>
                    <div class="voice-sample">
                      <el-icon><Play /></el-icon>
                      {{ voice.sample }}
                    </div>
                  </div>
                  <el-button
                    type="primary"
                    size="small"
                    @click="useVoice(voice)"
                  >
                    使用声音
                  </el-button>
                </div>
              </el-card>
            </div>
          </el-tab-pane>
          <el-tab-pane label="我的声音" name="my-voices">
            <div class="voice-list">
              <el-card
                v-for="voice in myVoices"
                :key="voice.id"
                class="voice-item"
                shadow="hover"
              >
                <div class="voice-content">
                  <div class="voice-thumbnail">
                    <img :src="voice.thumbnail" alt="声音缩略图" />
                  </div>
                  <div class="voice-info">
                    <div class="voice-name">{{ voice.name }}</div>
                    <div class="voice-sample">
                      <el-icon><Play /></el-icon>
                      {{ voice.sample }}
                    </div>
                  </div>
                  <el-button
                    type="primary"
                    size="small"
                    @click="useVoice(voice)"
                  >
                    使用声音
                  </el-button>
                </div>
              </el-card>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button
          v-if="showCreateButton"
          type="primary"
          @click="createNewVoice"
        >
          构建新声音
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

// 定义 props
const props = defineProps({
  title: {
    type: String,
    default: "选择语音声音",
  },
  popularVoices: {
    type: Array,
    default: () => [],
  },
  myVoices: {
    type: Array,
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

// 构建新声音
const createNewVoice = () => {
  emit("create-voice");
};

</script>

<style scoped>
.dialog-content {
  padding: 20px 0;
}

.tabs {
  margin-top: 10px;
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
  align-items: center;
  width: 100%;
}

.voice-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
}

.voice-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.voice-thumbnail {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 15px;
}

.voice-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.voice-info {
  flex: 1;
}

.voice-name {
  font-weight: 500;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}

.voice-sample {
  font-size: 12px;
  color: #666;
  display: flex;
  align-items: center;
}

:deep(.el-icon) {
  margin-right: 5px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.custom-content {
  padding: 10px;
}
</style>
