# generate 命令 - 生成交互原型

## 功能说明

从 PRD 文档生成交互式多页面原型。

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

**确认产物路径**：
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

3. 用户管理 (pages/user-management.html) ← 一个页面包含所有操作
   - 功能：用户列表、新增、编辑、查看详情、删除、搜索、筛选
   - 弹窗：
     - 新增用户弹窗（完整表单）
     - 编辑用户弹窗（完整表单，带默认值）
     - 用户详情弹窗/抽屉（完整信息展示）
     - 删除确认弹窗
   - 元素：表格（含操作列）、搜索框、筛选按钮、新增按钮
   - 导航：Logo 点击返回 dashboard，侧边栏菜单

4. 订单管理 (pages/order-management.html)
   - 功能：订单列表、查看详情、取消订单、导出
   - 弹窗：
     - 订单详情弹窗/抽屉
     - 取消订单确认弹窗
   - 元素：表格、筛选条件、导出按钮
   - 导航：完整导航结构

5. 系统设置 (pages/settings.html)
   - 功能：基础设置、通知设置、安全设置
   - 弹窗：按需
   - 元素：Tab 切换 + 设置表单
   - 导航：完整导航结构
```

---

## 弹窗实现要求

### HTML + Tailwind CSS

使用固定定位实现弹窗：

```html
<!-- 弹窗遮罩 -->
<div id="modal-overlay" class="fixed inset-0 bg-black/50 hidden z-50"></div>

<!-- 弹窗内容 -->
<div id="add-modal" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-[600px] hidden z-50">
  <div class="p-4 border-b flex justify-between items-center">
    <h3 class="text-lg font-semibold">新增用户</h3>
    <button onclick="closeModal('add-modal')" class="text-gray-400 hover:text-gray-600">✕</button>
  </div>
  <form class="p-4 space-y-4">
    <div>
      <label class="form-label">用户名 <span class="text-red-500">*</span></label>
      <input type="text" class="form-input" placeholder="请输入用户名" />
    </div>
    <!-- 更多字段... -->
    <div class="flex justify-end gap-2 pt-4">
      <button type="button" class="btn btn-secondary" onclick="closeModal('add-modal')">取消</button>
      <button type="submit" class="btn btn-primary">确定</button>
    </div>
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
</script>
```

### Vue + Naive UI

使用 `<n-modal>` 组件：

```html
<template>
  <!-- 新增弹窗 -->
  <n-modal v-model:show="showAddModal" preset="card" title="新增用户" style="width: 600px;">
    <n-form :model="formData" label-placement="left" label-width="80">
      <n-form-item label="用户名" required>
        <n-input v-model:value="formData.username" placeholder="请输入用户名" />
      </n-form-item>
      <n-form-item label="邮箱">
        <n-input v-model:value="formData.email" placeholder="请输入邮箱" />
      </n-form-item>
    </n-form>
    <template #footer>
      <n-space justify="end">
        <n-button @click="showAddModal = false">取消</n-button>
        <n-button type="primary" @click="handleAdd">确定</n-button>
      </n-space>
    </template>
  </n-modal>

  <!-- 详情抽屉 -->
  <n-drawer v-model:show="showDetailDrawer" :width="500">
    <n-drawer-content title="用户详情">
      <n-descriptions :column="1" label-placement="left">
        <n-descriptions-item label="用户名">{{ detailData.username }}</n-descriptions-item>
        <n-descriptions-item label="邮箱">{{ detailData.email }}</n-descriptions-item>
      </n-descriptions>
    </n-drawer-content>
  </n-drawer>
</template>
```

### React + Ant Design

使用 `<Modal>` 和 `<Drawer>` 组件：

```jsx
// 新增弹窗
<Modal
  title="新增用户"
  open={showAddModal}
  onCancel={() => setShowAddModal(false)}
  onOk={handleAdd}
  okText="确定"
  cancelText="取消"
>
  <Form form={form} layout="vertical">
    <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
      <Input placeholder="请输入用户名" />
    </Form.Item>
    <Form.Item name="email" label="邮箱">
      <Input placeholder="请输入邮箱" />
    </Form.Item>
  </Form>
</Modal>

// 详情抽屉
<Drawer
  title="用户详情"
  open={showDetailDrawer}
  onClose={() => setShowDetailDrawer(false)}
  width={500}
