# Vite 项目初始化模板

## 项目创建命令

```bash
npm create vite@latest prototype -- --template react
cd prototype
npm install
```

## 依赖安装

### Web 端

```bash
npm install antd @ant-design/charts lucide-react react-router-dom axios dayjs
```

### 移动端

```bash
npm install antd-mobile @ant-design/charts lucide-react react-router-dom axios dayjs
```

## 项目配置

### vite.config.js

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
});
```

### package.json 脚本

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## 入口文件

### main.jsx

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import router from './router';
import './index.css';

const theme = {
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 6,
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <RouterProvider router={router} />
        </ConfigProvider>
  </React.StrictMode>
);
```

### index.css

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
}

#root {
  min-height: 100vh;
}
```

## 路由配置

### router/index.jsx

```jsx
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
    { index: true, element: <Home /> },
    // 其他路由
  ],
});

export default router;
```

## 布局组件

### Web 端布局

```jsx
// layouts/MainLayout.jsx
import React from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { Home, User, Settings } from 'lucide-react';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();

  const menuItems = [
    { key: '/', label: '首页', icon: <Home size={16} /> },
    { key: '/user', label: '用户管理', icon: <User size={16} /> },
    { key: '/settings', label: '设置', icon: <Settings size={16} /> },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200}>
        <div style={{ height: 32, margin: 16, background: '#fff' }} />
        <Menu
          mode="inline"
          defaultSelectedKeys={['/']}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: 16, padding: 24, background: '#fff' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
```

### 移动端布局

```jsx
// layouts/MobileLayout.jsx
import React from 'react';
import { TabBar } from 'antd-mobile';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, User, Settings } from 'lucide-react';

const MobileLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { key: '/', title: '首页', icon: <Home size={20} /> },
    { key: '/user', title: '我的', icon: <User size={20} /> },
    { key: '/settings', title: '设置', icon: <Settings size={20} /> },
  ];

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Outlet />
      </div>
      <TabBar activeKey={location.pathname} onChange={(key) => navigate(key)}>
        {tabs.map((tab) => (
          <TabBar.Item key={tab.key} icon={tab.icon} title={tab.title} />
        ))}
      </TabBar>
    </div>
  );
};

export default MobileLayout;
```

## 主题配置

### styles/theme.js

```javascript
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
