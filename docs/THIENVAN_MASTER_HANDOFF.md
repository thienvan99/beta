# Thiên Vận Master Handoff

Cập nhật: 2026-08-03.

Tài liệu này dùng để bàn giao repository `G:\thienvan` sang một cuộc trò chuyện Codex mới. Đây là dự án bốn hệ thống, không phải dự án chỉ riêng Chiêm tinh Tây phương.

## Cách bắt đầu trong cuộc trò chuyện mới

Đọc theo thứ tự:

1. `AGENTS.md`
2. `README.md`
3. `docs/PROJECT_STATUS.md`
4. `docs/THIENVAN_MASTER_HANDOFF.md`
5. `docs/WESTERN_VALIDATION.md`
6. Code liên quan trực tiếp đến nhiệm vụ mới.

Trước khi sửa code Next.js, đọc tài liệu phù hợp trong `node_modules/next/dist/docs/` theo yêu cầu của `AGENTS.md`.

## Mục tiêu sản phẩm

Thiên Vận hướng tới một website nhập dữ liệu sinh một lần và trình bày bốn hệ thống:

- Bát Tự.
- Tử Vi.
- Chiêm tinh Tây phương.
- Chiêm tinh Vệ Đà.

Mỗi hệ thống phải có calculation engine riêng, interpretation engine riêng, dữ liệu kiểm định riêng và giao diện dùng chung đầu vào đã chuẩn hóa. Tổng hợp liên trường phái chỉ được thực hiện sau khi từng hệ thống độc lập đã đủ tin cậy.

## Lộ trình tổng thể sáu giai đoạn

### Giai đoạn 1: Nền tảng dữ liệu sinh dùng chung

Trạng thái: hoàn thành.

- Form ngày, giờ, phút, nơi sinh, tọa độ và giới tính.
- Đọc tọa độ Google Maps DMS và thập phân.
- Giới tính chỉ Nam/Nữ tương ứng `male`/`female`.
- Nhận diện IANA timezone từ tọa độ.
- Chuẩn hóa giờ địa phương, UTC offset tại thời điểm sinh và UTC.
- Bốn tab kết quả cho bốn hệ thống.

### Giai đoạn 2: Chiêm tinh Tây phương

Trạng thái: đang thực hiện.

- Calculation engine: hoàn thành và đã kiểm định.
- Trực quan hóa SVG: hoàn thành.
- Luận giải Phase 1 cho Sun, Moon, ASC: hoàn thành.
- Luận giải Mercury trong 12 cung: hoàn thành.
- Luận giải Venus, Mars và Phase 2B đến Phase 5: chưa hoàn thành.

### Giai đoạn 3: Chiêm tinh Vệ Đà

Trạng thái: chưa bắt đầu. Không tự chọn ayanamsha, house system, node hoặc phạm vi dasha/nakshatra.

### Giai đoạn 4: Bát Tự

Trạng thái: chưa bắt đầu. Không tự chọn lịch pháp, trường phái, mốc ngày/giờ hoặc phương pháp đại vận.

### Giai đoạn 5: Tử Vi

Trạng thái: chưa bắt đầu. Không tự chọn trường phái, âm lịch, tháng nhuận hoặc quy tắc an sao.

### Giai đoạn 6: Tổng hợp liên trường phái và hoàn thiện phát hành

Trạng thái: chưa bắt đầu. Chỉ thực hiện sau khi bốn hệ thống có calculation và interpretation đã được kiểm định độc lập.

## Stack và quyết định kỹ thuật hiện tại

- Next.js `16.2.12`, App Router.
- React `19.2.4`.
- TypeScript 5.
- Tailwind CSS 4.
- Vitest `4.1.10`.
- `geo-tz` `8.1.8`, MIT, chạy server với entrypoint `geo-tz/all`.
- `temporal-polyfill` `1.0.2`, MIT, xử lý IANA timezone và DST lịch sử.
- `astronomy-engine` `2.1.19`, MIT, tính ephemeris Tây phương.
- React SVG thuần cho vòng tròn lá số; không có dependency đồ họa lớn.
- Không có API key và không gửi dữ liệu sinh đến dịch vụ ngoài.
- Swiss Ephemeris không được cài hoặc chạy.

