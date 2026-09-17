import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Select a Service',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const serviceParam = searchParams.get('service') || location.state?.service;
    if (serviceParam) {
      setFormData((prev) => ({ ...prev, service: serviceParam }));
    }
  }, [searchParams, location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your full name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your phone number';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid phone number (min. 10 digits)';
    }
    if (!formData.service.trim() || formData.service === 'Select a Service') {
      newErrors.service = 'Please select a requirement';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide your project or requirement details';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setErrors({});

    try {
      const payload = {
        name: formData.name.trim(),
        company: formData.company.trim() || 'N/A',
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: formData.service,
        message: formData.message.trim(),
        _subject: 'New Website Enquiry - Mauli Krupa Precision Works',
        _template: 'table',
        _captcha: 'false',
        _replyto: formData.email.trim()
      };

      const response = await fetch('https://formsubmit.co/ajax/smauli.krupa@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && (result.success === 'true' || result.success === true || result.message)) {
        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          service: 'Select a Service',
          message: ''
        });
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Contact Form Submission Error:', err);
      setIsSubmitting(false);
      setSubmitError('Unable to send your enquiry. Please try again.');
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmitError(null);
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      service: 'Select a Service',
      message: ''
    });
    setErrors({});
  };

  const mapAddress = "S. No. 222/3, Gurukrupa Colony, Sant Tukaram Nagar, Bhosari, Pune, Maharashtra 411039";
  const mapQuery = encodeURIComponent("Mauli Krupa Precision Works, S. No. 222/3, Gurukrupa Colony, Sant Tukaram Nagar, Bhosari, Pune, Maharashtra 411039");
  const googleMapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Mauli Krupa Precision Works, S. No. 222/3, Gurukrupa Colony, Sant Tukaram Nagar, Bhosari, Pune, Maharashtra 411039")}`;

  return (
    <div className="contact-page-wrapper" style={{ backgroundColor: '#ffffff', color: '#111827', overflow: 'hidden' }}>
      
      {/* ========================================================================= */}
      {/* SECTION 1 — CINEMATIC CONTACT HERO (Dark Industrial CNC Milling Background)*/}
      {/* ========================================================================= */}
      <section
        id="contact-hero"
        style={{
          position: 'relative',
          minHeight: 'clamp(460px, 60vh, 580px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 'calc(var(--nav-height, 80px) + 40px)',
          paddingBottom: '50px',
          backgroundColor: '#0a1128',
          color: '#ffffff',
          overflow: 'hidden'
        }}
      >
        {/* Cinematic Background Image with Slow Subtle Ambient Zoom */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/contact_hero_cnc.jpg)',
            backgroundPosition: 'center 40%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            animation: 'subtleHeroZoom 24s ease-in-out infinite alternate',
            zIndex: 0
          }}
        />

        {/* Dark Cinematic Industrial Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(10, 17, 40, 0.92) 0%, rgba(10, 17, 40, 0.82) 45%, rgba(10, 17, 40, 0.6) 100%)',
            zIndex: 1
          }}
        />

        {/* Hero Content */}
        <div className="container-custom" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div style={{ maxWidth: '680px' }}>
            {/* Eyebrow Label */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-heading)',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: '#c52227',
                marginBottom: '18px'
              }}
            >
              <span style={{ width: '18px', height: '2px', backgroundColor: '#c52227', display: 'inline-block' }} />
              <span>CONTACT</span>
            </div>

            {/* Main Heading with Red Accent */}
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(40px, 5.8vw, 76px)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                margin: '0 0 22px 0',
                textTransform: 'uppercase'
              }}
            >
              LET'S BUILD
              <br />
              WITH <span style={{ color: '#c52227' }}>PRECISION.</span>
            </h1>

            {/* Supporting Text */}
            <p
              style={{
                fontSize: 'clamp(15.5px, 1.3vw, 19px)',
                lineHeight: 1.65,
                color: '#cbd5e1',
                margin: 0,
                maxWidth: '560px',
                fontWeight: 400
              }}
            >
              Have a requirement? Let's discuss how our precision engineering and manufacturing capabilities can support your project.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2 — CONTACT FORM + CONTACT INFORMATION (Spacious 2-Column Layout)  */}
      {/* ========================================================================= */}
      <section
        id="contact-form-section"
        style={{
          paddingTop: 'clamp(60px, 9vh, 100px)',
          paddingBottom: 'clamp(60px, 9vh, 100px)',
          backgroundColor: '#fafbfc'
        }}
      >
        <div className="container-custom">
          <div
            className="contact-two-col-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.75fr)',
              gap: 'clamp(40px, 6vw, 84px)',
              alignItems: 'start'
            }}
          >
            {/* LEFT SIDE: ENQUIRY FORM */}
            <div>
              {/* Eyebrow */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: '#c52227',
                  marginBottom: '12px'
                }}
              >
                <span style={{ width: '16px', height: '2px', backgroundColor: '#c52227', display: 'inline-block' }} />
                <span>SEND US A MESSAGE</span>
              </div>

              {/* Heading */}
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(28px, 3.6vw, 44px)',
                  fontWeight: 800,
                  letterSpacing: '-0.025em',
                  color: '#0a1128',
                  margin: '0 0 12px 0'
                }}
              >
                Get in Touch With Our Team
              </h2>

              {/* Subtext */}
              <p
                style={{
                  fontSize: '15px',
                  color: '#4b5563',
                  lineHeight: 1.6,
                  margin: '0 0 32px 0'
                }}
              >
                Share your requirement with us. Our team will get back to you shortly.
              </p>

              {/* The Form */}
              {submitted ? (
                <div
                  style={{
                    padding: '36px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '2px',
                    textAlign: 'left'
                  }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      backgroundColor: 'rgba(14, 138, 68, 0.1)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}
                  >
                    <CheckCircle2 size={26} color="#0e8a44" />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '22px',
                      fontWeight: 800,
                      color: '#0a1128',
                      margin: '0 0 8px 0',
                      textTransform: 'uppercase'
                    }}
                  >
                    Your enquiry has been sent successfully.
                  </h3>

                  <p style={{ fontSize: '14.5px', color: '#4b5563', lineHeight: 1.6, margin: '0 0 24px 0' }}>
                    Thank you for reaching out to Mauli Krupa Precision Works. Our technical team at Bhosari MIDC will review your specifications and contact you soon.
                  </p>

                  <button
                    onClick={handleReset}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#0a1128',
                      color: '#ffffff',
                      fontFamily: 'var(--font-tech)',
                      fontSize: '13px',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      border: 'none',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c52227'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0a1128'}
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* FormSubmit Configuration Fields */}
                  <input type="hidden" name="_subject" value="New Website Enquiry - Mauli Krupa Precision Works" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_replyto" value={formData.email} />

                  {/* Row 1: Full Name & Company Name */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '24px'
                    }}
                  >
                    <div className="editorial-form-group">
                      <label className="editorial-form-label">
                        Full Name <span style={{ color: '#c52227' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Rajesh Patil"
                        className={`editorial-form-input ${errors.name ? 'has-error' : ''}`}
                      />
                      {errors.name && <span className="editorial-form-error">{errors.name}</span>}
                    </div>

                    <div className="editorial-form-group">
                      <label className="editorial-form-label">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="e.g. ABC Industries"
                        className="editorial-form-input"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email Address & Phone Number */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '24px'
                    }}
                  >
                    <div className="editorial-form-group">
                      <label className="editorial-form-label">
                        Email Address <span style={{ color: '#c52227' }}>*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. name@company.com"
                        className={`editorial-form-input ${errors.email ? 'has-error' : ''}`}
                      />
                      {errors.email && <span className="editorial-form-error">{errors.email}</span>}
                    </div>

                    <div className="editorial-form-group">
                      <label className="editorial-form-label">
                        Phone Number <span style={{ color: '#c52227' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +91 98765 43210"
                        className={`editorial-form-input ${errors.phone ? 'has-error' : ''}`}
                      />
                      {errors.phone && <span className="editorial-form-error">{errors.phone}</span>}
                    </div>
                  </div>

                  {/* Row 3: Product or Service Requirement */}
                  <div className="editorial-form-group">
                    <label className="editorial-form-label">
                      Product or Service Requirement <span style={{ color: '#c52227' }}>*</span>
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className={`editorial-form-input editorial-form-select ${errors.service ? 'has-error' : ''}`}
                      style={{ cursor: 'pointer' }}
                    >
                      <option value="Select a Service">Select a Service</option>
                      
                      {/* Dynamic fallback if service is passed from Services page and not in static options */}
                      {formData.service &&
                        formData.service !== 'Select a Service' &&
                        ![
                          'Industrial Fabrication',
                          'SS Fabrication',
                          'Tube Structure & Channel Angle Fabrication',
                          'SS Ducting Fabrication',
                          'SS Tank Fabrication',
                          'SS Pipeline Fabrication',
                          'Polishing & Buffing Work',
                          'Passivation & Pickling Work',
                          'SS 3rd Party NDT Facility',
                          'Glass Blasting',
                          'Laser Cutting',
                          'MS Fabrication',
                          'Square Tube, Channel & I-Beam Fabrication',
                          'MS Ducting Work',
                          'MS Tank Fabrication',
                          'MS Pipeline Fabrication',
                          'Powder Coating',
                          'Sand Blasting & Painting',
                          'MS 3rd Party NDT Facility',
                          'Laser Cutting & Forming',
                          'Precision Machining',
                          'Milling',
                          'Plano Milling',
                          'VMC Milling',
                          'Universal Milling',
                          'Drilling',
                          'Turning',
                          'Jig-Fixture Work',
                          'Tool-Room Work',
                          'Forming',
                          'Grinding & Finishing',
                          'Cylindrical Grinding',
                          'Surface Grinding',
                          'Conveyor & Material Handling',
                          'Belt Conveyor',
                          'Flat Conveyor',
                          'Magnetic Conveyor',
                          'Industrial Trolleys',
                          'Industrial Pallets',
                          'Jigs & Fixtures',
                          'Welding Jigs & Fixtures',
                          'Machining Fixtures',
                          'Assembly Fixtures',
                          'Inspection Fixtures',
                          'Custom Component Holding Fixtures',
                          'Special Purpose Machines (SPM)',
                          'Customized Special Purpose Machines',
                          'Automated Production Machines',
                          'Material Handling & Transfer Mechanisms',
                          'Custom Machine Structures',
                          'Component Positioning & Clamping Systems',
                          'Application-Specific Automation Solutions',
                          'Other'
                        ].includes(formData.service) && (
                          <option value={formData.service}>{formData.service}</option>
                        )}

                      <optgroup label="01 Industrial Fabrication">
                        <option value="Industrial Fabrication">Industrial Fabrication (Overview)</option>
                        <option value="SS Fabrication">SS Fabrication (Overview)</option>
                        <option value="Tube Structure & Channel Angle Fabrication">Tube Structure & Channel Angle Fabrication</option>
                        <option value="SS Ducting Fabrication">SS Ducting Fabrication</option>
                        <option value="SS Tank Fabrication">SS Tank Fabrication</option>
                        <option value="SS Pipeline Fabrication">SS Pipeline Fabrication</option>
                        <option value="Polishing & Buffing Work">Polishing & Buffing Work</option>
                        <option value="Passivation & Pickling Work">Passivation & Pickling Work</option>
                        <option value="SS 3rd Party NDT Facility">SS 3rd Party NDT Facility</option>
                        <option value="Glass Blasting">Glass Blasting</option>
                        <option value="Laser Cutting">Laser Cutting</option>
                        <option value="MS Fabrication">MS Fabrication (Overview)</option>
                        <option value="Square Tube, Channel & I-Beam Fabrication">Square Tube, Channel & I-Beam Fabrication</option>
                        <option value="MS Ducting Work">MS Ducting Work</option>
                        <option value="MS Tank Fabrication">MS Tank Fabrication</option>
                        <option value="MS Pipeline Fabrication">MS Pipeline Fabrication</option>
                        <option value="Powder Coating">Powder Coating</option>
                        <option value="Sand Blasting & Painting">Sand Blasting & Painting</option>
                        <option value="MS 3rd Party NDT Facility">MS 3rd Party NDT Facility</option>
                        <option value="Laser Cutting & Forming">Laser Cutting & Forming</option>
                      </optgroup>

                      <optgroup label="02 Machining">
                        <option value="Precision Machining">Precision Machining (Overview)</option>
                        <option value="Laser Cutting">Laser Cutting</option>
                        <option value="Milling">Milling (Overview)</option>
                        <option value="Plano Milling">Plano Milling</option>
                        <option value="VMC Milling">VMC Milling</option>
                        <option value="Universal Milling">Universal Milling</option>
                        <option value="Drilling">Drilling</option>
                        <option value="Turning">Turning</option>
                        <option value="Jig-Fixture Work">Jig-Fixture Work</option>
                        <option value="Tool-Room Work">Tool-Room Work</option>
                        <option value="Forming">Forming</option>
                        <option value="Grinding & Finishing">Grinding & Finishing (Overview)</option>
                        <option value="Cylindrical Grinding">Cylindrical Grinding</option>
                        <option value="Surface Grinding">Surface Grinding</option>
                      </optgroup>

                      <optgroup label="03 Conveyor & Material Handling">
                        <option value="Conveyor & Material Handling">Conveyor & Material Handling (Overview)</option>
                        <option value="Belt Conveyor">Belt Conveyor</option>
                        <option value="Flat Conveyor">Flat Conveyor</option>
                        <option value="Magnetic Conveyor">Magnetic Conveyor</option>
                        <option value="Industrial Trolleys">Industrial Trolleys</option>
                        <option value="Industrial Pallets">Industrial Pallets</option>
                      </optgroup>

                      <optgroup label="04 Jigs & Fixtures">
                        <option value="Jigs & Fixtures">Jigs & Fixtures (Overview)</option>
                        <option value="Welding Jigs & Fixtures">Welding Jigs & Fixtures</option>
                        <option value="Machining Fixtures">Machining Fixtures</option>
                        <option value="Assembly Fixtures">Assembly Fixtures</option>
                        <option value="Inspection Fixtures">Inspection Fixtures</option>
                        <option value="Custom Component Holding Fixtures">Custom Component Holding Fixtures</option>
                      </optgroup>

                      <optgroup label="05 Special Purpose Machines (SPM)">
                        <option value="Special Purpose Machines (SPM)">Special Purpose Machines (SPM)</option>
                        <option value="Customized Special Purpose Machines">Customized Special Purpose Machines</option>
                        <option value="Automated Production Machines">Automated Production Machines</option>
                        <option value="Material Handling & Transfer Mechanisms">Material Handling & Transfer Mechanisms</option>
                        <option value="Custom Machine Structures">Custom Machine Structures</option>
                        <option value="Component Positioning & Clamping Systems">Component Positioning & Clamping Systems</option>
                        <option value="Application-Specific Automation Solutions">Application-Specific Automation Solutions</option>
                      </optgroup>

                      <option value="Other">Other Custom Requirement</option>
                    </select>
                    {errors.service && <span className="editorial-form-error">{errors.service}</span>}
                  </div>

                  {/* Row 4: Message */}
                  <div className="editorial-form-group">
                    <label className="editorial-form-label">
                      Message <span style={{ color: '#c52227' }}>*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Briefly describe your tooling, fixture, machining, conveyor or fabrication requirement..."
                      className={`editorial-form-input editorial-form-textarea ${errors.message ? 'has-error' : ''}`}
                    />
                    {errors.message && <span className="editorial-form-error">{errors.message}</span>}
                  </div>

                  {/* Submit Button */}
                  <div style={{ paddingTop: '8px' }}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="editorial-submit-btn"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        padding: '16px 36px',
                        backgroundColor: '#c52227',
                        color: '#ffffff',
                        fontFamily: 'var(--font-tech)',
                        fontSize: '14px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        border: 'none',
                        borderRadius: '2px',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: '0 4px 14px rgba(197, 34, 39, 0.25)'
                      }}
                    >
                      <span>{isSubmitting ? 'SENDING...' : 'SEND INQUIRY'}</span>
                      <ArrowRight size={16} className="btn-arrow-icon" />
                    </button>

                    {submitError && (
                      <div
                        style={{
                          marginTop: '14px',
                          padding: '12px 16px',
                          backgroundColor: '#fef2f2',
                          border: '1px solid #fecaca',
                          borderRadius: '2px',
                          color: '#c52227',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '14px',
                          fontWeight: 600,
                          lineHeight: 1.4
                        }}
                      >
                        {submitError}
                      </div>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* RIGHT SIDE: DIRECT ENQUIRIES / CONTACT DETAILS */}
            <div style={{ paddingLeft: 'clamp(0px, 2vw, 24px)', borderLeft: '1px solid #e5e7eb' }} className="contact-right-col">
              {/* Eyebrow */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-tech)',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: '#c52227',
                  marginBottom: '12px'
                }}
              >
                <span style={{ width: '16px', height: '2px', backgroundColor: '#c52227', display: 'inline-block' }} />
                <span>CONTACT DETAILS</span>
              </div>

              {/* Company Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '24px',
                  fontWeight: 900,
                  color: '#0a1128',
                  margin: '0 0 6px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em'
                }}
              >
                MAULI KRUPA PRECISION WORKS
              </h3>

              <p style={{ fontSize: '14.5px', color: '#4b5563', margin: '0 0 32px 0' }}>
                Let's discuss your requirement.
              </p>

              {/* Contact Information List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                {/* Phone */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(197, 34, 39, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  >
                    <Phone size={18} color="#c52227" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <a
                        href="tel:+919822327460"
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '17px',
                          fontWeight: 700,
                          color: '#0a1128',
                          textDecoration: 'none'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#c52227'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#0a1128'}
                      >
                        +91 9822327460
                      </a>
                      <a
                        href="tel:+919370741361"
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '15px',
                          fontWeight: 600,
                          color: '#4b5563',
                          textDecoration: 'none'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#c52227'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#4b5563'}
                      >
                        +91 9370741361
                      </a>
                    </div>
                    <span style={{ fontSize: '12.5px', color: '#6b7280' }}>Call us for enquiries</span>
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(197, 34, 39, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  >
                    <Mail size={18} color="#c52227" />
                  </div>
                  <div>
                    <a
                      href="mailto:smauli.krupa@gmail.com"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '16.5px',
                        fontWeight: 700,
                        color: '#0a1128',
                        textDecoration: 'none',
                        display: 'block'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#c52227'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#0a1128'}
                    >
                      smauli.krupa@gmail.com
                    </a>
                    <span style={{ fontSize: '12.5px', color: '#6b7280' }}>Send us an email</span>
                  </div>
                </div>

                {/* Location */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(197, 34, 39, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  >
                    <MapPin size={18} color="#c52227" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '14px',
                        color: '#374151',
                        lineHeight: 1.6,
                        marginBottom: '4px'
                      }}
                    >
                      S. No. 222/3, Gurukrupa Colony,<br />
                      Sant Tukaram Nagar, Bhosari,<br />
                      Pune, Maharashtra 411039
                    </div>
                    <span style={{ fontSize: '12.5px', color: '#6b7280' }}>Visit our facility</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — LOCATION / MAP (Full-Width Map Showing MAULI KRUPA PRECISION) */}
      {/* ========================================================================= */}
      <section
        id="contact-map-section"
        style={{
          backgroundColor: '#0a1128',
          color: '#ffffff',
          paddingTop: 'clamp(50px, 7vh, 70px)',
          paddingBottom: 'clamp(60px, 8vh, 80px)',
          position: 'relative'
        }}
      >
        <div className="container-custom" style={{ marginBottom: '24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: '#c52227',
                  marginBottom: '10px'
                }}
              >
                <span style={{ width: '16px', height: '2px', backgroundColor: '#c52227', display: 'inline-block' }} />
                <span>OUR LOCATION</span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(30px, 4vw, 44px)',
                  fontWeight: 900,
                  color: '#ffffff',
                  margin: 0,
                  letterSpacing: '-0.02em'
                }}
              >
                Find Us
              </h2>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '12.5px',
                color: '#cbd5e1',
                lineHeight: 1.5,
                textAlign: 'right'
              }}
            >
              <strong style={{ color: '#ffffff', display: 'block' }}>MAULI KRUPA PRECISION WORKS</strong>
              <span>S. No. 222/3, Gurukrupa Colony, Sant Tukaram Nagar, Bhosari, Pune, Maharashtra 411039</span>
            </div>
          </div>
        </div>

        {/* Full-Width Clean Landscape Map Container */}
        <div className="container-custom">
          <div
            style={{
              position: 'relative',
              borderRadius: '2px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backgroundColor: '#111827',
              height: 'clamp(420px, 50vh, 520px)',
              width: '100%',
              boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5)'
            }}
          >
            <iframe
              title="Mauli Krupa Precision Works Location Map"
              src={googleMapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Direct Navigation Button below Map */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '16px'
            }}
          >
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                fontFamily: 'var(--font-heading)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '2px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#c52227';
                e.currentTarget.style.borderColor = '#c52227';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>GET DIRECTIONS IN GOOGLE MAPS</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Component Specific CSS Animations & Styles */}
      <style>{`
        @keyframes subtleHeroZoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.04);
          }
        }

        .editorial-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .editorial-form-label {
          font-family: var(--font-tech);
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #374151;
          text-transform: uppercase;
        }

        .editorial-form-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid #cbd5e1;
          padding: 8px 0;
          font-family: var(--font-body);
          font-size: 15px;
          color: #111827;
          outline: none;
          border-radius: 0;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .editorial-form-input:focus {
          border-bottom-color: #0a1128;
          box-shadow: 0 1px 0 0 #c52227;
        }

        .editorial-form-input.has-error {
          border-bottom-color: #dc2626 !important;
        }

        .editorial-form-error {
          font-family: var(--font-tech);
          font-size: 11px;
          color: #dc2626;
          margin-top: 3px;
        }

        .editorial-form-textarea {
          resize: vertical;
          min-height: 75px;
          line-height: 1.55;
        }

        .editorial-submit-btn:hover {
          background-color: #b31b20 !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(197, 34, 39, 0.35) !important;
        }

        .editorial-submit-btn:hover .btn-arrow-icon {
          transform: translateX(4px);
        }

        .btn-arrow-icon {
          transition: transform 0.2s ease;
        }

        @media (max-width: 900px) {
          #contact-hero {
            min-height: auto !important;
            padding-top: calc(var(--nav-height, 70px) + 24px) !important;
            padding-bottom: 36px !important;
          }
          #contact-form-section {
            padding-top: 40px !important;
            padding-bottom: 40px !important;
          }
          #contact-map-section {
            padding-top: 36px !important;
            padding-bottom: 40px !important;
          }
          .hero-grid-layout {
            grid-template-columns: 1fr !important;
          }
          .hero-right-triad {
            display: none !important;
          }
          .contact-two-col-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .contact-right-col {
            padding-left: 0 !important;
            border-left: none !important;
            border-top: 1px solid #e5e7eb;
            padding-top: 28px;
          }
        }

        @media (max-width: 600px) {
          #contact-form-section {
            padding-top: 32px !important;
            padding-bottom: 32px !important;
          }
          #contact-map-section {
            padding-top: 28px !important;
            padding-bottom: 32px !important;
          }
          .editorial-submit-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
}
