# THIENVAN_GLOBAL_SEO_AI_SEARCH_RULES.md

**Project:** THIENVAN<br>
**Document type:** Global SEO / Search / AI Discovery Rulebook<br>
**Version:** 2.0.0<br>
**Status:** MANDATORY<br>
**Effective date:** 2026-08-09<br>
**Applies to:** Entire THIENVAN website, all modules, all public content, all supported locales<br>
**Primary audience:** Codex, developers, content team, SEO team, QA<br>
**Related documents:** `THIENVAN_UI_UX_SEO_RULES.md`, `THIENVAN_RESPONSE_FRAMEWORK.md`, project specs and validation files

---

## 0. PURPOSE

This file defines the mandatory SEO architecture for THIENVAN so that the website can be discovered, crawled, indexed, understood, cited, and ranked across:

- Google Search
- Google AI Overviews / AI Mode
- Bing and Bing-based search experiences
- Apple Search surfaces such as Siri, Spotlight, and Safari
- Yandex
- Naver
- Baidu and other regional engines when the corresponding locale is launched
- ChatGPT Search
- Perplexity
- Claude Search
- Future search engines and AI answer engines that follow open web standards

This rulebook is **standards-first**. THIENVAN must not build separate, deceptive, or bot-only versions of content for different search engines or AI systems.

The operating objective is:

> **One trustworthy public web source → readable by humans → crawlable by search engines → understandable by AI → traceable to evidence → connected to THIENVAN product conversion.**

---

# 1. RULE PRIORITY

When two goals conflict, apply this order:

1. Calculation correctness
2. User privacy and security
3. Evidence / methodology integrity
4. Crawlability and indexability
5. User comprehension and accessibility
6. Performance
7. Search intent relevance
8. AI discoverability
9. Conversion optimization
10. SEO experiments

SEO MUST NEVER override calculation correctness, interpretation rules, privacy, or evidence requirements.

---

# 2. DEFINITIONS

## 2.1 Public page

A page intended to be discoverable through search engines or AI search.

Typical examples:

- School / system overview
- Calculator landing page
- Educational article
- Glossary page
- Methodology page
- Comparison article
- Public reference page

## 2.2 Private / personal page

A page containing or derived from user-specific data.

Typical examples:

- Personal chart result
- Saved profile
- Account
- User dashboard
- Personal report
- Payment / billing
- Private history

Private pages are not SEO inventory.

## 2.3 Search crawler

A crawler used to discover or retrieve public web content for search or answer experiences.

Examples include:

- Googlebot
- Bingbot
- Applebot
- OAI-SearchBot
- PerplexityBot
- Claude-SearchBot

## 2.4 Training crawler

A crawler or directive associated with the possible use of content for training foundation models.

Training access is a **business/data-rights decision**, not an SEO ranking requirement.

Examples include:

- GPTBot
- ClaudeBot
- Applebot-Extended
- Google-Extended

## 2.5 Canonical URL

The single preferred public URL representing a page.

## 2.6 SEO inventory

The complete set of URLs that THIENVAN intentionally allows search engines to index.

---

# 3. GLOBAL ARCHITECTURE PRINCIPLES

## GLOBAL-001 — STANDARDS FIRST [MUST]

Every public page MUST:

- return the correct HTTP status;
- use HTTPS;
- expose meaningful semantic HTML;
- contain its primary useful content in crawlable HTML;
- have one clear canonical URL;
- be usable on mobile;
- be understandable without requiring a crawler to click buttons;
- not rely exclusively on canvas, chart, image, animation, or client state for its core meaning.

Primary educational text SHOULD be available in server-rendered or statically generated HTML wherever practical.

---

## GLOBAL-002 — ONE SOURCE OF TRUTH [MUST]

THIENVAN MUST NOT create:

- one text version for Google;
- another version for AI crawlers;
- hidden keyword text;
- bot-only answer blocks;
- cloaked content;
- content that materially differs between crawler and normal user for ranking purposes.

Human-readable content and machine-readable content MUST describe the same underlying facts.

---

## GLOBAL-003 — SEO MUST NOT MODIFY THE ENGINE [MUST NOT]

SEO, marketing, frontend, or content generation MUST NOT:

- change astronomical calculation results;
- change birth-chart calculations;
- invent new astrology rules for keyword coverage;
- alter approved interpretation rules to fit search keywords;
- claim scientific validation that does not exist;
- rewrite evidence in a misleading way.

Required dependency:

```text
Calculation Engine
        ↓
Approved Rules / Ruleset
        ↓
THIENVAN Response Framework
        ↓
Public Educational Explanation
        ↓
SEO / Search Presentation
```

SEO is a presentation and discovery layer, not a truth-generation layer.

---

# 4. PUBLIC VS PRIVATE INDEXING

## INDEX-001 — CLASSIFY EVERY ROUTE [MUST]

Every route MUST be explicitly classified as one of:

- `PUBLIC_INDEXABLE`
- `PUBLIC_NOINDEX`
- `PRIVATE_AUTH`
- `SYSTEM_INTERNAL`

