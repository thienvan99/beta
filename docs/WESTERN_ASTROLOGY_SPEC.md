# Western Astrology Specification

Cập nhật kiểm kê: 2026-08-03.

> **Historical implementation inventory snapshot.** Tài liệu này giữ nguyên trạng thái/routing tại checkpoint 2026-08-03 và không phải nguồn trạng thái hiện hành. Với project state, canonical routing và task priority hiện tại, dùng `docs/PROJECT_STATUS.md`, `docs/DECISION_LOG.md` và `docs/CODEX_TASK_QUEUE.md`.

Tài liệu này mô tả cấu trúc thực tế của phân hệ Chiêm tinh Tây phương trong repository hiện tại. Phân hệ dùng Tropical Zodiac, hệ nhà Placidus và calculation deterministic bằng `astronomy-engine`. Không dùng Swiss Ephemeris, AI hoặc dịch vụ ngoài để tính lá số.

## 1. Mục tiêu phân hệ

Phân hệ Chiêm tinh Tây phương nhận dữ liệu sinh đã chuẩn hóa, tính dữ liệu lá số Tây phương, hiển thị vòng tròn/bảng dữ liệu và tạo các phần luận giải rule-based có evidence.

Phạm vi đã có:

- 10 thiên thể: Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto.
- Tropical Zodiac và tên cung tiếng Việt.
- ASC, MC và 12 cusp Placidus.
- Hành tinh trong nhà.
- 5 góc chiếu chính.
- Vòng tròn lá số SVG responsive.
- Luận Sun, Moon, ASC trong cung.
- Luận Mercury, Venus, Mars trong cung.
- Luận Jupiter trong cung.

Phạm vi chưa có:

- Chủ tinh của từng nhà.
- Luận Saturn, Uranus, Neptune, Pluto trong cung.
- Luận hành tinh trong nhà.
- Luận góc chiếu mới bao phủ một phần các cặp thiên thể.
- Luận tổng hợp toàn lá số theo tính cách, tiềm năng, tình cảm, sự nghiệp và chủ đề chính.
- Báo cáo production có version snapshot/entitlement/thanh toán.

## 2. Luồng dữ liệu

```text
Người dùng nhập ngày/giờ/phút/tọa độ/giới tính
  -> parse tọa độ
  -> POST /api/timezone để nhận diện IANA timezone
  -> calculateBirthTime đổi giờ địa phương sang UTC
  -> /ket-qua nhận search params đã chuẩn hóa
  -> calculateWesternAstrology
  -> WesternAstrologyResult
  -> ResultTabs
  -> WesternChartWheel + bảng dữ liệu + interpretation components
```

File chính:

- `src/components/birth-information-form.tsx`: form nhập, tự nhận diện timezone, lưu draft/profile.
- `src/lib/birth-data.ts`: schema dữ liệu sinh và validation.
- `src/lib/coordinates.ts`: parser tọa độ DMS/thập phân.
- `src/lib/birth-time.ts`: chuẩn hóa local time, UTC offset và UTC datetime.
- `src/app/api/timezone/route.ts`: route tra timezone từ tọa độ.
- `src/app/ket-qua/page.tsx`: đọc search params, tính birth time và gọi calculation Tây phương.
- `src/components/result-tabs.tsx`: tab kết quả và panel Tây phương.

## 3. Dữ liệu sinh và persistence

Input bắt buộc hiện tại:

- `birthDate`: định dạng `YYYY-MM-DD`.
- `hour`: số nguyên 0-23.
- `minute`: số nguyên 0-59.
- `coordinates`: chuỗi tọa độ DMS hoặc `latitude, longitude`.
- `timezone`: IANA timezone, tự nhận diện từ tọa độ hoặc người dùng nhập thủ công.
- `gender`: `male` hoặc `female`.

Cơ chế lưu:

- Draft form lưu tại localStorage key `thienvan.birth-draft.v1`.
- Danh sách profile lưu tại key `thienvan.birth-profiles.v1`.
- Tối đa 10 hồ sơ.
- Profile lưu ngày, giờ, phút, tọa độ, giới tính, tên gợi nhớ và `savedAt`.
- Không lưu `timezone` trong profile; khi mở lại sẽ tính lại timezone từ tọa độ.
- Không lưu birthplace/nơi sinh.

File chính:

- `src/lib/birth-profile-storage.ts`
- `src/lib/birth-profile-storage.test.ts`
- `src/components/birth-information-form.tsx`

## 4. Calculation Engine

Entry point:

- `calculateWesternAstrology(input)` trong `src/lib/western-astrology.ts`.

