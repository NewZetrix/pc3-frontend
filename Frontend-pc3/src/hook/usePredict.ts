import { useState } from 'react';
import { predictService } from '../services/predictService';
import type { StudentData, RiskPrediction } from '../types';

export const usePredict = () => {
  const [data, setData] = useState<RiskPrediction | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dispararPrediccion = async (formData: StudentData): Promise<RiskPrediction | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await predictService.obtenerRiesgoAcademico(formData);
      setData(result);
      return result;
    } catch (err: any) {
      setError('Error al comunicar con Spring Boot. Verifica la política CORS y que el servidor esté encendido en el puerto 8080.');
      setData(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, dispararPrediccion };
};