No route may remain undefined.

---

## INDEX-002 — PUBLIC INDEXABLE PAGE [MUST]

A public indexable page MUST have:

- HTTP `200`;
- unique title;
- useful main content;
- canonical URL;
- indexable robots directives;
- internal links;
- inclusion in sitemap when appropriate;
- correct locale metadata;
- structured data when applicable.

---

## INDEX-003 — PRIVATE USER DATA [MUST]

User-specific pages MUST NOT be part of the public SEO inventory.

Examples:

- personal astrology results;
- saved birth profiles;
- personal Bát Tự / Tử Vi / Vedic profiles;
- report history;
- account data;
- billing;
- email;
- date/time/location of birth linked to an identifiable account.

Requirements:

- protect sensitive/private pages with authentication where appropriate;
- exclude them from sitemap;
- do not intentionally create public backlinks to private URLs;
- do not expose personal data inside indexable URL slugs;
- use `noindex` on non-sensitive public-result utility pages when needed.

**Important:** `robots.txt` is not a privacy or security mechanism.

If a page needs a crawler to read a `noindex` meta directive, do not simultaneously block that crawler from fetching the page solely with `robots.txt`.

---

## INDEX-004 — QUERY PARAMETER CONTROL [MUST]

Tracking or state parameters MUST NOT create independent indexable pages.

Examples:

```text
?utm_source=
?utm_campaign=
?ref=
?source=
?session=
?user=
```

Canonicalization, routing, redirects, and analytics MUST prevent parameter-generated duplicate SEO inventory.

---

# 5. URL RULES

## URL-001 — STABLE HUMAN-READABLE URLS [MUST]

Public URLs SHOULD be:

- short;
- readable;
- lowercase;
- stable;
- descriptive of the page topic;
- free of unnecessary IDs and parameters.

Example:

```text
/vi/chiem-tinh-tay-phuong/cung-moc-la-gi/
```

Avoid:

```text
/page?id=9382&type=astro&lang=vi
```

---

## URL-002 — DO NOT CHANGE PUBLISHED URLS WITHOUT MIGRATION [MUST]

If a public URL changes:

- use a permanent redirect where appropriate;
- update canonical;
- update sitemap;
- update internal links;
- update hreflang;
- update structured data URLs;
- submit the changed URL through supported indexing workflows.

Do not create redirect chains.

---

# 6. CANONICALIZATION

## CANONICAL-001 — ONE SELF-CANONICAL PER PUBLIC PAGE [MUST]

Each public indexable page MUST include one preferred canonical URL.

Example:

```html
<link rel="canonical" href="https://example.com/vi/chiem-tinh-tay-phuong/cung-moc-la-gi/">
```

Canonical URLs MUST:

- use HTTPS;
- use the preferred host;
- use the preferred trailing-slash convention;
- not contain tracking parameters;
- point to a valid content-equivalent page.

---

## CANONICAL-002 — NO CONFLICTING SIGNALS [MUST NOT]

Do not create conflicts such as:

- canonical points to page A while sitemap contains page B;
- hreflang points to a redirected URL;
- canonical points to a `noindex` URL;
- canonical chains;
- multiple canonical tags.

---

# 7. ROBOTS.TXT AND CRAWLER POLICY

## BOT-001 — SEARCH OPEN, TRAINING SEPARATE [MANDATORY POLICY]

Default THIENVAN policy:

> **Search visibility should remain open. AI model training permission is a separate business decision.**

THIENVAN SHOULD allow legitimate search/discovery crawlers to access public content.

Priority search/discovery crawlers include:

- Googlebot
- Bingbot
- Applebot
- OAI-SearchBot
- PerplexityBot
- Claude-SearchBot

Training-related controls MUST be managed independently.

---

## BOT-002 — OPENAI [MUST UNDERSTAND]

OpenAI separates:

- `OAI-SearchBot` — used for ChatGPT search discovery;
- `GPTBot` — associated with possible foundation-model training;
- `ChatGPT-User` — user-initiated retrieval, not automatic search crawling.

Allowing `OAI-SearchBot` does not require allowing `GPTBot`.

---

## BOT-003 — ANTHROPIC [MUST UNDERSTAND]

Anthropic separates:

- `Claude-SearchBot` — search discovery;
- `Claude-User` — user-directed retrieval;
- `ClaudeBot` — model-development/training-related crawling.

Search access and training access MUST be treated independently.

---

## BOT-004 — PERPLEXITY [MUST UNDERSTAND]

Perplexity separates at least:

- `PerplexityBot` — search crawling / surfacing links;
- `Perplexity-User` — user-requested retrieval.

For WAF/CDN configuration, use official published crawler IP information when verification is necessary.

---

## BOT-005 — APPLE [MUST UNDERSTAND]

Apple separates:

- `Applebot` — search/discovery for Apple ecosystem surfaces;
- `Applebot-Extended` — control related to use of Applebot-collected content for foundation model training.

Blocking `Applebot-Extended` does not inherently require blocking Applebot search discovery.

