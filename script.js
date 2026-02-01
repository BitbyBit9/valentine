const text = "Sampada 💖 Will you be my Valentine?";
const typing = document.getElementById("typing");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const message = document.getElementById("message");
const music = document.getElementById("music");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let index = 0;
let noCount = 0;

// Typing animation
(function typeText() {
  if (index < text.length) {
    typing.innerHTML += text.charAt(index++);
    setTimeout(typeText, 70);
  }
})();

// NO button runs BEFORE hover 😈
document.addEventListener("mousemove", (e) => {
  const rect = noBtn.getBoundingClientRect();
  const distance = Math.hypot(
    e.clientX - (rect.left + rect.width / 2),
    e.clientY - (rect.top + rect.height / 2)
  );

  if (distance < 100) escapeNo();
});

// Hover escape backup
noBtn.addEventListener("mouseover", escapeNo);

function escapeNo() {
  noCount++;

  const container = document.querySelector(".buttons");
  const maxX = container.offsetWidth - noBtn.offsetWidth;
  const maxY = container.offsetHeight - noBtn.offsetHeight;

  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";

  const scale = Math.max(0.55, 1 - noCount * 0.06);
  noBtn.style.transform = `scale(${scale})`;

  const texts = [
    "NO 🙄",
    "Nice try 😏",
    "Almost 😂",
    "Give up 😜",
    "Just say YES 💖",
    "You know you want to 😈"
  ];
  noBtn.innerText = texts[noCount % texts.length];
}

// YES button celebration 💖
yesBtn.addEventListener("click", () => {
  music.play();
  vibrate();
  message.innerHTML =
    "YAYYYYY 💖💖💖<br>You just made me the happiest 😍🌹";
  startConfetti();
  createHearts();
});

// Mobile vibration 📳
function vibrate() {
  if (navigator.vibrate) {
    navigator.vibrate([200, 100, 200]);
  }
}

// Confetti 🎉
let confetti = [];

function startConfetti() {
  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 150,
      color: `hsl(${Math.random() * 360},100%,60%)`
    });
  }
  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((c, i) => {
    ctx.beginPath();
    ctx.fillStyle = c.color;
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fill();

    c.y += Math.cos(c.d) + 3;
    if (c.y > canvas.height) confetti[i].y = -10;
  });
  requestAnimationFrame(animateConfetti);
}

// Floating hearts 💖
function createHearts() {
  const hearts = document.querySelector(".hearts");
  setInterval(() => {
    const heart = document.createElement("span");
    heart.innerHTML = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 3 + "s";
    hearts.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
  }, 200);
}
