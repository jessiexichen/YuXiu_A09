<template>
  <LayOut>
    <div class="task-management-container">
      <div class="search-filter-bar">
        <el-input
          v-model="searchQuery"
          placeholder="搜索"
          prefix-icon="Search"
          clearable
          style="width: 300px; margin-right: 10px"
          @input="handleSearch"
        ></el-input>
        <el-select
          v-model="filterType"
          placeholder="类型筛选"
          style="width: 120px"
          @change="handleFilter"
        >
          <el-option label="全部" value=""></el-option>
          <el-option label="语音合成" value="语音合成"></el-option>
          <el-option label="基础视频" value="基础视频"></el-option>
          <el-option label="讲解视频" value="讲解视频"></el-option>
        </el-select>
      </div>

      <div class="task-list">
        <el-card
          v-for="task in filteredTasks"
          :key="task.content"
          class="task-card"
          shadow="hover"
        >
          <div class="task-header">
            <div style="width: 100%;">
              <span class="task-title">{{ task.type }}</span>
              <span class="task-date">{{ task.date }}</span>
              <el-tag :type="task.status === '已完成' ? 'success' : 'warning'">
                {{ task.status === '已完成' ? '已完成' : '生成中' }}
              </el-tag>
            </div>
            <div class="task-meta">
              <span v-for="tag in task.tags" :key="tag" style="color: #6B7280;">{{ tag }}</span>
            </div>
            <div class="task-meta" style="color: #6B7280;" v-if="task.sourceUrl!==''">
              <span>{{ task.sourceUrl }}</span>
            </div>
          </div>


          <div class="task-content">
            <div class="task-description">{{ task.content }}</div>
          </div>
          <VideoDialog
            v-model:video-src="videoUrl"
            v-model:dialog-visible="videoDialogVisible"
          />
          <div class="task-actions">
            <el-button circle plain size="small" @click="startPlay(task.sourceUrl)"><img src="@/assets/icons/play.png" style="height: .8rem;width: .7rem;position: relative;left: 2px;" /></el-button>
            <el-button icon="Download" circle plain size="small" @click="downloadAudio(task.sourceUrl)"></el-button>
            <el-button icon="Share" circle plain size="small"></el-button>
          </div>
        </el-card>
      </div>

      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="filteredTasks.length"
          :page-size="pageSize"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
  </LayOut>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { ElMessage } from "element-plus";
import LayOut from "@/components/layouts/LayOut.vue";
import VideoDialog from "@/components/videoDialog/videoDialog.vue";
import { tranhistory } from "@/assets/constants";
import { vi } from "element-plus/es/locales.mjs";

const videoDialogVisible = ref(false);
const videoUrl = ref("[Nekomoe kissaten][Make Heroine ga Oosugiru!][12][1080p][JPSC].mp4");

// 搜索框绑定
const searchQuery = ref("");
const filterType = ref("");

// 每页显示的任务数量
const pageSize = ref(4);

// 当前页码
const currentPage = ref(1);

// 过滤后的任务列表
const filteredTasks = computed(() => {
  const query = searchQuery.value.toLowerCase();
  const typeFilter = filterType.value;

  return tranhistory.filter(task => {
    // 搜索框过滤
    const matchesSearch = task.content.toLowerCase().includes(query) ||
                         task.tags.forEach(tag => tag.includes(query)) ||
                         task.sourceUrl.includes(query);

    // 状态过滤
    const matchesStatus = typeFilter ? task.type === typeFilter : true;

    return matchesSearch && matchesStatus;
  });
});

// 搜索功能
const handleSearch = () => {
  // 搜索框输入时触发
};

// 筛选功能
const handleFilter = () => {
  // 筛选状态变化时触发
};

// 分页功能
const handlePageChange = (page:number) => {
  currentPage.value = page;
};

// 下载按钮点击事件
const downloadAudio = (url: string) => {
  ElMessage.info(`下载 ${url}`);
  const a = document.createElement('a');
  a.href = url;
  a.download = url; // 设置下载的文件名
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

// // 分享按钮点击事件
// const shareAudio = (task) => {
//   ElMessage.info(`分享 ${task.title}`);
//   // 这里可以添加分享音频的逻辑
// };
const startPlay = (url: string) => {
  videoUrl.value = url;
  console.log(videoUrl.value)
  videoDialogVisible.value = true;
}
</script>

<style scoped>
.task-management-container {
  padding: 20px;
}

.search-filter-bar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.task-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.task-card {
  display: flex;
  flex-direction: column;
}

.task-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.task-title {
  font-weight: 500;
}

.task-date {
  margin: 0 10px;
  color: #666;
}

.task-content {
  margin-bottom: 15px;
}

.task-description {
  margin-bottom: 10px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.task-meta {
  display: flex;
  width: 100%;
  position: relative;
  gap: 10px;
  font-size: 12px;
  color: #666;
}

.task-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.pagination {
  display: flex;
  justify-content: center;
}
</style>
