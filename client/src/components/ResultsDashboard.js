import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Zap, Droplets, Wind, TrendingUp, Calendar } from 'lucide-react';

function ResultsDashboard({ userData, updateUserData, onNext, onPrevious }) {
  const { results, selectedFruit, city } = userData;

  if (!results) {
    return (
      <div className="results-screen">
        <div className="no-results">
          <h2>No Results Available</h2>
          <p>Please complete the calculator to see your results.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="results-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="results-container"
      >
        <div className="results-header">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="icon-container"
          >
            <BarChart3 size={48} />
          </motion.div>

          <h1>Your Biophotovoltaic System Results</h1>
          <p>
            Complete analysis for your {selectedFruit.name} electrolyte system in {city}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="metrics-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="metric-card primary"
          >
            <div className="metric-header">
              <Zap size={24} />
              <span>Power Output</span>
            </div>
            <div className="metric-value">{results.averagePower}W</div>
            <div className="metric-label">Average Power Generation</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="metric-card"
          >
            <div className="metric-header">
              <TrendingUp size={24} />
              <span>Daily Generation</span>
            </div>
            <div className="metric-value">{results.dailyGeneration}Wh</div>
            <div className="metric-label">Per Day</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="metric-card"
          >
            <div className="metric-header">
              <Calendar size={24} />
              <span>Lifespan</span>
            </div>
            <div className="metric-value">{results.lifespan} months</div>
            <div className="metric-label">System Duration</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="metric-card"
          >
            <div className="metric-header">
              <Droplets size={24} />
              <span>Installation</span>
            </div>
            <div className="metric-value">${results.installationCost}</div>
            <div className="metric-label">One-Time Cost</div>
          </motion.div>
        </div>

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="performance-chart"
        >
          <h3>Monthly Power Generation Forecast</h3>
          <div className="chart-placeholder">
            <div className="chart-bars">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="chart-bar" style={{ height: `${50 + Math.random() * 50}%` }} />
              ))}
            </div>
            <div className="chart-labels">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                <span key={month}>{month}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Cost Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="cost-analysis"
        >
          <h3>Cost Analysis</h3>
          <div className="cost-breakdown">
            <div className="cost-item">
              <span className="cost-label">Installation Cost</span>
              <span className="cost-value">${results.installationCost}</span>
            </div>
            <div className="cost-item">
              <span className="cost-label">Monthly Generation Value</span>
              <span className="cost-value">${(parseFloat(results.monthlyGeneration) * 0.12).toFixed(2)}</span>
            </div>
            <div className="cost-item">
              <span className="cost-label">ROI Period</span>
              <span className="cost-value">{Math.ceil(parseFloat(results.installationCost) / (parseFloat(results.monthlyGeneration) * 0.12))} months</span>
            </div>
          </div>
        </motion.div>

        <div className="form-actions">
          <button
            onClick={onPrevious}
            className="btn-secondary"
          >
            Previous
          </button>

          <button
            onClick={onNext}
            className="btn-primary"
          >
            View Technical Specifications
          </button>
        </div>
      </motion.div>

      <style jsx>{`
        .results-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .results-container {
          max-width: 1000px;
          width: 100%;
        }

        .results-header {
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

        .results-header p {
          font-size: 1.1rem;
          line-height: 1.6;
          opacity: 0.9;
          color: rgba(255, 255, 255, 0.8);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .metric-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .metric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          border-color: rgba(74, 222, 128, 0.5);
        }

        .metric-card.primary {
          background: linear-gradient(135deg, rgba(74, 222, 128, 0.2) 0%, rgba(34, 197, 94, 0.2) 100%);
          border-color: rgba(74, 222, 128, 0.5);
        }

        .metric-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 12px;
          color: #4ade80;
          font-weight: 500;
        }

        .metric-value {
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .metric-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .performance-chart {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 32px;
        }

        .performance-chart h3 {
          text-align: center;
          margin-bottom: 24px;
          color: #4ade80;
        }

        .chart-placeholder {
          height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .chart-bars {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 160px;
          gap: 4px;
          margin-bottom: 16px;
        }

        .chart-bar {
          flex: 1;
          background: linear-gradient(to top, #4ade80, #22c55e);
          border-radius: 4px 4px 0 0;
          min-height: 20px;
        }

        .chart-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .cost-analysis {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 32px;
        }

        .cost-analysis h3 {
          text-align: center;
          margin-bottom: 24px;
          color: #4ade80;
        }

        .cost-breakdown {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .cost-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .cost-label {
          color: rgba(255, 255, 255, 0.8);
        }

        .cost-value {
          font-weight: 600;
          color: #4ade80;
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

        .no-results {
          text-align: center;
          padding: 60px 20px;
          color: rgba(255, 255, 255, 0.8);
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 1.8rem;
          }

          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .cost-breakdown {
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

export default ResultsDashboard;