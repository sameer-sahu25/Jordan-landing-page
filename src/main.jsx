import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Zap, ChevronRight } from 'lucide-react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
const ManSection = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [animationStage, setAnimationStage] = useState('idle'); // idle -> lighting -> opening -> purchase

  const products = [
    { id: 1, name: 'Air Jordan 1 Mint Edition', price: '$190', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1000' },
    { id: 2, name: 'Air Jordan 1 Purple Mockup', price: '$180', img: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=1000' },
    { id: 3, name: 'Air Jordan 1 Pine Green', price: '$170', img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1000' },
    { id: 4, name: 'Air Jordan 1 Artistic Brush', price: '$210', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000' },
    { id: 5, name: 'Air Jordan 1 Paper Toy', price: '$250', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1000', isSpecial: true },
    { id: 6, name: 'Air Jordan 1 Chicago Retro', price: '$220', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000' },
  ];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setAnimationStage('lighting');
    
    // Sequence the animations
    setTimeout(() => {
      setAnimationStage('opening');
      setTimeout(() => {
        setAnimationStage('purchase');
      }, 1500);
    }, 1000);
  };

  const closeOverlay = () => {
    setSelectedProduct(null);
    setAnimationStage('idle');
  };

  return (
    <section className="min-h-screen bg-black py-20 px-8 md:px-12 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-red-600 font-bold tracking-widest text-sm mb-4 uppercase">Performance & Style</h2>
            <h1 className="text-6xl md:text-8xl font-bebas italic tracking-tighter">MAN'S <span className="text-red-600">COLLECTION</span></h1>
          </div>
          <p className="text-gray-500 max-w-sm text-sm tracking-wide">
            Discover the latest arrivals in Jordan footwear, engineered for the highest level of performance on and off the court.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => handleProductClick(product)}
              className="group cursor-pointer bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden relative"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <p className="text-red-600 font-bold text-xs tracking-widest mb-2">VIEW DETAILS</p>
                  <h3 className="text-xl font-bebas tracking-wider">{product.name}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Interactive Overlay */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={closeOverlay}
              className="absolute top-8 right-8 text-white/50 hover:text-white z-50"
            >
              <X className="w-8 h-8" />
            </motion.button>

            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Product Visual Area */}
              <div className="relative flex items-center justify-center min-h-[400px]">
                {/* Dynamic Lighting Layer */}
                <AnimatePresence>
                  {(animationStage === 'lighting' || animationStage === 'opening' || animationStage === 'purchase') && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-0 pointer-events-none"
                    >
                      <div className="absolute inset-0 bg-radial-gradient from-red-600/20 via-transparent to-transparent animate-pulse" />
                      <motion.div
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 0.6, 0.3],
                          rotate: [0, 90, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Zap className="w-64 h-64 text-red-600/10 blur-2xl" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Main Image with Opening Effect */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative z-10"
                >
                  <motion.img
                    src={selectedProduct.img}
                    alt={selectedProduct.name}
                    className="max-w-full h-auto drop-shadow-[0_0_50px_rgba(229,9,20,0.3)]"
                    animate={animationStage === 'opening' || animationStage === 'purchase' ? {
                      scale: [1, 1.1, 1.05],
                      rotate: [0, -5, 0],
                      filter: [
                        "brightness(1) contrast(1.2)", 
                        "brightness(1.5) contrast(1.5) hue-rotate(10deg)", 
                        "brightness(1.2) contrast(1.2)"
                      ]
                    } : {}}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                  
                  {/* Floating Schematic Particles for Opening Effect */}
                  {(animationStage === 'opening' || animationStage === 'purchase') && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 0, y: 0 }}
                          animate={{ 
                            opacity: [0, 1, 0], 
                            x: (Math.random() - 0.5) * 400, 
                            y: (Math.random() - 0.5) * 400,
                            scale: [0, 1.5, 0]
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                          className="absolute top-1/2 left-1/2 w-1 h-1 bg-red-500 rounded-full"
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Product Info Area */}
              <div className="relative z-10">
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-red-600 font-bold tracking-[0.3em] text-xs mb-4 uppercase">New Arrival</p>
                  <h2 className="text-5xl md:text-7xl font-bebas tracking-wider mb-6 leading-none italic">
                    {selectedProduct.name.split(' ').slice(0, -1).join(' ')} <span className="text-red-600">{selectedProduct.name.split(' ').pop()}</span>
                  </h2>
                  <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-md italic">
                    "Experience ultimate comfort and revolutionary design with the new Jordan collection. Engineered for those who dare to fly higher."
                  </p>

                  <div className="text-4xl font-bebas tracking-widest text-white mb-10">
                    {selectedProduct.price}
                  </div>

                  {/* Purchase Integration (Conditional Reveal) */}
                  <AnimatePresence>
                    {animationStage === 'purchase' && (
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <motion.button
                          whileHover={{ scale: 1.05, backgroundColor: '#E50914' }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center gap-3 bg-white text-black px-10 py-5 font-bold tracking-[0.2em] text-sm group"
                        >
                          <ShoppingCart className="w-5 h-5 group-hover:text-white" />
                          <span className="group-hover:text-white">ADD TO CART</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05, borderColor: '#E50914', color: '#E50914' }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center gap-3 border border-white/20 px-10 py-5 font-bold tracking-[0.2em] text-sm"
                        >
                          WISHLIST
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Features List */}
                  <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-10">
                    <div className="flex items-center gap-3 text-xs tracking-widest text-gray-500 font-bold uppercase">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                      Zoom Air Tech
                    </div>
                    <div className="flex items-center gap-3 text-xs tracking-widest text-gray-500 font-bold uppercase">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                      Premium Suede
                    </div>
                    <div className="flex items-center gap-3 text-xs tracking-widest text-gray-500 font-bold uppercase">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                      High Traction
                    </div>
                    <div className="flex items-center gap-3 text-xs tracking-widest text-gray-500 font-bold uppercase">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                      Breathable Mesh
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ManSection;