>
  <Descriptions column={1}>
    <Descriptions.Item label="用户名">{detailData.username}</Descriptions.Item>
    <Descriptions.Item label="邮箱">{detailData.email}</Descriptions.Item>
  </Descriptions>
</Drawer>
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

### 步骤 4：确定设计风格和主题色

根据 PRD 内容分析项目类型，推荐合适的设计风格和主题色，用户可选择接受或自定义。

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

#### 4.2 推荐设计风格

**根据项目类型自动推荐**：

```
📊 分析 PRD 内容...

项目类型：企业管理系统（后台管理）
关键词：用户管理、权限、数据统计、系统设置

🎨 推荐设计：
- 风格：商务简约
- 主题色：商务蓝 (#1890ff)
- 辅助色：#52c41a (成功)、#faad14 (警告)、#ff4d4f (错误)

是否接受推荐？
[接受推荐] [自定义风格和颜色]
```

#### 4.3 设计风格选项

| 风格 | 特点 | 适用场景 |
|------|------|----------|
| **商务简约** | 简洁大气、信息清晰、层级分明 | 企业管理、后台系统 |
| **科技现代** | 深色背景、渐变色彩、科技感 | 数据大屏、监控平台 |
| **清新活力** | 明亮配色、圆润卡片、年轻感 | 社交、教育、工具类 |
| **专业稳重** | 低饱和度、稳重配色、信任感 | 金融、医疗、政务 |

#### 4.4 主题色选项

**预设主题色方案**：

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

**自定义主题色**：
```
请输入自定义主题色（支持 HEX 格式）：
主色：#______
辅助色（可选）：#______ #______ #______
```

#### 4.5 应用主题色

确定主题色后，将其应用到生成的原型中：

**HTML + Tailwind**：
```html
<style>
  :root {
    --primary-color: #1890ff;
    --primary-hover: #40a9ff;
    --success-color: #52c41a;
    --warning-color: #faad14;
    --error-color: #ff4d4f;
  }
  .btn-primary {
    background-color: var(--primary-color);
  }
  .btn-primary:hover {
    background-color: var(--primary-hover);
  }
</style>
```

**Vue + Naive UI**：
```html
<n-config-provider :theme-overrides="themeOverrides">
  <!-- 内容 -->
</n-config-provider>

<script>
const themeOverrides = {
  common: {
    primaryColor: '#1890ff',
    primaryColorHover: '#40a9ff',
    successColor: '#52c41a',
    warningColor: '#faad14',
    errorColor: '#ff4d4f'
  }
};
</script>
```

**React + Ant Design**：
```jsx
<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#1890ff',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#ff4d4f'
    }
  }}
>
  {/* 内容 */}
</ConfigProvider>
```

---

### 步骤 5：选择技术栈

询问用户选择原型技术栈：

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
| 下载/导出 | `download` | 导出按钮 |
| 筛选 | `filter` | 筛选按钮 |
| 刷新 | `refresh-cw` | 刷新按钮 |
| 关闭 | `x` | 关闭弹窗 |
| 确认 | `check` | 确认操作 |
| Logo | `box` | 项目 Logo |

### HTML + Tailwind 使用方式

```html
<!-- 引入 Lucide -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>

<!-- 使用图标 -->
<i data-lucide="home" class="w-5 h-5"></i>
<i data-lucide="users" class="w-5 h-5"></i>
<i data-lucide="plus" class="w-4 h-4"></i>

<!-- 初始化图标 -->
<script>
  lucide.createIcons();
</script>
```

### Vue + Naive UI 使用方式

```javascript
// 图标 SVG 字符串
const icons = {
  home: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
  users: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>'
};

// 渲染图标
function renderIcon(iconName) {
  const icon = icons[iconName];
  return () => h(NIcon, null, {
    default: () => h('span', {
      innerHTML: icon,
      style: { display: 'flex', alignItems: 'center' }
    })
  });
}

// 菜单中使用
const menuOptions = [
  { label: '仪表盘', key: 'dashboard', icon: renderIcon('layout-dashboard') },
  { label: '用户管理', key: 'users', icon: renderIcon('users') }
];
```

### React + Ant Design 使用方式

