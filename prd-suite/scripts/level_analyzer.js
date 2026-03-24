/**
 * XMind 层级分析器
 * 用于分析 XMind 结构，推荐最合适的功能模块层级
 */

/**
 * 分析 XMind 层级结构
 * @param {Object} xmindData - XMind 解析后的数据结构
 * @returns {Object} 层级分析结果
 */
function analyzeLevels(xmindData) {
  const levels = {};
  const maxLevel = 5; // 最大分析到第 5 层

  // 遍历所有节点，统计每层的节点
  traverseNodes(xmindData, 1, levels);

  // 分析每层的特征
  const analysis = [];
  for (let i = 1; i <= maxLevel; i++) {
    if (levels[i]) {
      const nodes = levels[i];
      analysis.push({
        level: i,
        count: nodes.length,
        nodes: nodes.map(n => n.title),
        avgTitleLength: calculateAvgLength(nodes),
        hasSemanticNames: checkSemanticNames(nodes),
        score: calculateLevelScore(nodes, i)
      });
    }
  }

  return {
    allLevels: analysis,
    recommendedLevel: findRecommendedLevel(analysis),
    rootTopic: xmindData.rootTopic
  };
}

/**
 * 遍历节点，按层级归类
 */
function traverseNodes(node, level, levels, parentPath = '') {
  if (!levels[level]) {
    levels[level] = [];
  }

  const currentPath = parentPath ? `${parentPath} > ${node.title}` : node.title;

  levels[level].push({
    title: node.title,
    path: currentPath,
    hasNote: !!node.note,
    hasLabels: !!node.labels,
    hasChildren: !!node.children && node.children.length > 0
  });

  if (node.children && node.children.length > 0) {
    for (const child of node.children) {
      traverseNodes(child, level + 1, levels, currentPath);
    }
  }
}

/**
 * 计算节点标题平均长度
 */
function calculateAvgLength(nodes) {
  if (nodes.length === 0) return 0;
  const totalLength = nodes.reduce((sum, node) => sum + node.title.length, 0);
  return totalLength / nodes.length;
}

/**
 * 检查节点命名是否具有语义性（符合功能模块命名规范）
 */
function checkSemanticNames(nodes) {
  // 功能模块常见关键词
  const moduleKeywords = [
    '管理', '功能', '模块', '系统', '中心', '服务', '配置', '设置',
    '用户', '订单', '支付', '商品', '库存', '物流', '营销', '数据',
    '分析', '报表', '统计', '权限', '角色', '菜单', '日志', '消息'
  ];

  let matchCount = 0;
  for (const node of nodes) {
    for (const keyword of moduleKeywords) {
      if (node.title.includes(keyword)) {
        matchCount++;
        break;
      }
    }
  }

  return matchCount / nodes.length >= 0.5; // 50% 以上包含关键词
}

/**
 * 计算层级得分（用于推荐）
 */
function calculateLevelScore(nodes, level) {
  let score = 0;

  // 节点数量评分（5-12 个最优）
  const count = nodes.length;
  if (count >= 5 && count <= 12) {
    score += 30;
  } else if (count >= 3 && count <= 15) {
    score += 20;
  } else if (count >= 2 && count <= 20) {
    score += 10;
  }

  // 标题长度评分（4-8 个字最优）
  const avgLength = calculateAvgLength(nodes);
  if (avgLength >= 4 && avgLength <= 8) {
    score += 25;
  } else if (avgLength >= 3 && avgLength <= 10) {
    score += 15;
  } else if (avgLength >= 2 && avgLength <= 12) {
    score += 5;
  }

  // 语义性评分
  if (checkSemanticNames(nodes)) {
    score += 25;
  }

  // 层级深度评分（第 2 层优先）
  if (level === 2) {
    score += 20;
  } else if (level === 1 || level === 3) {
    score += 10;
  }

  return score;
}

/**
 * 找出推荐的层级
 */
function findRecommendedLevel(analysis) {
  if (analysis.length === 0) return 1;

  // 按得分排序
  const sorted = [...analysis].sort((a, b) => b.score - a.score);
  return sorted[0].level;
}

/**
 * 生成层级选择提示语
 * @param {Object} analysisResult - 层级分析结果
 * @returns {string} 格式化提示语
 */
function generateLevelSelectionPrompt(analysisResult) {
  const { allLevels, recommendedLevel, rootTopic } = analysisResult;

  let prompt = `
═════════════════════════════════════════════
📊 XMind 结构分析

根主题：${rootTopic}

层级结构预览：
`;

  for (const level of allLevels) {
    const previewNodes = level.nodes.slice(0, 5);
    const remaining = level.nodes.length - 5;
    prompt += `├── 第${level.level}层（共${level.count}个节点）\n`;
    prompt += `│   ├── ${previewNodes.join('、')}`;
    if (remaining > 0) {
      prompt += `... 等${remaining}个`;
    }
    prompt += '\n';
  }

  const recommendedData = allLevels.find(l => l.level === recommendedLevel);

  prompt += `
🤖 AI 分析推荐
推荐层级：第${recommendedLevel}层
理由：
`;

  // 生成推荐理由
  const reasons = generateRecommendReasons(recommendedData);
  for (const reason of reasons) {
    prompt += `- ${reason}\n`;
  }

  prompt += `
推荐的功能模块清单：
`;

  recommendedData.nodes.forEach((node, index) => {
    prompt += `${index + 1}. ${node}\n`;
  });

  prompt += `═════════════════════════════════════════════

请选择功能模块的提取层级：
1️⃣ 确认使用 AI 推荐（第${recommendedLevel}层，${recommendedData.count}个模块）
2️⃣ 按固定层级提取（输入层级数字 1/${allLevels.length}）
3️⃣ 手动指定功能模块清单
`;

  return prompt;
}

/**
 * 生成推荐理由
 */
function generateRecommendReasons(levelData) {
  const reasons = [];

  // 节点数量理由
  if (levelData.count >= 5 && levelData.count <= 12) {
    reasons.push(`节点数量适中（${levelData.count}个），符合模块划分粒度`);
  } else if (levelData.count < 5) {
    reasons.push(`节点数量较少（${levelData.count}个），可能是高层分类`);
  } else {
    reasons.push(`节点数量较多（${levelData.count}个），可能是详细功能`);
  }

  // 命名规范性
  if (levelData.hasSemanticNames) {
    reasons.push('节点命名清晰，符合功能模块命名规范');
  }

  // 标题长度
  if (levelData.avgTitleLength >= 4 && levelData.avgTitleLength <= 8) {
    reasons.push('标题长度适中，便于阅读和理解');
  }

  return reasons;
}

/**
 * 从固定层级提取功能模块
 * @param {Object} xmindData - XMind 数据
 * @param {number} level - 层级数字
 * @returns {Array} 功能模块列表
 */
function extractFromLevel(xmindData, level) {
  const levels = {};
  traverseNodes(xmindData, 1, levels);

  if (levels[level]) {
    return levels[level].map(node => ({
      name: node.title,
      path: node.path
    }));
  }

  return [];
}

// 导出函数
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    analyzeLevels,
    generateLevelSelectionPrompt,
    extractFromLevel,
    // 导出工具函数供测试
    calculateLevelScore,
    checkSemanticNames,
    generateRecommendReasons
  };
}
