# 生成原型命令

## 功能说明

根据项目中的 PRD 文档生成可交互原型网页。

## 执行流程

### 步骤 1：依赖检测

🔄 **正在执行：依赖检测**
📋 **任务：检查 frontend-design skill 是否可用**

首先检查 `frontend-design` skill 是否可用：

```
检查方法：
1. 调用 Skill 工具查看可用技能列表
2. 检查是否存在 "frontend-design" 技能
3. 如果不存在，提示用户安装并终止流程
```

**如果 frontend-design skill 不可用：**

```
❌ 未检测到 frontend-design skill

此功能依赖 frontend-design skill 来获取页面风格和主题色。

请先安装 frontend-design skill：
1. 使用 npx skills add 命令安装
2. 安装完成后重新执行此命令

安装完成后，您就可以使用此功能将 PRD 文档转换为可交互原型网页了。
```

✅ **步骤 1/9：依赖检测完成**
📝 **详情：frontend-design skill 已安装**
⏱️ **耗时：1秒**

---

### 步骤 2：平台选择

🔄 **正在执行：平台选择**
📋 **任务：让用户选择目标平台**

询问用户目标平台：

```
请选择目标平台：
1. Web 端（使用 Ant Design）
2. 移动端（使用 Ant Design Mobile）

请输入数字选择：
```

根据选择确定技术栈：
- Web 端：React + Ant Design + Ant Design Charts + lucide-react
- 移动端：React + Ant Design Mobile + Ant Design Charts + lucide-react

✅ **步骤 2/9：平台选择完成**
📝 **详情：已选择 Web 端，使用 Ant Design**
⏱️ **耗时：2秒**

---

### 步骤 3：扫描 PRD 文件

🔄 **正在执行：扫描 PRD 文件**
📋 **任务：查找项目中的所有 PRD 文件**

扫描项目目录，查找所有 PRD 文件：

**扫描规则：**

1. **主 PRD 文件**
   - 文件名模式：`*_main_prd.md`
   - 位置：项目根目录或 `docs/` 目录
   - 通常只有一个主 PRD

2. **模块 PRD 文件**
   - 文件名模式：`*_module_prd.md`
   - 位置：项目根目录或 `docs/modules/` 目录
   - 可能有多个模块 PRD

**扫描命令示例：**

```bash
# 查找主 PRD
find . -name "*_main_prd.md" -type f

# 查找模块 PRD
find . -name "*_module_prd.md" -type f
```

✅ **步骤 3/9：扫描 PRD 文件完成**
📝 **详情：找到 1 个主 PRD，3 个模块 PRD**
⏱️ **耗时：1秒**

---

### 步骤 4：解析 PRD 内容

🔄 **正在执行：解析 PRD 内容**
📋 **任务：提取项目信息和模块清单**

#### 4.1 解析主 PRD

从主 PRD 中提取以下信息：

**文档基础信息**
- 项目名称
- 作者
- 版本

**项目背景与目标**
- 背景说明
- 产品目标列表

**核心业务流程**
- 业务流程概述
- Mermaid 流程图（转换为文字描述）

**功能模块清单**
- 模块列表（编号、名称、描述、优先级）
- 模块关系图

**用户故事概述**
- 用户角色与权限表
- 高层用户故事列表

#### 4.2 解析模块 PRD

从每个模块 PRD 中提取以下信息：

**模块基础信息**
- 模块名称
- 关联的主 PRD

**详细功能需求**
- 功能清单
- 功能流程图
- 功能详细说明（入口、权限、逻辑、字段、交互规则）

**用户故事详述**
- 完整用户故事（角色、目标、价值）
- 前置条件
- 操作流程
- 异常处理
- 验收标准

**用户界面设计**（核心内容）
- 核心屏幕和视图列表
- 页面流程图
- 页面说明与交互细节
- 界面布局图（ASCII 图）

**业务规则与边界条件**
- 业务规则表
- 边界条件列表

