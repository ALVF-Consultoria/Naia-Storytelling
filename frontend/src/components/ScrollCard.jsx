
import React from "react";
import { motion } from "framer-motion";

const ScrollCard = ({ children, delay = 0, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay, ease: "easeOut" }}
            className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default ScrollCard;
