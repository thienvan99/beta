# WESTERN HOUSE CUSP POLICY — DRAFT

**Project:** Thiên Vận<br>
**Policy ID:** `western-house-cusp-policy-v1`<br>
**Version:** `1.0.0`<br>
**Status:** `APPROVED`<br>
**Related task:** `WA-P0-002 — Chốt chính sách hành tinh sát cusp`<br>
**Proposed decision:** `DEC-WA-018`

## 1. Quyết định cốt lõi đề xuất

Thiên Vận **không đổi house calculation** khi một thiên thể nằm gần cusp.

House chính (`primaryHouse`) tiếp tục lấy trực tiếp từ calculation engine Placidus đã kiểm định theo quy tắc hiện tại:

`[cusp N, cusp N+1)`

Một lớp derived data riêng chỉ bổ sung:

- hành tinh có gần cusp hay không;
- cusp gần nhất;
- khoảng cách tới cusp;
- nhà kề bên;
- phía trước/sau cusp;
- cảnh báo diễn giải.

Không mutate `WesternAstrologyResult` nếu có thể tránh; ưu tiên derived adapter/helper.

## 2. Vì sao không dùng “5° = tự chuyển sang nhà kế”

Trong truyền thống chiêm tinh có một convention lâu đời rằng hành tinh nằm trước cusp nhà kế tiếp và trong khoảng vài độ, phổ biến là 5°, có thể được đọc như có ảnh hưởng mạnh tới nhà kế tiếp.

Tuy nhiên:

1. Đây là **quy tắc diễn giải**, không phải phép tính vị trí nhà.
2. Các trường phái/practitioner không thống nhất hoàn toàn.
3. Một số cách đọc còn xét applying/separating hoặc retrograde.
4. Thiên Vận đã có calculation house deterministic và validation độc lập.
5. Tự đổi house sẽ làm mất tính traceable của calculation.

Vì vậy:

> `calculated house` và `cusp interpretation context` phải là hai lớp tách biệt.

## 3. Ngưỡng v1 đề xuất: 1°

### 3.1. Ngưỡng

`nearCusp = true` khi khoảng cách góc nhỏ nhất từ thiên thể tới một house cusp là:

`distance < 1.0°`

Nếu `distance >= 1.0°`:

`nearCusp = false`

### 3.2. Vì sao chọn 1° cho Thiên Vận

Ngưỡng 1° **không được trình bày như chuẩn duy nhất của chiêm tinh**.

Đây là ngưỡng sản phẩm thận trọng vì:

- validation hiện tại của Thiên Vận đã xác định `<1°` là vùng nên cảnh báo trước khi house interpretation production;
- house cusps nhạy với giờ và địa điểm sinh;
- Astrodienst ghi Ascendant/houses thay đổi nhanh theo giờ sinh; Ascendant trung bình dịch khoảng 1° trong khoảng 4 phút, dù tốc độ thực tế thay đổi theo vị trí/hệ nhà;
- dùng 1° giúp chỉ cảnh báo vùng thật sự sát biên thay vì biến một lượng lớn lá số thành “hai nhà”.

Ngưỡng này có thể version hóa sau nếu validation thực nghiệm cho thấy cần thay đổi.

## 4. Trường hợp đúng cusp

Nếu longitude của thiên thể nằm đúng cusp theo tolerance calculation hiện tại:

- giữ house do interval rule hiện tại trả về;
- `distanceToCusp = 0`;
- `nearCusp = true`;
- `exactCusp = true`;
- hiển thị cảnh báo mạnh hơn một mức.

Không tạo một house thứ ba hoặc đổi calculation.

## 5. Không phân biệt ngưỡng theo từng thiên thể ở v1

V1 dùng **cùng ngưỡng 1° cho mọi celestial body**.

Lý do:

- đây là uncertainty/context của **ranh giới house**, không phải aspect orb;
- chưa có corpus đủ mạnh để đặt 10 ngưỡng khác nhau;
- ngưỡng riêng theo từng body tăng complexity nhưng chưa có lợi ích kiểm định rõ;
- retrograde không thay đổi `primaryHouse` hay `nearCusp` trong v1.

Nếu sau này muốn áp dụng tradition kiểu applying/separating hoặc retrograde, phải thành policy/version mới.

## 6. Derived evidence schema đề xuất

