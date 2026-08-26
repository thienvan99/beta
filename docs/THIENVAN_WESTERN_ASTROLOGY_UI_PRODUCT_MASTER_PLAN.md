# THIÊN VẬN — MASTER PLAN GIAO DIỆN & SẢN PHẨM CHIÊM TINH PHƯƠNG TÂY

**Mã tài liệu:** TV-WA-UI-PRODUCT-MASTER-PLAN<br>
**Phiên bản:** 1.1.0<br>
**Ngày chốt:** 04/08/2026<br>
**Cập nhật:** 14/08/2026 — đồng bộ với định hướng chiến lược trong `THIENVAN_MARKET_ENTRY_AND_GTM_ROADMAP_V1.md`.<br>
**Phạm vi:** Website/app Chiêm tinh phương Tây của Thiên Vận<br>
**Mục đích:** Tài liệu chuẩn để Codex và đội phát triển triển khai mà không cần khảo sát đối thủ lại từ đầu.<br>
**Trạng thái:** Quyết định sản phẩm đã chốt — sẵn sàng chuyển thành task kỹ thuật.

---

## 0. CÁCH SỬ DỤNG TÀI LIỆU

Tài liệu này là product/UI plan riêng cho giao diện và hành trình sản phẩm Chiêm tinh phương Tây của Thiên Vận. `THIENVAN_MARKET_ENTRY_AND_GTM_ROADMAP_V1.md` là strategic roadmap cấp toàn dự án; khi có mâu thuẫn về chiến lược hoặc phụ thuộc dài hạn, ưu tiên các tài liệu canonical hiện hành và GTM roadmap mới.

Khi triển khai, Codex phải:

1. Đọc toàn bộ tài liệu trước khi sửa code.
2. Đối chiếu với các tài liệu rule, spec và UI/UX/SEO hiện có trong thư mục `thienvan/docs`.
3. Không tự thay đổi kiến trúc sản phẩm đã chốt nếu chưa ghi rõ lý do và cập nhật Decision Log.
4. Không hard-code nội dung luận giải trực tiếp trong component giao diện.
5. Mọi luận giải phải lấy từ rule engine hoặc content registry có version.
6. Ưu tiên mobile-first, dễ đọc, dễ hiểu với người mới.
7. Chỉ hiển thị phần chuyên môn sâu khi người dùng chủ động mở.

Tài liệu này thay thế việc khảo sát lại đối thủ cho giai đoạn MVP và giai đoạn mở rộng gần. Chỉ khảo sát lại khi:

- Thiên Vận thay đổi thị trường mục tiêu.
- Xuất hiện đối thủ lớn hoặc mô hình sản phẩm mới đáng kể.
- Sau 6–12 tháng cần cập nhật benchmark.
- Dữ liệu thực tế của người dùng cho thấy giả định hiện tại không đúng.

---

# 1. QUYẾT ĐỊNH SẢN PHẨM ĐÃ CHỐT

## 1.1. Phương án tối ưu

Thiên Vận không chọn riêng một trong năm phương án khảo sát trước đó. Phương án tối ưu là **một kiến trúc hợp nhất**, có một lõi duy nhất và mở rộng theo tầng:

### Lõi sản phẩm

1. **Bản đồ 60 giây** — màn hình đầu tiên, cực dễ hiểu.
2. **Bánh xe cuộc sống** — nội dung sâu theo các lĩnh vực đời sống.
3. **Cơ sở luận giải** — lớp minh bạch chuyên môn, mở khi cần.

### Mô-đun mở rộng

4. **Dòng thời gian Thiên Vận** — transit, dự báo cá nhân, lý do quay lại thường xuyên.
5. **Gương quan hệ** — Synastry/Composite, sản phẩm mua lẻ và chia sẻ.
6. **Chế độ chuyên gia** — biểu đồ, bảng độ số, orb, hệ nhà, kỹ thuật nâng cao.

Kiến trúc này lấy ưu điểm của các nhóm đối thủ:

- Tối giản và dễ chia sẻ như Co–Star.
- Thân thiện, hướng dẫn hành động như CHANI.
- Ngôn ngữ đời sống như The Pattern.
- Cấu trúc dashboard như TimePassages.
- Chiều sâu chuyên môn như Astro.com và Astro-Seek.
- Khả năng đóng gói báo cáo phù hợp thị trường Việt Nam.

Nhưng Thiên Vận phải khác ở ba điểm:

1. **Tổng hợp thật sự, không ghép đoạn máy móc.**
2. **Người dùng luôn có thể xem “Vì sao có kết luận này?”.**
3. **Nội dung đi từ đời sống đến kỹ thuật, không bắt người mới học thuật ngữ trước.**

---

## 1.2. Định vị sản phẩm

> **Thiên Vận giúp người dùng hiểu bản thân, các mối quan hệ và chu kỳ cuộc sống bằng chiêm tinh phương Tây theo cách dễ đọc, có chiều sâu và có thể kiểm tra cơ sở luận giải.**

### Không định vị là

- Công cụ bói đúng/sai tuyệt đối.
- Hệ thống chấm điểm số mệnh.
- Ứng dụng chỉ tạo nội dung viral.
- Kho thuật ngữ chuyên môn dành riêng cho nhà chiêm tinh.
- Báo cáo dài nhưng lặp lại và thiếu tổng hợp.

### Định vị mong muốn trong tâm trí người dùng

- “Tôi đọc là hiểu ngay.”
- “Nội dung liên quan trực tiếp đến đời sống.”
- “Có chiều sâu chứ không chung chung.”
- “Tôi biết hệ thống dựa vào đâu để kết luận.”
- “Tôi có thể dùng miễn phí trước khi quyết định trả tiền.”

---

# 2. MỤC TIÊU KINH DOANH VÀ MỤC TIÊU TRẢI NGHIỆM

## 2.1. Mục tiêu MVP

MVP phải chứng minh được bốn điều:

1. Người mới hiểu được bản đồ sao trong vòng 60 giây.
2. Người dùng thấy ít nhất một kết luận có tính cá nhân và hữu ích.
3. Người biết chiêm tinh có thể kiểm tra cơ sở kỹ thuật.
4. Người dùng muốn lưu hồ sơ hoặc mở thêm một lĩnh vực đời sống.

## 2.2. Mục tiêu sau MVP

- Tăng số lần quay lại bằng transit và dòng thời gian.
- Tạo doanh thu bằng báo cáo mua một lần trước khi ép thuê bao.
- Tạo khả năng chia sẻ tự nhiên bằng thẻ kết quả.
- Mở rộng sang quan hệ và dự báo năm.
- Hình thành chế độ chuyên gia và hệ sinh thái tư vấn sau khi rule engine ổn định.

