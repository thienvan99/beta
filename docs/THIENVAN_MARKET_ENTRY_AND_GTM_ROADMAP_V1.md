# THIÊN VẬN — LỘ TRÌNH THỊ TRƯỜNG, SẢN PHẨM VÀ GO-TO-MARKET V1

**Tên file đề xuất trong repository:** `docs/THIENVAN_MARKET_ENTRY_AND_GTM_ROADMAP_V1.md`<br>
**Phiên bản:** 1.1.0<br>
**Ngày lập:** 04/08/2026<br>
**Cập nhật chiến lược:** 14/08/2026 — bổ sung định vị trong kỷ nguyên AI phổ thông, moat sản phẩm, target architecture và vai trò AI/LLM.<br>
**Vai trò của tài liệu:** nguồn tham chiếu chiến lược cho việc phát triển sản phẩm, tiếp cận thị trường Việt Nam và mở rộng quốc tế.<br>
**Tài liệu nền:** `THIENVAN_MASTER_HANDOFF_V2.md` ngày 03/08/2026, cộng với hai đợt khảo sát đối thủ toàn cầu và Việt Nam được rà soát lại ngày 04/08/2026.

---

## 0. Cách sử dụng tài liệu

Tài liệu này trả lời tám câu hỏi điều hành:

1. Thiên Vận đang xây sản phẩm gì và không xây sản phẩm gì?
2. Đối thủ trong nước và quốc tế đang thắng bằng cách nào?
3. Lợi thế cạnh tranh thật sự của Thiên Vận nằm ở đâu?
4. Vì sao người dùng vẫn cần Thiên Vận khi AI phổ thông có thể trả lời các câu hỏi về chiêm tinh và luận mệnh?
5. AI/LLM được phép giữ vai trò nào bên trong sản phẩm và tài sản nào bắt buộc phải thuộc về Thiên Vận?
6. Nên triển khai Việt Nam và nước ngoài theo thứ tự nào?
7. Mỗi giai đoạn phải làm gì, đo gì và đạt điều kiện nào mới được đi tiếp?
8. Khi mở cuộc trò chuyện hoặc giao việc mới, cần dùng nguồn nào làm chuẩn?

Tài liệu này **không thay thế** tài liệu kỹ thuật, trạng thái repository hoặc kết quả test. Khi nội dung tài liệu mâu thuẫn với repository thực tế, phải kiểm tra repository, test, giao diện và cập nhật lại tài liệu.

---

# 1. Tóm tắt quyết định chiến lược

## 1.1. Định vị trung tâm

> **Thiên Vận là nền tảng bản đồ cá nhân đa trường phái. Từ một hồ sơ sinh, người dùng có thể khám phá Chiêm tinh Tây phương, Chiêm tinh Vệ Đà, Bát Tự và Tử Vi như các hệ quy chiếu độc lập. Mỗi kết luận phải cho biết dữ liệu, quy tắc, trường phái và phiên bản đã tạo ra nó.**

Thiên Vận không định vị là:

- Website xem cung hoàng đạo đơn giản.
- Website bói toán tổng hợp.
- AI tự phán vận mệnh.
- Công cụ dùng thiên văn học để “chứng minh” chiêm tinh.
- Nền tảng trộn bốn hệ thành một lời phán duy nhất.
- Marketplace chuyên gia ngay từ giai đoạn đầu.

## 1.2. Thị trường triển khai

### Việt Nam

Việt Nam là thị trường ra mắt đầu tiên vì:

- Ngôn ngữ và khả năng kiểm soát nội dung thuận lợi.
- Có thể phỏng vấn người dùng nhanh.
- Chi phí thử nghiệm thấp hơn thị trường quốc tế.
- Nhu cầu Tử Vi, Bát Tự, chiêm tinh và nội dung phát triển bản thân đã tồn tại.
- Có thể xây nền thương hiệu, quy trình hỗ trợ và dữ liệu hành vi trước khi quốc tế hóa.

### Nước ngoài

Không phát hành từng quốc gia rời rạc ngay từ đầu. Cách triển khai đề xuất:

> **Xây bản tiếng Anh dùng toàn cầu, lấy Hoa Kỳ làm thị trường thương mại chính; đồng thời cho Anh, Canada, Australia, New Zealand và Singapore truy cập tự nhiên.**

Thứ tự ưu tiên tổng thể:

1. Việt Nam — kiểm chứng sản phẩm, niềm tin và khả năng trả tiền.
2. Hoa Kỳ — thị trường thương mại chính của bản tiếng Anh.
3. Anh, Canada, Australia — hưởng lợi từ cùng nội dung tiếng Anh.
4. Đức — bản địa hóa premium sau khi bản tiếng Anh chứng minh conversion.
5. Brazil — mở rộng quy mô sau khi có năng lực localization và thanh toán địa phương.
6. Singapore — thị trường kiểm chứng định vị đa hệ khi có ít nhất hai trường phái hoàn chỉnh.
7. Ấn Độ — chỉ vào khi module Vệ Đà đủ sâu và được kiểm định.
8. Đài Loan/Hong Kong — chỉ vào khi Bát Tự và Tử Vi hoàn chỉnh, có tiếng Hoa phồn thể và chuyên gia bản địa.
9. Hy Lạp — thị trường ngách, có giá trị thương hiệu và nội dung lịch sử nhưng không phải thị trường tăng trưởng đầu tiên.
10. Nga và Trung Quốc — tạm hoãn triển khai trả phí vì rủi ro dữ liệu, thanh toán, pháp lý và hạ tầng.

## 1.3. Sản phẩm phát hành đầu tiên

**Chiêm tinh Tây phương Beta**, nhưng thương hiệu vẫn được trình bày là nền tảng bốn hệ.

Tầng miễn phí:

- Hồ sơ dữ liệu sinh.
- Dữ liệu thời gian và địa điểm đã chuẩn hóa.
- Big Three: Mặt Trời, Mặt Trăng, Cung Mọc.
- Vòng tròn lá số cơ bản.
- Một số kết luận nền.
- Ít nhất một ví dụ hoàn chỉnh của “Vì sao có kết luận này?”.
- Cảnh báo về độ chính xác của giờ sinh.
- Không bắt đăng ký trước khi người dùng thấy giá trị cơ bản.

Tầng trả phí đầu tiên chỉ mở khi có:

- Sun–Moon–ASC.
- Mercury–Venus–Mars.
- Hành tinh trong nhà.
- Góc chiếu chính.
- Tổng hợp toàn lá số.
- Evidence và rule ID.
- Giao diện dễ đọc.
- Kiểm tra mâu thuẫn văn luận.
- Báo cáo gắn calculation version và interpretation version.
- Thanh toán, quyền truy cập, sửa dữ liệu và chính sách hoàn tiền.

## 1.4. Hào cạnh tranh

Hào cạnh tranh của Thiên Vận không phải số lượng calculator hay số lượng đoạn văn AI. Hào cạnh tranh đề xuất:

```text
Calculation được kiểm định
        +
Ruleset có tên và phiên bản
        +
Kết luận truy nguyên được về evidence
        +
Một Hồ sơ Thiên Vận dùng cho nhiều hệ
        +
Đối chiếu nhưng không đánh đồng
        +
Nội dung hai lớp: dễ hiểu và chuyên môn
        +
Bản địa hóa do người có chuyên môn duyệt
        +
Lịch sử phiên bản và khả năng tái tạo báo cáo
```


## 1.5. Định vị trong kỷ nguyên AI phổ thông

### Bài toán chiến lược

AI phổ thông có thể ngày càng tốt hơn trong việc trả lời câu hỏi, giải thích thuật ngữ, tóm tắt tài liệu và tạo văn bản cá nhân hóa. Vì vậy, Thiên Vận **không được xây lợi thế cạnh tranh dựa trên giả định rằng người dùng không thể hỏi ChatGPT, Gemini, Claude hoặc một AI khác về chiêm tinh, Bát Tự, Tử Vi hay Vệ Đà**.

Nếu sản phẩm chỉ là:

```text
Dữ liệu sinh
    ↓
Gửi cho LLM
    ↓
Nhận một bài luận dài
```

thì lợi thế khó bảo vệ và dễ bị thay thế khi model phổ thông cải thiện.

### Quyết định định vị

Thiên Vận cạnh tranh bằng **hệ thống chuyên biệt có cấu trúc**, không cạnh tranh bằng việc tạo ra nhiều văn bản AI hơn.

Giá trị cốt lõi phải nằm ở:

- calculation engine được kiểm định;
- ruleset được phê duyệt, có ID và version;
- evidence graph có thể truy nguyên;
- synthesis có methodology và test;
- một hồ sơ dùng xuyên nhiều trường phái;
- temporal/timing engines khi từng trường phái đã sẵn sàng;
- lịch sử và timeline cá nhân có cấu trúc khi người dùng đồng ý;
- khả năng tái tạo report theo version;
- Response Framework thống nhất;
- trải nghiệm beginner-first, expert-deep, evidence-visible.

