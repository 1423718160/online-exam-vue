
<template>
    <div>
       <el-row>
           		准考证号： <el-input  placeholder="请输入准考证号" clearable style="width:200px"></el-input>
          			姓名： <el-input  placeholder="根据学生姓名模糊查询" clearable style="width:200px"></el-input>
           		<el-button type="primary"   icon="el-icon-search">查询</el-button>
           		
           	</el-row>
        <el-table :data="pageData" style="width: 100%;height:100%">
                <el-table-column prop="stuId" label="准考证号" width="100" align="center"> </el-table-column>
                <el-table-column prop="name" label="学生姓名" width="100" align="center"> </el-table-column>
                <el-table-column prop="question" label="问题" width="200" align="center"> </el-table-column>
                <el-table-column prop="optionA" label="选项A" width="100" align="center"> </el-table-column>
                <el-table-column prop="optionB" label="选项B" width="100" align="center"></el-table-column>           
                <el-table-column prop="optionC" label="选项C" width="100" align="center"></el-table-column> 
                <el-table-column prop="optionD" label="选项D" width="100" align="center"></el-table-column>
                <el-table-column prop="answer" label="答案" width="120" align="center"></el-table-column>
                <el-table-column prop="subTime" :formatter="formatTime" label="提交时间"  width="120" align="center"></el-table-column>
              </el-table>

             
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                pageData:[]
            }
        },
        created: function(){
            this.queryAllPage()
        },
        methods:{
            queryAllPage(){
                var that = this
               this.$http.get('page/findAllPage',{
                })
                .then(function (response) {
            
                   console.log(response.data)
                    that.pageData = response.data
                    console.log(that.pageData)
                  
                })
                .catch(function (error) {
                  console.log(error);
                 });
            },  
            //设置提交时间展示格式
            formatTime(row, column) {
               const date = new Date(row[column.property])
               return date.getFullYear() + '年' +
               date.getMonth() + '月' +
               date.getDate() + '日 ' +
               date.getHours() + ':' +
             date.getMinutes()
            }
            
        }
     
    }
</script>