## 2.3. Chỉ số cần theo dõi

### Kích hoạt người dùng

- Tỷ lệ hoàn tất nhập dữ liệu sinh.
- Tỷ lệ xem hết Bản đồ 60 giây.
- Tỷ lệ mở ít nhất một lĩnh vực đời sống.
- Tỷ lệ bấm “Vì sao Thiên Vận kết luận như vậy?”.
- Tỷ lệ lưu hồ sơ.

### Giá trị nội dung

- Tỷ lệ đánh dấu “Đúng với tôi / Chưa đúng / Không chắc”.
- Tỷ lệ lưu hoặc chia sẻ một thẻ.
- Thời gian đọc mỗi lĩnh vực.
- Tỷ lệ quay lại xem hồ sơ.

### Chuyển đổi

- Tỷ lệ mở preview trả phí.
- Tỷ lệ mua báo cáo chuyên đề.
- Tỷ lệ chuyển từ báo cáo mua lẻ sang Plus.
- Doanh thu trên mỗi hồ sơ đã lưu.

### Chất lượng

- Tỷ lệ nội dung trùng lặp.
- Tỷ lệ mâu thuẫn giữa các đoạn luận giải.
- Tỷ lệ trang lỗi hoặc không render được chart.
- Tỷ lệ phản hồi về giờ sinh, múi giờ, vị trí hoặc hệ nhà.

---

# 3. ĐỐI TƯỢNG NGƯỜI DÙNG

## 3.1. Người mới hoàn toàn

### Nhu cầu

- Muốn biết “Tôi là người thế nào?”.
- Không hiểu hành tinh, nhà, góc chiếu.
- Dễ rời trang nếu thấy quá nhiều ký hiệu.

### Thiết kế dành cho họ

- Bản đồ 60 giây.
- Ngôn ngữ đời sống.
- Ít thuật ngữ trên màn hình đầu.
- Ví dụ cụ thể.
- Tooltip ngắn.
- Nút “Xem sâu hơn” thay vì hiển thị tất cả.

## 3.2. Người đã biết 12 cung và Big Three

### Nhu cầu

- Muốn hiểu chi tiết hơn về tình yêu, nghề nghiệp, tiền bạc.
- Muốn thấy nhà và góc chiếu.
- Muốn so sánh với người khác.

### Thiết kế dành cho họ

- Bánh xe cuộc sống.
- Placement và aspect quan trọng.
- Hồ sơ đã lưu.
- Báo cáo chuyên đề.
- Gương quan hệ.

## 3.3. Người học hoặc nhà chiêm tinh

### Nhu cầu

- Xem độ số, orb, hệ nhà, bảng góc chiếu.
- Kiểm tra logic.
- Xuất dữ liệu hoặc báo cáo.

### Thiết kế dành cho họ

- Chế độ chuyên gia.
- Technical drawer.
- Tùy chọn hệ nhà và orb.
- Bảng nguồn luận giải.
- Version của rule/content.

## 3.4. Người dùng tìm định hướng đời sống

### Nhu cầu

- Tình yêu, nghề nghiệp, tiền bạc, cảm xúc, gia đình.
- Muốn lời khuyên thực tế.
- Không cần học chiêm tinh.

### Thiết kế dành cho họ

- Điều hướng theo câu hỏi đời sống.
- Gợi ý hành động mềm, không định mệnh hóa.
- Dòng thời gian và các mốc cần chú ý.

---

# 4. NGUYÊN TẮC THIẾT KẾ BẮT BUỘC

## 4.1. Đời sống trước, thuật ngữ sau

Tên menu chính phải dùng ngôn ngữ đời sống:

- “Cách bạn yêu” thay vì chỉ ghi “Sao Kim”.
- “Cách bạn hành động” thay vì chỉ ghi “Sao Hỏa”.
- “Cảm xúc và nhu cầu an toàn” thay vì chỉ ghi “Mặt Trăng”.
- “Chu kỳ hiện tại” thay vì chỉ ghi “Transit”.

Thuật ngữ chiêm tinh vẫn được hiển thị trong lớp cơ sở kỹ thuật.

## 4.2. Tổng hợp trước, mảnh ghép sau

Không đưa người dùng vào danh sách placement dài ngay từ đầu.

Thứ tự trình bày:

1. Kết luận tổng hợp.
2. Biểu hiện trong đời sống.
3. Điểm mạnh.
4. Thử thách hoặc mâu thuẫn.
5. Gợi ý phát triển.
6. Cơ sở kỹ thuật.

## 4.3. Mỗi luận giải có ba tầng

### Tầng 1 — Tóm tắt

- 1–3 câu.
- Đọc trong 10–20 giây.
- Không dùng quá nhiều thuật ngữ.

### Tầng 2 — Ứng dụng đời sống

- Biểu hiện tích cực.
- Biểu hiện khi mất cân bằng.
- Ví dụ thường gặp.
- Gợi ý thực hành.

### Tầng 3 — Cơ sở luận giải

- Hành tinh.
- Cung.
- Nhà.
- Góc chiếu.
- Orb.
- Trọng số hoặc mức ưu tiên.
- Version rule.

## 4.4. Không dùng điểm số định mệnh

Không hiển thị các dạng:

- Hôn nhân 86/100.
- Tài chính 92/100.
- Thành công 73%.

Thay bằng:

- Nguồn lực nổi bật.
- Khu vực cần chú ý.
- Mức độ ảnh hưởng: nhẹ / vừa / mạnh.
- Điều kiện để phát huy tốt.
- Yếu tố hỗ trợ và cản trở.

## 4.5. Không khẳng định tuyệt đối

Tránh:

- “Bạn chắc chắn sẽ ly hôn.”
- “Bạn không thể thành công trong lĩnh vực này.”
- “Năm nay chắc chắn có tai nạn.”

Dùng:

- “Bạn có xu hướng...”
- “Khi mất cân bằng, biểu hiện có thể là...”
- “Giai đoạn này dễ làm nổi bật chủ đề...”
- “Nên xem đây là tín hiệu để quan sát và chuẩn bị.”

## 4.6. Mobile-first

- Một cột nội dung chính trên điện thoại.
- Card không quá dày chữ.
- Sticky navigation tối giản.
- Chart có chế độ phóng to toàn màn hình.
- Không dùng bảng rộng bắt cuộn ngang ở chế độ người mới.
- Vùng chạm tối thiểu 44px.

## 4.7. Minh bạch

Mỗi kết luận quan trọng phải có nút:

> **Vì sao Thiên Vận kết luận như vậy?**

