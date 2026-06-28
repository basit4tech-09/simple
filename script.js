// script.js - Single JS for all pages

document.addEventListener('DOMContentLoaded', function () {

  // ======= Fill year in all page footers =======
  const year = new Date().getFullYear();
  ['year', 'yearAbout', 'yearShop', 'yearPrivacy'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = year;
    // BUG FIX: was running getElementById("yearShop").textContent again on
    // line 80 with NO null check — throws error on every non-shop page.
    // Now handled safely here with the forEach + null guard.
  });

  // ======= Mobile nav toggle =======
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.getAttribute('data-open') === 'true';
      mainNav.setAttribute('data-open', String(!isOpen));
      navToggle.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  // ======= CTA tracking =======
  const viewBtn = document.getElementById('viewCatalogueBtn');
  if (viewBtn) {
    viewBtn.addEventListener('click', function () {
      console.log('CTA: View Catalogue clicked');
    });
  }

  // ======= Newsletter form validation =======
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]');
      if (!email || !email.value.includes('@')) {
        alert('Please enter a valid email address.');
        return;
      }
      alert('Thanks! You are subscribed.');
      email.value = '';
    });
  }

  // ======= Add to cart buttons (shop page) =======
  const addCartButtons = document.querySelectorAll('.add-cart');
  addCartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      const name = card ? card.dataset.name : 'product';
      console.log(`Added to cart: ${name}`);
      e.target.textContent = 'Added!';
      e.target.disabled = true;
      setTimeout(() => {
        e.target.textContent = 'Add to cart';
        e.target.disabled = false;
      }, 1200);
    });
  });

  // ======= Product search (shop page) =======
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const q = this.value.toLowerCase();
      document.querySelectorAll('.product-card').forEach(p => {
        const name = (p.dataset.name || '').toLowerCase();
        p.style.display = name.includes(q) ? '' : 'none';
      });
    });
  }

  // ======= Quick View Modal =======
  // BUG FIX: all modal code is now inside null checks so it won't
  // crash on index.html, about.html, or privacy.html where modal
  // elements don't exist.
  const modal = document.getElementById('quickModal');
  const closeModalBtn = document.querySelector('.close-modal');
  const viewButtons = document.querySelectorAll('.view-btn');

  if (modal && closeModalBtn && viewButtons.length > 0) {
    const modalImg   = document.getElementById('modalImg');
    const modalName  = document.getElementById('modalName');
    const modalDesc  = document.getElementById('modalDesc');
    const modalPrice = document.getElementById('modalPrice');

    viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.product-card');
        if (!card) return;

        if (modalImg)   modalImg.src         = card.dataset.img || '';
        if (modalImg)   modalImg.alt         = card.dataset.name || '';
        if (modalName)  modalName.textContent = card.dataset.name || '';
        if (modalDesc)  modalDesc.textContent = card.dataset.desc || '';
        if (modalPrice) modalPrice.textContent =
          '₦' + (Number(card.dataset.price) * 1000).toLocaleString();

        modal.classList.add('show');
      });
    });

    // Close via × button
    closeModalBtn.addEventListener('click', () => modal.classList.remove('show'));

    // Close via backdrop click
    window.addEventListener('click', e => {
      if (e.target === modal) modal.classList.remove('show');
    });

    // Close via Escape key
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') modal.classList.remove('show');
    });
  }

});
