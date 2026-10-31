import assert from "node:assert/strict";
import test from "node:test";
import {
  australianPhoneValid,
  MAX_UPLOAD_BYTES,
  REFERRAL_SUCCESS_PATH,
  submitReferral,
  validateReferral,
} from "../src/lib/referral-form.mjs";

// Fictional values only. These fixtures are never sent to a service.
function newReferral(overrides = {}) {
  return new Map(Object.entries({
    "form-name": "referral",
    "referral-type": "new",
    referrer_role: "support-coordinator",
    referrer_name: "Synthetic referrer",
    referrer_phone: "0400 000 000",
    referrer_email: "synthetic@invalid.test",
    participant_name: "Synthetic participant",
    participant_dob: "1980-01-01",
    participant_address: "Synthetic address",
    participant_suburb: "Synthetic suburb",
    participant_state: "VIC",
    participant_postcode: "3000",
    funding_type: "ndis-plan-managed",
    consent: "yes",
    ...overrides,
  }));
}
function dataFrom(values, files = []) {
  return {
    get: (name) => values.get(name) ?? null,
    getAll: (name) => name === "upload" ? files : (values.has(name) ? [values.get(name)] : []),
  };
}
const validate = (values, files = []) => validateReferral(dataFrom(values, files), { today: "2026-10-31" });

test("complete new referral validates without optional details or a document", () => {
  assert.deepEqual(validate(newReferral()), []);
});

test("missing required fields have field-specific targets, including consent", () => {
  const values = new Map();
  const errors = validate(values);
  assert.deepEqual(errors.map((error) => error.name), [
    "referrer_role", "referrer_name", "referrer_phone", "referrer_email", "participant_name",
    "participant_dob", "participant_address", "participant_suburb", "participant_state",
    "participant_postcode", "funding_type", "consent",
  ]);
});

test("Australian mobile, landline, international format and business contact numbers pass sanity checks", () => {
  for (const phone of ["0400 000 000", "(03) 9000 0000", "+61 400 000 000", "+61 (3) 9000-0000", "1300 000 000", "1800 000 000", "13 00 00"]) {
    assert.equal(australianPhoneValid(phone), true, phone);
  }
  for (const phone of ["", "123", "0400 hello 000", "abcdefghij", "+1 212 555 0100", "0000000000", "+61 0400 000 000", "04000000000"]) {
    assert.equal(australianPhoneValid(phone), false, phone);
  }
});

test("malformed required and optional contact details show inline error targets", () => {
  const errors = validate(newReferral({
    referrer_phone: "invalid",
    referrer_email: "no-at-sign",
    participant_phone: "123",
    participant_email: "bad@address",
  }));
  assert.deepEqual(errors, [
    { name: "referrer_email", key: "emailInvalid" },
    { name: "participant_email", key: "emailInvalid" },
    { name: "referrer_phone", key: "phoneInvalid" },
    { name: "participant_phone", key: "phoneInvalid" },
  ]);
});

test("date of birth must be a real date on or before today; postcode must be four digits", () => {
  for (const dob of ["2026-02-30", "not a date", "2026-11-01", "1980-1-1"]) {
    assert.deepEqual(validate(newReferral({ participant_dob: dob })), [{ name: "participant_dob", key: "dobInvalid" }]);
  }
  assert.deepEqual(validate(newReferral({ participant_dob: "2026-10-31" })), []);
  assert.deepEqual(validate(newReferral({ participant_dob: "2000-02-29" })), []);
  assert.deepEqual(validate(newReferral({ participant_postcode: "300" })), [{ name: "participant_postcode", key: "postcodeInvalid" }]);
});

test("care plan update validates without the disabled new referral fields", () => {
  const values = new Map(Object.entries({
    "referral-type": "update",
    referrer_role: "support-coordinator",
    referrer_name: "Synthetic referrer",
    referrer_phone: "0400 000 000",
    referrer_email: "synthetic@invalid.test",
    participant_name: "Synthetic participant",
    update_type: "new-care-plan",
    update_notes: "Synthetic administrative update.",
    consent: "yes",
  }));
  assert.deepEqual(validate(values), []);
  values.set("update_type", "funding-change");
  assert.deepEqual(validate(values), [{ name: "new_funding_type", key: "fundingRequired" }]);
  values.set("new_funding_type", "private-insurance");
  assert.deepEqual(validate(values), []);
  values.set("effective_date", "2026-02-30");
  assert.deepEqual(validate(values), [{ name: "effective_date", key: "dateInvalid" }]);
});

test("updates require an update type and a short administrative note", () => {
  const values = newReferral({ "referral-type": "update" });
  assert.deepEqual(validate(values), [
    { name: "update_type", key: "updateTypeRequired" },
    { name: "update_notes", key: "required" },
  ]);
});

test("upload size guard applies to the total and allows the documented boundary", () => {
  assert.deepEqual(validate(newReferral(), [{ size: MAX_UPLOAD_BYTES }]), []);
  assert.deepEqual(validate(newReferral(), [{ size: MAX_UPLOAD_BYTES - 1 }, { size: 2 }]), [
    { name: "upload", key: "uploadTooLarge" },
  ]);
});

test("multipart POST preserves files, repeated risks and form-name before navigating", async () => {
  const data = new FormData();
  data.set("form-name", "referral");
  data.set("referral-type", "update");
  data.append("risks", "pets");
  data.append("risks", "access");
  data.append("upload", new Blob(["Synthetic document. No health information."], { type: "text/plain" }), "synthetic.txt");
  const events = [];
  await submitReferral(data, {
    fetcher: async (url, options) => {
      events.push("post");
      assert.equal(url, "/");
      assert.equal(options.method, "POST");
      assert.equal(options.body, data);
      assert.equal(options.headers, undefined, "The browser supplies the multipart boundary");
      assert.equal(options.body.get("form-name"), "referral");
      assert.equal(options.body.get("referral-type"), "update");
      assert.deepEqual(options.body.getAll("risks"), ["pets", "access"]);
      assert.equal(options.body.get("upload").name, "synthetic.txt");
      return { ok: true };
    },
    navigate: (path) => { events.push(path); },
  });
  assert.deepEqual(events, ["post", REFERRAL_SUCCESS_PATH]);
});

test("rejected and offline submissions do not navigate or discard the data", async () => {
  const data = new FormData();
  data.set("participant_name", "Synthetic participant");
  let navigated = false;
  const navigate = () => { navigated = true; };
  await assert.rejects(submitReferral(data, {
    fetcher: async () => ({ ok: false }), navigate,
  }), /not accepted/);
  await assert.rejects(submitReferral(data, {
    fetcher: async () => { throw new Error("Offline"); }, navigate,
  }), /Offline/);
  assert.equal(navigated, false);
  assert.equal(data.get("participant_name"), "Synthetic participant");
});
