// DOM Elements
const navbar = document.querySelector(".navbar");
const scrollIndicator = document.querySelector(".scroll-indicator");
const toast = document.getElementById("toast");
const contractAddress = "0xbfc67cd18d7d18eb3ed0ababbb52175adb984444";

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Scroll indicator click
scrollIndicator.addEventListener("click", () => {
  const aboutSection = document.querySelector("#about");
  const offsetTop = aboutSection.offsetTop - 70;
  window.scrollTo({
    top: offsetTop,
    behavior: "smooth",
  });
});

// Copy contract address function
function copyContractAddress() {
  navigator.clipboard
    .writeText(contractAddress)
    .then(() => {
      showToast();
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = contractAddress;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        showToast();
      } catch (err) {
        console.error("Fallback copy failed: ", err);
      }
      document.body.removeChild(textArea);
    });
}

// Show toast notification
function showToast() {
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll(".card, .token-card, .social-card").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// Mobile navigation toggle
const mobileToggle = document.querySelector(".nav-mobile-toggle");
const navLinks = document.querySelector(".nav-links");

mobileToggle.addEventListener("click", () => {
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
  if (navLinks.style.display === "flex") {
    navLinks.style.position = "absolute";
    navLinks.style.top = "60px";
    navLinks.style.left = "0";
    navLinks.style.width = "100%";
    navLinks.style.background = "rgba(255, 255, 255, 0.98)";
    navLinks.style.flexDirection = "column";
    navLinks.style.padding = "15px";
    navLinks.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    navLinks.style.backdropFilter = "blur(10px)";
    navLinks.style.gap = "15px";
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      navLinks.style.display = "none";
    }
  });
});

// Particle effect for hero section
function createParticles() {
  const hero = document.querySelector(".hero");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(0, 212, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 4}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
    hero.appendChild(particle);
  }
}

// Initialize particles on load
window.addEventListener("load", createParticles);

// Mascot images are now loaded directly from HTML with the actual logo files

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Add floating elements animation
const addFloatingElements = () => {
  const hero = document.querySelector(".hero");
  const floatingElements = ["🐋", "💎", "🚀", "🌊", "⭐"];

  floatingElements.forEach((element, index) => {
    const float = document.createElement("div");
    float.textContent = element;
    float.style.cssText = `
            position: absolute;
            font-size: 2rem;
            pointer-events: none;
            animation: floatRandom ${
              5 + Math.random() * 3
            }s ease-in-out infinite;
            animation-delay: ${index * 0.5}s;
            left: ${Math.random() * 90}%;
            top: ${Math.random() * 80 + 10}%;
            z-index: 1;
        `;
    hero.appendChild(float);
  });

  // Add floating animation CSS
  const style = document.createElement("style");
  style.textContent = `
        @keyframes floatRandom {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-20px) rotate(5deg); }
            50% { transform: translateY(-10px) rotate(-5deg); }
            75% { transform: translateY(-30px) rotate(3deg); }
        }
    `;
  document.head.appendChild(style);
};

// Initialize floating elements
window.addEventListener("load", addFloatingElements);

// Easter egg: Konami code
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.keyCode);
  if (konamiCode.length > konami.length) {
    konamiCode.shift();
  }

  if (JSON.stringify(konamiCode) === JSON.stringify(konami)) {
    // Easter egg: Make Walbin dance
    const mascot = document.querySelector(".mascot-container");
    mascot.style.animation = "dance 1s ease-in-out 3";

    // Add dance animation
    const danceStyle = document.createElement("style");
    danceStyle.textContent = `
            @keyframes dance {
                0%, 100% { transform: rotate(0deg) scale(1); }
                25% { transform: rotate(-10deg) scale(1.1); }
                50% { transform: rotate(10deg) scale(0.9); }
                75% { transform: rotate(-5deg) scale(1.05); }
            }
        `;
    document.head.appendChild(danceStyle);

    // Show special message
    const specialToast = document.createElement("div");
    specialToast.className = "toast show";
    specialToast.innerHTML =
      '<i class="fas fa-star"></i><span>🐋 Walbin loves you! 🐋</span>';
    specialToast.style.background = "linear-gradient(45deg, #ff6b6b, #4ecdc4)";
    document.body.appendChild(specialToast);

    setTimeout(() => {
      specialToast.remove();
      konamiCode = [];
    }, 3000);
  }
});

// Performance optimization: Lazy load animations
const lazyAnimations = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
});

document
  .querySelectorAll(".hero, .about, .token-info, .community")
  .forEach((section) => {
    lazyAnimations.observe(section);
  });