Khi mở, hiển thị các yếu tố chính theo thứ tự ảnh hưởng.

## 4.8. Vai trò của AI/LLM

AI/LLM không phải source-of-truth, không tự tính chart và không thay thế rule engine. Calculation đã kiểm định, ruleset có version và evidence truy vết vẫn là lõi xác định kết luận; AI chỉ có thể là lớp giao tiếp, biên tập hoặc presentation khi phù hợp và không được bổ sung luận điểm ngoài dữ liệu/rule được phép.

---

# 5. KIẾN TRÚC THÔNG TIN TỔNG THỂ

## 5.1. Điều hướng chính giai đoạn MVP

1. **Tổng quan**
2. **Cuộc sống**
3. **Bản đồ sao**
4. **Hồ sơ đã lưu**

## 5.2. Điều hướng sau khi mở rộng

1. Tổng quan
2. Cuộc sống
3. Thời vận
4. Quan hệ
5. Bản đồ sao
6. Thư viện học
7. Hồ sơ

## 5.3. Điều hướng không nên dùng

Không đưa một menu chính dài kiểu:

- Mặt Trời
- Mặt Trăng
- Sao Thủy
- Sao Kim
- Sao Hỏa
- Nhà 1
- Nhà 2
- Nhà 3
- Aspect
- Transit

Các mục này thuộc layer chuyên môn hoặc trang tra cứu, không phải hành trình chính.

---

# 6. LUỒNG NGƯỜI DÙNG CHUẨN

## 6.1. Luồng lần đầu

1. Landing page.
2. Chọn “Tạo bản đồ sao miễn phí”.
3. Nhập ngày sinh, giờ sinh, địa điểm sinh.
4. Hệ thống xác nhận múi giờ và độ chính xác giờ sinh.
5. Tạo chart.
6. Hiển thị Bản đồ 60 giây.
7. Người dùng chọn một lĩnh vực muốn hiểu sâu.
8. Hiển thị preview nội dung đầy đủ.
9. Mời lưu hồ sơ.
10. Mời mở báo cáo hoặc đăng ký khi người dùng đã nhận giá trị.

## 6.2. Luồng quay lại

1. Mở hồ sơ gần nhất.
2. Xem tóm tắt hoặc cập nhật thời vận.
3. Tiếp tục lĩnh vực đang đọc.
4. Xem nội dung đã lưu hoặc lịch sử.

## 6.3. Luồng người chuyên môn

1. Tạo hoặc mở hồ sơ.
2. Chuyển sang Chế độ chuyên gia.
3. Chọn hệ nhà, orb, điểm bổ sung.
4. Xem chart, table và luận giải liên kết.
5. Xuất dữ liệu hoặc báo cáo.

---

# 7. ĐẶC TẢ MÀN HÌNH “BẢN ĐỒ 60 GIÂY”

## 7.1. Mục tiêu

Trong vòng 60 giây, người dùng phải trả lời được:

- Tôi có đặc điểm cốt lõi nào?
- Tôi cảm xúc ra sao?
- Tôi thể hiện bản thân thế nào?
- Điểm mạnh lớn nhất là gì?
- Mâu thuẫn nổi bật là gì?
- Tôi nên khám phá phần nào tiếp theo?

## 7.2. Cấu trúc màn hình

### A. Header hồ sơ

- Tên hồ sơ.
- Ngày, giờ, nơi sinh.
- Trạng thái độ chính xác giờ sinh.
- Nút sửa thông tin.
- Nút lưu.
- Nút chia sẻ.

### B. Hero insight

Ví dụ cấu trúc:

> **Bạn hướng tới sự ổn định và thành tựu, nhưng nội tâm nhạy cảm và cần khoảng không để xử lý cảm xúc. Người khác có thể thấy bạn linh hoạt hơn những gì bạn thực sự cảm nhận bên trong.**

Yêu cầu:

- Không quá 320 ký tự trên mobile.
- Là đoạn tổng hợp, không ghép ba đoạn riêng biệt.
- Có nút “Xem cơ sở”.

### C. Big Three cards

Ba card:

- Mặt Trời — Bản sắc cốt lõi.
- Mặt Trăng — Cảm xúc và nhu cầu an toàn.
- Cung Mọc — Cách bạn bước vào cuộc sống.

Mỗi card gồm:

- Tên cung.
- Một câu tóm tắt.
- Một điểm mạnh.
- Một điều dễ bị hiểu sai.
- Nút xem chi tiết.

### D. Ba nguồn lực nổi bật

Ví dụ:

- Khả năng tổ chức.
- Trực giác về con người.
- Tư duy thích nghi.

Không chỉ lấy từ Big Three. Phải dùng dominant, góc chiếu quan trọng, angularity hoặc rule tổng hợp nếu dữ liệu đã hỗ trợ.

### E. Ba mâu thuẫn hoặc thử thách nổi bật

Ví dụ:

- Muốn kiểm soát nhưng dễ quá tải cảm xúc.
- Muốn gần gũi nhưng cần nhiều không gian riêng.
- Tư duy nhanh nhưng quyết định chậm khi áp lực.

Mỗi item có:

- Mô tả ngắn.
- Biểu hiện thường gặp.
- Nút “Tìm hiểu sâu”.

### F. Các lĩnh vực đề xuất

Hiển thị 3–4 card ưu tiên dựa trên chart và dữ liệu người dùng:

- Tình yêu.
- Sự nghiệp.
- Cảm xúc.
- Tài chính.

Không nên luôn hiện cùng thứ tự cho mọi người.

### G. Bánh xe lá số preview

- Chart đơn giản.
- Có thể nhấn vào hành tinh.
- Tooltip giải thích bằng ngôn ngữ dễ hiểu.
- Nút “Mở bản đồ sao đầy đủ”.

### H. CTA mềm

- Lưu hồ sơ để xem lại.
- Khám phá toàn bộ mười lĩnh vực.
- Xem bản báo cáo mẫu trước khi mua.

## 7.3. Nội dung miễn phí ở màn hình này

- Hero insight.
- Big Three.
- Tất cả vị trí hành tinh cơ bản ở dạng danh sách rút gọn.
- Ba nguồn lực.
- Ba thử thách.
- Ba lĩnh vực preview.
- Chart cơ bản.
- Một thẻ chia sẻ.

## 7.4. Điều kiện nghiệm thu

- Người dùng không cần biết thuật ngữ vẫn hiểu nội dung.
- Màn hình đầu không dài quá mức trên mobile.
- Không có hơn hai CTA thương mại trong vùng đầu.
- Chart tải được độc lập với content.
- Nếu rule tổng hợp chưa đủ, hiển thị trạng thái “Đang hoàn thiện phân tích tổng hợp” thay vì tạo câu chung chung.

