// ==========================================================================
// XORONIQ CAR CARE - FIREBASE SERVICE MODULE
// Modular Firebase v10+ Architecture: Auth, Firestore & Cloud Storage
// ==========================================================================

import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';

import { CONFIG } from './config.js';
import { slugify, calculateDiscount } from './utils.js';

// Initialize Firebase App
const app = !getApps().length ? initializeApp(CONFIG.FIREBASE) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initial Products Catalog
export const INITIAL_ESSENTIAL_KIT = {
  id: 'xoroniq-essential-kit',
  name: 'XORONIQ Essential Kit',
  slug: 'xoroniq-essential-kit',
  category: 'KITS',
  price: 1199,
  compareAtPrice: 1499,
  discount: 20,
  stock: 50,
  sku: 'XOR-KIT-001',
  featured: true,
  active: true,
  isComingSoon: false,
  launchStatus: 'AVAILABLE NOW',
  shortDescription: 'Everything you need for a premium clean. Professional-grade automotive & bike detailing complete system.',
  description: 'The XORONIQ Essential Kit is our flagship detailing collection engineered for high-performance automotive and motorcycle enthusiasts. Formulated with laboratory-tested hydrophobic polymers and ultra-pure surfactants, this kit delivers extreme gloss, deep paint decontamination, streak-free glass clarity, and long-lasting protective shielding across all vehicle surfaces.',
  images: [
    'images/product/essentials.png'
  ],
  specs: [
    { label: 'Surface Compatibility', value: 'Paint, Glass, Chrome, Wheels, Plastics' },
    { label: 'Formulation', value: 'pH-Balanced, Ceramic-Infused Polymers' },
    { label: 'Durability', value: 'Up to 3 months hydrophobic protection' },
    { label: 'Origin', value: 'Engineered & Bottled for XORONIQ' }
  ],
  features: [
    'Ultra-slick foam shampoo lifts grime without scratching',
    'Ceramic detailer spray creates instant mirror shine and water beading',
    'Streak-free interior cleaner safe on touchscreens, leather, and trim',
    'Dual-pile edgeless microfiber buffing towels included'
  ],
  rating: 4.9,
  reviewsCount: 128,
  createdAt: new Date('2026-01-01T00:00:00Z'),
  updatedAt: new Date('2026-01-01T00:00:00Z')
};

export const INITIAL_PRO_KIT = {
  id: 'xoroniq-pro-kit',
  name: 'XORONIQ Pro Kit',
  slug: 'xoroniq-pro-kit',
  category: 'KITS',
  price: 2499,
  compareAtPrice: 2999,
  discount: 17,
  stock: 0,
  sku: 'XOR-KIT-PRO',
  featured: true,
  active: true,
  isComingSoon: true,
  launchStatus: 'LAUNCHING SOON',
  shortDescription: 'Advanced multi-stage detailing arsenal with ceramic coating, iron fallout remover, leather conditioner & pro accessories.',
  description: 'The XORONIQ Pro Kit is crafted for seasoned detailers and enthusiasts demanding professional-grade paint correction, intense hydrophobic gloss, and complete cockpit restoration. Features high-concentration iron fallout decontaminator, ultra-slick ceramic booster, and interior leather shield.',
  images: [
    'images/product/essentials.png'
  ],
  specs: [
    { label: 'Surface Compatibility', value: 'All Automotive & Motorcycle Surfaces' },
    { label: 'Protection Tier', value: 'Pro Ceramic Polymer Matrix' },
    { label: 'Durability', value: 'Up to 6 months hydrophobic barrier' },
    { label: 'Status', value: 'Launching Soon' }
  ],
  features: [
    'Heavy-duty pH-neutral iron fallout decontaminator',
    'Advanced SiO2 ceramic gloss enhancer & repellent',
    'Matte-finish interior detailer & UV shield',
    'Complete set of 4x plush microfiber towels & applicator pads'
  ],
  rating: 5.0,
  reviewsCount: 0,
  createdAt: new Date('2026-02-01T00:00:00Z'),
  updatedAt: new Date('2026-02-01T00:00:00Z')
};

