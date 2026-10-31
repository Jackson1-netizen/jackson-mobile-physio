import assert from "node:assert/strict";
import test from "node:test";
import { assertReferralForm, referralFields } from "../scripts/assert-netlify-form.mjs";
import { includeInSitemap } from "../scripts/site-draft.mjs";

const required = new Set(["referrer_role", "referrer_name", "referrer_phone", "referrer_email", "participant_name", "participant_dob", "funding_type", "consent"]);
const field = (name) => {
  const type = name === "upload" ? "file" : name === "consent" ? "checkbox" : name === "referral-type" ? "hidden" : "text";
  return `<input type="${type}" name="${name}"${name === "referral-type" ? ' value="new"' : ""}${required.has(name) ? " required" : ""}>`;
};
const form = `<form name="referral" method="POST" action="/referral-received/" data-netlify="true" netlify-honeypot="bot-field" enctype="multipart/form-data"><input type="hidden" name="form-name" value="referral">${referralFields.map(field).join("")}</form>`;
const receivedHtml = '<html><head><meta name="robots" content="noindex, nofollow"></head><body>Referral received</body></html>';
const check = (html = form, received = receivedHtml) => assertReferralForm({ html, receivedHtml: received });

test("static referral form and noindex receipt satisfy Netlify build guard", () => {
  assert.doesNotThrow(() => check());
  assert.doesNotThrow(() => check(form.replaceAll('"', "'")));
});

test("missing form and each missing required Netlify attribute fail the build", () => {
  assert.throws(() => check(""), /no <form name="referral">/);
  for (const attr of [' data-netlify="true"', ' netlify-honeypot="bot-field"', ' enctype="multipart/form-data"', ' method="POST"', ' action="/referral-received/"']) {
    assert.throws(() => check(form.replace(attr, "")), undefined, attr);
  }
});

test("every new and update field must be inside the actual referral form", () => {
  for (const name of referralFields) {
    assert.throws(() => check(form.replace(field(name), "") + field(name)), undefined, name);
  }
});

test("a decoy form-name outside the form cannot pass the detection guard", () => {
  const hidden = '<input type="hidden" name="form-name" value="referral">';
  assert.throws(() => check(form.replace(hidden, "") + hidden), /hidden form-name/);
  assert.throws(() => check(form.replace('value="referral"', 'value="enquiry"')), /hidden form-name/);
});

test("native validation, file input and consent checkbox are build requirements", () => {
  for (const name of required) {
    assert.throws(() => check(form.replace(field(name), field(name).replace(" required", ""))), /native required validation/, name);
  }
  assert.throws(() => check(form.replace('type="file"', 'type="text"')), /file input/);
  assert.throws(() => check(form.replace('type="checkbox"', 'type="text"')), /checkbox/);
  assert.throws(() => check(form.replace('value="new"', 'value="update"')), /default to referral-type/);
});

test("thank-you page is required and stays noindex even after launch", () => {
  assert.throws(() => check(form, ""), /always have noindex/);
  assert.throws(() => check(form, receivedHtml.replace("noindex, nofollow", "index, follow")), /always have noindex/);
});

// Submission receipts never belong in search, regardless of the site's draft flag.
test("both form receipts are excluded from the sitemap", () => {
  const flags = { privacyAdopted: true, disclaimerAdopted: true };
  for (const path of ["/enquiry-received", "/enquiry-received/", "/referral-received", "/referral-received/"]) {
    assert.equal(includeInSitemap(path, flags), false, path);
  }
  assert.equal(includeInSitemap("/referral/", flags), true);
});
