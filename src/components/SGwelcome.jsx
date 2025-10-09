import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link from react-router-dom

export default function SGWelcomeInterface() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(t1);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#EBCB90' }}>
      <div className="relative w-full max-w-3xl flex flex-col items-center text-center">
        <div aria-hidden className="absolute inset-x-0 -top-16 pointer-events-none">
          <div className="mx-auto w-72 h-72 rounded-full opacity-30 blur-3xl" style={{ background: 'radial-gradient(closest-side, rgba(0,0,0,0.2), transparent 60%)' }} />
        </div>

        <section className="relative z-10 flex flex-col items-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className={`absolute inset-x-0 bottom-0 mx-auto w-11/12 h-3/4 rounded-2xl transform transition-all duration-700 ease-out ${open ? 'scale-100' : 'scale-95'}`}>
              <div className="w-full h-full rounded-2xl shadow-2xl flex items-center justify-center border" style={{ borderColor: '#070707', backgroundColor: '#F5E1C3' }}>
                <p className="text-black text-lg font-semibold px-4">Explore a curated selection of premium gift items perfect for every occasion!</p>
              </div>
            </div>

            <div className={`absolute left-1/2 top-0 transform -translate-x-1/2 w-11/12 h-28 md:h-32 rounded-t-2xl origin-bottom transition-transform duration-900 ${open ? '-translate-y-14 rotate-[-18deg]' : 'translate-y-0 rotate-0'}`}>
              <div className="w-full h-full rounded-t-2xl border shadow-lg flex items-center justify-center" style={{ borderColor: '#070707', backgroundColor: '#F5E1C3', overflow: 'visible' }}>
                <div className="absolute top-1/2 left-0 right-0 h-6 md:h-8 -translate-y-1/2" style={{ background: 'linear-gradient(90deg,#070707,#070707)' }} />
              </div>
            </div>

            <div className={`absolute left-1/2 top-8 transform -translate-x-1/2 transition-all duration-900 ${open ? 'scale-125 translate-y-[-6px]' : 'scale-100'}`}>
              <svg width="88" height="88" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <defs>
                  <radialGradient id="g1" cx="50%" cy="40%">
                    <stop offset="0%" stopColor="#070707" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#070707" />
                  </radialGradient>
                </defs>
                <g>
                  <ellipse cx="30" cy="40" rx="18" ry="12" fill="url(#g1)" transform="rotate(-25 30 40)" />
                  <ellipse cx="70" cy="40" rx="18" ry="12" fill="url(#g1)" transform="rotate(25 70 40)" />
                  <circle cx="50" cy="40" r="10" fill="#070707" stroke="#070707" strokeWidth="1" />
                </g>
              </svg>
            </div>

            <div className={`absolute inset-0 pointer-events-none ${open ? 'opacity-100' : 'opacity-0'}`}>
              <Sparks />
            </div>
          </div>

          <h1 className="mt-8 text-3xl md:text-4xl font-extrabold tracking-tight leading-tight" style={{ color: '#070707' }}>
            Welcome to SG Gifts
          </h1>

          <div className="mt-6 flex gap-4">
            {/* ✅ Contact Us Link */}
            <Link
              to='/contactus'
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border"
              style={{ borderColor: '#070707', backgroundColor: '#070707', color: '#EBCB90', fontWeight: 'bold', fontSize: '1.125rem', textDecoration: 'none' }}
            >
              Contact Us
            </Link>

            {/* ✅ Shop Now Link */}
            <Link
              to="/"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border"
              style={{ borderColor: '#070707', backgroundColor: '#070707', color: '#EBCB90', fontWeight: 'bold', fontSize: '1.125rem', textDecoration: 'none' }}
            >
              Shop Now
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function Sparks() {
  const particles = Array.from({ length: 24 });
  return (
    <div className="absolute inset-0 overflow-visible pointer-events-none">
      {particles.map((_, i) => (
        <span key={i} className="particle" style={{ left: `${20 + i * 3.2}%`, top: `${40 - (i % 6) * 2}%`, animationDelay: `${(i % 7) * 80}ms`, background: '#070707', width: '8px', height: '8px', borderRadius: '50%' }} />
      ))}
    </div>
  );
}
