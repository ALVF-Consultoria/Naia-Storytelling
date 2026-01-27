import React, { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero3D from "../components/Hero3D";
import CircularShowcase from "../components/CircularShowcase";
import ScrollCard from "../components/ScrollCard";
import ScrollBook from "../components/ScrollBook";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { t } = useTranslation();

  const [logoLoaded, setLogoLoaded] = React.useState(false);

  // Refs for Logo Scrollytelling
  const travelingLogoRef = useRef(null);
  const staticLogoRef = useRef(null);
  const heroRef = useRef(null);
  const showcaseRef = useRef(null);
  const bookRef = useRef(null);
  const footerRef = useRef(null);
  const finalButtonRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!logoLoaded) return; // Wait for image to load

    const ctx = gsap.context(() => {
      // 1. Initial Setup: Align Traveling Logo with Static Logo
      if (staticLogoRef.current && travelingLogoRef.current) {
        const staticRect = staticLogoRef.current.getBoundingClientRect();

        // Force initial state immediately
        gsap.set(travelingLogoRef.current, {
          top: staticRect.top,
          left: staticRect.left,
          width: staticRect.width,
          height: staticRect.height,
          xPercent: 0,
          yPercent: 0,
          position: "fixed",
          zIndex: 9999, // Ensure it's on top
          opacity: 1,   // Explicitly visible
          display: "block"
        });

        // Hide static logo
        gsap.set(staticLogoRef.current, { opacity: 0 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      // --- PHASE 1: Hero -> Orbit (Right Side) ---
      // Hardcoded Start Position (Center Screen) to prevent Jumps
      tl.fromTo(travelingLogoRef.current, {
        top: "35%",
        left: "50%",
        scale: 1,
        xPercent: -50,
        yPercent: -50,
        rotation: 0
      }, {
        top: "85%", // Deep down
        left: "92%", // Way right
        scale: 1.2, // Large User Preference
        rotation: 360,
        ease: "power1.inOut",
        duration: 2
      });

      // --- PHASE 2: Gravity Swing (Orbit Loop) ---
      tl.to(travelingLogoRef.current, {
        top: "60%",
        left: "85%", // Stay right but go down
        rotation: "+=180",
        ease: "none",
        duration: 1
      }, ">");

      // --- PHASE 3: Expulsa da Orbita -> Livro (Book Corner) ---
      tl.to(travelingLogoRef.current, {
        top: "80%",
        left: "20%", // Left side (corner of book?)
        scale: 1.5, // GROW when reaching the book
        rotation: "+=180",
        ease: "power2.in", // "Pulled" by gravity
        duration: 2
      });

      // --- PHASE 4: THE WAIT (Book Reading) ---
      tl.to(travelingLogoRef.current, {
        rotation: "+=10",
        duration: 3,
        ease: "none"
      });


      // --- PHASE 5: Dive into Button ---
      // Final movement to footer button
      tl.to(travelingLogoRef.current, {
        top: "90%",
        left: "50%",
        scale: 0,
        opacity: 0,
        rotation: "+=720",
        ease: "back.in(1.7)",
        duration: 2
      });

    }, containerRef);

    return () => ctx.revert();
  }, [logoLoaded]); // Re-run when loaded

  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col bg-[#050510] text-white overflow-hidden selection:bg-blue-500 selection:text-white">

      {/* TRAVELING LOGO */}
      <img
        ref={travelingLogoRef}
        src="/imgs/logos/naia-logo-curto-reduzida.png"
        alt="Travelling Naia"
        onLoad={() => setLogoLoaded(true)}
        className={`fixed z-50 pointer-events-none drop-shadow-[0_0_25px_rgba(59,130,246,0.8)] w-32 md:w-48 transition-opacity duration-300 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* 3D Background */}
      <Hero3D />

      {/* Hero Section */}
      <main ref={heroRef} className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] text-center px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] -z-10"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-8 flex flex-col items-center"
        >
          {/* STATIC LOGO for Ref Calculation */}
          <img
            ref={staticLogoRef}
            src="/imgs/logos/naia-logo-curto-reduzida.png"
            alt="NAIA AI Logo"
            className="h-24 md:h-32 w-auto object-contain drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]"
          />
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 drop-shadow-2xl mt-4">NAIA</h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-12 font-light"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link
            to="/create-history"
            className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-bold text-lg transition-all shadow-[0_0_40px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_rgba(37,99,235,0.7)] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t('hero.cta_start')}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <Link
            to="/stories-page"
            className="px-8 py-4 bg-transparent border border-white/20 hover:border-white/50 hover:bg-white/5 rounded-full font-bold text-lg transition-all backdrop-blur-sm"
          >
            {t('hero.cta_library')}
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 opacity-50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full"></div>
          </div>
        </motion.div>
      </main>

      {/* Showcase Section */}
      <section ref={showcaseRef} className="relative z-10 py-32 bg-gradient-to-b from-transparent to-[#02020a]">
        <div className="container mx-auto px-6 text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {t('hero.features_orbit')}
          </motion.h2>
          <p className="text-gray-400">{t('hero.features_orbit_desc')}</p>
        </div>

        <CircularShowcase />
      </section>

      {/* Book Section */}
      <section ref={bookRef} className="relative z-10 py-0 text-center">
        {/* Note: I added text-center here just in case, keeping original layout mostly */}
        <ScrollBook />
      </section>

      {/* Footer CTA */}
      <section ref={footerRef} className="relative z-10 py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20 blur-3xl -z-10"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 whitespace-pre-line">
            {t('hero.ready_creator')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{t('hero.creator_highlight')}</span>
          </h2>
          <Link
            to="/create-history"
            ref={finalButtonRef}
            className="inline-block px-12 py-5 bg-white text-black rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.3)]"
          >
            {t('hero.launch_studio')}
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
