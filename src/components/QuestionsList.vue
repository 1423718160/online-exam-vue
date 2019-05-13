
<template>
    <div>
       <el-row>
           		题目类型： <el-input  clearable style="width:200px"></el-input>
           		<el-button type="primary"   icon="el-icon-search">查询</el-button>
                  <el-button type="success" icon="el-icon-circle-plus-outline" @click="openAddQuesDialog = true">新增</el-button>
               <!-- 新增试题信息窗口-->
                      <el-dialog title='新增试题信息' :visible.sync="openAddQuesDialog">
                        <el-form :model="Ques">
                          <el-form-item label="问题">
                              <el-input v-model="Ques.question" autocomplete="off"></el-input>
                          </el-form-item>
                          <el-form-item label="选项A">
                              <el-input v-model="Ques.optionA" autocomplete="off"></el-input>
                          </el-form-item>
                           <el-form-item label="选项B">
                              <el-input v-model="Ques.optionB" autocomplete="off"></el-input>
                          </el-form-item>
                           <el-form-item label="选项C">
                              <el-input v-model="Ques.optionC" autocomplete="off"></el-input>
                          </el-form-item>
                           <el-form-item label="选项D">
                              <el-input v-model="Ques.optionD" autocomplete="off"></el-input>
                          </el-form-item>
                           <el-form-item label="答案">
                              <el-input v-model="Ques.answer" autocomplete="off"></el-input>
                          </el-form-item>
                           <!--<el-form-item label="类型">
                              <el-input placeholder="“单选”或者“简答”" v-model="Ques.type" autocomplete="off"></el-input>
                          </el-form-item>-->
                          <el-form-item label="类型">
                           <el-select  v-model="Ques.type">
                          <el-option v-for="item in options" :label="item.text" :key="item.value" :value="item.value"></el-option>
                           </el-select>
                          </el-form-item>
                          <el-form-item label="分值">
                              <el-select  v-model="Ques.score">
                              <el-option placeholder="单选5分，简答40分" v-for="item in options1" :label="item.text" :key="item.value" :value="item.value"></el-option>
                          </el-select>
                          </el-form-item>
                        </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="openAddQuesDialog = false">取消</el-button>
                        <el-button  type="success" icon="el-icon-circle-plus-outline" @click="submitAddQues" >提交</el-button>
           		        </div>
                    </el-dialog>
             
           	</el-row>
        <el-table :data="questionsData" style="width: 95%;height: 200%">
                <el-table-column prop="question" label="问题" width="200" > </el-table-column>
                <el-table-column prop="optionA" label="选项A" width="100" align="center"> </el-table-column>
                <el-table-column prop="optionB" label="选项B" width="100" align="center"></el-table-column>           
                <el-table-column prop="optionC" label="选项C" width="100" align="center"></el-table-column> 
                <el-table-column prop="optionD" label="选项D" width="100" align="center"></el-table-column>
                <el-table-column prop="answer" label="答案" width="200" align="center"></el-table-column> 
                <el-table-column prop="type" label="类型" width="50" align="center"> </el-table-column> 
                <el-table-column prop="score" label="分值" width="50" align="center"> </el-table-column> 
                <el-table-column label="操作" width="100" align="center"> 
                  <template slot-scope="scope">
              		<el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteQuestionById(scope.row)">删除</el-button>
			      </template>
                </el-table-column> 
              </el-table>

    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data(){
            return {
               
            options:[
            {value:"单选",text:"单选"},
            {value:"简答",text:"简答"}
            ],
             options1 :[
            {value:"5",text:"5"},
            {value:"40",text:"40"}
            ],              

        
                questionsData:[],
                openAddQuesDialog:false,
                Ques:{
                  question: '',
                  optionA:'',
                  optionB:'',
                  optionC:'',
                  optionD:'',
                  answer:'',
                  type:'',
                  score:''
                },
            }
        },
        created: function(){
            this.queryAllQuestions()
        },
        methods:{
            queryAllQuestions(){
                var that = this
               this.$http.get('questions/findAllQuestion',{
                })
                .then(function (response) {
            
                   
                    console.log(response.data)
                    that.questionsData = response.data
                    console.log(that.questionsData)
                  
                })
                .catch(function (error) {
                  console.log(error);
                 });
            },
            deleteQuestionById(row){
               var that = this
               this.$http.get('questions/deleteQuestionById?questionId='+row.id,{
                })
                .then(function (response) {
                    console.log(response);
                    
                    that.queryAllQuestions()
                  
                })
                .catch(function (error) {
                  console.log(error);
                 });
            },
           //提交新增信息
        submitAddQues(){
         var that = this;
            if(!that.Ques.question ||  !that.Ques.answer || !that.Ques.type || !that.Ques.score){
        		that.$message({message:'请补全信息',type:'waring'});
        		return;
          }
          that.loading = true;
        	var data = that.Ques;
          this.$http.post('questions/addQuestion',{
                    question: that.Ques.question,
                    optionA: that.Ques.optionA,
                    optionB: that.Ques.optionB,
                    optionC: that.Ques.optionC,
                    optionD: that.Ques.optionD,
                    answer: that.Ques.answer,
                    type: that.Ques.type,
                    score: that.Ques.score

                }).then((response) =>{
                  console.log(response)
                   that.Ques = {};
                  that.openAddQuesDialog = false
                  that.queryAllQuestions()
                })
               
        }
        }
    }
</script>
