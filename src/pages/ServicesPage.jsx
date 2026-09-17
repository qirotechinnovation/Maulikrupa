import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Factory,
  Cog,
  Boxes,
  Crosshair,
  Cpu,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Layers
} from 'lucide-react';

// =========================================================================
// SERVICES COMPACT DATA REPOSITORY (MINIMAL, CLEAN, VISUAL)
// =========================================================================
const SERVICES_DATA = {
  // ---------------- SS FABRICATION (9 Items) ----------------
  'ss-tube-structure': {
    id: 'ss-tube-structure',
    name: 'Tube Structure & Channel Angle Fabrication',
    categoryLabel: 'SS FABRICATION',
    image: '/images/service_ss_tube_structure.jpg',
    description: 'Custom stainless-steel structural fabrication for industrial machine frames, equipment support stands and cleanroom structures, fabricated to project specifications and structural load requirements.',
    highlights: ['Custom Fabrication', 'Structural Support', 'Industrial Framing'],
    idealFor: 'Machine base frames, structural platforms and cleanroom equipment supports.'
  },
  'ss-ducting': {
    id: 'ss-ducting',
    name: 'SS Ducting Fabrication',
    categoryLabel: 'SS FABRICATION',
    image: '/images/service_ss_ducting.jpg',
    description: 'Corrosion-resistant stainless-steel ducting lines, transitions and manifolds engineered for industrial ventilation, fume extraction and clean air distribution systems.',
    highlights: ['Custom Ducting', 'Ventilation Systems', 'Stainless Steel'],
    idealFor: 'Industrial exhaust, cleanroom airflow and chemical fume extraction.'
  },
  'ss-tank': {
    id: 'ss-tank',
    name: 'SS Tank Fabrication',
    categoryLabel: 'SS FABRICATION',
    image: '/images/service_ss_tank.jpg',
    description: 'Custom stainless-steel tank fabrication developed for industrial process, storage and equipment requirements. Fabrication is tailored to project-specific capacity and dimensional parameters.',
    highlights: ['Custom Fabrication', 'Stainless Steel', 'Industrial Applications'],
    idealFor: 'Industrial process liquids, chemical storage and plant utility tanks.'
  },
  'ss-pipeline': {
    id: 'ss-pipeline',
    name: 'SS Pipeline Fabrication',
    categoryLabel: 'SS FABRICATION',
    image: '/images/gallery_assets/filtration_skid_20.jpg',
    description: 'Precision stainless-steel pipeline spools and utility manifolds fabricated with high-integrity TIG welding for reliable plant fluid transfer and process distribution.',
    highlights: ['Process Piping', 'TIG Welded', 'Utility Lines'],
    idealFor: 'Industrial fluid transfer, process distribution and utility pipelines.'
  },
  'ss-polishing': {
    id: 'ss-polishing',
    name: 'Polishing & Buffing Work',
    categoryLabel: 'SS FABRICATION',
    image: '/images/service_surface_finishing.jpg',
    description: 'Precision mechanical polishing and buffing treatments for stainless-steel fabrications to achieve required surface roughness values from fine satin to mirror finishes.',
    highlights: ['Surface Finishing', 'Satin & Mirror Finish', 'Sanitary Profile'],
    idealFor: 'Sanitary process equipment, architectural components and exposed surfaces.'
  },
  'ss-passivation': {
    id: 'ss-passivation',
    name: 'Passivation & Pickling Work',
    categoryLabel: 'SS FABRICATION',
    image: '/images/gallery_assets/process_skid_19.jpg',
    description: 'Chemical pickling and passivation treatments to eliminate weld heat tints, surface contaminants and restore the protective chromium oxide layer across stainless fabrications.',
    highlights: ['Surface Treatment', 'Oxide Restoration', 'Corrosion Protection'],
    idealFor: 'Post-weld restoration, chemical-grade fabrications and corrosive environments.'
  },
  'ss-ndt': {
    id: 'ss-ndt',
    name: 'SS 3rd Party NDT Facility',
    categoryLabel: 'SS FABRICATION',
    image: '/images/service_ss_ndt.jpg',
    description: 'Coordination and facilitation of third-party non-destructive testing including dye penetrant, radiography and ultrasonic inspection for certified weld and structural integrity.',
    highlights: ['Quality Inspection', 'Weld Verification', 'NDT Testing'],
    idealFor: 'Critical industrial fabrications, pressure components and compliance verification.'
  },
  'ss-glass-blasting': {
    id: 'ss-glass-blasting',
    name: 'Glass Blasting',
    categoryLabel: 'SS FABRICATION',
    image: '/images/gallery_assets/vertical_ducts_17.jpg',
    description: 'Specialized glass bead abrasive blasting for stainless-steel components to deliver a uniform, clean matte texture while removing micro-burrs and surface discoloration.',
    highlights: ['Matte Finish', 'Abrasive Blasting', 'Surface Cleaning'],
    idealFor: 'Clean visual finishes, uniform matte profiles and component descaling.'
  },
  'ss-laser-cutting': {
    id: 'ss-laser-cutting',
    name: 'Laser Cutting',
    categoryLabel: 'SS FABRICATION',
    image: '/images/hero_welding_fabrication.jpg',
    description: 'High-precision CNC fiber laser cutting for stainless-steel sheet and plate materials, delivering burr-free edges, tight tolerances and accurate complex profiles.',
    highlights: ['CNC Laser Cutting', 'Clean Edges', 'Sheet Profiling'],
    idealFor: 'Precision sheet metal parts, mounting brackets and intricate profiles.'
  },

  // ---------------- MS FABRICATION (8 Items) ----------------
  'ms-tube-channel': {
    id: 'ms-tube-channel',
    name: 'Square Tube, Channel & I-Beam Fabrication',
    categoryLabel: 'MS FABRICATION',
    image: '/images/service_ms_tube_channel.jpg',
    description: 'Heavy structural mild-steel fabrication utilizing square tubes, channels and I-beams to construct rigid machine bases, structural framing and heavy-duty shopfloor fixtures.',
    highlights: ['Heavy Structural', 'Machine Bases', 'Robust Frames'],
    idealFor: 'Heavy machine chassis, plant structural frames and equipment skids.'
  },
  'ms-ducting': {
    id: 'ms-ducting',
    name: 'MS Ducting Work',
    categoryLabel: 'MS FABRICATION',
    image: '/images/service_ms_ducting.jpg',
    description: 'Robust mild-steel ducting lines, dust collector ducts and exhaust channels fabricated for factory ventilation, flue gas exhaust and high-volume industrial airflow.',
    highlights: ['Industrial Ducting', 'Plant Ventilation', 'Exhaust Channels'],
    idealFor: 'Factory exhaust lines, dust extraction systems and heavy airflow ducts.'
  },
  'ms-tank': {
    id: 'ms-tank',
    name: 'MS Tank Fabrication',
    categoryLabel: 'MS FABRICATION',
    image: '/images/gallery_assets/enclosure_cabinet_22.jpg',
    description: 'Custom mild-steel tanks, hydraulic oil reservoirs and process vessels built with reinforced welding to handle demanding industrial storage and fluid containment.',
    highlights: ['Storage Tanks', 'Oil Reservoirs', 'Custom Welded'],
    idealFor: 'Hydraulic power packs, coolant reservoirs and general plant storage.'
  },
  'ms-pipeline': {
    id: 'ms-pipeline',
    name: 'MS Pipeline Fabrication',
    categoryLabel: 'MS FABRICATION',
    image: '/images/service_fabrication.jpg',
    description: 'Heavy-duty mild-steel pipeline spools, compressed air lines and cooling water distribution headers fabricated to required pressure ratings and welding standards.',
    highlights: ['Plant Piping', 'Utility Distribution', 'Certified Welding'],
    idealFor: 'Cooling water loops, compressed air lines and utility piping spools.'
  },
  'ms-powder-coating': {
    id: 'ms-powder-coating',
    name: 'Powder Coating',
    categoryLabel: 'MS FABRICATION',
    image: '/images/service_ms_powder_coating.jpg',
    description: 'Industrial electrostatic powder coating and oven curing for mild-steel fabrications, providing long-lasting corrosion protection, impact durability and uniform color finish.',
    highlights: ['Powder Coating', 'Corrosion Resistance', 'Durable Finish'],
    idealFor: 'Machine enclosures, electrical panels, brackets and structural assemblies.'
  },
  'ms-sand-blasting': {
    id: 'ms-sand-blasting',
    name: 'Sand Blasting & Painting',
    categoryLabel: 'MS FABRICATION',
    image: '/images/service_sandblasting_painting.jpg',
    description: 'Thorough abrasive grit/sand blasting to remove rust, scale and mill contaminants, followed by application of industrial epoxy primer and protective polyurethane topcoats.',
    highlights: ['Grit Blasting', 'Epoxy Primer', 'Protective Coating'],
    idealFor: 'Heavy structural assemblies, plant equipment bases and outdoor installations.'
  },
  'ms-ndt': {
    id: 'ms-ndt',
    name: 'MS 3rd Party NDT Facility',
    categoryLabel: 'MS FABRICATION',
    image: '/images/service_ms_ndt.jpg',
    description: 'Facilitation of third-party NDT quality testing for structural mild-steel weldments, ensuring adherence to industrial quality standards and load-bearing integrity.',
    highlights: ['Weld Inspection', 'NDT Verification', 'Quality Assurance'],
    idealFor: 'Load-bearing frames, crane structures and certified industrial weldments.'
  },
  'ms-laser-forming': {
    id: 'ms-laser-forming',
    name: 'Laser Cutting & Forming',
    categoryLabel: 'MS FABRICATION',
    image: '/images/hero_cnc_precision.jpg',
    description: 'Integrated CNC laser profile cutting and hydraulic press-brake bending for mild-steel plates, producing accurate bent sections, covers, guards and brackets.',
    highlights: ['Laser Cutting', 'Press Brake Bending', 'Custom Forming'],
    idealFor: 'Machine guards, chassis covers, structural brackets and sheet components.'
  },

  // ---------------- MACHINING SERVICES (11 Items) ----------------
  'mach-laser-cutting': {
    id: 'mach-laser-cutting',
    name: 'Laser Cutting',
    categoryLabel: 'MACHINING',
    image: '/images/hero_welding_fabrication.jpg',
    description: 'Precision 2D CNC laser cutting services delivering clean edge definition, tight tolerances and accurate repeatable cutouts across a variety of industrial metals.',
    highlights: ['CNC Laser Profiling', 'Clean Edge Quality', 'Sheet Profiling'],
    idealFor: 'Rapid prototype parts, precision sheet metal profiles and production batches.'
  },
  'mach-plano-milling': {
    id: 'mach-plano-milling',
    name: 'Plano Milling',
    categoryLabel: 'MACHINING',
    image: '/images/service_mach_plano_milling.jpg',
    description: 'Heavy-capacity plano milling for machining oversized component faces, long machine beds, die blocks and large fabrication datum surfaces with high flatness.',
    highlights: ['Large Bed Milling', 'Face Machining', 'Heavy Structures'],
    idealFor: 'Large machine base datum faces, heavy press platens and long slides.'
  },
  'mach-vmc-milling': {
    id: 'mach-vmc-milling',
    name: 'VMC Milling',
    categoryLabel: 'MACHINING',
    image: '/images/service_mach_vmc_milling.jpg',
    description: 'Multi-axis vertical machining center (VMC) CNC milling for complex components requiring high dimensional accuracy, fine surface finishes and consistent batch repeatability.',
    highlights: ['CNC Milling', 'Component Machining', 'Precision Work'],
    idealFor: 'Complex tooling blocks, precision mechanical parts and machined housings.'
  },
  'mach-universal-milling': {
    id: 'mach-universal-milling',
    name: 'Universal Milling',
    categoryLabel: 'MACHINING',
    image: '/images/service_mach_universal_milling.jpg',
    description: 'Flexible universal milling for toolroom operations, keyway cutting, gear slotting, spline milling and custom component modifications with precision setup.',
    highlights: ['Keyway & Slots', 'Toolroom Machining', 'Helical Milling'],
    idealFor: 'Shaft keyways, slotting, toolroom maintenance and one-off mechanical parts.'
  },
  'mach-drilling': {
    id: 'mach-drilling',
    name: 'Drilling',
    categoryLabel: 'MACHINING',
    image: '/images/service_custom_machines_spm.jpg',
    description: 'Heavy radial and multi-spindle drilling, precision boring and thread tapping operations across thick steel plates, flanges and structural fabrications.',
    highlights: ['Radial Drilling', 'Hole Tapping', 'Precision Reaming'],
    idealFor: 'Flange bolt patterns, structural base holes and threaded assembly plates.'
  },
  'mach-turning': {
    id: 'mach-turning',
    name: 'Turning',
    categoryLabel: 'MACHINING',
    image: '/images/service_mach_turning.jpg',
    description: 'Precision lathe turning, facing, boring and threading operations for cylindrical shafts, rollers, bushings, pins and precision turned assemblies.',
    highlights: ['Lathe Turning', 'Shafts & Pins', 'Precision Threading'],
    idealFor: 'Conveyor rollers, drive shafts, precision bushings and turned fasteners.'
  },
  'mach-jig-fixture-work': {
    id: 'mach-jig-fixture-work',
    name: 'Jig-Fixture Work',
    categoryLabel: 'MACHINING',
    image: '/images/service_jigs_fixtures.jpg',
    description: 'High-precision toolroom machining of locating pins, resting pads, clamp jaws and guide blocks specifically built for custom manufacturing jigs and fixtures.',
    highlights: ['Toolroom Machining', 'Locating Pins', 'Fixture Blocks'],
    idealFor: 'Assembly line fixtures, welding fixture parts and precision clamping tools.'
  },
  'mach-toolroom-work': {
    id: 'mach-toolroom-work',
    name: 'Tool-Room Work',
    categoryLabel: 'MACHINING',
    image: '/images/service_mach_toolroom_work.jpg',
    description: 'Dedicated toolroom manufacturing services including die modifications, prototype component machining, gauge manufacturing and custom tooling solutions.',
    highlights: ['Custom Tooling', 'Gauge Fabrication', 'Prototype Work'],
    idealFor: 'Tooling rework, prototype development, go/no-go gauges and custom dies.'
  },
  'mach-forming': {
    id: 'mach-forming',
    name: 'Forming',
    categoryLabel: 'MACHINING',
    image: '/images/service_mach_forming.jpg',
    description: 'Hydraulic press and bending operations to shape sheet metal and plate sections into accurate channels, angles, curved covers and custom structural profiles.',
    highlights: ['Hydraulic Press', 'Sheet Metal Bending', 'Section Forming'],
    idealFor: 'Custom channel sections, curved panels, heavy enclosures and bent brackets.'
  },
  'mach-cylindrical-grinding': {
    id: 'mach-cylindrical-grinding',
    name: 'Cylindrical Grinding',
    categoryLabel: 'MACHINING',
    image: '/images/service_mach_cylindrical_grinding.jpg',
    description: 'High-precision outer (OD) and inner (ID) diameter cylindrical grinding to achieve micron-level concentricity, fine surface finishes and strict shaft tolerances.',
    highlights: ['OD/ID Grinding', 'Shaft Finishing', 'Concentricity'],
    idealFor: 'Bearing journals, precision guide pins, spindle components and rollers.'
  },
  'mach-surface-grinding': {
    id: 'mach-surface-grinding',
    name: 'Surface Grinding',
    categoryLabel: 'MACHINING',
    image: '/images/service_surface_grinding_precision.jpg',
    description: 'Precision surface grinding to produce ultra-flat datum faces, parallel guideways, spacer plates and tool steel blocks with mirror-grade surface finishes.',
    highlights: ['Surface Flatness', 'Parallel Datum', 'Precision Finishing'],
    idealFor: 'Tool steel plates, machine slide guideways, precision shims and dies.'
  },

  // ---------------- CONVEYOR & MATERIAL HANDLING (5 Items) ----------------
  'conv-belt': {
    id: 'conv-belt',
    name: 'Belt Conveyor',
    categoryLabel: 'CONVEYOR & MATERIAL HANDLING',
    image: '/images/gallery_products/02_pvc_belt_conveyor.png',
    description: 'Industrial belt conveyor systems engineered for smooth, reliable material transfer across production, packaging and handling lines with custom widths and lengths.',
    highlights: ['Material Handling', 'Industrial Conveying', 'Custom Solutions'],
    idealFor: 'Packaging lines, assembly operations and intra-plant material transit.'
  },
  'conv-flat': {
    id: 'conv-flat',
    name: 'Flat Conveyor',
    categoryLabel: 'CONVEYOR & MATERIAL HANDLING',
    image: '/images/service_conveyors.jpg',
    description: 'Modular flat slat and roller conveyor solutions designed for stable component movement, inline buffering and seamless integration with production machinery.',
    highlights: ['Flat Conveyors', 'Component Transit', 'Assembly Lines'],
    idealFor: 'Component transit, assembly workstations and continuous part feeding.'
  },
  'conv-magnetic': {
    id: 'conv-magnetic',
    name: 'Magnetic Conveyor',
    categoryLabel: 'CONVEYOR & MATERIAL HANDLING',
    image: '/images/service_conv_magnetic.jpg',
    description: 'Specialized magnetic conveyors designed for automatic chip evacuation, scrap metal transit and elevating ferrous components from machining centers.',
    highlights: ['Magnetic Conveying', 'Chip Extraction', 'Scrap Removal'],
    idealFor: 'CNC chip evacuation, stamping scrap handling and ferrous part elevation.'
  },
  'conv-trolleys': {
    id: 'conv-trolleys',
    name: 'Industrial Trolleys',
    categoryLabel: 'CONVEYOR & MATERIAL HANDLING',
    image: '/images/service_trolleys.jpg',
    description: 'Ergonomic shopfloor transit trolleys, component picking carts and heavy-duty transport dollies built with industrial-grade casters and robust steel frames.',
    highlights: ['Floor Transit', 'Heavy-Duty Casters', 'Custom Racks'],
    idealFor: 'Shopfloor part transit, material handling and raw material transport.'
  },
  'conv-pallets': {
    id: 'conv-pallets',
    name: 'Industrial Pallets',
    categoryLabel: 'CONVEYOR & MATERIAL HANDLING',
    image: '/images/gallery_products/04_material_handling_trolley.png',
    description: 'Heavy-gauge steel fabricated storage pallets and stackable stillages engineered for safe warehouse racking, heavy component storage and transport durability.',
    highlights: ['Steel Pallets', 'Stacking Stillages', 'Warehouse Storage'],
    idealFor: 'Heavy inventory racking, warehouse stacking and component shipping.'
  },

  // ---------------- JIGS & FIXTURES (STANDALONE SERVICE) ----------------
  'jigs-fixtures': {
    id: 'jigs-fixtures',
    name: 'Jigs & Fixtures',
    categoryLabel: 'JIGS & FIXTURES',
    image: '/images/service_jigs_fixtures.jpg',
    description: 'Custom-designed manufacturing jigs and holding fixtures engineered to ensure accurate part positioning, repeatable clamping and efficient assembly or welding operations.',
    highlights: ['Custom Fixtures', 'Component Holding', 'Process Support'],
    idealFor: 'Welding setups, production line assembly and precision machining operations.'
  },

  // ---------------- SPECIAL PURPOSE MACHINES (STANDALONE SERVICE) ----------------
  'spm-service': {
    id: 'spm-service',
    name: 'Special Purpose Machines',
    categoryLabel: 'SPM',
    image: '/images/service_custom_spm.jpg',
    description: 'Custom Special Purpose Machines (SPM) designed and built for dedicated industrial processes, automated operations and project-specific manufacturing requirements.',
    highlights: ['Custom Automation', 'Machine Integration', 'Industrial Applications'],
    idealFor: 'Dedicated production operations, automated tasks and custom machine needs.'
  }
};