Input type:

- `localDateTime`
- `utcDateTime`
- `latitude`
- `longitude`
- `timeZone`

Output type `WesternAstrologyResult`:

- `system: "Tropical Zodiac"`
- `houseSystem: "Placidus"`
- `julianDay`
- `bodies`
- `angles`
- `houses`
- `aspects`

### 4.1 Thiên thể

Mỗi `CelestialBodyPosition` gồm:

- `name`
- `longitude`
- `sign`
- `signVietnamese`
- `degree`
- `minute`
- `retrograde`
- `house`

Danh sách 10 thiên thể nằm trong `celestialBodies` của `src/lib/western-astrology.ts`.

### 4.2 Cung Hoàng đạo

`longitudeToZodiac(longitude)` chia vòng 360 độ thành 12 cung, mỗi cung 30 độ. Tên cung tiếng Việt nằm trong `zodiacSignLabels`.

### 4.3 ASC, MC và 12 nhà

`calculateAnglesAndHouses` tính:

- ASC.
- MC.
- 12 cusp Placidus.

Nếu Placidus không xác định gần vòng cực, engine ném `PlacidusCalculationError` với thông báo rõ ràng.

### 4.4 Hành tinh trong nhà

`findHouseForLongitude` trong `src/lib/house-placement.ts` gán longitude vào nhà theo quy tắc:

- Khoảng nhà là `[cusp N, cusp N+1)`.
- Giá trị đúng cusp thuộc nhà bắt đầu tại cusp đó.
- Dung sai biên `1e-9°`.

Calculation engine trả `house` trực tiếp cho từng thiên thể; UI không tự tính lại.

### 4.5 Góc chiếu

`calculateMajorAspects` xét từng cặp trong 10 thiên thể.

Các góc chính trong `src/config/aspect-orbs.ts`:

| Code | Tên Anh | Tên Việt | Góc | Orb |
| --- | --- | --- | ---: | ---: |
| `conjunction` | Conjunction | Đồng cung | 0° | 8° |
| `opposition` | Opposition | Đối đỉnh | 180° | 8° |
| `trine` | Trine | Tam hợp | 120° | 7° |
| `square` | Square | Vuông | 90° | 7° |
| `sextile` | Sextile | Lục hợp | 60° | 5° |

Mỗi aspect gồm:

- `id`
- `body1`
- `body2`
- `aspect`
- `aspectEnglish`
- `aspectVietnamese`
- `exactAngle`
- `actualAngle`
- `orb`
- `phase`: `applying`, `separating` hoặc `null`.

Phase được xác định bằng mẫu trước/sau 1 phút.

## 5. Vòng tròn lá số

Component:

- `src/components/western-chart-wheel.tsx`

Geometry:

- `src/lib/western-chart-geometry.ts`

Đặc điểm:

- SVG thuần React.
- ASC đặt ở vị trí 9 giờ.
- 12 cung, 12 cusp, ASC, MC, 10 thiên thể và aspect lines lấy trực tiếp từ `WesternAstrologyResult`.
- Ký hiệu hành tinh gần nhau được layout bằng nhiều bán kính và có đường nối về điểm longitude thật.
- Hover, touch/click và keyboard focus hiển thị thông tin hành tinh.
- Có `<title>`, `<desc>` và aria label cho các nhóm chính.
- SVG number được làm tròn deterministic tối đa 6 chữ số thập phân để tránh hydration mismatch.

## 6. Interpretation Engine

Nguyên tắc:

- Tách khỏi calculation engine.
- Chỉ đọc `WesternAstrologyResult`.
- Không mutate dữ liệu calculation.
- Không dùng AI, API mô hình hoặc nội dung ngẫu nhiên.
- Mỗi rule có `ruleId`, `version` và `evidence`.

### 6.1 Bộ ba cốt lõi

File:

- `src/data/western-core-interpretations.ts`
- `src/lib/western-interpretation.ts`
- `src/components/western-core-triad.tsx`

Đã có 36 rule:

- Sun trong 12 cung.
- Moon trong 12 cung.
- ASC trong 12 cung.

Synthesis hiện có:

- Tổng hợp bộ ba dựa trên nguyên tố, tính chất và quan hệ Moon/ASC.
- Đây chưa phải tổng hợp toàn lá số.

### 6.2 Hành tinh cá nhân

File:

- `src/data/western-personal-planet-interpretations.ts`
- `src/lib/western-personal-planet-interpretation.ts`
- `src/components/western-personal-planets.tsx`