---

## BOT-006 — BASELINE ROBOTS POLICY [MUST]

The final `robots.txt` MUST be generated from the actual route architecture.

Baseline concept:

```text
User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Applebot
Allow: /

Sitemap: https://YOUR_DOMAIN/sitemap.xml
```

This is a baseline, not a literal copy-paste requirement before domain and route review.

### Training bot decision

If THIENVAN later chooses to opt out of specific training uses, add explicit policies only after a business decision.

Example pattern:

```text
User-agent: GPTBot
Disallow: /
```

Equivalent decisions for other training controls must be documented in `DECISION_LOG.md`.

---

## BOT-007 — WAF/CDN MUST NOT ACCIDENTALLY BLOCK SEARCH [MUST]

Cloudflare, CDN, rate limiting, bot protection, firewall, or hosting security MUST NOT accidentally block legitimate crawlers that THIENVAN intends to allow.

When bot impersonation is a concern:

- verify against the vendor's official method;
- use official published IP ranges or reverse-DNS verification where supported;
- never trust User-Agent text alone for security decisions.

---

# 8. XML SITEMAP

## SITEMAP-001 — ONLY CANONICAL INDEXABLE URLS [MUST]

Sitemap MUST contain only URLs that are intended for indexing.

A sitemap URL SHOULD be:

- HTTP `200`;
- canonical;
- indexable;
- non-private;
- not redirected;
- not a duplicate.

Never include:

- account pages;
- personal results;
- login/register;
- noindex pages;
- redirect URLs;
- 404/410 URLs;
- tracking parameter URLs.

---

## SITEMAP-002 — SITEMAP INDEX [SHOULD]

When inventory grows, split sitemaps by content type.

Example:

```text
/sitemap.xml
/sitemap-pages.xml
/sitemap-tools.xml
/sitemap-articles.xml
/sitemap-glossary.xml
/sitemap-methodology.xml
```

When localization grows, sitemap organization MAY also reflect locales if that improves operations.

---

## SITEMAP-003 — LASTMOD MUST BE HONEST [MUST]

`lastmod` MUST change only when the page has materially changed.

Do not automatically set all pages to today's date on every deployment.

---

# 9. INDEXNOW

## INDEXNOW-001 — ENABLE FOR SUPPORTED ECOSYSTEMS [SHOULD]

THIENVAN SHOULD implement IndexNow for supported search engines.

Trigger when a canonical public URL is:

- created;
- materially updated;
- deleted.

Do not spam unchanged URLs continuously.

IndexNow is an acceleration mechanism, not a replacement for:

- sitemap;
- internal links;
- crawlable HTML;
- quality content.

---

# 10. INTERNATIONAL SEO

## I18N-001 — LOCALE URL ARCHITECTURE [MUST BEFORE GLOBAL SCALE]

Recommended structure:

```text
/vi/...
/en/...
```

Future examples:

```text
/ja/...
/ko/...
/es/...
/zh-hans/...
```

Use proper BCP 47 language/region codes when regional variants are genuinely required.

---

## I18N-002 — EACH LANGUAGE HAS ITS OWN URL [MUST]

A translated/localized page MUST have its own URL.

Do not dynamically replace the language on one canonical URL while expecting multiple language indexes.

---

## I18N-003 — SELF-CANONICAL PER LANGUAGE [MUST]

Each localized page SHOULD canonicalize to itself, not automatically to the English or Vietnamese version.

Example:

```text
/vi/... → canonical /vi/...
/en/... → canonical /en/...
```

---

## I18N-004 — HREFLANG [MUST WHEN EQUIVALENT LOCALES EXIST]

Equivalent localized pages MUST use reciprocal `hreflang`.

Requirements:

- valid language/region values;
- reciprocal links;
- canonical URLs;
- no redirects in hreflang targets;
- use `x-default` when a neutral/default selector page exists and it is appropriate.

---

## I18N-005 — DO NOT FORCE IP REDIRECT [MUST NOT]

Do not permanently force a user to another language solely by IP geolocation.

Preferred behavior:

- detect language as a hint;
- offer a clear language selector;
- remember user choice;
- allow all locale URLs to remain crawlable.

---

## I18N-006 — LOCALIZATION IS NOT WORD-FOR-WORD TRANSLATION [MUST]

Each target market SHOULD localize:

- terminology;
- query intent;
- examples;
- units/date formats;
- cultural context;
- search vocabulary;
- legal notices if required.

Do not mass-publish low-quality machine translations simply to multiply indexed pages.

---

# 11. SEARCH INTENT

## CONTENT-001 — ONE PRIMARY INTENT PER PAGE [MUST]

Every indexable page MUST have one primary search intent.

Examples:

- "Cung Mọc là gì?"
- "Không biết giờ sinh có lập bản đồ sao được không?"
- "Placidus là gì?"
- "Tropical và Sidereal khác nhau thế nào?"
- "Bát Tự khác Tử Vi như thế nào?"

A page MAY answer closely related subquestions but MUST NOT become an unfocused keyword dump.

