// Hero Watch Data Source matching Wireframe selectors (1, 2, 3)
const HERO_WATCHES = [
    {
        title: "The Chrono Gold Master",
        price: "$1,850.00",
        img: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=600"
    },
    {
        title: "Vanguard Sporty Navy",
        price: "$1,420.00",
        img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600"
    },
    {
        title: "Sovereign Modern Steel",
        price: "$2,100.00",
        img: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=600"
    }
];

// Complete 12 product dataset split cleanly into 3 visual categories (Casual, Professional, Luxury)
const PRODUCTS_DATA = [
    // Casual Watches (4)
    { id: 1, name: "Vanguard Navy Blue", category: "casual", price: 650.00, desc: "Sleek silicone mesh straps, high action sports bezel, dynamic day-date dials.", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=500" },
    { id: 2, name: "Urban Stealth Midnight", category: "casual", price: 420.00, desc: "Matte black case, glow dials, lightweight composite weave design.", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=500" },
    { id: 3, name: "Nomad Sahara Leather", category: "casual", price: 580.00, desc: "Double stitching tan strap, brushed titanium layout, daily explorer finish.", image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=500" },
    { id: 4, name: "Aero Solar Tech", category: "casual", price: 790.00, desc: "Perpetual solar battery charge, durable carbon dial casing, compass inner ring.", image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&q=80&w=500" },

    // Professional Watches (4)
    { id: 5, name: "Chrono Gold Masterpiece", category: "professional", price: 1850.00, desc: "Pristine gold dial, calendar display window, self-winding mechanical engine.", image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=500" },
    { id: 6, name: "Regency Silver Dial", category: "professional", price: 1100.00, desc: "Highly polished steel links, clean silver aesthetic dial, butterfly deployment clasp.", image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=500" },
    { id: 7, name: "Meridian Rosegold Executive", category: "professional", price: 2350.00, desc: "Sapphire backplate displays mechanical movement, gold tone bezel styling.", image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=500" },
    { id: 8, name: "Navigator Titanium Classic", category: "professional", price: 1540.00, desc: "Waterproof up to 200m depth, dual-time timezone, matte scratch-resistant titanium.", image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&q=80&w=500" },

    // Luxury Watches (4)
    { id: 9, name: "Nautilus Royal Gold", category: "luxury", price: 8900.00, desc: "Solid gold bezel plates, rare custom diamonds, collector series packaging.", image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=500" },
    { id: 10, name: "Nebula Tourbillon", category: "luxury", price: 12500.00, desc: "Visible mechanical rotating tourbillon, hand-wound Swiss escapement wheel.", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=500" },
    { id: 11, name: "Obsidian Onyx Eclipse", category: "luxury", price: 6500.00, desc: "Bespoke black diamond accents, pure alligator leather clasp strap, obsidian backing.", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=500" },
    { id: 12, name: "Royal Sovereign Chronograph", category: "luxury", price: 9200.00, desc: "Exclusive museum series numbering, deep navy enamel dial plate, split-seconds hands.", image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&q=80&w=500" }
];

// Interactive State variables
let filteredProducts = [...PRODUCTS_DATA];
let currentFilter = 'all';
let currentPage = 1;
const itemsPerPage = 3; // Show 3 items per pagination page as seen in desktop layout
let shoppingCart = [];

function switchHeroWatch(index) {
    // Update selected buttons visually
    const buttons = document.querySelectorAll('.watch-sel-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active', 'border-goldAccent', 'scale-105', 'shadow-neon-gold');
        btn.classList.add('border-white/10');
        const img = btn.querySelector('img');
        if (img) img.classList.add('opacity-70');
    });

    const activeBtn = document.querySelector(`[data-index="${index}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active', 'border-goldAccent', 'scale-105', 'shadow-neon-gold');
        activeBtn.classList.remove('border-white/10');
        const img = activeBtn.querySelector('img');
        if (img) img.classList.remove('opacity-70');
    }

    // Animate transition
    const watchImg = document.getElementById('main-watch-img');

    watchImg.style.transform = "scale(0.8)";
    watchImg.style.opacity = "0";

    setTimeout(() => {
        watchImg.src = HERO_WATCHES[index].img;

        watchImg.style.transform = "scale(1)";
        watchImg.style.opacity = "1";
    }, 300);
}

function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    // Calculate pagination bounds
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = filteredProducts.slice(startIndex, endIndex);

    // Render cards
    pageItems.forEach(item => {
        const card = document.createElement('div');
        card.className = "bg-cardBg border border-white/10 rounded-2xl overflow-hidden hover:border-goldAccent/40 transition-all duration-500 group flex flex-col justify-between";
        card.innerHTML = `
                    <div class="relative h-[240px] bg-[#020914] flex items-center justify-center overflow-hidden">
                        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" onerror="this.onerror=null; this.src='https://placehold.co/400x300/0b132b/ffc300?text=Premium+Watch';">
                        <span class="absolute top-4 right-4 bg-navyDark/80 border border-white/10 text-[10px] uppercase font-bold tracking-widest text-goldAccent px-3 py-1 rounded-full z-10">${item.category}</span>
                    </div>
                    <div class="p-6 space-y-4">
                        <div class="flex justify-between items-start gap-4">
                            <h3 class="font-serif font-bold text-lg text-offWhite leading-tight">${item.name}</h3>
                            <span class="text-goldAccent font-serif font-bold text-lg">$${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                        <p class="text-gray-400 text-xs leading-loose line-clamp-2">${item.desc}</p>
                        <div class="pt-2 flex gap-3">
                            <button onclick="addToCart(${item.id})" class="flex-grow py-2.5 rounded-lg bg-gradient-to-r from-gradStart to-gradEnd font-semibold text-xs uppercase tracking-wider text-offWhite hover:shadow-neon-violet hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                                <i class="fa-solid fa-cart-shopping"></i> Add To Cart
                            </button>
                            <button onclick="openModal('${item.name}', '${item.desc}. Handcrafted to highest luxury design standards with 100% water resistant sapphire structure.')" class="p-2.5 rounded-lg border border-white/10 hover:border-goldAccent text-gray-400 hover:text-goldAccent transition-all" title="Quick View">
                                <i class="fa-solid fa-eye text-sm"></i>
                            </button>
                        </div>
                    </div>
                `;
        grid.appendChild(card);
    });

    // Update Pagination display counts
    document.getElementById('pag-start').innerText = startIndex + 1;
    document.getElementById('pag-end').innerText = Math.min(endIndex, filteredProducts.length);
    document.getElementById('pag-total').innerText = filteredProducts.length;

    // Update Pagination Dot controls
    renderPaginationDots();

    // Disable triggers if necessary
    document.getElementById('btn-prev').disabled = currentPage === 1;
    document.getElementById('btn-next').disabled = endIndex >= filteredProducts.length;
}

function filterShop(category) {
    currentFilter = category;
    currentPage = 1;

    // Manage CSS Active states on filter tabs
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.className = "tab-btn px-6 py-2.5 rounded-full bg-cardBg border border-white/10 hover:border-goldAccent text-offWhite font-semibold text-xs uppercase tracking-wider transition-all duration-500";
    });

    const activeTab = document.getElementById(`tab-${category}`);
    if (activeTab) {
        activeTab.className = "tab-btn px-6 py-2.5 rounded-full bg-goldAccent text-navyDark font-semibold text-xs uppercase tracking-wider transition-all duration-500";
    }

    // Perform item filtering
    if (category === 'all') {
        filteredProducts = [...PRODUCTS_DATA];
    } else {
        filteredProducts = PRODUCTS_DATA.filter(item => item.category === category);
    }

    renderProducts();
}

// Pagination slide control triggers
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderProducts();
    }
}

function nextPage() {
    if ((currentPage * itemsPerPage) < filteredProducts.length) {
        currentPage++;
        renderProducts();
    }
}

function renderPaginationDots() {
    const dotsContainer = document.getElementById('pagination-dots');
    dotsContainer.innerHTML = '';
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const dot = document.createElement('button');
        dot.className = `w-2.5 h-2.5 rounded-full transition-all duration-500 ${i === currentPage ? 'bg-goldAccent w-6 shadow-neon-gold' : 'bg-gray-600 hover:bg-gray-400'}`;
        dot.onclick = () => {
            currentPage = i;
            renderProducts();
        };
        dotsContainer.appendChild(dot);
    }
}

function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    drawer.classList.toggle('translate-x-full');
}

function addToCart(productId) {
    const watch = PRODUCTS_DATA.find(item => item.id === productId);
    if (!watch) return;

    const existing = shoppingCart.find(item => item.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        shoppingCart.push({ ...watch, qty: 1 });
    }

    updateCartUI();
    triggerAlert("Item Added", `${watch.name} added to your secure cart.`);
}

function removeFromCart(productId) {
    shoppingCart = shoppingCart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    const badge = document.getElementById('cart-badge');
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalText = document.getElementById('cart-subtotal');

    // Set quantities
    const totalQty = shoppingCart.reduce((sum, item) => sum + item.qty, 0);
    if (totalQty > 0) {
        badge.innerText = totalQty;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }

    // Render drawer list
    if (shoppingCart.length === 0) {
        cartItemsContainer.innerHTML = `
                    <div class="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
                        <i class="fa-solid fa-box-open text-gray-600 text-5xl"></i>
                        <p class="text-gray-400">Your shopping cart is currently empty.</p>
                        <a href="#shop" onclick="toggleCart()" class="px-6 py-2 bg-gradient-to-r from-gradStart to-gradEnd rounded-full text-xs font-semibold uppercase text-offWhite hover:shadow-neon-violet">Browse Shop</a>
                    </div>
                `;
        subtotalText.innerText = "$0.00";
        return;
    }

    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    shoppingCart.forEach(item => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;

        const row = document.createElement('div');
        row.className = "flex items-center gap-4 bg-navyDark/80 p-3 rounded-xl border border-white/5";
        row.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="w-14 h-14 object-contain bg-cardBg rounded-lg p-1 border border-white/10" onerror="this.onerror=null; this.src='https://placehold.co/100x100/0b132b/ffc300?text=Watch';">
                    <div class="flex-grow">
                        <span class="text-sm font-semibold text-offWhite block truncate">${item.name}</span>
                        <div class="flex items-center justify-between mt-1">
                            <span class="text-xs text-goldAccent">$${item.price.toLocaleString()} x ${item.qty}</span>
                            <button onclick="removeFromCart(${item.id})" class="text-xs text-red-500 hover:text-red-400">
                                <i class="fa-regular fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                `;
        cartItemsContainer.appendChild(row);
    });

    subtotalText.innerText = `$${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}

function openModal(title, description) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerText = description;

    const modal = document.getElementById('info-modal');
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('info-modal').classList.add('hidden');
}

function triggerAlert(title, message) {
    const popup = document.getElementById('purchase-alert');
    document.getElementById('alert-msg-title').innerText = title;
    document.getElementById('alert-msg-body').innerText = message;

    popup.classList.remove('opacity-0', 'translate-y-12', 'pointer-events-none');
    popup.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
        popup.classList.remove('opacity-100', 'translate-y-0');
        popup.classList.add('opacity-0', 'translate-y-12', 'pointer-events-none');
    }, 3000);
}

function checkout() {
    if (shoppingCart.length === 0) {
        openModal('Cart Empty', 'Please add premium watches from our boutique to checkout your exclusive order.');
        return;
    }
    toggleCart();
    openModal('Secure Vault Order Sent', 'Congratulations! Your premium timepiece requisition has been successfully logged with our executive vault curators. Our concierge will email you shortly.');
    shoppingCart = [];
    updateCartUI();
}

function submitContact(e) {
    e.preventDefault();
    openModal('Inquiry Submitted', 'Thank you. Your message regarding premium timepieces has been transmitted successfully. Our specialized customer concierge will contact you within 12 hours.');
    document.getElementById('contact-form').reset();
}

function registerNewsletter() {
    openModal('VIP Registration Success', 'Thank you! You have been successfully registered to receive exclusive design drops, VIP lounge codes, and direct watch invitations.');
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    menu.classList.toggle('hidden');
    if (menu.classList.contains('hidden')) {
        icon.className = "fa-solid fa-bars-staggered";
    } else {
        icon.className = "fa-solid fa-xmark";
    }
}

// Initial setup execution
window.onload = function () {
    renderProducts();

    // Handle smooth page navbar updates on scrolling
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('bg-navyDark', 'shadow-2xl', 'h-16');
            nav.classList.remove('bg-navyDark/90', 'h-20');
        } else {
            nav.classList.add('bg-navyDark/90', 'h-20');
            nav.classList.remove('bg-navyDark', 'shadow-2xl', 'h-16');
        }
    });
};
