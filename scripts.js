// Register GSAP plugins
// (odstránené všetky animácie)

// Hero section animations
const initHeroAnimations = () => {
  const heroDifferent = document.querySelector('.different-hero');
  if (!heroDifferent) return;

  // Only run on desktop
  if (window.innerWidth < 1024) return;

  // Set up the glitch text
  let text = heroDifferent.textContent.trim();
  if (!text) {
    text = 'GLITCH DEBUG';
    heroDifferent.textContent = text;
  }
  heroDifferent.innerHTML = '';
  heroDifferent.textContent = text;
  heroDifferent.classList.add('glitch-text');
  heroDifferent.setAttribute('data-text', text);
  heroDifferent.style.color = '#AFB1B7';

  // Add CSS for CodePen-style glitch effect
  const style = document.createElement('style');
  style.textContent = `
    .glitch-text {
      position: relative;
      color: #AFB1B7;
      font-family: inherit;
      font-weight: bold;
      font-size: inherit;
      text-transform: uppercase;
      letter-spacing: inherit;
      display: inline-block;
      line-height: 1.1;
      overflow: visible;
    }
    .glitch-text::before,
    .glitch-text::after {
      content: attr(data-text);
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      overflow: hidden;
      color: #AFB1B7;
      opacity: 0;
      pointer-events: none;
    }
    .glitch-text.glitch-active::before {
      opacity: 1;
      animation: glitchTop 0.35s linear;
    }
    .glitch-text.glitch-active::after {
      opacity: 1;
      animation: glitchBot 0.35s linear;
    }
    .glitch-text.glitch-hover::before {
      opacity: 1;
      animation: glitchTopHover 0.4s linear;
    }
    .glitch-text.glitch-hover::after {
      opacity: 1;
      animation: glitchBotHover 0.4s linear;
    }
    @keyframes glitchTop {
      0% { clip-path: inset(0 0 60% 0); transform: translate(-2px, -1px); }
      20% { clip-path: inset(0 0 60% 0); transform: translate(2px, 1px); }
      40% { clip-path: inset(0 0 60% 0); transform: translate(-2px, 1px); }
      60% { clip-path: inset(0 0 60% 0); transform: translate(2px, -1px); }
      80% { clip-path: inset(0 0 60% 0); transform: translate(-2px, -1px); }
      100% { clip-path: inset(0 0 60% 0); transform: translate(0, 0); }
    }
    @keyframes glitchBot {
      0% { clip-path: inset(60% 0 0 0); transform: translate(2px, 1px); }
      20% { clip-path: inset(60% 0 0 0); transform: translate(-2px, -1px); }
      40% { clip-path: inset(60% 0 0 0); transform: translate(2px, -1px); }
      60% { clip-path: inset(60% 0 0 0); transform: translate(-2px, 1px); }
      80% { clip-path: inset(60% 0 0 0); transform: translate(2px, 1px); }
      100% { clip-path: inset(60% 0 0 0); transform: translate(0, 0); }
    }
    @keyframes glitchTopHover {
      0% { clip-path: inset(0 0 60% 0); transform: translate(-4px, -2px); }
      20% { clip-path: inset(0 0 60% 0); transform: translate(4px, 2px); }
      40% { clip-path: inset(0 0 60% 0); transform: translate(-4px, 2px); }
      60% { clip-path: inset(0 0 60% 0); transform: translate(4px, -2px); }
      80% { clip-path: inset(0 0 60% 0); transform: translate(-4px, -2px); }
      100% { clip-path: inset(0 0 60% 0); transform: translate(0, 0); }
    }
    @keyframes glitchBotHover {
      0% { clip-path: inset(60% 0 0 0); transform: translate(4px, 2px); }
      20% { clip-path: inset(60% 0 0 0); transform: translate(-4px, -2px); }
      40% { clip-path: inset(60% 0 0 0); transform: translate(4px, -2px); }
      60% { clip-path: inset(60% 0 0 0); transform: translate(-4px, 2px); }
      80% { clip-path: inset(60% 0 0 0); transform: translate(4px, 2px); }
      100% { clip-path: inset(60% 0 0 0); transform: translate(0, 0); }
    }
  `;
  document.head.appendChild(style);

  // Glitch trigger every 5 seconds
  function triggerGlitch() {
    heroDifferent.classList.add('glitch-active');
    setTimeout(() => {
      heroDifferent.classList.remove('glitch-active');
    }, 400); // glitch visible for 0.4s
  }
  triggerGlitch(); // initial
  setInterval(triggerGlitch, 5000);

  // Strong glitch on hover
  heroDifferent.addEventListener('mouseenter', () => {
    heroDifferent.classList.add('glitch-hover');
  });
  heroDifferent.addEventListener('mouseleave', () => {
    heroDifferent.classList.remove('glitch-hover');
  });
};
const initPortfolioAnimations = () => {};
const initExpertiseAnimations = () => {};
const initLogoCarousel = () => {
  const track = document.getElementById("logoTrack");
  if (!track) return;

  let logoSet = track.querySelector(".logo-set");
  if (!logoSet) return;

  // Počkaj na načítanie všetkých obrázkov v badge
  const images = Array.from(logoSet.querySelectorAll('img'));
  let loaded = 0;
  const onImgLoad = () => {
    loaded++;
    if (loaded === images.length) {
      startInfiniteStrip();
    }
  };
  if (images.length === 0) {
    startInfiniteStrip();
  } else {
    images.forEach(img => {
      if (img.complete) {
        onImgLoad();
      } else {
        img.addEventListener('load', onImgLoad);
        img.addEventListener('error', onImgLoad);
      }
    });
  }

  function startInfiniteStrip() {
    // Odstráň všetky predchádzajúce klony
    const clones = track.querySelectorAll('.logo-set.clone');
    clones.forEach(clone => clone.remove());

    // Zisti šírku viewportu a logo-setu
    const viewportWidth = track.offsetWidth;
    const logoSetWidth = logoSet.offsetWidth;
    const gap = parseInt(getComputedStyle(logoSet).gap) || 0;

    // Vypočítaj, koľko kópií treba na pokrytie aspoň 2,5x viewportu
    let minTotalWidth = viewportWidth * 2.5;
    let numClones = Math.ceil(minTotalWidth / logoSetWidth);

    // Pridaj potrebný počet klonov a nastav gap medzi setmi
    for (let i = 0; i < numClones; i++) {
      let clone = logoSet.cloneNode(true);
      clone.classList.add('clone');
      clone.style.marginLeft = gap + 'px';
      track.appendChild(clone);
    }
    // Prvý (originálny) logo-set nemá margin-left
    logoSet.style.marginLeft = '0px';

    // Set initial styles
    gsap.set(track, { x: 0 });

    // Animuj o šírku jedného logo-setu + gap
    gsap.to(track, {
      x: -(logoSetWidth + gap),
      duration: 20,
      repeat: -1,
      ease: "none",
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % -(logoSetWidth + gap))
      }
    });

    // Hover efekt na badge
    const badges = track.querySelectorAll(".badge");
    badges.forEach(badge => {
      badge.addEventListener("mouseenter", () => {
        gsap.to(badge, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      badge.addEventListener("mouseleave", () => {
        gsap.to(badge, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }
};

// Mobile menu functionality
const initMobileMenu = () => {
  const burger = document.getElementById('burger');
  if (!burger) return; // Safety check
  
  const nav = document.querySelector('.nav');
  if (!nav) return; // Safety check
  
  const navLinks = nav.querySelectorAll('a');
  
  const toggleMenu = () => {
    const isOpen = burger.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen);
    nav.classList.toggle('show');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  burger.addEventListener('click', toggleMenu);

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('show')) {
        toggleMenu();
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('show') && !nav.contains(e.target) && e.target !== burger && !burger.contains(e.target)) {
      toggleMenu();
    }
  });

  // Close menu when escape key is pressed
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('show')) {
      toggleMenu();
    }
  });
  
  // Handle window resize - close mobile menu if window is resized to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('show')) {
      toggleMenu();
    }
  });
};

