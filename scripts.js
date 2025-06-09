// Register GSAP plugins
// (odstránené všetky animácie)

// Function to randomly select and set background video
const initRandomVideo = () => {
  const videos = ['video-layers.mp4', 'video2-layers.mp4'];
  const randomVideo = videos[Math.floor(Math.random() * videos.length)];
  const videoElements = document.querySelectorAll('.bg-video');
  
  console.log('Initializing random video:', randomVideo);
  console.log('Found video elements:', videoElements.length);
  
  videoElements.forEach(video => {
    const source = video.querySelector('source');
    if (source) {
      source.src = randomVideo;
      // Force the video element to reset and load the new source
      video.pause();
      video.currentTime = 0;
      video.load();
      
      // Add event listener to ensure video starts playing after load
      video.onloadeddata = () => {
        video.play();
      };
    }
  });
};

// Hero section animations
const initHeroAnimations = () => {
  const heroDifferent = document.querySelector('.different-hero');
  if (!heroDifferent) return;

  // Set up the glitch text
  let text = heroDifferent.textContent.trim();
  if (!text) {
    text = 'DIFFERENT';
    heroDifferent.textContent = text;
  }
  heroDifferent.setAttribute('data-text', text);

  // Glitch trigger every 5 seconds
  function triggerGlitch() {
    heroDifferent.classList.add('glitch-active');
    setTimeout(() => {
      heroDifferent.classList.remove('glitch-active');
    }, 350); // glitch visible for 0.35s
  }
  
  triggerGlitch(); // initial trigger
  setInterval(triggerGlitch, 5000); // trigger every 5 seconds
};
const initPortfolioAnimations = () => {};
const initExpertiseAnimations = () => {};
// === Works Page Animations ===
const initWorksAnimations = () => {
  // Check if we're on works page
  if (!document.body.classList.contains('works-page')) return;

  // Works header content animations
  gsap.from('.works-title', {
    y: 80,
    opacity: 0,
    duration: 1.2,
    delay: 0.2,
    ease: 'power3.out',
  });

  gsap.from('.works-subtitle', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    ease: 'power3.out',
  });

  // Simple scroll-triggered animations for portfolio cards
  const portfolioCards = document.querySelectorAll('.portfolio-project');
  
  portfolioCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'power3.out',
    });
  });
};

// === About Page Animations ===
const initAboutAnimations = () => {
  // Check if we're on about page
  if (!document.body.classList.contains('about-page')) return;

  // About header content animations
  gsap.from('.about-title', {
    y: 80,
    opacity: 0,
    duration: 1.2,
    delay: 0.2,
    ease: 'power3.out',
  });

  gsap.from('.about-subtitle', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    ease: 'power3.out',
  });

  // Scroll-triggered animations for sections
  const sections = document.querySelectorAll('.our-story, .our-values, .our-stats');
  
  sections.forEach((section, index) => {
    const elements = section.querySelectorAll('.section-title, .tag, .value-item, .stat-item');
    
    gsap.from(elements, {
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    });
  });

  // About footer animations with same effect as homepage contact title
  gsap.fromTo(
    ".contact-title",
    { opacity: 0, scale: 0.92 },
    {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-footer",
        start: "top 80%",
        end: "bottom top",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Footer CTA button animation
  const footerCta = document.querySelector('.footer-cta');
  if (footerCta) {
    gsap.from(footerCta, {
      scrollTrigger: {
        trigger: '.about-footer',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: 'power3.out',
    });
  }
};

// === Portfolio Detail Page Animations ===
const initPortfolioDetailAnimations = () => {
  // Disable all animations on portfolio detail pages to prevent scroll interference
  return;
  
  // Check if we're on portfolio detail page
  if (!document.body.classList.contains('portfolio-page')) return;

  // Portfolio content entrance animations - similar to homepage
  gsap.from('.portfolio-detail-title', {
    y: 80,
    opacity: 0,
    duration: 1.2,
    delay: 0.2,
    ease: 'power3.out',
  });

  gsap.from('.portfolio-detail-meta > div', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    delay: 0.4,
    ease: 'power3.out',
  });

  gsap.from('.about-project-badge', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.6,
    ease: 'power3.out',
  });

  gsap.from('.portfolio-detail-description p', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    delay: 0.8,
    ease: 'power3.out',
  });

  // Simple scroll-triggered animations for visuals
  const visualRows = document.querySelectorAll('.visuals-row, .visuals-complex, .visuals-left, .visuals-bottom-row');
  
  visualRows.forEach((row, index) => {
    gsap.from(row, {
      scrollTrigger: {
        trigger: row,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'power3.out',
    });
  });
};

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
  // Clean up any leftover menu-open class on page load
  document.body.classList.remove('menu-open');
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.width = '';
  document.body.style.height = '';
  
  const burger = document.getElementById('burger');
  if (!burger) return; // Safety check
  
  // Select appropriate nav element based on page
  let nav;
  if (document.body.classList.contains('about-page')) {
    nav = document.querySelector('.about-nav-overlay');
  } else if (document.body.classList.contains('works-page')) {
    nav = document.querySelector('.works-nav-overlay');
  } else {
    nav = document.querySelector('.nav');
  }
  if (!nav) return; // Safety check
  
  const navLinks = nav.querySelectorAll('a');
  
  const toggleMenu = () => {
    const isOpen = burger.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen);
    nav.classList.toggle('show');
    
    // Add/remove menu-open class for all pages
    document.body.classList.toggle('menu-open', isOpen);
    
    // Fallback: explicitly set overflow style for safety
    if (!isOpen) {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }
  };

  burger.addEventListener('click', toggleMenu);

  // Also listen for close button inside overlay (about page)
  const burgerClose = document.getElementById('burger-close');
  if (burgerClose) {
    burgerClose.addEventListener('click', toggleMenu);
  }

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
    
    // Safety cleanup for desktop sizes
    if (window.innerWidth > 768) {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }
  });
};

