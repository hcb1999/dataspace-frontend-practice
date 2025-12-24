import React, { useEffect, useState } from 'react';
import { t, getLang, onLangChange } from '../../translation';

export default function Footer() {
  const [lang, setLangState] = useState(getLang());
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const off = onLangChange(() => setLangState(getLang()));
    return off;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <footer
        style={{ 
          fontFamily: 'S-CoreDream-4Regular',
          backgroundColor: '#363636'
        }}
        className="relative py-8 text-center text-gray-300"
      >
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-400">Theme: </span>
              <span className="text-gray-200">IIIdy. </span>
              <span className="text-white font-bold">Copyright© 2019-2025. TOVUP Co., Ltd. All Rights Reserved.</span>
            </p>
            <p className="text-white font-bold">서울시 중구 다동길 5, 광일빌딩 1201호</p>
            <p className="text-white font-bold">tovup@tovup.com / 02-3789-7999</p>
          </div>
        </div>
        
        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="absolute right-4 bottom-4 w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors shadow-lg"
            aria-label="맨 위로 이동"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 15l7-7 7 7" 
              />
            </svg>
          </button>
        )}
      </footer>
    </>
  );
}


