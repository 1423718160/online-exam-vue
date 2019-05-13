<template>
    <div>
        <el-row>
           		学生姓名： <el-input  placeholder="根据学生姓名模糊查询" clearable style="width:200px"></el-input>
          			学生准考证号： <el-input  placeholder="根据学生准考证模糊查询" clearable style="width:200px"></el-input>
           		<el-button type="primary"  icon="el-icon-search">查询</el-button>
           		<el-button type="success" icon="el-icon-circle-plus-outline"  @click="openAddStudentDialog = true">增加</el-button>
                    <!-- 新增学生信息窗口-->
                      <el-dialog title='新增学生信息' :visible.sync="openAddStudentDialog">
                        <el-form :model="Student" >
                          <el-form-item label="学生姓名">
                              <el-input v-model="Student.name" autocomplete="off"></el-input>
                          </el-form-item>
                          <el-form-item label="准考证号">
                              <el-input v-model="Student.stuId" autocomplete="off"></el-input>
                          </el-form-item>
                          <el-form-item label="身份证号" >
                              <el-input v-model="Student.stuCardNo" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="openAddStudentDialog = false">取消</el-button>
                        <el-button  type="success" icon="el-icon-circle-plus-outline" @click="submitAddStudent" >提交</el-button>
           		        </div>
                    </el-dialog>
              <!-- 修改学生信息窗口-->
                    <el-dialog title='修改学生信息' :visible.sync="openUpdateStudentDialog">
                        <el-form :model="selectedStudent">
                          <el-form-item label="学生姓名">
                              <el-input v-model="selectedStudent.name" autocomplete="off"></el-input>
                          </el-form-item>
                          <el-form-item label="准考证号">
                              <el-input v-model="selectedStudent.stuId" autocomplete="off"></el-input>
                          </el-form-item>
                          <el-form-item label="身份证号">
                              <el-input v-model="selectedStudent.stuCardNo" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="openUpdateStudentDialog = false">取消</el-button>
                        <el-button  type="success" icon="el-icon-circle-plus-outline" @click="submitUpdateStudent" >提交</el-button>
           		        </div>
                    </el-dialog>
           	</el-row>
      <el-table :data="studentData" style="width: 100%;height:100">
                <el-table-column prop="name" label="学生姓名" width="100" > </el-table-column>
                <el-table-column prop="stuId" label="准考证号" width="200" align="center"> </el-table-column>
                <el-table-column prop="stuCardNo" label="身份证号" width="200" align="center"></el-table-column>           
                <el-table-column label="操作" width="100" align="center"> 
                  <template slot-scope="scope">
              		<el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteStudentById(scope.row)">删除</el-button>
			      </template>
                </el-table-column> 
                 <el-table-column label="操作" width="100" align="center"> 
                  <template slot-scope="scope">
              		<el-button size="mini" type="warning" icon="el-icon-edit" @click="updateStudent(scope.row)">修改</el-button>
			      </template>
                </el-table-column> 
              </el-table>
              
    </div>
  </template>
<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                studentData:[],
                 openAddStudentDialog:false,
                openUpdateStudentDialog:false,
                Student:{
                  name: '',
                  stuId:'',
                  stuCardNo: ''
                },
                selectedStudent:{
                  name: '',
                  stuId: '',
                  stuCardNo:''
                }
            }
        },
        created: function(){
            this.queryAllStudent()
        },
        methods:{
            queryAllStudent(){
                var that = this
               this.$http.get('student/findAllStudent',{
                })
                .then(function (response) {
            
                   
                   console.log(response.data)
                    that.studentData = response.data
                    console.log(that.studentData)
                  
                })
                .catch(function (error) {
                  console.log(error);
                 });
            },
            deleteStudentById(row){
               var that = this
               this.$http.get('student/deleteStudentById?studentId='+row.id,{
                })
                .then(function (response) {
                    console.log(response);
                    
                    that.queryAllStudent()
                  
                })
                .catch(function (error) {
                  console.log(error);
                 });
            },
           //提交新增信息
        submitAddStudent(){
         var that = this;
        	if(!that.Student.name || !that.Student.stuId || !that.Student.stuCardNo){
        		that.$message({message:'请补全信息',type:'waring'});
        		return;
          }
          
          	that.loading = true;
        	var data = that.Student;
          this.$http.post('student/addStudent',{
                    name: that.Student.name,
                    stuId: that.Student.stuId,
                    stuCardNo: that.Student.stuCardNo

                }).then((response) =>{
                  console.log(response)
                   that.Student = {};
                  that.openAddStudentDialog = false
                  that.queryAllStudent()
                })
               
        },
        
        //提交修改信息
        submitUpdateStudent(){
          var that = this
          if(!that.selectedStudent.name || !that.selectedStudent.stuId || !that.selectedStudent.stuCardNo){
        		that.$message({message:'请补全信息',type:'waring'});
        		return;
        	}
           this.$http.post('student/updateStudent',{
                    name: that.selectedStudent.name,
                    stuId: that.selectedStudent.stuId,
                    stuCardNo: that.selectedStudent.stuCardNo,
                    id: that.selectedStudent.id

                }).then((response) =>{
                  console.log(response)
                  that.openUpdateStudentDialog = false
                  that.queryAllStudent()
                })
        },
          //修改教师信息
        updateStudent(Student){
         var that=this
         that.openUpdateStudentDialog = true
        that.selectedStudent = Student 
        }
        }  
    }
</script>
 