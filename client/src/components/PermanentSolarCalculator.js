import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Zap, Battery, Home, Monitor, Wind } from 'lucide-react';

// Device categories from planning
const DEVICE_CATEGORIES = {
  small: {
    name: 'Small Devices',
    powerRange: '<5W',
    description: 'Perfect for charging phones, LED lights, and small electronics',
    examples: ['LED lights (1-3W)', 'Phone chargers (5W)', 'USB fans (2-4W)', 'Bluetooth speakers'],
    panelSize: '0.5-2 sq ft',
    color: '#4ade80'
  },
  medium: {
    name: 'Medium Devices',
    powerRange: '5-50W',
    description: 'Ideal for laptops, tablets, and small appliances',
    examples: ['Laptop chargers (45W)', 'Tablets (10-25W)', 'Small fans (15-30W)', 'LED TV strips (20-40W)'],
    panelSize: '2-10 sq ft',
    color: '#fbbf24'
  },
  large: {
    name: 'Large Devices',
    powerRange: '50-500W',
    description: 'Power desktop computers, entertainment systems, and appliances',
    examples: ['Desktop computers (200-400W)', 'Gaming consoles (150-300W)', 'Mini-fridges (100-200W)'],
    panelSize: '10-50 sq ft',
    color: '#f87171'
  }
};

