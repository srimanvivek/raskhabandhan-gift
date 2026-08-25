// ============================================================
// RAKSHA BANDHAN SURPRISE WEBSITE
// Edit the CONFIG section below to personalize the site.
// ============================================================

const CONFIG = {
  // Put your song inside the "assets" folder and change this name.
  song: "assets/song.mp3",

  // Replace these with your actual gift photos.
  // Example: "assets/money1.jpg"
  giftPhotos: [

    "assets/money1.jfif",
  "assets/money2.jfif"
    // "assets/money1.jpg",
    // "assets/money2.jpg"
  ],

  // Change this message however you want.
  finalMessage: `Mission complete, Didi.<br><br>
You officially unlocked your Rakhi gift.
And yes... this time your annoying brother actually planned something. 😂<br><br>
Gift toh hum de diye...

Ab tum khud extract karo. 😌

Aur haan, ye mat kehna ki
“Gift nahi diya.” 😂 <br>

Gift diya gaya hai.
Bas thoda... creative tareeke se.<br><br>
Happy Raksha Bandhan! ❤️`,

  // Project cards. Add/remove/edit anything here.
  projects: [
    {
      icon: "🔮",
      title: "FORTUNE DETECTOR",
      text: "Scanning the universe for suspicious amounts of luck..."
    },
    {
      icon: "🚀",
      title: "RAKHI MISSION",
      text: "Mission status: highly classified. No spoilers allowed."
    },
    {
      icon: "🧪",
      title: "SECRET EXPERIMENT",
      text: "Warning: may contain traces of brother-level nonsense."
    },
    {
      icon: "🗺️",
      title: "TREASURE HUNT",
      text: "Searching for something valuable. Very valuable."
    },
    {
      icon: "🎮",
      title: "LUCKY MODE",
      text: "Your luck stat has been temporarily upgraded."
    },
    {
      icon: "🎁",
      title: "MYSTERY BOX",
      text: "CLASSIFIED. FINAL OBJECTIVE. DO NOT IGNORE.",
      special: true
    }
  ]
};

const screens = document.querySelectorAll(".screen");
const bgMusic = document.getElementById("bgMusic");

function showScreen(id) {
  screens.forEach(screen => screen.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function createParticles() {
  const container = document.getElementById("particles");

  for (let i = 0; i < 34; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    const size = Math.random() * 3 + 1;

    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${Math.random() * 10 + 8}s`;
    p.style.animationDelay = `${Math.random() * -15}s`;

    container.appendChild(p);
  }
}

function bootSequence() {
  const text = document.getElementById("bootText");
  const lines = [
    "Connecting to secret gift server...",
    "Checking Rakhi authorization...",
    "Loading brother.exe...",
    "Surprise protocol ready."
  ];

  let index = 0;

  setInterval(() => {
    text.textContent = lines[index % lines.length];
    index++;
  }, 1300);
}

document.getElementById("startBtn").addEventListener("click", () => {
  showScreen("verifyScreen");
});

document.getElementById("verifyBtn").addEventListener("click", () => {
  showScreen("luckScreen");
});

document.getElementById("luckBtn").addEventListener("click", () => {
  const result = document.getElementById("luckResult");
  const spinner = document.getElementById("spinner");
  const text = document.getElementById("luckText");
  const btn = document.getElementById("luckBtn");

  btn.disabled = true;
  btn.style.opacity = ".5";
  result.classList.add("show");

  const symbols = ["7", "?", "★", "8", "♥", "7", "✦"];
  let count = 0;

  const interval = setInterval(() => {
    spinner.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    count++;

    if (count >= 18) {
      clearInterval(interval);
      spinner.textContent = "🎉";
      text.textContent = "Luck level: suspiciously high.";

      setTimeout(() => {
        showScreen("projectsScreen");
        renderProjects();
      }, 1000);
    }
  }, 100);
});

function renderProjects() {
  const grid = document.getElementById("projectGrid");
  grid.innerHTML = "";

  // Shuffle a copy so the cards don't always appear in the same order.
  const shuffled = [...CONFIG.projects].sort(() => Math.random() - 0.5);

  shuffled.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = `project-card ${project.special ? "special" : ""}`;
    card.style.animationDelay = `${index * 80}ms`;

    card.innerHTML = `
      <div class="icon">${project.icon}</div>
      <h3>${project.title}</h3>
      <p>${project.text}</p>
    `;

    if (project.special) {
      card.addEventListener("click", () => {
        showScreen("mysteryScreen");
      });
      card.style.cursor = "pointer";
    }

    grid.appendChild(card);
  });

  document.getElementById("continueBtn").classList.remove("hidden");
}

document.getElementById("shuffleBtn").addEventListener("click", () => {
  renderProjects();
});

document.getElementById("continueBtn").addEventListener("click", () => {
  showScreen("mysteryScreen");
});

document.getElementById("openBtn").addEventListener("click", () => {
  const box = document.getElementById("mysteryBox");
  const openBtn = document.getElementById("openBtn");

  openBtn.disabled = true;
  box.classList.add("open");

  setTimeout(() => {
    showScreen("revealScreen");
    populateGift();
    launchConfetti();
    startMusic();
  }, 1250);
});

function populateGift() {
  const gallery = document.getElementById("giftGallery");
  const message = document.getElementById("finalMessage");

  message.innerHTML = CONFIG.finalMessage;

  if (!CONFIG.giftPhotos.length) return;

  gallery.innerHTML = "";

  CONFIG.giftPhotos.forEach(src => {
    const wrapper = document.createElement("div");
    wrapper.className = "gift-photo";

    const img = document.createElement("img");
    img.src = src;
    img.alt = "Raksha Bandhan gift";

    wrapper.appendChild(img);
    gallery.appendChild(wrapper);
  });
}

function startMusic() {
  if (!CONFIG.song) return;

  bgMusic.src = CONFIG.song;
  bgMusic.loop = true;

  bgMusic.play().catch(() => {
    // Browser may block autoplay.
    document.getElementById("musicBtn").textContent = "♫ PLAY THE SURPRISE SONG";
  });
}

document.getElementById("musicBtn").addEventListener("click", () => {
  if (!bgMusic.src) {
    alert("Add your song path in CONFIG.song inside script.js");
    return;
  }

  if (bgMusic.paused) {
    bgMusic.play();
    document.getElementById("musicBtn").textContent = "♫ PAUSE THE SONG";
  } else {
    bgMusic.pause();
    document.getElementById("musicBtn").textContent = "♫ PLAY THE SURPRISE SONG";
  }
});

function launchConfetti() {
  const container = document.getElementById("confetti");
  container.innerHTML = "";

  for (let i = 0; i < 100; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";

    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * .9}s`;
    piece.style.animationDuration = `${2.5 + Math.random() * 2}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;

    const shapes = ["10px", "7px", "12px"];
    piece.style.width = shapes[Math.floor(Math.random() * shapes.length)];

    container.appendChild(piece);
  }
}

createParticles();
bootSequence();
