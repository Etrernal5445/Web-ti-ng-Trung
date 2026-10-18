# Học tiếng Trung

Web tự học tiếng Trung cho người Việt: kho từ vựng, ngữ pháp HSK1–HSK2 và luyện tập.
Web tĩnh, không cần cài đặt. Mở thẳng `index.html` hoặc chạy trên GitHub Pages đều được.

## Cấu trúc thư mục

```
index.html            khung trang + danh sách file được nạp
css/style.css         giao diện
js/kho.js             kho dữ liệu chung, tìm kiếm
js/tien-ich.js        hàm dùng chung (phát âm, chip lọc…)
js/tu-vung.js         Kho từ vựng + cửa sổ chi tiết từ
js/ngu-phap.js        Ngữ pháp
js/luyen-tap.js       Luyện tập: Viết chữ, Trắc nghiệm, lọc theo bài
js/luyen-nghe.js      Luyện nghe: Nghe chọn từ, Thanh điệu, Chép chính tả
js/app.js             điều hướng giữa các chế độ
data/tu-vung/         hsk1.js, hsk2.js, mo-rong.js
data/ngu-phap/        hsk1.js, hsk2.js
tools/kiem-tra.js     kiểm tra dữ liệu (tùy chọn, cần Node.js)
```

## Thêm từ vựng

Mở `data/tu-vung/mo-rong.js` (hoặc file của cấp độ tương ứng) và thêm một dòng:

```js
{ hanzi: "咖啡店", pinyin: "kā fēi diàn", hanViet: "già phê điếm", nghia: "quán cà phê", loaiTu: "danh từ", chuDe: ["địa điểm"] },
```

- `pinyin`: mỗi âm tiết cách nhau một dấu cách, số âm tiết phải bằng số chữ Hán. Âm 儿 cuốn lưỡi ghi là `r` (哪儿 = `"nǎ r"`).
- Có thể bỏ trống: `hanViet`, `loaiTu`, `chuDe`, `bai` (số bài), `ghiChu`.
- Từ mới tự động xuất hiện trong Kho, ô tìm kiếm, bộ lọc chủ đề và các bài luyện tập.

## Thêm cấp độ mới (ví dụ HSK3)

1. Tạo `data/tu-vung/hsk3.js` bắt đầu bằng `themTuVung("hsk3", [ ... ]);`
2. Thêm dòng `<script src="data/tu-vung/hsk3.js"></script>` vào `index.html`, ngay dưới các file data khác.
3. (Tùy chọn) Ngữ pháp: tạo `data/ngu-phap/hsk3.js` với `themNguPhap("hsk3", [ ... ]);` và thêm dòng `<script>` tương tự.

## Kiểm tra dữ liệu

Nếu máy có Node.js:

```
node tools/kiem-tra.js
```

Lệnh này báo lỗi thiếu trường, số âm tiết pinyin không khớp số chữ Hán, từ bị trùng hoặc từ chưa có Hán Việt.
Khi mở trang, các lỗi dữ liệu cũng được in ra Console (F12).

## Ghi chú về dữ liệu

- HSK1: theo Giáo trình chuẩn HSK1, chia theo 15 bài.
- HSK2: chia theo 15 bài của Giáo trình chuẩn HSK2 (bỏ từ bổ sung có dấu * và từ đã có ở HSK1). Ba từ HSK2 chính thức không có trong sách (累, 卖, 回答) để ở cuối file, không gán bài.
- Phát âm và Luyện nghe dùng giọng đọc có sẵn của trình duyệt. Edge có sẵn giọng Trung trực tuyến; trên Windows có thể cài thêm giọng Tiếng Trung (giản thể) trong Cài đặt → Thời gian & Ngôn ngữ → Giọng nói.
- Thứ tự nét và luyện viết dùng [HanziWriter](https://hanziwriter.org), cần kết nối mạng.
