import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useState } from 'react';
import Echart from './Echart';

const moment = require('moment');

const option: EChartOption = {
  tooltip: {
    trigger: 'axis',
  },
  title: {
    text: '近期交易历史',
    textStyle: {
      color: '#ffffff',
      fontWeight: 'lighter',
      fontSize: 10,
      lineHeight: 10,
    },
    top: 0,
    right: 0,
  },
  grid: {
    left: 0,
    right: '5%',
    top: '18%',
    bottom: 0,
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['12/01', '12/02', '12/03', '12/04', '12/05', '12/06', '12/07'],
    nameLocation: 'middle',
    axisLabel: {
      color: '#ffffff',
      fontWeight: 'lighter',
      fontSize: 10,
    },
    axisLine: {
      lineStyle: {
        color: '#1B4178',
        opacity: 1,
      },
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    type: 'value',
    show: true,
    name: '(次)',
    nameLocation: 'end',
    nameTextStyle: {
      color: '#ffffff',
      fontWeight: 'lighter',
      fontSize: 10,
      align: 'right',
    },
    axisLabel: {
      color: '#ffffff',
      fontWeight: 'lighter',
      fontSize: 10,
    },
    axisLine: {
      lineStyle: {
        color: '#1B4178',
        opacity: 1,
      },
    },
    splitLine: {
      lineStyle: {
        color: '#1B4178',
        opacity: 1,
      },
    },
  },
  series: [
    {
      name: '融资次数',
      type: 'line',
      data: [116, 132, 107, 134, 95, 236, 214],
      smooth: true,
      symbol: 'none',
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0,
              color: 'rgba(0,255,227,0)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(0,255,227,0.5)', // 100% 处的颜色
            },
          ]),
          lineStyle: {
            color: 'rgba(0,255,227,1)',
            opacity: 0.8,
            width: 2,
          },
          borderColor: 'rgba(0,255,227,1)',
          borderWidth: '2',
        },
      },
      areaStyle: {},
    },
  ],
};

const ShadowLineChart: React.FC = (props) => {
  const { data = [] } = props;
  const [chartOption, setChartOption] = useState(option);

  useEffect(() => {
    const option = { ...chartOption };
    option.xAxis.data = data.map(i => moment(i.timeFormat).format('MM/DD'));
    option.series[0].data = data.map(i => i.count);
    setChartOption(option);
  }, [data]);

  return <Echart option={chartOption} />;
};

export default ShadowLineChart;
