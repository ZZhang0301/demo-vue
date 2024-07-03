<template>
    <div ref="chart" class="chart"></div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import * as echarts from 'echarts';
  
  const chart = ref(null);
  
  onMounted(() => {
    const myChart = echarts.init(chart.value);
  
    const option = {
      title: {
        // text: 'World Population'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
      },
      series: [
        {
          name: '2011',
          type: 'bar',
          data: [18203, 23489, 29034, 104970, 131744, 630230]
        },
        {
          name: '2012',
          type: 'bar',
          data: [19325, 23438, 31000, 121594, 134141, 681807]
        }
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
  