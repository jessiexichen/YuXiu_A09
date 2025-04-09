<template>
  <div class="voice-container">
    <!-- 搜索框和操作按钮 -->
    <div class="search-bar">
      <el-input
        v-model="searchQuery"
        placeholder="搜索我的声音"
        prefix-icon="Search"
        clearable
        @input="handleSearch"
        style="width: 80%"
      />
      <div class="filter-actions">
        <el-select v-model="filterGroup" placeholder="分组筛选" style="width: 120px; margin-right: 10px">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="group in useCollection().groups" :key="group" :label="group" :value="group"></el-option>
        </el-select>
        <el-button type="primary" @click="router.push('/new-voice')">构建新声音</el-button>
      </div>
    </div>

    <!-- 声音列表 -->
    <div class="voice-list">
      <el-card
        v-for="voice in filteredVoices"
        :key="voice.id"
        class="voice-item"
        shadow="hover"
      >
      <div class="voice-content">
        <div class="voice-info">
          <div class="voice-icon">
            <el-icon><img src="@/assets/icons/audio.png" style="scale: .5;"/></el-icon>
          </div>
          <div class="voice-details">
            <div class="voice-name">{{ voice.name }}</div>
            <div class="voice-meta">
      <span class="voice-date">
        <el-icon><Clock /></el-icon>
        {{ voice.date }}
      </span>
      <span class="voice-group">
        <el-icon><Folder /></el-icon>
        {{ voice.group }}
      </span>
      </div>
    </div>
  </div>
  <div class="voice-actions">
    <el-tag type="success" size="small">成功</el-tag>
    <el-button type="primary" size="small" >使用声音</el-button>
    <el-button type="text" @click="editVoiceDialog(voice.id)">
      <el-icon><Edit /></el-icon>
    </el-button>
    <el-button type="text" @click="delVoice(voice.id)">
      <el-icon><Delete /></el-icon>
    </el-button>
  </div>
</div>
<!-- 修改我的声音的dialog -->
<el-dialog
  v-model="voiceDialogVisible"
  width="50%"
  align-center
  :before-close="handleCloseVoice"
>
  <el-form
    ref="voiceFormRef"
    :model="voiceFormRef"
    label-width="80px"
    status-icon
  >
    <el-form-item label="命名" prop="name">
      <el-input
v-model="voiceFormRef.name"
placeholder="请输入"
clearable
      ></el-input>
    </el-form-item>

    <el-form-item label="分组" prop="group">
      <el-input
v-model="voiceFormRef.group"
placeholder="默认收藏夹"
clearable
      ></el-input>
    </el-form-item>
  </el-form>

  <template #footer>
    <span class="dialog-footer">
      <el-button @click="handleCloseVoice(0, false)">取消</el-button>
      <el-button type="primary" @click="handleCloseVoice(voice.id, true)">确定</el-button>
    </span>
  </template>
</el-dialog>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">

import router from "@/router";
import { useCollection } from "@/stores";
import type { Voice } from "@/types/voice";
import { Clock, Folder, Edit, Delete } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { computed, ref } from "vue";

    // 搜索框绑定
    const searchQuery = ref("")

    // 分组筛选
    const filterGroup = ref("");

    // 搜索框逻辑
    const handleSearch = () => {
      // 搜索框输入时触发
    };

    // 过滤后的声音列表
    const filteredVoices = computed(() => {
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
//voice修改部分
function delVoice(id: number) {
  ElMessageBox.confirm(
    '是否确认删除?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      useCollection().DeleteVoice(id);
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除取消',
      })
    })
}


const voiceDialogVisible = ref(false);
const voiceFormRef = ref({
  name: "",
  group: "",
});
function handleCloseVoice(id:number, isEnsured: boolean) {
  if (isEnsured) {
    if(useCollection().restoreVoice(id, voiceFormRef.value.name, voiceFormRef.value.group)){
      ElMessage({
        type: 'success',
        message: '修改成功',
      })
    };
  }
  else {
    ElMessage({
      type: 'info',
      message: '取消修改',
    })
  }
  voiceDialogVisible.value = false;
  voiceFormRef.value.name = "";
  voiceFormRef.value.group = "";
}
function editVoiceDialog(id: number) {
  voiceDialogVisible.value = true;
  useCollection().getVoice(id).then((voice: Voice) => {
    voiceFormRef.value.name = voice.name;
    voiceFormRef.value.group = voice.group;
  });
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
}

.voice-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.voice-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;

}

.voice-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

}

.voice-info {
  display: flex;
  align-items: center;
}

.voice-icon {
  width: 40px;
  height: 40px;
  background-color: #f5f5f5;
  border-radius: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}

.voice-details {
  flex: 1;
}

.voice-name {
  font-weight: 500;
  margin-bottom: 5px;
}

.voice-meta {
  font-size: 12px;
  color: #666;
}

.voice-date {
  margin-right: 15px;
}

.voice-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

:deep(.el-tag) {
  height: 24px;
  line-height: 24px;
}
</style>