Đã có 36 rule:

- Mercury trong 12 cung.
- Venus trong 12 cung.
- Mars trong 12 cung.

### 6.3 Hành tinh xã hội

File:

- `src/data/western-social-planet-interpretations.ts`
- `src/lib/western-social-planet-interpretation.ts`
- `src/components/western-social-planets.tsx`

Đã có 12 rule:

- Jupiter trong 12 cung.

Chưa có:

- Saturn/Uranus/Neptune/Pluto trong cung.
- Bất kỳ hành tinh nào trong nhà.

### 6.4 Góc chiếu

File:

- `src/data/western-aspect-interpretations.ts`
- `src/lib/western-aspect-interpretation.ts`
- `src/components/western-aspect-interpretations.tsx`

Đã có 114 rule: toàn bộ nhóm Sun khả thi, 5/5 Sun–Moon, toàn bộ nhóm Moon từ Moon–Mercury đến Moon–Pluto, toàn bộ nhóm Mercury khả thi từ Mercury–Venus đến Mercury–Pluto và 5/5 Venus–Mars. Mercury–Venus opposition, trine và square bất khả thi theo feasibility policy nên không có interpretation rule; các cặp Mercury còn lại có đủ 5/5 major aspects. Resolver canonical hóa thứ tự cặp thiên thể, chỉ luận aspect thực sự có trong calculation result và không tạo fallback.

## 7. UI Tây phương

Panel Tây phương trong `src/components/result-tabs.tsx` hiện hiển thị:

- Hệ thống và Julian Day.
- `WesternCoreTriad`.
- `WesternPersonalPlanets`.
- `WesternSocialPlanets`.
- Vòng tròn lá số.
- Bảng 10 thiên thể.
- Bảng ASC/MC.
- Bảng 12 nhà.
- Bảng góc chiếu.

Các tab khác hiện chỉ có placeholder “Chức năng đang được phát triển.”

## 8. Kiểm định hiện có

Automated tests:

- `src/lib/coordinates.test.ts`
- `src/lib/birth-time.test.ts`
- `src/lib/timezone-lookup.server.test.ts`
- `src/lib/birth-profile-storage.test.ts`
- `src/lib/western-astrology.test.ts`
- `src/lib/western-chart-geometry.test.ts`
- `src/lib/western-interpretation.test.ts`
- `src/lib/western-personal-planet-interpretation.test.ts`
- `src/lib/western-social-planet-interpretation.test.ts`

Quality gates chạy trong lần kiểm kê 2026-08-03:

- `npm test`: 9 files, 124 tests passed.
- `npm run lint`: passed.
- `npm run build`: passed, routes `/`, `/_not-found`, `/api/timezone`, `/ket-qua`.

Browser smoke test 2026-08-03:

- URL mẫu: `/ket-qua?birthDate=1990-01-15&hour=8&minute=30&latitude=10.8231&longitude=106.6297&timezone=Asia%2FHo_Chi_Minh&gender=male`.
- Desktop effective viewport `1280x720`: tab Tây phương mở được, có section “Hành tinh xã hội” chỉ render Sao Mộc, evidence mở được với `WESTERN-JUPITER-CANCER-V1`, longitude và độ/phút; có SVG, 4 bảng, không horizontal overflow toàn trang, không console error/warning.
- Mobile viewport `390x844`: section “Hành tinh xã hội” hiển thị Sao Mộc và evidence đúng; không horizontal overflow toàn trang; vòng tròn lá số render `309x309`; 4 bảng dữ liệu scroll ngang trong container; không console error/warning.

## 9. Giới hạn cần lưu ý

- Chưa có house ruler schema hoặc calculation.
- Chưa có cảnh báo hành tinh sát cusp, dù tài liệu validation khuyến nghị xử lý trước khi luận nhà production.
- Chưa có UI/nội dung giải thích house ruler.
- Chưa có interpretation cho Saturn-Uranus-Neptune-Pluto trong cung.
- Chưa có interpretation cho hành tinh trong nhà.
- Interpretation cho aspect mới bao phủ 114/214 combination khả thi; các cặp còn lại chưa có rule.
- Chưa có full chart synthesis.
- Đã có Playwright Test E2E bằng Chromium cho flow canonical nhập dữ liệu → kết quả → tab Tây phương, SVG/bảng/evidence và responsive smoke tại 1280/768/390/360; Vitest tiếp tục phụ trách unit/integration tests.
- Mobile table đọc được bằng horizontal scroll, nhưng trải nghiệm chưa tối ưu cho người dùng phổ thông.
