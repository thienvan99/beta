# WESTERN HOUSE RULERS POLICY — DRAFT

**Project:** Thiên Vận<br>
**Policy / Ruleset ID:** `western-house-rulers-v1`<br>
**Version:** `1.0.0`<br>
**Status:** `APPROVED`<br>
**Related task:** `WA-P0-001 — Chốt mô hình chủ tinh nhà`<br>
**Decision:** `DEC-WA-019` — APPROVED

---

## 1. Quyết định cốt lõi đề xuất

Thiên Vận dùng **traditional sign ruler làm `primaryHouseRuler`** cho cấu trúc chủ tinh nhà.

Với ba cung có modern ruler phổ biến:

- Scorpio (Bọ Cạp): **Mars (Sao Hỏa)** là primary; **Pluto (Sao Diêm Vương)** là supplementary modern co-ruler.
- Aquarius (Bảo Bình): **Saturn (Sao Thổ)** là primary; **Uranus (Sao Thiên Vương)** là supplementary modern co-ruler.
- Pisces (Song Ngư): **Jupiter (Sao Mộc)** là primary; **Neptune (Sao Hải Vương)** là supplementary modern co-ruler.

Modern co-ruler **không thay thế** primary ruler trong v1.

---

## 2. Vì sao chọn traditional ruler làm primary

### 2.1. Hệ thống hoàn chỉnh và nhất quán

Traditional rulership dùng bảy thiên thể cổ điển và tạo một hệ 12 cung khép kín đã tồn tại hơn 2.000 năm.

Bảng này không cần ngoại lệ tùy trường phái khi xác định principal house ruler.

### 2.2. House ruler cần một primary deterministic

House ruler là planet ruler của **sign nằm trên cusp của house**.

Nếu sản phẩm dùng đồng thời hai ruler ngang hàng cho Scorpio/Aquarius/Pisces:

- một house có thể có hai “chủ tinh chính”;
- chain house-ruler/dispositor phức tạp hơn;
- synthesis khó quyết định trọng số;
- người mới khó hiểu đâu là ruler chính.

Thiên Vận cần một primary ruler duy nhất để calculation/derived layer deterministic.

### 2.3. Giữ modern astrology nhưng không làm mất cấu trúc

Modern astrology thường dùng:

- Pluto cho Scorpio,
- Uranus cho Aquarius,
- Neptune cho Pisces.

Một số modern astrologers vẫn xem traditional ruler cùng lúc.

Vì vậy Thiên Vận không loại bỏ outer planets; chúng được giữ ở lớp `modernCoRuler` để dùng trong Expert/Deep interpretation sau.

---

## 3. Bảng `western-house-rulers-v1`

| Cusp sign | Primary traditional ruler | Modern co-ruler |
|---|---|---|
| Aries (Bạch Dương) | Mars (Sao Hỏa) | — |
| Taurus (Kim Ngưu) | Venus (Sao Kim) | — |
| Gemini (Song Tử) | Mercury (Sao Thủy) | — |
| Cancer (Cự Giải) | Moon (Mặt Trăng) | — |
| Leo (Sư Tử) | Sun (Mặt Trời) | — |
| Virgo (Xử Nữ) | Mercury (Sao Thủy) | — |
| Libra (Thiên Bình) | Venus (Sao Kim) | — |
| Scorpio (Bọ Cạp) | Mars (Sao Hỏa) | Pluto (Sao Diêm Vương) |
| Sagittarius (Nhân Mã) | Jupiter (Sao Mộc) | — |
| Capricorn (Ma Kết) | Saturn (Sao Thổ) | — |
| Aquarius (Bảo Bình) | Saturn (Sao Thổ) | Uranus (Sao Thiên Vương) |
| Pisces (Song Ngư) | Jupiter (Sao Mộc) | Neptune (Sao Hải Vương) |

---

## 4. Cách xác định chủ tinh của một house

Quy trình v1:

