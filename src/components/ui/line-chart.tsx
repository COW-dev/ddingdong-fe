import React, { useRef, useEffect } from 'react';
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';

import { ApplyRate } from '@/types/apply';
import { tooltip } from './chart/tooltip';

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
);

type Props = {
  passedData: ApplyRate[];
};

const LineChart = ({ passedData }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let chartInstance: ChartJS | null = null;

  const getChartData = () => {
    const labels = passedData.map((item) => item.label);
    const datas = passedData.map((item) => item.comparedToBefore.value);
    return {
      labels,
      datasets: [
        {
          data: datas,
          ...lineChartStyle,
        },
      ],
    };
  };

  const renderChart = () => {
    const canvasContext = canvasRef.current?.getContext('2d');
    if (!canvasContext) return;

    chartInstance = new ChartJS(canvasContext, {
      type: 'line',
      data: getChartData(),
      options: {
        ...lineChartOption,
        scales: {
          x: {
            offset: true,
            grid: { display: false },
          },
          y: {
            display: false,
            beginAtZero: true,
            max: Math.max(...getChartData().datasets[0].data) + 20,
          },
        },
      },
      plugins: [
        {
          id: 'custom-text-plugin',
          afterDatasetsDraw: (chart) => {
            const { ctx, data } = chart;
            const dataset = data.datasets[0].data as number[];

            dataset.forEach((value, index) => {
              const meta = chart.getDatasetMeta(0);
              const bar = meta.data[index];
              ctx.fillStyle =
                index === dataset.length - 1 ? '#3B82F6' : '#6B7280';
              ctx.font = 'bold 12px Arial';
              ctx.textAlign = 'center';
              ctx.fillText(`${value}%`, bar.x, bar.y - 15);
              ctx.restore();
            });
          },
        },
      ],
    });
  };

  useEffect(() => {
    renderChart();
    return () => chartInstance?.destroy();
  }, [passedData]);

  return <canvas ref={canvasRef} className="w-full" />;
};

export default LineChart;

const lineChartStyle = {
  borderColor: '#B0B0B0', // 연한 회색 선
  borderWidth: 1.5, // 선 두께 조정
  pointRadius: 6, // 포인트 크기
  pointBackgroundColor: '#ffffff', // 마지막 점 강조
  pointBorderColor: ['#B0B0B0', '#B0B0B0', '#3B82F6'],
  pointBorderWidth: 2, // 포인트 테두리 두께
  fill: false,
};

const lineChartOption = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      ...tooltip,
      callbacks: {
        title: () => ['N%'],
        label: () => '',
      },
    },
  },
};
