import type { RiskPrediction } from '../types';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface Props {
  prediction: RiskPrediction;
}

const RiskCard = ({ prediction }: Props) => {
  const riskConfig = {
    RIESGO_ALTO: { 
      color: '#dc3545', 
      icon: AlertTriangle, 
      label: 'RIESGO ALTO', 
      bg: 'rgba(220, 53, 69, 0.15)' 
    },
    RIESGO_MEDIO: { 
      color: '#ffc107', 
      icon: AlertCircle, 
      label: 'RIESGO MEDIO', 
      bg: 'rgba(255, 193, 7, 0.15)' 
    },
    RIESGO_BAJO: { 
      color: '#198754', 
      icon: CheckCircle, 
      label: 'RIESGO BAJO', 
      bg: 'rgba(25, 135, 84, 0.15)' 
    },
  };

  // Evitamos caídas si el backend manda algo inesperado
  const config = riskConfig[prediction.risk] || riskConfig.RIESGO_MEDIO;
  const IconComponent = config.icon;

  // Parámetros matemáticos para animar el círculo SVG solicitado
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (prediction.confidence / 100) * circumference;

  return (
    <div className="card border-0 p-4 rounded-4 text-light" style={{ backgroundColor: '#1e1e1e' }}>
      
      {/* Fila superior: Título e Icono a la izquierda, Círculo a la derecha */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        
        {/* Bloque Izquierdo */}
        <div className="d-flex align-items-center gap-3">
          <IconComponent size={44} style={{ color: config.color }} className="flex-shrink-0" />
          <div>
            <p className="text-secondary small fw-bold m-0 tracking-wider">⚠️ NIVEL DE RIESGO</p>
            <h3 className="display-6 fw-bold m-0" style={{ color: config.color }}>
              {config.label}
            </h3>
          </div>
        </div>

        {/* Bloque Derecho: El Círculo Dinámico que pidió el Back */}
        <div className="d-flex align-items-center gap-3 bg-dark p-2 px-3 rounded-4 border border-secondary-subtle" style={{ maxWidth: '220px' }}>
          <div className="position-relative d-flex align-items-center justify-content-center" style={{ width: '76px', height: '76px' }}>
            <svg width="76" height="76" style={{ transform: 'rotate(-90deg)' }}>
              {/* Canal de fondo oscuro */}
              <circle cx="38" cy="38" r={radius} fill="transparent" stroke="#333333" strokeWidth="6" />
              {/* Anillo dinámico de color */}
              <circle
                cx="38"
                cy="38"
                r={radius}
                fill="transparent"
                stroke={config.color}
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
            </svg>
            <span className="position-absolute small fw-bold text-light" style={{ fontSize: '0.95rem' }}>
              {prediction.confidence}%
            </span>
          </div>
          <div>
            <div className="small fw-bold text-light">Confianza</div>
            <div className="small text-secondary" style={{ fontSize: '0.75rem' }}>Precisión IA</div>
          </div>
        </div>

      </div>

      {/* Explicación del caso */}
      {prediction.explanation && (
        <p className="text-light opacity-90 mb-4 fs-6 style-italic">
          {prediction.explanation}
        </p>
      )}

      {/* Recomendación con caja gris de contraste */}
      {prediction.recommendation && (
        <div className="p-3 rounded-3 mb-3" style={{ backgroundColor: '#2d2d2d' }}>
          <p className="fw-bold text-warning small mb-1">💡 Recomendación Oficial:</p>
          <p className="m-0 small text-light opacity-75">{prediction.recommendation}</p>
        </div>
      )}

      {/* Impacto de variables con borde dinámico de semáforo */}
      {prediction.variable_impact && (
        <div className="p-3 rounded-3" style={{ backgroundColor: config.bg, borderLeft: `4px solid ${config.color}` }}>
          <p className="fw-bold small mb-1" style={{ color: config.color }}>Impacto de Variable Crítica:</p>
          <p className="m-0 small text-light opacity-75">{prediction.variable_impact}</p>
        </div>
      )}

    </div>
  );
};

export default RiskCard;