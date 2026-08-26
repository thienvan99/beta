# THIÊN VẬN — RESPONSE FRAMEWORK

**File:** `THIENVAN_RESPONSE_FRAMEWORK.md`<br>
**Version:** `1.1.0`<br>
**Status:** Foundation / Mandatory Reference<br>
**Cập nhật:** 14/08/2026 — làm rõ AI/LLM là optional interface, nguyên tắc model replaceability và Personal Life Map context.<br>
**Scope:** Toàn bộ hệ thống Thiên Vận<br>
**Mục tiêu:** Chuẩn hóa cách chuyển từ kết quả tính toán và rule-based interpretation thành câu trả lời cuối cùng cho người dùng, đồng thời giữ nguyên tính độc lập của từng trường phái.

---

## 0. Vai trò của tài liệu này

Tài liệu này là **framework ở tầng trình bày và tổng hợp đầu ra**.

Nó **không thay thế**:

- calculation engine của từng trường phái;
- specification chuyên môn của từng trường phái;
- rule interpretation;
- quy tắc UI/UX/SEO;
- QA checklist;
- decision log;
- commercialization plan;
- các tài liệu validation.

Nó chỉ quy định:

1. Dữ liệu nào được phép đi vào câu trả lời cuối.
2. Câu trả lời phải được cấu trúc theo những lớp nào.
3. Cách phân biệt dữ liệu tính toán, luận giải truyền thống, tổng hợp, triết lý và khuyến nghị thực tế.
4. Cách biểu đạt mức độ chắc chắn.
5. Cách xử lý mâu thuẫn giữa nhiều rule hoặc nhiều trường phái.
6. Cách tạo lời khuyên hành động mà không biến Thiên Vận thành công cụ phán định số phận.
7. Cách đảm bảo một câu trả lời có thể truy ngược đến evidence và rule nguồn.
8. Cách để backend, frontend, Codex hoặc bất kỳ AI nào sau này cùng tuân theo một chuẩn đầu ra.

Tài liệu này được thiết kế theo nguyên tắc **AI-agnostic**: dù hệ thống dùng Codex, một LLM khác, template renderer hay logic thuần code thì chuẩn kết quả cuối vẫn phải giống nhau.

## 0.1. Vai trò AI/LLM trong kiến trúc Thiên Vận

AI/LLM là **optional interface / composition layer**, không phải source of truth.

Source of truth của một response chuyên môn phải đi theo chuỗi:

```text
Validated Calculation
        ↓
Approved Rules / Ruleset
        ↓
Deterministic or Methodology-defined Synthesis
        ↓
Response Framework
        ↓
Optional AI / Template Renderer
```

AI có thể được dùng để:

- hội thoại tự nhiên;
- tóm tắt structured response;
- điều chỉnh độ dài hoặc mức giải thích;
- chuyển đổi giữa beginner/expert presentation;
- hỗ trợ điều hướng tới evidence;
- biên tập văn phong trong giới hạn provided evidence.

AI không được:

- tự tính lại lá số;
- tự chọn trường phái chưa được chốt;
- bổ sung kiến thức chiêm tinh/luận mệnh từ memory hoặc web vào một report production nếu rule/evidence không cung cấp;
- tự tạo rule mới;
- biến cross-school relation thành “đa số hệ thống xác nhận”;
- thay đổi calculation/ruleset chỉ vì người dùng phản hồi rằng một đoạn “đúng” hoặc “không đúng”.

### Model replaceability

Thiên Vận không được phụ thuộc semantic truth vào một model hoặc nhà cung cấp cụ thể.

Khi đổi model/provider:

- calculation output không đổi;
- matched rules không đổi;
- evidence graph không đổi;
- synthesis contract không đổi trừ khi methodology được version hóa và phê duyệt;
- safety boundaries không được yếu đi;
- report cũ vẫn phải tái tạo hoặc giữ snapshot theo version.

Nếu đổi model làm thay đổi luận điểm chuyên môn dù input rule/evidence không đổi, output đó phải được xem là lỗi governance hoặc lỗi implementation.

---

# 1. Nguyên tắc nền tảng

## 1.1. Một dữ liệu sinh — nhiều hệ quy chiếu — không tạo một định mệnh tuyệt đối

Thiên Vận có thể sử dụng nhiều trường phái như:

- Chiêm tinh Tây phương;
- Chiêm tinh Vệ Đà;
- Bát Tự;
- Tử Vi;
- các hệ thống khác nếu được bổ sung về sau.

Mỗi trường phái phải giữ:

- calculation engine riêng;
- ruleset riêng;
- version riêng;
- terminology riêng;
- logic chuyên môn riêng;
- evidence riêng.

Không được lấy sự tương đồng giữa hai trường phái để tuyên bố:

> “Hai trường phái cùng xác nhận điều này chắc chắn xảy ra.”

Cách diễn đạt đúng:

> “Hai hệ quy chiếu độc lập đang cùng gợi ra một chủ đề tương tự, nhưng chúng dựa trên các nguyên lý khác nhau.”

Mục tiêu của đối chiếu là **tăng góc nhìn**, không phải tạo cảm giác “nhiều hệ thống cùng chứng minh số phận”.

---

## 1.2. Thiên Vận không trả lời: “Số phận của bạn là gì?”

Thiên Vận nên giúp người dùng trả lời năm câu hỏi thực tế hơn:

1. **Tôi đang có những xu hướng nào?**
2. **Vì sao hệ thống đưa ra nhận định đó?**
3. **Xu hướng đó thường biểu hiện ở đâu trong đời sống?**
4. **Trong bối cảnh hiện tại, điều gì đáng chú ý?**
5. **Tôi có thể làm gì với thông tin này?**

Đây là nguyên tắc trung tâm của toàn bộ Response Framework.

---

## 1.3. Tách “quan sát” khỏi “hành động”

Một rule chiêm tinh hoặc một kết luận Bát Tự có thể mô tả một xu hướng.

Nhưng:

- xu hướng không đồng nghĩa hành vi bắt buộc;
- khả năng không đồng nghĩa kết quả;
- thách thức không đồng nghĩa tai họa;
- chu kỳ không đồng nghĩa sự kiện chắc chắn xảy ra.

Vì vậy, câu trả lời cuối phải tách hai lớp:

### Lớp A — Hệ thống quan sát được gì?

Nguồn có thể là:

- dữ liệu calculation;
- rule interpretation;
- synthesis từ nhiều rule;
- đối chiếu liên trường phái.

### Lớp B — Người dùng có thể làm gì?

Nguồn phải là:

- nguyên tắc tự quan sát;
- thực hành hành vi an toàn;
- quản lý thói quen;
- chuẩn bị quyết định;
- câu hỏi phản tư;
- khuyến nghị tìm chuyên gia trong lĩnh vực phù hợp khi cần.

Không được biến Lớp B thành “cách hóa giải bắt buộc”.

---

# 2. Quan hệ với các tài liệu khác

Codex hoặc bất kỳ agent nào làm việc với repository phải hiểu thứ tự trách nhiệm sau.

## 2.1. Calculation / Validation documents

Trả lời câu hỏi:

> “Dữ liệu được tính như thế nào và có đúng không?”

Ví dụ:

- `WESTERN_ASTROLOGY_SPEC.md`
- `WESTERN_VALIDATION.md`
- specification Vệ Đà;
- specification Bát Tự;
- specification Tử Vi.

**Response Framework không được sửa hoặc ghi đè logic trong nhóm này.**

---

## 2.2. Interpretation rule documents / rule data

Trả lời câu hỏi:

> “Từ dữ liệu đã tính, rule chuyên môn nào được kích hoạt?”

Mỗi rule tối thiểu nên có:

- `ruleId`;
- `version`;
- `title`;
- `summary`;
- `strengths`;
- `challenges`;
- `developmentAdvice`;
- `evidence`.

Response Framework chỉ được **đọc kết quả interpretation**, không được tự sinh thêm một luận điểm chuyên môn chưa tồn tại trong ruleset được phê duyệt.

---

## 2.3. Response Framework

Trả lời:

> “Từ các rule đã được kích hoạt, Thiên Vận nói với người dùng như thế nào?”

Đây chính là phạm vi của tài liệu này.

---

## 2.4. UI/UX/SEO rules

Trả lời:

> “Nội dung được hiển thị và tổ chức trên giao diện như thế nào?”

Response Framework quy định **meaning structure**.

UI/UX rule quy định **visual structure**.

Hai tài liệu bổ trợ nhau, không thay thế nhau.

---

## 2.5. QA / Decision Log / Task Queue

- QA kiểm tra framework có được thực thi đúng không.
- Decision Log lưu các quyết định chuyên môn hoặc thay đổi kiến trúc.
- Task Queue xác định thứ tự triển khai.

Response Framework không được dùng thay task queue.

---

# 3. Kiến trúc đầu ra chuẩn của Thiên Vận

Mỗi kết quả hoàn chỉnh nên đi qua sáu tầng.

```text
CALCULATION
    ↓
RULE MATCHING
    ↓
INTRA-SCHOOL SYNTHESIS
    ↓
CROSS-SCHOOL COMPARISON (optional)
    ↓
RESPONSE COMPOSITION
    ↓
USER ACTION / REFLECTION
```

---

# 4. Sáu tầng dữ liệu

## Tầng 1 — FACT / CALCULATED DATA

Đây là dữ liệu máy tính tính ra.

Ví dụ Tây phương:

- Sun = Capricorn 24°...
- Moon = ...
- ASC = ...
- Venus ở nhà 5;
- Mars square Saturn với orb X°.

Ví dụ Bát Tự:

- can chi của bốn trụ;
- ngũ hành;
- thập thần;
- đại vận.

Ví dụ Vệ Đà:

- Lagna;
- Nakshatra;
- Vimshottari Dasha;
- vị trí graha.

Ví dụ Tử Vi:

- Mệnh;
- Thân;
- sao tọa thủ;
- tứ hóa;
- đại hạn.

Đây là tầng có độ chắc chắn kỹ thuật cao nhất nếu engine đã được validation.

### Label nội bộ

`calculated_fact`

### Quy tắc

- Không thêm diễn giải vào tầng này.
- Không làm tròn hoặc đổi dữ liệu nếu SPEC không cho phép.
- Phải truy được về calculation version.
- Không được dùng LLM để tự tính lại.

---

## Tầng 2 — RULE INTERPRETATION

Đây là nội dung từ rule được kích hoạt.

Ví dụ:

- Sun in Capricorn;
- Venus in Gemini;
- Mars in house 10;
- một tổ hợp sao Tử Vi;
- Nhật chủ và quan hệ thập thần;
- một yoga Vệ Đà.

### Label nội bộ

`school_interpretation`

### Quy tắc

- Phải có `ruleId`.
- Phải có `ruleVersion`.
- Phải có evidence.
- Không được phán tuyệt đối.
- Không được tự suy rộng ngoài ý nghĩa rule.
- Không được trộn rule của trường phái khác vào đây.

---

## Tầng 3 — INTRA-SCHOOL SYNTHESIS

Đây là bước tổng hợp **bên trong cùng một trường phái**.

Ví dụ Tây phương:

- Moon cần an toàn cảm xúc nhưng Mars lại phản ứng nhanh;
- Venus thiên về tự do trong tương tác nhưng Saturn aspect tạo tính thận trọng;
- nhiều yếu tố cùng nhấn mạnh chủ đề giao tiếp.

### Label nội bộ

`school_synthesis`

### Mục tiêu

Không lặp lại 20 rule riêng rẽ cho người dùng.

Hệ thống cần:

1. nhóm các rule tương đồng;
2. phát hiện chủ đề lặp;
3. phát hiện mâu thuẫn;
4. đánh giá mức độ nổi bật;
5. chọn ra số chủ đề đủ dùng.

### Không được

- bỏ evidence;
- tạo một luận điểm không có rule nguồn;
- biến số lượng rule thành “xác suất chắc chắn”;
- kết luận định mệnh.

---

## Tầng 4 — CROSS-SCHOOL COMPARISON

Chỉ dùng khi người dùng đã có kết quả từ ít nhất hai trường phái đủ chất lượng.

### Label nội bộ

`cross_school_comparison`

Mục tiêu:

- chỉ ra điểm tương đồng;
- chỉ ra điểm khác nhau;
- giải thích vì sao không nên xem chúng là cùng một hệ thống;
- giúp người dùng nhận ra chủ đề đáng tự quan sát.

### Ba trạng thái

#### A. Convergence — cùng gợi một chủ đề

Ví dụ:

> Tây phương nhấn mạnh nhu cầu tự chủ trong công việc; Bát Tự cũng cho thấy cấu trúc thiên về tự quyết. Đây là hai hệ quy chiếu độc lập cùng gợi một chủ đề để anh quan sát.

#### B. Complementary — bổ sung nhau

Ví dụ:

> Một hệ tập trung vào cách phản ứng cảm xúc, hệ kia tập trung vào chu kỳ thời gian. Hai phần bổ sung nhau thay vì xác nhận lẫn nhau.

#### C. Divergence — khác nhau

Ví dụ:

> Hai hệ đang nhấn vào hai mặt khác nhau. Không cần ép chúng thành một kết luận duy nhất.

