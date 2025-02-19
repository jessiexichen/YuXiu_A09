<template>
  <div class="selector-container">
    <div class="selections">
      <ElButton v-for="(item, index) in showedSelections" :key="index" style="margin: 2px;">
        {{ item }}
      </ElButton>
    </div>
    <div class="dropdown-button" v-if="hasMore">
      <ElButton  @click="toggleDropdown" class="button">
      <img src="@/assets/icons/downArrow.png"/>
      </ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus';
import { ref } from 'vue';

type Props = {
  visibleSelection: string[],
  hasMore?: boolean,
  allSelection?: string[],
}

const props = defineProps<Props>()

const showedSelections = ref<string[] | undefined>(props.visibleSelection)
/** 控制下拉菜单的显示与隐藏 */
const dropdownVisible = ref(false);

// 切换下拉显示
const toggleDropdown = () => {
  showedSelections.value = dropdownVisible.value ? props.visibleSelection : props.allSelection
  dropdownVisible.value = !dropdownVisible.value;
};
</script>

<style lang="scss" scoped>
.selector-container {
  display: flex;
  width: 90%;
  gap: 5px;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  .selections {
    flex-grow: 5;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .dropdown-button {
    flex-grow: 1;
    position: relative;
    display: flex;
    justify-content: end;
    .button {
      border: none;

    }
  }
}

</style>
