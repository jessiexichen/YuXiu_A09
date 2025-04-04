<template>
  <LayOut>
    <div class="card-container">
      <CarD style="height: 100%;">
        <div class="card-block top-block">
          <div class="avatar-container">
            <div class="avatar-wrapper" @click="handleClick" style="cursor: pointer;">
              <el-avatar :src="currentAvatar" alt="用户头像" class="avatar" size="large" />
              <div v-if="isUploading" class="uploading-mask">
                <el-icon class="loading-icon"><Loading /></el-icon>
              </div>
            </div>
            <!-- 隐藏的文件输入框 -->
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              class="hidden-input"
              style="display: none;"
              @change="handleFileChange"
            />

            <!-- 上传成功提示 -->
            <el-dialog
              v-model="uploadSuccessDialogVisible"
              title="上传成功"
              width="30%"
              :before-close="handleCloseDialog"
            >
              <div class="success-message">
                <el-icon class="success-icon"><Check /></el-icon>
                <p>头像更新成功！</p>
              </div>
              <template #footer>
                <span class="dialog-footer">
                  <el-button type="primary" @click="uploadSuccessDialogVisible = false">确定</el-button>
                </span>
              </template>
            </el-dialog>
          </div>
          <div class="user-info-container">
            <div class="info-item">
              <div class="info-title">用户名</div>
              <div class="info-content">{{ userInfo.username }}</div>
            </div>
            <div class="info-item">
              <div class="info-title">邮箱</div>
              <div class="info-content">{{ userInfo.email }}</div>
            </div>
            <div class="info-item">
              <div class="info-title">密码</div>
              <div class="info-content">********</div>
            </div>
            <div class="restore" @click="restore()">
              <img src="@/assets/icons/restore.png">
            </div>
          </div>
          <el-dialog
            v-model="dialogVisible"
            width="50%"
            align-center
            :before-close="handleClose"
          >
            <el-form
              ref="formRef"
              :model="userInfo"
              :rules="rules"
              label-width="80px"
              status-icon
            >
              <el-form-item label="用户名" prop="username">
                <el-input
                  v-model="userInfo.username"
                  placeholder="请勿清空哦"
                ></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input
                  v-model="userInfo.email"
                  placeholder="请勿清空哦"
                ></el-input>
              </el-form-item>

              <el-form-item label="密码" prop="password">
                <el-input
                  v-model="userInfo.password"
                  placeholder="请勿清空哦"
                  clearable
                ></el-input>
              </el-form-item>
            </el-form>

            <template #footer>
              <span class="dialog-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="submitForm">确定</el-button>
              </span>
            </template>
          </el-dialog>
        </div>
        <div class="card-block bottom-block">
          <div class="voice-container">
    <!-- 页面标题 -->
    <div class="page-title">
      <h2>我的声音</h2>
    </div>

    <!-- 搜索框和操作按钮 -->
    <div class="search-bar">
      <el-input
        v-model="searchQuery"
        placeholder="搜索我的声音"
        prefix-icon="Search"
        clearable
        @input="handleSearch"
        style="width: 80%"
      ></el-input>

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
        </div>
      </CarD>
    </div>

  </LayOut>
</template>
<script setup lang="ts">
import LayOut from '@/components/layouts/LayOut.vue';
import CarD from '@/components/card/CarD.vue';
import router from '@/router';
import { ElAvatar, ElMessage, ElMessageBox } from 'element-plus';
import { computed, reactive, ref } from "vue";
import { Check, Loading } from "@element-plus/icons-vue";
import { useAvatar, useCollection } from '@/stores/index';

const userInfo = ref({
  username: "yuxiu001",
  email: "yuxiu001@yeah.net",
  password: "Aa12345678",
});

const restore = () => {
  ElMessageBox.prompt('请输入你的原密码', '验证', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputErrorMessage: '密码错误',
  })
    .then(({ value }) => {
      if (value===userInfo.value.password){
        ElMessage({
        type: 'success',
        message: `密码正确`,
        })
        dialogVisible.value = true;
      }
      else {
        ElMessage({
        type: 'error',
        message: `密码错误，请重新尝试`,
        })
      }
    })
}

const dialogVisible = ref(false);
const formRef = ref();

const  rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" },
  ],
  email: [
    { required: true, message: "邮箱请勿留空", trigger: "blur" },
    { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码请勿留空", trigger: "blur" },
    { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" },
  ],
});


