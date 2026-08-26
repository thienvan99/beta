# Western Aspect Interpretation Plan

## Phạm vi và kết quả

- 10 thiên thể: Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto.
- 45 cặp thiên thể canonical không trùng nhau (`10 × 9 / 2`).
- 5 major aspects theo calculation hiện tại: conjunction, opposition, trine, square, sextile.
- 214 tổ hợp pair × aspect cần viết interpretation.
- Matrix này chỉ kiểm soát phạm vi interpretation; calculation engine vẫn phát hiện góc từ dữ liệu thật và không đọc matrix này.

## Phương pháp feasibility

Feasibility được xét theo góc địa tâm và orb đang cấu hình trong `src/config/aspect-orbs.ts`. Astronomy Engine là nguồn vị trí đang dùng trong calculation; thư viện mô tả mô hình dựa trên VSOP87/NOVAS và được đối chiếu với JPL Horizons. NASA cũng xác nhận Mercury và Venus là các hành tinh phía trong, luôn xuất hiện gần Mặt Trời và có giới hạn greatest elongation.

Kiểm tra Astronomy Engine trên các sự kiện/ngày trong giai đoạn 1900–2100 cho kết quả tham chiếu:

- Mercury–Sun: greatest elongation quan sát được khoảng 27,83°.
- Venus–Sun: greatest elongation quan sát được khoảng 47,31°.
- Mercury–Venus: khoảng cách kinh độ địa tâm lớn nhất quan sát được khoảng 73,76°.

Với ngưỡng nhận aspect hiện tại, conjunction cho phép sai số 8°, sextile 5°, square 7°, trine 7°, opposition 8°. Vì vậy các góc bắt đầu lần lượt ở 0°, 55°, 83°, 113° và 172° theo khoảng cách ngắn nhất.

Nguồn kiểm chứng:

- [Astronomy Engine](https://github.com/cosinekitty/astronomy): API vị trí địa tâm và `SearchMaxElongation`, cùng mô tả validation VSOP87/NOVAS/JPL Horizons.
- [NASA Skywatching FAQ](https://science.nasa.gov/skywatching/faq/): giải thích greatest elongation và việc Mercury/Venus luôn ở gần Mặt Trời trên bầu trời.
- [NASA Basics of Space Flight — The Solar System](https://science.nasa.gov/learn/basics-of-space-flight/chapter1-2/): hình học hành tinh phía trong và elongation nhìn từ Trái Đất.

## Các combination bị loại

Tổng cộng loại 11 combination không thể đi vào orb hiện tại:

- Sun–Mercury: opposition, trine, square, sextile.
- Sun–Venus: opposition, trine, square, sextile.
- Mercury–Venus: opposition, trine, square.

Ba cặp trên vẫn hỗ trợ:

- Sun–Mercury: conjunction.
- Sun–Venus: conjunction.
- Mercury–Venus: conjunction, sextile.

42 cặp còn lại hỗ trợ cả 5 major aspects. Matrix không khẳng định một góc phải xuất hiện trong một lá số cụ thể; UI/resolver vẫn chỉ luận giải aspect thực sự do calculation trả về.

## Thứ tự vertical slice đề xuất

1. Hoàn thiện các cặp với Sun: Sun–Mercury (1), Sun–Venus (1), rồi Sun–Mars đến Sun–Pluto (mỗi cặp 5).
2. Hoàn thiện các cặp với Moon chưa có, theo thứ tự Mercury đến Pluto (mỗi cặp 5).
3. Mercury–Venus (2), sau đó Mercury với Mars đến Pluto (mỗi cặp 5).
4. Các cặp còn lại theo nhóm hành tinh cá nhân → xã hội → xuyên cá nhân, mỗi vertical slice chỉ một body pair.
5. Sau mỗi slice, dùng matrix kiểm tra completeness và giữ resolver trả `null` cho rule chưa triển khai.

## Tiến độ hiện tại

- Nhóm Sun khả thi: hoàn tất.
- Moon–Mercury: hoàn tất 5/5 major aspects.
- Moon–Venus: hoàn tất 5/5 major aspects.
- Moon–Mars: hoàn tất 5/5 major aspects.
- Moon–Jupiter: hoàn tất 5/5 major aspects.
- Moon–Saturn: hoàn tất 5/5 major aspects, content gate PASS.
- Moon–Uranus: hoàn tất 5/5 major aspects, content gate PASS.
- Moon–Neptune: hoàn tất 5/5 major aspects, content gate PASS.
- Moon–Pluto: hoàn tất 5/5 major aspects, content gate PASS.
- Nhóm Moon theo plan: hoàn tất.
- Mercury–Venus: hoàn tất 2/2 aspect khả thi là conjunction và sextile, content gate PASS; opposition, trine và square bất khả thi theo feasibility policy nên không có interpretation rule.
- Mercury–Mars: hoàn tất 5/5 major aspects, content gate PASS.
- Mercury–Jupiter: hoàn tất 5/5 major aspects, content gate PASS.
- Mercury–Saturn: hoàn tất 5/5 major aspects, content gate PASS.
- Mercury–Uranus: hoàn tất 5/5 major aspects, content gate PASS.
- Mercury–Neptune: hoàn tất 5/5 major aspects, content gate PASS.
- Mercury–Pluto: hoàn tất 5/5 major aspects, content gate PASS.
- Nhóm Mercury theo plan: hoàn tất.
- Venus–Mars: hoàn tất 5/5 major aspects, content gate PASS.
- Venus–Jupiter: hoàn tất 5/5 major aspects, content gate PASS.
- Venus–Saturn: hoàn tất 5/5 major aspects, content gate PASS.
- Venus–Uranus: hoàn tất 5/5 major aspects, content gate PASS.
- Venus–Neptune: hoàn tất 5/5 major aspects, content gate PASS.
- Venus–Pluto: hoàn tất 5/5 major aspects, content gate PASS.
- Nhóm Venus theo plan: hoàn tất.
- Mars–Jupiter: hoàn tất 5/5 major aspects, content gate PASS.
- Mars–Saturn: hoàn tất 5/5 major aspects, content gate PASS.
- Mars–Uranus: hoàn tất 5/5 major aspects, content gate PASS.
- Mars–Neptune: hoàn tất 5/5 major aspects, content gate PASS.
- Mars–Pluto: hoàn tất 5/5 major aspects, content gate PASS.
- Nhóm Mars theo plan: hoàn tất.
- Jupiter–Saturn: hoàn tất 5/5 major aspects, content gate PASS.
- Jupiter–Uranus: hoàn tất 5/5 major aspects, content gate PASS.
- Jupiter–Neptune: hoàn tất 5/5 major aspects, content gate PASS.
- Jupiter–Pluto: hoàn tất 5/5 major aspects, content gate PASS.
- Nhóm Jupiter theo plan: hoàn tất.
- Saturn–Uranus: hoàn tất 5/5 major aspects, content gate PASS.
- Saturn–Neptune: hoàn tất 5/5 major aspects, content gate PASS.
- Saturn–Pluto: hoàn tất 5/5 major aspects, content gate PASS.
- Nhóm Saturn theo plan: hoàn tất.
- Uranus–Neptune: hoàn tất 5/5 major aspects, content gate PASS.
- Uranus–Pluto: hoàn tất 5/5 major aspects, content gate PASS.
- Nhóm Uranus theo plan: hoàn tất.
- Neptune–Pluto: DONE 5/5 major aspects, content gate PASS.
- Tổng interpretation content: 214/214 combination khả thi.
- Aspect Interpretation: COMPLETE. Toàn bộ 45 canonical body pairs và 214 feasible pair-aspect combinations đã có rule; các combination bất khả thi theo feasibility policy không bị tính là missing coverage.
- Checkpoint closure Neptune–Pluto: targeted aspect/feasibility/component 126/126 PASS; full suite 540/540, lint, build và `git diff --check` đều đạt; calculation engine/orb/aspect detection và feasibility behavior/source không đổi.
- NEXT canonical sau Aspect Interpretation: `WA-P4-001` — Thiết kế rule aggregator toàn lá số; chưa triển khai.

Không gộp nhiều body pair vào một slice và không tạo rule riêng theo orb hoặc applying/separating.
