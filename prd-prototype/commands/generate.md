# generate 命令 - 生成交互原型

## 功能说明

从 PRD 文档生成交互式多页面原型。

## ⚠️ 重要：必须与用户交互

**禁止跳过以下步骤，必须逐一与用户确认：**

1. ✅ 步骤 1：确认产物路径 - 必须询问用户是否确认
2. ✅ 步骤 4：确定主题色和风格 - 必须展示推荐并询问用户选择
3. ✅ 步骤 5：选择技术栈 - 必须询问用户选择哪个技术栈

**如果用户没有明确选择，必须停下来询问，不能自动推进流程。**

---

## 工作流程

### 步骤 1：检查 PRD 文档并确定产物路径

检查项目目录下是否存在 PRD 文档：
- `prd/main_prd.md` - 主 PRD 文档
- `prd/modules/` - 模块 PRD 目录

**产物路径规则**：
```
PRD 文档位置        → 原型产物位置
prd/                → prd/prototype/
```

**如果没有 PRD 文档**：
> ⚠️ 未找到 PRD 文档。请先使用 `/prd-suite` 技能创建 PRD 文档。

**⚠️ 必须询问用户确认**：
```
📂 检测到 PRD 文档位置：prd/
📂 原型将生成到：prd/prototype/

确认生成原型？[确认/取消]
```

> **注意**：如果 `prd/prototype/` 目录已存在，会询问是否覆盖。

### 步骤 2：读取并分析 PRD

读取主 PRD 和相关模块 PRD，提取以下信息：

1. **功能模块清单** → 主要页面列表
2. **业务流程** → 页面跳转关系
3. **用户角色** → 权限和导航菜单
4. **详细功能需求** → 页面元素

### 步骤 3：生成页面规划

基于 PRD 分析，生成页面规划文档。

## ⚠️ 核心原则（必须遵守）

### 原则一：一个功能模块 = 一个页面

**禁止过度拆分**：新增、编辑、详情、删除等操作都在同一个页面内通过弹窗完成，不要生成独立页面。

```
❌ 错误做法（过度拆分）：
用户管理模块生成 5 个页面：
- user-list.html      (列表)
- user-add.html       (新增)
- user-edit.html      (编辑)
- user-detail.html    (详情)
- user-delete.html    (删除确认)

✅ 正确做法（模块合一）：
用户管理模块生成 1 个页面：
- user-management.html  (列表 + 弹窗实现新增/编辑/详情/删除)
```

### 原则二：弹窗优先

**页面内交互用弹窗**：所有 CRUD 操作都通过弹窗（Modal）完成，不跳转页面。

| 操作 | 实现方式 | 示例 |
|------|----------|------|
| 新增 | 弹窗表单 | 点击"新增"按钮 → 打开弹窗填写表单 |
| 编辑 | 弹窗表单 | 点击"编辑"按钮 → 打开弹窗编辑数据 |
| 详情 | 弹窗/抽屉 | 点击"查看"按钮 → 打开弹窗展示详情 |
| 删除 | 确认弹窗 | 点击"删除"按钮 → 弹窗确认后执行 |
| 筛选 | 弹窗/侧边栏 | 点击"筛选"按钮 → 弹窗选择条件 |

### 原则三：完整导航结构

**每个页面必须包含**：
- Logo（点击返回首页/dashboard）
- 侧边栏导航菜单（所有模块入口）
- 顶部导航栏（用户信息、通知等）
- 面包屑导航

### 原则四：页面内容必须完整

**禁止偷懒**：
- ❌ 不得使用 alert()、confirm()、prompt()
- ❌ 不得使用占位文字（"此处显示表格"）
- ❌ 不得生成空白或骨架页面
- ✅ 必须生成完整的 UI 组件
- ✅ 表格必须有表头 + 至少 3 条数据
- ✅ 表单必须有完整字段

---

## 页面规划示例