AI/LLM chỉ là **một lớp giao tiếp hoặc biên tập tùy chọn** nằm trên các tài sản đó.

### Câu trả lời cho “Tại sao không hỏi AI luôn?”

Thiên Vận không hứa rằng AI phổ thông “không biết” các trường phái. Sự khác biệt cần đến từ workflow và dữ liệu chuyên biệt:

| AI phổ thông | Thiên Vận cần hướng tới |
| --- | --- |
| Người dùng chủ động nghĩ câu hỏi và prompt | Hệ thống chủ động tổ chức hồ sơ, chủ đề, chu kỳ và evidence |
| Câu trả lời có thể thay đổi theo model/prompt | Calculation và rule output có version, có thể tái tạo |
| Kiến thức tổng quát từ nhiều nguồn | Rule nghiệp vụ được phê duyệt theo từng trường phái |
| Hội thoại là đơn vị tương tác chính | Hồ sơ, timeline, report và life-event data là các object có cấu trúc |
| Có thể tổng hợp nhiều trường phái bằng ngôn ngữ | Thiên Vận giữ từng hệ độc lập và chỉ đối chiếu theo methodology |
| Model là phần lớn trải nghiệm | Model có thể thay thế mà không thay lõi sản phẩm |

Thông điệp nội bộ cần giữ:

> **AI trả lời câu hỏi. Thiên Vận xây bản đồ cá nhân có cấu trúc, có thời gian, có evidence và có khả năng theo dõi.**

Đây là định vị sản phẩm, không phải tuyên bố rằng AI phổ thông không thể thực hiện bất kỳ tác vụ riêng lẻ nào tương tự.

## 1.6. Kiến trúc moat dài hạn

Target architecture:

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

### Ý nghĩa

- **School Calculation Engines:** mỗi trường phái tự tính, tự validation và không dùng LLM để suy ra dữ liệu chuyên môn.
- **School Rule Engines:** interpretation có rule ID, version và evidence.
- **Intra-school Synthesis:** tổng hợp bên trong một trường phái trước khi so sánh với hệ khác.
- **Temporal Engines:** transit, dasha, đại vận, lưu niên, đại hạn/tiểu hạn... chỉ được triển khai theo specification riêng đã kiểm định.
- **Cross-school Comparison:** dùng `convergence`, `complementary`, `divergence`; không dùng số phiếu hoặc tỷ lệ “các hệ xác nhận”.
- **Personal Life Map / Structured History:** sự kiện, phản hồi và lịch sử cá nhân chỉ được lưu khi có consent phù hợp; đây là dữ liệu người dùng, không phải bằng chứng khoa học xác nhận hiệu lực của một trường phái.
- **Response + Action Layer:** chuyển dữ liệu/rule thành tự quan sát, hành động an toàn và theo dõi theo `THIENVAN_RESPONSE_FRAMEWORK.md`.
- **Optional AI Interface:** AI có thể giúp hội thoại, tóm tắt, diễn đạt hoặc điều hướng; không phải source of truth.

### Quy tắc tài sản lõi

Một model AI có thể được thay thế mà không buộc Thiên Vận phải xây lại:

- calculation;
- ruleset;
- evidence;
- profile data model;
- timeline;
- report snapshots;
- cross-school relation;
- response contract.

Nếu thay model mà semantic output cốt lõi bị thay đổi ngoài ruleset/evidence, kiến trúc đó chưa đạt mục tiêu.

---

# 2. Căn cứ thị trường và cách đọc nguồn

## 2.1. Nguồn nội bộ

Nguồn chuẩn về tầm nhìn và kiến trúc là `THIENVAN_MASTER_HANDOFF_V2.md`, trong đó xác định:

- Một hồ sơ sinh dùng cho bốn hệ.
- Calculation engine và interpretation engine tách biệt.
- Calculation deterministic, typed result và automated tests.
- Rule diễn giải có `ruleId`, `version` và evidence.
- Không dùng AI để tự tính hành tinh, can chi, tiết khí, an sao hoặc dasha.
- Không trộn bốn hệ thành một kết luận số phận tuyệt đối.
- Tây phương là module phát hành đầu tiên, không phải toàn bộ thương hiệu.

## 2.2. Nguồn bên ngoài

Nguồn bên ngoài được dùng để xác nhận:

- Đối thủ đang cung cấp tính năng gì.
- Họ dùng mô hình miễn phí, báo cáo, thuê bao hay marketplace.
- Kênh tiếp cận và cách trình bày sản phẩm.
- Tín hiệu nhu cầu và hành vi sử dụng.
- Điều kiện pháp lý hoặc thanh toán ở một số thị trường.

Các con số do đối thủ tự công bố, ví dụ lượt lập lá số hoặc lời khẳng định “chính xác”, **không được coi là đã kiểm chứng độc lập**. Chỉ dùng chúng để hiểu cách đối thủ định vị và truyền thông.

---

# 3. Bản đồ cạnh tranh toàn cầu

## 3.1. Nhóm nền tảng Tây phương uy tín và chuyên sâu

### Astro.com / Astrodienst

**Cách thắng:**

- Uy tín lâu năm.
- Công cụ chart chuyên sâu.
- Nội dung của các tác giả nổi tiếng.
- Dùng thử miễn phí trước khi bán báo cáo.
- Lưu hồ sơ sinh.
- Báo cáo và thuê bao transit.
- Nhiều ngôn ngữ.
- Chính sách dữ liệu và thanh toán được trình bày rõ.

**Bài học cho Thiên Vận:**

- Uy tín phải đến từ engine, tác giả, phương pháp và lịch sử phiên bản.
- Báo cáo mẫu là công cụ bán hàng quan trọng.
- Nội dung miễn phí không nhất thiết phải tổng hợp toàn lá số; phần trả phí phải tạo giá trị tổng hợp rõ ràng.
- Quyền xóa dữ liệu và tính riêng tư phải được đưa vào trải nghiệm, không chỉ nằm trong trang pháp lý.

### Astro-Seek và các bộ công cụ chuyên sâu

**Cách thắng:**

- Rất nhiều calculator.
- SEO phủ kỹ thuật rộng.
- Miễn phí.
- Phù hợp người học và chuyên gia.

**Khoảng trống:**

- Người mới dễ bị ngợp.
- Công cụ nhiều nhưng hành trình cá nhân có thể bị rời rạc.
- Không phải nền tảng đa hệ có một lớp evidence thống nhất.

**Bài học:**

Không chạy đua số lượng calculator trong giai đoạn đầu. Thiên Vận chỉ xây công cụ miễn phí khi nó:

1. Kéo đúng nhóm người dùng mục tiêu.
2. Củng cố niềm tin vào dữ liệu.
3. Dẫn tự nhiên vào Hồ sơ Thiên Vận hoặc báo cáo.

## 3.2. Nhóm UX mạnh và subscription

### Co–Star, The Pattern, CHANI

**Cách thắng:**

- Onboarding nhanh.
- Ngôn ngữ gần đời sống.
- Daily insight.
- Social sharing, quan hệ và compatibility.
- Giọng thương hiệu nhất quán.
- Thuê bao nhờ giá trị quay lại.

**Khoảng trống:**

- Phương pháp hoặc rule tạo kết luận thường không được trình bày như một hệ thống evidence có version.
- Một số sản phẩm giấu gần như toàn bộ lớp tính toán.
- Dễ phụ thuộc vào văn phong hoặc thông báo gây chú ý.

**Bài học:**

Thiên Vận phải đạt trải nghiệm dễ hiểu tương đương nhóm UX mạnh, nhưng giữ được lớp chuyên môn bên dưới. Không bắt người dùng học thuật ngữ trước khi nhận giá trị.

## 3.3. Nhóm đa hệ và AI

### OpenFate

OpenFate công khai cung cấp Bát Tự, Tử Vi Đẩu Số và Chiêm tinh Tây phương; có chart miễn phí, nội dung theo tình yêu, nghề nghiệp, tài chính, timing và compatibility.

**Mức đe dọa:** cao nhất trong nhóm consumer đa hệ.

**Thế mạnh:**

- Hiểu nhu cầu “một người — nhiều hệ”.
- Nội dung tiếng Anh hiện đại.
- Nhiều landing page theo vấn đề.
- Tốc độ mở rộng nội dung và tính năng nhanh.
- Có công cụ chia sẻ và định hướng AI/agent.

**Khoảng trống Thiên Vận có thể chiếm:**

- Công khai ruleset, evidence và version rõ hơn.
- Không để AI trở thành nguồn chuyên môn cuối cùng.
- Không trộn các hệ thành một kết luận duy nhất.
- Tái tạo được báo cáo cũ.
- Có hội đồng chuyên môn và lịch sử thay đổi.

### Các nền tảng “nhiều hệ trong một lần bấm”

**Rủi ro chung:**

- Độ rộng vượt quá khả năng kiểm định chiều sâu.
- AI hòa trộn các truyền thống.
- Người dùng khó biết trường phái nào tạo kết luận.
- Nội dung dễ mang tính khẳng định hơn mức cơ sở cho phép.

**Quyết định cho Thiên Vận:**

