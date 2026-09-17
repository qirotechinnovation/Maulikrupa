import React, { useState, useEffect, useRef } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Crosshair, CheckCircle2, Sparkles, Award, ArrowUpRight } from 'lucide-react';

export default function QualityPrecision() {
  const [activeStandard, setActiveStandard] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  // 4 Core Precision Standards from Mauli Krupa Precision Works QC Facilities
  const standards = [
    {
      id: 'gdt-concentricity',
      number: '01',
      title: 'Micron-Level GD&T Tolerances',
      shortLabel: 'GD&T CONCENTRICITY',
      coordinate: 'DATUM-A [Ø35.005 ±0.002mm]',
      instrument: 'Concentricity Mandrels & Dial Verniers (150–300mm)',
      description: 'Strict geometric dimensioning, radial runout, and concentricity verification engineered to client CAD drawing tolerances.',
      // Target position on the central visual (% x, % y)
      targetX: 34,
      targetY: 42,
      lineStart: { x: '24%', y: '16%' },
      lineEnd: { x: '34%', y: '42%' },
      position: 'top-left'
    },
    {
      id: 'surface-plate',
      number: '02',
      title: 'Grade-0 Granite Surface Metrology',
      shortLabel: '600×600 GRANITE DATUM',
      coordinate: 'DATUM-C [FLATNESS 0.003mm]',
      instrument: '600mm x 600mm Grade-0 Granite Surface Plate',
      description: 'High-stability natural granite datum plate providing absolute reference for multi-axis height, parallelism, and perpendicularity inspection.',
      targetX: 62,
      targetY: 28,
      lineStart: { x: '76%', y: '16%' },
      lineEnd: { x: '62%', y: '28%' },
      position: 'top-right'
    },
    {
      id: 'qa-verification',
      number: '03',
      title: '100% Multi-Stage Tool Verification',
      shortLabel: '100% QA VERIFIED',
      coordinate: 'DATUM-B [SLIP GAUGE CALIBRATED]',
      instrument: '0–150mm Micrometers, Slip Gauge Sets & V-Blocks',
      description: 'First-article validation and 100% dimensional sign-off using calibrated slip gauge boxes, V-blocks, and digital micrometers before dispatch.',
      targetX: 74,
      targetY: 65,
      lineStart: { x: '76%', y: '84%' },
      lineEnd: { x: '74%', y: '65%' },
      position: 'bottom-right'
    },
    {
      id: 'weld-finishing',
      number: '04',
      title: '400A Weld Penetration & Treatment',
      shortLabel: '400A MIG & ACID PASSIVATION',
      coordinate: 'WELD-04 [FULL PENETRATION]',
      instrument: '400A MIG/Arc Units, In-House Chemical Pickling & Buffing',
      description: 'Deep structural weld penetration verification paired with in-house acid pickling tanks and mirror polishing for superior corrosion resistance.',
      targetX: 38,
      targetY: 78,
      lineStart: { x: '24%', y: '84%' },
      lineEnd: { x: '38%', y: '78%' },
      position: 'bottom-left'
    }
  ];

  // Reveal animation trigger when user scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const activeStd = standards[activeStandard];

  return (
    <section
      id="standards"
      ref={sectionRef}
      style={{
        position: 'relative',
        paddingTop: '100px',
        paddingBottom: '90px',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        borderTop: '1px solid #f1f3f5',
        borderBottom: '1px solid #e5e7eb'
      }}
    >
      <div className="container-custom">
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER (STRONG TYPOGRAPHY WITH "PRECISION" ACCENT)             */}
        {/* ========================================================================= */}
        <div style={{ maxWidth: '860px', marginBottom: '48px' }}>
          {/* Eyebrow Label */}
          <div className="eyebrow-label" style={{ marginBottom: '12px' }}>
            <span className="eyebrow-dot" />
            <span>METROLOGY & QUALITY ASSURANCE</span>
          </div>

          {/* Distinctive Section Heading */}
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 3.8vw, 46px)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#111827',
              margin: '0 0 12px 0',
              textTransform: 'uppercase'
            }}
          >
            OUR COMMITMENT TO{' '}
            <span
              style={{
                color: '#c52227',
                fontFamily: 'var(--font-tech)',
                letterSpacing: '0.04em',
                fontWeight: 800,
                position: 'relative'
              }}
            >
              PRECISION
            </span>{' '}
            STANDARDS
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(14.5px, 1.15vw, 16.5px)',
              lineHeight: 1.6,
              color: '#64748b',
              margin: 0,
              maxWidth: '720px'
            }}
          >
            From high-tolerance fixture concentricity to heavy weld penetration, every component is verified against micron-level GD&T tolerances using calibrated metrology standards.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. MAIN "PRECISION UNDER THE MICROSCOPE" INTERACTIVE COMPOSITION          */}
        {/* ========================================================================= */}
        <div
          className="precision-microscope-stage"
          style={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#fafbfc',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            padding: 'clamp(24px, 3.5vw, 44px)',
            marginBottom: '48px',
            boxShadow: '0 16px 40px -12px rgba(15, 23, 42, 0.06)'
          }}
        >
          {/* Technical Corner Measurement Registration Marks (+) */}
          <span style={{ position: 'absolute', top: '10px', left: '12px', fontFamily: 'var(--font-tech)', fontSize: '11px', color: '#94a3b8', userSelect: 'none' }}>+ [X:00.00]</span>
          <span style={{ position: 'absolute', top: '10px', right: '12px', fontFamily: 'var(--font-tech)', fontSize: '11px', color: '#94a3b8', userSelect: 'none' }}>+ [X:99.99]</span>
          <span style={{ position: 'absolute', bottom: '10px', left: '12px', fontFamily: 'var(--font-tech)', fontSize: '11px', color: '#94a3b8', userSelect: 'none' }}>+ [CAL:OK]</span>
          <span style={{ position: 'absolute', bottom: '10px', right: '12px', fontFamily: 'var(--font-tech)', fontSize: '11px', color: '#94a3b8', userSelect: 'none' }}>+ [MKP-METROLOGY]</span>

          {/* 3-Column Visual Grid on Desktop (Left Annotations - Center Microscope - Right Annotations) */}
          <div
            className="microscope-grid-layout"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(240px, 1.15fr) minmax(420px, 2.3fr) minmax(240px, 1.15fr)',
              gap: 'clamp(20px, 2.5vw, 36px)',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2
            }}
          >
            {/* ===================================================================== */}
            {/* LEFT ANNOTATIONS: STANDARD 01 & STANDARD 04                           */}
            {/* ===================================================================== */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }} className="left-standards-col">
              {/* Standard 01 */}
              <div
                onClick={() => setActiveStandard(0)}
                onMouseEnter={() => setActiveStandard(0)}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  paddingLeft: '16px',
                  borderLeft: activeStandard === 0 ? '2.5px solid #c52227' : '2.5px solid #cbd5e1',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: activeStandard === 0 ? 1 : 0.6,
                  transform: activeStandard === 0 ? 'translateX(4px)' : 'none'
                }}
                className="standard-annotation-point"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontFamily: 'var(--font-tech)', fontSize: '11px', fontWeight: 700, color: '#c52227' }}>
                    01 //
                  </span>
                  <span style={{ fontFamily: 'var(--font-tech)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: '#64748b', textTransform: 'uppercase' }}>
                    {standards[0].shortLabel}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '15.5px', fontWeight: 800, color: '#111827', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                  {standards[0].title}
                </h3>

                <p style={{ fontSize: '12.5px', lineHeight: 1.5, color: '#64748b', margin: '0 0 8px 0' }}>
                  {standards[0].description}
                </p>

                <div style={{ fontFamily: 'var(--font-tech)', fontSize: '10.5px', color: '#c52227', fontWeight: 700 }}>
                  ▸ {standards[0].coordinate}
                </div>
              </div>

              {/* Standard 04 */}
              <div
                onClick={() => setActiveStandard(3)}
                onMouseEnter={() => setActiveStandard(3)}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  paddingLeft: '16px',
                  borderLeft: activeStandard === 3 ? '2.5px solid #c52227' : '2.5px solid #cbd5e1',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: activeStandard === 3 ? 1 : 0.6,
                  transform: activeStandard === 3 ? 'translateX(4px)' : 'none'
                }}
                className="standard-annotation-point"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontFamily: 'var(--font-tech)', fontSize: '11px', fontWeight: 700, color: '#c52227' }}>
                    04 //
                  </span>
                  <span style={{ fontFamily: 'var(--font-tech)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: '#64748b', textTransform: 'uppercase' }}>
                    {standards[3].shortLabel}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '15.5px', fontWeight: 800, color: '#111827', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                  {standards[3].title}
                </h3>

                <p style={{ fontSize: '12.5px', lineHeight: 1.5, color: '#64748b', margin: '0 0 8px 0' }}>
                  {standards[3].description}
                </p>

                <div style={{ fontFamily: 'var(--font-tech)', fontSize: '10.5px', color: '#c52227', fontWeight: 700 }}>
                  ▸ {standards[3].coordinate}
                </div>
              </div>
            </div>

            {/* ===================================================================== */}
            {/* CENTER: CENTRAL PRECISION METROLOGY VISUAL WITH ACTIVE CROSSHAIRS    */}
            {/* ===================================================================== */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '340px'
              }}
            >
              {/* Frame Container */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  backgroundColor: '#0f172a',
                  boxShadow: '0 20px 48px -12px rgba(15, 23, 42, 0.2)',
                  border: '1px solid #cbd5e1'
                }}
                className="microscope-viewport"
              >
                {/* Central Metrology Inspection Component Image */}
                <img
                  src="/images/about_cad_precision.png"
                  alt="Precision Metrology CAD Inspection at Mauli Krupa Precision Works"
                  style={{
                    width: '100%',
                    height: 'clamp(280px, 32vw, 380px)',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    transform: activeStandard === 0
                      ? 'scale(1.05) translate(2%, 2%)'
                      : activeStandard === 1
                      ? 'scale(1.05) translate(-2%, 2%)'
                      : activeStandard === 2
                      ? 'scale(1.05) translate(-2%, -2%)'
                      : 'scale(1.05) translate(2%, -2%)',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />

                {/* Subdued Dark Vignette Overlay for High Legibility */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.5) 100%)',
                    pointerEvents: 'none'
                  }}
                />

                {/* Animated Optical Reticle & Target Crosshairs on the Active Inspection Datum */}
                <div
                  style={{
                    position: 'absolute',
                    top: `${activeStd.targetY}%`,
                    left: `${activeStd.targetX}%`,
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex: 10
                  }}
                >
                  {/* Concentric Pulse Rings */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      border: '1px dashed #ef4444',
                      animation: 'reticlePulse 2s ease-in-out infinite'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      border: '1.5px solid #c52227',
                      backgroundColor: 'rgba(197, 34, 39, 0.15)'
                    }}
                  />
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#c52227',
                      boxShadow: '0 0 10px #c52227'
                    }}
                  />
                </div>

                {/* Active Floating Coordinate Tag at Bottom of Viewport */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(15, 23, 42, 0.88)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '2px',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: '#ffffff',
                    zIndex: 5
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Crosshair size={13} style={{ color: '#ef4444' }} />
                    <span style={{ fontFamily: 'var(--font-tech)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#f87171' }}>
                      {activeStd.coordinate}
                    </span>
                  </div>

                  <span style={{ fontFamily: 'var(--font-tech)', fontSize: '10.5px', color: '#94a3b8' }}>
                    {activeStd.instrument.split(',')[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* ===================================================================== */}
            {/* RIGHT ANNOTATIONS: STANDARD 02 & STANDARD 03                          */}
            {/* ===================================================================== */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }} className="right-standards-col">
              {/* Standard 02 */}
              <div
                onClick={() => setActiveStandard(1)}
                onMouseEnter={() => setActiveStandard(1)}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  paddingLeft: '16px',
                  borderLeft: activeStandard === 1 ? '2.5px solid #c52227' : '2.5px solid #cbd5e1',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: activeStandard === 1 ? 1 : 0.6,
                  transform: activeStandard === 1 ? 'translateX(4px)' : 'none'
                }}
                className="standard-annotation-point"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontFamily: 'var(--font-tech)', fontSize: '11px', fontWeight: 700, color: '#c52227' }}>
                    02 //
                  </span>
                  <span style={{ fontFamily: 'var(--font-tech)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: '#64748b', textTransform: 'uppercase' }}>
                    {standards[1].shortLabel}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '15.5px', fontWeight: 800, color: '#111827', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                  {standards[1].title}
                </h3>

                <p style={{ fontSize: '12.5px', lineHeight: 1.5, color: '#64748b', margin: '0 0 8px 0' }}>
                  {standards[1].description}
                </p>

                <div style={{ fontFamily: 'var(--font-tech)', fontSize: '10.5px', color: '#c52227', fontWeight: 700 }}>
                  ▸ {standards[1].coordinate}
                </div>
              </div>

              {/* Standard 03 */}
              <div
                onClick={() => setActiveStandard(2)}
                onMouseEnter={() => setActiveStandard(2)}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  paddingLeft: '16px',
                  borderLeft: activeStandard === 2 ? '2.5px solid #c52227' : '2.5px solid #cbd5e1',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: activeStandard === 2 ? 1 : 0.6,
                  transform: activeStandard === 2 ? 'translateX(4px)' : 'none'
                }}
                className="standard-annotation-point"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontFamily: 'var(--font-tech)', fontSize: '11px', fontWeight: 700, color: '#c52227' }}>
                    03 //
                  </span>
                  <span style={{ fontFamily: 'var(--font-tech)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: '#64748b', textTransform: 'uppercase' }}>
                    {standards[2].shortLabel}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '15.5px', fontWeight: 800, color: '#111827', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                  {standards[2].title}
                </h3>

                <p style={{ fontSize: '12.5px', lineHeight: 1.5, color: '#64748b', margin: '0 0 8px 0' }}>
                  {standards[2].description}
                </p>

                <div style={{ fontFamily: 'var(--font-tech)', fontSize: '10.5px', color: '#c52227', fontWeight: 700 }}>
                  ▸ {standards[2].coordinate}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. TRUSTED INDUSTRIAL PARTNERS STRIP                                      */}
        {/* ========================================================================= */}
        <div
          style={{
            padding: '20px 24px',
            backgroundColor: '#ffffff',
            borderTop: '1px solid #f1f3f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={16} color="#c52227" />
            <span
              style={{
                fontFamily: 'var(--font-tech)',
                fontSize: '11px',
                fontWeight: 700,
                color: '#111827',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              TRUSTED PARTNER TO INDUSTRY LEADERS:
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 20px', alignItems: 'center' }}>
            {COMPANY_INFO.clients.map((client) => (
              <span
                key={client}
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#475569',
                  fontFamily: 'var(--font-heading)'
                }}
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Embedded CSS for Interactive Styling and Pulse Animation */}
      <style>{`
        @keyframes reticlePulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0.3;
          }
        }

        .standard-annotation-point:hover {
          opacity: 1 !important;
        }

        @media (max-width: 960px) {
          #standards {
            padding-top: 44px !important;
            padding-bottom: 44px !important;
          }
          .microscope-grid-layout {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .left-standards-col, .right-standards-col {
            gap: 20px !important;
          }
        }
        @media (max-width: 480px) {
          #standards {
            padding-top: 32px !important;
            padding-bottom: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
