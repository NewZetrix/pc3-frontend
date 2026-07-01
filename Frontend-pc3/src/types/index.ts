// src/types/index.ts
export interface StudentData {
  promedio_actual: number;
  asistencia_pct: number;
  tareas_entregadas_pct: number;
  participacion_pct: number;
  horas_estudio_semana: number;
  nota_pc_anterior: number;
}

export interface RiskPrediction {
  risk: 'RIESGO_BAJO' | 'RIESGO_MEDIO' | 'RIESGO_ALTO';
  confidence: number;
  explanation?: string;
  recommendation?: string;
  variable_impact?: string;
}

export interface HistoryItem extends StudentData {
  id: string;
  date: string;
  prediction: RiskPrediction;
}