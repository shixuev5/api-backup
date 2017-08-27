/* eslint-disable */
function createModuleTree(module, parentId) {
  return module.reduce((prev, cur) => {
    prev.forEach((val) => {
      if (cur.parentId === val.id) {
        if (!val.children) {
          val.children = [];
        }
        val.children.push(cur);
      }
    });
    return prev;
  }, [{
    createDate: Date.now(),
    description: '根模块',
    id: 0,
    name: 'platform',
    parentId: null,
  }]);
}

function createMethodTree(moduleTree, methods) {
  moduleTree.forEach((m) => {
    if (m.children) {
      m.children = createMethodTree(m.children, methods);
    } else {
      m.children = [];
    }
    methods.forEach((i) => {
      if (i.moduleId === m.id) {
        m.children.push(i);
      }
    });
  });
  return moduleTree;
}

function typeHelp(type) {
  switch (type) {
    case 'string':
      return '';
    case 'number':
      return 0;
    case 'object':
      return {};
    case 'array':
      return [];
    case 'boolean':
      return true;
    default:
      return '';
  }
}

function formate(paramsArr) {
  if (paramsArr == null || paramsArr.length === 0) return [];
  const obj = {};
  for (const i of paramsArr) {
    obj[i.name] = typeHelp(i.type);
  }
  return obj;
}

export {
  createModuleTree,
  createMethodTree,
  formate,
};
