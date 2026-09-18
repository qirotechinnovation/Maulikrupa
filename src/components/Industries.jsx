import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Crosshair } from 'lucide-react';

const TOTAL_FRAMES = 60;
const FRAME_PATHS = Array.from({ length: TOTAL_FRAMES }, (_, i) => 
  `/images/cad_dense_sequence/frame_${String(i).padStart(2, '0')}.webp`
);

export default function Industries() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const shadowRef = useRef(null);
  const promptRef = useRef(null);
  const imagesRef = useRef([]);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafIdRef = useRef(null);

  const stageFallbackImagesRef = useRef([]);

  // Dedicated function to redraw current frame on canvas
  const renderFrameRef = useRef(null);

  // 6 Clear Industry Stages based on Mauli Krupa Precision Works capabilities
  const industries = [
    {
      number: '01',
      id: 'engineering',
      title: 'Engineering',
      subtitle: 'Industrial Engineering & Fabrication',
      stageTag: 'Stage 01 — Fully Assembled Machine System',
      statusText: 'ASSEMBLED',
      image: '/images/cad_fixture/fixture_assembled.webp',
      imageAlt: 'Mauli Krupa Precision Works Fully Assembled Machine System',
      description: 'Precision engineering, fabrication, machining and custom tooling solutions for industrial equipment, structures and engineered assemblies.',
      highlights: [
        'Precision fabrication & engineered structures',
        'Custom jigs, fixtures and tooling',
        'Industrial equipment and machine assemblies'
      ],
      inquiryText: 'INQUIRE FOR ENGINEERING',
      targetScroll: 0.08
    },
    {
      number: '02',
      id: 'food-processing',
      title: 'Food Processing',
      subtitle: 'Food Processing Equipment & Fabrication',
      stageTag: 'Stage 02 — Early Component Separation',
      statusText: 'EARLY SEPARATION',
      image: '/images/cad_fixture/part_left_clamps.webp',
      imageAlt: 'Food Processing Equipment and Material Handling Assemblies',
      description: 'Fabrication and material-handling solutions for food processing environments, including stainless-steel equipment, conveyors, ducting and custom assemblies.',
      highlights: [
        'Stainless-steel fabrication & equipment',
        'Conveyor and material-handling systems',
        'Custom process-support structures'
      ],
      inquiryText: 'INQUIRE FOR FOOD PROCESSING',
      targetScroll: 0.25
    },
    {
      number: '03',
      id: 'automobile',
      title: 'Automobile',
      subtitle: 'Automotive Tooling & Manufacturing',
      stageTag: 'Stage 03 — Partial Sub-Assembly Explosion',
      statusText: 'PARTIAL EXPLOSION',
      image: '/images/cad_fixture/part_right_slide.webp',
      imageAlt: 'Automotive Tooling, Jigs, Fixtures and Manufacturing',
      description: 'Custom jigs, fixtures, tooling, conveyors and machine assemblies engineered for automotive manufacturing and production applications.',
      highlights: [
        'Jigs, fixtures & production tooling',
        'Conveyor and material-handling systems',
        'Custom machine assemblies'
      ],
      inquiryText: 'INQUIRE FOR AUTOMOBILE',
      targetScroll: 0.42
    },
    {
      number: '04',
      id: 'pharmaceutical-medical',
      title: 'Pharmaceutical & Medical',
      subtitle: 'Precision Fabrication for Pharmaceutical Applications',
      stageTag: 'Stage 04 — Intermediate Disassembly Stage',
      statusText: 'INTERMEDIATE DISASSEMBLY',
      image: '/images/cad_fixture/part_base_plate.webp',
      imageAlt: 'Precision Stainless Steel Fabrication for Pharmaceutical & Medical',
      description: 'Precision stainless-steel fabrication, equipment structures, ducting and custom engineering solutions for pharmaceutical and medical manufacturing environments.',
      highlights: [
        'Stainless-steel fabrication',
        'Process-support structures & equipment',
        'Precision ducting and custom assemblies'
      ],
      inquiryText: 'INQUIRE FOR PHARMACEUTICAL & MEDICAL',
      targetScroll: 0.58
    },
    {
      number: '05',
      id: 'oil-gas',
      title: 'Oil & Gas',
      subtitle: 'Heavy Fabrication & Industrial Piping',
      stageTag: 'Stage 05 — Advanced Disassembly Stage',
      statusText: 'ADVANCED DISASSEMBLY',
      image: '/images/cad_fixture/part_base_plate.webp',
      imageAlt: 'Heavy Industrial Fabrication & Piping for Oil & Gas',
      description: 'Heavy-duty fabrication solutions including industrial pipelines, structural assemblies, tanks, supports and custom equipment for demanding oil and gas applications.',
      highlights: [
        'Heavy industrial fabrication',
        'Pipeline and structural fabrication',
        'Tanks, supports & equipment structures'
      ],
      inquiryText: 'INQUIRE FOR OIL & GAS',
      targetScroll: 0.75
    },
    {
      number: '06',
      id: 'chemical-industry',
      title: 'Chemical Industry',
      subtitle: 'Industrial Fabrication & Process Support',
      stageTag: 'Stage 06 — Complete Exploded Engineering View',
      statusText: 'FULLY EXPLODED',
      image: '/images/cad_fixture/fixture_exploded.webp',
      imageAlt: 'Complete Exploded 3D Engineering View for Chemical Industry',
      description: 'Engineered fabrication solutions for chemical industry applications, including tanks, pipelines, ducting, equipment structures and material-handling systems.',
      highlights: [
        'Chemical storage tanks & vessels',
        'Industrial pipelines and ducting',
        'Equipment structures & material handling'
      ],
      inquiryText: 'INQUIRE FOR CHEMICAL INDUSTRY',
      targetScroll: 0.92
    }
  ];

  const stageStatusLabels = [
    'STAGE 01 — ASSEMBLED',
    'STAGE 02 — EARLY SEPARATION',
    'STAGE 03 — PARTIAL EXPLOSION',
    'STAGE 04 — INTERMEDIATE DISASSEMBLY',
    'STAGE 05 — ADVANCED DISASSEMBLY',
    'STAGE 06 — FULLY EXPLODED'
  ];

  // Preload priority stage keyframe fallbacks and sequence frames into memory
  useEffect(() => {
    // 1. Preload 5 primary stage fallback images immediately
    const stageFallbackPaths = [
      '/images/cad_fixture/fixture_assembled.webp',
      '/images/cad_fixture/part_left_clamps.webp',
      '/images/cad_fixture/part_right_slide.webp',
      '/images/cad_fixture/part_base_plate.webp',
      '/images/cad_fixture/fixture_exploded.webp'
    ];
    stageFallbackImagesRef.current = stageFallbackPaths.map((path) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        if (renderFrameRef.current) {
          renderFrameRef.current(currentProgressRef.current);
        }
      };
      return img;
    });

    // 2. Preload 60 dense CAD sequence frames with priority on stage keyframe indices
    const loadedImages = new Array(TOTAL_FRAMES);
    const priorityIndices = [0, 12, 24, 36, 48, 59];
    const allIndices = Array.from({ length: TOTAL_FRAMES }, (_, i) => i);
    const loadOrder = [...priorityIndices, ...allIndices.filter((i) => !priorityIndices.includes(i))];

    loadOrder.forEach((idx) => {
      const img = new Image();
      img.src = FRAME_PATHS[idx];
      img.onload = () => {
        loadedImages[idx] = img;
        if (renderFrameRef.current) {
          renderFrameRef.current(currentProgressRef.current);
        }
      };
      loadedImages[idx] = img;
    });

    imagesRef.current = loadedImages;
  }, []);

  // Dedicated 60fps RAF loop with zero React re-render overhead during continuous scrubbing
  useEffect(() => {
    let isRunning = true;

    const getBestImage = (progressVal) => {
      const images = imagesRef.current;
      const floatIndex = progressVal * (TOTAL_FRAMES - 1);
      const targetIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(floatIndex)));

      // 1. Direct exact match
      if (images && images[targetIdx] && images[targetIdx].complete && images[targetIdx].naturalWidth > 0) {
        return images[targetIdx];
      }

      // 2. Nearest loaded sequence frame
      if (images && images.length > 0) {
        let bestImg = null;
        let minDiff = Infinity;
        for (let i = 0; i < images.length; i++) {
          const img = images[i];
          if (img && img.complete && img.naturalWidth > 0) {
            const diff = Math.abs(i - targetIdx);
            if (diff < minDiff) {
              minDiff = diff;
              bestImg = img;
            }
          }
        }
        if (bestImg) return bestImg;
      }

      // 3. Fallback to stage keyframe image
      const stageIdx = Math.min(4, Math.max(0, Math.floor(progressVal * 5)));
      const fallbacks = stageFallbackImagesRef.current;
      if (fallbacks && fallbacks[stageIdx] && fallbacks[stageIdx].complete && fallbacks[stageIdx].naturalWidth > 0) {
        return fallbacks[stageIdx];
      }

      return null;
    };

    const renderFrame = (progressVal) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const imgToDraw = getBestImage(progressVal);

      if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
        ctx.clearRect(0, 0, 1376, 768);
        ctx.globalAlpha = 1;
        ctx.drawImage(imgToDraw, 0, 0, 1376, 768);
      }

      // Direct DOM updates for shadow and prompt with zero component re-renders
      if (promptRef.current) {
        promptRef.current.style.opacity = Math.max(0, 1 - progressVal * 15);
      }
      if (shadowRef.current) {
        shadowRef.current.style.transform = `scale(${1 + progressVal * 0.10}) translateY(${progressVal * 16}px)`;
        shadowRef.current.style.opacity = Math.max(0.08, 0.18 - progressVal * 0.06);
      }
    };

    renderFrameRef.current = renderFrame;

    // Render immediately on mount
    renderFrame(currentProgressRef.current);

    const updateLoop = () => {
      if (!isRunning) return;

      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0001) {
        // Fluid physical dampening (snappy & responsive scrubbing)
        const next = current + diff * 0.35;
        currentProgressRef.current = next;
        renderFrame(next);
      } else if (current !== target) {
        currentProgressRef.current = target;
        renderFrame(target);
      }

      rafIdRef.current = requestAnimationFrame(updateLoop);
    };

    rafIdRef.current = requestAnimationFrame(updateLoop);

    return () => {
      isRunning = false;
      renderFrameRef.current = null;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // High-performance scroll listener: calculates progress & updates active stage only on boundary change
  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScrollable = rect.height - windowHeight;

    if (totalScrollable > 0) {
      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      targetProgressRef.current = progress;

      // Infallible scroll-driven stage sync (Stage 01 to Stage 06)
      let newIdx = 0;
      if (progress < 0.1667) {
        newIdx = 0;
      } else if (progress < 0.3333) {
        newIdx = 1;
      } else if (progress < 0.5000) {
        newIdx = 2;
      } else if (progress < 0.6667) {
        newIdx = 3;
      } else if (progress < 0.8333) {
        newIdx = 4;
      } else {
        newIdx = 5;
      }
      setActiveIndex((prev) => (prev !== newIdx ? newIdx : prev));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Sync with Lenis if available
    const checkLenis = () => {
      if (window.__lenis) {
        window.__lenis.on('scroll', handleScroll);
      }
    };
    checkLenis();
    const lenisTimer = setTimeout(checkLenis, 100);
    
    // Initial immediate calculation & layout settlement
    handleScroll();

    // Staggered checks for fonts and layout settling on initial page load
    const t1 = setTimeout(handleScroll, 50);
    const t2 = setTimeout(handleScroll, 150);
    const t3 = setTimeout(handleScroll, 400);

    // ResizeObserver to automatically detect any layout shifts
    let ro;
    if (window.ResizeObserver && sectionRef.current) {
      ro = new ResizeObserver(() => {
        handleScroll();
      });
      ro.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (window.__lenis) {
        window.__lenis.off('scroll', handleScroll);
      }
      clearTimeout(lenisTimer);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (ro) ro.disconnect();
    };
  }, [handleScroll]);

  // Programmatic click to jump to exact stage within this section (never redirects or navigates)
  const handleStageClick = (e, index) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveIndex(index);
    const targetP = [0.08, 0.25, 0.42, 0.58, 0.75, 0.92][index];
    targetProgressRef.current = targetP;

    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable > 0) {
        const targetScroll = sectionTop + targetP * totalScrollable;
        if (window.__lenis) {
          window.__lenis.scrollTo(targetScroll, { duration: 0.8 });
        } else {
          window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
      }
    }
  };

  const activeIndustry = industries[activeIndex];

  return (
    <section
      id="industries"
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: '#ffffff',
        color: '#111827',
        height: '260vh',
        minHeight: '260vh',
        borderTop: '1px solid #f1f3f5',
        borderBottom: '1px solid #f1f3f5'
      }}
    >
      {/* Pinned Sticky Viewport: Remains firmly locked while user scrolls through the continuous explosion */}
      <div
        className="industries-sticky-viewport"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(20px, 3vh, 32px) 0 clamp(16px, 2.4vh, 24px) 0',
          backgroundColor: '#ffffff',
          zIndex: 2
        }}
      >
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER                                                         */}
        {/* ========================================================================= */}
        <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ maxWidth: '780px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#c52227',
                  marginBottom: '4px'
                }}
              >
                WHERE WE DELIVER VALUE
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(24px, 3.2vw, 36px)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: '#111827',
                  margin: '0 0 4px 0',
                  textTransform: 'uppercase'
                }}
              >
                INDUSTRIES WE SERVE
              </h2>

              <p
                style={{
                  fontSize: 'clamp(13.5px, 1.1vw, 15px)',
                  color: '#64748b',
                  margin: 0
                }}
              >
                Precision engineering and custom manufacturing systems applied across critical industrial sectors.
              </p>
            </div>

            {/* Minimal Link: EXPLORE ALL SECTORS -> /industries */}
            <Link
              to="/industries"
              className="minimal-text-link"
            >
              <span>EXPLORE ALL SECTORS</span>
              <span className="read-more-arrow">→</span>
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. MAIN 3-COLUMN STAGE (LEFT LIST + CENTER VISUAL + RIGHT INFO)           */}
        {/* ========================================================================= */}
        <div
          className="container-custom"
          style={{
            position: 'relative',
            zIndex: 5,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            minHeight: 0
          }}
        >
          <div
            className="industries-three-col-layout"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(210px, 240px) 1fr minmax(270px, 320px)',
              gap: 'clamp(16px, 2.2vw, 36px)',
              alignItems: 'center',
              width: '100%',
              minWidth: 0
            }}
          >
            {/* ===================================================================== */}
            {/* LEFT COLUMN: 6 SECTOR ITEMS WITH SMOOTH SLIDING RED ACTIVE BAR        */}
            {/* ===================================================================== */}
            <div
              className="left-industry-nav"
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                minWidth: 0,
                width: '100%'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  marginBottom: '14px'
                }}
              >
                SECTOR DIRECTORY
              </div>

              {/* Relative Nav Item List */}
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                
                {/* Smooth Animated Active Red Indicator Bar */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '3px',
                    height: '42px',
                    backgroundColor: '#c52227',
                    borderRadius: '2px',
                    transform: `translateY(${activeIndex * 52}px)`,
                    transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex: 2
                  }}
                />

                {industries.map((ind, idx) => {
                  const isActive = idx === activeIndex;

                  return (
                    <div
                      key={ind.id}
                      onClick={(e) => handleStageClick(e, idx)}
                      style={{
                        position: 'relative',
                        cursor: 'pointer',
                        paddingLeft: '14px',
                        height: '42px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        opacity: isActive ? 1 : 0.45,
                        transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                        transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                      className="industry-nav-item"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-tech)',
                            fontSize: '11px',
                            fontWeight: 700,
                            color: isActive ? '#c52227' : '#64748b',
                            letterSpacing: '0.08em',
                            transition: 'color 0.3s ease'
                          }}
                        >
                          {ind.number}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '13.5px',
                            fontWeight: isActive ? 800 : 600,
                            color: isActive ? '#111827' : '#475569',
                            letterSpacing: '0.01em',
                            transition: 'color 0.3s ease'
                          }}
                        >
                          — {ind.title}
                        </span>
                      </div>

                      <div
                        style={{
                          fontSize: '11px',
                          color: isActive ? '#4b5563' : '#94a3b8',
                          marginTop: '2px',
                          lineHeight: 1.25,
                          transition: 'color 0.3s ease',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {ind.subtitle}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ===================================================================== */}
            {/* CENTER COLUMN: HIGH-PRECISION CAD CANVAS EXPLODED ENGINE              */}
            {/* ===================================================================== */}
            <div
              className="center-industry-visual"
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                minWidth: 0
              }}
            >
              {/* Engineering Status Tag with Dynamic Stage Name */}
              <div
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: '#64748b',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <Crosshair size={13} color="#c52227" />
                <span style={{ color: '#c52227', fontWeight: 700 }}>
                  {stageStatusLabels[activeIndex]}
                </span>
              </div>

              {/* Main Visual Stage: Centered, Camera-Locked Engineering Canvas */}
              <div
                className="main-engineering-canvas"
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '720px',
                  height: 'clamp(280px, 38vh, 440px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'visible'
                }}
              >
                {/* Dynamic Radial Ambient Ground Shadow */}
                <div
                  ref={shadowRef}
                  style={{
                    position: 'absolute',
                    bottom: '3%',
                    width: '84%',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.16) 0%, rgba(15, 23, 42, 0) 70%)',
                    pointerEvents: 'none',
                    zIndex: 1,
                    opacity: 0.14
                  }}
                />

                {/* Hardware-Accelerated 1376x768 Engineering Canvas */}
                <canvas
                  ref={canvasRef}
                  width={1376}
                  height={768}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    filter: 'drop-shadow(0 14px 28px rgba(0, 0, 0, 0.08))',
                    zIndex: 4
                  }}
                />
              </div>

              {/* =================================================================== */}
              {/* SUBTLE PROGRESS INDICATOR: 01 — 02 — 03 — 04 — 05 — 06              */}
              {/* =================================================================== */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginTop: '8px',
                  userSelect: 'none'
                }}
                className="industries-stage-progress-bar"
              >
                {industries.map((ind, idx) => {
                  const isActive = idx === activeIndex;

                  return (
                    <React.Fragment key={ind.id}>
                      {idx > 0 && (
                        <span
                          style={{
                            color: idx <= activeIndex ? '#c52227' : '#e2e8f0',
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            transition: 'color 0.35s ease'
                          }}
                        >
                          —
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={(e) => handleStageClick(e, idx)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'none',
                          border: 'none',
                          padding: '4px 6px',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-tech)',
                          fontSize: '12px',
                          fontWeight: isActive ? 800 : 600,
                          color: isActive ? '#c52227' : '#94a3b8',
                          letterSpacing: '0.06em',
                          transition: 'color 0.3s ease, transform 0.3s ease',
                          transform: isActive ? 'scale(1.08)' : 'scale(1)'
                        }}
                        aria-label={`Go to Stage ${ind.number} - ${ind.title}`}
                      >
                        {isActive && (
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: '#c52227',
                              display: 'inline-block',
                              boxShadow: '0 0 8px rgba(197, 34, 39, 0.6)'
                            }}
                          />
                        )}
                        <span>{ind.number}</span>
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Initial "Scroll to Explore" Prompt (Smoothly fades out on initial scroll) */}
              <div
                ref={promptRef}
                style={{
                  position: 'absolute',
                  bottom: '-28px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: '#c52227',
                  textTransform: 'uppercase',
                  pointerEvents: 'none',
                  transition: 'opacity 0.25s ease'
                }}
              >
                <span>SCROLL TO EXPLORE ASSEMBLY</span>
                <ChevronDown size={13} />
              </div>
            </div>

            {/* ===================================================================== */}
            {/* RIGHT COLUMN: SYNCHRONIZED INDUSTRY INFORMATION (ZERO LAYOUT SHIFT)  */}
            {/* ===================================================================== */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'left',
                position: 'relative',
                minWidth: 0,
                width: '100%'
              }}
              className="right-industry-detail"
            >
              <div
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  color: '#c52227',
                  textTransform: 'uppercase',
                  marginBottom: '6px'
                }}
              >
                INDUSTRY APPLICATION
              </div>

              {/* Stacked 6-Stage Industry Content Layers */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  position: 'relative',
                  width: '100%',
                  minWidth: 0
                }}
              >
                {industries.map((ind, idx) => {
                  const isActive = idx === activeIndex;
                  const isPast = idx < activeIndex;

                  return (
                    <div
                      key={ind.id}
                      style={{
                        gridArea: '1 / 1 / 2 / 2',
                        opacity: isActive ? 1 : 0,
                        transform: isActive
                          ? 'translateY(0)'
                          : isPast
                          ? 'translateY(-10px)'
                          : 'translateY(10px)',
                        transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        pointerEvents: isActive ? 'auto' : 'none',
                        visibility: isActive ? 'visible' : 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}
                    >
                      {/* Title */}
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'clamp(18px, 1.8vw, 22px)',
                          fontWeight: 800,
                          lineHeight: 1.18,
                          color: '#111827',
                          margin: '0 0 4px 0',
                          textTransform: 'uppercase'
                        }}
                      >
                        {ind.number} / {ind.title}
                      </h3>

                      {/* Subtitle */}
                      <div
                        style={{
                          fontFamily: 'var(--font-tech)',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#4b5563',
                          marginBottom: '10px'
                        }}
                      >
                        {ind.subtitle}
                      </div>

                      {/* Description */}
                      <p
                        style={{
                          fontSize: '13px',
                          lineHeight: 1.55,
                          color: '#64748b',
                          margin: '0 0 14px 0'
                        }}
                      >
                        {ind.description}
                      </p>

                      {/* 3 Bullet Highlights */}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '7px',
                          marginBottom: '18px'
                        }}
                      >
                        {ind.highlights.map((item, hIdx) => (
                          <div key={hIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                            <span
                              style={{
                                width: '5px',
                                height: '5px',
                                borderRadius: '50%',
                                backgroundColor: '#c52227',
                                marginTop: '6px',
                                flexShrink: 0
                              }}
                            />
                            <span style={{ fontSize: '12px', color: '#1f2937', fontWeight: 600, lineHeight: 1.35 }}>
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Direct CTA Link */}
                      <Link
                        to="/contact"
                        state={{ industry: ind.title }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '12px',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: '#c52227',
                          textDecoration: 'none',
                          padding: '6px 0',
                          borderBottom: '1.5px solid rgba(197, 34, 39, 0.3)',
                          transition: 'all 0.2s ease',
                          width: 'fit-content'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderBottomColor = '#c52227';
                          e.currentTarget.style.color = '#b31b20';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderBottomColor = 'rgba(197, 34, 39, 0.3)';
                          e.currentTarget.style.color = '#c52227';
                        }}
                      >
                        <span>{ind.inquiryText}</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .industries-sticky-viewport * {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }

        @media (max-width: 992px) {
          #industries {
            min-height: 250vh !important;
            height: 250vh !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          .industries-sticky-viewport {
            position: -webkit-sticky !important;
            position: sticky !important;
            top: 0 !important;
            height: 100vh !important;
            height: 100dvh !important;
            max-height: 100dvh !important;
            padding: clamp(8px, 1.5vh, 14px) 0 clamp(6px, 1vh, 10px) 0 !important;
            overflow: hidden !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            box-sizing: border-box !important;
            touch-action: pan-y !important;
            -webkit-backface-visibility: hidden !important;
            backface-visibility: hidden !important;
            transform: translateZ(0) !important;
            overscroll-behavior: contain !important;
          }
          .industries-sticky-viewport .container-custom:first-child h2 {
            font-size: clamp(20px, 5.5vw, 24px) !important;
            margin-bottom: 2px !important;
          }
          .industries-sticky-viewport .container-custom:first-child p {
            font-size: 11.5px !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 1 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
          }
          .industries-sticky-viewport .container-custom:first-child .minimal-text-link {
            font-size: 11px !important;
            gap: 4px !important;
          }
          .industries-three-col-layout {
            grid-template-columns: 1fr !important;
            gap: 4px !important;
            width: 100% !important;
            min-width: 0 !important;
            flex: 1 !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
          }
          .left-industry-nav {
            display: none !important;
          }
          .center-industry-visual {
            width: 100% !important;
            flex-shrink: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            margin-bottom: 2px !important;
          }
          .center-industry-visual > div:first-child {
            padding: 3px 10px !important;
            font-size: 9.5px !important;
            margin-bottom: 4px !important;
          }
          .main-engineering-canvas {
            height: clamp(120px, 20vh, 160px) !important;
            width: min(100%, 360px) !important;
            margin: 0 auto !important;
            flex-shrink: 0 !important;
          }
          .industries-stage-progress-bar {
            margin-top: 2px !important;
            gap: 6px !important;
            flex-shrink: 0 !important;
          }
          .industries-stage-progress-bar button {
            font-size: 11px !important;
            padding: 2px 4px !important;
          }
          .right-industry-detail {
            width: 100% !important;
            min-height: 168px !important;
            max-height: 178px !important;
            height: 172px !important;
            text-align: center !important;
            align-items: center !important;
            justify-content: center !important;
            flex-shrink: 0 !important;
            overflow: hidden !important;
            margin-top: 2px !important;
          }
          .right-industry-detail > div:first-child {
            display: none !important;
          }
          .right-industry-detail > div:last-child {
            width: 100% !important;
            height: 100% !important;
            min-height: 100% !important;
            max-height: 100% !important;
          }
          .right-industry-detail h3 {
            font-size: 15px !important;
            margin: 0 0 2px 0 !important;
            line-height: 1.15 !important;
          }
          .right-industry-detail h3 + div {
            font-size: 11px !important;
            margin-bottom: 4px !important;
          }
          .right-industry-detail p {
            font-size: 11px !important;
            line-height: 1.35 !important;
            margin: 0 auto 6px auto !important;
            max-width: 380px !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
          }
          .right-industry-detail > div:last-child > div > div:nth-child(4) {
            gap: 3px !important;
            margin-bottom: 6px !important;
            align-items: center !important;
          }
          .right-industry-detail > div:last-child > div > div:nth-child(4) > div {
            justify-content: center !important;
          }
          .right-industry-detail > div:last-child > div > div:nth-child(4) span:last-child {
            font-size: 11px !important;
            line-height: 1.25 !important;
          }
          .right-industry-detail a {
            font-size: 11px !important;
            padding: 3px 0 !important;
            margin: 0 auto !important;
          }
        }

        @media (max-width: 480px) {
          #industries {
            min-height: 240vh !important;
            height: 240vh !important;
          }
          .main-engineering-canvas {
            height: clamp(110px, 18vh, 145px) !important;
            width: min(100%, 320px) !important;
          }
          .right-industry-detail {
            min-height: 160px !important;
            max-height: 170px !important;
            height: 165px !important;
          }
          .right-industry-detail h3 {
            font-size: 14.5px !important;
          }
          .right-industry-detail p {
            font-size: 10.5px !important;
            line-height: 1.3 !important;
          }
        }
      `}</style>
    </section>
  );
}



