import React, { useState } from 'react';
import { 
  Mail, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  ShieldCheck
} from 'lucide-react';

export default function ContactPage({ navigateTo }) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "Is the online Bible study really 100% free?",
      a: "Yes, absolutely. There are no fees, membership costs, or purchase requirements now or in the future. We are a registered non-profit educational ministry supported through voluntary donations and educational grants."
    },
    {
      q: "Do I need any previous Bible knowledge to participate?",
      a: "Not at all! We have small groups tailored specifically for complete beginners who have never opened a Bible before, as well as groups for seasoned believers."
    },
    {
      q: "Do I have to turn on my video camera or speak during Zoom?",
      a: "No. You are completely welcome to join with your camera off and simply listen quietly until you feel comfortable participating."
    },
    {
      q: "Which Bible translation do you use in class?",
      a: "We predominantly reference the English Standard Version (ESV) and New International Version (NIV), but all standard translations (KJV, NASB, CSB) are warmly welcomed."
    },
    {
      q: "How long is each weekly study session?",
      a: "Each session runs for approximately 60 minutes, which includes 35 minutes of Scripture reading and teaching, followed by 25 minutes of open Q&A and prayer."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      {/* Header Banner */}
      <section className="contact-header-section">
        <div className="container text-center">
          <div className="badge-pill gold-pill">
            <Mail size={14} />
            <span>We Are Here to Help</span>
          </div>
          <h1 className="contact-title">Contact & Help Center</h1>
          <p className="contact-subtitle">
            Have a question about our online Bible study or need prayer? Connect with our ministry team anytime.
          </p>
        </div>
      </section>

      {/* Contact Grid Section */}
      <section className="contact-main-section">
        <div className="container contact-grid-layout">
          {/* Left Column: Direct Contact Info & Fast WhatsApp */}
          <div className="contact-info-col">
            <div className="contact-methods-card">
              <h3>Connect Directly</h3>
              <p>Choose the method that works best for you. We typically respond within a few hours.</p>

              <div className="contact-item">
                <div className="contact-item-icon wa-icon">
                  <MessageCircle size={22} />
                </div>
                <div>
                  <strong>WhatsApp Coordinator</strong>
                  <p>Instant messaging for quick questions & registration assistance</p>
                  <a 
                    href="https://wa.me/14155550199?text=Hello!%20I%20have%20a%20question%20about%20your%20free%20online%20Bible%20study."
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-action-link"
                  >
                    Open WhatsApp: +1 (415) 555-0199 →
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon mail-icon">
                  <Mail size={22} />
                </div>
                <div>
                  <strong>Email Ministry Support</strong>
                  <p>For general inquiries, prayer requests, and syllabus details</p>
                  <a 
                    href="mailto:study@graceandtruthbiblestudy.org" 
                    className="contact-action-link"
                  >
                    study@graceandtruthbiblestudy.org →
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon clock-icon">
                  <Clock size={22} />
                </div>
                <div>
                  <strong>Live Zoom Study Hours</strong>
                  <p>Tuesdays & Thursdays: 7:30 PM – 8:30 PM EST</p>
                  <p>Saturdays: 10:00 AM – 11:00 AM EST</p>
                </div>
              </div>
            </div>

            {/* Quick Registration Reminder */}
            <div className="contact-sidebar-promo">
              <h4>Ready to Join a Group?</h4>
              <p>Reserve your free spot for our upcoming study group in under a minute.</p>
              <button 
                onClick={() => navigateTo('register')}
                className="btn-contact-register"
              >
                Go to Registration Form →
              </button>
            </div>
          </div>

          {/* Right Column: Send a Message Form */}
          <div className="contact-form-card">
            <h3>Send Us a Message</h3>
            <p>Fill out the form below and a study leader will get back to you promptly.</p>

            {submitted ? (
              <div className="message-sent-confirmation">
                <CheckCircle2 size={48} className="sent-success-icon" />
                <h4>Message Received!</h4>
                <p>Thank you for reaching out, {formState.name}. We have received your inquiry and will respond to {formState.email} shortly.</p>
                <button 
                  onClick={() => { setSubmitted(false); setFormState({ name: '', email: '', phone: '', message: '' }); }}
                  className="btn-send-another"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-inquiry-form">
                <div className="form-group">
                  <label htmlFor="inquiryName">Your Name <span className="req">*</span></label>
                  <input
                    id="inquiryName"
                    type="text"
                    required
                    placeholder="e.g. Rachel Adams"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inquiryEmail">Your Email <span className="req">*</span></label>
                  <input
                    id="inquiryEmail"
                    type="email"
                    required
                    placeholder="e.g. rachel@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inquiryPhone">Phone / WhatsApp (Optional)</label>
                  <input
                    id="inquiryPhone"
                    type="tel"
                    placeholder="e.g. +1 (555) 123-4567"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inquiryMsg">How Can We Help You? <span className="req">*</span></label>
                  <textarea
                    id="inquiryMsg"
                    rows={4}
                    required
                    placeholder="Tell us what questions you have about the Bible study, scheduling, or prayer requests..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn-send-inquiry">
                  <Send size={16} />
                  <span>Send Message</span>
                </button>

                <p className="privacy-reassurance">
                  <ShieldCheck size={14} />
                  <span>We treat all inquiries with strict confidentiality and never share your details.</span>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="faq-section">
        <div className="container">
          <div className="section-head text-center">
            <div className="badge-pill sage-pill">
              <HelpCircle size={14} />
              <span>Got Questions?</span>
            </div>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Find quick answers to common questions about our online classes.</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
                >
                  <button 
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="faq-question-btn"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {isOpen && (
                    <div className="faq-answer-panel">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
