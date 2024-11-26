export default function (module, exports, require) {
  "use strict";

  // 定义导出对象的属性 'a'，并将其指向 GridColumnManager 类
  require.d(exports, "a", function () {
    return GridColumnManager;
  });

  // 定义 GridColumnManager 类
  class GridColumnManager {
    // 构造函数，初始化 gridColumns 和 target 属性
    constructor(gridColumns, target) {
      this.gridColumns = gridColumns; // 存储网格列信息
      this.target = target; // 存储目标元素
    }

    // 根据索引获取特定的网格列元素
    getByIndex(index) {
      // 使用 jQuery 选择器查找目标元素中的特定列
      return this.target.find(".hi-grid-col:eq(" + index + ")");
    }
  }
}