✅ **步骤 4/9：解析 PRD 内容完成**
📝 **详情：提取到 5 个功能模块，15 个页面，32 个功能点**
⏱️ **耗时：5秒**

---

### 步骤 5：获取设计规范

🔄 **正在执行：获取设计规范**
📋 **任务：调用 frontend-design skill 获取页面风格和主题色**

**调用 frontend-design skill：**

使用 Skill 工具调用 frontend-design skill，传入项目信息：

```
调用方式：
1. 使用 Skill 工具
2. 传入 skill 名称：frontend-design
3. 提供项目信息：
   - 项目名称
   - 项目背景
   - 目标用户
   - 功能模块列表
   - 平台类型（Web/移动端）
```

**获取的设计规范内容：**

frontend-design skill 会返回以下信息：

```json
{
  "theme": {
    "primaryColor": "#1890ff",
    "successColor": "#52c41a",
    "warningColor": "#faad14",
    "errorColor": "#ff4d4f",
    "infoColor": "#1890ff"
  },
  "style": {
    "designStyle": "现代简约",
    "borderRadius": 6,
    "shadow": "0 2px 8px rgba(0, 0, 0, 0.15)"
  },
  "layout": {
    "headerHeight": 64,
    "siderWidth": 200,
    "contentPadding": 24
  },
  "typography": {
    "fontFamily": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    "fontSize": 14,
    "lineHeight": 1.5
  }
}
```

✅ **步骤 5/9：获取设计规范完成**
📝 **详情：已获取主题色 #1890ff，设计风格：现代简约**
⏱️ **耗时：3秒**

---

### 步骤 6：初始化 Vite 项目

🔄 **正在执行：初始化 Vite 项目**
📋 **任务：创建 React 项目骨架**

**执行命令：**

```bash
# 创建项目
npm create vite@latest prototype -- --template react

# 进入项目目录
cd prototype

# 安装基础依赖
npm install

# 安装 UI 框架（根据平台选择）
# Web 端
npm install antd @ant-design/charts lucide-react

# 移动端
npm install antd-mobile @ant-design/charts lucide-react

# 安装路由
npm install react-router-dom

# 安装其他工具库
npm install axios dayjs
```

**创建项目结构：**

