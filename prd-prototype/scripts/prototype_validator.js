/**
 * 原型完整性验证器
 *
 * 功能：
 * 1. 检查 pages.json 中所有页面是否已生成
 * 2. 检查所有链接目标是否有效
 * 3. 检查页面内容完整性
 * 4. 检查设计美学准则
 * 5. 生成检查报告
 */

const fs = require('fs');
const path = require('path');

class PrototypeValidator {
    constructor(prototypeDir) {
        this.prototypeDir = prototypeDir;
        this.pagesJsonPath = path.join(prototypeDir, 'pages.json');
        this.report = {
            passed: [],
            warnings: [],
            errors: [],
            summary: {
                totalPages: 0,
                generatedPages: 0,
                validLinks: 0,
                brokenLinks: 0,
                missingElements: 0,
                aestheticIssues: 0
            }
        };
    }

    // 加载页面契约
    loadPagesJson() {
        if (!fs.existsSync(this.pagesJsonPath)) {
            return null;
        }
        try {
            const content = fs.readFileSync(this.pagesJsonPath, 'utf-8');
            return JSON.parse(content);
        } catch (e) {
            console.error('解析 pages.json 失败:', e.message);
            return null;
        }
    }

    // 检查页面文件是否存在
    checkPageExists(filename) {
        const filePath = path.join(this.prototypeDir, filename);
        return fs.existsSync(filePath);
    }

