import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const whatsappNumber = "919370741361";
  const whatsappMessage = encodeURIComponent("Hello Mauli Krupa Precision Works, I would like to inquire about your engineering and manufacturing services.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll and prevent horizontal overflow when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Requested Navigation Order: HOME -> ABOUT US -> SERVICES -> GALLERY -> CONTACT US
  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT US', path: '/about' },
    { label: 'SERVICES', path: '/services' },
    { label: 'GALLERY', path: '/gallery' },
    { label: 'CONTACT US', path: '/contact' },
  ];

  const isItemActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header 
        id="main-navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 'var(--nav-height, 80px)',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          boxShadow: scrolled ? '0 4px 16px rgba(0, 0, 0, 0.06)' : '0 2px 8px rgba(0, 0, 0, 0.02)',
          transition: 'box-shadow 0.25s ease'
        }}
      >
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          
          {/* MKP Company Logo Only */}
          <Link 
            to="/" 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', padding: '2px 0' }}
            aria-label="Mauli Krupa Precision Works"
          >
            <Logo size={58} theme="light" showText={false} />
          </Link>

          {/* Center Desktop Navigation Links — Dark Charcoal Text */}
          <nav 
            aria-label="Main Navigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            className="desktop-nav-links"
          >
            {navItems.map((item) => {
              const active = isItemActive(item.path);
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`nav-link-item ${active ? 'active' : ''}`}
                  style={{
                    fontSize: '15px',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: active ? 700 : 600,
                    color: active ? '#c52227' : '#1f2937',
                    padding: '8px 14px',
                    borderRadius: '3px',
                    position: 'relative',
                    letterSpacing: '0.04em',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.color = '#111827';
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.color = '#1f2937';
                  }}
                >
                  {item.label}
                  {active && (
                    <span 
                      style={{
                        position: 'absolute',
                        bottom: '2px',
                        left: '14px',
                        right: '14px',
                        height: '2.5px',
                        backgroundColor: '#c52227',
                        borderRadius: '1px'
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Desktop Phone Contact Link & Mobile Hamburger Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <a
              href="tel:+919370741361"
              className="navbar-phone-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 18px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                color: '#111827',
                fontFamily: 'var(--font-heading)',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.02em',
                textDecoration: 'none',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#c52227';
                e.currentTarget.style.color = '#c52227';
                e.currentTarget.style.backgroundColor = '#fef2f2';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.color = '#111827';
                e.currentTarget.style.backgroundColor = '#f8fafc';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Phone size={15} color="#c52227" strokeWidth={2.2} />
              <span>+91 93707 41361</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              className="mobile-menu-btn"
              style={{
                padding: '8px 10px',
                color: '#111827',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Menu size={22} strokeWidth={2.2} />
            </button>
          </div>

        </div>
      </header>

      {/* Backdrop Overlay for Side Drawer */}
      <div
        className={`mobile-nav-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100dvh',
          backgroundColor: 'rgba(15, 23, 42, 0.55)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          zIndex: 998,
          opacity: mobileMenuOpen ? 1 : 0,
          visibility: mobileMenuOpen ? 'visible' : 'hidden',
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
          transition: 'opacity 300ms cubic-bezier(0.16, 1, 0.3, 1), visibility 300ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      />

      {/* Mobile Side Drawer Menu (Positioned on Left edge: slides Left -> Right translateX(-100%) -> translateX(0%)) */}
      <aside
        id="mobile-side-drawer"
        aria-label="Mobile Navigation Menu"
        aria-hidden={!mobileMenuOpen}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: 'min(340px, 86vw)',
          height: '100dvh',
          backgroundColor: '#ffffff',
          boxShadow: mobileMenuOpen ? '10px 0 35px rgba(0, 0, 0, 0.18)' : 'none',
          borderRight: '1px solid #e5e7eb',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transform: mobileMenuOpen ? 'translateX(0%)' : 'translateX(-100%)',
          transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        {/* Drawer Header with Logo & Close Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: '#ffffff',
            flexShrink: 0
          }}
        >
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
            aria-label="Mauli Krupa Precision Works"
          >
            <Logo size={36} showText={true} theme="light" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            className="drawer-close-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#f3f4f6',
              border: '1px solid #e5e7eb',
              color: '#1f2937',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fee2e2';
              e.currentTarget.style.color = '#c52227';
              e.currentTarget.style.borderColor = '#fca5a5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              e.currentTarget.style.color = '#1f2937';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          >
            <X size={20} strokeWidth={2.4} />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <nav
          aria-label="Mobile Navigation"
          style={{
            padding: '16px 16px 24px',
            flex: '1 1 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            overflowY: 'auto'
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-tech)',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#9ca3af',
              padding: '6px 12px 2px'
            }}
          >
            Navigation
          </div>

          {navItems.map((item) => {
            const active = isItemActive(item.path);
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`mobile-nav-item ${active ? 'active' : ''}`}
                style={{
                  fontSize: '15px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: active ? 700 : 600,
                  color: active ? '#c52227' : '#1f2937',
                  backgroundColor: active ? '#fef2f2' : 'transparent',
                  padding: '12px 14px',
                  borderRadius: '6px',
                  borderLeft: active ? '3px solid #c52227' : '3px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{item.label}</span>
                <ArrowUpRight 
                  size={16} 
                  color={active ? '#c52227' : '#94a3b8'} 
                  style={{
                    transform: active ? 'rotate(0deg)' : 'none',
                    opacity: active ? 1 : 0.7
                  }} 
                />
              </Link>
            );
          })}
        </nav>

        {/* Drawer Footer Actions: Direct Tel Call & WhatsApp Quick Chat */}
        <div
          style={{
            padding: '18px 16px 22px',
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#f8fafc',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            flexShrink: 0
          }}
        >
          {/* Direct Call Button */}
          <a
            href="tel:+919370741361"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '12px 16px',
              backgroundColor: '#c52227',
              color: '#ffffff',
              fontFamily: 'var(--font-heading)',
              fontSize: '14.5px',
              fontWeight: 600,
              textDecoration: 'none',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(197, 34, 39, 0.25)',
              transition: 'all 0.2s ease'
            }}
          >
            <Phone size={16} color="#ffffff" strokeWidth={2.2} />
            <span>Call +91 93707 41361</span>
          </a>

          {/* WhatsApp Direct Chat Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '12px 16px',
              backgroundColor: '#25D366',
              color: '#ffffff',
              fontFamily: 'var(--font-heading)',
              fontSize: '14.5px',
              fontWeight: 600,
              textDecoration: 'none',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(37, 211, 102, 0.28)',
              transition: 'all 0.2s ease'
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
              style={{ display: 'block', flexShrink: 0 }}
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.04 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.09 19.11L7.79 18.93L4.69 19.74L5.51 16.72L5.31 16.4C4.55 15.19 4.14 13.78 4.14 11.91C4.14 7.37 7.84 3.67 12.04 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.72C7 10.94 7.89 12.12 8.01 12.28C8.13 12.44 9.74 14.93 12.22 16C12.81 16.26 13.27 16.41 13.63 16.53C14.23 16.72 14.77 16.69 15.2 16.63C15.68 16.56 16.68 16.03 16.89 15.44C17.1 14.86 17.1 14.36 17.04 14.26C16.98 14.16 16.81 14.1 16.56 13.98C16.31 13.85 15.08 13.24 14.85 13.16C14.62 13.08 14.46 13.04 14.29 13.29C14.12 13.54 13.65 14.1 13.51 14.26C13.37 14.43 13.22 14.45 12.97 14.33C12.72 14.2 11.66 13.85 10.41 12.73C9.44 11.86 8.78 10.79 8.66 10.58C8.53 10.37 8.64 10.26 8.77 10.13C8.88 10.02 9.02 9.84 9.15 9.69C9.27 9.54 9.31 9.44 9.39 9.28C9.47 9.11 9.43 8.97 9.37 8.85C9.31 8.72 8.81 7.49 8.53 7.33Z" />
            </svg>
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </aside>

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav-links { display: none !important; }
          .navbar-phone-btn { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        .mobile-nav-item:hover {
          background-color: #f8fafc;
          color: #111827;
        }
        .mobile-nav-item.active:hover {
          background-color: #fef2f2;
          color: #c52227;
        }
      `}</style>
    </>
  );
}
