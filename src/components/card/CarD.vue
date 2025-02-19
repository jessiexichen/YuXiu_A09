<template>
  <div class="card">
    <div class="title" v-if="props.title">
      {{ title }}
    </div>
    <div class="card" style="width: 100%;">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">

type Props = {
  title?: string
}
const props = defineProps<Props>()
</script>
<style lang="scss" scoped>
.card {
  font-family: Roboto;
  position: relative;
  padding: 10px 10px 10px 10px;
  .title {
    width: 100%;
    font-size: 17px;
    font-weight: 600;
  }
}
</style>
