import React, { useState } from 'react';
import { 
  CheckCircle2, 
  MessageCircle, 
  Mail, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  ArrowRight,
  HelpCircle,
  Video
} from 'lucide-react';
import { saveLead } from '../data/leadsStore';

export default function RegisterPage({ onRegistrationSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    country: 'United States',
    contactType: 'whatsapp', // 'whatsapp' or 'email'
    contactValue: '',
    preferredTime: 'Tuesday Evening (7:30 PM EST)',
    topics: ['Bible Basics for Beginners'],
    consentContact: false,
    consentPrivacy: false,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const availableTopics = [
    'Bible Basics for Beginners',
    'End Times & Prophecy',
    'Christian Life & Prayer',
    'Understanding the Gospels',
    'How to Hear God\'s Voice'
  ];

  const timeOptions = [
    'Tuesday Evening (7:30 PM EST)',
    'Thursday Evening (8:00 PM EST)',
    'Saturday Morning (10:00 AM EST)',
    'Sunday Afternoon (3:00 PM EST)',
    'Flexible / Any Available Group'
  ];

  const handleTopicToggle = (topic) => {
    setFormData(prev => {
      const exists = prev.topics.includes(topic);
      if (exists) {
        return { ...prev, topics: prev.topics.filter(t => t !== topic) };
      } else {
        return { ...prev, topics: [...prev.topics, topic] };
      }
    });
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    }
    if (!formData.contactValue.trim()) {
      errs.contactValue = formData.contactType === 'whatsapp' 
        ? 'Please enter your WhatsApp phone number with country code.' 
        : 'Please enter your valid email address.';
    } else if (formData.contactType === 'email' && !formData.contactValue.includes('@')) {
      errs.contactValue = 'Please enter a valid email address with an @ symbol.';
    }
    if (!formData.consentContact) {
      errs.consentContact = 'Please confirm that you agree to be contacted regarding this study.';
    }
    if (!formData.consentPrivacy) {
      errs.consentPrivacy = 'Please confirm agreement to our Privacy Policy.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setTimeout(() => {
      const createdLead = saveLead(formData);
      setSubmitting(false);
      onRegistrationSuccess(createdLead);
    }, 600);
  };

  return (
    <div className="register-page">
      {/* Header Banner */}
      <section className="register-header-section">
        <div className="container text-center">
          <div className="badge-pill sage-pill">
            <Sparkles size={14} />
            <span>100% Free · No Obligation · Live Online</span>
          </div>
          <h1 className="register-title">Register for Free Online Bible Study</h1>
          <p className="register-subtitle">
            Take one minute to reserve your spot. Connect with friendly teachers and believers in a relaxed, open discussion group.
          </p>
        </div>
      </section>

      {/* Main Form & Information Section */}
      <section className="register-form-section">
        <div className="container register-layout-grid">
          {/* Left Column: The Interactive Registration Form */}
          <div className="register-card">
            <div className="form-card-header">
              <h3>Free Study Registration</h3>
              <p>All information is kept strictly confidential in accordance with our privacy policy.</p>
            </div>

            <form onSubmit={handleSubmit} className="study-form">
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="fullName">Full Name <span className="req">*</span></label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="e.g. Johnathan Davis"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={errors.fullName ? 'input-error' : ''}
                />
                {errors.fullName && <span className="field-error-msg">{errors.fullName}</span>}
              </div>

              {/* Country Selection */}
              <div className="form-group">
                <label htmlFor="country">Your Country / Region <span className="req">*</span></label>
                <select
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Haiti">Haiti</option>
                  <option value="Other International">Other Country / Region</option>
                </select>
              </div>

              {/* Preferred Contact Method Tab Switcher */}
              <div className="form-group">
                <label>Preferred Way to Receive Study Link <span className="req">*</span></label>
                <div className="contact-type-selector">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, contactType: 'whatsapp' })}
                    className={`contact-tab ${formData.contactType === 'whatsapp' ? 'active' : ''}`}
                  >
                    <MessageCircle size={18} />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, contactType: 'email' })}
                    className={`contact-tab ${formData.contactType === 'email' ? 'active' : ''}`}
                  >
                    <Mail size={18} />
                    <span>Email</span>
                  </button>
                </div>

                <div className="contact-input-wrapper">
                  <input
                    type={formData.contactType === 'email' ? 'email' : 'tel'}
                    placeholder={
                      formData.contactType === 'whatsapp'
                        ? 'e.g. +1 (415) 555-0192 (include country code)'
                        : 'e.g. yourname@gmail.com'
                    }
                    value={formData.contactValue}
                    onChange={(e) => setFormData({ ...formData, contactValue: e.target.value })}
                    className={errors.contactValue ? 'input-error' : ''}
                  />
                </div>
                {errors.contactValue && <span className="field-error-msg">{errors.contactValue}</span>}
                <span className="field-hint">
                  {formData.contactType === 'whatsapp'
                    ? 'Our study coordinator will message you the Zoom link and schedule on WhatsApp.'
                    : 'We will email you the study syllabus and private Zoom invitation.'}
                </span>
              </div>

              {/* Preferred Study Time */}
              <div className="form-group">
                <label htmlFor="preferredTime">Preferred Study Time (EST)</label>
                <select
                  id="preferredTime"
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              {/* Topics of Interest Pills */}
              <div className="form-group">
                <label>Topics You Are Most Interested In (Select Any):</label>
                <div className="topic-pills-container">
                  {availableTopics.map((topic) => {
                    const selected = formData.topics.includes(topic);
                    return (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => handleTopicToggle(topic)}
                        className={`topic-pill-btn ${selected ? 'selected' : ''}`}
                      >
                        {selected && <CheckCircle2 size={14} className="pill-check" />}
                        <span>{topic}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Consent Checkboxes */}
              <div className="consent-box">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.consentContact}
                    onChange={(e) => setFormData({ ...formData, consentContact: e.target.checked })}
                  />
                  <span>
                    I agree to be contacted regarding this free Bible study via my provided WhatsApp or email. <span className="req">*</span>
                  </span>
                </label>
                {errors.consentContact && <span className="field-error-msg">{errors.consentContact}</span>}

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.consentPrivacy}
                    onChange={(e) => setFormData({ ...formData, consentPrivacy: e.target.checked })}
                  />
                  <span>
                    I agree to the website <a href="#privacy" className="underline-link" onClick={(e) => { e.preventDefault(); }}>Privacy Policy</a> and confirm my participation is voluntary. <span className="req">*</span>
                  </span>
                </label>
                {errors.consentPrivacy && <span className="field-error-msg">{errors.consentPrivacy}</span>}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="btn-submit-registration"
              >
                {submitting ? (
                  <span>Saving Your Spot...</span>
                ) : (
                  <>
                    <span>Complete Free Registration</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <p className="form-security-note">
                <ShieldCheck size={14} />
                <span>Your information is 100% confidential. No spam, advertisements, or sharing with 3rd parties.</span>
              </p>
            </form>
          </div>

          {/* Right Column: Instant WhatsApp Help & What to Expect */}
          <div className="register-sidebar">
            {/* Direct WhatsApp Instant Card */}
            <div className="instant-whatsapp-card">
              <div className="instant-wa-header">
                <div className="wa-icon-large">
                  <MessageCircle size={28} />
                </div>
                <div>
                  <h4>Prefer Instant Chat?</h4>
                  <p>Speak directly with our study coordinator on WhatsApp.</p>
                </div>
              </div>
              <p className="wa-card-desc">
                If you have immediate questions or prefer registering directly via WhatsApp, click below to open a pre-filled chat with our coordinator.
              </p>
              <a
                href="https://wa.me/14155550199?text=Hello!%20I'm%20interested%20in%20joining%20your%20free%20online%20Bible%20study.%20Could%20you%20please%20share%20more%20information?"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-open-whatsapp"
              >
                <MessageCircle size={18} />
                <span>Open WhatsApp Chat Now</span>
              </a>
              <span className="wa-response-time">Average response time: under 1 hour</span>
            </div>

            {/* Study Key Pillars */}
            <div className="study-pillars-card">
              <h4>What Makes Our Study Different?</h4>
              
              <div className="pillar-item">
                <div className="pillar-bullet">
                  <Heart size={16} />
                </div>
                <div>
                  <strong>100% Free Forever</strong>
                  <p>Funded by voluntary contributions and non-profit grants. There will never be any charge or fee.</p>
                </div>
              </div>

              <div className="pillar-item">
                <div className="pillar-bullet">
                  <Video size={16} />
                </div>
                <div>
                  <strong>Live & Interactive via Zoom</strong>
                  <p>Not a recorded lecture. You can interact with teachers, see slides, and ask questions in real time.</p>
                </div>
              </div>

              <div className="pillar-item">
                <div className="pillar-bullet">
                  <HelpCircle size={16} />
                </div>
                <div>
                  <strong>Zero Pressure Policy</strong>
                  <p>You may keep your camera off and simply listen, or turn it on and participate. Everyone moves at their own comfort level.</p>
                </div>
              </div>
            </div>

            {/* Study Community Photo Box */}
            <div className="study-photo-box">
              <img src={`${import.meta.env.BASE_URL}community-discussion.jpg`} alt="Bible Study Group Fellowship" />
              <div className="photo-caption">
                <span>"Where two or three are gathered in my name, there am I among them." — Matthew 18:20</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