---

# 8. ĐẶC TẢ “BÁNH XE CUỘC SỐNG”

## 8.1. Mục tiêu

Biến lá số thành một hồ sơ đời sống có cấu trúc, không buộc người dùng đọc theo 12 nhà hoặc 10 hành tinh.

## 8.2. Mười lĩnh vực chuẩn

1. **Bản thân và bản sắc**
2. **Cảm xúc và sự an toàn**
3. **Tư duy, học tập và giao tiếp**
4. **Tình yêu và sự thân mật**
5. **Gia đình và nguồn cội**
6. **Công việc và sự nghiệp**
7. **Tiền bạc và tài nguyên**
8. **Sức khỏe, nhịp sống và thói quen**
9. **Bạn bè, cộng đồng và mạng lưới**
10. **Hướng phát triển và bài học lớn**

## 8.3. Mapping kỹ thuật

Mỗi lĩnh vực không tương ứng cứng với một nhà duy nhất. Phải tổng hợp từ nhiều yếu tố.

Ví dụ “Công việc và sự nghiệp” có thể dùng:

- Nhà 2, 6, 10.
- Chủ tinh các nhà liên quan.
- MC.
- Mặt Trời.
- Sao Thổ.
- Sao Hỏa.
- Sao Mộc.
- Góc chiếu tới MC hoặc chủ tinh nhà 10.
- Dominant element/modality nếu phù hợp.

Mapping phải nằm trong rule/config, không hard-code trong UI.

## 8.4. Cấu trúc một trang lĩnh vực

### A. Tóm tắt lĩnh vực

- 2–4 câu tổng hợp.
- Một câu “Điều quan trọng nhất”.

### B. Nguồn lực

- 3–5 điểm.
- Có ví dụ hành vi.

### C. Thử thách

- 2–4 điểm.
- Không phán xét.
- Mô tả điều kiện kích hoạt.

### D. Mâu thuẫn nội tại

- Chỉ hiển thị khi có rule xung đột đủ mạnh.
- Nêu cả hai nhu cầu, không tuyên bố một bên đúng.

### E. Biểu hiện trong đời sống

- Khi cân bằng.
- Khi căng thẳng.
- Trong quan hệ với người khác.

### F. Gợi ý phát triển

- 3–5 gợi ý cụ thể.
- Không đưa lời khuyên y tế, pháp lý hoặc tài chính mang tính quyết định.

### G. Cơ sở luận giải

- Danh sách yếu tố theo mức ảnh hưởng.
- Cho phép mở chi tiết.

## 8.5. Trạng thái khóa nội dung

Không che toàn bộ trang bằng paywall.

Nên cho người dùng thấy:

- Tên các phần.
- Một phần tóm tắt.
- Một nguồn lực.
- Một thử thách.
- Mục lục phần sẽ mở.

Sau đó mới hiển thị CTA:

- Mở toàn bộ hồ sơ.
- Mua riêng báo cáo lĩnh vực.
- Dùng thử Plus nếu có chương trình phù hợp.

---

# 9. LỚP “VÌ SAO THIÊN VẬN KẾT LUẬN NHƯ VẬY?”

## 9.1. Mục tiêu

- Tăng niềm tin.
- Phục vụ người học.
- Giảm cảm giác nội dung AI chung chung.
- Hỗ trợ QA và debug.

## 9.2. Giao diện

Dùng drawer, bottom sheet hoặc modal theo thiết bị.

### Hiển thị mặc định

- 3–5 yếu tố chính.
- Mỗi yếu tố có mức ảnh hưởng: cao / vừa / phụ.
- Một câu giải thích ngắn.

### Hiển thị nâng cao

- Planet/sign/house/aspect.
- Orb.
- Applying/separating nếu engine có.
- Chủ tinh.
- Trọng số.
- Rule ID.
- Content version.

## 9.3. Ví dụ cấu trúc dữ liệu

```json
{
  "insightId": "career-core-001",
  "summary": "Bạn phát triển tốt khi có mục tiêu dài hạn nhưng vẫn được quyền tự chủ trong cách thực hiện.",
  "evidence": [
    {
      "type": "placement",
      "key": "saturn_house_10",
      "weight": 0.92,
      "level": "high",
      "ruleId": "WA-CAREER-SATURN-H10-V1"
    },
    {
      "type": "aspect",
      "key": "sun_trine_saturn",
      "orb": 2.4,
      "weight": 0.78,
      "level": "high",
      "ruleId": "WA-ASPECT-SUN-TRINE-SATURN-V1"
    }
  ],
  "contentVersion": "1.0.0"
}
```

Tên field có thể điều chỉnh theo kiến trúc hiện có, nhưng bắt buộc phải giữ khả năng truy vết.

---

# 10. BẢN ĐỒ SAO TƯƠNG TÁC

## 10.1. Hai chế độ

### Dễ hiểu

- Chỉ major planets và điểm chính.
- Tooltip đời sống.
- Ẩn bảng số phức tạp.
- Nhấn vào hành tinh mở nội dung liên quan.

### Chuyên gia

- Độ số.
- Major/minor aspects.
- Orb.
- Hệ nhà.
- Nodes, Chiron, Lilith, asteroid tùy chọn.
- Bảng vị trí.
- Bảng góc chiếu.

## 10.2. Tương tác

- Hover/tap hành tinh làm nổi bật cung, nhà, góc chiếu.
- Tap góc chiếu mở luận giải.
- Có legend rõ ràng.
- Có nút reset.
- Có nút toàn màn hình.
- Có khả năng xuất ảnh sau giai đoạn MVP.

## 10.3. Hiệu năng

- Chart render độc lập.
- Không chặn toàn bộ trang nếu chart lỗi.
- Có skeleton loading.
- Có fallback danh sách placement.
- Tránh animation nặng trên thiết bị yếu.

---

# 11. NHẬP DỮ LIỆU SINH VÀ LƯU HỒ SƠ

## 11.1. Form chuẩn

- Tên hồ sơ.
- Ngày sinh.
- Giờ sinh.
- Phút sinh.
- Không rõ giờ sinh.
- Địa điểm sinh.
- Múi giờ tự động.

## 11.2. Xử lý không rõ giờ sinh

Không được tạo Cung Mọc, nhà hoặc luận giải phụ thuộc giờ sinh như thể chắc chắn.

Giao diện phải:

- Thông báo rõ giới hạn.
- Cho phép tạo chart không giờ sinh.
- Ẩn hoặc gắn nhãn các phần không đáng tin.
- Khuyến khích cập nhật giờ sinh sau.

