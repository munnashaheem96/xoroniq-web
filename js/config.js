// ==========================================================================
// XORONIQ CAR CARE - ENVIRONMENT & CONFIGURATION
// ==========================================================================

export const CONFIG = {
  RAZORPAY_KEY_ID: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_TWJriH4XFtLA4T',
  FIREBASE: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAIeLh3I9tPRtHCPCFszon4yaJAxrbLetE',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'marketing-website-45737.firebaseapp.com',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'marketing-website-45737',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'marketing-website-45737.firebasestorage.app',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1042908231312',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1042908231312:web:de65221312f1673e328a15',
  },
  STORE: {
    NAME: 'XORONIQ Car Care',
    TAGLINE: 'Premium care. Powerful results.',
    CURRENCY: '₹',
    FREE_SHIPPING_THRESHOLD: 2000,
    STANDARD_SHIPPING_FEE: 80,
    LOCAL_SHIPPING_FEE: 40,
    LOCAL_PINCODE_BASE: '676306',
    EMAIL: 'xoroniq@gmail.com',
    PHONES: ['9633962953', '9544677531', '9207038205'],
    PHONE_FORMATTED: '+91 9633962953, +91 9544677531, +91 9207038205',
    INSTAGRAM: 'https://instagram.com/xoroniq',
    INSTAGRAM_HANDLE: '@xoroniq',
  },
};
