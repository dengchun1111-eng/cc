# Foundation Mock Server (Express)

这是一个最小可运行的 Mock server，用于前端本地联调 /api/foundations 接口。

快速上手：
1. 创建目录并保存文件：
   - package.json
   - server.js
   - data/mock_db.json
   - README.md

2. 安装依赖并启动：
   ```bash
   npm install
   npm start
   ```

3. 默认运行在 http://localhost:5002

可用示例请求：
- GET /api/foundations/fnd_001/transparency
- GET /api/foundations/fnd_001/financials
- GET /api/foundations/fnd_001/financials?year=2024
- GET /api/foundations/fnd_001/summary

示例 curl：
```bash
curl http://localhost:5002/api/foundations/fnd_001/transparency
curl http://localhost:5002/api/foundations/fnd_001/financials?year=2024
```

定制说明：
- 若需更多 mock 基金会，请向 `data/mock_db.json` 的 `foundations` 数组追加对象。
- 若你希望用 json-server，我可以把同样的数据转换成 json-server 配置并给出启动命令。
- 我也可以把此 mock server 改为 TypeScript 版或加上更多模拟错误/延迟场景（供前端测试 loading /retry）。
