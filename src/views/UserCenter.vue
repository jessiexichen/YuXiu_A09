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
          </div>
        </div>
        <div class="card-block bottom-block">
          <div class="child-selector">
              <div
                class="title"
                :class="router.currentRoute.value.name === '我的声音' ? 'active': undefined"
                @click="router.push('/user-center/myvoice')"
              >
                我的声音
              </div>
          </div>
          <div class="child-page">
            <RouterView />
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
import { ElAvatar, ElMessage } from 'element-plus';
import { computed, ref } from "vue";
import { Check, Loading } from "@element-plus/icons-vue";
import { useAvatarStore } from '@/stores/avatar';

const userInfo = ref({
  username: "2332876536",
  email: "2332876536@qq.com",
  password: "123456",
});
</script>

<script lang="ts">
    const fileInput = ref(null);
    const currentAvatar = computed(() => useAvatarStore().avatarUrl);
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
        useAvatarStore().changeAvatar(uploadedUrl);
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
      height: 30%;
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
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          .avatar {
            height: 80px;
            width: 80px;
          }
        }
      }
      .user-info-container {
        margin-top: 10px;
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

      }
    }
    .bottom-block {
      display: flex;
      flex-direction: column;
      height: 66%;
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
  }
}


</style>
