<template>
  <div class="article-container">

    <el-card class="box-card filter-card">
      <div slot="header" class="clearfix">
        <!--    面包屑路径导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!--    面包屑路径导航-->
      </div>
      <div class="text item">
        <!--    数据筛选表单-->
        <el-form ref="form" :model="form" label-width="80px" size="small">
          <el-form-item label="状态">
            <el-radio-group v-model="status">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
              <el-radio :label="4">已删除</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
            <el-select v-model="channelStatus" placeholder="全部">
              <el-option label="全部" :value="null"></el-option>
              <el-option :label="channel.name" :value="channel.id" v-for="(channel, index) in channels" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
                    v-model="dateRange"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loadArticles()" :disabled="loading">查询</el-button>
          </el-form-item>
        </el-form>
        <!--    数据筛选表单-->
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 {{this.total_page}} 条结果：
      </div>
<!--      数据列表-->
      <div class="text item">
        <el-table
                :data="articleData"
                style="width: 100%"
                class="res-table"
                size="small"
                stripe
                v-loading="loading">
          <el-table-column
                  prop="date"
                  label="封面"
                  >
            <template slot-scope="scope">
              <el-image
                      style="width: 100px; height: 100px"
                      :src="scope.row.cover.images[0]"
                      fit="cover"
                      lazy
                      :preview-src-list="[scope.row.cover.images[0]]">
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
<!--              <img v-if="scope.row.cover.images[0]" :src="scope.row.cover.images[0]" class="article_cover">-->
<!--              <img v-else src="./no-cover.gif" class="article_cover">-->
            </template>
          </el-table-column>
          <el-table-column
                  prop="title"
                  label="标题"
          >
          </el-table-column>
          <el-table-column
                  prop="status"
                  label="状态"
          >
            <template slot-scope="scope">
              <el-tag :type="statusData[scope.row.status].type">{{statusData[scope.row.status].text}}</el-tag>
<!--              <el-tag type="warning" v-if="scope.row.status === 0">草稿</el-tag>-->
<!--              <el-tag  v-else-if="scope.row.status === 1">待审核</el-tag>-->
<!--              <el-tag type="success" v-else-if="scope.row.status === 2">审核通过</el-tag>-->
<!--              <el-tag type="danger" v-else-if="scope.row.status === 3">审核失败</el-tag>-->
<!--              <el-tag type="info" v-else-if="scope.row.status === 4">已删除</el-tag>-->
            </template>
          </el-table-column>
          <el-table-column
                  prop="pubdate"
                  label="发布时间"
          >
          </el-table-column>
          <el-table-column
                  prop="date"
                  label="操作"
          >
            <template slot-scope="scope">
              <el-button
                      size="small"
                      circle
                      type="primary"
                      icon="el-icon-edit"
                      ></el-button>
              <el-button
                      size="small"
                      type="danger"
                      circle
                      icon="el-icon-delete"
                      @click="onDeleteArticle(scope.row.id)"
                      ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--      数据列表-->

<!--        列表分页-->
        <el-pagination
                layout="prev, pager, next"
                :total="total_page"
                background
                @current-change="onCurrentPage"
                :page-size="per_page"
                :disabled="loading">
        </el-pagination>
        <!--        列表分页-->
      </div>
    </el-card>


  </div>
</template>

<script>
  import {getArticles, getArticlesChannels, deleteArticle} from '@/api/article'

  export default {
    name: "index",
    data(){
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        articleData: [],  //文章数据
        statusData: [
              {text: '草稿', type: "warning"},
              {text: '待审核', type: ""},
              {text: '审核通过', type: "success"},
              {text: '审核失败', type: "danger"},
              {text: '已删除', type: "info"},
        ],  //标签中用于描述状态列表
        per_page: 10,  //每页文章数
        page: 1, //第几页
        total_page: 0,  //总文章数
        status: null,  //状态
        channels: [], //频道
        channelStatus: null, //绑定的channelid
        dateRange: [], //时间范围数组
        loading: true //加载中
      }
    },
    created() {
      this.loadArticles();
      this.loadChannels();
    },
    methods: {
      loadArticles(){
        this.loading = true;
        getArticles({
          page: this.page,
          per_page: this.per_page,
          status: this.status,
          channel_id: this.channelStatus,
          begin_pubdate: this.dateRange[0],
          end_pubdate: this.dateRange[1]
        }).then(res => {
          // console.log(res);
          this.articleData = res.data.data.results;
          this.total_page = res.data.data.total_count;
          // console.log(this.total_page);
          this.loading = false;
        }).catch(err => {
          console.log(err);
        });
        this.loading = false;
      },
      onCurrentPage(page){
        this.page = page;
        // console.log(this.page);
        this.loadArticles();
      },
      loadChannels(){
        getArticlesChannels().then(res => {
          // console.log(res);
          this.channels = res.data.data.channels;
        })
      },
      onDeleteArticle(id){
        // console.log(id)
        // console.log(id.toString())
        let articleId = id.toString()
        // console.log(articleId);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // console.log(id);
            deleteArticle(articleId).then(res => {
              this.loadArticles();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
    }
  }
</script>

<style scoped>
  .filter-card{
    margin-bottom: 30px;
  }

  .res-table{
    margin-bottom: 20px;
  }

  .article_cover{
    width: 100px;
    height: 100px;
  }
</style>