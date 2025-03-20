<template>
  <LayOut
    background="Login"
  >
    <div id="首页" style="display: hidden;"></div>
    <div class="container">
      <div class="short-intro" id="产品简介">
        <div class="title">产品简介</div>
        <div class="content">
          111
        </div>
      </div>
      <div class="short-intro" id="使用教程">
        <div class="title">使用教程</div>
        <div class="content">
          111
        </div>
      </div>
      <div class="short-intro" id="功能介绍">
        <div class="title">功能介绍</div>
        <div class="content">
          111
        </div>
      </div>
      <div class="short-intro" id="性能优势">
        <div class="title">性能优势</div>
        <div class="content">
          111
        </div>
      </div>
      <div class="short-intro" id="迭代方向">
        <div class="title">迭代方向</div>
        <div class="content">
          111
        </div>
      </div>
      <div class="short-intro" id="用户评价">
        <div class="title">用户评价</div>
          <div class="content">
              <div class="comments">
                <div class="comment">
                  <div>

                  </div>
                </div>
                <div class="comment">
                <div></div>
                </div>
                <div class="comment">
                <div></div>
                </div>
            </div>
          </div>
      </div>
      <div class="short-intro" id="反馈入口">
        <div class="title">反馈入口</div>
          <div class="content">
            111
          </div>
      </div>
    </div>
  </LayOut>
</template>
<script setup lang="ts">
import LayOut from '@/components/layouts/LayOut.vue';



</script>

<script lang="ts">
export default {
  watch: {
    $route() {
      const hash = this.$route.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  },
  mounted() {
    const hash = this.$route.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  .short-intro {
    position: relative;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px 0 0 0;
  .title {
    position: absolute;
    left: 2rem;
    top: 2rem;
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    }
    .content {
      display: flex;
      width: 100%;
      height: auto;
      margin: 50px 0 50px 0;
      .comments {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        .comment {
          width: 350px;
          height: 220px;
          border-radius: 23px;
          opacity: 1;

          /* 自动布局 */
          display: flex;
          flex-direction: undefined;
          justify-content: undefined;
          align-items: undefined;
          padding: NaNpx;

          background: #FFFFFF;

          box-sizing: border-box;
          border: 1px solid #1975FF;

          box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);

        }
      }
    }


  }
}

</style>
