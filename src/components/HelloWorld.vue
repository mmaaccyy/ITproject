<template>
<div id="app">
  <el-container>
  <el-header style="height: 100px">
    <el-row :gutter="20">
      <el-col :span="6" style="margin-top:-10px;"><img :src="imgUrl"  style="width:216px;height:90px;"></el-col>
      <el-col :span="5.5" :offset="6"><el-menu 
      :default-active="activeIndex"
      background-color="#1c69dd"
      text-color="#fff"
      active-text-color="#ffd04b"
       class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">基本情况</el-menu-item>
  <el-menu-item index="2">表格查询</el-menu-item>
  <el-menu-item index="3">学生相册</el-menu-item></el-menu>
  </el-col>
  <el-col :span="4" :offset="2" style="margin-top:18px;">
      <el-button  @click="Gotteacher " >教师信息</el-button>
      <el-button type="warning" @click="logout " >注销</el-button>
  </el-col>
</el-row>
</el-header>
  <el-container>
     <router-view></router-view>    <!-- 最重要的标签，用来显示跳转的页面 -->
  </el-container>
</el-container>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome',
      activeIndex:"1",
      imgUrl:require("../../resource/logo.png"),
      doit:[]
    }
  },
  created(){
    this.$router.push({name:'BasicInform',params:{cls:this.doit}});
    this.getclass();
  },
  methods:{
    handleSelect(key, keyPath) {
        switch(key){
          case '1':
            this.$router.push({name:'BasicInform',params:{cls:this.doit}});
            break;
          case '2':
            this.$router.push({name:'TableSituation',params:{cls:this.doit}});
            break;
          case '3':
            this.$router.push({name:'StudentPoto',params:{cls:this.doit}});
            break;
      }
    },
    logout(){
      var _this=this;
       _this.$router.push({path: '/'});
      this.$http.get("logout/").then(function (Response) {
        console.log(Response.data);
        if(Response.data.status){
          _this.$message('注销成功');
        }
        });
    },
    getclass(){
      var _this = this;
        this.$http.get("getClsssOrganization/").then(function (Response) {
          for (var k in Response.data.students) {
             _this.doit.push(Response.data.students[k]);
          }
        });
    },
    Gotteacher(){
      const { href } = this.$router.resolve({path:'/TeacherInform',name:'TeacherInform'});
      window.open(href, '_blank', 'toolbar=yes, width=1300, height=900');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .el-header{
    background: #1c69dd;
  }
.el-row {
    margin-top: 20px;
    margin-left: 100px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #1c69dd;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 60px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
