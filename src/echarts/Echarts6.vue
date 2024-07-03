<template>
    <div ref="chartDom" class="chart"></div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import * as echarts from 'echarts';
  
  const chartDom = ref(null);
  
  const option = {
    graphic: {
      elements: [
        {
          type: 'group',
          left: 'center',
          top: 'center',
          children: new Array(7).fill(0).map((val, i) => ({
            type: 'rect',
            x: i * 20,
            shape: {
              x: 0,
              y: -40,
              width: 10,
              height: 80
            },
            style: {
              fill: '#5470c6'
            },
            keyframeAnimation: {
              duration: 1000,
              delay: i * 200,
              loop: true,
              keyframes: [
                {
                  percent: 0.5,
                  scaleY: 0.3,
                  easing: 'cubicIn'
                },
                {
                  percent: 1,
                  scaleY: 1,
                  easing: 'cubicOut'
                }
              ]
            }
          }))
        }
      ]
    }
  };
  
  let myChart;
  
  onMounted(() => {
    myChart = echarts.init(chartDom.value);
    option && myChart.setOption(option);
  });
  
  </script>
  
  <style scoped>
  .chart {
    width: 100%;
    height: 100%;
  }
  </style>
  