```jsx
// Lucide 图标组件
const LucideIcon = ({ name, size = 18 }) => {
  const iconRef = React.useRef(null);

  React.useEffect(() => {
    if (iconRef.current && lucide[name]) {
      iconRef.current.innerHTML = '';
      const svg = lucide.createElement(lucide[name]);
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      iconRef.current.appendChild(svg);
    }
  }, [name, size]);

  return <span ref={iconRef} style={{ display: 'inline-flex', alignItems: 'center' }} />;
};

// 使用图标
const Icon = {
  Home: () => <LucideIcon name="home" />,
  Users: () => <LucideIcon name="users" />,
  Plus: () => <LucideIcon name="plus" />
};

// 菜单中使用
const menuItems = [
  { key: 'dashboard', icon: <Icon.LayoutDashboard />, label: '仪表盘' },
  { key: 'users', icon: <Icon.Users />, label: '用户管理' }
];
```

### 步骤 6：创建项目目录

创建原型项目目录结构：

```
prd/prototype/                # 原型目录（固定路径）
├── index.html              # 首页/登录页
├── dashboard.html          # 仪表盘
├── pages/                  # 功能页面目录
├── styles/                 # 样式文件
├── router.js               # 路由逻辑
└── README.md               # 使用说明
```

> **路径说明**：原型统一生成在 `prd/prototype/` 目录下，与 PRD 文档同属 `prd/` 目录，便于统一管理。

#### 模板变量替换

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
| `<!-- NAV_ITEMS -->` | 导航菜单项 | 动态生成 |
| `<!-- PAGE_CONTENT -->` | 页面内容 | 动态生成 |

#### 主题色计算

根据用户选择的主色，自动计算相关颜色：

```javascript
// 主色：#1890ff
const primaryColor = '#1890ff';
const primaryHover = adjustBrightness(primaryColor, 0.1);  // 更亮 10%
const primaryLight = adjustAlpha(primaryColor, 0.1);       // 10% 透明度背景

// 示例输出：
// PRIMARY_COLOR: #1890ff
// PRIMARY_HOVER: #40a9ff
// PRIMARY_LIGHT: #e6f4ff
```

### 步骤 7：生成页面内容

按页面规划逐个生成。

## ⚠️ 页面结构要求（必须遵守）

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
│          │                                                  │
└──────────┴──────────────────────────────────────────────────┘
```

### 必须包含的元素

| 元素 | 要求 | 示例 |
|------|------|------|
| Logo | 点击返回首页/dashboard | `<a href="dashboard.html">项目名称</a>` |
| 侧边栏菜单 | 包含所有模块入口，当前页高亮 | 仪表盘、用户管理、订单管理... |
| 顶部导航 | 用户信息、通知、退出等 | 头像 + 用户名 + 下拉菜单 |
| 面包屑 | 显示当前位置 | 首页 > 用户管理 |
| 主内容区 | 完整的功能 UI | 表格 + 按钮 + 弹窗 |

---

## ⚠️ 内容完整性要求

### 禁止使用的内容

```javascript
❌ alert("新增成功")      // 禁止使用原生弹窗
❌ confirm("确定删除？")  // 禁止使用确认框
❌ prompt("请输入")       // 禁止使用输入框
❌ window.location = "待开发.html"  // 禁止跳转到空白页
```

### 禁止使用的占位文字

```
❌ "此处显示表格数据"
❌ "这里是表单区域"
❌ "点击按钮跳转"
❌ "待开发/coming soon"
❌ "页面生成中..."
```

### 必须生成的实际 UI

| PRD 功能 | 必须生成的 UI | 示例数据 |
|---------|-------------|----------|
| 数据列表 | 完整表格（表头 + 数据行 + 操作列） | 至少 3 条 |
| 搜索筛选 | 搜索框 + 筛选按钮 + 筛选弹窗 | 完整交互 |
| 新增功能 | 弹窗 + 完整表单 | 所有必填字段 |
| 编辑功能 | 弹窗 + 完整表单（带默认值） | 预填数据 |
| 删除功能 | 确认弹窗 | 提示文字 + 按钮 |
| 详情查看 | 弹窗/抽屉 + 详情展示 | 所有字段 |
| 分页功能 | 分页组件 | 页码 + 总数 |
| 状态标签 | Tag 组件 | 不同颜色状态 |

**表格必须包含的列（使用弹窗）**：
```html
<!-- HTML + Tailwind：表格操作列使用弹窗 -->
<table class="min-w-full border border-gray-200">
  <thead class="bg-gray-100">
    <tr>
      <th class="px-4 py-3 text-left border-b">序号</th>
      <th class="px-4 py-3 text-left border-b">名称</th>
      <th class="px-4 py-3 text-left border-b">状态</th>
      <th class="px-4 py-3 text-left border-b">操作</th>
    </tr>
  </thead>
  <tbody>
    <tr class="hover:bg-gray-50">
      <td class="px-4 py-3 border-b">1</td>
      <td class="px-4 py-3 border-b">示例数据 1</td>
      <td class="px-4 py-3 border-b"><span class="tag tag-success">正常</span></td>
      <td class="px-4 py-3 border-b">
        <button onclick="openEditModal(1)" class="text-blue-500 hover:underline mr-2">编辑</button>
        <button onclick="openDetailModal(1)" class="text-blue-500 hover:underline mr-2">查看</button>
        <button onclick="openDeleteModal(1)" class="text-red-500 hover:underline">删除</button>
      </td>
    </tr>
  </tbody>