Bốn hệ làm sâu có giá trị hơn hàng chục hệ bề mặt. Không thêm trường phái chỉ để tăng con số marketing.

## 3.4. Nhóm Vệ Đà

### AstroSage, ClickAstro, AstroTalk

**Cách thắng:**

- Hệ sinh thái Vệ Đà rộng.
- Kundli, matching, dasha, nakshatra, panchang và báo cáo theo vấn đề.
- Nhiều ngôn ngữ Ấn Độ.
- Marketplace chuyên gia hoặc tư vấn trực tiếp.
- Giá địa phương.
- Giá trị định kỳ và nhu cầu nghi lễ/đời sống.

**Bài học:**

Ấn Độ là thị trường rất lớn nhưng không phù hợp để vào bằng một sản phẩm chỉ có Tây phương. Thiên Vận chỉ triển khai Ấn Độ sau khi module Vệ Đà có:

- Ayanamsha được quyết định và version hóa.
- D1/Rāśi.
- Lagna.
- Nakshatra và pada.
- Vimshottari Dasha.
- House lordship.
- Quy tắc interpretation đã kiểm định.
- Ngôn ngữ và giá địa phương.

## 3.5. Nhóm Bát Tự/Tử Vi

Các đối thủ quốc tế thường mạnh ở một trong ba hướng:

- Calculator chuyên môn.
- Báo cáo AI nhanh.
- Công cụ dành cho người hành nghề.

Khoảng trống lớn nhất là sự khác biệt trường phái:

- Đổi ngày 23:00 hay 00:00.
- Có dùng true solar time hay không.
- Cách khởi vận.
- Trường phái dụng thần.
- Cách an sao, tứ hóa, đại hạn và lưu niên.

Đây là khu vực Thiên Vận có thể tạo uy tín bằng `schoolId`, `rulesetId`, `rulesetVersion`, màn hình lựa chọn kỹ thuật và tài liệu kiểm định.

---

# 4. Bản đồ cạnh tranh tại Việt Nam

## 4.1. AI Tử Vi

**Cách tiếp cận:**

- Ứng dụng mobile freemium.
- Lập lá số, trọn đời, đại vận, tháng và ngày.
- In-app purchase theo nhiều gói.
- Thông báo và nội dung định kỳ.
- Lưu nhiều hồ sơ.
- Dùng ngôn ngữ trực tiếp vào tài chính, sự nghiệp, tình yêu và vận hạn.

**Thế mạnh:**

- Phễu miễn phí sang trả phí rõ.
- Mobile-first.
- Có gói từ cơ bản đến gia đình và thuê bao thời gian.
- Chạm đúng nhu cầu người Việt.

**Điểm Thiên Vận không nên sao chép:**

- Hộp đen AI.
- Điểm số vận khí như một sự thật khách quan.
- Thông điệp khiến người dùng nghĩ ứng dụng thay thế hoàn toàn chuyên gia.
- Kết luận có tính dự báo quá chắc chắn.

## 4.2. Thái Âm

**Cách tiếp cận:**

- Trọn đời, năm, tháng, ngày.
- Hai cấp độ cơ bản và chuyên sâu.
- Referral.
- Điểm Huyền Khí.
- Thử thách, bảng xếp hạng và phần thưởng.
- Chat với nhân vật/chuyên gia trong ứng dụng.

**Thế mạnh:**

- Hiểu vòng lặp giữ chân.
- Gamification.
- Hai lớp nội dung.
- Giá và gói sản phẩm đa dạng.

**Rủi ro quan sát được:**

Một số phản hồi công khai cho rằng phần luận giải chung chung hoặc chưa đủ sâu. Đây không phải bằng chứng đại diện cho toàn bộ người dùng, nhưng cho thấy rủi ro của nội dung tự động thiếu evidence và tổng hợp.

**Bài học:**

Thiên Vận nên học hai lớp nội dung, nhưng không biến “vận mệnh” thành cuộc đua điểm số.

## 4.3. Tuvi.vn và Chợ Lá Số

**Cách tiếp cận:**

- Công cụ và nội dung miễn phí.
- Marketplace kết nối người xem với “thầy”.
- Người dùng lên cấp thành chuyên gia.
- Giá thấp để giảm rào cản.
- Chủ đề theo nhu cầu: công danh, tình duyên, tài vận, nhà cửa, xuất ngoại.
- Hệ thống Xu và xếp hạng.

**Thế mạnh:**

- Cộng đồng hai phía.
- Nguồn cung chuyên gia.
- Nội dung người dùng tạo.
- Có khả năng giữ chân người dùng lâu.

**Rủi ro:**

- Chất lượng phụ thuộc từng người.
- Khó chuẩn hóa.
- Dễ có kết luận mâu thuẫn.
- Rủi ro đạo đức khi cạnh tranh bằng lời phán mạnh.

**Quyết định:**

Thiên Vận chỉ mở dịch vụ chuyên gia sau khi engine, evidence, quy tắc đạo đức, cơ chế phản hồi và giải quyết tranh chấp đã ổn định.

## 4.4. ChiêmTinhLaSo.com

**Đây là đối thủ trực tiếp quan trọng nhất của module Tây phương tại Việt Nam.**

**Cách tiếp cận:**

- Lập bản đồ sao miễn phí.
- Không cần tài khoản.
- Tự động timezone, tọa độ và DST.
- Lưu trên thiết bị.
- Nhiều báo cáo: cá nhân, nghề nghiệp, quan hệ, tài chính, transit, progression và rectification.
- Dẫn người dùng theo mục tiêu, không chỉ theo thuật ngữ.
- Tuyên bố toàn bộ báo cáo miễn phí.

**Thế mạnh:**

- Độ rộng công cụ lớn.
- Ít ma sát.
- Có lịch sử hoạt động và social proof do chính trang công bố.
- Phù hợp cả người mới và người nghiên cứu.

**Điều kiện để Thiên Vận cạnh tranh:**

Thiên Vận không thể chỉ có vòng tròn chart và Big Three. Phải thắng bằng:

- Tổng hợp toàn lá số tốt hơn.
- Evidence rõ hơn.
- Trải nghiệm đọc tốt hơn.
- Hồ sơ xuyên nhiều hệ.
- Báo cáo version hóa.
- Quyền riêng tư rõ.
- Nội dung có giá trị hành động nhưng không phán tuyệt đối.

## 4.5. Lịch Ngày Tốt

**Cách tiếp cận:**

- SEO phủ rất rộng.
- Lịch âm và nội dung hằng ngày.
- Tử Vi ngày, tháng, năm.
- 12 con giáp và 12 cung hoàng đạo.
- Tiêu đề cảm xúc mạnh.
- Nhiều công cụ đời sống.

**Thế mạnh:**

- Thói quen quay lại.
- Bao phủ nhu cầu theo mùa.
- Tìm kiếm tự nhiên.
- Ngôn ngữ rất quen thuộc với người Việt.

**Điểm yếu để khai thác:**

- Nhiều nội dung đại chúng không cá nhân hóa sâu.
- Tiêu đề dễ gây cảm giác giật gân.
- Nội dung có thể lẫn giữa giải trí, dự báo và khuyến nghị.

**Quyết định:**

Không đối đầu về số lượng bài. Thiên Vận xây cụm nội dung có chiều sâu, có công cụ và liên kết trực tiếp tới hồ sơ cá nhân.

## 4.6. Phong Thủy Số

**Cách tiếp cận:**

- SEO từ khóa dài.
- Các chủ đề giàu có, kết hôn, xuất ngoại, vận hạn và người nổi tiếng.
- Gắn nội dung với thương hiệu chuyên gia.
- Kêu gọi tư vấn.

**Thế mạnh:**

- Hiểu câu hỏi người dùng thật sự tìm.
- Nội dung cụ thể, dễ click.
- Có gương mặt chuyên gia.

**Khoảng trống:**

Một số trang dùng ngôn ngữ hung hiểm, đau khổ hoặc dự báo mạnh. Thiên Vận có thể trả lời cùng nhu cầu nhưng bằng ngôn ngữ có giới hạn và không thay thế y khoa, pháp lý hay tài chính.

## 4.7. Lý Số Việt Nam và Chòi Chiêm Tinh

**Cách thắng:**

- Cộng đồng lâu năm.
- Nghiệm lý.
- Tranh luận trường phái.
- Công cụ chuyên môn.
- Chú ý giờ sinh, timezone và dữ liệu lịch sử.

**Điểm yếu:**

- UX cũ hoặc phức tạp.
- Người mới khó tiếp cận.
- Ý kiến cá nhân và ruleset có thể lẫn nhau.
- Thiếu một lớp tổng hợp version hóa thống nhất.

**Bài học:**

Thiên Vận phải giữ sự cẩn trọng kỹ thuật, nhưng ẩn độ phức tạp sau giao diện dễ dùng. Người chuyên môn có thể mở “Chế độ kỹ thuật”.

---

# 5. Lợi thế của Thiên Vận

## 5.1. Lợi thế đã có hoặc đã được xác lập trong kiến trúc

