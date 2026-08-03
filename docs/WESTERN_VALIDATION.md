# Kiểm định module Chiêm tinh Tây phương

Ngày kiểm định: 2026-08-02.

## Phạm vi và nguồn tham chiếu

Module Thiên Vận dùng `astronomy-engine` 2.1.19, Tropical Zodiac và Placidus. Hai nguồn độc lập được dùng cho cả năm ca:

1. [Astrolog 8.00](https://www.astrolog.org/astrolog/astfile.htm), chạy CLI với Moshier (`-bs -b`), Tropical và Placidus. Astrolog có giấy phép GPL v2. Không tải, mở hoặc dùng file Swiss Ephemeris.
2. [CircularNatalHoroscopeJS 1.1.0](https://github.com/0xStarcat/CircularNatalHoroscopeJS), Tropical và Placidus, giấy phép Unlicense. Thư viện chỉ chạy ngoài dự án để lấy fixture; không phải dependency sản xuất.

Astrolog công bố hỗ trợ vị trí Sun-Pluto, house cusps, Tropical/Placidus và applying/separating trong [tài liệu chính thức](https://www.astrolog.org/ftp/astrolog.htm). Circular công bố hỗ trợ cùng 10 thiên thể, ASC/MC, retrograde, Placidus và aspects trong README của dự án. Fixture tĩnh nằm ở `src/lib/western-validation.test-data.ts`; test không gọi mạng và không cần hai công cụ tham chiếu khi chạy lại.

Sai số dưới đây là khoảng cách góc ngắn nhất trên vòng tròn. Thứ tự thiên thể trong các dãy là: `Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto`. Thứ tự cusp là nhà 1 đến nhà 12.

Ngưỡng kiểm thử:

- Thiên thể so với Astrolog/Moshier: `0.004 deg`.
- Thiên thể so với Circular: `0.012 deg`.
- ASC, MC và cusp so với Astrolog: `0.0003 deg`.
- Cusp so với Circular: `1 deg`, chỉ để phát hiện regression; sai khác lớn của nguồn này được ghi rõ bên dưới.
- Orb so với Circular: `0.02 deg`.

## Quy tắc biên nhà

Mỗi khoảng nhà là `[cusp N, cusp N+1)`: một thiên thể đúng trên cusp thuộc nhà bắt đầu tại cusp đó. Để hấp thụ nhiễu dấu phẩy động, giá trị cách cusp không quá `1e-9 deg` cũng thuộc nhà mới. Quy tắc này được dùng chung bởi calculation engine và SVG, có test cho đúng cusp, ngay trước cusp và qua điểm 0/360.

## 1. Việt Nam

- Đầu vào: `1990-01-15 08:30`, `Asia/Ho_Chi_Minh`, UTC offset `+07:00`, UTC `1990-01-15T01:30:00Z`.
- Tọa độ: `10.823100, 106.629700`.
- Julian Day: `2447906.562500`.

### Thiên thể

- Thiên Vận: `294.632856, 162.007469, 281.672708, 300.945661, 259.597796, 93.417505, 287.262836, 276.586740, 282.549081, 227.419901`.
- Astrolog: `294.632500, 162.006944, 281.674444, 300.944167, 259.597500, 93.417222, 287.262778, 276.587778, 282.549444, 227.419167`.
- Circular: `294.632100, 161.999100, 281.675100, 300.944500, 259.597200, 93.417500, 287.262900, 276.587900, 282.549500, 227.419600`.
- Sai số lớn nhất: Astrolog `0.001736 deg` tại Mercury; Circular `0.008369 deg` tại Moon.
- Nghịch hành: `Mercury, Venus, Jupiter`. Hai nguồn xác nhận; Sun/Moon được Astrolog ghi thuận hành, Circular không gắn cờ retrograde cho hai đối tượng này.
- Nhà: `11, 7, 11, 12, 10, 5, 11, 11, 11, 9`. Thiên Vận, Astrolog và Circular giống nhau.

### ASC, MC và 12 cusp

- Thiên Vận: `328.943724, 3.895261, 36.599798, 65.302918, 91.645015, 118.532177, 148.943724, 183.895261, 216.599798, 245.302918, 271.645015, 298.532177`.
- Astrolog: `328.943611, 3.895278, 36.599722, 65.302778, 91.645000, 118.531944, 148.943611, 183.895278, 216.599722, 245.302778, 271.645000, 298.531944`.
- Circular: `328.941900, 3.891300, 36.594700, 65.298900, 91.644000, 118.532000, 148.941900, 183.891300, 216.594700, 245.298900, 271.644000, 298.532000`.
- Sai số lớn nhất: Astrolog `0.000233 deg` tại nhà 6; Circular `0.005098 deg` tại nhà 9.

### Góc chiếu

Thiên Vận trả 14 góc: `Sun-Venus-Conjunction 6.312805 applying`; `Sun-Saturn-Conjunction 7.370020 separating`; `Moon-Mercury-Trine 0.334761 separating`; `Moon-Saturn-Trine 5.255367 applying`; `Moon-Uranus-Trine 5.420729 separating`; `Moon-Neptune-Trine 0.541612 applying`; `Mercury-Saturn-Conjunction 5.590128 separating`; `Mercury-Uranus-Conjunction 5.085968 applying`; `Mercury-Neptune-Conjunction 0.876373 separating`; `Jupiter-Uranus-Opposition 3.169235 separating`; `Saturn-Neptune-Conjunction 4.713756 separating`; `Saturn-Pluto-Sextile 0.157065 applying`; `Uranus-Neptune-Conjunction 5.962341 applying`; `Neptune-Pluto-Sextile 4.870820 applying`.

Astrolog xác nhận đủ 14 ID và phase. Circular xác nhận đủ 14 ID; sai số orb lớn nhất `0.010761 deg` tại Moon-Mercury. Circular làm tròn orb 4 chữ số nên mẫu +/-1 phút không phân biệt được phase Uranus-Neptune; Thiên Vận giữ `applying` vì Astrolog và ephemeris độ chính xác cao cùng xác nhận.

## 2. London

- Đầu vào: `2000-01-01 12:00`, `Europe/London`, UTC offset `+00:00`, UTC `2000-01-01T12:00:00Z`.
- Tọa độ: `51.507400, -0.127800`.
- Julian Day: `2451545.000000`.

### Thiên thể

- Thiên Vận: `280.368739, 223.323891, 271.888912, 241.565233, 327.963899, 25.254200, 40.396124, 314.806105, 303.195442, 251.454735`.
- Astrolog: `280.368889, 223.323611, 271.889167, 241.565556, 327.963056, 25.252778, 40.395556, 314.809167, 303.192778, 251.454444`.
- Circular: `280.368200, 223.314900, 271.888100, 241.564900, 327.962700, 25.253000, 40.395600, 314.809200, 303.193000, 251.454600`.
- Sai số lớn nhất: Astrolog `0.003062 deg` tại Uranus; Circular `0.008991 deg` tại Moon.
- Nghịch hành: `Saturn`.
- Nhà: `10, 7, 9, 8, 12, 1, 1, 11, 11, 8`. Cả ba hệ thống giống nhau.

### ASC, MC và 12 cusp

- Thiên Vận: `24.014534, 61.012942, 81.911397, 99.493199, 118.913503, 147.485441, 204.014534, 241.012942, 261.911397, 279.493199, 298.913503, 327.485441`.
- Astrolog: `24.014444, 61.012778, 81.911389, 99.493056, 118.913333, 147.485278, 204.014444, 241.012778, 261.911389, 279.493056, 298.913333, 327.485278`.
- Circular: `24.021000, 60.514200, 81.420300, 99.496600, 119.261700, 147.610400, 204.021000, 240.514200, 261.420300, 279.496600, 299.261700, 327.610400`.
- Sai số lớn nhất: Astrolog `0.000170 deg` tại nhà 5; Circular `0.498742 deg` tại nhà 8.

### Góc chiếu

Thiên Vận trả 11 góc: `Sun-Moon-Sextile 2.955152 separating`; `Sun-Saturn-Trine 0.027385 applying`; `Moon-Saturn-Opposition 2.927767 separating`; `Moon-Uranus-Square 1.482213 applying`; `Mercury-Mars-Sextile 3.925013 separating`; `Mercury-Jupiter-Trine 6.634712 separating`; `Venus-Mars-Square 3.601334 separating`; `Venus-Neptune-Sextile 1.630209 applying`; `Mars-Jupiter-Sextile 2.709699 separating`; `Saturn-Uranus-Square 4.409980 separating`; `Uranus-Pluto-Sextile 3.351369 separating`.

Hai nguồn xác nhận đủ 11 ID; Astrolog xác nhận toàn bộ phase. Sai số orb lớn nhất so với Circular là `0.012087 deg` tại Moon-Uranus.

## 3. New York

- Đầu vào: `1985-07-23 18:45`, `America/New_York`, UTC offset `-04:00` (DST), UTC `1985-07-23T22:45:00Z`.
- Tọa độ: `40.712800, -74.006000`.
- Julian Day: `2446270.447917`.

### Thiên thể

- Thiên Vận: `121.000398, 197.346657, 144.630887, 79.332063, 119.210332, 313.506478, 231.471189, 254.330795, 271.468804, 211.963518`.
- Astrolog: `121.000278, 197.346667, 144.630833, 79.331667, 119.210000, 313.507500, 231.470278, 254.331944, 271.471111, 211.962500`.
- Circular: `120.999900, 197.337500, 144.630800, 79.331200, 119.209700, 313.507700, 231.470400, 254.332200, 271.471300, 211.963200`.
- Sai số lớn nhất: Astrolog `0.002307 deg` tại Neptune; Circular `0.009157 deg` tại Moon.
- Nghịch hành: `Jupiter, Saturn, Uranus, Neptune`.
- Nhà: `7, 9, 8, 6, 7, 1, 10, 11, 12, 10`. Cả ba hệ thống giống nhau.

### ASC, MC và 12 cusp

- Thiên Vận: `276.538774, 317.053514, 358.572913, 30.986595, 55.408750, 75.988412, 96.538774, 137.053514, 178.572913, 210.986595, 235.408750, 255.988412`.
- Astrolog: `276.538611, 317.053333, 358.572778, 30.986389, 55.408611, 75.988333, 96.538611, 137.053333, 178.572778, 210.986389, 235.408611, 255.988333`.
- Circular: `276.548300, 317.127200, 359.545100, 30.988300, 55.482700, 76.150600, 96.548300, 137.127200, 179.545100, 210.988300, 235.482700, 256.150600`.
- Sai số lớn nhất: Astrolog `0.000206 deg` tại nhà 4/10; Circular `0.972187 deg` tại nhà 3/9.

### Góc chiếu

Thiên Vận trả 12 góc: `Sun-Mars-Conjunction 1.790066 separating`; `Sun-Pluto-Square 0.963119 applying`; `Moon-Venus-Trine 1.985406 applying`; `Moon-Jupiter-Trine 3.840179 separating`; `Moon-Uranus-Sextile 3.015861 separating`; `Mercury-Saturn-Square 3.159698 separating`; `Mercury-Neptune-Trine 6.837917 applying`; `Venus-Jupiter-Trine 5.825585 separating`; `Venus-Uranus-Opposition 5.001267 separating`; `Mars-Pluto-Square 2.753186 applying`; `Jupiter-Uranus-Sextile 0.824318 separating`; `Neptune-Pluto-Sextile 0.494714 separating`.

Hai nguồn xác nhận đủ 12 ID; Astrolog xác nhận toàn bộ phase. Sai số orb lớn nhất so với Circular là `0.010561 deg` tại Moon-Uranus.

## 4. Sydney, Nam bán cầu

- Đầu vào: `1992-11-05 14:20`, `Australia/Sydney`, UTC offset `+11:00` (DST), UTC `1992-11-05T03:20:00Z`.
- Tọa độ: `-33.868800, 151.209300`.
- Julian Day: `2448931.638889`.

### Thiên thể

- Thiên Vận: `222.968442, 342.948377, 245.919994, 259.882559, 114.139067, 185.188532, 312.160367, 284.820945, 286.585765, 232.473056`.
- Astrolog: `222.968056, 342.947778, 245.919722, 259.881667, 114.139444, 185.188889, 312.160278, 284.822500, 286.585278, 232.472500`.
- Circular: `222.967600, 342.940100, 245.919400, 259.881100, 114.139500, 185.188800, 312.160400, 284.822700, 286.585500, 232.472500`.
- Sai số lớn nhất: Astrolog `0.001555 deg` tại Uranus; Circular `0.008277 deg` tại Moon.
- Nghịch hành: không có.
- Nhà: `9, 1, 9, 10, 5, 7, 12, 11, 11, 9`. Cả ba hệ thống giống nhau.

### ASC, MC và 12 cusp

- Thiên Vận: `339.644907, 5.312676, 35.083304, 67.612375, 100.432376, 131.433356, 159.644907, 185.312676, 215.083304, 247.612375, 280.432376, 311.433356`.
- Astrolog: `339.644722, 5.312500, 35.083056, 67.612222, 100.432222, 131.433333, 159.644722, 185.312500, 215.083056, 247.612222, 280.432222, 311.433333`.
- Circular: `339.641300, 5.309000, 35.089900, 67.608100, 100.366100, 131.400100, 159.641300, 185.309000, 215.089900, 247.608100, 280.366100, 311.400100`.
- Sai số lớn nhất: Astrolog `0.000248 deg` tại nhà 3/9; Circular `0.066276 deg` tại nhà 5/11.

### Góc chiếu

Thiên Vận trả 12 góc: `Sun-Moon-Trine 0.020065 applying`; `Sun-Saturn-Square 0.808075 separating`; `Sun-Uranus-Sextile 1.852503 applying`; `Sun-Neptune-Sextile 3.617323 applying`; `Moon-Venus-Square 6.934182 applying`; `Moon-Uranus-Sextile 1.872568 applying`; `Moon-Neptune-Sextile 3.637388 applying`; `Mercury-Jupiter-Sextile 0.731463 separating`; `Mars-Neptune-Opposition 7.553302 separating`; `Mars-Pluto-Trine 1.666011 separating`; `Jupiter-Saturn-Trine 6.971835 applying`; `Uranus-Neptune-Conjunction 1.764820 applying`.

Hai nguồn xác nhận đủ 12 ID; Astrolog xác nhận toàn bộ phase. Sai số orb lớn nhất so với Circular là `0.010032 deg` tại Moon-Uranus.

## 5. London gần ranh giới đổi cung

- Đầu vào: `2024-03-20 03:06`, `Europe/London`, UTC offset `+00:00`, UTC `2024-03-20T03:06:00Z`.
- Tọa độ: `51.507400, -0.127800`.
- Julian Day: `2460389.629167`.
- Mục tiêu biên: Sun nằm sát 0 Aries.

### Thiên thể

- Thiên Vận: `359.999747, 123.815622, 17.441861, 340.171427, 327.773450, 44.884561, 342.224048, 50.253654, 357.463466, 301.660315`.
- Astrolog: `359.999444, 123.815278, 17.440833, 340.171111, 327.773333, 44.885556, 342.225278, 50.253611, 357.460000, 301.660556`.
- Circular: `359.998900, 123.805500, 17.439700, 340.170400, 327.772800, 44.885500, 342.225500, 50.253800, 357.460200, 301.660700`.
- Sai số lớn nhất: Astrolog `0.003466 deg` tại Neptune; Circular `0.010122 deg` tại Moon.
- Cả ba nguồn đặt Sun ở Pisces, ngay trước ingress; không có khác biệt cung.
- Nghịch hành: không có.
- Nhà: `2, 7, 2, 2, 1, 3, 2, 4, 2, 1`. Cả ba hệ thống giống nhau.

### ASC, MC và 12 cusp

- Thiên Vận: `281.346015, 334.075823, 19.176561, 46.982633, 66.531049, 83.290963, 101.346015, 154.075823, 199.176561, 226.982633, 246.531049, 263.290963`.
- Astrolog: `281.345833, 334.075833, 19.176389, 46.982500, 66.530833, 83.290833, 101.345833, 154.075833, 199.176389, 226.982500, 246.530833, 263.290833`.
- Circular: `281.351100, 334.142900, 19.160400, 46.983300, 66.871400, 83.901600, 101.351100, 154.142900, 199.160400, 226.983300, 246.871400, 263.901600`.
- Sai số lớn nhất: Astrolog `0.000216 deg` tại nhà 5/11; Circular `0.610637 deg` tại nhà 6/12.

### Góc chiếu

Thiên Vận trả 10 góc: `Sun-Moon-Trine 3.815875 separating`; `Sun-Neptune-Conjunction 2.536281 separating`; `Sun-Pluto-Sextile 1.660568 applying`; `Moon-Neptune-Trine 6.352156 separating`; `Moon-Pluto-Opposition 2.155307 separating`; `Venus-Jupiter-Sextile 4.713134 applying`; `Venus-Saturn-Conjunction 2.052621 applying`; `Jupiter-Saturn-Sextile 2.660513 separating`; `Jupiter-Uranus-Conjunction 5.369093 applying`; `Neptune-Pluto-Sextile 4.196849 applying`.

Hai nguồn xác nhận đủ 10 ID; Astrolog xác nhận toàn bộ phase. Sai số orb lớn nhất so với Circular là `0.010507 deg` tại Moon-Pluto.

## Bất biến đã kiểm tra

Tất cả năm ca đều vượt qua các kiểm tra sau:

- House 1 cusp bằng ASC; House 10 cusp bằng MC.
- House 7 đối diện House 1 đúng 180 deg; House 4 đối diện House 10 đúng 180 deg.
- Mỗi thiên thể có đúng một nhà và kết quả gán nhà trùng Astrolog/Circular trong năm ca.
- Kinh độ thiên thể và cusp luôn thuộc `[0, 360)`.
- `orb = abs(actualAngle - exactAngle)` trong sai số dấu phẩy động của JavaScript.
- Mỗi aspect có ID ổn định dạng `Body1-Body2-EnglishName`, tên tiếng Anh, tên tiếng Việt và phase.
- SVG chỉ tạo điểm hiển thị từ bản sao đọc; test snapshot xác nhận không đổi longitude, houses, bodies hoặc dữ liệu result.

## Chênh lệch và đánh giá

Sai số thiên thể lớn nhất trong toàn bộ kiểm định là `0.010122 deg` (Moon, ca ranh giới, so với Circular), nằm dưới ngưỡng `0.012 deg` và dưới mức thiết kế khoảng 1 phút cung của Astronomy Engine. Sai số lớn nhất so với Astrolog là `0.003466 deg`.

ASC/MC và cusp khớp Astrolog rất sát, tối đa `0.000248 deg`. Circular lệch cusp tối đa `0.972187 deg` tại nhà 3/9 của New York, dù ASC/MC và việc gán nhà cho 10 thiên thể trong năm ca vẫn đồng thuận. Chênh lệch này nhiều khả năng đến từ cách triển khai Placidus và pipeline sidereal/obliquity khác nhau; fixture Circular chỉ được giữ như nguồn cảnh báo regression, không dùng làm chuẩn thay thế engine. Kết quả Astrolog và corpus `pleiades-houses` đã có trong test cùng ủng hộ cách tính hiện tại.

Kết luận: phần kinh độ, cung, retrograde, aspects và phase đủ ổn định để bắt đầu xây dựng luận giải có kiểm soát. Phần luận giải theo nhà chưa nên coi là an toàn tuyệt đối cho trường hợp thiên thể nằm sát cusp; trước khi phát hành production nên thêm cảnh báo/độ bất định cho khoảng cách dưới `1 deg` tới cusp hoặc đối chiếu thêm một nguồn Placidus có độ chính xác công bố rõ ràng. Không có luận giải nào được thêm trong bước kiểm định này.
