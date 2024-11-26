class Rectangle {
  constructor(dimensions) {
    this.x = dimensions.x;
    this.y = dimensions.y;
    this.height = dimensions.height;
    this.width = dimensions.width;
  }
}

class SelectionRectangle {
  constructor(rect) {
    this.rect = rect;
  }
}

class CellPosition {
  constructor(rowIndex, cell) {
    this.rowIndex = rowIndex;
    this.cell = cell;
  }
}
/**
SelectCellsByCoordinates 函数的主要功能是通过坐标选择表格中的单元格。它提供了单选和多选的功能。
该函数包含一个 TableCellSelector 类，负责管理选择的单元格，并提供方法来清除选择、设置单选、获取单选、通过坐标进行单选和多选。
TableCellSelector 使用 SelectionRectangle 和 CellPosition 类来帮助管理选择区域和单元格位置。
该函数还依赖于一个 utils 模块，用于合并选择区域的矩形。
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

  class TableCellSelector {
    constructor(rows, tableTarget) {
      this.selectedCells = [];
      this.rows = rows;
      this.tableTarget = tableTarget;
    }

    clear() {
      this.tableTarget.find("td").removeClass("selected");
    }

    setSingleSelect(cell) {
      this.startCell = cell;
      this.selectedCells = [];
    }

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

    singleSelectByXY(x, y) {
      const cellPosition = this.getCellByXY(x, y);
      if (cellPosition) {
        this.clear();
        cellPosition.cell.select();
        this.startCell = cellPosition;
        this.selectedCells = [];
      }
    }

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

    getSelectedCells() {
      return this.selectedCells;
    }

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
