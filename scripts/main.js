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
    document.querySelectorAll(".route-node, .signature-monogram").forEach(node => {
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
    .to(".route-path", { strokeDashoffset: 0, duration: 1.8 }, 0.15)
    .fromTo(".route-node", { autoAlpha: 0, scale: 0.78 }, { autoAlpha: 1, scale: 1, duration: 0.55, stagger: 0.18 }, 0.38)
    .fromTo(".route-legend span", { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.08 }, 0.82);

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

function init() {
  loadStylesheet("premium.css", "zr-premium-css");
  initAnalytics();
  cloneMarqueeTrack();
  initParticles();
  initRevealObserver();
  initHeaderState();
  initCardTilt();
  initForm();
  initPreloader(() => {
    initGsapMotion();
  });
}

window.addEventListener("load", init);
