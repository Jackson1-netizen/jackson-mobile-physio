/** Referral form enhancement. Submission data is never persisted in browser storage. */
export const MAX_UPLOAD_BYTES = 7 * 1024 * 1024;
export const REFERRAL_SUCCESS_PATH = "/referral-received/";

export function australianPhoneValid(value) {
  const phone = String(value).trim();
  if (!/^\+?[\d\s().-]+$/.test(phone)) return false;
  const digits = phone.replace(/\D/g, "");
  return /^(?:0[23478]\d{8}|61[23478]\d{8}|13\d{4}|(?:1300|1800)\d{6})$/.test(digits);
}

function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

/**
 * @param {{ get(name: string): unknown, getAll(name: string): unknown[] }} data
 * @param {{ today?: string }} [options]
 * @returns {{ name: string, key: string }[]}
 */
export function validateReferral(data, { today = (() => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
})() } = {}) {
  const errors = [];
  const value = (name) => String(data.get(name) ?? "").trim();
  const requireField = (name, key = "required") => {
    if (!value(name)) errors.push({ name, key });
  };
  for (const name of ["referrer_role", "referrer_name", "referrer_phone", "referrer_email", "participant_name"]) {
    requireField(name);
  }
  for (const name of ["referrer_email", "participant_email"]) {
    if (value(name) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value(name))) {
      errors.push({ name, key: "emailInvalid" });
    }
  }
  for (const name of ["referrer_phone", "participant_phone"]) {
    if (value(name) && !australianPhoneValid(value(name))) errors.push({ name, key: "phoneInvalid" });
  }
  if (value("referral-type") === "update") {
    requireField("update_type", "updateTypeRequired");
    // Funding can stay unchanged for a care plan/letter update.
    if (value("update_type") === "funding-change") requireField("new_funding_type", "fundingRequired");
    requireField("update_notes");
    if (value("effective_date") && !validDate(value("effective_date"))) {
      errors.push({ name: "effective_date", key: "dateInvalid" });
    }
  } else {
    requireField("participant_dob");
    if (value("participant_dob") && (!validDate(value("participant_dob")) || value("participant_dob") > today)) {
      errors.push({ name: "participant_dob", key: "dobInvalid" });
    }
    for (const name of ["participant_address", "participant_suburb", "participant_state", "participant_postcode"]) {
      requireField(name);
    }
    if (value("participant_postcode") && !/^\d{4}$/.test(value("participant_postcode"))) {
      errors.push({ name: "participant_postcode", key: "postcodeInvalid" });
    }
    requireField("funding_type", "fundingRequired");
  }
  if (!data.get("consent")) errors.push({ name: "consent", key: "consentRequired" });
  const uploadSize = data.getAll("upload").reduce((total, file) => {
    return total + (file && typeof file === "object" && "size" in file ? Number(file.size) : 0);
  }, 0);
  if (uploadSize > MAX_UPLOAD_BYTES) errors.push({ name: "upload", key: "uploadTooLarge" });
  return errors;
}

/**
 * Posts multipart data without setting Content-Type: the browser must add its boundary.
 * Transport and navigation are injectable so success/failure can be checked offline.
 */
export async function submitReferral(data, {
  fetcher = globalThis.fetch,
  navigate = (path) => globalThis.location.assign(path),
} = {}) {
  const response = await fetcher("/", { method: "POST", body: data });
  if (!response.ok) throw new Error("Referral was not accepted");
  navigate(REFERRAL_SUCCESS_PATH);
}

/**
 * @param {{ messages: Record<string, any>, document?: Document, window?: Window }} options
 */
