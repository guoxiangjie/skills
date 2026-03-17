/**
 * PRD 需求解析脚本
 * 用于从自然语言需求模板中提取结构化信息
 */

/**
 * 从自然语言需求中提取项目名称
 * @param {string} content - 需求内容
 * @returns {string|null} 项目名称
 */
function extractProjectName(content) {
  const pattern = /## 📝 项目名称[\s\S]*?(?=##|$)/i;
  const match = content.match(pattern);
  
  if (match) {
    let text = match[0].replace(/## 📝 项目名称\s*/i, '').trim();
    // 移除分隔线
    text = text.replace(/^---\s*$/gm, '').trim();
    return text || null;
  }
  return null;
}

/**
 * 从自然语言需求中提取项目一句话介绍
 * @param {string} content - 需求内容
 * @returns {string|null} 项目一句话介绍
 */
function extractProjectIntro(content) {
  const pattern = /## 🎯 项目一句话介绍[\s\S]*?(?=##|$)/i;
  const match = content.match(pattern);
  
  if (match) {
    let text = match[0].replace(/## 🎯 项目一句话介绍\s*/i, '').trim();
    // 移除分隔线
    text = text.replace(/^---\s*$/gm, '').trim();
    return text || null;
  }
  return null;
}

/**
 * 从自然语言需求中提取核心功能
 * @param {string} content - 需求内容
 * @returns {Array} 功能列表
 */
function extractCoreFeatures(content) {
  const pattern = /## 📋 核心功能[\s\S]*?(?=##|$)/i;
  const match = content.match(pattern);
  
  if (match) {
    let text = match[0].replace(/## 📋 核心功能\s*/i, '').trim();
    // 移除分隔线
    text = text.replace(/^---\s*$/gm, '').trim();
    const lines = text.split('\n');
    
    const features = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && trimmed) {
        features.push(trimmed);
      }
    }
    
    return features;
  }
  return [];
}

/**
 * 从自然语言需求中提取使用者信息
 * @param {string} content - 需求内容
 * @returns {Object} 使用者信息
 */
function extractUsers(content) {
  const pattern = /## 👥 使用者[\s\S]*?(?=##|$)/i;
  const match = content.match(pattern);
  
  if (match) {
    let text = match[0].replace(/## 👥 使用者\s*/i, '').trim();
    // 移除分隔线
    text = text.replace(/^---\s*$/gm, '').trim();
    return text || null;
  }
  return null;
}

/**
 * 从自然语言需求中提取主要目标
 * @param {string} content - 需求内容
 * @returns {Array} 目标列表
 */
function extractGoals(content) {
  const pattern = /## 💡 主要目标[\s\S]*?(?=##|$)/i;
  const match = content.match(pattern);
  
  if (match) {
    let text = match[0].replace(/## 💡 主要目标\s*/i, '').trim();
    // 移除分隔线
    text = text.replace(/^---\s*$/gm, '').trim();
    const lines = text.split('\n');
    
    const goals = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && trimmed) {
        goals.push(trimmed);
      }
    }
    
    return goals;
  }
  return [];
}

/**
 * 从自然语言需求中提取业务流程
 * @param {string} content - 需求内容
 * @returns {string|null} 业务流程
 */
function extractBusinessProcess(content) {
  const pattern = /## 🔄 业务流程[\s\S]*?(?=##|$)/i;
  const match = content.match(pattern);
  
  if (match) {
    let text = match[0].replace(/## 🔄 业务流程\s*/i, '').trim();
    // 移除分隔线
    text = text.replace(/^---\s*$/gm, '').trim();
    return text || null;
  }
  return null;
}

/**
 * 从自然语言需求中提取项目阶段
 * @param {string} content - 需求内容
 * @returns {Array} 项目阶段列表
 */
function extractProjectPhases(content) {
  const pattern = /## 🚀 项目阶段[\s\S]*?(?=##|$)/i;
  const match = content.match(pattern);
  
  if (match) {
    let text = match[0].replace(/## 🚀 项目阶段\s*/i, '').trim();
    // 移除分隔线
    text = text.replace(/^---\s*$/gm, '').trim();
    const lines = text.split('\n');
    
    const phases = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && trimmed) {
        phases.push(trimmed);
      }
    }
    
    return phases;
  }
  return [];
}

/**
 * 从自然语言需求中提取对接的系统
 * @param {string} content - 需求内容
 * @returns {Array} 对接系统列表
 */
function extractThirdPartySystems(content) {
  const pattern = /## 🔌 对接的系统[\s\S]*?(?=##|$)/i;
  const match = content.match(pattern);
  
  if (match) {
    let text = match[0].replace(/## 🔌 对接的系统\s*/i, '').trim();
    // 移除分隔线
    text = text.replace(/^---\s*$/gm, '').trim();
    if (text && text !== '没有对接系统') {
      const lines = text.split('\n');
      const systems = [];
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && trimmed) {
          systems.push(trimmed);
        }
      }
      return systems;
    }
  }
  return [];
}

