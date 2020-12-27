<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-form ref="form" :model="article" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>

        <el-form-item label="内容">
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>

        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option :label="channel.name" :value="channel.id" v-for="(channel, index) in channels" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {publishArticle,  getArticlesChannels} from '@/api/article'
  export default {
    name: "index",
    data(){
      return {
        // form: {
        //   name: '',
        //   region: '',
        //   date1: '',
        //   date2: '',
        //   delivery: false,
        //   type: [],
        //   resource: '',
        //   desc: ''
        // },
        article: {
          title: '',
          content: '',
          cover: {
            type: 0,
            images: []
          },
          channel_id: null
        },
        channels: []
      }
    },
    created() {
      this.loadChannels();
    },
    methods: {
      loadChannels(){
        getArticlesChannels().then(res => {
          // console.log(res);
          this.channels = res.data.data.channels;
        })
      },
      onPublish(draft) {
        // console.log('submit!');
        publishArticle(this.article, draft).then(res => {
          // console.log(res);
          this.$message({
            type: "success",
            message: "发布成功"
          });
          this.$router.push("/article")
        })
      }
    }
  }
</script>

<style scoped>

</style>