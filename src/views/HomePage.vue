<template>
  <LayOut
    background="Login"
  >
    <div id="首页" style="display: hidden;"></div>
    <div class="container">
      <div class="short-intro" id="产品简介">
        <div class="title">产品简介</div>
        <CarD class="content">
          111
        </CarD>
      </div>
      <div class="short-intro" id="使用教程">
        <div class="title">使用教程</div>
        <CarD class="content">
          111
        </CarD>
      </div>
      <div class="short-intro" id="功能介绍">
        <div class="title">功能介绍</div>
        <CarD class="content">
          111
        </CarD>
      </div>
      <div class="short-intro" id="性能优势">
        <div class="title">性能优势</div>
        <CarD class="content">
          111
        </CarD>
      </div>
      <div class="short-intro" id="迭代方向">
        <div class="title">迭代方向</div>
        <CarD class="content">
          111
        </CarD>
      </div>
      <div class="short-intro" id="用户评价">
        <div class="title">用户评价</div>
          <div class="content">
              <div class="comments">
                <div class="comment">
                  <div>
                    <div class="comment-content">
                      <div class="comment-title">
                        <div class="comment-name">
                          <div class="comment-avatar">
                            <el-avatar
                              src="/avatar.png"
                            />
                          </div>
                          <div class="comment-nickname">
                            User1
                          </div>
                        </div>
                        <div class="comment-content">
                          这是一条评论
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="comment">
                  <div>
                    <div class="comment-content">
                      <div class="comment-title">
                        <div class="comment-name">
                          <div class="comment-avatar">
                            <el-avatar
                              src="/avatar.png"
                            />
                          </div>
                          <div class="comment-nickname">
                            User1
                          </div>
                        </div>
                        <div class="comment-content">
                          这是一条评论
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="comment">
                  <div>
                    <div class="comment-content">
                      <div class="comment-title">
                        <div class="comment-name">
                          <div class="comment-avatar">
                            <el-avatar
                              src="/avatar.png"
                            />
                          </div>
                          <div class="comment-nickname">
                            User1
                          </div>
                        </div>
                        <div class="comment-content">
                          这是一条评论
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
      <div class="short-intro" id="反馈入口">
        <div class="title">反馈入口</div>
        <CarD class="content">
          111
        </CarD>
      </div>
    </div>
  </LayOut>
</template>
<script setup lang="ts">
import CarD from '@/components/card/CarD.vue';
import LayOut from '@/components/layouts/LayOut.vue';
import { ElAvatar } from 'element-plus';


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
      width: 95%;
      height: auto;
      margin: 30px 0 10px 0;
      .comments {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        .comment {
          display: flex;
          width: 29%;
          height: 220px;

          border-radius: 23px;
          padding: 10px;
          border: 1px solid #1975FF;
          box-sizing: border-box;

          background: #FFFFFF;
          box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);

          .comment-name {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 0 0 6px 0;
            .comment-nickname {
              font-size: 16px;
              font-weight: 600;
            }
          }

          .comment-content {
            display: flex;
            flex-direction: column;
            gap: 10px;
            font-size: 1.1rem;
            font-weight: 550;
          }
        }
      }
    }


  }
}

</style>
