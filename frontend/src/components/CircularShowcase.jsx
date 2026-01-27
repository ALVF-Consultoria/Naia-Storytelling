import React, { useRef, useLayoutEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const CircularShowcase = () => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);
    const { t } = useTranslation();

    const showcaseItems = useMemo(() => [
        { title: t('showcase.ai_characters'), desc: t('showcase.ai_characters_desc'), icon: "🤖" },
        { title: t('showcase.world_building'), desc: t('showcase.world_building_desc'), icon: "🌍" },
        { title: t('showcase.plot_twists'), desc: t('showcase.plot_twists_desc'), icon: "⚡" },
        { title: t('showcase.multi_language'), desc: t('showcase.multi_language_desc'), icon: "🌐" },
        { title: t('showcase.export_pdf'), desc: t('showcase.export_pdf_desc'), icon: "📄" },
    ], [t]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const total = showcaseItems.length;
            const radius = 300;

            // O container principal será "pinado" (fixado) enquanto o scroll acontece
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "center center", // Começa quando o centro do elemento chega no centro da tela
                    end: "+=4000", // O usuário precisará scrollar 4000px para completar a rotação
                    pin: true,     // Fixa o elemento
                    scrub: 1,      // Suaviza a animação vinculada ao scroll
                    // markers: true, // Remova em produção
                }
            });

            // Objeto proxy para controlar a rotação via timeline
            const proxy = { rotation: 0 };

            // Define a rotação inicial das cartas
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                const angleDeg = (i * (360 / total));
                updateCardPosition(card, angleDeg, radius);
            });

            // Anima a propriedade 'rotation' do proxy de 0 a 360 (uma volta completa)
            // Conforme o scroll avança, o onUpdate recalcula a posição de todas as cartas
            tl.to(proxy, {
                rotation: 360,
                ease: "none",
                onUpdate: () => {
                    const currentRot = proxy.rotation;
                    cardsRef.current.forEach((card, i) => {
                        if (!card) return;
                        const angleDeg = (i * (360 / total)) + currentRot;
                        updateCardPosition(card, angleDeg, radius);
                    });
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, [showcaseItems]); // Recria a timeline se os itens mudarem (tradução)

    // Função auxiliar para calcular X, Scale, ZIndex e Opacidade baseada no ângulo
    const updateCardPosition = (card, angleDeg, radius) => {
        const angleRad = angleDeg * (Math.PI / 180);

        // Math.sin será usado para profundidade (z)
        // 1 = Frente (mais perto), -1 = Fundo (mais longe)
        const zFactor = Math.sin(angleRad); // Corrigido para sin bater com movimento circular padrão visual
        const xFactor = Math.cos(angleRad);

        const x = xFactor * radius;

        // Escala varia de 0.6 (fundo) a 1.0 (frente)
        const scale = 0.6 + ((zFactor + 1) / 2) * 0.4;

        // Opacidade para dar profundidade
        const opacity = 0.4 + ((zFactor + 1) / 2) * 0.6;

        // Z-index crítico para sobreposição correta
        const zIndex = Math.floor((zFactor + 1) * 100);

        gsap.set(card, {
            x: x,
            scale: scale,
            zIndex: zIndex,
            opacity: opacity,
            // Mantém o cartão virado para frente, sem rotação 3D bizarra
        });
    };

    return (
        <div ref={containerRef} className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden">
            <div className="absolute w-full h-full flex items-center justify-center">
                {/* Linhas de órbita decorativas */}
                <div className="absolute w-[600px] h-[600px] border border-blue-500/10 rounded-full border-dashed animate-spin-slow"></div>

                {/* Centro Fixo (Opcional, pode ser o logo da NAIA) */}
                <div className="absolute z-10 text-center">
                    <div className="w-32 h-32 bg-blue-600 rounded-full blur-[60px] opacity-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    <h2 className="text-3xl font-bold text-white relative z-20">{t('showcase.center_core')}</h2>
                </div>

                {/* Cartas */}
                {showcaseItems.map((item, index) => (
                    <div
                        key={index}
                        ref={el => cardsRef.current[index] = el}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0a0a1a]/80 backdrop-blur-xl p-6 rounded-2xl border border-blue-500/30 w-72 text-center shadow-[0_0_50px_rgba(59,130,246,0.15)] flex flex-col items-center gap-3"
                    >
                        <div className="text-5xl">{item.icon}</div>
                        <div>
                            <h3 className="text-xl font-bold text-blue-100">{item.title}</h3>
                            <p className="text-sm text-blue-200/60 mt-1">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dica de Scroll */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/30 text-sm animate-pulse">
                {t('showcase.scroll_hint')}
            </div>
        </div>
    );
};

export default CircularShowcase;