```
页面规划：

1. 首页/登录页 (index.html)
   - 功能：用户登录
   - 跳转：登录成功 → dashboard.html
   - 元素：完整登录表单

2. 仪表盘 (dashboard.html)
   - 功能：数据概览、快捷入口
   - 跳转：点击模块卡片 → 对应模块页面
   - 元素：统计卡片、快捷入口、侧边栏导航
   - 导航：Logo 点击返回首页

3. 用户管理 (user-management.html) ← 一个页面包含所有操作
   - 功能：用户列表、新增、编辑、查看详情、删除、搜索、筛选
   - 弹窗：
     - 新增用户弹窗（完整表单）
     - 编辑用户弹窗（完整表单，带默认值）
     - 用户详情弹窗/抽屉（完整信息展示）
     - 删除确认弹窗
   - 元素：表格（含操作列）、搜索框、筛选按钮、新增按钮
   - 导航：Logo 点击返回 dashboard，侧边栏菜单

4. 订单管理 (order-management.html)
   - 功能：订单列表、查看详情、取消订单、导出
   - 弹窗：
     - 订单详情弹窗/抽屉
     - 取消订单确认弹窗
   - 元素：表格、筛选条件、导出按钮
   - 导航：完整导航结构

5. 系统设置 (settings.html)
   - 功能：基础设置、通知设置、安全设置
   - 弹窗：按需
   - 元素：Tab 切换 + 设置表单
   - 导航：完整导航结构
```

---

## 页面数量对照

| PRD 功能模块 | 生成页面数 | 实现方式 |
|-------------|-----------|----------|
| 用户管理 | 1 个 | user-management.html（列表 + 弹窗） |
| 订单管理 | 1 个 | order-management.html（列表 + 弹窗/抽屉） |
| 商品管理 | 1 个 | product-management.html（列表 + 弹窗） |
| 数据统计 | 1 个 | statistics.html（图表 + 筛选） |
| 系统设置 | 1 个 | settings.html（Tab 切换） |

**不要生成的页面**：
- ❌ xxx-add.html
- ❌ xxx-edit.html
- ❌ xxx-detail.html
- ❌ xxx-delete.html
- ❌ xxx-confirm.html

---

### 步骤 4：生成设计体系

**⚠️ 必须展示给用户确认，不能自动跳过！**

根据 PRD 内容分析项目类型，自动生成完整的设计体系，展示给用户确认。

#### 4.1 分析项目类型

根据 PRD 中的项目描述、功能模块、目标用户等信息，判断项目类型：

| 项目类型 | 特征关键词 | 推荐风格 | 推荐主题色 |
|---------|-----------|----------|------------|
| **企业管理系统** | ERP、CRM、OA、后台管理、内部系统 | 商务简约 | 商务蓝 |
| **电商/零售** | 商品、订单、购物车、支付、库存 | 清新活力 | 电商橙 |
| **金融/支付** | 银行、理财、借贷、交易、账单 | 专业稳重 | 金融绿 |
| **医疗健康** | 医院、诊所、健康、预约、问诊 | 专业稳重 | 医疗绿 |
| **教育培训** | 课程、学习、考试、培训、学员 | 清新活力 | 教育蓝 |
| **社交/社区** | 聊天、动态、圈子、评论、分享 | 清新活力 | 活力紫 |
| **物流/供应链** | 仓储、配送、运输、跟踪、调度 | 商务简约 | 物流橙 |
| **数据可视化** | 报表、大屏、监控、分析、统计 | 科技现代 | 科技蓝 |
| **SaaS 工具** | 协作、项目、文档、效率、办公 | 商务简约 | 科技蓝 |

#### 4.2 自动生成设计体系

根据项目类型自动生成完整设计体系，包含：

**一、设计风格定义**

| 参数 | 商务简约 | 科技现代 | 清新活力 | 专业稳重 |
|------|----------|----------|----------|----------|
| 圆角大小 | 4px（方正） | 8px（适中） | 12px（圆润） | 4px（方正） |
| 阴影风格 | 浅灰轻阴影 | 蓝色光晕阴影 | 彩色柔和阴影 | 深灰立体阴影 |
| 边框风格 | 1px 实线 | 无边框或渐变边框 | 2px 圆角边框 | 1px 深色边框 |
| 间距节奏 | 紧凑（16px） | 适中（20px） | 宽松（24px） | 紧凑（16px） |

**二、色彩体系**

| 色彩角色 | 色值生成规则 |
|----------|--------------|
| 主色 | 用户确认的主题色 |
| 主色悬停 | 主色 + 亮度 10% |
| 主色浅底 | 主色 + 透明度 10% |
| 成功色 | #52c41a（固定） |
| 警告色 | #faad14（固定） |
| 错误色 | #ff4d4f（固定） |
| 标题色 | #262626（固定） |
| 正文色 | #595959（固定） |
| 辅助色 | #8c8c8c（固定） |
| 边框色 | #d9d9d9（固定） |
| 背景色 | #f5f5f5（固定） |
| 卡片背景 | #ffffff（固定） |

