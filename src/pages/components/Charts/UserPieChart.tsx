import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useState } from 'react';
import Echart from './Echart';

const option: EChartOption = {
  color: ['#00AEFF', '#00FFE3', '#FFB600', '#E46641', '#9a60b4'],
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  series: [
    {
      name: '平台用户数',
      type: 'pie',
      radius: ['30%', '65%'],
      center: ['50%', '50%'],
      left: '0',
      right: '0',
      top: '0',
      bottom: '0',
      itemStyle: {
        borderRadius: 0,
      },
      label: {
        fontSize: 14,
        lineHeight: 16,
        color: '#fff',
        fontWeight: 'lighter',
      },
      labelLine: {
        length: 20,
        length2: 0,
        maxSurfaceAngle: 80,
      },
      labelLayout: function(params) {
        const isLeft = params.labelRect.x < 120;
        const points = params.labelLinePoints;
        // Update the end point.
        points[2][0] = isLeft
          ? params.labelRect.x
          : params.labelRect.x + params.labelRect.width;
        return {
          labelLinePoints: points,
          verticalAlign: 'bottom',
        };
      },
      data: [
        { value: 54, name: '平行进口车' },
        { value: 46, name: '跨境电商' },
        { value: 36, name: '雀巢咖啡' },
        { value: 32, name: '倍耐力轮胎' },
      ],
    },
  ],
};

const UserPieChart: React.FC = (props) => {
  const { data=[] } = props;
  const [chartOption, setChartOption] = useState(option);
  useEffect(() => {
    const option = { ...chartOption };
    // option.series[0].name = name;
    option.series[0].data = data;
    setChartOption(option);
  }, [data]);
  return <Echart option={chartOption} />;
};

export default UserPieChart;
