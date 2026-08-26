# Thien Van UI/UX/SEO Gap Audit

Ngay audit: 2026-08-03.

Nguon doi chieu chinh: `docs/THIENVAN_UI_UX_SEO_RULES.md` version 1.0.0. Audit nay la ra soat code va tai lieu hien tai, khong phai redesign va khong thay doi calculation engine. Delta governance cua rulebook duoc sync ngay 2026-08-09 vao decision log, QA checklist va task queue.

## 1. Tom tat trang thai hien tai

Website hien co hai route chinh:

- `/`: trang nhap du lieu sinh, dung `BirthInformationForm`.
- `/ket-qua`: trang ket qua ca nhan doc query string, tinh birth time va goi `calculateWesternAstrology`.

Trang nhap du lieu da co nen tang tot cho MVP: mot form duy nhat, khong bat nhap email/ho ten, toa do than thien hon truoc, co luu draft/profile localStorage, co validation va thong diep privacy tai diem luu. Trang ket qua da co tab bon truong phai, module Tay phuong co bo ba cot loi, hanh tinh ca nhan, hanh tinh xa hoi, chart SVG, bang du lieu thay the, error/empty states va browser smoke truoc do cho thay desktop/mobile khong horizontal overflow.

Khoang cach lon nhat voi rulebook nam o governance SEO va thong tin dai: `/ket-qua` la noi dung ca nhan nhung chua thay metadata `noindex`; cac tab/module chua co URL/state rieng; chua co hai che do Tong quan/Chuyen sau; chua co muc luc/deep link cho ket qua dai; homepage/calculator public con thieu noi dung SSR ve phuong phap, gioi han, FAQ va internal links.

## 2. Phan loai rulebook

### Bat buoc

- UI/SEO task phai doc rulebook truoc khi sua.
- Mot ho so sinh dung cho bon he, khong tao bon form rieng.
- UI khong tu tinh lai du lieu thien van/chiem tinh; calculation engine la nguon du lieu.
- Moi ket luan quan trong co rule ID, version va evidence.
- Beginner-first, expert-deep: insight truoc, du lieu ky thuat sau/progressive disclosure.
- Khong tron Response Framework vao calculation/interpretation engine.
- Desktop/mobile/accessibility co ban va khong horizontal overflow.
- Ket qua ca nhan mac dinh `noindex` va khong vao sitemap.
- Khong tao thin content, khong hua chinh xac tuyet doi, khong ban noi so.
- Khong hy sinh Core Web Vitals cho hieu ung nang.

### Khuyen nghi hoac can thiet ke them

- Menu desktop toi da 6 muc cap mot va hub architecture theo bon truong phai.
- Hai che do Tong quan/Chuyen sau.
- Thu tu homepage day du, result sample, FAQ va content hub.
- ReportTOC sticky/dropdown, glossary tooltip, breadcrumb, structured data.
- Module code splitting theo tung truong phai khi cac module khac bat dau co logic rieng.

### Co the kiem thu tu dong

- Mot H1 tren moi route.
- Metadata title/description/robots/canonical neu co.
- `/ket-qua` co `noindex`.
- Form label, aria-invalid, aria-describedby, focus field loi dau tien.
- Accordion co `aria-expanded`.
- Tab panel co role/aria.
- Chart co role/title/desc va bang du lieu thay the.
- Khong horizontal overflow tai 360/390/768/1280 bang browser E2E.
- Khong console error/warning/hydration warning.
- Tests khang dinh UI khong mutate calculation result.

### Can kiem tra thu cong

- Nguoi moi co hieu ket qua trong 60 giay dau khong.
- Noi dung co de doc, do dai dong 65-75 ky tu va khong tao tuong chu khong.
- Terminology co du glossary tai cho khong.
- Tone co tranh hù doa, phan tuyet doi va noi dung mong khong.
- Mobile table horizontal scroll co du affordance cho nguoi dung pho thong khong.
- Contrast thuc te tren man hinh va focus state co ro khong.

### Mau thuan hoac chua ro voi kien truc hien tai

- Rule `UI-IA-001` yeu cau moi module co URL, state va quyen truy cap rieng; code hien tai dung state client trong `ResultTabs`, tab khong phan anh vao URL.
- Rule `UI-RESULT-001` uu tien insight truoc chart tren mobile; code Tay phuong hien da dat interpretation truoc chart, nhung chua co tom tat 3-5 insight cap report.
- Rule `UI-RESULT-005` yeu cau TOC/deep link; route ket qua da co muc luc native anchors va back-to-top cho phan Tay phuong trong `UISEO-P1-002`.
- Rule `SEO-CALC-001` yeu cau calculator public khong chi co form; homepage hien gan nhu la form + mo ta ngan, can quyet dinh co tach `/lap-ho-so` thanh calculator SEO public hay giu `/` la app surface.
- Rule `SEO-CALC-003` yeu cau ket qua ca nhan `noindex`; route hien khong co metadata rieng.
- Proposal `DEC-UI-001` trong rulebook trung ID voi decision log hien co; da giu nghia cu cua `DEC-UI-001` va remap proposal beginner-first thanh `DEC-UI-005`.

