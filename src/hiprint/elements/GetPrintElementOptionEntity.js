/**
 * 函数的功能说明：getPrintElementOptionEntity 函数的主要功能是获取打印元素选项的实体。它会遍历当前对象的 columns 和 allColumns 属性，过滤掉已选中的列，然后将每个未选中列的实体添加到一个实体数组中，最后返回这个实体数组。这个功能在打印设计中用于获取所有未选中列的实体信息，以便进行进一步的处理或显示。
 * @param {*} module
 * @param {*} exports
 * @param {*} require
 */
export default function GetPrintElementOptionEntity(module, exports, require) {
  "use strict";

  // 导出PrintElementOption类
  require.d(exports, "a", function () {
    return PrintElementOption;
  });

  const Column = require(5); // 引入Column模块
  const BaseClass = require(13); // 引入BaseClass模块

  // 定义PrintElementOption类，继承自BaseClass.a
  class PrintElementOption extends BaseClass.a {
    constructor(options) {
      super(); // 调用父类的构造函数
      this.columns = []; // 初始化columns数组

      // 如果options是数组，则遍历并创建Column实例
      if (options && options.constructor === Array) {
        (options || []).forEach((option) => {
          this.columns.push(new Column.a(option));
        });
      }
      // 如果options包含columns属性，则遍历并创建Column实例
      else if (options.columns) {
        (options.columns || []).forEach((option) => {
          this.columns.push(new Column.a(option));
        });
      }
    }

    // 获取打印元素选项实体
    getPrintElementOptionEntity() {
      const entities = []; // 初始化实体数组

      // 获取未选中的所有列
      const allColumns = this.allColumns
        ? this.allColumns.filter((column) => !column.checked)
        : [];

      // 将columns和allColumns中的每个column的实体添加到entities中
      [...this.columns, ...allColumns].forEach((column) => {
        entities.push(column.getEntity());
      });

      return entities; // 返回实体数组
    }
  }
}
