<template>
  <div id="echarts"></div>
</template>

<script>
import * as echarts from "echarts";
import request from '../axiosconfig/axios-login'
export default {
  data() {
    return {
      option: {
        xAxis: {
          type: "category",
          data: ["用户总数", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 20, 15, 8, 7, 11, 13],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      },
    };
  },
  methods:{
    changeOptions(){
      request.get('/getTotalUser').then(res=>{
          this.option.series[0].data[0]=res.data[0].totaluser
          this.setEcharts()
        })
    },   
    setEcharts(){
    var chartDom = document.getElementById("echarts");
    var myChart = echarts.init(chartDom);
     myChart.setOption(this.option);
     myChart.resize()
      }
  },
  mounted() {
    this.changeOptions()
  },
};
</script>

<style lang="less" scoped>
#echarts {
  width: 100%;
  height: 100%;
}
</style>