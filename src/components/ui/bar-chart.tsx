import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  Tooltip,
  Chart,
  TooltipItem,
} from 'chart.js';
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
    const counts = passedData.map((item) => item.count);
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
      counts,
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
        plugins: {
          legend: { display: false },
          tooltip: {
            ...tooltip,
            callbacks: {
              title: () => [],
              label: (tooltipItem: TooltipItem<'bar'>) => {
                const dataIndex = tooltipItem.dataIndex;
                const counts = getChartData().counts;
                return `${counts[dataIndex]}명`;
              },
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
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
            const maxValue = Math.max(...dataset);
            dataset.forEach((value, index) => {
              const meta = chart.getDatasetMeta(0);
              const bar = meta.data[index];
              ctx.fillStyle = value === maxValue ? '#3B82F6' : '#6B7280'; // 최대값이면 파란색, 아니면 기본 색상
              ctx.font = 'bold 12px Arial';
              ctx.textAlign = 'center';
              ctx.fillText(`${value}%`, bar.x, bar.y - 10);
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