---

## CONTENT-002 — USER QUESTION FIRST [SHOULD]

For beginner-facing content, prefer:

1. real-life question;
2. direct explanation;
3. technical concept;
4. deeper methodology.

Do not require beginners to understand specialist vocabulary before receiving value.

---

# 12. CONTENT TEMPLATE

## CONTENT-003 — STANDARD LONG-FORM STRUCTURE [SHOULD]

A long educational article SHOULD follow this order when appropriate:

```text
H1
→ Direct answer / Quick summary
→ Definition
→ Why it matters
→ How it works
→ Example
→ Practical interpretation
→ Limitations / uncertainty
→ Related concepts
→ Methodology / evidence
→ Sources
→ Author / reviewer
→ Published / updated date
→ Related articles
→ Relevant THIENVAN tool
```

Do not add sections mechanically when they provide no value.

---

## CONTENT-004 — ANSWER MUST EXIST IN HTML [MUST]

Important explanations MUST not exist only inside:

- canvas;
- SVG labels;
- image;
- video;
- animation;
- tooltip;
- client-only chart;
- downloadable PDF.

Charts and visuals MUST have an HTML/text alternative that explains the useful meaning.

---

# 13. EVIDENCE AND TRUST

## TRUST-001 — SEPARATE ASTRONOMY FACT FROM ASTROLOGY INTERPRETATION [MUST]

THIENVAN MUST distinguish between:

### Astronomical / calculational statement

Example:

- celestial coordinate;
- planetary position;
- time conversion;
- ephemeris value;
- house calculation method.

### Interpretive astrology statement

Example:

- personality symbolism;
- relationship interpretation;
- career tendency;
- symbolic meaning.

Do not cite astronomy agencies as proof that astrological interpretation has been scientifically validated.

---

## TRUST-002 — METHODOLOGY TRANSPARENCY [MUST]

Where relevant, pages SHOULD expose:

- school/system;
- zodiac type;
- house system;
- calculation assumptions;
- ephemeris/data source;
- ruleset/version;
- known limitations;
- update date.

This is both a trust layer and an AI/Search comprehension layer.

---

## TRUST-003 — AUTHORSHIP [SHOULD]

High-value educational content SHOULD show:

- author or editorial owner;
- reviewer where relevant;
- publication date;
- materially updated date;
- source/reference section.

Do not fabricate qualifications or expert identities.

---

## TRUST-004 — SOURCE QUALITY [MUST]

Prefer primary or authoritative sources for factual claims.

For THIENVAN topics, distinguish:

- primary astronomy/science data;
- historical texts;
- modern reference works;
- traditional interpretive sources;
- THIENVAN editorial synthesis.

Never invent citations.

---

# 14. PROGRAMMATIC SEO

## PSEO-001 — PROGRAMMATIC PAGES REQUIRE UNIQUE VALUE [MUST]

THIENVAN MAY generate pages from structured rules only when each page gives users genuinely distinct value.

Allowed example:

- a well-developed reference page for a specific placement with unique interpretation, evidence, links, and context.

Not allowed:

- thousands of nearly identical pages where only one noun changes;
- empty combination pages;
- keyword doorway pages;
- AI-generated filler pages with no reviewed value.

---

## PSEO-002 — INDEX QUALITY GATE [MUST]

A programmatically generated URL MUST NOT enter the sitemap until it passes the same quality gate as manually written public content.

---

# 15. CALCULATOR / TOOL SEO

## TOOL-001 — TOOL PAGE MUST NOT BE THIN [MUST]

An indexable calculator/tool landing page MUST contain useful crawlable content in addition to the form.

Recommended structure:

```text
H1
Short explanation
Calculator
What this tool calculates
Required input
How calculation works
How to read the result
Example
Limitations
Methodology
Related concepts
Related articles
```

Do not publish an indexable page that contains only a form and button unless a documented exception exists.

---

## TOOL-002 — PERSONAL RESULT IS NOT THE SEO LANDING PAGE [MUST]

The public calculator landing page and the user-specific result page are separate concepts.

The landing page may be indexable.

The personalized result page should normally be private or `noindex`, depending on architecture and privacy requirements.

---

# 16. INTERNAL LINKING

## LINK-001 — HUB AND CLUSTER ARCHITECTURE [MUST]

Each major THIENVAN school/system SHOULD use:

```text
Pillar / Hub
   ↓
Calculator / Tool
   ↓
Core Guides
   ↓
Glossary
   ↓
Life-topic Articles
   ↓
Comparison Articles
   ↓
Methodology / Evidence
```

---

## LINK-002 — NO ORPHAN PAGES [MUST]

Every indexable page MUST have at least one logical internal path from a crawlable hub or related page.

---

## LINK-003 — CONTEXTUAL ANCHORS [SHOULD]

Internal anchor text SHOULD explain the destination.

Good:

```text
Xem cách 12 nhà hoạt động trong bản đồ sao
```

Weak:

```text
Xem thêm
```

Generic anchors are acceptable for UI actions but SHOULD NOT be the only linking signal.

