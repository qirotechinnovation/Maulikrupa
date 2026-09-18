import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Industries from '../components/Industries';
import OurImpact from '../components/OurImpact';
import ContactCTA from '../components/ContactCTA';

export default function HomePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
      window.__lenis.resize();
    }
  }, []);

  return (
    <div className="homepage-content">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Us Section (with READ MORE → linking to /about) */}
      <About />

      {/* 3. Services Section (with VIEW SERVICES → linking to /services) */}
      <Services />

      {/* 4. Industries Section (5-Stage Exploded CAD System with EXPLORE INDUSTRIES → linking to /industries) */}
      <Industries />

      {/* 5. Our Impact & Scale (Horizontal Measurement Rail with LEARN MORE → linking to /about) */}
      <OurImpact />

      {/* 6. Contact CTA Banner above Footer (Exact match to reference screenshot) */}
      <ContactCTA />
    </div>
  );
}
