/**
 * 表示一个矩形区域的类
 */
class Rectangle {
  constructor(dimensions) {
    this.x = dimensions.x; // 矩形左上角的 x 坐标
    this.y = dimensions.y; // 矩形左上角的 y 坐标
    this.height = dimensions.height; // 矩形的高度
    this.width = dimensions.width; // 矩形的宽度
  }
}

/**
 * 表示选择区域的矩形类
 */
class SelectionRectangle {
  constructor(rect) {
    this.rect = rect; // 存储 Rectangle 实例
  }
}

/**
 * 表示单元格位置的类
 */
class CellPosition {
  constructor(rowIndex, cell) {
    this.rowIndex = rowIndex; // 行索引
    this.cell = cell; // 单元格对象
  }
}

/**
 * @module SelectCellsByCoordinates
 * @description 通过坐标选择表格中的单元格的功能模块
 * 主要功能：
 * 1. 支持单选和多选单元格
 * 2. 通过坐标(x,y)定位单元格
 * 3. 管理选中单元格的状态
 * 4. 提供选区的清除、设置、获取等操作
 */
export default function SelectCellsByCoordinates(module, exports, require) {
  "use strict";

  require.d(exports, "a", function () {
    return TableCellSelector;
  });
  require.d(exports, "b", function () {
    return Rectangle;
  });

  var utils = require(14);

  /**
   * 表格单元格选择器类
   */
  class TableCellSelector {
    /**
     * @param {Array} rows - 表格的行数据
     * @param {jQuery} tableTarget - 表格的 jQuery 对象
     */
    constructor(rows, tableTarget) {
      this.selectedCells = []; // 存储选中的单元格
      this.rows = rows; // 表格行数据
      this.tableTarget = tableTarget; // 表格 DOM 元素
    }

    /**
     * 清除所有选中的单元格
     */
    clear() {
      this.tableTarget.find("td").removeClass("selected");
    }

    /**
     * 设置单选模式的起始单元格
     * @param {CellPosition} cell - 要设置为起始单元格的位置
     */
    setSingleSelect(cell) {
      this.startCell = cell;
      this.selectedCells = [];
    }

    /**
     * 获取单选模式下选中的单元格
     * @returns {CellPosition|undefined} 返回选中的单元格位置，如果是多选则返回 undefined
     */
    getSingleSelect() {
      if (this.selectedCells.length) {
        if (this.selectedCells.length === 1) {
          return this.selectedCells[0].length === 1
            ? this.selectedCells[0][0]
            : undefined;
        }
        if (this.selectedCells.length > 1) return;
      }
      return this.startCell;
    }

    /**
     * 通过坐标进行单选
     * @param {number} x - x坐标
     * @param {number} y - y坐标
     */
    singleSelectByXY(x, y) {
      const cellPosition = this.getCellByXY(x, y);
      if (cellPosition) {
        this.clear();
        cellPosition.cell.select();
        this.startCell = cellPosition;
        this.selectedCells = [];
      }
    }

    /**
     * 通过坐标进行多选
     * @param {number} x - x坐标
     * @param {number} y - y坐标
     */
    multipleSelectByXY(x, y) {
      this.clear();
      const selectedCells = [];
      if (this.startCell) {
        const endCellPosition = this.getCellByXY(x, y);
        if (endCellPosition) {
          const mergedRect = utils.a.mergeRect(
            this.startCell.cell.getTableRect(),
            endCellPosition.cell.getTableRect()
          );
          this.selectByRect(new SelectionRectangle(mergedRect), selectedCells);
        }
      }
      this.selectedCells = selectedCells;
    }

    /**
     * 根据矩形区域选择单元格
     * @param {SelectionRectangle} selectionRect - 选择区域
     * @param {Array} selectedCells - 存储选中的单元格数组
     */
    selectByRect(selectionRect, selectedCells) {
      this.rows.forEach((row, rowIndex) => {
        const rowCells = [];
        row.columns.forEach((cell) => {
          if (cell.isInRect(selectionRect)) {
            rowCells.push(new CellPosition(rowIndex, cell));
            cell.select();
          }
        });
        if (rowCells.length) selectedCells.push(rowCells);
      });
      if (selectionRect.changed) {
        selectionRect.changed = false;
        selectedCells.splice(0, selectedCells.length);
        this.selectByRect(selectionRect, selectedCells);
      }
    }

    /**
     * 获取所有选中的单元格
     * @returns {Array} 返回选中的单元格数组
     */
    getSelectedCells() {
      return this.selectedCells;
    }

    /**
     * 通过坐标获取单元格
     * @param {number} x - x坐标
     * @param {number} y - y坐标
     * @returns {CellPosition|undefined} 返回坐标所在的单元格位置
     */
    getCellByXY(x, y) {
      let cellPosition;
      this.rows.forEach((row, rowIndex) => {
        const cells = (row.columns || [])
          .filter((column) => column.checked)
          .filter((cell) => cell.isXYinCell(x, y));
        if (cells.length) {
          cellPosition = new CellPosition(rowIndex, cells[0]);
        }
      });
      return cellPosition;
    }
  }
}
