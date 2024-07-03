<template>
    <div ref="chart" class="chart"></div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import * as echarts from 'echarts';
  
  const chart = ref(null);
  
  const data = [
    {
      name: 'Grandpa',
      children: [
        {
          name: 'Uncle Leo',
          value: 15,
          children: [
            {
              name: 'Cousin Jack',
              value: 2
            },
            {
              name: 'Cousin Mary',
              value: 5,
              children: [
                {
                  name: 'Jackson',
                  value: 2
                }
              ]
            },
            {
              name: 'Cousin Ben',
              value: 4
            }
          ]
        },
        {
          name: 'Father',
          value: 10,
          children: [
            {
              name: 'Me',
              value: 5
            },
            {
              name: 'Brother Peter',
              value: 1
            }
          ]
        }
      ]
    },
    {
      name: 'Nancy',
      children: [
        {
          name: 'Uncle Nike',
          children: [
            {
              name: 'Cousin Betty',
              value: 1
            },
            {
              name: 'Cousin Jenny',
              value: 2
            }
          ]
        }
      ]
    }
  ];
  
  const option = {
    series: {
      type: 'sunburst',
      data: data,
      radius: [0, '90%'],
      label: {
        rotate: 'radial'
      }
    }
  };
  
  let chartInstance;
  
  onMounted(() => {
    chartInstance = echarts.init(chart.value);
    chartInstance.setOption(option);
  });
  
  </script>
  
  <style scoped>
  .chart {
    width: 100%;
    height: 100%
  }
  </style>
  