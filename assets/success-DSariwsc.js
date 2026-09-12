import{G as m,H as l,b as u,f as r}from"./main-Cp1ODo_Z.js";/* empty css                   */document.addEventListener("DOMContentLoaded",async()=>{var c,s,i;const d=new URLSearchParams(window.location.search).get("orderId");let t=null;if(d&&(t=await m(d)),t||(t=l("xoroniq_last_order")),!t){document.getElementById("confirmed-order-id").textContent="ORDER #PROCESSED";return}document.getElementById("confirmed-order-id").textContent=`ORDER #${t.orderId}`,document.getElementById("order-date-label").textContent=`Placed on ${u(t.createdAt||new Date)}`,document.getElementById("order-cust-name").textContent=((c=t.customer)==null?void 0:c.name)||"Customer",document.getElementById("order-cust-email").textContent=((s=t.customer)==null?void 0:s.email)||"",document.getElementById("order-cust-phone").textContent=`Phone: ${((i=t.customer)==null?void 0:i.phone)||""}`;const e=t.shippingAddress;e&&(document.getElementById("order-shipping-dest").innerHTML=`
          ${e.address}<br>
          ${e.city}, ${e.state} - ${e.pincode}<br>
          ${e.country||"India"}
        `);const o=document.getElementById("receipt-items-tbody");o&&t.items&&(o.innerHTML=t.items.map(n=>`
          <tr>
            <td>
              <div class="d-flex align-items-center gap-2">
                <img src="${n.image}" class="rounded p-1 bg-surface-custom border border-secondary border-opacity-25" style="width: 38px; height: 38px; object-fit: contain;">
                <span class="text-black fw-bold">${n.name}</span>
              </div>
            </td>
            <td class="font-mono text-black">${r(n.price)}</td>
            <td>${n.quantity}</td>
            <td class="font-mono text-accent fw-bold">${r(n.price*n.quantity)}</td>
          </tr>
        `).join("")),document.getElementById("receipt-grand-total").textContent=r(t.total);const a=document.getElementById("track-order-link");a&&(a.href=`tracking.html?orderId=${t.orderId}`)});