export const INITIAL_ULTRA_KIT = {
  id: 'xoroniq-ultra-kit',
  name: 'XORONIQ Ultra Kit',
  slug: 'xoroniq-ultra-kit',
  category: 'KITS',
  price: 3999,
  compareAtPrice: 4999,
  discount: 20,
  stock: 0,
  sku: 'XOR-KIT-ULTRA',
  featured: true,
  active: true,
  isComingSoon: true,
  launchStatus: 'LAUNCHING SOON',
  shortDescription: 'The ultimate flagship detailing vault with 9H ceramic graphene coat, dual-action buffer set, engine bay protectant & comprehensive accessory set.',
  description: 'The pinnacle of automotive perfection. The XORONIQ Ultra Kit delivers laboratory-grade graphene protection, high-durability hydrophobic ceramic barriers, deep leather nourishment, engine bay degreasing, and precision detailing brushes in a luxury collector case.',
  images: [
    'images/product/essentials.png'
  ],
  specs: [
    { label: 'Surface Compatibility', value: 'Full Vehicle Exterior, Interior & Engine Bay' },
    { label: 'Protection Tier', value: '9H Graphene Ceramic Shield' },
    { label: 'Durability', value: 'Up to 12 months extreme protection' },
    { label: 'Status', value: 'Launching Soon' }
  ],
  features: [
    'Flagship 9H Graphene & SiO2 Ceramic Nanocoat',
    'Complete multi-stage wheel, glass, and engine bay formulas',
    'Leather conditioner & hydrophobic fabric sealant',
    'Luxury heavy-duty detailing bag, horsehair brushes & drying towel'
  ],
  rating: 5.0,
  reviewsCount: 0,
  createdAt: new Date('2026-03-01T00:00:00Z'),
  updatedAt: new Date('2026-03-01T00:00:00Z')
};

export const INITIAL_CATALOG = [INITIAL_ESSENTIAL_KIT, INITIAL_PRO_KIT, INITIAL_ULTRA_KIT];

// ==========================================================================
// FIRESTORE: PRODUCT SERVICES
// ==========================================================================

/**
 * Fetch products from Firestore with fallback to initial catalog
 */
export async function getProducts({ activeOnly = true, category = null } = {}) {
  try {
    const productsRef = collection(db, 'products');
    let q;
    
    if (activeOnly) {
      if (category && category !== 'ALL') {
        q = query(productsRef, where('active', '==', true), where('category', '==', category));
      } else {
        q = query(productsRef, where('active', '==', true));
      }
    } else {
      if (category && category !== 'ALL') {
        q = query(productsRef, where('category', '==', category));
      } else {
        q = query(productsRef);
      }
    }

    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const list = [];
      snapshot.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      return list;
    }
  } catch (error) {
    console.warn('Firestore fetch returned empty or network issue, using initial catalog:', error);
  }

  // If Firestore is empty or uninitialized, return the initial Catalog
  if (category && category !== 'ALL') {
    return INITIAL_CATALOG.filter(p => p.category.toUpperCase() === category.toUpperCase());
  }
  return INITIAL_CATALOG;
}

/**
 * Get single product by Firestore ID
 */
export async function getProductById(id) {
  const localMatch = INITIAL_CATALOG.find(p => p.id === id || p.slug === id);
  if (id === 'essentials' || id === 'xoroniq-essential-kit-01') {
    return INITIAL_ESSENTIAL_KIT;
  }
  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
  } catch (error) {
    console.error('Error fetching product by ID:', error);
  }
  return localMatch || INITIAL_ESSENTIAL_KIT;
}

/**
 * Get single product by slug
 */
export async function getProductBySlug(slug) {
  if (slug === INITIAL_ESSENTIAL_KIT.slug) {
    return INITIAL_ESSENTIAL_KIT;
  }
  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('slug', '==', slug));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      return { id: docSnap.id, ...docSnap.data() };
    }
  } catch (error) {
    console.error('Error fetching product by slug:', error);
  }
  return slug === INITIAL_ESSENTIAL_KIT.slug ? INITIAL_ESSENTIAL_KIT : null;
}

/**
 * Add a new product (Admin)
 */
export async function addProduct(productData) {
  try {
    const slug = productData.slug || slugify(productData.name);
    const discount = calculateDiscount(productData.price, productData.compareAtPrice);
    
    const docData = {
      name: productData.name,
      slug: slug,
      category: productData.category || 'CAR CARE',
      price: Number(productData.price) || 0,
      compareAtPrice: Number(productData.compareAtPrice) || 0,
      discount: discount,
      stock: Number(productData.stock) || 0,
      sku: productData.sku || `XOR-${Math.floor(1000 + Math.random() * 9000)}`,
      featured: Boolean(productData.featured),
      active: productData.active !== undefined ? Boolean(productData.active) : true,
      shortDescription: productData.shortDescription || '',
      description: productData.description || '',
      images: Array.isArray(productData.images) && productData.images.length > 0 
        ? productData.images 
        : ['images/product/essentials.png'],
      specs: productData.specs || [],
      rating: 5.0,
      reviewsCount: 1,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'products'), docData);
    return { id: docRef.id, ...docData };
  } catch (error) {
    console.error('Error adding product to Firestore:', error);
    throw error;
  }
}

/**
 * Update an existing product (Admin)
 */
export async function updateProduct(id, productData) {
  try {
    const docRef = doc(db, 'products', id);
    const updatePayload = {
      ...productData,
      updatedAt: serverTimestamp()
    };
    if (productData.price !== undefined || productData.compareAtPrice !== undefined) {
      updatePayload.discount = calculateDiscount(productData.price, productData.compareAtPrice);
    }
    await updateDoc(docRef, updatePayload);
    return true;
  } catch (error) {
    console.error('Error updating product in Firestore:', error);
    throw error;
  }
}

