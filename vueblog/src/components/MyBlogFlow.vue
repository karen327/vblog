<template>
  <div>
    <div style="display: flex;justify-content: flex-start">
      <el-input
        placeholder="通过标题搜索该分类下的博客..."
        prefix-icon="el-icon-search"
        v-model="keywords"
        style="width: 400px"
        size="mini">
      </el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="mini"
        style="margin-left: 3px"
        @click="searchClick"
      >
        搜索
      </el-button>
    </div>
    <div class="card-container">
      <div
        class="card"
        v-for="(article, index) in articles"
        :key="index"
        :class="{ 'card-selected': selItems.indexOf(article) > -1 }"
      >
      <div class="card-titleContent">
        <div class="card-title" @click="itemClick(article)">
          {{ article.title }}
        </div>
        <div class="card-time">{{ article.editTime | formatDateTime }}</div>
      </div>
        <!-- <div class="card-author">{{ article.nickname }}</div> -->
        <div class="card-category">{{ article.cateName }}</div>
        <div class="card-actions">
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(index, article)"
            v-if="showEdit"
          >
            编辑
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleRestore(index, article)"
            v-if="showRestore"
          >
            还原
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(index, article)"
            v-if="showDelete"
          >
            删除
          </el-button>
          <el-checkbox>
<!--            v-model="selItems"-->
<!--            :label="article"-->
<!--            :disabled="!showDelete"-->
<!--            class="card-checkbox"-->
          </el-checkbox>
        </div>
      </div>
    </div>
    <div class="blog_table_footer">
      <el-button
        type="danger"
        size="mini"
        style="margin: 0px;"
        v-show="this.articles.length>0 && showDelete"
        :disabled="this.selItems.length==0"
        @click="deleteMany"
      >
        批量删除
      </el-button>
      <span></span>
      <el-pagination
        background
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="totalCount"
        @current-change="currentChange"
        v-show="this.articles.length>0"
      ></el-pagination>
    </div>
  </div>
</template>



<script>
import {putRequest} from '../utils/api'
import {getRequest} from '../utils/api'
//  import Vue from 'vue'
//  var bus = new Vue()

export default{
  name: 'blog_table',
  data() {
    return {
      articles: [],
      selItems: [],
      loading: false,
      currentPage: 1,
      totalCount: -1,
      pageSize: 6,
      keywords: '',
      dustbinData: []
    }
  },
  mounted: function () {
    var _this = this;
    this.loading = true;
    this.loadBlogs(1, this.pageSize);
    var _this = this;
    window.bus.$on('blogTableReload', function () {
      _this.loading = true;
      _this.loadBlogs(_this.currentPage, _this.pageSize);
    })
  },
  methods: {
    searchClick(){
      this.loadBlogs(1, this.pageSize);
    },
    itemClick(row){
      this.$router.push({path: '/blogDetail', query: {aid: row.id}})
    },
    deleteMany(){
      var selItems = this.selItems;
      for (var i = 0; i < selItems.length; i++) {
        this.dustbinData.push(selItems[i].id)
      }
      this.deleteToDustBin(selItems[0].state)
    },
    //翻页
    currentChange(currentPage){
      this.currentPage = currentPage;
      this.loading = true;
      this.loadBlogs(currentPage, this.pageSize);
    },
    loadBlogs(page, count){
      var _this = this;
      var url = '';
      if (this.state == -2) {
        url = "/admin/article/all" + "?page=" + page + "&count=" + count + "&keywords=" + this.keywords;
      } else {
        url = "/article/all?state=" + this.state + "&page=" + page + "&count=" + count + "&keywords=" + this.keywords;
      }
      getRequest(url).then(resp=> {
        _this.loading = false;
        if (resp.status == 200) {
          _this.articles = resp.data.articles;
          _this.totalCount = resp.data.totalCount;
        } else {
          _this.$message({type: 'error', message: '数据加载失败!'});
        }
      }, resp=> {
        _this.loading = false;
        if (resp.response.status == 403) {
          _this.$message({type: 'error', message: resp.response.data});
        } else {
          _this.$message({type: 'error', message: '数据加载失败!'});
        }
      }).catch(resp=> {
        //压根没见到服务器
        _this.loading = false;
        _this.$message({type: 'error', message: '数据加载失败!'});
      })
    },
    handleSelectionChange(val) {
      this.selItems = val;
    },
    handleEdit(index, row) {
      this.$router.push({path: '/editBlog', query: {from: this.activeName,id:row.id}});
    },
    handleDelete(index, row) {
      this.dustbinData.push(row.id);
      this.deleteToDustBin(row.state);
    },
    handleRestore(index, row) {
      let _this = this;
      this.$confirm('将该文件还原到原处，是否继续？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      } ).then(() => {
        _this.loading = true;
        putRequest('/article/restore', {articleId: row.id}).then(resp=> {
          if (resp.status == 200) {
            var data = resp.data;
            _this.$message({type: data.status, message: data.msg});
            if (data.status == 'success') {
              window.bus.$emit('blogTableReload')//通过选项卡都重新加载数据
            }
          } else {
            _this.$message({type: 'error', message: '还原失败!'});
          }
          _this.loading = false;
        });
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '已取消还原'
        });
      });
    },
    deleteToDustBin(state){
      var _this = this;
      this.$confirm(state != 2 ? '将该文件放入回收站，是否继续?' : '永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.loading = true;
        var url = '';
        if (_this.state == -2) {
          url = "/admin/article/dustbin";
        } else {
          url = "/article/dustbin";
        }
        putRequest(url, {aids: _this.dustbinData, state: state}).then(resp=> {
          if (resp.status == 200) {
            var data = resp.data;
            _this.$message({type: data.status, message: data.msg});
            if (data.status == 'success') {
              window.bus.$emit('blogTableReload')//通过选项卡都重新加载数据
            }
          } else {
            _this.$message({type: 'error', message: '删除失败!'});
          }
          _this.loading = false;
          _this.dustbinData = []
        }, resp=> {
          _this.loading = false;
          _this.$message({type: 'error', message: '删除失败!'});
          _this.dustbinData = []
        });
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '已取消删除'
        });
        _this.dustbinData = []
      });
    }
  },
  props: ['state', 'showEdit', 'showDelete', 'activeName', 'showRestore']
}
</script>

<style>
.blog_table_footer {
  display: flex;
  box-sizing: content-box;
  padding-top: 10px;
  padding-bottom: 0px;
  margin-bottom: 0px;
  justify-content: space-between;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.card {
  width: 48%;
  padding: 10px;
  margin-bottom: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 10px;
}

.card-titleContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  flex: 1;
  margin-right: 10px;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 5px;
  color: #952fe7;
  cursor: pointer;
}

.card-author {
  font-size: 14px;
  font-weight: bold;
  color: #444444;
}

.card-time {
  font-size: 14px;
  font-weight: bold;
  color: #777;
  margin-top: 5px;
}

.card-category {
  text-align: right;
  font-size: 14px;
  font-weight: bold;
  color: #777;
  margin-top: 5px;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  align-items: center;
}

.card-actions button {
  background-color: white;
  color: #952fe7;
  border: none;
  cursor: pointer;
  font-size: 14px;
  margin: 5px;
}

.card-actions button:hover {
  text-decoration: underline;
}

.card-actions button:active {
  color: #0B3D91;
}

.card-selected {
  background-color: #E8F4FD;
}

@media (max-width: 768px) {
  .card {
    width: 100%;
  }
}
</style>
