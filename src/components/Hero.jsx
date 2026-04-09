import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Play } from 'lucide-react';

const Hero = ({ activeColor, colors, setActiveColor }) => {
  const sneakerRef = useRef(null);
  const containerRef = useRef(null);

  // Motion values for dynamic lighting
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for lighting movement
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e) => {
    // Sneaker Tilt Effect
    if (sneakerRef.current) {
      const { left, top, width, height } = sneakerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      sneakerRef.current.style.transform = `perspective(1000px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`;
    }

    // Dynamic Lighting Position
    if (containerRef.current) {
      const { left, top } = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    }
  };

  const handleMouseLeave = () => {
    if (sneakerRef.current) {
      sneakerRef.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
    }
  };

  const isExploded = colors[activeColor]?.isPaperToy;

  const lightingBackground = useMotionTemplate`radial-gradient(600px circle at ${springX}px ${springY}px, rgba(229, 9, 20, 0.15), transparent 80%)`;

  return (
    <main 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-8 md:px-12 overflow-hidden group/hero"
    >
      {/* Dynamic Lighting Layer */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover/hero:opacity-100 transition-opacity duration-500"
        style={{
          background: lightingBackground
        }}
      />

      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <motion.h1 
          key={`bg-text-${activeColor}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.05 }}
          transition={{ duration: 1.5 }}
          className="text-[30vw] font-black text-white text-outline tracking-tighter uppercase"
        >
          {colors[activeColor].name.split(' ')[0]}
        </motion.h1>
      </div>

      {/* Hero Content */}
      <div className="relative w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Content */}
        <div className="lg:col-span-5 z-10">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2 className="text-red-600 font-bold tracking-widest text-sm mb-4 uppercase">2021 PF Edition</h2>
            <h1 className="text-7xl md:text-9xl font-bebas leading-none mb-4 italic tracking-tighter flex items-baseline">
              JUMP<span className="text-red-600 ml-2 glitch" data-text="MAN">
                MAN
                <span aria-hidden="true">MAN</span>
                <span aria-hidden="true">MAN</span>
              </span>
            </h1>
            <p className="text-gray-400 max-w-md mb-8 leading-relaxed">
              Experience the ultimate performance on court with the new Air Jordan 2021 PF. 
              Engineered for explosive speed and superior comfort.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-8 py-4 font-bold text-sm tracking-widest hover:bg-red-600 hover:text-white transition-colors"
              >
                ADD TO CART
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-white/20 px-8 py-4 font-bold text-sm tracking-widest hover:bg-white hover:text-black transition-colors"
              >
                BUY NOW
              </motion.button>
            </div>
          </motion.div>

          {/* Color Selector (The "li" section mentioned by user) */}
          <div className="mt-12">
            <p className="text-[10px] font-bold tracking-[0.3em] mb-4 text-gray-500 uppercase">Select Edition</p>
            <ul className="flex gap-4">
              {colors.map((color, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveColor(idx)}
                  className={`relative w-16 h-16 cursor-pointer border-2 transition-all p-1 overflow-hidden group/item ${activeColor === idx ? 'border-red-600' : 'border-white/10 opacity-50 hover:opacity-100'}`}
                >
                  <img src={color.img} alt={color.name} className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110" />
                  {color.isPaperToy && (
                    <div className="absolute inset-0 bg-red-600/20 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                      <span className="text-[8px] font-bold">OPEN</span>
                    </div>
                  )}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Center Sneaker Area */}
        <div className="lg:col-span-7 relative flex items-center justify-center py-12">
          <motion.div
            ref={sneakerRef}
            key={activeColor}
            initial={isExploded ? { scale: 0.5, opacity: 0, rotate: 0 } : { y: 100, opacity: 0, rotate: -15 }}
            animate={isExploded ? { scale: 1, opacity: 1, rotate: 0 } : { y: 0, opacity: 1, rotate: -15 }}
            transition={{ 
              duration: isExploded ? 1.2 : 0.8, 
              type: isExploded ? 'spring' : 'spring',
              bounce: 0.4
            }}
            className="relative z-10 w-full max-w-2xl cursor-grab active:cursor-grabbing transition-transform duration-100 ease-out"
          >
            {/* The Main Image with "Open Effect" logic */}
            <motion.img 
              src={colors[activeColor].img} 
              alt="Jordan Sneaker" 
              className={`w-full h-auto drop-shadow-[0_35px_35px_rgba(255,0,0,0.3)] transition-all duration-700 ${isExploded ? 'filter brightness-125 contrast-100 grayscale-0' : 'filter contrast-125'}`}
              animate={isExploded ? {
                filter: ["brightness(1) contrast(1.2)", "brightness(1.5) contrast(1)", "brightness(1.2) contrast(1.1)"],
              } : {}}
              transition={{ repeat: Infinity, duration: 4 }}
            />
            
            {/* Exploded View Particles/Effect */}
            {isExploded && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 2], x: (i - 2.5) * 100, y: (i % 2 ? -100 : 100) }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-600 rounded-full blur-sm"
                  />
                ))}
              </div>
            )}

            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 bg-red-600 p-4 rounded-full shadow-xl"
            >
              <Play className="w-6 h-6 fill-white" />
            </motion.div>
          </motion.div>

          {/* Background Circles / Lighting Source */}
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <motion.div 
              animate={isExploded ? {
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              } : {}}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-[80%] aspect-square rounded-full bg-gradient-to-tr from-red-900/20 to-transparent border border-white/5"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
