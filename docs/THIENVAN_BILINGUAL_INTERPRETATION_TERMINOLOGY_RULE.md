# THIENVAN BILINGUAL INTERPRETATION TERMINOLOGY RULE

**Status:** APPROVED BY OWNER<br>
**Scope:** Toàn bộ nội dung luận giải hiển thị cho người dùng trong Thiên Vận.

## Rule

Thiên Vận áp dụng quy tắc beginner-first cho thuật ngữ chuyên môn:

1. Lần đầu thuật ngữ xuất hiện trong một card/section: `English (Tiếng Việt)`.
2. Sau lần đầu có thể ưu tiên tiếng Việt để tránh câu quá nặng.
3. Machine-readable IDs, enums, code keys vẫn giữ tiếng Anh chuẩn.
4. Một thuật ngữ chỉ có một bản dịch chuẩn trong glossary dự án.
5. Tên tiếng Việt phải nhìn thấy trực tiếp khi người dùng mới cần nó; không chỉ giấu trong tooltip.

## Western Astrology baseline glossary

| English | Tiếng Việt |
|---|---|
| Sun | Mặt Trời |
| Moon | Mặt Trăng |
| Mercury | Sao Thủy |
| Venus | Sao Kim |
| Mars | Sao Hỏa |
| Jupiter | Sao Mộc |
| Saturn | Sao Thổ |
| Uranus | Sao Thiên Vương |
| Neptune | Sao Hải Vương |
| Pluto | Sao Diêm Vương |
| Ascendant / ASC | Cung Mọc / ASC |
| Midheaven / MC | Thiên Đỉnh / MC |
| Aries | Bạch Dương |
| Taurus | Kim Ngưu |
| Gemini | Song Tử |
| Cancer | Cự Giải |
| Leo | Sư Tử |
| Virgo | Xử Nữ |
| Libra | Thiên Bình |
| Scorpio | Bọ Cạp |
| Sagittarius | Nhân Mã |
| Capricorn | Ma Kết |
| Aquarius | Bảo Bình |
| Pisces | Song Ngư |

## Example

- `Pluto (Sao Diêm Vương) ở Capricorn (Ma Kết)`
- Sau đó trong cùng section có thể viết: `Sao Diêm Vương ở Ma Kết...`

## Implementation note

Đây là display/content rule, không thay đổi calculation engine hay canonical data schema.
Nên đưa rule này vào source-of-truth UI/content governance hiện có thay vì để thành một hệ thống độc lập lâu dài.
