// src/components/RiskChart.tsx
import type { StudentData } from '../types';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  data: StudentData;
}

const RiskChart = ({ data }: Props) => {
  const chartData = {
    labels: [
      'Promedio',
      'Asistencia',
      'Tareas',
      'Participación',
      'Horas Estudio',
      'Nota PC Anterior'
    ],
    datasets: [{
      label: 'Valor Actual',
      data: [
        data.promedio_actual,
        data.asistencia_pct,
        data.tareas_entregadas_pct,
        data.participacion_pct,
        data.horas_estudio_semana,
        data.nota_pc_anterior
      ],
      backgroundColor: [
        '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899', '#ef4444'
      ],
      borderRadius: 8,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Variables Críticas del Estudiante',
        font: { size: 18 },
        color: '#1f2937'
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { color: '#6b7280' }
      },
      x: { ticks: { color: '#6b7280' } }
    },
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <div className="h-80">
        <Bar data={chartData} options={options} />
      </div>
      <p className="text-center text-sm text-gray-500 mt-4">
        Variables más importantes para la predicción
      </p>
    </div>
  );
};

export default RiskChart;