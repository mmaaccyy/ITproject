<template>
	<el-container>
		<el-aside width="300px">
			<el-menu default-active="" class="el-menu-vertical-demo" @open="handleOpen" @select="handleSelect" @close="handleClose">
				<el-menu-item v-for="(dot , index) in doit" :index="dot" :key="index">
					高{{dot.fields.grade}}({{dot.fields.classNumber}})班
				</el-menu-item>
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
						<el-col :span="6">
							<el-tooltip class="item" effect="dark" content="添加教师" placement="top">
								<el-button @click="jump2" icon="el-icon-plus" type="primary" circle></el-button>
							</el-tooltip>
						</el-col>
						<el-dialog title="添加教师" :visible.sync="addteacher">
							<el-form :model="add2">
								<el-form :inline="true" :model="add2" ref="add2">
									<el-form-item label="姓名">
										<el-input v-model="add2.name" auto-complete="off"></el-input>
									</el-form-item>
									<el-form-item label="性别">
										<el-select v-model="add2.sex" placeholder="请选择">
                      					<el-option
										  v-for="item in options"
										  :key="item.value"
										  :label="item.sex"
										  :value="item.value"
										  ></el-option>
										  </el-select>
									</el-form-item>
									<el-form-item 
									prop="phone"
									:rules="[
									{ required: true, message: '请输入电话', trigger: 'blur' },
									{ min: 6, max: 11, message: '格式不正确', trigger: 'blur' }]"
									label="手机">
										<el-input v-model="add2.phone" auto-complete="off"></el-input>
									</el-form-item>
									<el-form-item label="密码">
										<el-input v-model="add2.password" auto-complete="off"></el-input>
									</el-form-item>
									<el-form-item label="工号">
										<el-input v-model="add2.id" auto-complete="off"></el-input>
									</el-form-item>
								</el-form>
							</el-form>
							<div slot="footer" class="dialog-footer">
								<el-button @click="addteacher=false">关闭</el-button>
								<el-button @click="addx2">添加</el-button>
							</div>
						</el-dialog>
						<el-col :span="4">
							<el-input v-model="search" placeholder="请输入搜索内容"></el-input>
						</el-col>
					</el-row>
					<el-tab-pane label="名单表">
						<el-table id="table_xlsx" :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
						 border style="width: 100%">
							<el-table-column prop="teacherId" label="工号" width="180">
								<!-- <template slot-scope="scope">
									<a href="javascript:;">{{scope.row.teacherId}}</a>
								</template> -->
							</el-table-column>
							<el-table-column prop="name" label="姓名" sortable width="100">
							</el-table-column>
							<el-table-column prop="sex" label="性别" width="80">
							</el-table-column>
							<el-table-column prop="phoneNumber" label="手机号码" width="150">
							</el-table-column>
							<el-table-column prop="password" label="密码" width="150">
							</el-table-column>
							<el-table-column prop="more" label="更多" width="100">
								<template slot-scope="scope">
									<el-button type="text" @click='show(scope.row)'>修改</el-button>
								</template>
							</el-table-column>
							<el-table-column align="right" width="200">
								<template slot-scope="scope">
									<el-button size="mini" type="danger" @click='dlete(scope.row.teacherId)'>删除</el-button>
								</template>
							</el-table-column>
						</el-table>

						<el-dialog title="修改信息" :visible.sync="dialogVisible">
							<el-form :model="form">
								<el-form :inline="true">
									<el-form-item label="姓名">
										<el-input v-model="form.name" auto-complete="off"></el-input>
									</el-form-item>
									<el-form-item label="性别">
										<el-select v-model="form.sex" placeholder="请选择">
                      					<el-option
										  v-for="item in options"
										  :key="item.value"
										  :label="item.sex"
										  :value="item.value"
										  ></el-option>
										  </el-select>
									</el-form-item>
									<el-form-item label="手机">
										<el-input v-model="form.phoneNumber" auto-complete="off"></el-input>
									</el-form-item>
								</el-form>
								<el-form :inline="true">
									<el-form-item label="工号">
										<el-input v-model="form.teacherId" auto-complete="off"></el-input>
									</el-form-item>
									<el-form-item label="密码">
										<el-input v-model="form.password" auto-complete="off"></el-input>
									</el-form-item>
								</el-form>
							</el-form>
							<div slot="footer" class="dialog-footer">
								<el-button @click="dialogVisible=false">关闭</el-button>
								<el-button @click="modify" type="primary" plain>修改</el-button>
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
		name: 'TeacherInform',
		data() {
			return {
				dialogFormVisible: false,
				sss: "",
				form: {
				},
				add2: {
					id: '',
					password: '',
					name: '',
					sex: '',
					phone: ''
				},
				tableData: [],
				doit: [],
				dialogVisible: false,
				addstu: false,
				search: '',
				addteacher: false,
				options: [{ value: 0, sex: "男"}, { value: 1, sex: "女"}],
				
			}
		},
		created() {
			let self = this;
			this.getmm();
			self.doit = self.$route.params.cls;
		},
		methods: {
			async getmm() {
				var _this = this;
				this.$http.get("getTeacher/", {
				}).then(function(Response) {
					console.log(Response.data);
					_this.tableData = [];
					for (var k in Response.data.teachers) {
						var pp = {
							teacherId: '',
							name: '',
							password: '',
							phoneNumber: '',
							sex:''
						};
						pp.teacherId = Response.data.teachers[k].pk;
						pp.name = Response.data.teachers[k].fields.name;
						pp.password=Response.data.teachers[k].fields.password;
						pp.phoneNumber=Response.data.teachers[k].fields.phone;
						if (Response.data.teachers[k].fields.sex) {
							pp.sex = '女';
						} else {
							pp.sex = '男';
						}
						_this.tableData.push(pp);
					}
				});
			},

			show(row) {
				console.log(row);
				
				this.form=row;
				this.dialogVisible = true;
			},
			modify(){
				var change={id:this.form.teacherId,password:this.form.password,name:this.form.name,sex:this.form.sex,phone:this.form.phoneNumber};
						console.log(change);
						var _this=this;
				this.$http.post("fixTeacherIntro/", change).then(function(Response){
					console.log(Response.data);
					if(Response.data.status){
						_this.$message({
            			type: 'success',
           			 	message: '修改成功!'
						  });
						_this.getmm();
					}else{
						_this.$message({
            			type: 'warning',
           			 	message: '修改失败'
						});
					}
				});
				this.dialogVisible = false;
			},
			jump2() {
				this.addteacher = true;
			},
			addx2() {
				var _this = this;
				this.$http.post("addTeacher/", _this.add2).then(function(Response) {
					console.log(Response.data);
					_this.getmm();
				});
				this.add2={};
				this.addteacher = false;
			},
			dlete(id) {
				console.log(this.tableData);
				var _this=this;
				this.$confirm('是否确认删除该教师?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					console.log(id);
					this.$http.post("deleteTeacher/", {
						id: id
					}).then(function(Response) {
						console.log(Response.data);
						if(Response.data.status){
						_this.$message({
            			type: 'success',
           			 	message: '删除成功!'
						  });
						_this.getmm();
						
					}else{
						_this.$message({
            			type: 'warning',
           			 	message: '删除失败'
						});
					}
					});
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
<style>

</style>
