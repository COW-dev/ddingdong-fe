import React, { useRef, useEffect } from 'react';
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

  const getChartData = () => {
    const labels = passedData.map((item) => `${item.label} (${item.ratio})`);
    const ratios = passedData.map((item) => item.ratio);
    return {
      labels,
      datasets: [
        {
          data: ratios,
          ...PieChartStyle,
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
      data: getChartData(),
      options: PieChartOption,
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

  return <canvas ref={canvasRef} className="h-auto w-full" />;
};

export default PieChart;
const PieChartOption = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
      align: 'center' as const,
      labels: {
        usePointStyle: true, // 원형 마커 스타일 적용
        font: {
          family: 'Pretendard',
          size: 14,
        },
        color: '#1F2937',
      },
    },
    tooltip: tooltip,
  },
};

const PieChartStyle = {
  backgroundColor: ['#3B82F6', '#BFDBFE', '#F87171', '#9CA3AF', '#E5E7EB'],
  borderWidth: 10,
  hoverBorderColor: '#FFFFFF',
};
