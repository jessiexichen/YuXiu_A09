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
        ></el-input>
        <el-select
          v-model="filterType"
          placeholder="类型筛选"
          style="width: 120px"
        >
          <el-option label="全部" value=""></el-option>
          <el-option label="语音合成" value="语音合成"></el-option>
          <el-option label="基础视频" value="基础视频"></el-option>
          <el-option label="讲解视频" value="讲解视频"></el-option>
        </el-select>
        <el-button type="primary" style="width: 100px; margin-left: 10px;" @click="showSelection = true" v-if="!showSelection">添加词库</el-button>
        <el-button type ="success" style="width: 100px; margin-left: 10px;" @click="showSelection = false;chartVisible = true" v-if="showSelection">统计词频</el-button>
      </div>
      <el-dialog
        v-model="chartVisible"
        title="词频图"
        width="50%"
        height="800px"
        align-center
      >
        <v-chart :option="option" style="width: 600px;height: 700px;" />
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="chartVisible = false">取消</el-button>
            <el-button type="primary" @click="chartVisible=false;selectionVisible=true;ElMessage.success('已为您自动选择高频词')">下一步</el-button>
          </span>
        </template>
      </el-dialog>
      <el-dialog
        v-model="selectionVisible"
        width="500px"
        align-center
        :title="wordsFormRef.name+'词库'"
      >
        <div style="display: flex; justify-content: center; align-items: center;flex-direction: column;gap: 10px;">
          <div style="display: flex; justify-content: start; align-items: center;width: 100%;">
            词库名：
            <el-input
              v-model="wordsFormRef.name"
              placeholder="请输入新词库名"
              clearable
              style="width: 50%;"
            >
            </el-input>
            <el-dropdown style="margin-left: 10px;">
              <el-button>
                加至已有词库
                <el-icon class="el-icon--right">
                  <arrow-up/>
                </el-icon>
              </el-button>
            </el-dropdown>
          </div>
          <el-input
            type="textarea"
            input-style="height: 400px;width: 100%;"
            v-model="wordsFormRef.data"
            placeholder="请输入想要收纳的词"
          >
          </el-input>
        </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="selectionVisible = false;chartVisible = true" v-if="!showSelection">上一步</el-button>
          <el-button type="success" @click="ElMessage.success('添加成功');selectionVisible = false">确定</el-button>
        </span>
      </template>
    </el-dialog>
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
              <el-checkbox
                v-if="showSelection"
                :v-model="selectionMap[task.content]"
                size="large"
                style="position: absolute;right: 2px;height: 20px;width: 20px;"
              />
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
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";
import LayOut from "@/components/layouts/LayOut.vue";
import VideoDialog from "@/components/videoDialog/videoDialog.vue";
import { chartData, tranhistory } from "@/assets/constants";

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

const selectionMap:{[key:string]:boolean} = {}
{
  tranhistory.forEach(task => {
    selectionMap[task.content] = false
  })
}

const showSelection = ref(false);
const wordsFormRef = ref({
  name: "",
  data: "染色体, DNA,  细胞核, 伞藻, 我们, 基因, 生物, 实验, 分子, 一个, 主要, 遗传信息, 基因, 遗传物质, 假根, 控制, 性状, 遗传, 通过, 生物体",
});


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


const startPlay = (url: string) => {
  videoUrl.value = url;
  videoDialogVisible.value = true;
}


const chartVisible = ref(false);
const selectionVisible = ref(false);
const option = {
  dataset: [
    {
      dimensions: ['name', "score"],
      source: chartData
    },
    {
      transform: {
        type: 'sort',
        config: { dimension: 'score', order: 'desc' }
      }
    }
  ],
  yAxis: {
    type: 'category',
    axisLabel: { interval: 0, rotate: 30 },
    inverse: true,
  },
  xAxis: {
    max: 'dataMax'
  },
  series: {
    type: 'bar',
    encode: { x: 'score', y: 'name' },
    datasetIndex: 1
  }
};
</script>

<style scoped>
.task-management-container {
  padding: 20px;
}

.search-filter-bar {
  position: relative;
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
  position: relative;
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

.chart-footer {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #fff;
  font-size: 14px;
  color: #666;
}
</style>
