import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import IndustriesPage from './pages/IndustriesPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

// Scroll Handler: Handles route transitions & hash scroll smoothly
function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Immediate scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
      window.__lenis.resize();
    }

    if (hash) {
      const scrollTimer = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const navOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          if (window.__lenis) {
            window.__lenis.scrollTo(offsetPosition, { duration: 0.8 });
          } else {
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }
      }, 100);
      return () => clearTimeout(scrollTimer);
    } else {
      // Staggered resize updates to ensure Lenis measures correct document dimensions after route transition
      const t1 = setTimeout(() => {
        if (window.__lenis) window.__lenis.resize();
        window.dispatchEvent(new Event('resize'));
      }, 50);

      const t2 = setTimeout(() => {
        if (window.__lenis) window.__lenis.resize();
        window.dispatchEvent(new Event('resize'));
      }, 150);

      const t3 = setTimeout(() => {
        if (window.__lenis) window.__lenis.resize();
        window.dispatchEvent(new Event('resize'));
      }, 350);

      const t4 = setTimeout(() => {
        if (window.__lenis) window.__lenis.resize();
        window.dispatchEvent(new Event('resize'));
      }, 700);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  useEffect(() => {
    // Only initialize Lenis smooth scrolling on desktop devices with mouse/pointer
    // This completely prevents touch momentum fighting, jitter, jumping, and content vibration on mobile
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches || window.innerWidth < 992;
    if (isTouchDevice) {
      window.__lenis = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 0,
      syncTouch: false,
    });

    window.__lenis = lenis;

    // Attach continuous document ResizeObserver so Lenis immediately adapts to any route content changes
    let docObserver = null;
    if (typeof ResizeObserver !== 'undefined') {
      docObserver = new ResizeObserver(() => {
        if (window.__lenis) {
          window.__lenis.resize();
        }
      });
      docObserver.observe(document.documentElement);
      if (document.body) {
        docObserver.observe(document.body);
      }
    }

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      if (docObserver) {
        docObserver.disconnect();
      }
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-[#111827] flex flex-col antialiased">
        <ScrollHandler />

        {/* Global Navigation */}
        <Navbar />

        {/* Multi-Page Routes */}
        <main className="flex-grow">
          <Routes>
            {/* 1. Home Page (Minimal preview of all key sections) */}
            <Route path="/" element={<HomePage />} />

            {/* 2. Dedicated Standalone About Us Page */}
            <Route path="/about" element={<AboutPage />} />

            {/* 3. Dedicated Standalone Services Page */}
            <Route path="/services" element={<ServicesPage />} />

            {/* 4. Dedicated Standalone Industries Page (Exploded CAD Machine) */}
            <Route path="/industries" element={<IndustriesPage />} />

            {/* 5. Dedicated Standalone Gallery Page */}
            <Route path="/gallery" element={<GalleryPage />} />

            {/* 6. Dedicated Standalone Contact Us Page */}
            <Route path="/contact" element={<ContactPage />} />

            {/* Fallback to Home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Global Footer (with WhatsApp floating button) */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
