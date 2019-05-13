<template>
    <div>
        <el-row>
           		教师姓名： <el-input  placeholder="根据教师姓名模糊查询" clearable style="width:200px"></el-input>
          		教师账号： <el-input  placeholder="根据教师账号模糊查询" clearable style="width:200px"></el-input>
           		<el-button type="primary"  icon="el-icon-search">查询</el-button>
               <el-button type="success" icon="el-icon-circle-plus-outline" @click="openAddTeacherDialog = true">新增</el-button>
               <!-- 新增教师信息窗口-->
                      <el-dialog title='新增教师信息' :visible.sync="openAddTeacherDialog">
                        <el-form :model="Teacher">
                          <el-form-item label="教师姓名">
                              <el-input v-model="Teacher.name" autocomplete="off"></el-input>
                          </el-form-item>
                          <el-form-item label="教师账号">
                              <el-input v-model="Teacher.cardNo" autocomplete="off"></el-input>
                          </el-form-item>
                          <el-form-item label="教师密码">
                              <el-input v-model="Teacher.password" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="openAddTeacherDialog = false">取消</el-button>
                        <el-button  type="success" icon="el-icon-circle-plus-outline" @click="submitAddTeacher" >提交</el-button>
           		        </div>
                    </el-dialog>
              <!-- 修改教师信息窗口-->
                    <el-dialog title='修改教师信息' :visible.sync="openUpdateTeacherDialog">
                        <el-form :model="selectedTeacher">
                          <el-form-item label="教师姓名">
                              <el-input v-model="selectedTeacher.name" autocomplete="off"></el-input>
                          </el-form-item>
                          <el-form-item label="教师账号">
                              <el-input v-model="selectedTeacher.cardNo" autocomplete="off"></el-input>
                          </el-form-item>
                          <el-form-item label="教师密码">
                              <el-input v-model="selectedTeacher.password" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="openUpdateTeacherDialog = false">取消</el-button>
                        <el-button  type="success" icon="el-icon-circle-plus-outline" @click="submitUpdateTeacher" >提交</el-button>
           		        </div>
                    </el-dialog>
                      
         </el-row>
      <el-table :data="teacherData" style="width: 100%;height:100">
                <el-table-column prop="name" label="教师姓名" width="100" > </el-table-column>
                <el-table-column prop="cardNo" label="账号" width="200" align="center"> </el-table-column>
                <el-table-column prop="password" label="密码" width="200" align="center"></el-table-column>           
                <el-table-column label="操作" width="100" align="center"> 
                  <template slot-scope="scope">
              		   <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteTeacherById(scope.row)">删除</el-button>
			            </template>
                </el-table-column> 
                <el-table-column label="操作" width="100" align="center"> 
                  <template slot-scope="scope">
              		   <el-button size="mini" type="warning" icon="el-icon-edit" @click="updateTeacher(scope.row)">修改</el-button>
			            </template>
                </el-table-column> 
        </el-table>          
    </div>
 </template>
<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                teacherData:[],
                openAddTeacherDialog:false,
                openUpdateTeacherDialog:false,
                Teacher:{
                  name: '',
                  cardNo:'',
                  password: ''
                },
                selectedTeacher:{
                  name: '',
                  cardNo: '',
                  password:''
                }
            }
        },
       
        created: function(){
            this.queryAllTeacher()
        },
        methods:{
          //查询所有教师信息
            queryAllTeacher(){
                var that = this
               this.$http.get('teacher/findAllTeacher',{
                })
                .then(function (response) {
            
                   
                   console.log(response.data)
                    that.teacherData = response.data
                    console.log(that.teacherData)
                  
                })
                .catch(function (error) {
                  console.log(error);
                 });
            },
            //删除教师信息
           deleteTeacherById(row){
               var that = this
               
               this.$http.get('teacher/deleteTeacherById?teacherId='+row.id,{
                })
                .then(function (response) {
                    console.log(response);
                    
                    that.queryAllTeacher()
                
                })
                .catch(function (error) {
                  console.log(error);
                 });
            },
           //提交新增信息
        submitAddTeacher(){
         var that = this;
        	if(!that.Teacher.name || !that.Teacher.cardNo || !that.Teacher.password){
        		that.$message({message:'请补全信息',type:'waring'});
        		return;
          }
          	that.loading = true;
        	var data = that.Teacher;
          this.$http.post('teacher/addTeacher',{
                    name: that.Teacher.name,
                    cardNo: that.Teacher.cardNo,
                    password: that.Teacher.password

                }).then((response) =>{
                  console.log(response)
                  that.Teacher = {};
                  that.openAddTeacherDialog = false
                  that.queryAllTeacher()
                })
               
        },
        //提交修改信息
        submitUpdateTeacher(){
          var that = this
          if(!that.selectedTeacher.name || !that.selectedTeacher.cardNo || !that.selectedTeacher.password){
        		that.$message({message:'请补全信息',type:'waring'});
        		return;
        	}
           this.$http.post('teacher/updateTeacher',{
                    name: that.selectedTeacher.name,
                    cardNo: that.selectedTeacher.cardNo,
                    password: that.selectedTeacher.password,
                    id: that.selectedTeacher.id

                }).then((response) =>{
                  console.log(response)
                  that.openUpdateTeacherDialog = false
                  that.queryAllTeacher()
                })
        },
        //修改教师信息
        updateTeacher(teacher){
         var that=this
         that.openUpdateTeacherDialog = true
        that.selectedTeacher = teacher 
        }
        }  
    }
</script>
 