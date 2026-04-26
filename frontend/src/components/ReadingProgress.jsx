import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ReadingProgress = ({ containerRef }) => {
  // If a containerRef is provided (for example, a scrollable div in focus mode), we use it.
  // Otherwise, it tracks the window scroll.
  const { scrollYProgress } = useScroll(containerRef ? { container: containerRef } : {});
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1.5 z-50 origin-left bg-linear-to-r from-cyan-400 via-indigo-500 to-purple-600"
      style={{ scaleX }}
    />
  );
};

export default ReadingProgress;
