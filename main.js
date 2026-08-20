const products = [
    { name: "প্রোডাক্ট ১", price: "৫০০ টাকা" },
    { name: "প্রোডাক্ট ২", price: "৮০০ টাকা" },
    { name: "প্রোডাক্ট ৩", price: "১২০০ টাকা" }
];
const container = document.getElementById('product-list');
products.forEach(p => {
    container.innerHTML += `<div class="product-card"><h3>${p.name}</h3><p style="color: #ff0000; font-weight: bold;">${p.price}</p><button onclick="alert('অর্ডার সফল হয়েছে!')">অর্ডার করুন</button></div>`;
});