Chi tiết giấy phép và độ chính xác nằm trong `README.md` và `docs/WESTERN_VALIDATION.md`.

## Luồng dữ liệu hiện tại

1. Người dùng nhập dữ liệu sinh tại trang chủ.
2. `src/lib/coordinates.ts` đọc DMS hoặc tọa độ thập phân.
3. `/api/timezone` dùng `geo-tz/all` tại server để nhận diện IANA timezone.
4. `src/lib/birth-time.ts` đổi giờ địa phương sang UTC bằng timezone IANA và quy tắc DST lịch sử.
5. Trang kết quả xác thực search params và hiển thị dữ liệu chuẩn hóa.
6. `calculateWesternAstrology` nhận giờ địa phương, UTC, latitude, longitude và timezone.
7. `WesternAstrologyResult` được truyền sang bảng, SVG và interpretation engine.
8. `interpretWesternCoreTriad` chỉ đọc Sun, Moon, ASC từ calculation result và chọn quy tắc phù hợp.
9. `interpretWesternPersonalPlanets` chỉ đọc Mercury từ calculation result và chọn quy tắc phù hợp cho Sao Thủy trong cung.

Không tính toán thiên văn hoặc viết công thức luận giải trực tiếp trong React component.

## File map quan trọng

### Dữ liệu sinh và thời gian

- `src/lib/coordinates.ts`
- `src/lib/birth-data.ts`
- `src/lib/birth-time.ts`
- `src/app/api/timezone/route.ts`
- `src/components/birth-form.tsx`
- `src/app/ket-qua/page.tsx`

### Calculation engine Tây phương

- `src/lib/western-astrology.ts`: Julian Day, 10 thiên thể Tropical, retrograde, ASC, MC, Placidus, aspects và result schema.
- `src/lib/house-placement.ts`: gán nhà theo khoảng `[cusp N, cusp N+1)` và dung sai `1e-9°`.
- `src/config/aspect-orbs.ts`: năm góc chính và orb mặc định.
- `src/lib/western-validation.test-data.ts`: fixture tĩnh cho 5 ca kiểm định cuối.
- `src/lib/western-astrology.test.ts`: test ephemeris, nhà, aspects, invariants và validation.

### SVG Tây phương

- `src/lib/western-chart-geometry.ts`: ánh xạ kinh độ sang SVG, layout marker và chuẩn hóa số.
- `src/lib/western-chart-geometry.test.ts`: test hình học, deterministic SVG và bất biến calculation result.
- `src/components/western-chart-wheel.tsx`: vòng tròn lá số responsive.

### Interpretation engine Tây phương Phase 1

Các đường dẫn thật đã xác nhận:

- `src/data/western-core-interpretations.ts`: file thêm mới, chứa 36 quy tắc và dữ liệu nguyên tố/tính chất.
- `src/lib/western-interpretation.ts`: file thêm mới, chọn rule và tổng hợp bộ ba deterministic.
- `src/lib/western-interpretation.test.ts`: file thêm mới, kiểm tra 36 rule, ID, dữ liệu bắt buộc, tính deterministic và bất biến calculation.
- `src/components/western-core-triad.tsx`: file thêm mới, hiển thị ba thẻ, evidence, tổng hợp và disclaimer.
- `src/components/result-tabs.tsx`: file có sẵn đã được cập nhật để tích hợp `WesternCoreTriad`.

### Interpretation engine hành tinh cá nhân

Các đường dẫn thật đã xác nhận:

- `src/data/western-personal-planet-interpretations.ts`: file thêm mới, hiện chứa 12 quy tắc Sao Thủy trong 12 cung và được thiết kế để mở rộng Venus/Mars.
- `src/lib/western-personal-planet-interpretation.ts`: file thêm mới, chọn rule personal planet từ `WesternAstrologyResult`, không tự tính lại hành tinh.
- `src/lib/western-personal-planet-interpretation.test.ts`: file thêm mới, kiểm tra đủ 12 rule Mercury, ID, dữ liệu bắt buộc, chọn rule, deterministic, evidence và bất biến calculation.
- `src/components/western-personal-planets.tsx`: file thêm mới, hiển thị mục “Hành tinh cá nhân” bên dưới bộ ba cốt lõi.
- `src/components/result-tabs.tsx`: file có sẵn đã được cập nhật để tích hợp `WesternPersonalPlanets`.

