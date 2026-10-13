import { useState } from 'react';
import { ArrowRight, Mail, MessageCircle, Phone, ShieldCheck, Heart, Video, HelpCircle, CheckCircle2 } from 'lucide-react';
import { PageHero, Reveal } from '../components/ui';
import { asset } from '../utils/asset';
import { saveLead } from '../data/leadsStore';
import { STUDY_TOPICS, STUDY_TIMES } from '../data/content';
import { whatsappLink } from '../data/church';

const CONTACT_TYPES = [
  { id: 'email', label: 'Email', icon: Mail, placeholder: 'you@example.com', inputType: 'email' },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, placeholder: '+1 555 123 4567 (with country code)', inputType: 'tel' },
  { id: 'phone', label: 'Phone / SMS', icon: Phone, placeholder: '+1 555 123 4567', inputType: 'tel' },
];

export default function BibleStudyPage({ onSuccess }) {
  const [form, setForm] = useState({
    fullName: '',
    country: '',
    contactType: 'email',
    contactValue: '',
    preferredTime: STUDY_TIMES[0],
    topics: [STUDY_TOPICS[0]],
    message: '',
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const ct = CONTACT_TYPES.find((c) => c.id === form.contactType);
  const wa = whatsappLink('Hello! I would like to join a free Bible study with The Church of the True Light.');

  const toggleTopic = (t) => set('topics', form.topics.includes(t) ? form.topics.filter((x) => x !== t) : [...form.topics, t]);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Please enter your name.';
    if (!form.contactValue.trim()) e.contactValue = 'Please tell us how to reach you.';
    else if (form.contactType === 'email' && !/^\S+@\S+\.\S+$/.test(form.contactValue)) e.contactValue = 'Please enter a valid email address.';
    if (!form.consent) e.consent = 'Please confirm you agree to be contacted.';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      const lead = saveLead({ ...form, type: 'study' });
      setSubmitting(false);
      onSuccess(lead);
    }, 700);
  };

  return (
    <div>
      <PageHero
        eyebrow="Free Online Bible Study"
        title="Grow in God’s Word Together"
        subtitle="Take one minute to reserve your place. Free of charge, no obligation, and open to everyone who sincerely seeks to know God."
        image="images/fellowship.jpg"
      />

      <section className="section section--ivory study-section">
        <div className="container study-layout">
          <Reveal className="form-card">
            <div className="form-card__head">
              <h2>Register for a Free Study</h2>
              <p>Your details are kept confidential and used only to arrange your Bible study.</p>
            </div>

            <form onSubmit={submit} noValidate className="form">
              <div className="form-row">
                <div className="field">
                  <label htmlFor="study-name">Full name <span className="req">*</span></label>
                  <input id="study-name" type="text" placeholder="Your name" value={form.fullName} onChange={(e) => set('fullName', e.target.value)} className={errors.fullName ? 'has-error' : ''} />
                  {errors.fullName && <span className="field__error">{errors.fullName}</span>}
                </div>
                <div className="field">
                  <label htmlFor="study-country">Country / region</label>
                  <input id="study-country" type="text" placeholder="e.g. United States" value={form.country} onChange={(e) => set('country', e.target.value)} />
                </div>
              </div>

              <div className="field">
                <label>How should we contact you? <span className="req">*</span></label>
                <div className="segmented" role="radiogroup">
                  {CONTACT_TYPES.map((c) => (
                    <button key={c.id} id={`contact-${c.id}`} type="button" role="radio" aria-checked={form.contactType === c.id} className={`segmented__opt ${form.contactType === c.id ? 'is-active' : ''}`} onClick={() => set('contactType', c.id)}>
                      <c.icon size={17} /> {c.label}
                    </button>
                  ))}
                </div>
                <input id="study-contact" type={ct.inputType} placeholder={ct.placeholder} value={form.contactValue} onChange={(e) => set('contactValue', e.target.value)} className={errors.contactValue ? 'has-error' : ''} />
                {errors.contactValue && <span className="field__error">{errors.contactValue}</span>}
              </div>

              <div className="field">
                <label htmlFor="study-time">Preferred time</label>
                <select id="study-time" value={form.preferredTime} onChange={(e) => set('preferredTime', e.target.value)}>
                  {STUDY_TIMES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div className="field">
                <label>Topics you’d like to explore</label>
                <div className="chips">
                  {STUDY_TOPICS.map((t) => {
                    const on = form.topics.includes(t);
                    return (
                      <button key={t} type="button" className={`chip ${on ? 'is-on' : ''}`} onClick={() => toggleTopic(t)} aria-pressed={on}>
                        {on && <CheckCircle2 size={15} />} {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="field">
                <label htmlFor="study-msg">Anything you’d like us to know? <span className="optional">(optional)</span></label>
                <textarea id="study-msg" rows={3} placeholder="Questions, background, or what you hope to learn…" value={form.message} onChange={(e) => set('message', e.target.value)} />
              </div>

              <label className={`checkbox ${errors.consent ? 'has-error' : ''}`}>
                <input id="study-consent" type="checkbox" checked={form.consent} onChange={(e) => set('consent', e.target.checked)} />
                <span>I agree to be contacted about this free Bible study and have read the <a href="#privacy">Privacy Policy</a>. Participation is voluntary and I may opt out at any time. <span className="req">*</span></span>
              </label>
              {errors.consent && <span className="field__error">{errors.consent}</span>}

              <button id="study-submit" type="submit" className="btn btn-gold btn-lg btn-block" disabled={submitting}>
                {submitting ? <span className="spinner" /> : <>Complete Free Registration <ArrowRight size={19} /></>}
              </button>
              <p className="form__secure"><ShieldCheck size={15} /> We never sell or share your information.</p>
            </form>
          </Reveal>

          <aside className="study-aside">
            <Reveal delay={100} className="aside-card aside-card--navy">
              <h3>What to Expect</h3>
              <ul className="expect-list">
                <li><Heart size={18} /><div><strong>Completely free</strong><p>Church activities and materials are always offered without charge.</p></div></li>
                <li><Video size={18} /><div><strong>Live & online</strong><p>Join from home and study together with others in real time.</p></div></li>
                <li><HelpCircle size={18} /><div><strong>Ask anything</strong><p>Honest questions are welcome. Go at your own pace.</p></div></li>
              </ul>
            </Reveal>

            {wa && (
              <Reveal delay={160} className="aside-card">
                <h3>Prefer to Chat?</h3>
                <p>Message us directly on WhatsApp and we’ll help you get started.</p>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-navy btn-block"><MessageCircle size={18} /> Chat on WhatsApp</a>
              </Reveal>
            )}

            <Reveal delay={220} className="aside-photo">
              <img src={asset('images/bible-light.jpg')} alt="Open Bible in morning light" loading="lazy" />
              <p>“Blessed are they which do hunger and thirst after righteousness: for they shall be filled.” <span>— Matthew 5:6</span></p>
            </Reveal>
          </aside>
        </div>
      </section>
    </div>
  );
}
