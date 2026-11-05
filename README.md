# 💕 Hành Trình Của Chúng Mình — Web Game Kỷ Niệm 3 Năm Yêu Nhau

> Dành tặng tình yêu của **Quang Vinh & Việt Nga**
> Kỷ niệm: **01/11/2023 → 01/11/2026** (3 năm • 1095 ngày và mãi mãi)
> Phong cách: **Pixel Art RPG phong cách Stardew Valley**

---

## 🎮 Cách Mở & Trải Nghiệm Game

### 1. Mở trực tiếp trên máy tính hoặc điện thoại:
- Chỉ cần nhấp đúp vào tệp `index.html` trong thư mục `d:\game\` để mở bằng bất kỳ trình duyệt nào (Chrome, Safari, Edge, Cốc Cốc,...).
- Hoặc mở bằng VS Code Live Server để trải nghiệm mượt mà nhất.

### 2. Trải nghiệm trên điện thoại (Được tối ưu tốt nhất):
- Giao diện được thiết kế **Mobile-first** (chuẩn màn hình điện thoại 360px - 430px).
- Hỗ trợ cảm ứng vuốt, chạm, hiệu ứng âm thanh retro 8-bit và pháo hoa rực rỡ.

---

## 🗺️ Hành Trình 5 Vùng Đất Kỷ Niệm

1. **🌅 Màn Mở Đầu (Intro)**: Việt Nga tỉnh dậy trong căn phòng pixel ấm áp, phát hiện lá thư bí ẩn của Quang Vinh để lại.
2. **🌸 Vùng 1: Mùa Xuân Gặp Gỡ**: Con đường hoa anh đào bay lãng mạn.
   - *Mini game*: **Hứng Hoa Tình Yêu** (Catch game)
   - *Phần thưởng*: Dâu Tây Ngọt Ngào 🍓 + Thư Tình #2
3. **🌲 Vùng 2: Đà Lạt Mộng Mơ**: Tái hiện chuyến đi ngày **01/11/2023** với đồi thông, sương mù và quán cà phê triền dốc.
   - *Mini game*: **Ký Ức Đà Lạt** (Ghép tranh Puzzle 3x3)
   - *Phần thưởng*: Cà Phê Đà Lạt ☕ + Thư Tình #3
4. **🌊 Vùng 3: Biển Xanh Tình Yêu**: Bãi cát vàng, sóng vỗ rì rào và lâu đài cát.
   - *Mini game*: **Nhặt Vỏ Ốc Tình Yêu** (Tap collection)
   - *Easter Egg*: Chạm 5 lần vào mặt trời để mở thông điệp bí mật!
   - *Phần thưởng*: Trái Tim Tình Yêu 💕 + Thư Tình #4
5. **🏮 Vùng 4: Góc Nhỏ Của Hai Đứa**: Quán ăn quen thuộc lung linh đèn lồng, nơi lưu giữ những buổi chiều tan ca đón nhau đi ăn.
   - *Mini game*: **Đầu Bếp Tình Yêu** (Nấu 3 món: Phở bò 🍜, Trà sữa 🧋, Bánh tráng trộn 🥗)
   - *Phần thưởng*: Thư Tình Pixel 💌 + Thư Tình #5
6. **💍 Vùng 5: Lời Hứa Tương Lai (CLIMAX)**: Bầu trời đêm lung linh ngàn vì sao, đèn fairy lights rực rỡ. Quang Vinh tiến đến và ngỏ lời cầu hôn / lời hứa bên nhau trọn đời.
   - Pháo hoa nổ sáng rực trời đêm, confetti và trái tim bay ngập tràn!
7. **🎆 Màn Kết (Ending & Album)**:
   - Tổng kết thành tích 1095 ngày yêu nhau.
   - Album ảnh kỷ niệm có thể mở xem chi tiết.
   - Hộp thư tình lưu giữ đầy đủ 6 lá thư để đọc lại bất cứ lúc nào.
   - Trình phát Voice Message tình yêu.

---

## 📸 Cách Cá Nhân Hóa (Thêm Ảnh & Âm Thanh Thật)

Tất cả đã được cấu trúc sẵn, bạn có thể dễ dàng bổ sung:

1. **Thêm ảnh kỷ niệm thật**:
   - Copy ảnh của hai bạn vào thư mục `asset/photos/` (ví dụ: `dalat1.jpg`, `beach1.jpg`).
   - Mở file `js/scenes/ending.js` để cập nhật đường dẫn ảnh.
2. **Thêm Voice Message thật của Quang Vinh**:
   - Ghi âm lời nhắn từ điện thoại thành file MP3, lưu vào `asset/audio/voice/voice1.mp3`.
3. **Thêm nhạc nền bài hát của hai bạn**:
   - Đặt file MP3 vào `asset/audio/bgm/` (ví dụ `intro.mp3`, `zone5.mp3`).
   - Hệ thống đã tích hợp sẵn **bộ tổng hợp âm thanh Web Audio retro 8-bit tự động phát nhạc**, nên ngay cả khi chưa có file MP3, game vẫn có nhạc nền chiptune và hiệu ứng âm thanh đầy đủ!
4. **Chỉnh sửa nội dung thư tình**:
   - Mở file `js/data/letters.js` để viết thêm những lời tâm sự riêng tư nhất gửi đến Việt Nga.

---

## 💎 Cấu Trúc Mã Nguồn

```
d:\game\
├── index.html                  # Giao diện chính của game
├── README.md                   # Tài liệu hướng dẫn này
├── css/
│   ├── style.css               # Phong cách pixel art Stardew Valley
│   ├── animations.css          # Hiệu ứng chuyển động, pháo hoa, cánh hoa
│   └── responsive.css          # Tương thích màn hình điện thoại
├── js/
│   ├── main.js                 # Điều khiển trung tâm (Game Controller)
│   ├── engine/                 # Hệ thống Audio, Dialogue, Particles, Storage, Transition
│   ├── data/                   # Dữ liệu Items, Thư tình, Kịch bản hội thoại
│   ├── minigames/              # 4 Mini games tương tác (Hứng hoa, Puzzle, Nhặt vỏ ốc, Nấu ăn)
│   └── scenes/                 # 8 màn chơi (Title, Intro, Zone 1-5, Ending)
└── asset/                      # Thư mục tài nguyên đồ họa và âm thanh
```