// Smooth scroll using GSAP
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        const offset = 100; // Adjust this value based on your header height
        const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
        
        gsap.to(window, {
          scrollTo: { y: y, autoKill: false },
          duration: 1,
          ease: "power3.inOut"
        });
      }
    });
  });
};

// Expertise cards functionality
const initExpertiseCards = () => {
  const expertiseItems = document.querySelectorAll('.expertise-item');
  
  expertiseItems.forEach(item => {
    const headerRow = item.querySelector('.expertise-header-row');
    const content = item.querySelector('.expertise-content');
    
    if (!content || !headerRow) return; // Safety check
    
    // Set initial states
    if (!item.classList.contains('featured')) {
      gsap.set(content, { height: 0 });
    } else {
      // Pre-expand featured item
      item.classList.add('expanded');
      gsap.set(content, { height: 'auto' });
    }
    
    // Toggle on header row click (not just arrow)
    headerRow.addEventListener('click', function(e) {
      toggleExpertiseCard(e, item, content, headerRow);
    });
  });
};

// Extracted toggle function for expertise cards
function toggleExpertiseCard(e, item, content, viewButton) {
  e.preventDefault();
  e.stopPropagation();
  
  // Prevent toggle if animating
  if (item.dataset.animating === 'true') return;
  item.dataset.animating = 'true';
  
  const isExpanded = item.classList.contains('expanded');
  
  // Close other items
  document.querySelectorAll('.expertise-item.expanded').forEach(otherItem => {
    if (otherItem !== item) {
      const otherContent = otherItem.querySelector('.expertise-content');
      const otherViewButton = otherItem.querySelector('.view-button');
      
      otherItem.classList.remove('expanded');
      
      if (otherContent) {
        gsap.killTweensOf(otherContent);
        gsap.to(otherContent, {
          height: 0,
          duration: 0.5,
          ease: "power3.inOut",
          onComplete: () => {
            otherItem.dataset.animating = 'false';
          }
        });
      }
    }
  });
  
  // Toggle current item
  if (isExpanded) {
    item.classList.remove('expanded');
    gsap.killTweensOf(content);
    gsap.to(content, {
      height: 0,
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        item.dataset.animating = 'false';
      }
    });
  } else {
    item.classList.add('expanded');
    gsap.killTweensOf(content);
    gsap.set(content, { height: 'auto' });
    const height = content.offsetHeight;
    gsap.set(content, { height: 0 });
    gsap.to(content, {
      height: height,
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(content, { height: 'auto' });
        item.dataset.animating = 'false';
      }
    });
  }
}

