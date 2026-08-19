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
/* ================================
   EASY MARKET CATEGORY MANAGER
   ================================ */

const defaultCategories = [
  { icon: "🧴", name: "বিউটি", description: "সৌন্দর্য পণ্য" },
  { icon: "👕", name: "ফ্যাশন", description: "পোশাক ও স্টাইল" },
  { icon: "🏠", name: "হোম", description: "ঘরের প্রয়োজনীয়" },
  { icon: "📱", name: "ইলেকট্রনিক্স", description: "স্মার্ট গ্যাজেট" },
  { icon: "🍳", name: "কিচেন", description: "রান্নাঘরের পণ্য" },
  { icon: "🎁", name: "গিফট", description: "সবার জন্য উপহার" }
];

let categories = JSON.parse(
  localStorage.getItem("easyMarketCategories")
) || defaultCategories;

function saveCategories() {
  localStorage.setItem(
    "easyMarketCategories",
    JSON.stringify(categories)
  );
}

function renderCategories() {
  const grid = document.getElementById("categoryGrid");

  if (!grid) return;

  grid.innerHTML = "";

  categories.forEach((category) => {
    const item = document.createElement("a");

    item.href = "#products";
    item.className = "category";

    item.innerHTML = `
      ${category.icon}
      <strong>${category.name}</strong>
      <span>${category.description}</span>
    `;

    grid.appendChild(item);
  });
}

function openCategoryManager() {
  let modal = document.getElementById("categoryManagerModal");

  if (!modal) {
    createCategoryManager();
    modal = document.getElementById("categoryManagerModal");
  }

  renderCategoryManager();
  modal.hidden = false;
}

function closeCategoryManager() {
  const modal = document.getElementById("categoryManagerModal");

  if (modal) {
    modal.hidden = true;
  }
}

function createCategoryManager() {
  const modal = document.createElement("div");

  modal.id = "categoryManagerModal";
  modal.className = "category-manager-modal";
  modal.hidden = true;

  modal.innerHTML = `
    <div class="category-manager-box">

      <button
        class="category-close"
        onclick="closeCategoryManager()"
        type="button"
      >×</button>

      <h2>⚙️ ক্যাটাগরি ম্যানেজ</h2>

      <button
        class="add-category"
        onclick="showCategoryForm()"
        type="button"
      >
        ➕ নতুন ক্যাটাগরি যোগ করুন
      </button>

      <div id="manageCategoryList"></div>

      <div id="categoryFormArea"></div>

    </div>
  `;

  document.body.appendChild(modal);
}

function renderCategoryManager() {
  const list = document.getElementById("manageCategoryList");

  if (!list) return;

  list.innerHTML = "";

  categories.forEach((category, index) => {
    const item = document.createElement("div");

    item.className = "manage-category-item";

    item.innerHTML = `
      <div class="manage-category-icon">
        ${category.icon}
      </div>

      <div class="manage-category-info">
        <strong>${category.name}</strong>
        <span>${category.description}</span>
      </div>

      <button
        class="category-edit"
        type="button"
        onclick="editCategory(${index})"
      >
        ✏️
      </button>

      <button
        class="category-delete"
        type="button"
        onclick="deleteCategory(${index})"
      >
        🗑️
      </button>
    `;

    list.appendChild(item);
  });
}

function showCategoryForm(index = null) {
  const area = document.getElementById("categoryFormArea");

  if (!area) return;

  const editing = index !== null;

  const category = editing
    ? categories[index]
    : {
        icon: "🛍️",
        name: "",
        description: ""
      };

  area.innerHTML = `
    <div class="category-form">

      <label>আইকন / Emoji</label>

      <input
        id="categoryIconInput"
        type="text"
        value="${category.icon}"
        placeholder="যেমন: 📱"
      >

      <label>ক্যাটাগরির নাম</label>

      <input
        id="categoryNameInput"
        type="text"
        value="${category.name}"
        placeholder="যেমন: মোবাইল"
      >

      <label>বর্ণনা</label>

      <input
        id="categoryDescriptionInput"
        type="text"
        value="${category.description}"
        placeholder="যেমন: মোবাইল ও গ্যাজেট"
      >

      <div class="category-form-actions">

        <button
          class="category-cancel"
          type="button"
          onclick="cancelCategoryForm()"
        >
          বাতিল
        </button>

        <button
          class="category-save"
          type="button"
          onclick="saveCategory(${editing ? index : "null"})"
        >
          💾 Save
        </button>

      </div>

    </div>
  `;

  area.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

function cancelCategoryForm() {
  const area = document.getElementById("categoryFormArea");

  if (area) {
    area.innerHTML = "";
  }
}

function saveCategory(index) {
  const icon =
    document.getElementById("categoryIconInput").value.trim();

  const name =
    document.getElementById("categoryNameInput").value.trim();

  const description =
    document.getElementById("categoryDescriptionInput").value.trim();

  if (!name) {
    alert("ক্যাটাগরির নাম লিখুন।");
    return;
  }

  const newCategory = {
    icon: icon || "🛍️",
    name: name,
    description: description || "নতুন ক্যাটাগরি"
  };

  if (index === null) {
    categories.push(newCategory);
  } else {
    categories[index] = newCategory;
  }

  saveCategories();
  renderCategories();
  renderCategoryManager();
  cancelCategoryForm();
}

function editCategory(index) {
  showCategoryForm(index);
}

function deleteCategory(index) {
  const category = categories[index];

  const confirmDelete = confirm(
    `"${category.name}" ক্যাটাগরিটি মুছে ফেলতে চান?`
  );

  if (!confirmDelete) return;

  categories.splice(index, 1);

  saveCategories();
  renderCategories();
  renderCategoryManager();
}

document.addEventListener("DOMContentLoaded", function () {
  renderCategories();
});