// Smooth scroll using GSAP - disabled for portfolio detail pages
const initSmoothScroll = () => {
  // Disable smooth scroll on portfolio detail pages to prevent scroll issues
  if (document.body.classList.contains('portfolio-page')) {
    return;
  }
  
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
  // Animate the whole contact title with scale and fade-in
  gsap.fromTo(
    ".contact-title",
    { opacity: 0, scale: 0.92 },
    {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact",
        start: "top 80%",
        end: "bottom top",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Animate contact info and logo-footer as before
  gsap.from([".logo-footer", ".contact-info"], {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".contact",
      start: "top 80%",
      end: "bottom top",
      toggleActions: "play none none reverse"
    }
  });
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
  initRandomVideo();
  initHeroAnimations();
  initLogoCarousel();
  initMobileMenu();
  initSmoothScroll();
  initExpertiseCards();
  initPortfolioAnimations();
  initExpertiseAnimations();
      initContactAnimations();
    initGlobalEntranceAnimations();
    initPortfolioDetailAnimations();
    initWorksAnimations();
    initAboutAnimations();
    
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



  initContactGlitch();
});

// Also initialize random video on window load to ensure all resources are available
window.addEventListener('load', () => {
  initRandomVideo();
});

const initContactGlitch = () => {
  const contactTitles = document.querySelectorAll('.contact-title');
  if (!contactTitles.length) return;

  contactTitles.forEach(contactTitle => {
    // Set up the glitch text for each title
    let text = contactTitle.textContent.trim();
    if (!text) {
      text = contactTitle.id === 'aboutContactTitle1' ? 'READY TO WORK' : 
             contactTitle.id === 'aboutContactTitle2' ? 'TOGETHER?' : 'GET IN TOUCH';
      contactTitle.textContent = text;
    }
    contactTitle.innerHTML = '';
    contactTitle.textContent = text;
    contactTitle.classList.add('glitch-text');
    contactTitle.setAttribute('data-text', text);
    contactTitle.style.color = '#fff';
  });

  // Add CSS for glitch effect if not already present
  if (!document.getElementById('glitch-style-contact')) {
    const style = document.createElement('style');
    style.id = 'glitch-style-contact';
    style.textContent = `
      .glitch-text {
        position: relative;
        color: #fff;
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
        color: #fff;
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
  }

  // Glitch trigger every 5 seconds for all contact titles
  function triggerGlitch() {
    contactTitles.forEach(contactTitle => {
      contactTitle.classList.add('glitch-active');
      setTimeout(() => {
        contactTitle.classList.remove('glitch-active');
      }, 400);
    });
  }
  triggerGlitch();
  setInterval(triggerGlitch, 5000);

  // Strong glitch on hover for all contact titles
  contactTitles.forEach(contactTitle => {
    contactTitle.addEventListener('mouseenter', () => {
      contactTitle.classList.add('glitch-hover');
    });
    contactTitle.addEventListener('mouseleave', () => {
      contactTitle.classList.remove('glitch-hover');
    });
  });
};