// validation.js

// Exige pelo menos duas palavras (nome + sobrenome), só letras/acentos
const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// WhatsApp formato BR, com ou sem máscara: (11) 91234-5678 / 11912345678 etc.
const PHONE_REGEX = /^\(?\d{2}\)?[\s-]?9?\d{4}-?\d{4}$/;
