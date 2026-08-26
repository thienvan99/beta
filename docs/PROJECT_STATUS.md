# Trạng thái dự án Thiên Vận

Cập nhật trạng thái kỹ thuật: 2026-08-26.
Cập nhật định hướng chiến lược: 2026-08-25.

## Mục tiêu tổng thể

Thiên Vận là website lập và trình bày dữ liệu cho bốn hệ thống:

1. Bát Tự.
2. Tử Vi.
3. Chiêm tinh Tây phương.
4. Chiêm tinh Vệ Đà.

Dự án đi theo lộ trình tổng thể sáu giai đoạn. Chiêm tinh Tây phương là hệ thống đầu tiên được triển khai để xác lập kiến trúc calculation, interpretation, kiểm định và giao diện trước khi mở rộng sang ba hệ thống còn lại.

## Lộ trình tổng thể sáu giai đoạn

| Giai đoạn | Phạm vi | Trạng thái |
| --- | --- | --- |
| 1 | Nền tảng dữ liệu sinh dùng chung | Hoàn thành |
| 2 | Chiêm tinh Tây phương: calculation, kiểm định, trực quan hóa và luận giải | Đang thực hiện; calculation, luận giải Phase 1, Phase 2A Mercury/Venus/Mars × 12 cung và WA-P1-001 đến WA-P1-005 Jupiter/Saturn/Uranus/Neptune/Pluto × 12 cung đã hoàn thành |
| 3 | Chiêm tinh Vệ Đà | Chưa bắt đầu |
| 4 | Bát Tự | Chưa bắt đầu |
| 5 | Tử Vi | Chưa bắt đầu |
| 6 | Tổng hợp liên trường phái và hoàn thiện phát hành | Chưa bắt đầu |

Không được thu hẹp tài liệu hoặc kiến trúc thành dự án chỉ dành cho Chiêm tinh Tây phương.


## Kiến trúc sản phẩm dài hạn

Phần này là **target architecture**, không phải trạng thái implementation hiện tại và không thay đổi thứ tự vertical slice đang có trong `CODEX_TASK_QUEUE.md`.

```text
Shared Birth Profile
        ↓
School Calculation Engines
        ↓
School Rule Engines
        ↓
Intra-school Synthesis
        ↓
Temporal Engines
        ↓
Cross-school Comparison
        ↓
Personal Life Map / Structured History
        ↓
Response + Action Layer
        ↓
Optional AI Interface
```

Ý nghĩa:

- Chiêm tinh Tây phương hiện là **School Engine đầu tiên** được xây sâu để xác lập calculation, validation, rule, evidence và UI.
- Vệ Đà, Bát Tự và Tử Vi phải có calculation/interpretation riêng trước khi đối chiếu liên trường phái.
- Temporal Engines gồm các cơ chế timing tương ứng của từng hệ như transit, dasha, đại vận/lưu niên, đại hạn/tiểu hạn/lưu niên; mỗi phần cần specification và validation riêng.
- Cross-school comparison chỉ dùng `convergence`, `complementary`, `divergence`; không dùng voting hoặc tỷ lệ “bao nhiêu hệ xác nhận”.
- Personal Life Map/Structured History chỉ được triển khai với consent phù hợp, khả năng sửa/xóa và không được coi feedback đời thật là bằng chứng tự động chứng minh một trường phái.
- Response + Action Layer tuân theo `docs/THIENVAN_RESPONSE_FRAMEWORK.md`.
- AI/LLM, nếu dùng, là lớp giao tiếp/biên tập tùy chọn phía trên structured data; không phải nguồn tính toán hoặc nguồn chân lý chuyên môn.
- Việc ghi target architecture vào status **không có nghĩa** các lớp Temporal, Cross-school, Life Map hoặc AI Interface đã được triển khai.

## Nguyên tắc dài hạn: “Từ bầu trời đến lá số / Giải thích từ gốc”

`DEC-ORIGIN-001` canonicalize nguyên tắc owner-approved **“Từ bầu trời đến lá số / Giải thích từ gốc / Explain from origin”**. Khi có đủ dữ liệu, specification và evidence, Thiên Vận phải hướng tới việc cho người dùng truy ngược:

`Interpretation → rule/evidence → cấu trúc lá số → dữ liệu/lịch pháp nền → birth context`

Sản phẩm không chỉ trả lời “lá số nói gì”, mà còn giải thích “vì sao hệ thống tạo ra kết quả đó”. Đây là target architecture dài hạn, không phải capability đã hoàn thành hoặc một task code tự động được mở.

```text
Shared Birth Context
├ Solar / Observer Astronomical Context
├ Western Projection
├ future Bazi Projection
└ future Zi Wei Projection
```

- `Shared Birth Context` chỉ chia sẻ factual birth input/provenance cần thiết qua các typed boundary; không tạo God object.
- Shared context không có nghĩa các trường phái dùng cùng hệ tọa độ, cùng ontology hoặc xác nhận khoa học lẫn nhau.
- Mỗi projection/calculation/rule engine phải giữ identity, methodology, validation, version và evidence riêng trước khi có UI truy ngược hoặc cross-school comparison.

### Future Bát Tự — conceptual trace

`Birth Context → time/location → Sun/tiết khí → mùa/tháng lệnh → Can Chi → Ngũ hành → Nhật chủ → approved rules → interpretation`

UI tương lai nên cho phép đi ngược chuỗi này từ interpretation về approved rule, cấu trúc truyền thống, dữ liệu lịch pháp/thời gian và birth context. Ranh giới nhận thức luận bắt buộc:

- Thiên văn, vị trí Mặt Trời và thời gian/lịch pháp là factual/calculation layer khi được xác định bằng phương pháp khoa học và nguồn đã kiểm định.
- Can Chi, Ngũ hành và Nhật chủ là mô hình truyền thống của Bát Tự.
- Không gọi Ngũ hành là lực vật lý đã được khoa học chứng minh.
- Không dùng thiên văn hiện đại để giả vờ chứng minh Bát Tự hoặc biến tương quan trình bày thành scientific equivalence.

Bát Tự vẫn **CHƯA BẮT ĐẦU / NOT STARTED**; conceptual trace này không chọn trường phái, lịch pháp, true solar time, ruleset hoặc mở implementation task.

### Future Tử Vi — conceptual trace

`Birth Context → calendar conversion/time rules → ngày/tháng/giờ → Mệnh/Thân → 12 cung → Cục/quy tắc an sao → interpretation`

UI tương lai nên cho phép truy ngược `interpretation → rule → placement rule → cung/lịch pháp → birth context`. Ranh giới bắt buộc:

- “Sao” Tử Vi mặc định là entity biểu tượng/hệ thống trong mô hình Tử Vi.
- Không đặt các entity này lên physical sky hoặc gọi chúng là sao thiên văn nếu chưa có specification riêng chứng minh astronomical identity.
- Calendar conversion, time rules, an Mệnh/Thân, Cục và an sao phải có specification, source, validation và version riêng; không suy ra từ Solar/Observer mesh hoặc Western Projection.