// =========================================================================
// 5 MAIN SERVICE CATEGORIES DEFINITION
// =========================================================================
const CATEGORIES = [
  {
    id: 'industrial-fabrication',
    number: '01',
    label: 'Industrial Fabrication',
    shortLabel: 'Fabrication',
    icon: Factory,
    defaultServiceId: 'ss-tube-structure',
    description: 'Heavy structural steel framing, tanks, pressure vessels, stainless ducting and laser-cut metal fabrication.'
  },
  {
    id: 'machining',
    number: '02',
    label: 'Machining',
    shortLabel: 'Machining',
    icon: Cog,
    defaultServiceId: 'mach-laser-cutting',
    description: 'High-precision CNC VMC milling, heavy plano milling, lathe turning, radial drilling and precision grinding.'
  },
  {
    id: 'conveyor-material-handling',
    number: '03',
    label: 'Conveyor & Material Handling',
    shortLabel: 'Conveyors & Handling',
    icon: Boxes,
    defaultServiceId: 'conv-belt',
    description: 'Industrial belt, flat slat, magnetic conveyors, factory transit trolleys and heavy steel storage pallets.'
  },
  {
    id: 'jigs-fixtures',
    number: '04',
    label: 'Jigs & Fixtures',
    shortLabel: 'Jigs & Fixtures',
    icon: Crosshair,
    defaultServiceId: 'jigs-fixtures',
    description: 'Custom manufacturing jigs, welding fixtures and precision clamping systems for repeatable production accuracy.'
  },
  {
    id: 'spm',
    number: '05',
    label: 'Special Purpose Machines (SPM)',
    shortLabel: 'SPM Automation',
    icon: Cpu,
    defaultServiceId: 'spm-service',
    description: 'Tailored industrial special purpose machinery and automated manufacturing stations engineered to order.'
  }
];

