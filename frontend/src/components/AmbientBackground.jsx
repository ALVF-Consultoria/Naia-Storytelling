import React from 'react';
import { motion } from 'framer-motion';

const AmbientBackground = ({ isFocusMode }) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Dynamic gradient base */}
      <motion.div
        className="absolute inset-0 opacity-30 dark:opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Deep focus mode overlay */}
      {isFocusMode && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/10 dark:bg-black/40 backdrop-blur-[2px]" 
        />
      )}
    </div>
  );
};

export default AmbientBackground;
