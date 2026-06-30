const gallery = document.getElementById('gallery');
const items = () => [...gallery.querySelectorAll('.gallery-item:not(.hidden)')];
const allItems = () => [...gallery.querySelectorAll('.gallery-item')];

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

let currentIndex = 0;

function openLightbox(item) {
    const img = item.querySelector('img');
    const caption = item.querySelector('.overlay').textContent;
    lightboxImg.src = img.src.replace('w=600', 'w=1200');
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption;
    currentIndex = items().indexOf(item);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigate(direction) {
    const visible = items();
    currentIndex = (currentIndex + direction + visible.length) % visible.length;
    const item = visible[currentIndex];
    const img = item.querySelector('img');
    const caption = item.querySelector('.overlay').textContent;
    lightboxImg.src = img.src.replace('w=600', 'w=1200');
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption;
}

// Open lightbox on image click
allItems().forEach(item => {
    item.querySelector('img').addEventListener('click', () => openLightbox(item));
    item.querySelector('.overlay').addEventListener('click', () => openLightbox(item));
});

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => navigate(-1));
document.getElementById('lightboxNext').addEventListener('click', () => navigate(1));

// Close on backdrop click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowRight') navigate(1);
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'Escape')     closeLightbox();
});

// ===== FILTER BUTTONS =====
const filterBtns = document.querySelectorAll('.filter-btn');
const counter = document.getElementById('imageCounter');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        let count = 0;

        allItems().forEach(item => {
            const match = filter === 'all' || item.dataset.category === filter;
            item.classList.toggle('hidden', !match);
            if (match) count++;
        });

        counter.textContent = `Showing ${count} photo${count !== 1 ? 's' : ''}`;
    });
});

// Update counter on load
counter.textContent = `Showing ${allItems().length} photos`;

// ===== LIKE / FAVORITE =====
allItems().forEach(item => {
    const likeBtn = item.querySelector('.like-btn');
    const icon = likeBtn.querySelector('i');

    likeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const liked = likeBtn.classList.toggle('liked');
        icon.classList.toggle('fa-regular', !liked);
        icon.classList.toggle('fa-solid', liked);

        // Bounce animation
        likeBtn.style.transform = 'scale(1.3)';
        setTimeout(() => likeBtn.style.transform = '', 200);
    });
});

// ===== DARK / LIGHT MODE =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeIcon.classList.toggle('fa-moon', !isDark);
    themeIcon.classList.toggle('fa-sun', isDark);
});
