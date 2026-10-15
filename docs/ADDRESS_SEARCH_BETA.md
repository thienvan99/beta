# Tìm nơi sinh miễn phí — bản giới hạn cho GitHub Pages

Ngày: 2026-10-15. Chủ dự án yêu cầu nhập địa chỉ thay tọa độ, chọn phương án
không cần thanh toán sau khi được hỏi về Google Places.

## Phạm vi

- Photon public demo API trên dữ liệu OpenStreetMap, không key/thẻ/billing.
- Nhập địa chỉ/tên bệnh viện/thành phố rồi bấm Tìm; không gửi khi đang gõ.
- Tối đa 5 kết quả, người dùng chọn rõ ràng; tuyệt đối không chọn rank 1 tự động.
- Chỉ query địa điểm được gửi; không gửi ngày, giờ, giới tính hay hồ sơ sinh.
- Timeout 12 giây, hủy phản hồi cũ, cache trong bộ nhớ tối đa 20 query,
  tối thiểu 2 giây giữa các request không có cache trong một phiên component.
  Đây không phải rate limit tổng toàn website.
- Có ghi công OSM, thông báo gửi địa chỉ, mở bản đồ kiểm tra và cảnh báo địa điểm
  đại diện khu vực. Không khẳng định tọa độ của một địa chỉ là vị trí sinh chính xác.
- Tọa độ thủ công ở disclosure; khi đổi query thì tọa độ cũ không còn được dùng.
- Múi giờ trên Pages tiếp tục nhập thủ công. Không thay calculation/timezone engine.
- Không đổi schema storage: hồ sơ cũ vẫn lưu/khôi phục tọa độ; tên địa chỉ tìm kiếm
  chỉ ở bộ nhớ phiên form, không giả vờ tái tạo tên địa chỉ từ tọa độ đã lưu.

Đây là bản tìm kiếm nhẹ theo yêu cầu hiện tại, **không phải** hoàn tất
`UISEO-P1-006`/Birth Place Picker v1. Map chỉnh pin, profile V2, Google benchmark,
server proxy và production-provider approval của kế hoạch cũ vẫn chưa hoàn tất.
Các quyết định cũ về Geoapify không bị đổi thành PASS.

## Điều kiện dịch vụ và đánh đổi

Nguồn chính thức: https://github.com/komoot/photon#demo-server

Photon cho dùng demo API với lượng request hợp lý; có thể giới hạn/chặn khi dùng
nhiều, không bảo đảm availability và có thể thay đổi không báo trước. Không hứa
miễn phí vĩnh viễn hoặc đủ cho traffic production lớn. Nếu dịch vụ lỗi, giữ input,
cho tìm lại hoặc dùng tọa độ thủ công. Không gọi API công cộng trong CI.

## Bằng chứng giới hạn

5 truy vấn công cộng được thử tuần tự: Từ Dũ/TP.HCM, Hà Nội, Thanh Hoa, Da Nang,
London. Có kết quả phù hợp trong các danh sách này; riêng `Thanh Hoa, Vietnam`
đưa Biên Hòa lên đầu và Thanh Hóa ở các vị trí sau. Vì vậy không tự chọn kết quả,
không ghi provider benchmark PASS hoặc suy rộng độ phủ toàn Việt Nam/thế giới.

Unit tests kiểm normalization, thứ tự kinh/vĩ độ, biên tọa độ, dữ liệu lỗi,
precision và privacy request. Browser checks dùng mock cố định cho thao tác chọn,
không tự chọn kết quả đầu, chưa tìm thấy, manual fallback và responsive.
Kiểm tra live riêng không thay thế benchmark 45 cases của kế hoạch cũ.

Kiểm tra thực hiện ngày 2026-10-15: 741 unit tests PASS; TypeScript, lint và
static build PASS; 7/7 browser regression cho bản máy chủ PASS. Artifact Pages
PASS ở 1280/768/390/360 với mock địa chỉ, error/empty/stale recovery và manual
fallback. Browser từ origin GitHub Pages gọi Photon thật với truy vấn bệnh viện
Từ Dũ nhận HTTP 200; không suy ra độ phủ hoặc độ chính xác toàn bộ dịch vụ.