## 3. Nhung diem da dap ung

| Nhom | Trang/khu vuc | Bang chung | Rule lien quan |
| --- | --- | --- | --- |
| Mot form dung chung | Trang nhap du lieu | `src/app/page.tsx`, `src/components/birth-information-form.tsx` co mot form nhap birthDate/hour/minute/coordinates/timezone/gender. | UI-IA-001, UI-FORM-001 |
| Khong ep dang ky truoc | Trang nhap du lieu | Form cho tinh ket qua truc tiep, khong yeu cau email/tai khoan. | TRUST-004 |
| Du lieu sinh khong mat khi quay lai | Trang nhap du lieu | `BirthInformationForm` doc/ghi draft va profile bang `src/lib/birth-profile-storage.ts`. | UI-FORM-007, UI-RESULT-008 |
| Privacy tai diem luu | Thong tin da luu | Text `privacyMessage` noi du lieu luu tren trinh duyet va co the xoa. | TRUST-003 |
| Validation va focus loi | Form submit | `handleSubmit` validate, set errors va focus field loi dau tien. | UI-FORM-007, UI-A11Y-004 |
| UI khong tu tinh lai calculation Tay phuong | Trang ket qua | `src/app/ket-qua/page.tsx` goi `calculateWesternAstrology`; `result-tabs.tsx` chi doc `WesternAstrologyResult`. | Governance, TRUST-001 |
| Evidence cho interpretation | Core/personal/social planets | `WesternCoreTriad`, `WesternPersonalPlanets`, `WesternSocialPlanets`; status ghi evidence co rule ID/version/body/sign/longitude. | UI-RESULT-002, TRUST-001 |
| Chart co alternative data | Vong tron la so | `result-tabs.tsx` render chart va cac bang bodies/angles/houses/aspects. | UI-RESULT-007 |
| Accessibility chart co nen tang | Vong tron la so | `docs/WESTERN_ASTROLOGY_SPEC.md` ghi SVG co title/desc/aria, hover/touch/keyboard focus. | UI-A11Y-003, UI-RESULT-007 |
| Empty/error states co ban | Result/form | Invalid result alert, Placidus error message, aspects empty text, saved profiles empty text. | EmptyState/ErrorState |
| Browser smoke desktop/mobile gan nhat dat | Result Tay phuong | `docs/IMPLEMENTATION_STATUS.md` ghi desktop 1280x720 va mobile 390x844 khong horizontal overflow/console warning. | UI-A11Y-001 |

## 4. Nhung diem chua dap ung

