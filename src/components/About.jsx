import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../data/companyData';

export default function About() {
  return (
    <section 
      id="about"
      style={{
        position: 'relative',
        paddingTop: 'clamp(70px, 8vw, 100px)',
        paddingBottom: 'clamp(70px, 8vw, 100px)',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        borderTop: '1px solid #e5e7eb',
        borderBottom: '1px solid #e5e7eb'
      }}
    >
      {/* Architectural Watermark Numeral EST. 2014 */}
      <div 
        style={{
          position: 'absolute',
          top: '30px',
          right: '-20px',
          fontFamily: 'var(--font-tech)',
          fontSize: 'clamp(110px, 16vw, 240px)',
          fontWeight: 900,
          lineHeight: 0.85,
          letterSpacing: '-0.04em',
          color: 'rgba(17, 24, 39, 0.03)',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
          whiteSpace: 'nowrap'
        }}
      >
        EST. 2014
      </div>

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Asymmetrical Editorial Composition: Image on one side, Info on other */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
            gap: 'clamp(36px, 5vw, 64px)',
            alignItems: 'center'
          }}
          className="about-editorial-grid"
        >
          {/* Authentic Indian Workshop Photography */}
          <div 
            style={{
              position: 'relative',
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.07)',
              border: '1px solid #e5e7eb'
            }}
            className="about-image-wrapper"
          >
            <img 
              src="/images/about_workshop_home.jpg" 
              alt="Mauli Krupa Precision Works Engineers in Bhosari MIDC Pune Workshop"
              style={{
                width: '100%',
                height: 'clamp(340px, 40vw, 480px)',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="about-main-img"
            />
          </div>

          {/* Right Column: Short, Strong & Professional Introduction */}
          <div style={{ maxWidth: '580px' }}>
            
            {/* Eyebrow Label */}
            <div className="eyebrow-label" style={{ marginBottom: '14px' }}>
              <span className="eyebrow-dot" />
              <span>ABOUT MAULI KRUPA</span>
            </div>

            {/* Headline */}
            <h2 
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3.6vw, 42px)',
                fontWeight: 700,
                lineHeight: 1.16,
                letterSpacing: '-0.02em',
                color: '#111827',
                marginBottom: '18px'
              }}
            >
              Built Around Practical Engineering.
            </h2>

            {/* Short & Concise Introduction */}
            <p 
              style={{
                fontSize: 'clamp(15.5px, 1.25vw, 17px)',
                lineHeight: 1.7,
                color: '#4b5563',
                marginBottom: '28px'
              }}
            >
              Established in 2014 in Bhosari MIDC, Pune, <strong style={{ color: '#111827' }}>Mauli Krupa Precision Works</strong> is a specialized precision manufacturing and engineering company delivering end-to-end design, fabrication, jigs, fixtures, and custom tooling solutions for leading industrial OEMs.
            </p>

            {/* Minimal Links: READ MORE -> /about and CONTACT US -> /contact */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <Link
                to="/about"
                className="minimal-text-link"
              >
                <span>READ MORE</span>
                <span className="read-more-arrow">→</span>
              </Link>

              <Link
                to="/contact"
                className="minimal-text-link"
                style={{ color: '#c52227' }}
              >
                <span>CONTACT US</span>
                <span className="read-more-arrow">→</span>
              </Link>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        .about-image-wrapper:hover .about-main-img {
          transform: scale(1.03);
        }
        @media (max-width: 860px) {
          #about {
            padding-top: 40px !important;
            padding-bottom: 40px !important;
          }
          .about-editorial-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 480px) {
          #about {
            padding-top: 32px !important;
            padding-bottom: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
