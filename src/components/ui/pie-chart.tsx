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
import OptionModal from './OptionModal';

ChartJS.register(PieController, ArcElement, Tooltip, Legend);

type Props = {
  passedData: ChartItem[];
};

const truncateLabel = (
  ctx: CanvasRenderingContext2D,
  label: string,
  maxWidth: number,
) => {
  if (ctx.measureText(label).width <= maxWidth) return label; // 너비가 넘지 않으면 그대로 사용

  let truncated = label;
  while (ctx.measureText(truncated + '...').width > maxWidth) {
    truncated = truncated.slice(0, -1); // 한 글자씩 줄이기
  }
  return truncated + '...';
};

const PieChart = ({ passedData }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let chartInstance: ChartJS | null = null;

  const getChartData = () => {
    const labels = passedData.map((item) =>
      item.label.length > 7
        ? `${item.label.slice(0, 6)}... (${item.ratio})`
        : `${item.label} (${item.ratio})`,
    );
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

  return (
    <div className="relative flex h-auto w-full">
      <canvas ref={canvasRef} />
      <div className="absolute bottom-0 right-0">
        <OptionModal labels={passedData.map((item) => item.label)} />
      </div>
    </div>
  );
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
        usePointStyle: true,
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