export function initReferralForm({ messages, document: doc = document, window: win = window }) {
  const form = doc.querySelector("[data-referral-form]");
  if (!(form instanceof win.HTMLFormElement) || form.dataset.referralInitialized) return;
  form.dataset.referralInitialized = "true";
  const modeInput = form.elements.namedItem("referral-type");
  const modes = [...doc.querySelectorAll("[data-referral-mode]")];
  const groups = [...form.querySelectorAll("[data-referral-fields]")];
  const submit = form.querySelector("[data-referral-submit]");
  const submitLabel = submit?.querySelector("[data-referral-submit-label]") ?? submit?.querySelector("span") ?? submit;
  const title = form.querySelector("[data-referral-title]");
  const summary = form.querySelector("[data-referral-summary]");
  const feedback = form.querySelector("[data-referral-feedback]");
  const errorNodes = [...form.querySelectorAll("[data-error-for]")];
  let attempted = false;
  let submitting = false;
  const copy = () => messages[doc.documentElement.lang] ?? messages.en;
  const collect = () => validateReferral(new win.FormData(form));
  const fieldFor = (name) => form.elements.namedItem(name);

  function render(errors) {
    for (const node of errorNodes) {
      const name = node.dataset.errorFor;
      const field = fieldFor(name);
      const error = errors.find((item) => item.name === name);
      const description = (field?.getAttribute("aria-describedby") ?? "").split(/\s+/).filter((id) => id && id !== node.id);
      node.hidden = !error;
      node.textContent = error ? (copy().errors[error.key] ?? copy().errors.required) : "";
      if (error) {
        node.setAttribute("data-i18n-path", `referralForm.errors.${error.key}`);
        field?.setAttribute("aria-invalid", "true");
        if (node.id) description.push(node.id);
      } else {
        node.removeAttribute("data-i18n-path");
        field?.removeAttribute("aria-invalid");
      }
      if (description.length) field?.setAttribute("aria-describedby", description.join(" "));
      else field?.removeAttribute("aria-describedby");
    }
    if (summary) {
      summary.hidden = errors.length === 0;
      const label = summary.querySelector("[data-referral-summary-label]");
      if (label) label.textContent = copy().errorSummary;
      const list = summary.querySelector("[data-referral-summary-list]");
      if (list) {
        list.replaceChildren();
        for (const error of errors) {
          const field = fieldFor(error.name);
          const item = doc.createElement("li");
          const link = doc.createElement("a");
          link.href = `#${field?.id ?? error.name}`;
          const label = field?.labels?.[0]?.textContent?.replace(/\s*\*\s*$/, "").trim();
          const message = copy().errors[error.key] ?? copy().errors.required;
          link.textContent = label ? `${label}: ${message}` : message;
          item.append(link);
          list.append(item);
        }
      }
    }
  }

  function setMode(mode) {
    if (submitting || !modeInput) return;
    const selected = mode === "update" ? "update" : "new";
    modeInput.value = selected;
    for (const group of groups) {
      const active = group.dataset.referralFields === selected;
      group.hidden = !active;
      group.disabled = !active;
    }
    for (const button of modes) {
      const selectedButton = button.dataset.referralMode === selected;
      button.classList.toggle("selected", selectedButton);
      button.setAttribute("aria-pressed", String(selectedButton));
    }
    if (title) {
      title.setAttribute("data-i18n-path", selected === "new" ? "referralForm.newTitle" : "referralForm.updateTitle");
      title.textContent = selected === "new" ? copy().newTitle : copy().updateTitle;
    }
    if (feedback) feedback.hidden = true;
    render(attempted ? collect() : []);
  }
  for (const button of modes) button.addEventListener("click", () => {
    if (submitting) return;
    setMode(button.dataset.referralMode);
    // The form follows a long introduction on mobile. Move both the viewport and
    // keyboard/screen-reader focus to the selected form, as in the reference.
    if (title) {
      title.setAttribute("tabindex", "-1");
      title.focus({ preventScroll: true });
    }
    form.scrollIntoView({
      behavior: win.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  });
  setMode(modeInput?.value);

  const updateType = fieldFor("update_type");
  const newFunding = fieldFor("new_funding_type");
  const fundingRequiredMarker = form.querySelector("[data-referral-funding-required]");
  const syncFundingRequired = () => {
    const required = updateType?.value === "funding-change";
    if (newFunding) {
      newFunding.required = required;
      newFunding.setAttribute("aria-required", String(required));
    }
    if (fundingRequiredMarker) fundingRequiredMarker.hidden = !required;
  };
  updateType?.addEventListener("change", syncFundingRequired);
  syncFundingRequired();

  // Keep the normal multipart POST and native validation if AJAX is unavailable.
  if (typeof win.fetch !== "function" || typeof win.FormData !== "function" || !submit) return;
  const refresh = () => {
    if (attempted && !submitting) render(collect());
  };
  form.addEventListener("input", refresh);
  form.addEventListener("change", refresh);
  new win.MutationObserver(() => {
    if (submitLabel) submitLabel.textContent = submitting ? copy().sending : copy().submitLabel;
    if (attempted && !submitting) render(collect());
  }).observe(doc.documentElement, { attributes: true, attributeFilter: ["lang"] });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (submitting) return;
    attempted = true;
    if (feedback) feedback.hidden = true;
    const data = new win.FormData(form);
    const errors = validateReferral(data);
    render(errors);
    if (errors.length) {
      if (summary) summary.focus();
      else fieldFor(errors[0].name)?.focus();
      return;
    }
    submitting = true;
    submit.disabled = true;
    submit.setAttribute("aria-busy", "true");
    for (const button of modes) button.disabled = true;
    if (submitLabel) submitLabel.textContent = copy().sending;
    try {
      await submitReferral(data, {
        fetcher: win.fetch.bind(win),
        navigate: (path) => win.location.assign(path),
      });
    } catch {
      if (feedback) {
        feedback.hidden = false;
        feedback.focus();
      }
    } finally {
      submitting = false;
      submit.disabled = false;
      submit.removeAttribute("aria-busy");
      for (const button of modes) button.disabled = false;
      if (submitLabel) submitLabel.textContent = copy().submitLabel;
    }
  });
  form.noValidate = true;
}
