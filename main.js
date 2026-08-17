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

  if (!cartCount || !items || !cartTotal) {
    console.error("Cart element পাওয়া যায়নি");
    return;
  }

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

  if (!modal) {
    console.error("cartModal পাওয়া যায়নি");
    return;
  }

  modal.hidden = false;
  updateCart();
}

function closeCart() {
  const modal = document.getElementById("cartModal");

  if (modal) {
    modal.hidden = true;
  }
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

  /*

  */

  const whatsappNumber = window.open(`https://wa.me/8801576524569?text=${text}`, "_blank");;

  const whatsappURL =
    "https://wa.me/" +
    whatsappNumber +
    "?text=" +
    encodeURIComponent(orderText);

  window.open(whatsappURL, "_blank");
}

function searchProducts() {
  const query =
    document.getElementById("searchInput").value
      .trim()
      .toLowerCase();

  const products =
    document.querySelectorAll(".product");

  let found = 0;

  products.forEach(product => {
    const name =
      product.dataset.name.toLowerCase();

    const visible =
      !query || name.includes(query);

    product.style.display =
      visible ? "" : "none";

    if (visible) found++;
  });

  document.getElementById("noResults").hidden =
    found !== 0;

  document
    .getElementById("products")
    .scrollIntoView({
      behavior: "smooth"
    });
}

function showAll() {
  document.getElementById("searchInput").value = "";

  document
    .querySelectorAll(".product")
    .forEach(product => {
      product.style.display = "";
    });

  document.getElementById("noResults").hidden = true;
}

document.addEventListener("DOMContentLoaded", () => {
  updateCart();
});.empty-cart {
  text-align: center;
  color: #777;
  padding: 20px 10px;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  border-bottom: 1px solid #eee;
  padding: 14px 0;
}

.cart-item span {
  color: #222;
}

.cart-item strong {
  white-space: nowrap;
  color: #111;
}