Những điểm dưới đây có cơ sở từ tài liệu bàn giao hoặc module đã triển khai:

1. Hồ sơ dữ liệu sinh được chuẩn hóa theo tọa độ và timezone.
2. Calculation engine Tây phương tách khỏi giao diện.
3. Calculation Tây phương deterministic và đã có kiểm thử/kiểm định theo tài liệu bàn giao.
4. Có ASC, MC, 12 nhà, hành tinh trong nhà, góc chiếu và applying/separating.
5. Kiến trúc định hướng ruleset có mã, version và evidence.
6. Không dùng AI để tự tính dữ liệu chuyên môn.
7. Định vị bốn hệ độc lập đã được chốt.
8. Có nguyên tắc không hù dọa và không phán tuyệt đối.
9. Báo cáo thương mại được định hướng gắn với phiên bản calculation và interpretation.

## 5.2. Lợi thế đang xây, chưa được phép quảng bá như đã hoàn thành

1. Interpretation Tây phương đầy đủ toàn lá số.
2. “Vì sao có kết luận này?” cho toàn bộ nội dung.
3. Hồ sơ đa hệ hoạt động hoàn chỉnh.
4. Vệ Đà, Bát Tự và Tử Vi.
5. Đối chiếu liên trường phái.
6. Language pack tiếng Anh, Đức, Bồ Đào Nha, Hoa hoặc các ngôn ngữ khác.
7. Hội đồng chuyên gia kiểm định.
8. Birth-time sensitivity.
9. Báo cáo checksum và tái tạo phiên bản đầy đủ.
10. Công cụ chuyên gia, API và white-label.

**Nguyên tắc truyền thông:** chỉ quảng bá là “đã có” khi tính năng chạy thật, được kiểm tra trên giao diện và vượt test, lint, build.

## 5.3. Lợi thế dài hạn khó sao chép

### A. Evidence graph

Mỗi kết luận liên kết với:

- Dữ liệu tính toán.
- Quy tắc.
- Các yếu tố hỗ trợ.
- Các yếu tố làm biến đổi hoặc mâu thuẫn.
- Trường phái.
- Phiên bản.
- Nguồn chuyên môn.
- Ngôn ngữ.

### B. Một hồ sơ, nhiều hệ

Người dùng không nhập lại ngày giờ sinh khi mở trường phái khác. Hồ sơ trở thành tài sản trung tâm, còn các module là quyền truy cập độc lập.

### C. Đối chiếu có giới hạn

Thiên Vận giải thích điểm giống và khác nhưng không nói hệ này chứng minh hệ kia.

### D. Hai lớp đọc

- Lớp phổ thông: ngôn ngữ đời sống.
- Lớp chuyên môn: cung, nhà, sao, orb, applying/separating, can chi, dasha, ruleset và evidence.

### E. Khả năng tái tạo báo cáo

Một báo cáo đã mua không thay đổi âm thầm khi ruleset được nâng cấp. Người dùng có thể xem bản cũ và bản mới, kèm lý do thay đổi.

### F. Thương hiệu không bán nỗi sợ

Đây vừa là nguyên tắc đạo đức, vừa là lợi thế thương mại dài hạn. Nó giúp Thiên Vận phù hợp với người dùng phát triển bản thân, chuyên gia nghiêm túc và thị trường quốc tế.


### G. Temporal intelligence

Khi từng trường phái đủ calculation, validation và interpretation, Thiên Vận có thể biến hồ sơ tĩnh thành hệ thống theo dõi chu kỳ:

- transit Tây phương;
- dasha Vệ Đà;
- đại vận/lưu niên Bát Tự;
- đại hạn/tiểu hạn/lưu niên Tử Vi.

Lợi thế không nằm ở việc gửi nhiều notification, mà ở khả năng liên kết **thời gian → rule → evidence → chủ đề đời sống → lịch sử report**.

### H. Personal Life Map có cấu trúc

Nếu người dùng chủ động lưu các sự kiện hoặc phản hồi đời sống, Thiên Vận có thể xây lịch sử cá nhân có cấu trúc thay vì chỉ dựa vào transcript hội thoại.

Yêu cầu bắt buộc:

- consent rõ;
- cho phép sửa/xóa;
- không dùng sự kiện đời thật như bằng chứng tự động “chứng minh” một trường phái;
- không âm thầm thay đổi calculation/rule từ feedback cá nhân;
- tách dữ liệu người dùng khỏi analytics bên thứ ba theo nguyên tắc data minimization.

### I. AI là lớp thay thế được

AI/LLM có thể tăng chất lượng giao tiếp nhưng không được trở thành tài sản duy nhất giữ logic chuyên môn.

Lõi sản phẩm phải tiếp tục hoạt động ở mức có ý nghĩa khi:

- đổi nhà cung cấp model;
- model tạm thời không khả dụng;
- một thị trường yêu cầu chính sách dữ liệu khác;
- một task cần deterministic rendering thay vì generative rendering.

---

# 6. Kiến trúc sản phẩm thương mại

## 6.1. Hồ sơ Thiên Vận

Đây là đơn vị sản phẩm trung tâm, không phải từng lần lập lá số.

Hồ sơ cần lưu hoặc quản lý:

- Tên hiển thị.
- Ngày, giờ, phút sinh.
- Nơi sinh.
- Tọa độ.
- IANA timezone.
- Giờ địa phương và UTC.
- Mức độ tin cậy của giờ sinh.
- Đồng ý lưu dữ liệu.
- Calculation snapshots.
- Các báo cáo đã mua.
- Ngôn ngữ và locale.
- Lịch sử chỉnh sửa dữ liệu sinh.

## 6.2. Tầng miễn phí

Mục tiêu: cho người dùng thấy giá trị trước khi đăng ký hoặc trả tiền.

Bao gồm:

- Tạo chart không cần tài khoản.
- Big Three.
- Một số vị trí nền.
- Tóm tắt ngắn.
- Một evidence card hoàn chỉnh.
- Giải thích ảnh hưởng của giờ sinh.
- Nút lưu hồ sơ.
- Báo cáo mẫu.
- Waitlist cho các trường phái chưa phát hành.

## 6.3. Báo cáo một trường phái

### Báo cáo nhập môn

- Cấu hình nền.
- Điểm mạnh.
- Thách thức.
- Hướng phát triển.
- Evidence rút gọn.
- Phù hợp người mới.

### Báo cáo chuyên sâu

- Toàn bộ cấu hình trong phạm vi module.
- Tổng hợp mâu thuẫn.
- Các chủ đề tình cảm, công việc, động lực và phát triển.
- Evidence đầy đủ.
- Chế độ kỹ thuật.
- Version và snapshot.
- Xuất PDF khi ổn định.

## 6.4. Gói hai trường phái

Chỉ mở khi hai module đều:

- Calculation được kiểm định.
- Interpretation ổn định.
- Có chuyên gia kiểm tra.
- Có lớp giải thích sự khác nhau.
- Không dùng phép quy đổi đơn giản giữa các khái niệm.

## 6.5. Thuê bao

Chỉ bán thuê bao khi có giá trị định kỳ thật:

- Transit Tây phương.
- Dasha Vệ Đà.
- Đại vận/lưu niên Bát Tự.
- Đại hạn/tiểu hạn/lưu niên Tử Vi.
- Journal hoặc nội dung học theo hồ sơ.
- Notification có thể giải thích.

Không bán thuê bao chỉ để người dùng đọc lại natal report.

## 6.6. Dịch vụ chuyên gia

Giai đoạn sau:

- Luận giải 1–1.
- Đối chiếu hai hệ.
- Tổng hợp bốn hệ.
- Công cụ quản lý khách hàng.
- Ghi chú có tác giả.
- Mọi chuyên gia dùng cùng calculation snapshot.
- Phần nhận định riêng phải được gắn tên, thời gian và trách nhiệm.


## 6.7. Kiến trúc sản phẩm dài hạn và thứ tự phụ thuộc

Các lớp sau là **target architecture**, không phải tuyên bố đã triển khai:

```text
1. Shared Birth Profile
2. School Engines
3. Intra-school Synthesis
4. Temporal Engines
5. Cross-school Comparison
6. Personal Life Map / Structured History
7. Response + Action Layer
8. Optional AI Interface
```

Quy tắc triển khai:

1. Không xây cross-school synthesis production khi các school engine liên quan chưa đủ chất lượng.
2. Không xây Personal Life Map bằng cách lưu trữ mặc định dữ liệu nhạy cảm; phải có privacy design và consent trước.
3. Không xây AI Advisor trước khi structured input, response contract, safety và hallucination tests đủ rõ.
4. Không để một phase dài hạn làm gián đoạn vertical slice đang được ưu tiên trong task queue hiện hành.
5. Các lớp mới phải được ghi vào `DECISION_LOG.md` và tạo task riêng khi đủ dependency; roadmap chiến lược không tự động biến thành coding task.

---

# 7. Cách trình bày Thiên Vận

## 7.1. Trang chủ

### Hero đề xuất

**Tiêu đề:**

