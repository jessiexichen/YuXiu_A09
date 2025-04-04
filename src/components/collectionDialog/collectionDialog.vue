<template>
  <el-dialog
    v-model="dialogVisible"
    width="50%"
    align-center
    :before-close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="80px"
      status-icon
    >
      <el-form-item label="命名" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="分组" prop="group">
        <el-input
          v-model="form.group"
          placeholder="默认收藏夹"
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
</template>

<script setup lang="ts">
import { useCollection } from '@/stores';
import { ElMessage, ElMessageBox } from 'element-plus';
import { reactive, ref } from 'vue';

const dialogVisible = defineModel<boolean>();
const formRef = ref();

const  form = reactive({
  name: "",
  group: "",
});

const  rules = reactive({
  name: [
    { required: true, message: "请输入命名", trigger: "blur" },
    { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" },
  ],
  group: [
    { required: true, message: "请输入分组", trigger: "blur" },
    { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" },
  ],
});


const  handleClose = () => {
  useCollection().CollectVoice(form.name, form.group);
  dialogVisible.value = false;
  formRef.value.resetFields();
};

const  submitForm = () => {
formRef.value.validate((valid: boolean) => {
  if (valid) {
    ElMessageBox.confirm("确定要添加收藏吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "info",
    })
    .then(() => {
      // 提交表单逻辑
      ElMessage.success("收藏成功！");
      handleClose();
    })
    .catch(() => {
      ElMessage.info("已取消收藏");
    });
    } else {
        ElMessage.error("表单验证失败，请检查输入内容！");
        return false;
      }
  });
};
</script>
