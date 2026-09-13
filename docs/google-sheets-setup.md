# XORONIQ Car Care - Google Sheets Live Order Sync

Every order placed on XORONIQ is automatically dispatched in real-time to your Google Spreadsheet via Google Apps Script Webhook.

---

## 🚀 Quick 2-Minute Setup Guide

### Step 1: Create a Google Spreadsheet
1. Open [Google Sheets](https://sheets.new).
2. Title the sheet **"XORONIQ Orders"**.

### Step 2: Add the Google Apps Script
1. In the Google Sheets top menu, click **Extensions** → **Apps Script**.
2. Delete any existing code inside `Code.gs`.
3. Open the file [`google-apps-script.js`](../google-apps-script.js) from this repository, copy all code, and paste it into `Code.gs`.
4. Click the disk icon 💾 (**Save project**).

### Step 3: Deploy as Web App
1. Click the blue **Deploy** button (top right) → **New deployment**.
2. Click the gear icon ⚙️ next to *Select type* and select **Web app**.
3. Set the following fields:
   - **Description**: `XORONIQ Orders Webhook`
   - **Execute as**: `Me (<your-email>)`
   - **Who has access**: `Anyone` *(⚠️ Crucial: must be set to Anyone so your website can record orders)*
4. Click **Deploy**.
5. Click **Authorize access**, choose your Google account, click **Advanced** → **Go to XORONIQ Orders (unsafe)**, and click **Allow**.
6. Copy the generated **Web app URL** (starts with `https://script.google.com/macros/s/.../exec`).

### Step 4: Paste Webhook URL in Admin Dashboard
1. Go to your XORONIQ Admin: `/admin/orders.html`.
2. Click the **Google Sheets Sync** button.
3. Paste the URL into the **Google Apps Script Webhook URL** field and click **Save URL**.
4. Click **Send Test Row** to verify. A test row will immediately appear in your Google Sheet!

---

## 📊 What Data is Recorded in Google Sheets?

The script automatically creates an **"Orders"** sheet with styled dark slate headers:

| Column | Header | Example Value |
|:---:|---|---|
| A | **Timestamp** | `13/09/2026, 10:15:30 PM` |
| B | **Order ID** | `XOR-892147` |
| C | **Status** | `Payment Confirmed` |
| D | **Customer Name** | `Rahul Verma` |
| E | **Phone** | `9876543210` |
| F | **Email** | `rahul@example.com` |
| G | **Delivery Address** | `Plot 42, Civil Line Road` |
| H | **City** | `Kochi` |
| I | **State** | `Kerala` |
| J | **Pincode** | `682024` |
| K | **Items Ordered** | `XORONIQ Essential Kit (1x ₹1,199) [SKU: XOR-KIT-ESS-01]` |
| L | **Total Items** | `1` |
| M | **Subtotal (₹)** | `1199` |
| N | **Shipping (₹)** | `0` |
| O | **Total (₹)** | `1199` |
| P | **Payment Method** | `RAZORPAY` |
| Q | **Payment ID** | `pay_Q9x1Z8abc123` |

---

## 💡 Additional Features
- **Offline / Network Resilience**: If a network glitch occurs or no URL is set yet, orders are queued locally in `localStorage`.
- **Bulk Sync**: You can click **Sync All Existing Orders to Sheets** from `/admin/orders.html` at any time to push all historical orders.
- **Export CSV**: Instant 1-click download of all orders as a CSV file compatible with Excel and Google Sheets.
