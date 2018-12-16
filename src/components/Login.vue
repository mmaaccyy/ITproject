<template>
	<div class="app">
        <el-row :gutter="25">
        <el-col :span="10"><img :src="imgUrl" style="width:200px;height:80px;"></el-col>
        <el-col :span="12"><h1 style="margin-top:8%;color:#FFFFFF;font-family:'PingFang SC';">学生信息查询</h1></el-col>
        </el-row>
		<el-input v-model="account" placeholder="请输入账号"></el-input>
		<el-input type="password" v-model="password" placeholder="请输入密码" @click.native="showMainpage"></el-input>
        <el-select v-model="value" placeholder="职业">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
  </el-select>
		<el-button @click="jump" style="margin-left:10%">登录</el-button>
	</div>
</template>

<script>
export default {
     name: 'Login',
     data(){
         return {
        options: [{
          value: 'headMaster',
          label: '班主任'
        }, {
          value: 'superVisor',
          label: '教务员'
        }, {
          value: 'teacher',
          label: '教师'
        }],
        value: '',
        account:"",
        password:"",
        imgUrl:require("../../resource/logo.png"),
      }
     },
     methods:{
         jump(){
             var _this=this
             this.$http.post("login/",{id:_this.account,password:_this.password,identity:_this.value}).then(function (Response) {
                 console.log(Response.data)
                 if(Response.data.status==1){
                     _this.$message({showClose: true,message: '登录成功'});
                     _this.$router.push({path: '/.',name:'HelloWorld'});
                 }
                 else{
                      _this.$message('登录失败');
                 }
        });
              //this.$router.push({path: '/.',name:'HelloWorld'});
         }
     }
}
</script>
<style>
.app{
    background: #1c69dd;
    position: absolute;
    width:30%;
    height:25%;
    /*关键点如下*/
    top: 30%;
    margin-left:35%;/*对应中间盒子宽度的一半*/
    margin-top:-50px;
}
</style>


