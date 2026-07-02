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
    <div className="min-vh-screen py-5" style={{ backgroundColor: '#121214' }}>
      <div className="container-fluid px-md-5">
        
        {/* Encabezado Principal */}
        <div className="mb-4 text-center text-md-start">
          <h1 className="display-5 fw-bold text-light m-0">UTP RiskAI</h1>
          <p className="text-secondary fs-5">Predicción de Riesgo Académico (Módulo Integrado IA)</p>
          <hr className="border-secondary opacity-25" />
        </div>

        {/* Alerta de Error de Conexión */}
        {error && (
          <div className="alert alert-danger shadow-sm border-start border-4 border-danger rounded-3 mb-4 bg-dark text-danger" role="alert">
            <h5 className="alert-heading fw-bold">⚠️ Error de Red / Conexión con Spring Boot</h5>
            <p className="mb-0 small">{error}</p>
          </div>
        )}

        <div className="row g-4">
          <div className="col-12 col-lg-4">
            <div className="card shadow-lg border-0 p-3 rounded-4" style={{ backgroundColor: '#1e1e24' }}>
              <RiskForm 
                data={formData} 
                setData={setFormData} 
                onPredict={handlePredict} 
                loading={loading} 
              />
            </div>
          </div>

          {/* Columna Derecha: Tarjeta, Gráfico e Historial */}
          <div className="col-12 col-lg-8">
            <div className="d-flex flex-column gap-4">
              
              {prediction ? (
                <>
                  <div className="card shadow-lg border-0 p-2 rounded-4" style={{ backgroundColor: '#1e1e24' }}>
                    <RiskCard prediction={prediction} />
                  </div>
                  <div className="card shadow-lg border-0 p-4 rounded-4" style={{ backgroundColor: '#1e1e24' }}>
                    <RiskChart data={formData} />
                  </div>
                </>
              ) : (
                <div className="card shadow-sm border-2 border-dashed p-5 text-center rounded-4 d-flex justify-content-center align-items-center h-100 min-vh-25" style={{ backgroundColor: '#1e1e24', borderColor: '#3a3a42' }}>
                  <p className="text-secondary m-0 fs-5">
                    💡 Completa los datos y presiona "Predecir Riesgo" para visualizar el semáforo y gráfico de control.
                  </p>
                </div>
              )}
              
              <div className="card shadow-lg border-0 p-2 rounded-4" style={{ backgroundColor: '#1e1e24' }}>
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
