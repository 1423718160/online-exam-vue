<template>
    <div>
        <el-dialog title="考试须知" :visible.sync="showTags">
            考试时间为120分钟，到时自动交卷，可提前交卷，选择题答完点击提交后不可二次进入。
            选择题分值5分（12题），编程题40分（1题）。
        </el-dialog>
        <p>倒计时：{{h}}:{{m}}:{{s}}</p>
        <el-table :data="questionsData" v-show="showSingleForm" style="width: 95%;height: 200%">
                <el-table-column prop="question" label="选择题" width="700" > </el-table-column>
                <el-table-column prop="optionA" label="A" width="250" align="left"> </el-table-column>
                <el-table-column prop="optionB" label="B" width="250" align="left"></el-table-column>           
                <el-table-column prop="optionC" label="C" width="250" align="left"></el-table-column> 
                <el-table-column prop="optionD" label="D" width="250" align="left"></el-table-column>
                <el-table-column prop="score" label="答案" width="180" align="left">
                    <template slot-scope="scope">
              		   <select v-model="scope.row.score">
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>
                    </select>
                   </template>
                </el-table-column> 
                   
              </el-table>
                 <el-button type="success" @click="submitSingleQuestions()"  icon="el-icon-circle-plus-outline" >交卷</el-button>
              <el-table :data="questionsDataPro" v-show="showForm" style="width: 95%;height: 200%">
                <el-table-column prop="question" label="编程题" width="200" > </el-table-column>
               
                <el-table-column prop="answer" label="答案" width="800" align="center">
                    <template>
                        <textarea :rows="10" plac eholder="请作答" v-model="proContent"></textarea>
                   </template>
                </el-table-column> 
                <el-table-column label="操作" width="100" align="center"> 
                  <template>
              		<el-button size="mini" type="sucess"  @click="runProgrameQuestion()">运行</el-button>
			      </template>
                </el-table-column>
                <el-table-column prop="answer" label="运行结果" width="800" align="center">
                    <template>
                       <textarea :rows="10" placeholder="运行结果" v-model="resultContent"> </textarea>
                   </template>
                </el-table-column>  
               
              </el-table>
               <el-button type="success" @click="submitQuestions()"  icon="el-icon-circle-plus-outline" >交卷</el-button>
    </div>
</template>




<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                questionsData:[],
                questionsDataPro:[],
                questionResult:[],
                showSingleForm:true,
                showForm:true,
                
                proContent:'',
                resultContent:'',
                h:null,
                m:null,
                s:null,
                showTags:true
        }
            
        },

        created: function(){
            this.initQuestionsSingle();
            this.initQuestionsPro();
            this.countTime();
        },
        watch(){

        },
        methods:{
           initQuestionsSingle(){
               console.log('开始随机出题(单选)')
               var that = this
               this.$http.post('questions/randomQuestionById',{
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
           initQuestionsPro(){
               console.log('开始随机出题(编程)')
               var that = this
               this.$http.post('questions/randomQuestionProgram',{
                })
                .then(function (response) {
                    console.log(response.data)
                    that.questionsDataPro = response.data
                    console.log(that.questionsDataPro)
                })
                .catch(function (error) {
                  console.log(error);
                 });
           },
            submitQuestions(){
                var that = this;
                var questionsDataPro = that.questionsDataPro
                that.showForm = false
            },
           submitSingleQuestions(){
                var that = this;
                var questionsData = that.questionsData
                that.showSingleForm = false
                
                //封装答案
               //给分
               var total = 0;
                for(var i = 0;i<that.questionsData.length;i++){
                    if(questionsData[i].answer==questionsData[i].score)
                        total = total + 5
                }
                console.log('成绩'+total)



                this.$http.post('questions/saveSelectResult?userId=1&&selectResult='+total,{
                   

                }).then((response) =>{
                  console.log(response)
                   
                })
               
        },
        runProgrameQuestion()
        {
            var that = this
            console.log()
            this.$http.post('questions/executeProgramFile?content='+encodeURIComponent(encodeURIComponent(that.proContent)),{
                   

                }).then((response) =>{
                  that.resultContent = response.data
                   
                })

        },
        countTime(){
            var that = this
            if(that.h==0&&that.m==0&&that.s==0){
                //执行提交的方法
                that.submitSingleQuestions();
                that.runProgrameQuestion();
                that.submitQuestions();
            }
            //获取当前时间
                var date = new Date();
                var now = date.getTime();
                //设置截止时间
                var endDate = new Date("2019-6-13 14:02:23");
                //var endDate = new Date(new Date().getTime()+2*3600*1000);
                var end = endDate.getTime();
                //时间差
                var leftTime = end - now;
                var h;
                var m;
                var s;
                var d;
                //定义变量 d,h,m,s保存倒计时的时间
                if (leftTime >= 0) {
                    d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
                    that.h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
                    that.m = Math.floor(leftTime / 1000 / 60 % 60);
                    that.s = Math.floor(leftTime / 1000 % 60);
                }
                console.log(that.h+":"+that.m+":"+that.s);
                //递归每秒调用countTime方法，显示动态时间效果
                setTimeout(this.countTime, 1000);
        }
           }
            
        }
     
    
</script>

<style>
    @import "main.css";
    @import "test.css";
</style>

