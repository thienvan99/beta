# GitHub Pages — Thiên Vận Beta

Đích xuất bản: https://thienvan99.github.io/beta/

## Trạng thái kiểm tra 2026-10-15

- Local static build: PASS.
- Unit tests: 736/736 PASS; TypeScript và lint PASS.
- Chromium trên artifact tĩnh: luồng nhập timezone/validation/lá số/reload/noindex
  và no-overflow PASS tại 1280/768/390/360; recovery/redirect/3D/texture/sitemap
  PASS; không gọi API và không có console/page errors.
- Lần bật đầu tiên bị GitHub API từ chối với HTTP 422:
  `Your current plan does not support GitHub Pages for this repository.`
- Chủ dự án sau đó cho phép công khai toàn bộ kho `beta` và lịch sử commit.
  Đã chuyển kho thành public và bật Pages với GitHub Actions ngày 2026-10-15.
  Trạng thái mỗi lần xuất bản cần xem workflow và kiểm tra URL thật.

## Phạm vi đã chọn

Đã bổ sung ô tìm nơi sinh miễn phí qua Photon theo lựa chọn tiếp theo của chủ dự
án: gõ địa chỉ, bấm Tìm và chọn kết quả để điền tọa độ. Xem
[phạm vi và giới hạn](ADDRESS_SEARCH_BETA.md). API tìm địa chỉ chạy từ trình duyệt;
không gửi ngày giờ sinh, không khôi phục API timezone của bản máy chủ.

Chủ dự án chọn bản Pages nhập múi giờ thủ công ngày 2026-10-15. Bản này
không gọi `/api/timezone`. Người dùng nhập IANA timezone phù hợp với nơi sinh,
không dùng UTC offset cố định. Bộ tính thời gian, thiên văn và luận giải không đổi.
Ô múi giờ mặc định là `Asia/Ho_Chi_Minh`; khi khôi phục bản nháp/hồ sơ hoặc
đổi tọa độ, form đặt lại mặc định này. Người sinh ở nơi khác tự nhập IANA
timezone phù hợp. Không tự đoán timezone từ trình duyệt.

Bản chạy máy chủ (`npm run dev` / `npm run build`) tiếp tục dùng API geo-tz cũ.

## Dựng và kiểm tra

```
npm ci
npm test
npm run build:pages
npm run verify:pages
```

Lệnh dựng tạo bản sao trong `.pages-build`, bỏ API chỉ trong bản sao này và
xuất `.pages-build/out`. Dùng origin `https://thienvan99.github.io`, basePath
`/beta`, trailing slash và cờ `NEXT_PUBLIC_GITHUB_PAGES=true`. Không cần `.env`.
Không chỉnh nguồn calculation hoặc xóa API gốc. Có bước chuẩn hóa tên tệp
segment của Next 16.2.12 khi dựng trên Windows; Linux không cần bước này.

Kiểm thử trình duyệt dùng máy chủ tĩnh thực sự, không dùng Next dev server:
nhập timezone thủ công/không hợp lệ, lập lá số, tải lại đường dẫn kết quả,
noindex, không gọi API, không tràn ngang tại 1280/768/390/360, phục hồi khi
thiếu session, tải trang 3D và ảnh Trái Đất. Ảnh nằm tại `test-results/pages/`.

## Xuất bản

Workflow `.github/workflows/pages.yml` chạy khi push `main` hoặc chạy thủ công.
Nó kiểm thử, dựng, kiểm tra trình duyệt rồi upload và deploy artifact Pages.
Repository Settings → Pages → Source cần đặt GitHub Actions.
Kho riêng tư cần gói GitHub hỗ trợ Pages cho private repository; không tự đổi
kho thành công khai. Website Pages có thể công khai trong khi mã nguồn riêng tư.

Chỉ artifact trong `out` được xuất bản, không phải toàn bộ repository hay dữ liệu
hồ sơ trình duyệt. Kết quả cá nhân tiếp tục `noindex,nofollow` và ngoài sitemap.
`/beta/robots.txt` không thay thế robots.txt ở gốc tên miền github.io; riêng tư
không dựa vào robots.txt mà dựa vào việc không xuất dữ liệu sinh trong artifact.

Không ghi DONE/deployed chỉ từ build hoặc test: cần workflow thành công và kiểm
tra URL thật. Nếu tài khoản chưa hỗ trợ Pages, cấu hình này vẫn dùng được sau
khi chủ dự án giải quyết điều kiện tài khoản.
