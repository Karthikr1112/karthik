// Create floating particles
for (let i = 0; i < 30; i++) {
    let particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.width = (Math.random() * 5 + 3) + 'px';
    particle.style.height = particle.style.width;
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
    document.body.appendChild(particle);
}

// Gallery Sidebar Toggle
function toggleGallery() {
    const sidebar = document.getElementById('gallerySidebar');
    const icon = document.getElementById('galleryIcon');
    sidebar.classList.toggle('active');
    
    if (sidebar.classList.contains('active')) {
        icon.innerHTML = '✕';
    } else {
        icon.innerHTML = '📸';
    }
}

// Lightbox functionality
let currentLightboxIndex = 0;
const lightboxImages = [
    'images/photo1.jpg',
    'images/photo2.jpg',
    'images/photo3.jpg',
    'images/photo4.jpg'
];

function openLightbox(index) {
    currentLightboxIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const caption = document.getElementById('lightboxCaption');
    
    lightboxImage.src = lightboxImages[index];
    caption.textContent = `Memory ${index + 1} of ${lightboxImages.length}`;
    lightbox.classList.add('active');
    
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeLightboxImage(direction) {
    currentLightboxIndex += direction;
    
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = lightboxImages.length - 1;
    } else if (currentLightboxIndex >= lightboxImages.length) {
        currentLightboxIndex = 0;
    }
    
    const lightboxImage = document.getElementById('lightboxImage');
    const caption = document.getElementById('lightboxCaption');
    
    // Add fade effect
    lightboxImage.style.opacity = '0';
    setTimeout(() => {
        lightboxImage.src = lightboxImages[currentLightboxIndex];
        caption.textContent = `Memory ${currentLightboxIndex + 1} of ${lightboxImages.length}`;
        lightboxImage.style.opacity = '1';
    }, 200);
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeLightboxImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeLightboxImage(1);
        }
    }
});

// Confetti Canvas Setup
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let confettis = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function randomColor() {
    const colors = ['#ff4b2b', '#ff416c', '#ffd700', '#a1c4fd', '#00c3ff', '#ffcc70', '#f093fb', '#764ba2'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Start Confetti Animation
function startConfetti() {
    confettis = Array.from({ length: 200 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 2,
        d: Math.random() * 10,
        color: randomColor(),
        tilt: Math.random() * 10 - 5,
        tiltAngle: 0,
        tiltAngleIncrement: Math.random() * 0.1 + 0.05
    }));
    animateConfetti();
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettis.forEach(c => {
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.tiltAngle);
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.r / 2, -c.r / 2, c.r, c.r * 2);
        ctx.restore();
        
        c.tiltAngle += c.tiltAngleIncrement;
        c.y += Math.cos(c.d) + 2 + c.r / 2;
        c.x += Math.sin(c.d);
        c.tilt = Math.sin(c.tiltAngle) * 15;
        
        if (c.y > canvas.height) {
            c.y = 0 - c.r;
            c.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(animateConfetti);
}
startConfetti();

// Music Controls
const music = document.getElementById('music');
const musicIcon = document.getElementById('musicIcon');
let playing = false;

function toggleMusic() {
    if (!playing) {
        music.play();
        musicIcon.innerHTML = '⏸ Pause Music';
    } else {
        music.pause();
        musicIcon.innerHTML = '🎵 Play Music';
    }
    playing = !playing;
}

// Fireworks Effect on Photo Click
function triggerFireworks() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.classList.add('firework');
            firework.style.left = '50%';
            firework.style.top = '50%';
            firework.style.background = randomColor();
            document.body.appendChild(firework);

            const angle = (Math.PI * 2 * i) / 50;
            const velocity = Math.random() * 5 + 5;
            let x = 0, y = 0;

            const animate = () => {
                x += Math.cos(angle) * velocity;
                y += Math.sin(angle) * velocity;
                firework.style.transform = `translate(${x}px, ${y}px)`;
                firework.style.opacity = 1 - (Math.abs(x) + Math.abs(y)) / 500;

                if (Math.abs(x) < 300 && Math.abs(y) < 300) {
                    requestAnimationFrame(animate);
                } else {
                    firework.remove();
                }
            };
            animate();
        }, i * 10);
    }
}

// Surprise Message Popup
function showSurprise() {
    document.getElementById('messagePopup').classList.add('show');
    triggerFireworks();
}

function closePopup() {
    document.getElementById('messagePopup').classList.remove('show');
}

// Share Functionality
function shareWish() {
    const text = "🎂 Happy Birthday! Wishing you a magical day full of joy, love, and unforgettable moments! 🌈🎉✨";
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: 'Birthday Wish',
            text: text,
            url: url
        }).catch(err => console.log('Share cancelled'));
    } else {
        const shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
        window.open(shareUrl, '_blank');
    }
}

// Auto-play music after 2 seconds (if browser allows)
setTimeout(() => {
    music.play().catch(() => {
        console.log('Auto-play prevented. User interaction needed.');
    });
    playing = true;
    musicIcon.innerHTML = '⏸ Pause Music';
}, 2000);
