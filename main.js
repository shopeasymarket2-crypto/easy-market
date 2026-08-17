let cart = [];

function addToCart(name, price) {
  cart.push({name, price});
  updateCart();
  alert("পণ্যটি কার্টে যোগ হয়েছে ✅");
}

function updateCart() {
  document.getElementById("cartCount").textContent = cart.length;

  const items = document.getElementById("cartItems");
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (!cart.length) {
    items.innerHTML = '<p style="color:#777">কার্টে এখনো কোনো পণ্য নেই।</p>';
  } else {
    items.innerHTML = cart.map((item, i) =>
      `<div class="cart-item">
        <span>${i + 1}. ${item.name}</span>
        <strong>৳ ${item.price.toLocaleString("bn-BD")}</strong>
      </div>`
    ).join("");
  }

  document.getElementById("cartTotal").textContent =
    "৳ " + total.toLocaleString("bn-BD");
}

function openCart() {
  document.getElementById("cartModal").hidden = false;
  updateCart();
}

function closeCart() {
  document.getElementById("cartModal").hidden = true;
}

function checkout() {
  if (!cart.length) {
    alert("প্রথমে একটি পণ্য কার্টে যোগ করুন।");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const text = `Easy Market অর্ডার:%0A${cart.map(i => `• ${i.name} — ৳${i.price}`).join("%0A")}%0Aমোট: ৳${total}`;
  window.open(`https://wa.me/8801XXXXXXXXX?text=${text}`, "_blank");
}

function searchProducts() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const products = document.querySelectorAll(".product");
  let found = 0;

  products.forEach(product => {
    const name = product.dataset.name.toLowerCase();
    const visible = !query || name.includes(query);
    product.style.display = visible ? "" : "none";
    if (visible) found++;
  });

  document.getElementById("noResults").hidden = found !== 0;
  document.getElementById("products").scrollIntoView({behavior:"smooth"});
}

function showAll() {
  document.getElementById("searchInput").value = "";
  document.querySelectorAll(".product").forEach(p => p.style.display = "");
  document.getElementById("noResults").hidden = true;
}
