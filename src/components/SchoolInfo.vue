<template>
    <div>
        <el-button @click="getData">查询</el-button>
      <div id="chart" ref="chart"></div>
    </div>
      
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      voDatas: [
                {name:'上海', value:335},
                {value:310, name:'北京'},
                {value:274, name:'兰州'},
                {value:235, name:'广州'},
                {value:400, name:'深圳'},
                {value:300, name:'武威'}
            ]
    };
  },
  created() {
    },
  mounted() {
    this.$nextTick(() => {     //初始化
      this.getData();
      console.log('在初始化之前VO')
      console.log(this.voDatas)
      this.initChart(); 
      this.getChartData();
      window.addEventListener("resize", () => {
        this.resize();           //监听屏幕大小，来刷新画布
      });
    });
  },
  //监听器
  watch(){
    
    
  },
  methods: {
    //初始化数据
      getData(){
          console.log('从后端获取数据')
          console.log('前端原先的值'+this.voDatas)
           let that = this
               this.$http.post('school/getSchoolVOBySchoolName?schoolName=兰州理工大学',{
                 
                })
                .then(function (response) {
                  //  console.log(response.data.provinceDistribute)
                  let provinceDistribute = response.data.provinceDistribute
                  let seriesData = []
                  for(var p in provinceDistribute){
                    let outObj = {
                      name:p,
                      value:provinceDistribute[p]
                    }
                    seriesData.push(outObj)
                  }
                 console.log('有啥不一样')
                 console.log(seriesData)
                 
                 console.log(that.voDatas)
                })
                .catch(function (error) {
                  console.log(error);
                 });
      },

    //查询图表数据  动态的改变数据
    getChartData() {
      this.chart.hideLoading();
    },
    //初始化图表
    initChart() {
      let option = {
        tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:this.voDatas
        }
    ]
      };

      this.chart = echarts.init(this.$refs.chart);   //定义
      this.chart.showLoading();  //等待的显示
      this.chart.setOption(option);  //展示
      this.chart.resize(); //刷新画布
    },
    resize() {
      if (this.chart) {
        this.chart.resize();
      }
    }
  },
  computed: {},
  watch: {}
};
</script>
<style scoped>
#chart {
  width: 30%;
  height: 400px;
}
</style>
