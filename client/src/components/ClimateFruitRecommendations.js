import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplets, Sun, Cloud, Thermometer, Zap, Check } from 'lucide-react';

// Mock fruit database based on planning specifications
const FRUIT_DATABASE = [
  {
    id: 'beetroot',
    name: 'Beetroot',
    scientificName: 'Beta vulgaris',
    climateSpecialization: 'cloudy',
    phLevel: 5.8,
    acidity: 'medium',
    efficiency: 0.85,
    costPerKg: 0.12,
    powerDensityPerSqFt: 1.2,
    lowLightEfficiency: 0.90,
    highUVEfficiency: 0.65,
    photosyntheticPigments: {
      betalains: 50,
      flavonoids: 30
    },
    description: 'Excellent performance in cloudy regions with high betalain pigments',
    image: '/images/beetroot.jpg'
  },
  {
    id: 'orange',
    name: 'Orange',
    scientificName: 'Citrus sinensis',
    climateSpecialization: 'sunny',
    phLevel: 3.5,
    acidity: 'high',
    efficiency: 0.92,
    costPerKg: 0.18,
    powerDensityPerSqFt: 1.8,
    lowLightEfficiency: 0.45,
    highUVEfficiency: 0.95,
    photosyntheticPigments: {
      carotenoids: 40,
      flavonoids: 25
    },
    description: 'Optimized for sunny regions with high UV response',
    image: '/images/orange.jpg'
  },
  {
    id: 'purple_grape',
    name: 'Purple Grapes',
    scientificName: 'Vitis vinifera',
    climateSpecialization: 'cloudy',
    phLevel: 3.4,
    acidity: 'high',
    efficiency: 0.78,
    costPerKg: 0.25,
    powerDensityPerSqFt: 1.0,
    lowLightEfficiency: 0.85,
    highUVEfficiency: 0.70,
    photosyntheticPigments: {
      anthocyanins: 45,
      flavonoids: 35
    },
    description: 'Rich in anthocyanins, performs well in overcast conditions',
    image: '/images/grapes.jpg'
  },
  {
    id: 'mango',
    name: 'Mango',
    scientificName: 'Mangifera indica',
    climateSpecialization: 'sunny',
    phLevel: 4.2,
    acidity: 'medium',
    efficiency: 0.88,
    costPerKg: 0.35,
    powerDensityPerSqFt: 1.6,
    lowLightEfficiency: 0.50,
    highUVEfficiency: 0.92,
    photosyntheticPigments: {
      carotenoids: 35,
      flavonoids: 20
    },
    description: 'Tropical adaptation with heat-resistant electrolytes',
    image: '/images/mango.jpg'
  },
  {
    id: 'blueberry',
    name: 'Blueberry',
    scientificName: 'Vaccinium corymbosum',
    climateSpecialization: 'cloudy',
    phLevel: 4.8,
    acidity: 'medium',
    efficiency: 0.75,
    costPerKg: 0.42,
    powerDensityPerSqFt: 0.9,
    lowLightEfficiency: 0.80,
    highUVEfficiency: 0.68,
    photosyntheticPigments: {
      anthocyanins: 40,
      flavonoids: 30
    },
    description: 'High flavonoids, effective in cloudy weather',
    image: '/images/blueberry.jpg'
  }
];