### Cấm

Không xuất:

- “3/4 trường phái xác nhận...”
- “độ chính xác 75% vì 3 trường phái trùng nhau”;
- “đây chắc chắn là số mệnh của bạn”;
- “cả bốn hệ đều chứng minh...”.

---

## Tầng 5 — PRACTICAL REFLECTION

Đây là lớp chuyển từ “biết” sang “hiểu”.

### Label nội bộ

`reflection`

Mỗi chủ đề lớn nên có ít nhất một câu hỏi tự quan sát.

Ví dụ:

- “Khi bị áp lực, anh thường phản ứng nhanh trước rồi mới suy nghĩ hay ngược lại?”
- “Trong công việc, anh dễ kiệt sức vì gánh quá nhiều trách nhiệm hay vì thiếu mục tiêu rõ?”
- “Khi một mối quan hệ trở nên gần gũi, anh thường muốn tăng kết nối hay cần thêm không gian riêng?”

Câu hỏi phản tư giúp người dùng **kiểm chứng với đời thật**.

Thiên Vận không yêu cầu người dùng tin ngay vào luận giải.

---

## Tầng 6 — ACTION

### Label nội bộ

`action_guidance`

Đây là lớp quan trọng nhất để biến sản phẩm từ “xem luận” thành “công cụ tự quan sát”.

Action phải:

- cụ thể;
- nhỏ;
- an toàn;
- không thần bí hóa;
- không hứa thay đổi vận mệnh;
- không thay thế y tế, pháp lý, tài chính.

Ví dụ:

Thay vì:

> “Anh cần hóa giải Sao Thổ.”

Dùng:

> “Trong 2 tuần tới, thử ghi lại những tình huống anh trì hoãn vì sợ làm chưa đủ tốt. Mục tiêu là nhận ra mẫu hành vi, chưa cần sửa ngay.”

---

# 5. Khung câu trả lời chuẩn cho người dùng

Không phải mọi câu trả lời đều cần hiển thị đủ sáu tầng kỹ thuật.

Ở UI, câu trả lời nên gom thành bốn lớp dễ hiểu.

## Lớp 1 — BẠN ĐANG CÓ XU HƯỚNG GÌ?

Tên nội bộ:

`what_we_see`

Mục tiêu:

- nêu chủ đề;
- ngắn;
- dễ hiểu;
- tránh thuật ngữ kỹ thuật ngay câu đầu.

Ví dụ:

> Anh có xu hướng vừa cần cấu trúc rõ ràng, vừa muốn giữ quyền tự quyết cao trong công việc.

---

## Lớp 2 — VÌ SAO THIÊN VẬN NÓI NHƯ VẬY?

Tên nội bộ:

`why`

Hiển thị evidence theo mức phù hợp.

Ví dụ:

> Kết luận này chủ yếu đến từ Sun..., Mars..., và nhà 10...

Có thể có nút:

**“Vì sao có kết luận này?”**

Khi mở:

- rule ID;
- placement;
- aspect;
- orb;
- hệ quy chiếu;
- version.

---

## Lớp 3 — ĐIỀU NÀY CÓ THỂ BIỂU HIỆN NHƯ THẾ NÀO?

Tên nội bộ:

`life_expression`

Không nói “sẽ”.

Ưu tiên:

- “có thể biểu hiện”;
- “thường dễ thấy”;
- “trong một số bối cảnh”;
- “khi chịu áp lực”.

Đây là nơi biến nội dung từ thuật ngữ huyền học sang ngôn ngữ đời sống.

Các domain chuẩn:

- `self`;
- `emotion`;
- `relationship`;
- `career`;
- `money`;
- `learning`;
- `family`;
- `social`;
- `timing`;
- `wellbeing_non_medical`.

Không phải rule nào cũng được kéo sang mọi domain.

Nếu không có evidence phù hợp thì không gán.

---

## Lớp 4 — ANH CÓ THỂ LÀM GÌ VỚI THÔNG TIN NÀY?

Tên nội bộ:

`next_action`

Tối đa 1–3 hành động cho mỗi chủ đề lớn.

Ưu tiên:

- ghi chép;
- thử nghiệm;
- điều chỉnh thói quen;
- chuẩn bị;
- giao tiếp;
- xây quy trình;
- hỏi người có chuyên môn khi quyết định quan trọng.

Không dùng:

- mua vật phẩm;
- nghi lễ bắt buộc;
- “giải hạn” có trả tiền;
- hành động gây rủi ro.

---

# 6. Công thức “BIẾT → HIỂU → ĐỐI CHIẾU → HÀNH ĐỘNG → THEO DÕI”

Mọi báo cáo premium nên hướng tới chu trình này.

## 6.1. Personal Life Map / Structured History

“THEO DÕI” về sau có thể được mở rộng thành Personal Life Map: một lớp dữ liệu có cấu trúc ghi nhận những gì người dùng **chủ động** lưu, ví dụ:

- sự kiện đời sống;
- phản hồi “đúng/chưa chắc/không đúng”;
- ghi chú tự quan sát;
- hành động đã thử;
- mốc thời gian liên quan tới report hoặc cycle đã xem.

Đây là **user context**, không phải calculation fact và không phải evidence chuyên môn của ruleset.

Quy tắc bắt buộc:

1. Chỉ lưu khi có consent và policy phù hợp.
2. Người dùng phải có khả năng sửa/xóa dữ liệu theo kiến trúc sản phẩm.
3. Không dùng một sự kiện đời thật để tự động kết luận rằng một hệ thống “đã được chứng minh đúng”.
4. Không tự sửa rule, weight hoặc calculation dựa trên feedback cá nhân.
5. Nếu Personal Life Map được đưa vào AI context, chỉ truyền phần dữ liệu cần thiết cho tác vụ và tuân thủ privacy/data minimization.
6. AI phải phân biệt rõ:
   - dữ liệu người dùng tự ghi;
   - calculated fact;
   - school interpretation;
   - synthesis;
   - action/reflection.
7. Personal Life Map không được triển khai chỉ để tạo cảm giác phải kiểm tra vận liên tục; sản phẩm không khuyến khích phụ thuộc cưỡng bức.

## Bước 1 — Biết

Người dùng nhận ra các xu hướng chính.

## Bước 2 — Hiểu

Người dùng biết rule/evidence nào tạo ra kết luận.

## Bước 3 — Đối chiếu

Người dùng tự kiểm chứng:

> “Điều này có xuất hiện trong đời sống của mình không?”

## Bước 4 — Hành động

Chọn một thay đổi nhỏ.

## Bước 5 — Theo dõi

Sau một khoảng thời gian, người dùng có thể quay lại đánh giá.

