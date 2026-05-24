const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbwdVWAzgHf5WKfGZeq424hoAflLc3XMUHSi_-_3UOHIndxLY5ooHlCCODaw_D5y56O9iw/exec";
const WHATSAPP_URL = "https://wa.me/5554993805657";

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

    if (!validateEndpoint()) {
      setStatus("Formulário ainda não conectado. Fale com a ZR pelo WhatsApp.", true);
      window.open(WHATSAPP_URL, "_blank", "noopener");
      return;
    }

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
      setStatus("Recebemos seus dados. A equipe ZR vai avaliar seu cenário.");
    } catch (error) {
      console.error(error);
      setStatus("Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.", true);
    } finally {
      if (button) button.disabled = false;
    }
  });
}
