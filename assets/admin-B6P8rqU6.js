import{g as X,f as R,a as _,b as V,c as L,d as j,u as W,e as z,I as Q,h as F,s as b,i as Y,m as J,j as Z,k as ee,l as te}from"./main-Cp1ODo_Z.js";async function ce(){const d=document.getElementById("metric-total-products"),h=document.getElementById("metric-active-products"),y=document.getElementById("metric-total-orders"),I=document.getElementById("metric-pending-orders"),x=document.getElementById("metric-completed-orders"),k=document.getElementById("metric-total-sales"),f=document.getElementById("recent-orders-table-body");try{const l=await X();if(d&&(d.textContent=l.totalProducts),h&&(h.textContent=l.activeProducts),y&&(y.textContent=l.totalOrders),I&&(I.textContent=l.pendingOrders),x&&(x.textContent=l.completedOrders),k&&(k.textContent=R(l.totalSales)),f){const A=(await _()).slice(0,5);A.length===0?f.innerHTML=`
          <tr>
            <td colspan="5" class="text-center py-4 text-muted-custom">
              No orders placed yet. Orders will appear here in real-time.
            </td>
          </tr>
        `:f.innerHTML=A.map(t=>{var n;return`
          <tr>
            <td class="font-mono text-black fw-bold">${t.orderId}</td>
            <td class="text-black">${((n=t.customer)==null?void 0:n.name)||"Customer"}</td>
            <td class="small text-dark">${V(t.createdAt)}</td>
            <td class="font-mono text-accent fw-bold">${R(t.total)}</td>
            <td>
              <span class="badge-status ${t.orderStatus==="Delivered"?"status-delivered":"status-pending"}">
                ${t.orderStatus}
              </span>
            </td>
          </tr>
        `}).join("")}}catch(l){console.error("Error loading dashboard stats:",l)}}async function oe(){const d=document.getElementById("admin-products-table-body"),h=document.getElementById("admin-products-search"),y=document.getElementById("admin-products-category-filter"),I=document.getElementById("admin-add-product-btn"),x=document.getElementById("admin-products-count");let k=[],f=null;async function l(){if(d){d.innerHTML=`
      <tr>
        <td colspan="8" class="text-center py-4">
          <div class="spinner-border text-accent spinner-border-sm"></div> Accessing Catalog...
        </td>
      </tr>
    `;try{k=await te({activeOnly:!1}),w()}catch(t){console.error("Error fetching admin products:",t),d.innerHTML='<tr><td colspan="8" class="text-center py-4 text-danger">Failed to load products.</td></tr>'}}}function w(){let t=[...k];const n=h?h.value.toLowerCase().trim():"",C=y?y.value:"ALL";if(C!=="ALL"&&(t=t.filter(e=>J(e,C))),n&&(t=t.filter(e=>(e.name||"").toLowerCase().includes(n)||(e.sku||"").toLowerCase().includes(n)||(e.category||"").toLowerCase().includes(n)||Array.isArray(e.categories)&&e.categories.some(a=>a.toLowerCase().includes(n)))),x&&(x.textContent=`${t.length} Product${t.length===1?"":"s"}`),t.length===0){d.innerHTML=`
        <tr>
          <td colspan="8" class="text-center py-5 text-muted-custom">
            No products match the filter.
          </td>
        </tr>
      `;return}d.innerHTML=t.map(e=>{const a=Array.isArray(e.images)&&e.images.length>0?e.images[0]:e.image||"images/product/essentials.png";e.discount||Z(e.price,e.compareAtPrice);const g=j(e).map(S=>`<span class="badge bg-white border text-dark me-1">${S}</span>`).join("");return`
        <tr data-id="${e.id}">
          <td>
            <div class="d-flex align-items-center gap-3">
              <img src="${a}" alt="${e.name}" class="rounded bg-surface-custom p-1 border border-secondary border-opacity-25" style="width: 48px; height: 48px; object-fit: contain;">
              <div>
                <div class="font-heading fw-bold text-black">${e.name}</div>
                <div class="text-muted-custom font-mono" style="font-size: 0.72rem;">SKU: ${e.sku||"N/A"}</div>
              </div>
            </div>
          </td>
          <td>${g}</td>
          <td class="font-mono text-black fw-bold">
            ${R(e.price)}
            ${e.compareAtPrice>e.price?`<div class="text-muted-custom text-decoration-line-through small">${R(e.compareAtPrice)}</div>`:""}
          </td>
          <td>
            <span class="badge ${e.stock>10?"bg-success bg-opacity-25 text-success":e.stock>0?"bg-warning bg-opacity-25 text-warning":"bg-danger bg-opacity-25 text-danger"}">
              ${e.stock} Units
            </span>
          </td>
          <td>
            <div class="form-check form-switch">
              <input class="form-check-input form-check-input-custom toggle-active-switch" type="checkbox" data-id="${e.id}" ${e.active!==!1?"checked":""}>
            </div>
          </td>
          <td>
            <div class="form-check form-switch">
              <input class="form-check-input form-check-input-custom toggle-featured-switch" type="checkbox" data-id="${e.id}" ${e.featured?"checked":""}>
            </div>
          </td>
          <td>
            <div class="d-flex gap-2">
              <button class="btn btn-x-outline btn-sm edit-product-btn" data-id="${e.id}" title="Edit Product">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="btn btn-x-outline btn-sm text-danger border-danger border-opacity-25 delete-product-btn" data-id="${e.id}" title="Delete Product">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `}).join(""),d.querySelectorAll(".toggle-active-switch").forEach(e=>{e.addEventListener("change",async()=>{const a=e.getAttribute("data-id"),o=e.checked;try{await F(a,{active:o}),b(`Product visibility ${o?"activated":"deactivated"}.`,"success")}catch{b("Failed to update status in database.","error"),e.checked=!o}})}),d.querySelectorAll(".toggle-featured-switch").forEach(e=>{e.addEventListener("change",async()=>{const a=e.getAttribute("data-id"),o=e.checked;try{await F(a,{featured:o}),b("Featured status updated.","success")}catch{b("Failed to update featured flag.","error"),e.checked=!o}})}),d.querySelectorAll(".edit-product-btn").forEach(e=>{e.addEventListener("click",()=>{const a=e.getAttribute("data-id"),o=k.find(g=>g.id===a);o&&A(o)})}),d.querySelectorAll(".delete-product-btn").forEach(e=>{e.addEventListener("click",async()=>{const a=e.getAttribute("data-id");if(confirm("Are you sure you want to delete this product from Firestore?"))try{await ee(a),b("Product removed from catalog.","info"),l()}catch{b("Failed to delete product.","error")}})})}h&&h.addEventListener("input",w),y&&y.addEventListener("change",w),I&&I.addEventListener("click",()=>{A(null)}),l();function A(t=null){f=t?t.id:null;let n=document.getElementById("admin-product-modal");if(!n){document.body.insertAdjacentHTML("beforeend",`
        <div class="modal fade" id="admin-product-modal" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content modal-content-custom">
              <div class="modal-header border-secondary border-opacity-25">
                <h5 class="modal-title font-heading text-black fw-bold" id="product-modal-title">PRODUCT SPECIFICATION</h5>
                <button type="button" class="btn-close-custom" data-bs-dismiss="modal"><i class="bi bi-x-lg"></i></button>
              </div>
              <div class="modal-body p-4">
                <form id="admin-product-form">
                  <div class="row g-3">
                    <div class="col-md-12">
                      <label class="form-label font-heading text-black small fw-bold">PRODUCT NAME *</label>
                      <input type="text" id="p-name" class="form-control form-control-custom" required placeholder="e.g. XORONIQ Ultra Ceramic Spray">
                    </div>

                    <div class="col-12">
                      <label class="form-label font-heading text-black small fw-bold">APPLICABLE CATEGORIES (SELECT ALL THAT APPLY) *</label>
                      <div class="d-flex flex-wrap gap-3 p-3 bg-surface-custom border border-secondary border-opacity-25 rounded-3" id="p-categories-container">
                        <div class="form-check m-0">
                          <input class="form-check-input form-check-input-custom p-category-cb" type="checkbox" id="cat-car" value="CAR CARE">
                          <label class="form-check-label small fw-bold text-black ms-2 cursor-pointer" for="cat-car"><i class="bi bi-car-front text-accent me-1"></i> Car Care</label>
                        </div>
                        <div class="form-check m-0">
                          <input class="form-check-input form-check-input-custom p-category-cb" type="checkbox" id="cat-bike" value="BIKE CARE">
                          <label class="form-check-label small fw-bold text-black ms-2 cursor-pointer" for="cat-bike"><i class="bi bi-bicycle text-accent me-1"></i> Bike Care</label>
                        </div>
                        <div class="form-check m-0">
                          <input class="form-check-input form-check-input-custom p-category-cb" type="checkbox" id="cat-kits" value="KITS">
                          <label class="form-check-label small fw-bold text-black ms-2 cursor-pointer" for="cat-kits"><i class="bi bi-box-seam text-accent me-1"></i> Detailing Kits</label>
                        </div>
                        <div class="form-check m-0">
                          <input class="form-check-input form-check-input-custom p-category-cb" type="checkbox" id="cat-accessories" value="ACCESSORIES">
                          <label class="form-check-label small fw-bold text-black ms-2 cursor-pointer" for="cat-accessories"><i class="bi bi-tools text-accent me-1"></i> Accessories & Towels</label>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <label class="form-label font-heading text-black small fw-bold">PRICE (₹) *</label>
                      <input type="number" id="p-price" class="form-control form-control-custom" required min="0" placeholder="1199">
                    </div>
                    <div class="col-md-4">
                      <label class="form-label font-heading text-black small fw-bold">COMPARE PRICE (₹)</label>
                      <input type="number" id="p-compare-price" class="form-control form-control-custom" min="0" placeholder="1499">
                    </div>
                    <div class="col-md-4">
                      <label class="form-label font-heading text-black small fw-bold">STOCK UNITS *</label>
                      <input type="number" id="p-stock" class="form-control form-control-custom" required min="0" value="50">
                    </div>

                    <div class="col-md-6">
                      <label class="form-label font-heading text-black small fw-bold d-flex justify-content-between">
                        <span>SKU CODE *</span>
                        <span class="text-accent small cursor-pointer" id="btn-auto-sku" style="cursor: pointer;" title="Auto-generate SKU"><i class="bi bi-magic me-1"></i> Auto-Generate</span>
                      </label>
                      <div class="input-group">
                        <input type="text" id="p-sku" class="form-control form-control-custom" placeholder="e.g. XOR-CB-4892" required>
                        <button class="btn btn-x-outline-accent btn-sm px-3" type="button" id="btn-regen-sku" title="Generate New SKU">
                          <i class="bi bi-arrow-repeat"></i>
                        </button>
                      </div>
                    </div>
                    <div class="col-md-3 d-flex align-items-center mt-4">
                      <div class="form-check form-switch">
                        <input class="form-check-input form-check-input-custom" type="checkbox" id="p-active" checked>
                        <label class="form-check-label text-dark small fw-bold ms-2">Active</label>
                      </div>
                    </div>
                    <div class="col-md-3 d-flex align-items-center mt-4">
                      <div class="form-check form-switch">
                        <input class="form-check-input form-check-input-custom" type="checkbox" id="p-featured">
                        <label class="form-check-label text-dark small fw-bold ms-2">Featured</label>
                      </div>
                    </div>

                    <div class="col-12">
                      <label class="form-label font-heading text-black small fw-bold">SHORT HEADLINE DESCRIPTION</label>
                      <input type="text" id="p-short-desc" class="form-control form-control-custom" placeholder="Ultra-hydrophobic ceramic barrier for deep gloss.">
                    </div>

                    <div class="col-12">
                      <label class="form-label font-heading text-black small fw-bold">FULL PRODUCT DESCRIPTION</label>
                      <textarea id="p-desc" class="form-control form-control-custom" rows="3" placeholder="Engineered with SiO2 nanoparticles..."></textarea>
                    </div>

                    <!-- Image Upload or URL Input -->
                    <div class="col-12">
                      <label class="form-label font-heading text-black small fw-bold">PRODUCT IMAGE</label>
                      <div class="row g-2 align-items-center">
                        <div class="col-md-7">
                          <input type="file" id="p-image-file" class="form-control form-control-custom" accept="image/*">
                        </div>
                        <div class="col-md-5">
                          <input type="text" id="p-image-url" class="form-control form-control-custom" placeholder="Or enter Image URL">
                        </div>
                      </div>
                      <div class="mt-2 text-center" id="p-preview-container">
                        <img id="p-image-preview" src="images/product/essentials.png" class="upload-preview-img" alt="Preview">
                      </div>
                    </div>
                  </div>

                  <div class="d-flex justify-content-end gap-3 mt-4 pt-3 border-top border-secondary border-opacity-25">
                    <button type="button" class="btn btn-x-outline btn-sm" data-bs-dismiss="modal">CANCEL</button>
                    <button type="submit" class="btn btn-x-primary btn-sm" id="p-save-btn">
                      <i class="bi bi-cloud-check-fill me-1"></i> SAVE TO FIRESTORE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      `),n=document.getElementById("admin-product-modal");const i=document.getElementById("p-image-file"),s=document.getElementById("p-image-preview");i&&i.addEventListener("change",c=>{const p=c.target.files[0];if(p){const B=new FileReader;B.onload=G=>{s.src=G.target.result},B.readAsDataURL(p)}});const r=()=>{const c=Array.from(document.querySelectorAll(".p-category-cb:checked")).map(p=>p.value);return c.length>0?c:["CAR CARE"]},E=document.getElementById("btn-auto-sku"),P=document.getElementById("btn-regen-sku"),u=document.getElementById("p-sku"),v=document.getElementById("p-name"),U=()=>{const c=r(),p=v?v.value:"";u&&(u.value=L(c,p),b(`Generated SKU: ${u.value}`,"info"))};E&&E.addEventListener("click",U),P&&P.addEventListener("click",U),document.querySelectorAll(".p-category-cb").forEach(c=>{c.addEventListener("change",()=>{!f&&u&&(!u.value||u.value.startsWith("XOR-"))&&(u.value=L(r(),v?v.value:""))})})}const C=document.getElementById("product-modal-title"),e=document.getElementById("admin-product-form"),a=document.getElementById("p-name"),o=document.getElementById("p-price"),g=document.getElementById("p-compare-price"),S=document.getElementById("p-stock"),T=document.getElementById("p-sku"),O=document.getElementById("p-active"),$=document.getElementById("p-featured"),N=document.getElementById("p-short-desc"),M=document.getElementById("p-desc"),K=document.getElementById("p-image-url"),q=document.getElementById("p-image-preview"),H=()=>{const m=Array.from(document.querySelectorAll(".p-category-cb:checked")).map(i=>i.value);return m.length>0?m:["CAR CARE"]};if(t){C.textContent=`EDIT: ${t.name.toUpperCase()}`,a.value=t.name||"";const m=j(t);document.querySelectorAll(".p-category-cb").forEach(s=>{s.checked=m.some(r=>r===s.value||r.includes("CAR")&&s.value==="CAR CARE"||r.includes("BIKE")&&s.value==="BIKE CARE"||r.includes("KIT")&&s.value==="KITS"||r.includes("ACC")&&s.value==="ACCESSORIES")}),o.value=t.price||"",g.value=t.compareAtPrice||"",S.value=t.stock!==void 0?t.stock:50,T.value=t.sku||"",O.checked=t.active!==!1,$.checked=!!t.featured,N.value=t.shortDescription||"",M.value=t.description||"";const i=Array.isArray(t.images)&&t.images.length>0?t.images[0]:t.image||"images/product/essentials.png";K.value=i,q.src=i}else C.textContent="ADD NEW PRODUCT TO FIRESTORE",e.reset(),O.checked=!0,$.checked=!1,document.querySelectorAll(".p-category-cb").forEach(m=>{m.checked=m.value==="CAR CARE"||m.value==="BIKE CARE"}),T.value=L(H(),a.value),q.src="images/product/essentials.png";const D=new window.bootstrap.Modal(n);D.show(),e.onsubmit=async m=>{m.preventDefault();const i=document.getElementById("p-save-btn");i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> UPLOADING...';try{let s=K.value.trim()||"images/product/essentials.png";const r=document.getElementById("p-image-file");if(r&&r.files&&r.files[0]){const v=r.files[0];s=await new Promise(c=>{const p=new FileReader;p.onload=B=>c(B.target.result),p.onerror=()=>c("images/product/essentials.png"),p.readAsDataURL(v)});try{const c=await W(v,`products/${Date.now()}_${v.name}`);c&&(s=c)}catch{console.info("Storage cloud upload skipped, using image Data URL.")}}const E=H(),P=z({categories:E}),u={name:a.value.trim(),category:P,categories:E,price:parseFloat(o.value)||0,compareAtPrice:parseFloat(g.value)||0,stock:parseInt(S.value)||0,sku:T.value.trim()||L(E,a.value),active:O.checked,featured:$.checked,shortDescription:N.value.trim(),description:M.value.trim(),images:[s]};f&&f!==Q.id?(await F(f,u),b("Product updated successfully in Catalog.","success")):(await Y(u),b("New product added to Catalog & Live Storefront.","success")),D.hide(),await l()}catch(s){console.error("Error saving product:",s),b("Product saved to local catalog.","info"),D.hide(),await l()}finally{i.disabled=!1,i.innerHTML='<i class="bi bi-cloud-check-fill me-1"></i> SAVE TO FIRESTORE'}}}}export{oe as a,ce as i};
