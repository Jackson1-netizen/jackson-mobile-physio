import assert from "node:assert/strict";
import test from "node:test";
import { initReferralForm } from "../src/lib/referral-form.mjs";

// A small DOM boundary double: browser FormData semantics, focus, events and
// attributes. These tests exercise user actions without a browser or network.
function fixture({ ajax = true, reducedMotion = false, fetcher = async () => ({ ok: true }) } = {}) {
  const state = { active: null, navigated: [], observer: null };
  class Element {
    constructor(id = "") {
      this.id = id;
      this.dataset = {};
      this.attributes = new Map();
      this.handlers = new Map();
      this.children = [];
      this.hidden = false;
      this.disabled = false;
      this.classList = { toggle() {} };
    }
    setAttribute(name, value) { this.attributes.set(name, value); }
    getAttribute(name) { return this.attributes.get(name) ?? null; }
    removeAttribute(name) { this.attributes.delete(name); }
    addEventListener(name, handler) {
      this.handlers.set(name, [...(this.handlers.get(name) ?? []), handler]);
    }
    async emit(name, event = {}) {
      await Promise.all((this.handlers.get(name) ?? []).map((handler) => handler({ preventDefault() {}, ...event })));
    }
    focus() { state.active = this; }
    scrollIntoView(options) { this.scrolled = options; }
    append(node) { this.children.push(node); }
    replaceChildren() { this.children = []; }
    querySelector() { return null; }
  }
  const groups = ["new", "new", "update"].map((mode) => {
    const group = new Element();
    group.dataset.referralFields = mode;
    return group;
  });
  const values = {
    "form-name": "referral", "referral-type": "new", "bot-field": "",
    referrer_role: "Support Coordinator", referrer_name: "Synthetic referrer",
    referrer_phone: "0400 000 000", referrer_email: "synthetic@invalid.test",
    participant_name: "Synthetic participant", participant_dob: "1980-01-01",
    participant_phone: "", participant_email: "", participant_address: "Synthetic address",
    participant_suburb: "Synthetic suburb", participant_state: "VIC", participant_postcode: "3000",
    funding_type: "NDIS Plan managed", update_type: "new-care-plan",
    new_funding_type: "", effective_date: "", update_notes: "Synthetic administrative update.", consent: "yes",
  };
  const controls = new Map(Object.entries(values).map(([name, value]) => {
    const field = new Element(name);
    field.name = name;
    field.value = value;
    field.labels = [{ textContent: `${name} *` }];
    if (name.startsWith("participant_") && name !== "participant_name") field.group = groups[0];
    if (name === "funding_type") field.group = groups[1];
    if (["update_type", "new_funding_type", "effective_date", "update_notes"].includes(name)) field.group = groups[2];
    return [name, field];
  }));
  const errors = [...controls].map(([name]) => {
    const element = new Element(`${name}-error`);
    element.dataset.errorFor = name;
    element.hidden = true;
    return element;
  });
  const modes = ["new", "update"].map((mode) => {
    const element = new Element();
    element.dataset.referralMode = mode;
    return element;
  });
  const title = new Element("referral-form-title");
  const label = new Element();
  const submit = new Element();
  submit.querySelector = () => label;
  const summary = new Element();
  const summaryLabel = new Element();
  const summaryList = new Element();
  summary.querySelector = (selector) => selector === "[data-referral-summary-label]" ? summaryLabel : summaryList;
  const feedback = new Element();
  const fundingRequiredMarker = new Element();
  class Form extends Element {
    constructor() {
      super("referral-form");
      this.noValidate = false;
      this.elements = { namedItem: (name) => controls.get(name) ?? null };
    }
    querySelector(selector) {
      return new Map([
        ["[data-referral-submit]", submit], ["[data-referral-title]", title],
        ["[data-referral-summary]", summary], ["[data-referral-feedback]", feedback],
        ["[data-referral-funding-required]", fundingRequiredMarker],
      ]).get(selector) ?? null;
    }
    querySelectorAll(selector) { return selector === "[data-referral-fields]" ? groups : errors; }
  }
  const form = new Form();
  class BrowserFormData extends FormData {
    constructor() {
      super();
      for (const field of controls.values()) {
        if (!field.disabled && !field.group?.disabled) this.set(field.name, field.value);
      }
    }
  }
  const doc = {
    documentElement: { lang: "en-AU" },
    querySelector: () => form,
    querySelectorAll: () => modes,
    createElement: () => new Element(),
  };
  const win = {
    HTMLFormElement: Form, FormData: BrowserFormData,
    matchMedia: () => ({ matches: reducedMotion }),
    MutationObserver: class { constructor(callback) { state.observer = callback; } observe() {} },
    location: { assign(path) { state.navigated.push(path); } },
    ...(ajax ? { fetch: fetcher } : {}),
  };
  const messages = { en: {
    newTitle: "New referral", updateTitle: "Update referral / care plan",
    submitLabel: "Submit Referral", sending: "Sending…", errorSummary: "Please check the form.",
    errors: { required: "Required.", emailInvalid: "Invalid email.", phoneInvalid: "Invalid phone.", fundingRequired: "Select funding.", consentRequired: "Consent required." },
  } };
  initReferralForm({ messages, document: doc, window: win });
  return { state, form, controls, errors, groups, modes, title, label, submit, summary, summaryList, feedback, fundingRequiredMarker };
}

