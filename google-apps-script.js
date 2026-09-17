/**
 * ============================================================================
 * XORONIQ CAR CARE - GOOGLE SHEETS ORDER SYNC SCRIPT
 * ============================================================================
 * 
 * HOW TO INSTALL IN 2 MINUTES:
 * 1. Open Google Sheets (https://sheets.new) and name the spreadsheet "XORONIQ Orders"
 * 2. In Google Sheets top menu, click: Extensions -> Apps Script
 * 3. Delete any existing code in Code.gs, and paste ALL of this code.
 * 4. Click the blue "Deploy" button (top right) -> "New deployment"
 * 5. Click the gear icon (Select type) -> Select "Web app"
 * 6. Set Description: "XORONIQ Order Webhook"
 * 7. Set "Execute as": "Me" (your email)
 * 8. Set "Who has access": "Anyone"  <-- CRITICAL!
 * 9. Click "Deploy", authorize permissions when prompted.
 * 10. Copy the Web App URL (starts with https://script.google.com/macros/s/...)
 * 11. Paste that URL in XORONIQ Admin -> Orders -> Google Sheets Sync, or in js/sheets.js!
 */

const SHEET_NAME = "Orders";

const HEADERS = [
  "Timestamp",
  "Order ID",
  "Status",
  "Customer Name",
  "Phone",
  "Email",
  "Delivery Address",
  "City",
  "State",
  "Pincode",
  "Items Ordered",
  "Total Items",
  "Subtotal (₹)",
  "Shipping (₹)",
  "Total (₹)",
  "Payment Method",
  "Payment ID",
  "Courier",
  "Tracking ID"
];

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    message: "XORONIQ Google Sheets Order Webhook is live and ready to receive orders.",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    // Wait up to 10 seconds for lock to avoid race conditions with multiple concurrent orders
    lock.waitLock(10000);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // If sheet does not exist, create and setup
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Setup headers if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#0F172A"); // Sleek XORONIQ dark slate
      headerRange.setFontColor("#FFFFFF");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    // Parse incoming data
    let data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter;
      }
    } else {
      data = e.parameter || {};
    }

    // Format fields
    const now = new Date();
    const timestamp = data.timestamp || Utilities.formatDate(now, "Asia/Kolkata", "dd/MM/yyyy HH:mm:ss");
    const orderId = data.orderId || ("XOR-" + Math.floor(100000 + Math.random() * 900000));
    const isCod = (data.payment && data.payment.method === "COD") || data.paymentMethod === "COD" || data.paymentMethod === "CASH ON DELIVERY";
    const status = data.status || data.orderStatus || (isCod ? "Order Placed (COD)" : "Payment Confirmed");
    
    // Customer
    const customerName = (data.customer && data.customer.name) || data.customerName || data.name || "";
    const customerPhone = (data.customer && data.customer.phone) || data.customerPhone || data.phone || "";
    const customerEmail = (data.customer && data.customer.email) || data.customerEmail || data.email || "";

    // Address
    const address = (data.shippingAddress && data.shippingAddress.address) || data.address || "";
    const city = (data.shippingAddress && data.shippingAddress.city) || data.city || "";
    const state = (data.shippingAddress && data.shippingAddress.state) || data.state || "";
    const pincode = (data.shippingAddress && data.shippingAddress.pincode) || data.pincode || "";

    // Items
    let itemsStr = "";
    let totalItemsCount = 0;
    if (Array.isArray(data.items)) {
      itemsStr = data.items.map(function(item) {
        const qty = item.quantity || 1;
        totalItemsCount += Number(qty);
        return item.name + " (" + qty + "x ₹" + (item.price || 0) + ")" + (item.sku ? " [SKU: " + item.sku + "]" : "");
      }).join("; ");
    } else if (typeof data.items === "string") {
      itemsStr = data.items;
      totalItemsCount = data.totalItemsCount || 1;
    }

    // Pricing & Payment
    const subtotal = data.subtotal !== undefined ? Number(data.subtotal) : 0;
    const shipping = data.shipping !== undefined ? Number(data.shipping) : 0;
    const total = data.total !== undefined ? Number(data.total) : 0;
    const paymentMethod = isCod ? "CASH ON DELIVERY" : ((data.payment && data.payment.method) || data.paymentMethod || "RAZORPAY");
    const paymentId = (data.payment && data.payment.razorpayPaymentId) || data.paymentId || data.razorpayPaymentId || (isCod ? ("COD (Due: ₹" + total + ")") : "");
    const courier = data.courier || (data.trackingId ? "Delhivery" : "");
    const trackingId = data.trackingId || "";

    const row = [
      timestamp,
      orderId,
      status,
      customerName,
      "'" + customerPhone, // Prepend apostrophe so Sheets displays leading zeros
      customerEmail,
      address,
      city,
      state,
      "'" + pincode,
      itemsStr,
      totalItemsCount,
      subtotal,
      shipping,
      total,
      paymentMethod,
      paymentId,
      courier,
      trackingId
    ];

    sheet.appendRow(row);

    // Auto-resize columns on first few rows
    if (sheet.getLastRow() <= 10) {
      sheet.autoResizeColumns(1, HEADERS.length);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      orderId: orderId,
      rowNumber: sheet.getLastRow()
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}
