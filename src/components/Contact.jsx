import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Phone, Mail, MapPin, Building2, Send, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    requirement: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
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
        setFormData({ name: '', company: '', phone: '', email: '', requirement: '' });
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setIsSubmitting(false);
      setSubmitError('Unable to send enquiry. Please try again.');
    }
  };

  return (
    <section 
      id="contact"
      style={{
        position: 'relative',
        paddingTop: '130px',
        paddingBottom: '130px',
        background: '#090a0d',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div className="container-custom">
        
        {/* Contact Eyebrow & Title */}
        <div style={{ maxWidth: '800px', marginBottom: '64px' }}>
          <div className="eyebrow-label">
            <span className="eyebrow-dot" />
            <span>GET IN TOUCH WITH OUR ENGINEERING TEAM</span>
          </div>

          <h2 className="section-headline">
            DISCUSS YOUR PROJECT &<br />
            <span style={{ color: '#ffffff' }}>REQUEST DRAWING REVIEW.</span>
          </h2>
        </div>

        {/* Two-Column Industrial Layout: Official Information & Minimal Enquiry Form */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'start'
          }}
        >
          
          {/* Left Column: Official PDF Contact Details & Tax Credentials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            
            {/* Phone & Email Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div 
                style={{
                  padding: '24px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '2px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <Phone size={18} color="#ef4444" />
                  <span style={{ fontFamily: 'var(--font-tech)', fontSize: '12px', letterSpacing: '0.15em', color: '#94a3b8', textTransform: 'uppercase' }}>
                    DIRECT PHONE / WHATSAPP
                  </span>
                </div>
                <a 
                  href={`tel:${COMPANY_INFO.contact.phone}`} 
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    display: 'block'
                  }}
                >
                  {COMPANY_INFO.contact.displayPhone}
                </a>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                  Proprietor: {COMPANY_INFO.proprietor}
                </div>
              </div>

              <div 
                style={{
                  padding: '24px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '2px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <Mail size={18} color="#ef4444" />
                  <span style={{ fontFamily: 'var(--font-tech)', fontSize: '12px', letterSpacing: '0.15em', color: '#94a3b8', textTransform: 'uppercase' }}>
                    OFFICIAL EMAIL FOR RFQS & DRAWINGS
                  </span>
                </div>
                <a 
                  href={`mailto:${COMPANY_INFO.contact.email}`} 
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    display: 'block',
                    wordBreak: 'break-all'
                  }}
                >
                  {COMPANY_INFO.contact.email}
                </a>
              </div>
            </div>

            {/* Official Addresses from PDF */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Official Facility Address */}
              <div style={{ display: 'flex', gap: '16px' }}>
                <MapPin size={20} color="#0e8a44" style={{ flexShrink: 0, marginTop: '4px' }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', letterSpacing: '0.12em', color: '#0e8a44', textTransform: 'uppercase', fontWeight: 700 }}>
                    WORKS / FACILITY ADDRESS
                  </div>
                  <p style={{ color: '#e2e8f0', fontSize: '15px', marginTop: '6px', lineHeight: 1.6 }}>
                    {COMPANY_INFO.address.full}
                  </p>
                </div>
              </div>

            </div>

            {/* GSTIN & PAN Verification Badge from PDF Page 16 */}
            <div 
              style={{
                padding: '20px 24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '2px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                fontFamily: 'var(--font-tech)'
              }}
            >
              <div>
                <div style={{ fontSize: '11px', color: '#64748b', letterSpacing: '0.12em', textTransform: 'uppercase' }}>GST IN (MAHARASHTRA)</div>
                <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: 700, marginTop: '2px' }}>
                  {COMPANY_INFO.contact.taxIdentifiers.gstin}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#64748b', letterSpacing: '0.12em', textTransform: 'uppercase' }}>PAN NO</div>
                <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: 700, marginTop: '2px' }}>
                  {COMPANY_INFO.contact.taxIdentifiers.pan}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Minimal & Premium Enquiry Form */}
          <div 
            style={{
              padding: 'clamp(28px, 4vw, 48px)',
              background: '#111317',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '4px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}
          >
            <div style={{ marginBottom: '28px' }}>
              <h3 
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  color: '#ffffff'
                }}
              >
                Send Direct Enquiry
              </h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>
                Submit your manufacturing specifications or request a call back from Mr. Santosh Marotkar.
              </p>
            </div>

            {submitted ? (
              <div 
                style={{
                  padding: '40px 24px',
                  textAlign: 'center',
                  background: 'rgba(14, 138, 68, 0.1)',
                  border: '1px solid rgba(14, 138, 68, 0.3)',
                  borderRadius: '2px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <CheckCircle2 size={48} color="#10b981" />
                <h4 style={{ fontSize: '1.3rem', color: '#ffffff', fontWeight: 700 }}>
                  Enquiry Submitted Successfully!
                </h4>
                <p style={{ color: '#cbd5e1', fontSize: '14px', maxWidth: '400px' }}>
                  Thank you for contacting Mauli Krupa Precision Works. Our engineering team will review your specifications and get in touch promptly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', company: '', phone: '', email: '', requirement: '' });
                  }}
                  className="btn-outline-industrial"
                  style={{ marginTop: '12px' }}
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Name */}
                <div>
                  <label 
                    htmlFor="name"
                    style={{ display: 'block', fontFamily: 'var(--font-tech)', fontSize: '12px', letterSpacing: '0.1em', color: '#cbd5e1', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}
                  >
                    Your Name *
                  </label>
                  <input 
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    className="industrial-input"
                  />
                </div>

                {/* Company */}
                <div>
                  <label 
                    htmlFor="company"
                    style={{ display: 'block', fontFamily: 'var(--font-tech)', fontSize: '12px', letterSpacing: '0.1em', color: '#cbd5e1', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}
                  >
                    Company Name
                  </label>
                  <input 
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Automotive Engineering Ltd."
                    className="industrial-input"
                  />
                </div>

                {/* Phone & Email in Two Columns */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label 
                      htmlFor="phone"
                      style={{ display: 'block', fontFamily: 'var(--font-tech)', fontSize: '12px', letterSpacing: '0.1em', color: '#cbd5e1', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}
                    >
                      Phone Number *
                    </label>
                    <input 
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98..."
                      className="industrial-input"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="email"
                      style={{ display: 'block', fontFamily: 'var(--font-tech)', fontSize: '12px', letterSpacing: '0.1em', color: '#cbd5e1', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}
                    >
                      Email Address *
                    </label>
                    <input 
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className="industrial-input"
                    />
                  </div>
                </div>

                {/* Requirement / Message */}
                <div>
                  <label 
                    htmlFor="requirement"
                    style={{ display: 'block', fontFamily: 'var(--font-tech)', fontSize: '12px', letterSpacing: '0.1em', color: '#cbd5e1', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}
                  >
                    Requirement / Message *
                  </label>
                  <textarea 
                    id="requirement"
                    name="requirement"
                    required
                    rows={4}
                    value={formData.requirement}
                    onChange={handleChange}
                    placeholder="Describe your requirement (e.g., Jigs & Fixtures, Z-type Conveyor, Trolleys, SPM, or Drawing Specification)..."
                    className="industrial-input"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary-industrial"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
                  id="submit-enquiry-button"
                >
                  {isSubmitting ? (
                    <span>TRANSMITTING RFQ...</span>
                  ) : (
                    <>
                      <span>SEND ENQUIRY</span>
                      <ArrowRight size={18} className="arrow-icon" />
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
