// Form Submission Handler
document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const emailInput = document.getElementById("emailInput");
  const formNote = document.getElementById("formNote");
  const successMessage = document.getElementById("successMessage");
  const email = emailInput.value.trim();

  // Validate email format
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  if (!emailRegex.test(email)) {
    showError(emailInput, "Please enter a valid email address");
    return;
  }

  // Simulate API call
  formNote.style.display = "none";
  successMessage.style.display = "block";
  emailInput.disabled = true;
  const submitButton = this.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = "✓ Joined!";
  submitButton.disabled = true;

  // Reset form after 3 seconds
  setTimeout(() => {
    this.reset();
    emailInput.disabled = false;
    submitButton.disabled = false;
    submitButton.textContent = originalText;
    formNote.style.display = "block";
    successMessage.style.display = "none";
  }, 3000);
});

// Error handling
function showError(element, message) {
  element.classList.add("error");
  setTimeout(() => element.classList.remove("error"), 3000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const href = this.getAttribute("href");
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault();
      const element = document.querySelector(href);
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// Add animations on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll(".card").forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});

// Observe testimonials
document.querySelectorAll(".testimonial").forEach(testimonial => {
  testimonial.style.opacity = "0";
  testimonial.style.transform = "translateY(20px)";
  testimonial.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(testimonial);
});

// Mobile menu toggle (for future responsive nav)
function setupMobileNav() {
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  
  navLinks.forEach(link => {
    link.addEventListener("click", function() {
      // Close menu on mobile when link is clicked
      if (window.innerWidth <= 768) {
        navMenu.classList.remove("active");
      }
    });
  });
}

setupMobileNav();

// Keyboard navigation accessibility
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    // Handle escape key if needed
  }
});

// Performance: Lazy loading for images (when images are added)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach(img => {
    imageObserver.observe(img);
  });
}

// Analytics tracking (optional - log form submissions)
function trackEvent(eventName, eventData = {}) {
  if (window.gtag) {
    gtag("event", eventName, eventData);
  }
  console.log(`Event: ${eventName}`, eventData);
}

// Track form submission
document.getElementById("signupForm").addEventListener("submit", function() {
  const emailInput = document.getElementById("emailInput");
  trackEvent("signup_email_submit", {
    email_domain: emailInput.value.split("@")[1]
  });
});

console.log("BuildTogether Website Initialized ✓");