| ID | Uu tien | Van de | Bang chung | Phan loai | Rule |
| --- | --- | --- | --- | --- | --- |
| UISEO-GAP-001 | P1 | DONE: Ket qua ca nhan `/ket-qua` da co route metadata `robots: { index: false, follow: false }`; repository hien chua co sitemap nen khong tao sitemap moi trong task nay. | `src/app/ket-qua/page.tsx`; validation `npm run lint` va `npm run build` pass. | Da xu ly | SEO-CALC-003 |
| UISEO-GAP-002 | P1 | Tab bon truong phai chua co URL/state rieng; active tab chi la React state, khong deep link duoc. | `src/components/result-tabs.tsx` dung `useState<TabId>`, button tabs khong dong bo search param/hash/path. | Can thiet ke/phe duyet | UI-IA-001 |
| UISEO-GAP-003 | P1 | Chua co hai che do Tong quan/Chuyen sau; nguoi moi va nguoi chuyen doc cung mot dong thong tin dai. | `WesternAstrologyPanel` render tat ca interpretation, chart, bang ky thuat trong mot flow. | Can thiet ke/phe duyet | UI-IA-003 |
| UISEO-GAP-004 | P1 | DONE: Ket qua Tay phuong da co muc luc "Di nhanh den", stable section IDs, native anchors va link quay lai dau phan Tay phuong. | `src/components/result-tabs.tsx`; validation `npm run lint`, `npm run build`, desktop smoke va mobile 390 smoke pass. | Da xu ly | UI-RESULT-005 |
| UISEO-GAP-005 | P1 | Homepage/calculator public con thieu noi dung SSR ve "ban se nhan duoc gi", phuong phap tinh, gioi han, FAQ, internal links va disclaimer. | `src/app/page.tsx` chi co H1, mo ta ngan va form. | Can thiet ke/phe duyet | SEO-CALC-001, SEO-CALC-002 |
| UISEO-GAP-006 | P1 | Chua co hub URL/content architecture cho bon truong phai; navigation hien tai chi co brand va label "Ho so sinh". | `src/components/site-header.tsx`; khong thay routes `/chiem-tinh-tay-phuong`, `/bat-tu`, `/tu-vi`, `/thu-vien`. | Can thiet ke/phe duyet | SEO-IA-001, UI-IA-002 |
| UISEO-GAP-007 | P2 | DONE: Form toa do da hien thi vi du thap phan, vi du DMS, giai thich N/S/E/W va huong dan "Cach sao chep toa do tu Google Maps". | `src/components/birth-information-form.tsx`; validation `npm test -- coordinates`, `npm test`, `npm run lint`, `npm run build` va browser smoke mobile 390 pass. | Da xu ly | UI-FORM-002 |
| UISEO-GAP-008 | P2 | Chua co thong bao "Toi khong chac gio sinh" va phan nao kem chinh xac khi gio sinh khong chac. | Form bat buoc hour/minute, khong co accuracy notice. | Can thiet ke/phe duyet | UI-FORM-004, AccuracyNotice |
| UISEO-GAP-009 | P2 | Evidence disclosure can duoc audit lai aria-expanded/keyboard bang browser vi code doc duoc chua xac nhan day du cho tat ca component. | Chua doc them component evidence do gioi han shell; status noi evidence mo duoc trong smoke. | Can nghien cuu them | UI-A11Y-003 |
| UISEO-GAP-010 | P2 | DONE: Bon bang du lieu Tay phuong giu semantic table va du lieu goc; moi bang co scroll region duoc gan nhan/focus, chi dan vuot/phim mui ten tren mobile va khong overflow toan trang tai 360/390/768/1280. | `src/components/result-tabs.tsx`, `e2e/wa-p5-001.spec.ts`; WA-P5-002 targeted Chromium 4/4, full suite 565/565, lint va build PASS. | Da xu ly | UI-A11Y-001, UI-RESULT-007 |
| UISEO-GAP-011 | P2 | Chua co glossary tooltip/link tai cho cho ASC, MC, Orb, Placidus va cac thuat ngu nhap mon. | `result-tabs.tsx` hien term ky thuat truc tiep; khong thay `GlossaryTooltip`. | Can thiet ke/phe duyet | UI-TYPE-005 |
| UISEO-GAP-012 | P2 | Metadata public con toi thieu; chua thay canonical, Open Graph, breadcrumb/schema/sitemap/robots. | `src/app/layout.tsx` chi co title/description global; chua doc thay routes sitemap/robots trong file list. | Co the sua ngay mot phan | SEO-ONPAGE, SEO-SCHEMA, SEO-TECH |
| UISEO-GAP-013 | P2 | Chua co automated browser E2E cho input -> result -> tab Tay phuong -> evidence -> responsive/no overflow. | `docs/WESTERN_ASTROLOGY_SPEC.md` ghi smoke test la kiem tra thu cong trong Codex. | Co the sua ngay | QA, UI-A11Y-001 |
| UISEO-GAP-014 | P2 | Chua co Core Web Vitals measurement/Lighthouse gate; performance risk lon hon khi them module moi. | `package.json` chi co test/lint/build; docs chua ghi Lighthouse automated. | Can quyet dinh cong cu/cadence | PERF-001, PERF-002, PERF-003, PERF-004, PERF-005 |
| UISEO-GAP-015 | P3 | Design system toi thieu trong rulebook chua duoc tach thanh components chung nhu PageHeader, ReportTOC, GlossaryTooltip, AccuracyNotice, Disclaimer. | Code hien co `SiteHeader`, form, tabs, chart, planet components; chua thay components dung chung tuong ung. | Can thiet ke/phe duyet | Design system 9.1 |
| UISEO-GAP-016 | P3 | Chua co sitemap tach pages/tools/articles/glossary/images va Search Console KPI workflow; phu hop sau khi co content hubs. | Chua thay file sitemap/robots trong danh sach `src/app`. | Can nghien cuu them | SEO-TECH-002, SEO-TECH-005 |
| UISEO-GAP-017 | P2 | Governance cho content hub/bai viet chua co author, reviewer, ngay xuat ban/cap nhat, ruleset/truong phai lien quan va disclaimer tai cho. | Hien chua co content hub production; day la acceptance bat buoc truoc khi tao bai/hub indexable. | Can gan vao task content | CONTENT-004, CONTENT-007, CONTENT-008 |

## 5. Uu tien trien khai de tranh sua UI nhieu lan

