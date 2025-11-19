import React, { useRef, useEffect, useMemo, useCallback } from 'react';
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
import { tooltip } from '../../../../../../../constants/tooltip';

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
);

type Props = {
  data: ApplyRate[];
};

const LineChart = ({ data }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  const getChartData = (data: ApplyRate[]) => {
    const labels = data.map((item) => item?.label);
    const datas = data.map((item) => item?.count);
    const rates = data.map((item) => item?.comparedToBefore.ratio);
    return {
      labels,
      rates,
      datasets: [
        {
          data: datas,
          ...lineChartStyle,
        },
      ],
    };
  };

  const chartData = useMemo(() => getChartData(data), [data]);

  const renderChart = useCallback(() => {
    const canvasContext = canvasRef.current?.getContext('2d');
    if (!canvasContext) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.data = chartData;
      const tooltipCallbacks =
        chartInstanceRef.current.options.plugins?.tooltip?.callbacks;
      if (tooltipCallbacks) {
        tooltipCallbacks.label = (data) => {
          const counts = chartData.rates;
          return `${counts[data.dataIndex]}%`;
        };
      }
      chartInstanceRef.current.update();
    } else {
      chartInstanceRef.current = new ChartJS(canvasContext, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              ...tooltip,
              callbacks: {
                title: () => [],
                label: (data) => {
                  const counts = chartData.rates;
                  return `${counts[data.dataIndex]}%`;
                },
              },
            },
          },
          scales: {
            x: {
              offset: true,
              grid: { display: false },
            },
            y: {
              display: false,
              beginAtZero: true,
              max: Math.max(...chartData.datasets[0].data) + 20,
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
                ctx.save();
                const meta = chart.getDatasetMeta(0);
                const bar = meta.data[index];
                ctx.fillStyle =
                  index === dataset.length - 1 ? '#3B82F6' : '#6B7280';
                ctx.font = 'bold 12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(`${value}명`, bar.x, bar.y - 15);
                ctx.restore();
              });
            },
          },
        ],
      });
    }
  }, [chartData]);

  useEffect(() => {
    renderChart();
    return () => {
      chartInstanceRef.current?.destroy();
      chartInstanceRef.current = null;
    };
  }, [renderChart]);

  return <canvas ref={canvasRef} className="w-full" />;
};

export default LineChart;

const lineChartStyle = {
  borderColor: '#B0B0B0',
  borderWidth: 1.5,
  pointRadius: 6,
  pointBackgroundColor: '#ffffff',
  pointBorderColor: ['#B0B0B0', '#B0B0B0', '#3B82F6'],
  pointBorderWidth: 2,
  fill: false,
};