/**
 * 从自然语言需求中提取性能要求
 * @param {string} content - 需求内容
 * @returns {Array} 性能要求列表
 */
function extractPerformanceRequirements(content) {
  const pattern = /## ⚡ 性能要求[\s\S]*?(?=##|$)/i;
  const match = content.match(pattern);
  
  if (match) {
    let text = match[0].replace(/## ⚡ 性能要求\s*/i, '').trim();
    // 移除分隔线
    text = text.replace(/^---\s*$/gm, '').trim();
    const lines = text.split('\n');
    
    const requirements = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && trimmed) {
        requirements.push(trimmed);
      }
    }
    
    return requirements;
  }
  return [];
}

/**
 * 从自然语言需求中提取安全要求
 * @param {string} content - 需求内容
 * @returns {Array} 安全要求列表
 */
function extractSecurityRequirements(content) {
  const pattern = /## 🛡️ 安全要求[\s\S]*?(?=##|$)/i;
  const match = content.match(pattern);
  
  if (match) {
    let text = match[0].replace(/## 🛡️ 安全要求\s*/i, '').trim();
    // 移除分隔线
    text = text.replace(/^---\s*$/gm, '').trim();
    const lines = text.split('\n');
    
    const requirements = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && trimmed) {
        requirements.push(trimmed);
      }
    }
    
    return requirements;
  }
  return [];
}

/**
 * 从自然语言需求中提取验收标准
 * @param {string} content - 需求内容
 * @returns {Array} 验收标准列表
 */
function extractAcceptanceCriteria(content) {
  const pattern = /## 📊 验收标准[\s\S]*?(?=##|$)/i;
  const match = content.match(pattern);
  
  if (match) {
    let text = match[0].replace(/## 📊 验收标准\s*/i, '').trim();
    // 移除分隔线
    text = text.replace(/^---\s*$/gm, '').trim();
    const lines = text.split('\n');
    
    const criteria = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && trimmed) {
        criteria.push(trimmed);
      }
    }
    
    return criteria;
  }
  return [];
}

/**
 * 从自然语言需求中提取参考资料
 * @param {string} content - 需求内容
 * @returns {Array} 参考资料列表
 */
function extractReferences(content) {
  const pattern = /## 📚 参考资料[\s\S]*?(?=##|$)/i;
  const match = content.match(pattern);
  
  if (match) {
    let text = match[0].replace(/## 📚 参考资料\s*/i, '').trim();
    // 移除分隔线
    text = text.replace(/^---\s*$/gm, '').trim();
    const lines = text.split('\n');
    
    const references = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && trimmed) {
        references.push(trimmed);
      }
    }
    
    return references;
  }
  return [];
}

/**
 * 从自然语言需求中提取其他补充
 * @param {string} content - 需求内容
 * @returns {string|null} 其他补充
 */
function extractAdditionalNotes(content) {
  const pattern = /## 📝 其他补充[\s\S]*?(?=##|$)/i;
  const match = content.match(pattern);
  
  if (match) {
    let text = match[0].replace(/## 📝 其他补充\s*/i, '').trim();
    // 移除分隔线
    text = text.replace(/^---\s*$/gm, '').trim();
    return text || null;
  }
  return null;
}

/**
 * 解析自然语言需求模板
 * @param {string} content - 需求内容
 * @returns {Object} 解析结果
 */
function parseRequirementTemplate(content) {
  const projectName = extractProjectName(content);
  const projectIntro = extractProjectIntro(content);
  const users = extractUsers(content);
  
  return {
    projectName: projectName,
    projectIntro: projectIntro,
    coreFeatures: extractCoreFeatures(content),
    userRoles: users ? [{
      name: '使用者',
      description: users
    }] : [],
    goals: extractGoals(content),
    businessProcess: extractBusinessProcess(content),
    projectPhases: extractProjectPhases(content),
    thirdPartySystems: extractThirdPartySystems(content),
    performanceRequirements: extractPerformanceRequirements(content),
    securityRequirements: extractSecurityRequirements(content),
    acceptanceCriteria: extractAcceptanceCriteria(content),
    references: extractReferences(content),
    additionalNotes: extractAdditionalNotes(content),
    // 新增字段
    users: users,
    businessProcess: extractBusinessProcess(content),
    projectPhases: extractProjectPhases(content),
    thirdPartySystems: extractThirdPartySystems(content),
    performanceRequirements: extractPerformanceRequirements(content),
    securityRequirements: extractSecurityRequirements(content),
    acceptanceCriteria: extractAcceptanceCriteria(content),
    references: extractReferences(content),
    additionalNotes: extractAdditionalNotes(content)
  };
}

// 导出函数
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    parseRequirementTemplate,
    extractProjectName,
    extractProjectIntro,
    extractCoreFeatures,
    extractUsers,
    extractGoals,
    extractBusinessProcess,
    extractProjectPhases,
    extractThirdPartySystems,
    extractPerformanceRequirements,
    extractSecurityRequirements,
    extractAcceptanceCriteria,
    extractReferences,
    extractAdditionalNotes
  };
}