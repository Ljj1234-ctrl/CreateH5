# 运营活动页搭建平台（Demo）

给小团队用的活动页配置工具：在后台配置文案/图片/按钮跳转，一键生成 H5 页面。

## 功能

- **活动模板**：内置 6 套模板（报名 / 投票 / 抽奖 / 下载 / 领券 / 通用）
- **配置后台**：新建、编辑、保存、预览、发布
- **H5 渲染页**：`/h5/:id` 根据配置渲染活动页（手机样式）
- **通用能力封装**：上传（图片）、预览弹窗、Toast、loading/empty
- **接口联调（本地 Express）**
  - 获取配置：`GET /api/config/:id`
  - 保存配置：`PUT /api/config/:id`
  - 发布预览：`POST /api/publish/:id`
  - 列表：`GET /api/list`
  - 上传：`POST /api/upload`（multer 落盘到 `server/uploads`，通过 `/uploads/*` 访问）

## 启动

```bash
npm install
npm run dev
```

启动后查看终端输出的前端地址（一般是 `http://localhost:5176/` 之类），打开即可。

## 说明

- 这是一个课程设计的 Demo：投票、抽奖等，配置数据落到本地 `server/data/db.json`。

