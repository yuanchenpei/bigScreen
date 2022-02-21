import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useState } from 'react';
import Echart from './Echart';

const option: EChartOption = {
  grid: {
    left: '1',
    right: '1%',
    top: '18%',
    bottom: '0',
    containLabel: true,
  },
  xAxis: {
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    axisLabel: {
      color: '#ffffff',
      fontWeight: 'lighter',
      fontSize: 10,
      rotate: 55,
      formatter(val){
        if(val.length>5){
          return val.slice(0,4) + '..';
        }else {
          return val
        }
      }
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
  legend: {
    itemWidth: 10,
    itemHeight: 6,
    right: 0,
    top: 0,
    textStyle: {
      color: '#ffffff',
      fontWeight: 'lighter',
      fontSize: 10,
    },
  },
  series: [
    {
      name: '已用额度',
      type: 'bar',
      stack: 'totalQuota',
      barWidth: 10,
      itemStyle: {
        borderRadius: 5,
        color: '#00AEFF',
      },
      data: [220, 182, 330, 310, 123, 442, 321, 90, 149, 198, 125, 220],
    },
    {
      name: '剩余额度',
      type: 'bar',
      stack: 'totalQuota',
      barWidth: 10,
      itemStyle: {
        borderRadius: 5,
        color: '#00FFE3',
      },
      data: [149, 198, 90, 125, 220, 220, 182, 330, 310, 123, 442, 321],
    },
  ],
};

const QuotaBar: React.FC = (props) => {
  const { data = [] } = props;
  const [chartOption, setChartOption] = useState(option);

  useEffect(() => {
    const option = { ...chartOption };
    option.xAxis.data = data.map(i => i.customer);
    option.series[0].data = data.map(i => i.usedQuota);
    option.series[1].data = data.map(i => i.unUsedQuota);
    setChartOption(option);
  }, [data]);
  return <Echart option={chartOption} />;
};

export default QuotaBar;