Tử Vi vẫn **CHƯA BẮT ĐẦU / NOT STARTED**; conceptual trace này không chọn trường phái, quy tắc lịch/tháng nhuận/an sao hoặc mở implementation task.

Quyết định dài hạn này không đổi priority hiện tại: `BOWP-P0-001` đến `BOWP-P5-001` giữ **OWNER APPROVED / DONE / PASS**, `BOWP-P6-001` đang **IN PROGRESS** theo vertical slices, và `BOWP-P7-001` giữ **NOT READY**.


## Quy chuẩn UI/UX/SEO

`docs/THIENVAN_UI_UX_SEO_RULES.md` là nguồn chuẩn bắt buộc cho giao diện, nội dung hiển thị, routing, metadata, accessibility, performance và SEO theo `DEC-UI-001`.

Mọi task thuộc các phạm vi trên phải đọc rulebook trước khi sửa, áp dụng quality gates trong `docs/QA_CHECKLIST.md`, và không được hy sinh tính chính xác calculation engine để tối ưu UI/SEO. UI không tự tính lại dữ liệu thiên văn hoặc chiêm tinh; mọi dữ liệu mới cần đi qua calculation/derived layer có test và evidence.

## Nền tảng dùng chung đã hoàn thành

- Form nhập ngày sinh, giờ, phút, tọa độ và giới tính; trường “Nơi sinh” đã được loại bỏ vì calculation hiện chỉ cần tọa độ.
- Đọc tọa độ Google Maps dạng độ-phút-giây (DMS), có hoặc không có dấu phẩy, và dạng số thập phân.
- Giới tính chỉ nhận `male` hoặc `female`, hiển thị Nam hoặc Nữ.
- Bản nháp form được lưu và khôi phục trong trình duyệt với schema version, gồm ngày sinh, giờ, phút, tọa độ và giới tính.
- Người dùng có thể lưu tối đa 10 hồ sơ sinh cục bộ, mở lại để điền form, xóa từng hồ sơ hoặc xóa tất cả.
- Không gửi dữ liệu sinh đã lưu lên máy chủ, database hoặc tài khoản. Timezone, UTC offset và kết quả calculation luôn được tính lại từ dữ liệu sinh khi mở lại.
- Nhận diện IANA timezone từ tọa độ bằng `geo-tz/all` tại server.
- Chuẩn hóa giờ địa phương, UTC offset tại đúng thời điểm sinh và thời gian UTC bằng `temporal-polyfill`.
- Xử lý quy tắc DST lịch sử theo IANA timezone; không thay timezone bằng một UTC offset cố định.
- Bốn tab kết quả: Bát Tự, Tử Vi, Chiêm tinh Tây phương và Chiêm tinh Vệ Đà.
- Không gửi tọa độ hoặc dữ liệu sinh đến dịch vụ ngoài; `/api/timezone` chỉ dùng dữ liệu cục bộ của ứng dụng.

## Calculation engine Chiêm tinh Tây phương

Calculation engine hiện tại đã hoàn thành:

- Julian Day từ thời gian UTC.
- Kinh độ hoàng đạo Tropical cho 10 thiên thể: Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune và Pluto.
- Cung, tên cung tiếng Việt, độ và phút trong cung.
- Trạng thái thuận hành/nghịch hành.
- ASC và MC.
- 12 house cusps Placidus.
- Gán mỗi thiên thể vào đúng một nhà theo quy tắc `[cusp N, cusp N+1)` với dung sai biên `1e-9°`.
- Năm góc chiếu chính: conjunction, opposition, trine, square và sextile.
- Orb chính xác và phase `applying`, `separating` hoặc `null` khi không đủ chắc chắn.
- Vòng tròn lá số React SVG responsive dùng trực tiếp dữ liệu calculation.
- Xử lý cụm thiên thể bằng nhiều bán kính và đường nối, không đổi kinh độ thật.
- Hydration mismatch của SVG đã được sửa bằng chuẩn hóa mọi số SVG tối đa 6 chữ số thập phân. Không dùng `suppressHydrationWarning` và không cần tắt SSR.

Calculation engine nằm chủ yếu tại:

- `src/lib/western-astrology.ts`
- `src/lib/house-placement.ts`
- `src/config/aspect-orbs.ts`
- `src/lib/western-chart-geometry.ts`
- `src/components/western-chart-wheel.tsx`

Không sửa calculation engine đã kiểm định nếu nhiệm vụ mới không thật sự yêu cầu.

## Kết quả kiểm định Tây phương

Nguồn đầy đủ: `docs/WESTERN_VALIDATION.md`.

- Có 5 ca: Việt Nam, London, New York, Sydney và London gần ranh giới đổi cung.
- Mỗi ca được đối chiếu với Astrolog 8.00/Moshier và CircularNatalHoroscopeJS 1.1.0.
- Đã kiểm tra 10 thiên thể, ASC, MC, 12 cusp, retrograde, nhà, các góc chiếu và applying/separating.
- Sai số thiên thể lớn nhất so với Astrolog: `0.003466°`.
- Sai số thiên thể lớn nhất trong toàn bộ đối chiếu: `0.010122°` so với Circular, nằm dưới ngưỡng test `0.012°`.
- Sai số ASC/MC/cusp lớn nhất so với Astrolog: `0.000248°`, dưới ngưỡng test `0.0003°`.
- Circular lệch cusp tối đa `0.972187°` tại nhà 3/9 của ca New York. Nguồn này chỉ dùng làm cảnh báo regression cho cusp; Astrolog và corpus `pleiades-houses` ủng hộ calculation hiện tại.
- Sai số orb lớn nhất so với Circular trong 5 ca: `0.012087°`, dưới ngưỡng `0.02°`.
- Việc gán nhà cho cả 10 thiên thể khớp hai nguồn trong cả 5 ca.
- Astrolog xác nhận phase cho toàn bộ góc chiếu. Một số mẫu Circular không đủ độ phân giải để phân biệt phase sau khi làm tròn.
- Các bất biến House 1 = ASC, House 10 = MC, các trục đối diện 180°, kinh độ thuộc `[0, 360)`, công thức orb và bất biến dữ liệu SVG đều đã có test.

Giới hạn còn lại: trước khi luận giải production cho thiên thể nằm sát cusp, nên có cảnh báo hoặc độ bất định khi khoảng cách tới cusp dưới `1°`, hoặc đối chiếu thêm một nguồn Placidus có độ chính xác công bố rõ ràng.

## Interpretation engine Phase 1

Phase 1 của luận giải Chiêm tinh Tây phương đã hoàn thành:

- 12 quy tắc Mặt Trời trong cung.
- 12 quy tắc Mặt Trăng trong cung.
- 12 quy tắc Cung Mọc trong cung.
- Tổng cộng 36 quy tắc.
- Mỗi quy tắc có `ruleId`, `version`, `evidence`, `summary`, `strengths`, `challenges` và `developmentAdvice`.
- Rule ID ổn định theo dạng `WESTERN-BODY-SIGN-V1`; phiên bản hiện tại là `1.0.0`.
- Có dữ liệu nguyên tố Lửa, Đất, Khí, Nước và tính chất Tiên phong, Kiên định, Linh hoạt cho 12 cung.
- Tổng hợp bộ ba là deterministic, dựa trên phân bố nguyên tố, tính chất và quan hệ giữa Mặt Trăng với Cung Mọc.
- Giao diện có ba thẻ, phần “Vì sao có kết luận này?” và hiển thị body/điểm góc, cung, kinh độ, rule ID, version.
- Có disclaimer: chiêm tinh dùng để tự quan sát và tham khảo, không phải kết luận khoa học hoặc sự xác định tuyệt đối về số phận.
- Không dùng AI, API mô hình ngôn ngữ hoặc nội dung ngẫu nhiên.
- Interpretation engine chỉ đọc `WesternAstrologyResult`; test snapshot xác nhận không thay đổi calculation output.

Đường dẫn thật đã xác nhận:

- Thêm mới: `src/data/western-core-interpretations.ts`
- Thêm mới: `src/lib/western-interpretation.ts`
- Thêm mới: `src/lib/western-interpretation.test.ts`
- Thêm mới: `src/components/western-core-triad.tsx`
- Đã cập nhật để tích hợp giao diện: `src/components/result-tabs.tsx`

## Interpretation engine hành tinh cá nhân

Mercury × 12 cung, Venus × 12 cung và Mars × 12 cung đã hoàn thành:

- 12 quy tắc Sao Thủy trong 12 cung.
- 12 quy tắc Sao Kim trong 12 cung.
- 12 quy tắc Sao Hỏa trong 12 cung.
- Tổng cộng 36 quy tắc hành tinh cá nhân.
- Mỗi quy tắc có `ruleId`, `version`, `evidence`, `summary`, `strengths`, `challenges` và `developmentAdvice`.
- Rule ID ổn định theo dạng `WESTERN-MERCURY-SIGN-V1`, `WESTERN-VENUS-SIGN-V1` và `WESTERN-MARS-SIGN-V1`; phiên bản hiện tại là `1.0.0`.
- Engine nằm tại `src/lib/western-personal-planet-interpretation.ts`, chỉ đọc `WesternAstrologyResult`, lấy đúng vị trí Mercury/Venus/Mars do calculation engine trả về và chọn rule theo cung.
- Engine và UI dùng chung kiến trúc personal planets; không có engine riêng cho Mars.
- Giao diện `src/components/western-personal-planets.tsx` hiển thị mục “Hành tinh cá nhân” bên dưới bộ ba cốt lõi, gồm Sao Thủy, Sao Kim rồi Sao Hỏa, cung, độ/phút, thuận/nghịch hành, nội dung luận giải và evidence mở độc lập.
- Calculation engine không thay đổi.

Đường dẫn thật đã xác nhận:

- Thêm mới: `src/data/western-personal-planet-interpretations.ts`
- Thêm mới: `src/lib/western-personal-planet-interpretation.ts`
- Thêm mới: `src/lib/western-personal-planet-interpretation.test.ts`
- Thêm mới: `src/components/western-personal-planets.tsx`
- Đã cập nhật để tích hợp giao diện: `src/components/result-tabs.tsx`

## Interpretation engine hành tinh xã hội

Jupiter, Saturn, Uranus, Neptune và Pluto × 12 cung đã hoàn thành theo WA-P1-001 đến WA-P1-005:

- 12 quy tắc Sao Mộc trong 12 cung từ ruleset approved `western-jupiter-sign-v1`.
- 12 quy tắc Sao Thổ trong 12 cung từ ruleset approved `western-saturn-sign-v1`.
- 12 quy tắc Sao Thiên Vương trong 12 cung từ ruleset approved `western-uranus-sign-v1`.
- 12 quy tắc Sao Hải Vương trong 12 cung từ ruleset approved `western-neptune-sign-v1`.
- 12 quy tắc Sao Diêm Vương trong 12 cung từ ruleset approved `western-pluto-sign-v1`.
- Mỗi quy tắc có `ruleId`, `version`, `evidence`, `summary`, `strengths`, `challenges` và `developmentAdvice`.
- Rule ID ổn định theo dạng `WESTERN-<BODY>-<SIGN>-V1`; phiên bản hiện tại là `1.0.0`.
- Engine nằm tại `src/lib/western-social-planet-interpretation.ts`, chỉ đọc `WesternAstrologyResult`, lấy đúng vị trí Jupiter/Saturn/Uranus/Neptune/Pluto do calculation engine trả về và chọn rule theo cung.
- Giao diện `src/components/western-social-planets.tsx` hiển thị mục “Hành tinh xã hội” gồm Sao Mộc, Sao Thổ, Sao Thiên Vương, Sao Hải Vương và Sao Diêm Vương, cung, độ/phút, thuận/nghịch hành, nội dung luận giải và evidence mở độc lập.
- Calculation engine không thay đổi.

Đường dẫn thật đã xác nhận:

- Thêm mới: `src/data/western-social-planet-interpretations.ts`
- Thêm mới: `src/lib/western-social-planet-interpretation.ts`
- Thêm mới: `src/lib/western-social-planet-interpretation.test.ts`
- Thêm mới: `src/components/western-social-planets.tsx`
- Đã cập nhật để tích hợp giao diện: `src/components/result-tabs.tsx`

## Historical verification checkpoint — 2026-08-09

Checkpoint lịch sử này được giữ để truy vết, không phải trạng thái kiểm tra hiện tại của repository:

- `npm test`: 428/428 test đạt.
- `npm run lint`: đạt.
- `npx tsc --noEmit`: đạt.
- `npm run build`: đạt.
- Kiểm tra browser production build: section “Hành tinh xã hội” render Sao Mộc, Sao Thổ, Sao Thiên Vương, Sao Hải Vương và Sao Diêm Vương; evidence Pluto mở được với `WESTERN-PLUTO-SCORPIO-V1`, version `1.0.0`; không có lỗi/warning console và không tràn ngang tại desktop hoặc viewport 390px.

Current verified checkpoint ngày 2026-08-26:

- Targeted `WesternProjectionGeometry`: **17/17 PASS**; existing related Western calculation/chart geometry/scene-axis regression: **58/58 PASS**; combined run: **75/75 PASS**.
- `npm test`: **670/670 PASS**.
- `npm run lint`: **PASS**.
- `git diff --check`: **PASS**.
- Changed-file TypeScript cho P4: **PASS**. Full-repo `tsc --noEmit` vẫn có lỗi tồn tại ngoài P4 trong `observation-context.test.ts` và Western synthesis tests; không ghi full TypeScript PASS.
- `npm run build`: compilation và Next TypeScript **PASS**; final production build bị chặn trong page-data collection vì execution environment thiếu `SITE_URL`. Không ghi production build PASS và không dùng domain giả.

## Backlog luận giải Tây phương

### Phase 2A: Mercury, Venus và Mars trong 12 cung

