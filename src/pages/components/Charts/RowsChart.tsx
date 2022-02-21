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
      name: 'Area Mode',
      type: 'pie',
      radius: [20, 70],
      center: ['50%', '50%'],
      left: '0',
      right: '0',
      top: '0',
      bottom: '0',
      roseType: 'radius',
      itemStyle: {
        borderRadius: 0,
      },
      label: {
        fontSize: 10,
        lineHeight: 14,
        color: '#fff',
        fontWeight: 'lighter',
      },
      labelLine: {
        length: 2,
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
      data: [],
    },
  ],
};

const RowsChart: React.FC = (props) => {
  const { data, name } = props;
  const [chartOption, setChartOption] = useState(option);

  useEffect(() => {
    const option = { ...chartOption };
    option.series[0].name = name;
    option.series[0].data = data;
    setChartOption(option);
  }, [data]);
  return <Echart option={chartOption} />;
};

export default RowsChart;