// Contact section animations
const initContactAnimations = () => {
  // Create timeline for initial animations
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".contact",
      start: "top 80%",
      end: "bottom top",
      toggleActions: "play none none reverse"
    }
  });

  // Initial animations
  tl.from(".contact-title", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  })
  .from([".logo-footer", ".contact-info"], {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out"
  }, "-=0.5");

  // Create step animation for the title
  const title = document.querySelector(".contact-title");
  if (!title) return;

  // Create and cache spans
  const text = "GET IN TOUCH";
  title.innerHTML = text.split("").map(char => 
    `<span style="display: inline-block; transform-origin: center;">${char === " " ? "&nbsp;" : char}</span>`
  ).join("");
  
  const spans = [...title.querySelectorAll("span")];
  let isPaused = false;
  let mainTimeline;

  const createMainTimeline = () => {
    // Zrušíme existujúcu animáciu ak existuje
    if (mainTimeline) {
      mainTimeline.kill();
    }

    // Vytvoríme novú timeline
    mainTimeline = gsap.timeline({
      repeat: -1,
      onRepeat: () => {
        if (isPaused) {
          mainTimeline.pause();
        }
      }
    });

    // Reset všetkých písmen
    spans.forEach(span => {
      span.classList.remove('filled');
      gsap.set(span, { scale: 1 });
    });

    // Animácia dopredu
    spans.forEach((span, i) => {
      mainTimeline.to(span, {
        scale: 1.1,
        duration: 0.1,
        ease: "power2.out",
        onStart: () => {
          if (!isPaused) span.classList.add('filled');
        }
      })
      .to(span, {
        scale: 1,
        duration: 0.1,
        ease: "power2.in"
      }, "-=0.05");

      // Pridáme malú pauzu medzi písmenami
      if (i < spans.length - 1) {
        mainTimeline.to({}, { duration: 0.075 });
      }
    });

    // Pauza na konci
    mainTimeline.to({}, { duration: 0.5 });

    // Animácia späť
    [...spans].reverse().forEach((span, i) => {
      mainTimeline.to(span, {
        scale: 1.1,
        duration: 0.1,
        ease: "power2.out",
        onStart: () => {
          if (!isPaused) span.classList.remove('filled');
        }
      })
      .to(span, {
        scale: 1,
        duration: 0.1,
        ease: "power2.in"
      }, "-=0.05");

      // Pridáme malú pauzu medzi písmenami
      if (i < spans.length - 1) {
        mainTimeline.to({}, { duration: 0.075 });
      }
    });

    // Pauza pred opakovaním
    mainTimeline.to({}, { duration: 0.5 });

    return mainTimeline;
  };

  // Spustíme animáciu
  mainTimeline = createMainTimeline();

  // Hover efekt
  const handleMouseEnter = (e) => {
    isPaused = true;
    mainTimeline.pause();
    
    spans.forEach(span => {
      span.classList.remove('filled');
      gsap.to(span, { scale: 1, duration: 0.3 });
    });
  };

  const handleMouseMove = (e) => {
    if (!isPaused) return;

    const rect = title.getBoundingClientRect();
    spans.forEach(span => {
      const spanRect = span.getBoundingClientRect();
      const spanX = spanRect.left + spanRect.width / 2;
      const spanY = spanRect.top + spanRect.height / 2;

      const distanceFromMouse = Math.hypot(
        e.clientX - spanX,
        e.clientY - spanY
      );

      const maxDistance = 100;
      if (distanceFromMouse < maxDistance) {
        gsap.to(span, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out"
        });
        span.classList.add('filled');
      } else {
        gsap.to(span, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        span.classList.remove('filled');
      }
    });
  };

  const handleMouseLeave = () => {
    isPaused = false;
    spans.forEach(span => {
      span.classList.remove('filled');
      gsap.to(span, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    // Reštartujeme animáciu
    mainTimeline = createMainTimeline();
  };

  // Event listeners
  title.addEventListener("mouseenter", handleMouseEnter);
  title.addEventListener("mousemove", handleMouseMove, { passive: true });
  title.addEventListener("mouseleave", handleMouseLeave);

  // Cleanup
  return () => {
    if (mainTimeline) mainTimeline.kill();
    title.removeEventListener("mouseenter", handleMouseEnter);
    title.removeEventListener("mousemove", handleMouseMove);
    title.removeEventListener("mouseleave", handleMouseLeave);
  };
};

// === Global GSAP Entrance Animations ===
const initGlobalEntranceAnimations = () => {
  // Animate header/top-bar/nav
  gsap.from('.top-bar', {
    y: -60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });
  
  // Animate nav items and contact button together
  const navItems = gsap.utils.toArray('.nav ul li');
  const contactBtn = document.querySelector('.top-bar .contact-btn');
  
  // Only animate contactBtn if it's visible (not display: none)
  if (contactBtn && window.getComputedStyle(contactBtn).display !== 'none') {
    gsap.set(contactBtn, { display: 'inline-flex', opacity: 0, y: -30 });
    const navTimeline = gsap.timeline();
    navTimeline
      .from(navItems, {
        y: -30,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out'
      })
      .to(contactBtn, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out'
      }, "<"); // Animate contactBtn at the same time as navItems
  } else {
    // Animate only nav items if contactBtn is hidden
    gsap.from(navItems, {
      y: -30,
      opacity: 1,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power3.out'
    });
  }

  // Animate hero content
  gsap.from('.hero-content .left h1', {
    y: 60,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: 'power3.out',
  });
  gsap.from('.hero-content .left .different-hero', {
    y: 60,
    opacity: 0,
    duration: 1,
    delay: 0.4,
    ease: 'power3.out',
  });
  gsap.from('.hero-content .hero-text', {
    y: 60,
    opacity: 0,
    duration: 1,
    delay: 0.6,
    ease: 'power3.out',
  });
  gsap.from('.hero-content .contact-btn', {
    y: 60,
    opacity: 0,
    duration: 1,
    delay: 0.8,
    ease: 'power3.out',
  });

  // Animate logo carousel
  gsap.from('.logo-carousel', {
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 1,
    ease: 'power3.out',
  });

  // Portfolio section entrance
  gsap.from('.portfolio', {
    scrollTrigger: {
      trigger: '.portfolio',
      start: 'top 80%',
    },
    y: 80,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });
  gsap.from('.portfolio .section-title', {
    scrollTrigger: {
      trigger: '.portfolio',
      start: 'top 80%',
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    ease: 'power3.out',
  });
  gsap.from('.portfolio-card', {
    scrollTrigger: {
      trigger: '.portfolio',
      start: 'top 80%',
    },
    y: 40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    delay: 0.3,
    ease: 'power3.out',
  });

  // Expertise section entrance
  gsap.from('.expertise', {
    scrollTrigger: {
      trigger: '.expertise',
      start: 'top 80%',
    },
    y: 80,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });
  gsap.from('.expertise .section-title', {
    scrollTrigger: {
      trigger: '.expertise',
      start: 'top 80%',
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    ease: 'power3.out',
  });
  gsap.from('.expertise-item', {
    scrollTrigger: {
      trigger: '.expertise',
      start: 'top 80%',
    },
    y: 40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    delay: 0.3,
    ease: 'power3.out',
  });

  // Animate get-in-touch section if present
  if (document.querySelector('.get-in-touch')) {
    gsap.from('.get-in-touch-title', {
      scrollTrigger: {
        trigger: '.get-in-touch',
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
    gsap.from('.get-in-touch-content > *', {
      scrollTrigger: {
        trigger: '.get-in-touch',
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      delay: 0.2,
      ease: 'power3.out',
    });
  }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initHeroAnimations();
  initLogoCarousel();
  initMobileMenu();
  initSmoothScroll();
  initExpertiseCards();
  initPortfolioAnimations();
  initExpertiseAnimations();
  initContactAnimations();
  initGlobalEntranceAnimations();
  
  // Fix for the contact section title animation
  const contactTitle = document.getElementById('contactTitle');
  if (contactTitle) {
    // Create staggered spans for letters for the animation effect
    const text = contactTitle.textContent;
    contactTitle.textContent = '';
    
    [...text].forEach((letter, i) => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.style.display = 'inline-block';
      contactTitle.appendChild(span);
      
      gsap.from(span, {
        scrollTrigger: {
          trigger: '.contact',
          start: 'top 80%',
        },
        opacity: 0,
        y: 100,
        duration: 1,
        delay: i * 0.1,
        ease: "elastic.out(1, 0.3)"
      });
    });
  }
  
  // Check if we need to handle responsive logo carousel
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      // Adjust mobile-specific behaviors if needed
      const track = document.getElementById("logoTrack");
      if (track) {
        // Adjust carousel speed on mobile for better visibility
        gsap.killTweensOf(track);
        gsap.to(track, {
          x: -track.querySelector(".logo-set").offsetWidth,
          duration: 30, // Slower on mobile
          repeat: -1,
          ease: "none"
        });
      }
    }
  });
  
  // Trigger a resize event to initialize responsive behaviors
  window.dispatchEvent(new Event('resize'));

  // Odstránenie burger menu z DOM na desktope a tablete
  if (window.innerWidth > 768) {
    const burger = document.querySelector('.burger');
    if (burger) burger.remove();
  }
});