Đây là cơ sở để phát triển sau này:

- nhật ký cá nhân;
- tracking chu kỳ;
- báo cáo định kỳ;
- transit/dasha/lưu niên;
- review hành động.

---

# 7. Cấu trúc dữ liệu đề xuất

Đây là schema định hướng. Không bắt Codex phải triển khai ngay nếu task hiện tại chưa tới giai đoạn Response Layer.

```ts
type ResponseEvidence = {
  schoolId: string;
  ruleId: string;
  ruleVersion: string;
  calculationVersion?: string;
  evidenceType: string;
  evidenceData: Record<string, unknown>;
};

type ResponseTheme = {
  themeId: string;
  title: string;

  // User-facing
  summary: string;
  lifeExpression?: string[];
  reflectionQuestions?: string[];
  actions?: string[];

  // Internal
  domains: string[];
  confidence: "supported" | "moderate" | "limited";
  evidence: ResponseEvidence[];
  conflicts?: string[];
};

type SchoolResponse = {
  schoolId: string;
  rulesetVersion: string;
  calculationVersion: string;
  interpretationVersion: string;
  themes: ResponseTheme[];
};

type CrossSchoolTheme = {
  themeId: string;
  title: string;
  relation: "convergence" | "complementary" | "divergence";
  schools: string[];
  summary: string;
  evidenceRefs: string[];
};

type ThienVanResponse = {
  frameworkVersion: string;
  generatedAt: string;
  schoolResponses: SchoolResponse[];
  crossSchoolThemes?: CrossSchoolTheme[];
  disclaimerVersion: string;
};
```

---

# 8. Mức độ tin cậy trong ngôn ngữ

Không sử dụng từ “confidence” như xác suất thống kê nếu hệ thống không có mô hình xác suất thật.

Ba mức nội bộ:

## `supported`

Dùng khi:

- nhiều rule độc lập trong cùng trường phái cùng nhấn mạnh chủ đề;
- evidence rõ;
- không có mâu thuẫn mạnh.

User-facing có thể nói:

> “Đây là một chủ đề nổi bật trong phần luận này.”

## `moderate`

Dùng khi:

- có evidence nhưng không phải chủ đề trung tâm;
- có yếu tố hỗ trợ và yếu tố làm giảm.

User-facing:

> “Đây là một xu hướng đáng lưu ý, nhưng cách biểu hiện có thể thay đổi theo hoàn cảnh.”

## `limited`

Dùng khi:

- evidence ít;
- có ambiguity;
- gần cusp;
- dữ liệu sinh thiếu độ chính xác;
- hai rule xung đột mạnh.

User-facing:

> “Phần này nên xem như gợi ý để tự kiểm chứng, chưa nên coi là kết luận mạnh.”

---

# 9. Xử lý mâu thuẫn

Mâu thuẫn không phải lỗi cần xóa.

Con người có thể có nhiều xu hướng đối nghịch.

Ví dụ:

- cần ổn định nhưng cũng cần tự do;
- muốn gần gũi nhưng cần không gian;
- tham vọng nhưng sợ thất bại.

Khi gặp conflict, engine synthesis phải:

1. giữ cả hai nguồn;
2. không chọn bừa một phía;
3. tìm bối cảnh kích hoạt từng phía;
4. trình bày conflict như một dynamic tension.

Cấu trúc:

> “Một phần trong anh có xu hướng X, trong khi một phần khác lại kéo về Y. Điều này có thể khiến cách phản ứng thay đổi mạnh tùy bối cảnh.”

Sau đó:

> “Điểm đáng quan sát là: trong điều kiện nào X xuất hiện, và điều kiện nào Y xuất hiện?”

---

# 10. Quy tắc chống luận chung chung

Một đoạn bị xem là quá chung khi có thể áp cho hầu hết mọi người mà không cần dữ liệu cá nhân.

Ví dụ kém:

> “Bạn có điểm mạnh nhưng cũng có điểm yếu.”

Ví dụ tốt hơn:

> “Bạn có xu hướng chuẩn bị kỹ trước khi hành động, nhưng khi tiêu chuẩn tự đặt quá cao, việc chuẩn bị có thể biến thành trì hoãn.”

Mỗi theme quan trọng nên có ít nhất hai trong ba yếu tố:

1. **Mechanism** — xu hướng vận hành thế nào.
2. **Context** — thường xuất hiện khi nào.
3. **Trade-off** — điểm mạnh đi cùng mặt trái nào.

---

# 11. Quy tắc “Strength ↔ Shadow”

Không viết điểm mạnh và thách thức như hai danh sách không liên quan.

Ưu tiên coi chúng là hai mặt của một cơ chế.

Ví dụ:

**Strength:** kiên trì, trách nhiệm.

**Shadow:** dễ gánh quá nhiều và khó buông quyền kiểm soát.

Câu tổng hợp:

> “Khả năng chịu trách nhiệm giúp anh đi đường dài, nhưng chính cơ chế đó có thể khiến anh ôm việc quá mức.”

Cách này làm luận giải có chiều sâu hơn và ít giống horoscope chung chung.

---

# 12. Quy tắc theo lĩnh vực đời sống

Không phải mọi placement đều được quyền suy ra:

- tài chính;
- sức khỏe;
- hôn nhân;
- sự nghiệp;
- gia đình.

Mỗi domain phải có danh sách evidence được phép.

Ví dụ Tây phương:

## Tình cảm

Có thể ưu tiên:

- Moon;
- Venus;
- Mars;
- nhà 5;
- nhà 7;
- ruler liên quan;
- aspect liên quan.

Không nên dùng một placement không liên quan để phán hôn nhân.

## Sự nghiệp

Có thể ưu tiên:

- MC;
- nhà 10;
- ruler nhà 10;
- Sun;
- Saturn;
- Mars;
- các aspect phù hợp.

## Tài chính

Chỉ luận khi ruleset đã có logic được phê duyệt.

Không suy từ “Jupiter tốt” thành:

> “Bạn sẽ giàu.”

## Sức khỏe

Thiên Vận không chẩn đoán bệnh.

Nếu sau này có module chiêm tinh y học hoặc lý thuyết truyền thống:

- phải gắn nhãn truyền thống;
- không thay thế y khoa;
- không nói người dùng “có bệnh”;
- không khuyến nghị ngưng thuốc hoặc điều trị.

---

# 13. Lớp triết lý Phật giáo / Đạo giáo

Đây là phần cần đặc biệt tách khỏi calculation.

Phật giáo và Đạo giáo **không được trộn vào rule engine của các trường phái luận mệnh** trừ khi một module chuyên biệt được thiết kế và phê duyệt.

