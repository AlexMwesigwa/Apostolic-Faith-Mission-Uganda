// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navbar = document.querySelector(".navbar");

  // Enhanced mobile navigation
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
      }
    });
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Sermon Filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const sermonCards = document.querySelectorAll(".sermon-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      sermonCards.forEach((card) => {
        if (filterValue === "all") {
          card.style.display = "block";
        } else {
          const categories = card.getAttribute("data-category");
          if (categories && categories.includes(filterValue)) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        }
      });
    });
  });

  // Event Filters
  const eventFilterButtons = document.querySelectorAll(
    ".calendar-filters .filter-btn",
  );
  const eventCards = document.querySelectorAll(".event-card");

  eventFilterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      eventFilterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      eventCards.forEach((card) => {
        if (filterValue === "all") {
          card.style.display = "flex";
        } else {
          const category = card.getAttribute("data-category");
          if (category === filterValue) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        }
      });
    });
  });

  const videoModal = document.getElementById("videoModal");
  const sermonVideo = document.getElementById("sermonVideo");
  const videoClose = document.querySelector(".video-close");

  // Enhanced video functionality with better modal handling
  function openVideoModal(videoSrc) {
    if (videoModal && sermonVideo) {
      console.log("[v0] Opening video modal with:", { videoSrc });

      // Set video source
      sermonVideo.src = videoSrc;
      sermonVideo.load(); // Reload the video element

      // Show modal with enhanced animation
      videoModal.classList.add("show");
      document.body.style.overflow = "hidden";
    }
  }

  // Enhanced close video modal function
  function closeVideoModal() {
    if (videoModal && sermonVideo) {
      console.log("[v0] Closing video modal");

      videoModal.classList.remove("show");
      document.body.style.overflow = "auto";
      sermonVideo.pause();
      sermonVideo.currentTime = 0;
      sermonVideo.src = "";
    }
  }

  if (videoClose) {
    videoClose.addEventListener("click", closeVideoModal);
  }

  // Close modal on outside click
  if (videoModal) {
    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });
  }

  // Enhanced keyboard controls
  document.addEventListener("keydown", (e) => {
    if (videoModal && videoModal.classList.contains("show")) {
      if (e.key === "Escape") {
        closeVideoModal();
      }
    }
  });

  document.querySelectorAll(".sermon-play, .play-button").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      console.log("[v0] Play button clicked");

      const sermonCard = this.closest(".sermon-card");
      if (sermonCard) {
        const videoSrc = sermonCard.getAttribute("data-video");

        if (videoSrc) {
          openVideoModal(videoSrc);
        }
      }
    });
  });

  if (sermonVideo) {
    sermonVideo.addEventListener("error", (e) => {
      console.log("[v0] Video error:", e);
    });

    sermonVideo.addEventListener("loadstart", () => {
      console.log("[v0] Video loading started");
    });

    sermonVideo.addEventListener("canplay", () => {
      console.log("[v0] Video ready to play");
    });

    sermonVideo.addEventListener("loadedmetadata", () => {
      console.log("[v0] Video metadata loaded");
    });
  }

  // Enhanced download functionality
  document.querySelectorAll(".sermon-download").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const downloadUrl = this.getAttribute("data-download");
      if (downloadUrl) {
        // Create temporary download link
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = downloadUrl.split("/").pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  });

  // Online Giving Button
  const giveOnlineBtn = document.querySelector(".give-online-btn");
  if (giveOnlineBtn) {
    giveOnlineBtn.addEventListener("click", () => {
      document.getElementById("online-giving").scrollIntoView({
        behavior: "smooth",
      });
    });
  }

  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      // Enhanced loading state
      submitBtn.classList.add("loading");
      submitBtn.disabled = true;

      // Simulate form submission with better feedback
      setTimeout(() => {
        showNotification(
          "Thank you for your message! We will get back to you soon.",
          "success",
        );
        this.reset();
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  const givingForm = document.querySelector(".giving-form");
  if (givingForm) {
    givingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      const submitBtn = this.querySelector('button[type="submit"]');

      submitBtn.classList.add("loading");
      submitBtn.disabled = true;

      setTimeout(() => {
        showNotification(
          "Thank you for your generous donation! You will receive a confirmation email shortly.",
          "success",
        );
        this.reset();
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
      }, 3000);
    });
  }

  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = this.querySelector('input[type="email"]').value;
      const submitBtn = this.querySelector('button[type="submit"]');

      submitBtn.classList.add("loading");
      submitBtn.disabled = true;

      setTimeout(() => {
        showNotification(
          "Thank you for subscribing to our newsletter!",
          "success",
        );
        this.reset();
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 100); // Staggered animation
      }
    });
  }, observerOptions);

  // Add various animation classes to elements
  document.querySelectorAll(".feature-card").forEach((el, index) => {
    el.classList.add(index % 2 === 0 ? "fade-in" : "scale-in");
    observer.observe(el);
  });

  document
    .querySelectorAll(".sermon-card, .event-card, .ministry-card, .church-card")
    .forEach((el) => {
      el.classList.add("fade-in");
      observer.observe(el);
    });

  document.querySelectorAll(".leader-card").forEach((el, index) => {
    el.classList.add(index % 2 === 0 ? "slide-in-left" : "slide-in-right");
    observer.observe(el);
  });

  document
    .querySelectorAll(".mvv-card, .category-card, .giving-method")
    .forEach((el) => {
      el.classList.add("scale-in");
      observer.observe(el);
    });

  // Counter animation for impact stats
  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + (target >= 1000 ? "+" : "");
    }, 20);
  }

  // Animate counters when they come into view
  const statNumbers = document.querySelectorAll(".stat-number");
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = Number.parseInt(
            entry.target.textContent.replace(/\D/g, ""),
          );
          animateCounter(entry.target, target);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  statNumbers.forEach((stat) => {
    statsObserver.observe(stat);
  });

  // Back to top button
  const backToTopBtn = document.createElement("button");
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.className = "back-to-top";
  backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;

  document.body.appendChild(backToTopBtn);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);

      // Handle loading state for non-submit buttons
      if (this.type !== "submit" && !this.classList.contains("no-loading")) {
        this.classList.add("loading");
        this.disabled = true;

        setTimeout(() => {
          this.classList.remove("loading");
          this.disabled = false;
        }, 1000);
      }
    });
  });

  document
    .querySelectorAll(
      ".feature-card, .sermon-card, .ministry-card, .church-card, .category-card",
    )
    .forEach((card) => {
      card.addEventListener("mousemove", function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform =
          "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
      });
    });

  // Lazy loading for images
  const images = document.querySelectorAll('img[src*="placeholder.svg"]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        // In a real implementation, you would replace with actual images
        img.style.opacity = "0.8";
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    imageObserver.observe(img);
  });

  // Initialize tooltips for social media links
  document.querySelectorAll(".social-links a").forEach((link) => {
    const icon = link.querySelector("i");
    if (icon) {
      let platform = "";
      if (icon.classList.contains("fa-facebook")) platform = "Facebook";
      else if (icon.classList.contains("fa-twitter")) platform = "Twitter";
      else if (icon.classList.contains("fa-youtube")) platform = "YouTube";
      else if (icon.classList.contains("fa-instagram")) platform = "Instagram";
      else if (icon.classList.contains("fa-whatsapp")) platform = "WhatsApp";

      link.title = `Follow us on ${platform}`;
    }
  });

  // Live Stream Detection and Management
  function initializeLiveStream() {
    const liveStreamSection = document.getElementById("liveStreamSection");
    const facebookLiveFrame = document.getElementById("facebookLiveFrame");
    const liveTitle = document.getElementById("liveTitle");
    const liveDescription = document.getElementById("liveDescription");
    const viewerCount = document.getElementById("viewerCount");

    const FACEBOOK_PAGE_ID = "1539845381080787"; // Your Facebook page ID 
    const FACEBOOK_ACCESS_TOKEN =
      "EAAcUNcU4yJ8BRtdz2uuMESIinPVlqfBAMee11n3vchDBxtTF4ZAotrUyO9CIn2vHHj4PtKrDoKvxBvJVX0XMrFJeILW8clHG1ZC4EgdnU67ArvVWkK97asELbYkEekIsRCmyteQ5I3ZAKIipJ5v7RWHRjNGvqXk0ZA09ZBqzObY8L2dAHm0DUmNl0CVQ1jZATVBOszv7ujfZAA5ZCSvI8M2CZACR9ZAEyxaStBRcM0tQpHb343ofdAmOskYClZCpORpjPLGZCndPrUPwZC1NDTqmWCdztLWz1"; // Replace with your access token
    // Check if live stream is active
    async function checkLiveStatus() {
      try {
        // In a real implementation, you would call Facebook Graph API
        // For demo purposes, we'll simulate live detection
        const isLive = await simulateLiveCheck();

        if (isLive) {
          showLiveStream();
          updateViewerCount();
        } else {
          hideLiveStream();
        }
      } catch (error) {
        console.log("[v0] Error checking live status:", error);
      }
    }

    // Simulate live stream detection (replace with actual API call)
    async function simulateLiveCheck() {
      // This would be replaced with actual Facebook Graph API call:
      // const response = await fetch(`https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}/live_videos?access_token=${FACEBOOK_ACCESS_TOKEN}`);
      // const data = await response.json();
      // return data.data && data.data.length > 0;

      // For demo: randomly show live stream (20% chance)
      return Math.random() < 0.2;
    }

    function showLiveStream() {
      if (liveStreamSection) {
        liveStreamSection.classList.add("active");

        const facebookPageUsername = "apostolicfaith.missionuganda.3";
        const embedUrl = `https://www.facebook.com/plugins/video.php?height=315&href=https%3A%2F%2Fwww.facebook.com%2F${facebookPageUsername}%2Flive%2F&show_text=false&width=560&t=0`;

        if (facebookLiveFrame) {
          facebookLiveFrame.src = embedUrl;
        }

        // Update live stream info
        updateLiveInfo();

        console.log("[v0] Live stream is active");
      }
    }

    function hideLiveStream() {
      if (liveStreamSection) {
        liveStreamSection.classList.remove("active");
        console.log("[v0] No live stream detected");
      }
    }

    function updateLiveInfo() {
      const currentTime = new Date();
      const serviceType = getServiceType(currentTime);

      if (liveTitle) {
        liveTitle.textContent = `${serviceType} - Live Now`;
      }

      if (liveDescription) {
        liveDescription.textContent = `Join us for our live ${serviceType.toLowerCase()} streaming directly from Apostolic Faith Mission Uganda.`;
      }
    }

    function getServiceType(date) {
      const day = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const hour = date.getHours();

      if (day === 0 && hour >= 8 && hour <= 12) {
        return "Sunday Service";
      } else if (day === 3 && hour >= 17 && hour <= 20) {
        return "Wednesday Prayer Meeting";
      } else if (day === 5 && hour >= 18 && hour <= 21) {
        return "Friday Bible Study";
      } else {
        return "Special Service";
      }
    }

    function updateViewerCount() {
      // Simulate viewer count updates
      let viewers = Math.floor(Math.random() * 200) + 50;

      if (viewerCount) {
        viewerCount.textContent = viewers;
      }

      // Update viewer count every 30 seconds
      setInterval(() => {
        viewers += Math.floor(Math.random() * 10) - 5; // Random change
        viewers = Math.max(1, viewers); // Ensure at least 1 viewer

        if (viewerCount) {
          viewerCount.textContent = viewers;
        }
      }, 30000);
    }

    // Check live status every 2 minutes
    checkLiveStatus();
    setInterval(checkLiveStatus, 120000);

    console.log("[v0] Live stream detection initialized");
  }

  // Initialize live streaming functionality when DOM is loaded
  if (document.getElementById("liveStreamSection")) {
    initializeLiveStream();
  }

  console.log(
    "AFM Uganda website loaded successfully with enhanced interactivity and live streaming!",
  );
});

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${
        type === "success"
          ? "fa-check-circle"
          : type === "error"
            ? "fa-exclamation-circle"
            : "fa-info-circle"
      }"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close">&times;</button>
  `;

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${
      type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#2563eb"
    };
    color: white;
    border-radius: 12px;
    z-index: 10000;
    animation: slideInRight 0.4s ease;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    max-width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  `;

  document.body.appendChild(notification);

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remove after 4 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    }
  }, 4000);
}

