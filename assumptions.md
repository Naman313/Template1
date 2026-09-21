# Assumptions & Invented Content — Not Verified Against herewegrowdaycare.com

This file lists every factual/content claim in this template (`index.html` / `app.js`) that does **not** appear on the real, live Here We Grow Daycare website (see `info.md` for what was actually retrieved from there). It excludes purely cosmetic/UI choices (color palette, mascot character, animations, layout style) — those are new-UI design decisions, not factual claims, and are out of scope here per your direction. Each item below is something a visitor could reasonably take as a true statement about the actual business.

---

## 1. ⚠️ Contradicts the Real Site (not just "missing" — actively conflicting)

- **Lunch is served, per our site — but the real site says it isn't.**
  Our "A Day in the Life" timeline (`#daily-rhythm`, step 4 of 6) states: *"Family-Style Healthy Lunch & Stories"* at 11:30 AM–12:30 PM, describing teachers "opening packed lunches" but framing it as part of a served meal routine alongside breakfast.
  The real Programs page explicitly states: **"Breakfast and Snacks Provided" but "Lunch (not provided)"** — i.e., parents must pack lunch; the daycare does not serve it.
  **This is the single highest-priority item to fix** — it misrepresents what families actually need to provide.

---

## 2. Data Discrepancy (cross-referenced from `info.md`)

- **Pembroke street address mismatch.** Our site (campus card, footer, hero dropdown) shows **"55 Corporate Park Dr, Pembroke, MA 02359."** The live site's Pembroke contact page states the address is **"42 Mattakeesett Street, Pembroke, MA 02359."** This isn't an invented addition so much as a wrong value carried over from the original template before the real address was known — see `info.md` §3 for full detail. Flagging here too since it's directly relevant to "what doesn't match the real site."

---

## 3. Fabricated Ratios & Ratings (no numeric source on the real site)

