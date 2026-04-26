import React from 'react';
import { motion } from 'framer-motion';

const StoryChapter = ({ chap }) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="group relative"
    >
      {chap.imageUrl && (
        <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-video relative">
          <img 
            src={chap.imageUrl} 
            alt={chap.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"; 
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <span className="text-white font-display font-bold text-xl">{chap.title}</span>
          </div>
        </div>
      )}
      
      <div className="relative">
        <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-magic to-transparent opacity-30 rounded-full" />
        <h2 className="text-2xl font-display font-bold text-primary mb-4 flex items-center gap-3">
          <span className="text-magic opacity-50 text-sm font-mono">0{chap.chapterNumber}</span>
          {chap.title}
        </h2>
        <p className="text-xl text-secondary leading-relaxed font-sans first-letter:text-5xl first-letter:font-bold first-letter:text-magic first-letter:mr-2 first-letter:float-left">
          {chap.content}
        </p>
      </div>
    </motion.section>
  );
};

export default StoryChapter;
