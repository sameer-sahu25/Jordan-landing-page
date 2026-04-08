import React from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="relative z-20 flex items-center justify-between px-8 py-6 md:px-12">
      <div className="flex items-center gap-8">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-6"
        >
          {/* SVG Jordan Logo */}
          <svg className="h-8 w-auto fill-white" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,10 L55,35 L80,35 L60,50 L70,75 L50,60 L30,75 L40,50 L20,35 L45,35 Z" />
          </svg>
          <div className="h-6 w-[1px] bg-white/20 mx-1" />
          <span className="font-bebas text-xl tracking-widest">NIKE</span>
        </motion.div>
        
        <ul className="hidden md:flex items-center gap-8 text-xs font-bold tracking-[0.2em]">
          {['HOME', 'MAN', 'WOMAN', 'KIDS', 'SALE'].map((item, idx) => (
            <motion.li 
              key={item}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * idx }}
              className="cursor-pointer hover:text-red-500 transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full" />
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-6">
        <Search className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors" />
        <div className="relative cursor-pointer group">
          <ShoppingCart className="w-5 h-5 group-hover:text-red-500 transition-colors" />
          <span className="absolute -top-2 -right-2 bg-red-600 text-[10px] w-4 h-4 rounded-full flex items-center justify-center">2</span>
        </div>
        <User className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors" />
      </div>
    </nav>
  );
};

export default Navbar;
