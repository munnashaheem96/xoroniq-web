import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        shop: resolve(__dirname, 'shop.html'),
        product: resolve(__dirname, 'product.html'),
        cart: resolve(__dirname, 'cart.html'),
        checkout: resolve(__dirname, 'checkout.html'),
        success: resolve(__dirname, 'success.html'),
        tracking: resolve(__dirname, 'tracking.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        adminLogin: resolve(__dirname, 'admin/login.html'),
        adminDashboard: resolve(__dirname, 'admin/index.html'),
        adminProducts: resolve(__dirname, 'admin/products.html'),
        adminOrders: resolve(__dirname, 'admin/orders.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: false,
  },
});