## 11.3. Lưu dữ liệu

- Tự lưu form tạm trên thiết bị trước khi submit.
- Không để người dùng quay lại mất toàn bộ dữ liệu.
- Có lịch sử hồ sơ gần đây.
- Cho phép đổi tên hồ sơ.
- Cho phép xóa hồ sơ.
- Giải thích dữ liệu nào được lưu.

## 11.4. Múi giờ và địa điểm

- Ưu tiên timezone database chuẩn.
- Lưu cả timezone ID và offset tại thời điểm sinh.
- Có cơ chế hỗ trợ lịch sử múi giờ.
- Không chỉ lưu offset tĩnh.
- Nếu độ tin cậy thấp, hiển thị cảnh báo.

---

# 12. PHÂN TẦNG MIỄN PHÍ VÀ TRẢ PHÍ

## 12.1. Khách chưa đăng nhập

Cung cấp:

- Tạo một chart.
- Bản đồ 60 giây.
- Big Three.
- Vị trí hành tinh cơ bản.
- Ba nguồn lực.
- Ba thử thách.
- Preview ba lĩnh vực.
- Chart cơ bản.

Giới hạn:

- Không đồng bộ đa thiết bị.
- Không xem lịch sử dài.
- Không tải báo cáo đầy đủ.

## 12.2. Tài khoản miễn phí

Cung cấp:

- Lưu 2–3 hồ sơ.
- Tóm tắt mười lĩnh vực.
- Glossary.
- Một số nội dung bầu trời chung.
- Một preview tương hợp.
- Lưu insight yêu thích.

## 12.3. Báo cáo mua một lần

Ưu tiên trước thuê bao:

- Hồ sơ cá nhân đầy đủ.
- Báo cáo sự nghiệp.
- Báo cáo tình yêu.
- Báo cáo tài chính.
- Báo cáo gia đình/con cái.
- Báo cáo dự báo năm.
- Báo cáo quan hệ.

Yêu cầu:

- Có preview thật.
- Có mục lục.
- Có vài trang mẫu.
- Cho phép đọc trên web và tải PDF.
- Không chỉ kéo dài nội dung miễn phí.

## 12.4. Thiên Vận Plus

Chỉ nên mở khi có giá trị cập nhật liên tục:

- Transit cá nhân.
- Dòng thời gian 12 tháng.
- Nhật ký.
- Nhắc mốc.
- Nhiều hồ sơ.
- Quan hệ không giới hạn theo chính sách.
- Nội dung định kỳ.
- Không quảng cáo.

## 12.5. Gói chuyên gia

Giai đoạn sau:

- Chế độ kỹ thuật đầy đủ.
- Xuất dữ liệu.
- Báo cáo được chuyên gia kiểm tra.
- Tư vấn trực tiếp.
- Rectification giờ sinh.

---

# 13. MÔ-ĐUN DÒNG THỜI GIAN THIÊN VẬN

## 13.1. Vai trò

Đây là lớp Temporal/Timing của Western Astrology, là lý do chính để người dùng quay lại và là nền tảng hợp lý cho thuê bao. Mô-đun có thể phát triển theo các nhịp hôm nay, 7 ngày, tháng và chu kỳ dài hạn; mỗi event phải có evidence và không được diễn đạt như dự báo tuyệt đối.

Việc triển khai chỉ bắt đầu khi Western natal core đủ sâu, aspect interpretation đạt coverage cần thiết theo plan, intra-school synthesis đủ ổn định và evidence/traceability vượt quality gate. Task queue và canonical planning tại thời điểm đó mới quyết định việc mở Temporal Engine.

## 13.2. Cấu trúc

- Hôm nay.
- 7 ngày tới.
- Tháng này.
- Chu kỳ dài hạn.
- Đang diễn ra.
- Sắp đạt đỉnh.
- Sắp kết thúc.

## 13.3. Mỗi sự kiện thời vận gồm

- Tên chủ đề đời sống.
- Khoảng thời gian.
- Ngày cao điểm nếu có.
- Mức độ ảnh hưởng.
- Lĩnh vực liên quan.
- Mô tả dễ hiểu.
- Gợi ý quan sát hoặc chuẩn bị.
- Cơ sở transit.

## 13.4. Rule an toàn

Không biến transit thành dự báo chắc chắn.

Không dùng wording gây hoảng sợ.

Không gửi notification kiểu:

- “Hôm nay bạn sẽ gặp tai họa.”
- “Quan hệ của bạn sắp kết thúc.”

Dùng:

- “Chủ đề giao tiếp có thể căng hơn bình thường.”
- “Nên kiểm tra kỹ cam kết và thông tin trong giai đoạn này.”

---

# 14. MÔ-ĐUN GƯƠNG QUAN HỆ

## 14.1. Vai trò

- Nhu cầu rõ ràng.
- Dễ bán báo cáo mua một lần.
- Dễ chia sẻ.
- Có khả năng mở rộng sang cặp đôi, gia đình, đối tác.

## 14.2. Không dùng điểm hợp nhau duy nhất

Không hiển thị “hợp 86%”.

Thay bằng các trục:

- Cảm xúc.
- Giao tiếp.
- Hấp dẫn.
- Cam kết.
- Xử lý xung đột.
- Nhịp sống.
- Công việc chung.
- Tài chính chung.
- Khả năng phát triển.

## 14.3. Cấu trúc kết quả

- Điều kết nối.
- Điều dễ hiểu lầm.
- Nhu cầu khác nhau.
- Điểm kích hoạt xung đột.
- Cách mỗi phía có thể cảm nhận.
- Điều kiện để quan hệ phát triển.
- Cơ sở Synastry/Composite.

---

# 15. KIẾN TRÚC NỘI DUNG VÀ RULE ENGINE

## 15.1. Nguyên tắc

UI không tự tạo luận giải.

UI chỉ:

- Nhận dữ liệu đã chuẩn hóa.
- Hiển thị theo tầng.
- Cho phép truy vết.
- Ghi nhận feedback.

## 15.2. Các lớp dữ liệu đề xuất

1. **Astronomical calculation layer**
2. **Normalized chart data**
3. **Rule evaluation layer**
4. **Conflict and synthesis layer**
5. **Content rendering layer**
6. **UI presentation layer**

## 15.3. Rule ưu tiên

Hệ thống cần có cơ chế:

- Trọng số.
- Loại rule.
- Ngữ cảnh đời sống.
- Mức độ mạnh/yếu.
- Mức độ tin cậy.
- Xung đột giữa các rule.
- Loại bỏ lặp ý.
- Versioning.

