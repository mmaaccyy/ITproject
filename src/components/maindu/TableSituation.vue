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
              <el-breadcrumb-item :to="{ path: '/TableSituation' }">表格查询</el-breadcrumb-item>
              <el-breadcrumb-item>{{xxx}}</el-breadcrumb-item>
            </el-breadcrumb>
      
    <el-tabs style="margin-top: 30px;" type="card">
      <el-row :gutter="20" style="margin-top: 20px;margin-bottom:10px;">
       <el-col :span="16"><h2>班主任：{{sss}}</h2></el-col>
       <el-col :span="8"><el-button plain @click="ddd">导出表格</el-button></el-col>
      </el-row>
    <el-tab-pane label="名单表"><el-table  id="table_xlsx" :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" sortable width="100">
      </el-table-column>
      <el-table-column prop="seatNumber" label="座位号" width="80">
      </el-table-column>
    </el-table></el-tab-pane>
    <el-tab-pane label="座位表(正视图)"><el-table :data="tafron" border style="width: 80%">
      <el-table-column prop="a" label="" >
      </el-table-column>
      <el-table-column prop="b" label="" >
      </el-table-column>
      <el-table-column prop="c" label="" >
      </el-table-column>
      <el-table-column prop="d" label="" >
      </el-table-column>
      <el-table-column prop="e" label="" >
      </el-table-column>
      <el-table-column prop="f" label="" >
      </el-table-column>
    </el-table></el-tab-pane>
    <el-tab-pane label="座位表(背视图)"><el-table :data="taback" border style="width: 80%">
      <el-table-column prop="a" label="" >
      </el-table-column>
      <el-table-column prop="b" label="" >
      </el-table-column>
      <el-table-column prop="c" label="" >
      </el-table-column>
      <el-table-column prop="d" label="" >
      </el-table-column>
      <el-table-column prop="e" label="" >
      </el-table-column>
      <el-table-column prop="f" label="" >
      </el-table-column>
    </el-table></el-tab-pane>
    <el-tab-pane label="座位表(默认)"><el-table  id="table_xlsx" :data="taind" border style="width: 100%">
      <el-table-column prop="name" label="姓名" sortable width="100">
      </el-table-column>
      <el-table-column prop="seatNumber" label="座位号" width="80">
      </el-table-column>
    </el-table></el-tab-pane>
    <el-tab-pane label="通讯录"><el-table :data="phoneData" border style="width: 100%">
      <el-table-column prop="studentId" label="学号" width="180">
      </el-table-column>
      <el-table-column prop="familyName" label="姓名" sortable width="100">
      </el-table-column>
      <el-table-column prop="place" label="住址" width="350">
      </el-table-column>
      <el-table-column prop="familyPhone" label="家庭电话" width="150">
      </el-table-column>
      <el-table-column  width="150">
      </el-table-column>
    </el-table></el-tab-pane>
  </el-tabs>
          </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'TableSituation',
  data () {
    return {
      xxx: '',
      sss:"",
      tableData:[],
      phoneData:[],
      doit:[],
      tafron:[],
      taback:[],
      taind:[]
    }
  },
  created(){
    let self=this;
    self.doit=self.$route.params.cls;
  },
  methods:{
      getmm(id){
      this.gettable(id);
      this.getphone(id);
    },
    handleSelect(key,keyPath){
      console.log(key);
      this.xxx='高'+key.fields.grade+'('+key.fields.classNumber+')班';
      this.sss=key.fields.headMaster;
      this.getmm(key.pk)
    },
    gettable:function(id) {
      var _this = this;
        this.$http.post("getStudentByClassId/",{classId:id}).then(function (Response) {
          _this.tableData=[];
           for (var k in Response.data.students) {
             _this.tableData.push(Response.data.students[k].fields);
          }
          console.log( _this.tableData);
          _this.gettf();
          _this.gettb();
          _this.gettl();
        });
    },
    getphone(id){
      var _this = this;
        this.$http.post("checkContactByClassId/",{classId:id}).then(function (Response) {
          console.log(Response.data.contact);
        _this.phoneData=Response.data.contact;
        });
    },
    gettf(){
      this.tafron=[{a:'',b:'',c:'',d:'',e:'',f:''},
              {a:'',b:'',c:'',d:'',e:'',f:''},
              {a:'',b:'',c:'',d:'',e:'',f:''},
              {a:'',b:'',c:'',d:'',e:'',f:''},
              {a:'',b:'',c:'',d:'',e:'',f:''},
              {a:'',b:'',c:'',d:'',e:'',f:''},
              {a:'',b:'',c:'',d:'',e:'',f:''}]

       for (var k in this.tableData) {
        var h,l;
        
        h=6-parseInt(this.tableData[k].seatNumber/7);
        l=this.tableData[k].seatNumber%6;
        console.log(h,l);
         if(l==0)
          this.tafron[h].f=this.tableData[k].name;
        if(l==1)
          this.tafron[h].a=this.tableData[k].name;
        if(l==2)
          this.tafron[h].b=this.tableData[k].name;
        if(l==3)
          this.tafron[h].c=this.tableData[k].name;
        if(l==4)
          this.tafron[h].d=this.tableData[k].name;
        if(l==5)
          this.tafron[h].e=this.tableData[k].name;
      }
    },
    gettb(){
      this.taback=[{a:'',b:'',c:'',d:'',e:'',f:''},
              {a:'',b:'',c:'',d:'',e:'',f:''},
              {a:'',b:'',c:'',d:'',e:'',f:''},
              {a:'',b:'',c:'',d:'',e:'',f:''},
              {a:'',b:'',c:'',d:'',e:'',f:''},
              {a:'',b:'',c:'',d:'',e:'',f:''},
              {a:'',b:'',c:'',d:'',e:'',f:''}]
       for (var k in this.tableData) {
        var h,l;
        
        h=parseInt(this.tableData[k].seatNumber/7);
        l=7-this.tableData[k].seatNumber%6;
        console.log(h,l);
        if(l==1)
          this.taback[h].a=this.tableData[k].name;
        if(l==2)
          this.taback[h].b=this.tableData[k].name;
        if(l==3)
          this.taback[h].c=this.tableData[k].name;
        if(l==4)
          this.taback[h].d=this.tableData[k].name;
        if(l==5)
          this.taback[h].e=this.tableData[k].name;
        if(l==6)
          this.taback[h].f=this.tableData[k].name;
      }
    },
    gettl(){
      this.taind=this.tableData;
      this.taind.sort(this.compare("seatNumber"));
    },
    compare(property) {
            return function(a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        },
    ddd(){
      this.$http.post("checkETable/",{studentId:"201630665313"}).then(function (Response) {
        console.log(Response.data);
        
    });
    }
  }
}
</script>
<style>

</style>
