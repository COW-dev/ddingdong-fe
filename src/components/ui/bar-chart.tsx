import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Chart as ChartJS, BarController, BarElement, Tooltip } from 'chart.js';
import { ChartItem } from '@/types/apply';
import { tooltip } from './chart/tooltip';

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
    const sorteCountData = [...passedData].sort((a, b) => b.count - a.count);
    const colorMap = sorteCountData.map((item, index) => {
      if (index === 0) return '#3B82F6';
      if (index === 1 || index === 2) return '#DBEAFE';
      return '#E5E7EB';
    });

    const backgroundColors = passedData.map((item) => {
      const sortedIndex = sorteCountData.findIndex(
        (sortedItem) => sortedItem === item,
      );
      return colorMap[sortedIndex];
    });

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
    const canvasContext = canvasRef.current?.getContext('2d');
    if (!canvasContext) return;

    chartInstance = new ChartJS(canvasContext, {
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
  plugins: { legend: { display: false }, tooltip: tooltip },
  responsive: true,
  maintainAspectRatio: false,
};