---

## LINK-004 — BREADCRUMBS [SHOULD]

Public hierarchical content SHOULD show breadcrumbs and use `BreadcrumbList` structured data when appropriate.

---

# 17. TITLE, DESCRIPTION, HEADINGS

## META-001 — UNIQUE TITLE [MUST]

Each indexable page MUST have a unique, descriptive `<title>`.

Title principles:

- match the main intent;
- include the topic naturally;
- avoid keyword stuffing;
- avoid repetitive site-wide boilerplate dominating the title;
- accurately describe the visible page.

Do not optimize to a rigid character count at the expense of clarity.

---

## META-002 — META DESCRIPTION [SHOULD]

Each important public page SHOULD provide a useful meta description.

The description should:

- summarize the page;
- be natural;
- avoid keyword repetition;
- avoid unsupported claims;
- improve click understanding.

Search engines may choose another snippet.

---

## META-003 — H1 [MUST]

THIENVAN UI standard: one primary visible H1 per page.

Subtopics use H2/H3 in logical hierarchy.

Do not choose heading levels based on visual size.

---

# 18. STRUCTURED DATA

## SCHEMA-001 — JSON-LD PREFERRED [SHOULD]

Use JSON-LD when structured data is appropriate.

Potential types include:

| Page | Potential schema |
|---|---|
| Homepage / company | `Organization`, `WebSite` |
| Article | `Article` or `BlogPosting` |
| Author | `Person` |
| Breadcrumb | `BreadcrumbList` |
| Calculator | `WebApplication` / suitable `SoftwareApplication` type |
| Image | `ImageObject` where useful |

Only use schema that accurately describes the visible page.

---

## SCHEMA-002 — NO FAKE RICH RESULT DATA [MUST NOT]

Do not fabricate:

- ratings;
- reviews;
- awards;
- author credentials;
- prices;
- availability;
- medical credentials.

Structured data MUST agree with visible content.

---

## SCHEMA-003 — FAQ IS FOR USERS FIRST [MUST]

FAQ sections may be used when users actually need them.

Do not mass-create FAQ blocks solely in an attempt to manipulate search features.

---

## SCHEMA-004 — PAYWALL / PAID CONTENT [SHOULD]

If public pages contain legitimately paywalled or subscription-restricted content, use appropriate structured data and accessibility markers supported by the relevant platforms.

Do not expose paid/private content merely for crawlers while hiding it from users.

---

# 19. AI SEARCH / GEO / AEO RULES

## AI-001 — CORE SEO REMAINS THE FOUNDATION [MUST]

Do not treat AI SEO as an isolated trick layer.

For Google generative Search experiences, core indexing and SEO quality remain foundational.

For third-party AI search systems, public HTML, clear semantics, source quality, crawler access, and authority remain the primary THIENVAN strategy.

---

## AI-002 — AI-READABLE CONTENT [SHOULD]

To improve machine comprehension, content SHOULD have:

- clear entities;
- direct definitions;
- explicit relationships;
- descriptive headings;
- concise answers followed by deeper explanation;
- tables when comparisons are genuinely tabular;
- source links;
- methodology links;
- stable URLs;
- dates where freshness matters.

This is done for clarity, not for keyword stuffing.

---

## AI-003 — NO UNSUPPORTED "AI OPTIMIZATION" GIMMICKS [MUST NOT]

Do not:

- generate separate AI-only articles;
- repeat the same answer in many paraphrases;
- insert fake quotations;
- fabricate consensus;
- stuff entity names;
- add hidden prompt text;
- use invisible instructions for AI bots;
- create fake expert citations;
- assume an unsupported file guarantees AI ranking.

---

## AI-004 — `LLMS.TXT` IS OPTIONAL [SHOULD NOT BLOCK RELEASE]

`llms.txt` MAY be added later as a compatibility/discovery aid for systems that choose to use it.

It MUST NOT be treated as:

- a Google ranking requirement;
- a substitute for robots.txt;
- a substitute for sitemap;
- a substitute for HTML;
- a release blocker.

If implemented, it must accurately reference canonical public resources.

---

# 20. PERFORMANCE

## PERF-001 — CORE WEB VITAL TARGETS [SHOULD]

Target at the 75th percentile of real-user experience when sufficient field data exists:

- LCP ≤ 2.5 s
- INP ≤ 200 ms
- CLS ≤ 0.1

---

## PERF-002 — VISUAL EFFECTS MUST NOT DAMAGE DISCOVERY [MUST]

Astrology wheels, galaxy effects, particles, animated stars, video, and decorative effects MUST NOT:

- block primary content rendering;
- cause major layout shift;
- make text unreadable;
- prevent keyboard use;
- excessively delay interaction;
- turn core information into image-only content.

Priority:

```text
Correctness
→ Useful content
→ Readability
→ Performance
→ Visual effects
```

---

# 21. IMAGE AND MEDIA SEO

## MEDIA-001 — MEANINGFUL ALT TEXT [MUST WHEN IMAGE IS INFORMATIVE]

