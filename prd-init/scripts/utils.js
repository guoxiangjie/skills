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

// 导出函数
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getCurrentDate,
    getFolderName,
    exists,
    mkdir,
    readFile,
    writeFile,
    replaceVariables
  };
}
