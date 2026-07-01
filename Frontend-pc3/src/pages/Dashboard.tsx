import { useState, useEffect } from 'react';
import RiskForm from '../components/RiskForm';
import RiskCard from '../components/RiskCard';
import RiskChart from '../components/RiskChart';
import History from '../components/History';
import type { StudentData, HistoryItem } from '../types';
import { usePredict } from '../hook/usePredict';

const Dashboard = () => {
  const { loading, error, dispararPrediccion } = usePredict();
  const [prediction, setPrediction] = useState<any>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const [formData, setFormData] = useState<StudentData>({
    promedio_actual: 12.5,
    asistencia_pct: 75,
    tareas_entregadas_pct: 80,
    participacion_pct: 65,
    horas_estudio_semana: 8,
    nota_pc_anterior: 13,
  });

  useEffect(() => {
    const savedHistory = localStorage.getItem('utp_risk_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handlePredict = async () => {
    const result = await dispararPrediccion(formData);
    if (result) {
      const newEntry: HistoryItem = {
        ...formData,
        id: Date.now().toString(),
        date: new Date().toLocaleString('es-PE'),
        prediction: result
      };
      setPrediction(result);
      const updatedHistory = [newEntry, ...history].slice(0, 8);
      setHistory(updatedHistory);
      localStorage.setItem('utp_risk_history', JSON.stringify(updatedHistory));
    }
  };

  return (
    <div className="bg-light min-vh-screen py-5">
      <div className="container-fluid px-md-5">
        
        {/* Encabezado Principal */}
        <div className="mb-4 text-center text-md-start">
          <h1 className="display-5 fw-bold text-dark m-0">UTP RiskAI</h1>
          <p className="text-muted fs-5">Predicción de Riesgo Académico (Módulo Integrado IA)</p>
          <hr />
        </div>

        {/* Alerta de Error de Conexión */}
        {error && (
          <div className="alert alert-danger shadow-sm border-start border-4 border-danger rounded-3 mb-4" role="alert">
            <h5 className="alert-heading fw-bold">⚠️ Error de Red / Conexión con Spring Boot</h5>
            <p className="mb-0 small">{error}</p>
          </div>
        )}

        {/* Rejilla de Distribución (Grid Sistema Bootstrap) */}
        <div className="row g-4">
          
          {/* Columna Izquierda: Formulario (Ocupa 4 de 12 columnas en pantallas grandes) */}
          <div className="col-12 col-lg-4">
            <div className="card shadow-sm border-0 p-3 rounded-4 bg-white">
              <RiskForm 
                data={formData} 
                setData={setFormData} 
                onPredict={handlePredict} 
                loading={loading} 
              />
            </div>
          </div>

          {/* Columna Derecha: Tarjeta, Gráfico e Historial (Ocupa 8 de 12 columnas) */}
          <div className="col-12 col-lg-8">
            <div className="d-flex flex-column gap-4">
              
              {prediction ? (
                <>
                  <div className="card shadow-sm border-0 p-2 rounded-4 bg-white">
                    <RiskCard prediction={prediction} />
                  </div>
                  <div className="card shadow-sm border-0 p-4 rounded-4 bg-white">
                    <RiskChart data={formData} />
                  </div>
                </>
              ) : (
                <div className="card shadow-sm border-2 border-dashed p-5 text-center rounded-4 bg-white d-flex justify-content-center align-items-center h-100 min-vh-25">
                  <p className="text-muted m-0 fs-5">
                    💡 Completa los datos y presiona "Predecir Riesgo" para visualizar el semáforo y gráfico de control.
                  </p>
                </div>
              )}
              
              <div className="card shadow-sm border-0 p-2 rounded-4 bg-white">
                <History history={history} />
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;