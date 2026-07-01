// src/components/History.tsx
import type { HistoryItem } from '../types';

interface Props {
  history: HistoryItem[];
}

const History = ({ history }: Props) => {
  if (history.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow p-8 text-center text-gray-500">
        Aún no hay evaluaciones. Realiza tu primera predicción.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-5 flex items-center gap-2">
        📜 Historial de Evaluaciones
      </h3>

      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {history.map((item) => (
          <div 
            key={item.id}
            className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors p-5 rounded-2xl border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className={`w-4 h-4 rounded-full ${
                item.prediction.risk === 'RIESGO_ALTO' ? 'bg-red-500' :
                item.prediction.risk === 'RIESGO_MEDIO' ? 'bg-yellow-500' : 'bg-green-500'
              }`} />
              
              <div>
                <p className="font-medium">{item.date}</p>
                <p className="text-sm text-gray-500">
                  Promedio: {item.promedio_actual} | Asistencia: {item.asistencia_pct}%
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-white ${
                item.prediction.risk === 'RIESGO_ALTO' ? 'bg-red-500' :
                item.prediction.risk === 'RIESGO_MEDIO' ? 'bg-yellow-500' : 'bg-green-500'
              }`}>
                {item.prediction.risk.replace('RIESGO_', '')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;