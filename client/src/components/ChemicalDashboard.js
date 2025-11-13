import React from 'react';
import { motion } from 'framer-motion';
import { Flask, Droplets, TestTube, Activity } from 'lucide-react';

function ChemicalDashboard({ userData, updateUserData, onNext, onPrevious }) {
  return (
    <div className="chemical-dashboard-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="chemical-dashboard-container"
      >
        <div className="chemical-header">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="icon-container"
          >
            <Flask size={48} />
          </motion.div>

          <h1>Chemical Properties</h1>
          <p>Scientific analysis of your fruit electrolyte system</p>
        </div>

        <div className="chemical-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="chemical-card"
          >
            <h3><Droplets size={20} /> pH Levels</h3>
            <div className="ph-indicator">
              <div className="ph-bar">
                <div className="ph-fill" style={{ width: '40%', backgroundColor: '#4ade80' }} />
              </div>
              <span>pH: {userData.selectedFruit?.phLevel || 5.8}</span>
            </div>
            <p className="acidity-level">Acidity: {userData.selectedFruit?.acidity || 'Medium'}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="chemical-card"
          >
            <h3><TestTube size={20} /> Redox Compounds</h3>
            <div className="compound-list">
              <div className="compound">
                <span>NADPH</span>
                <span>High</span>
              </div>
              <div className="compound">
                <span>Flavins</span>
                <span>Medium</span>
              </div>
              <div className="compound">
                <span>Ascorbic Acid</span>
                <span>High</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="chemical-card"
          >
            <h3><Activity size={20} /> Electrochemical Properties</h3>
            <div className="property-list">
              <div className="property">
                <span>Conductivity</span>
                <span>0.8 S/m</span>
              </div>
              <div className="property">
                <span>Redox Potential</span>
                <span>-0.32V</span>
              </div>
              <div className="property">
                <span>Ion Concentration</span>
                <span>2.1 mol/L</span>
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
            View Environmental Impact
          </button>
        </div>
      </motion.div>

      <style jsx>{`
        .chemical-dashboard-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .chemical-dashboard-container {
          max-width: 800px;
          width: 100%;
        }

        .chemical-header {
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

        .chemical-header p {
          font-size: 1.1rem;
          line-height: 1.6;
          opacity: 0.9;
          color: rgba(255, 255, 255, 0.8);
        }

        .chemical-grid {
          display: grid;
          gap: 24px;
          margin-bottom: 40px;
        }

        .chemical-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 32px;
        }

        .chemical-card h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
          color: #4ade80;
        }

        .ph-indicator {
          margin-bottom: 16px;
        }

        .ph-bar {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          margin-bottom: 8px;
        }

        .ph-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease;
        }

        .ph-indicator > span {
          color: #ffffff;
          font-weight: 500;
        }

        .acidity-level {
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        .compound-list,
        .property-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .compound,
        .property {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .compound span:first-child,
        .property span:first-child {
          color: rgba(255, 255, 255, 0.8);
        }

        .compound span:last-child,
        .property span:last-child {
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

export default ChemicalDashboard;