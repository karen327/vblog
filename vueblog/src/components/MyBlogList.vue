<template>
  <el-container class="blog_flow">
    <el-main class="main">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
        <el-tab-pane label="已发表" name="post">
          <blog_flow state="1" :showEdit="true" :showDelete="true" :showRestore="false" :activeName="activeName"></blog_flow>
        </el-tab-pane>
        <el-tab-pane label="草稿箱" name="draft">
          <blog_flow state="0" :showEdit="true" :showDelete="true" :showRestore="false" :activeName="activeName"></blog_flow>
        </el-tab-pane>
        <el-tab-pane label="回收站" name="dustbin">
          <blog_flow state="2" :showEdit="false" :showDelete="true" :showRestore="true" :activeName="activeName"></blog_flow>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>
<script>
import MyBlogFlow from '@/components/MyBlogFlow'
import BlogCfg from '@/components/BlogCfg'
import {postRequest} from '../utils/api'
import {putRequest} from '../utils/api'
import {deleteRequest} from '../utils/api'
import {getRequest} from '../utils/api'
import '@/styles/reset.css'
export default {
  // mounted: function () {
  //   var _this = this;
  //   getRequest("/isAdmin").then(resp=> {
  //     if (resp.status == 200) {
  //       _this.isAdmin = resp.data;
  //     }
  //   })
  // },
  created() {
    getRequest("/isAdmin").then(resp=> {
      if (resp.status == 200) {
        this.isAdmin = resp.data;
      }
    });
  },  //gpt声称用这段代替mounted那段可以避免渲染延迟然而并没有
  data() {
    return {
      activeName: 'post',
      isAdmin: false
    };
  },
  methods: {
    handleClick(tab, event) {
//        console.log(tab, event);
    }
  },
  components: {
    'blog_flow': MyBlogFlow,
    // 'blog_cfg': BlogCfg
  }
};
</script>
<style>
.blog_flow > .header {
  background-color: #89c3eb;
  margin-top: 10px;
  padding-left: 5px;
  display: flex;
  justify-content: flex-start;
}

.blog_flow > .main {
  /*justify-content: flex-start;*/
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  padding-left: 0px;
  background-color: #fff;
  padding-top: 0px;
  margin-top: 8px;
}
</style>
