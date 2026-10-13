import { useState } from 'react';
import { Mail, MessageCircle, MapPin, Send, HelpCircle, HandHeart, UserPlus } from 'lucide-react';
import { PageHero, Reveal } from '../components/ui';
import { saveLead } from '../data/leadsStore';
import { CHURCH, whatsappLink } from '../data/church';

const TOPICS = [
  { id: 'inquiry', label: 'General Question', icon: HelpCircle },
  { id: 'prayer', label: 'Prayer Request', icon: HandHeart },
  { id: 'membership', label: 'Membership', icon: UserPlus },
];

export default function ContactPage({ onSuccess }) {
  const [form, setForm] = useState({ type: 'inquiry', fullName: '', contactValue: '', message: '', consent: false });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const wa = whatsappLink('Hello! I have a question for The Church of the True Light.');

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.fullName.trim()) er.fullName = 'Please enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(form.contactValue)) er.contactValue = 'Please enter a valid email address.';
    if (!form.message.trim()) er.message = 'Please write a short message.';
    if (!form.consent) er.consent = 'Please agree so we can reply to you.';
    setErrors(er);
    if (Object.keys(er).length) return;
    setSending(true);
    setTimeout(() => {
      const lead = saveLead({ ...form, contactType: 'email' });
      setSending(false);
      onSuccess(lead);
    }, 700);
  };

  return (
    <div>
      <PageHero eyebrow="Contact Us" title="We’d Love to Hear From You" subtitle="Questions about faith, a prayer request, or interest in our church — reach out anytime." image="images/hero-sunrise.jpg" />

      <section className="section section--ivory">
        <div className="container contact-layout">
          <div className="contact-info">
            <Reveal className="contact-tile">
              <div className="contact-tile__icon"><Mail size={22} /></div>
              <div>
                <h3>Email</h3>
                <a href={`mailto:${CHURCH.contact.email}`}>{CHURCH.contact.email}</a>
              </div>
            </Reveal>
            {wa && (
              <Reveal delay={80} className="contact-tile">
                <div className="contact-tile__icon"><MessageCircle size={22} /></div>
                <div>
                  <h3>WhatsApp</h3>
                  <a href={wa} target="_blank" rel="noopener noreferrer">Start a chat</a>
                </div>
              </Reveal>
            )}
            <Reveal delay={160} className="contact-tile">
              <div className="contact-tile__icon"><MapPin size={22} /></div>
              <div>
                <h3>Gatherings</h3>
                <p>{CHURCH.contact.address || 'Regular online meetings — join from anywhere in the world.'}</p>
              </div>
            </Reveal>
            <Reveal delay={240} className="contact-verse">
              <p>“Come unto me, all you that labor and are heavy laden, and I will give you rest.”</p>
              <span>— Matthew 11:28</span>
            </Reveal>
          </div>

          <Reveal delay={100} className="form-card">
            <div className="form-card__head">
              <h2>Send a Message</h2>
              <p>We read every message and will reply personally.</p>
            </div>
            <form className="form" onSubmit={submit} noValidate>
              <div className="field">
                <label>What is this about?</label>
                <div className="segmented" role="radiogroup">
                  {TOPICS.map((t) => (
                    <button key={t.id} id={`msg-type-${t.id}`} type="button" role="radio" aria-checked={form.type === t.id} className={`segmented__opt ${form.type === t.id ? 'is-active' : ''}`} onClick={() => set('type', t.id)}>
                      <t.icon size={17} /> {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="contact-name">Name <span className="req">*</span></label>
                  <input id="contact-name" value={form.fullName} onChange={(e) => set('fullName', e.target.value)} placeholder="Your name" className={errors.fullName ? 'has-error' : ''} />
                  {errors.fullName && <span className="field__error">{errors.fullName}</span>}
                </div>
                <div className="field">
                  <label htmlFor="contact-email">Email <span className="req">*</span></label>
                  <input id="contact-email" type="email" value={form.contactValue} onChange={(e) => set('contactValue', e.target.value)} placeholder="you@example.com" className={errors.contactValue ? 'has-error' : ''} />
                  {errors.contactValue && <span className="field__error">{errors.contactValue}</span>}
                </div>
              </div>
              <div className="field">
                <label htmlFor="contact-message">{form.type === 'prayer' ? 'How can we pray for you?' : 'Message'} <span className="req">*</span></label>
                <textarea id="contact-message" rows={5} value={form.message} onChange={(e) => set('message', e.target.value)} placeholder={form.type === 'prayer' ? 'Share as much or as little as you like…' : 'Write your message…'} className={errors.message ? 'has-error' : ''} />
                {errors.message && <span className="field__error">{errors.message}</span>}
              </div>
              <label className={`checkbox ${errors.consent ? 'has-error' : ''}`}>
                <input id="contact-consent" type="checkbox" checked={form.consent} onChange={(e) => set('consent', e.target.checked)} />
                <span>I agree that the church may use my details to reply to this message, per the <a href="#privacy">Privacy Policy</a>. <span className="req">*</span></span>
              </label>
              {errors.consent && <span className="field__error">{errors.consent}</span>}
              <button id="contact-submit" type="submit" className="btn btn-navy btn-lg btn-block" disabled={sending}>
                {sending ? <span className="spinner spinner--light" /> : <>Send Message <Send size={18} /></>}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
