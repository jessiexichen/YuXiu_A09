<template>
  <div class="words-container">
    <!-- 搜索框和操作按钮 -->
    <div class="search-bar">
      <el-input
        v-model="searchQuery"
        placeholder="搜索我的词库"
        prefix-icon="Search"
        clearable
        @input="handleSearch"
        style="width: 90%"
      />
      <div class="filter-actions">
        <el-button type="primary" style="width: 100%;" @click="buildNewWords()">新建词库</el-button>
      </div>
    </div>

    <!-- 声音列表 -->
    <div class="words-list">
      <el-card
        v-for="words in filteredwordss"
        :key="words.id"
        class="words-item"
        shadow="hover"
      >
      <div class="words-content">
        <div class="words-info">
          <div class="words-icon">
            <el-icon><svg style="scale: 1.2;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="18" height="20" viewBox="0 0 18 20"><g><path d="M0,11L18,11L18,19.0025C18,19.5534,17.5551,20,17.0066,20L0.9934,20C0.44476,20,0,19.5537,0,19.0025L0,11ZM0,0.99754C0,0.44662,0.44495,0,0.9934,0L17.0066,0C17.5552,0,18,0.44631,18,0.99754L18,9L0,9L0,0.99754ZM6,3L6,5L12,5L12,3L6,3ZM6,14L6,16L12,16L12,14L6,14Z" fill="#A6A6A6" fill-opacity="1" style="mix-blend-mode:passthrough"/></g></svg></el-icon>
          </div>
          <div class="words-details">
            <div class="words-name">{{ words.name }}</div>
        </div>
      </div>
      <div class="words-actions">
        <el-tag type="success" size="small">成功</el-tag>
        <el-button type="text" @click="editwordsDialog(words.id)">
          <el-icon><Edit /></el-icon>
        </el-button>
        <el-button type="text" style="cursor: pointer;">
          <el-icon><Delete /></el-icon>
        </el-button>
      </div>
  </div>
  <!-- 修改我的声音的dialog -->
  <el-dialog
    v-model="wordsDialogVisible"
    width="500px"
    align-center
    :before-close="handleClosewords"
    :title="wordsFormRef.name+'词库'"
  >
    <div style="display: flex; justify-content: center; align-items: center;flex-direction: column;gap: 10px;">
      <div style="display: flex; justify-content: start; align-items: center;width: 100%;" v-if="nameEditer">
        词库名：
        <el-input
          v-model="wordsFormRef.name"
          placeholder="请输入词库名"
          clearable
          style="width: 80%;"
        >
        </el-input>
      </div>
      <el-input
        type="textarea"
        input-style="height: 400px;width: 100%;"
        v-model="wordsFormRef.data"
        placeholder="请输入想要收纳的词"
        clearable
      >
      </el-input>
    </div>

  <template #footer>
    <span class="dialog-footer">
      <el-button @click="handleClosewords(0, false)">取消</el-button>
      <el-button type="primary" @click="handleClosewords(words.id, true)">确定</el-button>
    </span>
  </template>
</el-dialog>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useWordsStore } from "@/stores/collection";
import type { Words } from "@/types/words";
import { Edit, Delete } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { computed, ref } from "vue";

    // 搜索框绑定
    const searchQuery = ref("")

    // 搜索框逻辑
    const handleSearch = () => {
      // 搜索框输入时触发
    };

    // 过滤后的声音列表
    const filteredwordss = computed(() => {
      const query = searchQuery.value.toLowerCase();

      return useWordsStore().wordsStore.filter((words) => {
        // 搜索框过滤
        const matchesSearch = words.name.toLowerCase().includes(query);

        return matchesSearch;
      });
    });


const wordsDialogVisible = ref(false);
const wordsFormRef = ref({
  name: "",
  data: "",
});
function handleClosewords(id:number, isEnsured: boolean) {
  if (isEnsured) {
    useWordsStore().CollectWords(wordsFormRef.value.data.split(", "), wordsFormRef.value.name)
    ElMessage({
      type: 'success',
      message: '修改成功',
    })
  }
  else {
    ElMessage({
      type: 'info',
      message: '取消修改',
    })
  }
  wordsDialogVisible.value = false;
  wordsFormRef.value.name = "";
  wordsFormRef.value.data = "";
  nameEditer.value = false;
}
function editwordsDialog(id: number) {
  wordsDialogVisible.value = true;
  useWordsStore().findWords(id).then((words: Words) => {
    wordsFormRef.value.name = words.name;
    wordsFormRef.value.data = words.data.join(", ");
  });
}
const nameEditer = ref(false);
function buildNewWords() {
  wordsDialogVisible.value = true;
  nameEditer.value = true;
}
</script>

<style lang="scss">

.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.filter-actions {
  display: flex;
  align-items: center;
  width: 9%;
}

.words-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.words-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;

}

.words-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

}

.words-info {
  display: flex;
  align-items: center;
}

.words-icon {
  width: 40px;
  height: 40px;
  background-color: #f5f5f5;
  border-radius: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}

.words-details {
  flex: 1;
}

.words-name {
  font-weight: 500;
  margin-bottom: 5px;
}

.words-meta {
  font-size: 12px;
  color: #666;
}

.words-date {
  margin-right: 15px;
}

.words-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

:deep(.el-tag) {
  height: 24px;
  line-height: 24px;
}
</style>