Informative images SHOULD have descriptive alt text.

Decorative images SHOULD use empty alt where appropriate.

Do not stuff keywords into alt text.

---

## MEDIA-002 — CHARTS NEED TEXT EQUIVALENT [MUST]

Astrological charts, diagrams, and celestial visualizations MUST have text or structured alternatives when the chart contains information necessary to understand the page.

---

# 22. SEARCH ENGINE COVERAGE STRATEGY

## ENGINE-001 — UNIVERSAL COMPATIBILITY [MUST]

THIENVAN should rely on open web fundamentals:

- crawlable HTML;
- robots.txt;
- sitemap;
- canonical;
- HTTP status;
- internal links;
- metadata;
- structured data;
- fast mobile experience;
- quality content.

This forms the baseline for global engines, including engines not explicitly named in this document.

---

## ENGINE-002 — MARKET-SPECIFIC ADAPTERS [SHOULD]

When THIENVAN launches in a major market, configure the relevant webmaster/search platform.

Examples:

- Google Search Console
- Bing Webmaster Tools
- Yandex Webmaster
- Naver Search Advisor
- Baidu Search Resource Platform where applicable

Regional engine requirements are adapters on top of the global rules, not replacements for them.

---

# 23. CONTENT CLUSTER MODEL

Each major THIENVAN system SHOULD eventually contain:

```text
SYSTEM HUB
├─ Introduction
├─ Calculator
├─ Core concepts
├─ Glossary
├─ Beginner guides
├─ Advanced guides
├─ Life areas
│  ├─ Personality
│  ├─ Relationships
│  ├─ Career
│  ├─ Finance
│  └─ Other justified topics
├─ Comparisons
├─ Methodology
├─ Evidence / Sources
└─ Related systems
```

Example for Western Astrology:

```text
Western Astrology
├─ Birth chart
├─ Sun
├─ Moon
├─ Ascendant
├─ 12 signs
├─ 12 houses
├─ Planets in signs
├─ Planets in houses
├─ Aspects
├─ Retrograde
├─ Tropical vs Sidereal
├─ House systems
└─ Methodology
```

Do not publish empty cluster nodes merely to create URLs.

---

# 24. MARKETING + SEO FUNNEL

## FUNNEL-001 — ORGANIC TRAFFIC MUST CONNECT TO PRODUCT VALUE [SHOULD]

Preferred THIENVAN funnel:

```text
Google / Bing / AI Search / Social
             ↓
Useful answer or reference page
             ↓
Relevant free calculator
             ↓
Fast useful result
             ↓
"Why did THIENVAN reach this conclusion?"
             ↓
Evidence / methodology / deeper explanation
             ↓
Save profile
             ↓
Cross-system insight / deeper report
             ↓
Paid value when justified
```

SEO success is not measured only by pageviews.

---

## FUNNEL-002 — NO AGGRESSIVE INTERRUPTION [MUST]

Do not destroy organic UX with:

- forced signup before basic promised value;
- full-screen popups on entry;
- deceptive urgency;
- fake scarcity;
- misleading fortune claims;
- repeated subscription walls before user sees usefulness.

---

# 25. MEASUREMENT

## MEASURE-001 — SEARCH METRICS [MUST]

Track, where platforms provide the data:

- indexed pages;
- impressions;
- clicks;
- CTR;
- query;
- landing page;
- average position;
- locale;
- device;
- branded vs non-branded;
- Core Web Vitals.

---

## MEASURE-002 — AI SEARCH VISIBILITY [SHOULD]

Track:

- referral traffic from ChatGPT;
- referral traffic from Perplexity;
- referral traffic from Claude where identifiable;
- Google generative Search visibility when reporting is available;
- top cited/visited content clusters;
- conversion behavior of AI-referred sessions.

Do not invent attribution if the platform/browser does not expose reliable referrer data.

---

## MEASURE-003 — BUSINESS METRICS [MUST]

SEO reporting SHOULD connect to:

- calculator starts;
- calculator completions;
- saved profiles;
- return visits;
- report views;
- paid conversion;
- revenue where appropriate.

A traffic increase with poor trust or zero useful engagement is not automatically success.

---

# 26. CONTENT FRESHNESS

## FRESH-001 — UPDATE WHEN REALITY CHANGES [MUST]

Update content when:

- methodology changes;
- ruleset changes;
- calculation implementation changes;
- factual source changes;
- product UI changes materially;
- legal/policy information changes;
- search-engine crawler guidance changes.

Do not change visible dates merely to simulate freshness.

---

# 27. SEO FOR HIGH-RISK INTERPRETIVE TOPICS

## SAFESEO-001 — NO FALSE CERTAINTY [MUST]

For astrology/divination-style content, avoid guaranteed claims such as:

- guaranteed disease diagnosis;
- guaranteed financial profit;
- guaranteed death prediction;
- guaranteed relationship outcome;
- guaranteed legal outcome.

SEO titles and snippets MUST NOT exaggerate certainty beyond the underlying product.

---

