<template>
  <LayOut>
    <div class="card-container">
      <CarD>
        <div class="card-block top-block">

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
              <div
                class="title"
                :class="router.currentRoute.value.name === '转录历史' ? 'active': undefined"
                @click="router.push('/user-center/tranhistory')"
              >
                生成历史
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

</script>

<style lang="scss" scoped>
.card-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .card {
    width: 95%;


    .top-block {
      height: 250px;
      width: 100%;
      display: flex;
      border-bottom: 2px solid #E6E6E6;
    }
    .bottom-block {
      display: flex;
      flex-direction: column;
      height: 500px;
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
