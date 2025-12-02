// script.js - Single JS for all pages

document.addEventListener('DOMContentLoaded', function () {
  // Fill year in footers
  const year = (new Date()).getFullYear();
  ['year','yearAbout','yearShop','yearPrivacy'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = year;
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.getAttribute('data-open') === 'true';
      mainNav.setAttribute('data-open', String(!isOpen));
      navToggle.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  // CTA tracking example
  const viewBtn = document.getElementById('viewCatalogueBtn');
  if (viewBtn) {
    viewBtn.addEventListener('click', function () {
      // Example: send to analytics or do something
      console.log('CTA: View Catalogue clicked');
      // location.href = 'shop.html'; // already a link
    });
  }

  // Newsletter form simple validation + friendly message
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]');
      if (!email || !email.value.includes('@')) {
        alert('Please enter a valid email address.');
        return;
      }
      // Simulate subscription success
      alert('Thanks! You are subscribed.');
      email.value = '';
      // Here you would send the email to your backend or mail service
    });
  }

  // Simple shop "add to cart" demo (client-side only)
  const addCartButtons = document.querySelectorAll('.add-cart');
  addCartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      const name = card ? card.dataset.name : 'product';
      console.log(`Added to cart: ${name}`);
      // Small visual feedback
      e.target.textContent = 'Added';
      e.target.disabled = true;
      setTimeout(()=> {
        e.target.textContent = 'Add to cart';
        e.target.disabled = false;
      }, 1200);
    });
  });

  // Search in shop
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const q = this.value.toLowerCase();
      const products = document.querySelectorAll('.product-card');
      products.forEach(p => {
        const name = (p.dataset.name || '').toLowerCase();
        p.style.display = name.includes(q) ? '' : 'none';
      });
    });
  }

  // ======= Update Year =======
document.getElementById("yearShop").textContent = new Date().getFullYear();

// ======= MODAL SETUP =======
// ========== QUICK VIEW MODAL ==========
const modal = document.getElementById("quickModal");
const closeModal = document.querySelector(".close-modal");
const viewButtons = document.querySelectorAll(".view-btn");

// Modal fields
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalDesc = document.getElementById("modalDesc");
const modalPrice = document.getElementById("modalPrice");

// When user clicks "Quick View"
viewButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".product-card");

    modalImg.src = card.dataset.img;
    modalName.textContent = card.dataset.name;
    modalDesc.textContent = card.dataset.desc;
    modalPrice.textContent = "₦" + (Number(card.dataset.price) * 1000).toLocaleString();

    modal.classList.add("show");
  });
});

// Close modal
closeModal.addEventListener("click", () => modal.classList.remove("show"));
window.addEventListener("click", e => {
  if (e.target === modal) modal.classList.remove("show");
});


    });

