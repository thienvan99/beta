# Thiên Vận

Giao diện nhập thông tin sinh, chuẩn hóa địa điểm và thời gian, cùng nền tảng tính toán Chiêm tinh Tây phương theo Tropical Zodiac và hệ nhà Placidus. Hệ thống luận giải hiện hỗ trợ bộ ba Mặt Trời, Mặt Trăng, Cung Mọc và Sao Thủy trong 12 cung; các hệ thống Bát Tự, Tử Vi và Chiêm tinh Vệ Đà chưa được triển khai.

## Chạy dự án

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

Kiểm tra chất lượng:

```bash
npm test
npm run lint
npm run build
```

## Lựa chọn múi giờ và thời gian

- [`geo-tz`](https://github.com/evansiroky/node-geo-tz) 8.1.8, giấy phép MIT: tra cứu chính xác IANA timezone từ tọa độ. Dự án dùng entrypoint `geo-tz/all` với bộ dữ liệu comprehensive để giữ các định danh có lịch sử khác nhau trước năm 1970.
- Dữ liệu ranh giới của `geo-tz` đến từ [`timezone-boundary-builder`](https://github.com/evansiroky/timezone-boundary-builder), được xây dựng chủ yếu từ OpenStreetMap và phát hành theo ODbL.
- [`temporal-polyfill`](https://github.com/fullcalendar/temporal-polyfill) 1.0.2, giấy phép MIT: triển khai Temporal chuẩn để đổi thời gian địa phương sang UTC bằng IANA timezone và quy tắc DST lịch sử của môi trường chạy.

`geo-tz` chỉ chạy ở Route Handler phía server. Trình duyệt gửi tọa độ bằng `POST` đến `/api/timezone` của chính ứng dụng; route này không gọi dịch vụ bên ngoài, không cần API key và không chuyển tiếp tọa độ hoặc dữ liệu sinh cho bên thứ ba.

Với giờ địa phương rơi đúng vào khoảng DST lặp hoặc bị bỏ qua, dự án dùng quy tắc `compatible` của Temporal: chọn thời điểm sớm hơn khi giờ bị lặp và thời điểm muộn hơn khi giờ không tồn tại.

## Lựa chọn thư viện thiên văn

- [`astronomy-engine`](https://github.com/cosinekitty/astronomy) 2.1.19, giấy phép MIT: giấy phép cho phép sử dụng, sửa đổi và phân phối trong website thương mại khi giữ thông báo bản quyền và giấy phép.
- Thư viện được thiết kế với sai số tối đa khoảng ±1 phút cung, dựa trên VSOP87 và NOVAS, đồng thời được tác giả kiểm thử với JPL Horizons.
- Không cần API key, dịch vụ ngoài hoặc file ephemeris tải riêng. Các mô hình và hệ số cần thiết đã nằm trong gói cài đặt.
- Service tính apparent geocentric longitude, có hiệu chỉnh light-time và aberration, rồi chuyển sang true ecliptic of date để dùng Tropical Zodiac. Nghịch hành được xác định từ chiều chuyển động kinh độ tại hai mốc cách thời điểm sinh ±1 giờ.
- Test đối chiếu dùng các giá trị tĩnh từ [NASA/JPL Horizons](https://ssd.jpl.nasa.gov/horizons/) DE441, quantity 31, tại ba thời điểm UTC. Sai số cho phép là `0.01°` (0,6 phút cung); tests không gọi mạng.

## ASC, MC và hệ nhà Placidus

- Không thêm dependency sản xuất mới. ASC, MC và 12 cusp dùng Julian Day, Greenwich Apparent Sidereal Time và true obliquity do `astronomy-engine` cung cấp, kết hợp kinh độ và vĩ độ nơi sinh.
- Các cusp trung gian của Placidus dùng phương pháp semi-arc chuẩn và bộ giải Newton có kiểm tra hội tụ. Khi vị trí nằm trong vùng gần vòng cực, nơi Placidus không xác định, service trả lỗi rõ ràng và không thay bằng hệ nhà khác.
- Test đối chiếu dùng ba hàng fixture tĩnh từ validation corpus của [`pleiades-houses`](https://github.com/rahulmutt/pleiades/tree/main/crates/pleiades-houses), giấy phép MIT OR Apache-2.0. Đây chỉ là nguồn kiểm tra độc lập, không phải dependency của website và phù hợp cho việc kiểm chứng trong dự án thương mại.
- Sai số cho phép của ASC, MC và cả 12 cusp là `0.0003°` (1,08 giây cung). Các fixture gồm xích đạo, 40° Bắc và 33° Nam; tests không gọi mạng.
- Swiss Ephemeris không được cài, liên kết hoặc chạy trong website. Dự án chỉ lưu các giá trị số tĩnh của corpus đối chiếu.

## Góc chiếu

Góc chiếu được tính từ khoảng cách ngắn nhất trên vòng tròn 0–360° giữa từng cặp trong 10 thiên thể. Năm góc chính và orb mặc định nằm riêng tại `src/config/aspect-orbs.ts`: Conjunction 8°, Opposition 8°, Trine 7°, Square 7° và Sextile 5°.

Mỗi kết quả có ID ổn định, mã quy tắc chữ thường, tên tiếng Anh/Việt, orb đầy đủ và phase `applying` hoặc `separating`. Phase được xác định bằng thay đổi orb giữa hai mẫu ephemeris cách thời điểm sinh ±1 phút. Nếu thay đổi nhỏ hơn ngưỡng số học hoặc đúng điểm không thể phân loại chắc chắn, service trả `null` thay vì đoán.

## Gán thiên thể vào nhà

- Calculation engine trả trực tiếp `house` cho từng thiên thể; giao diện và SVG không tự tính lại bằng quy tắc khác.
- Khoảng nhà dùng quy tắc `[cusp N, cusp N+1)`: đúng cusp thuộc nhà bắt đầu tại cusp đó.
- Dung sai biên `1e-9°` hấp thụ nhiễu dấu phẩy động; giá trị trong dung sai thuộc nhà mới. Quy tắc và test nằm ở `src/lib/house-placement.ts`.

## Kiểm định cuối

[`docs/WESTERN_VALIDATION.md`](docs/WESTERN_VALIDATION.md) ghi năm ca kiểm định tại Việt Nam, London, New York, Sydney và một thời điểm sát ingress Bạch Dương. Mỗi ca được đối chiếu với Astrolog 8.00/Moshier và CircularNatalHoroscopeJS 1.1.0 cho 10 thiên thể, ASC/MC, 12 cusp, retrograde, nhà và aspects.

Hai công cụ tham chiếu chỉ được chạy ngoài dự án để tạo fixture tĩnh; không phải dependency sản xuất. Test không gọi mạng, không dùng Swiss Ephemeris và không gửi dữ liệu sinh ra ngoài.

## Vòng tròn lá số

- Vòng tròn được dựng bằng React SVG thuần, không thêm thư viện đồ họa và không dùng ảnh lá số có sẵn.
- ASC được đặt tại vị trí 9 giờ. Kinh độ hoàng đạo, 12 cusp Placidus, ASC, MC, 10 thiên thể và các đường góc chiếu đều được ánh xạ trực tiếp từ `WesternAstrologyResult`; Bạch Dương không bị cố định ở phía trên.
- Ký hiệu thiên thể gần nhau được phân bổ trên nhiều bán kính. Với cụm dày hơn số làn có sẵn, nhãn được dịch nhẹ theo góc hiển thị nhưng luôn có dấu neo và đường nối về kinh độ thật; dữ liệu calculation không bị thay đổi.
- Chuột, thao tác chạm và focus bàn phím đều mở thông tin thiên thể gồm cung, độ/phút, nhà và trạng thái chuyển động. SVG có tiêu đề, mô tả và nhãn truy cập cho các phần chính.
- Các hàm hình học nằm tại `src/lib/western-chart-geometry.ts` và được kiểm thử độc lập, gồm hướng xoay, vị trí ASC/cusp/thiên thể và tính bất biến của dữ liệu đầu vào.

## Luận giải Chiêm tinh Tây phương Phase 1

- Interpretation engine nằm riêng tại `src/lib/western-interpretation.ts` và chỉ đọc kết quả từ calculation engine; không sửa kinh độ, cung, nhà hoặc bất kỳ dữ liệu thiên văn nào.
- `src/data/western-core-interpretations.ts` chứa 36 quy tắc viết mới bằng tiếng Việt: 12 cung cho Mặt Trời, 12 cung cho Mặt Trăng và 12 cung cho Cung Mọc. Mỗi quy tắc có ID ổn định, evidence và phiên bản `1.0.0`.
- Phần tổng hợp bộ ba là deterministic, dựa trên nguyên tố, tính chất và quan hệ giữa Mặt Trăng với Cung Mọc. Cùng một đầu vào luôn trả cùng một nội dung.
- Không dùng AI, API mô hình ngôn ngữ, nội dung ngẫu nhiên hoặc dịch vụ ngoài để tạo luận giải.
- Nội dung được dùng cho mục đích tự quan sát và tham khảo, không phải kết luận khoa học, chẩn đoán hoặc sự xác định tuyệt đối về số phận.

## Luận giải hành tinh cá nhân

- `src/data/western-personal-planet-interpretations.ts` hiện chứa 12 quy tắc Sao Thủy trong 12 cung. Mỗi quy tắc có `ruleId`, `version`, `title`, `summary`, `strengths`, `challenges`, `developmentAdvice` và `evidence`.
- `src/lib/western-personal-planet-interpretation.ts` chỉ đọc `WesternAstrologyResult`, lấy vị trí Sao Thủy do calculation engine đã tính và chọn rule theo cung; không tự tính lại hành tinh và không mutate output calculation.
- Giao diện “Hành tinh cá nhân” hiển thị Sao Thủy, cung, độ/phút, trạng thái thuận/nghịch hành, nội dung luận giải và phần evidence truy ngược được tới rule ID, version, body, sign và longitude.
- Phase 2A còn lại: Venus × 12 cung là bước tiếp theo, sau đó Mars × 12 cung. Calculation engine vẫn không thay đổi.

## Phạm vi hiện tại

Đã có Julian Day, kinh độ Tropical, cung tiếng Việt, độ/phút và trạng thái nghịch hành cho Mặt Trời, Mặt Trăng, Sao Thủy, Sao Kim, Sao Hỏa, Sao Mộc, Sao Thổ, Thiên Vương, Hải Vương và Diêm Vương. Module cũng trả ASC, MC, 12 cusp Placidus, năm góc chiếu chính, vòng tròn lá số SVG responsive, luận giải Phase 1 cho bộ ba cốt lõi và luận giải Sao Thủy trong 12 cung.

Trạng thái kiểm tra hiện tại: `npm test` đạt 93/93 test, `npm run lint` đạt và `npm run build` đạt. Chưa luận Venus, Mars, hành tinh trong nhà, góc chiếu hoặc các cấu hình nâng cao. Chiêm tinh Vệ Đà, Bát Tự và Tử Vi chưa được triển khai. Swiss Ephemeris không được sử dụng.
