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
