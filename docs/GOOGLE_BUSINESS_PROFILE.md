# Google Business Profile — editable draft

> **Superseded / current state (2026-10-02):** Do not create the profile yet. Current facts are in `docs/LAUNCH_STATUS.md`. The public brand is Home Motion / Home Motion Physiotherapy, not “WAI WA LAW”. There is no `example.com` placeholder. `hello@homemotionphysio.com.au` receives the Netlify form notification; an outside-sender test is still open. The website URL is still the parked domain until DNS cutover. The referral QR points at `https://homemotionphysio.com.au/referral/` and opens that parked page until then.

**Status:** TODO / NOT CONFIRMED — do not publish until business details are verified and Jackson asks.

## Business type

- [ ] **Service-area business** (no public storefront address)  
- [ ] Sole trader / independent practitioner  
- [ ] **Do not** add a home address  

## Core fields (placeholders)

| Field | Draft value | Confirmed? |
|-------|-------------|------------|
| Business name | Home Motion Physiotherapy (public wordmark: Home Motion) | Confirmed — ASIC registered business name |
| Primary category | Physiotherapist (or Mobile physiotherapist if available) | TODO |
| Practitioner (display) | Wai Wa "Jackson" Law | Confirmed (draft site) |
| Service areas | Melbourne Eastern Suburbs + listed suburbs and surrounding areas | Align with `site.ts` |
| Phone | 0433 479 703 | Confirmed |
| ABN | 75 612 731 757 | Confirmed |
| Email | hello@homemotionphysio.com.au | Workspace is active; test of this mailbox not recorded |
| Website | https://homemotionphysio.com.au | Domain registered; still the VentraIP parked page. Do not publish GBP until the real site is on HTTPS |
| Hours | By appointment (Mon–Sat); Sunday closed — do not publish fixed opening hours on draft site | TODO for GBP |
| Description | Mobile physiotherapy, eastern suburbs, English / Cantonese / Mandarin. NDIS plan-managed and self-managed enquiries welcome. Not an NDIS registered provider. | Use `src/content/site.ts` |

## Services (examples only)

Align with website list — mobility, strength and balance, functional exercise, falls prevention, community mobility, rehabilitation. No invented specialties.

## Attributes / languages

- [ ] English  
- [ ] Cantonese  
- [ ] Mandarin  

## NDIS

- [ ] Wording reviewed: enquiries welcome for plan-managed and self-managed participants  
- [ ] **Do not** claim “NDIS Registered Provider” unless formally accurate and confirmed  
- [ ] **Do not** promise funding or eligibility  

## AHPRA

- [x] General registration as a physiotherapist, PHY0004088824. Do not publish an expiry date.
- [ ] Create the GBP only when Jackson asks. The website is still a draft.  

## Photo checklist (before launch)

- [ ] Professional headshot (consent / quality checked)  
- [ ] Mobile / community context photo (no identifiable clients without consent)  
- [ ] Logo or wordmark for Home Motion  
- [ ] No stock photos that imply false credentials or facilities  

## Launch checklist

- [ ] Home Motion, phone, email, and domain live and match the website (name, phone, and ABN confirmed in the repo)  
- [ ] Website removed from draft (`noindex` / robots) only when appropriate  
- [ ] Referral sheet URL matches the printed QR code (`https://homemotionphysio.com.au/referral/`) once that page is on HTTPS  
- [ ] Privacy policy URL added  
- [ ] ABN on footer confirmed  
- [ ] Second person reviews NDIS and AHPRA wording  
