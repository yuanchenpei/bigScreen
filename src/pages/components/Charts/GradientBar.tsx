import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useState } from 'react';
import Echart from './Echart';
import moment from 'moment';

const option: EChartOption = {
  title: {
    text: '本月',
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
    left: '1',
    right: '1%',
    top: '15%',
    bottom: '0',
    containLabel: true,
  },
  xAxis: {
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    axisLabel: {
      color: '#ffffff',
      fontWeight: 'lighter',
      fontSize: 10,
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    z: 10,
  },
  yAxis: {
    name: '单位(万元)',
    nameLocation: 'end',
    nameTextStyle: {
      color: '#ffffff',
      fontWeight: 'lighter',
      fontSize: 10,
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: '#ffffff',
      fontWeight: 'lighter',
      fontSize: 10,
    },
    splitLine: {
      show: false,
    },
  },
  // dataZoom: [
  //   {
  //     type: 'inside',
  //   },
  // ],
  series: [
    {
      type: 'bar',
      showBackground: true,
      barWidth: 10,
      backgroundStyle: {
        color: 'rgba(18,90,192,0.2)',
        borderRadius: 5,
      },
      itemStyle: {
        borderRadius: 5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#00FFE3' },
          // { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#06B1FF' },
        ]),
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#2378f7' },
            { offset: 0.7, color: '#2378f7' },
            { offset: 1, color: '#83bff6' },
          ]),
        },
      },
      data: [220, 182, 330, 310, 123, 442, 321, 90, 149, 198, 125, 220],
    },
  ],
};

const GradientBar: React.FC = (props) => {
  const { data = [] } = props;
  const [chartOption, setChartOption] = useState(option);

  useEffect(() => {
    const option = { ...chartOption };
    option.xAxis.data = data.map(i => i.month+'月');
    option.series[0].data = data.map(i => i.scale);
    setChartOption(option);
  }, [data]);

  return <Echart option={chartOption} />;
};

export default GradientBar;