function ClimateFruitRecommendations({ userData, updateUserData, onNext, onPrevious }) {
  const [recommendations, setRecommendations] = useState([]);
  const [selectedFruit, setSelectedFruit] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    if (userData.weather) {
      calculateRecommendations();
    }
  }, [userData.weather]);

  const calculateRecommendations = () => {
    setIsCalculating(true);

    // Simulate API call delay
    setTimeout(() => {
      const { uvIndex, cloudCover, temperature } = userData.weather;

      // Calculate climate-adaptive scores
      const scoredFruits = FRUIT_DATABASE.map(fruit => {
        let score = 0;

        // Climate adaptation scoring
        if (cloudCover > 50) {
          // Cloudy region - prioritize low-light efficiency
          score += fruit.lowLightEfficiency * 40;
          if (fruit.climateSpecialization === 'cloudy') {
            score += 20;
          }
        } else {
          // Sunny region - prioritize UV efficiency
          score += fruit.highUVEfficiency * 40;
          if (fruit.climateSpecialization === 'sunny') {
            score += 20;
          }
        }

        // UV Index optimization
        if (uvIndex >= 6) {
          score += fruit.highUVEfficiency * 20;
        } else {
          score += fruit.lowLightEfficiency * 20;
        }

        // Temperature optimization
        if (temperature >= 15 && temperature <= 35) {
          score += 15;
        }

        // Cost efficiency (lower cost = higher score)
        score += (1 - Math.min(fruit.costPerKg / 0.5, 1)) * 10;

        // Overall efficiency
        score += fruit.efficiency * 15;

        return {
          ...fruit,
          climateScore: Math.round(score)
        };
      });

      // Sort by climate score and take top 3
      const topRecommendations = scoredFruits
        .sort((a, b) => b.climateScore - a.climateScore)
        .slice(0, 3);

      setRecommendations(topRecommendations);
      setIsCalculating(false);
    }, 1500);
  };

  const handleFruitSelection = (fruit) => {
    setSelectedFruit(fruit);
    updateUserData({ selectedFruit: fruit });
  };

  const canProceed = selectedFruit;

  const getClimateType = () => {
    if (userData.weather.cloudCover > 50) return 'Cloudy';
    return 'Sunny';
  };

  const getSuitabilityColor = (score) => {
    if (score >= 85) return '#4ade80';
    if (score >= 70) return '#fbbf24';
    return '#f87171';
  };

  return (
    <div className="recommendations-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="recommendations-container"
      >
        <div className="recommendations-header">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="climate-badge"
          >
            <Cloud size={24} />
            <span>{getClimateType()} Climate</span>
          </motion.div>

          <h1>Climate-Optimized Fruit Recommendations</h1>
          <p>
            Based on {userData.city}'s weather conditions, we've selected the best fruits
            for optimal biophotovoltaic performance in your region.
          </p>
        </div>

        {/* Climate Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="climate-analysis"
        >
          <h3>Your Climate Analysis</h3>
          <div className="climate-metrics">
            <div className="metric">
              <Sun size={20} />
              <span>UV Index: {userData.weather.uvIndex}</span>
            </div>
            <div className="metric">
              <Cloud size={20} />
              <span>Cloud Cover: {userData.weather.cloudCover}%</span>
            </div>
            <div className="metric">
              <Thermometer size={20} />
              <span>Temperature: {userData.weather.temperature}°C</span>
            </div>
          </div>
        </motion.div>

        {/* Fruit Recommendations */}
        {isCalculating ? (
          <div className="calculating">
            <div className="spinner"></div>
            <p>Analyzing climate data and calculating optimal fruit matches...</p>
          </div>
        ) : (
          <div className="fruit-recommendations">
            {recommendations.map((fruit, index) => (
              <motion.div
                key={fruit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className={`fruit-card ${selectedFruit?.id === fruit.id ? 'selected' : ''}`}
                onClick={() => handleFruitSelection(fruit)}
              >
                <div className="fruit-header">
                  <div className="fruit-info">
                    <h3>{fruit.name}</h3>
                    <p className="scientific-name">{fruit.scientificName}</p>
                  </div>
                  <div className="climate-score" style={{ color: getSuitabilityColor(fruit.climateScore) }}>
                    <span className="score-value">{fruit.climateScore}%</span>
                    <span className="score-label">Match</span>
                  </div>
                </div>

                <div className="fruit-description">
                  <p>{fruit.description}</p>
                </div>

                <div className="fruit-properties">
                  <div className="property-group">
                    <div className="property">
                      <Droplets size={16} />
                      <span>pH: {fruit.phLevel}</span>
                    </div>
                    <div className="property">
                      <Zap size={16} />
                      <span>Efficiency: {(fruit.efficiency * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                  <div className="property-group">
                    <div className="property">
                      <Sun size={16} />
                      <span>Cloudy: {(fruit.lowLightEfficiency * 100).toFixed(0)}%</span>
                    </div>
                    <div className="property">
                      <Sun size={16} />
                      <span>Sunny: {(fruit.highUVEfficiency * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>

                <div className="fruit-footer">
                  <div className="cost-info">
                    <span className="cost-label">Cost per kg:</span>
                    <span className="cost-value">${fruit.costPerKg.toFixed(2)}</span>
                  </div>
                  {selectedFruit?.id === fruit.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="selected-indicator"
                    >
                      <Check size={20} />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Selection Summary */}
        {selectedFruit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="selection-summary"
          >
            <h3>Perfect Match!</h3>
            <p>
              <strong>{selectedFruit.name}</strong> is ideal for your {getClimateType().toLowerCase()} climate in {userData.city}.
              Expect {(selectedFruit.efficiency * 100).toFixed(0)}% efficiency with excellent performance under local conditions.
            </p>
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
            Continue to Solar Calculator
          </button>
        </div>
      </motion.div>

      <style jsx>{`
        .recommendations-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .recommendations-container {
          max-width: 900px;
          width: 100%;
        }

        .recommendations-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .climate-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 25px;
          padding: 8px 16px;
          margin-bottom: 20px;
          color: #4ade80;
          font-weight: 500;
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

        .recommendations-header p {
          font-size: 1.1rem;
          line-height: 1.6;
          opacity: 0.9;
          color: rgba(255, 255, 255, 0.8);
        }

        .climate-analysis {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
        }

        .climate-analysis h3 {
          text-align: center;
          margin-bottom: 16px;
          color: #4ade80;
        }

        .climate-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .metric {
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          color: rgba(255, 255, 255, 0.8);
        }

        .calculating {
          text-align: center;
          padding: 60px 20px;
        }

        .calculating .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 255, 255, 0.2);
          border-top: 3px solid #4ade80;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .fruit-recommendations {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .fruit-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .fruit-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          border-color: rgba(74, 222, 128, 0.5);
        }

        .fruit-card.selected {
          border-color: #4ade80;
          background: rgba(74, 222, 128, 0.1);
        }

        .fruit-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .fruit-info h3 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 4px;
          color: #ffffff;
        }

        .scientific-name {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          font-style: italic;
        }

        .climate-score {
          text-align: center;
          background: rgba(255, 255, 255, 0.1);
          padding: 8px 12px;
          border-radius: 8px;
          min-width: 60px;
        }

        .score-value {
          display: block;
          font-size: 1.2rem;
          font-weight: 700;
        }

        .score-label {
          font-size: 0.7rem;
          opacity: 0.8;
        }

        .fruit-description {
          margin-bottom: 16px;
        }

        .fruit-description p {
          font-size: 0.9rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.8);
        }

        .fruit-properties {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 16px;
        }

        .property-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .property {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .property svg {
          color: #4ade80;
        }

        .fruit-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .cost-info {
          display: flex;
          flex-direction: column;
        }

        .cost-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .cost-value {
          font-size: 1.1rem;
          font-weight: 600;
          color: #4ade80;
        }

        .selected-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: #4ade80;
          border-radius: 50%;
          color: white;
        }

        .selection-summary {
          background: linear-gradient(135deg, rgba(74, 222, 128, 0.2) 0%, rgba(34, 197, 94, 0.2) 100%);
          border: 1px solid rgba(74, 222, 128, 0.5);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
          text-align: center;
        }

        .selection-summary h3 {
          color: #4ade80;
          margin-bottom: 12px;
        }

        .selection-summary p {
          line-height: 1.6;
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

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 1.8rem;
          }

          .climate-metrics {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .fruit-recommendations {
            grid-template-columns: 1fr;
            gap: 16px;
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

export default ClimateFruitRecommendations;