## 15.4. Tổng hợp, không ghép đoạn

Pipeline gợi ý:

1. Thu thập candidate insights.
2. Chấm mức liên quan theo lĩnh vực.
3. Gom nhóm ý giống nhau.
4. Phát hiện xung đột.
5. Chọn insight chính và phụ.
6. Sinh outline.
7. Render từ content templates đã kiểm soát.
8. QA trùng lặp và mâu thuẫn.
9. Trả evidence cho UI.

## 15.5. Versioning

Mỗi content/rule phải có:

- ID.
- Version.
- Ngày cập nhật.
- Nguồn hoặc cơ sở biên soạn.
- Trạng thái draft/reviewed/published.
- Ngôn ngữ.

Khi nâng version, toàn hệ thống phải có thể cập nhật đồng bộ mà không sửa từng component.

---

# 16. QUY TẮC VIẾT LUẬN GIẢI

## 16.1. Giọng văn

- Bình tĩnh.
- Tôn trọng.
- Không thần bí hóa quá mức.
- Không phán xét.
- Không dọa nạt.
- Không tâng bốc mọi người.
- Không dùng câu quá chung chung.

## 16.2. Công thức một insight tốt

1. Nêu xu hướng.
2. Cho biết điều kiện biểu hiện.
3. Nêu mặt tích cực.
4. Nêu mặt mất cân bằng.
5. Cho ví dụ đời sống.
6. Đưa gợi ý quan sát hoặc thực hành.

## 16.3. Ví dụ không đạt

> Bạn là người thông minh, giàu cảm xúc và có khả năng thành công nếu cố gắng.

Lý do không đạt:

- Áp dụng cho gần như mọi người.
- Không có điều kiện.
- Không có mâu thuẫn.
- Không có ví dụ.
- Không truy vết được.

## 16.4. Ví dụ đạt hơn

> Bạn có xu hướng xử lý vấn đề bằng lý trí và cấu trúc, nhưng khi cảm thấy không an toàn, quyết định có thể bị kéo dài vì bạn muốn kiểm soát quá nhiều khả năng cùng lúc. Trong công việc, điều này giúp bạn chuẩn bị kỹ; khi áp lực cao, nó có thể biến thành trì hoãn. Hãy đặt một ngưỡng thông tin đủ dùng trước khi chốt quyết định.

---

# 17. UI COMPONENT SYSTEM ĐỀ XUẤT

## 17.1. Component cấp nền tảng

- `ProfileHeader`
- `BirthDataSummary`
- `AccuracyBadge`
- `ModeSwitch`
- `InsightCard`
- `StrengthCard`
- `ChallengeCard`
- `LifeAreaCard`
- `EvidenceDrawer`
- `AstroChart`
- `PlacementList`
- `AspectList`
- `LockedPreview`
- `UpgradeCTA`
- `SaveProfileButton`
- `ShareInsightCard`
- `FeedbackControl`
- `GlossaryTooltip`

## 17.2. Trang chính

- `ChartOverviewPage`
- `LifeAreasPage`
- `LifeAreaDetailPage`
- `TechnicalChartPage`
- `SavedProfilesPage`

## 17.3. Component giai đoạn sau

- `TransitTimeline`
- `TransitEventCard`
- `RelationshipOverview`
- `CompatibilityAxis`
- `JournalEntry`
- `ReportPreview`
- `PurchaseFlow`

## 17.4. Quy tắc component

- Không nhúng nội dung luận giải dài trong JSX/HTML.
- Hỗ trợ i18n từ đầu.
- Hỗ trợ trạng thái loading, empty, error, partial data.
- Hỗ trợ unknown birth time.
- Hỗ trợ content version.
- Hỗ trợ tracking event.

---

# 18. SEO VÀ NỘI DUNG CÔNG KHAI

## 18.1. Mục tiêu

Dùng nội dung công khai để đưa người dùng từ câu hỏi đời sống vào công cụ cá nhân hóa.

## 18.2. Cụm nội dung

- Ý nghĩa Mặt Trời/Mặt Trăng/Cung Mọc.
- Hành tinh trong 12 cung.
- Hành tinh trong 12 nhà.
- Các góc chiếu.
- Tình yêu và chiêm tinh.
- Nghề nghiệp và chiêm tinh.
- Gia đình, cảm xúc, thói quen.
- Transit và chu kỳ.
- Synastry và Composite.

## 18.3. Cấu trúc bài SEO

1. Trả lời trực tiếp câu hỏi.
2. Tóm tắt dễ hiểu.
3. Giải thích kỹ thuật.
4. Ví dụ đời sống.
5. Điểm mạnh và thử thách.
6. Các yếu tố làm thay đổi kết luận.
7. CTA tạo bản đồ sao cá nhân.

## 18.4. Liên kết nội bộ

- Bài kiến thức → công cụ tạo chart.
- Kết quả chart → bài giải thích thuật ngữ.
- Bài lĩnh vực → báo cáo cá nhân hóa.
- Trang transit → lịch bầu trời và hồ sơ cá nhân.

---

# 19. ACCESSIBILITY VÀ KHẢ NĂNG ĐỌC

- Font body đủ lớn.
- Line-height thoáng.
- Độ tương phản đạt chuẩn.
- Không dùng màu là tín hiệu duy nhất.
- Chart có mô tả text thay thế.
- Keyboard navigation.
- Screen reader labels.
- Có chế độ giảm chuyển động.
- Không để đoạn văn quá dài.
- Mỗi card chỉ nên có một ý chính.

---

# 20. PHÂN TÍCH DỮ LIỆU VÀ PHẢN HỒI

## 20.1. Event tracking tối thiểu

- `birth_form_started`
- `birth_form_completed`
- `chart_generated`
- `overview_viewed`
- `life_area_opened`
- `evidence_opened`
- `profile_saved`
- `insight_shared`
- `insight_feedback_submitted`
- `locked_preview_viewed`
- `report_checkout_started`
- `report_purchased`

## 20.2. Feedback nội dung

Mỗi insight có:

- Đúng với tôi.
- Chưa chắc.
- Không đúng với tôi.

Có thể thêm lý do tùy chọn:

- Quá chung chung.
- Không đúng bối cảnh.
- Khó hiểu.
- Mâu thuẫn với phần khác.
- Thiếu ví dụ.

Dữ liệu này dùng để nâng rule, không tự động thay đổi kết luận cá nhân ngay lập tức.

---

# 21. LỘ TRÌNH TRIỂN KHAI