Chúng chỉ có thể xuất hiện trong Response Framework ở hai vai trò.

## 13.1. Vai trò A — Reflection Lens

Dùng như góc nhìn tự quan sát.

Ví dụ tinh thần Phật giáo:

- nhận diện phản ứng;
- không đồng nhất hoàn toàn bản thân với một trạng thái;
- quan sát tính thay đổi;
- chú ý nhân–quả của hành vi.

Ví dụ tinh thần Đạo gia:

- nhận biết khi đang cưỡng ép;
- cân bằng;
- thuận điều kiện thay vì đối đầu vô ích;
- tiết chế.

Không được viết:

> “Phật giáo chứng minh lá số này đúng.”

hoặc:

> “Đạo gia xác nhận vận mệnh này.”

---

## 13.2. Vai trò B — Action Philosophy

Sau khi hệ thống xác định một pattern, có thể đưa ra thực hành theo tinh thần triết học.

Ví dụ:

**Pattern:** phản ứng mạnh khi mất kiểm soát.

**Reflection theo tinh thần Phật giáo:**

> “Thử quan sát cảm giác muốn kiểm soát ngay khi nó xuất hiện, trước khi biến thành hành động.”

**Reflection theo tinh thần Đạo gia:**

> “Phân biệt phần có thể tác động và phần cần để hoàn cảnh tự vận hành.”

Đây là **gợi ý thực hành**, không phải “phép hóa giải”.

---

# 14. Science / Tradition / Philosophy labels

Để tránh nhập nhằng epistemology, hệ thống nên chuẩn hóa nhãn nguồn.

## `calculation`

Dữ liệu do thuật toán tính.

## `traditional_system`

Luận theo trường phái truyền thống.

## `cross_system_synthesis`

Tổng hợp nhiều rule/hệ.

## `philosophical_reflection`

Góc nhìn triết học/tôn giáo.

## `evidence_based_guidance`

Khuyến nghị có bằng chứng khoa học đủ phù hợp.

## `general_practical_guidance`

Lời khuyên thực tế phổ thông, không tuyên bố là khoa học.

User-facing không nhất thiết hiện label ở mọi câu, nhưng phần “Vì sao?” hoặc methodology phải truy được loại nguồn.

---

# 15. Giọng điệu chuẩn

## Nên

- “có xu hướng”;
- “có thể”;
- “thường dễ”;
- “đáng quan sát”;
- “trong một số bối cảnh”;
- “nếu điều này đúng với trải nghiệm của anh...”;
- “đây là góc nhìn từ...”.

## Tránh

- “chắc chắn”;
- “số anh phải...”;
- “không thể tránh”;
- “đại họa”;
- “khắc chết”;
- “bắt buộc phải giải”;
- “100% đúng”;
- “vũ trụ đã quyết định”.

---

# 16. Cách dùng ngôn ngữ cho sản phẩm toàn cầu

Framework logic phải độc lập ngôn ngữ.

Không hard-code sắc thái Việt Nam vào business logic.

Cấu trúc cần cho phép:

- Vietnamese;
- English;
- các ngôn ngữ khác.

Các key nội bộ dùng tiếng Anh ổn định.

Content user-facing lấy từ locale.

Không dịch literal các thuật ngữ đặc thù nếu làm mất ý nghĩa chuyên môn.

---

# 17. Free vs Paid không được làm sai epistemology

Tầng miễn phí có thể ít nội dung hơn nhưng không được cố tình:

- làm mơ hồ để ép mua;
- hù dọa rồi yêu cầu nâng cấp;
- che evidence;
- đưa cảnh báo nguy hiểm rồi khóa “cách hóa giải”.

Paid nên khác ở:

- độ sâu;
- số domain;
- synthesis;
- chu kỳ;
- theo dõi;
- so sánh;
- cá nhân hóa hành động;
- report history.

Không khác bằng nỗi sợ.

---

# 18. Rule Aggregator — nguyên tắc thiết kế sau này

Aggregator không được chỉ đếm số rule.

Nó phải xem xét tối thiểu:

1. importance của yếu tố;
2. specificity của rule;
3. repeated theme;
4. conflict;
5. domain relevance;
6. uncertainty;
7. duplicated evidence.

Ví dụ:

Không được coi 5 rule đều phát sinh từ cùng một placement như 5 evidence độc lập.

Cần có `evidenceGroupId` hoặc logic dedup tương đương.

## 18.1. Methodology Tây phương đã khóa cho WA-P4-001

`western-chart-synthesis-v1` version `1.0.0` dùng candidate typed do rule-evaluation layer cung cấp; aggregator không tự suy ra trọng số từ calculation hoặc tên hành tinh.

- Bốn tín hiệu `importance`, `specificity`, `domainRelevance`, `uncertainty` đều bắt buộc nằm trong `[0, 1]`.
- Điểm candidate là `importance × specificity × domainRelevance × (1 - uncertainty)`; không có hệ số ẩn.
- Điểm theme là tổng candidate mạnh nhất của từng `evidenceGroupId` độc lập. Nhiều rule cùng nguồn chỉ đóng góp một lần; repeated theme chỉ tăng khi có nhóm evidence độc lập.
- Conflict được đánh dấu khi cùng theme/domain có cả `supportive` và `challenging`; không xóa hoặc tự chọn một phía.
- Mọi candidate giữ `ruleId`, `ruleVersion` và evidence provenance. Thứ tự hòa điểm dùng khóa ổn định, nên cùng input cho cùng output bất kể thứ tự mảng.
- Policy này chỉ thiết kế conflict/synthesis layer. Việc ánh xạ các rule hiện có thành candidate và viết nội dung tổng hợp thuộc task sau, không nằm trong WA-P4-001.

## 18.2. Personality/Potential synthesis đã khóa cho WA-P4-002

`western-personality-potential-v1` version `1.0.0` dùng trực tiếp candidate của `western-chart-synthesis-v1` và chỉ nhận hai domain `personality` và `potential`.

- Rule layer chịu trách nhiệm cung cấp theme/domain và statement đã được phê duyệt; synthesis không tự ánh xạ hành tinh/cung/nhà/aspect thành doctrine mới.
- Mỗi domain chọn tối đa 5 theme theo ranking canonical. Khi evidence chưa đủ, trả ít hơn hoặc danh sách rỗng; không sinh nội dung để lấp chỗ trống.
- Statement supportive và challenging được giữ riêng. Conflict, uncertainty, evidence dedup, provenance và deterministic ordering dùng nguyên policy WA-P4-001.
- Output giữ theme score, rule ID/version, evidence groups và statement nguồn; không ghép cơ học thành đoạn văn và chưa tạo UI.

## 18.3. Relationship synthesis đã khóa cho WA-P4-003

