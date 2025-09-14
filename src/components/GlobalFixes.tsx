import React from "react"

const GlobalFixes = () => (
  <style>{`
    .clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    @keyframes marquee-x {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      animation: marquee-x 22s linear infinite;
      will-change: transform;
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-marquee { animation: none !important; transform: none !important; }
    }
    .marquee-edges {
      -webkit-mask-image: linear-gradient(to right, transparent 0, black 48px, black calc(100% - 48px), transparent 100%);
      mask-image: linear-gradient(to right, transparent 0, black 48px, black calc(100% - 48px), transparent 100%);
    }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

export default GlobalFixes;