1. Lấy longitude của cusp house từ `WesternAstrologyResult.houses`.
2. Xác định zodiac sign chứa cusp longitude.
3. Tra bảng `western-house-rulers-v1`.
4. `primaryHouseRuler` = traditional ruler của cusp sign.
5. Nếu cusp sign là Scorpio/Aquarius/Pisces:
   thêm `modernCoRuler`.
6. Không dùng sign chiếm phần lớn diện tích house để thay ruler.
7. Không dùng sign của planet đang nằm trong house để thay ruler.
8. Không dùng “natural ruler” kiểu House 1 = Mars chỉ vì Aries là sign thứ nhất.

Ví dụ:

House 10 cusp = 18° Aquarius

=> Cusp sign = Aquarius (Bảo Bình)<br>
=> Primary ruler = Saturn (Sao Thổ)<br>
=> Modern co-ruler = Uranus (Sao Thiên Vương)

Saturn vẫn là `primaryHouseRuler` dù Uranus được hiển thị như lớp bổ sung.

---

## 5. Không dùng natural house rulership làm house lord

Thiên Vận phải phân biệt:

- **Sign ruler of the actual house cusp** → dùng để xác định house ruler.
- **Natural house-sign analogy** như House 1 ↔ Aries ↔ Mars → không dùng để tính house ruler.

Ví dụ:

Nếu House 1 cusp nằm ở Libra:

- House 1 ruler = Venus.
- Không phải Mars chỉ vì House 1 đôi khi được gắn với Aries trong một số hệ modern correspondence.

Điều này tránh trộn “12-letter alphabet / natural house” với actual chart rulership.

---

## 6. Intercepted signs

Trong v1:

- intercepted sign **không thay thế principal house ruler**;
- ruler của intercepted sign **không trở thành primary ruler**;
- không thêm intercepted co-ruler vào calculation/derived result v1.

Lý do:

- principal house ruler vẫn được xác định từ cusp sign;
- intercepted-sign co-significator là lớp interpretation nâng cao;
- đưa vào ngay sẽ tăng complexity trước khi core house-lord model được kiểm định.

Có thể mở rộng sau bằng policy riêng nếu cần Expert Mode.

---

## 7. Cusp ở cuối một sign

Nếu house cusp ở 29°xx của một sign:

- ruler vẫn lấy từ **sign thực tế chứa cusp**;
- không tự chuyển ruler sang sign kế tiếp;
- không áp dụng house-cusp proximity policy của planet cho chính cusp sign.

Ví dụ:

House 2 cusp = 29°55' Taurus

=> House 2 ruler = Venus.

Không chuyển thành Mercury chỉ vì cusp gần Gemini.

---

## 8. Derived schema đề xuất

Conceptual schema:

```ts
type HouseRulerContext = {
  house: number;
  cuspLongitude: number;
  cuspSign: ZodiacName;

  primaryRuler: CelestialBodyName;
  modernCoRuler: CelestialBodyName | null;

  rulesetId: "western-house-rulers-v1";
  rulesetVersion: "1.0.0";
};
```

Ở lớp sâu hơn có thể enrich bằng vị trí thật của ruler:

```ts
type HouseRulerPlacement = {
  ruler: CelestialBodyName;
  sign: ZodiacName;
  house: number;
  longitude: number;
  retrograde: boolean;
};
```

Nhưng v1 task tính ruler chỉ cần giữ semantic rõ ràng; không tự viết interpretation từ placement này.

---

## 9. Evidence khi hiển thị

Ví dụ beginner-first:

**Nhà 10 — cusp Aquarius (Bảo Bình)**<br>
**Chủ tinh chính:** Saturn (Sao Thổ)<br>
**Chủ tinh hiện đại bổ sung:** Uranus (Sao Thiên Vương)

Disclosure:

> Thiên Vận dùng hệ chủ tinh truyền thống làm cấu trúc chính để giữ cách tính nhất quán. Với Bọ Cạp, Bảo Bình và Song Ngư, hành tinh chủ tinh hiện đại được giữ như lớp bổ sung khi luận chuyên sâu.

