import React from 'react';
import { ShieldCheck, Lock, EyeOff, FileText, CheckCircle2 } from 'lucide-react';

export default function PrivacyPage({ navigateTo }) {
  return (
    <div className="privacy-page">
      <div className="container privacy-container">
        <div className="privacy-header text-center">
          <div className="badge-pill sage-pill">
            <ShieldCheck size={14} />
            <span>Data Privacy & Security</span>
          </div>
          <h1>Privacy Policy</h1>
          <p className="privacy-effective-date">Last Updated: October 2026</p>
        </div>

        <div className="privacy-content-card">
          <section className="privacy-section">
            <h2>1. Our Commitment to Your Privacy</h2>
            <p>
              Grace & Truth Online Bible Study ("we", "us", or "our") is dedicated to protecting your personal information and respecting your privacy. As a Christian non-profit educational ministry, we hold all communication and registrations in the highest confidence.
            </p>
            <p>
              <strong>We do not sell, rent, or trade your personal information</strong> with any commercial entities or third-party advertisers.
            </p>
          </section>

          <section className="privacy-section">
            <h2>2. Information We Collect</h2>
            <p>When you register for our free online Bible study or contact us, we may collect:</p>
            <ul>
              <li><strong>Contact Information:</strong> Your name, country/region, and your chosen contact method (WhatsApp phone number or email address).</li>
              <li><strong>Study Preferences:</strong> Preferred meeting time slots and biblical topics of interest.</li>
              <li><strong>Communication Records:</strong> Notes from coordinator interactions to assist you in joining the right Zoom study group.</li>
              <li><strong>Anonymous Technical Data:</strong> Standard server logs, referral sources (e.g. Google Ad Grants, YouTube, or direct links) to assess outreach effectiveness.</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>3. How We Use Your Information</h2>
            <p>Your information is used strictly for the following purposes:</p>
            <ul>
              <li>To provide you with the private Zoom / Google Meet meeting links and study syllabus.</li>
              <li>To communicate with you regarding schedule updates and study reminders.</li>
              <li>To address your spiritual questions or prayer requests when requested.</li>
              <li>To maintain compliance with non-profit donor and grant accountability guidelines.</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>4. Religious Privacy & Google Ad Grants Compliance</h2>
            <p>
              We strictly adhere to sensitive data protection policies. We do not transmit personally identifiable information (PII) or inferences about religious affiliations to third-party advertising platforms. All conversion events tracked for grant compliance are aggregated and anonymized.
            </p>
          </section>

          <section className="privacy-section">
            <h2>5. Your Rights & Data Deletion</h2>
            <p>
              Participation in our Bible studies is 100% voluntary. You have the right at any time to:
            </p>
            <ul>
              <li>Request a copy of the data we hold regarding your registration.</li>
              <li>Ask us to update or correct your contact details.</li>
              <li>Request complete and immediate deletion of your record from our database.</li>
            </ul>
            <p>
              To request data removal, simply email us at <a href="mailto:privacy@graceandtruthbiblestudy.org">privacy@graceandtruthbiblestudy.org</a> or message our coordinator on WhatsApp, and your record will be removed within 24 hours.
            </p>
          </section>

          <section className="privacy-section">
            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our practices, please contact our ministry team:
            </p>
            <p>
              Email: <strong>privacy@graceandtruthbiblestudy.org</strong><br />
              WhatsApp: <strong>+1 (415) 555-0199</strong><br />
              Grace & Truth Online Bible Study Fellowship
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
