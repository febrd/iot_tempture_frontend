"use client";

import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js';
import { useEffect, useRef } from 'react';

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

interface GaugeChartProps {
  label: string;
  value: number;
  color: string;
}

export const GaugeChartComponent = ({ label, value, color }: GaugeChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<"doughnut", number[], string> | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx && !chartInstance.current) {
        chartInstance.current = new Chart<"doughnut", number[], string>(ctx, {
          type: 'doughnut',
          data: {
            labels: [label, 'Remaining'],
            datasets: [
              {
                data: [value, 100 - value],
                backgroundColor: [color, '#E5E5E5'],
                borderWidth: 0,
                circumference: 180,
                rotation: 270,
              },
            ],
          },
          options: {
            responsive: true,
            cutout: '85%',
            plugins: {
              tooltip: { enabled: false },
              legend: { display: false },
            },
          },
        });
      } else if (chartInstance.current) {
        chartInstance.current.data.datasets[0].data = [value, 100 - value];
        chartInstance.current.update();
      }
    }
  }, [value, label, color]);

  return (
    <div className="text-center">
      <canvas ref={chartRef} width="200" height="200"></canvas>
      <p className="mt-2 text-lg font-medium">{label}: {value}%</p>
    </div>
  );
};
