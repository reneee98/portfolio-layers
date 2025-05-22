// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Hero section animations
const initHeroAnimations = () => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  
  tl.from(".logo", {
    y: -50,
    opacity: 0,
    duration: 1
  })
  .from(".nav ul li", {
    y: -50,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8
  }, "-=0.5")
  .from(".top-bar > .contact-btn", {
    y: -50,
    opacity: 0,
    duration: 0.8
  }, "-=0.5")
  .from(".hero-content > .contact-btn", {
    y: -50,
    opacity: 0,
    duration: 0.8
  }, "-=0.5")
  .from(".left h1", {
    y: 100,
    opacity: 0,
    duration: 1
  }, "-=0.3")
  .from(".left h2", {
    y: 100,
    opacity: 0,
    duration: 1
  }, "-=0.7")
  .from(".hero-text", {
    y: 50,
    opacity: 0,
    duration: 1
  }, "-=0.5");
};

// Portfolio section animations
const initPortfolioAnimations = () => {
  // Animate section title
  gsap.from(".portfolio .section-title", {
    scrollTrigger: {
      trigger: ".portfolio",
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  // Animate portfolio cards
  gsap.from(".portfolio-card", {
    scrollTrigger: {
      trigger: ".portfolio-grid",
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out"
  });
};

// Expertise section animations
const initExpertiseAnimations = () => {
  // Animate expertise tag
  gsap.from(".expertise .tag", {
    scrollTrigger: {
      trigger: ".expertise",
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    x: -50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  });

  // Animate section title
  gsap.from(".expertise .section-title", {
    scrollTrigger: {
      trigger: ".expertise",
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  // Animate expertise items
  gsap.from(".expertise-item", {
    scrollTrigger: {
      trigger: ".expertise-items",
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out"
  });
};

// Smooth logo carousel animation using GSAP
const initLogoCarousel = () => {
  const track = document.getElementById("logoTrack");
  if (!track) return;
  
  const originalSet = track.querySelector(".logo-set");
  if (!originalSet) return;
  
  // Clone logo sets for infinite scroll
  const clone1 = originalSet.cloneNode(true);
  const clone2 = originalSet.cloneNode(true);
  track.appendChild(clone1);
  track.appendChild(clone2);

  const fullSetWidth = originalSet.offsetWidth;
  
  // Create infinite scroll animation
  gsap.to(track, {
    x: -fullSetWidth,
    duration: 20,
    repeat: -1,
    ease: "none",
    paused: false
  });
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
    const viewButton = item.querySelector('.view-button');
    const content = item.querySelector('.expertise-content');
    const headerRow = item.querySelector('.expertise-header-row');
    
    if (!content || !viewButton) return; // Safety check
    
    // Set initial states
    if (!item.classList.contains('featured')) {
      content.style.display = 'none';
      gsap.set(content, { height: 0 });
    } else {
      // Pre-expand featured item
      item.classList.add('expanded');
      content.style.display = 'block';
      gsap.set(content, { height: 'auto' });
      viewButton.innerHTML = `View less
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }
    
    // Toggle expertise card
    if (headerRow) {
      headerRow.addEventListener('click', function(e) {
        toggleExpertiseCard(e, item, content, viewButton);
      });
    }
    
    if (viewButton) {
      viewButton.addEventListener('click', function(e) {
        toggleExpertiseCard(e, item, content, viewButton);
      });
    }
  });
};

// Extracted toggle function for expertise cards
function toggleExpertiseCard(e, item, content, viewButton) {
  e.preventDefault();
  e.stopPropagation();
  
  const isExpanded = item.classList.contains('expanded');
  
  // Close other items
  document.querySelectorAll('.expertise-item.expanded').forEach(otherItem => {
    if (otherItem !== item) {
      const otherContent = otherItem.querySelector('.expertise-content');
      const otherViewButton = otherItem.querySelector('.view-button');
      
      otherItem.classList.remove('expanded');
      
      if (otherContent) {
        // First get the height for animation
        const height = otherContent.offsetHeight;
        
        // Then animate and hide
        gsap.to(otherContent, {
          height: 0,
          duration: 0.5,
          ease: "power3.inOut",
          onComplete: () => {
            otherContent.style.display = 'none';
          }
        });
      }
      
      if (otherViewButton) {
        otherViewButton.innerHTML = `View more
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`;
      }
    }
  });
  
  // Toggle current item
  if (isExpanded) {
    item.classList.remove('expanded');
    
    gsap.to(content, {
      height: 0,
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        content.style.display = 'none';
      }
    });
    
    if (viewButton) {
      viewButton.innerHTML = `View more
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }
  } else {
    item.classList.add('expanded');
    content.style.display = 'block';
    
    // Get natural height
    gsap.set(content, { height: 'auto' });
    const height = content.offsetHeight;
    
    // Animate from 0 to height
    gsap.fromTo(content,
      { height: 0 },
      { height: height, duration: 0.5, ease: "power3.inOut" }
    );
    
    if (viewButton) {
      viewButton.innerHTML = `View less
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }
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
});