- 36 quy tắc.
- Chỉ luận vị trí trong cung.
- Chưa luận nhà hoặc góc chiếu trong phase này.
- Mercury × 12 cung: hoàn thành.
- Venus × 12 cung: hoàn thành.
- Mars × 12 cung: hoàn thành.
- Phase 2A hoàn thành.

### Phase 2B: Jupiter, Saturn, Uranus, Neptune và Pluto trong 12 cung

- 60 quy tắc.
- Giữ cùng schema rule ID, version, evidence và nội dung có cấu trúc.
- WA-P1-001 Jupiter trong 12 cung: hoàn thành theo ruleset approved tại `docs/WESTERN_JUPITER_12_SIGNS_RULESET_APPROVED.md`.
- WA-P1-002 Saturn trong 12 cung: hoàn thành theo ruleset approved tại `docs/WESTERN_SATURN_12_SIGNS_RULESET_APPROVED.md`.
- WA-P1-003 Uranus trong 12 cung: hoàn thành theo ruleset approved tại `docs/WESTERN_URANUS_12_SIGNS_RULESET_APPROVED.md`.
- WA-P1-004 Neptune trong 12 cung: hoàn thành theo ruleset approved tại `docs/WESTERN_NEPTUNE_12_SIGNS_RULESET_APPROVED.md`.
- WA-P1-005 Pluto trong 12 cung: hoàn thành theo ruleset approved tại `docs/WESTERN_PLUTO_12_SIGNS_RULESET_APPROVED.md`.

### Phase 3: 10 thiên thể trong 12 nhà

- Hoàn thành 120 quy tắc cho 10 bodies × 12 houses.
- Đã có data layer, resolver/domain layer, generic UI và tests; resolver đọc trực tiếp `body.house`, không tính lại hoặc mutate calculation.
- Sun và Moon × 12 houses đã hoàn tất; tám hành tinh còn lại cũng đủ 12 houses. `WA-P2-003` là DONE: ASC-by-house = N/A (not applicable) trong natal Placidus hiện tại vì ASC là angle/cusp Nhà 1 và invariant calculation đã kiểm định là House 1 = ASC; đây không phải missing implementation. Nếu sau này có synastry/chart overlay nơi ASC của chart A được đặt vào houses của chart B, phạm vi đó phải có task/spec riêng.
- Derived cusp context dùng ngưỡng `<1°`, chỉ bổ sung context và không đổi house assignment.

### Phase 4: Các góc chiếu

- Foundation đã có data schema, resolver/domain layer và generic UI evidence.
- Hiện có đúng 5 Sun–Moon interpretation rules: conjunction, opposition, trine, square và sextile.
- Sun–Mercury conjunction, Sun–Venus conjunction, đủ 5/5 Sun–Mars, Sun–Jupiter, Sun–Saturn, Sun–Uranus, Sun–Neptune và Sun–Pluto major-aspect rules đã hoàn thành; tổng content hiện có 37 aspect interpretation rules. Các aspect Sun–Mercury/Sun–Venus khác không khả thi theo matrix và không có rule/fallback.
- Nhóm Sun đã qua **Sun-group cleanup checkpoint** và baseline sạch: đổi wording hẹp `ngân sách` thành `nguồn lực`, Việt hóa hai chỗ dùng `routine`, rà consistency/safety và giữ nguyên 37 rule IDs cùng version `1.0.0`. Targeted feasibility 6/6, targeted aspect 16/16, full `npm test` 436/436, lint và build đều đạt; assertion feasibility cũ đã được giới hạn đúng vào 5 Sun–Moon rules thay vì đếm toàn dataset.
- Feasibility matrix đã có đủ 45 canonical body pairs và xác định 214 feasible pair-aspect combinations.
- Resolver dựa trực tiếp trên aspect có thật trong calculation, không tạo fallback, không suy đoán phase khi calculation trả `null`.
- Neptune–Pluto đã DONE 5/5 và content gate PASS. Aspect Interpretation COMPLETE với 214/214 rules khả thi; toàn bộ canonical feasible pairs đã DONE, còn impossible combinations được loại đúng theo feasibility policy.
- Canonical targeted aspect/feasibility/component tại closure đạt 126/126 PASS; full suite 540/540 PASS, lint, build và `git diff --check` PASS.

### Phase 5: Tổng hợp toàn lá số Tây phương

- WA-P4-001 đã DONE với policy `western-chart-synthesis-v1` version `1.0.0` và typed conflict/synthesis layer.
- Candidate score dùng importance, specificity, domain relevance và uncertainty do rule-evaluation layer cung cấp; aggregator không tự tính lại chart hoặc gán trọng số theo tên hành tinh.
- Theme dedup theo `evidenceGroupId`, chỉ cộng evidence độc lập, giữ cả hai phía conflict và toàn bộ rule/version/provenance; cùng input cho cùng output bất kể thứ tự mảng.
- Targeted tests WA-P4-001 đạt 5/5; full suite tại checkpoint WA-P4-001 đạt 545/545, lint và build PASS.
- WA-P4-002 đã DONE với `western-personality-potential-v1` version `1.0.0`: tách personality/potential, chọn tối đa 5 theme/domain, giữ supportive/challenging statements, uncertainty và provenance từ canonical candidates; không tự sinh nhận định khi thiếu evidence.
- Targeted WA-P4-002 đạt 5/5; full suite tại checkpoint WA-P4-002 đạt 550/550, lint và build PASS.
- WA-P4-003 đã DONE với `western-relationship-synthesis-v1` version `1.0.0`: chỉ nhận domain relationship và nguồn Moon/Venus/Mars/Nhà 5/Nhà 7/ruler/aspect liên quan; giữ ranking, dedup, conflict, uncertainty và provenance từ WA-P4-001, không suy hôn nhân/compatibility/timing.
- Targeted WA-P4-003 đạt 5/5; full suite tại checkpoint WA-P4-003 đạt 555/555, lint và build PASS.
- WA-P4-004 đã DONE với `western-career-synthesis-v1` version `1.0.0`: chỉ nhận domain career và nguồn MC/Nhà 10/ruler Nhà 10/Sun/Saturn/Mars/aspect phù hợp; giữ ranking, dedup, conflict, uncertainty và provenance từ WA-P4-001, không suy nghề/thu nhập/thành công/timing.
- Targeted WA-P4-004 đạt 5/5; full suite tại checkpoint WA-P4-004 đạt 560/560, lint và build PASS.
- WA-P4-005 đã DONE với `western-main-theme-synthesis-v1` version `1.0.0`: nhận output personality/potential/relationship/career, nhóm theme xuyên domain bằng WA-P4-001, không dùng domain multiplier, dedup shared evidence và giữ conflict/uncertainty/provenance; tối đa 5 main themes.
- Targeted WA-P4-005 đạt 5/5; full suite 565/565, lint và build PASS.
- WA-P5-001 đã DONE với Playwright Test + Chromium: flow canonical nhập dữ liệu → `/ket-qua` → tab Tây phương xác nhận SVG, 4 bảng, evidence accordion/keyboard focus; responsive/no-overflow và runtime console/page errors tại 1280/768/390/360. Targeted E2E 4/4, full suite 565/565, lint và build PASS.
- WA-P5-002 đã DONE: 4 bảng dữ liệu Tây phương giữ nguyên semantic table/dữ liệu, có scroll region được gắn nhãn, focus bàn phím và chỉ dẫn mobile. UI/Content Gate tại 1280/768/390/360 PASS, page overflow = 0; targeted E2E 4/4, full suite 565/565, lint và build PASS.
- WA-P5-003 đã DONE: audit nội dung tiếng Việt người dùng thấy trong phân hệ Tây phương; sửa 2 chuỗi interpretation lẫn từ nội bộ `rule` và 7 chuỗi UI cứng/không nhất quán/lỗi thời. Không đổi semantic meaning, polarity hay certainty; Content Gate PASS. Targeted 164/164, E2E 4/4, full suite 565/565, lint và build PASS.

