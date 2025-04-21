import React, { useRef, useEffect, useMemo } from 'react';
import {
  Chart as ChartJS,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChartItem } from '@/types/apply';
import { tooltip } from './chart/tooltip';

ChartJS.register(PieController, ArcElement, Tooltip, Legend);

type Props = {
  passedData: ChartItem[];
};

const PieChart = ({ passedData }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let chartInstance: ChartJS | null = null;

  const getPieChartStyle = (ratios: number[]) => {
    return {
      backgroundColor: ['#3B82F6', '#BFDBFE', '#F87171', '#9CA3AF', '#E5E7EB'],
      borderWidth: ratios.some((ratio) => ratio === 100) ? 0 : 10,
      hoverBorderColor: '#FFFFFF',
    };
  };

  const chartData = useMemo(() => getChartData(passedData), [passedData]);

  const getChartData = (passedData: ChartItem[]) => {
    const labels = passedData.map((item) =>
      item.label.length > 7
        ? `${item.label.slice(0, 6)}... (${item.count}명)`
        : `${item.label} (${item.count}명)`,
    );
    const ratios = passedData.map((item) => item.ratio);
    return {
      labels,
      ratios,
      datasets: [
        {
          data: ratios,
          ...getPieChartStyle(ratios),
        },
      ],
    };
  };

  const resizeChart = () => {
    const { width, height } = canvasRef.current?.getBoundingClientRect() || {};
    if (canvasRef.current) {
      canvasRef.current.width = width || 0;
      canvasRef.current.height = height || 0;
    }
  };

  const renderChart = () => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    const canvasContext = canvasRef.current?.getContext('2d');
    if (!canvasContext) return;

    resizeChart();
    chartInstance = new ChartJS(canvasContext, {
      type: 'pie',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right' as const,
            align: 'center' as const,
            labels: {
              usePointStyle: true,
              font: {
                family: 'Pretendard',
                size: 14,
              },
              color: '#1F2937',
            },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClick: () => {},
          },
          tooltip: {
            ...tooltip,
            callbacks: {
              title: () => [],
              label: (data) => {
                const ratios = chartData.ratios;
                return `${ratios[data.dataIndex]}%`;
              },
            },
          },
        },
      },
    });
  };

  useEffect(() => {
    renderChart();
    window.addEventListener('resize', renderChart);
    return () => {
      chartInstance?.destroy();
      window.removeEventListener('resize', renderChart);
    };
  }, [passedData]);

  return (
    <canvas ref={canvasRef} className="flex h-auto w-full max-w-[400px]" />
  );
};

export default PieChart;
