/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navMenu.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
};
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== ADD BLUR HEADER ===============*/
const blurHeader = () => {
  const header = document.getElementById("header");
  this.scrollY >= 50
    ? header.classList.add("blur-header")
    : header.classList.remove("blur-header");
};
window.addEventListener("scroll", blurHeader);

/*=============== SHOW SCROLL UP ===============*/

const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  //when the scroll is higher than 350 viewport height , add the show-scroll class to the tag with the scrollup class
  this.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);

const productContainer = document.getElementById("productContainer");

/* ================= RENDER PRODUK ================= */

function renderProducts(data) {
  productContainer.innerHTML = "";

  data.forEach((product) => {
    productContainer.innerHTML += `
      <article class="product__article" data-id="${product.id}">
        <div class="product__card">
<img 
  src="${product.image || "assets/img/logo.png"}"
  class="product__img"
  loading="lazy"
  onerror="this.onerror=null; this.src='assets/img/logo.png';"
/>
          <div class="product__data">
            <div class="product__title">${product.name}</div>
            <h3 class="product__price">Rp. ${product.price.toLocaleString(
              "id-ID"
            )}</h3>
          </div>
        </div>
      </article>
    `;
  });
}

renderProducts(products);

/* ================= FILTER KATEGORI + SORT HARGA ================= */

let activeCategory = "all";
let activeSort = "default";

const filterButtons = document.querySelectorAll(".filter__button");
const sortSelect = document.getElementById("sortPrice");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.value;
    applyFilters();
  });
});

sortSelect.addEventListener("change", () => {
  activeSort = sortSelect.value;
  applyFilters();
});

function applyFilters() {
  let filtered = [...products];

  // FILTER KATEGORI
  if (activeCategory !== "all") {
    filtered = filtered.filter(
      (product) => product.category === activeCategory
    );
  }

  // 🔥 PRIORITAS PROMO SAAT SEMUA PRODUK
  if (activeCategory === "all") {
    filtered.sort((a, b) => {
      if (a.category === "promo" && b.category !== "promo") return -1;
      if (a.category !== "promo" && b.category === "promo") return 1;
      return 0;
    });
  }

  // SORT HARGA
  if (activeSort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (activeSort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderProducts(filtered);
}

// Render pertama
applyFilters();
/* ================= OPEN MODAL (DYNAMIC) ================= */

document.addEventListener("click", function (e) {
  // buka modal
  if (e.target.closest(".product__article")) {
    const id = e.target.closest(".product__article").dataset.id;
    const product = products.find((p) => p.id == id);

    if (!product) return;

    const modalHTML = `
      <div class="modal">
        <div class="modal__card">
          <i class="ri-close-large-line modal__close"></i>
<img 
  src="${product.image || "assets/img/logo.png"}"
  class="modal__img"
  loading="lazy"
  onerror="this.onerror=null; this.src='assets/img/logo.png';"
/>
          <div class="modal__data">
            <h3 class="modal__name">${product.name}</h3>

            <ul class="modal__info">
              ${product.info.map((item) => `<li>${item}</li>`).join("")}
            </ul>
            <div class="modal__footer">
            <span class="modal__price">Rp. ${product.price.toLocaleString(
              "id-ID"
            )}</span>
            <a href="https://wa.me/62895602592430?text=${encodeURIComponent(
              `Halo kak, saya mau pesan:
Nama Paket : ${product.name}
Kategori   : ${product.category}
Harga      : Rp. ${product.price.toLocaleString("id-ID")}
Mohon info selanjutnya ya kak`
            )}"  class="button" target="_blank">Pesan Sekarang</a>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);
  }

  // close tombol X
  if (e.target.closest(".modal__close")) {
    e.target.closest(".modal").remove();
  }

  // close klik background
  if (e.target.classList.contains("modal")) {
    e.target.remove();
  }
});
