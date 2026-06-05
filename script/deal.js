// ── Toggle collapsible panels ──
function togglePanel(panelId, btnId, arrowId) {
  const panel = document.getElementById(panelId);
  const arrow = document.getElementById(arrowId);
  const isOpen = panel.classList.contains("open");
  if (isOpen) {
    panel.classList.remove("open");
    arrow.classList.remove("rotated");
  } else {
    panel.classList.add("open");
    arrow.classList.add("rotated");
  }
}

// ── Format PKR ──
function pkr(val) {
  const n = Math.round(parseInt(val) || 0);
  return "₨. " + n.toLocaleString("en-IN");
}

// ── Recalculate fee breakdown live ──
function recalc() {
  const amt = parseInt(document.getElementById("d-amount").value) || 0;
  const del = parseInt(document.getElementById("d-delivery").value) || 0;
  const sub = amt + del;
  const rawFee = sub * 0.05;
  const fee = Math.max(100, rawFee);
  const total = sub + fee;

  document.getElementById("bd-product").textContent = pkr(amt);
  document.getElementById("bd-delivery").textContent = pkr(del);
  document.getElementById("bd-fee").textContent = pkr(fee);
  document.getElementById("bd-total").textContent = pkr(total);
  document.getElementById("bd-seller").textContent = pkr(sub);
  document.getElementById("bd-min").style.display =
    rawFee < 100 && sub > 0 ? "block" : "none";
}

// ── Send Transaction + Deal Details to Cover ──
function sendToCover() {
  const name = document.getElementById("d-name").value.trim();
  const phone = document.getElementById("d-phone").value.trim();
  const txn = document.getElementById("d-txn").value.trim();
  const method = document.getElementById("d-method").value.trim();
  const product = document.getElementById("d-product").value.trim();
  const amt = parseInt(document.getElementById("d-amount").value) || 0;
  const del = parseInt(document.getElementById("d-delivery").value) || 0;
  const address = document.getElementById("d-address").value.trim();
  const seller = document.getElementById("d-seller").value.trim();

  if (!seller) {
    alert("Please enter the seller's WhatsApp number.");
    return;
  }
  if (!product) {
    alert("Please enter the product name.");
    return;
  }

  const sub = amt + del;
  const fee = Math.max(100, sub * 0.05);
  const total = sub + fee;

  const lines = [
    "*Cover — New Deal + Payment Confirmation*",
    "",
    name ? `Name: ${name}` : null,
    phone ? `Phone: +92${phone}` : null,
    txn ? `Transaction ID: ${txn}` : null,
    method ? `Payment Method: ${method}` : null,
    `Total Paid: ${pkr(total)}`,
    "",
    `Product: ${product}`,
    amt ? `Product Amount: ${pkr(amt)}` : null,
    del ? `Delivery: ${pkr(del)}` : null,
    `Cover Fee (5%): ${pkr(fee)}`,
    address ? `Delivery Address: ${address}` : null,
    `Seller Phone: +92${seller}`,
    "",
    "Sent via cover.mom",
  ]
    .filter((l) => l !== null)
    .join("\n");

  const coverPhone = "923158105028";
  window.open(
    `https://wa.me/${coverPhone}?text=${encodeURIComponent(lines)}`,
    "_blank",
  );
}

// ── Notify Seller on WhatsApp ──
function sendToSeller() {
  const buyer = document.getElementById("d-name").value.trim();
  const buyerPhone = document.getElementById("d-phone").value.trim();
  const product = document.getElementById("d-product").value.trim();
  const amt = parseInt(document.getElementById("d-amount").value) || 0;
  const del = parseInt(document.getElementById("d-delivery").value) || 0;
  const address = document.getElementById("d-address").value.trim();
  const sellerRaw = document.getElementById("d-seller").value.trim();

  if (!sellerRaw) {
    alert("Please enter the seller's WhatsApp number.");
    return;
  }
  if (!product) {
    alert("Please enter the product name.");
    return;
  }

  const sub = amt + del;

  const lines = [
    "*Cover — Deal Started*",
    "",
    `Hi! A buyer has started a deal through *Cover* (cover.mom).`,
    "",
    `*Product:* ${product}`,
    buyer ? `*Buyer Name:* ${buyer}` : null,
    buyerPhone ? `*Buyer Phone:* +92${buyerPhone}` : null,
    amt ? `*Product Amount:* ${pkr(amt)}` : null,
    del ? `*Delivery Charges:* ${pkr(del)}` : null,
    sub ? `*Total Amount:* ${pkr(sub)}` : null,
    address ? `*Delivery Address:* ${address}` : null,
    "",
    `Payment is held securely with Cover and released only after buyer confirms delivery.`,
    `Please confirm you received this order: *+92 315 810 5028*`,
    "",
    "cover.mom · Safe deals, every time",
  ]
    .filter((l) => l !== null)
    .join("\n");

  const phone = "92" + sellerRaw.replace(/[\s\-]/g, "");
  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(lines)}`,
    "_blank",
  );
}
