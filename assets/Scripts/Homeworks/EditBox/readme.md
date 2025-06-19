# Quản lý tài nguyên Scene và Node tồn tại (Persistent Nodes)

Động cơ (engine) chỉ chạy một scene tại một thời điểm. Khi chuyển đổi giữa các scene, tất cả các node và các đối tượng khác trong scene sẽ bị hủy theo mặc định.

## 🧩 Giữ lại dữ liệu giữa các scene

Trong một số trường hợp, nhà phát triển cần một component để điều khiển việc tải tất cả các scene, hoặc để truyền dữ liệu giữa các scene. Lúc này, bạn có thể đánh dấu node chứa component đó là một node tồn tại (Persistent Node) để nó không bị hủy khi chuyển scene, và vẫn giữ lại trong bộ nhớ.

### ✅ Ví dụ:

```typescript
director.addPersistRootNode(myNode);
```

Lệnh trên sẽ biến `myNode` thành một Persistent Node, vì vậy các component gắn trên node đó vẫn sẽ hoạt động sau khi chuyển scene.

**Ứng dụng phổ biến:** Dùng để lưu thông tin người chơi, hoặc các dữ liệu cần thiết để khởi tạo scene tiếp theo.

### 🔔 Lưu ý:
Node được chỉ định phải là node gốc (root node) trong hệ thống phân cấp (hierarchy), nếu không, việc thiết lập sẽ không có hiệu lực.

## ❌ Hủy việc giữ lại node (bỏ chế độ Persistent)

Cách hủy rất đơn giản:

```typescript
director.removePersistRootNode(myNode);
```

**📌 Lưu ý:** API trên không hủy node ngay lập tức, mà chỉ khôi phục node đó về dạng node thông thường – có thể bị hủy khi scene chuyển đổi.

## 🔄 Callback khi load scene

Khi load một scene, bạn có thể truyền thêm một hàm callback sẽ được gọi sau khi scene được tải xong. Ví dụ:

```typescript
director.loadScene("MyScene", onSceneLaunched);
```

Trong đó, `onSceneLaunched` là một hàm callback khai báo trong script hiện tại, thường dùng để khởi tạo thêm hoặc chuyển dữ liệu sau khi scene mới được tải.

### 🧠 Lưu ý:
Vì callback phải được khai báo trong cùng script, cách dùng phổ biến là gắn script vào Persistent Node, giúp giữ callback hoạt động sau khi load scene.

## 🕹️ Tải trước (preload) một scene

`director.loadScene` sẽ tự động chuyển sang scene mới sau khi tải xong. Nếu bạn muốn tải trước scene ở chế độ nền và tự quyết định khi nào chuyển, hãy dùng `preloadScene`:

### ✅ Ví dụ tải trước:

```typescript
director.preloadScene("table", function () {
    console.log('Scene tiếp theo đã được tải trước');
});
```

### 🔁 Chuyển scene khi thích hợp:

```typescript
director.loadScene("table");
```

### 💡 Lưu ý:
Nếu việc preload chưa hoàn tất, gọi `loadScene()` vẫn có tác dụng — scene sẽ bắt đầu sau khi tải xong.