</table>
```

**完整页面结构示例**：
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>用户管理</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-gray-50 flex">
    <!-- 侧边栏 -->
    <aside class="w-64 bg-white shadow-lg">
        <a href="dashboard.html" class="block p-4 text-xl font-bold border-b hover:bg-gray-50">
            项目名称 <!-- Logo，点击返回仪表盘 -->
        </a>
        <nav class="p-4">
            <a href="dashboard.html" class="block py-2 px-4 rounded hover:bg-gray-100">仪表盘</a>
            <a href="user-management.html" class="block py-2 px-4 rounded bg-blue-50 text-blue-600">用户管理</a>
            <a href="order-management.html" class="block py-2 px-4 rounded hover:bg-gray-100">订单管理</a>
        </nav>
    </aside>

    <!-- 主内容区 -->
    <main class="flex-1">
        <!-- 顶部导航 -->
        <header class="bg-white shadow px-6 py-4 flex justify-between items-center">
            <nav class="text-sm">
                <a href="dashboard.html" class="text-gray-500">首页</a>
                <span class="mx-2">/</span>
                <span class="text-gray-900">用户管理</span>
            </nav>
            <div class="flex items-center gap-4">
                <span class="text-gray-600">管理员</span>
            </div>
        </header>

        <!-- 页面内容 -->
        <div class="p-6">
            <div class="card">
                <div class="flex justify-between items-center mb-4">
                    <h1 class="text-xl font-semibold">用户列表</h1>
                    <button onclick="openAddModal()" class="btn btn-primary">新增用户</button>
                </div>

                <!-- 搜索筛选 -->
                <div class="flex gap-4 mb-4">
                    <input type="text" class="form-input" placeholder="搜索用户名..." />
                    <button class="btn btn-secondary">搜索</button>
                </div>

                <!-- 数据表格 -->
                <table class="min-w-full border border-gray-200">
                    <!-- 表格内容 -->
                </table>
            </div>
        </div>
    </main>

    <!-- 弹窗遮罩 -->
    <div id="modal-overlay" class="fixed inset-0 bg-black/50 hidden z-50"></div>

    <!-- 新增弹窗 -->
    <div id="add-modal" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-[600px] hidden z-50">
        <!-- 弹窗内容 -->
    </div>

    <!-- 编辑弹窗 -->
    <div id="edit-modal" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-[600px] hidden z-50">
        <!-- 弹窗内容 -->
    </div>

    <!-- 详情弹窗 -->
    <div id="detail-modal" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-[600px] hidden z-50">
        <!-- 弹窗内容 -->
    </div>

    <!-- 删除确认弹窗 -->
    <div id="delete-modal" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-[400px] hidden z-50">
        <div class="p-6 text-center">
            <p class="text-lg mb-4">确定删除该用户吗？</p>
            <div class="flex justify-center gap-4">
                <button onclick="closeModal('delete-modal')" class="btn btn-secondary">取消</button>
                <button onclick="confirmDelete()" class="btn btn-danger">确定</button>
            </div>
        </div>
    </div>
</body>
</html>
```

## ⚠️ 按技术栈使用对应 UI 组件（重要）

**生成页面内容时，必须根据选择的技术栈使用对应的 UI 组件库组件！**

### HTML + Tailwind CSS