### Phạm vi sản phẩm Western beta

WA-P0-003 đã **DONE** theo `DEC-WA-025`. Tên canonical là **“Báo cáo Chiêm tinh Tây phương — Beta”**: một natal report đang hoàn thiện, không phải báo cáo hoàn chỉnh/toàn diện, hệ thống dự báo tương lai hoàn chỉnh hoặc kết luận số phận tuyệt đối. Trong beta hiện tại, toàn bộ capability thực sự đang render là free: calculation đã kiểm định, chart SVG, dữ liệu thiên thể/ASC/MC/12 nhà và bảng kỹ thuật, chủ tinh/cusp context đang hiển thị, luận theo cung/nhà/góc canonical, evidence, report version, navigation/responsive/accessibility. Quyết định free này không cam kết product tier dài hạn.

Beta hiện tại chưa có paid product, paywall hoặc paid preview. Synthesis personality/potential/relationship/career/main themes cùng conflict/uncertainty/dedup/provenance đã DONE ở domain layer nhưng chưa render nên không được mô tả là capability người dùng đang nhận. Capability chưa triển khai mặc định bị ẩn; không tạo hàng loạt teaser “sắp có”. Transit/timing, synastry đầy đủ, aspect ASC/MC khi decision còn mở, unknown birth-time policy, payment/gating, report persistence/snapshot, PDF/export và account/sync không thuộc beta hiện tại. `DEC-OPEN-006`, `DEC-OPEN-008` và `DEC-OPEN-010` tiếp tục mở.

`DEC-UI-006` đã đóng `DEC-OPEN-011` bằng mô hình **Freemium cân bằng**. Báo cáo có hai tầng `Tổng quan` và `Chuyên sâu` dùng cùng typed result/synthesis/evidence. Tổng quan là entry point beginner-first với tối đa 5 insight khi đủ evidence, ưu tiên Main Themes rồi đến Personality/Potential, Relationship và Career; không thêm scoring/ranking UI. Chuyên sâu không đồng nghĩa tuyệt đối với paid. `DEC-WA-025` vẫn giữ nguyên quyền truy cập free trong beta; free layer dài hạn phải đủ giá trị, còn paid direction tương lai ưu tiên synthesis/structured depth. Evidence, provenance và version của content đã mở không được khóa độc lập. Commerce, gating, packaging và implementation `UISEO-P1-005` vẫn phải có task/decision riêng.

## Solar Astronomy V1 và phase Birth Observer + Western Projection

Solar System Astronomy V1 tại `/solar-system` là **DONE** trong phạm vi của `docs/SOLAR_SYSTEM_ASTRONOMY_ENGINE_DECISION.md` (`DEC-SOLAR-001`): runtime `astronomy-engine@2.1.19`; tám hành tinh dùng Sun-centered geometric positions; Moon giữ Earth-centered geometric vector; physical frame `ECLIPTIC_J2000`; EQJ → ECL dùng official Astronomy Engine rotations; physical state tách display scale; `RotationAxis` đã tích hợp; `simulationTime` là source-of-truth với `1× = 1 simulated day / real second`; product range 1600–2200. JPL Horizons chỉ là regression oracle, không runtime. Toàn bộ 55 available body/epoch samples và technical gates được ghi trong ADR hiện hành đã PASS. Không thay đổi evidence, tolerance hoặc limitation đã accepted.

`DEC-SKY-001` chốt nguyên tắc **“Một bầu trời – nhiều phép chiếu”**. Ba representation phải tách biệt: Solar Physical Space (Sun-centered, geometric, ECL J2000, visual distance compressed), Birth Observer Sky Space (observer-centered, topocentric, apparent horizon/azimuth/altitude), và Western Astrology Projection Space (geocentric canonical `WesternAstrologyResult`). Do `physicalVectorToScenePosition()` scale từng heliocentric vector theo khoảng cách riêng, Earth-centric vector differences không được bảo toàn trong compressed Solar scene; camera đặt trên Earth mesh không tạo observer sky truth. Earth texture/mesh/`RotationAxis` cũng không phải observer calculation truth.

`DEC-OBS-001` chốt Observer V1 architecture: một resolved instant có hai representation đồng nhất `instantUtc` và `timestampUtcMs`, latitude, longitude, `elevationMeters = 0`, timezone metadata/provenance; không có gender trong observation context. “Exact” chỉ nghĩa là instant được resolve chính xác từ birth data do user cung cấp; input hiện hành có giờ/phút và pipeline đặt second = 0. Body scope gồm Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune và Pluto. Policy là topocentric, light-time và parallax applied, aberration on, atmospheric refraction off. Observer dùng official Astronomy Engine observer/topocentric APIs; seeded-random Solar stars phải bị ẩn hoặc thay bằng neutral background trong Observer V1. Headless Observer implementation, independent validation và Earth presentation calibration/semantic handoff hiện đã **DONE / PASS**. Observer UI vertical slice 1 đã có implementation và các gate targeted/browser/full-unit liên quan PASS nhưng vẫn **PARTIAL / NOT OWNER APPROVED** vì production build cuối bị chặn bởi environment thiếu `SITE_URL`; Western UI chưa triển khai.

Canonical resolved birth instant tiếp tục đi qua typed session boundary `src/lib/active-birth-session.ts`, `BirthData` tại `src/lib/birth-data.ts`, rồi `src/lib/birth-time.ts#calculateBirthTime`; current consumer là `src/components/private-result-client.tsx`. UI/session layer đọc storage rồi truyền input hẹp vào pure/headless `ObservationContext` builder; builder không đọc storage, không biết storage key, không nhận gender, không tạo session system và không parse lại local time độc lập. `ObservationContext` luôn giữ factual resolved instant gốc. Observer capability được đánh giá riêng bằng resolved UTC instant; ngoài range phải giữ nguyên cả ISO/millisecond representations và trả explicit unsupported, không clamp về 1600/2200. Birth Observer và Western Projection là snapshot: set exact supported resolved instant, pause, giữ cùng instant.