const  handleClose = () => {
  dialogVisible.value = false;
  formRef.value.resetFields();
};

const  submitForm = () => {
formRef.value.validate((valid: boolean) => {
  if (valid) {
    ElMessageBox.confirm("确定要修改吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "info",
    })
    .then(() => {
      // 提交表单逻辑
      ElMessage.success("修改成功！");
      dialogVisible.value = false;
    })
    .catch(() => {
      ElMessage.info("已取消修改");
    })
    } else {
        ElMessage.error("表单验证失败，请检查输入内容！");
        return false;
      }
  });
};



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
  useCollection().getVoice(id).then((voice) => {
    voiceFormRef.value.name = voice.name;
    voiceFormRef.value.group = voice.group;
  });
}
</script>

<script lang="ts">
    const fileInput = ref(null);
    const currentAvatar = computed(() => useAvatar().avatarUrl);
    const isUploading = ref(false);
    const uploadSuccessDialogVisible = ref(false);

    // 模拟上传成功后的头像
    const simulateUploadSuccess = (file) => {
      return new Promise((resolve) => {
        // 创建一个临时URL用于预览
        const objectURL = URL.createObjectURL(file);
        setTimeout(() => {
          resolve(objectURL);
        }, 1500);
      });
    };

    // 点击头像框触发文件选择
    const handleClick = () => {
      fileInput.value.click();
    };

    // 处理文件选择
    const handleFileChange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // 检查文件类型
      if (!file.type.match("image.*")) {
        ElMessage.error("请选择图片文件！");
        return;
      }

      // 检查文件大小（例如限制为2MB）
      if (file.size > 2 * 1024 * 1024) {
        ElMessage.error("图片大小不能超过2MB！");
        return;
      }

      // 开始上传
      isUploading.value = true;
      try {
        // 模拟上传过程
        const uploadedUrl:string = await simulateUploadSuccess(file);
        useAvatar().changeAvatar(uploadedUrl);
        uploadSuccessDialogVisible.value = true;
      } catch (error) {
        ElMessage.error("上传失败，请重试！");
        console.error("上传失败:", error);
      } finally {
        isUploading.value = false;
        // 重置文件输入框，以便可以再次选择相同的文件
        fileInput.value.value = "";
      }
    };

    // 关闭对话框
    const handleCloseDialog = () => {
      uploadSuccessDialogVisible.value = false;
    };
import {
  Clock, Folder, Edit, Delete
} from "@element-plus/icons-vue";

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
</script>


<style lang="scss">
.card-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .card {
    width: 95%;
    height: 100%;
    .inner-card.card {
      height: 100%;
      padding: 0;
    }
    .top-block {
      height: 25%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: start;
      border-bottom: 2px solid #E6E6E6;
      padding-top: 0;
      .avatar-container {
        width: 100%;
        height: 60%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .avatar-wrapper {
          display: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          .avatar {
            height: 80px;
            width: 80px;
          }
          .loading-icon {
            position: absolute;
          }
        }
        :hover.avatar-wrapper {
          scale: 105%;
          }
      }
      .user-info-container {
        width: 100%;
        height: 40%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border: 1px solid #F3F4F6;
        .info-item {
          flex-grow: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: start;
          justify-content: center;

          .info-title {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: larger;
            color: #6b7280;
          }
          .info-content {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: larger;
            color: #6b7280;
          }
        }
        .restore {
          width: 20%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          img {
            height: 30px;
            &:hover {
              transform: scale(1.1);
              transition: all 0.3s;
            }
          }
        }
      }
    }
    .bottom-block {
      display: flex;
      flex-direction: column;
      height: 75%;
      width: 100%;

      .child-selector {
        display: flex;
        width: 100%;
        height: 50px;
        position: relative;
        border-bottom: 2px solid #f6f7f8;
        padding-bottom: 0px;
        height: 60px;

        .title {
          width: 50%;
          line-height: 40px;
          text-align: center;
          color: #6b7280;
          cursor: pointer;
          font-weight: bolder;
          font-size: larger;
        }
        .active {
          color:#457af7;
          border-bottom: 2px solid #457af7;
        }
      }
    }

    .card-block {
      padding-bottom: 0px;
      .title {
        height: 30px;
        font-size: 24px;
        font-weight: bold;
        line-height: 32px;
        letter-spacing: 0px;
        color: black;
      }
    }
  }
}

.el-card__body {
  width: 100%;
}

</style>
<style scoped>


.page-title {
  margin-bottom: 8px;
}

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