> Hiểu mình qua nhiều hệ quy chiếu.

**Mô tả:**

> Nhập dữ liệu sinh một lần để khám phá Chiêm tinh Tây phương, Vệ Đà, Bát Tự và Tử Vi như những góc nhìn độc lập. Mỗi kết luận đều cho biết dữ liệu và quy tắc đã tạo ra nó.

**CTA chính:**

> Tạo Hồ sơ Thiên Vận miễn phí

**CTA phụ:**

> Xem báo cáo mẫu

### Bốn cam kết ngay dưới hero

- Tính toán có kiểm định.
- Không phán tuyệt đối.
- Không dùng AI để tự tính lá số.
- Người dùng kiểm soát dữ liệu của mình.

## 7.2. Onboarding

Chỉ hỏi thông tin cần thiết. Luồng đề xuất:

1. Ngày sinh.
2. Giờ và phút sinh.
3. Nơi sinh.
4. Tự nhận diện tọa độ và timezone.
5. Xác nhận độ tin cậy giờ sinh.
6. Hiển thị kết quả cơ bản.
7. Chỉ yêu cầu đăng ký khi người dùng muốn lưu.

Không bắt người dùng tự nhập tọa độ nếu hệ thống có thể tìm tự động. Cho phép mở phần nâng cao để kiểm tra.

## 7.3. Trang kết quả

Thứ tự đọc:

```text
Tóm tắt 60 giây
    ↓
Ba chủ đề nổi bật
    ↓
Điểm mạnh – thách thức – hướng phát triển
    ↓
Bản đồ sao trực quan
    ↓
Các phần luận chi tiết
    ↓
Vì sao có kết luận này?
    ↓
Dữ liệu và chế độ chuyên môn
```

Không đưa cả bốn chart phức tạp lên màn hình đầu tiên.

## 7.4. Evidence card

Mẫu cấu trúc:

- Kết luận.
- Mức độ chắc chắn trong phạm vi ruleset.
- Dữ liệu tạo kết luận.
- Yếu tố hỗ trợ.
- Yếu tố làm thay đổi biểu hiện.
- Rule ID.
- Ruleset version.
- Calculation version.
- Trường phái.
- Giới hạn.
- Link đến tài liệu giải thích.

## 7.5. Trình bày mâu thuẫn

Không ghép hàng chục đoạn độc lập. Hệ thống cần nói rõ:

- Xu hướng A xuất hiện khi nào.
- Xu hướng B xuất hiện khi nào.
- Hai xu hướng xung đột ra sao.
- Người dùng có thể quan sát chúng trong bối cảnh nào.
- Không kết luận một yếu tố “xóa bỏ” hoàn toàn yếu tố khác nếu ruleset không quy định.

## 7.6. Ngôn ngữ thương hiệu

Nên dùng:

- “Có xu hướng”.
- “Có thể biểu hiện”.
- “Thường rõ hơn khi”.
- “Trong hệ quy chiếu này”.
- “Dữ liệu cho thấy”.
- “Đây là góc nhìn tham khảo”.

Tránh:

- “Chắc chắn”.
- “Định mệnh bắt buộc”.
- “Đại họa”.
- “Không mua sẽ bỏ lỡ vận may”.
- “Hệ này chứng minh hệ kia”.
- Dự đoán chắc chắn bệnh tật, tử vong, ly hôn hoặc phá sản.

## 7.7. Thiết kế thị giác

Định hướng:

- Hiện đại, điềm tĩnh, có chiều sâu.
- Nền tối xanh đêm/than và nền đọc sáng màu ngà.
- Vàng đồng dùng tiết chế.
- Mỗi trường phái có màu phụ riêng.
- Card có nhiều khoảng thở.
- Font tiếng Việt và đa ngôn ngữ tốt.
- Mobile-first.
- Biểu đồ không bị trang trí lấn át.
- Chế độ sáng và tối.
- Màu đỏ chỉ dùng cho lỗi hoặc cảnh báo kỹ thuật.

---

# 8. Chiến lược tiếp cận thị trường Việt Nam

## 8.1. Khách hàng mục tiêu đầu tiên

### Nhóm chính

Người 23–40 tuổi:

- Quan tâm phát triển bản thân.
- Đã từng xem cung hoàng đạo, Tarot, Tử Vi hoặc thần số học.
- Quen mua sản phẩm số.
- Muốn nội dung sâu hơn 12 cung hoặc 12 con giáp.
- Không muốn học toàn bộ thuật ngữ.
- Có nhu cầu tình cảm, nghề nghiệp, mâu thuẫn nội tâm và chu kỳ cuộc sống.
- Có xu hướng thận trọng với các lời phán quá mạnh.

### Nhóm phụ

Người học và người hành nghề:

- Muốn kiểm tra dữ liệu.
- Cần lưu nhiều hồ sơ.
- Cần evidence.
- Muốn xem ruleset.
- Cần xuất báo cáo và ghi chú.

## 8.2. Kênh và vai trò

Dữ liệu Decision Lab Q4/2025 cho thấy Facebook tiếp tục dẫn đầu về mức độ liên quan tại Việt Nam, theo sau là Zalo và YouTube; TikTok và Instagram cũng giữ vai trò đáng kể, với khác biệt rõ hơn theo thế hệ.

Phân vai đề xuất:

| Kênh | Vai trò |
|---|---|
| Google/SEO | Thu hút nhu cầu rõ ràng và bền vững |
| TikTok/Reels/Shorts | Nhận biết, giải thích khái niệm ngắn |
| YouTube | Kiến thức sâu, demo, kiểm định và so sánh hệ |
| Facebook | Bài dài, thảo luận, livestream và cộng đồng |
| Zalo OA | Hỗ trợ, nhắc báo cáo và chăm sóc khách hàng |
| Email | Gửi báo cáo, version update và nội dung dài |
| Website | Nơi sở hữu hồ sơ, dữ liệu và quan hệ người dùng |

Không đăng cùng một nội dung nguyên bản lên mọi kênh. Mỗi kênh cần định dạng riêng.

## 8.3. Nội dung thu hút

Bắt đầu bằng câu hỏi người dùng hiểu:

- Vì sao cung Mặt Trời không mô tả hết con người?
- Giờ sinh lệch 15 phút ảnh hưởng điều gì?
- Tại sao hai website cho kết quả khác nhau?
- Bát Tự và Tử Vi có phải cùng một hệ?
- Cung Mọc có phải cung Mệnh?
- Tại sao một lá số có kết luận trái ngược?
- AI có thể tự luận lá số chính xác không?
- Khi không biết giờ sinh thì phần nào còn dùng được?

Không mở đầu bằng danh sách thuật ngữ kỹ thuật.

## 8.4. Cụm SEO

### Cụm 1 — Hiểu bản thân

- Mặt Trời, Mặt Trăng, Cung Mọc.
- Hành tinh trong cung.
- Hành tinh trong nhà.
- Góc chiếu.
- Mâu thuẫn trong lá số.

### Cụm 2 — Vấn đề đời sống

- Nghề nghiệp.
- Quan hệ.
- Giao tiếp.
- Động lực.
- Quản lý nguồn lực.
- Gia đình.
- Phát triển cá nhân.

### Cụm 3 — So sánh trường phái

- Tây phương và Vệ Đà.
- Bát Tự và Tử Vi.
- Tropical và sidereal.
- ASC và cung Mệnh.
- Transit, dasha, đại vận và đại hạn.

### Cụm 4 — Minh bạch phương pháp

- Timezone.
- DST.
- Tọa độ.
- Giờ sinh.
- Rule ID.
- Ruleset.
- Kiểm định calculation.
- Tại sao kết quả thay đổi.

### Cụm 5 — Công cụ miễn phí

- Big Three.
- Kiểm tra timezone ngày sinh.
- Đổi tọa độ.
- Kiểm tra độ nhạy giờ sinh.
- Glossary thuật ngữ.

## 8.5. Phễu Việt Nam

```text
Nội dung / công cụ miễn phí
        ↓
Tạo chart không cần tài khoản
        ↓
Nhận Big Three và evidence mẫu
        ↓
Lưu Hồ sơ Thiên Vận
        ↓
Xem báo cáo mẫu
        ↓
Mua báo cáo nhập môn/chuyên sâu
        ↓
Quay lại vì nội dung học hoặc chu kỳ thật
        ↓
Mở trường phái thứ hai
```

## 8.6. Giá thử nghiệm

Theo kế hoạch nội bộ hiện tại:

- Báo cáo nhập môn một hệ: 99.000–149.000 đồng.
- Báo cáo chuyên sâu một hệ: 249.000–399.000 đồng.
- Gói hai hệ: 399.000–599.000 đồng.
- Hồ sơ bốn hệ: 699.000–999.000 đồng.

Đây là giả thuyết, chưa phải giá chốt.

Cần thử nghiệm:

- Giá niêm yết.
- Trả một lần hay nâng cấp.
- Báo cáo xem vĩnh viễn.
- Giá launch.
- Refund.
- So sánh giá với độ sâu nội dung.
- Không dùng giảm giá giả hoặc đồng hồ đếm ngược gây áp lực.