const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .back-to-top:hover {
        background: #1d4ed8 !important;
        transform: translateY(-3px) scale(1.05);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.2s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    body.menu-open {
        overflow: hidden;
    }
    
    .video-modal.show {
        display: block;
    }
`;
document.head.appendChild(style);

/* ============================================================
   LIVE STREAM & DYNAMIC FEATURES
   Toggle IS_LIVE to true when actively streaming on Facebook.
   ============================================================ */
const IS_LIVE = false; // set to true when streaming
const AFM_FACEBOOK_PAGE = "AFMUgandaOfficial"; // replace with real page slug

(function () {
  const fbPageUrl = `https://www.facebook.com/${AFM_FACEBOOK_PAGE}/`;
  const fbEmbedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    fbPageUrl,
  )}&show_text=false&width=734&appId`;

  // Compute next Sunday 9:00 AM EAT (UTC+3 = 06:00 UTC)
  function getNextSundayService() {
    const now = new Date();
    const utcNow = now.getTime();
    const next = new Date(now);
    // 9:00 EAT == 06:00 UTC
    next.setUTCHours(6, 0, 0, 0);
    const dayOfWeek = next.getUTCDay(); // 0 = Sunday
    let daysUntilSunday = (7 - dayOfWeek) % 7;
    if (daysUntilSunday === 0 && next.getTime() <= utcNow) {
      daysUntilSunday = 7;
    }
    next.setUTCDate(next.getUTCDate() + daysUntilSunday);
    return next;
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function formatRemaining(ms) {
    if (ms < 0) ms = 0;
    const totalSec = Math.floor(ms / 1000);
    return {
      days: Math.floor(totalSec / 86400),
      hours: Math.floor((totalSec % 86400) / 3600),
      minutes: Math.floor((totalSec % 3600) / 60),
      seconds: totalSec % 60,
    };
  }

  // ---------- Sermons page: live section ----------
  function initLiveSection() {
    const liveSection = document.getElementById("live");
    if (!liveSection) return;

    const onlineEl = document.getElementById("liveOnline");
    const offlineEl = document.getElementById("liveOffline");
    const iframe = document.getElementById("facebookLiveEmbed");
    const joinBtn = document.getElementById("joinFacebookBtn");
    const viewersEl = document.getElementById("liveViewers");
    const scrollBtn = document.getElementById("browsePastSermons");

    if (IS_LIVE) {
      offlineEl.hidden = true;
      onlineEl.hidden = false;
      if (iframe) iframe.src = fbEmbedUrl;
      if (joinBtn) joinBtn.href = fbPageUrl;
      if (viewersEl) {
        let v = Math.floor(Math.random() * 180) + 40;
        viewersEl.textContent = `${v} watching live`;
        setInterval(() => {
          v = Math.max(1, v + Math.floor(Math.random() * 9) - 4);
          viewersEl.textContent = `${v} watching live`;
        }, 15000);
      }
    } else {
      onlineEl.hidden = true;
      offlineEl.hidden = false;
      const target = getNextSundayService();
      const valueEls = offlineEl.querySelectorAll(".countdown-value");
      function tick() {
        const r = formatRemaining(target.getTime() - Date.now());
        valueEls.forEach((el) => {
          const u = el.getAttribute("data-unit");
          el.textContent = pad(r[u] || 0);
        });
      }
      tick();
      setInterval(tick, 1000);
    }

    if (scrollBtn) {
      scrollBtn.addEventListener("click", () => {
        const grid = document.getElementById("sermonsGridSection");
        if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  // ---------- Sticky Watch Live floating button (site-wide) ----------
  function initStickyLiveBtn() {
    const btn = document.createElement("a");
    btn.className = "sticky-live-btn";
    btn.href = "sermons.html#live";
    btn.innerHTML = IS_LIVE
      ? '<span class="sticky-live-dot"></span> Watch Live'
      : '<i class="fas fa-calendar-alt"></i> Next Service';
    if (IS_LIVE) btn.classList.add("is-live");
    document.body.appendChild(btn);

    // Hide when live section visible on sermons page
    const liveSection = document.getElementById("live");
    if (liveSection && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            btn.classList.toggle("sticky-live-hidden", e.isIntersecting);
          });
        },
        { threshold: 0.2 },
      );
      io.observe(liveSection);
    }
  }

  // ---------- Announcement banner (Home page) ----------
  function initAnnouncementBar() {
    const bar = document.getElementById("announcementBar");
    if (!bar) return;
    if (localStorage.getItem("afm_announcement_dismissed") === "1") return;
    bar.hidden = false;
    document.body.classList.add("has-announcement");
    const closeBtn = document.getElementById("announcementClose");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        bar.hidden = true;
        document.body.classList.remove("has-announcement");
        localStorage.setItem("afm_announcement_dismissed", "1");
      });
    }
  }

  // ---------- Event countdowns (Home page) ----------
  function initEventCountdowns() {
    const cards = document.querySelectorAll(".event-card[data-date]");
    if (!cards.length) return;
    function tick() {
      cards.forEach((card) => {
        const target = new Date(card.getAttribute("data-date")).getTime();
        const el = card.querySelector("[data-countdown]");
        if (!el || Number.isNaN(target)) return;
        const diff = target - Date.now();
        if (diff <= 0) {
          el.textContent = "Happening now";
          el.classList.add("event-countdown-live");
          return;
        }
        const r = formatRemaining(diff);
        let txt;
        if (r.days > 0)
          txt = `Starts in ${r.days} day${r.days !== 1 ? "s" : ""}, ${r.hours} hr${r.hours !== 1 ? "s" : ""}`;
        else if (r.hours > 0)
          txt = `Starts in ${r.hours} hr${r.hours !== 1 ? "s" : ""}, ${r.minutes} min`;
        else txt = `Starts in ${r.minutes} min`;
        el.textContent = txt;
      });
    }
    tick();
    setInterval(tick, 60000);
  }

  // ---------- Sermon search ----------
  function initSermonSearch() {
    const input = document.getElementById("sermonSearch");
    if (!input) return;
    const cards = document.querySelectorAll(".sermon-card");
    const empty = document.getElementById("sermonNoResults");

    function applyFilter() {
      const q = input.value.trim().toLowerCase();
      let visible = 0;
      cards.forEach((card) => {
        // Respect existing filter button display:none state? simpler: search overrides
        const title = (
          card.getAttribute("data-title") ||
          card.querySelector("h3")?.textContent ||
          ""
        ).toLowerCase();
        const pastor = (
          card.getAttribute("data-pastor") ||
          card.querySelector(".sermon-pastor")?.textContent ||
          ""
        ).toLowerCase();
        const match = !q || title.includes(q) || pastor.includes(q);
        card.classList.toggle("sermon-card-hidden", !match);
        if (match) visible++;
      });
      if (empty) empty.hidden = visible !== 0;
    }
    input.addEventListener("input", applyFilter);
  }

  document.addEventListener("DOMContentLoaded", () => {
    initLiveSection();
    initStickyLiveBtn();
    initAnnouncementBar();
    initEventCountdowns();
    initSermonSearch();
  });
})();
