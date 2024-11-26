/**
 * TableRow 类用于管理表格中的行。它提供了初始化行、管理单元格、插入和移除单元格等功能。通过该类，可以动态地操作表格行的结构和内容，支持行的创建、单元格的插入、删除以及获取打印元素的选项实体等操作。
 * @param {*} module 
 * @param {*} exports 
 * @param {*} require 
 */
export default function (module, exports, require) {
  "use strict";

  require.d(exports, "a", function () {
    return TableRow;
  });

  const IdGenerator = require(11);
  const TableCell = require(5);

  class TableRow {
    constructor() {
      // 生成唯一的行ID
      this.id = IdGenerator.a.createId();
    }

    /**
     * 初始化表格行
     * @param {Object} tableOptions - 表格选项
     * @param {jQuery} target - 目标元素
     * @param {boolean} isHead - 是否为表头
     */
    init(tableOptions, target, isHead) {
      this.isHead = isHead;
      this.target = target || $("<tr></tr>");
      this.tableOptions = tableOptions;
      this.allColumns = this.columns || [];
      // 初始化已选中的单元格
      this.initCells((this.columns || []).filter((column) => column.checked));
    }

    /**
     * 获取目标元素
     * @returns {jQuery} 目标元素
     */
    getTarget() {
      return this.target;
    }

    /**
     * 初始化单元格
     * @param {Array} columns - 列数组
     */
    initCells(columns) {
      const self = this;
      if (columns) {
        this.columns = columns;
        columns.forEach((column, index) => {
          // 初始化每个单元格
          column.init(
            self.target.find(`td:eq(${index})`),
            self.tableOptions,
            self.id,
            self.isHead
          );
        });
      } else {
        this.columns = [];
        this.target.find("td").map((index, element) => {
          const cell = new TableCell.a();
          // 初始化新创建的单元格
          cell.init($(element), self.tableOptions, self.id, self.isHead);
          self.columns.push(cell);
        });
      }
    }

    /**
     * 移除指定的单元格
     * @param {Object} cell - 要移除的单元格
     */
    removeCell(cell) {
      const index = this.columns.indexOf(cell);
      this.columns[index].getTarget().remove();
      this.columns.splice(index, 1);
    }

    /**
     * 创建新的表格单元格
     * @param {number} rowspan - 跨行数
     * @param {number} colspan - 跨列数
     * @returns {Object} 新的单元格对象
     */
    createTableCell(rowspan, colspan) {
      const cell = new TableCell.a();
      cell.init($("<td></td>"), this.tableOptions, this.id, this.isHead);
      if (rowspan > 1) {
        cell.getTarget().attr("rowspan", rowspan);
        cell.rowspan = rowspan;
      }
      if (colspan > 1) {
        cell.getTarget().attr("colspan", colspan);
        cell.colspan = colspan;
      }
      return cell;
    }

    /**
     * 在目标单元格左侧插入新单元格
     * @param {Object} targetCell - 目标单元格
     * @param {Object} newCell - 新单元格
     */
    insertToTargetCellLeft(targetCell, newCell) {
      const index = this.columns.indexOf(targetCell);
      targetCell.getTarget().before(newCell.getTarget());
      this.columns.splice(index, 0, newCell);
    }

    /**
     * 在目标单元格右侧插入新单元格
     * @param {Object} targetCell - 目标单元格
     * @param {Object} newCell - 新单元格
     */
    insertToTargetCellRight(targetCell, newCell) {
      const index = this.columns.indexOf(targetCell);
      this.columns[index].getTarget().after(newCell.getTarget());
      this.columns.splice(index + 1, 0, newCell);
    }

    /**
     * 在行首插入新单元格
     * @param {Object} newCell - 新单元格
     */
    insertCellToFirst(newCell) {
      this.target.prepend(newCell.getTarget());
      this.columns.splice(0, 0, newCell);
    }

    /**
     * 在行尾插入新单元格
     * @param {Object} newCell - 新单元格
     */
    insertCellToLast(newCell) {
      this.columns.push(newCell);
      this.target.append(newCell.getTarget());
    }

    /**
     * 获取打印元素选项实体
     * @returns {Array} 实体数组
     */
    getPrintElementOptionEntity() {
      const entities = [];
      [
        ...this.columns,
        ...this.allColumns.filter((column) => !column.checked),
      ].forEach((column) => {
        entities.push(column.getEntity());
      });
      return entities;
    }
  }
}