`western-relationship-synthesis-v1` version `1.0.0` chỉ nhận domain `relationship` và các nguồn canonical: Moon, Venus, Mars, Nhà 5, Nhà 7, ruler liên quan hoặc aspect liên quan.

- Rule layer phải cung cấp relationship theme và statement đã được phê duyệt; synthesis không tự suy từ một placement thành hôn nhân, ly hôn, phản bội, compatibility hoặc timing.
- Chọn tối đa 5 theme theo ranking WA-P4-001. Shared evidence được dedup; repeated theme chỉ tăng từ evidence groups độc lập.
- Supportive/challenging statements, uncertainty, rule/version và provenance được giữ nguyên. Input rỗng trả output rỗng; nguồn ngoài whitelist bị từ chối.
- Output không ghép thành văn luận, không tạo score tình yêu/hôn nhân và chưa tạo UI.

## 18.4. Career synthesis đã khóa cho WA-P4-004

`western-career-synthesis-v1` version `1.0.0` chỉ nhận domain `career` và các nguồn canonical: MC, Nhà 10, ruler Nhà 10, Sun, Saturn, Mars hoặc aspect phù hợp.

- Rule layer phải cung cấp career theme và statement đã được phê duyệt; synthesis không tự gán nghề, thu nhập, status, thành công/thất bại hoặc timing.
- Chọn tối đa 5 theme theo ranking WA-P4-001. Shared evidence được dedup; repeated theme chỉ tăng từ evidence groups độc lập.
- Supportive/challenging statements, uncertainty, rule/version và provenance được giữ nguyên. Input rỗng trả output rỗng; domain hoặc nguồn ngoài boundary không được đưa vào output.
- Output không tạo career/success/financial score, không ghép văn luận và chưa tạo UI.

## 18.5. Main-theme synthesis đã khóa cho WA-P4-005

`western-main-theme-synthesis-v1` version `1.0.0` nhận output của các domain synthesis đã DONE: personality, potential, relationship và career. Đây là lớp `school_synthesis`, không đọc lại calculation hoặc mở thêm domain chưa được hỗ trợ.

- Source candidates từ domain outputs được chuẩn hóa về domain nội bộ `school_synthesis` để WA-P4-001 nhóm cùng `themeKey` xuyên domain; original domain và `sourceCandidate` vẫn được giữ.
- Không có cross-domain multiplier. Ranking dùng nguyên score WA-P4-001; shared `evidenceGroupId` giữa nhiều domain chỉ đóng góp một lần, còn evidence độc lập có thể làm repeated theme mạnh hơn.
- Chọn tối đa 5 main themes theo Level 1 canonical. Nếu có ít hơn thì trả đúng số theme có evidence; input rỗng trả output rỗng.
- Conflict, uncertainty, rule/version, evidence và statements nguồn được giữ nguyên. Output không ghép văn luận và không tạo total/life/destiny/good-bad score.

---

# 19. Cách chọn chủ đề hiển thị

Một báo cáo không nên đổ toàn bộ rule lên đầu người dùng.

Ưu tiên:

## Level 1 — Core themes

3–5 chủ đề nổi bật nhất.

## Level 2 — Life domains

- bản thân;
- cảm xúc;
- tình cảm;
- công việc;
- tài chính;
- phát triển cá nhân.

Chỉ hiện domain khi đủ evidence.

## Level 3 — Technical detail

Cho người muốn xem sâu:

- placements;
- houses;
- aspects;
- rules;
- version;
- evidence.

---

# 20. Progressive disclosure

Người mới không cần đọc dữ liệu kỹ thuật ngay.

Giao diện nên theo lớp:

### Mức 1

Kết luận dễ hiểu.

### Mức 2

Biểu hiện thực tế.

### Mức 3

Điểm mạnh / mặt trái.

### Mức 4

Hành động.

### Mức 5

“Vì sao có kết luận này?”

### Mức 6

Technical evidence.

Framework quy định thứ tự ý nghĩa; UI rule quyết định cách hiện visual.

---

# 21. Template chuẩn một chủ đề

```text
[TITLE]

1. Điều nổi bật
Một câu tóm tắt xu hướng.

2. Cách nó có thể biểu hiện
2–4 mô tả cụ thể.

3. Điểm mạnh
Nêu giá trị của pattern.

4. Mặt cần lưu ý
Nêu trade-off của chính pattern đó.

5. Tự kiểm chứng
1–2 câu hỏi phản tư.

6. Gợi ý hành động
1–3 hành động nhỏ.

7. Vì sao có kết luận này?
Evidence + rule IDs.
```

Không bắt buộc giao diện phải hiện đúng số thứ tự trên.

---

# 22. Template cho chu kỳ / thời vận

Khi có transit, dasha, đại vận, lưu niên hoặc các cơ chế timing khác, Response Framework phải dùng cấu trúc riêng.

```text
1. Chủ đề của giai đoạn
2. Cơ chế nào đang được kích hoạt
3. Cơ hội
4. Áp lực / trade-off
5. Điều nên chuẩn bị
6. Điều không nên suy diễn
7. Khoảng thời gian
8. Evidence
```

Cấm:

> “Ngày X chắc chắn xảy ra tai nạn.”

Ưu tiên:

> “Giai đoạn này ruleset nhấn mạnh áp lực liên quan đến..., vì vậy phù hợp để chủ động kiểm tra..., tránh quyết định hấp tấp...”

---

# 23. Template đối chiếu nhiều trường phái

```text
CHỦ ĐỀ: ...

Tây phương:
- Góc nhìn riêng
- Evidence

Bát Tự:
- Góc nhìn riêng
- Evidence

Vệ Đà:
- Góc nhìn riêng
- Evidence

Tử Vi:
- Góc nhìn riêng
- Evidence

ĐIỂM GẶP NHAU:
...

ĐIỂM KHÁC NHAU:
...

ĐIỀU ĐÁNG TỰ QUAN SÁT:
...

HÀNH ĐỘNG THỰC TẾ:
...
```

Không chấm điểm trường phái nào “đúng hơn” nếu chưa có methodology nghiên cứu riêng.

---

# 24. Safety rules bắt buộc

Không được:

1. Hù dọa người dùng.
2. Khẳng định tử vong.
3. Khẳng định bệnh tật.
4. Khẳng định ly hôn.
5. Khẳng định phá sản.
6. Khẳng định người khác ngoại tình.
7. Dùng luận mệnh thay bác sĩ.
8. Dùng luận mệnh thay luật sư.
9. Dùng luận mệnh thay chuyên gia tài chính.
10. Khuyên ngưng thuốc.
11. Khuyên đầu tư dựa trên lá số.
12. Khuyên vay nợ dựa trên vận.
13. Ép mua “giải hạn”.
14. Tạo sự phụ thuộc bằng cách nói người dùng phải xem liên tục mới an toàn.
15. Tự chế rule khi ruleset thiếu dữ liệu.

