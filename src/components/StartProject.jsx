import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Phone, Mail, MapPin, ArrowRight, CheckCircle2, ShieldCheck, Clock, Send } from 'lucide-react';

export default function StartProject() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    requirement: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        company: formData.company.trim() || 'N/A',
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        message: formData.requirement.trim(),
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
        setFormData({ name: '', company: '', email: '', phone: '', requirement: '' });
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setIsSubmitting(false);
      alert('Unable to send inquiry right now. Please call +91 9370741361 or try again.');
    }
  };

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        paddingTop: '110px',
        paddingBottom: '110px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}
    >
      {/* Subtle CAD Coordinate Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ maxWidth: '760px', marginBottom: '56px' }}>
          <div className="eyebrow-label" style={{ marginBottom: '12px' }}>
            <span className="eyebrow-dot" />
            <span>START AN ENGINEERING PROJECT</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 3.8vw, 44px)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              color: '#111827',
              margin: '0 0 10px 0',
              textTransform: 'uppercase'
            }}
          >
            CONTACT OUR{' '}
            <span
              style={{
                color: '#c52227',
                fontFamily: 'var(--font-tech)',
                fontWeight: 800,
                letterSpacing: '0.04em'
              }}
            >
              ENGINEERING TEAM
            </span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(14.5px, 1.2vw, 16.5px)',
              lineHeight: 1.65,
              color: '#64748b',
              margin: 0
            }}
          >
            Discuss your manufacturing requirements, send 2D/3D part drawings, or request technical quotes for custom tooling, fixtures, SPMs, and industrial fabrication.
          </p>
        </div>

        {/* 2-Column Precision Industrial Contact Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1.3fr)',
            gap: 'clamp(36px, 5vw, 68px)',
            alignItems: 'start'
          }}
          className="contact-layout-grid"
        >
          {/* ===================================================================== */}
          {/* LEFT COLUMN: AUTHENTIC COMPANY DETAILS & DIRECT CONTACT CHANNELS       */}
          {/* ===================================================================== */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Direct Telephone Contacts */}
            <div style={{ borderBottom: '1px solid #f1f3f5', paddingBottom: '24px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#94a3b8',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '12px'
                }}
              >
                DIRECT ENGINEERING CONTACTS
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#111827' }}>Abhishek Marotkar</div>
                    <div style={{ fontSize: '12.5px', color: '#64748b' }}>Operations & Technical Inquiries</div>
                  </div>
                  <a
                    href="tel:+919370741361"
                    style={{
                      fontFamily: 'var(--font-tech)',
                      fontSize: '14.5px',
                      fontWeight: 700,
                      color: '#c52227',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Phone size={14} />
                    <span>+91 9370741361</span>
                  </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#111827' }}>Santos Marotkar</div>
                    <div style={{ fontSize: '12.5px', color: '#64748b' }}>Proprietor & Engineering Lead</div>
                  </div>
                  <a
                    href="tel:+919822327460"
                    style={{
                      fontFamily: 'var(--font-tech)',
                      fontSize: '14.5px',
                      fontWeight: 700,
                      color: '#c52227',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Phone size={14} />
                    <span>+91 9822327460</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Email & Works Address */}
            <div style={{ borderBottom: '1px solid #f1f3f5', paddingBottom: '24px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#94a3b8',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '12px'
                }}
              >
                ADDRESS
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' }}>
                <MapPin size={18} color="#c52227" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#111827', marginBottom: '3px' }}>
                    Mauli Krupa Precision Works
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#4b5563', lineHeight: 1.55 }}>
                    S. No. 222/3, Gurukrupa Colony,<br />
                    Sant Tukaram Nagar, Bhosari,<br />
                    Pune, Maharashtra 411039
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mail size={16} color="#c52227" style={{ flexShrink: 0 }} />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  style={{
                    fontSize: '14px',
                    fontFamily: 'var(--font-tech)',
                    fontWeight: 600,
                    color: '#111827',
                    textDecoration: 'none'
                  }}
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>

            {/* Tax Verification & Hours */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4b5563' }}>
                <ShieldCheck size={16} color="#0e8a44" />
                <span style={{ fontFamily: 'var(--font-tech)' }}>GSTIN: {COMPANY_INFO.taxIdentifiers.gstin}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4b5563' }}>
                <Clock size={16} color="#64748b" />
                <span>Working Hours: Mon – Sat, 8:30 AM – 7:30 PM</span>
              </div>
            </div>

          </div>

          {/* ===================================================================== */}
          {/* RIGHT COLUMN: REFINED INDUSTRIAL RFQ SPECIFICATION FORM               */}
          {/* ===================================================================== */}
          <div
            style={{
              backgroundColor: '#fbfcfd',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              padding: 'clamp(28px, 4vw, 44px)',
              position: 'relative'
            }}
          >
            {/* Top Corner Spec Coordinate */}
            <span style={{ position: 'absolute', top: '10px', right: '14px', fontFamily: 'var(--font-tech)', fontSize: '10px', color: '#94a3b8' }}>
              + [SPEC: RFQ_INQUIRY_FORM]
            </span>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(14, 138, 68, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}
                >
                  <CheckCircle2 size={28} color="#0e8a44" />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
                  Inquiry Received Successfully
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, maxWidth: '420px', margin: '0 auto 24px' }}>
                  Thank you, <strong>{formData.name}</strong>. Our engineering team at Bhosari MIDC will review your specifications and contact you within 24 business hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', company: '', email: '', phone: '', requirement: '' });
                  }}
                  style={{
                    padding: '9px 18px',
                    backgroundColor: '#111827',
                    color: '#ffffff',
                    fontFamily: 'var(--font-tech)',
                    fontSize: '13px',
                    fontWeight: 600,
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                
                <div style={{ marginBottom: '4px' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '20px',
                      fontWeight: 800,
                      color: '#111827',
                      margin: '0 0 4px 0',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    Submit Project Inquiry
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                    Please fill in your details below. All technical inquiries are handled confidentially.
                  </p>
                </div>

                {/* Name & Company */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontFamily: 'var(--font-tech)', fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rajesh Patil"
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        fontSize: '14px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '3px',
                        color: '#111827',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#c52227'}
                      onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontFamily: 'var(--font-tech)', fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Automotive OEM Pvt Ltd"
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        fontSize: '14px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '3px',
                        color: '#111827',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#c52227'}
                      onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontFamily: 'var(--font-tech)', fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. name@company.com"
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        fontSize: '14px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '3px',
                        color: '#111827',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#c52227'}
                      onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontFamily: 'var(--font-tech)', fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 9876543210"
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        fontSize: '14px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '3px',
                        color: '#111827',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#c52227'}
                      onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                    />
                  </div>
                </div>

                {/* Requirement / Message */}
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontFamily: 'var(--font-tech)', fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Requirement / Project Specifications *
                  </label>
                  <textarea
                    name="requirement"
                    required
                    rows={4}
                    value={formData.requirement}
                    onChange={handleChange}
                    placeholder="Briefly describe your tooling, fixture, conveyor, SPM machine or fabrication requirement..."
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      fontSize: '14px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '3px',
                      color: '#111827',
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#c52227'}
                    onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                  />
                </div>

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '13px 24px',
                    backgroundColor: '#c52227',
                    color: '#ffffff',
                    fontFamily: 'var(--font-tech)',
                    fontSize: '14.5px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    borderRadius: '3px',
                    border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 14px rgba(197, 34, 39, 0.3)',
                    transition: 'all 0.25s ease',
                    marginTop: '4px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor = '#b31b20';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor = '#c52227';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <Send size={15} />
                  <span>{isSubmitting ? 'TRANSMITTING SPECIFICATION...' : 'SUBMIT ENGINEERING INQUIRY'}</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