## SAFESEO-002 — HEALTH / FINANCE / LEGAL BOUNDARIES [MUST]

If interpretive content touches health, finance, or legal matters:

- clearly separate symbolic/interpretive material from professional advice;
- avoid diagnostic certainty;
- avoid presenting divination as a substitute for qualified professional care;
- use appropriate disclaimers in the experience when required.

---

# 28. CODING / IMPLEMENTATION RULES FOR CODEX

## CODEX-SEO-001 — DO NOT DECLARE SEO COMPLETE WITHOUT QA [MUST]

A task that adds or changes a public page is not complete until relevant SEO acceptance checks pass.

---

## CODEX-SEO-002 — CENTRALIZE METADATA [SHOULD]

Implement reusable helpers/components for:

- title;
- description;
- canonical;
- robots;
- Open Graph where appropriate;
- hreflang;
- structured data;
- breadcrumbs.

Avoid page-by-page inconsistent handcrafted metadata when the same rule can be enforced centrally.

---

## CODEX-SEO-003 — ROUTE CLASSIFICATION [MUST]

Every new route must declare or inherit its indexing class:

```text
PUBLIC_INDEXABLE
PUBLIC_NOINDEX
PRIVATE_AUTH
SYSTEM_INTERNAL
```

---

## CODEX-SEO-004 — SITEMAP GENERATION [MUST]

Sitemap generation MUST use route/content truth, not blindly enumerate application routes.

---

## CODEX-SEO-005 — TEST VIEW-SOURCE [MUST]

For public pages, QA MUST verify that primary SEO-critical content and metadata are present in the rendered HTML source expected by crawlers.

---

## CODEX-SEO-006 — NO SEO COPY FOR UNAPPROVED RULES [MUST]

Codex must not fabricate interpretive copy for missing rules merely to make a page indexable.

If the approved domain rule/content is missing, the page should remain unpublished or non-indexable until completed.

---

# 29. PUBLIC PAGE SEO ACCEPTANCE GATE

A public page is `SEO_READY = TRUE` only when all applicable checks pass.

```text
[ ] Route classification defined
[ ] Correct HTTP status
[ ] HTTPS
[ ] Primary content crawlable
[ ] Primary content available in meaningful HTML
[ ] One clear page topic / primary intent
[ ] Unique title
[ ] Useful meta description where appropriate
[ ] One primary H1
[ ] Logical H2/H3 hierarchy
[ ] Self-canonical or documented canonical target
[ ] No conflicting canonical
[ ] Robots directives correct
[ ] Sitemap inclusion correct
[ ] No private/personal data exposed
[ ] No unwanted parameter-index duplicates
[ ] Internal inbound link exists
[ ] Relevant outbound/internal contextual links exist
[ ] Breadcrumbs where appropriate
[ ] Structured data valid where applicable
[ ] Structured data matches visible content
[ ] Author/reviewer/date shown where applicable
[ ] Sources/evidence shown where applicable
[ ] Astronomy fact and astrology interpretation are not misleadingly conflated
[ ] Calculator page is not thin
[ ] Personalized result page is not unintentionally indexable
[ ] Images have correct alt treatment
[ ] Important charts have text alternatives
[ ] Mobile usable
[ ] Performance acceptable
[ ] Locale metadata correct
[ ] hreflang correct when localized equivalent exists
[ ] No forced IP-only language trap
[ ] Googlebot not unintentionally blocked
[ ] Bingbot not unintentionally blocked
[ ] Applebot not unintentionally blocked
[ ] OAI-SearchBot not unintentionally blocked
[ ] PerplexityBot not unintentionally blocked
[ ] Claude-SearchBot not unintentionally blocked
[ ] CDN/WAF does not unintentionally block intended crawlers
[ ] IndexNow event triggered where applicable
[ ] Analytics/Search measurement present
[ ] No fake ratings/reviews/credentials
[ ] No bot-only or cloaked content
[ ] No unapproved SEO-generated interpretation rule
```

---

# 30. SITE-WIDE TECHNICAL SEO ACCEPTANCE GATE

Before a major production release:

```text
[ ] robots.txt returns 200
[ ] robots.txt references valid sitemap
[ ] sitemap.xml returns 200
[ ] sitemap contains only canonical indexable URLs
[ ] no private pages in sitemap
[ ] canonical host is consistent
[ ] HTTP→HTTPS behavior correct
[ ] www/non-www behavior consistent
[ ] trailing-slash convention consistent
[ ] 404 returns genuine 404
[ ] removed permanent content uses appropriate status/redirect
[ ] redirect chains checked
[ ] staging environment cannot be indexed
[ ] production is not accidentally noindex
[ ] search crawlers are not blocked by firewall
[ ] metadata renders server-side where required
[ ] structured data validation checked
[ ] hreflang validation checked for multilingual release
[ ] Core Web Vitals monitored
[ ] Search Console configured
[ ] Bing Webmaster configured
[ ] target-market webmaster tools configured
[ ] IndexNow configured where applicable
[ ] analytics distinguishes organic/search/AI referrals where possible
```