Nếu không đủ evidence:

> “Phần dữ liệu hiện tại chưa đủ để đưa ra nhận định này.”

Đây là câu trả lời hợp lệ và được ưu tiên hơn việc đoán.

---

# 25. Missing data / uncertain birth time

Nếu giờ sinh không chắc:

- không giả định ASC chính xác;
- không luận nhà như chắc chắn;
- không che uncertainty.

Hệ thống cần truyền uncertainty đến Response Layer.

Ví dụ:

> “Do giờ sinh chưa chắc chắn, phần Cung Mọc và 12 nhà có thể thay đổi; vì vậy các kết luận phụ thuộc hai yếu tố này chỉ nên xem tham khảo.”

Sau này có thể phát triển birth-time rectification nhưng đó là module riêng.

---

# 26. Versioning

Response output production phải có khả năng truy:

- framework version;
- calculation version;
- ruleset version;
- interpretation version;
- locale/content version;
- generated timestamp.

Khi nâng ruleset, báo cáo đã bán không tự biến đổi âm thầm.

Nên lưu snapshot hoặc cơ chế equivalent.

---

# 27. QA checklist cho Response Framework

Một câu trả lời chỉ pass khi:

- [ ] Không chứa dữ liệu tính toán tự chế.
- [ ] Mọi luận chuyên môn có rule/evidence.
- [ ] Không trộn trường phái.
- [ ] Có phân biệt fact và interpretation.
- [ ] Không phán tuyệt đối.
- [ ] Không chứa nội dung hù dọa.
- [ ] Không suy ra domain không có evidence.
- [ ] Không biến triết học thành chứng cứ cho chiêm tinh.
- [ ] Nếu có synthesis, evidence nguồn vẫn truy được.
- [ ] Conflict không bị xóa tùy tiện.
- [ ] Action không mang tính “hóa giải bắt buộc”.
- [ ] Nội dung không quá chung.
- [ ] Strength và challenge có quan hệ logic.
- [ ] Có version metadata nếu là report production.
- [ ] Người dùng có thể hiểu kết luận mà không cần biết thuật ngữ chuyên môn.
- [ ] Người dùng có thể mở phần technical detail nếu muốn.

---

# 28. QA chống hallucination cho AI layer

Nếu sau này AI được dùng để biên tập văn phong:

AI chỉ nhận:

- structured calculated data;
- matched rules;
- synthesis object;
- approved guidance library.

AI không được tự truy cập “kiến thức chiêm tinh chung” để bổ sung luận.

Prompt/system phải quy định:

> “Nếu nội dung không có trong provided evidence, không được thêm.”

Ngoài ra, implementation phải bảo đảm:

- provider/model là dependency có thể thay thế;
- AI không tự truy cập web hoặc knowledge base ngoài phạm vi được task cho phép để bổ sung interpretation production;
- cùng một structured response contract phải có thể render bằng template deterministic khi cần;
- model change phải được regression-test ở các case conflict, uncertainty, zero evidence và safety;
- phần nào do user history cung cấp phải mang provenance riêng, không nhập nhằng với evidence của ruleset.

Cần test:

1. input thiếu rule;
2. input conflict;
3. input có uncertainty;
4. input zero evidence;
5. input có prohibited request;
6. input cross-school divergence.

---

# 29. Example — một theme Tây phương

**Ví dụ minh họa kiến trúc, không phải rule production.**

### Điều nổi bật

Anh có thể có xu hướng đặt tiêu chuẩn cao cho bản thân và muốn công việc có cấu trúc rõ.

### Cách biểu hiện

Khi mục tiêu rõ ràng, anh thường dễ duy trì kỷ luật và theo đuổi đường dài. Nhưng khi tiêu chuẩn vượt quá nguồn lực thực tế, điểm mạnh này có thể chuyển thành tự gây áp lực hoặc trì hoãn vì muốn làm thật hoàn chỉnh.

### Điểm mạnh

- sức bền;
- trách nhiệm;
- khả năng xây quy trình.

### Mặt cần lưu ý

- tự đánh giá khắt khe;
- khó cho phép bản thân thử–sai;
- dễ ôm việc.

### Tự kiểm chứng

Trong ba tháng gần đây, có việc nào anh trì hoãn không phải vì lười mà vì muốn chuẩn bị “đủ tốt” trước khi bắt đầu không?

### Gợi ý hành động

Chọn một việc đang bị trì hoãn và định nghĩa phiên bản “đủ để thử” thay vì “hoàn hảo”.

### Vì sao có kết luận này?

Trong production, phần này phải dẫn đến placement/rule/evidence thực tế.

---

# 30. Example — conflict

### Chủ đề

Nhu cầu ổn định và nhu cầu tự do cùng mạnh.

### Diễn giải

Một nhóm rule có thể cho thấy anh thích sự chắc chắn, trong khi nhóm khác lại nhấn mạnh nhu cầu đổi mới. Đây không nhất thiết là lỗi. Hai xu hướng có thể xuất hiện ở hai bối cảnh khác nhau.

### Tự kiểm chứng

- Anh cần ổn định ở phần nào?
- Anh cần tự do ở phần nào?
- Khi nào một nhu cầu bắt đầu làm nghẹt nhu cầu còn lại?

### Action

Thay vì chọn “ổn định hay tự do”, thử thiết kế một cấu trúc ổn định nhưng giữ một phần có quyền thử nghiệm.

---

# 31. Example — triết lý được gắn đúng tầng

### Pattern từ ruleset

Dễ phản ứng mạnh khi cảm thấy bị mất quyền kiểm soát.

### Reflection theo tinh thần Phật giáo

Quan sát cảm giác muốn phản ứng ngay khi nó vừa xuất hiện; xem nó như một trạng thái đang sinh khởi thay vì toàn bộ con người mình.

### Reflection theo tinh thần Đạo gia

Phân biệt phần cần chủ động và phần càng cưỡng ép càng tạo ma sát.

### Action phổ thông

Trước một quyết định quan trọng khi đang căng, ghi ra:

- điều mình kiểm soát;
- điều mình ảnh hưởng được;
- điều nằm ngoài quyền kiểm soát.

Lưu ý: ba lớp trên có nguồn khác nhau và không được gộp thành “giáo lý xác nhận lá số”.

---

# 32. Quy tắc triển khai đối với Codex

## Hiện tại

Không yêu cầu Codex phá hoặc refactor các interpretation engine hiện có chỉ để phù hợp framework.

