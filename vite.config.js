import { resolve } from 'path';
import { defineConfig } from 'vite';
import { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

// Inline plugin: recursively copy a folder into outDir after build
function copyFolder(src, destBase, outDir) {
  const entries = readdirSync(src);
  for (const entry of entries) {
    const srcPath = join(src, entry);
    const destPath = join(outDir, destBase, entry);
    const stat = statSync(srcPath);
    if (stat.isDirectory()) {
      mkdirSync(destPath, { recursive: true });
      copyFolder(srcPath, join(destBase, entry), outDir);
    } else {
      mkdirSync(join(outDir, destBase), { recursive: true });
      copyFileSync(srcPath, destPath);
    }
  }
}

function staticCopyPlugin(targets) {
  return {
    name: 'static-copy',
    closeBundle() {
      for (const { src, dest } of targets) {
        const outDir = resolve(__dirname, 'dist');
        copyFolder(resolve(__dirname, src), dest, outDir);
        console.log(`✓ Copied ${src} → dist/${dest}`);
      }
    }
  };
}

export default defineConfig({
  root: './',
  publicDir: false,
  plugins: [
    staticCopyPlugin([
      { src: 'images', dest: 'images' },
    ])
  ],
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
