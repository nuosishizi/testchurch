import { PageHero } from '../components/ui';
import { CHURCH } from '../data/church';

const LAST_UPDATED = 'October 2026';

export default function PrivacyPage() {
  return (
    <div>
      <PageHero eyebrow="Legal" title="Privacy Policy" subtitle="How we collect, use, and protect your information." image="images/bible-light.jpg" />
      <section className="section">
        <div className="container narrow prose prose--legal">
          <p><em>Last updated: {LAST_UPDATED}</em></p>
          <h2>1. Information We Collect</h2>
          <p>When you register for a Bible study or send us a message, we collect only what you choose to provide — such as your name, country, contact details, preferred study time, topics of interest, and your message.</p>
          <h2>2. How We Use It</h2>
          <p>We use your information solely to arrange Bible studies, respond to your questions or prayer requests, and send study details you have asked for. We will never add you to group chats or mailing lists without your explicit consent.</p>
          <h2>3. Sharing</h2>
          <p>{CHURCH.name} does not sell, rent, or trade your personal information. It is accessible only to authorized church volunteers who help coordinate studies and replies.</p>
          <h2>4. Your Choices</h2>
          <p>Participation is entirely voluntary. You may ask us to stop contacting you, or to correct or delete your information, at any time by contacting us at <a href={`mailto:${CHURCH.contact.email}`}>{CHURCH.contact.email}</a>.</p>
          <h2>5. Minors</h2>
          <p>Children and teenagers under 18 are welcome to attend gatherings. We encourage parents or guardians to be involved when a minor contacts us.</p>
          <h2>6. Security</h2>
          <p>We take reasonable measures to protect the information you share with us. No online transmission is completely secure, so please avoid sending highly sensitive information through web forms.</p>
          <h2>7. Contact</h2>
          <p>Questions about this policy may be sent to <a href={`mailto:${CHURCH.contact.email}`}>{CHURCH.contact.email}</a>.</p>
        </div>
      </section>
    </div>
  );
}