```ts
type HouseCuspContext = {
  body: CelestialBodyName;
  primaryHouse: number;
  adjacentHouse: number;
  nearestCuspHouse: number;
  distanceDegrees: number;
  nearCusp: boolean;
  exactCusp: boolean;
  side: "before" | "after" | "exact";
  policyId: "western-house-cusp-policy-v1";
  policyVersion: "1.0.0";
};
```

Ý nghĩa:

- `primaryHouse`: house calculation hiện tại.
- `nearestCuspHouse`: số nhà bắt đầu tại cusp gần nhất.
- `adjacentHouse`: nhà nằm phía còn lại của cusp đó.
- `distanceDegrees`: khoảng cách chính xác theo kinh độ hoàng đạo, xử lý wrap 0/360.
- `side`: thiên thể nằm trước cusp, sau cusp hay đúng cusp.

Schema thật có thể điều chỉnh theo types hiện có, nhưng semantics phải giữ nguyên.

## 7. Quy tắc UI beginner-first

Thiên Vận phải giải thích rõ trường hợp sát cusp theo nguyên tắc:

> Không nói “khó xác định hành tinh thuộc nhà nào”. Calculation vẫn xác định được một `primaryHouse`; điều cần thận trọng nằm ở **tầng diễn giải** khi vị trí quá gần ranh giới hai nhà.

### 7.1. Ba lớp thông tin phải tách rõ

UI nên phân biệt:

1. **Kết quả tính toán** — hành tinh thuộc nhà nào theo engine.
2. **Bối cảnh/độ gần cusp** — cách cusp bao nhiêu độ, nhà kề bên là nhà nào.
3. **Luận giải** — ưu tiên nhà chính, đồng thời lưu ý chủ đề nhà kề bên khi `nearCusp = true`.

Ví dụ:

- Tính toán: `Sao Kim ở Nhà 5`
- Bối cảnh: `Cách cusp Nhà 6 = 0,42°`
- Luận giải: ưu tiên Nhà 5, đồng thời lưu ý chủ đề Nhà 6.

Mục tiêu là người dùng hiểu hệ thống **không bị lỗi hoặc “không biết thuộc nhà nào”**, đồng thời hiểu vì sao các trường phái/tài liệu khác có thể nhắc tới nhà kế bên.

### 7.2. Bình thường

Nếu không near cusp:

`Sao Kim ở Nhà 5`

Không thêm cảnh báo.

### 7.3. Near cusp

Hiển thị ngắn ở lớp chính:

`Sao Kim ở Nhà 5`

`Gần ranh giới Nhà 6 · cách 0,42°`

Có thể dùng disclosure như:

`Vì sao cần lưu ý?`

Nội dung mở rộng:

> **Gần ranh giới hai nhà**<br>
> Sao Kim được tính ở **Nhà 5**, nhưng nằm rất gần điểm bắt đầu của **Nhà 6**. Vì vậy khi luận chuyên sâu, một số chủ đề của Nhà 6 cũng đáng được tham khảo. Thiên Vận vẫn dùng Nhà 5 làm vị trí chính.

### 7.4. Exact cusp

Ví dụ:

`Sao Kim ở Nhà 6`

`Đúng ranh giới Nhà 5–6 theo độ chính xác hiện tại`

Nội dung mở rộng:

> **Vị trí sát ranh giới Nhà 5–6**<br>
> Theo phép tính hiện tại, hành tinh thuộc **Nhà 6**. Do nằm ngay sát cusp, không nên dùng riêng vị trí theo nhà này để đưa ra kết luận mạnh; nên xem thêm các yếu tố khác trong lá số.

### 7.5. Không dùng wording gây hiểu nhầm

Không dùng:

- “khó xác định thuộc nhà nào”
- “50% Nhà 5, 50% Nhà 6”
- “chắc chắn thuộc cả hai nhà”
- “engine không biết nhà nào”
- “sai số calculation”

vì calculation vẫn xác định `primaryHouse`; cảnh báo nằm ở tầng diễn giải.

## 8. Khi triển khai house interpretation

### 8.1. Primary interpretation

Luôn render **full interpretation của `primaryHouse`**.

### 8.2. Near-cusp context

Nếu `nearCusp = true`:

- hiển thị warning/context;
- nêu `adjacentHouse`;
- KHÔNG render hai full interpretation ngang hàng trong v1.

Lý do:

