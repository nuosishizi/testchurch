import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Download, 
  Search, 
  Filter, 
  UserCheck, 
  Clock, 
  MessageCircle, 
  Mail, 
  CheckCircle, 
  TrendingUp, 
  Trash2, 
  Edit3, 
  PlusCircle, 
  ArrowLeft,
  ExternalLink,
  Users
} from 'lucide-react';
import { 
  getStoredLeads, 
  updateLeadStatus, 
  deleteLead, 
  exportLeadsToCSV, 
  saveLead 
} from '../data/leadsStore';

export default function AdminPage({ navigateTo }) {
  const [leads, setLeads] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [tempNotes, setTempNotes] = useState('');

  const statusOptions = [
    'New Lead',
    'Pending Contact',
    'Contacted',
    'Confirmed Attendee',
    'Attended',
    'Unreachable'
  ];

  useEffect(() => {
    setLeads(getStoredLeads());
  }, []);

  const handleStatusChange = (leadId, newStatus) => {
    const updated = updateLeadStatus(leadId, newStatus);
    setLeads(updated);
  };

  const handleSaveNotes = (leadId) => {
    const updated = updateLeadStatus(leadId, undefined, tempNotes);
    setLeads(updated);
    setEditingNotesId(null);
  };

  const handleDelete = (leadId) => {
    if (window.confirm(`Are you sure you want to delete lead ${leadId}?`)) {
      const updated = deleteLead(leadId);
      setLeads(updated);
    }
  };

  const handleCreateMockLead = () => {
    const names = ["David Robinson", "Elena Rostova", "Samuel Adams", "Hannah Clarke"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const mock = {
      fullName: randomName,
      country: Math.random() > 0.5 ? "United States" : "Canada",
      contactType: "whatsapp",
      contactValue: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      preferredTime: "Tuesday Evening (7:30 PM EST)",
      topics: ["Bible Basics for Beginners", "Christian Life & Prayer"]
    };
    saveLead(mock);
    setLeads(getStoredLeads());
  };

  // Filtered leads
  const filteredLeads = leads.filter(l => {
    const matchesFilter = filterStatus === 'All' || l.status === filterStatus;
    const term = searchTerm.toLowerCase();
    const matchesSearch = l.fullName.toLowerCase().includes(term) ||
                          l.id.toLowerCase().includes(term) ||
                          (l.contactValue || '').toLowerCase().includes(term) ||
                          l.country.toLowerCase().includes(term);
    return matchesFilter && matchesSearch;
  });

  // Calculate metrics
  const totalCount = leads.length;
  const newCount = leads.filter(l => l.status === 'New Lead').length;
  const confirmedCount = leads.filter(l => l.status === 'Confirmed Attendee' || l.status === 'Attended').length;
  const googleAdCount = leads.filter(l => (l.utmSource || '').includes('google')).length;

  return (
    <div className="admin-page">
      {/* Admin Top Navigation Bar */}
      <div className="admin-top-bar">
        <div className="container admin-nav-inner">
          <div className="admin-brand">
            <button onClick={() => navigateTo('home')} className="admin-back-btn">
              <ArrowLeft size={16} />
              <span>Back to Website</span>
            </button>
            <div className="admin-badge">
              <Shield size={16} />
              <span>Staff CRM Portal · V1.0</span>
            </div>
          </div>

          <div className="admin-quick-actions">
            <button onClick={handleCreateMockLead} className="btn-admin-secondary">
              <PlusCircle size={15} />
              <span>Generate Test Lead</span>
            </button>
            <button onClick={exportLeadsToCSV} className="btn-admin-export">
              <Download size={15} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container admin-main-content">
        {/* Metric Cards Row */}
        <div className="metrics-row">
          <div className="metric-card">
            <div className="metric-icon total-icon">
              <Users size={22} />
            </div>
            <div>
              <span className="metric-label">Total Leads</span>
              <h3 className="metric-number">{totalCount}</h3>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon new-icon">
              <Clock size={22} />
            </div>
            <div>
              <span className="metric-label">Needs Contact</span>
              <h3 className="metric-number">{newCount}</h3>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon confirmed-icon">
              <UserCheck size={22} />
            </div>
            <div>
              <span className="metric-label">Confirmed / Attended</span>
              <h3 className="metric-number">{confirmedCount}</h3>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon ad-icon">
              <TrendingUp size={22} />
            </div>
            <div>
              <span className="metric-label">Google Grants Leads</span>
              <h3 className="metric-number">{googleAdCount}</h3>
            </div>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="admin-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, ID, phone, country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && <button onClick={() => setSearchTerm('')} className="clear-btn">✕</button>}
          </div>

          <div className="status-filter-pills">
            {['All', ...statusOptions].map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`filter-pill-btn ${filterStatus === st ? 'active' : ''}`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Table Card */}
        <div className="leads-table-card">
          <div className="table-header-info">
            <h4>Registration Leads ({filteredLeads.length})</h4>
            <span className="table-sub-note">Changes are saved automatically to local storage</span>
          </div>

          <div className="table-responsive">
            <table className="leads-table">
              <thead>
                <tr>
                  <th>Lead ID</th>
                  <th>Full Name</th>
                  <th>Contact Info</th>
                  <th>Preferred Session</th>
                  <th>Source / UTM</th>
                  <th>Status</th>
                  <th>Follow-Up Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => {
                  const isEditing = editingNotesId === lead.id;
                  const isWhatsApp = lead.contactType === 'whatsapp';
                  const cleanPhone = (lead.contactValue || '').replace(/[^0-9]/g, '');

                  return (
                    <tr key={lead.id} className="lead-row">
                      {/* ID & Date */}
                      <td className="lead-id-cell">
                        <strong>{lead.id}</strong>
                        <span className="lead-date-sub">
                          {new Date(lead.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>

                      {/* Name & Country */}
                      <td className="lead-name-cell">
                        <div className="lead-name-text">{lead.fullName}</div>
                        <span className="lead-country-badge">{lead.country}</span>
                      </td>

                      {/* Contact Info & Direct Chat */}
                      <td className="lead-contact-cell">
                        <div className="contact-display">
                          {isWhatsApp ? (
                            <span className="wa-tag"><MessageCircle size={13} /> WhatsApp</span>
                          ) : (
                            <span className="email-tag"><Mail size={13} /> Email</span>
                          )}
                          <span className="contact-number">{lead.contactValue}</span>
                        </div>

                        {isWhatsApp && cleanPhone && (
                          <a
                            href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(lead.fullName)},%20this%20is%20the%20Grace%20%26%20Truth%20Bible%20Study%20team%20following%20up%20on%20your%20registration.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="chat-lead-btn"
                            title="Directly message this inquirer on WhatsApp"
                          >
                            <MessageCircle size={12} />
                            <span>Message Lead</span>
                          </a>
                        )}
                      </td>

                      {/* Session Time & Topics */}
                      <td className="lead-session-cell">
                        <span className="session-time">{lead.preferredTime}</span>
                        <div className="topic-tags-mini">
                          {(lead.topics || []).slice(0, 2).map((t, idx) => (
                            <span key={idx} className="topic-mini-tag">{t}</span>
                          ))}
                        </div>
                      </td>

                      {/* Marketing Attribution */}
                      <td className="lead-source-cell">
                        <span className="source-badge">{lead.utmSource || 'direct'}</span>
                        <span className="campaign-sub">{lead.utmCampaign || 'none'}</span>
                      </td>

                      {/* Status Dropdown */}
                      <td className="lead-status-cell">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`status-select status-${lead.status.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {statusOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>

                      {/* Notes Cell */}
                      <td className="lead-notes-cell">
                        {isEditing ? (
                          <div className="notes-edit-box">
                            <textarea
                              rows={2}
                              value={tempNotes}
                              onChange={(e) => setTempNotes(e.target.value)}
                              className="notes-textarea"
                            />
                            <div className="notes-actions">
                              <button onClick={() => handleSaveNotes(lead.id)} className="btn-notes-save">Save</button>
                              <button onClick={() => setEditingNotesId(null)} className="btn-notes-cancel">Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <div className="notes-display" onClick={() => { setEditingNotesId(lead.id); setTempNotes(lead.notes || ''); }}>
                            <p>{lead.notes || 'Click to add follow-up notes...'}</p>
                            <Edit3 size={12} className="notes-edit-icon" />
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="lead-actions-cell">
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="btn-delete-lead"
                          title="Delete Lead"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredLeads.length === 0 && (
                  <tr>
                    <td colSpan={8} className="no-leads-cell text-center">
                      No leads match your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