使用 Tailwind CSS 类名构建 UI，模板已预定义常用组件类：

| 功能 | 使用方式 |
|------|----------|
| 按钮 | `.btn .btn-primary` / `.btn-secondary` / `.btn-danger` |
| 表单输入 | `.form-input` 配合 `.form-label` |
| 卡片 | `.card` |
| 表格 | Tailwind 表格类 + 自定义样式 |
| 标签 | `.tag .tag-success` / `.tag-warning` / `.tag-danger` / `.tag-info` |
| 导航栏 | `.top-nav` |

**示例 - 列表页**：
```html
<div class="card">
  <div class="flex justify-between items-center mb-4">
    <h2 class="text-xl font-semibold">用户列表</h2>
    <a href="user-add.html" class="btn btn-primary">新增用户</a>
  </div>
  <div class="flex gap-4 mb-4">
    <input type="text" class="form-input" placeholder="搜索用户名..." />
    <button class="btn btn-secondary">搜索</button>
  </div>
  <table class="min-w-full">
    <!-- 表格内容 -->
  </table>
</div>
```

### Vue + Naive UI

使用 Naive UI 组件库，常用组件：

| 功能 | Naive UI 组件 |
|------|---------------|
| 按钮 | `<n-button type="primary">` |
| 表格 | `<n-data-table :columns :data />` |
| 表单 | `<n-form><n-form-item><n-input />` |
| 卡片 | `<n-card>` |
| 弹窗 | `<n-modal>` / `<n-dialog>` |
| 消息提示 | `window.$message.success()` |
| 下拉菜单 | `<n-dropdown>` |
| 分页 | `<n-pagination>` |
| 标签 | `<n-tag type="success">` |

**示例 - 列表页（含弹窗）**：
```html
<n-card title="用户列表">
  <template #header-extra>
    <n-button type="primary" @click="showAddModal = true">
      新增用户
    </n-button>
  </template>

  <n-space class="mb-4">
    <n-input v-model:value="searchText" placeholder="搜索用户名" style="width: 200px" />
    <n-button @click="handleSearch">搜索</n-button>
  </n-space>

  <n-data-table :columns="columns" :data="tableData" :pagination="pagination" />
</n-card>

<!-- 新增弹窗 -->
<n-modal v-model:show="showAddModal" preset="card" title="新增用户" style="width: 600px;">
  <n-form :model="formData" label-placement="left" label-width="80">
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

<!-- 详情抽屉 -->
<n-drawer v-model:show="showDetailDrawer" :width="500">
  <n-drawer-content title="用户详情">
    <n-descriptions :column="1">
      <n-descriptions-item label="用户名">{{ detailData.username }}</n-descriptions-item>
    </n-descriptions>
  </n-drawer-content>
</n-drawer>
```

**示例 - 表格列配置（使用弹窗）**：
```javascript
const columns = [
  { title: '序号', key: 'id' },
  { title: '用户名', key: 'username' },
  { title: '状态', key: 'status', render(row) {
    return h(NTag, { type: row.status === '正常' ? 'success' : 'warning' }, { default: () => row.status })
  }},
  { title: '操作', key: 'actions', render(row) {
    return h(NSpace, null, {
      default: () => [
        h(NButton, { text: true, type: 'primary', onClick: () => openEditModal(row) }, { default: () => '编辑' }),
        h(NButton, { text: true, type: 'info', onClick: () => openDetailDrawer(row) }, { default: () => '查看' }),
        h(NButton, { text: true, type: 'error', onClick: () => openDeleteConfirm(row) }, { default: () => '删除' })
      ]
    })
  }}
];
```

### React + Ant Design

使用 Ant Design 组件库，常用组件：

| 功能 | Ant Design 组件 |
|------|-----------------|
| 按钮 | `<Button type="primary">` |
| 表格 | `<Table columns={columns} dataSource={data} />` |
| 表单 | `<Form><Form.Item><Input />` |
| 卡片 | `<Card>` |
| 弹窗 | `<Modal>` |
| 消息提示 | `message.success()` |
| 下拉菜单 | `<Dropdown>` |
| 分页 | `<Pagination>` 或 Table 内置 |
| 标签 | `<Tag color="success">` |
| 确认框 | `<Popconfirm>` |

