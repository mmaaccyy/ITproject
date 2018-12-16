<template>
    <el-container>
    <el-aside width="300px">
      <el-menu
      default-active=""
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @select="handleSelect"
      @close="handleClose">
      <el-menu-item v-for="(dot , index) in doit" :index="dot" :key="index">
        高{{dot.fields.grade}}({{dot.fields.classNumber}})班
      </el-menu-item>
    </el-menu>
    </el-aside>
    <el-main class="home_main">
          <div style="margin-top:10px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
       <el-breadcrumb-item :to="{ path: '/StudentPoto' }">学生相册</el-breadcrumb-item>
        <el-breadcrumb-item>{{xxx}}</el-breadcrumb-item>
      </el-breadcrumb>
      
    <el-tabs :tab-position="tabPosition" style="margin-top: 30px;" type="card">
      <el-row :gutter="20" style="margin-top: 20px;margin-bottom:10px;">
       <el-col :span="16"><h2>班主任：{{sss}}</h2></el-col>
       <el-col :span="8"><el-button plain @click="open">导出表格</el-button></el-col>
      </el-row>
    <el-tab-pane label="座位表(正视图)"></el-tab-pane>
    <el-tab-pane label="座位表(背视图)"></el-tab-pane>
    <el-tab-pane label="座位表(默认)"></el-tab-pane>
    </el-tabs>
          </div>
    </el-main>
  </el-container>
    
</template>
<script>
export default {
  name: 'StudenPoto',
  data () {
    return {
      sss:"",
      xxx:"",
      doit:[]
    }
  },
  created(){
    this.getmm();
  },
  methods:{
    async getmm(){
      let self=this;
      self.doit=self.$route.params.cls;
    },
    handleSelect(key,keyPath){
      this.xxx='高'+key.fields.grade+'('+key.fields.classNumber+')班';
      this.sss=key.fields.headMaster;
    },

  }
}
</script>
<style>

</style>