Framework này là **target architecture** của Response Layer.

## Khi nào bắt đầu code framework?

Chỉ khi ít nhất một trường phái đã đủ:

1. calculation engine ổn định;
2. core interpretation coverage đủ rộng;
3. rule ID + version + evidence ổn định;
4. synthesis cần thiết;
5. scope free/paid tương đối rõ.

Đối với Tây phương, không nên triển khai full Response Aggregator trước khi các phần trọng yếu như:

- 10 thiên thể trong cung;
- hành tinh trong nhà;
- góc chiếu;
- chủ tinh nhà theo decision đã chốt;
- synthesis toàn lá số;

đã đủ ổn định.

Tuy nhiên, các rule mới viết từ bây giờ **phải chuẩn bị dữ liệu để tương thích framework**.

---

# 33. Yêu cầu cho rule mới từ thời điểm file này được áp dụng

Mỗi rule nên có khả năng cung cấp:

```ts
{
  ruleId,
  version,
  title,
  summary,
  strengths,
  challenges,
  developmentAdvice,
  evidence,
  domains?,
  tags?,
  weightHint?
}
```

`domains`, `tags`, `weightHint` là optional cho tới khi aggregator design được chốt.

Không thêm chúng một cách cơ học nếu chưa có methodology.

---

# 34. Không trùng trách nhiệm

Đây là quy tắc dành cho người bảo trì tài liệu.

Nếu thay đổi:

### Công thức tính

Cập nhật SPEC/validation.

### Rule chuyên môn

Cập nhật interpretation data/spec.

### Cách hiển thị visual

Cập nhật UI/UX rules.

### Cách tổng hợp thành câu trả lời

Cập nhật Response Framework.

### Chính sách sản phẩm/giá

Cập nhật Commercialization Plan.

### Quyết định chưa chắc chắn

Ghi Decision Log.

### Công việc cần làm

Ghi Task Queue.

Không sao chép nguyên cả một rule từ file này sang file khác.

---

# 35. Definition of Done cho Response Layer tương lai

Response Layer chỉ được coi là production-ready khi:

1. Có schema typed.
2. Có deterministic input từ interpretation layer.
3. Có evidence traceability.
4. Có conflict handling.
5. Có uncertainty handling.
6. Có domain relevance.
7. Có test chống hallucination.
8. Có snapshot/version.
9. Có UI progressive disclosure.
10. Có disclaimer đúng ngữ cảnh.
11. Có kiểm tra mobile.
12. Có test locale.
13. Có content QA.
14. Có safety QA.
15. Không làm thay đổi calculation engine.

---

# 36. Nguyên lý sản phẩm cuối cùng

Thiên Vận không nên kết thúc ở:

> “Đây là con người của bạn.”

Thiên Vận nên kết thúc ở:

> “Đây là những mẫu hình mà hệ thống đang gợi ra, đây là lý do vì sao, đây là cách chúng có thể xuất hiện trong đời sống, và đây là những điều anh có thể tự kiểm chứng hoặc thử điều chỉnh.”

Công thức sản phẩm:

```text
DỮ LIỆU
→ QUY TẮC
→ CHỦ ĐỀ
→ GIẢI THÍCH
→ TỰ KIỂM CHỨNG
→ HÀNH ĐỘNG
→ THEO DÕI / PERSONAL LIFE MAP
→ OPTIONAL AI INTERFACE
```

`OPTIONAL AI INTERFACE` không thay thế bất kỳ tầng truth nào phía trước. Đây là framework thống nhất cho toàn bộ Thiên Vận.

---

# 37. Chỉ thị bắt buộc cho Codex khi đọc file này

1. Đọc file này sau các tài liệu master handoff và trước khi thiết kế Response Layer.
2. Không hiểu file này là yêu cầu triển khai ngay toàn bộ code.
3. Không sửa calculation engine để “phù hợp” framework.
4. Không tự thêm triết lý Phật giáo/Đạo giáo vào ruleset chiêm tinh.
5. Không tạo cross-school synthesis khi các trường phái chưa đủ dữ liệu.
6. Không tự quyết methodology weighting.
7. Nếu framework yêu cầu dữ liệu mà schema hiện tại chưa có, ghi gap và đề xuất task; không hack.
8. Mọi thay đổi methodology phải cập nhật Decision Log.
9. Mọi implementation task phải có test, lint, build theo quality gate của dự án.
10. Ưu tiên backward compatibility đối với các rule đã được validation.

---

# 38. Tài liệu liên quan

Codex phải kiểm tra tên file thực tế trong repository. Danh sách tham chiếu dự kiến:

- `THIENVAN_MASTER_HANDOFF.md`
- `THIENVAN_MASTER_HANDOFF_V2.md`
- `THIENVAN_UI_UX_SEO_RULES.md`
- `THIENVAN_COMMERCIALIZATION_PLAN.md`
- `WESTERN_ASTROLOGY_SPEC.md`
- `WESTERN_VALIDATION.md`
- `IMPLEMENTATION_STATUS.md`
- `CODEX_TASK_QUEUE.md`
- `QA_CHECKLIST.md`
- `DECISION_LOG.md`
- `PROJECT_STATUS.md`
- các specification/ruleset của Vệ Đà, Bát Tự và Tử Vi khi được tạo.

---

# 39. Quy tắc ưu tiên khi tài liệu có vẻ mâu thuẫn

Không tự chọn file “mới hơn” rồi ghi đè.

Codex phải:

1. xác minh repository thực tế;
2. xác định loại mâu thuẫn;
3. phân biệt:
   - calculation;
   - interpretation;
   - response;
   - UI;
   - business;
4. báo rõ gap;
5. nếu là quyết định chuyên môn chưa chốt, ghi Decision Log trước khi code.

Response Framework không có quyền ghi đè một SPEC calculation đã validation.

---

# 40. Kết luận

`THIENVAN_RESPONSE_FRAMEWORK.md` là hợp đồng cho **cách Thiên Vận biến dữ liệu và luận giải thành trải nghiệm người dùng cuối**.

Nó giữ bốn điều cốt lõi:

- **Truy nguyên được**: biết kết luận đến từ đâu.
- **Không tuyệt đối hóa**: xu hướng không phải định mệnh.
- **Có giá trị hành động**: biết xong phải có cách tự quan sát và ứng dụng.
- **Không trộn hệ quy chiếu**: khoa học, truyền thống, triết học và lời khuyên thực tế phải được phân biệt.

Khi mọi module phát triển về sau, framework này phải giúp Thiên Vận vẫn nói bằng **một ngôn ngữ sản phẩm thống nhất**, dù bên dưới là nhiều trường phái hoàn toàn khác nhau.
