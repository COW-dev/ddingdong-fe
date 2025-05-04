import React, { useRef, useEffect, useMemo, useCallback } from 'react';
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
  const chartInstanceRef = useRef<ChartJS | null>(null);

  const getPieChartStyle = (ratios: number[]) => {
    return {
      backgroundColor: ['#3B82F6', '#BFDBFE', '#F87171', '#9CA3AF', '#E5E7EB'],
      borderWidth: ratios.some((ratio) => ratio === 100) ? 0 : 10,
      hoverBorderColor: '#FFFFFF',
    };
  };

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
  const chartData = useMemo(() => getChartData(passedData), [passedData]);

  const resizeChart = () => {
    const { width, height } = canvasRef.current?.getBoundingClientRect() || {};
    if (canvasRef.current) {
      canvasRef.current.width = width || 0;
      canvasRef.current.height = height || 0;
    }
  };

  const renderChart = useCallback(() => {
    const canvasContext = canvasRef.current?.getContext('2d');
    if (!canvasContext) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.data = chartData;
      chartInstanceRef.current.update();
    } else {
      resizeChart();
      chartInstanceRef.current = new ChartJS(canvasContext, {
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
    }
  }, [chartData]);

  useEffect(() => {
    renderChart();
    window.addEventListener('resize', renderChart);
    return () => {
      chartInstanceRef.current?.destroy();
      chartInstanceRef.current = null;
      window.removeEventListener('resize', renderChart);
    };
  }, [renderChart]);

  return (
    <canvas ref={canvasRef} className="flex h-auto w-full max-w-[400px]" />
  );
};

export default PieChart;