- **Teacher:child ratios** — our site states specific numeric ratios throughout (1:4 for Infant, 1:4 for Toddler, 1:5 for Twos, 1:10 for Preschool/Pre-K — shown in the Programs grid, the 3D storybook, the Age Explorer, and the hero's "1:4 Low Infant Ratio" badge). The real site only says **"small student-to-teacher ratios"** with no numbers at all. Every specific ratio number on our site is invented.
- **"4.9/5 Rating"** with a 5-star (⭐⭐⭐⭐⭐) badge in the hero's social-proof row — the real site has no review score, review count, or review-platform citation (Google/Yelp/Facebook rating) anywhere. This is a fabricated statistic.

---

## 4. Invented Program Structure & Classroom Branding

The real site describes **3 age-based programs**, each with a plain description and no individual classroom "names":
- Infant: "one month to fifteen months"
- Toddler: "fifteen months to thirty-three months"
- Preschool: "2.9 – 5 years"

Plus, generically, 6 classrooms per campus (named only by age-band, e.g. "Infant," "Infant/Toddler," "Toddler," "Toddler/Preschool," "Preschool 1," "Preschool 2/Pre-K" for Pembroke — Randolph's breakdown differs slightly).

Our site instead invents **5 distinct branded age-tiers** with entirely made-up "suite"/"studio" names and different sub-ranges:
| Our tier | Our age range | Invented room name |
|---|---|---|
| Infant Care | 1–14 mo | "Infant Care & Gentle Nurturing Suite" |
| Toddler 1 | 15–24 mo | "Toddler Discovery & First Words Room" |
| Twos | 2–3 yr (24–35 mo) | "Curiosity & Social Exploration Studio" |
| Preschool | 3–4 yr | "Preschool STEAM & Literacy Studio" |
| Pre-K | 4–5 yr | "Kindergarten Readiness & Leadership Suite" |

None of these room names, nor the 5-tier split itself, exist on the real site. This also creates an **internal inconsistency in our own template**: the Programs Grid section (`#programs-grid`) uses a *4*-card split (Infant Care / Toddler Play / Twos Explorer / Preschool & Pre-K combined), while the Age Explorer slider (`#age-explorer`) uses a *5*-tier split (splitting Preschool and Pre-K apart) — the two sections don't agree with each other, let alone with the real site's 3-program structure.

- Minor sub-issue: our Infant range is inconsistently stated as ending at "14 Months" (Programs Grid, Age Explorer milestone data) vs. "15 Months" (Tuition Calculator dropdown: "Infant Care Suite (1 – 15 Months)") — a small internal contradiction, and either way doesn't match the real site's "one month to fifteen months" phrasing consistently.

---

## 5. Fabricated Curriculum Framework & Names

- **"Wonder & Grow™ Curriculum"** — a trademarked-looking, named curriculum brand shown in the hero badge. No such named curriculum, or any curriculum brand name at all, appears on the real site. Using a ™ symbol for a curriculum name that isn't actually registered/used by the business is a potential legal/accuracy risk worth flagging.
- **Four curriculum "pillars"** (`#curriculum` section): "Little Readers & Phonics," "Early STEAM Explorers," "Little Artists & Music," "Kindness & Friendship" — this whole structured framework is invented. The real site only generically mentions "Games," "Activities," and "Education" as loose category headers with no pillar system.
- **"Baby Sign Language"** — mentioned repeatedly (Infant program card, storybook Chapter 1, curriculum pillar 1) — not referenced anywhere on the real site.
- **"Feelings Wheel"** — a named social-emotional tool mentioned in the "Kindness & Friendship" pillar — not on the real site.
- **Specific developmental milestone lists** (e.g., "First 50+ words & two-word phrases," "Potty mastery & independent routines," "Number counting 1 to 30," "Sight words, phonics & writing full name") shown throughout the Age Explorer — the real site publishes no milestone lists at all.

---

## 6. Fabricated Technology / Service Features

- **"Parent App"** — referenced repeatedly (Safety badges grid, Tuition Calculator perks, Daily Rhythm timeline notes, hero copy) with specific claimed capabilities: real-time daily photos, feeding logs, diaper logs, teacher messaging, and a "morning check-in confirmation and mood report." **None of this exists on, or is claimed by, the real site.** This is a fully fabricated technology/service offering.
- **"Hospital-Grade Air"** — a Safety badge claiming "Continuous HEPA filtration and daily non-toxic sanitization routines." Not mentioned anywhere on the real site.
- **Hour-by-hour "Day in the Life" daily schedule** — 6 specific timed steps from 7:30 AM to 5:30 PM with detailed descriptions. The real site provides no daily schedule breakdown at all (only "Open at 7:30 AM – Monday to Friday").
- **3-step tour-booking wizard with fixed time slots** (10:00 AM / 2:30 PM / 4:30 PM) — the real site only says tour scheduling is available, with no defined online booking flow or specific time slots. Additionally (already noted in `README.md`), our booking form doesn't actually submit anywhere — it's a front-end-only simulation, so even the "confirmation" it produces isn't a real appointment.

---

## 7. Fabricated Pricing

- **Full weekly tuition rate table** ($195–$395/week, broken out by Infant/Toddler/Preschool × 2/3/5-day schedules) shown in the Tuition Estimator (`#tuition-calc`). **The real site publishes no tuition or pricing information whatsoever** — every dollar figure in our calculator is invented for this template.
- ✅ *Not an assumption:* the **"$50 Registration Credit"/"$50 Off Registration Fee"** promo is real — the live homepage does advertise "$50 Off Registration Fee." Our wording ("Registration Credit" vs. "Off Registration Fee") is a rewording but the underlying offer is verified.

---

## 8. Licensing/Certification Wording — Embellished but Plausible

- **"MA EEC Licensed"** and footer text **"Licensed by Massachusetts Department of Early Education and Care (EEC)."** The real site only says **"State Licensed Facility"** without naming a specific licensing body. Since this is a Massachusetts business, "EEC" (the MA Dept. of Early Education and Care) is very likely the correct body — but the real site never states this explicitly, so it should be confirmed with the business before being published as a named claim.
- ✅ *Not an assumption:* **"100% CPR Certified"** is supported — the real site states "All staff certified in CPR and First Aid."

---

## 9. Other Reworded / Unverified Additions (lower risk)

- **"Kindergarten Ready" badge** — a reasonable paraphrase of the real site's "designed to prepare children for kindergarten" language for the Preschool program. Low risk, but it's still our phrasing, not theirs.
- **Footer "Equal Opportunity Childcare Provider" statement** — the real site has a longer, more specific non-discrimination statement (explicitly lists race, religion, cultural heritage, national origin, political beliefs, marital status, sexual orientation, and disabilities). Ours is a shorthand paraphrase, not the verbatim policy.
- **"Terms of Enrollment" footer link** — the real site has no "Terms of Enrollment" page; its actual enrollment materials are three downloadable PDF forms (Enrollment Form, Development History and Background Form, First Aid & Emergency Consent Form). Our link is a placeholder (`href="#"`) presented as if it leads somewhere real.
- **"Hot breakfast & healthy snacks"** wording in the Tuition Calculator — the real site confirms breakfast/snacks are provided, but never says "hot" — a minor embellishment.

---

## Summary Table (quick reference)

| Category | Verified on real site? |
|---|---|
| Lunch served as part of daily routine | ❌ Contradicts real site (lunch NOT provided) |
| Pembroke street address (55 Corporate Park Dr) | ❌ Wrong — real address is 42 Mattakeesett Street |
| Numeric teacher:child ratios (1:4, 1:5, 1:10) | ❌ Invented |
| 4.9/5 star rating | ❌ Invented |
| 5-tier program/classroom names & structure | ❌ Invented |
| "Wonder & Grow™ Curriculum" name | ❌ Invented |
| 4 curriculum pillars | ❌ Invented |
| Baby Sign Language | ❌ Invented |
| Feelings Wheel | ❌ Invented |
| Developmental milestone lists | ❌ Invented |
| Parent App (photos/logs/messaging) | ❌ Invented |
| Hospital-Grade Air / HEPA | ❌ Invented |
| Hour-by-hour daily schedule | ❌ Invented |
| Tour wizard fixed time slots | ❌ Invented |
| Weekly tuition pricing table | ❌ Invented |
| $50 registration promo | ✅ Verified (real site has this) |
| CPR/First Aid certified staff | ✅ Verified (real site states this) |
| "MA EEC Licensed" specific wording | ⚠️ Plausible but not stated verbatim on real site |
| "Kindergarten Ready" phrasing | ⚠️ Reasonable paraphrase |
| Footer non-discrimination statement | ⚠️ Paraphrased, not verbatim |
| "Terms of Enrollment" page | ❌ Doesn't exist on real site (placeholder link) |