**三、字体排版体系**

| 层级 | 字号 | 行高 | 字重 | 用途 |
|------|------|------|------|------|
| H1 | 24px | 32px | 600 | 页面标题 |
| H2 | 20px | 28px | 600 | 卡片标题 |
| H3 | 16px | 24px | 600 | 小标题 |
| 正文 | 14px | 22px | 400 | 正文内容 |
| 辅助 | 12px | 20px | 400 | 辅助说明 |
| 按钮 | 14px | - | 500 | 按钮文字 |

**四、组件风格预设**

| 组件 | 商务简约 | 科技现代 | 清新活力 | 专业稳重 |
|------|----------|----------|----------|----------|
| 主按钮 | 实心主色+4px圆角 | 渐变主色+8px圆角 | 实心主色+12px圆角 | 实心主色+4px圆角 |
| 次按钮 | 白底+1px边框 | 透明+渐变边框 | 白底+2px彩色边框 | 白底+1px深色边框 |
| 卡片 | 白底+轻阴影+1px边框 | 深色底+光晕阴影 | 白底+彩色阴影+无框 | 白底+立体阴影+1px边框 |
| 输入框 | 1px边框+4px圆角 | 无边框+底部线 | 2px边框+12px圆角 | 1px深色边框+4px圆角 |
| 表格 | 实线边框+斑马纹 | 无边框+悬停高亮 | 圆角卡片式 | 实线边框+紧凑 |

#### 4.3 展示设计体系并确认

**⚠️ 必须展示完整设计体系，等待用户确认！**

```
📊 分析 PRD 内容...

项目类型：企业管理系统（后台管理）
识别关键词：用户管理、权限管理、数据统计、系统设置

🎨 自动生成设计体系：

【设计风格】商务简约
├── 圆角：4px（方正）
├── 阴影：浅灰轻阴影
├── 边框：1px 实线
└── 间距：紧凑（16px）

【主题色】商务蓝 #1890ff

【色彩体系】
├── 主色：#1890ff
├── 主色悬停：#40a9ff
├── 主色浅底：#e6f4ff
├── 成功色：#52c41a
├── 警告色：#faad14
├── 错误色：#ff4d4f
├── 标题色：#262626
├── 正文色：#595959
├── 辅助色：#8c8c8c
├── 边框色：#d9d9d9
├── 背景色：#f5f5f5
└── 卡片背景：#ffffff

【字体排版】
├── H1 页面标题：24px / 32px / 600
├── H2 卡片标题：20px / 28px / 600
├── H3 小标题：16px / 24px / 600
├── 正文内容：14px / 22px / 400
├── 辅助说明：12px / 20px / 400
└── 按钮文字：14px / 500

【组件风格】
├── 主按钮：实心主色 + 4px圆角
├── 次按钮：白底 + 1px边框
├── 卡片：白底 + 轻阴影 + 1px边框
├── 输入框：1px边框 + 4px圆角
└── 表格：实线边框 + 斑马纹

─────────────────────────

请确认设计方案：

1. ✅ 确认使用以上设计
2. 🎨 修改主题色（当前：商务蓝 #1890ff）
3. 🔄 切换设计风格（当前：商务简约）
4. ❌ 取消操作
```

#### 4.4 用户修改选项

**选项 2：修改主题色**

```
请选择主题色：

1. 商务蓝 #1890ff（当前）
2. 科技蓝 #1677ff
3. 金融绿 #52c41a
4. 医疗绿 #00a870
5. 电商橙 #ff6b00
6. 活力紫 #722ed1
7. 教育蓝 #2f54eb
8. 物流橙 #fa8c16
9. 自定义颜色值（如 #ff0000）

请输入选项数字：
```

用户选择后，重新生成色彩体系并展示确认。

**选项 3：切换设计风格**

```
请选择设计风格：

1. 商务简约（当前）- 方正、轻阴影、紧凑，适合企业管理
2. 科技现代 - 渐变、光晕、适中，适合数据平台
3. 清新活力 - 圆润、彩色阴影、宽松，适合社交教育
4. 专业稳重 - 方正、立体阴影、紧凑，适合金融医疗

请输入选项数字：
```

用户选择后，重新生成组件风格并展示确认。

#### 4.5 确认后保存设计体系

用户确认后，将设计体系保存到变量中，供后续页面生成使用。

---

