// ==============================================================================
// XORONIQ CAR CARE - LOCAL DEVELOPMENT SERVER RUNNER
// Runs the exact same backend endpoints locally on http://localhost:5001
// ==============================================================================

require('dotenv').config();
const { app } = require('./index');

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log('=================================================================');
  console.log(`🚀 XORONIQ CAR CARE BACKEND RUNNING ON http://localhost:${PORT}`);
  console.log('=================================================================');
  console.log(`• Health Check:     GET  http://localhost:${PORT}/api/health`);
  console.log(`• Create Order:     POST http://localhost:${PORT}/api/create-order`);
  console.log(`• Verify Payment:   POST http://localhost:${PORT}/api/verify-payment`);
  console.log(`• Razorpay Webhook: POST http://localhost:${PORT}/api/webhook`);
  console.log(`• Admin Resend:     POST http://localhost:${PORT}/api/resend-emails`);
  console.log('-----------------------------------------------------------------');
  console.log(`Email Sender:     ${process.env.EMAIL_USER || 'xoroniq@gmail.com'}`);
  console.log(`Partner Emails:   ${[process.env.PARTNER_EMAIL_1, process.env.PARTNER_EMAIL_2, process.env.PARTNER_EMAIL_3].filter(Boolean).join(', ') || 'Not set (defaults to sender)'}`);
  console.log(`App Password Set: ${process.env.EMAIL_APP_PASSWORD ? 'YES (Live SMTP Ready)' : 'NO (Running in Simulated Mode)'}`);
  console.log('=================================================================\n');
});
