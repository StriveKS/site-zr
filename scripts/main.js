const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbwdVWAzgHf5WKfGZeq424hoAflLc3XMUHSi_-_3UOHIndxLY5ooHlCCODaw_D5y56O9iw/exec";
const WHATSAPP_URL = "https://wa.me/5554993805657";
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

loadStylesheet("premium.css", "zr-premium-css");

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

initAnalytics();

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

reveals.forEach(element => observer.observe(element));

function initGsapMotion() {
  if (prefersReducedMotion() || typeof window.gsap !== "object") {
    document.querySelector(".route-path")?.style.setProperty("stroke-dashoffset", "0");
    document.querySelectorAll(".route-node").forEach(node => {
      node.style.opacity = "1";
    });
    return;
  }

  const { gsap } = window;
  document.documentElement.classList.add("is-motion-ready");

  const routeTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
  routeTimeline
    .to(".route-path", { strokeDashoffset: 0, duration: 1.8 }, 0.15)
    .fromTo(".route-node", { autoAlpha: 0, scale: 0.78 }, { autoAlpha: 1, scale: 1, duration: 0.55, stagger: 0.18 }, 0.38)
    .fromTo(".route-legend span", { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.08 }, 0.82);

  const signatureTimeline = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.18 });
  signatureTimeline
    .to(".signature-frame, .signature-accent, .signature-sweep", { strokeDashoffset: 0, duration: 1.55, stagger: 0.08 }, 0)
    .fromTo(".signature-monogram", { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.72 }, 0.28)
    .fromTo(".signature-script", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.58 }, 0.56)
    .fromTo(".signature-points > div", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.46, stagger: 0.1 }, 0.72);

  gsap.fromTo(
    ".trust-list span",
    { y: 10, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.08, ease: "power2.out", delay: 0.5 }
  );

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

  animateCounters(gsap);
}

function animateCounters(gsap) {
  const counter = document.querySelector("[data-count]");
  if (!counter) return;

  let hasAnimated = false;
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || hasAnimated) return;
      hasAnimated = true;
      const target = Number(counter.dataset.count || 0);
      const value = { current: 0 };
      gsap.to(value, {
        current: target,
        duration: 1.2,
        ease: "power2.out",
        onUpdate: () => {
          counter.textContent = `+${Math.round(value.current)}`;
        }
      });
      counterObserver.disconnect();
    });
  }, { threshold: 0.5 });

  counterObserver.observe(counter);
}

window.addEventListener("load", initGsapMotion);

document.querySelectorAll("a[href^='https://wa.me']").forEach(link => {
  link.addEventListener("click", () => {
    trackEvent("click_whatsapp", {
      event_category: "lead",
      event_label: link.textContent.trim() || "whatsapp",
      link_url: link.href
    });
  });
});

document.querySelectorAll("a[href='#diagnostico'], a[href='#contato']").forEach(link => {
  link.addEventListener("click", () => {
    trackEvent("click_cta_contato", {
      event_category: "lead",
      event_label: link.textContent.trim() || "cta_contato"
    });
  });
});

const form = document.getElementById("leadForm");
const statusEl = document.getElementById("formStatus");

function setStatus(message, isError = false) {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.style.color = isError ? "#ffb4a8" : "#b9ad9d";
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

function validateEndpoint() {
  return FORM_ENDPOINT && !FORM_ENDPOINT.includes("COLE_AQUI");
}

if (form) {
  form.addEventListener("submit", async event => {
    event.preventDefault();

    const payload = getPayload(form);
    const button = form.querySelector("button[type='submit']");

    trackEvent("lead_form_submit_attempt", {
      event_category: "lead",
      objetivo: payload.objetivo,
      problema: payload.problema
    });

    if (!validateEndpoint()) {
      setStatus("Formulario ainda nao conectado. Fale com a ZR pelo WhatsApp.", true);
      trackEvent("lead_form_endpoint_missing", { event_category: "lead_error" });
      window.open(WHATSAPP_URL, "_blank", "noopener");
      return;
    }

    try {
      if (button) button.disabled = true;
      setStatus("Enviando seu diagnostico...");

      await fetch(FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });

      form.reset();
      setStatus("Recebemos seus dados. A equipe ZR vai avaliar seu cenario e retornar com os proximos passos.");
      trackEvent("lead_form_submit_success", {
        event_category: "lead",
        objetivo: payload.objetivo,
        problema: payload.problema
      });
    } catch (error) {
      console.error(error);
      setStatus("Nao foi possivel enviar agora. Tente novamente ou fale pelo WhatsApp.", true);
      trackEvent("lead_form_submit_error", {
        event_category: "lead_error",
        error_message: error.message || "unknown_error"
      });
    } finally {
      if (button) button.disabled = false;
    }
  });
}
