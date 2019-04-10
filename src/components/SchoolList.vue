<template>
    <div>
        <el-row>
           		高校名称： <el-input v-model="schoolCondition.schoolName" placeholder="根据高校名称模糊查询" clearable style="width:200px"></el-input>
          			高校归属地： <el-input v-model="schoolCondition.schoolLocation" placeholder="根据高校归属地模糊查询" clearable style="width:200px"></el-input>
           		<el-button type="primary"  @click="queryAllSchoolWithCondition" icon="el-icon-search">查询</el-button>
           		
           	</el-row>
      <el-table :data="schoolDatas" style="width: 60%;height:100">
                <el-table-column prop="name" label="高校名称" width="300" > </el-table-column>
                <el-table-column prop="location" label="高校所在地" width="100" align="center"> </el-table-column>
                <el-table-column prop="type" label="高校类型" width="150" align="center"> </el-table-column>
                <el-table-column label="操作" width="200" align="center"> 
                <template slot-scope="scope">
              		<el-button size="mini" type="primary" @click="openSchoolInfoConsole(scope.row)">查看就业情况</el-button>
              		<el-button size="mini" type="danger" @click="deleteSchool(scope.row)">删除</el-button>
			 </template>
              </el-table-column> 
              </el-table>
              <!-- 员工列表分页信息 -->
              <el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="schoolPage.currentPage"
			      :page-sizes="[25, 50, 100, 150, 200]"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="schoolPage.total">
		    </el-pagination>
    </div>
</template>
<script type="text/ecmascript-6">
     export default {
        data() {
            return {
                total: 0,
                currentPage: 1,
　　　　　　　　　 pageSize: 10,
                schoolDatas: [],
                multipleSelection: [],
                schoolCondition: {
                    schoolName: "",
                    schoolLocation: ""
                },
                schoolPage:{
                    currentPage: 1,
                    total: 0,
                    pageSize: 50
                }
            }
        },
        created: function(){
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了 
            this.queryAllSchoolWithCondition()

        },
        methods: {
            //根据分页条件和模糊查询去获取全部数据
           queryAllSchoolWithCondition(){
               var that = this
               this.$http.post('school/findAllSchoolsWithPageCondition',{
                       schoolLocation: that.schoolCondition.schoolLocation,
                       schoolName: that.schoolCondition.schoolName,
                       currentPage:that.schoolPage.currentPage,
        			   pageSize:that.schoolPage.pageSize
                })
                .then(function (response) {
                   that.schoolDatas = response.data.schoolData
                   that.schoolPage.total = response.data.total
                })
                .catch(function (error) {
                  console.log(error);
                 });
               
           },
           //分页条件改变时
            handleSizeChange(val){
             this.schoolPage.pageSize = val;
             this.queryAllSchoolWithCondition();
            },
            handleCurrentChange(val){
             this.schoolPage.currentPage = val;
             this.queryAllSchoolWithCondition()
            },
            //根据高校名称删除高校数据。
            deleteSchool(school)
            {
               alert(school.name)
            },
            openSchoolInfoConsole(school)
            {
                alert(school.name)
            }
    }
}
</script>

<style>
    .el-table th {
        text-align: center;
    }

    .el-table tbody tr td:first-child {
        text-align: center;
    }
</style>