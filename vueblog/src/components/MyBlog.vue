<template>
    <el-container class="article_list">
      <el-main class="main">
        <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
          <el-tab-pane label="全部文章" name="all">
            <blog_table :isManager="false" state="-1" :showEdit="false" :showDelete="false" :showRestore="false" :activeName="activeName"></blog_table>
          </el-tab-pane>
          <el-tab-pane label="已发表" name="post">
            <blog_table :isManager="false" state="1" :showEdit="true" :showDelete="true" :showRestore="false" :activeName="activeName"></blog_table>
          </el-tab-pane>
          <el-tab-pane label="草稿箱" name="draft">
            <blog_table :isManager="false" state="0" :showEdit="true" :showDelete="true" :showRestore="false" :activeName="activeName"></blog_table>
          </el-tab-pane>
          <el-tab-pane label="回收站" name="dustbin">
            <blog_table :isManager="false" state="2" :showEdit="false" :showDelete="true" :showRestore="true" :activeName="activeName"></blog_table>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </template>
  <script>
    import BlogTable from '@/components/BlogTable'
    import BlogCfg from '@/components/BlogCfg'
    import {postRequest} from '../utils/api'
    import {putRequest} from '../utils/api'
    import {deleteRequest} from '../utils/api'
    import {getRequest} from '../utils/api'
    import '@/styles/reset.css'
    export default {
      props: {
        userName: String
      },
      mounted: function () {
        var _this = this;
        getRequest("/isAdmin").then(resp=> {
          if (resp.status == 200) {
            _this.isAdmin = resp.data;
          }
        })
        // getRequest("/currentUserName").then(function (msg) {
        //   _this.currentUserName = msg.data;
        // }, function (msg) {
        //   _this.currentUserName = '游客';
        // });
      },
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
        'blog_table': BlogTable,
        'blog_cfg': BlogCfg
      }
    };
  </script>
  <style>
    .article_list > .header {
      background-color: #89c3eb;
      margin-top: 10px;
      padding-left: 5px;
      display: flex;
      justify-content: flex-start;
    }
  
    .article_list > .main {
      /*justify-content: flex-start;*/
      display: flex;
      round-clip: 10px;
      flex-direction: column;
      padding-left: 0px;
      background-color: #fff;
      padding-top: 0px;
      margin-top: 8px;
    }
  </style>
  