---

# 9. Chiến lược quốc tế

## 9.1. Bản tiếng Anh và Hoa Kỳ

### Mục tiêu

Kiểm chứng rằng lợi thế “traceable interpretation” có thể chuyển hóa thành:

- Tỷ lệ hoàn tất hồ sơ.
- Tỷ lệ mở evidence.
- Tỷ lệ mua báo cáo.
- Tỷ lệ giới thiệu.
- Niềm tin và phản hồi tích cực.

Khảo sát Pew công bố năm 2025 cho thấy 28% người trưởng thành Mỹ tham khảo chiêm tinh hoặc horoscope ít nhất mỗi năm; phụ nữ 18–49 tuổi có tỷ lệ cao hơn. Đa số sử dụng vì giải trí hoặc để nhận thêm góc nhìn, và rất ít người dựa nhiều vào đó cho quyết định lớn. Điều này phù hợp với định vị “self-observation, not deterministic prediction”.

### Nhóm mục tiêu ban đầu

- Người 18–44.
- Nghiêng về nữ giới nhưng không giới hạn sản phẩm theo giới.
- Quan tâm self-discovery, relationship, journaling và astrology.
- Đã dùng app astrology nhưng muốn nội dung minh bạch hơn.
- Creator và astrologer nhỏ có chuyên môn.

### Thông điệp tiếng Anh

- “See exactly why your chart says what it says.”
- “One birth profile. Multiple traditions. Traceable interpretations.”
- “No black-box predictions.”
- “Explore, don’t surrender your decisions.”

### Kênh

- SEO tiếng Anh.
- Reddit và community có quy tắc phù hợp.
- YouTube giải thích calculation và evidence.
- Creator micro-influencer.
- Newsletter.
- Shareable chart cards.
- Product Hunt chỉ khi sản phẩm đã ổn định, không phải kênh chính.

### Điều kiện trước khi launch

- English content pack được người viết bản ngữ/chuyên môn duyệt.
- Locale, date format và timezone đúng.
- USD.
- Privacy, terms, refund.
- Không có nội dung tiếng Việt lọt ra UI.
- Support email.
- Analytics riêng theo quốc gia.
- Báo cáo mẫu tiếng Anh.
- Performance và mobile tốt.

## 9.2. Đức

### Vai trò

Thị trường premium, phù hợp thông điệp phương pháp, chuyên môn và riêng tư.

### Điều kiện

- Bản tiếng Anh có conversion.
- `de-DE` hoàn chỉnh, không dịch máy thô.
- Thuật ngữ được chuyên gia duyệt.
- EUR, định dạng ngày và số đúng locale.
- GDPR: consent, export, delete, retention và processor agreements.
- Nội dung privacy rõ ngay trong onboarding.

GDPR có thể áp dụng cho công ty ngoài EU nếu chủ động cung cấp hàng hóa/dịch vụ, kể cả miễn phí, cho cá nhân trong EU. Vì dữ liệu sinh là dữ liệu cá nhân dùng làm lõi sản phẩm, privacy phải là workstream trước launch chứ không phải bổ sung sau.

## 9.3. Brazil

### Vai trò

Thị trường mở rộng quy mô.

### Điều kiện

- `pt-BR`.
- Giá địa phương.
- Mobile-first.
- Social sharing.
- Thanh toán địa phương; Pix là hạ tầng phổ biến và hỗ trợ cả thanh toán định kỳ.
- Nội dung được bản địa hóa, không chỉ dịch.
- Hỗ trợ khách hàng theo múi giờ.

## 9.4. Singapore

### Vai trò

Phòng thử nghiệm đa hệ sau khi có ít nhất hai module.

Singapore có nền kinh tế số phát triển và môi trường sử dụng tiếng Anh thuận lợi. Đây là nơi tốt để thử:

- Western × Vedic.
- Western × BaZi.
- Cách trình bày khác biệt trường phái.
- Gói đối chiếu.
- Phỏng vấn nhóm người dùng đa văn hóa.

Không coi Singapore là thị trường doanh thu lớn nhất vì quy mô dân số nhỏ.

## 9.5. Ấn Độ

Chỉ vào khi Vệ Đà đủ mạnh. Không dùng bản Tây phương để cạnh tranh trực tiếp với hệ sinh thái bản địa.

Cần:

- Sản phẩm Vệ Đà đúng kỳ vọng.
- Chọn ngôn ngữ theo dữ liệu, không dịch đồng loạt.
- Giá địa phương.
- Tối ưu mobile.
- Nội dung relationship/matching và timing.
- Chuyên gia bản địa.
- Kiểm định trường phái.

## 9.6. Đài Loan/Hong Kong

Chỉ vào khi:

- Bát Tự và/hoặc Tử Vi hoàn chỉnh.
- Traditional Chinese.
- Ruleset và khác biệt trường phái công khai.
- Có người kiểm định bản địa.
- Thuật ngữ không bị dịch từ tiếng Việt một cách máy móc.

## 9.7. Nga, Trung Quốc và thị trường rủi ro

Không mở trả phí sớm. Cần workstream pháp lý riêng về:

- Data residency.
- Thanh toán.
- Truy cập hạ tầng.
- Kiểm duyệt.
- Chuyển dữ liệu.
- Nhà cung cấp nội địa.

---

# 10. Kiến trúc quốc tế hóa bắt buộc

Không gắn rule với một đoạn văn tiếng Việt duy nhất.

Luồng đề xuất:

```text
Calculation result
    ↓
Rule evaluation
    ↓
Semantic interpretation object
    ↓
Content key + evidence
    ↓
Locale content pack
    ↓
vi-VN / en-US / de-DE / pt-BR / ...
```

Một rule nên trả về:

- `ruleId`.
- `rulesetVersion`.
- `meaningKeys`.
- `evidence`.
- `strength`.
- `conditions`.
- `conflicts`.
- `disclaimerKey`.

Content pack chịu trách nhiệm:

- Title.
- Summary.
- Strengths.
- Challenges.
- Development advice.
- Examples.
- Cultural wording.
- SEO title/description nếu cần.

Lợi ích:

- Sửa một rule không phải sửa mọi ngôn ngữ.
- Dịch không can thiệp calculation.
- Có thể kiểm tra thiếu key.
- Có thể version từng ngôn ngữ.
- Dễ dùng glossary thống nhất.

---

# 11. Lộ trình triển khai theo giai đoạn

Thời gian bên dưới là khung quản trị, không phải cam kết lịch cứng. Chỉ được đi tiếp khi đạt exit gate.

## Giai đoạn 0 — Chuẩn hóa nền thương mại

**Mục tiêu:** biến kiến trúc kỹ thuật thành một sản phẩm có thể kiểm chứng với người dùng.

### Việc phải làm

1. Xác minh repository thực tế.
2. Chốt trạng thái rules Tây phương đã hoàn thành.
3. Chốt taxonomy nội dung.
4. Thiết kế evidence schema.
5. Thiết kế report snapshot/version schema.
6. Thiết kế analytics event.
7. Chốt privacy data map.
8. Tách text khỏi logic để chuẩn bị localization.
9. Tạo báo cáo mẫu.
10. Tạo landing page waitlist cho ba hệ chưa phát hành.

### Đầu ra

- Product requirements document.
- Evidence specification.
- Analytics plan.
- Privacy data inventory.
- Report sample V1.
- Pricing hypothesis.
- Landing page V1.
- Danh sách 20–30 người dùng beta.

### Exit gate

- Test, lint, build đạt.
- Không thay đổi calculation ngoài quyết định có kiểm định.
- Evidence card hoạt động.
- Người dùng có thể tạo kết quả cơ bản mà không đăng ký.
- Có thể xóa dữ liệu thử nghiệm.

## Giai đoạn 1 — Việt Nam Western Free Beta

**Mục tiêu:** kiểm chứng onboarding, khả năng hiểu và niềm tin.

### Sản phẩm

- Big Three.
- Chart cơ bản.
- Ba chủ đề nổi bật.
- Evidence mẫu.
- Lưu hồ sơ.
- Sửa dữ liệu.
- Không lưu nếu chưa consent.

### Tiếp cận

- Beta kín.
- Phỏng vấn trực tiếp.
- Nội dung phương pháp.
- Creator nhỏ.
- Không chạy quảng cáo lớn.

### KPI tham khảo

- Tỷ lệ hoàn tất form.
- Tỷ lệ tạo chart thành công.
- Tỷ lệ mở evidence.
- Tỷ lệ lưu hồ sơ.
- Tỷ lệ quay lại 7 ngày.
- Tỷ lệ báo lỗi.
- Điểm hiểu nội dung qua khảo sát.
- Tỷ lệ người dùng nói kết quả “quá chung chung”.

### Exit gate

- Phần lớn người thử hiểu được sản phẩm mà không cần hướng dẫn.
- Không có lỗi timezone/calculation nghiêm trọng.
- Evidence được mở và đánh giá hữu ích.
- Văn luận không có mâu thuẫn rõ ràng chưa giải thích.
- Có tín hiệu người dùng muốn mua chiều sâu.

