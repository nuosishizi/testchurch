import { useState } from 'react';
import { ArrowLeft, Download, Search, Trash2, Users, Clock, UserCheck, HandHeart, Shield } from 'lucide-react';
import { LogoMark } from '../components/ui';
import { getStoredLeads, updateLead, deleteLead, exportLeadsToCSV, LEAD_TYPES, STATUS_OPTIONS } from '../data/leadsStore';

/**
 * Staff view of submissions stored in this browser (reach via #admin).
 * This is a front-end demo; it is not password-protected. Replace with a
 * real backend + authentication before handling real personal data.
 */
export default function AdminPage() {
  const [leads, setLeads] = useState(getStoredLeads);
  const [type, setType] = useState('all');
  const [q, setQ] = useState('');

  const filtered = leads.filter((l) => {
    if (type !== 'all' && l.type !== type) return false;
    const t = q.toLowerCase();
    return !t || [l.fullName, l.id, l.contactValue, l.country, l.message].some((v) => (v || '').toLowerCase().includes(t));
  });

  const stats = [
    { icon: Users, label: 'Total submissions', value: leads.length },
    { icon: Clock, label: 'Awaiting contact', value: leads.filter((l) => l.status === 'New').length },
    { icon: UserCheck, label: 'Confirmed / attended', value: leads.filter((l) => ['Confirmed', 'Attended'].includes(l.status)).length },
    { icon: HandHeart, label: 'Prayer requests', value: leads.filter((l) => l.type === 'prayer').length },
  ];

  return (
    <div className="admin">
      <header className="admin__bar">
        <div className="container admin__bar-inner">
          <a href="#home" className="admin__back"><ArrowLeft size={16} /> Back to website</a>
          <div className="admin__title"><LogoMark size={30} /> <span>Staff Portal</span></div>
          <button id="admin-export" className="btn btn-gold btn-sm" onClick={exportLeadsToCSV} disabled={!leads.length}><Download size={16} /> Export CSV</button>
        </div>
      </header>

      <div className="container admin__main">
        <div className="admin__notice"><Shield size={16} /> Demo mode: submissions are stored only in this browser. Connect a backend before going live.</div>

        <div className="admin__stats">
          {stats.map((s) => (
            <div key={s.label} className="admin-stat">
              <s.icon size={22} />
              <div><span>{s.label}</span><strong>{s.value}</strong></div>
            </div>
          ))}
        </div>

        <div className="admin__toolbar">
          <div className="admin__search">
            <Search size={17} />
            <input id="admin-search" placeholder="Search name, contact, message…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="filter-bar filter-bar--left">
            {[['all', 'All'], ...Object.entries(LEAD_TYPES)].map(([k, v]) => (
              <button key={k} className={`filter-chip ${type === k ? 'is-active' : ''}`} onClick={() => setType(k)}>{v}</button>
            ))}
          </div>
        </div>

        <div className="admin__table-wrap">
          <table className="admin__table">
            <thead>
              <tr><th>Submitted</th><th>Type</th><th>Name</th><th>Contact</th><th>Details</th><th>Status</th><th>Notes</th><th /></tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.id}>
                  <td><strong>{l.id}</strong><small>{new Date(l.createdAt).toLocaleString()}</small></td>
                  <td><span className={`tag tag--${l.type}`}>{LEAD_TYPES[l.type] || l.type}</span></td>
                  <td>{l.fullName}<small>{l.country}</small></td>
                  <td>{l.contactValue}<small>{l.contactType}</small></td>
                  <td className="admin__details">
                    {l.preferredTime && <small>{l.preferredTime}</small>}
                    {(l.topics || []).length > 0 && <small>{l.topics.join(', ')}</small>}
                    {l.message && <p>{l.message}</p>}
                  </td>
                  <td>
                    <select value={l.status} onChange={(e) => setLeads(updateLead(l.id, { status: e.target.value }))}>
                      {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>
                    <textarea rows={2} defaultValue={l.notes} placeholder="Add notes…" onBlur={(e) => e.target.value !== l.notes && setLeads(updateLead(l.id, { notes: e.target.value }))} />
                  </td>
                  <td>
                    <button className="admin__delete" title="Delete" onClick={() => window.confirm(`Delete ${l.id}?`) && setLeads(deleteLead(l.id))}><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {!filtered.length && (
                <tr><td colSpan={8} className="admin__empty">No submissions yet. Registrations and messages from the website will appear here.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
