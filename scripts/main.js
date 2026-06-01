const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbwdVWAzgHf5WKfGZeq424hoAflLc3XMUHSi_-_3UOHIndxLY5ooHlCCODaw_D5y56O9iw/exec";
const GA4_ID = "G-3TFKER5ZGK";
const CLARITY_ID = "wwf25gobgk";

function loadScript(src, id) {
  if (id && document.getElementById(id)) return;
  const script = document.createElement("script");
  script.async = true;
  if (id) script.id = id;
  script.src = src;
  document.head.appendChild(script);
}

function loadStylesheet(href, id) {
  if (id && document.getElementById(id)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  if (id) link.id = id;
  document.head.appendChild(link);
}

function initAnalytics() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`, "zr-ga4");
  window.gtag("js", new Date());
  window.gtag("config", GA4_ID);

  window.clarity = window.clarity || function clarity(){ (window.clarity.q = window.clarity.q || []).push(arguments); };
  loadScript(`https://www.clarity.ms/tag/${CLARITY_ID}`, "zr-clarity");
}

function trackEvent(eventName, params = {}) {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function cloneMarqueeTrack() {
  const marquee = document.querySelector(".marquee-track");
  if (!marquee || marquee.dataset.cloned === "true") return;
  const clone = marquee.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  marquee.parentElement.appendChild(clone);
  marquee.dataset.cloned = "true";
}

function initParticles() {
  const canvas = document.getElementById("heroParticles");
  if (!canvas || prefersReducedMotion()) return;

  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  const particles = Array.from({ length: 44 }, () => ({
    x: 0,
    y: 0,
    radius: Math.random() * 1.4 + 0.5,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    opacity: Math.random() * 0.34 + 0.1
  }));

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = Math.max(window.innerHeight, document.getElementById("inicio")?.offsetHeight || window.innerHeight);
    particles.forEach(particle => {
      if (!particle.x && !particle.y) {
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
      }
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(181,139,52,${particle.opacity})`;
      ctx.fill();
    });

    window.requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  draw();
}

function initLivingBackground() {
  const canvas = document.getElementById("livingCanvas");
  if (!canvas || prefersReducedMotion()) return;

  const ctx = canvas.getContext("2d");
  const state = {
    w: 0,
    h: 0,
    dpr: 1,
    progress: 0,
    scroll: 0,
    velocity: 0,
    lastScroll: window.scrollY,
    mode: "territory",
    intensity: 0.34,
    density: 0.72,
    connection: 112,
    mouse: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5, sx: window.innerWidth * 0.5, sy: window.innerHeight * 0.5, active: false }
  };

  const presets = {
    territory: { intensity: 0.34, density: 0.68, connection: 108, hue: [181, 139, 52] },
    analysis: { intensity: 0.48, density: 0.82, connection: 132, hue: [214, 181, 107] },
    architecture: { intensity: 0.62, density: 0.94, connection: 156, hue: [181, 139, 52] },
    network: { intensity: 0.72, density: 1.02, connection: 148, hue: [135, 126, 112] },
    convergence: { intensity: 0.78, density: 0.92, connection: 176, hue: [214, 181, 107] }
  };

  let particles = [];
  let maxParticles = 0;

  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

  function hashNoise(x, y, t) {
    const value = Math.sin(x * 12.9898 + y * 78.233 + t * 0.00008) * 43758.5453;
    return value - Math.floor(value);
  }

  function resize() {
    state.w = window.innerWidth;
    state.h = window.innerHeight;
    state.dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    canvas.width = Math.floor(state.w * state.dpr);
    canvas.height = Math.floor(state.h * state.dpr);
    canvas.style.width = `${state.w}px`;
    canvas.style.height = `${state.h}px`;
    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

    const mobile = state.w < 760;
    maxParticles = mobile ? 68 : 118;
    particles = Array.from({ length: maxParticles }, (_, index) => createParticle(index));
  }

  function createParticle(index) {
    const depth = Math.random();
    return {
      x: Math.random() * state.w,
      y: Math.random() * state.h,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      radius: 0.55 + Math.random() * 1.45,
      depth,
      phase: Math.random() * Math.PI * 2,
      life: 0.28 + Math.random() * 0.58,
      band: index % 5
    };
  }

  function getMode() {
    const y = window.scrollY + state.h * 0.52;
    const map = [
      ["diagnostico", "convergence"],
      ["estrutura", "network"],
      ["solucoes", "network"],
      ["metodo", "architecture"],
      ["quando", "analysis"],
      ["inicio", "territory"]
    ];

    for (const [id, mode] of map) {
      const section = document.getElementById(id);
      if (!section) continue;
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (y >= top && y < bottom) return mode;
    }

    return "territory";
  }

  function updateState() {
    const docHeight = Math.max(1, document.documentElement.scrollHeight - state.h);
    state.progress = clamp(window.scrollY / docHeight, 0, 1);
    state.velocity = lerp(state.velocity, window.scrollY - state.lastScroll, 0.1);
    state.lastScroll = window.scrollY;
    state.mode = getMode();

    const preset = presets[state.mode];
    state.intensity = lerp(state.intensity, preset.intensity, 0.035);
    state.density = lerp(state.density, preset.density, 0.035);
    state.connection = lerp(state.connection, preset.connection, 0.035);
    state.mouse.sx = lerp(state.mouse.sx, state.mouse.x, 0.08);
    state.mouse.sy = lerp(state.mouse.sy, state.mouse.y, 0.08);
  }

  function drawAtmosphere() {
    const preset = presets[state.mode];
    const [r, g, b] = preset.hue;
    const gradient = ctx.createRadialGradient(
      state.w * (0.18 + state.progress * 0.28),
      state.h * 0.18,
      0,
      state.w * 0.5,
      state.h * 0.5,
      Math.max(state.w, state.h) * 0.95
    );

    gradient.addColorStop(0, `rgba(${r},${g},${b},${0.035 + state.intensity * 0.03})`);
    gradient.addColorStop(0.46, "rgba(255,255,255,0.02)");
    gradient.addColorStop(1, "rgba(244,241,235,0.08)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, state.w, state.h);
  }

  function drawArchitectureLines(time) {
    const shouldDraw = state.mode === "architecture" || state.mode === "network" || state.mode === "convergence";
    if (!shouldDraw) return;

    const gap = state.w < 760 ? 86 : 112;
    const offset = (time * 0.008 + state.progress * 170) % gap;
    const alpha = state.mode === "architecture" ? 0.085 : 0.052;

    ctx.strokeStyle = `rgba(181,139,52,${alpha})`;
    ctx.lineWidth = 1;

    for (let x = -gap; x < state.w + gap; x += gap) {
      ctx.beginPath();
      ctx.moveTo(x + offset, -20);
      ctx.lineTo(x - offset * 0.28, state.h + 20);
      ctx.stroke();
    }

    for (let y = -gap; y < state.h + gap; y += gap) {
      ctx.beginPath();
      ctx.moveTo(-20, y - offset);
      ctx.lineTo(state.w + 20, y + offset * 0.22);
      ctx.stroke();
    }
  }

  function draw(time = 0) {
    updateState();
    ctx.clearRect(0, 0, state.w, state.h);
    drawAtmosphere();
    drawArchitectureLines(time);

    const preset = presets[state.mode];
    const [r, g, b] = preset.hue;
    const mouseRadius = 150 + state.intensity * 90;
    const scrollPush = clamp(Math.abs(state.velocity) * 0.002, 0, 0.72);

    particles.forEach(particle => {
      let angle = hashNoise(particle.x * 0.004, particle.y * 0.004, time + particle.phase) * Math.PI * 2;
      angle += Math.sin(time * 0.00024 + particle.phase) * 0.55;

      if (state.mode === "architecture") {
        const gridX = Math.round(particle.x / 78) * 78;
        const gridY = Math.round(particle.y / 78) * 78;
        particle.vx += (gridX - particle.x) * 0.00007;
        particle.vy += (gridY - particle.y) * 0.00007;
      }

      if (state.mode === "convergence") {
        const centerX = state.w * 0.5;
        const centerY = state.h * 0.5;
        particle.vx += (centerX - particle.x) * 0.00003 * (1 + particle.depth);
        particle.vy += (centerY - particle.y) * 0.00003 * (1 + particle.depth);
      }

      particle.vx += Math.cos(angle) * 0.014 * state.intensity;
      particle.vy += Math.sin(angle) * 0.014 * state.intensity;
      particle.vy += scrollPush * (particle.depth - 0.5) * 0.16;

      if (state.mouse.active) {
        const dx = particle.x - state.mouse.sx;
        const dy = particle.y - state.mouse.sy;
        const distance = Math.hypot(dx, dy) || 1;
        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius;
          const direction = state.mode === "analysis" ? -1 : 1;
          particle.vx += (dx / distance) * force * 0.24 * direction;
          particle.vy += (dy / distance) * force * 0.24 * direction;
        }
      }

      const speedLimit = 0.56 + state.intensity * 0.86;
      particle.vx = clamp(particle.vx * 0.965, -speedLimit, speedLimit);
      particle.vy = clamp(particle.vy * 0.965, -speedLimit, speedLimit);
      particle.x += particle.vx * (1 + particle.depth * 0.7);
      particle.y += particle.vy * (1 + particle.depth * 0.7);

      if (particle.x < -24) particle.x = state.w + 24;
      if (particle.x > state.w + 24) particle.x = -24;
      if (particle.y < -24) particle.y = state.h + 24;
      if (particle.y > state.h + 24) particle.y = -24;

      const alpha = (0.08 + particle.life * 0.22) * state.density;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius * (1 + particle.depth * 1.35), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.fill();
    });

    const step = state.w < 760 ? 2 : 1;
    for (let i = 0; i < particles.length; i += step) {
      const first = particles[i];
      for (let j = i + 1; j < particles.length; j += step) {
        const second = particles[j];
        const distance = Math.hypot(first.x - second.x, first.y - second.y);
        if (distance >= state.connection) continue;

        const alpha = (1 - distance / state.connection) * (0.035 + state.intensity * 0.052);
        ctx.beginPath();
        ctx.moveTo(first.x, first.y);
        ctx.lineTo(second.x, second.y);
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.lineWidth = 0.5 + (first.depth + second.depth) * 0.18;
        ctx.stroke();
      }
    }

    window.requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("mousemove", event => {
    state.mouse.x = event.clientX;
    state.mouse.y = event.clientY;
    state.mouse.active = true;
  }, { passive: true });
  window.addEventListener("touchmove", event => {
    const touch = event.touches[0];
    if (!touch) return;
    state.mouse.x = touch.clientX;
    state.mouse.y = touch.clientY;
    state.mouse.active = true;
  }, { passive: true });
  window.requestAnimationFrame(draw);
}

function initRevealObserver() {
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  reveals.forEach(element => observer.observe(element));
}

function animateCounters(gsap) {
  document.querySelectorAll("[data-count]").forEach(counter => {
    let hasAnimated = false;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || hasAnimated) return;
        hasAnimated = true;
        const target = Number(counter.dataset.count || 0);
        const state = { value: 0 };
        gsap.to(state, {
          value: target,
          duration: 1.35,
          ease: "power2.out",
          onUpdate: () => {
            counter.textContent = `+${Math.round(state.value)}`;
          }
        });
        observer.disconnect();
      });
    }, { threshold: 0.5 });

    observer.observe(counter);
  });
}

function initPreloader(onComplete) {
  const preloader = document.getElementById("preloader");
  const logo = document.querySelector(".preloader-logo");
  const line = document.querySelector(".preloader-line");
  const text = document.querySelector(".preloader-text");
  const gsap = window.gsap;

  if (!preloader || !gsap || prefersReducedMotion()) {
    document.body.classList.add("is-loaded");
    onComplete?.();
    return;
  }

  const timeline = gsap.timeline({
    onComplete: () => {
      document.body.classList.add("is-loaded");
      onComplete?.();
    }
  });

  timeline
    .to(logo, { autoAlpha: 1, y: 0, scale: 1, duration: 0.72, ease: "power3.out" })
    .to(line, { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, "-=0.28")
    .to(text, { autoAlpha: 1, duration: 0.42, ease: "power2.out" }, "-=0.48")
    .to(preloader, { autoAlpha: 0, duration: 0.65, ease: "power2.inOut", delay: 0.34 });
}

function initGsapMotion() {
  if (typeof window.gsap !== "object") return;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  if (prefersReducedMotion()) {
    document.querySelector(".route-path")?.style.setProperty("stroke-dashoffset", "0");
    document.querySelectorAll(".insight-line, .asset-line, .decision-lane").forEach(path => {
      path.style.strokeDashoffset = "0";
    });
    document.querySelectorAll(".route-node, .signature-monogram, .insight-dot, .route-dot, .scenario-card, .comparison-matrix, .structure-stack, .desk-dossier, .desk-orbit, .route-option, .stack-sheet, .route-legend span, .method-stage, .method-pulse").forEach(node => {
      node.style.opacity = "1";
      node.style.transform = "none";
    });
    document.querySelectorAll(".signature-frame, .signature-accent, .signature-sweep").forEach(path => {
      path.style.strokeDashoffset = "0";
    });
    return;
  }

  document.documentElement.classList.add("is-motion-ready");

  gsap.set(".hero-word-inner", { yPercent: 110, autoAlpha: 0 });
  gsap.set(".hero-eyebrow, .hero-title-secondary, .hero-subtitle, .hero-actions, .hero-assurance, .route-panel", { autoAlpha: 0, y: 20 });
  gsap.set(".insight-line, .asset-line", { strokeDashoffset: 620 });
  gsap.set(".decision-lane", { strokeDashoffset: 500 });
  gsap.set(".insight-route", { strokeDashoffset: 680 });
  gsap.set(".route-path:not(.insight-route)", { strokeDashoffset: 760 });
  gsap.set(".signature-frame, .signature-accent, .signature-sweep", { strokeDashoffset: 900 });
  gsap.set(".insight-dot, .route-dot, .scenario-card, .comparison-matrix, .structure-stack", { autoAlpha: 0 });
  gsap.set(".desk-dossier, .desk-orbit, .route-option, .stack-label, .stack-sheet, .route-legend span", { autoAlpha: 0 });
  gsap.set(".route-option i", { scaleX: 0 });
  gsap.set(".orbit-dot", { scale: 0, autoAlpha: 0 });
  gsap.set(".method-stage", { autoAlpha: 0, y: 18, scale: 0.96 });
  gsap.set(".method-pulse", { autoAlpha: 0, scale: 0.6 });

  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
  intro
    .to(".hero-eyebrow", { autoAlpha: 1, y: 0, duration: 0.78 }, 0.08)
    .to(".hero-word-inner", { yPercent: 0, autoAlpha: 1, duration: 0.82, stagger: 0.12, ease: "power4.out" }, 0.22)
    .to(".hero-title-secondary", { autoAlpha: 1, y: 0, duration: 0.72 }, 0.88)
    .to(".hero-subtitle", { autoAlpha: 1, y: 0, duration: 0.72 }, 1.02)
    .to(".hero-actions", { autoAlpha: 1, y: 0, duration: 0.64 }, 1.14)
    .to(".hero-assurance", { autoAlpha: 1, y: 0, duration: 0.6 }, 1.28)
    .to(".route-panel", { autoAlpha: 1, y: 0, duration: 0.84 }, 0.52);

  const routeTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
  routeTimeline
    .fromTo(".desk-dossier", { y: 18, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.62 }, 0.14)
    .fromTo(".desk-orbit", { scale: 0.82, rotate: -8 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.72 }, 0.34)
    .to(".orbit-dot", { autoAlpha: 1, scale: 1, duration: 0.34, stagger: 0.11, ease: "back.out(2)" }, 0.74)
    .fromTo(".route-option", { x: 22, y: 8 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.52, stagger: 0.12 }, 0.9)
    .to(".route-option i", { scaleX: 1, duration: 0.62, stagger: 0.12, ease: "power2.inOut" }, 1.08)
    .fromTo(".stack-label", { y: 8 }, { autoAlpha: 1, y: 0, duration: 0.38 }, 1.58)
    .fromTo(".stack-sheet", { y: 18, x: 16 }, { autoAlpha: 1, y: 0, x: 0, duration: 0.56, stagger: 0.09 }, 1.72)
    .fromTo(".route-legend span", { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.08 }, 2.08);

  gsap.to(".desk-orbit", {
    rotate: 360,
    transformOrigin: "center",
    duration: 26,
    repeat: -1,
    ease: "none",
    delay: 2.7
  });

  gsap.to(".desk-seal", {
    rotate: -360,
    transformOrigin: "center",
    duration: 26,
    repeat: -1,
    ease: "none",
    delay: 2.7
  });

  gsap.to(".route-option.active", {
    y: -3,
    duration: 1.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 2.8
  });

  const signatureTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
  signatureTimeline
    .to(".signature-frame, .signature-accent, .signature-sweep", { strokeDashoffset: 0, duration: 1.55, stagger: 0.08 }, 0.12)
    .fromTo(".signature-monogram", { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.72 }, 0.34)
    .fromTo(".signature-points > div", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.46, stagger: 0.1 }, 0.64);

  gsap.to(".method-core", {
    scale: 1.035,
    duration: 2.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  const methodTimeline = gsap.timeline({
    scrollTrigger: ScrollTrigger ? { trigger: ".method-visual", start: "top 78%" } : undefined,
    defaults: { ease: "power3.out" }
  });
  methodTimeline
    .fromTo(".method-flow", { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.7 }, 0)
    .fromTo(".method-core", { autoAlpha: 0, scale: 0.86 }, { autoAlpha: 1, scale: 1, duration: 0.64 }, 0.1)
    .to(".method-stage", { autoAlpha: 1, y: 0, scale: 1, duration: 0.48, stagger: 0.12 }, 0.32)
    .to(".method-pulse", { autoAlpha: 1, scale: 1, duration: 0.32, stagger: 0.16 }, 0.76);

  gsap.to(".network-node:not(.center)", {
    y: -5,
    duration: 2.6,
    repeat: -1,
    yoyo: true,
    stagger: 0.28,
    ease: "sine.inOut"
  });

  gsap.to(".orb-1", {
    y: -72,
    ease: "none",
    scrollTrigger: ScrollTrigger ? { trigger: "#inicio", start: "top top", end: "bottom top", scrub: 1.5 } : undefined
  });
  gsap.to(".orb-2", {
    y: -36,
    ease: "none",
    scrollTrigger: ScrollTrigger ? { trigger: "#inicio", start: "top top", end: "bottom top", scrub: 2 } : undefined
  });

  if (ScrollTrigger) {
    gsap.utils.toArray(".section-heading, .friction-card, .situation-card, .solution-card, .faq-item").forEach((element, index) => {
      gsap.fromTo(
        element,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          delay: index % 5 === 0 ? 0 : 0.04,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 84%" }
        }
      );
    });

    gsap.fromTo(
      ".steps > div",
      { autoAlpha: 0, x: -28 },
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".steps", start: "top 78%" }
      }
    );

    gsap.fromTo(
      ".structure-box, .lead-form",
      { autoAlpha: 0, y: 34 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.82,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "#estrutura", start: "top 82%" }
      }
    );
  }

  animateCounters(gsap);
}

function initHeaderState() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const syncHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
}

function initCardTilt() {
  if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;

  document.querySelectorAll(".solution-card").forEach(card => {
    card.addEventListener("mousemove", event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-2px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function getPayload(formElement) {
  const data = new FormData(formElement);
  return {
    nome: data.get("nome")?.toString().trim() || "",
    whatsapp: data.get("whatsapp")?.toString().trim() || "",
    email: data.get("email")?.toString().trim() || "",
    objetivo: data.get("objetivo")?.toString().trim() || "",
    problema: data.get("problema")?.toString().trim() || "",
    proximo_passo: data.get("proximo_passo")?.toString().trim() || "",
    origem: window.location.href,
    user_agent: navigator.userAgent,
    created_at: new Date().toISOString()
  };
}

function initForm() {
  const form = document.getElementById("leadForm");
  const statusEl = document.getElementById("formStatus");
  if (!form || !statusEl) return;

  function setStatus(message, isError = false) {
    statusEl.textContent = message;
    statusEl.style.color = isError ? "#c97b68" : "#776c60";
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();
    const payload = getPayload(form);
    const button = form.querySelector("button[type='submit']");

    trackEvent("lead_form_submit_attempt", {
      event_category: "lead",
      objetivo: payload.objetivo,
      problema: payload.problema
    });

    try {
      if (button) button.disabled = true;
      setStatus("Enviando sua análise...");

      await fetch(FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });

      form.reset();
      setStatus("Análise recebida. A equipe ZR vai entrar em contato.");
      trackEvent("lead_form_submit_success", {
        event_category: "lead",
        objetivo: payload.objetivo,
        problema: payload.problema
      });
    } catch (error) {
      console.error(error);
      setStatus("Não foi possível enviar agora. Tente novamente em instantes.", true);
      trackEvent("lead_form_submit_error", {
        event_category: "lead_error",
        error_message: error.message || "unknown_error"
      });
    } finally {
      if (button) button.disabled = false;
    }
  });
}

function syncInitialHashScroll() {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (!target) return;

  window.setTimeout(() => {
    target.scrollIntoView({ block: "start" });
    target.querySelectorAll(".reveal").forEach(element => element.classList.add("visible"));
  }, 120);
}

function init() {
  loadStylesheet("premium.css", "zr-premium-css");
  initAnalytics();
  cloneMarqueeTrack();
  initLivingBackground();
  initParticles();
  initRevealObserver();
  initHeaderState();
  initCardTilt();
  initForm();
  initPreloader(() => {
    initGsapMotion();
    syncInitialHashScroll();
  });
}

window.addEventListener("load", init);
