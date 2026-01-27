
import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const Sparkles = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full blur-[1px]"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: 0,
                        animation: `sparkle 2s infinite ${Math.random() * 2}s`
                    }}
                />
            ))}
            <style>{`
        @keyframes sparkle {
          0% { transform: scale(0) translate(0,0); opacity: 0; }
          50% { opacity: 1; transform: scale(1.5) translate(0,-20px); }
          100% { transform: scale(0) translate(0,-40px); opacity: 0; }
        }
      `}</style>
        </div>
    );
};

const ScrollBook = () => {
    const containerRef = useRef(null);
    const bookRef = useRef(null);
    const pagesRef = useRef([]);
    const sparkleRef = useRef(null);
    const { t } = useTranslation();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "center center",
                    end: "+=4000",
                    pin: true,
                    scrub: 1,
                }
            });

            // 0. Sparkles & Centering
            // Ao abrir (-180deg), o livro cresce para a esquerda. Movemos para a direita para compensar.
            tl.to(bookRef.current, { x: 150, z: 50, rotateX: 10, rotateY: -5, duration: 2 }, 0);
            tl.to(sparkleRef.current, { opacity: 1, duration: 0.5 }, 0);

            // 1. Abre a capa (Page 0)
            tl.to(pagesRef.current[0], {
                rotateY: -180,
                duration: 2,
                ease: "power2.inOut",
                onStart: () => gsap.set(pagesRef.current[0], { zIndex: 50 }),
                onComplete: () => gsap.set(pagesRef.current[0], { zIndex: 1 })
            }, 0);

            // 2. Vira página 1 (Page 1)
            tl.to(pagesRef.current[1], {
                rotateY: -180,
                duration: 2,
                ease: "power2.inOut",
                onStart: () => gsap.set(pagesRef.current[1], { zIndex: 9 }),
                onComplete: () => gsap.set(pagesRef.current[1], { zIndex: 2 })
            }, ">-0.5");

            // 3. Vira página 2 (Page 2)
            tl.to(pagesRef.current[2], {
                rotateY: -180,
                duration: 2,
                ease: "power2.inOut",
                onStart: () => gsap.set(pagesRef.current[2], { zIndex: 8 }),
                onComplete: () => gsap.set(pagesRef.current[2], { zIndex: 3 })
            }, ">-0.5");

            // --- FECHAMENTO (Closing Sequence) ---
            const closeTime = ">+1"; // Pausa para leitura

            // Fecha Page 2
            tl.to(pagesRef.current[2], {
                rotateY: 0,
                duration: 1.5,
                ease: "power2.inOut",
                onStart: () => gsap.set(pagesRef.current[2], { zIndex: 8 }),
                onComplete: () => gsap.set(pagesRef.current[2], { zIndex: 3 })
            }, closeTime);

            // Fecha Page 1
            tl.to(pagesRef.current[1], {
                rotateY: 0,
                duration: 1.5,
                ease: "power2.inOut",
                onStart: () => gsap.set(pagesRef.current[1], { zIndex: 9 }),
                onComplete: () => gsap.set(pagesRef.current[1], { zIndex: 2 })
            }, ">-1");

            // Fecha Capa e Centraliza de volta
            tl.to(pagesRef.current[0], {
                rotateY: 0,
                duration: 1.5,
                ease: "power2.inOut",
                onStart: () => gsap.set(pagesRef.current[0], { zIndex: 20 }),
                onComplete: () => gsap.set(pagesRef.current[0], { zIndex: 20 })
            }, ">-1");

            tl.to(bookRef.current, { x: 0, z: 0, rotateX: 0, rotateY: 0, duration: 1.5 }, "<"); // Volta pro centro

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Universe Styles (Internal CSS for quick theme)
    const coverStyle = "bg-gradient-to-br from-indigo-950 via-purple-900 to-black border-2 border-blue-400/30";
    const universePageStyle = "bg-gradient-to-br from-[#0a0a2a] via-[#1a1a4a] to-black text-white border-r border-blue-500/30";

    return (
        <div ref={containerRef} className="relative h-[100vh] w-full flex items-center justify-center bg-[#050510] perspective-[1500px] overflow-hidden">

            <div
                ref={bookRef}
                className="relative w-[220px] sm:w-[350px] h-[330px] sm:h-[500px] transform-style-3d shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
                {/* Visual Sparkles Overlay */}
                <div ref={sparkleRef} className="opacity-0 transition-opacity duration-700">
                    <Sparkles />
                </div>

                {/* --- CAPA (Cover) --- */}
                <div
                    ref={el => pagesRef.current[0] = el}
                    className="absolute inset-0 transform-origin-left transform-style-3d z-40"
                >
                    {/* Frente da Capa */}
                    <div className={`absolute inset-0 ${coverStyle} rounded-r-lg flex flex-col items-center justify-center p-8 text-center backface-hidden shadow-inner`}>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                        <div className="text-6xl mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">🌌</div>
                        <h2 className="text-3xl font-serif font-bold text-white border-b-2 border-blue-500 pb-2 drop-shadow-md">{t('book.cover_title')}</h2>
                        <p className="mt-4 text-blue-200 text-sm italic">{t('book.cover_subtitle')}</p>
                    </div>
                    {/* Verso da Capa */}
                    <div className={`absolute inset-0 ${universePageStyle} rounded-l-lg transform rotate-y-180 backface-hidden flex items-center justify-center p-8`}>
                        <div className="text-center">
                            <div className="text-4xl mb-2">🚀</div>
                            <p className="text-blue-300 text-xs uppercase tracking-widest">Adventure Begins</p>
                        </div>
                    </div>
                </div>

                {/* --- PÁGINA 1 (Vivid Imagery - Universe Textures) --- */}
                <div
                    ref={el => pagesRef.current[1] = el}
                    className="absolute inset-0 transform-origin-left transform-style-3d z-30"
                >
                    {/* Frente Pag 1 */}
                    <div className={`absolute inset-0 ${universePageStyle} rounded-r-sm flex flex-col items-center justify-center p-8 text-center backface-hidden`}>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                        <div className="text-5xl mb-4 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">🎨</div>
                        <h3 className="text-2xl font-serif font-bold text-blue-100 mb-2">{t('book.page1_title')}</h3>
                        <p className="text-blue-200/80 font-serif leading-relaxed text-sm">{t('book.page1_text')}</p>
                        <span className="absolute bottom-4 text-blue-500/50 text-xs">1</span>
                    </div>
                    {/* Verso Pag 1 */}
                    <div className={`absolute inset-0 ${universePageStyle} border-l border-blue-500/30 rounded-l-sm transform rotate-y-180 backface-hidden flex items-center justify-center p-8`}>
                        <div className="w-full h-full border border-dashed border-blue-500/30 rounded flex items-center justify-center bg-blue-900/10">
                            <span className="text-blue-400 text-xs">Nebula Chart</span>
                        </div>
                        <span className="absolute bottom-4 text-blue-500/50 text-xs">2</span>
                    </div>
                </div>

                {/* --- PÁGINA 2 (Deep Logic - Data Universe) --- */}
                <div
                    ref={el => pagesRef.current[2] = el}
                    className="absolute inset-0 transform-origin-left transform-style-3d z-20"
                >
                    {/* Frente Pag 2 */}
                    <div className={`absolute inset-0 ${universePageStyle} rounded-r-sm flex flex-col items-center justify-center p-8 text-center backface-hidden`}>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="text-5xl mb-4 text-purple-400 drop-shadow-[0_0_10px_rgba(192,132,252,0.8)]">🧠</div>
                        <h3 className="text-2xl font-serif font-bold text-purple-100 mb-2">{t('book.page2_title')}</h3>
                        <p className="text-purple-200/80 font-serif leading-relaxed text-sm">{t('book.page2_text')}</p>
                        <span className="absolute bottom-4 text-purple-500/50 text-xs">3</span>
                    </div>
                    {/* Verso Pag 2 */}
                    <div className={`absolute inset-0 ${universePageStyle} border-l border-purple-500/30 rounded-l-sm transform rotate-y-180 backface-hidden flex items-center justify-center p-8`}>
                        <div className="w-full h-full border border-dashed border-purple-500/30 rounded flex items-center justify-center bg-purple-900/10">
                            <span className="text-purple-400 text-xs">Neural Network</span>
                        </div>
                        <span className="absolute bottom-4 text-purple-500/50 text-xs">4</span>
                    </div>
                </div>

                {/* --- CONTRACAPA (Final) --- */}
                <div className={`absolute inset-0 bg-black z-10 flex flex-col items-center justify-center p-8 text-center border-l border-gray-800 rounded-r-sm`}>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                    <div className="text-5xl mb-4 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]">⚡</div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-2">{t('book.page3_title')}</h3>
                    <p className="text-gray-300 font-serif leading-relaxed text-sm">{t('book.page3_text')}</p>
                    <div className="mt-8 pt-4 border-t border-gray-800 w-full relative z-10">
                        <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">{t('book.back_text')}</p>
                    </div>
                </div>

                {/* Efeito de Páginas Empilhadas (Lateral Direita) */}
                <div className="absolute top-1 right-0 w-[4px] h-[98%] bg-blue-900 transform translate-x-[2px] z-0"></div>
                <div className="absolute top-2 right-0 w-[4px] h-[96%] bg-blue-950 transform translate-x-[4px] z-0"></div>

            </div>
        </div>
    );
};

export default ScrollBook;
