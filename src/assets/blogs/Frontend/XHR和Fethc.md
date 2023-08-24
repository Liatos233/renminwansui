![XHR和Fetch对比](https://imgur.com/yq1yBQc.jpg)

#### XHR

- XMLHttpRequest 浏览器原生提供的 API
- 总是发送 cookie
- 可以监控请求进度
- 会在出现错误时 reject
- 可以设置响应类型（text、json、blob 等）
-

#### Fetch

- ES6 新增的基于 Promise 的 Ajax 请求 API
- 默认不会发送 cookie 除非设置 credentials
- 不能监控请求进度
- 只会在网络错误时 reject Promise，其他错误都会被视为成功的响应，需要手动判断
- 需要手动解析响应