`DEC-WPROJ-001` chốt Western Projection chỉ đọc `WesternAstrologyResult`: exact body longitude/sign/house, ASC, MC, 12 canonical cusps và exact aspect set. Renderer không lấy longitude từ Solar ECL J2000 mesh, không dùng topocentric observer longitude và không tính lại sign/house/aspect. Derived geometry có thể dùng official `ECT → EQJ → ECL J2000 → Three` transforms; tolerance chỉ áp dụng transformation/geometry, không áp dụng dữ liệu copy từ canonical result. Placidus V1 chỉ cần cusp markers/regions; polar error giữ canonical behavior và không tự fallback house system.

Spec canonical của phase `docs/BIRTH_OBSERVER_WESTERN_PROJECTION_SPEC.md` đã **OWNER APPROVED / ACCEPTED** ngày 2026-08-25; `BOWP-P0-001` đến `BOWP-P5-001` hiện **OWNER APPROVED / DONE / PASS** theo gate tương ứng, còn `BOWP-P6-001` đang **IN PROGRESS**.

`BOWP-P2-001` đã **DONE**: `src/features/solar-system/observer-sky-projection.ts` nhận một supported `ObservationContext`, kiểm capability trước calculation và trả typed success/failure không clamp, không partial result. Headless projection dùng official `astronomy-engine@2.1.19` APIs `new Observer(latitude, longitude, 0)`, `Equator(body, date, observer, true, true)` và `Horizon(date, observer, ra, dec, undefined)`; explicit `undefined` là type-compatible false-like refraction argument theo package docs, nên atmospheric refraction OFF. Output deterministic/serializable giữ exact instant/location metadata, explicit topocentric/light-time/parallax/aberration/refraction policy và đúng 10 bodies Sun–Pluto với North→East azimuth `[0,360)`, geometric altitude `[-90,+90]`, `aboveHorizon = altitude >= 0`. Unsupported/invalid contexts không tạo projection và không mutate instant. Targeted 12/12, full unit 645/645 và lint PASS; production build compile/TypeScript PASS nhưng final page-data collection bị chặn vì execution environment thiếu `SITE_URL`.

`BOWP-P3-001` đã **DONE / PASS**. P3B reuse stored raw `VN-Sun` và gửi đúng 44 request còn lại strictly sequential, concurrency `1`, retries `0`; 45/45 response hợp lệ đều có exact signature `NASA/JPL Horizons API 1.2`. 45/45 production comparisons dùng canonical `calculateObserverSkyProjection(context)` và primary local unit-vector direction metric đều PASS frozen tolerance `0.03°`; maximum separation `0.006605052335861644°` tại `NYC-Saturn`, horizon regression flags `0`. Static raw/results fixtures giữ request/header/site/time/model provenance. Claim chỉ áp dụng frozen post-1962 corpus, elevation `0`; không suy rộng toàn range/time model/datum. Corpus, query semantics, metric, tolerance và production calculation không đổi.

`BOWP-P4-001` đã **DONE / PASS**. `src/features/solar-system/western-projection-geometry.ts` chỉ nhận canonical `WesternAstrologyResult`; exact birth transformation context lấy từ chính `result.julianDay`, không parse lại local birth time và không dùng mutable simulation time. Mỗi body giữ exact canonical object/longitude/sign/house; ASC, MC, 12 cusp theo đúng sequence và toàn bộ aspects/endpoints giữ exact canonical references/properties, không detector/fallback. Unit geometry đi qua official `Rotation_ECT_EQJ` rồi `Rotation_EQJ_ECL`, sau đó reuse `eclipticVectorToSceneAxes`; display radius tách thành optional magnitude-only helper. Frozen numerical tolerances chỉ cho transformation là `1e-9°` angular và `1e-12` vector component/norm; identity dùng zero tolerance. Targeted 17/17, existing related regression 58/58 (combined 75/75), full unit 670/670, lint, changed-file TypeScript và `git diff --check` PASS. Build compilation + Next TypeScript PASS; page-data collection vẫn bị environment chặn vì thiếu `SITE_URL`, không dùng domain giả.

`BOWP-P5-001` đã **OWNER APPROVED / DONE / PASS**. Calibration được ràng buộc với exact asset `public/solar-system/textures/earth-blue-marble-2048.png`, `2048×1024`, `1912469` bytes, SHA-256 `b5e0139834c638d10c2c747f4bac63df5f9387680c00d87e5a2a9ed9a3dfea71`; provenance NASA Earth Observatory Blue Marble được test ràng buộc với README cạnh asset và exact source URL repo đã lưu. Installed Three `SphereGeometry`/`TextureLoader` được kiểm trực tiếp và khóa geographic convention Greenwich `+X`, north `+Y`, east `-Z`. Audit cho thấy legacy `alignNorth × spin` lệch Greenwich khoảng `89.93°–90.06°` qua năm epoch và không phải constant transform trong tolerance. Earth presentation riêng dựng basis trực chuẩn Greenwich/north/west từ official `ObserverVector` trong EQJ, official EQJ → ECL J2000 rồi shared ECL → Three mapping; maximum anchor error `0.0000012074182697257333°` dưới frozen `0.010986328125°` (1/16 pixel), không sửa Solar/Observer/Western truth. Marker dùng spherical texture convention và nằm cùng Earth `spinRoot`. Birth snapshot kiểm capability trước clock, ngoài range không mutate/clamp; supported instant được pause, set và verify exact. Shared headless snapshot predicate/guards chặn unpause, timestamp edit, set-to-now và animation advance trong `birth-earth`, `birth-observer`, `western-projection`, kể cả defense-in-depth khi underlying clock bị unpause ngoài guard; `solar-overview` và ordinary `planet-focus` vẫn cho generic time controls và việc rời snapshot không tự resume. Typed handoff sang Observer tiếp tục ẩn decorative Solar stars và chỉ phát callback cho P6. P5 targeted 44/44, relevant hardening/Observer/Western 89/89, full unit 714/714, lint, changed-file TypeScript và `git diff --check` PASS. Build compile + Next TypeScript PASS rồi dừng page-data collection vì thiếu `SITE_URL`; không ghi full build PASS.

`BOWP-P6-001` đang **IN PROGRESS**. Vertical Slice 1 Birth Observer UI hiện dùng active birth session → pure `ObservationContext` → capability → renderer `enterBirthEarth()` → calibrated Earth handoff → production `calculateObserverSkyProjection(context)` → React/SVG local-horizon dome. Frame riêng khóa North `+X`, East `+Z`, Up `+Y`; zenith ở tâm, geometric horizon là vòng ngoài, 10 bodies giữ exact identity/azimuth/altitude/`aboveHorizon`, và below-horizon bodies có textual status thay vì bị xóa hoặc vẽ giả trên vòm. Technical values/policy nằm trong disclosure; non-canvas list và focus/keyboard return đã có. Renderer không import/calculate Observer projection, decorative Solar stars vẫn bị ẩn tại semantic handoff, không có second WebGL/animation loop và không có Western UI. Targeted P6 + related semantic run 50/50 PASS; relevant Solar/Observer/P1–P5 regression 147/147 PASS; full unit 734/734, lint và `git diff --check` PASS; Playwright Chromium 10/10 PASS tại 1280×720, 768, 390×844 và 360, gồm no-overflow, readable/cardinal labels, focus/disclosure/return, one canvas và no console/page/hydration errors. Full-repo `tsc --noEmit` tiếp tục chỉ báo các lỗi test tồn tại trước P6 trong `observation-context.test.ts` và Western synthesis tests; changed P6 files không xuất hiện trong diagnostics. `npm run build` compile + Next TypeScript PASS rồi dừng page-data collection `/sitemap.xml` vì environment thiếu `SITE_URL`; vì mandatory production build chưa full PASS, Observer UI slice giữ **PARTIAL / NOT OWNER APPROVED**, Western UI **PENDING**, P7 **NOT READY**.