## Calculation engine Tây phương đã hoàn thành

- Julian Day từ UTC.
- 10 thiên thể Tropical: Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune và Pluto.
- Kinh độ `[0, 360)`, cung, tên tiếng Việt, độ và phút trong cung.
- Thuận hành/nghịch hành.
- ASC và MC.
- 12 house cusps Placidus.
- Hành tinh nằm trong nhà.
- Năm góc chiếu chính.
- Orb.
- Applying/separating; trả `null` khi không thể xác định đáng tin cậy.
- Vòng tròn lá số SVG responsive.

### Quy tắc house boundary

- Khoảng nhà là `[cusp N, cusp N+1)`.
- Thiên thể đúng cusp thuộc nhà bắt đầu tại cusp đó.
- Giá trị cách cusp không quá `1e-9°` cũng thuộc nhà mới để hấp thụ nhiễu dấu phẩy động.

### Hydration mismatch đã sửa

- Root cause là sai khác dấu phẩy động cuối giữa server và client khi tạo chuỗi SVG.
- `roundSvgNumber` và `formatSvgNumber` chuẩn hóa mọi giá trị SVG tối đa 6 chữ số thập phân.
- Áp dụng cho path `d`, điểm, tọa độ, line và marker.
- Test xác nhận cùng input tạo cùng chuỗi path qua nhiều lần chạy.
- Không dùng `suppressHydrationWarning`.
- Không cần `next/dynamic({ ssr: false })`.
- Kiểm tra trình duyệt sau nhiều lần reload không còn hydration warning và không đổi dữ liệu thiên văn.

## Kết quả kiểm định Calculation Tây phương

Nguồn chi tiết và toàn bộ số liệu: `docs/WESTERN_VALIDATION.md`.

### Phạm vi

- 5 ca: Việt Nam, London, New York, Sydney và London sát ingress Bạch Dương.
- Hai nguồn độc lập: Astrolog 8.00/Moshier và CircularNatalHoroscopeJS 1.1.0.
- Kiểm tra 10 thiên thể, ASC, MC, 12 cusp, retrograde, nhà, aspects, orb và applying/separating.

### Sai số lớn nhất

- Thiên thể so với Astrolog: `0.003466°`.
- Thiên thể so với Circular: `0.010122°`.
- ASC/MC/cusp so với Astrolog: `0.000248°`.
- Cusp so với Circular: `0.972187°` tại nhà 3/9 của New York.
- Orb so với Circular: `0.012087°`.

### Kết luận kiểm định

- Kinh độ, cung, retrograde, aspects và phase đủ ổn định cho luận giải có kiểm soát.
- Gán nhà của 10 thiên thể khớp hai nguồn trong cả 5 ca.
- Kết quả Placidus khớp Astrolog và corpus `pleiades-houses` rất sát.
- Circular có sai khác cusp lớn hơn và chỉ được dùng làm cảnh báo regression cho cusp.
- Chưa nên coi luận giải theo nhà là an toàn tuyệt đối khi thiên thể sát cusp. Trước Phase 3 cần thêm cảnh báo/độ bất định cho khoảng cách dưới `1°` hoặc thêm một nguồn Placidus có độ chính xác công bố rõ.

## Interpretation engine Phase 1 đã hoàn thành

- 12 rule Sun trong 12 cung.
- 12 rule Moon trong 12 cung.
- 12 rule ASC trong 12 cung.
- Tổng cộng 36 rule.
- Schema gồm `ruleId`, `title`, `summary`, `strengths`, `challenges`, `developmentAdvice`, `evidence`, `version`.
- Rule ID dạng `WESTERN-BODY-SIGN-V1`.
- Version hiện tại: `1.0.0`.
- Evidence lưu body/điểm góc và sign; giao diện bổ sung kinh độ calculation thực tế.
- Có dữ liệu 4 nguyên tố và 3 tính chất cho 12 cung.
- Tổng hợp deterministic theo nguyên tố, tính chất và quan hệ Moon/ASC.
- Có ba thẻ “Bộ ba cốt lõi”.
- Có nút “Vì sao có kết luận này?” hiển thị dữ liệu, cung, kinh độ, rule ID và version.
- Có disclaimer.
- Không dùng AI, API mô hình ngôn ngữ hoặc văn bản ngẫu nhiên.
- Calculation engine không bị sửa khi thêm Phase 1; test snapshot xác nhận interpretation không mutate result.