Thứ tự dưới đây là **release roadmap**, không tự động xác lập **technical dependency** hay mở coding task. Đặc biệt, hoàn thành báo cáo trả phí ở Giai đoạn 3 không đồng nghĩa có thể tự động bắt đầu Transit: Western Temporal Engine vẫn phụ thuộc độ sâu natal core, coverage aspect theo plan, intra-school synthesis ổn định và evidence/traceability đạt quality gate.

## Giai đoạn 0 — Chuẩn hóa nền móng

### Mục tiêu

Đảm bảo UI mới dùng được với rule engine hiện tại.

### Công việc

- Rà soát schema chart hiện có.
- Rà soát rule/content registry.
- Kiểm tra versioning.
- Kiểm tra lưu hồ sơ.
- Chuẩn hóa trạng thái không rõ giờ sinh.
- Chuẩn hóa evidence payload.
- Xác định dữ liệu nào đã sẵn sàng, dữ liệu nào chưa.

### Kết quả bắt buộc

- Data contract được ghi thành tài liệu.
- Không còn logic luận giải nằm rải rác trong component.
- Có danh sách gap của rule engine.

---

## Giai đoạn 1 — MVP Bản đồ 60 giây

### Mục tiêu

Tạo trải nghiệm đầu tiên dễ hiểu và có giá trị.

### Công việc

1. Xây form nhập dữ liệu sinh mới hoặc nâng cấp form hiện tại.
2. Thêm tự lưu dữ liệu form.
3. Xây `ChartOverviewPage`.
4. Xây hero insight.
5. Xây Big Three cards.
6. Xây nguồn lực và thử thách.
7. Xây chart preview.
8. Xây Evidence Drawer.
9. Xây lưu hồ sơ.
10. Xây feedback insight.
11. Responsive mobile/desktop.
12. Analytics events.

### Không làm trong giai đoạn này

- Transit đầy đủ.
- Synastry đầy đủ.
- Subscription.
- Audio, podcast, thiền.
- Hệ chuyên gia quá sâu.

### Tiêu chí hoàn thành

- Tạo chart thành công.
- Không mất dữ liệu khi quay lại form.
- Nội dung đầu tiên dễ hiểu.
- Mọi insight chính có evidence.
- Không có lỗi nghiêm trọng trên mobile.

---

## Giai đoạn 2 — Bánh xe cuộc sống

### Mục tiêu

Biến chart thành hồ sơ đời sống đầy đủ.

### Công việc

1. Xây 10 life areas.
2. Hoàn thiện mapping rule theo lĩnh vực.
3. Xây summary/strength/challenge/conflict/advice.
4. Xây preview khóa nội dung.
5. Xây trang chi tiết.
6. Xây glossary liên kết.
7. Xây content QA.
8. Xây feedback theo lĩnh vực.

### Tiêu chí hoàn thành

- Mỗi lĩnh vực có nội dung riêng, không lặp máy móc.
- Có xử lý xung đột.
- Có traceability.
- Người dùng miễn phí vẫn nhận giá trị thật.

---

## Giai đoạn 3 — Báo cáo trả phí mua một lần

### Mục tiêu

Tạo doanh thu đầu tiên mà không phụ thuộc thuê bao.

### Công việc

- Báo cáo hồ sơ cá nhân.
- Báo cáo nghề nghiệp.
- Báo cáo tình yêu.
- Preview và mục lục.
- Đọc trên web.
- Xuất PDF.
- Thanh toán.
- Lịch sử mua.
- Version report.

### Tiêu chí hoàn thành

- Báo cáo trả phí sâu hơn rõ rệt.
- Không chỉ tăng số trang.
- Có cấu trúc, mục lục, tóm tắt điều hành.
- Nội dung nhất quán với UI.

---

## Giai đoạn 4 — Dòng thời gian Thiên Vận

### Mục tiêu

Tạo retention và nền tảng Plus.

Chỉ mở giai đoạn kỹ thuật này khi các dependency natal/aspect/synthesis/evidence nêu ở đầu lộ trình đã đạt và task queue/canonical planning hiện hành cho phép.

### Công việc

- Transit engine.
- Timeline.
- Event grouping.
- Peak dates.
- Filters.
- Journal.
- Notifications.
- Past/future navigation.
- Rule an toàn.

### Tiêu chí hoàn thành

- Không tạo dự báo tuyệt đối.
- Timeline dễ hiểu.
- Mỗi event có evidence.
- Có lý do quay lại hằng tuần.

---

## Giai đoạn 5 — Gương quan hệ

### Mục tiêu

Mở sản phẩm quan hệ và tăng doanh thu mua lẻ.

### Công việc

- Synastry.
- Relationship overview.
- Các trục quan hệ.
- Composite.
- Báo cáo quan hệ.
- Lưu nhiều hồ sơ.
- Quyền riêng tư dữ liệu người thứ hai.

---

## Giai đoạn 6 — Chế độ chuyên gia và dịch vụ cao cấp

### Công việc

- Hệ nhà nâng cao.
- Orb settings.
- Minor aspects.
- Points/asteroids.
- Export.
- Expert review.
- Tư vấn.
- Rectification.

---

# 22. TASK QUEUE ĐỀ XUẤT CHO CODEX

## Epic 1 — Data & Rule Readiness

- [ ] Kiểm kê schema hiện tại.
- [ ] Tạo `chart-data-contract.md`.
- [ ] Chuẩn hóa evidence object.
- [ ] Thêm content/rule version.
- [ ] Tách content khỏi UI nếu còn hard-code.
- [ ] Viết test cho unknown birth time.

## Epic 2 — Birth Input & Profile Persistence

- [ ] Cải tiến form nhập dữ liệu.
- [ ] Tự lưu draft.
- [ ] Xác nhận timezone.
- [ ] Lưu hồ sơ.
- [ ] Sửa hồ sơ.
- [ ] Xóa hồ sơ.
- [ ] Hiển thị accuracy badge.

## Epic 3 — 60-Second Overview

- [ ] Profile header.
- [ ] Hero insight.
- [ ] Big Three cards.
- [ ] Strength cards.
- [ ] Challenge cards.
- [ ] Suggested life areas.
- [ ] Chart preview.
- [ ] Share card.

## Epic 4 — Evidence & Transparency

- [ ] Evidence Drawer.
- [ ] Rule ID display ở expert mode.
- [ ] Weight/orb display.
- [ ] Glossary links.
- [ ] Error/fallback states.

## Epic 5 — Life Areas

- [ ] Life area index.
- [ ] 10 detail pages.
- [ ] Mapping config.
- [ ] Conflict rendering.
- [ ] Advice rendering.
- [ ] Locked preview.

## Epic 6 — QA, Analytics, SEO

