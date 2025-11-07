// 🎈 Balloons
for (let i = 0; i < 15; i++) {
    let b = document.createElement('div');
    b.classList.add('balloon');
    b.style.position = 'absolute';
    b.style.width = '70px';
    b.style.height = '90px';
    b.style.borderRadius = '50%';
    b.style.opacity = 0.8;
    b.style.left = Math.random() * 100 + 'vw';
    b.style.background = 'radial-gradient(circle at 30% 30%, #fff, ' + randomColor() + ')';
    b.style.animation = `float ${5 + Math.random() * 7}s linear infinite`;
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 12000);
}

function randomColor() {
    const colors = ['#ff4b2b', '#ff416c', '#f6d365', '#a1c4fd', '#c2e9fb', '#00c3ff', '#ffcc70'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 🎆 Confetti
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let confettis = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function startConfetti() {
    confettis = Array.from({ length: 150 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 5 + 2,
        d: Math.random() * 10,
        color: randomColor()
    }));
    animateConfetti();
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettis.forEach(c => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
        ctx.fillStyle = c.color;
        ctx.fill();
        c.y += Math.cos(c.d) + 2;
        c.x += Math.sin(c.d);
        if (c.y > canvas.height) {
            c.y = 0 - c.r;
            c.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(animateConfetti);
}
startConfetti();

// 🎵 Music
const music = document.getElementById('music');
const musicBtn = document.getElementById('musicBtn');
let playing = false;

function toggleMusic() {
    if (!playing) {
        music.play();
        musicBtn.innerText = "⏸ Pause Music";
    } else {
        music.pause();
        musicBtn.innerText = "🎵 Play Music";
    }
    playing = !playing;
}

// 🌍 Share Feature
function shareWish() {
    const text = "🎂 Happy Birthday! Wishing you a magical day full of joy and color! 🌈";
    const url = window.location.href;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
    window.open(shareUrl, '_blank');
}
