# QA Checklist

Cập nhật: 2026-08-03.

Checklist này dùng cho phân hệ Chiêm tinh Tây phương và luồng dữ liệu sinh dùng chung.

Với mọi task liên quan giao diện, nội dung hiển thị, routing, metadata hoặc SEO, phải đọc và áp dụng `docs/THIENVAN_UI_UX_SEO_RULES.md` như quality gate bắt buộc. Không được thay đổi calculation engine đã kiểm định chỉ để đạt mục tiêu UI/SEO.

## 1. Input dữ liệu sinh

- Nhập ngày hợp lệ `1990-01-15`.
- Nhập ngày không tồn tại `1990-02-30` và kiểm tra lỗi “Ngày sinh không hợp lệ.”
- Nhập giờ `0`, `23`, `24`, `-1`, `8.5`.
- Nhập phút `0`, `59`, `60`, `-1`, `30.5`.
- Nhập tọa độ thập phân `10.8231, 106.6297`.
- Nhập DMS `14°21'45.9"N 108°00'23.7"E`.
- Nhập DMS có dấu phẩy giữa vĩ độ/kinh độ.
- Nhập tọa độ Nam/Tây để xác nhận đổi dấu âm.
- Nhập tọa độ ngoài biên `91, 106` và `10, 181`.
- Kiểm tra nút “Lập lá số” disabled khi tọa độ hoặc timezone chưa hợp lệ.
- Kiểm tra focus chuyển đến field lỗi đầu tiên khi submit sai.

## 2. Timezone và UTC

- Tọa độ Việt Nam trả `Asia/Ho_Chi_Minh`.
- Tọa độ London mùa đông trả offset `+00:00`.
- Tọa độ New York mùa hè trả offset DST `-04:00`.
- Tọa độ Sydney mùa hè trả offset DST `+11:00`.
- Timezone giả `Mars/Olympus` bị từ chối.
- Fixed offset như `UTC+07:00` hoặc `Etc/GMT-7` bị từ chối.
- Khi API timezone lỗi, người dùng có thể nhập IANA timezone thủ công hợp lệ.
- Không gửi dữ liệu sinh đến dịch vụ ngoài ngoài route nội bộ `/api/timezone`.

## 3. Persistence localStorage

- Draft tự khôi phục sau reload trang chủ.
- Draft không chứa birthplace/placeOfBirth.
- Profile chỉ lưu khi người dùng bấm “Lưu thông tin này”.
- Profile cần tên gợi nhớ và dữ liệu bắt buộc hợp lệ.
- Lưu profile thành công hiển thị thông báo.
- Mở lại profile điền form và tính lại timezone từ tọa độ.
- Xóa một profile.
- Xóa tất cả profile có confirm.
- Không lưu quá 10 profile.
- localStorage unavailable không crash UI.
- Dữ liệu sai version bị bỏ qua.

## 4. Calculation Tây phương

- `calculateWesternAstrology` trả `system = Tropical Zodiac`.
- `houseSystem = Placidus`.
- `julianDay` đúng fixture.
- Có đúng 10 thiên thể.
- Kinh độ mọi thiên thể thuộc `[0, 360)`.
- Mỗi thiên thể có sign, signVietnamese, degree, minute.
- Retrograde khớp fixture validation.
- Có ASC và MC.
- Có đúng 12 cusp.
- House 1 cusp bằng ASC.
- House 10 cusp bằng MC.
- House 7 đối diện House 1.
- House 4 đối diện House 10.
- Mỗi thiên thể có đúng một house từ 1 đến 12.
- Gán nhà đúng tại cusp, ngay trước cusp và qua điểm 0/360.
- Vùng gần vòng cực ném `PlacidusCalculationError`, không fallback giả.

## 5. Góc chiếu

- Tính conjunction trong orb.
- Tính opposition trong orb.
- Tính trine trong orb.
- Tính square trong orb.
- Tính sextile trong orb.
- Không tạo aspect khi ngoài orb.
- Aspect ID ổn định dạng `Body1-Body2-EnglishName`.
- `orb = abs(actualAngle - exactAngle)`.
- Phase `applying` khi orb giảm.
- Phase `separating` khi orb tăng.
- Phase `null` khi không đủ chắc chắn.
- Với 5 validation cases, aspect IDs khớp fixture.

## 6. Vòng tròn lá số

- SVG render khi result có ASC.
- Nếu thiếu ASC, hiển thị alert rõ ràng.
- ASC nằm bên trái vòng tròn.
- Zodiac segment xoay theo ASC, không cố định Bạch Dương trên đỉnh.
- Có 12 cusp và số nhà.
- Có 10 body markers.
- Có aspect lines đúng số lượng result.aspects.
- Marker gần nhau được tách lane nhưng giữ đường nối về longitude thật.
- Hover marker hiển thị thông tin.
- Click/touch marker giữ thông tin.
- Keyboard focus/Enter/Space hoạt động với marker.
- SVG có title/desc/aria label.
- Không có hydration warning sau reload.

