/**
 * TERREIN PITCH GROUP — 5-Year Vision (2026–2031)
 * Interactive Ink Reveal & Architectural Mechanics
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Audio Synthesizer (Zero-dependency Web Audio API for subtle tactile feedback)
  const audioContext = {
    ctx: null,
    enabled: false,
    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
    },
    playClick() {
      if (!this.enabled || !this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    },
    playSwoosh() {
      if (!this.enabled || !this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const bufferSize = this.ctx.sampleRate * 0.12;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(200, this.ctx.currentTime + 0.12);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
    }
  };

  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      audioContext.init();
      audioContext.enabled = !audioContext.enabled;
      if (audioContext.enabled) {
        soundToggleBtn.classList.add('border-emerald-500', 'text-emerald-400');
        soundToggleBtn.classList.remove('border-white/10', 'text-white/60');
        soundIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z"/>`;
        audioContext.playClick();
      } else {
        soundToggleBtn.classList.remove('border-emerald-500', 'text-emerald-400');
        soundToggleBtn.classList.add('border-white/10', 'text-white/60');
        soundIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" stroke="currentColor"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" stroke="currentColor"/>`;
      }
    });
  }

  // 2. Custom Interactive Cursor
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  if (cursorDot && cursorRing && window.innerWidth > 768) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    const renderCursor = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    // Interactive element hover states
    const interactiveElements = document.querySelectorAll('a, button, input, select, .interactive-hover');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        audioContext.playClick();
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  // 3. Hero Section: Organic Canvas Ink-Mask Reveal
  const heroCanvas = document.getElementById('heroInkCanvas');
  const heroContainer = document.getElementById('heroContainer');
  const coordinateDisplay = document.getElementById('coordinateDisplay');
  const luxDisplay = document.getElementById('luxDisplay');

  if (heroCanvas && heroContainer) {
    const ctx = heroCanvas.getContext('2d');
    let width = (heroCanvas.width = heroContainer.offsetWidth);
    let height = (heroCanvas.height = heroContainer.offsetHeight);

    const resizeHero = () => {
      width = heroCanvas.width = heroContainer.offsetWidth;
      height = heroCanvas.height = heroContainer.offsetHeight;
      drawInitialMask();
    };
    window.addEventListener('resize', resizeHero);

    // Initial mask layer: solid deep black/obsidian blueprint paper
    const drawInitialMask = () => {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#070808';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid lines on the mask
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Pre-carve a luminous oval at the center
      const centerX = width * 0.5;
      const centerY = height * 0.55;
      bleedInkHole(centerX, centerY, Math.min(width, height) * 0.28);
    };

    // Organic bleed function that punches through the canvas to reveal the underlying stadium
    const bleedInkHole = (x, y, radius) => {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';

      const gradient = ctx.createRadialGradient(x, y, radius * 0.1, x, y, radius);
      gradient.addColorStop(0, 'rgba(0,0,0,1)');
      gradient.addColorStop(0.7, 'rgba(0,0,0,0.85)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Splatter mini droplets around radius
      const droplets = 12;
      for (let i = 0; i < droplets; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = radius * (0.8 + Math.random() * 0.4);
        const dropX = x + Math.cos(angle) * dist;
        const dropY = y + Math.sin(angle) * dist;
        const dropRadius = Math.random() * (radius * 0.15) + 4;

        const dropGrad = ctx.createRadialGradient(dropX, dropY, 0, dropX, dropY, dropRadius);
        dropGrad.addColorStop(0, 'rgba(0,0,0,0.8)');
        dropGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = dropGrad;
        ctx.beginPath();
        ctx.arc(dropX, dropY, dropRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    drawInitialMask();

    // Mouse Move across the hero reveals more ink
    let isMouseOverHero = false;
    heroContainer.addEventListener('mouseenter', () => (isMouseOverHero = true));
    heroContainer.addEventListener('mouseleave', () => (isMouseOverHero = false));

    heroContainer.addEventListener('mousemove', (e) => {
      const rect = heroContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update coordinates readout
      if (coordinateDisplay) {
        const lat = (7.1234 + (y / height) * 0.05).toFixed(4);
        const long = (112.7891 + (x / width) * 0.05).toFixed(4);
        coordinateDisplay.textContent = `COORD: ${lat}° N, ${long}° E`;
      }

      // Update Lux level readout
      if (luxDisplay) {
        const distFromCenter = Math.hypot(x - width / 2, y - height / 2);
        const maxDist = Math.hypot(width / 2, height / 2);
        const lux = Math.round(620 - (distFromCenter / maxDist) * 220);
        luxDisplay.textContent = `ILLUM: ${Math.max(380, lux)} LUX (6500K LED)`;
      }

      // Bleed mask
      bleedInkHole(x, y, 75);
    });

    // Touch support for mobile devices
    heroContainer.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = heroContainer.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        bleedInkHole(x, y, 60);
      }
    }, { passive: true });

    // "Reveal Full Canvas" and "Reset Mask" buttons
    const revealAllBtn = document.getElementById('revealAllHeroBtn');
    const resetMaskBtn = document.getElementById('resetHeroMaskBtn');

    if (revealAllBtn) {
      revealAllBtn.addEventListener('click', () => {
        audioContext.playSwoosh();
        let currentR = 50;
        const maxR = Math.hypot(width, height);
        const anim = () => {
          currentR += 45;
          bleedInkHole(width / 2, height / 2, currentR);
          if (currentR < maxR) {
            requestAnimationFrame(anim);
          }
        };
        requestAnimationFrame(anim);
      });
    }

    if (resetMaskBtn) {
      resetMaskBtn.addEventListener('click', () => {
        audioContext.playClick();
        drawInitialMask();
      });
    }
  }

  // 4. Interactive Arenas Showcase: Tab Switching & Interactive Blueprint Slider
  const arenaData = {
    futsal: {
      title: 'Indoor Futsal Arena',
      subtitle: 'FIFA-Grade 40m × 20m Court with Acoustic Dampening',
      description: 'Engineered for high-intensity 5-a-side play. Incorporates resilient shockpad subflooring, acoustic ceiling baffle arrays reducing court reverberation by 65%, and glare-free 500-lux vertical LED arrays.',
      specs: [
        { label: 'Pitch Dimensions', val: '40m × 20m (FIFA Certified)' },
        { label: 'Surface System', val: 'Monofilament 50mm + EPDM Infill' },
        { label: 'Lighting Rig', val: '600 Lux Luminaire (Glare Index < 19)' },
        { label: 'Acoustic Control', val: 'Suspended Mineral-Fibre Baffles' },
        { label: 'Climate Delivery', val: 'Dual-Zone Air Handling (22°C Regulated)' },
        { label: 'Player Capacity', val: '10 on-pitch + 8 bench + 60 spectators' }
      ],
      blueprintImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1400&q=80',
      realPhoto: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1400&q=80'
    },
    miniSoccer: {
      title: 'Mini Soccer & Full Football Pitch',
      subtitle: '7-a-Side & Regulation 11-a-Side Hybrid Turf Complex',
      description: 'Built upon a sub-base cellular drainage core capable of absorbing 150mm of torrential rain per hour. Includes dual covered tactical dugouts, high-impact ball-stop netting, and an integrated 4K auto-tracking camera system.',
      specs: [
        { label: 'Pitch Dimensions', val: '65m × 42m (Mini) / 105m × 68m (Phase 4)' },
        { label: 'Drainage Matrix', val: 'Subterranean Perforated Grid (150mm/hr)' },
        { label: 'Turf Classification', val: 'FIFA Quality Pro 60mm Hybrid System' },
        { label: 'Broadcast Rig', val: 'AI-Guided 4K Mast Cam (Auto-Highlights)' },
        { label: 'Spectator Gallery', val: '250-Seat Cantilevered Shaded Stand' },
        { label: 'Boundary System', val: '8m Anti-Sag Polypropylene Netting' }
      ],
      blueprintImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1400&q=80',
      realPhoto: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1400&q=80'
    },
    clubhouse: {
      title: 'Clubhouse & Recovery Amenities',
      subtitle: 'Third-Place Athlete Lounge, Cold Plunge & Recovery Cafe',
      description: 'More than a sideline; a premier sports community hub. Features temperature-controlled ice baths, dry lockers, high-pressure rain showers, specialty coffee bar, and an elevated glass mezzanine viewing deck.',
      specs: [
        { label: 'Footprint', val: '650 sqm Multi-Level Pavilion' },
        { label: 'Recovery Suite', val: 'Twin 8°C Cryo Plunges & Foam Roller Zone' },
        { label: 'Hospitality', val: 'Espresso Bar, Protein Station, Wi-Fi Workspaces' },
        { label: 'Locker Infrastructure', val: '4 Team Changing Rooms + 48 Keycard Lockers' },
        { label: 'Mobility & Access', val: '30 Vehicle Bays + 4 High-Speed EV Chargers' },
        { label: 'Mezzanine Lounge', val: 'Panoramic 180° Elevated Pitch View' }
      ],
      blueprintImage: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1400&q=80',
      realPhoto: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80'
    }
  };

  const arenaTabs = document.querySelectorAll('.arena-tab-btn');
  const arenaTitle = document.getElementById('arenaTitle');
  const arenaSubtitle = document.getElementById('arenaSubtitle');
  const arenaDescription = document.getElementById('arenaDescription');
  const arenaSpecsList = document.getElementById('arenaSpecsList');
  const sliderRealImg = document.getElementById('sliderRealImg');
  const sliderBlueprintImg = document.getElementById('sliderBlueprintImg');
  const arenaSlider = document.getElementById('arenaSlider');
  const sliderHandle = document.getElementById('sliderHandle');
  const sliderBlueprintWrap = document.getElementById('sliderBlueprintWrap');

  const updateArenaView = (key) => {
    const data = arenaData[key];
    if (!data) return;

    audioContext.playClick();

    // Tab buttons state
    arenaTabs.forEach((tab) => {
      const isCurrent = tab.dataset.arena === key;
      tab.classList.toggle('border-emerald-400', isCurrent);
      tab.classList.toggle('text-white', isCurrent);
      tab.classList.toggle('bg-emerald-500/10', isCurrent);
      tab.classList.toggle('border-white/10', !isCurrent);
      tab.classList.toggle('text-white/60', !isCurrent);
      tab.classList.toggle('bg-white/[0.02]', !isCurrent);
    });

    // Content fade update
    if (arenaTitle) arenaTitle.textContent = data.title;
    if (arenaSubtitle) arenaSubtitle.textContent = data.subtitle;
    if (arenaDescription) arenaDescription.textContent = data.description;

    if (arenaSpecsList) {
      arenaSpecsList.innerHTML = data.specs
        .map(
          (spec) => `
          <div class="flex flex-col p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:border-emerald-500/30 transition-colors">
            <span class="text-xs uppercase font-mono-spec text-white/40 mb-1">${spec.label}</span>
            <span class="text-sm font-semibold text-white/90">${spec.val}</span>
          </div>
        `
        )
        .join('');
    }

    if (sliderRealImg) sliderRealImg.src = data.realPhoto;
    if (sliderBlueprintImg) sliderBlueprintImg.src = data.blueprintImage;
  };

  arenaTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      updateArenaView(tab.dataset.arena);
    });
  });

  // Slider Drag / Hover interaction
  if (arenaSlider && sliderHandle && sliderBlueprintWrap) {
    let isDragging = false;

    const setSliderPosition = (percentage) => {
      const clamped = Math.max(0, Math.min(100, percentage));
      sliderHandle.style.left = `${clamped}%`;
      sliderBlueprintWrap.style.width = `${clamped}%`;
    };

    const handleMove = (clientX) => {
      const rect = arenaSlider.getBoundingClientRect();
      const offset = clientX - rect.left;
      const pct = (offset / rect.width) * 100;
      setSliderPosition(pct);
    };

    arenaSlider.addEventListener('mousedown', (e) => {
      isDragging = true;
      handleMove(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    });

    // Touch support for slider
    arenaSlider.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        isDragging = true;
        handleMove(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length === 0) return;
      handleMove(e.touches[0].clientX);
    }, { passive: true });

    // Hover mode when not dragging
    arenaSlider.addEventListener('mousemove', (e) => {
      if (!isDragging) {
        handleMove(e.clientX);
      }
    });
  }

  // 5. 5-Year Development Roadmap (2026–2031) Interactive Explorer
  const roadmapData = {
    phase1: {
      number: 'PHASE 01',
      years: '2026 – 2027',
      title: 'Land Acquisition, Feasibility & Architectural Blueprint',
      summary: 'Securing strategic urban-fringe land parcels with high community density, executing environmental soil permeability tests, and drafting sustainable stadium blueprints.',
      deliverables: [
        'Zoning permits & 30-year long-term lease covenants secured',
        'Topographic surveying & geotechnical subsurface drainage tests',
        'Architectural design with low-carbon timber composite pavilions',
        'Early community and local amateur club survey (1,200+ respondents)'
      ],
      readiness: '85%',
      targetSqm: '14,000 sqm',
      budgetAllocation: '22% Capital Base'
    },
    phase2: {
      number: 'PHASE 02',
      years: '2028',
      title: 'Flagship Construction: Indoor Futsal & Mini Soccer Arena',
      summary: 'Physical groundbreaking of the initial sports complex, housing two premier indoor futsal courts, two 7-a-side mini soccer pitches, and the main clubhouse.',
      deliverables: [
        'Installation of FIFA Quality Pro monofilament synthetic turf',
        'Civil works: heavy sub-base gravel matrix & storm retention vault',
        'Erection of acoustic ceiling baffles & 6500K glare-free LED masts',
        'Clubhouse shell construction: locker suites and recovery cafe'
      ],
      readiness: '60%',
      targetSqm: '24,000 sqm',
      budgetAllocation: '40% Capital Base'
    },
    phase3: {
      number: 'PHASE 03',
      years: '2029',
      title: 'Commercial Launch, Smart Digital Booking & Inaugural League',
      summary: 'Commercial doors open with automated mobile access control, live streaming integrations, and our signature municipal Corporate & Community Championship.',
      deliverables: [
        'Rollout of frictionless self-service gate access & split billing app',
        'Onboarding 40+ corporate partners and 12 local football clubs',
        'Installation of AI highlight cameras for player match clips',
        'Launch of the Terrein Inaugural Invitational Cup'
      ],
      readiness: '35%',
      targetSqm: '28,000 sqm',
      budgetAllocation: '18% Capital Base'
    },
    phase4: {
      number: 'PHASE 04',
      years: '2030 – 2031',
      title: 'Regulation Pitch Expansion & Youth Academy Integration',
      summary: 'Full maturation of the 5-year vision: expanding to a full-size 11-a-side regulation stadium, regional youth developmental academy, and franchise venue network.',
      deliverables: [
        'Full 105m × 68m FIFA-standard pitch with 1,500-seat grandstand',
        'Accredited Terrein Youth Academy with UEFA-certified coaching staff',
        'Expansion into 2 satellite secondary locations across the province',
        'Integration of rooftop solar arrays targeting net-zero matchday energy'
      ],
      readiness: '15%',
      targetSqm: '50,000+ sqm',
      budgetAllocation: '20% Capital Base'
    }
  };

  const phaseCards = document.querySelectorAll('.phase-selector-btn');
  const phaseNumberEl = document.getElementById('phaseNumberDisplay');
  const phaseYearsEl = document.getElementById('phaseYearsDisplay');
  const phaseTitleEl = document.getElementById('phaseTitleDisplay');
  const phaseSummaryEl = document.getElementById('phaseSummaryDisplay');
  const phaseDeliverablesEl = document.getElementById('phaseDeliverablesList');
  const phaseReadinessEl = document.getElementById('phaseReadinessDisplay');
  const phaseReadinessBarEl = document.getElementById('phaseReadinessBar');
  const phaseSqmEl = document.getElementById('phaseSqmDisplay');
  const phaseBudgetEl = document.getElementById('phaseBudgetDisplay');

  const updatePhaseView = (phaseKey) => {
    const data = roadmapData[phaseKey];
    if (!data) return;

    audioContext.playClick();

    phaseCards.forEach((btn) => {
      const isCurrent = btn.dataset.phase === phaseKey;
      btn.classList.toggle('phase-step-active', isCurrent);
      btn.classList.toggle('border-emerald-500', isCurrent);
      btn.classList.toggle('border-white/10', !isCurrent);
    });

    if (phaseNumberEl) phaseNumberEl.textContent = data.number;
    if (phaseYearsEl) phaseYearsEl.textContent = data.years;
    if (phaseTitleEl) phaseTitleEl.textContent = data.title;
    if (phaseSummaryEl) phaseSummaryEl.textContent = data.summary;
    if (phaseReadinessEl) phaseReadinessEl.textContent = data.readiness;
    if (phaseReadinessBarEl) phaseReadinessBarEl.style.width = data.readiness;
    if (phaseSqmEl) phaseSqmEl.textContent = data.targetSqm;
    if (phaseBudgetEl) phaseBudgetEl.textContent = data.budgetAllocation;

    if (phaseDeliverablesEl) {
      phaseDeliverablesEl.innerHTML = data.deliverables
        .map(
          (item) => `
          <li class="flex items-start gap-3 text-sm text-white/80">
            <span class="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>${item}</span>
          </li>
        `
        )
        .join('');
    }
  };

  phaseCards.forEach((btn) => {
    btn.addEventListener('click', () => {
      updatePhaseView(btn.dataset.phase);
    });
  });

  // 6. Interactive Rental & Partnership Calculator
  const calcHoursInput = document.getElementById('calcHours');
  const calcHoursVal = document.getElementById('calcHoursVal');
  const calcPitchSelect = document.getElementById('calcPitch');
  const calcTierSelect = document.getElementById('calcTier');
  const calcEstimatedCost = document.getElementById('calcEstimatedCost');
  const calcAnnualSlots = document.getElementById('calcAnnualSlots');
  const calcPerkBadge = document.getElementById('calcPerkBadge');

  const rates = {
    futsal: 45, // $45/hr base
    mini: 75,   // $75/hr base
    full: 140   // $140/hr base
  };

  const tierMultipliers = {
    standard: 1.0,
    club: 0.85,    // 15% recurring discount
    corporate: 1.25 // includes VIP lounge + catering services
  };

  const updateCalculator = () => {
    if (!calcHoursInput) return;
    const hours = parseInt(calcHoursInput.value, 10);
    const pitch = calcPitchSelect.value;
    const tier = calcTierSelect.value;

    calcHoursVal.textContent = `${hours} hrs / week`;

    const baseRate = rates[pitch] || 50;
    const mult = tierMultipliers[tier] || 1.0;
    const weeklyTotal = Math.round(hours * baseRate * mult);
    const annualWeeks = 48; // active season weeks
    const annualHours = hours * annualWeeks;

    if (calcEstimatedCost) {
      calcEstimatedCost.textContent = `$${weeklyTotal.toLocaleString()} / wk`;
    }
    if (calcAnnualSlots) {
      calcAnnualSlots.textContent = `${annualHours} hrs / year guaranteed`;
    }

    if (calcPerkBadge) {
      if (tier === 'corporate') {
        calcPerkBadge.textContent = 'Includes Private Mezzanine & Beverage Service';
      } else if (tier === 'club') {
        calcPerkBadge.textContent = 'Priority Recurring Slot + Free Equipment Locker';
      } else {
        calcPerkBadge.textContent = 'Digital App Access + Match Recording Included';
      }
    }
  };

  if (calcHoursInput) {
    calcHoursInput.addEventListener('input', updateCalculator);
    calcPitchSelect.addEventListener('change', updateCalculator);
    calcTierSelect.addEventListener('change', updateCalculator);
    updateCalculator();
  }

  // 7. Partner / Investor Inquiry Modal
  const modal = document.getElementById('partnerModal');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalForm = document.getElementById('partnerInquiryForm');
  const formSuccessNotice = document.getElementById('formSuccessNotice');
  const interestSelect = document.getElementById('interestType');

  const openModal = (interestType = 'investor') => {
    if (!modal) return;
    audioContext.playClick();
    if (interestSelect && interestType) {
      interestSelect.value = interestType;
    }
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.add('opacity-100');
    }, 10);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modal) return;
    audioContext.playClick();
    modal.classList.remove('opacity-100');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
      if (formSuccessNotice) formSuccessNotice.classList.add('hidden');
      if (modalForm) {
        modalForm.classList.remove('hidden');
        modalForm.reset();
      }
    }, 250);
  };

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const interest = btn.dataset.interest || 'investor';
      openModal(interest);
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      audioContext.playSwoosh();
      const submitBtn = modalForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Transmitting Dossier...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        modalForm.classList.add('hidden');
        if (formSuccessNotice) {
          formSuccessNotice.classList.remove('hidden');
        }
      }, 900);
    });
  }

  // 8. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (trigger && answer) {
      trigger.addEventListener('click', () => {
        audioContext.playClick();
        const isOpen = !answer.classList.contains('hidden');

        // Close other items
        faqItems.forEach((other) => {
          if (other !== item) {
            const otherAns = other.querySelector('.faq-answer');
            const otherIcon = other.querySelector('.faq-icon');
            if (otherAns) otherAns.classList.add('hidden');
            if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
          }
        });

        if (isOpen) {
          answer.classList.add('hidden');
          if (icon) icon.style.transform = 'rotate(0deg)';
        } else {
          answer.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });

  // 9. Intersection Observer for Scroll Reveals
  const revealElements = document.querySelectorAll('.ink-reveal-init');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ink-reveal-active');
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => observer.observe(el));

  // 10. Mobile Menu Navigation
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      audioContext.playClick();
      const isExpanded = mobileNavDrawer.classList.toggle('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.add('hidden');
      });
    });
  }

  // 11. Initial default views
  updateArenaView('futsal');
  updatePhaseView('phase1');
});

