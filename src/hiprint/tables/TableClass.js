/**
 * TableClass 主要用于初始化和管理表格列的定义和操作。它通过 ColumnDefinition 类来定义列的属性，并使用 ColumnHelper 和 ColumnClass 来管理和操作这些列。它还提供了一些方法来获取列信息和打印选项实体。
 * @param {*} module
 * @param {*} exports
 * @param {*} require
 */
export default function (module, exports, require) {
  "use strict";

  const BaseClass = require(3),
    ColumnClass = require(12),
    ColumnHelper = require(5);

  // 定义 ColumnDefinition 类，用于描述表格列的属性
  class ColumnDefinition {
    constructor(options) {
      // 列宽度
      this.width = options.width;
      // 列标题
      this.title = options.title;
      // 列字段名
      this.field = options.field;
      // 是否选中
      this.checked = options.checked;
      // 列ID
      this.columnId = options.columnId;
      // 是否固定列
      this.fixed = false;
      // 行跨度
      this.rowspan = options.rowspan || 1;
      // 列跨度
      this.colspan = options.colspan || 1;
      // 水平对齐方式
      this.align = options.align;
      // 水平对齐方式（表头）
      this.halign = options.halign;
      // 垂直对齐方式
      this.vAlign = options.vAlign;
      // 渲染格式化器
      this.renderFormatter = options.renderFormatter;
      // 第二种格式化器
      this.formatter2 = options.formatter2;
      // 第二种样式
      this.styler2 = options.styler2;
      // 表头样式
      this.stylerHeader = options.stylerHeader;
      // 表格列高度
      this.tableColumnHeight = options.tableColumnHeight;
      // 表格文本类型
      this.tableTextType = options.tableTextType;
      // 条形码模式
      this.tableBarcodeMode = options.tableBarcodeMode;
      // 二维码等级
      this.tableQRCodeLevel = options.tableQRCodeLevel;
      // 汇总标题
      this.tableSummaryTitle = options.tableSummaryTitle;
      // 汇总文本
      this.tableSummaryText = options.tableSummaryText;
      // 汇总列跨度
      this.tableSummaryColspan = options.tableSummaryColspan;
      // 汇总
      this.tableSummary = options.tableSummary;
      // 汇总对齐方式
      this.tableSummaryAlign = options.tableSummaryAlign;
      // 汇总数字格式
      this.tableSummaryNumFormat = options.tableSummaryNumFormat;
      // 汇总格式化器
      this.tableSummaryFormatter = options.tableSummaryFormatter;
      // 显示代码标题
      this.showCodeTitle = options.showCodeTitle;
      // 是否大写
      this.upperCase = options.upperCase;
    }
  }

  // 定义 TableClass 类，继承自 BaseClass.a
  class TableClass extends BaseClass.a {
    constructor(options = {}, context) {
      super(options);
      // 表格行高
      this.lHeight = options.lHeight;
      // 自动补全
      this.autoCompletion = options.autoCompletion;
      // 表格页脚重复
      this.tableFooterRepeat = options.tableFooterRepeat;
      // 列数组
      this.columns = [];

      if (context) {
        // 如果上下文可编辑且有列定义
        if (context.editable && options.columns && options.columns.length) {
          options.columns.forEach((column) => {
            const columnArray = [];
            column.forEach((columnOptions) => {
              // 创建列定义实例
              const columnDefinition = new ColumnDefinition(columnOptions);
              // 根据列ID获取现有列
              const existingColumn = context.getColumnByColumnId(
                columnDefinition.columnId
              );
              // 如果存在则扩展，否则创建新列实例
              const columnInstance = existingColumn
                ? $.extend(existingColumn, columnDefinition)
                : new ColumnHelper.a(columnDefinition);
              columnArray.push(columnInstance);
            });
            // 添加到列数组中
            this.columns.push(new ColumnClass.a(columnArray));
          });
        } else {
          // 如果不可编辑，直接使用上下文中的列
          context.columns.forEach((column) => {
            this.columns.push(new ColumnClass.a(column));
          });
        }
      }
    }

    // 根据列ID获取列
    getColumnByColumnId(columnId) {
      return this.makeColumnObj()[columnId];
    }

    // 创建列对象
    makeColumnObj() {
      const columnObj = {};
      if (this.columns) {
        this.columns.forEach((columnGroup) => {
          columnGroup.columns.forEach((column) => {
            if (column.id || column.columnId) {
              columnObj[column.id || column.columnId] = column;
            }
          });
        });
      }
      return columnObj;
    }

    // 获取网格列数
    getGridColumns() {
      return this.gridColumns || 1;
    }

    // 获取打印元素选项实体
    getPrintElementOptionEntity() {
      const entity = super.getPrintElementOptionEntity();
      entity.fields = this.fields;
      if (this.columns) {
        entity.columns = [];
        this.columns.forEach((columnGroup) => {
          const columnEntities = columnGroup
            .getPrintElementOptionEntity()
            .map((column) => {
              return new ColumnDefinition(column);
            });
          entity.columns.push(columnEntities);
        });
      }
      return entity;
    }
  }

  // 导出 TableClass 类
  require.d(exports, "a", function () {
    return TableClass;
  });
}