    // 提取页面中的所有链接
    extractLinks(htmlContent) {
        const links = new Set();
        const hrefRegex = /href="([^"]+)"/g;
        let match;

        while ((match = hrefRegex.exec(htmlContent)) !== null) {
            const link = match[1];
            // 过滤外部链接、锚点、JS调用
            if (!link.startsWith('http') &&
                !link.startsWith('#') &&
                !link.startsWith('javascript:') &&
                !link.startsWith('mailto:') &&
                !link.startsWith('tel:')) {
                links.add(link.split('?')[0].split('#')[0]); // 去掉查询参数和锚点
            }
        }

        return Array.from(links);
    }

    // 检查页面内容完整性
    checkPageCompleteness(filename, pageConfig) {
        const filePath = path.join(this.prototypeDir, filename);
        const issues = [];

        if (!fs.existsSync(filePath)) {
            return { passed: false, issues: ['页面文件不存在'] };
        }

        const content = fs.readFileSync(filePath, 'utf-8');

        // 检查1: 导航结构
        if (pageConfig.requireNav !== false) {
            if (!content.includes('sidebar') && !content.includes('侧边栏') && !content.includes('nav')) {
                issues.push('缺少侧边栏导航');
            }
            if (!content.includes('breadcrumb') && !content.includes('面包屑')) {
                issues.push('缺少面包屑导航');
            }
        }

        // 检查2: Logo返回链接
        if (content.includes('dashboard.html') === false && filename !== 'dashboard.html') {
            issues.push('缺少返回仪表盘的链接');
        }

        // 检查3: 表格数据（如果有表格）
        if (content.includes('<table') || content.includes('Table') || content.includes('table')) {
            const rowCount = (content.match(/<tr/g) || []).length;
            const rowCount2 = (content.match(/TableRow/g) || []).length;
            if (rowCount < 3 && rowCount2 < 3) {
                issues.push('表格数据不足（少于3行）');
            }
        }

        // 检查4: 弹窗实现（如果配置了弹窗）
        if (pageConfig.modals && pageConfig.modals.length > 0) {
            const modalCount = (content.match(/modal|Modal|Dialog|dialog/g) || []).length;
            if (modalCount < pageConfig.modals.length) {
                issues.push(`弹窗实现不完整（配置${pageConfig.modals.length}个，检测到${modalCount}个）`);
            }
        }

        // 检查5: 禁止的元素
        if (content.includes('alert(') || content.includes('confirm(') || content.includes('prompt(')) {
            issues.push('使用了 alert/confirm/prompt（应使用自定义弹窗）');
        }

        // 检查6: 占位文字
        if (content.includes('此处显示') || content.includes('TODO') || content.includes('待实现')) {
            issues.push('包含占位文字或待实现标记');
        }

        return {
            passed: issues.length === 0,
            issues
        };
    }

    // 检查设计美学准则
    checkDesignAesthetics(filename, content) {
        const issues = [];

        // 检查禁止的字体
        const forbiddenFonts = ['Inter', 'Roboto', 'Arial', 'Helvetica', 'system-ui'];
        for (const font of forbiddenFonts) {
            const regex = new RegExp(`font-family:[^}]*${font}`, 'i');
            if (regex.test(content)) {
                issues.push(`使用了禁止的字体：${font}`);
            }
            // 检查 Google Fonts 引入
            const googleFontsRegex = new RegExp(`family=${font}`, 'i');
            if (googleFontsRegex.test(content)) {
                issues.push(`通过 Google Fonts 引入了禁止的字体：${font}`);
            }
        }

        // 检查是否有独特的字体引入
        if (!content.includes('fonts.googleapis.com') && !content.includes('fonts.gstatic.com')) {
            issues.push('未引入独特字体（建议使用 Google Fonts）');
        }

        // 检查禁止的配色模式
        if (content.includes('#667eea') && content.includes('#764ba2')) {
            issues.push('使用了泛滥的紫色渐变配色');
        }

        // 检查是否有 CSS 变量定义
        if (!content.includes('--accent') && !content.includes('--primary')) {
            issues.push('缺少 CSS 变量定义（应使用统一的设计变量）');
        }

        // 检查是否有入场动画
        if (!content.includes('@keyframes') && !content.includes('animation:')) {
            issues.push('缺少入场动画（建议添加 fadeInUp 等动画）');
        }

        // 检查字重对比
        const hasStrongContrast = (content.includes('font-weight: 800') || content.includes('font-weight: 900')) &&
                                   (content.includes('font-weight: 400') || content.includes('font-weight: 500'));
        if (!hasStrongContrast) {
            issues.push('缺少字重对比（建议标题 800/900 vs 正文 400/500）');
        }

        return {
            passed: issues.length === 0,
            issues
        };
    }

    // 执行完整验证
    validate() {
        console.log('🔍 开始原型完整性验证...\n');

        const pagesJson = this.loadPagesJson();

        if (!pagesJson) {
            console.log('⚠️  未找到 pages.json，跳过契约验证\n');
            return this.validateWithoutContract();
        }

        console.log(`📋 已加载页面契约：${pagesJson.pages.length} 个页面\n`);
        this.report.summary.totalPages = pagesJson.pages.length;

        // 1. 检查所有页面是否生成
        console.log('━━━ 1. 页面生成检查 ━━━');
        for (const page of pagesJson.pages) {
            const exists = this.checkPageExists(page.file);
            if (exists) {
                this.report.passed.push(`✅ ${page.file} - 已生成`);
                this.report.summary.generatedPages++;
            } else {
                this.report.errors.push(`❌ ${page.file} - 未生成`);
            }
        }

        // 2. 检查链接有效性
        console.log('\n━━━ 2. 链接有效性检查 ━━━');
        const validTargets = new Set(pagesJson.pages.map(p => p.file));
        validTargets.add('index.html');
        validTargets.add('dashboard.html');

        for (const page of pagesJson.pages) {
            if (!this.checkPageExists(page.file)) continue;

            const filePath = path.join(this.prototypeDir, page.file);
            const content = fs.readFileSync(filePath, 'utf-8');
            const links = this.extractLinks(content);

            for (const link of links) {
                // 检查链接是否指向有效的页面
                const linkFile = link.includes('/') ? path.basename(link) : link;
                if (validTargets.has(linkFile)) {
                    this.report.summary.validLinks++;
                } else if (this.checkPageExists(linkFile)) {
                    this.report.summary.validLinks++;
                } else {
                    this.report.warnings.push(`⚠️  ${page.file} 中的链接 "${link}" 指向不存在的页面`);
                    this.report.summary.brokenLinks++;
                }
            }
        }

        // 3. 检查页面内容完整性
        console.log('\n━━━ 3. 页面内容完整性检查 ━━━');
        for (const page of pagesJson.pages) {
            if (!this.checkPageExists(page.file)) continue;

            const result = this.checkPageCompleteness(page.file, page);
            if (result.passed) {
                this.report.passed.push(`✅ ${page.file} - 内容完整`);
            } else {
                for (const issue of result.issues) {
                    this.report.warnings.push(`⚠️  ${page.file}: ${issue}`);
                    this.report.summary.missingElements++;
                }
            }
        }

        // 4. 检查导航一致性
        console.log('\n━━━ 4. 导航一致性检查 ━━━');
        if (pagesJson.nav_items && pagesJson.nav_items.length > 0) {
            for (const page of pagesJson.pages) {
                if (!this.checkPageExists(page.file)) continue;

                const filePath = path.join(this.prototypeDir, page.file);
                const content = fs.readFileSync(filePath, 'utf-8');

                for (const navItem of pagesJson.nav_items) {
                    if (!content.includes(navItem.href)) {
                        this.report.warnings.push(`⚠️  ${page.file} 缺少导航项 "${navItem.label}"`);
                    }
                }
            }
        }

        // 5. 检查设计美学准则
        console.log('\n━━━ 5. 设计美学准则检查 ━━━');
        for (const page of pagesJson.pages) {
            if (!this.checkPageExists(page.file)) continue;

            const filePath = path.join(this.prototypeDir, page.file);
            const content = fs.readFileSync(filePath, 'utf-8');

            const result = this.checkDesignAesthetics(page.file, content);
            if (result.passed) {
                this.report.passed.push(`✅ ${page.file} - 设计美学合规`);
            } else {
                for (const issue of result.issues) {
                    this.report.warnings.push(`🎨 ${page.file}: ${issue}`);
                    this.report.summary.aestheticIssues++;
                }
            }
        }

        return this.generateReport();
    }

    // 无契约时的简化验证
    validateWithoutContract() {
        const files = fs.readdirSync(this.prototypeDir)
            .filter(f => f.endsWith('.html'));

        console.log(`📁 找到 ${files.length} 个 HTML 文件\n`);

        for (const file of files) {
            const filePath = path.join(this.prototypeDir, file);
            const content = fs.readFileSync(filePath, 'utf-8');

            // 基本检查
            const issues = [];
            if (!content.includes('<nav') && !content.includes('nav')) {
                issues.push('缺少导航');
            }
            if (content.includes('alert(')) {
                issues.push('使用了 alert');
            }

            // 设计美学检查
            const aestheticResult = this.checkDesignAesthetics(file, content);
            issues.push(...aestheticResult.issues);

            if (issues.length === 0) {
                this.report.passed.push(`✅ ${file}`);
            } else {
                this.report.warnings.push(`⚠️  ${file}: ${issues.join(', ')}`);
            }
        }

        return this.generateReport();
    }

    // 生成检查报告
    generateReport() {
        console.log('\n' + '═'.repeat(60));
        console.log('📊 原型完整性检查报告');
        console.log('═'.repeat(60));

        console.log('\n【统计摘要】');
        console.log(`  页面生成：${this.report.summary.generatedPages}/${this.report.summary.totalPages}`);
        console.log(`  有效链接：${this.report.summary.validLinks}`);
        console.log(`  失效链接：${this.report.summary.brokenLinks}`);
        console.log(`  内容问题：${this.report.summary.missingElements}`);
        console.log(`  美学问题：${this.report.summary.aestheticIssues}`);

        if (this.report.passed.length > 0) {
            console.log('\n【✅ 通过项】');
            this.report.passed.slice(0, 10).forEach(item => console.log(`  ${item}`));
            if (this.report.passed.length > 10) {
                console.log(`  ... 还有 ${this.report.passed.length - 10} 项`);
            }
        }

        if (this.report.warnings.length > 0) {
            console.log('\n【⚠️  警告】');
            this.report.warnings.forEach(item => console.log(`  ${item}`));
        }

        if (this.report.errors.length > 0) {
            console.log('\n【❌ 错误】');
            this.report.errors.forEach(item => console.log(`  ${item}`));
        }

        console.log('\n' + '═'.repeat(60));

        const hasErrors = this.report.errors.length > 0;
        const hasWarnings = this.report.warnings.length > 0;

        if (!hasErrors && !hasWarnings) {
            console.log('✅ 原型完整性检查通过！');
        } else if (!hasErrors) {
            console.log('⚠️  原型已生成，但存在警告项需要关注');
        } else {
            console.log('❌ 原型完整性检查未通过，请修复上述问题');
        }

        return {
            success: !hasErrors,
            hasWarnings,
            report: this.report
        };
    }
}

// 命令行使用
if (require.main === module) {
    const targetDir = process.argv[2] || process.cwd();
    const validator = new PrototypeValidator(targetDir);
    const result = validator.validate();
    process.exit(result.success ? 0 : 1);
}

module.exports = PrototypeValidator;