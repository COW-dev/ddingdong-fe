import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Chart as ChartJS, BarController, BarElement, Tooltip } from 'chart.js';

export type ApplyRate = {
  label: string;
  count: number;
  comparedToBefore: {
    ratio: number;
    value: number;
  };
};

export type ApplyQuestion = {
  question: string;
  id: number;
  count: number;
  section: string;
  type: 'RADIO' | 'CHECK_BOX' | 'TEXT' | 'FILE' | 'LONG_TEXT';
};

export type ChartItem = {
  label: string;
  count: number;
  ratio: number;
  rank?: number;
};

ChartJS.register(BarController, BarElement, Tooltip);

type Props = {
  passedData: ChartItem[];
};

const BarChart = ({ passedData }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let chartInstance: ChartJS | null = null;

  const getChartData = () => {
    const labels = passedData.map((item) => item.label);
    const rates = passedData.map((item) => item.ratio);
    const backgroundColors = passedData.map((item) =>
      item.rank === 1
        ? '#3B82F6'
        : item.rank === 2 || item.rank === 3
        ? '#DBEAFE'
        : '#E5E7EB',
    );
    return {
      labels,
      datasets: [
        { data: rates, backgroundColor: backgroundColors, barThickness },
      ],
    };
  };

  const getBarThickness = useMemo(() => {
    return typeof window !== 'undefined' && window.innerWidth >= 768 ? 30 : 20;
  }, []);
  const [barThickness, setBarThickness] = useState(getBarThickness);

  const renderChart = () => {
    const ctx = canvasRef.current;
    if (!ctx) return;

    chartInstance = new ChartJS(ctx, {
      type: 'bar',
      data: getChartData(),
      options: {
        ...tableChartOption,
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              callback: (value: string | number) => {
                const label = String(getChartData().labels[value as number]);
                return label.length > 4 ? label.substring(0, 3) + '..' : label;
              },
              font: { size: 14, weight: 'bold' as const },
              color: '#6B7280',
            },
          },
          y: {
            display: false,
            max: Math.max(...getChartData().datasets[0].data) + 5,
          },
        },
      },
    });
  };

  useEffect(() => {
    renderChart();
    return () => chartInstance?.destroy();
  }, [passedData, barThickness]);

  const handleResize = useCallback(() => {
    setBarThickness(getBarThickness);
  }, [getBarThickness]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return <canvas ref={canvasRef} className="w-full" />;
};

export default BarChart;

const tableChartOption = {
  plugins: { legend: { display: false } },
  responsive: true,
  maintainAspectRatio: false,
};
