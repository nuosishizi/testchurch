/**
 * Local (browser) storage for Bible study registrations and contact inquiries.
 *
 * NOTE: This is a front-end only store, suitable for demo / GitHub Pages.
 * Before going live, connect saveLead() to a real backend (e.g. a form
 * service, Google Sheets, or a serverless function) so submissions reach the church.
 */
const LEADS_STORAGE_KEY = 'truelight_leads_v1';

export const LEAD_TYPES = {
  study: 'Bible Study',
  inquiry: 'Inquiry',
  prayer: 'Prayer Request',
  membership: 'Membership',
};

export const STATUS_OPTIONS = ['New', 'Contacted', 'Confirmed', 'Attended', 'Closed'];

export function getStoredLeads() {
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading leads from storage:', e);
    return [];
  }
}

function persist(list) {
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(list));
  return list;
}

export function saveLead(formData) {
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const newLead = {
    id: `TL-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
    type: formData.type || 'study',
    fullName: formData.fullName?.trim() || 'Anonymous',
    country: formData.country || '',
    contactType: formData.contactType || 'email',
    contactValue: formData.contactValue || '',
    preferredTime: formData.preferredTime || '',
    topics: formData.topics || [],
    message: formData.message || '',
    utmSource: params.get('utm_source') || 'direct',
    utmCampaign: params.get('utm_campaign') || '',
    createdAt: new Date().toISOString(),
    status: 'New',
    notes: '',
  };
  persist([newLead, ...getStoredLeads()]);
  return newLead;
}

export function updateLead(leadId, changes) {
  return persist(
    getStoredLeads().map((l) => (l.id === leadId ? { ...l, ...changes, lastUpdated: new Date().toISOString() } : l))
  );
}

export function deleteLead(leadId) {
  return persist(getStoredLeads().filter((l) => l.id !== leadId));
}

export function exportLeadsToCSV() {
  const leads = getStoredLeads();
  if (!leads.length) return;
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const headers = ['ID', 'Type', 'Name', 'Country', 'Contact Type', 'Contact', 'Preferred Time', 'Topics', 'Message', 'Source', 'Status', 'Date', 'Notes'];
  const rows = leads.map((l) =>
    [l.id, LEAD_TYPES[l.type] || l.type, l.fullName, l.country, l.contactType, l.contactValue, l.preferredTime,
      (l.topics || []).join('; '), l.message, l.utmSource, l.status, new Date(l.createdAt).toLocaleString(), l.notes].map(esc).join(',')
  );
  const blob = new Blob([[headers.join(','), ...rows].join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `truelight_submissions_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
