import assert from "node:assert/strict";
import test from "node:test";
import { consultMessage, WHATSAPP_NUMBER, whatsappUrl } from "../src/lib/whatsapp.mjs";
import { whatsappCopy } from "../src/content/whatsapp-copy.mjs";

test("wa.me URL uses the business mobile in international format", () => {
  assert.equal(WHATSAPP_NUMBER, "61433479703");
  assert.equal(whatsappUrl(), "https://wa.me/61433479703");
  assert.equal(whatsappUrl("   "), "https://wa.me/61433479703");
});

test("message text is percent-encoded, including Chinese, newlines, & and #", () => {
  const text = "您好 Jackson：防跌及平衡\nA&B #1 50%+";
  const url = whatsappUrl(text);
  assert.match(url, /^https:\/\/wa\.me\/61433479703\?text=[A-Za-z0-9%._~!*'()-]+$/);
  assert.equal(decodeURIComponent(new URL(url).search.slice("?text=".length)), text);
  assert.equal(new URL(url).searchParams.get("text"), text);
  assert.ok(url.includes("%E6%82%A8%E5%A5%BD"), "您好 is UTF-8 encoded");
  assert.ok(url.includes("%0A") && url.includes("%26") && url.includes("%23"));
});

test("consult message lists only filled fields in the page language", () => {
  const zh = whatsappCopy["zh-Hans"].message;
  const text = consultMessage(zh, { name: "  陈 小明 ", phone: "0400 000 000", role: "", need: "NDIS 物理治疗" });
  assert.equal(text, "您好 Jackson，我想申请免费初步咨询。\n姓名：陈 小明\n电话：0400 000 000\n需要：NDIS 物理治疗\n（来自 homemotionphysio.com.au）");
  const en = consultMessage(whatsappCopy.en.message, { name: "Sam", phone: "0400 000 000", role: "Case manager", need: "Mobility & strength" });
  assert.equal(new URL(whatsappUrl(en)).searchParams.get("text"), en);
  assert.doesNotMatch(en, /[\u3400-\u9fff]/);
});

test("header links carry a per-language greeting", () => {
  for (const locale of ["en", "zh-Hant", "zh-Hans"]) {
    const href = whatsappCopy[locale].headerHref;
    assert.match(href, /^https:\/\/wa\.me\/61433479703\?text=/);
    assert.match(new URL(href).searchParams.get("text"), /Jackson/);
  }
  assert.doesNotMatch(new URL(whatsappCopy.en.headerHref).searchParams.get("text"), /[\u3400-\u9fff]/);
});