function PermanentSolarCalculator({ userData, updateUserData, onNext, onPrevious }) {
  const [deviceCategory, setDeviceCategory] = useState('');
  const [panelSize, setPanelSize] = useState(2);
  const [installationDate, setInstallationDate] = useState('');
  const [calculations, setCalculations] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setInstallationDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const calculateSystem = async () => {
    if (!deviceCategory || !panelSize || !installationDate || !userData.selectedFruit) {
      return;
    }

    setIsCalculating(true);

    // Simulate calculation API call
    setTimeout(() => {
      const fruit = userData.selectedFruit;
      const weather = userData.weather;

      // Power calculations based on planning specifications
      const basePower = fruit.powerDensityPerSqFt * panelSize;

      // Climate adjustment
      const climateFactor = weather.cloudCover > 50
        ? fruit.lowLightEfficiency
        : fruit.highUVEfficiency;

      const averagePower = basePower * climateFactor;
      const dailyGeneration = averagePower * 6; // 6 hours average daylight

      // Installation costs
      const juiceRequired = panelSize * 175; // ml per sq ft
      const resinRequired = juiceRequired * 0.5; // 50% of juice amount
      const installationCost = (juiceRequired / 1000) * fruit.costPerKg * 2 + (resinRequired / 1000) * 5;

      // Device compatibility
      const category = DEVICE_CATEGORIES[deviceCategory];
      const canPowerCategory = averagePower >= parseFloat(category.powerRange.replace(/[^\d.]/g, '')) || category.powerRange === '<5W';

      const results = {
        averagePower: averagePower.toFixed(2),
        dailyGeneration: dailyGeneration.toFixed(1),
        monthlyGeneration: (dailyGeneration * 30).toFixed(0),
        juiceRequired: juiceRequired.toFixed(0),
        resinRequired: resinRequired.toFixed(0),
        installationCost: installationCost.toFixed(2),
        lifespan: 18, // months
        canPowerCategory,
        powerDensity: fruit.powerDensityPerSqFt,
        efficiency: (fruit.efficiency * 100).toFixed(0),
        climateFactor: (climateFactor * 100).toFixed(0)
      };

      setCalculations(results);
      updateUserData({
        deviceCategory,
        panelSize,
        installationDate,
        results
      });

      setIsCalculating(false);
    }, 2000);
  };

  const handleCalculate = () => {
    calculateSystem();
  };

  const canProceed = calculations;

  return (
    <div className="calculator-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="calculator-container"
      >
        <div className="calculator-header">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="icon-container"
          >
            <Calculator size={48} />
          </motion.div>

          <h1>Permanent Solar Panel Calculator</h1>
          <p>
            Design your one-time installation fruit juice electrolyte system.
            Calculate power output, costs, and device compatibility for {userData.city}.
          </p>
        </div>

        {/* Selected Fruit Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="selected-fruit"
        >
          <h3>Selected Electrolyte Source</h3>
          <div className="fruit-display">
            <div className="fruit-info">
              <h4>{userData.selectedFruit.name}</h4>
              <p>{userData.selectedFruit.description}</p>
            </div>
            <div className="fruit-stats">
              <div className="stat">
                <span className="stat-label">Efficiency</span>
                <span className="stat-value">{(userData.selectedFruit.efficiency * 100).toFixed(0)}%</span>
              </div>
              <div className="stat">
                <span className="stat-label">Cost/kg</span>
                <span className="stat-value">${userData.selectedFruit.costPerKg.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="calculator-form">
          {/* Device Category Selection */}
          <div className="form-section">
            <h3>What devices do you want to power?</h3>
            <div className="device-categories">
              {Object.entries(DEVICE_CATEGORIES).map(([key, category]) => (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`device-card ${deviceCategory === key ? 'selected' : ''}`}
                  onClick={() => setDeviceCategory(key)}
                  style={{ borderColor: deviceCategory === key ? category.color : undefined }}
                >
                  <div className="device-header">
                    <div className="device-icon">
                      {key === 'small' && <Battery size={24} />}
                      {key === 'medium' && <Monitor size={24} />}
                      {key === 'large' && <Home size={24} />}
                    </div>
                    <div className="device-title">
                      <h4>{category.name}</h4>
                      <span className="power-range">{category.powerRange}</span>
                    </div>
                  </div>

                  <p className="device-description">{category.description}</p>

                  <div className="device-examples">
                    <strong>Examples:</strong>
                    <ul>
                      {category.examples.map((example, idx) => (
                        <li key={idx}>{example}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="device-requirement">
                    <span>Panel Size: {category.panelSize}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Panel Size Input */}
          <div className="form-section">
            <h3>Panel Size (Square Feet)</h3>
            <div className="panel-size-control">
              <input
                type="range"
                min="0.5"
                max="50"
                step="0.5"
                value={panelSize}
                onChange={(e) => setPanelSize(parseFloat(e.target.value))}
                className="size-slider"
              />
              <div className="size-display">
                <span className="size-value">{panelSize} sq ft</span>
                <span className="size-dimensions">
                  ≈ {Math.sqrt(panelSize).toFixed(1)} × {Math.sqrt(panelSize).toFixed(1)} ft
                </span>
              </div>
            </div>
          </div>

          {/* Installation Date */}
          <div className="form-section">
            <h3>Installation Date</h3>
            <input
              type="date"
              value={installationDate}
              onChange={(e) => setInstallationDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="date-input"
            />
          </div>

          {/* Calculate Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCalculate}
            disabled={!deviceCategory || !panelSize || !installationDate || isCalculating}
            className="calculate-btn"
          >
            {isCalculating ? (
              <>
                <div className="spinner"></div>
                Calculating Your System...
              </>
            ) : (
              <>
                <Zap size={20} />
                Calculate Power Generation
              </>
            )}
          </motion.button>
        </div>

        {/* Results */}
        {calculations && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="calculation-results"
          >
            <h3>Your System Specifications</h3>

            <div className="results-grid">
              <div className="result-card">
                <h4>Power Generation</h4>
                <div className="result-metrics">
                  <div className="metric">
                    <span className="metric-label">Average Power</span>
                    <span className="metric-value">{calculations.averagePower}W</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Daily Generation</span>
                    <span className="metric-value">{calculations.dailyGeneration}Wh</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Monthly Generation</span>
                    <span className="metric-value">{calculations.monthlyGeneration}Wh</span>
                  </div>
                </div>
              </div>

              <div className="result-card">
                <h4>Installation Requirements</h4>
                <div className="result-metrics">
                  <div className="metric">
                    <span className="metric-label">Fruit Juice Needed</span>
                    <span className="metric-value">{calculations.juiceRequired}ml</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Activating Resin</span>
                    <span className="metric-value">{calculations.resinRequired}ml</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Installation Cost</span>
                    <span className="metric-value">${calculations.installationCost}</span>
                  </div>
                </div>
              </div>

              <div className="result-card">
                <h4>System Performance</h4>
                <div className="result-metrics">
                  <div className="metric">
                    <span className="metric-label">Efficiency</span>
                    <span className="metric-value">{calculations.efficiency}%</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Climate Adaptation</span>
                    <span className="metric-value">{calculations.climateFactor}%</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">System Lifespan</span>
                    <span className="metric-value">{calculations.lifespan} months</span>
                  </div>
                </div>
              </div>
            </div>

            {calculations.canPowerCategory && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="success-message"
              >
                <Zap size={24} />
                <span>
                  Perfect! Your system can power {DEVICE_CATEGORIES[deviceCategory].name.toLowerCase()}
                  with {calculations.averagePower}W average output.
                </span>
              </motion.div>
            )}
          </motion.div>
        )}

        <div className="form-actions">
          <button
            onClick={onPrevious}
            className="btn-secondary"
          >
            Previous
          </button>

          <button
            onClick={onNext}
            disabled={!canProceed}
            className="btn-primary"
          >
            View Results Dashboard
          </button>
        </div>
      </motion.div>

      <style jsx>{`
        .calculator-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .calculator-container {
          max-width: 1000px;
          width: 100%;
        }

        .calculator-header {
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

        .calculator-header p {
          font-size: 1.1rem;
          line-height: 1.6;
          opacity: 0.9;
          color: rgba(255, 255, 255, 0.8);
        }

        .selected-fruit {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
        }

        .selected-fruit h3 {
          text-align: center;
          margin-bottom: 16px;
          color: #4ade80;
        }

        .fruit-display {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .fruit-info h4 {
          font-size: 1.3rem;
          margin-bottom: 4px;
          color: #ffffff;
        }

        .fruit-info p {
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        .fruit-stats {
          display: flex;
          gap: 24px;
        }

        .stat {
          text-align: center;
        }

        .stat-label {
          display: block;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 4px;
        }

        .stat-value {
          display: block;
          font-size: 1.2rem;
          font-weight: 600;
          color: #4ade80;
        }

        .calculator-form {
          display: flex;
          flex-direction: column;
          gap: 32px;
          margin-bottom: 32px;
        }

        .form-section h3 {
          margin-bottom: 16px;
          color: #ffffff;
        }

        .device-categories {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .device-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .device-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }

        .device-card.selected {
          border-width: 3px;
          background: rgba(255, 255, 255, 0.15);
        }

        .device-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .device-icon {
          color: #4ade80;
        }

        .device-title h4 {
          margin: 0;
          color: #ffffff;
        }

        .power-range {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .device-description {
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 16px;
          line-height: 1.5;
        }

        .device-examples {
          margin-bottom: 16px;
        }

        .device-examples strong {
          color: #4ade80;
          font-size: 0.9rem;
        }

        .device-examples ul {
          margin: 4px 0 0 0;
          padding-left: 16px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.85rem;
        }

        .device-requirement {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .panel-size-control {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 20px;
        }

        .size-slider {
          width: 100%;
          margin-bottom: 16px;
          -webkit-appearance: none;
          appearance: none;
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          outline: none;
        }

        .size-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          background: #4ade80;
          border-radius: 50%;
          cursor: pointer;
        }

        .size-display {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .size-value {
          font-size: 1.5rem;
          font-weight: 600;
          color: #4ade80;
        }

        .size-dimensions {
          color: rgba(255, 255, 255, 0.6);
        }

        .date-input {
          width: 100%;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          font-size: 1rem;
          backdrop-filter: blur(10px);
        }

        .date-input:focus {
          outline: none;
          border-color: #4ade80;
          box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.2);
        }

        .calculate-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 16px 32px;
          background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(74, 222, 128, 0.4);
        }

        .calculate-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(74, 222, 128, 0.6);
        }

        .calculate-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .calculation-results {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 32px;
        }

        .calculation-results h3 {
          text-align: center;
          margin-bottom: 24px;
          color: #4ade80;
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-bottom: 24px;
        }

        .result-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 20px;
        }

        .result-card h4 {
          margin-bottom: 16px;
          color: #ffffff;
          text-align: center;
        }

        .result-metrics {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .metric {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .metric-label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        .metric-value {
          color: #4ade80;
          font-weight: 600;
        }

        .success-message {
          display: flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, rgba(74, 222, 128, 0.2) 0%, rgba(34, 197, 94, 0.2) 100%);
          border: 1px solid rgba(74, 222, 128, 0.5);
          border-radius: 12px;
          padding: 16px 20px;
          color: #4ade80;
          text-align: center;
          justify-content: center;
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

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 1.8rem;
          }

          .device-categories {
            grid-template-columns: 1fr;
          }

          .results-grid {
            grid-template-columns: 1fr;
          }

          .fruit-display {
            flex-direction: column;
            gap: 16px;
            text-align: center;
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

export default PermanentSolarCalculator;