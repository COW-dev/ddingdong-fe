import { useEffect, useMemo, useRef, useState } from 'react';
import { Chart as ChartJS, BarController, BarElement, Tooltip } from 'chart.js';
import { ChartItem } from '@/types/apply';
import { tooltip } from './chart/tooltip';
import { debounce } from './utils';

ChartJS.register(BarController, BarElement, Tooltip);

type Props = {
  passedData: ChartItem[];
};

export default function BarChart({ passedData }: Props) {
  const isList = passedData.length > 5;
  return isList ? (
    <BarList passedData={passedData} />
  ) : (
    <BarGraph passedData={passedData} />
  );
}

function getColorFromCount(passedData: ChartItem[]) {
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
  return backgroundColors;
}

export function BarGraph({ passedData }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const getBarThickness = () => {
    if (typeof window === 'undefined') return 30;
    return window.innerWidth >= 768 ? 30 : 20;
  };

  const [barThickness, setBarThickness] = useState(getBarThickness());

  const handleResize = useMemo(() => {
    return debounce(() => {
      setBarThickness(getBarThickness());
    }, 100);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    renderChart();
    return () => chartInstance?.destroy();
  }, [passedData, barThickness]);

  let chartInstance: ChartJS | null = null;

  const getChartData = (passedData: ChartItem[], barThickness: number) => {
    const labels = passedData.map((item) => item.label);
    const rates = passedData.map((item) => item.ratio);
    const counts = passedData.map((item) => item.count);

    return {
      labels,
      counts,
      datasets: [
        {
          data: rates,
          backgroundColor: getColorFromCount(passedData),
          barThickness,
        },
      ],
    };
  };

  const chartData = useMemo(
    () => getChartData(passedData, barThickness),
    [passedData, barThickness],
  );

  const renderChart = () => {
    const canvasContext = canvasRef.current?.getContext('2d');
    if (!canvasContext) return;

    chartInstance = new ChartJS(canvasContext, {
      type: 'bar',
      data: chartData,
      options: {
        plugins: {
          legend: { display: false },
          tooltip: {
            ...tooltip,
            callbacks: {
              title: () => [],
              label: (data) => {
                const counts = chartData.counts;
                return `${counts[data.dataIndex]}명`;
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
              maxRotation: 0,
              autoSkip: false,
              callback: (value: string | number) => {
                const label = String(chartData.labels[value as number]);
                return label.length > 4 ? label.substring(0, 3) + '..' : label;
              },
              font: { size: 14, weight: 'bold' as const },
              color: '#6B7280',
            },
          },
          y: {
            display: false,
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
            const maxValue = Math.max(...dataset);
            dataset.forEach((value, index) => {
              const meta = chart.getDatasetMeta(0);
              const bar = meta.data[index];
              ctx.fillStyle = value === maxValue ? '#3B82F6' : '#6B7280';
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

  return <canvas ref={canvasRef} className="w-full max-w-[400px]" />;
}

function BarList({ passedData }: Props) {
  const itemBorderColors = getColorFromCount(passedData);

  return (
    <div className="z-30 flex w-full flex-col gap-4">
      {passedData.map((item, index) => (
        <div
          key={index}
          className="flex w-full gap-2 rounded-xl border border-[#E5E7EB] bg-white p-5 text-sm text-[#6B7280] outline-none md:text-base"
          style={{ borderColor: itemBorderColors[index] }}
        >
          <span className="font-semibold">{item.label}</span>
          <span className="opacity-40">|</span>
          <span>{item.ratio}%</span>
          <span className="opacity-40">|</span>
          <span>{item.count}명</span>
        </div>
      ))}
    </div>
  );
}
