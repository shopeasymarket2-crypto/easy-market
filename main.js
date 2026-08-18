let cart = [];

function addToCart(name, price) {
  cart.push({
    name: name,
    price: Number(price)
  });

  updateCart();
  alert("পণ্যটি কার্টে যোগ হয়েছে ✅");
}

function updateCart() {
  const cartCount = document.getElementById("cartCount");
  const items = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartCount || !items || !cartTotal) return;

  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    items.innerHTML =
      '<p class="empty-cart">কার্টে এখনো কোনো পণ্য নেই।</p>';

    cartTotal.textContent = "৳ ০";
    return;
  }

  let total = 0;

  items.innerHTML = cart.map((item, index) => {
    total += Number(item.price);

    return `
      <div class="cart-item">
        <div>
          <span>${index + 1}. ${item.name}</span>
        </div>
        <strong>
          ৳ ${Number(item.price).toLocaleString("bn-BD")}
        </strong>
      </div>
    `;
  }).join("");

  cartTotal.textContent =
    "৳ " + total.toLocaleString("bn-BD");
}

function openCart() {
  const modal = document.getElementById("cartModal");

  if (!modal) return;

  modal.hidden = false;
  updateCart();
}

function closeCart() {
  const modal = document.getElementById("cartModal");

  if (!modal) return;

  modal.hidden = true;
}

function checkout() {
  if (cart.length === 0) {
    alert("প্রথমে একটি পণ্য কার্টে যোগ করুন।");
    return;
  }

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  const orderText = [
    "Easy Market অর্ডার:",
    "",
    ...cart.map(
      (item, index) =>
        `${index + 1}. ${item.name} — ৳${Number(item.price).toLocaleString("bn-BD")}`
    ),
    "",
    `মোট: ৳${total.toLocaleString("bn-BD")}`
  ].join("\n");

  const whatsappNumber = "8801576524569";

  const whatsappURL =
    "https://wa.me/" +
    whatsappNumber +
    "?text=" +
    encodeURIComponent(orderText);

  window.open(whatsappURL, "_blank");
}

function searchProducts() {
  const input = document.getElementById("searchInput");

  if (!input) return;

  const query = input.value.trim().toLowerCase();

  const products = document.querySelectorAll(".product");

  let found = 0;

  products.forEach(product => {
    const name =
      (product.dataset.name || "").toLowerCase();

    const visible =
      !query || name.includes(query);

    product.style.display =
      visible ? "" : "none";

    if (visible) found++;
  });

  const noResults = document.getElementById("noResults");

  if (noResults) {
    noResults.hidden = found !== 0;
  }
}

function showAll() {
  const input = document.getElementById("searchInput");

  if (input) {
    input.value = "";
  }

  document
    .querySelectorAll(".product")
    .forEach(product => {
      product.style.display = "";
    });

  const noResults = document.getElementById("noResults");

  if (noResults) {
    noResults.hidden = true;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCart();
});
