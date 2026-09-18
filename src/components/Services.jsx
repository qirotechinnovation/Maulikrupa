import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  // 5 Core Services matching exact Services page hierarchy & high-resolution industrial assets
  const services = [
    {
      number: '01',
      id: 'industrial-fabrication',
      title: 'Industrial Fabrication',
      description: 'Heavy structural steel fabrication, custom machine frames, pressure tanks, piping spools and industrial sheet metal engineering built to project specifications.',
      image: '/images/service_fabrication.jpg',
      alt: 'Heavy Industrial Metal Fabrication, Structural Frames and Tanks Workshop',
      objectPosition: 'center 48%',
      specs: [
        'SS & MS Structural Framing & Channels',
        'Process Tank & Vessel Fabrication',
        'High-Integrity Pipeline Spools & Manifolds',
        'CNC Laser Cutting & Press Brake Forming'
      ]
    },
    {
      number: '02',
      id: 'machining',
      title: 'Machining',
      description: 'High-precision CNC milling, plano milling, lathe turning, radial drilling, and cylindrical & surface grinding to strict micron tolerances.',
      image: '/images/contact_hero_cnc.jpg',
      alt: 'Precision CNC Milling, Plano Milling and Toolroom Machining Workshop',
      objectPosition: 'center 45%',
      specs: [
        'Multi-Axis VMC & Heavy Plano Milling',
        'Precision Lathe Turning, Facing & Boring',
        'Cylindrical OD/ID & Surface Grinding',
        'Heavy Radial Drilling & Precision Tapping'
      ]
    },
    {
      number: '03',
      id: 'conveyor-material-handling',
      title: 'Conveyors & Material Handling',
      description: 'Industrial belt, flat slat, and magnetic conveyor systems alongside heavy-duty transit trolleys and steel storage pallets engineered for material movement.',
      image: '/images/service_conveyors.jpg',
      alt: 'Industrial Automated Conveyor Roller Systems and Material Handling Lines',
      objectPosition: 'center 50%',
      specs: [
        'Industrial Belt & Flat Slat Conveyors',
        'Z-Type Magnetic Scrap & Chip Conveyors',
        'Custom Heavy-Duty Transit Trolleys',
        'Heavy Steel Storage Pallets & Stillages'
      ]
    },
    {
      number: '04',
      id: 'jigs-fixtures',
      title: 'Jigs & Fixtures',
      description: 'Application-specific jigs and holding fixtures engineered for consistent positioning, rigid clamping, and repeatable manufacturing accuracy.',
      image: '/images/service_jigs_fixtures.jpg',
      alt: 'Precision Jigs and Fixtures Tooling & Inspection in Pune Workshop',
      objectPosition: 'center 45%',
      specs: [
        'Custom Welding & Assembly Fixtures',
        'Machining Clamping & Tooling Jigs',
        'Concentricity Inspection Fixtures',
        'Locating Pins, Clamps & Guide Tooling'
      ]
    },
    {
      number: '05',
      id: 'spm',
      title: 'Special Purpose Machines (SPM)',
      description: 'Special Purpose Machines (SPM) and custom automated manufacturing equipment engineered to streamline dedicated production operations.',
      image: '/images/service_custom_spm.jpg',
      alt: 'Special Purpose Machines, Custom Automated Machinery & Testing Rigs',
      objectPosition: 'center 45%',
      specs: [
        'Custom Dedicated Welding SPM Machines',
        'High-Pressure Checking & Testing Rigs',
        'Balance Straightening Press Machines',
        'Automated Component Assembly Systems'
      ]
    }
  ];

  const currentService = services[activeIndex];

  return (
    <section 
      id="services"
      style={{
        position: 'relative',
        paddingTop: 'clamp(70px, 8vw, 100px)',
        paddingBottom: 'clamp(70px, 8vw, 100px)',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #f1f3f5',
        borderBottom: '1px solid #e5e7eb'
      }}
    >
      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '36px' }}>
          <div style={{ maxWidth: '760px' }}>
            <div className="eyebrow-label" style={{ marginBottom: '14px' }}>
              <span className="eyebrow-dot" />
              <span>OUR CORE CAPABILITIES</span>
            </div>

            <h2 
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3.8vw, 44px)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: '#111827',
                marginBottom: '12px',
                textTransform: 'uppercase'
              }}
            >
              Engineering solutions built for industry.
            </h2>

            <p 
              style={{
                fontSize: 'clamp(15px, 1.2vw, 17px)',
                lineHeight: 1.65,
                color: '#4b5563',
                margin: 0
              }}
            >
              From precision tooling and material handling systems to custom machines and industrial fabrication, we develop practical engineering solutions around real manufacturing requirements.
            </p>
          </div>

          {/* Minimal Link: VIEW SERVICES -> /services */}
          <Link 
            to="/services"
            className="minimal-text-link"
          >
            <span>VIEW SERVICES</span>
            <span className="read-more-arrow">→</span>
          </Link>
        </div>

        {/* Refined Minimal Editorial Service Navigation (01 to 06) */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(12px, 2.2vw, 32px)',
            overflowX: 'auto',
            paddingBottom: '16px',
            marginBottom: '28px',
            borderBottom: '1px solid #e5e7eb',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          className="services-nav-strip"
        >
          {services.map((service, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={service.id}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'none',
                  border: 'none',
                  padding: '8px 4px 12px',
                  cursor: 'pointer',
                  position: 'relative',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.25s ease'
                }}
                className={`service-tab-btn ${isActive ? 'active-tab' : ''}`}
                aria-selected={isActive}
              >
                <span 
                  style={{
                    fontFamily: 'var(--font-tech)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: isActive ? '#c52227' : '#9ca3af',
                    letterSpacing: '0.08em',
                    transition: 'color 0.2s ease'
                  }}
                >
                  {service.number}
                </span>

                <span 
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(14px, 1.2vw, 16px)',
                    fontWeight: isActive ? 800 : 500,
                    color: isActive ? '#111827' : '#6b7280',
                    transition: 'color 0.2s ease'
                  }}
                >
                  {service.title}
                </span>

                {/* Active Underline Indicator */}
                {isActive && (
                  <span 
                    style={{
                      position: 'absolute',
                      bottom: '-1px',
                      left: 0,
                      right: 0,
                      height: '2.5px',
                      backgroundColor: '#c52227',
                      borderRadius: '1px'
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ONE Large Cinematic Interactive Showcase Container (Lightened Overlays with High Machine Clarity) */}
        <div 
          style={{
            position: 'relative',
            borderRadius: '4px',
            overflow: 'hidden',
            backgroundColor: '#1a1e24',
            minHeight: 'clamp(400px, 46vw, 520px)',
            display: 'flex',
            alignItems: 'flex-end',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e5e7eb'
          }}
          className="services-showcase-viewport"
        >
          {/* Smooth Crossfade Background Images — Original High-Resolution Clarity */}
          {services.map((service, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={service.id}
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${service.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: service.objectPosition || 'center 45%',
                  backgroundRepeat: 'no-repeat',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'scale(1)' : 'scale(1.02)',
                  transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  pointerEvents: 'none'
                }}
              />
            );
          })}

          {/* Subtle Directional Gradient: Lightened for maximum machine visibility */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(12, 14, 18, 0) 0%, rgba(12, 14, 18, 0.45) 55%, rgba(12, 14, 18, 0.88) 100%)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, rgba(12, 14, 18, 0.8) 0%, rgba(12, 14, 18, 0.3) 50%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          {/* Active Service Content Information Area */}
          <div 
            style={{
              position: 'relative',
              zIndex: 2,
              padding: 'clamp(28px, 4vw, 48px)',
              maxWidth: '680px',
              width: '100%'
            }}
          >
            {/* Active Number & Category Tag */}
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-tech)',
                fontSize: '12px',
                fontWeight: 700,
                color: '#ef4444',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '8px'
              }}
            >
              <span>{currentService.number}</span>
              <span>•</span>
              <span>CAPABILITY SPECIFICATION</span>
            </div>

            {/* Active Service Title */}
            <h3 
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(22px, 2.6vw, 32px)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.2,
                letterSpacing: '-0.015em',
                marginBottom: '12px',
                textShadow: '0 2px 10px rgba(0,0,0,0.6)'
              }}
            >
              {currentService.title}
            </h3>

            {/* Active Service Description */}
            <p 
              style={{
                fontSize: 'clamp(14.5px, 1.2vw, 16.5px)',
                lineHeight: 1.65,
                color: '#f1f5f9',
                marginBottom: '20px',
                maxWidth: '580px',
                textShadow: '0 1px 8px rgba(0,0,0,0.7)'
              }}
            >
              {currentService.description}
            </p>

            {/* View All Services CTA Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link
                to={`/services?category=${currentService.id}`}
                className="service-showcase-rm-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#ffffff',
                  backgroundColor: '#c52227',
                  padding: '10px 20px',
                  borderRadius: '3px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 14px rgba(197, 34, 39, 0.4)',
                  transition: 'all 0.25s ease',
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#b31b20';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#c52227';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>VIEW ALL SERVICES</span>
                <span style={{ fontSize: '14px', lineHeight: 1 }}>→</span>
              </Link>
            </div>

          </div>

          {/* Quick Indicator Dots on Bottom Right */}
          <div 
            style={{
              position: 'absolute',
              bottom: '24px',
              right: '28px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              zIndex: 3
            }}
            className="showcase-dots"
          >
            {services.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Select service ${idx + 1}`}
                style={{
                  width: activeIndex === idx ? '22px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: activeIndex === idx ? '#c52227' : 'rgba(255, 255, 255, 0.65)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>

        </div>

        {/* Bottom Clean Text CTA */}
        <div 
          style={{
            marginTop: '40px',
            paddingTop: '24px',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <span 
            style={{
              fontFamily: 'var(--font-tech)',
              fontSize: '12px',
              color: '#6b7280',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            CUSTOM FABRICATION & TOOLING AS PER CLIENT DRAWINGS
          </span>

          <Link 
            to="/services"
            className="minimal-text-link"
          >
            <span>EXPLORE ALL SERVICES & CAPABILITIES</span>
            <span className="read-more-arrow">→</span>
          </Link>
        </div>

      </div>

      <style>{`
        .services-nav-strip::-webkit-scrollbar {
          display: none;
        }
        .service-tab-btn:hover span {
          color: #111827 !important;
        }
        .active-tab span:first-child {
          color: #c52227 !important;
        }

        @media (max-width: 768px) {
          #services {
            padding-top: 40px !important;
            padding-bottom: 40px !important;
          }
          .services-showcase-viewport {
            min-height: 380px !important;
          }
          .showcase-dots {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          #services {
            padding-top: 32px !important;
            padding-bottom: 32px !important;
          }
          .services-showcase-viewport {
            min-height: 360px !important;
          }
        }
      `}</style>
    </section>
  );
}
