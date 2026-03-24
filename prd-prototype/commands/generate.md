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

### 步骤 4：确定设计风格和主题色

**⚠️ 必须询问用户，不能自动选择！**

根据 PRD 内容分析项目类型，推荐合适的设计风格和主题色。

#### 4.1 分析项目类型

根据 PRD 中的项目描述、功能模块、目标用户等信息，判断项目类型：

| 项目类型 | 特征关键词 | 推荐风格 |
|---------|-----------|----------|
| **企业管理系统** | ERP、CRM、OA、后台管理、内部系统 | 商务蓝、简洁专业 |
| **电商/零售** | 商品、订单、购物车、支付、库存 | 活力橙、电商红 |
| **金融/支付** | 银行、理财、借贷、交易、账单 | 金融蓝、稳重绿 |
| **医疗健康** | 医院、诊所、健康、预约、问诊 | 医疗绿、清新蓝 |
| **教育培训** | 课程、学习、考试、培训、学员 | 教育蓝、活力橙 |
| **社交/社区** | 聊天、动态、圈子、评论、分享 | 社交蓝、活泼紫 |
| **物流/供应链** | 仓储、配送、运输、跟踪、调度 | 物流橙、科技蓝 |
| **数据可视化** | 报表、大屏、监控、分析、统计 | 科技蓝、深色系 |
| **SaaS 工具** | 协作、项目、文档、效率、办公 | 科技蓝、清新绿 |

#### 4.2 展示推荐并询问用户

**⚠️ 必须使用 AskUserQuestion 工具询问用户！**

```
📊 分析 PRD 内容...

项目类型：企业管理系统（后台管理）
关键词：用户管理、权限、数据统计、系统设置

🎨 推荐设计：
- 风格：商务简约
- 主题色：商务蓝 (#1890ff)

请选择主题色方案：
1. 商务蓝 (#1890ff) - 推荐
2. 科技蓝 (#1677ff)
3. 金融绿 (#52c41a)
4. 电商橙 (#ff6b00)
5. 自定义颜色

请输入选项数字或自定义颜色值：
```

#### 4.3 预设主题色方案

| 方案名称 | 主色 | 辅助色 | 适用场景 |
|---------|------|--------|----------|
| **商务蓝** | `#1890ff` | `#52c41a` `#faad14` `#ff4d4f` | 企业管理、后台系统 |
| **科技蓝** | `#1677ff` | `#13c2c2` `#722ed1` `#eb2f96` | 数据平台、SaaS |
| **金融绿** | `#52c41a` | `#1890ff` `#faad14` `#ff4d4f` | 金融、支付、银行 |
| **医疗绿** | `#00a870` | `#1890ff` `#faad14` `#ff7875` | 医疗、健康 |
| **电商橙** | `#ff6b00` | `#ff4d4f` `#faad14` `#52c41a` | 电商、零售 |
| **活力紫** | `#722ed1` | `#eb2f96` `#1890ff` `#52c41a` | 社交、创意工具 |
| **教育蓝** | `#2f54eb` | `#1890ff` `#52c41a` `#faad14` | 教育、培训 |
| **物流橙** | `#fa8c16` | `#1890ff` `#52c41a` `#ff4d4f` | 物流、供应链 |

---

### 步骤 5：选择技术栈

**⚠️ 必须使用 AskUserQuestion 工具询问用户选择！**

询问用户选择原型技术栈：

```
请选择原型技术栈：

1. HTML + Tailwind CSS - 快速、轻量、无需构建
2. Vue + Naive UI - 现代化 Vue 应用、组件丰富
3. React + Ant Design - 企业级应用、组件完善

请输入选项数字（1/2/3）：
```

| 选项 | 技术栈 | 特点 |
|------|--------|------|
| 1 | **HTML + Tailwind CSS** | 快速、轻量、无需构建 |
| 2 | **Vue + Naive UI** | 现代化 Vue 应用、组件丰富 |
| 3 | **React + Ant Design** | 企业级应用、组件完善 |

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

### Vue + Naive UI

```html
<n-modal v-model:show="showAddModal" preset="card" title="新增用户" style="width: 600px;">
    <n-form :model="formData">
        <n-form-item label="用户名" required>
            <n-input v-model:value="formData.username" placeholder="请输入用户名" />
        </n-form-item>
    </n-form>
    <template #footer>
        <n-space justify="end">
            <n-button @click="showAddModal = false">取消</n-button>
            <n-button type="primary" @click="handleAdd">确定</n-button>
        </n-space>
    </template>
</n-modal>

<n-drawer v-model:show="showDetailDrawer" :width="500">
    <n-drawer-content title="用户详情">
        <n-descriptions :column="1">
            <n-descriptions-item label="用户名">{{ detailData.username }}</n-descriptions-item>
        </n-descriptions>
    </n-drawer-content>
</n-drawer>
```

### React + Ant Design

```jsx
<Modal title="新增用户" open={showAddModal} onCancel={() => setShowAddModal(false)} onOk={handleAdd}>
    <Form form={form} layout="vertical">
        <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
            <Input placeholder="请输入用户名" />
        </Form.Item>
    </Form>
</Modal>

<Drawer title="用户详情" open={showDetailDrawer} onClose={() => setShowDetailDrawer(false)} width={500}>
    <Descriptions column={1}>
        <Descriptions.Item label="用户名">{detailData.username}</Descriptions.Item>
    </Descriptions>
</Drawer>
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

### 步骤 8：检查链接和完整性

**生成完成后必须检查：**

1. 所有链接是否正确（直接写文件名，无路径前缀）
2. 所有页面是否有完整导航结构
3. 所有弹窗是否完整实现
4. 表格是否有至少 3 条数据

---

### 步骤 9：确认完成

输出完成信息：

```
✅ 原型已成功生成在：prd/prototype/

目录结构：
prd/prototype/
├── index.html              # 登录页
├── dashboard.html          # 仪表盘
├── user-management.html    # 用户管理（含新增/编辑/详情弹窗）
├── order-management.html   # 订单管理（含详情抽屉）
└── settings.html           # 系统设置

技术栈：HTML + Tailwind CSS
主题色：商务蓝 (#1890ff)

质量检查：
✅ 每个页面都有完整的导航结构（Logo + 侧边栏）
✅ Logo 点击可返回仪表盘
✅ 所有 CRUD 操作通过弹窗实现
✅ 所有表格有示例数据（至少 3 条）
✅ 所有链接正确（直接文件名，无路径问题）

页面数量：5 个

下一步：
使用 /prd-prototype preview 命令在浏览器中打开原型
```