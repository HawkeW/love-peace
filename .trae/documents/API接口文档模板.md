# API 接口文档模板

## 约定
- 基础路径：`/api`
- 响应头：`Content-Type: application/json`
- 错误：`application/problem+json`
- 版本：`X-API-Version: v1`

## 资源
### GET /api/albums
- 请求：无
- 响应：
```json
{ "data": [{ "id": "a1", "title": "法式轻奢", "categoryId": "outdoor", "coverImage": "/images/a1.jpg" }], "meta": { "count": 1 } }
```

### GET /api/photos?albumId={id}&page={n}
- 请求参数：`albumId`、`page`
- 响应：
```json
{ "data": [{ "id": "p1", "albumId": "a1", "src": "/images/p1.jpg", "width": 1600, "height": 1067 }], "meta": { "page": 1, "pageSize": 20, "total": 100 } }
```

### POST /api/metrics
- 请求体：
```json
{ "name": "LCP", "value": 2100, "id": "v1-..." }
```
- 响应：`{ "status": "ok" }`

### 预留：GET /api/invitations/{id}
- 响应示例：`{ "id": "inv1", "title": "结婚请柬", "status": "draft" }`

### 预留：POST /api/reservations
- 请求体示例：`{ "clientName": "张三", "phone": "138...", "date": "2025-02-14T10:00:00Z" }`
- 响应：`{ "id": "r1", "status": "pending" }`

### 预留：GET /api/auth/wechat/init
- 响应示例：`{ "authorize_url": "https://open.weixin.qq.com/..." }`