### 步骤 5：选择技术栈

**⚠️ 必须使用 AskUserQuestion 工具询问用户选择！**

询问用户选择原型技术栈：

```
请选择原型技术栈：

1. HTML + Tailwind CSS - 快速、轻量、无需构建
2. React + shadcn/ui + Tailwind - 现代化组件、美观实用

请输入选项数字（1/2）：
```

| 选项 | 技术栈 | 特点 |
|------|--------|------|
| 1 | **HTML + Tailwind CSS** | 快速、轻量、无需构建 |
| 2 | **React + shadcn/ui + Tailwind** | 现代化组件、美观实用、高度可定制 |

---

## 🎨 统一使用 Lucide 图标

**所有技术栈统一使用 Lucide 图标库**，保持视觉一致性。

### Lucide 图标 CDN

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
```

### 常用图标名称对照表

| 场景 | Lucide 图标名 | 用途 |
|------|--------------|------|
| 首页 | `home` | 面包屑、返回首页 |
| 仪表盘 | `layout-dashboard` | 仪表盘菜单 |
| 用户 | `users` | 用户管理菜单 |
| 订单 | `shopping-bag` | 订单管理菜单 |
| 设置 | `settings` | 系统设置菜单 |
| 新增 | `plus` | 新增按钮 |
| 编辑 | `pencil` | 编辑按钮 |
| 删除 | `trash-2` | 删除按钮 |
| 查看 | `eye` | 查看详情按钮 |
| 搜索 | `search` | 搜索按钮 |
| 通知 | `bell` | 通知图标 |
| 用户头像 | `user` | 用户头像 |
| Logo | `box` | 项目 Logo |

---

### 步骤 6：创建项目目录

创建原型项目目录结构（**所有页面平铺，无子目录**）：

```
prd/prototype/                # 原型目录（固定路径）
├── index.html              # 首页/登录页
├── dashboard.html          # 仪表盘
├── user-management.html    # 用户管理页面
├── order-management.html   # 订单管理页面
├── settings.html           # 系统设置页面
└── ...                     # 其他功能模块页面
```

> **⚠️ 重要**：所有页面都直接放在 `prd/prototype/` 目录下，不要创建 `pages/` 子目录。

---

## ⚠️ 页面跳转规则（重要）

### 简单规则：所有页面同级，直接写文件名

由于所有页面都在同一目录下，跳转链接非常简单：

```html
<!-- 从任何页面跳转到其他页面，直接写文件名 -->
<a href="dashboard.html">仪表盘</a>
<a href="user-management.html">用户管理</a>
<a href="order-management.html">订单管理</a>
<a href="settings.html">系统设置</a>

<!-- 登录页跳转到仪表盘 -->
<form action="dashboard.html">
<!-- 或 -->
<a href="dashboard.html">登录</a>
```

### 链接写法对照表

| 当前页面 | 目标页面 | 链接写法 |
|---------|---------|---------|
| index.html | dashboard.html | `href="dashboard.html"` |
| index.html | user-management.html | `href="user-management.html"` |
| dashboard.html | user-management.html | `href="user-management.html"` |
| user-management.html | dashboard.html | `href="dashboard.html"` |
| user-management.html | settings.html | `href="settings.html"` |

### ❌ 常见错误

```html
<!-- ❌ 错误：不要加 pages/ 前缀 -->
<a href="pages/user-management.html">用户管理</a>

<!-- ❌ 错误：不要用 ../ 返回上级 -->
<a href="../dashboard.html">返回</a>

<!-- ✅ 正确：直接写文件名 -->
<a href="user-management.html">用户管理</a>
<a href="dashboard.html">返回</a>
```

---

### 步骤 7：生成页面内容

按页面规划逐个生成。

## ⚠️ 页面结构要求

### 每个页面必须包含的完整结构

```
┌─────────────────────────────────────────────────────────────┐
│  Logo      导航菜单                    用户头像 | 通知 | 退出 │ ← 顶部导航栏
├──────────┬──────────────────────────────────────────────────┤
│          │  面包屑：首页 > 当前页面                          │
│  侧边栏   ├──────────────────────────────────────────────────┤
│          │                                                  │
│  - 仪表盘 │                                                  │
│  - 用户   │                                                  │
│  - 订单   │              页面主要内容                        │
│  - 商品   │                                                  │
│  - 设置   │                                                  │
│          │                                                  │
└──────────┴──────────────────────────────────────────────────┘
```

### 必须包含的元素

| 元素 | 要求 | 示例 |
|------|------|------|
| Logo | 点击返回 dashboard | `<a href="dashboard.html">项目名称</a>` |
| 侧边栏菜单 | 包含所有模块入口，当前页高亮 | 仪表盘、用户管理、订单管理... |
| 顶部导航 | 用户信息、通知、退出等 | 头像 + 用户名 + 下拉菜单 |
| 面包屑 | 显示当前位置 | 首页 > 用户管理 |
| 主内容区 | 完整的功能 UI | 表格 + 按钮 + 弹窗 |

---

## 弹窗实现要求

### HTML + Tailwind CSS

```html
<!-- 弹窗遮罩 -->
<div id="modal-overlay" class="fixed inset-0 bg-black/50 hidden z-50" onclick="closeAllModals()"></div>