## Giai đoạn 2 — Việt Nam Western Paid Beta

**Mục tiêu:** kiểm chứng khả năng trả tiền và giá trị báo cáo.

### Sản phẩm

- Mercury, Venus, Mars.
- Hành tinh trong nhà.
- Góc chiếu.
- Tổng hợp.
- Báo cáo version hóa.
- Thanh toán.
- Quyền truy cập.
- Refund.
- Support Zalo/email.

### Thử nghiệm

- Báo cáo nhập môn.
- Báo cáo chuyên sâu.
- Hai mức giá.
- Trang bán hàng theo lợi ích.
- Báo cáo mẫu đầy đủ.
- Không dùng countdown giả.

### KPI

- View-to-purchase.
- Free-to-paid.
- Refund rate.
- Tỷ lệ đọc 25%, 50%, 75%.
- Tỷ lệ mở evidence trong báo cáo trả phí.
- NPS/CSAT.
- Số yêu cầu support trên 100 đơn.
- Tỷ lệ người dùng đề nghị trường phái tiếp theo.

### Exit gate

- Có người dùng trả tiền ngoài nhóm quen biết.
- Refund trong ngưỡng chấp nhận.
- Báo cáo được đánh giá khác biệt so với công cụ miễn phí.
- Support không quá tải.
- Có dữ liệu chọn hệ thứ hai.

## Giai đoạn 3 — English Foundation và US-led Beta

**Mục tiêu:** kiểm chứng product-market message ngoài Việt Nam.

### Việc phải làm

- `en-US`.
- Copywriting bản địa.
- USD.
- Global timezone QA.
- Privacy/terms/refund tiếng Anh.
- Landing page theo “traceable astrology”.
- SEO nền.
- Beta community.
- Analytics theo locale/country.

### KPI

- Hoàn tất chart.
- Evidence open rate.
- Email/signup.
- Paid conversion.
- CAC thử nghiệm.
- Organic traffic.
- User interviews.
- Tỷ lệ lỗi localization.
- Support burden.

### Exit gate

- Người dùng tiếng Anh hiểu được khác biệt mà không cần giải thích trực tiếp.
- Có paid conversion.
- Không có lỗi timezone quốc tế nghiêm trọng.
- Có ít nhất một kênh acquisition có tín hiệu kinh tế.

## Giai đoạn 4 — Hệ thứ hai và thử nghiệm đa hệ

**Mục tiêu:** chứng minh lời hứa “một hồ sơ — nhiều hệ”.

### Quyết định hệ thứ hai

Không mặc định theo thứ tự code. Chọn bằng:

- Waitlist.
- Phỏng vấn.
- Nút quan tâm.
- Pre-order có điều kiện hoàn tiền.
- Khả năng kiểm định chuyên môn.
- Chi phí nội dung.
- Thị trường mục tiêu.

### Sản phẩm

- Module thứ hai hoàn chỉnh.
- Giải thích trường phái.
- Không quy đổi khái niệm đơn giản.
- Gói hai hệ.
- Trang đối chiếu.

### Thị trường thử

- Việt Nam.
- Singapore bằng tiếng Anh.
- Nhóm người dùng hiện tại.

### Exit gate

- Hai calculation engine được kiểm định.
- Hai interpretation engine ổn định.
- Chuyên gia duyệt.
- Người dùng hiểu khác biệt.
- Không có “siêu kết luận” làm sai từng hệ.

## Giai đoạn 5 — Đức và Brazil

**Mục tiêu:** kiểm chứng hai mô hình mở rộng khác nhau.

### Đức

- Premium localization.
- Privacy-first.
- Nội dung sâu.
- Giá EUR.
- SEO theo phương pháp.

### Brazil

- Scale.
- Mobile/social.
- `pt-BR`.
- Giá địa phương.
- Pix khi đạt điều kiện.

### Exit gate

- Mỗi thị trường có conversion đủ để biện minh chi phí localization.
- Support bản địa hoạt động.
- Không có lỗi pháp lý hoặc thanh toán trọng yếu.
- Nội dung được duyệt bởi người bản địa.

## Giai đoạn 6 — Hệ sinh thái

**Mục tiêu:** tăng giá trị vòng đời, không chỉ bán report một lần.

Bao gồm:

- Thuê bao chu kỳ.
- Chuyên gia.
- Professional mode.
- API.
- White-label.
- Research/validation tools.
- Version comparison.
- Community có kiểm duyệt.

Chỉ triển khai khi engine và governance đủ ổn định.

---

# 12. KPI và hệ thống đo lường

## 12.1. North Star Metric

Đề xuất:

> **Số Hồ sơ Thiên Vận có ít nhất một phiên đọc có ý nghĩa mỗi tháng.**

“Phiên đọc có ý nghĩa” có thể được định nghĩa bằng:

- Xem ít nhất một phần luận.
- Mở evidence.
- Lưu hoặc cập nhật ghi chú.
- Xem chu kỳ.
- Mở hệ thứ hai.

Không dùng pageview đơn thuần làm North Star.

## 12.2. Funnel KPI

### Acquisition

- Organic sessions.
- Tool entry.
- Creator referral.
- Cost per qualified visitor.
- Branded search.

### Activation

- Form start.
- Form completion.
- Chart success.
- Time to first value.
- Evidence open.
- Save profile.

### Revenue

- Free-to-paid.
- Average order value.
- Refund rate.
- Upgrade rate.
- Revenue by module.
- Revenue by locale.

### Retention

- D7/D30 return.
- Report reopen.
- Cycle feature use.
- Notification opt-in.
- Second module interest.

### Trust

- “Quá chung chung” rate.
- “Không hiểu vì sao” rate.
- Data deletion success.
- Calculation dispute rate.
- Support resolution.
- Expert review defect rate.

## 12.3. Các sự kiện analytics tối thiểu

- `birth_form_started`
- `birth_form_completed`
- `timezone_confirmed`
- `chart_generated`
- `chart_generation_failed`
- `evidence_opened`
- `technical_mode_opened`
- `profile_save_requested`
- `profile_saved`
- `report_sample_opened`
- `checkout_started`
- `purchase_completed`
- `refund_requested`
- `report_section_viewed`
- `next_school_interest`
- `language_waitlist_joined`
- `data_export_requested`
- `profile_deleted`

Không gửi dữ liệu sinh đầy đủ vào nền tảng analytics bên thứ ba.

---

# 13. Pháp lý, dữ liệu và đạo đức

## 13.1. Việt Nam

Cần có:

- Privacy policy.
- Terms.
- Consent lưu dữ liệu sinh.
- Sửa và xóa.
- Retention.
- Phân quyền.
- Log truy cập.
- Incident response.
- Refund.
- Hủy thuê bao.
- Thông tin chủ thể kinh doanh.
- Rà soát nghĩa vụ thương mại điện tử.

## 13.2. Quốc tế

### EU

- GDPR scope review.
- Lawful basis.
- Consent.
- Data minimization.
- Export/delete.
- Processor agreements.
- Cross-border transfer.
- Cookie/ePrivacy.
- VAT/OSS review.
- Accessibility.

### Mỹ

- Privacy theo bang cần rà soát khi đạt ngưỡng.
- Subscription cancellation.
- Consumer protection.
- Disclaimer.
- Không đưa lời khuyên y khoa/tài chính/pháp lý.

### Brazil

- LGPD review.
- Local payment.
- Refund.
- Tax.
- Support.

## 13.3. Nguyên tắc đạo đức

Không được:

- Hù dọa tai họa.
- Cam kết đúng tuyệt đối.
- Dự đoán chắc chắn bệnh tật, tử vong, ly hôn, phá sản.
- Ép mua “giải hạn”.
- Bán hồ sơ sinh cho quảng cáo.
- Dùng dữ liệu để train AI khi chưa có đồng ý.
- Dùng dark pattern.
- Xếp hạng giá trị con người bằng điểm vận mệnh.
- Cho phép chuyên gia dùng lời phán không có giới hạn.

---

# 14. Rủi ro và biện pháp kiểm soát

| Rủi ro | Tác động | Biện pháp |
|---|---|---|
| Nội dung chung chung | Mất niềm tin | Tổng hợp cấu hình, evidence, user testing |
| Calculation sai | Tổn hại thương hiệu | Validation set, regression tests, version |
| Trộn trường phái | Sai phương pháp | Module độc lập, reviewer, rule boundary |
| Dịch sai thuật ngữ | Mất uy tín quốc tế | Glossary, chuyên gia bản địa, QA |
| Lưu dữ liệu quá mức | Pháp lý và niềm tin | Data minimization, consent, deletion |
| AI bịa nội dung | Sai chuyên môn | AI không quyết định rule, output constraints |
| Marketplace chất lượng thấp | Khiếu nại | Triển khai muộn, xét duyệt, audit |
| SEO giật gân | Làm lệch thương hiệu | Editorial policy và review |
| Quá nhiều tính năng | Chậm ra mắt | Vertical slice và exit gate |
| Ra nước ngoài quá sớm | Đốt nguồn lực | English-first, market evidence |
| Bán thuê bao khi chưa có giá trị | Churn cao | Chỉ mở với cycle engine |
| Quảng bá lợi thế chưa hoàn thành | Mất uy tín | Capability checklist công khai nội bộ |