- [ ] Analytics events.
- [ ] Insight feedback.
- [ ] Responsive tests.
- [ ] Accessibility audit.
- [ ] SEO metadata.
- [ ] Structured data phù hợp.
- [ ] Performance budget.

---

# 23. TIÊU CHÍ NGHIỆM THU TỔNG THỂ

## 23.1. Functional

- Tạo chart với dữ liệu hợp lệ.
- Xử lý dữ liệu thiếu.
- Không mất form.
- Lưu và mở lại hồ sơ.
- Chart và content đồng bộ.
- Evidence đúng với insight.
- Paywall đúng quyền.

## 23.2. Content

- Không trùng lặp quá mức.
- Không mâu thuẫn vô lý.
- Không khẳng định định mệnh.
- Không dùng điểm số giả chính xác.
- Có ví dụ đời sống.
- Có gợi ý mềm.
- Có cơ sở kỹ thuật.

## 23.3. UX

- Người mới hiểu màn hình đầu.
- Không bị ngợp bởi thuật ngữ.
- Dễ chuyển chế độ.
- CTA không gây áp lực.
- Mobile dùng tốt.
- Loading và error rõ ràng.

## 23.4. Technical

- Không hard-code luận giải.
- Có test.
- Có version.
- Có logging.
- Có analytics.
- Có khả năng i18n.
- Không phụ thuộc một layout desktop.

## 23.5. Performance

Mục tiêu tham khảo:

- Trang overview tải nhanh trên mạng di động.
- Chart không làm treo main thread.
- Lazy-load module nâng cao.
- Giới hạn bundle không cần thiết.
- Ảnh và icon tối ưu.

---

# 24. NHỮNG ĐIỀU TUYỆT ĐỐI KHÔNG LÀM

1. Không nhồi toàn bộ hành tinh, nhà, góc chiếu lên màn hình đầu.
2. Không tạo báo cáo bằng cách nối hàng chục đoạn độc lập.
3. Không khóa toàn bộ giá trị sau paywall.
4. Không chấm điểm số mệnh.
5. Không dùng câu gây sợ hãi để tăng tương tác.
6. Không để người dùng mất dữ liệu form khi quay lại.
7. Không bỏ qua trường hợp không rõ giờ sinh.
8. Không tự đổi hệ nhà mà không cho người dùng biết.
9. Không dùng AI tự do tạo nội dung trái rule engine.
10. Không triển khai subscription trước khi có giá trị định kỳ.
11. Không xây quá nhiều tính năng phụ trước khi lõi luận giải đạt chất lượng.
12. Không sao chép trực tiếp phong cách hoặc nội dung đối thủ.

---

# 25. NGUỒN KHẢO SÁT ĐÃ DÙNG ĐỂ CHỐT PHƯƠNG ÁN

Snapshot khảo sát ngày 04/08/2026:

## Việt Nam

- ChiêmTinhLaSo.com
- TraCuuBanDoSao.com
- Chòi Chiêm Tinh
- Lịch Ngày Tốt
- ELLE Việt Nam — nội dung chiêm tinh đời sống
- An Gem — phễu miễn phí sang thương mại

## Quốc tế

- Astro.com
- Astro-Seek
- Co–Star
- CHANI
- The Pattern
- TimePassages
- Sanctuary

## Kết luận từ khảo sát

- Công cụ chuyên môn thường sâu nhưng khó tiếp cận.
- Ứng dụng đại chúng thường dễ dùng nhưng thiếu minh bạch kỹ thuật.
- Khoảng trống tốt nhất cho Thiên Vận là kết hợp hai phía.
- Báo cáo mua một lần phù hợp để mở doanh thu trước thuê bao.
- Subscription chỉ hợp lý khi có transit, timeline và nội dung cập nhật.
- Quan hệ là mô-đun thương mại mạnh nhưng không nên làm trước lõi cá nhân.

---

# 26. QUYẾT ĐỊNH CUỐI CÙNG

## Sản phẩm lõi phải được triển khai theo thứ tự

1. **Bản đồ 60 giây**
2. **Bánh xe cuộc sống**
3. **Cơ sở luận giải minh bạch**
4. **Báo cáo mua một lần**
5. **Dòng thời gian Thiên Vận**
6. **Gương quan hệ**
7. **Chế độ chuyên gia và dịch vụ cao cấp**

Đây là thứ tự phát hành sản phẩm. Nó không thay thế dependency kỹ thuật hoặc task queue: Dòng thời gian Thiên Vận chỉ được triển khai sau khi Western natal core, aspect coverage, intra-school synthesis và evidence/traceability đạt quality gate cần thiết.

## Tiêu chuẩn khác biệt của Thiên Vận

> **Dễ hiểu với người mới — đủ sâu với người biết — có thể kiểm tra với người chuyên môn.**

Khi Codex bắt đầu lại, không cần khảo sát đối thủ từ đầu. Việc đầu tiên là đối chiếu codebase và rule hiện tại với Giai đoạn 0, lập gap report, sau đó triển khai Giai đoạn 1 theo đúng tiêu chí nghiệm thu trong tài liệu này.

---

# 27. LỆNH KHỞI ĐỘNG GỢI Ý CHO CODEX

Có thể dùng nguyên văn:

```text
Hãy đọc toàn bộ file docs/THIENVAN_WESTERN_ASTROLOGY_UI_PRODUCT_MASTER_PLAN.md và các tài liệu spec/rule/status hiện có trong thư mục docs.

Nhiệm vụ đầu tiên:
1. Rà soát codebase hiện tại so với “Giai đoạn 0 — Chuẩn hóa nền móng”.
2. Không sửa lớn ngay. Trước tiên tạo một Gap Report gồm: phần đã có, phần thiếu, phần sai kiến trúc, rủi ro, file liên quan và thứ tự sửa.
3. Kiểm tra đặc biệt: schema chart, rule engine, content versioning, evidence payload, xử lý không rõ giờ sinh, lưu hồ sơ, nội dung hard-code trong UI và khả năng mobile-first.
4. Đề xuất task queue chi tiết cho “Giai đoạn 1 — MVP Bản đồ 60 giây”, chia thành task nhỏ có tiêu chí nghiệm thu.
5. Chỉ bắt đầu code sau khi Gap Report và task queue đã được lưu vào docs.
6. Không khảo sát lại đối thủ; dùng Master Plan này làm quyết định sản phẩm chuẩn.
7. Không tự thay đổi định hướng sản phẩm. Nếu phát hiện xung đột kỹ thuật, ghi vào Decision Log và đề xuất phương án xử lý.
```

---

**END OF MASTER PLAN**
