# Wrap Mode
- là 1 mode của image gồm có 2 option là Clamp(default) và Repeat

| **Tiêu chí**              | **Clamp**                                                | **Repeat**                                                 |
| ------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------- |
| **Phạm vi UV gốc**        | `[0, 1]`                                                      | `[0, 1]`                                                        |
| **Xử lý UV vượt \[0, 1]** | Cố định UV trong \[0,1], **dùng pixel ở biên để kéo dài ảnh** | **Lặp lại texture** trong vùng UV vượt \[0,1]                   |
| **Kết quả hiển thị**      | Ảnh được kéo dãn hoặc giãn biên, không thay đổi mẫu           | Ảnh gốc được **nhân bản/lặp lại** liên tục                      |
| **Dùng cho loại ảnh**     | Ảnh nền cố định, UI, icon, nút không lặp                      | Ảnh nền lặp, hiệu ứng cuộn, tile map, ảnh nhỏ muốn phủ vùng lớn |



# Filter Mode
Filter Mode là cách máy tính xử lý hình ảnh khi phóng to hoặc thu nhỏ. Nó quyết định liệu hình ảnh có bị mờ hay giữ được độ nét ban đầu khi thay đổi kích thước.

+ Point (lấy điểm gần nhất): Máy tính chọn màu của điểm ảnh gần nhất mà không xử lý thêm. Khi phóng to, ảnh sẽ có các ô vuông rõ nét, giống tranh pixel.
+ Bilinear (làm mượt 2 chiều): Máy tính lấy màu của điểm ảnh và các điểm xung quanh, tính trung bình để tạo hình ảnh mượt hơn, giảm răng cưa.
+ Trilinear (làm mượt hơn): Tương tự Bilinear nhưng xử lý thêm ở nhiều cấp độ hình ảnh, giúp ảnh vẫn mượt khi phóng to hoặc thu nhỏ nhiều.

Tóm lại:
+ Dùng Point để giữ nét "góc cạnh", không bị mờ.
+ Dùng Bilinear hoặc Trilinear để ảnh mềm mại, ít răng cưa (Trilinear mượt hơn).


# Premultiply Alpha

**Premultiply Alpha là gì?**

Khi một ảnh có độ trong suốt (alpha), giá trị màu (RGB) có thể được lưu theo 2 cách:

1. **Non-Premultiply Alpha (Không nhân trước):**  
   - RGB lưu nguyên gốc, alpha lưu riêng.  
   - Ví dụ: Màu đỏ trong suốt 50% → lưu là: `(255, 0, 0, 0.5)`  
   - Màu vẫn mạnh, độ trong suốt nằm ở alpha.

2. **Premultiply Alpha (Nhân trước):**  
   - RGB được nhân sẵn với alpha trước khi lưu.  
   - Ví dụ: Màu đỏ trong suốt 50% → lưu là: `(127, 0, 0, 0.5)`  
   - Màu bị làm mờ đi theo độ trong suốt.

**Tại sao nên dùng Premultiply Alpha?**

- **Tối ưu hiệu suất khi render (vẽ texture):**  
  Với Premultiply Alpha, phép tính trộn màu nhanh hơn và đơn giản hơn.  

- **Hiển thị đúng khi phóng to/thu nhỏ ảnh:**  
  Khi hai điểm ảnh kề nhau có độ trong suốt khác nhau, Premultiply Alpha giúp máy tính trộn màu chính xác hơn.

**Ví dụ minh họa khi nội suy (interpolation):**  
- 1 pixel: Đỏ, trong suốt 100% → `(255, 0, 0, 1.0)`  
- 1 pixel: Xanh lá, trong suốt 10% → `(0, 255, 0, 0.1)`  

Khi scale ảnh lên, hai màu này pha trộn ra một màu ở giữa:  
- **Non-Premultiply:** `(127, 127, 0, 0.55)` → bị ám xanh nhiều.  
- **Premultiply Alpha:** `(127, 12, 0, 0.55)` → pha trộn đúng hơn, nghiêng về đỏ.

**Khi nào nên dùng Premultiply Alpha?**

- Khi làm việc với ảnh có độ trong suốt và cần phóng to/thu nhỏ hoặc tạo hiệu ứng mượt mà.  
- Khi cần kết quả pha trộn màu chính xác hơn.  
- Khi render hiệu ứng trong game/web, Premultiply Alpha giúp ảnh trông đúng và đẹp hơn.


## Auto Atlas Asset

Auto Atlas là tính năng giúp gom nhiều hình nhỏ (SpriteFrame) thành một ảnh lớn duy nhất (sprite sheet), tương tự Texture Packer, nhằm tối ưu hiệu suất khi hiển thị nhiều sprite.

**Cách tạo Auto Atlas**

1. Nhấp chuột phải vào thư mục trong **Assets Panel**.  
2. Chọn **Create -> Auto Atlas**.  
3. Một file `.pac` sẽ được tạo, chứa cấu hình của atlas.  
4. Tất cả hình trong thư mục đó (bao gồm cả thư mục con) sẽ được tự động đóng gói thành một ảnh duy nhất khi build.

**Các thiết lập cấu hình**

- **Max Width / Height:** Kích thước tối đa của ảnh atlas.  
- **Padding:** Khoảng cách giữa các sprite.  
- **Allow Rotation:** Cho phép xoay sprite để tối ưu không gian.  
- **Force Squared:** Ép ảnh atlas có tỉ lệ hình vuông.  
- **Power Of Two:** Ép kích thước ảnh là bội số của 2 (tối ưu cho GPU).  
- **Heuristics:** Chiến lược sắp xếp sprite (chọn một trong các thuật toán đóng gói có sẵn).  
- **Padding Bleed:** Tạo viền ngoài 1 pixel sao chép pixel lân cận (tránh lỗi hiển thị viền).  
- **Filter Unused:** Bỏ qua ảnh không dùng (chỉ áp dụng khi build).

