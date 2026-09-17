import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ArrowRight, X, Play } from 'lucide-react';
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '../data/galleryData';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeModalIndex, setActiveModalIndex] = useState(null);
  const [touchActiveIndex, setTouchActiveIndex] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Filter items dynamically based on active category
  const filteredItems = selectedCategory === 'ALL'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  // Lightbox navigation handlers
  const handlePrev = useCallback(() => {
    if (activeModalIndex === null) return;
    setActiveModalIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  }, [activeModalIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (activeModalIndex === null) return;
    setActiveModalIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  }, [activeModalIndex, filteredItems.length]);

  const handleClose = useCallback(() => {
    setActiveModalIndex(null);
  }, []);

  // Keyboard navigation for Lightbox (Left / Right / Escape)
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

  // Lock body scroll when modal is active
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

  // Handle card click / touch:
  // On mobile touch devices: 1st tap reveals the bottom overlay, 2nd tap opens the lightbox
  // On desktop: single click opens the lightbox
  const handleCardClick = (index) => {
    if (window.matchMedia('(hover: none)').matches) {
      if (touchActiveIndex === index) {
        setActiveModalIndex(index);
        setTouchActiveIndex(null);
      } else {
        setTouchActiveIndex(index);
      }
    } else {
      setActiveModalIndex(index);
    }
  };

  const currentItem = activeModalIndex !== null ? filteredItems[activeModalIndex] : null;

  return (
    <div className="gallery-page-root" style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#111827' }}>
      
      {/* ========================================================================= */}
      {/* 1. FULL-WIDTH GALLERY HERO SECTION (REFERENCE COMPOSITION)               */}
      {/* ========================================================================= */}
      <section
        id="gallery-hero-banner"
        style={{
          position: 'relative',
          paddingTop: 'clamp(115px, 13vw, 145px)',
          paddingBottom: 'clamp(48px, 6vw, 68px)',
          backgroundImage: 'url(/images/hero_welding_fabrication.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 38%',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Dark Overlay for crisp contrast while highlighting authentic workshop scene */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(12, 16, 24, 0.91) 0%, rgba(15, 23, 42, 0.82) 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Website Maroon Accent Border Line at Bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(to right, #c52227 0%, #e03137 50%, transparent 100%)'
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '820px' }}>
            
            {/* Breadcrumb Row */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '14px',
                fontFamily: 'var(--font-tech)',
                fontSize: '12.5px',
                color: '#94a3b8',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              <Link to="/" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s' }}>
                HOME
              </Link>
              <ChevronRight size={13} color="#94a3b8" />
              <span style={{ color: '#c52227', fontWeight: 700 }}>OUR GALLERY</span>
            </div>

            {/* Main Page Title */}
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(32px, 4.5vw, 52px)',
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                margin: '0 0 14px 0',
                textTransform: 'uppercase'
              }}
            >
              OUR GALLERY
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 'clamp(15px, 1.25vw, 17.5px)',
                lineHeight: 1.65,
                color: '#cbd5e1',
                margin: 0,
                maxWidth: '740px'
              }}
            >
              A comprehensive showcase of heavy structural steel fabrication, precision sheet metal works, industrial equipment, and custom machine engineering.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CATEGORY FILTER SECTION (ABOVE IMAGE GRID)                             */}
      {/* ========================================================================= */}
      <section style={{ padding: '46px 0 84px' }}>
        <div className="container-custom">
          
          {/* Horizontal Category Filters */}
          <div
            className="gallery-filter-container"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              flexWrap: 'wrap',
              marginBottom: '38px'
            }}
          >
            {GALLERY_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = cat.id === 'ALL'
                ? GALLERY_ITEMS.length
                : GALLERY_ITEMS.filter((item) => item.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setTouchActiveIndex(null);
                  }}
                  className={`gallery-filter-btn ${isActive ? 'active' : ''}`}
                  style={{
                    padding: '9px 18px',
                    borderRadius: '4px',
                    backgroundColor: isActive ? '#c52227' : '#ffffff',
                    color: isActive ? '#ffffff' : '#334155',
                    border: `1px solid ${isActive ? '#c52227' : '#e2e8f0'}`,
                    fontFamily: 'var(--font-heading)',
                    fontSize: '13px',
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: '0.02em',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.22s ease',
                    boxShadow: isActive ? '0 4px 14px rgba(197, 34, 39, 0.28)' : '0 1px 3px rgba(0, 0, 0, 0.04)'
                  }}
                >
                  <span>{cat.label}</span>
                  <span
                    style={{
                      fontSize: '11.5px',
                      opacity: isActive ? 0.92 : 0.65,
                      fontWeight: 600
                    }}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* 3. STRICT 1:1 EQUAL SQUARE GALLERY GRID (4 COLUMNS DESKTOP)               */}
          {/* ========================================================================= */}
          <div className="gallery-uniform-grid">
            {filteredItems.map((item, index) => {
              const isTouchActive = touchActiveIndex === index;

              return (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(index)}
                  className={`gallery-uniform-card ${isTouchActive ? 'touch-active' : ''}`}
                >
                  {/* Strict 1:1 Aspect Ratio Box */}
                  <div className="gallery-card-viewport">
                    {item.isVideo ? (
                      <video
                        src={item.video}
                        muted
                        playsInline
                        preload="metadata"
                        className="gallery-card-img"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="gallery-card-img"
                        style={{ objectPosition: item.objectPosition || 'center' }}
                      />
                    )}

                    {/* Play Badge on Video Cards */}
                    {item.isVideo && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '52px',
                          height: '52px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(197, 34, 39, 0.92)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.38)',
                          zIndex: 3,
                          pointerEvents: 'none',
                          transition: 'transform 0.25s ease, background-color 0.2s ease'
                        }}
                        className="gallery-video-play-indicator"
                      >
                        <Play size={22} fill="#ffffff" color="#ffffff" style={{ marginLeft: '2px' }} />
                      </div>
                    )}

                    {/* Reference-Style Partial Bottom Overlay (Occupies lower 40-45% of card) */}
                    <div className="gallery-partial-bottom-overlay">
                      <div className="gallery-overlay-inner">
                        <span className="gallery-overlay-title">{item.title}</span>
                        <div className="gallery-overlay-arrow">
                          {item.isVideo ? (
                            <Play size={15} fill="#ffffff" color="#ffffff" />
                          ) : (
                            <ArrowRight size={15} color="#ffffff" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CLEAN MINIMAL FULLSCREEN LIGHTBOX                                      */}
      {/* ========================================================================= */}
      {currentItem && (
        <div
          className="gallery-lightbox-backdrop"
          onClick={handleClose}
        >
          <div
            className="gallery-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="gallery-lightbox-close-btn"
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>

            {/* Lightbox Main Stage */}
            <div className="gallery-lightbox-stage">
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
                    maxHeight: '80vh',
                    borderRadius: '4px',
                    backgroundColor: '#000000',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
                  }}
                />
              ) : (
                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  className="gallery-lightbox-photo"
                />
              )}

              {/* Prev / Next Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="gallery-lightbox-nav prev"
                aria-label="Previous Image"
              >
                <ChevronLeft size={26} />
              </button>
              <button
                onClick={handleNext}
                className="gallery-lightbox-nav next"
                aria-label="Next Image"
              >
                <ChevronRight size={26} />
              </button>
            </div>

            {/* Minimal Title and Counter Footer */}
            <div className="gallery-lightbox-info-bar">
              <h3 className="gallery-lightbox-heading">{currentItem.title}</h3>
              <span className="gallery-lightbox-counter">
                {String(activeModalIndex + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CSS STYLES FOR UNIFORM 1:1 GRID & PARTIAL BOTTOM OVERLAY INTERACTION       */}
      {/* ========================================================================= */}
      <style>{`
        .gallery-filter-btn:hover:not(.active) {
          border-color: #cbd5e1 !important;
          background-color: #f8fafc !important;
          color: #0f172a !important;
        }

        /* 1:1 Square Uniform Grid (Desktop: 4 Columns) */
        .gallery-uniform-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 24px;
        }

        .gallery-uniform-card {
          cursor: pointer;
          border-radius: 6px;
          overflow: hidden;
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
          min-width: 0;
        }

        .gallery-uniform-card:hover {
          transform: translateY(-4px);
          border-color: #c52227;
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.10);
        }

        /* 1:1 Aspect Ratio Container */
        .gallery-card-viewport {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background-color: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gallery-card-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          display: block;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gallery-uniform-card:hover .gallery-card-img,
        .gallery-uniform-card.touch-active .gallery-card-img {
          transform: scale(1.05);
        }

        /* ========================================================================= */
        /* PARTIAL BOTTOM OVERLAY PANEL (OCCUPIES LOWER 40-45% OF CARD)              */
        /* ========================================================================= */
        .gallery-partial-bottom-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 42%;
          min-height: 48px;
          background: linear-gradient(to top, rgba(175, 22, 27, 0.97) 0%, rgba(197, 34, 39, 0.92) 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
          transform: translateY(100%);
          opacity: 0;
          transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
          z-index: 5;
        }

        .gallery-uniform-card:hover .gallery-partial-bottom-overlay,
        .gallery-uniform-card.touch-active .gallery-partial-bottom-overlay {
          transform: translateY(0);
          opacity: 1;
        }

        .gallery-overlay-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 8px;
          min-width: 0;
        }

        .gallery-overlay-title {
          font-family: var(--font-heading);
          font-size: 14.5px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.25;
          letter-spacing: -0.01em;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-width: 0;
        }

        .gallery-overlay-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          background-color: rgba(255, 255, 255, 0.22);
          border-radius: 4px;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }

        .gallery-uniform-card:hover .gallery-overlay-arrow {
          transform: translateX(2px);
          background-color: rgba(255, 255, 255, 0.35);
        }

        /* ========================================================================= */
        /* LIGHTBOX MODAL STYLES                                                     */
        /* ========================================================================= */
        .gallery-lightbox-backdrop {
          position: fixed;
          inset: 0;
          z-index: 999;
          background-color: rgba(8, 12, 20, 0.95);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: lightboxFadeIn 0.22s ease-out;
        }

        .gallery-lightbox-content {
          position: relative;
          max-width: 960px;
          width: 100%;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .gallery-lightbox-close-btn {
          position: absolute;
          top: -48px;
          right: 0;
          width: 38px;
          height: 38px;
          background-color: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
        }

        .gallery-lightbox-close-btn:hover {
          background-color: #c52227;
          border-color: #c52227;
          transform: scale(1.08);
        }

        .gallery-lightbox-stage {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #000000;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
        }

        .gallery-lightbox-photo {
          max-width: 100%;
          max-height: 72vh;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
        }

        .gallery-lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(4px);
        }

        .gallery-lightbox-nav:hover {
          background-color: #c52227;
          border-color: #c52227;
          transform: translateY(-50%) scale(1.08);
        }

        .gallery-lightbox-nav.prev {
          left: 14px;
        }

        .gallery-lightbox-nav.next {
          right: 14px;
        }

        .gallery-lightbox-info-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 14px 4px 0;
          color: #ffffff;
        }

        .gallery-lightbox-heading {
          font-family: var(--font-heading);
          font-size: 17px;
          font-weight: 600;
          margin: 0;
          color: #f1f5f9;
          letter-spacing: -0.01em;
        }

        .gallery-lightbox-counter {
          font-family: var(--font-tech);
          font-size: 13px;
          color: #94a3b8;
          font-weight: 600;
          letter-spacing: 0.04em;
        }

        @keyframes lightboxFadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }

        /* Responsive Breakpoints */
        @media (max-width: 1100px) {
          .gallery-uniform-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          #gallery-hero-banner {
            padding-top: calc(var(--nav-height, 70px) + 24px) !important;
            padding-bottom: 32px !important;
          }
          .gallery-filter-container {
            margin-bottom: 24px !important;
            gap: 8px !important;
          }
          .gallery-filter-btn {
            padding: 7px 13px !important;
            font-size: 12px !important;
          }
          .gallery-uniform-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 12px !important;
          }
          .gallery-overlay-title {
            font-size: 12px;
          }
          .gallery-partial-bottom-overlay {
            padding: 0 10px;
            height: 46%;
            min-height: 42px;
          }
          .gallery-overlay-arrow {
            width: 22px;
            height: 22px;
          }
          .gallery-video-play-indicator {
            width: 44px !important;
            height: 44px !important;
          }
          .gallery-lightbox-nav {
            width: 38px;
            height: 38px;
          }
          .gallery-lightbox-nav.prev {
            left: 8px;
          }
          .gallery-lightbox-nav.next {
            right: 8px;
          }
        }

        @media (max-width: 480px) {
          .gallery-filter-container {
            margin-bottom: 18px !important;
            gap: 6px !important;
          }
          .gallery-filter-btn {
            padding: 6px 10px !important;
            font-size: 11.5px !important;
          }
          .gallery-uniform-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 10px !important;
          }
          .gallery-overlay-title {
            font-size: 10.5px;
            -webkit-line-clamp: 2;
            line-height: 1.2;
          }
          .gallery-partial-bottom-overlay {
            padding: 0 6px;
            height: 48%;
            min-height: 36px;
          }
          .gallery-overlay-arrow {
            display: none;
          }
          .gallery-video-play-indicator {
            width: 38px !important;
            height: 38px !important;
          }
          .gallery-lightbox-photo {
            max-height: 60vh;
          }
          .gallery-lightbox-close-btn {
            top: -42px;
            width: 34px;
            height: 34px;
          }
        }

        @media (max-width: 375px) {
          .gallery-uniform-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 8px !important;
          }
          .gallery-overlay-title {
            font-size: 10px;
            line-height: 1.15;
          }
          .gallery-partial-bottom-overlay {
            padding: 0 5px;
            height: 50%;
            min-height: 34px;
          }
          .gallery-video-play-indicator {
            width: 34px !important;
            height: 34px !important;
          }
        }
      `}</style>
    </div>
  );
}
