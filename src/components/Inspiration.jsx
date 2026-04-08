import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Inspiration = () => {
  return (
    <section className="relative py-32 px-8 md:px-12 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-4xl font-bebas tracking-wider mb-6">INSPIRATION</h2>
            <p className="text-gray-400 leading-relaxed text-lg italic">
              "Inspired by the design of the latest Air Jordan game shoe, the Jordan Jumpman 2021 helps up-and-coming players level up their game. The shoe features responsive Zoom Air cushioning and curved Flightwire cables that are sewn into the material for a snug, comfortable fit for competitive play."
            </p>
            <div className="mt-8 flex items-center gap-4 text-red-600 font-bold tracking-widest text-sm cursor-pointer group">
              READ MORE <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
          <div className="relative overflow-hidden group">
            <motion.img 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
              src="https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=1000" 
              alt="Inspiration" 
              className="w-full h-[400px] object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 border border-white/10 group-hover:border-red-600 transition-colors duration-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Inspiration;
