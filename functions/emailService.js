// ==============================================================================
// XORONIQ CAR CARE - SECURE EMAIL DISPATCH SERVICE
// Transporter setup, 3-Partner notification & Customer order confirmation
// ==============================================================================

const nodemailer = require('nodemailer');
const { getCustomerEmailTemplate } = require('./templates/customerEmail');
const { getPartnerEmailTemplate } = require('./templates/partnerEmail');

let cachedTransporter = null;

/**
 * Initialize / Retrieve Nodemailer Transporter
 */
function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.EMAIL_USER || 'xoroniq@gmail.com';
  const pass = process.env.EMAIL_APP_PASSWORD ? process.env.EMAIL_APP_PASSWORD.replace(/\s+/g, '') : null;

  if (!pass) {
    console.warn('[EMAIL WARNING] EMAIL_APP_PASSWORD environment variable is not set. Email delivery will run in simulation mode.');
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass: pass || 'unset_app_password'
    },
    // Pool connection for faster burst delivery
    pool: true,
    maxConnections: 3,
    maxMessages: 50
  });

  return cachedTransporter;
}

/**
 * Get configured list of the 3 XORONIQ Partner email addresses
 * @returns {string[]}
 */
function getPartnerRecipients() {
  const p1 = process.env.PARTNER_EMAIL_1?.trim();
  const p2 = process.env.PARTNER_EMAIL_2?.trim();
  const p3 = process.env.PARTNER_EMAIL_3?.trim();

  const recipients = [p1, p2, p3].filter(email => Boolean(email && email.includes('@')));

  // If no partner emails are configured yet, fallback to sender email so notifications are never dropped
  if (recipients.length === 0) {
    const defaultRecipient = process.env.EMAIL_USER || 'xoroniq@gmail.com';
    return [defaultRecipient];
  }

  return recipients;
}

/**
 * Send Customer Order Confirmation Email
 * @param {Object} order
 * @returns {Promise<{ messageId: string, accepted: string[] }>}
 */
async function sendCustomerOrderEmail(order) {
  const customerEmail = order.customer?.email || order.customerEmail;
  if (!customerEmail || !customerEmail.includes('@')) {
    throw new Error(`Invalid customer email address: "${customerEmail}"`);
  }

  const { subject, html, text } = getCustomerEmailTemplate(order);
  const senderEmail = process.env.EMAIL_USER || 'xoroniq@gmail.com';
  const from = `XORONIQ <${senderEmail}>`;

  // Check if simulation mode (no app password configured)
  if (!process.env.EMAIL_APP_PASSWORD) {
    console.log(`[SIMULATED EMAIL] Customer confirmation for #${order.orderId} prepared for: ${customerEmail}`);
    return { messageId: `sim_cust_${Date.now()}`, accepted: [customerEmail] };
  }

  const transporter = getTransporter();
  const mailOptions = {
    from,
    to: customerEmail,
    replyTo: senderEmail,
    subject,
    html,
    text
  };

  const info = await transporter.sendMail(mailOptions);
  return { messageId: info.messageId, accepted: info.accepted };
}

/**
 * Send Partner New Order Notification Email (to all 3 partners)
 * @param {Object} order
 * @param {string} [frontendUrl]
 * @returns {Promise<{ messageId: string, accepted: string[] }>}
 */
async function sendPartnerOrderEmail(order, frontendUrl = process.env.FRONTEND_URL || 'https://xoroniq.store') {
  const recipients = getPartnerRecipients();
  const { subject, html, text } = getPartnerEmailTemplate(order, frontendUrl);
  const senderEmail = process.env.EMAIL_USER || 'xoroniq@gmail.com';
  const from = `XORONIQ <${senderEmail}>`;

  // Check if simulation mode
  if (!process.env.EMAIL_APP_PASSWORD) {
    console.log(`[SIMULATED EMAIL] Partner notification for #${order.orderId} prepared for ${recipients.length} partners: ${recipients.join(', ')}`);
    return { messageId: `sim_partner_${Date.now()}`, accepted: recipients };
  }

  const transporter = getTransporter();
  const mailOptions = {
    from,
    to: recipients,
    replyTo: order.customer?.email || senderEmail,
    subject,
    html,
    text
  };

  const info = await transporter.sendMail(mailOptions);
  return { messageId: info.messageId, accepted: info.accepted };
}

module.exports = {
  getTransporter,
  getPartnerRecipients,
  sendCustomerOrderEmail,
  sendPartnerOrderEmail
};