- tránh người mới nhận hai bài luận dài và không biết cái nào chính;
- tránh tăng gấp đôi content;
- giữ calculation/evidence có một primary house duy nhất;
- vẫn thừa nhận chuyển tiếp cusp là vấn đề diễn giải có thật trong nhiều truyền thống.

Sau này có thể thêm compact adjacent-house note nếu đã có aggregator/evidence policy rõ.

## 9. Quan hệ với birth-time uncertainty

`nearCusp` KHÔNG đồng nghĩa giờ sinh sai.

Hai vấn đề phải tách:

1. `house cusp proximity`: hành tinh thật sự nằm gần ranh giới trong chart đã tính.
2. `birth time uncertainty`: người dùng không chắc giờ sinh.

V1 này chỉ xử lý số 1.

Task “Tôi không chắc giờ sinh” phải có policy riêng.

## 10. Quan hệ với traditional 5-degree rule

Thiên Vận ghi nhận 5-degree rule như **historical/interpretive context**, nhưng không dùng nó để đổi calculation.

Trong v1:

- `<1°` = product caution flag / high-proximity zone.
- `1°–5°` = không flag nearCusp mặc định.
- Không tuyên bố hành tinh `1°–5°` không có ảnh hưởng cusp trong mọi trường phái.
- Nếu sau này có Expert Mode, có thể hiển thị một lớp “traditional cusp orb” tùy trường phái mà không thay `primaryHouse`.

## 11. Acceptance tests tối thiểu

1. Body giữa nhà, xa mọi cusp -> `nearCusp = false`.
2. Body cách cusp kế tiếp `0.999°` -> `nearCusp = true`.
3. Body cách cusp `1.000°` -> `nearCusp = false`.
4. Body cách cusp `0.001°` phía trước -> primary house cũ, adjacent = nhà bắt đầu tại cusp.
5. Body cách cusp `0.001°` phía sau -> primary house mới, adjacent = nhà trước.
6. Body đúng cusp -> `exactCusp = true`, `distance = 0`.
7. Wrap cusp quanh `359°/0°` tính đúng khoảng cách.
8. House 12 -> House 1 wrap đúng.
9. Không mutate `WesternAstrologyResult`.
10. `body.house` hiện tại không thay đổi.
11. Cùng input -> derived context deterministic.
12. UI không warning nếu `nearCusp = false`.

## 12. Nguồn và provenance

- **Astrodienst / AstroWiki — House Cusp:** ghi nhận convention hành tinh sát cusp nhà tiếp theo thường được đọc mạnh về nhà đó; general rule lịch sử khoảng 5° hoặc phần cuối của house.
- **Astrodienst — A Brief Introduction to Astrology: The House System:** nói chuyển tiếp giữa hai house không hoàn toàn sắc như ranh giới cung; hành tinh gần cuối một house thường được diễn giải liên hệ với house kế.
- **Skyscript — Five Degree Orb (for House Cusps):** ghi nhận nhiều tác giả truyền thống dùng 5-degree orb trước house cusp.
- **Astrodienst / AstroWiki — House:** giải thích houses phụ thuộc giờ và nơi sinh; Ascendant/houses thay đổi nhanh theo thời gian.

### Phân biệt nguồn với quyết định Thiên Vận

Không nguồn trên xác lập `1°` là chuẩn phổ quát.

**Ngưỡng `<1°` là quyết định sản phẩm/QA của Thiên Vận**, kế thừa cảnh báo đã ghi trong validation hiện tại và được chọn để tạo high-proximity warning thận trọng mà không thay house calculation.

## 13. DEC-WA-018 — APPROVED

**Quyết định đề xuất:** Thiên Vận giữ nguyên house assignment Placidus đã kiểm định. Một derived layer `western-house-cusp-policy-v1` đánh dấu celestial body `nearCusp` khi cách cusp gần nhất dưới `1°`.

**Behavior:**

- không tự chuyển body sang adjacent house;
- `primaryHouse` luôn là house calculation hiện tại;
- near-cusp evidence ghi cusp, khoảng cách, adjacent house và side;
- full house interpretation chỉ dùng `primaryHouse`;
- UI cảnh báo đọc thêm adjacent-house theme khi `<1°`;
- exact cusp có warning mạnh hơn;
- cùng ngưỡng cho mọi celestial body trong v1;
- không dùng retrograde để đổi house/policy v1;
- không áp dụng traditional 5° rule để mutate calculation.

**Status:** `APPROVED`.
