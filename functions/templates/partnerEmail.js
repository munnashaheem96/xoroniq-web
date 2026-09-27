// ==============================================================================
// XORONIQ CAR CARE - PARTNER ORDER NOTIFICATION EMAIL TEMPLATE
// Subject: 🛒 New XORONIQ Order #{ORDER_ID} — ₹{TOTAL}
// Dispatched to all 3 XORONIQ Business Partners
// ==============================================================================

const { escapeHtml } = require('./customerEmail');

function formatPrice(num) {
  const n = Number(num) || 0;
  return '₹' + n.toLocaleString('en-IN');
}

/**
 * Generate Partner New Order Email (HTML & Plain Text)
 * @param {Object} order
 * @param {string} [frontendUrl='https://xoroniq.store']
 * @returns {{ subject: string, html: string, text: string }}
 */
function getPartnerEmailTemplate(order, frontendUrl = 'https://xoroniq.store') {
  const orderId = escapeHtml(order.orderId || 'XRQ-ORDER');
  const customerName = escapeHtml(order.customer?.name || order.customerName || 'Customer');
  const customerPhone = escapeHtml(order.customer?.phone || order.customerPhone || 'N/A');
  const customerEmail = escapeHtml(order.customer?.email || order.customerEmail || 'N/A');

  const addr = order.shippingAddress || {};
  const fullAddress = [
    addr.address,
    addr.city,
    addr.state ? `${addr.state} - ${addr.pincode || ''}` : addr.pincode,
    addr.country || 'India'
  ].filter(Boolean).map(escapeHtml).join(', ');

  const dateStr = order.createdAt?.toDate 
    ? order.createdAt.toDate().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })
    : new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });

  const items = Array.isArray(order.items) ? order.items : [];
  const subtotal = Number(order.subtotal) || 0;
  const shipping = Number(order.shipping) || 0;
  const discount = Number(order.discount) || 0;
  const total = Number(order.total) || 0;

  const rzpOrderId = escapeHtml(order.razorpayOrderId || order.payment?.razorpayOrderId || 'N/A');
  const rzpPaymentId = escapeHtml(order.razorpayPaymentId || order.payment?.razorpayPaymentId || 'N/A');

  const cleanPhone = String(order.customer?.phone || '').replace(/\D/g, '');
  const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

  const subject = `🛒 New XORONIQ Order #${orderId} — ${formatPrice(total)}`;
  const adminOrderUrl = `${frontendUrl}/admin/orders.html?search=${encodeURIComponent(order.orderId || '')}`;

  // Product table rows HTML
  const itemsHtml = items.map((item, idx) => {
    const itemName = escapeHtml(item.name || 'Automotive Formulation');
    const sku = escapeHtml(item.sku || 'N/A');
    const qty = Number(item.quantity) || 1;
    const price = Number(item.price) || 0;
    const itemTotal = price * qty;

    return `
      <tr>
        <td style="padding: 12px 14px; border-bottom: 1px solid #1e293b; color: #ffffff; font-size: 14px;">
          <strong>${itemName}</strong>
          <div style="font-size: 11px; color: #94a3b8; font-family: monospace;">SKU: ${sku}</div>
        </td>
        <td style="padding: 12px 14px; border-bottom: 1px solid #1e293b; color: #f8fafc; font-size: 14px; text-align: center; font-weight: bold;">
          ${qty}
        </td>
        <td style="padding: 12px 14px; border-bottom: 1px solid #1e293b; color: #cbd5e1; font-size: 14px; text-align: right; font-family: monospace;">
          ${formatPrice(price)}
        </td>
        <td style="padding: 12px 14px; border-bottom: 1px solid #1e293b; color: #38bdf8; font-size: 14px; text-align: right; font-weight: bold; font-family: monospace;">
          ${formatPrice(itemTotal)}
        </td>
      </tr>
    `;
  }).join('');

  // Plain text product list
  const itemsText = items.map((item) => {
    const qty = Number(item.quantity) || 1;
    const price = Number(item.price) || 0;
    return `Product: ${item.name}\nQuantity: ${qty}\nUnit Price: ${formatPrice(price)}\nSubtotal: ${formatPrice(price * qty)}`;
  }).join('\n\n');

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050811; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #e2e8f0;">
  
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #050811; padding: 30px 10px;">
    <tr>
      <td align="center">
        
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 620px; background-color: #0b1120; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
          
          <!-- Top Automotive Red/Gold Brand Strip -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #dc2626 0%, #f59e0b 50%, #0284c7 100%); font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 28px 36px 20px 36px; background-color: #090e1a; border-bottom: 1px solid #1e293b;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size: 22px; font-weight: 900; letter-spacing: 0.12em; color: #ffffff; text-transform: uppercase;">
                      XORONIQ CAR CARE
                    </div>
                    <div style="font-size: 13px; font-weight: 700; color: #f59e0b; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 3px;">
                      🔥 NEW ORDER RECEIVED — IMMEDIATE DISPATCH REQUIRED
                    </div>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; background-color: #166534; color: #4ade80; font-size: 11px; font-weight: 800; padding: 5px 12px; border-radius: 20px; border: 1px solid #22c55e;">
                      PAID
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Key Stats Hero Box -->
          <tr>
            <td style="padding: 24px 36px 18px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(2, 132, 199, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%); border: 1px solid rgba(2, 132, 199, 0.4); border-radius: 8px; padding: 18px 20px;">
                <tr>
                  <td width="50%" valign="top">
                    <div style="font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 600;">ORDER ID</div>
                    <div style="font-size: 20px; font-weight: 900; color: #38bdf8; font-family: monospace; margin-top: 2px;">#${orderId}</div>
                  </td>
                  <td width="50%" align="right" valign="top">
                    <div style="font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 600;">REVENUE VALUE</div>
                    <div style="font-size: 22px; font-weight: 900; color: #4ade80; font-family: monospace; margin-top: 2px;">${formatPrice(total)}</div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top: 10px; font-size: 12px; color: #cbd5e1;">
                    <strong>Order Placed:</strong> ${dateStr} (IST)
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Customer Details Box -->
          <tr>
            <td style="padding: 0 36px 20px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 18px;">
                <tr>
                  <td>
                    <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #38bdf8; margin-bottom: 8px;">
                      👤 CUSTOMER DETAILS
                    </div>
                    <div style="font-size: 14px; font-weight: 700; color: #ffffff;">Name: ${customerName}</div>
                    <div style="font-size: 13px; color: #cbd5e1; margin-top: 4px;">
                      Phone: <strong style="color: #ffffff;">${customerPhone}</strong>
                      ${cleanPhone ? `&nbsp;(<a href="https://wa.me/${waPhone}?text=${encodeURIComponent(`Hello ${customerName}, this is XORONIQ regarding order #${order.orderId}`)}" style="color: #4ade80; text-decoration: none; font-weight: bold;">Chat on WhatsApp</a>)` : ''}
                    </div>
                    <div style="font-size: 13px; color: #cbd5e1; margin-top: 3px;">
                      Email: <a href="mailto:${customerEmail}" style="color: #38bdf8; text-decoration: none;">${customerEmail}</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Breakdown Table -->
          <tr>
            <td style="padding: 0 36px 20px 36px;">
              <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #ffffff; margin-bottom: 8px;">
                📦 ORDER DETAILS &amp; ITEMS
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #1e293b; border-radius: 8px; overflow: hidden; background-color: #090e1a;">
                <thead>
                  <tr style="background-color: #0f172a; border-bottom: 1px solid #1e293b;">
                    <th style="padding: 10px 14px; text-align: left; font-size: 11px; text-transform: uppercase; color: #94a3b8;">Product</th>
                    <th style="padding: 10px 14px; text-align: center; font-size: 11px; text-transform: uppercase; color: #94a3b8; width: 50px;">Qty</th>
                    <th style="padding: 10px 14px; text-align: right; font-size: 11px; text-transform: uppercase; color: #94a3b8; width: 85px;">Unit Price</th>
                    <th style="padding: 10px 14px; text-align: right; font-size: 11px; text-transform: uppercase; color: #94a3b8; width: 95px;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" style="padding: 10px 14px 4px 14px; text-align: right; font-size: 13px; color: #94a3b8;">Subtotal:</td>
                    <td style="padding: 10px 14px 4px 14px; text-align: right; font-size: 13px; font-family: monospace; color: #f8fafc;">${formatPrice(subtotal)}</td>
                  </tr>
                  <tr>
                    <td colspan="3" style="padding: 4px 14px; text-align: right; font-size: 13px; color: #94a3b8;">Shipping:</td>
                    <td style="padding: 4px 14px; text-align: right; font-size: 13px; font-family: monospace; color: #f8fafc;">${shipping === 0 ? '<span style="color:#4ade80;">FREE</span>' : formatPrice(shipping)}</td>
                  </tr>
                  ${discount > 0 ? `
                  <tr>
                    <td colspan="3" style="padding: 4px 14px; text-align: right; font-size: 13px; color: #4ade80;">Discount:</td>
                    <td style="padding: 4px 14px; text-align: right; font-size: 13px; font-family: monospace; color: #4ade80;">-${formatPrice(discount)}</td>
                  </tr>
                  ` : ''}
                  <tr style="border-top: 1px solid #1e293b;">
                    <td colspan="3" style="padding: 12px 14px; text-align: right; font-size: 14px; font-weight: 800; color: #ffffff;">TOTAL AMOUNT PAID:</td>
                    <td style="padding: 12px 14px; text-align: right; font-size: 17px; font-weight: 900; font-family: monospace; color: #4ade80;">${formatPrice(total)}</td>
                  </tr>
                </tfoot>
              </table>
            </td>
          </tr>

          <!-- Payment Verification Details -->
          <tr>
            <td style="padding: 0 36px 20px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 14px 18px;">
                <tr>
                  <td>
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; font-weight: 700; margin-bottom: 4px;">
                      💳 PAYMENT VERIFICATION
                    </div>
                    <div style="font-size: 12px; color: #cbd5e1; line-height: 1.6;">
                      • <strong>Payment Status:</strong> <span style="color: #4ade80; font-weight: bold;">PAID</span>
                      <br>
                      • <strong>Razorpay Order ID:</strong> <span style="font-family: monospace; color: #f8fafc;">${rzpOrderId}</span>
                      <br>
                      • <strong>Razorpay Payment ID:</strong> <span style="font-family: monospace; color: #f8fafc;">${rzpPaymentId}</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Shipping Destination -->
          <tr>
            <td style="padding: 0 36px 24px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 16px 18px;">
                <tr>
                  <td>
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #38bdf8; font-weight: 700; margin-bottom: 4px;">
                      🚚 SHIPPING ADDRESS
                    </div>
                    <div style="font-size: 13px; color: #ffffff; line-height: 1.5;">
                      <strong>${customerName}</strong><br>
                      ${fullAddress}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Next Action Callout & Button -->
          <tr>
            <td style="padding: 0 36px 36px 36px; text-align: center;">
              <div style="background-color: #090e1a; border: 1px solid #1e293b; border-radius: 8px; padding: 18px; margin-bottom: 20px;">
                <div style="font-size: 12px; font-weight: 800; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.08em;">
                  NEXT ACTION
                </div>
                <div style="font-size: 13px; color: #cbd5e1; margin-top: 4px;">
                  Please inspect stock inventory, pack the parcel with quality seals, and book Delhivery Express shipment.
                </div>
              </div>

              <a href="${adminOrderUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; font-size: 14px; font-weight: 800; letter-spacing: 0.08em; text-decoration: none; padding: 14px 36px; border-radius: 6px; text-transform: uppercase; box-shadow: 0 4px 15px rgba(2, 132, 199, 0.4);">
                VIEW ORDER IN ADMIN PANEL
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 18px 36px; background-color: #050811; border-top: 1px solid #1e293b; text-align: center; font-size: 11px; color: #64748b;">
              XORONIQ Partner Automated Order Notification Hub • Dispatched to all 3 Business Partners
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;

  const text = `
XORONIQ CAR CARE
NEW ORDER RECEIVED
=========================================
Order ID: ${order.orderId || 'N/A'}
Order Date: ${dateStr}

CUSTOMER DETAILS
Name: ${order.customer?.name || order.customerName || 'N/A'}
Phone: ${order.customer?.phone || order.customerPhone || 'N/A'}
Email: ${order.customer?.email || order.customerEmail || 'N/A'}

ORDER DETAILS
${itemsText}

Subtotal: ${formatPrice(subtotal)}
Shipping: ${formatPrice(shipping)}
${discount > 0 ? `Discount: -${formatPrice(discount)}\n` : ''}TOTAL: ${formatPrice(total)}

PAYMENT
Payment Status: PAID
Razorpay Order ID: ${order.razorpayOrderId || order.payment?.razorpayOrderId || 'N/A'}
Razorpay Payment ID: ${order.razorpayPaymentId || order.payment?.razorpayPaymentId || 'N/A'}

SHIPPING ADDRESS
${fullAddress}

NEXT ACTION
Please process and dispatch this order.
View in Admin Panel: ${adminOrderUrl}

--
XORONIQ CAR CARE Partner Alert
  `.trim();

  return { subject, html, text };
}

module.exports = {
  getPartnerEmailTemplate
};
