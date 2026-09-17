import React, { useState, useEffect } from 'react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/images/hero_welding_fabrication.jpg',
      alt: 'Mauli Krupa Precision Works Structural Steel Fabrication and MIG Welding'
    },
    {
      image: '/images/hero_cnc_precision.jpg',
      alt: 'Precision CNC Sheet Metal Cutting and Fabrication Machinery'
    },
    {
      image: '/images/hero_machine_assembly.jpg',
      alt: 'Precision Machine Assemblies, Jigs and Tooling Fixtures'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section 
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'calc(var(--nav-height, 80px) + 60px)',
        paddingBottom: '100px',
        overflow: 'hidden',
        backgroundColor: '#0c0e12'
      }}
    >
      {/* Background Image Carousel with High Clarity & Natural Brightness */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.image}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 40%',
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'scale(1.02)' : 'scale(1.06)',
              transition: 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1), transform 7s ease-out',
              filter: 'brightness(0.88) contrast(1.06) saturate(1.12)',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />
        );
      })}

      {/* Subtle Directional Overlay: Preserves High Machine Visibility while ensuring text legibility */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(10, 12, 16, 0.72) 0%, rgba(10, 12, 16, 0.38) 42%, rgba(10, 12, 16, 0.08) 75%, rgba(10, 12, 16, 0.2) 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10, 12, 16, 0.3) 0%, transparent 40%, rgba(10, 12, 16, 0.5) 90%, #0c0e12 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Hero Content Container */}
      <div className="container-custom" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{ maxWidth: '780px' }}>
          
          {/* Eyebrow Label */}
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(12px, 1.1vw, 13.5px)',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#ef4444',
              marginBottom: '22px'
            }}
          >
            <span 
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#ef4444',
                boxShadow: '0 0 10px rgba(239, 68, 68, 0.9)',
                display: 'inline-block'
              }} 
            />
            <span>PRECISION ENGINEERING · MANUFACTURING</span>
          </div>

          {/* Clean, Modern Industrial Sans-Serif Heading */}
          <h1 
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 5vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.14,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#ffffff',
              marginBottom: '20px',
              wordBreak: 'break-word',
              textShadow: '0 3px 20px rgba(0, 0, 0, 0.85)'
            }}
          >
            ENGINEERING SOLUTIONS<br />
            BUILT FOR INDUSTRY.
          </h1>

          {/* One Short Supporting Sentence */}
          <p 
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(15px, 1.3vw, 18.5px)',
              lineHeight: 1.65,
              color: '#f8fafc',
              maxWidth: '640px',
              margin: 0,
              fontWeight: 400,
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.8)'
            }}
          >
            Delivering precision tooling, jigs & fixtures, conveyors, heavy fabrication, and custom machines for leading industrial OEMs.
          </p>

        </div>

        {/* Minimal Slide Indicator Lines */}
        <div 
          className="hero-slide-indicators"
          style={{
            position: 'absolute',
            bottom: '-48px',
            right: '0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 3
          }}
        >
          {slides.map((_, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                style={{
                  width: isActive ? '36px' : '10px',
                  height: '3px',
                  borderRadius: '2px',
                  backgroundColor: isActive ? '#c52227' : 'rgba(255, 255, 255, 0.55)',
                  transition: 'all 0.4s ease',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer'
                }}
              />
            );
          })}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          #home {
            min-height: auto !important;
            padding-top: calc(var(--nav-height, 70px) + 24px) !important;
            padding-bottom: 40px !important;
          }
          .hero-slide-indicators {
            position: relative !important;
            bottom: auto !important;
            right: auto !important;
            margin-top: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
