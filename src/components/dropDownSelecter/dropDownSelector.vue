<template>
  <div class="selector-container">
    <div
      class="selections"
      :style="dropdownVisible ?
          {flexWrap: 'wrap'} : {overflow: 'hidden',whiteSpace: 'nowrap'}"
    >
      <NormButton
        v-for="(item, index) in showedSelections"
        :key="index"
        :font="item"
      />
    </div>
    <div class="dropdown-button" v-if="hasMore">
      <ElButton  @click="toggleDropdown" class="button">
        <el-icon>
          <ArrowDownBold v-if="!dropdownVisible" />
          <ArrowUpBold v-if="dropdownVisible" />
        </el-icon>
      </ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus';
import { ref } from 'vue';
import NormButton from '../button/normButton.vue';

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
  border: none;
  border-radius: 4px;
  .selections {
    margin-left: 8px;
    flex-grow: 5;
    display: flex;
    flex-direction: row;
    gap: 8px 8px;

  }

  .dropdown-button {
    width: 50px;
    position: relative;
    display: flex;
    justify-content: end;
    align-items: end;
    .button {
      border: none;
      position: absolute;
      top: 0;
    }
  }
}

</style>