<!-- 新增弹窗 -->
<div id="add-modal" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-[600px] hidden z-50">
    <div class="p-4 border-b flex justify-between items-center">
        <h3 class="text-lg font-semibold">新增用户</h3>
        <button onclick="closeModal('add-modal')" class="text-gray-400 hover:text-gray-600">✕</button>
    </div>
    <form class="p-4 space-y-4">
        <!-- 表单字段 -->
    </form>
</div>

<script>
function openModal(id) {
    document.getElementById('modal-overlay').classList.remove('hidden');
    document.getElementById(id).classList.remove('hidden');
}
function closeModal(id) {
    document.getElementById('modal-overlay').classList.add('hidden');
    document.getElementById(id).classList.add('hidden');
}
function closeAllModals() {
    document.getElementById('modal-overlay').classList.add('hidden');
    document.querySelectorAll('[id$="-modal"]').forEach(m => m.classList.add('hidden'));
}
</script>
```

### React + shadcn/ui + Tailwind

shadcn/ui 使用 Radix UI 原语 + Tailwind CSS 样式，组件美观且高度可定制。

**基础组件**：

| 功能 | 组件 |
|------|------|
| 按钮 | `<Button variant="primary/secondary/outline/destructive/ghost/link" size="sm/default/lg/icon">` |
| 输入框 | `<Input placeholder="请输入" icon={<Icon.Search />} />` |
| 文本域 | `<Textarea placeholder="请输入" />` |
| 标签 | `<Label required>用户名</Label>` |
| 卡片 | `<Card><CardHeader><CardTitle><CardDescription><CardContent><CardFooter>` |
| 徽章 | `<Badge variant="default/secondary/success/warning/destructive/outline">正常</Badge>` |
| 头像 | `<Avatar size="sm/default/lg"><AvatarFallback>管</AvatarFallback></Avatar>` |
| 分隔线 | `<Separator orientation="horizontal/vertical" />` |
| 骨架屏 | `<Skeleton className="h-4 w-48" />` |
| 加载动画 | `<Spinner size="sm/default/lg" />` |
| 空状态 | `<Empty title="暂无数据" description="点击新增" action={<Button>新增</Button>} />` |
| 键盘按键 | `<Kbd>Ctrl</Kbd>` |

**表单组件**：

| 功能 | 组件 |
|------|------|
| 下拉选择 | `<Select options={[{value, label}]} value={} onChange={} />` |
| 原生选择 | `<NativeSelect options={[{value, label}]} value={} onChange={} />` |
| 复选框 | `<Checkbox checked={} onChange={} label="同意" />` |
| 复选框组 | `<CheckboxGroup options={[]} value={[]} onChange={} />` |
| 单选框 | `<Radio checked={} onChange={} label="选项" />` |
| 单选框组 | `<RadioGroup options={[]} value={} onChange={} />` |
| 开关 | `<Switch checked={} onChange={} />` |
| 滑块 | `<Slider value={} onChange={} min={0} max={100} />` |
| 日期选择 | `<DatePicker value={} onChange={} />` |
| 时间选择 | `<TimePicker value={} onChange={} />` |
| 日期时间 | `<DateTimePicker value={} onChange={} />` |
| OTP输入 | `<InputOTP length={6} value={} onChange={} />` |
| 切换按钮 | `<Toggle pressed={} onPressedChange={}>{children}</Toggle>` |
| 切换按钮组 | `<ToggleGroup type="single/multiple" options={[]} value={} onChange={} />` |

**数据展示组件**：

| 功能 | 组件 |
|------|------|
| 表格 | `<Table><TableHeader><TableBody><TableRow><TableHead><TableCell>` |
| 进度条 | `<Progress value={50} max={100} />` |
| 分页 | `<Pagination current={1} total={100} pageSize={10} onChange={} />` |
| 面包屑 | `<Breadcrumb items={[{label, href}]} />` |

**导航组件**：

| 功能 | 组件 |
|------|------|
| 标签页 | `<Tabs value={} onChange={}><TabsList><TabsTrigger>` + `<TabsContent>` |
| 手风琴 | `<Accordion><AccordionItem><AccordionTrigger><AccordionContent>` |

**反馈组件**：

| 功能 | 组件 |
|------|------|
| 弹窗 | `<Dialog open={} onOpenChange={}><DialogHeader><DialogTitle><DialogDescription><DialogFooter>` |
| 确认弹窗 | `<AlertDialog><AlertDialogHeader><AlertDialogTitle><AlertDialogDescription><AlertDialogFooter><AlertDialogAction><AlertDialogCancel>` |
| 右侧抽屉 | `<Sheet open={} onOpenChange={}><SheetHeader><SheetTitle><SheetFooter>` |
| 左侧抽屉 | `<Drawer open={} onOpenChange={}><DrawerHeader><DrawerTitle><DrawerFooter>` |
| 弹出框 | `<Popover open={} onOpenChange={} trigger={}><PopoverContent>` |
| 提示 | `<Tooltip content="提示内容"><Button>悬停</Button></Tooltip>` |
| 下拉菜单 | `<Dropdown trigger={<Button>菜单</Button>} items={[{label, icon, onClick}]} />` |
| 确认气泡 | `<Popconfirm title="确定删除?" description="不可恢复" onConfirm={}><Button>删除</Button></Popconfirm>` |
| 悬停卡片 | `<HoverCard trigger={<Avatar />}>{content}</HoverCard>` |
| 警告提示 | `<Alert variant="default/destructive/success/warning" title="标题">内容</Alert>` |
| 消息提示 | `<ToastProvider>包裹应用，useToast().addToast("消息", "success")` |

**示例 - 列表页（含弹窗）**：
```jsx
<Card>
    <CardHeader>
        <CardTitle>用户列表</CardTitle>
    </CardHeader>
    <CardContent>
        <div className="flex justify-between mb-4">
            <div className="flex gap-2">
                <Input placeholder="搜索用户名..." className="w-64" icon={<Icon.Search size={16} />} />
                <Button variant="outline">搜索</Button>
            </div>
            <Button onClick={() => setShowAddModal(true)}><Icon.Plus size={16} />新增用户</Button>
        </div>

        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>序号</TableHead>
                    <TableHead>用户名</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>操作</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>张三</TableCell>
                    <TableCell><Badge variant="success">正常</Badge></TableCell>
                    <TableCell>
                        <div className="flex gap-2">
                            <Button variant="link" size="sm" onClick={() => openEditModal(row)}>编辑</Button>
                            <Popconfirm title="确定删除?" description="此操作不可恢复" onConfirm={() => handleDelete(row.id)}>
                                <Button variant="link" size="sm" className="text-red-500">删除</Button>
                            </Popconfirm>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>

        <div className="flex justify-end mt-4">
            <Pagination current={1} total={100} pageSize={10} onChange={handlePageChange} />
        </div>
    </CardContent>