## Interpretation engine Mercury đã hoàn thành

- 12 rule Mercury trong 12 cung.
- Schema gồm `ruleId`, `title`, `summary`, `strengths`, `challenges`, `developmentAdvice`, `evidence`, `version`.
- Rule ID dạng `WESTERN-MERCURY-SIGN-V1`.
- Version hiện tại: `1.0.0`.
- Evidence lưu body Mercury và sign; giao diện bổ sung kinh độ calculation thực tế.
- Engine personal planets được viết để mở rộng Venus và Mars trong cùng file/kiến trúc; không tạo engine Mercury riêng.
- Có mục “Hành tinh cá nhân” trong giao diện, hiện chỉ hiển thị Sao Thủy.
- Có nút “Vì sao có kết luận này?” hiển thị dữ liệu, cung, kinh độ, rule ID và version.
- Không dùng AI, API mô hình ngôn ngữ hoặc văn bản ngẫu nhiên.
- Calculation engine không bị sửa khi thêm Mercury; test xác nhận interpretation không mutate result.

## Backlog luận giải Tây phương theo thứ tự bắt buộc

### Phase 2A: Mercury, Venus và Mars trong 12 cung

- 36 quy tắc.
- Chỉ luận cung.
- Chưa luận nhà hoặc góc chiếu.
- Mercury × 12 cung: hoàn thành.
- Bước tiếp theo: Venus × 12 cung.
- Sau Venus: Mars × 12 cung.

### Phase 2B: Jupiter, Saturn, Uranus, Neptune và Pluto trong 12 cung

- 60 quy tắc.
- Dùng cùng schema, tone, versioning và evidence của Phase 1.

### Phase 3: 10 thiên thể trong 12 nhà

- 120 quy tắc.
- Chia thành nhiều nhóm nhỏ để kiểm soát chất lượng.
- Giải quyết cảnh báo sát cusp trước khi phát hành.

### Phase 4: Luận góc chiếu

- Chỉ tạo lời luận từ aspect thực sự tồn tại trong calculation result.
- Evidence phải gồm `body1`, `body2`, `aspect`, `orb` và `applying/separating`.
- Không đoán phase khi calculation trả `null`.

### Phase 5: Tổng hợp toàn lá số Tây phương

- Deterministic.
- Không phán số phận tuyệt đối.
- Không để một rule đơn lẻ lấn át toàn lá số.
- Quy tắc trọng số, lặp chủ đề và mâu thuẫn phải được viết rõ và có test.

## Quyết định nghiệp vụ chưa được phép tự chọn

### Chiêm tinh Vệ Đà

Chủ dự án cần xác nhận:

- Ayanamsha.
- House system.
- True node hay mean node cho Rahu/Ketu.
- Phạm vi graha, nakshatra, pada, dasha và divisional charts.
- Nguồn ephemeris, độ chính xác và giấy phép thương mại.
- Schema evidence và phạm vi luận giải bản đầu.

### Bát Tự

Chủ dự án cần xác nhận:

- Trường phái và bộ quy tắc.
- Dùng tiết khí thế nào cho trụ năm và trụ tháng, gồm Lập Xuân.
- Mốc đổi ngày, đặc biệt giờ Tý.
- Giờ dân sự hay true solar time.
- Quy tắc thuận/nghịch đại vận.
- Tàng can, thập thần, dụng thần và phạm vi các chu kỳ vận.
- Nguồn lịch pháp và bộ dữ liệu đối chiếu.

### Tử Vi

Chủ dự án cần xác nhận:

