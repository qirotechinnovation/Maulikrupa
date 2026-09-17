import React from 'react';
import { useNavigate } from 'react-router-dom';
import { COMPANY_INFO } from '../data/companyData';
import Logo from './Logo';
import { Award, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();

  // Navigation links in requested site order: Home -> About Us -> Services -> Gallery -> Contact Us
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const serviceLinks = [
    { label: 'Jigs & Fixtures', path: '/services?category=jigs-fixtures' },
    { label: 'Conveyors & Material Handling', path: '/services?category=conveyor-material-handling' },
    { label: 'Industrial Fabrication', path: '/services?category=industrial-fabrication' },
    { label: 'Machining', path: '/services?category=machining' },
    { label: 'Special Purpose Machines (SPM)', path: '/services?category=spm' }
  ];

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappNumber = "919370741361";
  const whatsappMessage = encodeURIComponent("Hello Mauli Krupa Precision Works, I would like to inquire about your engineering and manufacturing services.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      <footer 
        style={{
          backgroundColor: '#0c0e12',
          borderTop: '1px solid #1f242d',
          color: '#d1d5db',
          position: 'relative',
          paddingTop: '64px',
          paddingBottom: '28px',
          overflow: 'hidden'
        }}
      >
        <div className="container-custom">
          
          {/* Main 4-Column Grid Layout */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 'clamp(28px, 4vw, 44px)',
              marginBottom: '44px'
            }}
            className="footer-grid-layout"
          >
            {/* Column 1: Brand & Identity */}
            <div style={{ gridColumn: 'span 4' }} className="footer-col-1">
              <div style={{ marginBottom: '18px', display: 'inline-block' }}>
                <Logo size={54} theme="dark" showText={true} />
              </div>
              
              <p 
                style={{ 
                  color: '#94a3b8', 
                  fontSize: '13.5px', 
                  lineHeight: 1.65, 
                  marginBottom: '18px',
                  maxWidth: '320px' 
                }}
              >
                Design & manufacturing of precision Jigs & Fixtures, Conveyors, Industrial Trolleys, Material Handling Equipment & Fabrication Works based in Pune, India.
              </p>

              {/* Verified Credentials Badges */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#e2e8f0' }}>
                  <Award size={14} color="#c52227" />
                  <span style={{ fontFamily: 'var(--font-tech)' }}>ESTD. 2015 • Bhosari MIDC, Pune</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#e2e8f0' }}>
                  <ShieldCheck size={14} color="#0e8a44" />
                  <span style={{ fontFamily: 'var(--font-tech)' }}>GSTIN: {COMPANY_INFO.taxIdentifiers.gstin}</span>
                </div>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div style={{ gridColumn: 'span 2' }} className="footer-col-2">
              <div 
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '0.08em',
                  marginBottom: '16px'
                }}
              >
                Navigation
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.path}
                      onClick={(e) => handleLinkClick(e, link.path)}
                      style={{
                        fontSize: '13px',
                        color: '#94a3b8',
                        fontFamily: 'var(--font-tech)',
                        letterSpacing: '0.04em',
                        transition: 'color 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                    >
                      <ChevronRight size={12} color="#c52227" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Capabilities & Services */}
            <div style={{ gridColumn: 'span 3' }} className="footer-col-3">
              <div 
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '0.08em',
                  marginBottom: '16px'
                }}
              >
                Capabilities
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {serviceLinks.map((service) => (
                  <li key={service.label}>
                    <a
                      href={service.path}
                      onClick={(e) => handleLinkClick(e, service.path)}
                      style={{
                        fontSize: '13px',
                        color: '#94a3b8',
                        fontFamily: 'var(--font-tech)',
                        letterSpacing: '0.04em',
                        transition: 'color 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                    >
                      <ChevronRight size={12} color="#c52227" />
                      <span>{service.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Address */}
            <div style={{ gridColumn: 'span 3' }} className="footer-col-4">
              <div 
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '0.08em',
                  marginBottom: '16px'
                }}
              >
                Address
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <div 
                    style={{ 
                      fontSize: '13.5px', 
                      color: '#cbd5e1', 
                      lineHeight: 1.65,
                      fontWeight: 400
                    }}
                  >
                    Intelligent Cadet International School,<br />
                    Vaishno Mata Marg, Sector No. 3,<br />
                    Bhosari, Pimpri-Chinchwad,<br />
                    Maharashtra 411026
                  </div>
                </div>

                <div>
                  <div 
                    style={{ 
                      fontSize: '11.5px', 
                      color: '#94a3b8', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.06em', 
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      marginBottom: '4px'
                    }}
                  >
                    Technical Direct:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <a 
                      href="tel:+919370741361" 
                      style={{ 
                        fontSize: '13.5px', 
                        color: '#f87171', 
                        fontFamily: 'var(--font-heading)', 
                        fontWeight: 600, 
                        textDecoration: 'none',
                        transition: 'color 0.2s ease' 
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#f87171'}
                    >
                      Abhishek M: +91 9370741361
                    </a>
                    <a 
                      href="tel:+919822327460" 
                      style={{ 
                        fontSize: '13.5px', 
                        color: '#f87171', 
                        fontFamily: 'var(--font-heading)', 
                        fontWeight: 600, 
                        textDecoration: 'none',
                        transition: 'color 0.2s ease' 
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#f87171'}
                    >
                      Santos M: +91 9822327460
                    </a>
                  </div>
                </div>

                <div>
                  <div 
                    style={{ 
                      fontSize: '11.5px', 
                      color: '#94a3b8', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.06em', 
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      marginBottom: '3px'
                    }}
                  >
                    Email:
                  </div>
                  <a 
                    href={`mailto:${COMPANY_INFO.email.toLowerCase()}`} 
                    style={{ 
                      fontSize: '13.5px', 
                      color: '#e2e8f0', 
                      textDecoration: 'none',
                      textTransform: 'lowercase',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#f87171'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#e2e8f0'}
                  >
                    {COMPANY_INFO.email.toLowerCase()}
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Qiro Tech Credit Bar */}
          <div 
            style={{
              paddingTop: '20px',
              borderTop: '1px solid #1f242d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px',
              fontSize: '13px',
              color: '#94a3b8'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              © 2026 Mauli Krupa Precision Works. All Rights Reserved.
            </div>

            {/* Credit Link to Qiro Tech Innovation Pvt. Ltd. */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
              <span>Designed & Developed by </span>
              <a 
                href="https://qirotec.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: '#e2e8f0',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#f87171'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#e2e8f0'}
              >
                Qiro Tech Innovation Pvt. Ltd.
              </a>
            </div>
          </div>

        </div>

        <style>{`
          @media (max-width: 900px) {
            .footer-grid-layout {
              grid-template-columns: 1fr 1fr !important;
            }
            .footer-col-1 { grid-column: span 2 !important; }
            .footer-col-2 { grid-column: span 1 !important; }
            .footer-col-3 { grid-column: span 1 !important; }
            .footer-col-4 { grid-column: span 2 !important; }
          }
          @media (max-width: 600px) {
            .footer-grid-layout {
              grid-template-columns: 1fr !important;
            }
            .footer-col-1, .footer-col-2, .footer-col-3, .footer-col-4 {
              grid-column: span 1 !important;
            }
          }
        `}</style>
      </footer>

      {/* ========================================================================= */}
      {/* 4. FLOATING OFFICIAL WHATSAPP BUTTON (Fixed on Right Side with Hover Tooltip) */}
      {/* ========================================================================= */}
      <div
        className="whatsapp-floating-container"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Tooltip on Hover */}
        <span
          className="whatsapp-floating-tooltip"
          style={{
            position: 'absolute',
            right: 'calc(100% + 12px)',
            backgroundColor: '#111827',
            color: '#ffffff',
            padding: '7px 13px',
            borderRadius: '6px',
            fontSize: '12.5px',
            fontWeight: 600,
            letterSpacing: '0.02em',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
            pointerEvents: 'none',
            opacity: 0,
            transform: 'translateX(6px)',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
            fontFamily: 'var(--font-heading)'
          }}
        >
          Chat on WhatsApp
          {/* Tooltip triangle indicator */}
          <span
            style={{
              position: 'absolute',
              top: '50%',
              right: '-5px',
              transform: 'translateY(-50%)',
              width: 0,
              height: 0,
              borderTop: '5px solid transparent',
              borderBottom: '5px solid transparent',
              borderLeft: '6px solid #111827'
            }}
          />
        </span>

        {/* WhatsApp Official Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Mauli Krupa Precision Works on WhatsApp"
          className="whatsapp-floating-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            backgroundColor: '#25D366',
            color: '#ffffff',
            boxShadow: '0 6px 20px rgba(37, 211, 102, 0.42), 0 2px 8px rgba(0, 0, 0, 0.18)',
            textDecoration: 'none',
            transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, background-color 0.2s ease',
            cursor: 'pointer'
          }}
        >
          {/* Official WhatsApp Vector Icon */}
          <svg
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill="currentColor"
            style={{ display: 'block' }}
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.04 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.09 19.11L7.79 18.93L4.69 19.74L5.51 16.72L5.31 16.4C4.55 15.19 4.14 13.78 4.14 11.91C4.14 7.37 7.84 3.67 12.04 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.72C7 10.94 7.89 12.12 8.01 12.28C8.13 12.44 9.74 14.93 12.22 16C12.81 16.26 13.27 16.41 13.63 16.53C14.23 16.72 14.77 16.69 15.2 16.63C15.68 16.56 16.68 16.03 16.89 15.44C17.1 14.86 17.1 14.36 17.04 14.26C16.98 14.16 16.81 14.1 16.56 13.98C16.31 13.85 15.08 13.24 14.85 13.16C14.62 13.08 14.46 13.04 14.29 13.29C14.12 13.54 13.65 14.1 13.51 14.26C13.37 14.43 13.22 14.45 12.97 14.33C12.72 14.2 11.66 13.85 10.41 12.73C9.44 11.86 8.78 10.79 8.66 10.58C8.53 10.37 8.64 10.26 8.77 10.13C8.88 10.02 9.02 9.84 9.15 9.69C9.27 9.54 9.31 9.44 9.39 9.28C9.47 9.11 9.43 8.97 9.37 8.85C9.31 8.72 8.81 7.49 8.53 7.33Z" />
          </svg>
        </a>
      </div>

      <style>{`
        .whatsapp-floating-container:hover .whatsapp-floating-tooltip {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        .whatsapp-floating-btn:hover {
          transform: translateY(-3px) scale(1.05) !important;
          background-color: #22bf5b !important;
          box-shadow: 0 10px 26px rgba(37, 211, 102, 0.55), 0 3px 10px rgba(0, 0, 0, 0.22) !important;
        }
        @media (max-width: 600px) {
          .whatsapp-floating-container {
            bottom: 20px !important;
            right: 20px !important;
          }
          .whatsapp-floating-btn {
            width: 48px !important;
            height: 48px !important;
          }
          .whatsapp-floating-btn svg {
            width: 26px !important;
            height: 26px !important;
          }
        }
      `}</style>
    </>
  );
}
