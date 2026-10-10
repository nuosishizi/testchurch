import React from 'react';
import { 
  CheckCircle, 
  MessageCircle, 
  Calendar, 
  Mail, 
  ArrowRight, 
  BookOpen, 
  Copy, 
  ShieldCheck,
  Video
} from 'lucide-react';

export default function ThankYouPage({ lead, navigateTo }) {
  const defaultLead = {
    id: "LEAD-2026-77319",
    fullName: "Beloved Friend",
    country: "United States",
    contactType: "whatsapp",
    contactValue: "+1 (415) 555-0199",
    preferredTime: "Tuesday Evening (7:30 PM EST)",
    topics: ["Bible Basics for Beginners", "Christian Life & Prayer"]
  };

  const activeLead = lead || defaultLead;

  const copyLeadId = () => {
    navigator.clipboard.writeText(activeLead.id);
    alert(`Copied Lead ID: ${activeLead.id}`);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Grace & Truth Study Team! I just submitted my registration (ID: ${activeLead.id}). My name is ${activeLead.fullName}, and I would like to confirm my spot for ${activeLead.preferredTime}.`
  );

  return (
    <div className="thank-you-page">
      <div className="container thank-you-container">
        {/* Success Icon & Heading */}
        <div className="thank-you-header text-center">
          <div className="success-badge-circle">
            <CheckCircle size={48} className="success-icon" />
          </div>
          <span className="lead-pill">Registration Confirmed</span>
          <h1>Thank You, {activeLead.fullName}!</h1>
          <p className="thank-you-sub">
            Your spot has been successfully reserved. We are honored to welcome you into our online fellowship.
          </p>
        </div>

        {/* Confirmation Summary Card */}
        <div className="confirmation-card">
          <div className="card-top-bar">
            <div>
              <span className="card-top-label">Official Registration ID</span>
              <div className="lead-id-row">
                <span className="lead-id-text">{activeLead.id}</span>
                <button onClick={copyLeadId} className="copy-btn" title="Copy Lead ID">
                  <Copy size={14} />
                  <span>Copy</span>
                </button>
              </div>
            </div>
            <div className="status-indicator">
              <span className="status-dot"></span>
              <span>Pending Coordinator Contact</span>
            </div>
          </div>

          <div className="confirmation-details-grid">
            <div className="detail-item">
              <span className="detail-label">Name</span>
              <strong className="detail-val">{activeLead.fullName}</strong>
            </div>

            <div className="detail-item">
              <span className="detail-label">Country</span>
              <strong className="detail-val">{activeLead.country}</strong>
            </div>

            <div className="detail-item">
              <span className="detail-label">Delivery Channel</span>
              <strong className="detail-val">
                {activeLead.contactType === 'whatsapp' ? 'WhatsApp' : 'Email'}: {activeLead.contactValue}
              </strong>
            </div>

            <div className="detail-item">
              <span className="detail-label">Preferred Session</span>
              <strong className="detail-val">{activeLead.preferredTime}</strong>
            </div>

            <div className="detail-item full-span">
              <span className="detail-label">Selected Interest Topics</span>
              <div className="tags-row">
                {(activeLead.topics || []).map((t) => (
                  <span key={t} className="confirm-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fast Track WhatsApp Action */}
        <div className="whatsapp-fast-track-box">
          <div className="fast-track-icon">
            <MessageCircle size={32} />
          </div>
          <div className="fast-track-text">
            <h3>Want to Confirm Immediately?</h3>
            <p>
              Tap below to send a quick one-tap verification to our study coordinator on WhatsApp. You'll receive the meeting room link and syllabus within minutes!
            </p>
          </div>
          <a
            href={`https://wa.me/14155550199?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-confirm"
          >
            <MessageCircle size={18} />
            <span>Confirm on WhatsApp Now</span>
          </a>
        </div>

        {/* What Happens Next Steps */}
        <div className="next-steps-card">
          <h4>What Happens Next?</h4>
          <div className="next-steps-grid">
            <div className="next-step-item">
              <div className="step-circle">1</div>
              <h5>Coordinator Contact</h5>
              <p>Our study leader will reach out via your selected method with our introductory study guide.</p>
            </div>

            <div className="next-step-item">
              <div className="step-circle">2</div>
              <h5>Receive Zoom Link</h5>
              <p>You will receive a private, secure Zoom room link and reminder 24 hours before your session.</p>
            </div>

            <div className="next-step-item">
              <div className="step-circle">3</div>
              <h5>Join & Enjoy</h5>
              <p>Log in with any device. You are welcome to simply listen or join into the Scripture conversation.</p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Actions */}
        <div className="thank-you-footer-actions">
          <button 
            onClick={() => navigateTo('topics')} 
            className="btn-return-topics"
          >
            <BookOpen size={16} />
            <span>Read Bible Articles While You Wait</span>
          </button>
          
          <button 
            onClick={() => navigateTo('home')} 
            className="btn-return-home"
          >
            <span>Return to Homepage</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
