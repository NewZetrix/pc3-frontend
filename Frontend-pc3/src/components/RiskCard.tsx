// src/components/RiskCard.tsx
import type { RiskPrediction } from '../types';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface Props {
  prediction: RiskPrediction;
}

const RiskCard = ({ prediction }: Props) => {
  const riskConfig = {
    RIESGO_ALTO: { 
      color: 'red', 
      icon: AlertTriangle, 
      label: 'RIESGO ALTO', 
      bg: 'bg-red-50 border-red-200' 
    },
    RIESGO_MEDIO: { 
      color: 'yellow', 
      icon: AlertCircle, 
      label: 'RIESGO MEDIO', 
      bg: 'bg-yellow-50 border-yellow-200' 
    },
    RIESGO_BAJO: { 
      color: 'green', 
      icon: CheckCircle, 
      label: 'RIESGO BAJO', 
      bg: 'bg-green-50 border-green-200' 
    },
  };

  const config = riskConfig[prediction.risk];

  return (
    <div className={`rounded-3xl p-8 ${config.bg} border-2`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <config.icon className={`w-12 h-12 text-${config.color}-600`} />
          <div>
            <p className="text-sm font-medium text-gray-600">NIVEL DE RIESGO</p>
            <h3 className={`text-4xl font-bold text-${config.color}-600`}>
              {config.label}
            </h3>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Confianza</p>
          <p className="text-5xl font-bold text-gray-800">{prediction.confidence}%</p>
        </div>
      </div>

      {prediction.explanation && (
        <p className="text-gray-700 mb-4">{prediction.explanation}</p>
      )}

      {prediction.recommendation && (
        <div className="bg-white/70 p-5 rounded-2xl">
          <p className="font-semibold text-gray-800 mb-2">💡 Recomendación:</p>
          <p className="text-gray-700">{prediction.recommendation}</p>
        </div>
      )}

      {prediction.variable_impact && (
        <div className="mt-4 text-sm italic text-gray-600 border-l-4 border-gray-400 pl-4">
          {prediction.variable_impact}
        </div>
      )}
    </div>
  );
};

export default RiskCard;