</Card>

{/* 新增弹窗 */}
<Dialog open={showAddModal} onOpenChange={setShowAddModal}>
    <DialogHeader>
        <DialogTitle>新增用户</DialogTitle>
        <DialogDescription>填写用户信息</DialogDescription>
    </DialogHeader>
    <div className="space-y-4 py-4">
        <div className="space-y-2">
            <Label required>用户名</Label>
            <Input placeholder="请输入用户名" />
        </div>
        <div className="space-y-2">
            <Label>角色</Label>
            <Select options={[{value: "admin", label: "管理员"}, {value: "user", label: "普通用户"}]} value={role} onChange={setRole} />
        </div>
        <div className="space-y-2">
            <Label>状态</Label>
            <RadioGroup options={[{value: "active", label: "启用"}, {value: "inactive", label: "禁用"}]} value={status} onChange={setStatus} />
        </div>
    </div>
    <DialogFooter>
        <Button variant="outline" onClick={() => setShowAddModal(false)}>取消</Button>
        <Button onClick={handleAdd}>确定</Button>
    </DialogFooter>
</Dialog>

{/* 详情抽屉 */}
<Sheet open={showDetailSheet} onOpenChange={setShowDetailSheet}>
    <SheetHeader>
        <SheetTitle>用户详情</SheetTitle>
        <SheetDescription>查看用户完整信息</SheetDescription>
    </SheetHeader>
    <div className="space-y-4">
        <div className="flex justify-between py-2 border-b">
            <span className="text-gray-500">用户名</span>
            <span>{detailData.username}</span>
        </div>
        <div className="flex justify-between py-2 border-b">
            <span className="text-gray-500">角色</span>
            <Badge>{detailData.role}</Badge>
        </div>
    </div>
    <SheetFooter>
        <Button variant="outline" onClick={() => setShowDetailSheet(false)}>关闭</Button>
    </SheetFooter>
