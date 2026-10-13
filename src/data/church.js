/**
 * Central church configuration.
 *
 * IMPORTANT: The bylaws do not include a physical address, founding year,
 * pastor names, or official contact channels. Do NOT invent these.
 * Fill in the fields marked TODO once the church confirms them — every page
 * reads from this file, so updating it here updates the whole site.
 */
export const CHURCH = {
  name: 'The Church of the True Light',
  shortName: 'True Light',
  tagline: 'Know God. Follow Christ. Shine His Light.',
  taglineZh: '认识神 · 跟随基督 · 活出真光',
  heroScripture: {
    text: 'You are the light of the world. A city that is set on a hill cannot be hid.',
    ref: 'Matthew 5:14',
  },
  contact: {
    // TODO: replace with the church's real, verified contact details.
    email: 'contact@example.org',
    whatsappNumber: '', // digits only incl. country code, e.g. '14155550123'. Leave '' to hide WhatsApp buttons.
    messengerUrl: '', // e.g. 'https://m.me/yourpage'. Leave '' to hide.
    address: '', // physical address if any. Leave '' to show "Online gatherings".
  },
  social: {
    youtube: '',
    facebook: '',
  },
};

export const NAV_LINKS = [
  { route: 'home', label: 'Home' },
  { route: 'about', label: 'About Us' },
  { route: 'beliefs', label: 'Our Beliefs' },
  { route: 'word', label: "God's Word" },
  { route: 'return', label: 'The Return of Christ' },
  { route: 'contact', label: 'Contact' },
];

export const whatsappLink = (message) =>
  CHURCH.contact.whatsappNumber
    ? `https://wa.me/${CHURCH.contact.whatsappNumber}?text=${encodeURIComponent(message)}`
    : null;
