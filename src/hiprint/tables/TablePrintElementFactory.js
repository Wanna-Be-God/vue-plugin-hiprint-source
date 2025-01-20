import { i18n } from "../i18n/i18n.js";
import { _instanceof } from "../utils/Utils.js";

export default function TablePrintElementFactory(module, exports, require) {
  "use strict";

  require.d(exports, "a", function () {
    return TablePrintElement;
  });

  const _BasePrintElement__WEBPACK_IMPORTED_MODULE_0__ = require(4),
    _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__ = require(1),
    _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_2__ = require(6),
    _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__ = require(0),
    _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_4__ = require(8),
    _option_TablePrintElementOption__WEBPACK_IMPORTED_MODULE_5__ = require(18),
    _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__ = require(7),
    _hitable_HiTale__WEBPACK_IMPORTED_MODULE_7__ = require(16),
    _table_GridColumnsStructure__WEBPACK_IMPORTED_MODULE_8__ = require(20),
    _HiPrintlib__WEBPACK_IMPORTED_MODULE_9__ = require(2);

  class TablePrintElement extends _BasePrintElement__WEBPACK_IMPORTED_MODULE_0__.a {
    constructor(templateId, options) {
      super(templateId);
      this.gridColumnsFooterCss = "hiprint-gridColumnsFooter";
      this.tableGridRowCss = "table-grid-row";
      this.options =
        new _option_TablePrintElementOption__WEBPACK_IMPORTED_MODULE_5__.a(
          options,
          this.printElementType
        );
      this.options.setDefault(
        new _option_TablePrintElementOption__WEBPACK_IMPORTED_MODULE_5__.a(
          _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.table.default
        ).getPrintElementOptionEntity()
      );
    }

    getColumns() {
      return this.options.columns;
    }

    getColumnByColumnId(columnId) {
      return this.options.getColumnByColumnId(columnId);
    }

    updateDesignViewFromOptions() {
      if (this.designTarget) {
        const tableContent = this.designTarget.find(
          ".hiprint-printElement-table-content"
        );
        const htmlResult = this.getHtml(this.designPaper);
        tableContent.html("");
        tableContent.append(htmlResult[0].target.find(".table-grid-row"));
        if (this.printElementType.editable) this.setHitable();
        this.setColumnsOptions();
        this.css(this.designTarget, this.getData());
      }
    }

    css(target, data) {
      if (
        (this.getField() || !this.options.content) &&
        !this.printElementType.formatter
      ) {
        return super.css(target, data);
      }
    }

    getDesignTarget(paper) {
      this.designTarget = this.getHtml(paper)[0].target;
      this.css(this.designTarget, this.getData());
      this.designPaper = paper;
      this.designTarget.find("td").hidroppable({
        accept: ".rn-draggable-item",
        onDrop: function (event, element) {},
        onDragEnter: function (event, element) {
          $(element).removeClass("rn-draggable-item");
        },
        onDragLeave: function (event, element) {
          $(element).addClass("rn-draggable-item");
        },
      });
      return this.designTarget;
    }

    getConfigOptions() {
      return _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.table;
    }

    createTarget(title, data, paper) {
      const container = $(
        '<div class="hiprint-printElement hiprint-printElement-table" style="position: absolute;"><div class="hiprint-printElement-table-handle"></div><div class="hiprint-printElement-table-content" style="height:100%;width:100%"></span></div>'
      );
      const gridStructure = this.createGridColumnsStructure(paper);
      for (let i = 0; i < gridStructure.gridColumns; i++) {
        gridStructure.getByIndex(i).append(this.getTableHtml(data, paper));
      }
      container
        .find(".hiprint-printElement-table-content")
        .append(gridStructure.target);
      return container;
    }

    createGridColumnsStructure(paper) {
      const row = $('<div class="hi-grid-row table-grid-row"></div>');
      for (let i = 0; i < this.options.getGridColumns(); i++) {
        const column = $(
          '<div class="tableGridColumnsGutterRow hi-grid-col" style="width:' +
            100 / this.options.getGridColumns() +
            '%;"></div>'
        );
        row.append(column);
      }

      const footerFormatter = this.getGridColumnsFooterFormatter();
      if (footerFormatter) {
        const footer = $('<div class="hiprint-gridColumnsFooter"></div>');
        footer.append(
          footerFormatter(this.options, this.getData(paper), paper, [])
        );
        row.append(footer);
      }

      return new _table_GridColumnsStructure__WEBPACK_IMPORTED_MODULE_8__.a(
        this.options.getGridColumns(),
        row
      );
    }

    createtempEmptyRowsTargetStructure(paper) {
      if (this.getField()) {
        return this.createTarget(this.printElementType.title, []);
      }
      const emptyTarget = this.createTarget(
        this.printElementType.title,
        []
      ).clone();
      emptyTarget.find(".hiprint-printElement-tableTarget tbody tr").remove();
      return emptyTarget;
    }

    getTableHtml(data, paper) {
      let tableHtml;
      if (!this.getField() && this.options.content) {
        const container = $("<div></div>");
        container.append(this.options.content);
        tableHtml = container
          .find("table")
          .addClass("hiprint-printElement-tableTarget");
        return tableHtml;
      }
      if (this.printElementType.formatter) {
        const container = $("<div></div>");
        container.append(this.printElementType.formatter(data));
        tableHtml = container
          .find("table")
          .addClass("hiprint-printElement-tableTarget");
        return tableHtml;
      }

      const table = $(
        '<table class="hiprint-printElement-tableTarget" style="border-collapse: collapse;"></table>'
      );
      const headerList =
        _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a.createTableHead(
          this.getColumns(),
          this.options.getWidth() / this.options.getGridColumns()
        );
      if (this.isNotDesign) {
        table.append(headerList);
      } else {
        table.append(headerList[0]);
      }
      table.append(
        _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a.createTableRow(
          this.getColumns(),
          data,
          paper,
          this.options,
          this.printElementType
        )
      );
      if (
        this.options.tableFooterRepeat !== "no" ||
        _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a
          .createTableFooter(
            this.printElementType.columns,
            data,
            this.options,
            this.printElementType,
            paper,
            data
          )
          .insertBefore(table.find("tbody"))
      ) {
        return table;
      }
      return table;
    }

    getEmptyRowTarget() {
      return _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a.createEmptyRowTarget(
        this.getColumns(),
        this
      );
    }

    getHtml(paper, isNotDesign) {
      this.createTempContainer();
      this.isNotDesign = isNotDesign !== undefined;
      const result = this.getPaperHtmlResult(paper, isNotDesign);
      this.removeTempContainer();
      return result;
    }

    getPaperHtmlResult(paper, isNotDesign) {
      const results = [];
      const data = this.getData(isNotDesign);
      const tableHtml = this.getTableHtml(data, isNotDesign);
      const emptyRowsTarget =
        this.createtempEmptyRowsTargetStructure(isNotDesign);

      if (isNotDesign) {
        this.updateTargetWidth(emptyRowsTarget);
      } else {
        this.updateTargetSize(emptyRowsTarget);
      }

      this.css(emptyRowsTarget, data);
      this.css(tableHtml, data);
      this.getTempContainer().html("");
      this.getTempContainer().append(emptyRowsTarget);

      const tableFooterHeight =
        emptyRowsTarget.find("tfoot").outerHeight() || 0;
      emptyRowsTarget.find("tfoot").remove();

      let printTop = this.getBeginPrintTopInPaperByReferenceElement(paper);
      let pageIndex = 0;
      let isEnd = false;

      while (!isEnd) {
        let currentHeight = 0;
        let paperFooter = paper.getPaperFooter(pageIndex);

        // 处理第一页的特殊情况
        if (
          pageIndex === 0 &&
          printTop > paperFooter &&
          paper.panelPageRule !== "none"
        ) {
          printTop = printTop - paperFooter + paper.paperHeader;
          results.push(
            new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_2__.a({
              target: undefined,
              printLine: undefined,
            })
          );
          currentHeight =
            paper.getContentHeight(pageIndex) - (printTop - paper.paperHeader);
          pageIndex++;
          paperFooter = paper.getPaperFooter(pageIndex);
        }

        const previousResultTarget =
          results.length > 0 ? results[results.length - 1].target : undefined;

        // 获取当前页的行数据
        const rowsResult = this.getRowsInSpecificHeight(
          isNotDesign,
          currentHeight > 0
            ? currentHeight
            : pageIndex === 0
            ? paperFooter - printTop
            : paper.getContentHeight(pageIndex),
          emptyRowsTarget,
          tableHtml,
          pageIndex,
          previousResultTarget,
          tableFooterHeight
        );
        isEnd = rowsResult.isEnd;

        // 如果当前高度不足，显示错误提示
        if (currentHeight < 0) {
          results[0].target = $(
            `<div style="position:absolute;background: red;color: white;padding: 0px 4px;">${i18n.__(
              "没有足够空间进行表格分页，请调整页眉/页脚线"
            )}</div>`
          );
          results[0].printLine = printTop;
          results[0].referenceElement =
            new _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_4__.a({
              top: this.options.getTop(),
              left: this.options.getLeft(),
              height: this.options.getHeight(),
              width: this.options.getWidth(),
              beginPrintPaperIndex: paper.index,
              bottomInLastPaper: printTop + this.options.lHeight,
              printTopInPaper: printTop,
            });
          results[0].target.css("top", printTop + "pt");
          results[0].target.css("left", this.options.displayLeft());
          break;
        }

        let targetTop;
        let nextPrintLine;

        // 计算下一页的打印位置
        if (rowsResult.target) {
          rowsResult.target.css("left", this.options.displayLeft());
          rowsResult.target[0].height = "";

          if (pageIndex === 0 || currentHeight > 0) {
            targetTop = printTop;
            rowsResult.target.css("top", printTop + "pt");
            nextPrintLine =
              isEnd && this.options.lHeight !== null
                ? printTop +
                  (rowsResult.height > this.options.lHeight
                    ? rowsResult.height
                    : this.options.lHeight)
                : printTop + rowsResult.height;
          } else {
            targetTop = paper.paperHeader;
            rowsResult.target.css("top", paper.paperHeader + "pt");
            nextPrintLine = paper.paperHeader + rowsResult.height;
          }
        }

        // 将当前页的结果添加到结果集中
        results.push(
          new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_2__.a({
            target: rowsResult.target,
            printLine: nextPrintLine,
            referenceElement:
              new _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_4__.a({
                top: this.options.getTop(),
                left: this.options.getLeft(),
                height: this.options.getHeight(),
                width: this.options.getWidth(),
                beginPrintPaperIndex: paper.index,
                bottomInLastPaper: nextPrintLine,
                printTopInPaper: targetTop,
              }),
          })
        );

        pageIndex++;
        if (isNotDesign) {
          this.updatePanelHeight(
            nextPrintLine + this.options.getHeight(),
            paper
          );
        }
      }

      return results;
    }

    getRowsInSpecificHeight(
      isNotDesign,
      height,
      emptyRowsTarget,
      tableHtml,
      pageIndex,
      previousResultTarget,
      tableFooterHeight
    ) {
      const that = this;
      const tableBody = tableHtml.find("tbody");
      const heightInPx =
        _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.pt.toPx(height);

      emptyRowsTarget.find(".hiprint-printElement-tableTarget tbody").html("");
      if (this.options.tableFooterRepeat !== "last") {
        emptyRowsTarget
          .find(".hiprint-printElement-tableTarget tfoot")
          .remove();
      }
      if (this.options.tableHeaderRepeat === "first" && pageIndex > 0) {
        emptyRowsTarget
          .find(".hiprint-printElement-tableTarget thead")
          .remove();
      } else if (this.options.tableHeaderRepeat === "none") {
        if (isNotDesign) {
          emptyRowsTarget
            .find(".hiprint-printElement-tableTarget thead")
            .remove();
        } else {
          emptyRowsTarget
            .find(".hiprint-printElement-tableTarget thead")
            .css("background", "firebrick");
          emptyRowsTarget
            .find(".hiprint-printElement-tableTarget thead tr")
            .css("background", "firebrick");
        }
      }

      const noPaging = this.panel.panelPageRule === "none";
      let headerRow;
      if (isNotDesign && noPaging) {
        const headStyle = emptyRowsTarget
          .find(".hiprint-printElement-tableTarget thead")
          .attr("style");
        headerRow = emptyRowsTarget
          .find(".hiprint-printElement-tableTarget thead tr")
          .clone();
        if (headStyle) {
          headerRow.attr("style", headStyle);
        } else {
          headerRow.css({ background: "#e8e8e8" });
        }
        emptyRowsTarget
          .find(".hiprint-printElement-tableTarget thead")
          .remove();
      }

      let currentHeight = emptyRowsTarget.outerHeight();
      if (!noPaging && currentHeight > heightInPx) {
        return {
          target: undefined,
          length: 0,
          height: 0,
          isEnd: false,
        };
      }

      const gridColumns = this.options.getGridColumns();
      const rowsData = [];
      for (let i = 0; i < gridColumns; i++) {
        const tableTarget = emptyRowsTarget.find(
          ".hiprint-printElement-tableTarget:eq(" + i + ")"
        );
        let result;
        const rowData = [];
        while (true) {
          if (noPaging) {
            const trLength = tableBody.find("tr").length;
            if (trLength === 0) {
              result = {
                height:
                  _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(
                    currentHeight
                  ),
                isEnd: true,
              };
              if (isNotDesign && this.options.autoCompletion) {
                this.autoCompletion(heightInPx, tableTarget, tableFooterHeight);
                currentHeight = emptyRowsTarget.outerHeight();
              }
            } else {
              const firstRow = tableBody.find("tr:lt(1)");
              if (rowData.length === 0 && headerRow) {
                tableTarget.find("tbody").append(headerRow);
              }
              tableTarget.find("tbody").append(firstRow);
              const rowDataItem = firstRow.data("rowData");
              rowsData.push(rowDataItem);
              rowData.push(rowDataItem);
              currentHeight = emptyRowsTarget.outerHeight();
              if (trLength === 0) {
                tableBody.prepend(firstRow);
                rowsData.pop();
                rowData.pop();
                result = {
                  height:
                    _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(
                      currentHeight
                    ),
                  isEnd: false,
                };
              }
            }
          } else {
            if (currentHeight <= heightInPx) {
              if (tableBody.find("tr").length === 0) {
                result = {
                  height:
                    _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(
                      currentHeight
                    ),
                  isEnd: true,
                };
                if (isNotDesign && this.options.autoCompletion) {
                  this.autoCompletion(
                    heightInPx,
                    tableTarget,
                    tableFooterHeight
                  );
                  currentHeight = tableTarget.outerHeight();
                }
              } else {
                let firstRow = tableBody.find("tr:lt(1)");
                if (
                  this.options.rowsColumnsMerge &&
                  (pageIndex > 0 || i > 0) &&
                  rowData.length === 0
                ) {
                  firstRow = this.fixMergeSpan(firstRow, tableBody);
                }
                tableTarget.find("tbody").append(firstRow);
                const rowDataItem = firstRow.data("rowData");
                rowsData.push(rowDataItem);
                rowData.push(rowDataItem);
                if (
                  ((currentHeight = tableTarget.outerHeight()),
                  this.options.tableFooterRepeat === "last"
                    ? currentHeight
                    : (currentHeight += tableFooterHeight)) > heightInPx ||
                  (this.options.maxRows &&
                    rowData.length > +this.options.maxRows)
                ) {
                  tableBody.prepend(firstRow);
                  rowsData.pop();
                  rowData.pop();
                  currentHeight = tableTarget.outerHeight();
                  result = {
                    height:
                      _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(
                        currentHeight
                      ),
                    isEnd: false,
                  };
                }
              }
            }
          }

          if (result) {
            if (this.options.tableFooterRepeat === "last" && !result.isEnd)
              break;
            if (this.options.tableFooterRepeat !== "no") {
              if (noPaging) {
                tableTarget
                  .find("tbody")
                  .append(
                    _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a
                      .createTableFooter(
                        this.printElementType.columns,
                        this.getData(isNotDesign),
                        this.options,
                        this.printElementType,
                        isNotDesign,
                        rowData,
                        pageIndex
                      )
                      .children()
                  );
              } else {
                _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a
                  .createTableFooter(
                    this.printElementType.columns,
                    this.getData(isNotDesign),
                    this.options,
                    this.printElementType,
                    isNotDesign,
                    rowData,
                    pageIndex
                  )
                  .insertBefore(tableTarget.find("tbody"));
              }
              this.css(tableTarget, isNotDesign);
            }
            break;
          }
        }
      }

      const rowCount = emptyRowsTarget.find(
        ".hiprint-printElement-tableTarget tbody tr"
      ).length;
      const gridColumnsFooterFormatter = this.getGridColumnsFooterFormatter();
      if (gridColumnsFooterFormatter) {
        emptyRowsTarget
          .find(this.gridColumnsFooterCss)
          .html(
            gridColumnsFooterFormatter(
              this.options,
              this.getData(isNotDesign),
              isNotDesign,
              rowsData
            )
          );
      }
      currentHeight = emptyRowsTarget.outerHeight();

      const currentRow = tableBody.find("tr:lt(1)");
      if (
        rowCount === 0 &&
        currentRow.length &&
        rowData === currentRow.data("rowData")
      ) {
        tableTarget.find("tbody").append(currentRow);
        const rowHeight = tableTarget.find("tbody tr").outerHeight();
        tableBody.prepend(currentRow);
        return {
          target: $(
            `<div style="position:absolute;background: red;color: white;padding: 0px 4px;">${i18n.__(
              "没有足够空间,显示下方内容, 可分页高度"
            )}: ` +
              heightInPx +
              `px < ${i18n.__("当前需要高度")}: ` +
              rowHeight +
              "px</div>"
          ).append(currentRow.css("background", "blue")),
          length: rowCount,
          height:
            _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(
              currentHeight
            ),
          isEnd: false,
        };
      }

      if (tableBody.find("tr").length === 0) {
        if (rowCount === 0 && previousResultTarget) {
          return {
            target: undefined,
            length: 0,
            height: 0,
            isEnd: true,
          };
        } else {
          return {
            target: emptyRowsTarget.clone(),
            length: rowCount,
            height:
              _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(
                currentHeight
              ),
            isEnd: true,
          };
        }
      } else {
        return {
          target: emptyRowsTarget.clone(),
          length: rowCount,
          height:
            _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(
              currentHeight
            ),
          isEnd: false,
        };
      }
    }

    fixMergeSpan(row, tableBody) {
      const nextRowMap = new Map();
      row.children().each((_, cell) => {
        const field = $(cell).attr("field");
        nextRowMap.set(field, {
          rowSpan: 1,
          rowEnd: false,
        });
        row.nextAll().each((_, nextRow) => {
          if (
            $(nextRow).has(`td[field=${field}][rowspan=0]`).length &&
            !nextRowMap.get(field).rowEnd
          ) {
            nextRowMap.set(field, {
              rowSpan: ++nextRowMap.get(field).rowSpan,
              rowEnd: false,
            });
          } else {
            nextRowMap.set(field, {
              ...nextRowMap.get(field),
              rowEnd: true,
            });
          }
        });

        if ($(cell).attr("rowspan") < 1) {
          $(cell).attr("rowspan", nextRowMap.get(field).rowSpan);
          $(cell).css("display", "");
          if (this.options.rowsColumnsMergeClean) {
            $(cell).text("");
          }
        }
      });
      return row;
    }

    autoCompletion(heightInPx, tableTarget, tableFooterHeight) {
      const that = this;
      let emptyRow;
      let currentHeight = tableTarget.outerHeight() + tableFooterHeight;
      while (heightInPx > currentHeight) {
        emptyRow = this.getEmptyRowTarget().clone();
        tableTarget.find("tbody").append(emptyRow);
        currentHeight = tableTarget.outerHeight() + tableFooterHeight;
        if (
          that.options.maxRows &&
          tableTarget.find("tbody").children().length > that.options.maxRows
        ) {
          break;
        }
      }
      if (emptyRow) emptyRow.remove();
    }

    getData(isNotDesign) {
      if (!isNotDesign) {
        try {
          const testData = this.options.testData || "[{}]";
          return JSON.parse(testData);
        } catch (error) {
          console.log("table testData parse error", error);
          return [{}];
        }
      }
      const field = this.getField();
      const data = field
        ? field
            .split(".")
            .reduce(
              (acc, curr) =>
                acc ? acc[curr] : isNotDesign ? isNotDesign[curr] : "",
              false
            ) || ""
        : "";
      return data ? JSON.parse(JSON.stringify(data)) : [];
    }

    onResize(event, width, height, position, options) {
      super.updateSizeAndPositionOptions(options, position, height, width);
      _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a.resizeTableCellWidth(
        this.designTarget,
        this.getColumns(),
        this.options.getWidth()
      );
    }

    getReizeableShowPoints() {
      return ["s", "e"];
    }

    design(paper, options) {
      const that = this;
      this.designTarget.hidraggable({
        handle: this.designTarget.find(".hiprint-printElement-table-handle"),
        axis: this.options.axis ? this.options.axis : undefined,
        designTarget: this,
        onDrag: function (event, position, delta) {
          that.updateSizeAndPositionOptions(position, delta);
          that.createLineOfPosition(options);
          _HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.changed = true;
        },
        moveUnit: "pt",
        minMove:
          _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.movingDistance,
        onBeforeDrag: function (event) {
          _HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.draging = true;
          that.createLineOfPosition(options);
        },
        getScale: function () {
          return that.designPaper.scale || 1;
        },
        onStopDrag: function (event) {
          if (_HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.changed) {
            _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.event.trigger(
              "hiprintTemplateDataChanged_" + that.templateId,
              "移动"
            );
          }
          _HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.draging = false;
          _HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.changed = false;
          that.removeLineOfPosition();
        },
      });

      if (this.printElementType.editable) this.setHitable();
      this.setColumnsOptions();

      this.designTarget.hireizeable({
        showPoints: this.getReizeableShowPoints(),
        showSizeBox:
          _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.showSizeBox,
        noContainer: true,
        onBeforeResize: function () {
          _HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.draging = true;
        },
        getScale: function () {
          return that.designPaper.scale || 1;
        },
        onResize: function (event, width, height, position, options) {
          that.onResize(event, width, height, position, options);
          if (that.hitable) that.hitable.updateColumnGrips();
          that.createLineOfPosition(options);
        },
        onStopResize: function (isRotate) {
          _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.event.trigger(
            "hiprintTemplateDataChanged_" + that.templateId,
            isRotate ? "旋转" : "大小"
          );
          _HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.draging = false;
          that.removeLineOfPosition();
        },
      });

      this.bindKeyboardMoveEvent(this.designTarget, options);
    }

    setHitable() {
      const that = this;
      this.hitable = new _hitable_HiTale__WEBPACK_IMPORTED_MODULE_7__.a({
        templateId: this.templateId,
        table: this.designTarget.find(
          ".hiprint-printElement-tableTarget:eq(0)"
        ),
        rows: this.getColumns(),
        resizeRow: false,
        resizeColumn: true,
        fields: this.options.fields,
        trs: this.designTarget
          .find(".hiprint-printElement-tableTarget:eq(0)")
          .find("tbody tr"),
        handle: this.designTarget
          .find(".hiprint-printElement-tableTarget:eq(0)")
          .find("thead"),
        isEnableEdit: this.printElementType.editable
          ? this.printElementType.editable
          : true,
        columnDisplayEditable:
          this.printElementType.columnDisplayEditable !== undefined
            ? this.printElementType.columnDisplayEditable
            : true,
        columnDisplayIndexEditable:
          this.printElementType.columnDisplayIndexEditable !== undefined
            ? this.printElementType.columnDisplayIndexEditable
            : true,
        columnResizable:
          this.printElementType.columnResizable !== undefined
            ? this.printElementType.columnResizable
            : true,
        columnAlignEditable:
          this.printElementType.columnAlignEditable !== undefined
            ? this.printElementType.columnAlignEditable
            : true,
        isEnableEditText:
          this.printElementType.columnTitleEditable !== undefined
            ? this.printElementType.columnTitleEditable
            : true,
        isEnableEditField:
          this.printElementType.isEnableEditField !== undefined
            ? this.printElementType.isEnableEditField
            : true,
        isEnableContextMenu:
          this.printElementType.isEnableContextMenu !== undefined
            ? this.printElementType.isEnableContextMenu
            : true,
        isEnableInsertRow:
          this.printElementType.isEnableInsertRow !== undefined
            ? this.printElementType.isEnableInsertRow
            : true,
        isEnableDeleteRow:
          this.printElementType.isEnableDeleteRow !== undefined
            ? this.printElementType.isEnableDeleteRow
            : true,
        isEnableInsertColumn:
          this.printElementType.isEnableInsertColumn !== undefined
            ? this.printElementType.isEnableInsertColumn
            : true,
        isEnableDeleteColumn:
          this.printElementType.isEnableDeleteColumn !== undefined
            ? this.printElementType.isEnableDeleteColumn
            : true,
        isEnableMergeCell:
          this.printElementType.isEnableMergeCell !== undefined
            ? this.printElementType.isEnableMergeCell
            : true,
      });

      _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.event.on(
        "updateTable" + this.hitable.id,
        function () {
          that.updateDesignViewFromOptions();
          _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.event.trigger(
            "hiprintTemplateDataChanged_" + that.templateId,
            "调整表头"
          );
        }
      );
    }

    setColumnsOptions() {
      const that = this;
      this.designTarget
        .find(".hiprint-printElement-tableTarget:eq(0)")
        .find("thead td")
        .bind("click.hiprint", function (event) {
          const columnId =
            $(event.target).attr("id") || $(event.target).attr("column-id");
          const column = that.getColumnByColumnId(columnId);

          if (column) {
            const optionItems =
              that.getPrintElementOptionItemsByName("tableColumn");

            _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.event.trigger(
              that.getPrintElementSelectEventKey(),
              {
                printElement: that,
                customOptionsInput: [
                  {
                    title:
                      (column.title || `${column.id}(id)`) +
                      `-${i18n.__("列属性")}`,
                    optionItems: optionItems,
                    options: column,
                    callback: function (options) {
                      optionItems.forEach(function (option) {
                        const value = option.getValue();
                        if (
                          option.name === "title" &&
                          value &&
                          !value.trim().endsWith("#") &&
                          !value.trim().startsWith("#")
                        ) {
                          const parts = value ? value.split("#") : "";
                          column.title = parts[0];
                          if (parts.length > 1) {
                            column.columnId = column.field = parts[1];
                          }
                          if (column.columnId) {
                            column.target.attr("column-id", column.columnId);
                          }
                          option.target.find("textarea").val(parts[0]);
                          return;
                        }
                        column[option.name] = value;
                      });
                    },
                  },
                ],
              }
            );
          } else {
            _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.event.trigger(
              that.getPrintElementSelectEventKey(),
              {
                printElement: that,
              }
            );
          }
        });
    }

    filterOptionItems(options) {
      const filteredOptions = super.filterOptionItems(options);
      return this.printElementType.editable && this.options.columns.length === 1
        ? filteredOptions
        : options.filter((option) => option.name !== "columns");
    }

    getFooterFormatter() {
      let footerFormatter;
      if (this.printElementType.footerFormatter) {
        footerFormatter = this.printElementType.footerFormatter;
      }
      if (this.options.footerFormatter) {
        try {
          const script = "footerFormatter=" + this.options.footerFormatter;
          eval(script);
        } catch (error) {
          console.log(error);
        }
      }
      return footerFormatter;
    }

    getGridColumnsFooterFormatter() {
      let gridColumnsFooterFormatter;
      if (this.printElementType.gridColumnsFooterFormatter) {
        gridColumnsFooterFormatter =
          this.printElementType.gridColumnsFooterFormatter;
      }
      if (this.options.gridColumnsFooterFormatter) {
        try {
          const script =
            "gridColumnsFooterFormatter=" +
            this.options.gridColumnsFooterFormatter;
          eval(script);
        } catch (error) {
          console.log(error);
        }
      }
      return gridColumnsFooterFormatter;
    }
  }
}