---

# 31. RELEASE PHASES

## P0 — FOUNDATION — REQUIRED BEFORE LARGE SEO SCALE

Complete:

- route indexing classification;
- canonical architecture;
- robots.txt;
- sitemap;
- HTTP/HTTPS/host normalization;
- server-rendered crawlable primary content;
- metadata framework;
- private-result rules.

## P1 — SEARCH ENHANCEMENT

Complete:

- structured data;
- breadcrumbs;
- IndexNow;
- content hubs;
- internal-link system;
- methodology/evidence pages.

## P2 — CONTENT SCALE

Complete:

- keyword/search-intent map;
- pillar/cluster architecture;
- tool landing pages;
- glossary;
- comparison content;
- quality-gated programmatic SEO.

## P3 — INTERNATIONAL

Complete before opening each language at scale:

- locale routes;
- localized metadata;
- localized content;
- hreflang;
- locale sitemap QA;
- local search terminology;
- target-market webmaster tools.

## P4 — AI DISCOVERY OPTIMIZATION

Complete:

- AI crawler access verification;
- WAF verification;
- AI referral analytics;
- citation/source architecture;
- direct-answer content quality;
- optional `llms.txt` only if justified.

---

# 32. SEARCH / AI POLICY REVIEW SCHEDULE

Crawler names, AI platform policies, and search features can change.

Therefore:

- review official crawler documentation at least quarterly during active growth;
- re-check before changing robots.txt;
- log bot-policy changes in `DECISION_LOG.md`;
- never copy third-party crawler lists without verifying the vendor's current official documentation.

---

# 33. NON-NEGOTIABLE RULES SUMMARY

The following rules are permanent unless explicitly superseded by a newer approved rulebook:

1. Calculation correctness outranks SEO.
2. Private user data is not SEO inventory.
3. Search content must remain useful to humans.
4. Search bots and training bots are separate policy categories.
5. THIENVAN should be open to legitimate search discovery unless a documented decision says otherwise.
6. One page should have one clear primary intent.
7. Public pages need stable canonical URLs.
8. Sitemap contains only canonical indexable URLs.
9. Tool pages must provide useful explanatory content.
10. Important meaning cannot exist only in a visual/chart.
11. International versions use dedicated locale URLs and correct hreflang.
12. Structured data must match visible truth.
13. No fake reviews, credentials, citations, ratings, or scientific validation.
14. No mass thin programmatic pages.
15. No cloaking or AI-only content.
16. `llms.txt` is optional, not a release requirement.
17. SEO must lead users toward useful THIENVAN product value, not just traffic.
18. Every public page must pass the SEO acceptance gate before being marked complete.

---

# 34. OFFICIAL REFERENCE SOURCES

These references are used to maintain this rulebook. Re-check them when platform behavior changes.

## Google

- Google Search Central — AI features and websites<br>
  https://developers.google.com/search/docs/appearance/ai-features

- Google Search Central — Optimizing for generative AI features<br>
  https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

- Google Search Central — Canonicalization<br>
  https://developers.google.com/search/docs/crawling-indexing/canonicalization

- Google Search Central — Localized versions / hreflang<br>
  https://developers.google.com/search/docs/specialty/international/localized-versions

- Google Search Central — Robots meta tag<br>
  https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag

- Google Search Central — Structured data policies<br>
  https://developers.google.com/search/docs/appearance/structured-data/sd-policies

- Google Search Central — Core Web Vitals<br>
  https://developers.google.com/search/docs/appearance/core-web-vitals

## OpenAI

- OpenAI crawler documentation<br>
  https://developers.openai.com/api/docs/bots

## Anthropic

- Claude crawler documentation<br>
  https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler

## Perplexity

- Perplexity crawlers<br>
  https://docs.perplexity.ai/docs/resources/perplexity-crawlers

## Apple

- About Applebot<br>
  https://support.apple.com/119829

## Bing / IndexNow

- Bing Webmaster Tools<br>
  https://www.bing.com/webmasters/

- IndexNow protocol documentation<br>
  https://www.indexnow.org/documentation

## Yandex

- Yandex Webmaster — canonical URLs<br>
  https://yandex.com/support/webmaster/en/robot-workings/canonical

- Yandex Webmaster — sitemap<br>
  https://yandex.com/support/webmaster/en/controlling-robot/sitemap

## Naver

- Naver Search Advisor — SEO guide<br>
  https://searchadvisor.naver.com/guide/seo-help

---

# 35. CHANGE CONTROL

Any future modification to this rulebook must:

1. state the reason;
2. cite the relevant official platform change if external;
3. identify affected routes/modules;
4. preserve privacy and calculation integrity;
5. update the version number;
6. record material decisions in `DECISION_LOG.md`.

Suggested versioning:

```text
2.0.x = clarification / minor technical adjustment
2.x.0 = new rule family / meaningful search platform change
3.0.0 = major architecture or policy change
```

---

**END OF THIENVAN GLOBAL SEO & AI SEARCH RULEBOOK v2.0.0**
