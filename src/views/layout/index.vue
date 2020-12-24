<template>
  <el-container class="layout-container">
    <el-aside class="aside"
              width="200px">
      <AppAside class="appAside"
                :is-collapse = "isCollapse"></AppAside>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i :class="{'el-icon-s-unfold': isCollapse, 'el-icon-s-fold': !isCollapse }"
            @click="fold"></i>
          <span>江苏传智播客科技教育有限公司</span>
        </div>
        <el-dropdown class="el-dropdown">
<!--            <span class="el-dropdown-link">-->
<!--              下拉菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--            </span>-->
            <div class="dropMy el-dropdown-link">
<!--              <img src="https://i2.hdslb.com/bfs/face/3e1a614a924f85c75f021c4c03e563a63f8d6304.jpg@140w_140h_1c.webp">-->
              <img :src="this.user.photo">
              <span>{{this.user.name}}</span>
              <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人设置</el-dropdown-item>
              <el-dropdown-item
                      @click.native="logOut"
              >退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
<!--        子路由出口-->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import AppAside from "./components/aside";
  import {getUserInfo} from "@/api/user";
  export default {
    name: "index",
    data(){
      return{
        user:{},
        isCollapse: false
      }
    },
    components:{
      AppAside
    },
    created() {
      this.loadUserProfile();
    },
    methods: {
      loadUserProfile(){
        getUserInfo().then(res => {
          // console.log(res);
          this.user = res.data.data
        })
      },
      fold(){
        this.isCollapse = !this.isCollapse;
        if (this.isCollapse){
          document.getElementsByClassName("aside")[0].style.width = "auto";

        }else {
          document.getElementsByClassName("aside")[0].style.width = "200px";
        }
      },
      logOut() {
        // console.log("logout");
        // window.localStorage.removeItem("user");
        this.$confirm('请问您是否退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功'
          });
          window.localStorage.removeItem("user");
          this.$router.push("/login");
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });
        })
      }
    }
  }
</script>

<style scoped>
  .layout-container{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .aside{
    background-color: #D3DCE6;
  }

  .appAside{
    height: 100%;
  }

  .header{
    background-color: #B3C0D1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .main{
    background-color: #E9EEF3;
  }

  .el-dropdown{
    margin-right: 40px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

  .dropMy{
    display: flex;
    align-items: center;
  }

  .dropMy img{
    width: 40px;
    height: 40px;
    margin-right: 20px;
    border-radius: 50%;
  }
</style>