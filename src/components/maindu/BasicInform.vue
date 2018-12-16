<template>
  <el-container>
    <el-aside width="300px">
      <el-menu
        default-active
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @select="handleSelect"
        @close="handleClose"
      >
        <el-menu-item
          v-for="(dot , index) in doit"
          :index="dot"
          :key="index"
        >高{{dot.fields.grade}}({{dot.fields.classNumber}})班</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="home_main">
      <div style="margin-top:10px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/TableSituation' }">基本信息</el-breadcrumb-item>
          <el-breadcrumb-item>{{xxx}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-tabs :tab-position="tabPosition" style="margin-top: 30px;" type="card">
          <el-row :gutter="20" style="margin-top: 20px;margin-bottom:10px;">
            <el-col :span="10">
              <h2>班主任：{{sss}}</h2>
            </el-col>
            <el-col :span="6">
              <el-tooltip class="item" effect="dark" content="添加学生" placement="top">
                <el-button @click="jump" icon="el-icon-plus" type="primary" circle></el-button>
              </el-tooltip>
            </el-col>
            <el-dialog title="添加学生" :visible.sync="addstu">
              <el-form :model="add">
                <h2>基本情况</h2>
                <el-form :inline="true">
                  <el-form-item label="姓名">
                    <el-input v-model="add.name" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="性别">
                    <el-select v-model="add.sex" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.sex"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="出生年月">
					  <el-date-picker
					   v-model="add.birthday" 
					   value-format="yyyy-MM-dd"
					   type="date"
					   format="yyyy-MM-dd"
					   placeholder="选择日期时间">
					   </el-date-picker>
                  </el-form-item>
                  <el-form-item label="学号">
                    <el-input v-model="add.studentId" auto-complete="off"></el-input>
                  </el-form-item>
                </el-form>
                <el-form :inline="true">
                  <el-form-item label="年级">
                    <el-input v-model="add.grade" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="班级">
                    <el-input v-model="add.classNumber" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="座位">
                    <el-input v-model="add.seatNumber" auto-complete="off"></el-input>
                  </el-form-item>
                </el-form>
                <el-form :inline="true" :model="add" ref="add">
                  <el-form-item label="曾用名">
                    <el-input v-model="add.formerName" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="民族">
                    <el-input v-model="add.ethnicity" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item 
				  prop="contactPhone"
				  :rules="[
      { required: true, message: '请输入电话', trigger: 'blur' },
      { min: 6, max: 11, message: '格式不正确', trigger: 'blur' }
    ]"
				  label="联系电话">
                    <el-input v-model="add.contactPhone" auto-complete="off"></el-input>
                  </el-form-item>
                </el-form>
                <el-form :inline="true" :model="add" ref="add">
                  <el-form-item label="籍贯">
                    <el-input v-model="add.nativePlace" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="有何特长">
                    <el-input v-model="add.skill" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="QQ">
                    <el-input v-model="add.QQ" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item 
				  prop="familyName"
				  :rules="[
      { required: true, message: '请输入电话', trigger: 'blur' },
      { min: 6, max: 11, message: '格式不正确', trigger: 'blur' }
    ]"
				  label="监护人姓名">
                    <el-input v-model="add.familyName" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="监护人联系电话">
                    <el-input v-model="add.guradianPhone" auto-complete="off"></el-input>
                  </el-form-item>
                </el-form>
                <el-form>
                  <el-form-item label="家庭住址">
                    <el-input v-model="add.homePlace" auto-complete="off" type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item label="现住住址">
                    <el-input v-model="add.place" auto-complete="off" type="textarea"></el-input>
                  </el-form-item>
                </el-form>
                <h2>家庭情况</h2>
                <el-form :inline="true">
                  <el-form-item label="是否留守">
					  <el-select v-model="add.isLeftBehind" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.yn"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="若是,则监护人为">
					  <el-select v-model="add.guardian" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.yn"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form :inline="true">
                  <el-form-item label="是否离异">
					  <el-select v-model="add.divorceParents" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.yn"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="是否再婚">
					  <el-select v-model="add.remarry" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.yn"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form :inline="true">
                  <el-form-item label="是否单亲">
					  <el-select v-model="add.single" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.yn"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="是否再婚">
					  <el-select v-model="add.isRemarry" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.yn"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form-item label="其他情况">
					<el-input v-model="add.otherSituation" auto-complete="off" type="textarea"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addstu=false">关闭</el-button>
                <el-button @click="addx">添加</el-button>
              </div>
            </el-dialog>
            <el-col :span="4">
              <el-input v-model="search" placeholder="请输入搜索内容"></el-input>
            </el-col>
          </el-row>
          <el-tab-pane label="名单表">
            <el-table
              id="table_xlsx"
              :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
              border
              style="width: 100%"
            >
              <el-table-column prop="number" label="学号" width="180"></el-table-column>
              <el-table-column prop="name" label="姓名" sortable width="100"></el-table-column>
              <el-table-column prop="sex" label="性别" width="80"></el-table-column>
              <el-table-column prop="job" label="班内职务" width="150"></el-table-column>
              <el-table-column prop="more" label="更多" width="100">
                <template slot-scope="scope">
                  <el-button type="text" @click="show(scope.row.number)">简介</el-button>
                </template>
              </el-table-column>
              <el-table-column align="right" width="200">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="dlete(scope.row.number)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-dialog title="简介" :visible.sync="dialogVisible">
              <el-form :model="form">
                <h2>基本情况</h2>
                <el-form :inline="true">
                  <el-form-item label="姓名">
                    <el-input v-model="form.basicInfo.name" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="性别">
                    <el-input v-model="form.basicInfo.sex" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="出生年月">
                    <el-input v-model="form.basicInfo.birthday" auto-complete="off"></el-input>
                  </el-form-item>
                </el-form>
                <el-form :inline="true">
                  <el-form-item label="曾用名">
                    <el-input v-model="form.basicInfo.formerName" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="民族">
                    <el-input v-model="form.basicInfo.ethnicity" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="联系电话">
                    <el-input v-model="form.basicInfo.contactPhone" auto-complete="off"></el-input>
                  </el-form-item>
                </el-form>
                <el-form :inline="true">
                  <el-form-item label="籍贯">
                    <el-input v-model="form.basicInfo.nativePlace" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="有何特长">
                    <el-input v-model="form.basicInfo.skill" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="监护人联系电话">
                    <el-input v-model="form.basicInfo.guradianPhone" auto-complete="off"></el-input>
                  </el-form-item>
                </el-form>
                <el-form>
                  <el-form-item label="家庭住址">
                    <el-input v-model="form.basicInfo.homePlace" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="现住住址">
                    <el-input v-model="form.basicInfo.place" auto-complete="off"></el-input>
                  </el-form-item>
                </el-form>
                <h2>家庭情况</h2>
                <el-form>
                  <el-form-item label="姓名" size="large">
                    <el-input v-model="form.studentId" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="与本人关系">
                    <el-input v-model="form.relationship" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="工作单位">
                    <el-input v-model="form.company" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="职务">
                    <el-input v-model="form.job" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="工作单位">
                    <el-input v-model="form.company" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="是否留守">
					  <el-select v-model="form.family.isLeftBehind" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.yn"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="若是,则监护人为">
					  <el-select v-model="form.family.guardian" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.yn"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form :inline="true">
                  <el-form-item label="是否离异">
					  <el-select v-model="form.family.divorceParents" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.yn"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="是否再婚">
					  <el-select v-model="form.family.remarry" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.yn"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form :inline="true">
                  <el-form-item label="是否单亲">
					  <el-select v-model="form.family.single" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.yn"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="是否再婚">
					  <el-select v-model="form.family.isRemarry" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.yn"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="其他情况">
                    <el-input v-model="form.family.otherSituation" auto-complete="off"></el-input>
                  </el-form-item>
                </el-form>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible=false">关闭</el-button>
                <el-button @click="modify">修改</el-button>
              </div>
            </el-dialog>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: "BasicInform",
  data() {
    return {
      dialogFormVisible: false,
      sss: "",
      form: { basicInfo: {}, family: {} },
      add: {
        studentId: "",
        name: "",
        seatNumber: "",
        telephone: " ",
        QQ: "",
        grade: "",
        classNumber: "",
        classId: "",
        familyName: " ",
        place: "",
        familyPhone: "",
        sex: "",
        birthday: "",
        formerName: "",
        ethnicity: "",
        contactPhone: "",
        nativePlace: "",
        skill: "",
        guradianPhone: "",
        homePlace: "",
        isLeftBehind: "",
        guardian: "",
        divorceParents: "",
        remarry: "",
        single: "",
        isRemarry: "",
        otherSituation: ""
      },
      add2: {
        teacherId: "",
        password: "",
        name: "",
        birthday: "",
        phoneNumber: ""
      },
      options: [{ value: 0, sex: "男" ,yn:"否"}, { value: 1, sex: "女",yn:"是" }],
      tableData: [],
      doit: [],
      dialogVisible: false,
      addstu: false,
      search: "",
      claa: { id: "", oo: {} },
      addteacher: false
    };
  },
  created() {
    let self = this;
    self.doit = self.$route.params.cls;
  },
  methods: {
    async getmm(id, oo) {
      var _this = this;
      this.$http
        .post("getStudentByClassId/", { classId: id })
        .then(function(Response) {
          console.log(Response.data);
          _this.tableData = [];
          for (var k in Response.data.students) {
            var pp = { number: "", name: "", sex: "", job: "" };
            pp.number = Response.data.students[k].pk;
            pp.name = Response.data.students[k].fields.name;
            if (Response.data.students[k].fields.sex) {
              pp.sex = "女";
            } else {
              pp.sex = "男";
            }
            if (oo.monitor == pp.number) {
              pp.job = "班长";
            }
            if (oo.monitor == pp.number) {
              pp.job = "班长";
            }
            if (oo.viceMonitor == pp.number) {
              pp.job = "副班长";
            }
            if (oo.study == pp.number) {
              pp.job = "学习委员";
            }
            if (oo.sport == pp.number) {
              pp.job = "体育委员";
            }
            if (oo.physicalLabor == pp.number) {
              pp.job = "劳动委员";
            }
            console.log(pp);
            _this.tableData.push(pp);
          }
        });
    },
    handleSelect(key, keyPath) {
      this.xxx = "高" + key.fields.grade + "(" + key.fields.classNumber + ")班";
      this.sss = key.fields.headMaster;
      this.add.classId = key.pk;
      this.claa.id = key.pk;
      this.claa.oo = key.fields;
      this.getmm(key.pk, key.fields);
    },
    show(row) {
      var _this = this;
      this.$http
        .post("checkETable/", { studentId: row })
        .then(function(Response) {
          console.log(Response.data);
		  _this.form = Response.data;
		  if (_this.form.basicInfo.sex) {
							_this.form.basicInfo.sex = '女';
						} else {
							_this.form.basicInfo.sex = '男';
						}
        });
      this.dialogVisible = true;
    },
    jump() {
      this.addstu = true;
    },
    jump2() {
      this.addteacher = true;
    },
    addx() {
      var _this = this;
      this.$http.post("addStudent/", _this.add).then(function(Response) {
		console.log(Response.data);
		_this.getmm(_this.claa.id, _this.claa.oo);
      });
      this.addstu = false;
    },
    dlete(id) {
      console.log(this.tableData);
      var _this = this;
      this.$confirm("是否确认删除该学生?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("deleteStudent/", { studentId: id })
            .then(function(Response) {
              console.log(Response.data);
              _this.getmm(_this.claa.id, _this.claa.oo);
            });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style>
</style>
