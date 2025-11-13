import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import CityInput from './components/CityInput';
import ClimateFruitRecommendations from './components/ClimateFruitRecommendations';
import PermanentSolarCalculator from './components/PermanentSolarCalculator';
import TechSpecs from './components/TechSpecs';
import ChemicalDashboard from './components/ChemicalDashboard';
import EnvironmentalAnalysis from './components/EnvironmentalAnalysis';
import ResultsDashboard from './components/ResultsDashboard';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    city: '',
    coordinates: null,
    weather: null,
    selectedFruit: null,
    deviceCategory: null,
    panelSize: null,
    installationDate: null,
    results: null
  });

  const screens = [
    { id: 'welcome', component: WelcomeScreen, title: 'Welcome' },
    { id: 'city', component: CityInput, title: 'Enter Your City' },
    { id: 'recommendations', component: ClimateFruitRecommendations, title: 'Fruit Recommendations' },
    { id: 'calculator', component: PermanentSolarCalculator, title: 'Solar Calculator' },
    { id: 'results', component: ResultsDashboard, title: 'Your Results' },
    { id: 'tech-specs', component: TechSpecs, title: 'Technical Specifications' },
    { id: 'chemical', component: ChemicalDashboard, title: 'Chemical Properties' },
    { id: 'environmental', component: EnvironmentalAnalysis, title: 'Environmental Analysis' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const updateUserData = (newData) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  const nextScreen = () => {
    setCurrentScreen(prev => Math.min(prev + 1, screens.length - 1));
  };

  const previousScreen = () => {
    setCurrentScreen(prev => Math.max(prev - 1, 0));
  };

  const goToScreen = (screenId) => {
    const screenIndex = screens.findIndex(screen => screen.id === screenId);
    if (screenIndex !== -1) {
      setCurrentScreen(screenIndex);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  const CurrentComponent = screens[currentScreen].component;

  return (
    <ErrorBoundary>
      <div className="app">
        <Navigation
          currentScreen={currentScreen}
          screens={screens}
          onNavigate={goToScreen}
          userData={userData}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="screen-container"
          >
            <CurrentComponent
              userData={userData}
              updateUserData={updateUserData}
              onNext={nextScreen}
              onPrevious={previousScreen}
              onNavigate={goToScreen}
            />
          </motion.div>
        </AnimatePresence>

        <div className="progress-indicator">
          <div className="progress-bar">
            {screens.map((_, index) => (
              <div
                key={index}
                className={`progress-step ${index <= currentScreen ? 'active' : ''}`}
                onClick={() => goToScreen(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .screen-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .progress-indicator {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
        }

        .progress-bar {
          display: flex;
          gap: 8px;
          background: rgba(0, 0, 0, 0.3);
          padding: 12px 20px;
          border-radius: 25px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .progress-step {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .progress-step.active {
          background: #4ade80;
          box-shadow: 0 0 8px rgba(74, 222, 128, 0.6);
        }

        .progress-step:hover {
          background: rgba(74, 222, 128, 0.8);
          transform: scale(1.2);
        }

        @media (max-width: 768px) {
          .screen-container {
            padding: 16px;
          }

          .progress-indicator {
            bottom: 10px;
          }

          .progress-bar {
            padding: 8px 12px;
            gap: 6px;
          }

          .progress-step {
            width: 6px;
            height: 6px;
          }
        }
      `}</style>
    </ErrorBoundary>
  );
}

export default App;