import type { StudentData, RiskPrediction } from '../types';

export const predictService = {
  async obtenerRiesgoAcademico(formData: StudentData): Promise<RiskPrediction> {
    // Simulamos un retraso de red de 600 milisegundos para que el spinner de carga funcione
    await new Promise(resolve => setTimeout(resolve, 600));

    // Calculamos un puntaje lógico basado en las variables del JSON para determinar el nivel
    const score = 
      formData.promedio_actual * 3.5 +
      formData.asistencia_pct * 0.2 +
      formData.tareas_entregadas_pct * 0.15;

    let risk: 'RIESGO_BAJO' | 'RIESGO_MEDIO' | 'RIESGO_ALTO' = 'RIESGO_MEDIO';
    let recommendation = '';
    let impact = '';

    // Lógica analítica para cambiar los estados del semáforo en la interfaz
    if (score < 55 || formData.promedio_actual < 11.5 || formData.asistencia_pct < 70) {
      risk = 'RIESGO_ALTO';
      recommendation = '⚠️ Alerta Crítica: Debes solicitar tutorías académicas obligatorias de inmediato y justificar tus inasistencias.';
      impact = 'La baja asistencia o el promedio actual menor al mínimo aprobatorio están afectando críticamente tu rendimiento.';
    } else if (score >= 78) {
      risk = 'RIESGO_BAJO';
      recommendation = '🌟 ¡Excelente desempeño! Mantén el ritmo de estudio y continúa participando de esa manera en las sesiones virtuales.';
      impact = 'Tus indicadores académicos muestran un excelente equilibrio y estabilidad esta semana.';
    } else {
      risk = 'RIESGO_MEDIO';
      recommendation = '📋 Recomendación: Refuerza la entrega de tareas pendientes y asiste a los talleres de repaso antes de la PC4.';
      impact = 'Existe un riesgo moderado provocado por la entrega irregular de actividades académicas.';
    }

    // Retornamos el objeto adaptado exactamente al formato en inglés que esperan tus componentes visuales
    return {
      risk,
      confidence: Math.floor(Math.min(98, Math.max(60, score * 0.95))), // Genera un porcentaje entre 60% y 98%
      explanation: `Evaluación automática del caso: UTP RiskAI analizó las variables académicas vigentes.`,
      recommendation,
      variable_impact: impact
    };
  }
};