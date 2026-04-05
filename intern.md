# Nội dung phỏng vấn vị trí intern web:

1. **Kiến thức trọng tâm về Node.js(important)**
   1. **Khái niệm cơ bản:**
      * **Node.js** là một Runtime Environment (môi trường chạy mã) dựa trên Chorme V8 engine, không phải là ngôn ngữ lập trình hay framework.
      * **Single-threaded & event-loop:** Node.js chạy đơn luồng.
      * **I/O (input/output)** : quá trình trao đổi dữ liệu với bên ngoài (đọc file, truy vấn database, gọi API).
      * **Non-blocking I/O**: cơ chế " không chờ đợi ". Gửi yêu cầu I/O đi làm việc khác ngay lập tức.
      * **Event Loop**: vòng lặp điều phối các callback. gồm các phase (giai đoạn) chính: Timer -> Poll (I/O) -> Check(setimmediate).
      * **Libuv:** Thư viện C++ giúp Node.js xử lý các tác vụ nặng thông qua  Thread Pool .
   2. **JavaScript & Asynchronous (Nền tảng ngôn ngữ)**.
      * Asysnc/Await & Promise: cách viết code hiện đại để xử lý các tác vụ cần thời gian chờ (Như lấy dữ liệu từ MongoDB):
        * quá trình lấy dữ liệu từ API hay Database là tác vụ I/O tốn thời gian. Nếu chúng ta viết code đồng bộ thông thường, luồng chính sẽ bị nghẽn (Blocking).
        * Khi dùng  **Async/Await** , chúng ta tạo ra một cơ chế  **'Chờ không chặn' (Non-blocking wait)** .
          * **Về mặt lập trình:** `await` giúp code trông giống như đang dừng lại để đợi dữ liệu, giúp chúng ta dễ đọc và quản lý biến hơn so với dùng Callback hay Promise thuần.
          * **Về mặt hệ thống:** Khi gặp `await`, Node.js sẽ tạm treo hàm đó lại, giải phóng luồng chính (Event Loop) để nó đi xử lý các Request khác của người dùng. Khi API trả về kết quả, Event Loop mới quay lại chạy tiếp các dòng code sau `await.`
      * Microtask Queue: Thứ tự ưu tiên xử lý (process.nextTick > Promise > SetTimeout).
      * Middleware: Các hàm trung gian trong Express.js dùng để xử lý Request trước khi đến Controller(Ví dụ checkLogin , Logdata).
   3. **Database & System Architecture (Cấu trúc dự án)**
      * Mô hình MVC:
        * Model: Định nghĩa cấu trúc dữ liệu (Mongoose Schema)
        * View: Dữ liệu trả về (JSON cho Frontend).
        * Controller: Xử lý logic nghiệp vụ
      * MongoDB & Mongoose:
        * NoSQL: linh hoạt hơn SQL.
        * Indexing: giúp tìm kiếm dữ liệu cực nhanh
        * Relationship: Embedding (Nhúng) vs Referencing (Tham chiếu/populate).
      * RESTful API: Các phương thức GET. POST, PUT, DELETE và các mã trạng thái (Status Codes) như 200, 400. 404. 500:
        * **RESTful API** không chỉ là các đường dẫn, mà là một **bộ quy tắc giao tiếp** giữa Client (Trình duyệt, Mobile app) và Server.
        * **RESTful API** giống như một  **Menu trong nhà hàng** : Bạn (Client) đưa ra yêu cầu theo đúng mẫu, và Bồi bàn (Server) sẽ trả về món ăn cùng một mẩu giấy ghi trạng thái.
        * **Các phương thức (HTTP Methods):** đây là hành động bạn muốn thực hiện với dữ liệu (Thường gọi là Resources - tài nguyên)
          * GET: lấy data về ; ex: lấy danh sách sản phẩm...
          * POST: tạo mới data ;  ex: Đăng ký, Đăng 1 bài viết mới...
          * PUT: Cập nhật toàn bộ dữ liệu ; ex: thay đổi toàn bộ thông tin trang cá nhân.
          * PATCH: Cập nhật một phần: Chỉ thay đổi mỗi cái "password" -> ít tốn tài nguyên hơn PUT
          * DELETED: Xóa dữ liệu. ; ex: Xóa một sản phẩm khỏi giỏ hàng.
        * **Mã trạng thái(HTTP Status Codes):** Đây là cách server trả lời: "Việc bạn nhờ tôi làm kết quả thế nào?": có 5 nhóm chính
          * Nhóm 2xx:
            * 200 - OK: mọi thứ đều ổn. (Dùng cho GET, PUT , PATCH).
            * 201 - Created: Đã tạo thành công. (Dùng cho POST).
          * Nhóm 4xx:
            * 400 Bad Request: Yêu cầu không hợp lệ (ex: Đăng ký mà thiếu mật khẩu). (400 khi dữ liệu người dùng gửi lên không đúng định dạng (thiếu trường, sai kiểu dữ liệu).)
            * 401 Unauthorized: Bạn chưa đăng nhập nên không có quyền xem.
            * 403 Forbidden: Đã đăng nhập nhưng không đủ quyền (ex: User thường req vào trang Admin).
            * 404 Not Found: Không tìm thấy đường dẫn hoặc dữ liệu này (ex: ID sản phẩm này không tồn tại).
          * Nhóm 5xx:
            * 500 Internal Server Error: Code của bạn bị Crash, lỗi logic ở Backend. (**500** là khi dữ liệu người dùng gửi lên có thể đúng, nhưng code Backend của em xử lý bị lỗi hoặc Database bị sập)
            * 502 Bad Gateway : Server trung gian không kết nối được Server chính.
