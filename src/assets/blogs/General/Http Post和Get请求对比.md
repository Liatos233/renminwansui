### GET 请求

- 从服务器请求获取数据
- 数据通过 URL 的查询参数发送`params`，参数会显示在浏览器的地址栏中。
- 通常受到数据量限制，因为数据附加在 URL 上，受到浏览器和服务器强制的长度限制。
- 幂等的，即多个相同的请求会产生与单个请求相同的效果。
- 会主动缓存 cache
- 产生一个 TCP 数据包：浏览器会把 http header 和 data 一并发送出去，服务器响应 200（返回数据）
  示例：

```http
GET /api/users?id=123 HTTP/1.1
Host: example.com
```

### POST 请求

- 提交要处理的数据
- 数据通过请求主体（Request Body）发送`data`。
- 可以发送比 GET 更大量的数据，因为数据不受 URL 长度限制。
- 非幂等的，即多个相同的请求可能会产生不同的效果或在服务器上创建多个资源。
- 除非手动设置，否则不会缓存
- 产生两个 TCP 数据包：浏览器先发送 header，服务器响应 100 continue，浏览器再发送 data，服务器响应 200 ok（返回数据）

```http
Copy code
POST /api/users HTTP/1.1
Host: example.com
Content-Type: application/json

{
"name": "John Doe",
"email": "john@example.com"
}
```