```
prototype/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── router/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

✅ **步骤 6/9：初始化项目完成**
📝 **详情：已创建 Vite + React 项目，安装所有依赖**
⏱️ **耗时：20秒**

---

### 步骤 7：生成页面组件

🔄 **正在执行：生成页面组件**
📋 **任务：为每个页面生成 React 组件**

**为每个模块生成页面：**

1. **创建页面目录**
   ```
   src/pages/[ModuleName]/
   ├── index.jsx           # 页面入口
   ├── components/         # 页面专用组件
   │   ├── Form.jsx        # 表单组件
   │   ├── List.jsx        # 列表组件
   │   └── Detail.jsx      # 详情组件
   └── style.module.css    # 样式文件
   ```

2. **生成页面组件代码**
   - 根据界面设计生成布局
   - 使用 Ant Design 组件
   - 使用 lucide-react 图标
   - 实现交互逻辑
   - 添加表单验证
   - 添加列表展示
   - 添加图表展示（如有）
   - 应用 frontend-design 返回的主题色

3. **配置路由**
   ```jsx
   // src/router/index.jsx
   import { createBrowserRouter } from 'react-router-dom';
   import MainLayout from '../layouts/MainLayout';

   const router = createBrowserRouter([
     {
       path: '/',
       element: <MainLayout />,
       children: [
         { index: true, element: <Home /> },
         { path: 'user', element: <User /> },
         { path: 'product', element: <Product /> },
         // ... 其他路由
       ],
     },
   ]);

   export default router;
   ```

**内容完整性检查：**

- 检查是否所有模块都有对应页面
- 检查是否所有页面都有路由配置
- 检查是否所有表单都有验证规则
- 检查是否所有列表都有数据展示

✅ **步骤 7/9：生成页面组件完成**
📝 **详情：已生成 15 个页面组件，配置路由**
⏱️ **耗时：30秒**

---

### 步骤 8：生成通用组件

🔄 **正在执行：生成通用组件**
📋 **任务：生成表单、列表、图表组件**

**生成可复用的组件：**

1. **表单组件**
   - SearchForm - 搜索表单
   - FormBuilder - 动态表单构建器

2. **列表组件**
   - DataTable - 数据表格
   - CardList - 卡片列表

3. **图表组件**
   - LineChart - 折线图
   - ColumnChart - 柱状图
   - PieChart - 饼图

✅ **步骤 8/9：生成通用组件完成**
📝 **详情：已生成 8 个通用组件**
⏱️ **耗时：15秒**

---

### 步骤 9：完善项目配置

🔄 **正在执行：完善项目配置**
📋 **任务：配置路由、主题、样式**

**配置项目：**

1. **配置 Ant Design 主题**
   ```jsx
   // src/App.jsx
   import { ConfigProvider } from 'antd';

   const theme = {
     token: {
       colorPrimary: '#1890ff', // 来自 frontend-design
       colorSuccess: '#52c41a',
       colorWarning: '#faad14',
       colorError: '#ff4d4f',
       colorInfo: '#1890ff',
       borderRadius: 6,
     },
   };

   const App = () => (
     <ConfigProvider theme={theme}>
       {/* 应用内容 */}
     </ConfigProvider>
   );
   ```

2. **创建主题配置文件**
   ```jsx
   // src/styles/theme.js
   export const theme = {
     colors: {
       primary: '#1890ff',
       success: '#52c41a',
       warning: '#faad14',
       error: '#ff4d4f',
       info: '#1890ff',
     },
     layout: {
       headerHeight: 64,
       siderWidth: 200,
       contentPadding: 24,
     },
     typography: {
       fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto",
       fontSize: 14,
       lineHeight: 1.5,
     },
   };
   ```

3. **配置全局样式**
   ```css
   /* src/styles/global.css */
   * {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
   }

   body {
     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
     font-size: 14px;
     line-height: 1.5;
   }
   ```

✅ **步骤 9/9：完善项目配置完成**
📝 **详情：已配置路由、主题（主题色 #1890ff）、全局样式**
⏱️ **耗时：5秒**

---

## 完成提示

🎉 **原型项目生成完成！**

📁 **项目位置：** `prototype/`
🚀 **启动命令：** `cd prototype && npm run dev`
📦 **构建命令：** `cd prototype && npm run build`

---

## 用户选择

如果扫描到多个模块 PRD，询问用户：

```
检测到以下模块 PRD：
1. [模块1名称] - [模块1描述]
2. [模块2名称] - [模块2描述]
3. [模块3名称] - [模块3描述]

请选择要生成原型的模块：
- 输入数字选择单个模块
- 输入 "all" 生成所有模块
- 输入 "main" 仅生成主页面
```

---

## 错误处理

### 依赖缺失

```
❌ 错误：缺少 frontend-design skill

请先安装 frontend-design skill 后再使用此功能。
```

### PRD 文件未找到

```
❌ 错误：未找到 PRD 文件

请确保项目中存在以下文件之一：
- *_main_prd.md（主 PRD）
- *_module_prd.md（模块 PRD）

您可以使用 prd-suite skill 创建 PRD 文档。
```

### PRD 格式错误

```
⚠️ 警告：PRD 文件格式可能不完整

文件：[文件名]
缺失章节：[章节名称]

建议：使用 prd-suite skill 更新 PRD 文档。
是否继续生成？（可能影响原型质量）
```

---

## 注意事项

1. **首次使用**：确保已安装 frontend-design skill
2. **PRD 质量**：PRD 文档越完整，生成的原型质量越高
3. **界面设计**：模块 PRD 中的"用户界面设计"章节是生成原型的关键
4. **迭代优化**：生成后可根据需要调整 PRD 并重新生成
5. **实时反馈**：生成过程有实时进度反馈，请耐心等待
6. **主题色应用**：主题色由 frontend-design skill 决定，会自动应用到项目中
