import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Leaf, Home, Map, Calculator, BarChart3, Flask, TreePine, Globe } from 'lucide-react';

function Navigation({ currentScreen, screens, onNavigate, userData }) {
  const getScreenIcon = (screenId) => {
    const icons = {
      welcome: <Home size={18} />,
      city: <Map size={18} />,
      recommendations: <Leaf size={18} />,
      calculator: <Calculator size={18} />,
      results: <BarChart3 size={18} />,
      'tech-specs': <Flask size={18} />,
      chemical: <TreePine size={18} />,
      environmental: <Globe size={18} />
    };
    return icons[screenId] || <Leaf size={18} />;
  };

  const canGoBack = currentScreen > 0;
  const canGoForward = currentScreen < screens.length - 1 && userData.city;

  const handlePrevious = () => {
    if (canGoBack) {
      onNavigate(currentScreen - 1);
    }
  };

  const handleNext = () => {
    if (canGoForward) {
      onNavigate(currentScreen + 1);
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Navigation Button */}
        <div className="nav-controls">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevious}
            disabled={!canGoBack}
            className={`nav-btn nav-btn-prev ${!canGoBack ? 'disabled' : ''}`}
            aria-label="Previous screen"
          >
            <ChevronLeft size={20} />
            <span>Previous</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={!canGoForward}
            className={`nav-btn nav-btn-next ${!canGoForward ? 'disabled' : ''}`}
            aria-label="Next screen"
          >
            <span>Next</span>
            <ChevronRight size={20} />
          </motion.button>
        </div>

        {/* Screen Title */}
        <div className="nav-title">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="title-content"
          >
            {getScreenIcon(screens[currentScreen].id)}
            <h2>{screens[currentScreen].title}</h2>
          </motion.div>

          {userData.city && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="location-info"
            >
              <span className="location-dot"></span>
              {userData.city}
            </motion.div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="nav-progress">
          <div className="progress-text">
            Step {currentScreen + 1} of {screens.length}
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: `${(currentScreen / screens.length) * 100}%` }}
              animate={{ width: `${((currentScreen + 1) / screens.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .navigation {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 16px 0;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .nav-controls {
          display: flex;
          gap: 12px;
          flex-shrink: 0;
        }

        .nav-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .nav-btn:hover:not(.disabled) {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(74, 222, 128, 0.5);
          transform: translateY(-1px);
        }

        .nav-btn.disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .nav-btn-next:not(.disabled) {
          background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
          border-color: #4ade80;
        }

        .nav-btn-next:not(.disabled):hover {
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          box-shadow: 0 4px 12px rgba(74, 222, 128, 0.4);
        }

        .nav-title {
          flex: 1;
          text-align: center;
        }

        .title-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: white;
        }

        .title-content svg {
          color: #4ade80;
        }

        h2 {
          font-size: 1.4rem;
          font-weight: 600;
          margin: 0;
          color: #ffffff;
        }

        .location-info {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 4px;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .location-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4ade80;
          animation: pulse 2s ease-in-out infinite;
        }

        .nav-progress {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
          flex-shrink: 0;
        }

        .progress-text {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
        }

        .progress-bar {
          width: 120px;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #4ade80 0%, #22c55e 100%);
          border-radius: 2px;
          transition: width 0.5s ease;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.2);
          }
        }

        @media (max-width: 768px) {
          .nav-container {
            padding: 0 16px;
            flex-wrap: wrap;
            gap: 12px;
          }

          .nav-controls {
            order: 3;
            width: 100%;
            justify-content: space-between;
          }

          .nav-title {
            order: 1;
            flex: 1;
          }

          .nav-progress {
            order: 2;
            align-items: center;
          }

          h2 {
            font-size: 1.2rem;
          }

          .nav-btn {
            padding: 8px 12px;
            font-size: 13px;
          }

          .nav-btn span {
            display: none;
          }

          .progress-bar {
            width: 80px;
          }
        }

        @media (max-width: 480px) {
          .nav-container {
            padding: 0 12px;
          }

          h2 {
            font-size: 1.1rem;
          }

          .title-content svg {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navigation;