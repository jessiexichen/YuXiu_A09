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
          v-model="filterStatus"
          placeholder="状态筛选"
          style="width: 120px"
          @change="handleFilter"
        >
          <el-option label="全部" value=""></el-option>
          <el-option label="已完成" value="completed"></el-option>
          <el-option label="生成中" value="processing"></el-option>
        </el-select>
      </div>

      <div class="task-list">
        <el-card
          v-for="task in filteredTasks"
          :key="task.id"
          class="task-card"
          shadow="hover"
        >
          <div class="task-header">
            <span class="task-title">{{ task.title }}</span>
            <span class="task-date">{{ task.date }}</span>
            <el-tag :type="task.status === 'completed' ? 'success' : 'info'">
              {{ task.status === 'completed' ? '已完成' : '生成中' }}
            </el-tag>
          </div>
          <div class="task-content">
            <div class="task-description">{{ task.description }}</div>
            <div class="task-meta">
              <span class="task-language">{{ task.language }}</span>
              <span class="task-style">{{ task.style }}</span>
              <span class="task-gender">{{ task.gender }}</span>
            </div>
          </div>
          <div class="task-actions">
            <el-button circle plain size="small"><img src="@/assets/icons/play.png" style="height: .8rem;width: .7rem;position: relative;left: 2px;" /></el-button>
            <el-button icon="Download" circle plain size="small"></el-button>
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
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";
import LayOut from "@/components/layouts/LayOut.vue";

// 任务数据
const tasks = ref([
  {
    id: 1,
    title: "语音合成",
    date: "2025-02-25 10:08",
    status: "completed",
    description: "《纸船一一寄母亲》冰心 我从不肯妄弃了一张纸，总是留着--留着，叠成一只只很小的船儿，从舟上抛下在海里。有的被天风吹卷到舟中的窗里，有的被海浪打湿，沾在船头上。我仍是不灰心地每天的叠着，总希望有一只能流到我",
    language: "普通话",
    style: "温柔",
    gender: "女",
  },
  {
    id: 2,
    title: "语音合成",
    date: "2025-02-25 10:10",
    status: "completed",
    description: "定理 7（极限审敛法 2）设函数f(x)在区间 (a, b]上连续且f(x)≥0，x = a 为 f(x)的瑕点。如果存在常数 0 < q < 1，使得lim_{x→a^+} (x-a)^q f(x)存在，那么反常积分 ∫_{a}^{b} f(x) dx 收敛；如果lim_{x→a^+} (x-a) f(x) = d > 0 或 lim_{x→a^+} f(x) = +∞",
    language: "普通话",
    style: "标准",
    gender: "男",
  },
  {
    id: 3,
    title: "基础视频",
    date: "2025-02-25 10:12",
    status: "processing",
    description: "DNA是主要的遗传物质 课程导入 龙生龙，凤生凤，老鼠的儿子会打洞。人们通常将生物亲代与子代之间相似的现象，叫做遗传。商品条形码上包含着商品名称、价格、生产日期等信息。俗话说“种瓜得瓜，种豆得豆”是因为亲代将自己的生命信息传递给了子代。在生物体内有没有隐含着",
    language: "普通话",
    style: "标准",
    gender: "男",
  },
  {
    id: 4,
    title: "类别名称",
    date: "2025-02-25 10:15",
    status: "completed",
    description: "语音文本能显示多少就显示多少h",
    language: "普通话",
    style: "标准",
    gender: "女",
  },
]);

// 搜索框绑定
const searchQuery = ref("");
const filterStatus = ref("");

// 每页显示的任务数量
const pageSize = ref(4);

// 当前页码
const currentPage = ref(1);

// 过滤后的任务列表
const filteredTasks = computed(() => {
  const query = searchQuery.value.toLowerCase();
  const statusFilter = filterStatus.value;

  return tasks.value.filter(task => {
    // 搜索框过滤
    const matchesSearch = task.title.toLowerCase().includes(query) ||
                         task.description.toLowerCase().includes(query);

    // 状态过滤
    const matchesStatus = statusFilter ? task.status === statusFilter : true;

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
const handlePageChange = (page) => {
  currentPage.value = page;
};

// 播放按钮点击事件
const playAudio = (task) => {
  ElMessage.info(`播放 ${task.title}`);
  // 这里可以添加播放音频的逻辑
};

// 下载按钮点击事件
const downloadAudio = (task) => {
  ElMessage.info(`下载 ${task.title}`);
  // 这里可以添加下载音频的逻辑
};

// 分享按钮点击事件
const shareAudio = (task) => {
  ElMessage.info(`分享 ${task.title}`);
  // 这里可以添加分享音频的逻辑
};
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
