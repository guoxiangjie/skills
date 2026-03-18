/**
 * PRD 原型生成 - 页面分析脚本
 * 从 PRD 文档中提取页面信息和跳转关系
 */

/**
 * 从主 PRD 提取功能模块清单
 * @param {string} mainPrdContent - 主 PRD 内容
 * @returns {Array} 功能模块列表
 */
function extractModules(mainPrdContent) {
    const modules = [];

    // 匹配功能模块清单章节
    const moduleSection = mainPrdContent.match(/## 第？\d+ 章 功能模块清单？([\s\S]*?)(?=## 第？\d+|$)/i);

    if (moduleSection) {
        // 提取表格中的模块
        const tableRows = moduleSection[0].match(/\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|/g);

        if (tableRows) {
            tableRows.forEach((row, index) => {
                if (index > 0) { // 跳过表头
                    const cells = row.split('|').map(cell => cell.trim()).filter(cell => cell);
                    if (cells.length >= 3) {
                        modules.push({
                            name: cells[1],
                            description: cells[2],
                            priority: cells[3] || '中'
                        });
                    }
                }
            });
        }
    }

    return modules;
}

/**
 * 从 PRD 提取业务流程
 * @param {string} mainPrdContent - 主 PRD 内容
 * @returns {Array} 流程步骤列表
 */
function extractBusinessFlow(mainPrdContent) {
    const flows = [];

    // 匹配业务流程章节
    const flowSection = mainPrdContent.match(/## 第？\d+ 章 核心业务流程？([\s\S]*?)(?=## 第？\d+|$)/i);

    if (flowSection) {
        // 提取 mermaid 流程图
        const mermaidMatch = flowSection[0].match(/```mermaid([\s\S]*?)```/);
        if (mermaidMatch) {
            flows.push({
                type: 'flowchart',
                content: mermaidMatch[1]
            });
        }

        // 提取文字描述的流程步骤
        const steps = flowSection[0].match(/\d+\.\s*([^.\n]+)/g);
        if (steps) {
            steps.forEach(step => {
                flows.push({
                    type: 'step',
                    content: step.replace(/^\d+\.\s*/, '')
                });
            });
        }
    }

    return flows;
}

/**
 * 从模块 PRD 提取详细页面信息
 * @param {string} modulePrdContent - 模块 PRD 内容
 * @returns {Object} 页面信息
 */
function extractModulePages(modulePrdContent) {
    const pages = {
        list: null,      // 列表页
        detail: null,    // 详情页
        create: null,    // 创建页
        edit: null,      // 编辑页
        custom: []       // 自定义页面
    };

    // 检查是否有用户故事章节（推断页面类型）
    const userStorySection = modulePrdContent.match(/## 第？\d+ 章 用户故事 (?:详述 |)?([\s\S]*?)(?=## 第？\d+|$)/i);

    if (userStorySection) {
        // 从用户故事推断页面
        if (userStorySection[0].includes('查看')) pages.detail = '详情页';
        if (userStorySection[0].includes('新增') || userStorySection[0].includes('创建')) pages.create = '新增页';
        if (userStorySection[0].includes('编辑') || userStorySection[0].includes('修改')) pages.edit = '编辑页';
        if (userStorySection[0].includes('列表') || userStorySection[0].includes('所有')) pages.list = '列表页';
    }

    // 提取界面设计章节的页面
    const uiSection = modulePrdContent.match(/## 第？\d+ 章 用户界面设计？([\s\S]*?)(?=## 第？\d+|$)/i);

    if (uiSection) {
        // 提取页面列表
        const pageItems = uiSection[0].match(/\d+\.\s*([^.\n]+)/g);
        if (pageItems) {
            pageItems.forEach(item => {
                const pageName = item.replace(/^\d+\.\s*/, '').trim();
                if (!Object.values(pages).includes(pageName)) {
                    pages.custom.push(pageName);
                }
            });
        }
    }

    return pages;
}

/**
 * 生成页面跳转关系
 * @param {Array} modules - 功能模块列表
 * @param {Array} flows - 业务流程列表
 * @returns {Object} 跳转关系对象
 */
function generateRoutes(modules, flows) {
    const routes = {
        'index.html': {
            title: '首页',
            description: '登录/欢迎页面',
            links: ['dashboard.html']
        },
        'dashboard.html': {
            title: '仪表盘',
            description: '数据概览和快捷入口',
            links: modules.map(m => `pages/${toKebabCase(m.name)}.html`)
        }
    };

    // 为每个模块生成页面路由
    modules.forEach(module => {
        const pageName = toKebabCase(module.name);
        routes[`pages/${pageName}.html`] = {
            title: module.name,
            description: module.description,
            links: [
                'dashboard.html',
                `pages/${pageName}-detail.html`,
                `pages/${pageName}-create.html`
            ]
        };
    });

    return routes;
}

/**
 * 将中文转为 kebab-case
 * @param {string} str - 中文字符串
 * @returns {string} kebab-case 字符串（拼音或英文）
 */
function toKebabCase(str) {
    // 简单处理：移除特殊字符，保留中文
    // 实际使用时可以用拼音库转换
    return str.replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
}

// 导出函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        extractModules,
        extractBusinessFlow,
        extractModulePages,
        generateRoutes,
        toKebabCase
    };
}
