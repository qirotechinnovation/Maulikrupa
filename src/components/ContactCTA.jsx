import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ContactCTA() {
  return (
    <section 
      style={{
        paddingTop: '30px',
        paddingBottom: '70px',
        backgroundColor: '#ffffff',
        position: 'relative'
      }}
    >
      <div className="container-custom">
        {/* Dark Rounded Banner — Exact Match to Reference Image */}
        <div 
          style={{
            position: 'relative',
            borderRadius: '20px',
            backgroundColor: '#0d1015',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.18)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
            minHeight: '340px'
          }}
          className="contact-cta-card-grid"
        >
          {/* Subtle Radial Glow on Left */}
          <div 
            style={{
              position: 'absolute',
              top: '-20%',
              left: '-10%',
              width: '50%',
              height: '140%',
              backgroundImage: 'radial-gradient(circle, rgba(197, 34, 39, 0.14) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          {/* Left Column: Heading, Subtext & Action Button */}
          <div 
            style={{
              position: 'relative',
              zIndex: 2,
              padding: 'clamp(36px, 4.5vw, 56px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start'
            }}
          >
            {/* Eyebrow Label with red dash */}
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-tech)',
                fontSize: '11.5px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#ef4444',
                marginBottom: '16px'
              }}
            >
              <span style={{ display: 'inline-block', width: '20px', height: '2px', backgroundColor: '#c52227' }} />
              <span>LET'S BUILD TOGETHER</span>
            </div>

            {/* Headline */}
            <h2 
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3.4vw, 42px)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '14px'
              }}
            >
              Have a project<br />in mind?
            </h2>

            {/* Subtitle Description */}
            <p 
              style={{
                fontSize: 'clamp(14.5px, 1.2vw, 16px)',
                lineHeight: 1.6,
                color: '#9ca3af',
                marginBottom: '28px',
                maxWidth: '460px'
              }}
            >
              Share your requirements with our team and let's discuss the right solution for you.
            </p>

            {/* Red Solid Rounded Button: GET IN TOUCH -> /contact */}
            <Link 
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 24px',
                backgroundColor: '#c52227',
                color: '#ffffff',
                fontFamily: 'var(--font-tech)',
                fontSize: '13.5px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                borderRadius: '4px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(197, 34, 39, 0.4)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#b31b20';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(197, 34, 39, 0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#c52227';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(197, 34, 39, 0.4)';
              }}
            >
              <span>GET IN TOUCH</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Right Column: Precision Machined Steel Blocks Visual */}
          <div 
            style={{
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              backgroundColor: '#11141a'
            }}
            className="contact-cta-image-col"
          >
            {/* Background Machined Metal Blocks */}
            <img 
              src="/images/real_products_curated/01_fixture_making.jpg" 
              alt="Precision Machined Tooling and Fixtures"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 40%',
                filter: 'brightness(0.65) contrast(1.15)',
                transition: 'transform 0.8s ease'
              }}
              className="cta-bg-img"
            />

            {/* Gradient Overlays for Seamless Fade into Dark Left Side */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, #0d1015 0%, rgba(13, 16, 21, 0.5) 40%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 1
              }}
            />
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(0deg, #0d1015 0%, rgba(13, 16, 21, 0.3) 30%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 1
              }}
            />

            {/* Bottom-Right Watermark Text */}
            <div 
              style={{
                position: 'relative',
                zIndex: 2,
                padding: '24px 32px',
                textAlign: 'right',
                pointerEvents: 'none'
              }}
            >
              <div 
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '11px',
                  fontWeight: 700,
                  lineHeight: 1.4,
                  letterSpacing: '0.14em',
                  color: 'rgba(255, 255, 255, 0.65)',
                  textTransform: 'uppercase'
                }}
              >
                IDEAS<br />
                MACHINED<br />
                INTO REALITY
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .contact-cta-card-grid:hover .cta-bg-img {
          transform: scale(1.04);
        }
        @media (max-width: 820px) {
          .contact-cta-card-grid {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .contact-cta-image-col {
            min-height: 180px !important;
          }
        }
        @media (max-width: 480px) {
          .contact-cta-card-grid > div:first-child {
            padding: 24px 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