**示例 - 列表页（含弹窗）**：
```jsx
<Card
  title="用户列表"
  extra={
    <Button type="primary" icon={<PlusOutlined />} onClick={() => setShowAddModal(true)}>
      新增用户
    </Button>
  }
>
  <Space className="mb-4">
    <Input.Search placeholder="搜索用户名" style={{ width: 200 }} />
    <Button icon={<SearchOutlined />}>搜索</Button>
  </Space>

  <Table
    columns={columns}
    dataSource={data}
    pagination={{ pageSize: 10 }}
    rowKey="id"
  />
</Card>

{/* 新增弹窗 */}
<Modal
  title="新增用户"
  open={showAddModal}
  onCancel={() => setShowAddModal(false)}
  onOk={handleAdd}
>
  <Form form={form} layout="vertical">
    <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
      <Input placeholder="请输入用户名" />
    </Form.Item>
  </Form>
</Modal>

{/* 详情抽屉 */}
<Drawer
  title="用户详情"
  open={showDetailDrawer}
  onClose={() => setShowDetailDrawer(false)}
  width={500}
>
  <Descriptions column={1}>
    <Descriptions.Item label="用户名">{detailData.username}</Descriptions.Item>
  </Descriptions>
</Drawer>
```

**示例 - 表格列配置（使用弹窗）**：
```javascript
const columns = [
  { title: '序号', dataIndex: 'id', key: 'id' },
  { title: '用户名', dataIndex: 'username', key: 'username' },
  { title: '状态', dataIndex: 'status', key: 'status',
    render: (text) => <Tag color={text === '正常' ? 'success' : 'warning'}>{text}</Tag>
  },
  { title: '操作', key: 'action',
    render: (_, record) => (
      <Space>
        <Button type="link" onClick={() => openEditModal(record)}>编辑</Button>
        <Button type="link" onClick={() => openDetailDrawer(record)}>查看</Button>
        <Popconfirm title="确定删除?" onConfirm={() => handleDelete(record)} okText="确定" cancelText="取消">
          <Button type="link" danger>删除</Button>
        </Popconfirm>
      </Space>
    )
  }
];
```

## 组件使用对照表

| 功能场景 | HTML+Tailwind | Vue+Naive UI | React+Ant Design |
|---------|---------------|--------------|------------------|
| 主按钮 | `.btn .btn-primary` | `<n-button type="primary">` | `<Button type="primary">` |
| 次按钮 | `.btn .btn-secondary` | `<n-button>` | `<Button>` |
| 危险按钮 | `.btn .btn-danger` | `<n-button type="error">` | `<Button danger>` |
| 输入框 | `.form-input` | `<n-input />` | `<Input />` |
| 选择器 | 原生 select | `<n-select />` | `<Select />` |
| 表格 | `<table>` + Tailwind | `<n-data-table />` | `<Table />` |
| 卡片 | `.card` | `<n-card>` | `<Card>` |
| 标签 | `.tag .tag-success` | `<n-tag type="success">` | `<Tag color="success">` |
| 分页 | 手动实现 | `<n-pagination>` | Table 内置或 `<Pagination>` |
| **弹窗** | 固定定位 div | `<n-modal>` | `<Modal>` |
| **抽屉** | 固定定位 div | `<n-drawer>` | `<Drawer>` |
| **确认框** | 自定义弹窗 | `<n-dialog>` 或自定义 | `<Popconfirm>` 或 Modal |
| 空状态 | 自定义 | `<n-empty>` | `<Empty />` |
| 消息提示 | 自定义 | `window.$message.success()` | `message.success()` |
| 描述列表 | 自定义 | `<n-descriptions>` | `<Descriptions>` |

## 页面跳转 vs 弹窗对照

| 操作 | ❌ 错误做法（页面跳转） | ✅ 正确做法（弹窗） |
|------|----------------------|-------------------|
| 新增 | `href="xxx-add.html"` | 点击按钮打开弹窗 |
| 编辑 | `href="xxx-edit.html?id=1"` | 点击按钮打开弹窗 |
| 详情 | `href="xxx-detail.html?id=1"` | 点击按钮打开抽屉 |
| 删除 | `href="xxx-delete.html?id=1"` | 点击按钮打开确认弹窗 |

### 步骤 8：生成路由和导航

**导航栏**：
- 包含所有主要页面的链接
- 当前页面高亮

**页面跳转**：
- 按钮点击跳转
- 表单提交后跳转
- 返回列表/详情跳转

