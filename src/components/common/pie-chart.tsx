import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import {
  Chart as ChartJS,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { tooltip } from '@/constants/tooltip';
import { ChartItem } from '@/types/apply';
import { debounce } from '../ui/utils';

ChartJS.register(PieController, ArcElement, Tooltip, Legend);

type Props = {
  data: ChartItem[];
};

const PieChart = ({ data }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  const getPieChartStyle = (ratios: number[]) => {
    return {
      backgroundColor: ['#3B82F6', '#BFDBFE', '#F87171', '#9CA3AF', '#E5E7EB'],
      borderWidth: ratios.some((ratio) => ratio === 100) ? 0 : 10,
      hoverBorderColor: '#FFFFFF',
    };
  };

  const getChartData = (data: ChartItem[]) => {
    const labels = data.map((item) =>
      item.label.length > 7
        ? `${item.label.slice(0, 6)}... (${item.count}명)`
        : `${item.label} (${item.count}명)`,
    );
    const ratios = data.map((item) => item.ratio);
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
  const chartData = useMemo(() => getChartData(data), [data]);

  const handleResize = useMemo(() => {
    const maxSize = 200;
    return debounce(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const { width, height } = canvas.getBoundingClientRect();
      canvas.style.width = `${Math.min(width, maxSize)}px`;
      canvas.style.height = `${Math.min(height, maxSize)}px`;

      chartInstanceRef.current?.resize();
    }, 20);
  }, []);

  const renderChart = useCallback(() => {
    const canvasContext = canvasRef.current?.getContext('2d');
    if (!canvasContext) return;
    if (chartInstanceRef.current) {
      chartInstanceRef.current.data = chartData;
      const tooltipCallbacks =
        chartInstanceRef.current.options.plugins?.tooltip?.callbacks;
      if (tooltipCallbacks) {
        tooltipCallbacks.label = (data) =>
          `${chartData.ratios[data.dataIndex]}%`;
      }
      chartInstanceRef.current.update();
    } else {
      chartInstanceRef.current = new ChartJS(canvasContext, {
        type: 'pie',
        data: chartData,
        options: {
          responsive: false,
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
    return () => {
      chartInstanceRef.current?.destroy();
      chartInstanceRef.current = null;
    };
  }, [renderChart]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas ref={canvasRef} className="flex h-auto w-full max-w-[550px]" />
  );
};

export default PieChart;