## 7. Interpretation

- Core rules có đúng 36 rule.
- Mỗi core rule có `ruleId`, `version`, `evidence`, `summary`, `strengths`, `challenges`, `developmentAdvice`.
- Core rules phủ Sun, Moon, ASC trong 12 cung.
- `interpretWesternCoreTriad` lấy Sun/Moon/ASC từ calculation result.
- Core synthesis deterministic với cùng input.
- Core interpretation không mutate calculation result.
- Personal rules có đúng 36 rule.
- Personal rules phủ Mercury, Venus, Mars trong 12 cung.
- `interpretWesternPersonalPlanets` giữ thứ tự Mercury, Venus, Mars.
- Personal interpretation không mutate calculation result.
- Social rules có đúng 36 rule Jupiter, Saturn và Uranus.
- Social rules phủ Jupiter, Saturn và Uranus trong 12 cung.
- `interpretWesternSocialPlanets` lấy Jupiter, Saturn và Uranus từ `WesternAstrologyResult.bodies`, không phụ thuộc thứ tự body.
- Social interpretation không mutate calculation result.
- Evidence accordion hiển thị body/sign/longitude/rule ID/version.
- Khi thiếu body cần thiết, engine báo lỗi rõ ràng.

## 8. Các phần chưa có cần test khi triển khai

- Chủ tinh từng nhà.
- Uranus/Neptune/Pluto trong cung.
- Hành tinh trong nhà.
- Cảnh báo hành tinh sát cusp.
- Luận góc chiếu.
- Full chart synthesis.
- Tổng hợp tính cách.
- Tổng hợp tiềm năng.
- Tổng hợp tình cảm.
- Tổng hợp sự nghiệp.
- Tổng hợp chủ đề chính.

## 8A. QA Jupiter production

- [x] Có đúng 12 rules Jupiter.
- [x] Phủ đủ 12 cung, không thiếu và không trùng.
- [x] Mọi `ruleId` là duy nhất.
- [x] Mọi rule có `version`.
- [x] Mọi rule có `evidence.body = Jupiter`.
- [x] Engine lấy Jupiter từ `WesternAstrologyResult.bodies`, không tự tính lại.
- [x] Engine không phụ thuộc thứ tự body trong mảng.
- [x] Engine deterministic.
- [x] Engine không mutate `WesternAstrologyResult`.
- [x] Thiếu Jupiter tạo lỗi rõ ràng.
- [x] UI nhóm “Hành tinh xã hội” chỉ render Jupiter, không render placeholder Saturn.
- [x] Evidence accordion hiển thị Jupiter, cung, longitude, degree/minute, rule ID và version.

## 8B. QA Saturn production

- [x] Có đúng 12 rules Saturn.
- [x] Phủ đủ 12 cung, không thiếu và không trùng.
- [x] Mọi `ruleId` là duy nhất theo dạng `WESTERN-SATURN-<SIGN>-V1`.
- [x] Mọi rule có `version`.
- [x] Mọi rule có `evidence.body = Saturn`.
- [x] Engine lấy Saturn từ `WesternAstrologyResult.bodies`, không tự tính lại.
- [x] Engine không phụ thuộc thứ tự body trong mảng.
- [x] Engine deterministic.
- [x] Engine không mutate `WesternAstrologyResult`.
- [x] Thiếu Saturn tạo lỗi rõ ràng.
- [x] UI nhóm “Hành tinh xã hội” render Jupiter và Saturn, không render placeholder Uranus/Neptune/Pluto.
- [x] Evidence accordion hiển thị Saturn, cung, longitude, degree/minute, rule ID và version.

## 9. Responsive, UI/UX, accessibility và SEO

### 9A. Governance UI/UX/SEO

- Task đã đọc `docs/THIENVAN_UI_UX_SEO_RULES.md` và ghi rõ các rule liên quan.
- Xác định trang là public/indexable hay private/noindex trước khi sửa metadata hoặc routing.
- Không để UI tự tính lại dữ liệu thiên văn hoặc chiêm tinh; UI chỉ dùng dữ liệu từ calculation/derived layer.
- Không thay đổi nội dung học thuật, ruleset hoặc calculation engine để tối ưu layout, CTA, SEO hoặc performance.
- Giữ định vị beginner-first, expert-deep: người mới thấy insight chính trước dữ liệu kỹ thuật; dữ liệu chuyên sâu dùng progressive disclosure.
- Không trộn `docs/THIENVAN_RESPONSE_FRAMEWORK.md` vào calculation engine hoặc interpretation ruleset.
- Với task governance/docs, kiểm tra không tạo duplicate decision ID hoặc duplicate task ID; proposal bị trùng phải remap và ghi rõ.
- Phân loại rõ task READY, PROPOSED và NEEDS_OWNER_DECISION; không tự chuyển task cần quyết định sản phẩm sang READY.
- Kết quả cá nhân `/ket-qua` và mọi URL report riêng tư mặc định có `noindex` và không nằm trong sitemap.
- Không tạo trang programmatic mỏng theo tổ hợp ngày sinh, cung, hành tinh hoặc nhà nếu không có nội dung biên tập độc lập.