**Xem trước kết quả**

- Nhấn nút **Preview** để xem ảnh atlas đã đóng gói.  
- Kết quả hiển thị:  
  - **Packed Textures:** Danh sách ảnh đã được đóng gói.  
  - **Unpacked Textures:** Ảnh quá lớn hoặc không phù hợp, không thể đóng gói.

**Lợi ích**

- Tối ưu hiệu suất hiển thị sprite.  
- Giảm số lượng texture load lên GPU.  
- Tự động đóng gói, không cần thao tác thủ công.

**Quy trình khi build game**

1. Gom các hình nhỏ (SpriteFrame) từ thư mục được chỉ định.  
2. Đóng gói thành một ảnh lớn duy nhất (main atlas image).  
3. Tạo lại từng SpriteFrame bên trong ảnh lớn, giữ nguyên thông tin vị trí (UV), kích thước, trim, v.v.

**Khi chạy game thực tế**
- Engine chỉ tải một ảnh lớn duy nhất (atlas image).  
- Mỗi sprite được "cắt ra" bằng tọa độ UV để hiển thị đúng phần cần thiết trên atlas.


## Size Mode của Sprite

Size Mode là thuộc tính quyết định cách hiển thị kích thước của sprite trong game, gồm 2 chế độ chính:

 **Trimmed Mode**
- Hiển thị sprite dựa trên kích thước thực tế của nội dung hình ảnh
- Tự động loại bỏ các vùng trong suốt (transparent) xung quanh
- Phù hợp khi:
  + Cần hiển thị sprite với kích thước chính xác của nội dung
  + Làm việc với UI elements cần căn chỉnh chính xác
  + Cần tối ưu không gian hiển thị
  + Làm việc với các sprite có nhiều vùng trong suốt

**Raw Mode**
- Hiển thị sprite với kích thước gốc của texture
- Giữ nguyên tất cả các vùng trong suốt xung quanh
- Phù hợp khi:
  + Cần giữ nguyên kích thước gốc của texture
  + Làm việc với sprite sheet hoặc atlas
  + Cần căn chỉnh nhiều sprite với nhau
  + Làm việc với các sprite có kích thước cố định

**So sánh hai chế độ**

| Tiêu chí | Trimmed Mode | Raw Mode |
|----------|--------------|-----------|
| Kích thước hiển thị | Kích thước thực tế của nội dung | Kích thước gốc của texture |
| Vùng trong suốt | Tự động loại bỏ | Giữ nguyên |
| Căn chỉnh | Chính xác theo nội dung | Theo kích thước gốc |
| Tối ưu không gian | Tốt hơn | Kém hơn |
| Phù hợp với | UI elements, sprite riêng lẻ | Sprite sheet, atlas, sprite có kích thước cố định |


# Design Patterns trong Game Development

## 1. Command Pattern
**Là gì?**
- Command Pattern là cách đóng gói một hành động thành một object riêng biệt
- Mỗi command chứa tất cả thông tin cần thiết để thực hiện hành động đó

**Trong game development:**
- Xử lý input từ người chơi (di chuyển, tấn công, nhảy)
- Hệ thống undo/redo trong game (ví dụ: quay lại bước đi trong game cờ)
- Tạo replay system (ghi lại và phát lại các hành động)
- Tạo macro commands (tổ hợp nhiều lệnh, ví dụ: combo moves)
- Queue system cho AI (xếp hàng các hành động của NPC)

## 2. Flyweight Pattern
**Là gì?**
- Flyweight Pattern giúp tối ưu bộ nhớ bằng cách chia sẻ dữ liệu chung giữa nhiều objects
- Tách biệt dữ liệu không thay đổi (intrinsic) và dữ liệu thay đổi (extrinsic)

**Trong game development:**
- Tạo nhiều NPC cùng loại (ví dụ: đám đông trong game)
- Tạo nhiều đối tượng giống nhau (ví dụ: cây, đá, mây)
- Tối ưu bộ nhớ khi có nhiều particle effects
- Tạo tile-based maps (chia sẻ texture giữa các tile)
- Tạo nhiều đạn/bullet trong game bắn súng

## 3. Observer Pattern
**Là gì?**
- Observer Pattern cho phép một object thông báo cho các objects khác khi có thay đổi
- Tạo mối quan hệ một-nhiều giữa subject và observers

**Trong game development:**
- Hệ thống achievement (thông báo khi đạt thành tích)
- UI updates (cập nhật thanh máu, điểm số)
- Event system trong game (ví dụ: khi player chết, khi level up)
- Sound system (phát âm thanh khi có sự kiện)
- Save system (lưu game khi có thay đổi quan trọng)

## 4. State Pattern
**Là gì?**
- State Pattern cho phép một object thay đổi hành vi dựa trên trạng thái hiện tại
- Mỗi trạng thái được đóng gói trong một class riêng

**Trong game development:**
- Quản lý trạng thái nhân vật (idle, running, jumping, attacking)
- Quản lý trạng thái game (menu, playing, paused, game over)
- AI behavior (patrol, chase, attack, flee)
- Boss fight phases (different attack patterns)
- Weapon states (reloading, shooting, empty)

## 5. Singleton Pattern
**Là gì?**
- Singleton Pattern đảm bảo một class chỉ có một instance duy nhất
- Cung cấp điểm truy cập global đến instance đó

**Trong game development:**
- Game Manager (quản lý trạng thái game, scenes)
- Audio Manager (quản lý âm thanh, music)
- Resource Manager (quản lý assets, loading)
- Save System (lưu/đọc dữ liệu game)
- Input Manager (xử lý input từ người chơi)

