import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Leaf } from 'lucide-react';

// 3D Logo Component
function BiophotonixLogo({ position = [0, 0, 0] }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Central sphere representing the sun/fruit */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={hovered ? '#4ade80' : '#fbbf24'}
          emissive={hovered ? '#4ade80' : '#fbbf24'}
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.6}
        />
      </Sphere>

      {/* Orbiting elements representing electrons/energy */}
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          args={[0.3, 0.3, 0.3]}
          position={[
            Math.cos((i * Math.PI * 2) / 3) * 2,
            Math.sin((i * Math.PI * 2) / 3) * 2,
            0
          ]}
        >
          <meshStandardMaterial
            color="#4ade80"
            emissive="#4ade80"
            emissiveIntensity={0.5}
          />
        </Box>
      ))}

      {/* Energy particles */}
      {[...Array(8)].map((_, i) => (
        <Sphere
          key={`particle-${i}`}
          args={[0.1, 8, 8]}
          position={[
            Math.cos((i * Math.PI * 2) / 8) * 3,
            Math.sin((i * Math.PI * 2) / 8) * 3,
            Math.sin(state.clock.elapsedTime + i) * 0.5
          ]}
        >
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.8}
          />
        </Sphere>
      ))}
    </group>
  );
}

// Floating particles background
function FloatingParticles() {
  const particlesRef = useRef();

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={particlesRef}>
      {[...Array(50)].map((_, i) => (
        <Sphere
          key={`bg-particle-${i}`}
          args={[0.05, 6, 6]}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
          ]}
        >
          <meshStandardMaterial
            color="#4ade80"
            emissive="#4ade80"
            emissiveIntensity={Math.random() * 0.5}
            transparent
            opacity={0.6}
          />
        </Sphere>
      ))}
    </group>
  );
}

function WelcomeScreen({ onNext }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    setIsLoading(true);
    setTimeout(() => {
      onNext();
    }, 1000);
  };

  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        {/* 3D Canvas */}
        <div className="logo-container">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            style={{ height: '400px', width: '100%' }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ade80" />
            <spotLight
              position={[0, 10, 0]}
              angle={0.3}
              penumbra={1}
              intensity={0.8}
              castShadow
            />

            <BiophotonixLogo position={[0, 0, 0]} />
            <FloatingParticles />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
            />
          </Canvas>
        </div>

        {/* Welcome Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="welcome-text"
        >
          <h1 className="welcome-title">
            <Leaf className="icon" size={32} />
            Biophotonix
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="tagline"
          >
            "Harnessing Nature's Energy, One Fruit at a Time"
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="features-grid"
          >
            <div className="feature-card">
              <Sparkles className="feature-icon" size={24} />
              <h3>Natural Energy</h3>
              <p>Transform fruit juice electrolytes into clean, renewable power</p>
            </div>

            <div className="feature-card">
              <Zap className="feature-icon" size={24} />
              <h3>UV-Activated</h3>
              <p>Smart panels that generate electricity when exposed to sunlight</p>
            </div>

            <div className="feature-card">
              <Leaf className="feature-icon" size={24} />
              <h3>Climate Adaptive</h3>
              <p>Optimized fruit recommendations for your specific location</p>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContinue}
            disabled={isLoading}
            className="continue-btn"
          >
            {isLoading ? (
              <>
                <div className="spinner" />
                Initializing...
              </>
            ) : (
              <>
                Begin Your Journey
                <span className="arrow">→</span>
              </>
            )}
          </motion.button>
        </motion.div>
      </div>

      <style jsx>{`
        .welcome-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: radial-gradient(ellipse at center, rgba(74, 222, 128, 0.1) 0%, transparent 70%);
        }

        .welcome-content {
          max-width: 800px;
          width: 100%;
          text-align: center;
        }

        .logo-container {
          margin-bottom: 40px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          background: rgba(0, 0, 0, 0.2);
        }

        .welcome-text {
          color: white;
        }

        .welcome-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .tagline {
          font-size: 1.4rem;
          font-weight: 300;
          margin-bottom: 50px;
          opacity: 0.9;
          font-style: italic;
          line-height: 1.6;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
          margin-bottom: 50px;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          border-color: rgba(74, 222, 128, 0.5);
        }

        .feature-icon {
          color: #4ade80;
          margin-bottom: 12px;
        }

        .feature-card h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: #ffffff;
        }

        .feature-card p {
          font-size: 0.9rem;
          opacity: 0.8;
          line-height: 1.5;
        }

        .continue-btn {
          background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
          color: white;
          border: none;
          padding: 16px 32px;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 10px 30px rgba(74, 222, 128, 0.4);
          transition: all 0.3s ease;
          min-width: 200px;
          justify-content: center;
        }

        .continue-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(74, 222, 128, 0.6);
        }

        .continue-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .arrow {
          font-size: 1.2rem;
          transition: transform 0.3s ease;
        }

        .continue-btn:hover .arrow {
          transform: translateX(4px);
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

        @media (max-width: 768px) {
          .welcome-title {
            font-size: 2.5rem;
          }

          .tagline {
            font-size: 1.2rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .feature-card {
            padding: 20px;
          }

          .logo-container {
            height: 300px;
          }
        }
      `}</style>
    </div>
  );
}

export default WelcomeScreen;