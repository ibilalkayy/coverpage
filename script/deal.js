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

// ── Image preview ──
function previewImage(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById("upload-placeholder").classList.add("hidden");
    const preview = document.getElementById("upload-preview");
    preview.classList.remove("hidden");
    document.getElementById("preview-img").src = e.target.result;
    document.getElementById("preview-name").textContent = file.name;
  };
  reader.readAsDataURL(file);
}

// ── Format PKR ──
function pkr(val) {
  const n = parseInt(val) || 0;
  return "₨. " + n.toLocaleString("en-IN");
}

// ── Send Transaction ID to Cover WhatsApp ──
function sendTransactionToWhatsApp() {
  const name = document.getElementById("txn-name").value.trim();
  const txnId = document.getElementById("txn-id").value.trim();
  const amount = document.getElementById("txn-amount").value.trim();
  const method = document.getElementById("txn-method").value.trim();

  if (!txnId) {
    alert("Please enter your Transaction ID before sending.");
    return;
  }

  const lines = [
    "*Cover — Payment Confirmation*",
    "",
    name ? `Name: ${name}` : null,
    `Transaction ID: ${txnId}`,
    amount ? `Amount Paid: ${pkr(amount)}` : null,
    method ? `Method: ${method}` : null,
    "",
    "Sent via cover.mom",
  ]
    .filter((l) => l !== null)
    .join("\n");

  const phone = "923158105028";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(lines)}`;
  window.open(url, "_blank");
}

// ── Send Deal Details to Cover WhatsApp ──
function sendDealToWhatsApp() {
  const buyer = document.getElementById("deal-buyer").value.trim();
  const product = document.getElementById("deal-product").value.trim();
  const amount = document.getElementById("deal-amount").value.trim();
  const delivery = document.getElementById("deal-delivery").value.trim();
  const address = document.getElementById("deal-address").value.trim();
  const seller = document.getElementById("deal-seller-phone").value.trim();

  if (!product) {
    alert("Please enter the product name.");
    return;
  }

  const total = (parseInt(amount) || 0) + (parseInt(delivery) || 0);
  const fee = Math.max(100, total * 0.05);
  const buyerPays = total + fee;

  const lines = [
    "*Cover — New Deal Request*",
    "",
    buyer ? `Buyer: ${buyer}` : null,
    `Product: ${product}`,
    amount ? `Product Amount: ${pkr(amount)}` : null,
    delivery ? `Delivery: ${pkr(delivery)}` : null,
    total ? `Total (incl. cover fee): ${pkr(buyerPays)}` : null,
    address ? `Address: ${address}` : null,
    seller ? `Seller Phone: +92${seller}` : null,
    "",
    "Sent via cover.mom",
  ]
    .filter((l) => l !== null)
    .join("\n");

  const phone = "923158105028";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(lines)}`;
  window.open(url, "_blank");
}

// ── Notify Seller on WhatsApp ──
function sendDealToSeller() {
  const buyer = document.getElementById("deal-buyer").value.trim();
  const product = document.getElementById("deal-product").value.trim();
  const amount = document.getElementById("deal-amount").value.trim();
  const delivery = document.getElementById("deal-delivery").value.trim();
  const address = document.getElementById("deal-address").value.trim();
  const sellerRaw = document.getElementById("deal-seller-phone").value.trim();

  if (!sellerRaw) {
    alert("Please enter the seller's WhatsApp number first.");
    return;
  }
  if (!product) {
    alert("Please enter the product name first.");
    return;
  }

  const total = (parseInt(amount) || 0) + (parseInt(delivery) || 0);
  const fee = Math.max(100, total * 0.05);
  const buyerPays = total + fee;

  const lines = [
    "*Cover — Deal Started*",
    "",
    `Hi! A buyer has started a deal through *Cover* (cover.mom).`,
    "",
    `*Product:* ${product}`,
    buyer ? `*Buyer:* ${buyer}` : null,
    amount ? `*Product Amount:* ${pkr(amount)}` : null,
    delivery ? `*Delivery Charges:* ${pkr(delivery)}` : null,
    total ? `*Buyer Pays Cover:* ${pkr(buyerPays)}` : null,
    total ? `*You Receive:* ${pkr(total)}` : null,
    address ? `*Deliver To:* ${address}` : null,
    sellerRaw ? `*Seller Phone:* ${sellerRaw}` : null,
    "",
    `Payment is held securely with Cover and released only after a buyer confirms the delivery.`,
    `Please let us know that you received the order: *+92 315 810 5028*`,
    "",
    "cover.mom · Safe deals, every time",
  ]
    .filter((l) => l !== null)
    .join("\n");

  // strip spaces/dashes from phone
  const phone = "92" + sellerRaw.replace(/[\s\-]/g, "");
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(lines)}`;
  window.open(url, "_blank");
}