- Trường phái hoặc bộ quy tắc cụ thể.
- Nguồn âm lịch và quy tắc tháng nhuận.
- Mốc đổi ngày và giờ Tý.
- Cách an Mệnh, an Thân và 12 cung.
- Hệ chính tinh, phụ tinh, Tứ Hóa và các vòng sao được hỗ trợ.
- Quy tắc giới tính, âm dương và thuận/nghịch.
- Bộ lá số tham chiếu độc lập và giấy phép dữ liệu.

### Tổng hợp liên trường phái

- Chưa bắt đầu.
- Không trộn thuật ngữ hoặc kết luận giữa các hệ thống khi chưa có quy tắc nghiệp vụ được phê duyệt.
- Mỗi kết luận tổng hợp vẫn phải truy ngược được về system, rule ID, version và evidence.

## Nguyên tắc không được phá vỡ

- Không dùng AI để tính lá số.
- Không tạo dữ liệu giả hoặc kết quả mẫu để che lỗi.
- Không tự chọn trường phái.
- Không thay đổi calculation engine đã kiểm định nếu không cần thiết.
- Calculation và interpretation phải tách riêng.
- Công thức không được viết trực tiếp trong component giao diện.
- Mỗi lời luận phải có rule ID, version và evidence.
- Không dùng Swiss Ephemeris khi chưa có quyết định giấy phép được chủ dự án xác nhận.
- Văn luận dùng cách diễn đạt như “có xu hướng”, “có thể”, “thường thể hiện”.
- Không hù dọa, phán xét, khẳng định số phận tuyệt đối hoặc chẩn đoán y khoa/tâm lý.
- Không sao chép nguyên văn nội dung có bản quyền.
- Nếu engine lỗi, hiển thị lỗi rõ ràng; không thay bằng dữ liệu giả.
- Mỗi nhiệm vụ phải chạy `npm test`, `npm run lint` và `npm run build`.
- Giữ test regression cho dữ liệu thiên văn và bất biến calculation khi mở rộng interpretation.

## Trạng thái kiểm tra tại thời điểm bàn giao

Kết quả đã chạy lại trong nhiệm vụ nghiệm thu Mercury ngày 2026-08-03:

- `npm test`: 93/93 test đạt.
- `npm run lint`: đạt.
- `npm run build`: đạt.
- Kiểm tra trình duyệt gần nhất: mục Sao Thủy hiển thị đúng, evidence mở được, không có lỗi console, không có hydration warning và không tràn ngang tại viewport 390px.

## Bước tiếp theo chính xác

Phase 2A tiếp theo: luận Venus trong 12 cung.

Phạm vi bước tiếp theo:

- Thêm 12 rule Venus theo cung vào kiến trúc personal planets hiện có.
- Dùng cùng schema và nguyên tắc văn phong của Phase 1.
- Mỗi rule có ID, version và evidence.
- Mở rộng UI và test hiện có; không tạo engine mới.
- Không luận hành tinh trong nhà.
- Không luận góc chiếu.
- Không dùng AI.
- Không thay đổi calculation engine.

Sau Venus, triển khai Mars trong 12 cung để hoàn tất Phase 2A tổng cộng 36 quy tắc. Không chuyển ngay sang 120 rule hành tinh trong nhà. Việc chia nhỏ giúp kiểm soát chất lượng nội dung và dành thời gian xử lý chính sách sát cusp trước Phase 3.

## Lệnh vận hành

```bash
npm install
npm run dev
```

Mở `http://localhost:3000`.

Trước khi kết thúc mọi nhiệm vụ:

```bash
npm test
npm run lint
npm run build
```

## Checklist bàn giao cho cuộc trò chuyện mới

- Xác nhận đang làm trong `G:\thienvan`.
- Đọc năm tài liệu ở đầu file này.
- Kiểm tra thay đổi hiện có trước khi sửa; không hoàn tác thay đổi không liên quan.
- Không sửa calculation engine cho nhiệm vụ nội dung nếu đầu ra hiện tại đã đủ.
- Giữ phạm vi nhiệm vụ nhỏ và có test.
- Ghi rõ file tạo/sửa và phần chưa triển khai.
- Sau mỗi phase luận giải, cập nhật `README.md`, `docs/PROJECT_STATUS.md` và tài liệu này.
