/**
 * PRD 初始化辅助脚本
 */

/**
 * 获取当前日期，格式为 YYYY-MM-DD
 * @returns {string} 当前日期
 */
function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 提取文件夹名称
 * @param {string} path - 完整路径
 * @returns {string} 文件夹名称
 */
function getFolderName(path) {
  return path.split('/').pop().split('\\').pop();
}

/**
 * 检查路径是否存在
 * @param {string} path - 检查的路径
 * @returns {boolean} 是否存在
 */
function exists(path) {
  try {
    const fs = require('fs');
    return fs.existsSync(path);
  } catch (error) {
    return false;
  }
}

/**
 * 创建目录
 * @param {string} path - 目录路径
 */
function mkdir(path) {
  try {
    const fs = require('fs');
    const pathModule = require('path');
    
    const parts = path.split(pathModule.sep);
    let current = parts[0];
    
    for (let i = 1; i < parts.length; i++) {
      current += pathModule.sep + parts[i];
      if (!exists(current)) {
        fs.mkdirSync(current);
      }
    }
  } catch (error) {
    console.error('创建目录失败:', error.message);
  }
}

/**
 * 读取文件
 * @param {string} filePath - 文件路径
 * @returns {string|null} 文件内容
 */
function readFile(filePath) {
  try {
    const fs = require('fs');
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error('读取文件失败:', error.message);
    return null;
  }
}

/**
 * 写入文件
 * @param {string} filePath - 文件路径
 * @param {string} content - 文件内容
 * @returns {boolean} 是否成功
 */
function writeFile(filePath, content) {
  try {
    const fs = require('fs');
    const pathModule = require('path');
    
    // 确保目录存在
    const dir = pathModule.dirname(filePath);
    if (!exists(dir)) {
      mkdir(dir);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  } catch (error) {
    console.error('写入文件失败:', error.message);
    return false;
  }
}

/**
 * 替换模板变量
 * @param {string} content - 模板内容
 * @param {Object} variables - 变量对象
 * @returns {string} 替换后的内容
 */
function replaceVariables(content, variables) {
  let result = content;
  for (const [key, value] of Object.entries(variables)) {
    const placeholder = `{{${key}}}`;
    result = result.replace(new RegExp(placeholder, 'g'), value);
  }
  return result;
}

/**
 * 递归扫描目录，查找是否存在有效的 PRD 文档包结构
 * 有效 PRD 结构：存在 prd/ 文件夹，且包含 README.md、PRD_INDEX.md、CHANGELOG.md
 * @param {string} rootPath - 扫描的根路径
 * @returns {string|null} 找到的 PRD 结构路径（prd 目录的父目录），未找到返回 null
 */
function scanForExistingPrd(rootPath) {
  try {
    const fs = require('fs');
    const pathModule = require('path');

    /**
     * 递归扫描函数
     * @param {string} currentPath - 当前扫描路径
     * @returns {string|null}
     */
    function scan(currentPath) {
      // 检查当前路径下是否有 prd 文件夹
      const prdPath = pathModule.join(currentPath, 'prd');
      if (fs.existsSync(prdPath) && fs.statSync(prdPath).isDirectory()) {
        // 检查 prd 文件夹内是否包含必需的三个文件
        const readmePath = pathModule.join(prdPath, 'README.md');
        const indexPath = pathModule.join(prdPath, 'PRD_INDEX.md');
        const changelogPath = pathModule.join(prdPath, 'CHANGELOG.md');

        if (fs.existsSync(readmePath) &&
            fs.existsSync(indexPath) &&
            fs.existsSync(changelogPath)) {
          return currentPath; // 返回 prd 的父目录路径
        }
      }

      // 递归扫描子目录
      try {
        const items = fs.readdirSync(currentPath);
        for (const item of items) {
          const itemPath = pathModule.join(currentPath, item);
          // 跳过 node_modules、.git、隐藏文件夹等
          if (item.startsWith('.') || item === 'node_modules' || item === 'dist' || item === 'build') {
            continue;
          }
          if (fs.statSync(itemPath).isDirectory()) {
            const found = scan(itemPath);
            if (found) return found;
          }
        }
      } catch (e) {
        // 无法读取目录时跳过
      }

      return null;
    }

    return scan(rootPath);
  } catch (error) {
    console.error('扫描 PRD 结构失败:', error.message);
    return null;
  }
}

// 导出函数
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getCurrentDate,
    getFolderName,
    exists,
    mkdir,
    readFile,
    writeFile,
    replaceVariables,
    scanForExistingPrd
  };
}
