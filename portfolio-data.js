// Portfolio Data - Single Source of Truth
// Tento súbor obsahuje všetky portfolio projekty a ich detaily

const portfolioProjects = [
  {
    id: 'lienka-lenka',
    client: 'Lienka Lenka',
    description: 'Brand Identity & Creative Design',
    image: 'images/portfolio/lienkalenka-thumbnail.jpg',
    link: 'portfolio-lienka.html',
    alt: 'Lienka Lenka creative personal brand and identity design'
  },
  {
    id: 'restaurant70',
    client: 'Restaurant 70',
    description: 'Restaurant Branding & Interior Design',
    image: 'images/portfolio/70-thumbnail.jpg',
    link: 'portfolio-restaurant70.html',
    alt: 'Restaurant 70 modern restaurant branding and interior design'
  },
  {
    id: 'elfitting',
    client: 'Elfitting',
    description: 'E-commerce Design & Development',
    image: 'images/portfolio/Elfitting-thumbnail.jpg',
    link: 'portfolio-elfitting.html',
    alt: 'Elfitting modern e-commerce platform'
  },
  {
    id: 'smile-area',
    client: 'Smile Area',
    description: 'Brand Identity & Dental Clinic Design',
    image: 'images/portfolio/smilearea-thumbnail.jpg',
    link: 'portfolio-detail.html',
    alt: 'Smile Area dental clinic brand identity'
  },
  {
    id: 'bytegix',
    client: 'Bytegix',
    description: 'Web Design & Development',
    image: 'images/portfolio/Bytegix-thumbnail.jpg',
    link: 'portfolio-bytegix.html',
    alt: 'Bytegix web design and development project'
  },
  {
    id: 'mpm-luxury',
    client: 'MPM Luxury Living',
    description: 'Luxury Brand Identity',
    image: 'images/portfolio/mpm-thumbnail.jpg',
    link: 'portfolio-mpm.html',
    alt: 'MPM Luxury Living brand identity and design'
  },
  {
    id: 'nnwi',
    client: 'NNWI',
    description: 'Web Development & Digital Solutions',
    image: 'images/portfolio/nnwi-thumbnail.jpg',
    link: 'portfolio-nnwi.html',
    alt: 'NNWI web development and digital solutions'
  }
];

// Funkcia na generovanie HTML pre portfolio projekt
const generateProjectHTML = (project) => {
  return `
    <div class="portfolio-project">
      <a href="${project.link}" class="portfolio-card">
        <div class="card-image">
          <img src="${project.image}" alt="${project.alt}" loading="lazy">
        </div>
      </a>
      <div class="project-meta">
        <div class="project-client">${project.client}</div>
        <div class="project-desc">${project.description}</div>
      </div>
    </div>
  `;
};

// Funkcia na renderovanie všetkých projektov
const renderPortfolioProjects = (containerSelector, limit = null) => {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const projectsToRender = limit ? portfolioProjects.slice(0, limit) : portfolioProjects;
  
  container.innerHTML = projectsToRender.map(project => generateProjectHTML(project)).join('');
};

// Automatické načítanie projektov po načítaní stránky
document.addEventListener('DOMContentLoaded', () => {
  // Pre homepage - zobraz len prvých 6 projektov
  if (document.querySelector('.portfolio-grid') && (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/'))) {
    renderPortfolioProjects('.portfolio-grid', 6);
  }
  
  // Pre works stránku - zobraz všetky projekty
  if (document.querySelector('.works-portfolio .portfolio-grid')) {
    renderPortfolioProjects('.works-portfolio .portfolio-grid');
  }
});

// Export pre možné použitie v iných súboroch
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { portfolioProjects, generateProjectHTML, renderPortfolioProjects };
} 