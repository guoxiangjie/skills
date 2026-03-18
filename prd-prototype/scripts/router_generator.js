/**
 * PRD 原型生成 - 路由生成脚本
 * 生成页面之间的跳转逻辑和导航菜单
 */

/**
 * 生成导航菜单 HTML
 * @param {Array} modules - 功能模块列表
 * @param {string} currentPage - 当前页面
 * @param {string} techStack - 技术栈 (tailwind/native/vue/react)
 * @returns {string} 导航菜单 HTML
 */
function generateNavMenu(modules, currentPage, techStack) {
    let navItems = '';

    modules.forEach(module => {
        const pageName = toKebabCase(module.name);
        const isActive = currentPage.includes(pageName) ? 'active' : '';

        switch (techStack) {
            case 'tailwind':
                navItems += `
<a href="pages/${pageName}.html" class="py-4 px-2 ${isActive ? 'text-blue-500 border-b-4 border-blue-500' : 'text-gray-500 hover:text-blue-500'} font-semibold">${module.name}</a>`;
                break;
            case 'native':
                navItems += `
<a href="pages/${pageName}.html" class="${isActive ? 'active' : ''}">${module.name}</a>`;
                break;
            case 'vue':
                navItems += `
<el-menu-item index="pages/${pageName}.html">${module.name}</el-menu-item>`;
                break;
            case 'react':
                navItems += `
<a href="pages/${pageName}.html" className="py-4 px-2 ${isActive ? 'text-blue-500 border-b-4 border-blue-500' : 'text-gray-500 hover:text-blue-500'} font-semibold">${module.name}</a>`;
                break;
        }
    });

    return navItems;
}

/**
 * 生成页面路由配置
 * @param {Array} modules - 功能模块列表
 * @param {string} techStack - 技术栈
 * @returns {string} 路由配置代码
 */
function generateRouterConfig(modules, techStack) {
    let routerCode = '';

    if (techStack === 'vue') {
        routerCode = generateVueRouter(modules);
    } else if (techStack === 'react') {
        routerCode = generateReactRouter(modules);
    } else {
        routerCode = generateSimpleRouter(modules);
    }

    return routerCode;
}

/**
 * 生成 Vue Router 配置
 */
function generateVueRouter(modules) {
    const routes = modules.map(module => {
        const pageName = toKebabCase(module.name);
        return `
    {
      path: '/pages/${pageName}',
      name: '${module.name.replace(/\s+/g, '')}',
      component: () => import('../pages/${pageName}.vue')
    }`;
    }).join(',');

    return `
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../pages/Dashboard.vue')
  },${routes}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;`;
}

/**
 * 生成 React Router 配置
 */
function generateReactRouter(modules) {
    const routes = modules.map(module => {
        const pageName = toKebabCase(module.name);
        return `
      <Route path="/pages/${pageName}" element={<${module.name.replace(/\s+/g, '')} />} />`;
    }).join('');

    return `
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />${routes}
      </Routes>
    </BrowserRouter>
  );
}`;
}

/**
 * 生成简单的前端跳转路由（适用于原生 HTML）
 */
function generateSimpleRouter(modules) {
    return `
// 简单的页面跳转函数
function navigateTo(page) {
    window.location.href = page;
}

// 返回上一页
function goBack() {
    window.history.back();
}

// 返回首页
function goHome() {
    window.location.href = 'index.html';
}`;
}

/**
 * 生成页面模板变量替换
 * @param {string} template - 模板内容
 * @param {Object} variables - 变量对象
 * @returns {string} 替换后的内容
 */
function replaceTemplateVariables(template, variables) {
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
        const placeholder = `{{${key}}}`;
        result = result.replace(new RegExp(placeholder, 'g'), value);
    }
    return result;
}

/**
 * 将中文转为 kebab-case
 */
function toKebabCase(str) {
    return str.replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
}

// 导出函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateNavMenu,
        generateRouterConfig,
        generateVueRouter,
        generateReactRouter,
        generateSimpleRouter,
        replaceTemplateVariables,
        toKebabCase
    };
}
