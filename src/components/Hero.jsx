import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const Hero = ({ activeColor, colors, setActiveColor }) => {
  const sneakerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!sneakerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = sneakerRef.current.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    sneakerRef.current.style.transform = `perspective(1000px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`;
  };

  const handleMouseLeave = () => {
    if (!sneakerRef.current) return;
    sneakerRef.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <main className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-8 md:px-12">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.05 }}
          transition={{ duration: 1.5 }}
          className="text-[30vw] font-black text-white text-outline tracking-tighter"
        >
          JORDAN
        </motion.h1>
      </div>

      {/* Hero Content */}
      <div className="relative w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-5 z-10">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2 className="text-red-600 font-bold tracking-widest text-sm mb-4 uppercase">2021 PF Edition</h2>
            <h1 className="text-7xl md:text-9xl font-bebas leading-none mb-4 italic tracking-tighter">
              JUMP<span className="text-red-600">MAN</span>
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

          {/* Color Selector */}
          <div className="mt-12">
            <p className="text-[10px] font-bold tracking-[0.3em] mb-4 text-gray-500 uppercase">Choose Color</p>
            <div className="flex gap-4">
              {colors.map((color, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  onClick={() => setActiveColor(idx)}
                  className={`w-16 h-16 cursor-pointer border-2 transition-all p-1 ${activeColor === idx ? 'border-red-600' : 'border-transparent opacity-50'}`}
                >
                  <img src={color.img} alt={color.name} className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Sneaker */}
        <div className="lg:col-span-7 relative flex items-center justify-center py-12">
          <motion.div
            ref={sneakerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ y: 100, opacity: 0, rotate: -15 }}
            animate={{ y: 0, opacity: 1, rotate: -15 }}
            transition={{ delay: 0.8, duration: 1, type: 'spring' }}
            className="relative z-10 w-full max-w-2xl cursor-grab active:cursor-grabbing transition-transform duration-100 ease-out"
          >
            <img 
              src={colors[activeColor].img} 
              alt="Jordan Sneaker" 
              className="w-full h-auto drop-shadow-[0_35px_35px_rgba(255,0,0,0.3)] filter contrast-125"
            />
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 bg-red-600 p-4 rounded-full shadow-xl"
            >
              <Play className="w-6 h-6 fill-white" />
            </motion.div>
          </motion.div>

          {/* Background Circle */}
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 1.5, type: 'spring' }}
              className="w-[80%] aspect-square rounded-full bg-gradient-to-tr from-red-900/20 to-transparent border border-white/5"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