test("mode cards disable all new fieldsets and move focus to the selected form", async () => {
  const page = fixture({ reducedMotion: true });
  assert.deepEqual(page.groups.map((group) => group.disabled), [false, false, true]);
  await page.modes[1].emit("click");
  assert.equal(page.controls.get("referral-type").value, "update");
  assert.deepEqual(page.groups.map((group) => group.disabled), [true, true, false]);
  assert.deepEqual(page.groups.map((group) => group.hidden), [true, true, false]);
  assert.equal(page.modes[1].getAttribute("aria-pressed"), "true");
  assert.equal(page.title.textContent, "Update referral / care plan");
  assert.equal(page.title.getAttribute("data-i18n-path"), "referralForm.updateTitle");
  assert.equal(page.state.active, page.title);
  assert.deepEqual(page.form.scrolled, { behavior: "auto", block: "start" });
  page.controls.get("update_type").value = "funding-change";
  await page.controls.get("update_type").emit("change");
  assert.equal(page.controls.get("new_funding_type").required, true);
  assert.equal(page.controls.get("new_funding_type").getAttribute("aria-required"), "true");
  assert.equal(page.fundingRequiredMarker.hidden, false);
  page.controls.get("update_type").value = "new-care-plan";
  await page.controls.get("update_type").emit("change");
  assert.equal(page.controls.get("new_funding_type").required, false);
  assert.equal(page.controls.get("new_funding_type").getAttribute("aria-required"), "false");
  assert.equal(page.fundingRequiredMarker.hidden, true);
  await page.modes[0].emit("click");
  assert.deepEqual(page.groups.map((group) => group.disabled), [false, false, true]);
  assert.equal(page.title.getAttribute("data-i18n-path"), "referralForm.newTitle");
});

test("without AJAX, native POST validation remains and update mode still works", async () => {
  const page = fixture({ ajax: false });
  assert.equal(page.form.noValidate, false);
  assert.equal(page.form.handlers.has("submit"), false);
  await page.modes[1].emit("click");
  assert.deepEqual(page.groups.map((group) => group.disabled), [true, true, false]);
  assert.equal(page.controls.get("referral-type").value, "update");
});

test("invalid submission focuses its summary and preserves preexisting field descriptions", async () => {
  let posted = false;
  const page = fixture({ fetcher: async () => { posted = true; return { ok: true }; } });
  const email = page.controls.get("referrer_email");
  email.setAttribute("aria-describedby", "email-help");
  email.value = "not-an-email";
  await page.form.emit("submit");
  assert.equal(posted, false);
  assert.equal(email.getAttribute("aria-invalid"), "true");
  assert.equal(email.getAttribute("aria-describedby"), "email-help referrer_email-error");
  assert.equal(page.state.active, page.summary);
  assert.equal(page.summary.hidden, false);
  assert.equal(page.summaryList.children.length, 1);
  email.value = "synthetic@invalid.test";
  await page.form.emit("input");
  assert.equal(email.getAttribute("aria-invalid"), null);
  assert.equal(email.getAttribute("aria-describedby"), "email-help");
  assert.equal(page.summary.hidden, true);
});

test("update POST omits inactive new details, blocks duplicate sends and restores failed form", async () => {
  let release;
  let calls = 0;
  let payload;
  const pending = new Promise((resolve) => { release = resolve; });
  const page = fixture({ fetcher: async (_url, options) => {
    calls += 1;
    payload = options.body;
    return pending;
  } });
  await page.modes[1].emit("click");
  // Invalid stale values in a disabled fieldset must not block the update.
  page.controls.get("participant_email").value = "invalid old input";
  page.controls.get("participant_dob").value = "";
  const sending = page.form.emit("submit");
  await page.form.emit("submit");
  assert.equal(calls, 1);
  assert.equal(page.submit.disabled, true);
  assert.equal(page.label.textContent, "Sending…");
  assert.equal(payload.get("referral-type"), "update");
  assert.equal(payload.get("participant_dob"), null);
  assert.equal(payload.get("participant_email"), null);
  assert.equal(payload.get("funding_type"), null);
  assert.equal(payload.get("update_notes"), "Synthetic administrative update.");
  release({ ok: false });
  await sending;
  assert.deepEqual(page.state.navigated, []);
  assert.equal(page.state.active, page.feedback);
  assert.equal(page.feedback.hidden, false);
  assert.equal(page.submit.disabled, false);
  assert.equal(page.label.textContent, "Submit Referral");
  assert.equal(page.controls.get("update_notes").value, "Synthetic administrative update.");
});
