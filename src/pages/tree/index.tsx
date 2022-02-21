import { EChartOption } from 'echarts';
import React, { useEffect, useState } from 'react';
import Echart from '../components/Charts/Echart';
import styles from './index.less';

const data = {
  name: 'flare',
  children: [
    {
      name: 'data',
      itemStyle:{
        color:'#f00'
      },
      children: [
        {
          name: 'converters',
          children: [
            { name: 'Converters', value: 721 },
            { name: 'DelimitedTextConverter', value: 4294 }
          ]
        },
        {
          name: 'DataUtil',
          children: [
            { name: 'IsA', value: 2039 },
            { name: 'Literal', value: 1214 },
          ]
        }
      ]
    },
    {
      name: 'display',
      itemStyle:{
        color:'#ff0'
      },
      children: [
        {
          name: 'DirtySprite',
          children: [
            { name: 'Arithmetic', value: 3891 },
            { name: 'Average', value: 891 },
          ]
        },
        { name: 'LineSprite',
          children: [
            { name: 'DateUtil', value: 4141 },
            { name: 'Distinct', value: 933 },
          ]
        },
      ]
    }
  ]
};

const option = {
  series: [
    {
      type: 'tree',
      name: 'tree',
      data: [data],
      top: '10%',
      left: '8%',
      bottom: '22%',
      right: '20%',
      edgeShape: 'polyline',
      orient: 'TB',
      symbol:'rect',
      symbolSize:[100,40],
      edgeForkPosition: '50%',

      initialTreeDepth: -1,
      itemStyle:{

      },
      lineStyle: {
        width: 2
      },
      label: {
        backgroundColor: '#fff',
        position: 'inside',
        verticalAlign: 'middle',
        align: 'center'
      },
      leaves: {
        label: {
          position: 'inside',
          verticalAlign: 'middle',
          align: 'center'
        }
      },
      emphasis: {
        focus: 'series'
      },
      expandAndCollapse: true,
      animationDuration: 550,
      animationDurationUpdate: 750,

    }
  ]
};

export default function treeChart() {
  return (
    <div className={styles.chartBox}>
      <Echart option={option} />
    </div>
  );
}
