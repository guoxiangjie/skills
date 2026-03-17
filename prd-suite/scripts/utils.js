/**
 * PRD 通用工具脚本
 * 提供日期处理、文件操作等通用功能
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
 * 解析版本号
 * @param {string} version - 版本号字符串
 * @returns {Object} 版本号对象
 */
function parseVersion(version) {
  const match = version.match(/v?(\d+)\.(\d+)/);
  if (match) {
    return {
      major: parseInt(match[1]),
      minor: parseInt(match[2])
    };
  }
  return { major: 1, minor: 0 };
}

/**
 * 计算新版本号
 * @param {string} currentVersion - 当前版本号
 * @param {string} changeType - 变更类型 ('major' 或 'minor')
 * @returns {string} 新版本号
 */
function calculateNewVersion(currentVersion, changeType) {
  const version = parseVersion(currentVersion);
  if (changeType === 'major') {
    return `v${version.major + 1}.0`;
  } else {
    return `v${version.major}.${version.minor + 1}`;
  }
}

/**
 * 格式化变更日志
 * @param {string} version - 版本号
 * @param {string} date - 日期
 * @param {Array} changes - 变更内容列表
 * @returns {string} 格式化的变更日志
 */
function formatChangelog(version, date, changes) {
  let result = `## [${version}] - ${date}\n\n`;
  result += `### 更新内容\n`;
  
  for (const change of changes) {
    result += `- ${change}\n`;
  }
  
  result += `\n### 影响范围\n`;
  result += `- 主PRD / 模块PRD\n`;
  
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
    replaceVariables,
    parseVersion,
    calculateNewVersion,
    formatChangelog
  };
}
