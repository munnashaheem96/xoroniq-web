import{b as A,f as b,J as T,s as x,a as O,G as k,K as C}from"./main-Cp1ODo_Z.js";function D(){const s=document.getElementById("tracking-search-form"),o=document.getElementById("tracking-search-input"),r=document.getElementById("tracking-result-container"),l=new URLSearchParams(window.location.search).get("orderId");l&&o&&(o.value=l,u(l)),s&&o&&s.addEventListener("submit",e=>{e.preventDefault();const d=o.value.trim();if(!d){x("Please enter an Order ID or Phone number.","warning");return}u(d)});async function u(e){if(r){r.innerHTML=`
      <div class="text-center py-5">
        <div class="spinner-border text-accent mb-3"></div>
        <p class="font-heading small letter-spacing-wide text-muted-custom">LOCATING YOUR XORONIQ SHIPMENT...</p>
      </div>
    `;try{let d=await k(e);if(!d){const c=await C(e);c.length>0&&(d=c[0])}if(!d){r.innerHTML=`
          <div class="admin-card p-4 p-md-5 text-center">
            <i class="bi bi-search text-muted-custom display-4 mb-3"></i>
            <h4 class="font-heading text-black fw-bold">ORDER NOT FOUND</h4>
            <p class="text-muted-custom small mb-4">No order matched "<strong>${e}</strong>". Please verify your Order ID or mobile number.</p>
            <a href="contact.html" class="btn btn-x-outline-accent btn-sm">CONTACT CONCIERGE</a>
          </div>
        `;return}m(d)}catch(d){console.error("Error tracking order:",d),r.innerHTML='<p class="text-danger text-center">Failed to fetch order tracking status.</p>'}}}function m(e){var i,n,a,f,$,w;const d=["Order Placed","Payment Confirmed","Processing","Shipped","Delivered"],c=e.orderStatus||"Payment Confirmed",t=d.indexOf(c)>-1?d.indexOf(c):1;r.innerHTML=`
      <div class="glass-panel-heavy p-4 p-md-5">
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 border-bottom border-secondary border-opacity-25 pb-4 mb-4">
          <div>
            <span class="section-tag mb-1">LIVE DISPATCH TRACKER</span>
            <h3 class="font-heading text-black fw-bold mb-0">ORDER #${e.orderId}</h3>
            <div class="text-muted-custom small mt-1">Placed on ${A(e.createdAt)}</div>
          </div>
          <div>
            <span class="badge-status status-shipped fs-6 py-2 px-3">
              <i class="bi bi-geo-alt-fill me-1"></i> STATUS: ${c.toUpperCase()}
            </span>
          </div>
        </div>

        <!-- Animated Steps Timeline -->
        <div class="py-4">
          <div class="position-relative">
            <div class="row text-center g-3">
              ${d.map((p,E)=>{const I=E<t,S=E===t;let g="opacity-50",h="bi-circle",y="text-muted-custom";return I?(g="opacity-100",h="bi-check-circle-fill",y="text-success"):S&&(g="opacity-100",h="bi-record-circle-fill",y="text-accent"),`
                  <div class="col ${g}">
                    <div class="fs-2 ${y} mb-2">
                      <i class="bi ${h}"></i>
                    </div>
                    <div class="font-heading fw-bold small text-black">${p.toUpperCase()}</div>
                    <div class="text-muted-custom" style="font-size: 0.7rem;">${I?"Completed":S?"In Progress":"Pending"}</div>
                  </div>
                `}).join("")}
            </div>
          </div>
        </div>

        <!-- Order Summary & Shipping Address -->
        <div class="row g-4 mt-4 pt-4 border-top border-secondary border-opacity-25">
          <div class="col-md-6">
            <h5 class="font-heading text-black fw-bold mb-3">DESTINATION</h5>
            <div class="p-3 bg-surface-custom rounded border border-secondary border-opacity-25 small">
              <div class="fw-bold text-black mb-1">${((i=e.customer)==null?void 0:i.name)||"Valued Enthusiast"}</div>
              <div class="text-dark">${((n=e.shippingAddress)==null?void 0:n.address)||""}</div>
              <div class="text-dark">${((a=e.shippingAddress)==null?void 0:a.city)||""}, ${((f=e.shippingAddress)==null?void 0:f.state)||""} - ${(($=e.shippingAddress)==null?void 0:$.pincode)||""}</div>
              <div class="text-muted-custom mt-2">Phone: ${((w=e.customer)==null?void 0:w.phone)||"N/A"}</div>
            </div>
          </div>

          <div class="col-md-6">
            <h5 class="font-heading text-black fw-bold mb-3">ITEMS ORDERED</h5>
            <div class="p-3 bg-surface-custom rounded border border-secondary border-opacity-25 small">
              ${(e.items||[]).map(p=>`
                <div class="d-flex justify-content-between py-1 border-bottom border-secondary border-opacity-10">
                  <span class="text-black">${p.name} <span class="text-muted-custom">x${p.quantity}</span></span>
                  <span class="font-mono text-accent">${b(p.price*p.quantity)}</span>
                </div>
              `).join("")}
              <div class="d-flex justify-content-between pt-2 fw-bold text-black font-heading">
                <span>TOTAL PAID</span>
                <span class="text-accent">${b(e.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `}}async function M(){const s=document.getElementById("admin-orders-table-body"),o=document.getElementById("admin-orders-search"),r=document.getElementById("admin-orders-filter"),v=document.getElementById("admin-orders-count");if(!s)return;let l=[];async function u(){s.innerHTML=`
      <tr>
        <td colspan="7" class="text-center py-4">
          <div class="spinner-border text-accent spinner-border-sm"></div> Loading orders...
        </td>
      </tr>
    `;try{l=await O(),m()}catch(e){console.error("Error fetching admin orders:",e),s.innerHTML='<tr><td colspan="7" class="text-center py-4 text-danger">Failed to load orders.</td></tr>'}}function m(){let e=[...l];const d=o?o.value.toLowerCase().trim():"",c=r?r.value:"ALL";if(c!=="ALL"&&(e=e.filter(t=>t.orderStatus===c)),d&&(e=e.filter(t=>{var i,n,a;return(t.orderId||"").toLowerCase().includes(d)||(((i=t.customer)==null?void 0:i.name)||"").toLowerCase().includes(d)||(((n=t.customer)==null?void 0:n.phone)||"").includes(d)||(((a=t.customer)==null?void 0:a.email)||"").toLowerCase().includes(d)})),v&&(v.textContent=`${e.length} Orders`),e.length===0){s.innerHTML=`
        <tr>
          <td colspan="7" class="text-center py-5 text-muted-custom">
            No orders found matching criteria.
          </td>
        </tr>
      `;return}s.innerHTML=e.map(t=>{var i,n;return t.orderStatus,t.orderStatus,t.orderStatus,`
        <tr data-id="${t.id}">
          <td class="font-mono text-black fw-bold">${t.orderId}</td>
          <td>
            <div class="text-black fw-semibold">${((i=t.customer)==null?void 0:i.name)||"N/A"}</div>
            <div class="text-muted-custom small">${((n=t.customer)==null?void 0:n.phone)||""}</div>
          </td>
          <td class="small text-dark">${A(t.createdAt)}</td>
          <td>
            <span class="badge bg-white border text-dark">
              ${(t.items||[]).length} items
            </span>
          </td>
          <td class="font-mono text-accent fw-bold">${b(t.total)}</td>
          <td>
            <select class="form-select form-select-sm bg-white text-dark border order-status-select" data-id="${t.id}">
              <option value="Payment Confirmed" ${t.orderStatus==="Payment Confirmed"?"selected":""}>Payment Confirmed</option>
              <option value="Processing" ${t.orderStatus==="Processing"?"selected":""}>Processing</option>
              <option value="Shipped" ${t.orderStatus==="Shipped"?"selected":""}>Shipped</option>
              <option value="Delivered" ${t.orderStatus==="Delivered"?"selected":""}>Delivered</option>
              <option value="Cancelled" ${t.orderStatus==="Cancelled"?"selected":""}>Cancelled</option>
            </select>
          </td>
          <td>
            <button class="btn btn-x-outline btn-sm view-order-modal-btn" data-id="${t.id}">
              <i class="bi bi-eye me-1"></i> Details
            </button>
          </td>
        </tr>
      `}).join(""),s.querySelectorAll(".order-status-select").forEach(t=>{t.addEventListener("change",async i=>{const n=t.getAttribute("data-id"),a=i.target.value;try{await T(n,a),x(`Order status updated to ${a}`,"success")}catch{x("Failed to update status","error")}})}),s.querySelectorAll(".view-order-modal-btn").forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-id"),n=l.find(a=>a.id===i);n&&P(n)})})}o&&o.addEventListener("input",m),r&&r.addEventListener("change",m),u()}function P(s){var l,u,m,e,d,c,t,i,n;let o=document.getElementById("admin-order-modal");o||(document.body.insertAdjacentHTML("beforeend",`
      <div class="modal fade" id="admin-order-modal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content modal-content-custom">
            <div class="modal-header border-secondary border-opacity-25">
              <h5 class="modal-title font-heading text-black fw-bold" id="admin-order-modal-title">ORDER DETAILS</h5>
              <button type="button" class="btn-close-custom" data-bs-dismiss="modal"><i class="bi bi-x-lg"></i></button>
            </div>
            <div class="modal-body p-4" id="admin-order-modal-body"></div>
          </div>
        </div>
      </div>
    `),o=document.getElementById("admin-order-modal"));const r=document.getElementById("admin-order-modal-body");r.innerHTML=`
    <div class="row g-4 mb-4">
      <div class="col-md-6">
        <h6 class="font-heading text-black fw-bold mb-2">CUSTOMER CONTACT</h6>
        <div class="p-3 bg-surface-custom rounded border border-secondary border-opacity-25 small">
          <div><strong>Name:</strong> ${(l=s.customer)==null?void 0:l.name}</div>
          <div><strong>Email:</strong> ${(u=s.customer)==null?void 0:u.email}</div>
          <div><strong>Phone:</strong> ${(m=s.customer)==null?void 0:m.phone}</div>
        </div>
      </div>
      <div class="col-md-6">
        <h6 class="font-heading text-black fw-bold mb-2">SHIPPING ADDRESS</h6>
        <div class="p-3 bg-surface-custom rounded border border-secondary border-opacity-25 small">
          <div>${(e=s.shippingAddress)==null?void 0:e.address}</div>
          <div>${(d=s.shippingAddress)==null?void 0:d.city}, ${(c=s.shippingAddress)==null?void 0:c.state} - ${(t=s.shippingAddress)==null?void 0:t.pincode}</div>
          <div>${((i=s.shippingAddress)==null?void 0:i.country)||"India"}</div>
        </div>
      </div>
    </div>

    <h6 class="font-heading text-black fw-bold mb-2">ORDERED ITEMS</h6>
    <div class="table-responsive mb-4">
      <table class="table-custom-dark w-100">
        <thead>
          <tr>
            <th>Product</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${(s.items||[]).map(a=>`
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="${a.image}" alt="${a.name}" class="rounded" style="width: 35px; height: 35px; object-fit: contain;">
                  <span class="text-black fw-semibold">${a.name}</span>
                </div>
              </td>
              <td class="text-muted-custom font-mono small">${a.sku||"N/A"}</td>
              <td>${b(a.price)}</td>
              <td>${a.quantity}</td>
              <td class="font-mono text-accent fw-bold">${b(a.price*a.quantity)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>

    <div class="d-flex justify-content-between align-items-center pt-3 border-top border-secondary border-opacity-25 font-heading">
      <div class="text-muted-custom">Payment ID: <span class="font-mono text-black">${((n=s.payment)==null?void 0:n.razorpayPaymentId)||"N/A"}</span></div>
      <div class="fs-5 text-black">Grand Total: <span class="text-accent font-bold">${b(s.total)}</span></div>
    </div>
  `,new window.bootstrap.Modal(o).show()}export{D as a,M as i};
