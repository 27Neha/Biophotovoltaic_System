import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Zap, Battery, Wrench } from 'lucide-react';

function TechSpecs({ userData, updateUserData, onNext, onPrevious }) {
  return (
    <div className="tech-specs-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="tech-specs-container"
      >
        <div className="tech-specs-header">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="icon-container"
          >
            <Settings size={48} />
          </motion.div>

          <h1>Technical Specifications</h1>
          <p>Detailed technical information for your biophotovoltaic system</p>
        </div>

        <div className="specs-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="spec-card"
          >
            <h3><Zap size={20} /> Electrical Specifications</h3>
            <div className="spec-list">
              <div className="spec-item">
                <span>Voltage Output</span>
                <span>1.2V - 5V</span>
              </div>
              <div className="spec-item">
                <span>Current Density</span>
                <span>50-100 μA/cm²</span>
              </div>
              <div className="spec-item">
                <span>Power Density</span>
                <span>0.8-1.2 mW/cm²</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="spec-card"
          >
            <h3><Battery size={20} /> Performance Metrics</h3>
            <div className="spec-list">
              <div className="spec-item">
                <span>Efficiency</span>
                <span>{userData.selectedFruit ? (userData.selectedFruit.efficiency * 100).toFixed(0) : '85'}%</span>
              </div>
              <div className="spec-item">
                <span>Faraday Efficiency</span>
                <span>~95%</span>
              </div>
              <div className="spec-item">
                <span>Response Time</span>
                <span>&lt;2 seconds</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="spec-card"
          >
            <h3><Wrench size={20} /> Installation Requirements</h3>
            <div className="spec-list">
              <div className="spec-item">
                <span>Panel Thickness</span>
                <span>5-10mm</span>
              </div>
              <div className="spec-item">
                <span>Operating Temperature</span>
                <span>15°C - 45°C</span>
              </div>
              <div className="spec-item">
                <span>Humidity Range</span>
                <span>30% - 80%</span>
              </div>
            </div>
          </motion.div>
        </div>

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
            View Chemical Properties
          </button>
        </div>
      </motion.div>

      <style jsx>{`
        .tech-specs-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .tech-specs-container {
          max-width: 800px;
          width: 100%;
        }

        .tech-specs-header {
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

        .tech-specs-header p {
          font-size: 1.1rem;
          line-height: 1.6;
          opacity: 0.9;
          color: rgba(255, 255, 255, 0.8);
        }

        .specs-grid {
          display: grid;
          gap: 24px;
          margin-bottom: 40px;
        }

        .spec-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 32px;
        }

        .spec-card h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
          color: #4ade80;
        }

        .spec-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .spec-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .spec-item span:first-child {
          color: rgba(255, 255, 255, 0.8);
        }

        .spec-item span:last-child {
          color: #4ade80;
          font-weight: 500;
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

export default TechSpecs;