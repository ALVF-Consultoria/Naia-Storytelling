// src/components/Footer.jsx
import React from "react";
import { Github, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-muted/10 py-8 transition-colors duration-300">
      <div className="container mx-auto px-6 flex flex-col items-center text-center">

        {/* SOCIAL ICONS */}
        <div className="flex space-x-6 mb-4">
          <a href="#" className="text-accent hover:text-accent-hover transition hover:scale-110">
            <Github className="w-6 h-6" />
          </a>
          <a href="#" className="text-accent hover:text-accent-hover transition hover:scale-110">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="text-accent hover:text-accent-hover transition hover:scale-110">
            <Instagram className="w-6 h-6" />
          </a>
        </div>

        {/* INSPIRATIONAL QUOTE */}
        <p className="text-muted text-sm italic mb-2 font-serif">
          "Great stories begin with small ideas."
        </p>

        {/* COPYRIGHT */}
        <span className="text-muted/80 text-xs">
          © {year} — NAIA. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
