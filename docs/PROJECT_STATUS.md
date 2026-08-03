# Trạng thái dự án Thiên Vận

Cập nhật: 2026-08-03.

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
| 2 | Chiêm tinh Tây phương: calculation, kiểm định, trực quan hóa và luận giải | Đang thực hiện; calculation, luận giải Phase 1 và Mercury × 12 cung đã hoàn thành |
| 3 | Chiêm tinh Vệ Đà | Chưa bắt đầu |
| 4 | Bát Tự | Chưa bắt đầu |
| 5 | Tử Vi | Chưa bắt đầu |
| 6 | Tổng hợp liên trường phái và hoàn thiện phát hành | Chưa bắt đầu |

Không được thu hẹp tài liệu hoặc kiến trúc thành dự án chỉ dành cho Chiêm tinh Tây phương.

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

Mercury × 12 cung đã hoàn thành:

- 12 quy tắc Sao Thủy trong 12 cung.
- Mỗi quy tắc có `ruleId`, `version`, `evidence`, `summary`, `strengths`, `challenges` và `developmentAdvice`.
- Rule ID ổn định theo dạng `WESTERN-MERCURY-SIGN-V1`; phiên bản hiện tại là `1.0.0`.
- Engine nằm tại `src/lib/western-personal-planet-interpretation.ts`, chỉ đọc `WesternAstrologyResult`, lấy đúng vị trí Mercury do calculation engine trả về và chọn rule theo cung.
- Engine và UI được đặt tên theo personal planets để sau này mở rộng Venus và Mars trong cùng kiến trúc, không tạo engine riêng mới.
- Giao diện `src/components/western-personal-planets.tsx` hiển thị mục “Hành tinh cá nhân” bên dưới bộ ba cốt lõi, gồm Sao Thủy, cung, độ/phút, thuận/nghịch hành, nội dung luận giải và evidence.
- Calculation engine không thay đổi.

Đường dẫn thật đã xác nhận:

- Thêm mới: `src/data/western-personal-planet-interpretations.ts`
- Thêm mới: `src/lib/western-personal-planet-interpretation.ts`
- Thêm mới: `src/lib/western-personal-planet-interpretation.test.ts`
- Thêm mới: `src/components/western-personal-planets.tsx`
- Đã cập nhật để tích hợp giao diện: `src/components/result-tabs.tsx`

## Trạng thái kiểm tra hiện tại

Kết quả đã chạy lại trong nhiệm vụ local birth profile persistence ngày 2026-08-03:

- `npm test`: 106/106 test đạt.
- `npm run lint`: đạt.
- `npm run build`: đạt.
- Kiểm tra trình duyệt gần nhất: form không còn trường “Nơi sinh”, dữ liệu bản nháp còn khi quay lại từ trang kết quả, hồ sơ đã lưu còn sau reload, có thể mở lại/xóa hồ sơ, không có lỗi console, không có React hydration warning và không tràn ngang tại desktop hoặc viewport 390px.

## Backlog luận giải Tây phương

### Phase 2A: Mercury, Venus và Mars trong 12 cung

- 36 quy tắc.
- Chỉ luận vị trí trong cung.
- Chưa luận nhà hoặc góc chiếu trong phase này.
- Mercury × 12 cung: hoàn thành.
- Bước tiếp theo: Venus × 12 cung.
- Sau Venus: Mars × 12 cung.

### Phase 2B: Jupiter, Saturn, Uranus, Neptune và Pluto trong 12 cung

- 60 quy tắc.
- Giữ cùng schema rule ID, version, evidence và nội dung có cấu trúc.

### Phase 3: 10 thiên thể trong 12 nhà

- 120 quy tắc.
- Nên chia thành nhiều nhóm nhỏ để kiểm soát chất lượng.
- Cần xử lý hoặc cảnh báo trường hợp thiên thể cách cusp dưới `1°` trước khi coi nội dung theo nhà là sẵn sàng production.

### Phase 4: Các góc chiếu

- Dựa trực tiếp trên `body1`, `body2`, `aspect`, `orb` và `applying/separating` từ calculation engine.
- Không tạo nội dung cho góc chiếu không tồn tại trong lá số.
- Không suy đoán phase khi calculation trả `null`.

### Phase 5: Tổng hợp toàn lá số Tây phương

- Tổng hợp deterministic.
- Không phán số phận tuyệt đối.
- Không để một quy tắc đơn lẻ lấn át toàn bộ lá số.
- Cần quy tắc ưu tiên, lặp chủ đề và xung đột được viết rõ và có test.

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

Phase 2A tiếp theo: luận Venus trong 12 cung.

Sau Venus, triển khai Mars trong 12 cung để hoàn tất Phase 2A tổng cộng 36 quy tắc. Không thay đổi calculation engine.

Không triển khai hành tinh trong nhà ngay ở bước tiếp theo. Việc tạo một lần 120 quy tắc sẽ khó kiểm soát chất lượng và còn phụ thuộc quyết định về cảnh báo khi thiên thể nằm sát cusp.
