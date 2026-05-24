const SPREADSHEET_ID = "1FCZywlCoH6pVDnKvxHfS1iEEIf7j4hpQKFmbP678p3s";
const NOTIFICATION_EMAIL = "contato.eduardokeitel@gmail.com";
const SHEET_NAME = "Leads";

function doPost(e) {
  try {
    const payload = parsePayload_(e);
    const sheet = getSheet_();
    ensureHeader_(sheet);

    sheet.appendRow([
      new Date(),
      payload.nome || "",
      payload.whatsapp || "",
      payload.email || "",
      payload.objetivo || "",
      payload.problema || "",
      payload.proximo_passo || "",
      payload.origem || "",
      payload.user_agent || ""
    ]);

    sendNotification_(payload);

    return json_({ ok: true });
  } catch (error) {
    console.error(error);
    return json_({ ok: false, error: error.message });
  }
}

function doGet() {
  return json_({ ok: true, service: "ZR lead endpoint" });
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error("Payload vazio.");
  }
  return JSON.parse(e.postData.contents);
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  return sheet;
}

function ensureHeader_(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, 9).getValues()[0];
  const hasHeader = firstRow.some(value => value !== "");
  if (hasHeader) return;

  sheet.getRange(1, 1, 1, 9).setValues([[
    "Data",
    "Nome",
    "WhatsApp",
    "E-mail",
    "Objetivo",
    "Problema",
    "Próximo passo",
    "Origem",
    "User Agent"
  ]]);
}

function sendNotification_(payload) {
  const subject = `Novo lead ZR: ${payload.nome || "sem nome"}`;
  const body = [
    "Novo lead recebido pelo Site ZR.",
    "",
    `Nome: ${payload.nome || ""}`,
    `WhatsApp: ${payload.whatsapp || ""}`,
    `E-mail: ${payload.email || ""}`,
    `Objetivo: ${payload.objetivo || ""}`,
    `Problema: ${payload.problema || ""}`,
    `Próximo passo: ${payload.proximo_passo || ""}`,
    `Origem: ${payload.origem || ""}`,
    "",
    "Crédito sujeito à análise e enquadramento."
  ].join("\n");

  MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
