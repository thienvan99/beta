<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Quy chuẩn UI/UX/SEO bắt buộc

Mọi task liên quan đến giao diện, nội dung hiển thị, routing, metadata, sitemap, robots, structured data, accessibility, performance hoặc SEO phải đọc và tuân thủ `docs/THIENVAN_UI_UX_SEO_RULES.md` trước khi sửa.

Quy chuẩn này là nguồn chuẩn UI/UX/SEO của dự án Thiên Vận. Khi có mâu thuẫn giữa tối ưu UI/SEO và tính đúng đắn chuyên môn, calculation engine đã kiểm định luôn được ưu tiên.

Các nguyên tắc không được vi phạm:

- Không hy sinh tính chính xác của calculation engine để tối ưu giao diện, conversion hoặc SEO.
- UI không được tự tính lại dữ liệu thiên văn, chiêm tinh, nhà, góc chiếu hoặc timezone nếu calculation/derived layer đã trả dữ liệu typed.
- Giao diện chỉ đọc dữ liệu đã tính; nếu cần dữ liệu mới, bổ sung ở calculation hoặc derived layer có test và evidence rõ.
- Mọi thay đổi UI phải bảo đảm desktop, mobile, accessibility cơ bản, focus state rõ và không horizontal overflow toàn trang.
- Kết quả cá nhân, hồ sơ sinh, tài khoản và report riêng tư mặc định phải `noindex` và không đưa vào sitemap.
- Nội dung không được hù dọa, không khẳng định chính xác tuyệt đối và không tạo trang mỏng hàng loạt chỉ để SEO.
- Thiết kế/nội dung phải giữ định vị beginner-first, expert-deep: người mới thấy insight trước, dữ liệu chuyên sâu mở bằng progressive disclosure.
- Mọi interpretation quan trọng phải truy được rule ID, version và evidence; không trộn lẫn bốn trường phái hoặc biến tương đồng thành tương đương tuyệt đối.
- Không trộn `docs/THIENVAN_RESPONSE_FRAMEWORK.md` vào calculation engine hoặc interpretation ruleset; framework phản hồi chỉ thuộc lớp trình bày/nội dung khi đã có dữ liệu typed.
