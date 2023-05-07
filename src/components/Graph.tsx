import { Chart, registerables, ChartConfiguration } from 'chart.js';
import { useEffect, useRef } from 'react';

Chart.register(...registerables);

type Props = {
  className?: string;
  config: ChartConfiguration;
};

export function Graph({ className = '', config }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      chartRef.current = new Chart(canvasRef.current, config);
    }
  }, [config]);

  return (
    <canvas ref={canvasRef} className={className}>
      Graph
    </canvas>
  );
}