---

# 15. Danh sách việc cần làm ngay

## Ưu tiên P0 — Trước mọi hoạt động marketing lớn

1. Xác minh trạng thái repo Tây phương.
2. Chốt phạm vi free và paid.
3. Hoàn thiện evidence schema.
4. Hoàn thiện tổng hợp Sun–Moon–ASC và các phase tiếp theo.
5. Tách content khỏi rule.
6. Thiết kế report version/snapshot.
7. Thiết kế profile consent/delete.
8. Tạo analytics plan.
9. Tạo report mẫu.
10. Chốt thông điệp thương hiệu.
11. Giữ governance AI theo nguyên tắc: model là lớp tùy chọn, không phải source of truth; chưa tạo task AI Advisor/Fusion/Life Map trước khi dependency được đáp ứng.

## Ưu tiên P1 — Việt Nam Beta

1. Landing page.
2. Form tối giản.
3. Kết quả 60 giây.
4. Evidence card.
5. Save profile.
6. Zalo OA và email support.
7. 20–30 beta users.
8. 15–20 nội dung nền.
9. User interview script.
10. Pricing test.

## Ưu tiên P2 — English readiness

1. Locale architecture.
2. Glossary tiếng Anh.
3. English sample report.
4. Global timezone QA.
5. USD.
6. Privacy/terms.
7. English landing page.
8. International beta list.
9. SEO seed.
10. Market-specific analytics.

## Ưu tiên P3 — Hệ thứ hai

1. Waitlist theo hệ.
2. Chốt trường phái và sách nguồn.
3. Calculation spec.
4. Validation corpus.
5. Interpretation ruleset.
6. Expert reviewer.
7. Comparison UX.
8. Two-module pricing.
9. Singapore test plan.
10. Update roadmap.

---

# 16. Quy tắc ra quyết định

## Chỉ thêm tính năng khi

- Giải quyết vấn đề người dùng.
- Hỗ trợ lợi thế cạnh tranh.
- Có khả năng đo.
- Không phá kiến trúc.
- Có owner và exit criteria.

## Chỉ mở thị trường mới khi

- Có bản địa hóa đủ chất lượng.
- Có payment.
- Có support.
- Có privacy/legal review.
- Có acquisition hypothesis.
- Có nguồn lực duy trì.
- Thị trường trước đã cho tín hiệu học được.

## Chỉ mở hệ mới khi

- Trường phái được chốt.
- Calculation có spec.
- Có validation.
- Có interpretation ruleset.
- Có reviewer.
- Không làm chậm chất lượng hệ đang bán quá mức.

---

# 17. Nguồn tham khảo và ghi chú

## 17.1. Nguồn nội bộ

1. `THIENVAN_MASTER_HANDOFF_V2.md`, 03/08/2026.
2. `THIENVAN_MASTER_HANDOFF.md`, 02/08/2026.
3. `docs/WESTERN_VALIDATION.md` — cần đọc trong repository khi thực thi.
4. `docs/PROJECT_STATUS.md` — repository thực tế là nguồn xác minh trạng thái.

## 17.2. Nguồn đối thủ và thị trường toàn cầu

1. Astrodienst/Astro.com — trang chủ, công cụ, báo cáo, quyền riêng tư và ngôn ngữ:<br>
   https://www.astro.com/
2. OpenFate — Bát Tự, Tử Vi Đẩu Số, Tây phương, compatibility và chart miễn phí:<br>
   https://openfate.ai/en
3. Pew Research Center — “30% of Americans Consult Astrology, Tarot Cards or Fortune Tellers”, 21/05/2025:<br>
   https://www.pewresearch.org/religion/2025/05/21/3-in-10-americans-consult-astrology-tarot-cards-or-fortune-tellers/
4. Sensor Tower — State of Mobile 2026:<br>
   https://sensortower.com/press/press-release-boosted-by-gen-ai-services-consumers-spent-more-money-in-apps-than-games-for-first-time
5. European Commission — phạm vi áp dụng GDPR:<br>
   https://commission.europa.eu/law/law-topic/data-protection/rules-business-and-organisations/application-regulation/who-does-data-protection-law-apply_en
6. Singapore IMDA — Singapore Digital Economy Report 2025:<br>
   https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/factsheets/2025/ar-sgde-2025
7. Banco Central do Brasil — thống kê Pix:<br>
   https://www.bcb.gov.br/estabilidadefinanceira/pix/estatisticas

## 17.3. Nguồn đối thủ và kênh Việt Nam

1. AI Tử Vi — App Store Việt Nam:<br>
   https://apps.apple.com/vn/app/ai-t%E1%BB%AD-vi-v%E1%BA%ADn-h%E1%BA%A1n-2026/id6449532445
2. Thái Âm — App Store Việt Nam:<br>
   https://apps.apple.com/vn/app/th%C3%A1i-%C3%A2m-t%E1%BB%AD-vi-2026/id1150954869
3. Tuvi.vn — Chợ Lá Số:<br>
   https://tuvi.vn/cho-la-so
4. Chiêm Tinh Lá Số:<br>
   https://chiemtinhlaso.com/
5. Lịch Ngày Tốt — lịch âm và nội dung Tử Vi/cung hoàng đạo:<br>
   https://lichngaytot.com/
6. Phong Thủy Số — nội dung và công cụ Tử Vi:<br>
   https://phongthuyso.vn/-tu-vi.html
7. Lý Số Việt Nam — diễn đàn và công cụ lá số:<br>
   https://lyso.vn/
8. Decision Lab — Connected Consumer Q4/2025:<br>
   https://www.decisionlab.co/blog/vietnams-digital-dynamics-q4-2025

## 17.4. Nguyên tắc sử dụng nguồn

- Tính năng được mô tả theo trang công khai tại thời điểm khảo sát.
- Rating, giá và thứ hạng ứng dụng có thể thay đổi.
- Lời quảng bá “chính xác”, lượt dùng hoặc hiệu quả do đối thủ tự công bố không được xem là bằng chứng độc lập.
- Trước mỗi quyết định đầu tư lớn, cần khảo sát lại dữ liệu hiện hành.
- Pháp lý cần được luật sư chuyên môn rà soát trước khi triển khai thực tế.

---

# 18. Tin nhắn dùng để mở chat mới

```text
Tôi đang tiếp tục dự án Thiên Vận.

Hãy đọc:
1. THIENVAN_MASTER_HANDOFF_V2.md
2. THIENVAN_MARKET_ENTRY_AND_GTM_ROADMAP_V1.md
3. AGENTS.md
4. README.md
5. docs/PROJECT_STATUS.md
6. docs/WESTERN_VALIDATION.md

Không sửa code ngay.

Trước tiên hãy:
- Đối chiếu roadmap với trạng thái repository thực tế.
- Xác định giai đoạn thị trường hiện tại.
- Liệt kê các đầu việc P0 chưa hoàn thành.
- Chọn đúng một vertical slice tiếp theo.
- Đưa tiêu chí pass cụ thể.
- Giữ nguyên nguyên tắc calculation deterministic, ruleset versioned, evidence traceable và không trộn bốn trường phái.
```

---

# 19. Kết luận điều hành

Thiên Vận không nên cạnh tranh bằng số lượng lời phán, số lượng calculator hoặc số trường phái quảng cáo. Chiến lược phù hợp là:

1. Dùng Việt Nam để kiểm chứng sản phẩm, niềm tin và khả năng trả tiền.
2. Phát hành Tây phương trước nhưng luôn giữ định vị đa hệ.
3. Xây evidence, version và quyền riêng tư thành lõi sản phẩm.
4. Dùng tiếng Anh để mở thị trường toàn cầu, lấy Hoa Kỳ làm thương mại chính.
5. Chỉ bản địa hóa Đức, Brazil và các thị trường khác khi bản tiếng Anh đã có tín hiệu.
6. Chỉ vào Ấn Độ khi Vệ Đà đủ mạnh; chỉ vào Đài Loan/Hong Kong khi Bát Tự/Tử Vi hoàn chỉnh.
7. Không mở marketplace hoặc subscription khi chưa có nền chuyên môn và giá trị định kỳ thật.
8. Mỗi giai đoạn phải có KPI và exit gate; không đi tiếp chỉ vì đã hết thời gian dự kiến.

> **Lợi thế cốt lõi cần bảo vệ: Một hồ sơ sinh — nhiều hệ quy chiếu — mỗi kết luận đều giải thích được vì sao.**

Trong kỷ nguyên AI phổ thông, bổ sung nguyên tắc điều hành:

> **Thiên Vận không bán “văn bản do AI tạo”. Thiên Vận xây một hệ thống dữ liệu, quy tắc, thời gian và evidence có cấu trúc; AI chỉ là một giao diện có thể thay thế ở lớp trên cùng.**
