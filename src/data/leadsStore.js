const LEADS_STORAGE_KEY = "church_bible_study_leads_v1";

const INITIAL_MOCK_LEADS = [
  {
    id: "LEAD-2026-88192",
    fullName: "Michael Vance",
    country: "United States",
    language: "English",
    contactType: "whatsapp",
    contactValue: "+1 (415) 892-4102",
    preferredTime: "Tuesday Evening (7:30 PM EST)",
    topics: ["Bible Basics for Beginners", "End Times & Prophecy"],
    utmSource: "google_ad_grants",
    utmMedium: "cpc",
    utmCampaign: "bible_study_us_search",
    landingPage: "/free-online-bible-study",
    createdAt: "2026-10-09T18:32:00.000Z",
    status: "Confirmed Attendee",
    notes: "Spoke via WhatsApp. Wants to understand the Book of John. Sent Zoom meeting link for Tuesday."
  },
  {
    id: "LEAD-2026-79341",
    fullName: "Grace O'Connor",
    country: "Canada",
    language: "English",
    contactType: "email",
    contactValue: "grace.oconnor@gmail.com",
    preferredTime: "Thursday Evening (8:00 PM EST)",
    topics: ["Christian Life & Prayer"],
    utmSource: "direct",
    utmMedium: "organic",
    utmCampaign: "homepage_referral",
    landingPage: "/",
    createdAt: "2026-10-08T14:15:00.000Z",
    status: "Contacted",
    notes: "Emailed introductory syllabus and fellowship schedule. Waiting for reply."
  },
  {
    id: "LEAD-2026-67120",
    fullName: "Jean-Paul Baptiste",
    country: "United States (Florida)",
    language: "English",
    contactType: "whatsapp",
    contactValue: "+1 (305) 555-0199",
    preferredTime: "Saturday Morning (10:00 AM EST)",
    topics: ["End Times & Prophecy", "Bible Basics for Beginners"],
    utmSource: "youtube",
    utmMedium: "video_description",
    utmCampaign: "prophecy_series_video_1",
    landingPage: "/free-online-bible-study",
    createdAt: "2026-10-07T09:45:00.000Z",
    status: "Attended",
    notes: "Attended Saturday morning Zoom group. Very engaged, asked to join next week."
  }
];

export function getStoredLeads() {
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(INITIAL_MOCK_LEADS));
      return INITIAL_MOCK_LEADS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading leads from storage:", e);
    return INITIAL_MOCK_LEADS;
  }
}

export function saveLead(formData) {
  const current = getStoredLeads();
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const newLeadId = `LEAD-2026-${randomNum}`;

  // Parse UTM parameters from current URL if available
  let utmSource = "google_ad_grants";
  let utmMedium = "search";
  let utmCampaign = "bible_study_core_v1";

  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    if (params.get("utm_source")) utmSource = params.get("utm_source");
    if (params.get("utm_medium")) utmMedium = params.get("utm_medium");
    if (params.get("utm_campaign")) utmCampaign = params.get("utm_campaign");
  }

  const newLead = {
    id: newLeadId,
    fullName: formData.fullName || "Anonymous Inquirer",
    country: formData.country || "United States",
    language: "English",
    contactType: formData.contactType || "whatsapp",
    contactValue: formData.contactValue || "",
    preferredTime: formData.preferredTime || "Tuesday Evening (7:30 PM EST)",
    topics: formData.topics || ["Bible Basics for Beginners"],
    utmSource: utmSource,
    utmMedium: utmMedium,
    utmCampaign: utmCampaign,
    landingPage: window?.location?.pathname || "/free-online-bible-study",
    createdAt: new Date().toISOString(),
    status: "New Lead",
    notes: "Submitted via online registration form."
  };

  const updated = [newLead, ...current];
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  return newLead;
}

export function updateLeadStatus(leadId, newStatus, newNotes) {
  const current = getStoredLeads();
  const updated = current.map(lead => {
    if (lead.id === leadId) {
      return {
        ...lead,
        status: newStatus !== undefined ? newStatus : lead.status,
        notes: newNotes !== undefined ? newNotes : lead.notes,
        lastUpdated: new Date().toISOString()
      };
    }
    return lead;
  });
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function deleteLead(leadId) {
  const current = getStoredLeads();
  const updated = current.filter(l => l.id !== leadId);
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function exportLeadsToCSV() {
  const leads = getStoredLeads();
  if (!leads.length) return;

  const headers = ["Lead ID", "Full Name", "Country", "Contact Type", "Contact", "Preferred Time", "Topics", "Source", "Campaign", "Status", "Date", "Notes"];
  
  const rows = leads.map(l => [
    `"${l.id}"`,
    `"${l.fullName.replace(/"/g, '""')}"`,
    `"${l.country}"`,
    `"${l.contactType}"`,
    `"${l.contactValue}"`,
    `"${l.preferredTime}"`,
    `"${(l.topics || []).join("; ")}"`,
    `"${l.utmSource}"`,
    `"${l.utmCampaign}"`,
    `"${l.status}"`,
    `"${new Date(l.createdAt).toLocaleDateString()}"`,
    `"${(l.notes || "").replace(/"/g, '""')}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `church_bible_study_leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
