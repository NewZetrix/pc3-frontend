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
      'Asistencia %',
      'Tareas %',
      'Participación %',
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
        '#0d6efd', 
        '#198754', 
        '#6f42c1', 
        '#fd7e14', 
        '#e83e8c', 
        '#dc3545'
      ],
      borderRadius: 8,
      barThickness: 28,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: '📊 Variables Críticas del Estudiante',
        font: { size: 18, weight: 'bold' as const },
        color: '#ffffff',
        padding: { bottom: 20 }
      },
      tooltip: {
        backgroundColor: '#2d2d2d',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#444444',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: { color: 'rgba(255, 255, 255, 0.1)' }, 
        ticks: { color: '#b3b3b3' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#b3b3b3', font: { weight: 'bold' as const } }
      }
    },
  };

  return (
    <div className="card border-0 p-4 rounded-4" style={{ backgroundColor: '#1e1e1e' }}>
      <div style={{ height: '360px', position: 'relative' }}>
        <Bar data={chartData} options={options} />
      </div>
      <p className="text-center text-secondary small mt-3 m-0" style={{ opacity: 0.8 }}>
        Visualización comparativa de las métricas e indicadores procesados por el modelo de IA.
      </p>
    </div>
  );
};

export default RiskChart;