</Sheet>
```

**图标组件 (Lucide)**：

模板内置了常用 Lucide 图标组件，使用方式：

```jsx
// 图标用法
<Icon.Home size={18} />
<Icon.Users size={20} className="text-gray-500" />
<Icon.Settings />

// 常用图标列表
Icon.Home          // 首页
Icon.Dashboard     // 仪表盘
Icon.Users         // 用户
Icon.Settings      // 设置
Icon.Bell          // 通知
Icon.User          // 用户头像
Icon.Plus          // 新增
Icon.Pencil        // 编辑
Icon.Trash         // 删除
Icon.Eye           // 查看
Icon.Search        // 搜索
Icon.Menu          // 菜单
Icon.Box           // Logo
Icon.Calendar      // 日历
Icon.Clock         // 时间
Icon.Download      // 下载
Icon.Upload        // 上传
Icon.Check         // 确认
Icon.X             // 关闭
Icon.ChevronDown   // 下箭头
Icon.ChevronRight  // 右箭头
Icon.AlertCircle   // 警告
Icon.CheckCircle   // 成功
Icon.Info          // 信息
Icon.Loader        // 加载中
Icon.RefreshCw     // 刷新
Icon.LogOut        // 退出
```

**⚠️ 注意：DOM 标签必须正确闭合**
```jsx
// ❌ 错误
<input type="text">
<br>
<img src="...">

// ✅ 正确
<input type="text" />
<br />
<img src="..." />
```

---

## 模板变量替换

生成页面时，需要替换模板中的变量：

| 变量 | 说明 | 示例值 |
|------|------|--------|
| `{{PROJECT_NAME}}` | 项目名称 | 用户管理系统 |
| `{{PAGE_TITLE}}` | 页面标题 | 用户管理 |
| `{{PRIMARY_COLOR}}` | 主色 | #1890ff |
| `{{PRIMARY_HOVER}}` | 主色悬停 | #40a9ff |
| `{{PRIMARY_LIGHT}}` | 主色浅色背景 | #e6f4ff |
| `{{SUCCESS_COLOR}}` | 成功色 | #52c41a |
| `{{WARNING_COLOR}}` | 警告色 | #faad14 |
| `{{ERROR_COLOR}}` | 错误色 | #ff4d4f |

---

## 业务逻辑标记

在生成页面时，PRD 中使用 `<@>业务逻辑<@>` 标记的内容会自动转换为悬停提示气泡。

### 使用方式

在 PRD 文档的功能描述中，将业务逻辑说明用 `<@>...<@>` 包裹：

**PRD 示例**：
- 新增用户按钮 <@>点击打开新增表单弹窗，必填字段：用户名、姓名、角色<@>
- 状态列 <@>状态变更会触发邮件通知<@>
- 编辑操作 <@>只有管理员角色才能编辑其他管理员信息<@>

**生成效果**：
- 在按钮旁显示 💡 图标（灯泡）
- 鼠标悬停时展示业务逻辑说明气泡
- 气泡最大宽度 256px，支持多行文本和滚动

### 多行支持

业务逻辑说明可以包含换行：

```
<@>
第一行业务逻辑说明
第二行业务逻辑说明
第三行业务逻辑说明
<@>
```

气泡会保留换行格式，超长内容可滚动查看。

### 适用场景

| 场景 | 示例 |
|------|------|
| 功能按钮 | `新增用户 <@>点击后打开新增表单弹窗<@>` |
| 表格操作列 | `编辑 <@>只有管理员才能编辑<@>` |
| 状态字段 | `状态 <@>状态变更触发邮件通知<@>` |
| 表单字段 | `用户名 <@>必填，长度 4-20 字符<@>` |

---

### 步骤 8：检查链接和完整性

**生成完成后必须检查：**

1. 所有链接是否正确（直接写文件名，无路径前缀）
2. 所有页面是否有完整导航结构
3. 所有弹窗是否完整实现
4. 表格是否有至少 3 条数据

---

### 步骤 9：生成映射文档

**⚠️ 必须在每生成一个页面后，立即记录该页面的依赖关系到映射文档！**

生成 `prd/prototype/mapping.md` 文件，记录原型页面与 PRD 的映射关系。

#### 映射文档结构

```markdown
# 原型映射文档

