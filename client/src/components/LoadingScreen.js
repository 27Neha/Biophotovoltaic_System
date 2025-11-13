import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useFrame } from '@react-three/drei';
import { Leaf } from 'lucide-react';

// 3D Loading Animation
function LoadingLogo() {
  const groupRef = React.useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#4ade80"
          emissive="#4ade80"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="logo-3d">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            style={{ height: '200px', width: '200px' }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <LoadingLogo />
          </Canvas>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="loading-text"
        >
          <div className="logo-with-icon">
            <Leaf className="leaf-icon" size={32} />
            <h1>Biophotonix</h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="loading-message"
          >
            Initializing your renewable energy journey...
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="loading-dots"
          >
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .loading-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0a4d0a 0%, #1a7a1a 50%, #0d5d0d 100%);
          overflow: hidden;
        }

        .loading-content {
          text-align: center;
          color: white;
        }

        .logo-3d {
          margin-bottom: 40px;
          filter: drop-shadow(0 20px 40px rgba(74, 222, 128, 0.3));
        }

        .loading-text {
          animation: fadeIn 1s ease-out;
        }

        .logo-with-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .leaf-icon {
          color: #4ade80;
          animation: float 3s ease-in-out infinite;
        }

        h1 {
          font-size: 2.5rem;
          font-weight: 800;
          margin: 0;
          background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .loading-message {
          font-size: 1.2rem;
          font-weight: 300;
          margin-bottom: 32px;
          opacity: 0.9;
        }

        .loading-dots {
          display: flex;
          justify-content: center;
          gap: 12px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #4ade80;
          animation: pulse 1.4s ease-in-out infinite both;
        }

        .dot:nth-child(1) {
          animation-delay: -0.32s;
        }

        .dot:nth-child(2) {
          animation-delay: -0.16s;
        }

        .dot:nth-child(3) {
          animation-delay: 0s;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2rem;
          }

          .loading-message {
            font-size: 1rem;
          }

          .logo-3d {
            height: 150px;
            width: 150px;
          }
        }
      `}</style>
    </div>
  );
}

export default LoadingScreen;