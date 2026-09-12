import{r as E,t as g,f as i,v,w as h}from"./main-Cp1ODo_Z.js";/* empty css                   */function p(){var f;const n=document.getElementById("cart-page-items-container"),c=document.getElementById("cart-page-subtotal"),e=document.getElementById("cart-page-shipping"),l=document.getElementById("cart-page-total"),o=document.getElementById("cart-page-shipping-msg"),a=document.getElementById("cart-page-shipping-progress"),u=document.getElementById("cart-page-checkout-btn"),m=E();if(g(),m.length===0){n.innerHTML=`
          <div class="text-center py-5">
            <i class="bi bi-bag-x display-3 text-muted-custom mb-3"></i>
            <h4 class="font-heading text-black fw-bold">YOUR CART IS EMPTY</h4>
            <p class="text-muted-custom small mb-4">You have not added any detailing products yet.</p>
            <a href="shop.html" class="btn btn-x-primary btn-sm">EXPLORE COLLECTION</a>
          </div>
        `,u&&u.classList.add("disabled"),c&&(c.textContent=i(0)),e&&(e.textContent=i(0)),l&&(l.textContent=i(0)),a&&(a.style.width="0%");return}u&&u.classList.remove("disabled"),n.innerHTML=`
        <div class="table-responsive">
          <table class="table table-custom-dark w-100">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${m.map(t=>`
                <tr>
                  <td>
                    <div class="d-flex align-items-center gap-3">
                      <img src="${t.image}" alt="${t.name}" class="rounded p-1 bg-surface-custom border border-secondary border-opacity-25" style="width: 55px; height: 55px; object-fit: contain;">
                      <div>
                        <a href="product.html?id=${t.id}" class="text-black text-decoration-none fw-bold font-heading">${t.name}</a>
                        <div class="text-muted-custom font-mono small">SKU: ${t.sku||"N/A"}</div>
                      </div>
                    </div>
                  </td>
                  <td class="font-mono text-black fw-bold">${i(t.price)}</td>
                  <td>
                    <div class="quantity-control">
                      <button class="quantity-btn page-qty-minus" data-id="${t.id}">-</button>
                      <span class="quantity-value">${t.quantity}</span>
                      <button class="quantity-btn page-qty-plus" data-id="${t.id}">+</button>
                    </div>
                  </td>
                  <td class="font-mono text-accent fw-bold">${i(t.price*t.quantity)}</td>
                  <td>
                    <button class="btn btn-link text-muted-custom page-remove-item" data-id="${t.id}">
                      <i class="bi bi-trash fs-5"></i>
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `,n.querySelectorAll(".page-remove-item").forEach(t=>{t.addEventListener("click",()=>{v(t.getAttribute("data-id")),p()})}),n.querySelectorAll(".page-qty-minus").forEach(t=>{t.addEventListener("click",()=>{const d=t.getAttribute("data-id"),r=m.find(b=>b.id===d);r&&(h(d,r.quantity-1),p())})}),n.querySelectorAll(".page-qty-plus").forEach(t=>{t.addEventListener("click",()=>{const d=t.getAttribute("data-id"),r=m.find(b=>b.id===d);r&&(h(d,r.quantity+1),p())})});let y=((f=document.getElementById("cart-pincode-input"))==null?void 0:f.value.trim())||"";const s=g(y);if(c&&(c.textContent=i(s.subtotal)),e&&(s.shipping===0?e.innerHTML='<span class="text-success fw-bold">FREE (> ₹2,000)</span>':s.isLocalDelivery?e.innerHTML='<span class="text-accent fw-bold">₹40 <small class="text-muted-custom fw-normal">(Local 676xxx)</small></span>':e.innerHTML='<span class="text-dark fw-bold">₹80 <small class="text-muted-custom fw-normal">(Standard)</small></span>'),l&&(l.textContent=i(s.total)),o&&a)if(s.freeShippingRemaining>0){const t=Math.min(100,Math.round(s.subtotal/s.freeShippingThreshold*100));a.style.width=`${t}%`,o.innerHTML=`Add <strong>${i(s.freeShippingRemaining)}</strong> more to unlock <strong>FREE SHIPPING</strong>`}else a.style.width="100%",o.innerHTML='<span class="text-success fw-bold"><i class="bi bi-check-circle-fill me-1"></i> YOU HAVE UNLOCKED FREE SHIPPING!</span>'}document.addEventListener("DOMContentLoaded",()=>{p();const n=document.getElementById("cart-pincode-input"),c=document.getElementById("cart-pincode-btn"),e=document.getElementById("cart-pincode-feedback");function l(){const o=(n==null?void 0:n.value.trim())||"";if(p(),!e)return;const a=g(o);a.shipping===0?(e.innerHTML='<span class="text-success fw-bold"><i class="bi bi-check-circle-fill me-1"></i> Free Shipping Unlocked (Order > ₹2,000)!</span>',e.style.display="block"):a.isLocalDelivery?(e.innerHTML='<span class="text-accent fw-bold"><i class="bi bi-geo-alt-fill me-1"></i> Local Area Delivery (Near 676306): ₹40</span>',e.style.display="block"):o.length===6?(e.innerHTML='<span class="text-muted-custom"><i class="bi bi-truck me-1"></i> Standard Delivery: ₹80 (Free on orders > ₹2,000)</span>',e.style.display="block"):e.style.display="none"}c&&c.addEventListener("click",l),n&&n.addEventListener("input",l)});