**生成时间**：{{YYYY-MM-DD HH:mm:ss}}
**原型版本**：v1.0
**技术栈**：{{技术栈名称}}

---

## 页面依赖映射

### {{页面文件名}}（{{页面标题}}）

**生成时间**：{{YYYY-MM-DD HH:mm:ss}}

| 依赖 PRD | 版本 | 依赖章节 | 依赖内容 |
|----------|------|----------|----------|
| {{PRD文件名}} | {{版本号}} | {{章节编号 章节名称}} | {{具体内容描述}} |

---

## PRD 版本快照

| PRD 文件 | 记录版本 | 记录时间 |
|----------|----------|----------|
| {{PRD文件名}} | {{版本号}} | {{YYYY-MM-DD HH:mm:ss}} |

---

## 设计体系快照

**设计风格**：{{风格名称}}
**主题色**：{{主题色值}}
**生成时间**：{{YYYY-MM-DD HH:mm:ss}}

---

## 更新历史

| 更新时间 | 操作 | 更新页面 | 变更说明 |
|----------|------|----------|----------|
| {{YYYY-MM-DD HH:mm:ss}} | 初始生成 | 全部页面 | - |
```

#### 记录规则

**每生成一个页面后，立即记录：**

1. **页面文件名** - 如 `user-management.html`
2. **页面标题** - 如 `用户管理`
3. **生成时间** - 完成时间戳
4. **依赖 PRD** - 该页面依赖的所有 PRD 文件
5. **版本** - 各 PRD 当前的版本号
6. **依赖章节** - 从 PRD 的哪些章节提取内容
7. **依赖内容** - 具体提取了什么内容

**示例记录**：

```markdown
### user-management.html（用户管理）

**生成时间**：2026-04-02 14:30:00

| 依赖 PRD | 版本 | 依赖章节 | 依赖内容 |
|----------|------|----------|----------|
| M001_用户管理_prd.md | v1.0 | 第3章 详细功能需求 | 用户列表、搜索、筛选、批量操作 |
| M001_用户管理_prd.md | v1.0 | 第4章 数据字段定义 | 用户字段：用户名、姓名、角色、状态 |
| M001_用户管理_prd.md | v1.0 | 第6章 用户界面设计 | 列表页布局、新增/编辑弹窗、详情抽屉 |
| main_prd.md | v1.0 | 第5章 用户故事概述 | 用户角色权限定义 |
```

#### PRD 版本读取

从各 PRD 文件的第 1 章"文档基础信息"中读取"当前版本"字段：

- 主 PRD：`prd/main_prd.md`
- 模块 PRD：`prd/modules/*.md`

---

### 步骤 10：确认完成

输出完成信息：

```
✅ 原型已成功生成在：prd/prototype/

目录结构：
prd/prototype/
├── mapping.md              # 映射文档（记录 PRD 与原型的对应关系）
├── index.html              # 登录页
├── dashboard.html          # 仪表盘
├── user-management.html    # 用户管理（含新增/编辑/详情弹窗）
├── order-management.html   # 订单管理（含详情抽屉）
└── settings.html           # 系统设置

技术栈：HTML + Tailwind CSS
设计风格：商务简约
主题色：商务蓝 (#1890ff)

质量检查：
✅ 每个页面都有完整的导航结构（Logo + 侧边栏）
✅ Logo 点击可返回仪表盘
✅ 所有 CRUD 操作通过弹窗实现
✅ 所有表格有示例数据（至少 3 条）
✅ 所有链接正确（直接文件名，无路径问题）
✅ 映射文档已生成，记录页面与 PRD 的依赖关系

页面数量：5 个

下一步：
- 使用 /prd-prototype preview 命令在浏览器中打开原型
- PRD 更新后，使用 /prd-prototype check 检查同步状态
```