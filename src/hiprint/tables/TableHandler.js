/**
该函数是一个复杂的模块，负责管理和操作表格。
提供了对表格的行和列的插入、删除、合并、拆分等功能。
支持表格单元格的对齐方式设置。
提供了表格的拖拽调整功能，包括行高和列宽的调整。
支持上下文菜单的功能，允许用户通过右键菜单进行表格操作。
该模块还处理了表格的初始化和事件绑定，确保表格在用户交互时能够正确响应
 */
import { i18n } from "../i18n/i18n";
export default function (module, exports, require) {
  "use strict";

  var TableOptions = (function () {
      return function (options) {
        (this.table = options.table),
          (this.templateId = options.templateId),
          (this.fields = options.fields),
          (this.isEnableEdit = options.isEnableEdit),
          (this.trs = options.trs),
          (this.resizeRow = options.resizeRow),
          (this.resizeColumn = options.resizeColumn),
          (this.isEnableEditField = options.isEnableEditField),
          (this.isEnableContextMenu = options.isEnableContextMenu),
          (this.isEnableEditField = options.isEnableEditField),
          (this.isEnableInsertRow = options.isEnableInsertRow),
          (this.isEnableDeleteRow = options.isEnableDeleteRow),
          (this.isEnableInsertColumn = options.isEnableInsertColumn),
          (this.isEnableDeleteColumn = options.isEnableDeleteColumn),
          (this.isEnableMergeCell = options.isEnableMergeCell),
          (this.columnResizable = options.columnResizable),
          (this.columnAlignEditable = options.columnAlignEditable);
      };
    })(),
    OptionsCoat = (function () {
      function OptionsCoat(options) {
        this.options = new TableOptions(options);
      }

      return (
        (OptionsCoat.prototype.enableEidt = function () {
          this.options.isEnableEdit;
        }),
        (OptionsCoat.prototype.disableEdit = function () {
          this.options.isEnableEdit;
        }),
        (OptionsCoat.prototype.isEnableEdit = function () {
          return this.options.isEnableEdit;
        }),
        OptionsCoat
      );
    })(),
    px = require(0),
    TableCell = (function () {
      return function (cellOptions) {
        (this.cell = cellOptions.cell),
          (this.link = cellOptions.link),
          (this.linkType = cellOptions.linkType),
          (this.bottom = cellOptions.bottom),
          (this.rightMost = cellOptions.rightMost),
          (this.rowLevel = cellOptions.rowLevel),
          (this.columnLevel = cellOptions.columnLevel),
          (this.indexInTableGridRow = cellOptions.indexInTableGridRow),
          (this.indexInTableGridColumn = cellOptions.indexInTableGridColumn);
      };
    })(),
    TableCellSelector = require(10),
    TableUtils = (function () {
      function TableUtils() {}

      return (
        (TableUtils.getLeftTableCell = function (cells, index) {
          var leftCell;
          return (
            cells.forEach(function (cell, i) {
              cell.cell && i < index && (leftCell = cell.cell);
            }),
            leftCell
          );
        }),
        (TableUtils.getIndex = function (cells, cellId) {
          var index;
          return (
            cells.forEach(function (cell, i) {
              cell.cell && cell.cell.id == cellId && (index = i);
            }),
            index
          );
        }),
        TableUtils
      );
    })(),
    TableRow = require(13),
    IdGenerator = require(11),
    GripContainer = (function () {
      return function (target, grips) {
        (this.target = target), (this.grips = grips);
      };
    })(),
    Grip = (function () {
      return function (target) {
        this.target = target;
      };
    })(),
    RowColumns = (function () {
      return function () {
        this.rowColumns = [];
      };
    })(),
    TableResizer = (function () {
      function TableResizer() {}

      return (
        (TableResizer.getColumnsWidth = function (table, totalWidth) {
          var columnWidths = {},
            totalAutoWidth = TableResizer.allAutoWidth(table);
          return (
            table.rowColumns.forEach(function (column) {
              var availableWidth = totalWidth - 0,
                columnWidth =
                  (column.width / totalAutoWidth) *
                  (availableWidth > 0 ? availableWidth : 0);
              columnWidths[column.id] = columnWidth;
            }),
            columnWidths
          );
        }),
        (TableResizer.resizeTableCellWeight = function (rows) {
          rows.forEach(function (row) {
            row.columns.forEach(function (column) {
              column.hasWidth &&
                $(column.getTarget()).css("width", column.width + "pt");
            });
          });
        }),
        (TableResizer.allAutoWidth = function (table) {
          var totalWidth = 0;
          return (
            table.rowColumns.forEach(function (column) {
              totalWidth += column.width;
            }),
            totalWidth
          );
        }),
        (TableResizer.reconsitutionTableColumnTree = function (
          columns,
          rowColumns,
          totalLayers
        ) {
          for (
            var rowColumnsTree = rowColumns || new RowColumns(),
              processColumn = function processColumn(layer) {
                (rowColumnsTree.totalLayer = layer + 1),
                  (rowColumnsTree[layer] = columns[layer].columns),
                  (rowColumnsTree.rowColumns = rowColumnsTree.rowColumns.concat(
                    rowColumnsTree[layer].filter(function (column) {
                      return column.rowspan == columns.length - layer;
                    })
                  ));
              },
              layer = 0;
            layer < columns.length;
            layer++
          ) {
            processColumn(layer);
          }

          return rowColumnsTree;
        }),
        TableResizer
      );
    })(),
    Draggable = require(2),
    HiResizer = (function () {
      function HiResizer(hitable) {
        (this.signature = "HiResizer"),
          (this.hitable = hitable),
          (this.rows = hitable.rows),
          (this.target = hitable.target);
      }

      return (
        (HiResizer.prototype.init = function () {
          this.addResizeRowAndColumn(),
            this.hitable.optionsCoat.options.resizeColumn &&
              this.createColumnGrips(),
            this.hitable.optionsCoat.options.resizeRow && this.createRowGrips();
        }),
        (HiResizer.prototype.resizeTableCellWidth = function () {
          TableResizer.resizeTableCellWeight(this.rows);
        }),
        (HiResizer.prototype.addResizeRowAndColumn = function () {}),
        (HiResizer.prototype.createColumnGrips = function () {
          var self = this,
            hitable = this,
            grips = [],
            gripContainer = $('<div class="columngrips"/>');
          gripContainer.width(this.target.width()),
            this.rows.forEach(function (row) {
              (row.columns || [])
                .filter(function (column) {
                  return column.checked;
                })
                .forEach(function (column, index) {
                  if (column.getTarget().attr("haswidth")) {
                    var gripElement = $(
                      '<div class="columngrip"><div class="gripResizer"></div></div>'
                    );
                    gripContainer.append(gripElement);
                    var grip = new Grip(gripElement);
                    grips.length > 0 &&
                      (grips[grips.length - 1].nextGrip = grip),
                      grips.push(grip),
                      self.syncGrips(column, grip),
                      $(gripElement).hidraggable({
                        axis: "h",
                        onDrag: function onDrag(event, ui, instance) {},
                        moveUnit: "pt",
                        minMove: 1,
                        getScale: function getScale() {
                          return (
                            ($(".hiprint-printPaper")[0].style.transform &&
                              parseFloat(
                                $(
                                  ".hiprint-printPaper"
                                )[0].style.transform.slice(6, -1)
                              )) ||
                            1
                          );
                        },
                        onBeforeDrag: function onBeforeDrag(event) {
                          if (
                            ((Draggable.a.instance.draging = !0),
                            !grip.nextGrip)
                          )
                            return !1;
                          (hitable.dragingGrip = grip),
                            (hitable.dragingGrip.left = parseFloat(
                              hitable.dragingGrip.target
                                .css("left")
                                .replace("px", "")
                            )),
                            grip.target.addClass("columngripDraging");
                        },
                        onStopDrag: function onStopDrag(event) {
                          Draggable.a.instance.draging = !1;
                          var newLeft = parseFloat(
                              hitable.dragingGrip.target
                                .css("left")
                                .replace("px", "")
                            ),
                            deltaWidth = px.a.px.toPt(
                              newLeft - hitable.dragingGrip.left
                            );
                          // 表格列宽限制 最小宽度为10pt
                          if (grip.cell.width + deltaWidth < 10) {
                            deltaWidth = 10 - grip.cell.width;
                          } else if (
                            grip.nextGrip.cell.width - deltaWidth <
                            10
                          ) {
                            deltaWidth = grip.nextGrip.cell.width - 10;
                          }
                          (grip.cell.width = grip.cell.width + deltaWidth),
                            (grip.nextGrip.cell.width =
                              grip.nextGrip.cell.width - deltaWidth),
                            self.resizeTableCellWidth(),
                            grip.target.removeClass("columngripDraging"),
                            hitable.updateColumnGrips();
                        },
                      });
                  }
                });
            }),
            this.target.before(gripContainer),
            (this.cgripContariner = new GripContainer(gripContainer, grips));
        }),
        (HiResizer.prototype.updateColumnGrips = function () {
          this.cgripContariner &&
            (this.cgripContariner.target.remove(), this.createColumnGrips());
        }),
        (HiResizer.prototype.updateRowGrips = function () {
          this.rgripContariner &&
            (this.rgripContariner.target.remove(), this.createRowGrips());
        }),
        (HiResizer.prototype.createRowGrips = function () {
          var self = this,
            hitable = this,
            grips = [],
            gripContainer = $('<div class="rowgrips"/>');
          this.rows.forEach(function (row, index) {
            var gripElement = $(
              '<div class="rowgrip"><div class="gripResizer"></div></div>'
            );
            gripContainer.append(gripElement);
            var grip = new Grip(gripElement);
            grips.push(grip),
              index > 0 &&
                index < self.rows.length &&
                $(gripElement).hidraggable({
                  axis: "v",
                  onDrag: function onDrag(event, ui, instance) {},
                  moveUnit: "pt",
                  minMove: 1,
                  onBeforeDrag: function onBeforeDrag(event) {
                    (hitable.dragingGrip = grip),
                      (hitable.dragingGrip.top = parseFloat(
                        hitable.dragingGrip.target.css("top").replace("px", "")
                      )),
                      grip.target.addClass("rowgripDraging");
                  },
                  onStopDrag: function onStopDrag(event) {
                    var newTop = parseFloat(
                        hitable.dragingGrip.target.css("top").replace("px", "")
                      ),
                      newHeight = px.a.px.toPt(
                        newTop -
                          hitable.dragingGrip.top +
                          hitable.rows[index].columns[0].getTarget().height()
                      );
                    hitable.rows[index].columns[0]
                      .getTarget()
                      .css("height", newHeight + "pt"),
                      hitable.syncRowGrips(),
                      grip.target.removeClass("rowgripDraging");
                  },
                });
          }),
            this.target.before(gripContainer),
            (this.rgripContariner = new GripContainer(gripContainer, grips)),
            this.syncRowGrips();
        }),
        (HiResizer.prototype.syncGrips = function (column, grip) {
          var target = column.getTarget();
          var scale =
            ($(".hiprint-printPaper")[0].style.transform &&
              parseFloat(
                $(".hiprint-printPaper")[0].style.transform.slice(6, -1)
              )) ||
            1;
          (grip.cell = column),
            grip.target.css({
              left:
                target.offset().left / scale -
                this.target.offset().left / scale +
                target.outerWidth(!1),
              height: 30,
            });
        }),
        (HiResizer.prototype.syncRowGrips = function () {
          var self = this;
          this.rgripContariner.target.height(this.target.height()),
            this.rows.forEach(function (row, index) {
              var target = row.columns[0].getTarget();
              self.rgripContariner.grips[index].target.css({
                top:
                  target.offset().top -
                  self.target.offset().top +
                  target.outerHeight(!1),
                width: 30,
              });
            });
        }),
        (HiResizer.prototype.addResizerHeadRow = function () {
          this.target.find("thead").prepend();
        }),
        HiResizer
      );
    })(),
    NoOpResizer = (function () {
      function NoOpResizer() {}

      return (
        (NoOpResizer.prototype.init = function () {}),
        (NoOpResizer.prototype.updateRowGrips = function () {}),
        (NoOpResizer.prototype.updateColumnGrips = function () {}),
        NoOpResizer
      );
    })();

  require.d(exports, "a", function () {
    return TableHandler;
  });

  var TableHandler = (function () {
    function TableHandler(options) {
      (this.id = IdGenerator.a.createId()),
        (this.optionsCoat = new OptionsCoat(options)),
        (this.handle = options.handle),
        (this.target = options.table),
        this.initRows(options.rows),
        this.init(options),
        (this.tableCellSelector = new TableCellSelector.a(
          this.rows,
          this.target
        )),
        (this.resizer = this.optionsCoat.options.columnResizable
          ? new HiResizer(this)
          : new NoOpResizer()),
        this.resizer.init();
    }

    return (
      (TableHandler.prototype.insertRow = function (position, row, className) {
        var selectedCell = row || this.tableCellSelector.getSingleSelect(),
          cell = selectedCell.cell,
          currentRow = this.rows[selectedCell.rowIndex],
          rowIndex = selectedCell.rowIndex,
          cellGrid = this.getCellGrid(),
          newRow = new TableRow.a();
        if (
          (newRow.init(this.optionsCoat, void 0, currentRow.isHead),
          className && newRow.getTarget().addClass(className),
          "above" == position)
        )
          cellGrid[rowIndex].forEach(function (cellInfo) {
            var linkedCell = cellInfo.link ? cellInfo.link : cellInfo.cell,
              cellWidth = linkedCell.width / linkedCell.colspan;

            if (0 == cellInfo.columnLevel) {
              var newCell = newRow.createTableCell();
              (newCell.width = cellWidth), newRow.insertCellToLast(newCell);
            } else {
              if ("column" == cellInfo.linkType) {
                var linkedTarget = cellInfo.link.getTarget();
                (cellInfo.link.rowspan += 1),
                  linkedTarget.attr("rowspan", cellInfo.link.rowspan);
              }

              cellInfo.linkType;
            }
          }),
            this.rows.splice(rowIndex, 0, newRow),
            currentRow.getTarget().before(newRow.getTarget()),
            px.a.event.trigger("newRow" + this.id, newRow);
        else {
          var lastRowIndex = rowIndex + cell.rowspan - 1;
          cellGrid[lastRowIndex].forEach(function (cellInfo) {
            var linkedCell = cellInfo.link ? cellInfo.link : cellInfo.cell,
              cellWidth = linkedCell.width / linkedCell.colspan;

            if (cellInfo.bottom) {
              var newCell = newRow.createTableCell();
              (newCell.width = cellWidth), newRow.insertCellToLast(newCell);
            } else {
              if (cellInfo.cell) {
                var cellTarget = cellInfo.cell.getTarget();
                (cellInfo.cell.rowspan += 1),
                  cellTarget.attr("rowspan", cellInfo.cell.rowspan);
              }

              if ("column" == cellInfo.linkType) {
                cellTarget = cellInfo.link.getTarget();
                (cellInfo.link.rowspan += 1),
                  cellTarget.attr("rowspan", cellInfo.link.rowspan);
              }
            }
          }),
            this.rows.splice(lastRowIndex + 1, 0, newRow),
            this.rows[lastRowIndex].getTarget().after(newRow.getTarget()),
            px.a.event.trigger("newRow" + this.id, newRow);
        }
      }),
      (TableHandler.prototype.insertColumn = function (
        position,
        column,
        className,
        width
      ) {
        var self = this,
          allRows = this.rows.concat(this.trRows),
          selectedCell = column || this.tableCellSelector.getSingleSelect(),
          cell = selectedCell.cell,
          rowIndex = selectedCell.rowIndex,
          cellGrid = this.getCellGrid(allRows),
          targetCells = cellGrid[rowIndex].filter(function (cellInfo) {
            return (
              (cellInfo.cell && cellInfo.cell.id == cell.id) ||
              (cellInfo.link && cellInfo.link.id == cell.id)
            );
          });

        if ("left" == position) {
          var targetIndex = targetCells[0].indexInTableGridRow;
          cellGrid.forEach(function (rowCells, rowIndex) {
            var targetCell = rowCells[targetIndex],
              cellsToRight = rowCells.filter(function (cellInfo, index) {
                return index >= targetIndex && cellInfo.cell;
              });

            if (0 == targetCell.rowLevel) {
              var currentRow = allRows[rowIndex],
                newCell = allRows[rowIndex].createTableCell();
              className && newCell.getTarget().addClass(className),
                null != width && (newCell.width = width),
                cellsToRight.length
                  ? currentRow.insertToTargetCellLeft(
                      cellsToRight[0].cell,
                      newCell
                    )
                  : currentRow.insertCellToLast(newCell),
                px.a.event.trigger("newCell" + self.id, newCell);
            } else if ("row" == targetCell.linkType) {
              var linkedTarget = targetCell.link.getTarget();
              (targetCell.link.colspan += 1),
                linkedTarget.attr("colspan", targetCell.link.colspan);
            }
          });
        } else {
          var lastTargetIndex =
            targetCells[targetCells.length - 1].indexInTableGridRow;
          cellGrid.forEach(function (rowCells, rowIndex) {
            var targetCell = rowCells[lastTargetIndex],
              cellsToLeft = rowCells.filter(function (cellInfo, index) {
                return index <= lastTargetIndex && cellInfo.cell;
              });

            if (targetCell.rightMost) {
              var currentRow = allRows[rowIndex],
                newCell = currentRow.createTableCell();
              className && newCell.getTarget().addClass(className),
                null != width && (newCell.width = width),
                cellsToLeft.length
                  ? currentRow.insertToTargetCellRight(
                      cellsToLeft[cellsToLeft.length - 1].cell,
                      newCell
                    )
                  : currentRow.insertCellToFirst(newCell),
                px.a.event.trigger("newCell" + self.id, newCell);
            } else {
              var linkedCell = targetCell.link || targetCell.cell;

              if ("row" == targetCell.linkType) {
                var linkedTarget = linkedCell.getTarget();
                (linkedCell.colspan += 1),
                  linkedTarget.attr("colspan", linkedCell.colspan);
              }

              if (targetCell.cell) {
                linkedTarget = linkedCell.getTarget();
                (linkedCell.colspan += 1),
                  linkedTarget.attr("colspan", linkedCell.colspan);
              }
            }
          });
        }
      }),
      (TableHandler.prototype.deleteRow = function () {
        var self = this,
          selectedCell = this.tableCellSelector.getSingleSelect(),
          cell = selectedCell.cell,
          rowIndex = selectedCell.rowIndex,
          cellGrid = this.getCellGrid(),
          currentRow = this.rows[rowIndex];
        cellGrid[rowIndex].forEach(function (cellInfo, cellIndex) {
          if (cellInfo.cell) {
            if (1 == cellInfo.cell.rowspan)
              currentRow.removeCell(cellInfo.cell);
            else {
              currentRow.removeCell(cellInfo.cell);
              var cellsToRight = cellGrid[rowIndex + 1].filter(function (
                  cellInfo,
                  index
                ) {
                  return cellInfo.cell && index > cellIndex;
                }),
                nextRow = self.rows[rowIndex + 1],
                newCell = nextRow.createTableCell(
                  cellInfo.cell.rowspan - 1,
                  cellInfo.cell.colspan
                );
              cellsToRight.length
                ? nextRow.insertToTargetCellLeft(cellsToRight[0].cell, newCell)
                : nextRow.insertCellToLast(newCell);
            }
          } else if ("column" == cellInfo.linkType) {
            var linkedCell = cellInfo.link;
            (linkedCell.rowspan -= 1),
              linkedCell.getTarget().attr("rowspan", linkedCell.rowspan);
          }
        }),
          currentRow.getTarget().remove(),
          this.rows.splice(rowIndex, 1);
      }),
      (TableHandler.prototype.deleteColums = function () {
        var allRows = this.rows.concat(this.trRows),
          selectedCell = this.tableCellSelector.getSingleSelect(),
          cell = selectedCell.cell,
          rowIndex = selectedCell.rowIndex,
          cellGrid = this.getCellGrid(allRows),
          targetIndex = cellGrid[rowIndex].filter(function (cellInfo) {
            return (
              (cellInfo.cell && cellInfo.cell.id == cell.id) ||
              (cellInfo.link && cellInfo.link.id == cell.id)
            );
          })[0].indexInTableGridRow;
        cellGrid.forEach(function (rowCells, rowIndex) {
          var targetCell = rowCells[targetIndex];
          targetCell.cell
            ? 1 == targetCell.cell.colspan
              ? allRows[rowIndex].removeCell(targetCell.cell)
              : ((targetCell.cell.colspan -= 1),
                targetCell.cell
                  .getTarget()
                  .attr("colspan", targetCell.cell.colspan))
            : "row" == targetCell.linkType &&
              ((targetCell.link.colspan -= 1),
              targetCell.link
                .getTarget()
                .attr("colspan", targetCell.link.colspan));
        });
      }),
      (TableHandler.prototype.mergeCell = function () {
        var self = this,
          selectedCells = this.tableCellSelector.getSelectedCells();

        if (0 != selectedCells.length) {
          var baseCell = selectedCells[0][0].cell;
          selectedCells.forEach(function (rowCells, rowIndex) {
            rowCells.forEach(function (cellInfo, cellIndex) {
              0 == rowIndex
                ? 0 != cellIndex &&
                  ((baseCell.colspan += cellInfo.cell.colspan),
                  self.rows[cellInfo.rowIndex].removeCell(cellInfo.cell))
                : self.rows[cellInfo.rowIndex].removeCell(cellInfo.cell),
                0 == cellIndex &&
                  selectedCells[0][0].rowIndex + baseCell.rowspan - 1 <
                    cellInfo.rowIndex &&
                  (baseCell.rowspan += cellInfo.cell.rowspan);
            });
          }),
            baseCell.getTarget().attr("colspan", baseCell.colspan),
            baseCell.getTarget().attr("rowspan", baseCell.rowspan),
            this.tableCellSelector.setSingleSelect(selectedCells[0][0]);
        }
      }),
      (TableHandler.prototype.splitCell = function () {
        var selectedCell = this.tableCellSelector.getSingleSelect(),
          cellGrid = this.getCellGrid(),
          cellIndex = TableUtils.getIndex(
            cellGrid[selectedCell.rowIndex],
            selectedCell.cell.id
          );

        if (selectedCell) {
          for (
            var rowIndex = selectedCell.rowIndex;
            rowIndex < selectedCell.rowIndex + selectedCell.cell.rowspan;
            rowIndex++
          ) {
            for (
              var currentRow = this.rows[rowIndex],
                leftCell =
                  rowIndex == selectedCell.rowIndex
                    ? selectedCell.cell
                    : TableUtils.getLeftTableCell(
                        cellGrid[rowIndex],
                        cellIndex
                      ),
                colIndex = 0;
              colIndex < selectedCell.cell.colspan;
              colIndex++
            ) {
              (rowIndex == selectedCell.rowIndex && 0 == colIndex) ||
                (leftCell
                  ? currentRow.insertToTargetCellRight(
                      leftCell,
                      currentRow.createTableCell()
                    )
                  : currentRow.insertCellToFirst(currentRow.createTableCell()));
            }
          }

          (selectedCell.cell.rowspan = 1),
            (selectedCell.cell.colspan = 1),
            selectedCell.cell
              .getTarget()
              .attr("colspan", selectedCell.cell.colspan),
            selectedCell.cell
              .getTarget()
              .attr("rowspan", selectedCell.cell.rowspan);
        }
      }),
      (TableHandler.prototype.init = function (options) {
        var self = this;
        $(this.target).addClass("hitable"),
          (this.optionsCoat.onBeforEdit = function (event) {
            if (
              self.optionsCoat.options.onBeforEdit &&
              !1 === options.onBeforEdit(event)
            )
              return !1;
            return (
              self.optionsCoat.editingCell &&
                self.optionsCoat.editingCell.endEdit(),
              !0
            );
          }),
          $(this.target).mousedown(function (event) {
            self.optionsCoat.isLeftMouseButtonDown = !0;
          }),
          $(this.target).mouseup(function (event) {
            self.optionsCoat.isLeftMouseButtonDown = !1;
          }),
          this.initContext(),
          this.target
            .on("mousemove", function (event) {
              1 === event.buttons &&
                self.tableCellSelector.multipleSelectByXY(
                  event.pageX,
                  event.pageY
                );
            })
            .on("mousedown", function (event) {
              1 === event.buttons &&
                self.tableCellSelector.singleSelectByXY(
                  event.pageX,
                  event.pageY
                );
            });
      }),
      (TableHandler.prototype.initRows = function (rows) {
        var self = this;

        if (((this.trRows = []), rows)) {
          (this.rows = rows),
            rows.forEach(function (row, index) {
              row.init(
                self.optionsCoat,
                self.target.find("tr:eq(" + index + ")"),
                !0
              );
            });
          var trs = this.optionsCoat.options.trs;
          trs &&
            this.initRowsByTrs(trs).forEach(function (row) {
              self.trRows.push(row);
            });
        } else this.rows = this.initRowsByTrs(this.target.find("tr"));
      }),
      (TableHandler.prototype.initRowsByTrs = function (trs) {
        var self = this;
        return trs
          .map(function (tr, index) {
            var row = new TableRow.a();
            return row.init(self.optionsCoat, $(tr)), row;
          })
          .get();
      }),
      (TableHandler.prototype.enableEidt = function () {
        this.optionsCoat.enableEidt();
      }),
      (TableHandler.prototype.disableEdit = function () {
        this.optionsCoat.disableEdit();
      }),
      (TableHandler.prototype.getCellGrid = function (rows) {
        var allRows = rows || this.rows,
          columnStep = this.getColumnStep(),
          cellGrid = new Array();
        return (
          allRows.forEach(function (row, rowIndex) {
            row.columns.forEach(function (column, colIndex) {
              for (
                var colspanIndex = 0;
                colspanIndex < column.colspan;
                colspanIndex++
              ) {
                for (
                  var stepIndex = 0, found = !1;
                  stepIndex < columnStep && !found;

                ) {
                  if (
                    ((cellGrid[rowIndex] = cellGrid[rowIndex] || []),
                    cellGrid[rowIndex][stepIndex])
                  );
                  else {
                    cellGrid[rowIndex][stepIndex] = new TableCell({
                      cell: 0 == colspanIndex ? column : void 0,
                      link: 0 != colspanIndex ? column : void 0,
                      linkType: colspanIndex > 0 ? "row" : void 0,
                      rightMost: colspanIndex == column.colspan - 1 || void 0,
                      bottom: 0 == column.rowspan - 1,
                      rowLevel: colspanIndex,
                      columnLevel: 0,
                      indexInTableGridRow: stepIndex,
                      indexInTableGridColumn: rowIndex,
                    });

                    for (
                      var nextRowIndex = rowIndex + 1, rowspanIndex = 1;
                      rowspanIndex < column.rowspan;
                      rowspanIndex++
                    ) {
                      (cellGrid[nextRowIndex] = cellGrid[nextRowIndex] || []),
                        (cellGrid[nextRowIndex][stepIndex] = new TableCell({
                          cell: void 0,
                          link: column,
                          linkType: colspanIndex > 0 ? "rowColumn" : "column",
                          rightMost:
                            colspanIndex == column.colspan - 1 || void 0,
                          bottom: rowspanIndex == column.rowspan - 1,
                          rowLevel: colspanIndex,
                          columnLevel: rowspanIndex,
                          indexInTableGridRow: stepIndex,
                          indexInTableGridColumn: nextRowIndex,
                        })),
                        (nextRowIndex += 1);
                    }

                    found = !0;
                  }
                  stepIndex++;
                }
              }
            });
          }),
          cellGrid
        );
      }),
      (TableHandler.prototype.setAlign = function (align) {
        var selectedCell = this.tableCellSelector.getSingleSelect();
        selectedCell && selectedCell.cell.setAlign(align);
      }),
      (TableHandler.prototype.setVAlign = function (vAlign) {
        var selectedCell = this.tableCellSelector.getSingleSelect();
        selectedCell && selectedCell.cell.setVAlign(vAlign);
      }),
      (TableHandler.prototype.getColumnStep = function (rowIndex) {
        var columnStep = 0;
        return (
          this.rows.length &&
            this.rows[rowIndex || 0].columns.forEach(function (column) {
              columnStep += column.colspan;
            }),
          columnStep
        );
      }),
      (TableHandler.prototype.initContext = function () {
        var self = this;
        if (!this.optionsCoat.options.isEnableContextMenu) return !1;
        $(this.handle).hicontextMenu({
          menus: [
            {
              text: `${i18n.__("在上方插入行")}`,
              enabled: this.optionsCoat.options.isEnableInsertRow,
              disable: function disable() {
                return !self.tableCellSelector.getSingleSelect();
              },
              callback: function callback() {
                self.insertRow("above"),
                  self.resizer.updateRowGrips(),
                  px.a.event.trigger("updateTable" + self.id);
              },
            },
            {
              text: `${i18n.__("在下方插入行")}`,
              borderBottom: !0,
              enabled: this.optionsCoat.options.isEnableInsertRow,
              disable: function disable() {
                return !self.tableCellSelector.getSingleSelect();
              },
              callback: function callback() {
                self.insertRow("below"),
                  self.resizer.updateRowGrips(),
                  px.a.event.trigger("updateTable" + self.id);
              },
            },
            {
              text: `${i18n.__("向左方插入列")}`,
              enabled: this.optionsCoat.options.isEnableInsertColumn,
              disable: function disable() {
                return !self.tableCellSelector.getSingleSelect();
              },
              callback: function callback() {
                self.insertColumn("left"),
                  self.resizer.updateColumnGrips(),
                  px.a.event.trigger("updateTable" + self.id);
              },
            },
            {
              text: `${i18n.__("向右方插入列")}`,
              enabled: this.optionsCoat.options.isEnableInsertColumn,
              disable: function disable() {
                return !self.tableCellSelector.getSingleSelect();
              },
              borderBottom: !0,
              callback: function callback() {
                self.insertColumn("right"),
                  self.resizer.updateColumnGrips(),
                  px.a.event.trigger("updateTable" + self.id);
              },
            },
            {
              text: `${i18n.__("删除行")}`,
              enabled: this.optionsCoat.options.isEnableDeleteRow,
              disable: function disable() {
                return (
                  !self.tableCellSelector.getSingleSelect() ||
                  self.rows.length <= 1
                );
              },
              callback: function callback() {
                self.deleteRow(),
                  self.resizer.updateRowGrips(),
                  px.a.event.trigger("updateTable" + self.id);
              },
            },
            {
              text: `${i18n.__("删除列")}`,
              borderBottom: !0,
              enabled: this.optionsCoat.options.isEnableDeleteColumn,
              disable: function disable() {
                return (
                  !self.tableCellSelector.getSingleSelect() ||
                  (self.rows.length > 0 && self.rows[0].columns.length <= 1)
                );
              },
              callback: function callback() {
                self.deleteColums(),
                  self.resizer.updateColumnGrips(),
                  px.a.event.trigger("updateTable" + self.id);
              },
            },
            {
              text: `${i18n.__("对齐")}`,
              borderBottom: !0,
              enabled: this.optionsCoat.options.columnAlignEditable,
              menus: [
                {
                  text: `${i18n.__("左")}`,
                  callback: function callback() {
                    self.setAlign("left");
                  },
                },
                {
                  text: `${i18n.__("左右居中")}`,
                  callback: function callback() {
                    self.setAlign("center");
                  },
                },
                {
                  text: `${i18n.__("右")}`,
                  callback: function callback() {
                    self.setAlign("right");
                  },
                },
                {
                  text: `${i18n.__("默认")}`,
                  borderBottom: !0,
                  callback: function callback() {
                    self.setAlign("");
                  },
                },
                {
                  text: `${i18n.__("上")}`,
                  callback: function callback() {
                    self.setVAlign("top");
                  },
                },
                {
                  text: `${i18n.__("垂直居中")}`,
                  callback: function callback() {
                    self.setVAlign("middle");
                  },
                },
                {
                  text: `${i18n.__("下")}`,
                  callback: function callback() {
                    self.setVAlign("bottom");
                  },
                },
                {
                  text: `${i18n.__("默认")}`,
                  callback: function callback() {
                    self.setVAlign("");
                  },
                },
              ],
            },
            {
              text: `${i18n.__("合并单元格")}`,
              enabled: this.optionsCoat.options.isEnableMergeCell,
              disable: function disable() {
                return self.tableCellSelector.getSingleSelect();
              },
              callback: function callback() {
                self.mergeCell(), px.a.event.trigger("updateTable" + self.id);
              },
            },
            {
              text: `${i18n.__("解开单元格")}`,
              enabled: this.optionsCoat.options.isEnableMergeCell,
              disable: function disable() {
                var selectedCell = self.tableCellSelector.getSingleSelect();
                return (
                  !selectedCell ||
                  (1 == selectedCell.cell.rowspan &&
                    1 == selectedCell.cell.colspan)
                );
              },
              callback: function callback() {
                self.splitCell(), px.a.event.trigger("updateTable" + self.id);
              },
            },
          ].filter(function (menu) {
            return menu.enabled;
          }),
        });
      }),
      (TableHandler.prototype.getTableWidth = function () {
        return px.a.px.toPt(this.target.outerWidth(!1));
      }),
      (TableHandler.prototype.updateColumnGrips = function () {
        this.resizer.updateColumnGrips();
      }),
      (TableHandler.prototype.updateRowGrips = function () {
        this.resizer.updateRowGrips();
      }),
      TableHandler
    );
  })();
}
