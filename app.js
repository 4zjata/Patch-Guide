// Vanced Portal - Frontend Logic

document.addEventListener('DOMContentLoaded', () => {
  // --- STATE ---
  let selectedAppKey = null;
  let currentArch = 'arm64'; // Default fallback, as >98% of modern Androids are ARM64

  // --- DOM ELEMENTS ---
  const heroBtn = document.getElementById('hero-download-btn');
  const appSelectionSection = document.getElementById('app-selection');
  const appCards = document.querySelectorAll('.app-card');
  const wizardSection = document.getElementById('wizard-section');

  // Wizard Rendering Elements
  const wizardAppIcon = document.getElementById('wizard-app-icon');
  const wizardAppTitle = document.getElementById('wizard-app-title');
  const stepsContainer = document.getElementById('steps-container');

  // --- INITIALIZATION ---
  initTranslations();
  initWordRotator();
  initCardLighting();
  detectDeviceArchitecture();
  initAccordion();

  // --- EVENTS ---

  // Hero button scroll
  if (heroBtn) {
    heroBtn.addEventListener('click', (e) => {
      e.preventDefault();
      appSelectionSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // App Card selection
  appCards.forEach(card => {
    card.addEventListener('click', () => {
      const appKey = card.getAttribute('data-app');
      openWizard(appKey);
    });
  });

  // Intercept and force download behavior directly inside current tab
  document.addEventListener('click', (e) => {
    const downloadBtn = e.target.closest('#gmscore-download-link, #app-download-link');
    if (downloadBtn) {
      e.preventDefault();
      const downloadUrl = downloadBtn.getAttribute('href');
      if (downloadUrl) {
        window.location.href = downloadUrl;
      }
    }
  });

  // --- FUNCTIONS ---

  // Initialize UI texts based on translations config
  function initTranslations() {
    // Page Title
    document.title = TRANSLATIONS.ui.title;

    // Hero Section
    const taglineNode = document.getElementById('tagline-start');
    if (taglineNode) taglineNode.textContent = TRANSLATIONS.ui.tagline;
    if (heroBtn) heroBtn.textContent = TRANSLATIONS.ui.downloadNowBtn;

    // App Choice Header
    const chooseTitleNode = document.getElementById('choose-title');
    const chooseSubNode = document.getElementById('choose-sub');
    if (chooseTitleNode) chooseTitleNode.textContent = TRANSLATIONS.ui.chooseAppHeader;
    if (chooseSubNode) chooseSubNode.textContent = TRANSLATIONS.ui.chooseAppSub;

    // Populate App Card contents
    appCards.forEach(card => {
      const appKey = card.getAttribute('data-app');
      const appData = TRANSLATIONS.apps[appKey];
      if (appData) {
        const titleNode = card.querySelector('.app-card-title');
        const descNode = card.querySelector('.app-card-desc');
        if (titleNode) titleNode.textContent = appData.name;
        if (descNode) descNode.textContent = appData.description;

        // Brand color hover variables
        card.style.setProperty('--brand-color', `var(--${appKey.replace('_', '-')}-color)`);
        card.style.setProperty('--brand-glow', `rgba(${appKey === 'youtube' ? '239, 68, 68' : appKey === 'youtube_music' ? '244, 63, 94' : appKey === 'tiktok' ? '0, 242, 254' : '236, 72, 153'}, 0.3)`);
      }
    });

    // Populate Tips Accordion
    const tipsTitle = document.getElementById('tips-title');
    const tipsSub = document.getElementById('tips-sub');
    const accordionContainer = document.getElementById('tips-accordion');

    if (tipsTitle) tipsTitle.textContent = TRANSLATIONS.ui.generalTipsTitle;
    if (tipsSub) tipsSub.textContent = TRANSLATIONS.ui.generalTipsSub;

    if (accordionContainer) {
      accordionContainer.innerHTML = TRANSLATIONS.ui.tips.map((tip, idx) => `
        <div class="accordion-item" data-index="${idx}">
          <div class="accordion-header">
            <span>${tip.title}</span>
            <svg class="accordion-icon" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"/></svg>
          </div>
          <div class="accordion-content">
            <div class="accordion-content-inner">${tip.text}</div>
          </div>
        </div>
      `).join('');
    }

    // Footer
    const footerTextNode = document.getElementById('footer-text');
    if (footerTextNode) footerTextNode.textContent = TRANSLATIONS.ui.footerText;
  }

  // Hero section revolving words animation
  function initWordRotator() {
    const rotatorSpan = document.getElementById('rotator-word');
    if (!rotatorSpan) return;

    const words = TRANSLATIONS.ui.wordsToRotate;
    let wordIndex = 0;

    // Display first word
    rotatorSpan.textContent = words[0];
    rotatorSpan.classList.add('active');

    setInterval(() => {
      // Start transition out
      rotatorSpan.classList.remove('active');

      setTimeout(() => {
        // Change text and transition in
        wordIndex = (wordIndex + 1) % words.length;
        rotatorSpan.textContent = words[wordIndex];
        rotatorSpan.classList.add('active');
      }, 400); // Must match CSS transition duration
    }, 3000);
  }

  // Card Lighting / Reflection effect on mousemove
  function initCardLighting() {
    const cards = document.querySelectorAll('.app-card, .wizard-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  // Device CPU architecture detection (runs silently in background)
  async function detectDeviceArchitecture() {
    let detected = 'arm64'; // Default safe fallback

    // Method 1: Modern User-Agent Client Hints API (Chromium browsers)
    if (navigator.userAgentData && typeof navigator.userAgentData.getHighEntropyValues === 'function') {
      try {
        const hints = await navigator.userAgentData.getHighEntropyValues(['architecture', 'bitness']);
        const arch = (hints.architecture || '').toLowerCase();
        const bits = (hints.bitness || '').toString();

        if (arch === 'arm' || arch === 'aarch64') {
          detected = bits === '64' ? 'arm64' : 'arm32';
        } else if (arch === 'x86') {
          detected = bits === '64' ? 'universal' : 'arm32';
        }
      } catch (err) {
        console.warn("Client Hints detection failed, falling back to User-Agent parser:", err);
        detected = detectViaUserAgent();
      }
    } else {
      // Method 2: Legacy User-Agent parsing
      detected = detectViaUserAgent();
    }

    currentArch = detected;
  }

  // Legacy parser helper
  function detectViaUserAgent() {
    const ua = navigator.userAgent.toLowerCase();
    const platform = (navigator.platform || '').toLowerCase();

    if (ua.includes('arm64') || ua.includes('aarch64') || platform.includes('arm64') || platform.includes('aarch64')) {
      return 'arm64';
    }
    if (ua.includes('armv7') || ua.includes('armeabi') || ua.includes('armv8l') || platform.includes('armv7') || platform.includes('arm')) {
      return 'arm32';
    }
    return 'arm64'; // default fallback for modern Androids
  }

  // Wizard Section Control
  function openWizard(appKey) {
    selectedAppKey = appKey;
    const appData = TRANSLATIONS.apps[appKey];
    if (!appData) return;

    // Copy main app icon
    const originCardIcon = document.querySelector(`.app-card[data-app="${appKey}"] .app-card-icon`);
    if (wizardAppIcon && originCardIcon) {
      wizardAppIcon.innerHTML = originCardIcon.outerHTML;
      // Force match styling
      const newIcon = wizardAppIcon.querySelector('svg');
      newIcon.style.fill = `var(--${appKey.replace('_', '-')}-color)`;
      newIcon.style.filter = `drop-shadow(0 0 10px var(--${appKey.replace('_', '-')}-color))`;
    }

    if (wizardAppTitle) {
      wizardAppTitle.textContent = appData.name;
    }

    // Build the steps dynamically
    renderWizardSteps();

    // Show wizard section with CSS transition
    wizardSection.classList.add('active');
    setTimeout(() => {
      wizardSection.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }

  // Render steps details dynamically inside the steps container
  function renderWizardSteps() {
    if (!selectedAppKey || !stepsContainer) return;
    const appData = TRANSLATIONS.apps[selectedAppKey];

    let html = '';

    appData.steps.forEach((step, index) => {
      let actionButtonsHtml = '';

      if (step.isGmsCoreStep) {
        // Step requires GmsCore download
        const standardLink = TRANSLATIONS.gmscore.downloads.standard;

        actionButtonsHtml = `
          <div class="step-actions">
            <a href="${standardLink}" id="gmscore-download-link" class="btn btn-primary" download>
              <svg style="width:1.25rem; height:1.25rem; fill:currentColor;" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/></svg>
              ${TRANSLATIONS.ui.downloadGmsCoreBtn}
            </a>
          </div>
        `;
      } else if (step.isAppDownloadStep) {
        // Step provides the patched app download
        // PREFERENCE: Prioritize Morphe -> ReVanced Extended -> ReVanced, using universal links where applicable
        const downloadUrl = resolveDownloadUrl(selectedAppKey, currentArch);

        actionButtonsHtml = `
          <div class="step-actions">
            <a href="${downloadUrl}" id="app-download-link" class="btn btn-primary" download>
              <svg style="width:1.25rem; height:1.25rem; fill:currentColor;" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/></svg>
              ${TRANSLATIONS.ui.downloadAppBtn}
            </a>
          </div>
        `;
      }

      // Render GmsCore Huawei warnings as first-class alert boxes
      let additionalInfoHtml = '';
      if (appData.requiresGmsCore && index === appData.steps.length - 1) {
        additionalInfoHtml = `
          <div class="alert-box" style="margin-top: 1.5rem;">
            <svg class="alert-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
            <div class="alert-content">
              <div class="alert-title">${TRANSLATIONS.ui.huaweiAlertTitle}</div>
              <div class="alert-text">${TRANSLATIONS.ui.huaweiAlertText}</div>
            </div>
          </div>
        `;
      }

      // Dynamic screenshot mockup slider or placeholder SVG
      const screenshots = Array.isArray(step.screenshots)
        ? step.screenshots
        : (step.screenshots ? [step.screenshots] : []);

      let mockupHtml = '';
      if (screenshots.length > 0) {
        mockupHtml = `
          <div class="mockup-slider" data-current-index="0">
            <div class="mockup-slides">
              ${screenshots.map(src => `
                <div class="mockup-slide">
                  <img src="${src}" alt="Screenshot" class="mockup-img" loading="lazy" />
                </div>
              `).join('')}
            </div>
            ${screenshots.length > 1 ? `
              <button class="slider-arrow slider-arrow-left" aria-label="Previous image">
                <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
              </button>
              <button class="slider-arrow slider-arrow-right" aria-label="Next image">
                <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
              </button>
              <div class="slider-dots">
                ${screenshots.map((_, i) => `
                  <span class="slider-dot ${i === 0 ? 'active' : ''}" data-slide-index="${i}"></span>
                `).join('')}
              </div>
            ` : ''}
          </div>
        `;
      } else {
        mockupHtml = `
          <div class="mockup-placeholder">
            <svg class="mockup-placeholder-icon" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0-2-.9-2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
            <div class="mockup-placeholder-text">${step.screenshotText || 'Installation Screen'}</div>
          </div>
        `;
      }

      html += `
        <div class="step-card fade-in" style="animation-delay: ${index * 0.1}s">
          <div class="step-badge-col">
            <div class="step-number-circle">${index + 1}</div>
          </div>
          <div class="step-content-col">
            <h3 class="step-title">${step.title}</h3>
            <p class="step-desc">${step.description}</p>
            ${actionButtonsHtml}
            ${additionalInfoHtml}
            
            <!-- Sleek Smartphone Bezel Mockup -->
            <div class="mockup-container">
              <div class="mockup-notch"></div>
              ${mockupHtml}
            </div>
          </div>
        </div>
      `;
    });

    stepsContainer.innerHTML = html;
    initCardLighting(); // Re-apply lighting coordinates to dynamically created elements
    initSliders(); // Initialize the dynamic screenshot carousels/sliders
  }

  // Initialize interactive sliders with touch support and pill dots
  function initSliders() {
    const sliders = document.querySelectorAll('.mockup-slider');
    sliders.forEach(slider => {
      const slidesContainer = slider.querySelector('.mockup-slides');
      const slides = slider.querySelectorAll('.mockup-slide');
      const dots = slider.querySelectorAll('.slider-dot');
      const arrowLeft = slider.querySelector('.slider-arrow-left');
      const arrowRight = slider.querySelector('.slider-arrow-right');
      
      let currentIndex = 0;
      const totalSlides = slides.length;
      
      function updateSlider(index) {
        currentIndex = (index + totalSlides) % totalSlides;
        
        // Horizontal slide translation
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots state
        dots.forEach((dot, idx) => {
          if (idx === currentIndex) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
        
        slider.setAttribute('data-current-index', currentIndex);
      }
      
      if (arrowLeft) {
        arrowLeft.addEventListener('click', (e) => {
          e.stopPropagation();
          updateSlider(currentIndex - 1);
        });
      }
      
      if (arrowRight) {
        arrowRight.addEventListener('click', (e) => {
          e.stopPropagation();
          updateSlider(currentIndex + 1);
        });
      }
      
      dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          const targetIndex = parseInt(dot.getAttribute('data-slide-index'), 10);
          updateSlider(targetIndex);
        });
      });
      
      // Swipe gestures for high-quality mobile UX
      let touchStartX = 0;
      let touchEndX = 0;
      
      slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      
      slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) { // 50px threshold
          if (diff > 0) {
            updateSlider(currentIndex + 1); // Swipe left -> Next
          } else {
            updateSlider(currentIndex - 1); // Swipe right -> Prev
          }
        }
      }, { passive: true });
    });
  }


  // FAQ Accordion Control
  function initAccordion() {
    const container = document.getElementById('tips-accordion');
    if (!container) return;

    container.addEventListener('click', (e) => {
      const header = e.target.closest('.accordion-header');
      if (!header) return;

      const item = header.closest('.accordion-item');
      const content = item.querySelector('.accordion-content');
      const inner = item.querySelector('.accordion-content-inner');

      const isActive = item.classList.contains('active');

      // Close other active accordions
      const activeItems = container.querySelectorAll('.accordion-item.active');
      activeItems.forEach(activeItem => {
        if (activeItem !== item) {
          activeItem.classList.remove('active');
          activeItem.querySelector('.accordion-content').style.maxHeight = null;
        }
      });

      // Toggle current accordion
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = `${inner.scrollHeight}px`;
      }
    });
  }

  // Resolve download URLs prioritizing Morphe -> ReVanced Extended -> ReVanced
  function resolveDownloadUrl(appKey, arch) {
    const baseReleaseUrl = 'https://github.com/FiorenMas/Revanced-And-Revanced-Extended-Non-Root/releases/download/all/';

    // 1. YouTube
    if (appKey === 'youtube') {
      const variants = ['morphe', 'revanced-extended', 'revanced'];
      for (const variant of variants) {
        if (arch === 'universal') {
          return `${baseReleaseUrl}youtube-${variant}.apk`;
        } else if (arch === 'arm64') {
          return `${baseReleaseUrl}youtube-arm64-v8a-${variant}.apk`;
        } else if (arch === 'arm32') {
          return `${baseReleaseUrl}youtube-armeabi-v7a-${variant}.apk`;
        }
      }
    }

    // 2. YouTube Music
    if (appKey === 'youtube_music') {
      const variants = ['morphe', 'revanced-extended', 'revanced'];
      for (const variant of variants) {
        // No universal/archless file exists for music, so map universal & arm64 to arm64
        if (arch === 'universal' || arch === 'arm64') {
          return `${baseReleaseUrl}youtube-music-arm64-v8a-${variant}.apk`;
        } else if (arch === 'arm32') {
          return `${baseReleaseUrl}youtube-music-armeabi-v7a-${variant}.apk`;
        }
      }
    }

    // 3. Fallback for other apps (TikTok, Instagram, etc.)
    const appData = TRANSLATIONS.apps[appKey];
    if (appData && appData.downloads) {
      return appData.downloads.universal || appData.downloads[arch] || appData.downloads.arm64;
    }

    return '';
  }
});
