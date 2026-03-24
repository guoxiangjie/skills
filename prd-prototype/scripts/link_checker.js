/**
 * 链接检查器 - 检查并修复原型页面中的链接路径
 *
 * 用途：在生成原型后，检查所有 HTML 文件中的链接是否正确
 * 默认原型目录：prd/prototype/
 *
 * 修复规则：
 * - 根目录 → 根目录：直接文件名
 * - 根目录 → 子目录：加 pages/ 前缀
 * - 子目录 → 根目录：加 ../ 前缀
 * - 子目录 → 子目录：直接文件名
 */

const fs = require('fs');
const path = require('path');

class LinkChecker {
    constructor(prototypeDir) {
        this.prototypeDir = prototypeDir;
        this.fixedCount = 0;
        this.errorCount = 0;
        this.validFiles = new Set();
    }

    // 获取所有 HTML 文件
    getAllHtmlFiles(dir = this.prototypeDir) {
        let files = [];
        const items = fs.readdirSync(dir);

        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                // 跳过 node_modules 等目录
                if (!['node_modules', '.git', 'dist', 'build'].includes(item)) {
                    files = files.concat(this.getAllHtmlFiles(fullPath));
                }
            } else if (item.endsWith('.html')) {
                files.push(fullPath);
            }
        }

        return files;
    }

    // 获取有效目标文件列表
    getValidTargets() {
        const files = this.getAllHtmlFiles();
        const targets = new Set();

        for (const file of files) {
            const relativePath = path.relative(this.prototypeDir, file);
            targets.add(relativePath);
            // 也添加不带 pages/ 的文件名（用于同级跳转）
            targets.add(path.basename(file));
        }

        return targets;
    }

    // 判断文件是否在子目录中
    isInSubdir(filePath) {
        const relativePath = path.relative(this.prototypeDir, filePath);
        return relativePath.includes('pages') || relativePath.includes('src') || relativePath.includes('app');
    }

    // 获取文件所在目录
    getFileDir(filePath) {
        const relativePath = path.relative(this.prototypeDir, filePath);
        if (relativePath.includes('pages')) return 'pages';
        return 'root';
    }

    // 修复链接路径
    fixLink(currentFile, targetLink) {
        // 跳过外部链接
        if (targetLink.startsWith('http') || targetLink.startsWith('#') ||
            targetLink.startsWith('mailto:') || targetLink.startsWith('tel:')) {
            return targetLink;
        }

        // 跳过 JS 调用等非文件链接
        if (targetLink.startsWith('javascript:')) {
            return targetLink;
        }

        // 【重要】修复 pages/pages/ 重复路径错误
        if (targetLink.includes('pages/pages/')) {
            const fixedLink = targetLink.replace('pages/pages/', 'pages/');
            this.fixedCount++;
            console.log(`  [重复路径修复] ${targetLink} → ${fixedLink}`);
            // 递归调用，确保修复后的链接也正确
            return this.fixLink(currentFile, fixedLink);
        }

        const currentDir = this.getFileDir(currentFile);
        let fixedLink = targetLink;

        // 提取纯文件名（去掉路径）
        const targetBasename = path.basename(targetLink);
        const targetDirname = path.dirname(targetLink);

        // 检查目标文件是否存在
        let targetExists = this.checkFileExists(targetLink);

        if (currentDir === 'root') {
            // 从根目录跳转
            if (targetDirname === '.' || targetDirname === '') {
                // 目标是直接文件名
                if (!targetExists && fs.existsSync(path.join(this.prototypeDir, 'pages', targetBasename))) {
                    // 文件在 pages 目录下
                    fixedLink = 'pages/' + targetBasename;
                    this.fixedCount++;
                }
            }
        } else {
            // 从子目录跳转（pages/ 内的页面）
            if (targetDirname === '.' || targetDirname === '') {
                // 目标是直接文件名（如 "user-edit.html"）
                // 先检查是否是跳转到根目录页面
                if (fs.existsSync(path.join(this.prototypeDir, targetBasename))) {
                    // 根目录存在此文件，需要加 ../
                    if (!targetLink.startsWith('../')) {
                        fixedLink = '../' + targetBasename;
                        this.fixedCount++;
                        console.log(`  [根目录跳转] ${targetLink} → ${fixedLink}`);
                    }
                } else if (!targetExists) {
                    // 根目录不存在，检查 pages 目录
                    const pagesTarget = path.join(this.prototypeDir, 'pages', targetBasename);
                    if (fs.existsSync(pagesTarget)) {
                        // 文件在 pages 目录，当前也在 pages 目录，直接用文件名
                        // 但如果原链接包含 pages/ 前缀，需要移除
                        if (targetLink.startsWith('pages/')) {
                            fixedLink = targetBasename;
                            this.fixedCount++;
                            console.log(`  [pages 前缀移除] ${targetLink} → ${fixedLink}`);
                        }
                        // 否则保持原样（同级跳转）
                    } else {
                        this.errorCount++;
                        console.warn(`⚠️  无法找到目标文件：${targetLink} (当前：${currentFile})`);
                    }
                } else if (targetLink.startsWith('pages/')) {
                    // 链接已经有 pages/ 前缀，但当前也在 pages 目录，需要移除
                    fixedLink = targetBasename;
                    this.fixedCount++;
                    console.log(`  [pages 前缀移除] ${targetLink} → ${fixedLink}`);
                }
            } else if (targetDirname === 'pages') {
                // 链接明确指向 pages/ 目录（如 "pages/user-edit.html"）
                // 但当前也在 pages 目录，需要移除 pages/ 前缀
                fixedLink = targetBasename;
                this.fixedCount++;
                console.log(`  [pages 前缀移除] ${targetLink} → ${fixedLink}`);
            }
        }

        return fixedLink;
    }

    // 检查文件是否存在
    checkFileExists(link) {
        // 去掉查询参数和锚点
        const cleanLink = link.split('?')[0].split('#')[0];

        const fullPath = path.join(this.prototypeDir, cleanLink);
        return fs.existsSync(fullPath);
    }

    // 检查并修复单个文件
    checkAndFixFile(filePath) {
        let content = fs.readFileSync(filePath, 'utf-8');
        let originalContent = content;

        // 修复 href 链接
        content = content.replace(/href="([^"]+)"/g, (match, link) => {
            const fixedLink = this.fixLink(filePath, link);
            if (fixedLink !== link) {
                console.log(`  📝 修复 href: "${link}" → "${fixedLink}"`);
            }
            return `href="${fixedLink}"`;
        });

        // 修复 onclick 跳转 (window.location)
        content = content.replace(/window\.location\s*=\s*['"]([^'"]+)['"]/g, (match, link) => {
            const fixedLink = this.fixLink(filePath, link);
            if (fixedLink !== link) {
                console.log(`  📝 修复 location: "${link}" → "${fixedLink}"`);
            }
            return `window.location='${fixedLink}'`;
        });

        // 只在有修改时写入文件
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf-8');
        }
    }

    // 运行检查
    run() {
        console.log('🔍 开始检查原型链接...\n');

        const files = this.getAllHtmlFiles();
        console.log(`找到 ${files.length} 个 HTML 文件\n`);

        for (const file of files) {
            const relativePath = path.relative(this.prototypeDir, file);
            console.log(`检查：${relativePath}`);
            this.checkAndFixFile(file);
        }

        console.log('\n' + '='.repeat(50));
        if (this.fixedCount > 0) {
            console.log(`✅ 已修复 ${this.fixedCount} 处链接`);
        } else {
            console.log('✅ 所有链接路径正确');
        }

        if (this.errorCount > 0) {
            console.log(`⚠️  发现 ${this.errorCount} 个无法修复的链接（目标文件不存在）`);
        }

        return {
            fixed: this.fixedCount,
            errors: this.errorCount,
            success: this.errorCount === 0
        };
    }
}

// 命令行使用
if (require.main === module) {
    const targetDir = process.argv[2] || process.cwd();
    const checker = new LinkChecker(targetDir);
    const result = checker.run();
    process.exit(result.success ? 0 : 1);
}

module.exports = LinkChecker;
