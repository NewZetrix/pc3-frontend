import type { HistoryItem } from '../types';

interface Props {
  history: HistoryItem[];
}

const History = ({ history }: Props) => {
  if (history.length === 0) {
    return (
      <div className="card border-0 p-5 text-center text-secondary rounded-4" style={{ backgroundColor: '#1e1e1e' }}>
        Aún no hay evaluaciones. Realiza tu primera predicción.
      </div>
    );
  }

  return (
    <div className="card border-0 p-4 rounded-4 text-light" style={{ backgroundColor: '#1e1e1e' }}>
      <h3 className="fs-5 fw-bold mb-4 d-flex align-items-center gap-2">
        📜 Historial de Evaluaciones
      </h3>

      <div className="d-flex flex-column gap-3 overflow-y-auto pe-2" style={{ maxHeight: '380px' }}>
        {history.map((item) => {
          const colorMap = {
            RIESGO_ALTO: '#dc3545',
            RIESGO_MEDIO: '#ffc107',
            RIESGO_BAJO: '#198754'
          };
          const currentColor = colorMap[item.prediction.risk] || '#6c757d';

          return (
            <div 
              key={item.id}
              className="d-flex flex-column flex-md-row align-items-md-center justify-content-between p-3 rounded-4 transition border border-secondary-subtle"
              style={{ 
                backgroundColor: '#2d2d2d',
                transition: 'background-color 0.2s ease'
              }}
            >
              <div className="d-flex align-items-center gap-3 mb-2 mb-md-0">
                <div 
                  className="rounded-circle flex-shrink-0" 
                  style={{ 
                    width: '14px', 
                    height: '14px', 
                    backgroundColor: currentColor,
                    boxShadow: `0 0 8px ${currentColor}` 
                  }} 
                />
                
                <div>
                  <p className="fw-bold m-0 small text-white">{item.date}</p>
                  <p className="text-secondary small m-0" style={{ fontSize: '0.82rem' }}>
                    Promedio: <strong className="text-light">{item.promedio_actual}</strong> | Asistencia: <strong className="text-light">{item.asistencia_pct}%</strong>
                  </p>
                </div>
              </div>

              <div className="text-start text-md-end">
                <span 
                  className="badge rounded-pill px-3 py-2 fw-bold text-uppercase" 
                  style={{ 
                    backgroundColor: `${currentColor}22`,
                    color: currentColor, 
                    border: `1px solid ${currentColor}`,
                    fontSize: '0.75rem'
                  }}
                >
                  {item.prediction.risk.replace('RIESGO_', '')}
                </span>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;