// ==============================================================================
// XORONIQ CAR CARE - CUSTOMER ORDER CONFIRMATION EMAIL TEMPLATE
// Subject: Your XORONIQ Order #{ORDER_ID} is Confirmed
// ==============================================================================

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatPrice(num) {
  const n = Number(num) || 0;
  return '₹' + n.toLocaleString('en-IN');
}

/**
 * Generate Customer Order Confirmation Email (HTML & Plain Text)
 * @param {Object} order
 * @returns {{ subject: string, html: string, text: string }}
 */
function getCustomerEmailTemplate(order) {
  const orderId = escapeHtml(order.orderId || 'XRQ-ORDER');
  const customerName = escapeHtml(order.customer?.name || order.customerName || 'Valued Customer');
  const customerPhone = escapeHtml(order.customer?.phone || order.customerPhone || '');
  const customerEmail = escapeHtml(order.customer?.email || order.customerEmail || '');

  const addr = order.shippingAddress || {};
  const fullAddress = [
    addr.address,
    addr.city,
    addr.state ? `${addr.state} - ${addr.pincode || ''}` : addr.pincode,
    addr.country || 'India'
  ].filter(Boolean).map(escapeHtml).join(', ');

  const dateStr = order.createdAt?.toDate 
    ? order.createdAt.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const items = Array.isArray(order.items) ? order.items : [];
  const subtotal = Number(order.subtotal) || 0;
  const shipping = Number(order.shipping) || 0;
  const discount = Number(order.discount) || 0;
  const isCod = order.payment?.method === 'COD' || order.orderStatus === 'Order Placed (COD)';
  const codFee = Number(order.codFee || order.payment?.codFee || (isCod ? 25 : 0));
  const total = Number(order.total) || 0;
  const paymentId = escapeHtml(order.razorpayPaymentId || order.payment?.razorpayPaymentId || (isCod ? 'Cash on Delivery (Pending)' : 'Verified via Razorpay'));

  const subject = isCod 
    ? `Your XORONIQ Order #${orderId} is Confirmed [Cash on Delivery]`
    : `Your XORONIQ Order #${orderId} is Confirmed`;

  // HTML Product Rows
  const itemsHtml = items.map((item, idx) => {
    const itemName = escapeHtml(item.name || 'Automotive Formulation');
    const sku = escapeHtml(item.sku || 'XOR-PRO');
    const qty = Number(item.quantity) || 1;
    const price = Number(item.price) || 0;
    const itemTotal = price * qty;

    const itemDelivery = item.deliveryFee !== undefined ? Number(item.deliveryFee) : null;

    return `
      <tr>
        <td style="padding: 14px 16px; border-bottom: 1px solid #1e293b; color: #f8fafc; font-size: 14px; vertical-align: middle;">
          <div style="font-weight: 700; color: #ffffff;">${itemName}</div>
          <div style="font-size: 11px; color: #94a3b8; font-family: monospace; margin-top: 2px;">SKU: ${sku}${itemDelivery !== null ? ` • Delivery: ${formatPrice(itemDelivery)}` : ''}</div>
        </td>
        <td style="padding: 14px 16px; border-bottom: 1px solid #1e293b; color: #cbd5e1; font-size: 14px; text-align: center; vertical-align: middle;">
          ${qty}
        </td>
        <td style="padding: 14px 16px; border-bottom: 1px solid #1e293b; color: #cbd5e1; font-size: 14px; text-align: right; font-family: monospace; vertical-align: middle;">
          ${formatPrice(price)}
        </td>
        <td style="padding: 14px 16px; border-bottom: 1px solid #1e293b; color: #38bdf8; font-size: 14px; font-weight: 700; text-align: right; font-family: monospace; vertical-align: middle;">
          ${formatPrice(itemTotal)}
        </td>
      </tr>
    `;
  }).join('');

  // Plain Text Items list
  const itemsText = items.map((item, idx) => {
    const qty = Number(item.quantity) || 1;
    const price = Number(item.price) || 0;
    const itemDelivery = item.deliveryFee !== undefined ? ` • Delivery: ₹${item.deliveryFee}` : '';
    return `• ${item.name} (Qty: ${qty}) - ${formatPrice(price * qty)} [SKU: ${item.sku || 'N/A'}${itemDelivery}]`;
  }).join('\n');

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
        
        <!-- Main Email Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 620px; background-color: #0b1120; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
          
          <!-- Top Automotive Red/Cyan Brand Accent Line -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #dc2626 0%, #0284c7 100%); font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Header / Brand Banner -->
          <tr>
            <td style="padding: 32px 36px 24px 36px; text-align: center; background-color: #090e1a; border-bottom: 1px solid #1e293b;">
              <h1 style="margin: 0; font-size: 26px; font-weight: 900; letter-spacing: 0.15em; color: #ffffff; text-transform: uppercase;">
                XORONIQ
              </h1>
              <div style="font-size: 11px; font-weight: 600; color: #38bdf8; letter-spacing: 0.2em; text-transform: uppercase; margin-top: 4px;">
                CAR CARE • LAB FORMULATIONS
              </div>
            </td>
          </tr>

          <!-- Order Confirmed Hero Badge -->
          <tr>
            <td style="padding: 32px 36px 20px 36px;">
              ${isCod ? `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 8px; padding: 18px 20px;">
                <tr>
                  <td width="42" valign="middle" style="padding-right: 14px;">
                    <div style="width: 38px; height: 38px; border-radius: 50%; background-color: #b45309; text-align: center; line-height: 38px; color: #ffffff; font-size: 18px; font-weight: bold;">
                      📦
                    </div>
                  </td>
                  <td valign="middle">
                    <div style="font-size: 16px; font-weight: 800; color: #fbbf24; text-transform: uppercase; letter-spacing: 0.05em;">
                      Order Placed — Cash on Delivery
                    </div>
                    <div style="font-size: 13px; color: #cbd5e1; margin-top: 2px;">
                      Please keep exact cash or UPI ready for the courier partner upon parcel delivery.
                    </div>
                  </td>
                </tr>
              </table>
              ` : `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: rgba(34, 197, 94, 0.08); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 8px; padding: 18px 20px;">
                <tr>
                  <td width="42" valign="middle" style="padding-right: 14px;">
                    <div style="width: 38px; height: 38px; border-radius: 50%; background-color: #166534; text-align: center; line-height: 38px; color: #ffffff; font-size: 20px; font-weight: bold;">
                      ✓
                    </div>
                  </td>
                  <td valign="middle">
                    <div style="font-size: 16px; font-weight: 800; color: #4ade80; text-transform: uppercase; letter-spacing: 0.05em;">
                      Order Confirmed &amp; In Preparation
                    </div>
                    <div style="font-size: 13px; color: #cbd5e1; margin-top: 2px;">
                      Payment verified successfully via Razorpay.
                    </div>
                  </td>
                </tr>
              </table>
              `}
            </td>
          </tr>

          <!-- Personal Greeting -->
          <tr>
            <td style="padding: 0 36px 20px 36px; font-size: 14px; line-height: 1.6; color: #cbd5e1;">
              Hello <strong style="color: #ffffff;">${customerName}</strong>,
              <br><br>
              ${isCod 
                ? `Thank you for choosing <strong>XORONIQ Car Care</strong>. We have received your Cash on Delivery order and our fulfillment lab has initiated the precision sealing and packing process. Please keep <strong>${formatPrice(total)}</strong> ready to pay the courier agent via Cash or UPI upon delivery.`
                : `Thank you for trusting <strong>XORONIQ Car Care</strong>. We have received your order and our fulfillment lab has initiated the precision sealing and packing process. Your package will be dispatched via <strong>Delhivery Express</strong>.`}
            </td>
          </tr>

          <!-- Order Summary Meta Grid -->
          <tr>
            <td style="padding: 0 36px 24px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 16px;">
                <tr>
                  <td width="50%" style="padding: 6px 12px; vertical-align: top;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; font-weight: 600;">ORDER NUMBER</div>
                    <div style="font-size: 15px; font-weight: 800; color: #38bdf8; font-family: monospace; margin-top: 2px;">#${orderId}</div>
                  </td>
                  <td width="50%" style="padding: 6px 12px; vertical-align: top;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; font-weight: 600;">ORDER DATE</div>
                    <div style="font-size: 14px; font-weight: 600; color: #f8fafc; margin-top: 2px;">${dateStr}</div>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding: 10px 12px 6px 12px; vertical-align: top;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; font-weight: 600;">PAYMENT STATUS</div>
                    <div style="font-size: 13px; font-weight: 700; color: ${isCod ? '#fbbf24' : '#4ade80'}; margin-top: 2px;">${isCod ? 'DUE ON DELIVERY (COD)' : 'PAID (ONLINE PREPAID)'}</div>
                  </td>
                  <td width="50%" style="padding: 10px 12px 6px 12px; vertical-align: top;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; font-weight: 600;">TRANSACTION REF</div>
                    <div style="font-size: 12px; color: #cbd5e1; font-family: monospace; margin-top: 2px;">${paymentId}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Items Ordered Table -->
          <tr>
            <td style="padding: 0 36px 20px 36px;">
              <div style="font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #f8fafc; margin-bottom: 10px;">
                ITEMS IN YOUR ORDER
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #1e293b; border-radius: 8px; overflow: hidden; background-color: #090e1a;">
                <thead>
                  <tr style="background-color: #0f172a; border-bottom: 1px solid #1e293b;">
                    <th style="padding: 10px 16px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8;">Product</th>
                    <th style="padding: 10px 16px; text-align: center; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; width: 50px;">Qty</th>
                    <th style="padding: 10px 16px; text-align: right; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; width: 90px;">Price</th>
                    <th style="padding: 10px 16px; text-align: right; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; width: 100px;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" style="padding: 10px 16px 4px 16px; text-align: right; font-size: 13px; color: #94a3b8;">Subtotal:</td>
                    <td style="padding: 10px 16px 4px 16px; text-align: right; font-size: 13px; font-family: monospace; color: #f8fafc;">${formatPrice(subtotal)}</td>
                  </tr>
                  <tr>
                    <td colspan="3" style="padding: 4px 16px; text-align: right; font-size: 13px; color: #94a3b8;">Delivery Cash (Delhivery Express):</td>
                    <td style="padding: 4px 16px; text-align: right; font-size: 13px; font-family: monospace; color: #f8fafc;">${shipping === 0 ? '<span style="color:#4ade80; font-weight:bold;">FREE</span>' : formatPrice(shipping)}</td>
                  </tr>
                  ${(isCod || codFee > 0) ? `
                  <tr>
                    <td colspan="3" style="padding: 4px 16px; text-align: right; font-size: 13px; color: #f59e0b;">Cash on Delivery (COD) Fee:</td>
                    <td style="padding: 4px 16px; text-align: right; font-size: 13px; font-family: monospace; color: #f59e0b;">+${formatPrice(codFee)}</td>
                  </tr>
                  ` : ''}
                  ${discount > 0 ? `
                  <tr>
                    <td colspan="3" style="padding: 4px 16px; text-align: right; font-size: 13px; color: #4ade80;">Discount Applied:</td>
                    <td style="padding: 4px 16px; text-align: right; font-size: 13px; font-family: monospace; color: #4ade80;">-${formatPrice(discount)}</td>
                  </tr>
                  ` : ''}
                  <tr style="border-top: 1px solid #1e293b;">
                    <td colspan="3" style="padding: 14px 16px; text-align: right; font-size: 15px; font-weight: 800; color: #ffffff;">${isCod ? 'TOTAL PAYABLE ON DELIVERY:' : 'GRAND TOTAL:'}</td>
                    <td style="padding: 14px 16px; text-align: right; font-size: 18px; font-weight: 900; font-family: monospace; color: #38bdf8;">${formatPrice(total)}</td>
                  </tr>
                </tfoot>
              </table>
            </td>
          </tr>

          <!-- Delivery Address -->
          <tr>
            <td style="padding: 0 36px 24px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 18px;">
                <tr>
                  <td>
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #38bdf8; font-weight: 700; margin-bottom: 6px;">
                      🚚 SHIPPING ADDRESS
                    </div>
                    <div style="font-size: 14px; font-weight: 700; color: #ffffff;">${customerName}</div>
                    <div style="font-size: 13px; color: #cbd5e1; line-height: 1.5; margin-top: 4px;">
                      ${fullAddress}
                    </div>
                    <div style="font-size: 13px; color: #94a3b8; margin-top: 6px;">
                      <strong>Phone:</strong> ${customerPhone} • <strong>Email:</strong> ${customerEmail}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Expected Next Steps -->
          <tr>
            <td style="padding: 0 36px 28px 36px;">
              <div style="background-color: #090e1a; border: 1px solid #1e293b; border-radius: 8px; padding: 16px 20px;">
                <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #ffffff; margin-bottom: 10px;">
                  WHAT HAPPENS NEXT?
                </div>
                <div style="font-size: 13px; color: #cbd5e1; line-height: 1.6;">
                  1. <strong>Quality Verification:</strong> Formulations sealed and airtight checked in our detailing bay.
                  <br>
                  2. <strong>Express Dispatch:</strong> Dispatched via Delhivery within 24-48 business hours.
                  <br>
                  3. <strong>Tracking Assignment:</strong> Your Delhivery AWB tracking code will be SMS-alerted and can be tracked anytime on our website.
                </div>
              </div>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 36px 36px 36px; text-align: center;">
              <a href="https://xoroniq.store/tracking.html?orderId=${orderId}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; font-size: 14px; font-weight: 800; letter-spacing: 0.08em; text-decoration: none; padding: 14px 32px; border-radius: 6px; text-transform: uppercase; box-shadow: 0 4px 15px rgba(2, 132, 199, 0.4);">
                TRACK YOUR ORDER LIVE
              </a>
            </td>
          </tr>

          <!-- Footer / Concierge Support -->
          <tr>
            <td style="padding: 24px 36px; background-color: #050811; border-top: 1px solid #1e293b; text-align: center; font-size: 12px; color: #64748b; line-height: 1.6;">
              <div style="color: #94a3b8; font-weight: 600; margin-bottom: 6px;">
                Need assistance with your detailing regimen or order?
              </div>
              <div>
                WhatsApp: <a href="https://wa.me/919188510017" style="color: #38bdf8; text-decoration: none; font-weight: 600;">+91 9188510017</a>
                &nbsp;•&nbsp;
                Instagram: <a href="https://instagram.com/xoroniq" style="color: #38bdf8; text-decoration: none; font-weight: 600;">@xoroniq</a>
                &nbsp;•&nbsp;
                Email: <a href="mailto:xoroniq@gmail.com" style="color: #38bdf8; text-decoration: none; font-weight: 600;">xoroniq@gmail.com</a>
              </div>
              <div style="margin-top: 12px; font-size: 11px; color: #475569;">
                © 2026 XORONIQ CAR CARE. All rights reserved. • <a href="https://xoroniq.store" style="color: #64748b; text-decoration: underline;">xoroniq.store</a>
              </div>
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
XORONIQ CAR CARE - ORDER CONFIRMED
=========================================
Order ID: #${orderId}
Order Date: ${dateStr}
Payment Status: PAID (Razorpay: ${paymentId})

Hello ${customerName},

Thank you for choosing XORONIQ Car Care. We have received your payment and our detailing lab has started preparing your order for dispatch via Delhivery Express.

ITEMS ORDERED:
${itemsText}

Subtotal: ${formatPrice(subtotal)}
Shipping: ${shipping === 0 ? 'FREE' : formatPrice(shipping)}
${discount > 0 ? `Discount: -${formatPrice(discount)}\n` : ''}GRAND TOTAL: ${formatPrice(total)}

SHIPPING ADDRESS:
${customerName}
${fullAddress}
Phone: ${customerPhone}
Email: ${customerEmail}

NEXT STEPS:
1. Inspection & Airtight Sealing within 24 hours.
2. Delhivery Express dispatch within 24-48 business hours.
3. Live SMS & tracking AWB updates.

Track your order live: https://xoroniq.store/tracking.html?orderId=${orderId}

CONCIERGE & SUPPORT:
WhatsApp: +91 9188510017
Instagram: @xoroniq
Email: xoroniq@gmail.com
Website: https://xoroniq.store

© 2026 XORONIQ CAR CARE. All rights reserved.
  `.trim();

  return { subject, html, text };
}

module.exports = {
  getCustomerEmailTemplate,
  escapeHtml
};
