<template>
<div id="app">

  <el-container class="con_section" style="width:100%">
    <el-header class="blueheader">
      <h2 class="headlogo">基于JSP的C/C++竞赛系统</h2>
      <el-col :span="3" class="userinfo">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>刘伟娜</span>
      </el-col>
    </el-header>
    <el-container>
      <el-aside style="flex: 0 0 230px;width: 230px;background:#eef1f6">
        <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>主菜单</template>
            <el-menu-item index="1">开始考试</el-menu-item>
            <el-menu-item index="2">成绩信息</el-menu-item>
            <el-menu-item index="3">学生管理</el-menu-item>
            <el-menu-item index="4">教师管理</el-menu-item>
            <el-menu-item index="5">题库管理</el-menu-item>
            <el-menu-item index="6">考卷管理</el-menu-item>
            <el-menu-item index="7">登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="home_main">
         <!--主窗口-->
         <el-col :span="24" class="breadcrumb-container">
          <strong class="title">{{$route.name}}</strong>
          <el-breadcrumb separator="/" class="breadcrumb-inner">
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="24">
          <div style="margin-top:10px">
            <router-view></router-view>    <!-- 最重要的标签，用来显示跳转的页面 -->
          </div>
        </el-col>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
  export default {
    data(){
      return {
        searchCriteria: '',
      }
    },
    methods:{
      handleIconClick(ev) {
        console.log(ev);
      },
      handleSelect(key, keyPath){    
        switch(key){
          case '1':
            this.$router.push('/questions/randomQuestionById');
            break;
          case '2':
            this.$router.push('/result');
            break;
          case '3':
            this.$router.push('/student');
            break;
          case '4':
            this.$router.push('/teacher');
            break;
          case '5':
            this.$router.push('/questions');
            break;
          case '6':
            this.$router.push('/page');
            break;
          case '7':
            this.$router.push('/login')
            break;
        }
      },
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .con_section{
    position: absolute;
    top: 0px;
    bottom: 0px;
    left:0px;
    width:100%;
  }
  .blueheader {
    height: 60px;
    line-height: 60px;
    background: #008080  ;
    color: #fff;
  }
  .el-menu-item.is-active {
      color: #008080  ;
  }
  .headlogo{
    float: left;
    height: 60px;
    margin: 0 20px;
    width: 300px;
  }
  ul.el-menu {
    background: #e4e8f1;
  }
  .userinfo{
    position: absolute;
    right: 0;
  }
  .el-submenu__title{
    background:#eef1f6;
  }
  .el_main{
    padding:0px;
  }
  .home_main{
    padding:10px;
  }
  .breadcrumb-container .title {
      width: 200px;
      float: left;
      color: #475669;
    font-size: 13px;
    }
  .breadcrumb-inner {
      float: right;
      font-size: 13px;
  }
  .el-breadcrumb__inner, .el-breadcrumb__inner a {
    font-weight: 400;
  }
</style>