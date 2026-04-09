import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Zap, ChevronRight } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Inspiration from './components/Inspiration';

// WomenSection Component with high-fashion aesthetic and consistent visual effects
// WomenSection Component mirrored from ManSection for consistency
const WomenSection = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [animationStage, setAnimationStage] = useState('idle');

  const products = [
    { id: 1, name: 'Air Jordan 1 Low Pink', price: '$115', img: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=1000' },
    { id: 2, name: 'Air Jordan 4 Canyon Purple', price: '$200', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1000' },
    { id: 3, name: 'Air Jordan 1 Elevate', price: '$145', img: 'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/452fe240-2b0d-4e81-bb9f-1eed52ab406b/WMNS+AIR+JORDAN+1+MID.png' },
    { id: 4, name: 'Nike Fury', price: '$90', img: 'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/fd7d0cdf-0c44-486c-b867-0a7ecce3ad33/NIKE+FURY.png' },
    { id: 5, name: 'Air Jordan 1 Zoom CMFT', price: '$150', img: 'https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/f0663f78-e330-41aa-ace9-0ae7fda31a76/WMNS+AIR+JORDAN+1+LOW+SE.png' },
    { id: 6, name: 'Jordan Series .05', price: '$190', img: 'https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/1555a080-a26a-4376-b063-272ea0304d6d/WMNS+JORDAN+TRUNNER+FLOW.png'},
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
            <h2 className="text-red-600 font-bold tracking-widest text-sm mb-4 uppercase">Elegance & Power</h2>
            <h1 className="text-6xl md:text-8xl font-bebas italic tracking-tighter text-white">WOMEN'S <span className="text-red-600">COLLECTION</span></h1>
          </div>
          <p className="text-gray-500 max-w-sm text-sm tracking-wide">
            Designed for those who lead. Experience the perfect blend of high-fashion aesthetics and revolutionary performance.
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
                  <h3 className="text-xl font-bebas tracking-wider text-white">{product.name}</h3>
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

              <div className="relative z-10">
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-red-600 font-bold tracking-[0.3em] text-xs mb-4 uppercase">New Arrival</p>
                  <h2 className="text-5xl md:text-7xl font-bebas tracking-wider mb-6 leading-none italic text-white">
                    {selectedProduct.name.split(' ').slice(0, -1).join(' ')} <span className="text-red-600">{selectedProduct.name.split(' ').pop()}</span>
                  </h2>
                  <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-md italic">
                    "Experience ultimate comfort and revolutionary design with the new Jordan collection. Engineered for those who dare to fly higher."
                  </p>

                  <div className="text-4xl font-bebas tracking-widest text-white mb-10">
                    {selectedProduct.price}
                  </div>

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
                          className="flex items-center justify-center gap-3 border border-white/20 px-10 py-5 font-bold tracking-[0.2em] text-sm text-white"
                        >
                          WISHLIST
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>

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

// ManSection Component integrated directly into App.jsx to avoid circular dependencies
const ManSection = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [animationStage, setAnimationStage] = useState('idle'); // idle -> lighting -> opening -> purchase

  const products = [
    { id: 1, name: 'Air Jordan 1 Mint Edition', price: '$190', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1000' },
    { id: 2, name: 'Air Jordan 1 Purple Mockup', price: '$180', img: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=1000' },
    { id: 3, name: 'Air Jordan 1 Pine Green', price: '$170', img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1000' },
    { id: 4, name: 'Air Jordan 1 Mid', price: '$210', img: 'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/3f745a4d-5cbd-4ff2-b799-29c28462f9b8/WMNS+AIR+JORDAN+1+MID.png' },
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

// KidsSection Component mirrored from ManSection
const KidsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [animationStage, setAnimationStage] = useState('idle');

  const products = [
    { id: 1, name: 'Jordan 1 Mid SE', price: '$65', img: 'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/bc1472d0-2467-4295-b038-1d67bcc08bfc/JORDAN+1+MID+SE+%28TD%29.png' },
    { id: 2, name: 'Jordan 1 Low Alt SE', price: '$70', img: 'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ecc1c38a-17d8-45b5-ad05-47b1fc2b197d/JORDAN+1+LOW+ALT+SE+%28TD%29.png' },
    { id: 3, name: 'Jordan MVP 92', price: '$55', img: 'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/31414d2f-6da8-4625-a4cc-cce44a306b4e/JORDAN+MVP+92+%28TD%29.png' },
    { id: 4, name: 'Jordan 11 Retro Low "University Blue', price: '$80', img: 'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/522f99a8-5cf0-4396-82e9-74e3a8d5fa5d/JORDAN+11+RETRO+LOW+%28TD%29.png' },
    { id: 5, name: 'Jordan 1 Mid SE', price: '$65', img: 'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/5da6d22e-2194-4292-859a-d586ad16d270/JORDAN+1+MID+SE+%28TD%29.png' },
    { id: 6, name: 'Jordan 23/7.2 EasyOn', price: '$55', img: 'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7ae568a4-c37a-49c6-bc0e-0758cb99116b/JORDAN+23%2F7.2+EASYON+%28TD%29.png' },
  ];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setAnimationStage('lighting');
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
            <h2 className="text-red-600 font-bold tracking-widest text-sm mb-4 uppercase">Play Hard, Dream Big</h2>
            <h1 className="text-6xl md:text-8xl font-bebas italic tracking-tighter">KIDS' <span className="text-red-600">COLLECTION</span></h1>
          </div>
          <p className="text-gray-500 max-w-sm text-sm tracking-wide">
            Engineered for the next generation of champions. Comfort and style for every move they make.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  <p className="text-red-600 font-bold text-xs tracking-widest mb-2">SHOP NOW</p>
                  <h3 className="text-xl font-bebas tracking-wider">{product.name}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

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
              <div className="relative flex items-center justify-center min-h-[400px]">
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
                    "Built for small feet with big dreams. Revolutionary cushioning and durable design for all-day play."
                  </p>

                  <div className="text-4xl font-bebas tracking-widest text-white mb-10">
                    {selectedProduct.price}
                  </div>

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

                  <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-10">
                    <div className="flex items-center gap-3 text-xs tracking-widest text-gray-500 font-bold uppercase">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                      Soft Foam Tech
                    </div>
                    <div className="flex items-center gap-3 text-xs tracking-widest text-gray-500 font-bold uppercase">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                      Durable Leather
                    </div>
                    <div className="flex items-center gap-3 text-xs tracking-widest text-gray-500 font-bold uppercase">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                      Easy On/Off
                    </div>
                    <div className="flex items-center gap-3 text-xs tracking-widest text-gray-500 font-bold uppercase">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                      Extra Grip
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

const JordanLandingPage = () => {
  const [activeColor, setActiveColor] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState('HOME');

  const colors = [
    { name: 'Mint/White', bg: 'bg-emerald-400', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1000' },
    { name: 'Purple Gradient', bg: 'bg-purple-500', img: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=1000' },
    { name: 'Green/Tan', bg: 'bg-green-700', img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1000' },
    { name: 'Artistic Brush', bg: 'bg-blue-600', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000' },
    { name: 'Exploded View', bg: 'bg-red-600', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1000', isPaperToy: true },
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

      <Navbar currentSection={currentSection} setCurrentSection={setCurrentSection} />

      <AnimatePresence mode="wait">
        {currentSection === 'HOME' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Hero 
              activeColor={activeColor} 
              colors={colors} 
              setActiveColor={setActiveColor} 
            />
            <Inspiration />
          </motion.div>
        ) : currentSection === 'MAN' ? (
          <motion.div
            key="man"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ManSection />
          </motion.div>
        ) : currentSection === 'WOMAN' ? (
          <motion.div
            key="woman"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WomenSection />
          </motion.div>
        ) : currentSection === 'KIDS' ? (
          <motion.div
            key="kids"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <KidsSection />
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center text-4xl font-bebas tracking-widest text-white/50"
          >
            COMING SOON
          </motion.div>
        )}
      </AnimatePresence>

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
