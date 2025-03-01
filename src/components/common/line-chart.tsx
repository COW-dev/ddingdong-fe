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
import { tooltip } from '../../constants/tooltip';
import { MOCK_APPLYCANT } from '../apply/applicant.data';

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

function calculateCompared(previous: ApplyRate, current: ApplyRate) {
  const countDifference = current?.count - previous?.count;
  const ratio =
    previous.count === 0 ? 0 : (countDifference / previous.count) * 100;

  return {
    ...current,
    comparedToBefore: {
      ratio: ratio,
      value: countDifference,
    },
  };
}

const LineChart = ({ passedData }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let chartInstance: ChartJS | null = null;

  const getChartData = () => {
    const club =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('club') ?? '')
        : '';
    const clubName = club.state?.club?.name.toUpperCase() ?? '';
    const parsedApplicantData = [
      MOCK_APPLYCANT[clubName],
      calculateCompared(
        MOCK_APPLYCANT[clubName],
        passedData[passedData.length - 1],
      ),
    ];
    const labels = parsedApplicantData.map((item) => item?.label);
    const datas = parsedApplicantData.map((item) => item?.count);
    const rates = parsedApplicantData.map(
      (item) => item?.comparedToBefore.ratio,
    );
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

  const renderChart = () => {
    const canvasContext = canvasRef.current?.getContext('2d');
    if (!canvasContext) return;

    chartInstance = new ChartJS(canvasContext, {
      type: 'line',
      data: getChartData(),
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            ...tooltip,
            callbacks: {
              title: () => [],
              label: (data) => {
                const counts = getChartData().rates;
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
              ctx.fillText(`${value}명`, bar.x, bar.y - 15);
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
  borderColor: '#B0B0B0',
  borderWidth: 1.5,
  pointRadius: 6,
  pointBackgroundColor: '#ffffff',
  pointBorderColor: ['#B0B0B0', '#B0B0B0', '#3B82F6'],
  pointBorderWidth: 2,
  fill: false,
};
