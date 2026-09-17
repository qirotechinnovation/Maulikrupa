import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  Maximize2,
  X,
  Crosshair,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Play
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/galleryData';

export default function Gallery() {
  const scrollContainerRef = useRef(null);
  const [activeModalIndex, setActiveModalIndex] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Showcase top curated featured projects from the genuine workshop asset library
  const featuredShowcaseItems = GALLERY_ITEMS.slice(0, 12);

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = direction === 'left' ? -460 : 460;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const onScrollUpdate = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollPosition(scrollLeft / maxScroll);
    }
  };

  // Lightbox handlers
  const handlePrev = useCallback(() => {
    if (activeModalIndex === null) return;
    setActiveModalIndex((prev) => (prev > 0 ? prev - 1 : featuredShowcaseItems.length - 1));
  }, [activeModalIndex, featuredShowcaseItems.length]);

  const handleNext = useCallback(() => {
    if (activeModalIndex === null) return;
    setActiveModalIndex((prev) => (prev < featuredShowcaseItems.length - 1 ? prev + 1 : 0));
  }, [activeModalIndex, featuredShowcaseItems.length]);

  const handleClose = useCallback(() => {
    setActiveModalIndex(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (activeModalIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalIndex, handlePrev, handleNext, handleClose]);

  // Lock body scroll
  useEffect(() => {
    if (activeModalIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activeModalIndex]);

  const currentItem = activeModalIndex !== null ? featuredShowcaseItems[activeModalIndex] : null;

  return (
    <section
      id="gallery"
      style={{
        position: 'relative',
        paddingTop: '100px',
        paddingBottom: '90px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e7eb',
        borderBottom: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}
    >
      {/* Subtle CAD Background Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 2 }}>
        {/* ========================================================================= */}
        {/* 1. EDITORIAL HEADER & NAVIGATION CONTROLS                                 */}
        {/* ========================================================================= */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          <div style={{ maxWidth: '720px' }}>
            {/* Eyebrow */}
            <div className="eyebrow-label" style={{ marginBottom: '12px' }}>
              <span className="eyebrow-dot" />
              <span>SHOPFLOOR ARTIFACTS & REAL PROJECTS</span>
            </div>

            {/* Heading */}
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3.8vw, 44px)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: '#111827',
                margin: '0 0 12px 0',
                textTransform: 'uppercase'
              }}
            >
              ENGINEERING{' '}
              <span
                style={{
                  color: '#c52227',
                  fontFamily: 'var(--font-tech)',
                  fontWeight: 800,
                  letterSpacing: '0.04em'
                }}
              >
                GALLERY
              </span>
            </h2>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 'clamp(14.5px, 1.2vw, 16.5px)',
                lineHeight: 1.6,
                color: '#4b5563',
                margin: 0
              }}
            >
              Real photographs of heavy structural frames, stainless steel ducting & hoppers, rotary valves, and special purpose machinery built at Bhosari MIDC, Pune.
            </p>
          </div>

          {/* Action Buttons: View All & Navigation Control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link
              to="/gallery"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: '#111827',
                color: '#ffffff',
                borderRadius: '3px',
                fontFamily: 'var(--font-tech)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#c52227';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#111827';
              }}
            >
              <span>Explore All 38 Works</span>
              <ArrowRight size={14} />
            </Link>

            <button
              onClick={() => handleScroll('left')}
              aria-label="Scroll left in gallery"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '3px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #e2e8f0',
                color: '#111827',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#111827';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = '#111827';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
                e.currentTarget.style.color = '#111827';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <ArrowLeft size={17} />
            </button>

            <button
              onClick={() => handleScroll('right')}
              aria-label="Scroll right in gallery"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '3px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #e2e8f0',
                color: '#111827',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#c52227';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = '#c52227';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
                e.currentTarget.style.color = '#111827';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. HORIZONTAL EDITORIAL PORTFOLIO RAIL (GCC-INDIA INSPIRATION)             */}
      {/* ========================================================================= */}
      <div
        ref={scrollContainerRef}
        onScroll={onScrollUpdate}
        style={{
          display: 'flex',
          gap: '24px',
          overflowX: 'auto',
          paddingLeft: 'max(24px, calc((100vw - 1240px) / 2))',
          paddingRight: 'max(24px, calc((100vw - 1240px) / 2))',
          paddingBottom: '20px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollSnapType: 'x proximity',
          position: 'relative',
          zIndex: 2
        }}
        className="home-gallery-rail"
      >
        {featuredShowcaseItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setActiveModalIndex(index)}
            className="home-gallery-card"
          >
            {/* Image Frame */}
            <div className="home-gallery-frame">
              {item.isVideo ? (
                <video
                  src={item.video}
                  muted
                  playsInline
                  preload="metadata"
                  className="home-gallery-img"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="home-gallery-img"
                />
              )}

              {/* Video Play Badge Indicator */}
              {item.isVideo && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(197, 34, 39, 0.92)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 18px rgba(0,0,0,0.35)',
                    zIndex: 2,
                    pointerEvents: 'none',
                    transition: 'transform 0.25s ease, background-color 0.2s ease'
                  }}
                  className="home-gallery-video-play-btn"
                >
                  <Play size={20} fill="#ffffff" color="#ffffff" style={{ marginLeft: '2px' }} />
                </div>
              )}

              {/* Tag Overlays */}
              <div className="home-gallery-badge-box">
                <span className="home-gallery-code">{item.code}</span>
                <span className="home-gallery-cat">{item.isVideo ? 'VIDEO' : item.category}</span>
              </div>

              {/* Hover Veil */}
              <div className="home-gallery-hover-veil">
                <div className="home-gallery-hover-pill">
                  {item.isVideo ? (
                    <>
                      <Play size={13} fill="#c52227" color="#c52227" />
                      <span>PLAY WORKSHOP VIDEO</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 size={13} color="#c52227" />
                      <span>INSPECT SPECIFICATION</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Information Box */}
            <div className="home-gallery-info">
              <div className="home-gallery-meta-row">
                <span className="home-gallery-cat-text">{item.category}</span>
                <span className="home-gallery-code-text">[{item.code}]</span>
              </div>
              <h3 className="home-gallery-title">{item.title}</h3>
              <p className="home-gallery-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM PROGRESS TRACK & SUMMARY                                        */}
      {/* ========================================================================= */}
      <div className="container-custom" style={{ marginTop: '24px', position: 'relative', zIndex: 2 }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '2px',
            backgroundColor: '#e2e8f0',
            borderRadius: '1px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${Math.max(scrollPosition * 100, 16)}%`,
              backgroundColor: '#c52227',
              transition: 'width 0.2s linear'
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '12px',
            fontFamily: 'var(--font-tech)',
            fontSize: '11px',
            color: '#94a3b8',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}
        >
          <span>38 AUTHENTIC WORKSHOP ASSETS AVAILABLE</span>
          <span style={{ color: '#c52227', fontWeight: 600 }}>SWIPE / SCROLL HORIZONTALLY TO EXPLORE</span>
          <span>BHOSARI MIDC, PUNE</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. FULL-SCREEN LIGHTBOX MODAL                                             */}
      {/* ========================================================================= */}
      {currentItem && (
        <div
          className="gallery-lightbox-backdrop"
          onClick={handleClose}
        >
          <div
            className="gallery-lightbox-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Lightbox Header */}
            <div className="gallery-lightbox-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="lightbox-code-pill">{currentItem.code}</span>
                <span style={{ color: '#475569' }}>|</span>
                <span className="lightbox-cat-pill">{currentItem.category}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span className="lightbox-counter">
                  {String(activeModalIndex + 1).padStart(2, '0')} / {String(featuredShowcaseItems.length).padStart(2, '0')}
                </span>
                <button
                  onClick={handleClose}
                  className="lightbox-close-btn"
                  aria-label="Close Lightbox"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Lightbox Body */}
            <div className="gallery-lightbox-body">
              {/* Image / Video Stage */}
              <div className="lightbox-image-stage">
                {currentItem.isVideo ? (
                  <video
                    src={currentItem.video}
                    poster={currentItem.image}
                    controls
                    autoPlay
                    muted
                    defaultMuted
                    playsInline
                    preload="metadata"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      borderRadius: '4px',
                      backgroundColor: '#000000',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
                    }}
                  />
                ) : (
                  <img
                    src={currentItem.image}
                    alt={currentItem.title}
                    className="lightbox-img"
                  />
                )}

                <button
                  onClick={handlePrev}
                  className="lightbox-nav-btn prev"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={handleNext}
                  className="lightbox-nav-btn next"
                  aria-label="Next image"
                >
                  <ChevronRight size={22} />
                </button>
              </div>

              {/* Technical Spec Drawer */}
              <div className="lightbox-info-drawer">
                <div>
                  <div className="lightbox-meta-top">
                    <span className="lightbox-serial-tag">WORKSHOP SERIAL: {currentItem.code}</span>
                    <span className="lightbox-location-tag">BHOSARI MIDC, PUNE</span>
                  </div>

                  <h2 className="lightbox-title">{currentItem.title}</h2>
                  <p className="lightbox-description">{currentItem.description}</p>

                  <div style={{ marginTop: '20px' }}>
                    <h4 className="lightbox-specs-heading">
                      MANUFACTURING & SPECIFICATION DETAILS
                    </h4>
                    <div className="lightbox-specs-list">
                      {currentItem.specs ? currentItem.specs.map((spec, idx) => (
                        <div key={idx} className="lightbox-spec-item">
                          <CheckCircle2 size={14} color="#c52227" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{spec}</span>
                        </div>
                      )) : (
                        <div className="lightbox-spec-item">
                          <CheckCircle2 size={14} color="#c52227" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>Manufactured to high precision tolerances at Bhosari MIDC, Pune</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="lightbox-footer-action">
                  <Link
                    to="/contact"
                    onClick={handleClose}
                    className="lightbox-rfq-btn"
                  >
                    <span>Inquire for Similar Project</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Embedded CSS */}
      <style>{`
        .home-gallery-rail::-webkit-scrollbar {
          display: none;
        }

        .home-gallery-card {
          flex: 0 0 380px;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          scroll-snap-align: start;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .home-gallery-card:hover {
          transform: translateY(-6px);
          border-color: #c52227;
          box-shadow: 0 16px 36px rgba(15, 23, 42, 0.12);
        }

        .home-gallery-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 11;
          background-color: #f8fafc;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .home-gallery-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .home-gallery-card:hover .home-gallery-img {
          transform: scale(1.05);
        }

        .home-gallery-badge-box {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .home-gallery-code {
          padding: 3px 6px;
          background-color: rgba(17, 24, 39, 0.88);
          color: #f8fafc;
          font-family: var(--font-tech);
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.06em;
          border-radius: 2px;
          backdrop-filter: blur(4px);
        }

        .home-gallery-cat {
          padding: 3px 6px;
          background-color: rgba(197, 34, 39, 0.9);
          color: #ffffff;
          font-family: var(--font-tech);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border-radius: 2px;
        }

        .home-gallery-hover-veil {
          position: absolute;
          inset: 0;
          background-color: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.25s ease;
          z-index: 3;
        }

        .home-gallery-card:hover .home-gallery-hover-veil {
          opacity: 1;
        }

        .home-gallery-hover-pill {
          padding: 7px 14px;
          background-color: #ffffff;
          color: #111827;
          border-radius: 2px;
          font-family: var(--font-tech);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.25);
        }

        .home-gallery-info {
          padding: 16px 18px 18px;
          background-color: #ffffff;
        }

        .home-gallery-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
          font-family: var(--font-tech);
          font-size: 10.5px;
        }

        .home-gallery-cat-text {
          color: #c52227;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .home-gallery-code-text {
          color: #94a3b8;
          font-weight: 600;
        }

        .home-gallery-title {
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 700;
          color: #111827;
          line-height: 1.3;
          margin: 0 0 6px 0;
          letter-spacing: -0.01em;
        }

        .home-gallery-desc {
          font-size: 12.5px;
          line-height: 1.5;
          color: #64748b;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          #gallery {
            padding-top: 44px !important;
            padding-bottom: 40px !important;
          }
          .home-gallery-card {
            flex: 0 0 280px;
          }
        }
        @media (max-width: 480px) {
          #gallery {
            padding-top: 32px !important;
            padding-bottom: 32px !important;
          }
          .home-gallery-card {
            flex: 0 0 260px;
          }
        }
      `}</style>
    </section>
  );
}