**路径规则（重要）**：
```
原型目录结构：
prd/prototype/
├── index.html          # 根目录页面
├── dashboard.html      # 根目录页面
└── pages/              # 子目录页面
    ├── user-management.html
    └── user-edit.html

链接规则：
- 根目录 → 根目录：直接文件名 (e.g., "dashboard.html")
- 根目录 → 子目录：加路径前缀 (e.g., "pages/user-management.html")
- 子目录 → 根目录：返回上层 (e.g., "../dashboard.html")
- 子目录 → 子目录：直接文件名 (e.g., "user-edit.html")

⚠️ 常见错误：
- ❌ pages/user-management.html 中跳转到 pages/user-edit.html 写成 "pages/user-edit.html"
- ✅ 正确写法：直接写 "user-edit.html"（同级目录不需要路径前缀）
- ❌ pages/user-management.html 中跳转到 dashboard.html 写成 "dashboard.html"
- ✅ 正确写法： "../dashboard.html"（需要返回上层）
```

**生成页面时的链接写法**：
| 当前页面 | 目标页面 | 链接写法 |
|---------|---------|---------|
| index.html | dashboard.html | `href="dashboard.html"` |
| index.html | pages/user-management.html | `href="pages/user-management.html"` |
| pages/user-management.html | dashboard.html | `href="../dashboard.html"` |
| pages/user-management.html | pages/user-edit.html | `href="user-edit.html"` |
| pages/user-edit.html | pages/user-management.html | `href="user-management.html"` |

### 步骤 9：检查和修复链接

生成完所有页面后，遍历检查每个 HTML 文件中的链接：

**检查清单**：
1. 导航栏链接路径是否正确
2. 按钮跳转链接是否正确
3. 表单提交后跳转链接是否正确
4. 返回列表/详情链接是否正确
5. **pages/ 内的页面跳转是否错误地加上了 `pages/` 前缀**

