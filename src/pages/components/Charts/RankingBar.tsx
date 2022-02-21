import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useState } from 'react';
import Echart from './Echart';

const option: EChartOption = {
  // title: {
  //   text: '本月',
  //   textStyle: {
  //     color: '#ffffff',
  //     fontSize: 16,
  //     lineHeight: 16,
  //   },
  //   top: 0,
  //   right: 0,
  // },
  grid: {
    left: '5',
    right: '18%',
    top: '5',
    bottom: '10%',
    containLabel: true,
  },
  yAxis: {
    data: ['招商银行', '浙商银行', '中国工商银行', '建设银行', '中信银行', '广发银行', '光大银行', '兴业银行', '中国农业银行', '浦发银行'],
    axisLabel: {
      color: '#ffffff',
      fontWeight: 'lighter',
      fontSize: 12,
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    z: 10,
    inverse: true,
  },
  xAxis: {
    name: `单位(万元)`,
    nameLocation: 'end',
    nameTextStyle: {
      color: '#ffffff',
      fontWeight: 'lighter',
      fontSize: 12,
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
      fontSize: 12,
    },
    splitLine: {
      show: false,
    },
  },
  series: [
    {
      type: 'bar',
      showBackground: true,
      realtimeSort: true,
      barWidth: 20,
      backgroundStyle: {
        color: 'rgba(18,90,192,0.2)',
        borderRadius: 10,
      },
      itemStyle: {
        borderRadius: 10,
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#00FFE3' },
          // { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#06B1FF' },
        ]),
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#2378f7' },
            { offset: 0.7, color: '#2378f7' },
            { offset: 1, color: '#83bff6' },
          ]),
        },
      },
      data: [220, 182, 330, 310, 123, 442, 321, 90, 149, 198],
    },
  ],
};

const RankingBar: React.FC = (props) => {
  const { data=[] } = props;
  const [chartOption, setChartOption] = useState(option);
  useEffect(() => {
    const option = { ...chartOption };
    option.yAxis.data = data.map(i=>i.bank);
    option.series[0].data = data.map(i=>i.value);
    setChartOption(option);
  }, [data]);
  return <Echart option={chartOption} />;
};

export default RankingBar;
