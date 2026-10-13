import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Reveal, LogoMark } from '../components/ui';
import { LEAD_TYPES } from '../data/leadsStore';

export default function ThankYouPage({ lead }) {
  const isStudy = !lead || lead.type === 'study';
  return (
    <section className="thanks">
      <div className="thanks__glow" />
      <div className="container narrow">
        <Reveal className="thanks__card">
          <div className="thanks__icon"><LogoMark size={72} /></div>
          <span className="eyebrow eyebrow--gold"><CheckCircle2 size={15} /> {lead ? `${LEAD_TYPES[lead.type]} received` : 'Received'}</span>
          <h1>Thank You{lead?.fullName && lead.fullName !== 'Anonymous' ? `, ${lead.fullName.split(' ')[0]}` : ''}!</h1>
          <p className="lead">
            {isStudy
              ? 'Your place in our free online Bible study has been reserved. A member of our team will reach out soon with the details.'
              : 'Your message has been received. A member of our team will respond as soon as possible.'}
          </p>
          {lead && (
            <div className="thanks__ref">
              Reference: <strong>{lead.id}</strong>
            </div>
          )}
          <blockquote className="thanks__verse">
            “Ask, and it shall be given you; seek, and you shall find; knock, and it shall be opened unto you.”
            <cite>Matthew 7:7</cite>
          </blockquote>
          <div className="btn-row btn-row--center">
            <a href="#word" className="btn btn-gold">Read God’s Word <ArrowRight size={18} /></a>
            <a href="#home" className="btn btn-ghost-light">Back to Home</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