## Các giai đoạn chưa bắt đầu và quyết định cần xác nhận

### Chiêm tinh Vệ Đà

Chưa bắt đầu. Chủ dự án cần xác nhận trước khi code:

- Ayanamsha nào được dùng.
- Hệ nhà nào được dùng.
- Dùng true node hay mean node cho Rahu/Ketu.
- Phạm vi hành tinh, nakshatra, pada, dasha và divisional charts của bản đầu.
- Nguồn ephemeris và phương án giấy phép thương mại.
- Quy tắc luận giải và cách ghi evidence/version.

### Bát Tự

Chưa bắt đầu. Chủ dự án cần xác nhận trước khi code:

- Trường phái và bộ quy tắc nghiệp vụ.
- Mốc đổi năm và tháng theo tiết khí, gồm cách xử lý Lập Xuân.
- Quy tắc đổi ngày tại giờ Tý.
- Dùng giờ dân sự hay hiệu chỉnh true solar time.
- Cách xác định thuận/nghịch đại vận, thập thần, tàng can và các chu kỳ vận.
- Nguồn lịch pháp, dữ liệu kiểm định và giấy phép.

### Tử Vi

Chưa bắt đầu. Chủ dự án cần xác nhận trước khi code:

- Trường phái/Bắc phái/Nam phái hoặc bộ quy tắc cụ thể.
- Nguồn chuyển đổi âm lịch và quy tắc tháng nhuận.
- Mốc đổi ngày và cách xử lý giờ Tý.
- Cách an Mệnh, an Thân, 12 cung, chính tinh, phụ tinh và Tứ Hóa.
- Quy tắc giới tính, âm dương và các vòng sao.
- Bộ lá số tham chiếu độc lập và giấy phép dữ liệu.

### Tổng hợp liên trường phái

Chưa bắt đầu. Chỉ triển khai sau khi từng hệ thống có calculation và interpretation đã kiểm định độc lập. Không hòa trộn khái niệm giữa các trường phái nếu chưa có quy tắc nghiệp vụ được chủ dự án phê duyệt.

## Nguyên tắc bắt buộc

- Không dùng AI để tính lá số.
- AI/LLM không được tự bổ sung luận chuyên môn ngoài calculated data, approved rules, synthesis và guidance được phép.
- Source of truth phải là calculation + approved rules/ruleset + evidence + synthesis có methodology; model AI phải có thể thay thế mà không thay lõi sản phẩm.
- Cross-school comparison không dùng voting, tỷ lệ phần trăm hoặc “nhiều hệ xác nhận” để tạo cảm giác chắc chắn giả.
- Personal history/life-event data, nếu triển khai, phải có consent, khả năng sửa/xóa và tách khỏi calculation/rule truth.
- Không tạo dữ liệu giả.
- Không tự chọn trường phái hoặc quy tắc nghiệp vụ còn bỏ ngỏ.
- Không thay đổi calculation engine đã kiểm định nếu không cần thiết.
- Calculation và interpretation phải tách riêng.
- Mỗi lời luận có rule ID, version và evidence.
- Không dùng Swiss Ephemeris khi chưa có quyết định giấy phép được chủ dự án xác nhận.
- Văn luận không hù dọa, không phán xét và không khẳng định số phận tuyệt đối.
- Không đưa ra chẩn đoán y khoa hoặc tâm lý.
- Mỗi nhiệm vụ phải chạy `npm test`, `npm run lint` và `npm run build`.

## Bước tiếp theo chính xác

**Chiến lược AI/moat cập nhật ngày 2026-08-14 không thay đổi task kỹ thuật kế tiếp và không mở task Fusion/Life Map/AI Advisor ở thời điểm này.**

Phase 2 về chủ tinh/cusp và Planet-in-House đã hoàn thành ở phạm vi 10 bodies × 12 houses (120/120 rules). `WA-P2-003` là DONE: Sun và Moon × 12 houses đã hoàn tất; ASC-by-house = N/A trong natal Placidus hiện tại, không phải gap triển khai.

Aspect Interpretation đã **COMPLETE**: feasibility matrix có 45 canonical body pairs và 214 tổ hợp khả thi; dataset đủ 214/214 rules, toàn bộ feasible pairs đã DONE. Neptune–Pluto DONE 5/5 và content gate PASS; canonical targeted aspect/feasibility/component 126/126 PASS. Impossible combinations theo canonical feasibility không bị tính là missing coverage. Calculation engine/orb/aspect detection và feasibility behavior/source không đổi; `WA-P3-002` và `WA-P3-003` đã DONE.

WA-P4-001 đến WA-P4-005 đã **DONE** với content/semantic gate PASS; Phase 4 synthesis có typed main-theme policy `western-main-theme-synthesis-v1` trên aggregator hiện có.

WA-P5-004 đã **DONE**: kết quả Tây phương hiển thị calculation/ruleset/interpretation version từ một nguồn metadata typed/deterministic. Ruleset và interpretation version được kiểm tra đồng nhất từ rule/policy hiện hành. UI đặt metadata trong progressive disclosure, giữ beginner-first và expert-deep; UI Gate 1280/390 không có page overflow. Repo chưa có report persistence nên không tạo snapshot, storage hoặc schema mới; `DEC-OPEN-008` tiếp tục mở. Targeted 4/4, full suite 567/567, E2E Chromium 4/4, lint và build PASS.

UISEO-P2-006 đã **DONE**: `SITE_URL` là single source-of-truth server-side cho canonical origin, được validate là HTTP(S) origin và normalize trailing slash; production thiếu/invalid phải fail rõ, development/test mới có localhost fallback. `/` có canonical absolute và là URL duy nhất trong sitemap; `/ket-qua` giữ `noindex, nofollow` và không vào sitemap. Robots cho phép crawl toàn site/resource cần render và tham chiếu sitemap cùng origin. Production domain cụ thể thuộc deployment configuration, không hard-code trong repo. Targeted 8/8, full suite 575/575, E2E Chromium 4/4, lint, build và production SEO gate PASS.

