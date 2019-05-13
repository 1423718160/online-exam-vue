
<template>
    <div>
       <el-row>
           		准考证号： <el-input  placeholder="请输入准考证号" clearable style="width:200px"></el-input>
          			姓名： <el-input  placeholder="根据学生姓名模糊查询" clearable style="width:200px"></el-input>
           		<el-button type="primary"   icon="el-icon-search">查询</el-button>
           		
           	</el-row>
        <el-table :data="resultData" style="width: 67%;height:100">
                <el-table-column prop="name" label="学生姓名" width="100" > </el-table-column>
                <el-table-column prop="stuId" label="准考证号" width="200" align="center"> </el-table-column>
                <el-table-column prop="resSingle" label="单选得分" width="200" align="center"></el-table-column>           
                <el-table-column prop="resProgram" label="简答得分" width="120" align="center"></el-table-column> 
                <el-table-column prop="resTotal" label="总分" width="120" align="center"></el-table-column> 
              </el-table>

             
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                resultData:[]
            }
        },
        created: function(){
            this.queryAllResult()
        },
        methods:{
            queryAllResult(){
                var that = this
               this.$http.get('result/findAllResult',{
                })
                .then(function (response) {
            
                   console.log(response.data)
                    that.resultData = response.data
                    console.log(that.resultData)
                  
                })
                .catch(function (error) {
                  console.log(error);
                 });
            }
            
        }  
    }
</script>
