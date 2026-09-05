const sanitizeText = (value = '') => String(value)
  .replace(/[<>]/g, '')
  .replace(/[\u0000-\u001F\u007F]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, 2000);

const root = document.documentElement;
const favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.type = 'image/jpeg';
favicon.href = 'images/logo.jpg';
document.head.appendChild(favicon);
const loader = document.createElement('div');
loader.className = 'site-loader';
loader.setAttribute('role', 'status');
loader.setAttribute('aria-label', 'Loading Falcon Concrete Creation');
loader.innerHTML = '<img src="images/logo.jpg" alt=""><span></span>';
document.body.prepend(loader);
window.addEventListener('load', () => {
  window.setTimeout(() => loader.classList.add('is-hidden'), 350);
});
const contactEmail = 'falcon.shadab@gmail.com';
const whatsappNumber = '919575378106';
const instagramUrl = 'https://www.instagram.com/falcon.shadab?igsi=MXQ3aGg5OHZycDYwdA%3D%3D';
const savedTheme = localStorage.getItem('falcon-theme');
if (savedTheme) root.dataset.theme = savedTheme;
document.querySelectorAll('[data-theme-choice]').forEach((button) => {
  button.addEventListener('click', () => {
    root.dataset.theme = button.dataset.themeChoice;
    localStorage.setItem('falcon-theme', button.dataset.themeChoice);
  });
});
const page = root.dataset.page;
const seoByPage = {
  about: ['About Falcon Concrete Creation', 'Meet the Falcon Concrete Creation studio and its hand-finished approach to mineral surfaces.', 'images/luxury-interior.jpg'],
  services: ['Services | Falcon Concrete Creation', 'Discover lime plaster, micro concrete, terrazzo and specialist flooring finishes by Falcon Concrete Creation.', 'images/limeplasterwallandceilings/IMG-20250419-WA0038.jpg'],
  projects: ['Projects | Falcon Concrete Creation', 'View selected residential and hospitality interiors shaped by Falcon Concrete Creation mineral finishes.', 'images/luxury-interior.jpg'],
  teams: ['Team | Falcon Concrete Creation', 'Meet the designers, finishers and material specialists behind Falcon Concrete Creation.', 'images/luxury-interior.jpg'],
  brochure: ['Falcon Brochure | Falcon Concrete Creation', 'Falcon Concrete Creation brochure featuring luxury wall finishes, lime plaster and micro concrete surfaces for contemporary interiors.', 'images/luxury-interior.jpg']
};
const seo = seoByPage[page];
if (seo) {
  [['theme-color', '#1e211c'], ['og:type', 'website'], ['og:title', seo[0]], ['og:description', seo[1]], ['og:image', seo[2]], ['twitter:card', 'summary']].forEach(([name, content]) => {
    const meta = document.createElement('meta');
    meta.setAttribute(name.startsWith('og:') ? 'property' : 'name', name);
    meta.content = content;
    document.head.appendChild(meta);
  });
}
const clientLogoFiles = {
  VIANAAR: 'images/clients/cl (11).jpg',
  ISPARAVA: 'images/clients/cl (9).jpg',
  SOKA: 'images/clients/cl (3).jpg',
  'BEST LOCATION': 'images/clients/cl (4).jpg',
  SIGNATURE: 'images/clients/cl (5).jpg',
  MIRAAN: 'images/clients/cl (6).jpg',
  'MILLION DOLLAR': 'images/clients/cl (3).jpg',
  JAGLAX: 'images/clients/cl (8).jpg',
  AZUL: 'images/clients/cl (9).jpg',
  RICCO: 'images/clients/cl (10).jpg',
  UNDERSOUND: 'images/clients/cl (2).jpg',
  ANAROCK: 'images/clients/cl (4).jpg'
};
document.querySelectorAll('.client-mark').forEach((mark) => {
  const name = mark.querySelector('span')?.textContent.trim();
  const logoFile = clientLogoFiles[name];
  if (!logoFile) return;
  const logo = document.createElement('img');
  logo.className = 'client-logo';
  logo.src = logoFile;
  logo.alt = `${name} logo`;
  mark.prepend(logo);
  mark.classList.add('has-logo');
});
const navigation = document.querySelector('.navbar-nav');
const routes = [
  ['home', 'Home', 'index.html'],
  ['about', 'About', 'about.html'],
  ['services', 'Services', 'services.html'],
  ['projects', 'Projects', 'projects.html'],
  ['teams', 'Team', 'teams.html'],
  ['clients', 'Clients', 'clients.html'],
  ['quotation', 'Quote', 'quotation.html'],
  ['contact', 'Contact', 'contact.html']
];
if (navigation) {
  navigation.querySelectorAll('[href="pricing.html"]').forEach((link) => link.closest('li')?.remove());
  routes.forEach(([key, label, href]) => {
    if (!navigation.querySelector(`[href="${href}"]`)) {
      const item = document.createElement('li');
      item.innerHTML = `<a class="nav-link" data-nav="${key}" href="${href}">${label}</a>`;
      navigation.appendChild(item);
    }
  });
}
document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => link.classList.remove('active'));
const activePage = page === 'service-detail' ? 'services' : page;
document.querySelector(`[data-nav="${activePage}"]`)?.classList.add('active');
document.querySelector(`.navbar-nav a[href="${activePage === 'home' ? 'index' : activePage}.html"]`)?.classList.add('active');
const themeSwitcher = document.querySelector('.theme-switcher');
if (themeSwitcher && !themeSwitcher.querySelector('[data-theme-choice="blue"]')) {
  const blueTheme = document.createElement('button');
  blueTheme.className = 'theme-dot theme-blue';
  blueTheme.dataset.themeChoice = 'blue';
  blueTheme.setAttribute('aria-label', 'Blue theme');
  themeSwitcher.appendChild(blueTheme);
  blueTheme.addEventListener('click', () => {
    root.dataset.theme = blueTheme.dataset.themeChoice;
    localStorage.setItem('falcon-theme', blueTheme.dataset.themeChoice);
  });
}
document.querySelectorAll('form').forEach((form) => {
  form.action = `https://wa.me/${whatsappNumber}`;
  form.setAttribute('target', '_blank');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const details = [...new FormData(form)].map(([key, value]) => `${sanitizeText(key)}: ${sanitizeText(value)}`).join('\n');
    const whatsappMessage = form.classList.contains('project-form')
      ? `Hello Falcon Concrete Creation, I would like to discuss a project.\n\n${details}`
      : form.classList.contains('quote-form')
        ? `Hello Falcon Concrete Creation, I would like a quotation.\n\n${details}`
        : `Hello Falcon Concrete Creation, I would like to enquire about your services.\n\n${details}`;
    window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  });
});
document.querySelectorAll('a[href^="mailto:"]').forEach((link) => { link.href = `mailto:${contactEmail}?subject=Falcon%20Concrete%20Creation%20enquiry`; if (link.textContent.includes('hello@') || link.textContent.includes('falconconcrete')) link.firstChild.textContent = contactEmail; });
const contactBar = document.createElement('div');
contactBar.className = 'contact-bar';
contactBar.innerHTML = `<span><i class="bi bi-telephone"></i> <a href="tel:+919575378106">+91 95753 78106</a></span><span><i class="bi bi-telephone"></i> <a href="tel:+919315060090">+91 93150 60090</a></span><a href="mailto:${contactEmail}"><i class="bi bi-envelope"></i> ${contactEmail}</a>`;
document.body.prepend(contactBar);
const whatsapp = document.createElement('a');
whatsapp.className = 'whatsapp-float';
whatsapp.href = `https://wa.me/${whatsappNumber}?text=Hello%20Falcon%20Concrete%20Creation%2C%20I%20would%20like%20to%20discuss%20a%20project.`;
whatsapp.target = '_blank';
whatsapp.rel = 'noopener';
whatsapp.setAttribute('aria-label', 'Chat with Falcon Concrete Creation on WhatsApp');
whatsapp.innerHTML = '<i class="bi bi-whatsapp"></i><span>WhatsApp us</span>';
document.body.appendChild(whatsapp);
document.querySelectorAll('a[href="#"]').forEach((link) => {
  if (link.textContent.toLowerCase().includes('instagram')) {
    link.href = instagramUrl;
    link.target = '_blank';
    link.rel = 'noopener';
  }
});
document.querySelectorAll('.footer').forEach((footer) => {
  const footerContainer = footer.querySelector('.container-fluid');
  const footerBrand = footer.querySelector('.footer-brand');
  if (footerBrand && !footerBrand.querySelector('img')) {
    const logo = document.createElement('img');
    logo.src = 'images/logo.jpg';
    logo.alt = 'Falcon Concrete Creation logo';
    footerBrand.prepend(logo);
  }
  const socials = document.createElement('div');
  socials.className = 'footer-socials';
  socials.innerHTML = `<span>Connect</span><a href="${instagramUrl}" target="_blank" rel="noopener"><i class="bi bi-instagram"></i> Instagram</a><a href="https://wa.me/${whatsappNumber}" target="_blank" rel="noopener"><i class="bi bi-whatsapp"></i> WhatsApp</a><a href="mailto:${contactEmail}"><i class="bi bi-envelope"></i> Email</a>`;
  footerContainer?.appendChild(socials);
});
const userWorkImages = {
  'lime-plaster': ['20250926_152354.jpg', '20251015_112328.jpg', '20251015_112334.jpg', '20260119_204005.jpg', 'IMG-20250225-WA0015.jpg', 'IMG-20250225-WA0027.jpg', 'IMG-20250225-WA0029.jpg', 'IMG-20250419-WA0038.jpg', 'IMG-20250419-WA0041.jpg', 'IMG-20251115-WA0005.jpg', 'IMG-20251218-WA0002.jpg', 'IMG-20260217-WA0019.jpg', 'IMG-20260407-WA0060.jpg', 'IMG-20260407-WA0063.jpg'].map((file) => `images/limeplasterwallandceilings/${file}`),
  'micro-concrete-wall': ['20251103_104541.jpg', '20260727_135655.jpg', '20260727_135701.jpg', '20260822_171146.jpg', '20260822_171153.jpg', '20260822_171334.jpg', '20260822_171430.jpg', 'IMG-20250325-WA0006.jpg', 'IMG-20250325-WA0007.jpg', 'IMG-20260718-WA0049.jpg', 'IMG-20260810-WA0029.jpg'].map((file) => `images/microconceretewallfinishexteriorandinterior_/${file}`),
  'micro-concrete-floor': Array.from({ length: 9 }, (_, index) => `images/microconcereteflooring/concrete_floor (${index + 1}).jpg`),
  'epoxy-flooring': ['IMG-20251002-WA0019.jpg', 'IMG-20251002-WA0026.jpg', 'IMG-20251002-WA0037.jpg', 'IMG-20251004-WA0098.jpg', 'IMG-20251004-WA0111.jpg', 'IMG-20251004-WA0114.jpg', 'IMG-20251004-WA0117.jpg', 'IMG-20251004-WA0118.jpg', 'IMG-20251004-WA0120.jpg', 'IMG-20251025-WA0004.jpg', 'IMG-20251025-WA0006.jpg'].map((file) => `images/epoxyflooring/${file}`),
  'stucco-tile': ['Screenshot_20250712_164712_Instagram.jpg', 'Screenshot_20250712_174329_Instagram.jpg', 'Screenshot_20250712_174335_Instagram.jpg', 'Screenshot_20250712_174339_Instagram.jpg', 'Screenshot_20250712_192939_Instagram.jpg', 'Screenshot_20250712_193324_Instagram.jpg'].map((file) => `images/stuccopaintmarbelfinish/${file}`),
  'marble-exterior': Array.from({ length: 9 }, (_, index) => `images/marbletexture/mb (${index + 1}).jpeg`),
  'metallic-3d-flooring': [
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80'
  ],
  'industrial-flooring': [
    'images/epoxyflooring/IMG-20251002-WA0019.jpg', 
    'images/epoxyflooring/IMG-20251002-WA0026.jpg',
    'images/epoxyflooring/IMG-20251002-WA0037.jpg'
  ],
  terrazzo: [
    'images/tarazzo/tz (1).jpg',
    'images/tarazzo/tz (2).jpg',
    'images/tarazzo/tz (3).jpg',
    'images/tarazzo/tz (4).jpg'
  ]
};
const serviceSlugs = ['lime-plaster', 'micro-concrete-wall', 'micro-concrete-floor', 'terrazzo', 'epoxy-flooring', 'metallic-3d-flooring', 'industrial-flooring', 'stucco-tile', 'marble-exterior'];
document.querySelectorAll('.service-card').forEach((card, index) => {
  const link = card.querySelector('.service-card-body a');
  const slug = serviceSlugs[index];
  if (link && slug) link.href = `service-detail.html?type=${slug}`;
  if (slug && userWorkImages[slug]) card.querySelector('img')?.setAttribute('src', userWorkImages[slug][0]);
});
const finishOptions = {
  'lime-plaster': ['02 / Lime plaster', 'Soft light.', 'Our lime plaster surfaces bring depth, tactility and a natural variation that changes beautifully throughout the day.', 'images/limeplasterwallandceilings/IMG-20250419-WA0038.jpg'],
  'micro-concrete': ['02 / Micro concrete', 'Quiet structure.', 'Micro concrete brings a seamless mineral texture to walls that feels architectural, tactile and considered.', 'images/microconceretewallfinishexteriorandinterior_/20260822_171430.jpg'],
  'stucco': ['02 / Stucco finish', 'Polished movement.', 'Stucco finishes create a softly reflective surface with hand-worked depth and a distinctly crafted character.', 'images/stuccopaintmarbelfinish/Screenshot_20250712_193324_Instagram.jpg']
};
const finishImage = document.querySelector('.feature-image[data-finish-image]');
const finishTabs = document.querySelectorAll('.finish-tab');
if (finishImage && finishTabs.length) {
  const finishLabel = document.querySelector('#finish-label');
  const finishTitle = document.querySelector('#finish-title');
  const finishCopy = document.querySelector('#finish-copy');
  finishTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const selected = finishOptions[tab.dataset.finish];
      if (!selected) return;
      finishTabs.forEach((item) => {
        const isSelected = item === tab;
        item.classList.toggle('is-active', isSelected);
        item.setAttribute('aria-selected', String(isSelected));
      });
      finishImage.dataset.finishImage = selected[3];
      finishImage.style.backgroundImage = `url("${selected[3]}")`;
      finishLabel.textContent = selected[0];
      finishTitle.textContent = selected[1];
      finishCopy.textContent = selected[2];
    });
  });
}
if (page === 'service-detail') {
  const work = {
    'lime-plaster': ['Lime plaster', 'Breathable, hand-worked mineral surfaces with soft tonal movement.', userWorkImages['lime-plaster']],
    'micro-concrete-wall': ['Micro concrete wall', 'Seamless mineral texture for sculptural, modern interiors.', userWorkImages['micro-concrete-wall']],
    'micro-concrete-floor': ['Micro concrete flooring', 'A continuous, refined floor finish shown across a completed interior installation.', userWorkImages['micro-concrete-floor']],
    terrazzo: ['Terrazzo', 'Crafted aggregate surfaces with a distinctive, lasting character.', userWorkImages.terrazzo],
    'epoxy-flooring': ['Epoxy flooring', 'Resilient, seamless protection for demanding commercial spaces.', userWorkImages['epoxy-flooring']],
    'metallic-3d-flooring': ['Metallic & 3D flooring', 'Expressive depth and reflective movement for statement spaces.', userWorkImages['metallic-3d-flooring']],
    'industrial-flooring': ['Industrial flooring', 'Built for impact, traffic and the everyday demands of work.', userWorkImages['industrial-flooring']],
    'stucco-tile': ['Stucco & tile work', 'Decorative wall finishes and precise tile installation, beautifully resolved.', userWorkImages['stucco-tile']],
    'marble-exterior': ['Marble texture', 'Weather-ready decorative texture for distinctive exterior walls and facades.', userWorkImages['marble-exterior']]
  };
  const selected = work[new URLSearchParams(window.location.search).get('type')] || work['micro-concrete-floor'];
  document.title = `${selected[0]} | Falcon Concrete Creation`;
  document.querySelector('#detail-title').innerHTML = `${selected[0].split(' ').slice(0, -1).join(' ')}<br><em>${selected[0].split(' ').at(-1)}.</em>`;
  document.querySelector('#detail-description').textContent = selected[1];
  document.querySelector('#detail-note').textContent = selected[1];
  const detailGallery = document.querySelector('#detail-gallery');
  selected[2].forEach((src, index) => { const item = document.createElement('div'); item.className = `col-6 col-md-4 ${index === 0 && selected[2].length > 1 ? 'col-lg-6' : 'col-lg-3'}`; item.innerHTML = `<img src="${src}" alt="${selected[0]} project detail ${index + 1}" loading="lazy">`; detailGallery.appendChild(item); });
}
const zoomImages = document.querySelectorAll('.micro-gallery-grid img, .project-image');
if (zoomImages.length) {
  const lightbox = document.createElement('div');
  lightbox.className = 'image-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Expanded project image');
  lightbox.innerHTML = '<button class="lightbox-close" type="button" aria-label="Close image"><i class="bi bi-x-lg"></i></button><img alt="">';
  document.body.appendChild(lightbox);
  const lightboxImage = lightbox.querySelector('img');
  const closeLightbox = () => { lightbox.classList.remove('is-open'); document.body.classList.remove('lightbox-open'); };
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLightbox(); });
  zoomImages.forEach((image) => {
    image.classList.add('zoomable-image');
    image.setAttribute('tabindex', '0');
    image.setAttribute('role', 'button');
    const openLightbox = () => { lightboxImage.src = image.src; lightboxImage.alt = image.alt; lightbox.classList.add('is-open'); document.body.classList.add('lightbox-open'); };
    image.addEventListener('click', openLightbox);
    image.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openLightbox(); } });
  });
}
document.querySelectorAll('.project-row').forEach((row, index) => {
  const status = document.createElement('span');
  status.className = `project-status ${index === 0 ? 'status-completed' : 'status-progress'}`;
  status.textContent = index === 0 ? 'Completed' : 'In progress';
  row.querySelector('.project-meta')?.appendChild(status);
});
document.querySelectorAll('.year').forEach((element) => { element.textContent = new Date().getFullYear(); });