`DEC-WA-026` đã canonicalize và `WA-P4-007` đã triển khai `western-core-candidate-projection-v1` version `1.0.0` cho đúng 36 rule Sun/Moon/ASC × 12 cung. Ba theme canonical là `identity-and-self-expression`, `emotional-needs-and-regulation`, `outward-style-and-life-approach`; tất cả map vào `personality`, mỗi matched rule tạo bốn candidate từ nguyên văn hai `strengths` và hai `challenges`, numeric signals dùng `importance=1`, `specificity=1`, `domainRelevance=1`, `uncertainty=0`, cùng identity/provenance deterministic và shared evidence group theo placement. Production pipeline tạo 12 candidates cho Sun/Moon/ASC đầy đủ, Personality synthesis, typed empty Potential/Relationship/Career, Main Themes và boundary giữ calculation/matched core/candidates/provenance; `/ket-qua` nhận boundary nhưng chưa render synthesis. Targeted 14/14, full suite 584/584, lint và production build PASS.

`WA-P4-006` đã **DONE**: aggregator đánh dấu conflict khi polarity đối nghịch được hỗ trợ bởi ít nhất hai evidence groups độc lập trong cùng theme/scope. Supportive/challenging trong một group duy nhất chỉ là internal duality và không tự tạo conflict; candidate của mixed group vẫn có thể đối nghịch với candidate thuộc group độc lập khác. Công thức score, evidence-group dedup, provenance và deterministic ordering không đổi. `WA-P4-007` cũng đã DONE mà không sửa conflict semantics.

`UISEO-P1-005` đã **DONE**: `/ket-qua` có hai tầng `Tổng quan` và `Chuyên sâu` dùng chung typed report synthesis. Tổng quan ưu tiên và render trực tiếp Main Themes theo deterministic ordering canonical, tối đa 5 và không filler. Chuyên sâu giữ chart, bảng và interpretation hiện có, đồng thời expose Personality synthesis từ cùng boundary; Potential/Relationship/Career typed-empty tiếp tục ẩn, không có fake interpretation hay teaser. Evidence/rule/version/provenance accessible bằng native disclosure; tab semantic hỗ trợ click, Enter và phím mũi tên; không paywall/gating. Targeted component 6/6, E2E Chromium 4/4 tại 1280/768/390/360 không overflow/runtime error, full unit 585/585, lint và production build PASS.

`DEC-UI-007` đã **CHỐT** kiến trúc private-result routing/state và `UISEO-P1-003` đã **DONE**. URL canonical `/ket-qua/<module>` hỗ trợ `bat-tu`, `tu-vi`, `tay-phuong`, `ve-da`; `/ket-qua` redirect deterministic và bỏ query cũ tới `/ket-qua/bat-tu`, invalid slug trả 404. Validated route slug là source-of-truth; module navigation dùng URL thật, hỗ trợ Back/Forward và keyboard. Active personal calculation dùng typed/versioned `sessionStorage`, reload cùng tab phục hồi calculation; saved profiles tiếp tục ở `localStorage`. Personal fields/raw result không còn trong URL. Direct/shared link thiếu state hiển thị recovery an toàn, không fake report. Toàn nhánh giữ `noindex, nofollow`, ngoài sitemap và tách khỏi public hubs; cross-device snapshot/sharing tiếp tục deferred tại `DEC-OPEN-008`. Targeted unit/component/SEO 14/14, E2E Chromium 7/7 tại desktop/768/390/360, full unit 593/593, lint và production build PASS. `UISEO-P1-004` vẫn **PROPOSED**.

`DEC-UI-008` đã **CHỐT** architecture cho **Birth Place Picker v1** và đóng `DEC-OPEN-009`. Feature là task riêng `UISEO-P1-006`, không thuộc `UISEO-P1-004`. Boundary provider-neutral `PlaceSearchProvider` tách place search/resolve/optional reverse khỏi MapLibre renderer và giữ pipeline timezone hiện hành `coordinates -> /api/timezone -> geo-tz -> IANA timezone` làm source-of-truth; calculation engine và `BirthData` boundary không đổi. UX chính là search `Nơi sinh` toàn cầu, kết quả có locality/region/country, normalized display name, map + pin và timezone tự động; tọa độ/IANA timezone chỉ ở Advanced/recovery. Map không là gate bắt buộc, keyboard-only và manual coordinates vẫn hoàn thành flow. `BirthPlaceSelection` typed giữ displayName/lat/lng/timezone/precision/source; saved profile V2 được phép giữ presentation metadata, tiếp tục đọc V1 và không mass-migrate. Search/resolve ưu tiên server proxy, không lưu raw provider response hoặc log raw query/tọa độ mặc định; rate limit, timeout, provider-compliant cache, attribution, restricted map key và quota/billing alerts là release requirements.

Geoapify Autocomplete/Geocoding + compatible tiles/style + MapLibre GL là primary candidate nhưng **chưa production-approved**. `UISEO-P1-006` vẫn **PROPOSED** cho tới khi benchmark manual cố định khoảng 40–50 case Việt Nam/quốc tế đạt >=95% correct top 5, >=85% correct top 1, không critical city/province false-match và coordinate/context đủ cho birth-place selection. Live provider ranking không là CI gate. Nếu fail, phải review Google Places + Google Maps về legal/storage/cost trước khi chọn fallback; public Nominatim không được dùng cho production autocomplete.

`DEC-UI-009` đã ghi nhận Geoapify benchmark hoàn tất 45/45 case với 45 API requests và **FAIL** provider gate: Top-5 38/45 (84,44%), Top-1 38/45 (84,44%), Việt Nam 23/30, quốc tế 15/15, hospital/POI 9/9, có dấu 15/18, không dấu 11/12, ambiguous 3/8, critical 17/22; có critical false-match `Thanh Hoa`. Top-1 và Top-5 bằng nhau vì mọi case pass đều đúng ngay rank 1, còn bảy case fail không có candidate đúng intent trong top 5; chưa có bằng chứng metric bug nên không sửa kết quả. Owner không production-approve Geoapify ở giai đoạn hiện tại, không reject vĩnh viễn, và chốt bước tiếp theo là Google fallback benchmark dùng nguyên dataset/expectation.

Google fallback benchmark, `UISEO-P1-006` và `UISEO-P1-004` giữ nguyên trạng thái thật và toàn bộ dependency/evidence hiện hành, nhưng theo owner reprioritization 2026-08-25 chúng không còn là NEXT CANONICAL.

`UISEO-P1-004` tiếp tục **PROPOSED** và không được triển khai trước: `DEC-SEO-001` canonical, `UISEO-P1-006` DONE, rồi revise và owner-approve calculator content theo UX mới, tối thiểu gồm input instructions, “Thông tin cần chuẩn bị”, privacy wording, FAQ nơi sinh và methodology/data-input wording. Beginner không còn bị yêu cầu tự tìm tọa độ, copy Google Maps, hiểu DMS hoặc IANA timezone.

**CURRENT CANONICAL:** `BOWP-P6-001` — **IN PROGRESS** theo vertical slices. Birth Observer UI là **PARTIAL / NOT OWNER APPROVED** do production build environment blocker; Western UI **PENDING**; `BOWP-P7-001` **NOT READY**.
