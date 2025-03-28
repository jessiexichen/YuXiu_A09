<template>
  <div class="card">
    <div class="title" v-if="props.title">
      <div>{{ title }}</div>
      <div class="description">{{ description }}</div>
    </div>
    <div class="card" style="width: 100%;">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">

type Props = {
  title?: string,
  description?: string
}
const props = defineProps<Props>()
</script>
<style lang="scss" scoped>
.card {
  font-family: Roboto;
  position: relative;
  padding: 10px 10px 10px 10px;
  align-items: start;
  margin-top: 10px;
  margin-bottom: 10px;
  .title {
    width: 100%;
    font-size: 17px;
    font-weight: 600;
    display: flex;
    align-items: end;
    gap: 15px;
    .description {
      font-size: 14px;
      color: #e78f8f;
    }
  }
}
</style>
