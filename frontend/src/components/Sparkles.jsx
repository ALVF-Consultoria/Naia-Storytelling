import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Sparkle = ({ style }) => (
    <motion.span
        style={style}
        className="absolute block w-2 h-2 bg-yellow-300 rounded-full pointer-events-none z-50"
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: [0, 1.5, 0], opacity: [1, 1, 0], rotate: [0, 90, 180] }}
        transition={{ duration: 0.8, ease: "easeOut" }}
    />
);

const SparklesCore = ({ count = 10, x, y }) => {
    const sparkles = Array.from({ length: count });
    return (
        <>
            {sparkles.map((_, i) => {
                const angle = Math.random() * 360;
                const dist = Math.random() * 60 + 20;
                const tx = x + Math.cos(angle) * dist;
                const ty = y + Math.sin(angle) * dist;
                return (
                    <motion.div
                        key={i}
                        initial={{ x, y, opacity: 1, scale: 0 }}
                        animate={{ x: tx, y: ty, opacity: 0, scale: [1, 0.5, 0] }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute w-1.5 h-1.5 bg-yellow-200 rounded-full shadow-[0_0_8px_rgba(253,224,71,0.8)] pointer-events-none z-50"
                    />
                );
            })}
        </>
    );
};

export default SparklesCore;
