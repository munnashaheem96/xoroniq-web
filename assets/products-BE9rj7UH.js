const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/main-Cp1ODo_Z.js","assets/main-B7QDS_tn.css"])))=>i.map(i=>d[i]);
import{l as E,j as h,e as A,f as g,B as x,F as L,D as $,m as C}from"./main-Cp1ODo_Z.js";const q="modulepreload",S=function(c){return"/"+c},v={},k=function(r,n,s){let a=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const e=document.querySelector("meta[property=csp-nonce]"),o=(e==null?void 0:e.nonce)||(e==null?void 0:e.getAttribute("nonce"));a=Promise.allSettled(n.map(i=>{if(i=S(i),i in v)return;v[i]=!0;const l=i.endsWith(".css"),d=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${i}"]${d}`))return;const m=document.createElement("link");if(m.rel=l?"stylesheet":q,l||(m.as="script"),m.crossOrigin="",m.href=i,o&&m.setAttribute("nonce",o),document.head.appendChild(m),l)return new Promise((y,w)=>{m.addEventListener("load",y),m.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${i}`)))})}))}function t(e){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=e,window.dispatchEvent(o),!o.defaultPrevented)throw e}return a.then(e=>{for(const o of e||[])o.status==="rejected"&&t(o.reason);return r().catch(t)})};let b=[],u="ALL",p="featured";async function T(c="products-grid-container",r={}){const n=document.getElementById(c);if(n){n.innerHTML=`
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-accent" role="status">
        <span class="visually-hidden">Loading Products...</span>
      </div>
      <p class="font-heading mt-3 text-muted-custom small letter-spacing-wide">ACCESSING XORONIQ CATALOG...</p>
    </div>
  `;try{b=await E({activeOnly:!0}),f(c,r),B(c,r),P(c,r)}catch(s){console.error("Failed to load products:",s),n.innerHTML=`
      <div class="col-12 text-center py-4 text-danger">
        <i class="bi bi-exclamation-triangle-fill display-5 mb-2"></i>
        <p>Failed to load products. Please refresh.</p>
      </div>
    `}}}function f(c,r={}){const n=document.getElementById(c);if(!n)return;let s=[...b];u!=="ALL"&&(s=s.filter(t=>C(t,u))),p==="price-low"?s.sort((t,e)=>(t.price||0)-(e.price||0)):p==="price-high"?s.sort((t,e)=>(e.price||0)-(t.price||0)):p==="newest"?s.sort((t,e)=>{var l,d;const o=((l=t.createdAt)==null?void 0:l.seconds)||0;return(((d=e.createdAt)==null?void 0:d.seconds)||0)-o}):s.sort((t,e)=>(e.featured?1:0)-(t.featured?1:0)),r.limit&&r.limit>0&&(s=s.slice(0,r.limit));const a=document.getElementById("product-count-display");if(a&&(a.textContent=`${s.length} Product${s.length===1?"":"s"}`),s.length===0){n.innerHTML=`
      <div class="col-12 text-center py-5">
        <i class="bi bi-box-seam text-muted-custom display-4 mb-3"></i>
        <h5 class="text-black font-heading fw-bold">NO PRODUCTS FOUND</h5>
        <p class="text-muted-custom small">No active products match the selected category.</p>
        <button class="btn btn-x-outline-accent btn-sm mt-2" id="reset-filter-btn">VIEW ALL PRODUCTS</button>
      </div>
    `;const t=document.getElementById("reset-filter-btn");t&&t.addEventListener("click",()=>{u="ALL",document.querySelectorAll(".filter-btn").forEach(o=>o.classList.toggle("active",o.getAttribute("data-category")==="ALL")),f(c,r)});return}n.innerHTML=s.map((t,e)=>{const o=(e%6+1)*.1,i=!!(t.isComingSoon||t.launchStatus==="LAUNCHING SOON"),l=t.discount||h(t.price,t.compareAtPrice);let d=Array.isArray(t.images)&&t.images.length>0?t.images[0]:t.image||"images/product/essentials.png";i&&(!d||d==="images/product/essentials.png")&&(d="images/product/anonymous-teaser.jpg");const m=A(t);return`
      <div class="col-lg-4 col-md-6 mb-4 reveal reveal-fade-up" style="animation-delay: ${o}s; transition-delay: ${o}s;">
        <div class="product-card ${i?"product-card-coming-soon":""}" data-id="${t.id}">
          <div class="product-card-image-wrap">
            ${i?'<span class="product-badge-discount bg-dark text-white border border-secondary border-opacity-50"><i class="bi bi-stars text-warning me-1"></i> LAUNCHING SOON</span>':l>0?`<span class="product-badge-discount">${l}% OFF</span>`:""}
            <span class="product-badge-category">${m}</span>
            <img src="${d}" alt="${t.name}" class="product-card-image" loading="lazy" onerror="this.src='images/product/anonymous-teaser.jpg'">
          </div>
          <div class="product-card-body">
            <a href="product.html?id=${t.id}" class="product-card-title">${t.name}</a>
            <p class="product-card-desc">${t.shortDescription||t.description||"Professional detailing formulation."}</p>
            <div class="product-card-pricing">
              ${i?'<span class="price-current font-mono fw-bold letter-spacing-wide text-dark">₹XXXX</span>':`<span class="price-current">${g(t.price)}</span>`}
              ${!i&&t.compareAtPrice>t.price?`<span class="price-compare">${g(t.compareAtPrice)}</span>`:""}
              ${i?'<span class="badge bg-warning bg-opacity-25 text-warning small ms-2">UPCOMING</span>':""}
            </div>
            <div class="product-card-actions">
              ${i?`<a href="product.html?id=${t.id}" class="btn btn-x-outline-accent btn-sm flex-grow-1">
                    <i class="bi bi-eye me-1"></i> PREVIEW KIT
                   </a>`:`<button class="btn btn-x-primary btn-sm add-cart-btn" data-id="${t.id}">
                    <i class="bi bi-cart-plus me-1"></i> ADD TO CART
                   </button>`}
              <button class="btn btn-x-outline btn-sm quick-view-btn" data-id="${t.id}" title="Quick View">
                <i class="bi bi-info-circle"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `}).join(""),n.querySelectorAll(".add-cart-btn").forEach(t=>{t.addEventListener("click",e=>{e.preventDefault();const o=t.getAttribute("data-id"),i=b.find(l=>l.id===o);i&&x(i,1)})}),n.querySelectorAll(".quick-view-btn").forEach(t=>{t.addEventListener("click",e=>{e.preventDefault();const o=t.getAttribute("data-id");O(o)})}),L(n),typeof window<"u"&&requestAnimationFrame(()=>{n.querySelectorAll(".reveal").forEach((t,e)=>{setTimeout(()=>{t.classList.add("is-revealed")},(e+1)*50)})})}function B(c,r){const n=document.querySelectorAll(".filter-btn");n.forEach(s=>{s.addEventListener("click",()=>{n.forEach(a=>a.classList.remove("active")),s.classList.add("active"),u=s.getAttribute("data-category")||"ALL",f(c,r)})})}function P(c,r){const n=document.getElementById("product-sort-select");n&&n.addEventListener("change",s=>{p=s.target.value,f(c,r)})}async function O(c){let r=document.getElementById("xoroniq-quickview-modal");r||(document.body.insertAdjacentHTML("beforeend",`
      <div class="modal fade" id="xoroniq-quickview-modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content modal-content-custom">
            <div class="modal-header border-0 pb-0">
              <button type="button" class="btn-close-custom ms-auto" data-bs-dismiss="modal" aria-label="Close">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
            <div class="modal-body p-4 p-md-5" id="quickview-modal-content">
              <!-- Injected dynamically -->
            </div>
          </div>
        </div>
      </div>
    `),r=document.getElementById("xoroniq-quickview-modal"));const n=document.getElementById("quickview-modal-content");n.innerHTML=`
    <div class="text-center py-4">
      <div class="spinner-border text-accent"></div>
    </div>
  `;const s=new window.bootstrap.Modal(r);s.show();const a=b.find(d=>d.id===c)||await $(c);if(!a){n.innerHTML='<p class="text-center text-danger">Product details could not be found.</p>';return}const t=!!(a.isComingSoon||a.launchStatus==="LAUNCHING SOON");let e=Array.isArray(a.images)&&a.images.length>0?a.images[0]:a.image||"images/product/essentials.png";t&&(!e||e==="images/product/essentials.png")&&(e="images/product/anonymous-teaser.jpg");const o=a.discount||h(a.price,a.compareAtPrice);if(n.innerHTML=`
    <div class="row align-items-center g-4">
      <div class="col-md-6 text-center">
        <div class="p-4 bg-surface-custom rounded-3 border border-secondary border-opacity-25 position-relative">
          ${t?'<span class="product-badge-discount bg-dark text-white border border-secondary border-opacity-50 position-absolute top-0 start-0 m-3"><i class="bi bi-stars text-warning me-1"></i> LAUNCHING SOON</span>':o>0?`<span class="product-badge-discount position-absolute top-0 start-0 m-3">${o}% OFF</span>`:""}
          <img src="${e}" alt="${a.name}" class="img-fluid" style="max-height: 280px; object-fit: contain;" onerror="this.src='images/product/anonymous-teaser.jpg'">
        </div>
      </div>
      <div class="col-md-6">
        <span class="section-tag mb-2">${a.category||"CAR & BIKE CARE"}</span>
        <h3 class="font-heading text-black fw-bold mb-2">${a.name}</h3>
        <div class="d-flex align-items-baseline gap-3 mb-3">
          ${t?'<span class="price-current fs-3 text-black font-mono fw-bold">₹XXXX</span>':`<span class="price-current fs-3 text-black">${g(a.price)}</span>`}
          ${!t&&a.compareAtPrice>a.price?`<span class="price-compare">${g(a.compareAtPrice)}</span>`:""}
          ${t?'<span class="badge bg-warning bg-opacity-25 text-warning small ms-2">UPCOMING</span>':""}
        </div>
        <p class="text-body small mb-4">${a.description||a.shortDescription||"Engineered for exceptional surface protection and gloss."}</p>
        
        <div class="d-flex gap-3 align-items-center mb-4">
          ${t?`<button class="btn btn-x-primary flex-grow-1" id="modal-notify-btn">
                <i class="bi bi-bell-fill me-1"></i> NOTIFY ME ON LAUNCH
               </button>`:`<div class="quantity-control">
                <button class="quantity-btn" id="modal-qty-minus">-</button>
                <span class="quantity-value" id="modal-qty-val">1</span>
                <button class="quantity-btn" id="modal-qty-plus">+</button>
               </div>
               <button class="btn btn-x-primary flex-grow-1" id="modal-add-cart-btn">
                <i class="bi bi-cart-plus me-1"></i> ADD TO CART
               </button>`}
        </div>
        
        <a href="product.html?id=${a.id}" class="text-accent small font-heading fw-bold letter-spacing-wide text-decoration-none d-inline-flex align-items-center gap-1">
          VIEW FULL PRODUCT DETAILS <i class="bi bi-arrow-right"></i>
        </a>
      </div>
    </div>
  `,t){const d=document.getElementById("modal-notify-btn");d&&d.addEventListener("click",()=>{k(async()=>{const{showToast:m}=await import("./main-Cp1ODo_Z.js").then(y=>y.L);return{showToast:m}},__vite__mapDeps([0,1])).then(({showToast:m})=>{m(`Thank you! We will notify you when ${a.name} launches.`,"info"),s.hide()})});return}let i=1;const l=document.getElementById("modal-qty-val");document.getElementById("modal-qty-minus").addEventListener("click",()=>{i>1&&(i--,l.textContent=i)}),document.getElementById("modal-qty-plus").addEventListener("click",()=>{i++,l.textContent=i}),document.getElementById("modal-add-cart-btn").addEventListener("click",()=>{x(a,i),s.hide()})}export{T as i};