Không dùng wording:

- “Saturn và Uranus cùng là chủ tinh chính”
- “Uranus chắc chắn thay Saturn”
- “traditional ruler là lỗi thời”
- “modern ruler chính xác hơn”

---

## 10. Khi luận house ruler sau này

Primary logic:

`House topic -> cusp sign -> primary ruler -> ruler's actual sign/house/aspects`

Ví dụ:

House 10 cusp Aquarius<br>
→ primary ruler Saturn<br>
→ Saturn đang ở Capricorn, House 9<br>
→ đây mới là chain dữ liệu để xây house-ruler interpretation.

Modern co-ruler Uranus có thể được dùng như **secondary evidence**, không lấn át primary chain.

Không viết synthesis trước khi có rule/weighting được approve.

---

## 11. Acceptance tests

1. Aries cusp -> Mars.
2. Taurus cusp -> Venus.
3. Gemini cusp -> Mercury.
4. Cancer cusp -> Moon.
5. Leo cusp -> Sun.
6. Virgo cusp -> Mercury.
7. Libra cusp -> Venus.
8. Scorpio cusp -> Mars primary + Pluto modern.
9. Sagittarius cusp -> Jupiter.
10. Capricorn cusp -> Saturn.
11. Aquarius cusp -> Saturn primary + Uranus modern.
12. Pisces cusp -> Jupiter primary + Neptune modern.
13. Cusp longitude wrap 0/360 xác định sign đúng.
14. Cusp 29°59' sign vẫn dùng ruler sign hiện tại.
15. Không phụ thuộc planets đang nằm trong house.
16. Không mutate `WesternAstrologyResult`.
17. Cùng input -> deterministic.
18. Không dùng House 1=Aries/Mars natural-ruler shortcut.
19. Intercepted sign không thay primary ruler.
20. Modern co-ruler không bao giờ thay `primaryRuler` trong v1.

---

## 12. Nguồn và provenance

### Skyscript — House Ruler

House ruler chính là planet cai quản **sign trên cusp của house**. Intercepted signs có thể được một số astrologers dùng như co-significator, nhưng principal ruler vẫn đến từ cusp sign.

### Skyscript — Sign Rulers

Traditional rulership là hệ 7 planets đã được sử dụng hơn 2.000 năm. Skyscript ghi nhận Uranus, Neptune và Pluto được nhiều modern astrologers dùng làm co-rulers của Aquarius, Pisces và Scorpio nhưng không phải thành phần nội tại của traditional scheme.

### Astrodienst / AstroWiki — Modern Astrology / Sign Rulers

Modern astrologers thường dùng Uranus cho Aquarius, Neptune cho Pisces và Pluto cho Scorpio; một số người vẫn xét traditional rulers Saturn, Jupiter và Mars cùng lúc.

### Skyscript — Traditional Sign Rulerships

Traditional scheme:
Mars rules Aries/Scorpio; Jupiter rules Sagittarius/Pisces; Saturn rules Capricorn/Aquarius.

### Skyscript — House Ruler, natural-house caveat

Không dùng correspondence kiểu “House 1 tự nhiên do Mars cai quản vì Aries là sign 1” để thay actual cusp ruler.

---

## 13. DEC-WA-019 — APPROVED

**Quyết định đề xuất:** Thiên Vận dùng `western-house-rulers-v1`, version `1.0.0`.

### Primary rulership

Traditional rulers là source-of-truth để xác định principal house ruler từ cusp sign.

### Modern supplementary rulership

- Scorpio: Mars primary; Pluto supplementary.
- Aquarius: Saturn primary; Uranus supplementary.
- Pisces: Jupiter primary; Neptune supplementary.

### Scope

- cusp sign -> house ruler;
- không interpretation;
- không natural-house shortcut;
- intercepted sign không thay primary ruler;
- late-degree cusp vẫn dùng ruler của sign chứa cusp;
- modern co-ruler là secondary evidence, không thay primary.

**Status:** `APPROVED`.