### 9B. Responsive và UI

- Desktop `1280x720` hoặc rộng hơn: không horizontal overflow toàn trang.
- Tablet `768px`: không horizontal overflow toàn trang, tab/section không chồng chữ.
- Mobile `360px`: không horizontal overflow toàn trang.
- Mobile `390x844`: không horizontal overflow toàn trang.
- Mobile chart render đúng kích thước và không bị cắt.
- Mobile bảng dữ liệu có thể scroll ngang trong container.
- Nội dung nút/tab không vỡ dòng gây chồng chữ.
- Evidence accordion mở/đóng không làm layout nhảy bất thường.
- Các bảng dài không che khuất nội dung kế tiếp.
- Body text trên mobile tối thiểu 16px, line-height đủ đọc; khối văn dài không tạo tường chữ.
- Nội dung kết quả dài có điều hướng nội dung hoặc mục lục phù hợp desktop/mobile.
- Chart luôn có bảng dữ liệu hoặc danh sách vị trí thay thế dễ đọc.
- Không có console error.
- Không có console warning React hydration.
- Các tab Bát Tự/Tử Vi/Vệ Đà hiển thị placeholder đúng cho đến khi được triển khai.

### 9C. Accessibility

- Mỗi route có đúng một H1 và heading hierarchy không nhảy cấp bất hợp lý.
- Form có label thật; error liên kết bằng `aria-describedby`/`aria-invalid` và focus tới lỗi đầu tiên.
- Button dùng `<button>`, navigation dùng `<a>`/`Link` đúng ngữ nghĩa.
- Tab, accordion/evidence disclosure và chart tooltip dùng được bằng bàn phím.
- Focus visible rõ trên mọi control tương tác.
- Target tương tác tối thiểu 24x24 CSS px; nút chính và điều hướng mobile hướng tới 44x44 px.
- Không chỉ dùng màu để truyền đạt trạng thái hoặc loại dữ liệu.
- Tôn trọng `prefers-reduced-motion` nếu có animation.

### 9D. SEO và metadata

- Mỗi route public có title, meta description và H1 riêng, không nhồi từ khóa.
- Trang calculator public có nội dung SSR/static ngoài form: mô tả, phương pháp tính, giới hạn, kết quả mẫu thật hoặc mô tả đúng, FAQ/disclaimer khi phù hợp.
- Trang cá nhân và URL chứa dữ liệu sinh/query cá nhân mặc định `noindex`.
- Canonical đúng cho trang public; query variants không tạo URL indexable tương đương.
- Breadcrumb và `BreadcrumbList` có trên trang cấp 2 trở xuống khi triển khai hub/content.
- Structured data, nếu có, khớp nội dung nhìn thấy; không markup rating/review/FAQ giả.
- Internal links có ngữ cảnh, anchor text rõ, không tạo khối link rỗng hoặc hàng trăm link footer.
- Nội dung công khai phân biệt dữ liệu thiên văn khoa học với chiêm tinh/Tử Vi/Bát Tự như hệ biểu tượng; không dùng NASA hoặc thiên văn để “chứng minh” hiệu lực chiêm tinh.
- Nội dung mẫu/result sample phải phản ánh output thật hoặc được ghi rõ là minh họa; không hiển thị report giả như kết quả engine.
- Bài viết/content hub có tác giả, ngày xuất bản/cập nhật, ruleset/trường phái liên quan và người duyệt chuyên môn nếu có.

### 9E. Performance

- Không tải logic/chart/nội dung của module không dùng nếu có thể code split theo trường phái.
- Không dùng video hero autoplay, particle animation mặc định hoặc hiệu ứng làm giảm readability.
- Kích thước ảnh/chart/skeleton ổn định để tránh layout shift.
- Mục tiêu Core Web Vitals: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 tại p75 khi có điều kiện đo.
- Font ưu tiên system hoặc tối đa 2 family, có `font-display: swap` nếu tải font riêng.

## 10. Quality gates trước khi kết thúc nhiệm vụ

```bash
npm test
npm run lint
npm run build
```

Với thay đổi UI đáng kể, kiểm tra thêm bằng browser:

- Trang chủ desktop/mobile.
- Trang kết quả desktop/mobile.
- Tab “Chiêm tinh Tây phương”.
- Evidence accordion.
- Console browser.
