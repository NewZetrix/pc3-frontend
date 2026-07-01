import type { StudentData } from '../types/index';
import { AlertCircle } from 'lucide-react';

interface Props {
  data: StudentData;
  setData: (data: StudentData) => void;
  onPredict: () => void;
  loading: boolean;
}

const RiskForm = ({ data, setData, onPredict, loading }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: parseFloat(value) || 0
    });
  };

  const ranges = {
    promedio_actual: { min: 0, max: 20 },
    asistencia_pct: { min: 0, max: 100 },
    tareas_entregadas_pct: { min: 0, max: 100 },
    participacion_pct: { min: 0, max: 100 },
    horas_estudio_semana: { min: 0, max: 40 },
    nota_pc_anterior: { min: 0, max: 20 },
  };

  return (
    <div>
      <h3 className="fs-4 fw-bold mb-4 text-light d-flex align-items-center gap-2">
        📊 Datos del Estudiante
      </h3>

      <div className="row g-3">
        {Object.keys(data).map((key) => (
          <div key={key} className="col-12">
            <label 
              htmlFor={`input-${key}`} 
              className="form-label text-secondary fw-semibold small mb-1 text-capitalize"
            >
              {key.replace(/_/g, ' ')}
            </label>
            <input
              id={`input-${key}`}
              type="number"
              name={key}
              title={`Ingresar ${key.replace(/_/g, ' ')}`}
              value={data[key as keyof StudentData]}
              onChange={handleChange}
              min={ranges[key as keyof typeof ranges]?.min}
              max={ranges[key as keyof typeof ranges]?.max}
              step="0.1"
              className="form-control form-control-lg border-0 shadow-sm"
              style={{ 
                backgroundColor: '#2d2d2d', 
                color: '#ffffff', 
                borderRadius: '10px',
                fontSize: '0.95rem'
              }}
            />
            <div className="form-text text-secondary small mt-1" style={{ fontSize: '0.72rem', opacity: 0.7 }}>
              Rango permitido: {ranges[key as keyof typeof ranges]?.min} a {ranges[key as keyof typeof ranges]?.max}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onPredict}
        disabled={loading}
        className="btn btn-primary btn-lg w-100 mt-4 py-3 fw-bold shadow d-flex align-items-center justify-content-center gap-2"
        style={{ borderRadius: '12px', backgroundColor: '#0d6efd' }}
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span>Procesando...</span>
          </>
        ) : (
          <>🔮 Predecir Riesgo</>
        )}
      </button>

      <div className="mt-4 d-flex align-items-start gap-2 text-secondary" style={{ fontSize: '0.75rem' }}>
        <AlertCircle size={16} className="text-secondary flex-shrink-0 mt-0.5" />
        <p className="m-0">La predicción se calcula mediante algoritmos basados en el historial académico.</p>
      </div>
    </div>
  );
};

export default RiskForm;