import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Inspiration from './components/Inspiration';

const JordanLandingPage = () => {
  const [activeColor, setActiveColor] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const colors = [
    { name: 'Red/White', bg: 'bg-red-600', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000' },
    { name: 'Green/Black', bg: 'bg-green-600', img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1000' },
    { name: 'Purple/Black', bg: 'bg-purple-600', img: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=1000' },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden selection:bg-red-600 selection:text-white">
      {/* Loading Overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full mb-4 mx-auto"
              />
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] tracking-[0.5em] text-gray-500 uppercase"
              >
                Loading Experience
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      <Hero 
        activeColor={activeColor} 
        colors={colors} 
        setActiveColor={setActiveColor} 
      />

      <Inspiration />

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-[10px] tracking-[0.5em] text-gray-600 uppercase mb-2">
          © 2026 JORDAN BRAND. ALL RIGHTS RESERVED.
        </p>
        <div className="flex justify-center gap-6 text-[8px] text-gray-700 tracking-widest uppercase">
          <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
          <span className="cursor-pointer hover:text-white transition-colors">Terms of Use</span>
          <span className="cursor-pointer hover:text-white transition-colors">Cookie Settings</span>
        </div>
      </footer>
    </div>
  );
};

export default JordanLandingPage;