1. Khoa SEO private/public truoc: them `noindex` cho `/ket-qua`, xac dinh canonical/robots/sitemap baseline. Viec nay it anh huong giao dien va giam rui ro index du lieu ca nhan.
2. Thiet ke information architecture: quyet dinh route/module state cho bon truong phai, co dung `/lap-ho-so` rieng hay giu `/`, va hub URL nao uu tien.
3. Tao result navigation layer: section IDs, ReportTOC, "Tong quan/Chuyen sau", nut quay lai dau trang. Nen lam truoc khi them Neptune/Pluto hoac house/aspect interpretation de tranh sap xep lai nhieu lan.
4. Cai thien form guidance va accuracy notice: toa do decimal/DMS, cach copy Google Maps, "khong chac gio sinh", privacy text day du.
5. Tach components design system can dung lai: InterpretationCard/EvidenceDisclosure/DataTable/GlossaryTooltip/Disclaimer/EmptyState/ErrorState/LoadingState.
6. Them automated browser smoke responsive/a11y/performance, sau do moi tiep tuc mo rong noi dung interpretation lon.
7. Xay content/SEO hubs sau khi IA duoc phe duyet, tranh viet thin content hoac route se phai doi.

## 6. Mapping rulebook delta -> task queue

| Rule/delta | Xu ly |
| --- | --- |
| `DEC-UI-001` proposal beginner-first bi trung ID | Giu `DEC-UI-001` cu; remap thanh `DEC-UI-005` trong `docs/DECISION_LOG.md`. |
| `UI-IA-001` module co URL/state/quyen truy cap rieng | Map vao `UISEO-P1-003`, giu `PROPOSED` vi can owner chot route strategy. |
| `UI-IA-003`, `UI-RESULT-001`, `UI-RESULT-002` | Map vao `UISEO-P1-005`, giu `PROPOSED` vi can owner chot content model. |
| `UI-RESULT-005` | Map vao `UISEO-P1-002`, da `DONE`. |
| `SEO-CALC-003` | Map vao `UISEO-P1-001`, da `DONE`. |
| `SEO-CALC-001`, `CONTENT-004`, `CONTENT-007`, `CONTENT-008` | Map vao `UISEO-P1-004`, giu `PROPOSED`. |
| `PERF-001` den `PERF-005` | Tao `UISEO-P2-007`, `PROPOSED` vi can chot cong cu/cadence do. |
| Design system 9.1-9.3 | Map vao `UISEO-P3-001`, giu `PROPOSED`. |

## 7. Tieu chi nghiem thu co the kiem tra

- DONE: `/ket-qua` co robots metadata `noindex, nofollow`; repository hien chua co sitemap nen khong xuat hien trong sitemap.
- DONE: Phan Tay phuong co muc luc native anchors, stable section IDs va link quay lai dau phan; desktop/mobile 390 smoke pass.
- Desktop 1280px, tablet 768px, mobile 390px va 360px khong co horizontal overflow toan trang.
- Form co decimal example, DMS example, huong dan Google Maps, validation inline va khong mat input sau loi.
- Submit loi focus vao field loi dau tien va screen reader doc duoc error lien quan.
- Tab/module co URL hoac state linkable theo quyet dinh IA; reload/share khong mat context module.
- Result Tay phuong co Tong quan, Chuyen sau, section nav/deep links va chart alternative table.
- Moi interpretation card co mot y chinh, summary ngan va evidence disclosure voi rule ID/version/evidence.
- Homepage/calculator public co H1, meta description, noi dung SSR ve phuong phap, gioi han, FAQ/disclaimer va internal links huu ich.
- Automated test/smoke co case input -> result -> Tay phuong -> evidence -> chart -> mobile no overflow.
- `npm test`, `npm run lint`, `npm run build` pass khi co sua code/config.

## 8. Tong hop uu tien

- P0: 0
- P1: 6
- P2: 9
- P3: 2

Khong co P0 duoc ghi nhan trong pham vi audit tai lieu/code da doc, vi chua thay loi gay sai du lieu calculation hoac can tro su dung co ban. Rui ro SEO/privacy `noindex` cho route ket qua ca nhan da duoc xu ly trong `UISEO-P1-001`.

## 9. Gioi han audit

- Da doc truc tiep: `src/app/page.tsx`, `src/app/ket-qua/page.tsx`, `src/app/layout.tsx`, `src/components/birth-information-form.tsx`, `src/components/result-tabs.tsx`, `src/components/site-header.tsx`, `package.json` va cac tai lieu governance/status.
- Khong chay browser smoke moi trong task nay do nhiem vu chi sua tai lieu va shell/escalation bi gioi han sau khi doc ngu canh. Browser evidence dua tren `docs/IMPLEMENTATION_STATUS.md` va `docs/WESTERN_ASTROLOGY_SPEC.md`.
- Chua doc lai toan bo `western-chart-wheel.tsx` va cac component interpretation trong luot nay sau khi bi gioi han shell; cac nhan dinh ve chart/evidence dua tren status/spec va code `result-tabs.tsx` da doc.
