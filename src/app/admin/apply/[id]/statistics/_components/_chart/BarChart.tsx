import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Chart as ChartJS, BarController, BarElement, Tooltip } from 'chart.js';

import { ChartItem } from '@/app/_api/types/apply';
import { debounce } from '@/app/admin/apply/[id]/statistics/_utils/debounce';
import { tooltip } from '@/constants/tooltip';

ChartJS.register(BarController, BarElement, Tooltip);

type Props = {
  data: ChartItem[];
};

export default function BarChart({ data }: Props) {
  const isList = data.length > 5;
  return (
    <div className="w-full">
      {isList ? <BarList data={data} /> : <BarGraph data={data} />}
    </div>
  );
}

function getColorFromCount(data: ChartItem[]) {
  const sorteCountData = [...data].sort((a, b) => b.count - a.count);
  const colorMap = sorteCountData.map((item, index) => {
    if (index === 0) return '#3B82F6';
    if (index === 1 || index === 2) return '#DBEAFE';
    return '#E5E7EB';
  });

  const backgroundColors = data.map((item) => {
    const sortedIndex = sorteCountData.findIndex(
      (sortedItem) => sortedItem === item,
    );
    return colorMap[sortedIndex];
  });
  return backgroundColors;
}

export function BarGraph({ data }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);
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

  const getChartData = (data: ChartItem[], barThickness: number) => {
    const labels = data.map((item) => item.label);
    const rates = data.map((item) => item.ratio);
    const counts = data.map((item) => item.count);

    return {
      labels,
      counts,
      datasets: [
        {
          data: rates,
          backgroundColor: getColorFromCount(data),
          barThickness,
        },
      ],
    };
  };

  const chartData = useMemo(
    () => getChartData(data, barThickness),
    [data, barThickness],
  );

  const renderChart = useCallback(() => {
    const canvasContext = canvasRef.current?.getContext('2d');
    if (!canvasContext) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.data = chartData;
      const tooltipCallbacks =
        chartInstanceRef.current.options.plugins?.tooltip?.callbacks;
      if (tooltipCallbacks) {
        tooltipCallbacks.label = (data) => {
          const counts = chartData.counts;
          return `${counts[data.dataIndex]}명`;
        };
      }
      chartInstanceRef.current.update();
    } else {
      chartInstanceRef.current = new ChartJS(canvasContext, {
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
                  return label.length > 4
                    ? label.substring(0, 3) + '..'
                    : label;
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
                ctx.save();
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
    }
  }, [chartData]);

  useEffect(() => {
    renderChart();
    return () => {
      chartInstanceRef.current?.destroy();
      chartInstanceRef.current = null;
    };
  }, [renderChart, barThickness]);

  return <canvas ref={canvasRef} className="w-full max-w-[400px]" />;
}

function BarList({ data }: Props) {
  const itemBorderColors = getColorFromCount(data);

  return (
    <div className="z-30 flex w-full flex-col gap-4">
      {data.map((item, index) => (
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
