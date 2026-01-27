import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import HTMLFlipBook from "react-pageflip";
import SparklesCore from "./Sparkles";

const splitStoryIntoPages = (storyText, wordsPerPage = 50) => {
  const chapters = storyText.split(/\n(?=Capítulo \d+:)/);
  const pages = [];

  chapters.forEach((chapter) => {
    const words = chapter.split(" ");
    for (let i = 0; i < words.length; i += wordsPerPage) {
      pages.push(words.slice(i, i + wordsPerPage).join(" "));
    }
  });

  return pages;
};

const EbookViewer = ({ storyText, storyTitle = "My Story" }) => {
  const flipBookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);
  const pages = splitStoryIntoPages(storyText, 50);
  const totalPages = pages.length;

  const pageStyle = "bg-gradient-to-br from-[#d3d3d3] to-[#f5f5f5] text-gray-900";

  // Trigger sparkles on page change
  const handleFlip = (e) => {
    setCurrentPage(e.data);
    setShowSparkles(true);
    // Hide sparkles after animation
    setTimeout(() => setShowSparkles(false), 800);
  };

  // Left volume appears as book opens (page > 0)
  const leftOpacity = currentPage > 0 ? 1 : 0;
  // Calculate total layout items: 1 Cover + N Pages + 1 Inside Back + 1 Back Cover
  const totalLayoutPages = pages.length + 3;

  // Right volume disappears as book closes (last page)
  const rightOpacity = currentPage < totalLayoutPages - 1 ? 1 : 0;

  // Determine X offset for centering
  // If Page 0 (Cover): Shift Left to center the cover.
  // If Last Page (Back Cover): Shift Right to center the back cover.
  // Otherwise: Center (Spine in center).
  let xOffset = 0;
  if (currentPage === 0) {
    xOffset = -110; // Shift left (approx half page width visually) // 450px width -> center is 225. Reduced slightly for aesthetics
  } else if (currentPage >= totalLayoutPages - 2) { // Logic: If showing Back Cover (Last Spread)
    xOffset = 110; // Shift right
  }

  return (
    <div className="flex justify-center w-full bg-transparent py-10 relative">

      {/* Sparkles Effect Overlay */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
          <SparklesCore count={15} x={0} y={0} />
        </div>
      )}

      {/* Motion Container for Centering Animation */}
      <motion.div
        className="relative rounded-2xl"
        animate={{ x: xOffset }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Left volume effect */}
        <div
          className="absolute -left-2 top-2 w-1.5 h-[96%] bg-gradient-to-b from-gray-400/60 to-gray-600/40 rounded-l-md shadow-md transition-opacity duration-300"
          style={{ opacity: leftOpacity }}
        />
        <div
          className="absolute -left-[6px] top-3 w-[3px] h-[94%] bg-gray-300/60 rounded-md blur-[1px] transition-opacity duration-300"
          style={{ opacity: leftOpacity }}
        />

        {/* Right volume effect */}
        <div
          className="absolute -right-2 top-2 w-1.5 h-[96%] bg-gradient-to-b from-gray-400/60 to-gray-600/40 rounded-r-md shadow-md transition-opacity duration-300"
          style={{ opacity: rightOpacity }}
        />
        <div
          className="absolute -right-[6px] top-3 w-[3px] h-[94%] bg-gray-300/60 rounded-md blur-[1px] transition-opacity duration-300"
          style={{ opacity: rightOpacity }}
        />

        <HTMLFlipBook
          ref={flipBookRef}
          width={450}
          height={650}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1536}
          maxShadowOpacity={0.5}
          showCover={true}
          drawShadow={true}
          flippingTime={700}
          usePortrait={false}
          startPage={0}
          className="rounded-xl overflow-hidden mx-auto"
          onFlip={handleFlip}
        >
          {/* FRONR COVER */}
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 text-white flex items-center justify-center p-10 border border-gray-900 rounded-xl shadow-inner">
            <div className="text-center">
              <p className="opacity-90 text-2xl font-serif font-bold drop-shadow-md mb-2">
                {storyTitle}
              </p>
              <div className="w-16 h-1 bg-yellow-500/50 mx-auto rounded-full"></div>
            </div>
          </div>

          {/* PAGES */}
          {pages.map((page, idx) => (
            <div
              key={idx}
              className={`relative p-8 flex flex-col items-start justify-start text-lg leading-relaxed font-serif ${pageStyle}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.03] to-transparent pointer-events-none" />
              <div className="absolute inset-0 border border-black/5 rounded-xl pointer-events-none" />
              <p className="whitespace-pre-wrap relative z-10 text-justify">{page}</p>
              <span className="absolute bottom-4 right-6 text-xs text-gray-500 font-sans">{idx + 1}</span>
            </div>
          ))}

          {/* INSIDE BACK COVER (Paper style, ends the book content) */}
          <div className={`relative p-8 flex flex-col items-center justify-center text-lg leading-relaxed font-serif ${pageStyle}`}>
            <p className="text-gray-500 italic opacity-60">Fim</p>
          </div>

          {/* BACK COVER (Matches Front Cover Style to simulate Closing) */}
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 text-white flex items-center justify-center p-10 border border-gray-900 rounded-xl shadow-inner">
            <div className="text-center">
              <p className="opacity-90 text-xl font-serif italic mb-2">
                The End
              </p>
              <div className="w-8 h-8 bg-yellow-500/20 rounded-full mx-auto animate-pulse"></div>
            </div>
          </div>
        </HTMLFlipBook>
      </motion.div>
    </div>
  );
};

export default EbookViewer;
