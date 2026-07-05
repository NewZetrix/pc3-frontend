import axios from "axios";
import type { StudentData, RiskPrediction } from "../types/index";

const API_URL = "https://backend-pc3-o7m8.onrender.com/api/prediccion"

export const predictService = {
  async obtenerRiesgoAcademico(formData: StudentData): Promise<RiskPrediction> {
    const response = await axios.post(`${API_URL}/utp-risk`, formData);
    const dataBackend = response.data;

    // VALIDACIÓN DE CONFIANZA: Aseguramos que sea un número entero limpio (ej. 67)
    let finalConfidence = dataBackend.confianza;
    if (finalConfidence > 0 && finalConfidence <= 1) {
      finalConfidence = Math.round(finalConfidence * 100);
    } else {
      finalConfidence = Math.round(finalConfidence);
    }

    return {
      //Mapea el riesgo ('RIESGO_ALTO', 'RIESGO_MEDIO', 'RIESGO_BAJO')
      risk: dataBackend.prediccion,

      //Confianza formateada como entero para que el círculo SVG no se rompa
      confidence: finalConfidence,

      //Explicación del caso formateada de forma elegante
      explanation: dataBackend.caso
        ? `Evaluación del caso: ${dataBackend.caso}.`
        : `Evaluación automática del caso: UTP RiskAI analizó las variables académicas vigentes.`,

      //Extracción de la primera recomendación del arreglo
      recommendation:
        dataBackend.recomendaciones && dataBackend.recomendaciones.length > 0
          ? dataBackend.recomendaciones[0]
          : "Refuerza la entrega de tareas pendientes y asiste a los talleres de repaso antes de la PC4.",

      variable_impact:
        dataBackend.prediccion === "RIESGO_ALTO"
          ? `Alerta: El promedio actual (${formData.promedio_actual}) o la asistencia (${formData.asistencia_pct}%) se encuentran en niveles críticos.`
          : dataBackend.prediccion === "RIESGO_MEDIO"
            ? `Moderado: Existe una irregularidad leve en la entrega de actividades o participación (${formData.participacion_pct}%).`
            : `Estabilidad: Tus indicadores muestran un excelente equilibrio y rendimiento académico.`,
    };
  },
};