**修复规则**：
| 当前页面位置 | 目标页面 | 正确链接 |
|-------------|----------|---------|
| 根目录 (index.html) | dashboard.html | `dashboard.html` |
| 根目录 (index.html) | pages/*.html | `pages/xxx.html` |
| pages/*.html | 根目录页面 | `../dashboard.html` |
| pages/*.html | pages/*.html | `xxx.html` (同级) |

**常见错误及修复**：
| 错误场景 | 错误链接 | 修复后 |
|---------|---------|--------|
| pages 内跳转到 pages 内 | `href="pages/user-edit.html"` | `href="user-edit.html"` |
| pages 内返回根目录 | `href="dashboard.html"` | `href="../dashboard.html"` |
| 重复路径 | `href="pages/pages/xxx.html"` | `href="pages/xxx.html"` |

**检查方法**：
1. 遍历生成的所有 HTML 文件
2. 提取所有 `href` 和 `onclick`跳转链接
3. 验证目标文件是否存在
4. 修复路径错误的链接（可使用 `scripts/link_checker.js` 自动修复）

### 步骤 10：检查界面完整性

**⚠️ 重要检查（必须执行）**

## 检查清单一：导航结构完整性

每个页面（除登录页外）必须包含：
- [ ] Logo（点击可返回 dashboard）
- [ ] 侧边栏菜单（所有模块入口）
- [ ] 当前页面在菜单中高亮
- [ ] 用户信息区域

## 检查清单二：弹窗功能完整性

每个模块页面必须包含对应的弹窗：
- [ ] 新增弹窗（完整表单）
- [ ] 编辑弹窗（完整表单 + 默认值）
- [ ] 详情弹窗/抽屉（完整信息展示）
- [ ] 删除确认弹窗

## 检查清单三：禁止使用的内容

```javascript
❌ alert("新增成功")      → 应改为：弹窗 + 成功提示
❌ confirm("确定删除？")  → 应改为：确认弹窗
❌ prompt("请输入")       → 应改为：表单弹窗
❌ href="xxx-add.html"    → 应改为：弹窗实现
❌ href="xxx-edit.html"   → 应改为：弹窗实现
```

## 检查清单四：数据完整性

- [ ] 表格有表头 + 至少 3 条示例数据
- [ ] 表单有完整字段（所有必填项）
- [ ] 状态用 Tag 组件展示
- [ ] 操作按钮有实际功能

## 检查清单五：页面数量合理性

```
✅ 正确的页面数量：
- index.html (登录)
- dashboard.html (仪表盘)
- pages/user-management.html (用户管理)
- pages/order-management.html (订单管理)
- pages/product-management.html (商品管理)
- pages/settings.html (系统设置)

❌ 错误的页面数量（过度拆分）：
- pages/user-list.html
- pages/user-add.html      ← 不应该独立页面
- pages/user-edit.html     ← 不应该独立页面
- pages/user-detail.html   ← 不应该独立页面
```

---

## 完整性评分

| 检查项 | 要求 | 状态 |
|--------|------|------|
| 导航结构 | 每页有 Logo + 侧边栏 | ✅/❌ |
| 弹窗功能 | 新增/编辑/详情/删除都有弹窗 | ✅/❌ |
| 数据完整 | 表格至少 3 条数据 | ✅/❌ |
| 页面数量 | 没有过度拆分 | ✅/❌ |
| 链接正确 | 所有跳转路径正确 | ✅/❌ |

### 步骤 11：确认完成

输出完成信息：

```
✅ 原型已成功生成在：prd/prototype/

目录结构：
prd/prototype/
├── index.html              # 登录页
├── dashboard.html          # 仪表盘
└── pages/                  # 功能模块页面
    ├── user-management.html    # 用户管理（含新增/编辑/详情弹窗）
    ├── order-management.html   # 订单管理（含详情抽屉）
    └── settings.html           # 系统设置

质量检查：
✅ 每个页面都有完整的导航结构（Logo + 侧边栏）
✅ Logo 点击可返回仪表盘
✅ 所有 CRUD 操作通过弹窗实现
✅ 所有表格有示例数据（至少 3 条）
✅ 所有弹窗有完整表单/内容
✅ 链接跳转路径正确

页面数量统计：
- 总页面数：X 个
- 功能模块页面：X 个
- 弹窗组件：X 个

下一步：
使用 /prd-prototype preview 命令在浏览器中打开原型
```

## ⚠️ 格式要求

- 所有 HTML 文件使用 UTF-8 编码
- 页面之间跳转使用相对路径
- 外部资源使用 CDN 链接（如 Tailwind、Bootstrap）
- 确保所有链接有效，无 404 错误

## 技术栈模板选择

根据用户选择的技术栈，使用对应模板：

| 技术栈 | 模板文件 |
|--------|----------|
| HTML + Tailwind CSS | `templates/html_tailwind.html` |
| Vue + Naive UI | `templates/vue_naive.html` |
| React + Ant Design | `templates/react_antdesign.html` |

## 注意事项

### 产物路径规范

**目录结构**：
```
prd/                        # PRD 工作空间（prd-init 创建）
├── main_prd.md             # 主 PRD 文档
├── modules/                # 模块 PRD 目录
│   ├── 001_用户管理_prd.md
│   └── ...
└── prototype/              # 原型产物目录（固定位置）
    ├── index.html          # 首页/登录页
    ├── dashboard.html      # 仪表盘
    └── pages/              # 功能页面目录
        ├── user-management.html
        └── ...
```

**路径规则**：
| 当前页面 | 目标页面 | 链接写法 | 示例 |
|---------|---------|---------|------|
| 根目录 (index.html) | 根目录 | 直接文件名 | `dashboard.html` |
| 根目录 (index.html) | 子目录 | `pages/文件名` | `pages/user-management.html` |
| 子目录 (pages/*.html) | 根目录 | `../文件名` | `../dashboard.html` |
| 子目录 (pages/*.html) | 子目录 | 直接文件名 | `order-detail.html` |

### 生成后检查

- 生成前先分析 PRD，确保页面覆盖所有功能模块
- 页面命名使用英文（kebab-case）
- 保持页面风格一致性
- 确保所有页面可以正常跳转
- **生成完成后检查所有链接路径，确保跨目录跳转正确**

### 常见问题

**问题：登录后跳转 404**
- 原因：index.html 在根目录，跳转到 pages/dashboard.html 应该是 dashboard.html
- 修复：根目录页面跳转不需要 `pages/` 前缀

**问题：pages 内页面返回按钮无效**
- 原因：从 pages/ 返回根目录需要用 `../`
- 修复：`href="../dashboard.html"` 而不是 `href="dashboard.html"`