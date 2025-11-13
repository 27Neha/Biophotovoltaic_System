import React from 'react';
import { motion } from 'framer-motion';
import { TreePine, Globe, Wind, Leaf } from 'lucide-react';

function EnvironmentalAnalysis({ userData, updateUserData, onNext, onPrevious }) {
  return (
    <div className="environmental-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="environmental-container"
      >
        <div className="environmental-header">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="icon-container"
          >
            <Globe size={48} />
          </motion.div>

          <h1>Environmental Analysis</h1>
          <p>Climate impact and sustainability assessment</p>
        </div>

        <div className="environmental-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="env-card"
          >
            <h3><Leaf size={20} /> Carbon Footprint</h3>
            <div className="carbon-metric">
              <span className="metric-value">-92%</span>
              <span className="metric-label">vs Traditional Solar</span>
            </div>
            <p>Manufacturing emissions reduced by using natural fruit electrolytes instead of silicon</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="env-card"
          >
            <h3><Wind size={20} /> Climate Adaptation</h3>
            <div className="climate-score">
              <span className="score-value">A+</span>
              <span className="score-label">Climate Rating</span>
            </div>
            <p>Optimized for {userData.weather?.cloudCover > 50 ? 'cloudy' : 'sunny'} conditions in {userData.city}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="env-card"
          >
            <h3><TreePine size={20} /> Sustainability</h3>
            <div className="sustainability-metrics">
              <div className="metric">
                <span>Biodegradable</span>
                <span className="indicator good">✓</span>
              </div>
              <div className="metric">
                <span>Renewable Source</span>
                <span className="indicator good">✓</span>
              </div>
              <div className="metric">
                <span>Low Impact</span>
                <span className="indicator good">✓</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="environmental-summary"
        >
          <h3>Environmental Benefits Summary</h3>
          <div className="benefits-list">
            <div className="benefit">
              <span className="benefit-icon">🌱</span>
              <span>100% natural and biodegradable electrolytes</span>
            </div>
            <div className="benefit">
              <span className="benefit-icon">♻️</span>
              <span>Minimal manufacturing carbon footprint</span>
            </div>
            <div className="benefit">
              <span className="benefit-icon">🌍</span>
              <span>Climate-adaptive performance optimization</span>
            </div>
            <div className="benefit">
              <span className="benefit-icon">💚</span>
              <span>Sustainable fruit sourcing with circular economy</span>
            </div>
          </div>
        </motion.div>

        <div className="completion-message">
          <h2>🎉 Congratulations!</h2>
          <p>Your personalized biophotovoltaic system is ready for implementation in {userData.city}</p>
        </div>

        <div className="form-actions">
          <button
            onClick={onPrevious}
            className="btn-secondary"
          >
            Previous
          </button>

          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Start New Analysis
          </button>
        </div>
      </motion.div>

      <style jsx>{`
        .environmental-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .environmental-container {
          max-width: 900px;
          width: 100%;
        }

        .environmental-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .icon-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, rgba(74, 222, 128, 0.2) 0%, rgba(34, 197, 94, 0.2) 100%);
          border: 2px solid rgba(74, 222, 128, 0.5);
          border-radius: 50%;
          margin-bottom: 24px;
          color: #4ade80;
        }

        h1 {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .environmental-header p {
          font-size: 1.1rem;
          line-height: 1.6;
          opacity: 0.9;
          color: rgba(255, 255, 255, 0.8);
        }

        .environmental-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .env-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 32px;
          text-align: center;
        }

        .env-card h3 {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 20px;
          color: #4ade80;
        }

        .carbon-metric,
        .climate-score {
          margin-bottom: 16px;
        }

        .metric-value,
        .score-value {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: #4ade80;
          margin-bottom: 4px;
        }

        .metric-label,
        .score-label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        .env-card p {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
        }

        .sustainability-metrics {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .metric {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .indicator {
          font-weight: 600;
        }

        .indicator.good {
          color: #4ade80;
        }

        .environmental-summary {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 32px;
        }

        .environmental-summary h3 {
          text-align: center;
          margin-bottom: 24px;
          color: #4ade80;
        }

        .benefits-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }

        .benefit {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .benefit-icon {
          font-size: 1.2rem;
        }

        .completion-message {
          text-align: center;
          background: linear-gradient(135deg, rgba(74, 222, 128, 0.2) 0%, rgba(34, 197, 94, 0.2) 100%);
          border: 1px solid rgba(74, 222, 128, 0.5);
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 32px;
        }

        .completion-message h2 {
          font-size: 1.8rem;
          margin-bottom: 12px;
          color: #4ade80;
        }

        .completion-message p {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .form-actions {
          display: flex;
          gap: 16px;
          justify-content: space-between;
        }

        .btn-secondary,
        .btn-primary {
          padding: 14px 28px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .btn-primary {
          background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 25px rgba(74, 222, 128, 0.3);
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 1.8rem;
          }

          .environmental-grid {
            grid-template-columns: 1fr;
          }

          .benefits-list {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column;
          }

          .btn-secondary,
          .btn-primary {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default EnvironmentalAnalysis;