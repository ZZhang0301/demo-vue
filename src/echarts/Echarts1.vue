<template>
    <div ref="chart" class="chart"></div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import * as echarts from 'echarts';
  
  const chart = ref(null);
  
  onMounted(() => {
    const chartDom = chart.value;
    const myChart = echarts.init(chartDom);
  
    const option = {
      title: {
        // text: 'Stacked Line'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Email', 'Union Ads', 'Video Ads', ]
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'Total',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
      ]
    };
  
    myChart.setOption(option);
  
    // Resize chart with window resize (optional)
    window.addEventListener('resize', () => {
      myChart.resize();
    });
  
  });
  </script>
  
  <style scoped>
  .chart {
    width: 100%;
    height: 100%;
  }
  </style>
  