import { EChartOption } from 'echarts';
import React, { useEffect, useState } from 'react';
import Echart from '../components/Charts/Echart';
import styles from './index.less';

const data = {
  name: 'flare',
  children: [
    {
      name: 'data',
      itemStyle: {
        color: '#f00',
      },
      children: [
        {
          name: 'converters',
          children: [
            { name: 'Converters', value: 721 },
            { name: 'DelimitedTextConverter', value: 4294 },
          ],
        },
        {
          name: 'DataUtil',
          children: [
            { name: 'IsA', value: 2039 },
            { name: 'Literal', value: 1214 },
          ],
        },
      ],
    },
    {
      name: 'display',
      itemStyle: {
        color: '#ff0',
      },
      children: [
        {
          name: 'DirtySprite',
          children: [
            { name: 'Arithmetic', value: 3891 },
            { name: 'Average', value: 891 },
          ],
        },
        {
          name: 'LineSprite',
          children: [
            { name: 'DateUtil', value: 4141 },
            { name: 'Distinct', value: 933 },
          ],
        },
      ],
    },
  ],
};

const option = {
  title: {
    text: 'Basic Graph',
  },
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [
    {
      type: 'graph',
      layout: 'none',
      symbolSize: 50,
      roam: true,
      label: {
        show: true,
      },
      edgeSymbol: ['none', 'arrow'],
      edgeSymbolSize: [10, 10],
      edgeLabel: {
        fontSize: 20,
      },
      data: [
        {
          name: 'Node 1',
          x: 0,
          y: 0,
        },
        {
          name: 'Node 2',
          x: 800,
          y: 300,
        },
        {
          name: 'Node 3',
          x: 550,
          y: 100,
        },
        {
          name: 'Node 4',
          x: 550,
          y: 500,
        },
      ],
      // links: [],
      links: [
        {
          source: 0,
          target: 1,
          symbolSize: [5, 5],
          label: {
            show: true,
          },
          lineStyle: {
            width: 1,
            // curveness: 0.2,
          },
        },
        {
          source: 'Node 2',
          target: 'Node 1',
          label: {
            show: true,
          },
          lineStyle: {
            // curveness: 0.2,
          },
        },
        {
          source: 'Node 1',
          target: 'Node 3',
        },
        {
          source: 'Node 2',
          target: 'Node 3',
        },
        {
          source: 'Node 2',
          target: 'Node 4',
        },
        {
          source: 'Node 1',
          target: 'Node 4',
        },
      ],
      lineStyle: {
        color:'source',
        opacity: 0.9,
        width: 1,
        type:'dashed',
        // curveness: 0,
      },
      center: [0, 0],
      symbol: 'rect',
      symbolSize: [100, 40],
    },
  ],
};

export default function treeChart() {
  return (
    <div className={styles.chartBox}>
      <Echart option={option} />
    </div>
  );
}
