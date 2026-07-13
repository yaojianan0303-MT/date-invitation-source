# 互动约会邀请网页

这是一个无需后端、无需数据库的独立静态网页项目，电脑和手机浏览器都可以使用。

## 项目结构

```text
<项目文件夹>/
├── index.html                 # 网页入口
├── styles.css                # 页面样式与手机适配
├── app.js                    # 五步交互逻辑
└── assets/
    └── dog-avatar.png        # 狗狗头像素材
```

## 本地打开

直接双击 `index.html` 即可预览，无需安装依赖。

## 发布为免费公开链接

1. 登录自己的 GitHub 账号，新建一个公开仓库，例如 `date-invitation`。
2. 把 `index.html`、`styles.css`、`app.js` 和 `assets` 文件夹完整上传到仓库根目录。
3. 打开仓库的 `Settings` → `Pages`。
4. 在发布来源中选择 `Deploy from a branch`，分支选择 `main`，目录选择 `/ (root)`。
5. 保存并等待约一分钟，页面会显示可访问的公开链接。

公开链接中的主机名前缀由账号名决定。例如仓库名是 `date-invitation`，访问地址通常为：

```text
https://<你的账号名>.github.io/date-invitation/
```

## 修改内容

- 约会文案、餐食选项和默认时间：修改 `app.js`。
- 颜色、字号、卡片尺寸和手机样式：修改 `styles.css`。
- 狗狗头像：替换 `assets/dog-avatar.png`，保持文件名不变即可。