/**
 * Delete a product (Admin)
 */
export async function deleteProduct(id) {
  try {
    const docRef = doc(db, 'products', id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting product from Firestore:', error);
    throw error;
  }
}

/**
 * Upload product image to Firebase Storage
 */
export async function uploadProductImage(file, path) {
  try {
    const storageRef = ref(storage, path || `products/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image to Firebase Storage:', error);
    throw error;
  }
}

// ==========================================================================
// FIRESTORE: ORDER SERVICES
// ==========================================================================

/**
 * Save new customer order into Firestore
 */
export async function createOrder(orderData) {
  try {
    const orderPayload = {
      orderId: orderData.orderId,
      customer: {
        name: orderData.customer.name,
        email: orderData.customer.email,
        phone: orderData.customer.phone
      },
      shippingAddress: {
        address: orderData.shippingAddress.address,
        city: orderData.shippingAddress.city,
        state: orderData.shippingAddress.state,
        pincode: orderData.shippingAddress.pincode,
        country: orderData.shippingAddress.country || 'India'
      },
      items: orderData.items || [],
      subtotal: Number(orderData.subtotal) || 0,
      shipping: Number(orderData.shipping) || 0,
      total: Number(orderData.total) || 0,
      payment: {
        method: orderData.payment.method || 'RAZORPAY',
        razorpayPaymentId: orderData.payment.razorpayPaymentId || '',
        razorpayOrderId: orderData.payment.razorpayOrderId || '',
        status: orderData.payment.status || 'PAID'
      },
      orderStatus: 'Payment Confirmed', // "Payment Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'orders'), orderPayload);
    return { id: docRef.id, ...orderPayload };
  } catch (error) {
    console.error('Error creating order in Firestore:', error);
    throw error;
  }
}

/**
 * Get Order by Order ID (e.g. XOR-83921)
 */
export async function getOrderById(orderId) {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('orderId', '==', orderId.trim()));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      return { id: docSnap.id, ...docSnap.data() };
    }
  } catch (error) {
    console.error('Error fetching order by ID:', error);
  }
  return null;
}

/**
 * Search orders by Order ID or phone or email
 */
export async function searchOrders(searchTerm) {
  try {
    const ordersRef = collection(db, 'orders');
    const snapshot = await getDocs(ordersRef);
    const results = [];
    const term = searchTerm.toLowerCase().trim();

    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      const orderIdMatch = (data.orderId || '').toLowerCase().includes(term);
      const emailMatch = (data.customer?.email || '').toLowerCase().includes(term);
      const phoneMatch = (data.customer?.phone || '').includes(term);
      const nameMatch = (data.customer?.name || '').toLowerCase().includes(term);

      if (orderIdMatch || emailMatch || phoneMatch || nameMatch) {
        results.push({ id: docSnap.id, ...data });
      }
    });

    return results;
  } catch (error) {
    console.error('Error searching orders:', error);
    return [];
  }
}

/**
 * Fetch all orders (Admin)
 */
export async function getOrders({ status = null } = {}) {
  try {
    const ordersRef = collection(db, 'orders');
    let q = query(ordersRef);
    if (status && status !== 'ALL') {
      q = query(ordersRef, where('orderStatus', '==', status));
    }
    const snapshot = await getDocs(q);
    const list = [];
    snapshot.forEach(docSnap => {
      list.push({ id: docSnap.id, ...docSnap.data() });
    });
    return list;
  } catch (error) {
    console.error('Error fetching orders list:', error);
    return [];
  }
}

/**
 * Update order status (Admin)
 */
export async function updateOrderStatus(docId, newStatus) {
  try {
    const docRef = doc(db, 'orders', docId);
    await updateDoc(docRef, {
      orderStatus: newStatus,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}

/**
 * Get metrics for Admin Dashboard
 */
export async function getDashboardMetrics() {
  try {
    const products = await getProducts({ activeOnly: false });
    const orders = await getOrders();

    const totalProducts = products.length;
    const activeProducts = products.filter(p => p.active !== false).length;
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.orderStatus === 'Payment Confirmed' || o.orderStatus === 'Processing').length;
    const completedOrders = orders.filter(o => o.orderStatus === 'Delivered').length;
    const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    return {
      totalProducts,
      activeProducts,
      totalOrders,
      pendingOrders,
      completedOrders,
      totalSales
    };
  } catch (e) {
    console.error('Error calculating metrics:', e);
    return {
      totalProducts: 1,
      activeProducts: 1,
      totalOrders: 0,
      pendingOrders: 0,
      completedOrders: 0,
      totalSales: 0
    };
  }
}

// ==========================================================================
// AUTHENTICATION SERVICES
// ==========================================================================

export async function adminSignIn(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function adminSignOut() {
  return await signOut(auth);
}

export function onAdminAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

export async function sendAdminResetPassword(email) {
  return await sendPasswordResetEmail(auth, email);
}