// Helper to determine which category a service belongs to
function getCategoryForServiceId(id) {
  if (!id) return 'industrial-fabrication';
  if (id.startsWith('ss-') || id.startsWith('ms-')) return 'industrial-fabrication';
  if (id.startsWith('mach-')) return 'machining';
  if (id.startsWith('conv-')) return 'conveyor-material-handling';
  if (id === 'jigs-fixtures') return 'jigs-fixtures';
  if (id === 'spm-service' || id === 'spm') return 'spm';
  return 'industrial-fabrication';
}

// =========================================================================
// MAIN SERVICES PAGE COMPONENT
// =========================================================================
export default function ServicesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Active Main Category (DEFAULT: 01 Industrial Fabrication)
  const [activeCategory, setActiveCategory] = useState('industrial-fabrication');

  // Selected single service ID to display on the right (DEFAULT: first item of Industrial Fabrication)
  const [selectedServiceId, setSelectedServiceId] = useState('ss-tube-structure');

  // Sub-branch expansion states for sub-levels within the active category
  const [openSS, setOpenSS] = useState(true);
  const [openMS, setOpenMS] = useState(false);
  const [openMilling, setOpenMilling] = useState(true);
  const [openGrinding, setOpenGrinding] = useState(false);

  // Mobile drawer/accordion state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Handle direct deep-linking via query params (?category=..., ?service=..., ?id=...)
  useEffect(() => {
    const catParam = searchParams.get('category');
    const serviceParam = searchParams.get('service');
    const idParam = searchParams.get('id');

    if (idParam && SERVICES_DATA[idParam]) {
      const cat = getCategoryForServiceId(idParam);
      setActiveCategory(cat);
      setSelectedServiceId(idParam);
      expandSubBranchesForService(idParam);
    } else if (serviceParam) {
      const match = Object.values(SERVICES_DATA).find(
        (s) => s.name.toLowerCase() === serviceParam.toLowerCase() || s.id.toLowerCase() === serviceParam.toLowerCase()
      );
      if (match) {
        const cat = getCategoryForServiceId(match.id);
        setActiveCategory(cat);
        setSelectedServiceId(match.id);
        expandSubBranchesForService(match.id);
      } else {
        // Check if serviceParam matches a category name
        const catMatch = CATEGORIES.find(
          (c) => c.label.toLowerCase() === serviceParam.toLowerCase() || c.id.toLowerCase() === serviceParam.toLowerCase()
        );
        if (catMatch) {
          setActiveCategory(catMatch.id);
          setSelectedServiceId(catMatch.defaultServiceId);
          expandSubBranchesForService(catMatch.defaultServiceId);
        }
      }
    } else if (catParam) {
      const catMatch = CATEGORIES.find(
        (c) => c.id.toLowerCase() === catParam.toLowerCase() || c.label.toLowerCase() === catParam.toLowerCase()
      );
      if (catMatch) {
        setActiveCategory(catMatch.id);
        setSelectedServiceId(catMatch.defaultServiceId);
        expandSubBranchesForService(catMatch.defaultServiceId);
      }
    }
  }, [searchParams]);

  // Helper to expand sub-branch accordions for a service
  const expandSubBranchesForService = (id) => {
    if (id.startsWith('ss-')) {
      setOpenSS(true);
      setOpenMS(false);
    } else if (id.startsWith('ms-')) {
      setOpenMS(true);
    } else if (id.startsWith('mach-')) {
      if (id.includes('milling')) setOpenMilling(true);
      if (id.includes('grinding')) setOpenGrinding(true);
    }
  };

  // Switch Main Category (Show ONLY this category and its sub-services)
  const handleSelectCategory = (categoryId) => {
    const targetCat = CATEGORIES.find((c) => c.id === categoryId);
    if (!targetCat) return;

    setActiveCategory(targetCat.id);
    setSelectedServiceId(targetCat.defaultServiceId);
    expandSubBranchesForService(targetCat.defaultServiceId);
    setMobileMenuOpen(false);

    // Update query params cleanly
    navigate(`/services?category=${targetCat.id}`, { replace: true });

    // Smooth scroll on mobile
    if (window.innerWidth < 992) {
      const anchor = document.getElementById('catalogue-detail-content-area');
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Handler to select an individual item within the active category
  const handleSelectService = (id) => {
    setSelectedServiceId(id);
    setMobileMenuOpen(false);

    // Smooth scroll to detail area on mobile
    if (window.innerWidth < 992) {
      const anchor = document.getElementById('catalogue-detail-content-area');
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Handler for INQUIRE NOW
  const handleInquireNow = (serviceName) => {
    navigate(`/contact?service=${encodeURIComponent(serviceName)}`, {
      state: { service: serviceName }
    });
  };

  // Active category and service objects
  const activeCategoryObj = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];
  const currentService = SERVICES_DATA[selectedServiceId] || SERVICES_DATA[activeCategoryObj.defaultServiceId];

  return (
    <div className="services-page-root">
      
      {/* ========================================================================= */}
      {/* 1. TOP EDITORIAL BANNER                                                   */}
      {/* ========================================================================= */}
      <section className="services-top-hero">
        <div className="top-hero-overlay" />
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
        <div className="services-full-container">
          <div className="top-hero-content">
            <div className="hero-badge-wrap">
              <span className="hero-badge-text">MAULI KRUPA PRECISION WORKS</span>
              <span className="hero-badge-line" />
            </div>
            <h1 className="hero-title">
              SERVICES <span className="hero-title-accent">CATALOGUE</span>
            </h1>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CATEGORY-BASED MAIN LAYOUT SECTION                                     */}
      {/* ========================================================================= */}
      <section className="services-main-layout-section">
        <div className="services-full-container">

          {/* ----------------------------------------------------------------------- */}
          {/* CATEGORY SWITCHER TABS: CLEAN HORIZONTAL NAVIGATION (ALL 5 CATEGORIES) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="category-switcher-wrapper">
            <div className="category-switcher-header">
              <span className="category-switcher-eyebrow">
                <Layers size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
                MAIN SERVICE CATEGORIES
              </span>
            </div>

            <div className="category-tabs-bar" role="tablist" aria-label="Service Categories">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    id={`cat-tab-${cat.id}`}
                    aria-selected={isActive}
                    onClick={() => handleSelectCategory(cat.id)}
                    className={`category-tab-button ${isActive ? 'is-active' : ''}`}
                  >
                    <span className="tab-num-tag">{cat.number}</span>
                    <span className="tab-title-text">{cat.label}</span>
                    {isActive && <span className="tab-active-pill" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MOBILE ACCORDION SELECTOR BAR (< 992px) */}
          <div className="mobile-category-bar">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-category-btn"
              aria-label="Toggle sub-services menu"
            >
              <div className="mobile-btn-copy">
                <span className="mobile-btn-tag">
                  CATEGORY: {activeCategoryObj.label.toUpperCase()}
                </span>
                <span className="mobile-btn-title">{currentService.name}</span>
              </div>
              <ChevronDown
                size={18}
                className={`mobile-chevron ${mobileMenuOpen ? 'open' : ''}`}
              />
            </button>
          </div>

          <div className="services-catalogue-grid">
            
            {/* =================================================================== */}
            {/* LEFT SIDEBAR: ONLY THE SELECTED MAIN SERVICE CATEGORY + SUB-SERVICES*/}
            {/* =================================================================== */}
            <aside className={`services-sidebar-column ${mobileMenuOpen ? 'mobile-visible' : ''}`}>
              <div className="sidebar-container-box">
                
                {/* Sidebar Header: Shows ONLY Active Category */}
                <div className="sidebar-top-bar">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {React.createElement(activeCategoryObj.icon, { size: 18, color: '#ffffff' })}
                    <h3 className="sidebar-title">{activeCategoryObj.label}</h3>
                  </div>
                </div>

                {/* Sidebar Sub-Services Navigation Tree (ONLY for Active Category) */}
                <nav className="sidebar-tree-navigation" aria-label={`${activeCategoryObj.label} Sub-Services`}>

                  {/* ---------------- 1. INDUSTRIAL FABRICATION ONLY ---------------- */}
                  {activeCategory === 'industrial-fabrication' && (
                    <div className="active-category-sub-tree">
                      
                      {/* SS FABRICATION SUB-BRANCH */}
                      <div className="sub-category-group">
                        <div
                          className={`sub-category-header ${selectedServiceId.startsWith('ss-') ? 'active-sub' : ''}`}
                          onClick={() => setOpenSS(!openSS)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span className="sub-bullet" />
                            <span className="sub-title">SS Fabrication</span>
                          </div>
                          <ChevronDown size={13} className={`sub-chevron ${openSS ? 'open' : ''}`} />
                        </div>

                        {openSS && (
                          <div className="leaf-items-list">
                            <div
                              className={`leaf-item ${selectedServiceId === 'ss-tube-structure' ? 'is-selected' : ''}`}
                              onClick={() => handleSelectService('ss-tube-structure')}
                            >
                              <span className="leaf-indicator" />
                              <span>Tube Structure &amp; Channel Angle Fabrication</span>
                            </div>

                            <div
                              className={`leaf-item ${selectedServiceId === 'ss-ducting' ? 'is-selected' : ''}`}
                              onClick={() => handleSelectService('ss-ducting')}
                            >
                              <span className="leaf-indicator" />
                              <span>SS Ducting Fabrication</span>
                            </div>

                            <div
                              className={`leaf-item ${selectedServiceId === 'ss-tank' ? 'is-selected' : ''}`}
                              onClick={() => handleSelectService('ss-tank')}
                            >
                              <span className="leaf-indicator" />
                              <span>SS Tank Fabrication</span>
                            </div>

                            <div
                              className={`leaf-item ${selectedServiceId === 'ss-pipeline' ? 'is-selected' : ''}`}
                              onClick={() => handleSelectService('ss-pipeline')}
                            >
                              <span className="leaf-indicator" />
                              <span>SS Pipeline Fabrication</span>
                            </div>

                            <div
                              className={`leaf-item ${selectedServiceId === 'ss-polishing' ? 'is-selected' : ''}`}
                              onClick={() => handleSelectService('ss-polishing')}
                            >
                              <span className="leaf-indicator" />
                              <span>Polishing &amp; Buffing Work</span>
                            </div>

                            <div
                              className={`leaf-item ${selectedServiceId === 'ss-passivation' ? 'is-selected' : ''}`}
                              onClick={() => handleSelectService('ss-passivation')}
                            >
                              <span className="leaf-indicator" />
                              <span>Passivation &amp; Pickling Work</span>
                            </div>

                            <div
                              className={`leaf-item ${selectedServiceId === 'ss-ndt' ? 'is-selected' : ''}`}
                              onClick={() => handleSelectService('ss-ndt')}
                            >
                              <span className="leaf-indicator" />
                              <span>SS 3rd Party NDT Facility</span>
                            </div>

                            <div
                              className={`leaf-item ${selectedServiceId === 'ss-glass-blasting' ? 'is-selected' : ''}`}
                              onClick={() => handleSelectService('ss-glass-blasting')}
                            >
                              <span className="leaf-indicator" />
                              <span>Glass Blasting</span>
                            </div>

                            <div
                              className={`leaf-item ${selectedServiceId === 'ss-laser-cutting' ? 'is-selected' : ''}`}
                              onClick={() => handleSelectService('ss-laser-cutting')}
                            >
                              <span className="leaf-indicator" />
                              <span>Laser Cutting</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* MS FABRICATION SUB-BRANCH */}
                      <div className="sub-category-group">
                        <div
                          className={`sub-category-header ${selectedServiceId.startsWith('ms-') ? 'active-sub' : ''}`}
                          onClick={() => setOpenMS(!openMS)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span className="sub-bullet" />
                            <span className="sub-title">MS Fabrication</span>
                          </div>
                          <ChevronDown size={13} className={`sub-chevron ${openMS ? 'open' : ''}`} />
                        </div>

                        {openMS && (
                          <div className="leaf-items-list">
                            <div
                              className={`leaf-item ${selectedServiceId === 'ms-tube-channel' ? 'is-selected' : ''}`}
                              onClick={() => handleSelectService('ms-tube-channel')}
                            >
                              <span className="leaf-indicator" />
                              <span>Square Tube, Channel &amp; I-Beam Fabrication</span>
                            </div>

                            <div
                              className={`leaf-item ${selectedServiceId === 'ms-ducting' ? 'is-selected' : ''}`}
                              onClick={() => handleSelectService('ms-ducting')}
                            >
                              <span className="leaf-indicator" />
                              <span>MS Ducting Work</span>
                            </div>

                            <div
                              className={`leaf-item ${selectedServiceId === 'ms-tank' ? 'is-selected' : ''}`}
                              onClick={() => handleSelectService('ms-tank')}
                            >
                              <span className="leaf-indicator" />
                              <span>MS Tank Fabrication</span>
                            </div>

                            <div
                              className={`leaf-item ${selectedServiceId === 'ms-pipeline' ? 'is-selected' : ''}`}
                              onClick={() => handleSelectService('ms-pipeline')}
                            >
                              <span className="leaf-indicator" />
                              <span>MS Pipeline Fabrication</span>
                            </div>

                            <div
                              className={`leaf-item ${selectedServiceId === 'ms-powder-coating' ? 'is-selected' : ''}`}
                              onClick={() => handleSelectService('ms-powder-coating')}
                            >
                              <span className="leaf-indicator" />
                              <span>Powder Coating</span>
                            </div>

                            <div
                              className={`leaf-item ${selectedServiceId === 'ms-sand-blasting' ? 'is-selected' : ''}`}
                              onClick={() => handleSelectService('ms-sand-blasting')}
                            >
                              <span className="leaf-indicator" />
                              <span>Sand Blasting &amp; Painting</span>
                            </div>

                            <div
                              className={`leaf-item ${selectedServiceId === 'ms-ndt' ? 'is-selected' : ''}`}
                              onClick={() => handleSelectService('ms-ndt')}
                            >
                              <span className="leaf-indicator" />
                              <span>MS 3rd Party NDT Facility</span>
                            </div>

                            <div
                              className={`leaf-item ${selectedServiceId === 'ms-laser-forming' ? 'is-selected' : ''}`}
                              onClick={() => handleSelectService('ms-laser-forming')}
                            >
                              <span className="leaf-indicator" />
                              <span>Laser Cutting &amp; Forming</span>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  )}

                  {/* ---------------- 2. MACHINING ONLY ---------------- */}
                  {activeCategory === 'machining' && (
                    <div className="active-category-sub-tree">
                      
                      {/* Laser Cutting */}
                      <div
                        className={`leaf-item-direct ${selectedServiceId === 'mach-laser-cutting' ? 'is-selected' : ''}`}
                        onClick={() => handleSelectService('mach-laser-cutting')}
                      >
                        <span className="leaf-indicator" />
                        <span>Laser Cutting</span>
                      </div>

                      {/* Milling (Expandable -> Plano, VMC, Universal) */}
                      <div className="sub-category-group">
                        <div
                          className={`sub-category-header ${selectedServiceId.includes('milling') ? 'active-sub' : ''}`}
                          onClick={() => setOpenMilling(!openMilling)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span className="sub-bullet" />
                            <span className="sub-title">Milling</span>
                          </div>
                          <ChevronDown size={13} className={`sub-chevron ${openMilling ? 'open' : ''}`} />
                        </div>

                        {openMilling && (
                          <div className="leaf-items-list">
                            <div
                              className={`leaf-item ${selectedServiceId === 'mach-plano-milling' ? 'is-selected' : ''}`}
                              onClick={() => handleSelectService('mach-plano-milling')}
                            >
                              <span className="leaf-indicator" />
                              <span>Plano Milling</span>
                            </div>

                            <div
                              className={`leaf-item ${selectedServiceId === 'mach-vmc-milling' ? 'is-selected' : ''}`}
                              onClick={() => handleSelectService('mach-vmc-milling')}
                            >
                              <span className="leaf-indicator" />
                              <span>VMC Milling</span>
                            </div>

                            <div
                              className={`leaf-item ${selectedServiceId === 'mach-universal-milling' ? 'is-selected' : ''}`}
                              onClick={() => handleSelectService('mach-universal-milling')}
                            >
                              <span className="leaf-indicator" />
                              <span>Universal Milling</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Drilling */}
                      <div
                        className={`leaf-item-direct ${selectedServiceId === 'mach-drilling' ? 'is-selected' : ''}`}
                        onClick={() => handleSelectService('mach-drilling')}
                      >
                        <span className="leaf-indicator" />
                        <span>Drilling</span>
                      </div>

                      {/* Turning */}
                      <div
                        className={`leaf-item-direct ${selectedServiceId === 'mach-turning' ? 'is-selected' : ''}`}
                        onClick={() => handleSelectService('mach-turning')}
                      >
                        <span className="leaf-indicator" />
                        <span>Turning</span>
                      </div>

                      {/* Jig-Fixture Work */}
                      <div
                        className={`leaf-item-direct ${selectedServiceId === 'mach-jig-fixture-work' ? 'is-selected' : ''}`}
                        onClick={() => handleSelectService('mach-jig-fixture-work')}
                      >
                        <span className="leaf-indicator" />
                        <span>Jig-Fixture Work</span>
                      </div>

                      {/* Tool-Room Work */}
                      <div
                        className={`leaf-item-direct ${selectedServiceId === 'mach-toolroom-work' ? 'is-selected' : ''}`}
                        onClick={() => handleSelectService('mach-toolroom-work')}
                      >
                        <span className="leaf-indicator" />
                        <span>Tool-Room Work</span>
                      </div>

                      {/* Forming */}
                      <div
                        className={`leaf-item-direct ${selectedServiceId === 'mach-forming' ? 'is-selected' : ''}`}
                        onClick={() => handleSelectService('mach-forming')}
                      >
                        <span className="leaf-indicator" />
                        <span>Forming</span>
                      </div>

                      {/* Grinding & Finishing (Expandable -> Cylindrical, Surface) */}
                      <div className="sub-category-group">
                        <div
                          className={`sub-category-header ${selectedServiceId.includes('grinding') ? 'active-sub' : ''}`}
                          onClick={() => setOpenGrinding(!openGrinding)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span className="sub-bullet" />
                            <span className="sub-title">Grinding &amp; Finishing</span>
                          </div>
                          <ChevronDown size={13} className={`sub-chevron ${openGrinding ? 'open' : ''}`} />
                        </div>

                        {openGrinding && (
                          <div className="leaf-items-list">
                            <div
                              className={`leaf-item ${selectedServiceId === 'mach-cylindrical-grinding' ? 'is-selected' : ''}`}
                              onClick={() => handleSelectService('mach-cylindrical-grinding')}
                            >
                              <span className="leaf-indicator" />
                              <span>Cylindrical Grinding</span>
                            </div>

                            <div
                              className={`leaf-item ${selectedServiceId === 'mach-surface-grinding' ? 'is-selected' : ''}`}
                              onClick={() => handleSelectService('mach-surface-grinding')}
                            >
                              <span className="leaf-indicator" />
                              <span>Surface Grinding</span>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  )}

                  {/* ---------------- 3. CONVEYOR & MATERIAL HANDLING ONLY ---------------- */}
                  {activeCategory === 'conveyor-material-handling' && (
                    <div className="active-category-sub-tree">
                      <div
                        className={`leaf-item-direct ${selectedServiceId === 'conv-belt' ? 'is-selected' : ''}`}
                        onClick={() => handleSelectService('conv-belt')}
                      >
                        <span className="leaf-indicator" />
                        <span>Belt Conveyor</span>
                      </div>

                      <div
                        className={`leaf-item-direct ${selectedServiceId === 'conv-flat' ? 'is-selected' : ''}`}
                        onClick={() => handleSelectService('conv-flat')}
                      >
                        <span className="leaf-indicator" />
                        <span>Flat Conveyor</span>
                      </div>

                      <div
                        className={`leaf-item-direct ${selectedServiceId === 'conv-magnetic' ? 'is-selected' : ''}`}
                        onClick={() => handleSelectService('conv-magnetic')}
                      >
                        <span className="leaf-indicator" />
                        <span>Magnetic Conveyor</span>
                      </div>

                      <div
                        className={`leaf-item-direct ${selectedServiceId === 'conv-trolleys' ? 'is-selected' : ''}`}
                        onClick={() => handleSelectService('conv-trolleys')}
                      >
                        <span className="leaf-indicator" />
                        <span>Industrial Trolleys</span>
                      </div>

                      <div
                        className={`leaf-item-direct ${selectedServiceId === 'conv-pallets' ? 'is-selected' : ''}`}
                        onClick={() => handleSelectService('conv-pallets')}
                      >
                        <span className="leaf-indicator" />
                        <span>Industrial Pallets</span>
                      </div>
                    </div>
                  )}

                  {/* ---------------- 4. JIGS & FIXTURES ONLY ---------------- */}
                  {activeCategory === 'jigs-fixtures' && (
                    <div className="active-category-sub-tree">
                      <div
                        className={`leaf-item-direct ${selectedServiceId === 'jigs-fixtures' ? 'is-selected' : ''}`}
                        onClick={() => handleSelectService('jigs-fixtures')}
                      >
                        <span className="leaf-indicator" />
                        <span>Jigs &amp; Fixtures (Tooling &amp; Clamping)</span>
                      </div>
                    </div>
                  )}

                  {/* ---------------- 5. SPECIAL PURPOSE MACHINES (SPM) ONLY ---------------- */}
                  {activeCategory === 'spm' && (
                    <div className="active-category-sub-tree">
                      <div
                        className={`leaf-item-direct ${selectedServiceId === 'spm-service' ? 'is-selected' : ''}`}
                        onClick={() => handleSelectService('spm-service')}
                      >
                        <span className="leaf-indicator" />
                        <span>Special Purpose Machines (SPM)</span>
                      </div>
                    </div>
                  )}

                </nav>

                {/* Sidebar Quick Footer info */}
                <div className="sidebar-quick-footer">
                  <span className="quick-footer-text">
                    Select a sub-service above or switch categories using the top tabs.
                  </span>
                </div>

              </div>
            </aside>

            {/* =================================================================== */}
            {/* RIGHT SIDE: BALANCED 2-COLUMN DETAIL LAYOUT                         */}
            {/* [IMAGE (45%)] + [CATEGORY, TITLE, DESCRIPTION, SERVICE FOCUS, CTA (55%)] */}
            {/* =================================================================== */}
            <main
              id="catalogue-detail-content-area"
              className="services-detail-main-content"
            >
              <div key={currentService.id} className="selected-service-card animate-detail-fade">
                
                {/* LEFT: SERVICE IMAGE (45%) */}
                <div className="service-detail-image-col">
                  <div className="detail-image-box">
                    <img
                      src={currentService.image}
                      alt={currentService.name}
                      className="detail-featured-img"
                    />
                  </div>
                </div>

                {/* RIGHT: SERVICE INFORMATION (55%) */}
                <div className="service-detail-info-col">
                  
                  {/* 1. Category Tag */}
                  <div className="service-category-badge-wrap">
                    <span className="service-category-label">
                      {activeCategoryObj.label.toUpperCase()}
                    </span>
                    <span className="service-sub-badge">
                      {currentService.categoryLabel}
                    </span>
                  </div>

                  {/* 2. Service Name */}
                  <h2 className="service-title">
                    {currentService.name}
                  </h2>

                  {/* 3. Short Description (approx 25–40 words) */}
                  <p className="service-description">
                    {currentService.description}
                  </p>

                  {/* 4. KEY HIGHLIGHTS (Max 3 Short Points) */}
                  {currentService.highlights && currentService.highlights.length > 0 && (
                    <div className="service-highlights-block">
                      <span className="service-section-eyebrow">KEY HIGHLIGHTS</span>
                      <ul className="service-highlights-list">
                        {currentService.highlights.map((point, idx) => (
                          <li key={idx} className="highlight-item">
                            <span className="highlight-dot" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 5. One Short "Ideal for" Line */}
                  {currentService.idealFor && (
                    <div className="service-ideal-for-wrap">
                      <span className="ideal-for-label">Ideal for:</span>{' '}
                      <span className="ideal-for-text">{currentService.idealFor}</span>
                    </div>
                  )}

                  {/* 6. INQUIRE NOW Action Button */}
                  <div className="service-action-wrap">
                    <button
                      onClick={() => handleInquireNow(currentService.name)}
                      className="service-inquire-btn"
                      id="service-inquire-now-btn"
                    >
                      <span>INQUIRE NOW</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>

                </div>

              </div>
            </main>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. STYLES: CLEAN EDITORIAL VISUAL COMPOSITION, FULL-WIDTH, MAROON ACCENTS */}
      {/* ========================================================================= */}
      <style>{`
        .services-page-root {
          background-color: #ffffff;
          color: #111827;
          min-height: 100vh;
          width: 100%;
        }

        /* Container using full viewport width with clean spacing */
        .services-full-container {
          width: 100%;
          max-width: 1780px;
          margin-left: auto;
          margin-right: auto;
          padding-left: clamp(16px, 2.2vw, 36px);
          padding-right: clamp(16px, 2.2vw, 36px);
        }

        /* 1. TOP HERO SECTION */
        .services-top-hero {
          position: relative;
          min-height: clamp(300px, 25vw, 360px);
          padding-top: clamp(120px, 13.5vw, 150px);
          padding-bottom: clamp(65px, 7.5vw, 85px);
          display: flex;
          align-items: center;
          background-image: url('/images/hero_welding_fabrication.jpg');
          background-size: cover;
          background-position: center 38%;
          background-repeat: no-repeat;
          overflow: hidden;
        }

        .top-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(8, 12, 24, 0.96) 0%, rgba(15, 23, 42, 0.88) 100%);
          pointer-events: none;
        }

        .top-hero-content {
          position: relative;
          z-index: 2;
          max-width: 820px;
        }

        .hero-badge-wrap {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }

        .hero-badge-text {
          font-family: var(--font-tech);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #f1f5f9;
          text-transform: uppercase;
        }

        .hero-badge-line {
          width: 24px;
          height: 2px;
          background-color: #800e13;
          border-radius: 1px;
        }

        .hero-title {
          font-family: var(--font-heading);
          font-size: clamp(32px, 4.5vw, 52px);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.025em;
          color: #ffffff;
          margin: 0;
          text-transform: uppercase;
        }

        .hero-title-accent {
          color: #e03137;
        }

        /* 2. SPLIT LAYOUT SECTION */
        .services-main-layout-section {
          padding: 28px 0 54px;
          background-color: #ffffff;
        }

        /* ----------------------------------------------------------------------- */
        /* CATEGORY SWITCHER TABS STYLING                                          */
        /* ----------------------------------------------------------------------- */
        .category-switcher-wrapper {
          margin-bottom: 24px;
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 14px 18px;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02);
        }

        .category-switcher-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .category-switcher-eyebrow {
          font-family: var(--font-tech);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #64748b;
          text-transform: uppercase;
        }

        .category-tabs-bar {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
        }

        .category-tab-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 14px;
          background-color: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
          position: relative;
          color: #334155;
        }

        .category-tab-button:hover {
          border-color: #800e13;
          color: #800e13;
          background-color: #fff9f9;
          transform: translateY(-1px);
        }

        .category-tab-button.is-active {
          background-color: #800e13;
          border-color: #800e13;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(128, 14, 19, 0.22);
          transform: translateY(-1px);
        }

        .tab-num-tag {
          font-family: var(--font-tech);
          font-size: 11.5px;
          font-weight: 800;
          opacity: 0.75;
          letter-spacing: 0.05em;
        }

        .category-tab-button.is-active .tab-num-tag {
          opacity: 0.9;
          color: #ffffff;
        }

        .tab-title-text {
          font-family: var(--font-heading);
          font-size: 14.5px;
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .services-catalogue-grid {
          display: grid;
          grid-template-columns: minmax(280px, 26%) 1fr;
          gap: 32px;
          align-items: start;
        }

        /* SIDEBAR STYLES */
        .services-sidebar-column {
          position: sticky;
          top: 88px;
          width: 100%;
        }

        .sidebar-container-box {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 4px 18px rgba(15, 23, 42, 0.03);
        }

        .sidebar-top-bar {
          padding: 16px 18px;
          background-color: #0f172a;
          border-bottom: 3px solid #800e13;
        }

        .sidebar-title {
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          line-height: 1.2;
        }

        .sidebar-tree-navigation {
          display: flex;
          flex-direction: column;
        }

        .active-category-sub-tree {
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .sidebar-quick-footer {
          padding: 10px 14px;
          background-color: #f8fafc;
          border-top: 1px solid #f1f5f9;
        }

        .quick-footer-text {
          font-size: 12px;
          color: #64748b;
          line-height: 1.4;
          display: block;
        }

        /* Sub branches */
        .sub-category-group {
          margin: 2px 0;
          border: 1px solid #f1f5f9;
          border-radius: 4px;
          overflow: hidden;
          background-color: #fafbfc;
        }

        .sub-category-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 700;
          color: #334155;
          transition: all 0.15s ease;
          background-color: #f8fafc;
        }

        .sub-category-header:hover {
          background-color: #f1f5f9;
          color: #800e13;
        }

        .sub-category-header.active-sub {
          color: #800e13;
          background-color: #fff1f1;
        }

        .sub-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #800e13;
          margin-right: 8px;
          flex-shrink: 0;
        }

        .sub-title {
          flex: 1;
        }

        .sub-chevron {
          color: #94a3b8;
          transition: transform 0.2s ease;
        }

        .sub-chevron.open {
          transform: rotate(180deg);
        }

        /* Leaf Items */
        .leaf-items-list {
          padding: 4px 6px 6px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          background-color: #ffffff;
        }

        .leaf-item,
        .leaf-item-direct {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 12px;
          font-size: 13.5px;
          color: #475569;
          font-weight: 600;
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.15s ease;
          line-height: 1.35;
          border-left: 2px solid transparent;
        }

        .leaf-item:hover,
        .leaf-item-direct:hover {
          background-color: #f8fafc;
          color: #800e13;
        }

        .leaf-item.is-selected,
        .leaf-item-direct.is-selected {
          background-color: #800e13;
          color: #ffffff;
          font-weight: 700;
          border-left: 2px solid #0f172a;
        }

        .leaf-indicator {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: #cbd5e1;
          flex-shrink: 0;
        }

        .leaf-item.is-selected .leaf-indicator,
        .leaf-item-direct.is-selected .leaf-indicator {
          background-color: #ffffff;
        }

        /* ========================================================================= */
        /* RIGHT SIDE: BALANCED TWO-COLUMN DETAIL SHOWCASE (MEDIUM-SIZED BALANCED)   */
        /* ========================================================================= */
        .services-detail-main-content {
          width: 100%;
        }

        .animate-detail-fade {
          animation: detailFadeIn 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes detailFadeIn {
          from {
            opacity: 0;
            transform: translateY(2px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .selected-service-card {
          width: 100%;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          padding: clamp(32px, 3.2vw, 44px);
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.03);
          display: grid;
          grid-template-columns: minmax(0, 45%) minmax(0, 55%);
          gap: clamp(32px, 3.5vw, 46px);
          align-items: center;
          min-height: 480px;
        }

        /* LEFT: SERVICE IMAGE (45%) */
        .service-detail-image-col {
          width: 100%;
        }

        .detail-image-box {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          max-height: 430px;
          min-height: 310px;
          background-color: #0f172a;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 14px rgba(15, 23, 42, 0.05);
        }

        .detail-featured-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* RIGHT: SERVICE INFORMATION (55%) */
        .service-detail-info-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 14px;
        }

        /* 1. Category Tag */
        .service-category-badge-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .service-category-label {
          font-family: var(--font-tech);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: #800e13;
          text-transform: uppercase;
        }

        .service-sub-badge {
          font-family: var(--font-tech);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #475569;
          background-color: #f1f5f9;
          padding: 3px 8px;
          border-radius: 2px;
          text-transform: uppercase;
        }

        /* 2. Service Title */
        .service-title {
          font-family: var(--font-heading);
          font-size: clamp(26px, 2.8vw, 36px);
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          line-height: 1.22;
          letter-spacing: -0.015em;
        }

        /* 3. Short 1-Sentence Description */
        .service-description {
          font-size: 16.5px;
          line-height: 1.65;
          color: #475569;
          margin: 0;
          max-width: 600px;
        }

        /* 4. Key Highlights Block */
        .service-highlights-block {
          margin-top: 2px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .service-section-eyebrow {
          font-family: var(--font-tech);
          font-size: 12px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* Highlights List */
        .service-highlights-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .highlight-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          font-weight: 600;
          color: #1e293b;
        }

        .highlight-dot {
          width: 6.5px;
          height: 6.5px;
          border-radius: 50%;
          background-color: #800e13;
          flex-shrink: 0;
        }

        /* 5. Ideal for Line */
        .service-ideal-for-wrap {
          font-size: 14.5px;
          line-height: 1.55;
          margin-top: 2px;
          padding-top: 6px;
          border-top: 1px dashed #e2e8f0;
        }

        .ideal-for-label {
          font-family: var(--font-tech);
          font-size: 12px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-right: 4px;
        }

        .ideal-for-text {
          font-size: 14.5px;
          color: #475569;
          font-weight: 500;
        }

        /* 6. Inquire Button */
        .service-action-wrap {
          padding-top: 4px;
        }

        .service-inquire-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 32px;
          background-color: #800e13;
          color: #ffffff;
          font-family: var(--font-tech);
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.2s ease;
          box-shadow: 0 3px 14px rgba(128, 14, 19, 0.24);
        }

        .service-inquire-btn:hover {
          background-color: #670b10;
          transform: translateY(-2px);
        }

        /* MOBILE BAR (< 992px) */
        .mobile-category-bar {
          display: none;
          margin-bottom: 18px;
        }

        .mobile-category-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background-color: #0f172a;
          color: #ffffff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .mobile-btn-copy {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
        }

        .mobile-btn-tag {
          font-family: var(--font-tech);
          font-size: 9px;
          font-weight: 700;
          color: #e03137;
          letter-spacing: 0.1em;
        }

        .mobile-btn-title {
          font-family: var(--font-heading);
          font-size: 13.5px;
          font-weight: 700;
        }

        .mobile-chevron {
          transition: transform 0.2s ease;
        }

        .mobile-chevron.open {
          transform: rotate(180deg);
        }

        /* ========================================================================= */
        /* RESPONSIVE BREAKPOINTS                                                    */
        /* ========================================================================= */
        @media (max-width: 1200px) {
          .category-tabs-bar {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 991px) {
          .category-tabs-bar {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .category-tab-button {
            min-width: 0;
          }

          .tab-title-text {
            white-space: normal;
            font-size: 13.5px;
            line-height: 1.25;
            word-break: break-word;
          }

          .services-catalogue-grid {
            grid-template-columns: 1fr;
          }

          .services-sidebar-column {
            display: none;
          }

          .services-sidebar-column.mobile-visible {
            display: block;
            position: static;
            margin-bottom: 20px;
          }

          .services-sidebar-column.mobile-visible .sidebar-container-box {
            max-height: 65vh;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }

          .mobile-category-bar {
            display: block;
          }

          .selected-service-card {
            grid-template-columns: 1fr;
            gap: 22px;
            padding: 22px;
            min-height: auto;
          }

          .detail-image-box {
            max-height: 320px;
            min-height: auto;
            aspect-ratio: 16 / 10;
          }
        }

        @media (max-width: 640px) {
          .category-tabs-bar {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
          }

          .category-tab-button {
            padding: 10px 10px;
            gap: 6px;
            min-width: 0;
          }

          .tab-num-tag {
            font-size: 11px;
          }

          .tab-title-text {
            font-size: 12.5px;
            white-space: normal;
            line-height: 1.22;
            word-break: break-word;
          }

          .service-title {
            font-size: 23px;
          }

          .service-inquire-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .category-switcher-wrapper {
            padding: 10px 10px;
            margin-bottom: 16px;
          }
          .category-tabs-bar {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
          }
          .category-tab-button {
            padding: 8px 8px;
            gap: 5px;
            min-width: 0;
          }
          .tab-num-tag {
            font-size: 10px;
          }
          .tab-title-text {
            font-size: 11.5px;
            line-height: 1.2;
            white-space: normal;
            word-break: break-word;
          }
          .selected-service-card {
            padding: 16px;
            gap: 16px;
          }
          .detail-image-box {
            max-height: 220px;
          }
          .service-title {
            font-size: 20px;
          }
          .service-description {
            font-size: 14.5px;
            line-height: 1.55;
          }
          .highlight-item {
            font-size: 13.5px;
          }
        }

        @media (max-width: 375px) {
          .category-switcher-wrapper {
            padding: 8px 8px;
          }
          .category-tabs-bar {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 6px;
          }
          .category-tab-button {
            padding: 7px 6px;
            gap: 4px;
          }
          .tab-num-tag {
            font-size: 9.5px;
          }
          .tab-title-text {
            font-size: 10.5px;
            line-height: 1.15;
          }
        }
      `}</style>
    </div>
  );
}


