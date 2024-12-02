import { i18n } from "../i18n/i18n";

/**
 * 表格Excel辅助类
 * 用于处理表格的Excel导出相关功能
 */
function TableExcelHelperFunction(module, exports, require) {
  "use strict";

  require.d(exports, "a", function () {
    return TableExcelHelper;
  });

  var ReconsitutionTableColumns = require(19),
    AssetsPluginsHinnn = require(0);

  class TableExcelHelper {
    /**
     * 创建表格头部
     * @param {Object} tableData 表格数据
     * @param {Object} options 配置选项
     * @returns {Array} 返回thead和colgroup元素数组
     */
    static createTableHead(tableData, options) {
      const columnTree =
        TableExcelHelper.reconsitutionTableColumnTree(tableData);
      const theadElement = $("<thead></thead>");
      let colgroupElement = $("<colgroup></colgroup>");
      const columnsWidth = TableExcelHelper.getColumnsWidth(
        columnTree,
        options
      );

      const createRow = function (layerIndex) {
        const rowElement = $("<tr></tr>");
        colgroupElement = $("<colgroup></colgroup>");
        columnTree[layerIndex]
          .filter((column) => column.checked)
          .forEach((column) => {
            const cellElement = $("<td></td>");
            column.id && cellElement.attr("id", column.id);
            column.columnId && cellElement.attr("column-id", column.columnId);
            (column.align || column.halign) &&
              cellElement.css("text-align", column.halign || column.align);
            column.vAlign && cellElement.css("vertical-align", column.vAlign);
            column.colspan > 1 && cellElement.attr("colspan", column.colspan);
            column.rowspan > 1 && cellElement.attr("rowspan", column.rowspan);
            cellElement.html(column.title);
            if (columnsWidth[column.id]) {
              column.hasWidth = true;
              column.targetWidth = columnsWidth[column.id];
              cellElement.attr("haswidth", "haswidth");
              cellElement.css("width", columnsWidth[column.id] + "pt");
            } else {
              column.hasWidth = false;
            }
            const headerStyler = TableExcelHelper.getHeaderStyler(column);
            if (headerStyler) {
              const styles = headerStyler(column);
              if (styles) {
                Object.keys(styles).forEach((styleKey) => {
                  cellElement.css(styleKey, styles[styleKey]);
                });
              }
            }
            rowElement.append(cellElement);
            colgroupElement.append(
              `<col column-id="${column.columnId}" width="${column.width}pt"></col>`
            );
          });
        theadElement.append(rowElement);
      };

      for (let layer = 0; layer < columnTree.totalLayer; layer++) {
        createRow(layer);
      }
      TableExcelHelper.syncTargetWidthToOption(tableData);
      return [theadElement, colgroupElement];
    }

    /**
     * 创建表格页脚
     * @param {Object} tableData 表格数据
     * @param {Array} footerData 页脚数据
     * @param {Object} options 配置选项
     * @param {Object} i18nOptions 国际化选项
     * @param {Object} otherOptions 其他选项
     * @param {Array} repeatData 重复数据
     * @param {Number} pageIndex 页码
     * @returns {jQuery} 返回tfoot元素
     */
    static createTableFooter(
      tableData,
      footerData,
      options,
      i18nOptions,
      otherOptions,
      repeatData,
      pageIndex
    ) {
      const tfootElement = $("<tfoot></tfoot>");
      const footerFormatter = this.getFooterFormatter(options, i18nOptions);
      const summaryTitle = this.tableSummaryTitle;
      let summaryData =
        options.tableFooterRepeat == "last" ? footerData : repeatData;
      let lastColumnIndex = options.columns.length - 1;
      const rowColumns =
        this.rowColumns || options.columns[lastColumnIndex].columns;

      if (
        options.tableFooterRepeat != "no" &&
        rowColumns.some((column) => column.tableSummary)
      ) {
        const tableFooterRow = $("<tr></tr>");
        rowColumns
          .filter((column) => column.checked)
          .forEach((column) => {
            const fieldData = summaryData
              .filter((row) => row && row[column.field])
              .map((row) =>
                new RegExp("^-?(0|[1-9]\\d*)(\\.\\d+)?").test(row[column.field])
                  ? Number(row[column.field])
                  : 0
              );
            const text = column.tableSummaryText;
            const numFormat = column.tableSummaryNumFormat || 2;
            const style = `text-align: ${column.tableSummaryAlign || "center"}`;
            const colspan =
              column.tableSummaryColspan == void 0
                ? 1
                : column.tableSummaryColspan;
            const upperCaseType = column.upperCase;
            const { toUpperCase, numFormat: formatNumber } =
              AssetsPluginsHinnn.a;
            const tableSummaryFormatter =
              TableExcelHelper.getColumnTableSummaryFormatter(column);
            const formatterResult = tableSummaryFormatter
              ? tableSummaryFormatter(column, fieldData, footerData, options)
              : "";
            if (formatterResult) {
              tableFooterRow.append(formatterResult);
              return;
            }
            switch (column.tableSummary) {
              case "count":
                const title = summaryTitle(
                  column,
                  text || `${i18n.__("计数")}:`,
                  otherOptions
                );
                const count = toUpperCase(
                  upperCaseType,
                  summaryData.filter((i) => i).length || 0
                );
                tableFooterRow.append(
                  `<td style="${style}" colspan="${colspan}">${title}${count}</td>`
                );
                break;
              case "sum":
                let sum = parseFloat(
                  Number(fieldData.reduce((prev, cur) => prev + cur, 0))
                );
                sum = toUpperCase(upperCaseType, formatNumber(sum, numFormat));
                const sumTitle = summaryTitle(
                  column,
                  text || `${i18n.__("合计")}:`,
                  otherOptions
                );
                tableFooterRow.append(
                  `<td style="${style}" colspan="${colspan}">${sumTitle}${sum}</td>`
                );
                break;
              case "avg":
                sum = parseFloat(
                  Number(fieldData.reduce((prev, cur) => prev + cur, 0))
                );
                const avg = parseFloat(Number(sum / (fieldData.length || 1)));
                const avgFormatted = toUpperCase(
                  upperCaseType,
                  formatNumber(avg, numFormat)
                );
                const avgTitle = summaryTitle(
                  column,
                  text || `${i18n.__("平均值")}:`,
                  otherOptions
                );
                tableFooterRow.append(
                  `<td style="${style}" colspan="${colspan}">${avgTitle}${avgFormatted}</td>`
                );
                break;
              case "min":
                let min = Math.min(...fieldData) || 0;
                min == Infinity && (min = 0);
                const minFormatted = toUpperCase(
                  upperCaseType,
                  formatNumber(min, numFormat)
                );
                const minTitle = summaryTitle(
                  column,
                  text || `${i18n.__("最小值")}:`,
                  otherOptions
                );
                tableFooterRow.append(
                  `<td style="${style}" colspan="${colspan}">${minTitle}${
                    min || 0
                  }</td>`
                );
                break;
              case "max":
                let max = Math.max(...fieldData);
                max == -Infinity && (max = 0);
                const maxFormatted = toUpperCase(
                  upperCaseType,
                  formatNumber(max, numFormat)
                );
                const maxTitle = summaryTitle(
                  column,
                  text || `${i18n.__("最大值")}:`,
                  otherOptions
                );
                tableFooterRow.append(
                  `<td style="${style}" colspan="${colspan}">${maxTitle}${
                    max || 0
                  }</td>`
                );
                break;
              case "text":
                tableFooterRow.append(
                  `<td style="${style}" colspan="${colspan}">${text || ""}</td>`
                );
                break;
              default:
                if (colspan >= 1) {
                  tableFooterRow.append(
                    `<td style="${style}" colspan="${colspan}">${
                      text || ""
                    }</td>`
                  );
                }
                break;
            }
          });
        tfootElement.append(tableFooterRow);
      }
      if (footerFormatter) {
        tfootElement.append(
          footerFormatter(
            options,
            footerData,
            otherOptions,
            repeatData,
            pageIndex
          )
        );
      }
      return tfootElement;
    }

    /**
     * 生成表格汇总标题
     * @param {Object} column 列配置
     * @param {String} title 标题文本
     * @param {Object} data 数据
     * @returns {String} 返回格式化后的标题HTML
     */
    static tableSummaryTitle(column, title, data) {
      const showTitle =
        column.tableSummaryTitle == undefined ||
        column.tableSummaryTitle == true;
      return showTitle
        ? `${title}`
        : data
        ? ``
        : `<span style="color:firebrick">${title}</span>`;
    }

    /**
     * 创建表格行
     * @param {Object} tableData 表格数据
     * @param {Array} rowData 行数据
     * @param {Object} printData 打印数据
     * @param {Object} options 配置选项
     * @param {Object} i18nOptions 国际化选项
     * @returns {jQuery} 返回tbody元素
     */
    static createTableRow(tableData, rowData, printData, options, i18nOptions) {
      const helper = this;
      const columnTree =
        TableExcelHelper.reconsitutionTableColumnTree(tableData);
      const tbodyElement = $("<tbody></tbody>");
      const groupFieldsFormatter = helper.getGroupFieldsFormatter(
        options,
        i18nOptions
      );
      let groupRowIndex = 0;
      const groupFields = groupFieldsFormatter
        ? (options.groupFields = groupFieldsFormatter(
            i18nOptions,
            options,
            rowData
          ))
        : i18nOptions.groupFields
        ? i18nOptions.groupFields
        : [];
      (rowData || (rowData = []), groupFields.length)
        ? AssetsPluginsHinnn.a
            .groupBy(rowData, groupFields, (row) => {
              const groupData = {};
              groupFields.forEach((field) => (groupData[field] = row[field]));
              return groupData;
            })
            .forEach((group) => {
              const groupFormatter = helper.getGroupFormatter(
                options,
                i18nOptions
              );
              if (groupFormatter) {
                let result = groupFormatter(
                  columnTree.colspan,
                  rowData,
                  printData,
                  group,
                  options
                );
                if ($(result).is("tr")) {
                  tbodyElement.append(result);
                } else if ($(result).is("td")) {
                  tbodyElement.append(`<tr>${result}</tr>`);
                } else {
                  tbodyElement.append(`<tr><td>${result}</td></tr>`);
                }
              }
              const groupFooterFormatter = helper.getGroupFooterFormatter(
                options,
                i18nOptions
              );
              const groupData = group;
              if (
                (groupData.rows.forEach((row, rowIndex) => {
                  let sequenceIndex = options.groupSequenceContinue
                    ? groupRowIndex
                    : rowIndex;
                  const rowElement = TableExcelHelper.createRowTarget(
                    columnTree,
                    row,
                    options,
                    i18nOptions,
                    sequenceIndex,
                    groupData.rows,
                    printData
                  );
                  tbodyElement.append(rowElement);
                  groupRowIndex += 1;
                }),
                groupFooterFormatter)
              ) {
                let result = groupFooterFormatter(
                  columnTree.colspan,
                  rowData,
                  printData,
                  group,
                  options
                );
                if ($(result).is("tr")) {
                  tbodyElement.append(result);
                } else if ($(result).is("td")) {
                  tbodyElement.append(`<tr>${result}</tr>`);
                } else {
                  tbodyElement.append(`<tr><td>${result}</td></tr>`);
                }
              }
            })
        : rowData.forEach((row, rowIndex) => {
            const rowElement = TableExcelHelper.createRowTarget(
              columnTree,
              row,
              options,
              i18nOptions,
              rowIndex,
              rowData,
              printData
            );
            tbodyElement.append(rowElement);
          });
      return tbodyElement;
    }

    /**
     * 创建表格行目标
     * @param {Object} columnTree 列树形结构
     * @param {Object} rowData 行数据
     * @param {Object} options 配置选项
     * @param {Object} i18nOptions 国际化选项
     * @param {Number} rowIndex 行索引
     * @param {Array} tableData 表格数据
     * @param {Object} printData 打印数据
     * @returns {jQuery} 返回tr元素
     */
    static createRowTarget(
      columnTree,
      rowData,
      options,
      i18nOptions,
      rowIndex,
      tableData,
      printData
    ) {
      const rowElement = $("<tr></tr>");
      const columns = columnTree.rowColumns.filter((column) => column.checked);
      rowElement.data("rowData", rowData);
      columnTree.rowColumns
        .filter((column) => column.checked)
        .forEach((column, columnIndex) => {
          if (!column.checked) return;
          let rowsColumnsMerge = "";
          if (options.rowsColumnsMerge) {
            eval("rowsColumnsMerge=" + options.rowsColumnsMerge);
            const rowsColumnsArr = rowsColumnsMerge(
              rowData,
              column,
              columnIndex,
              rowIndex,
              tableData,
              printData
            ) || [1, 1];
            var cellElement = $(
              `<td style = 'display:${
                !(rowsColumnsArr[0] && rowsColumnsArr[1]) ? "none" : ""
              }' rowspan = '${rowsColumnsArr[0]}' colspan = '${
                rowsColumnsArr[1]
              }'></td>`
            );
          } else {
            var cellElement = $("<td></td>");
          }
          if (
            rowData &&
            Object.keys(rowData).length > 0 &&
            ("first" == options.tableHeaderRepeat ||
              "none" == options.tableHeaderRepeat)
          ) {
            column.field && cellElement.attr("field", column.field);
            column.align && cellElement.css("text-align", column.align);
            column.vAlign && cellElement.css("vertical-align", column.vAlign);
            if (options.rowsColumnsMerge) {
              if (rowsColumnsArr[1] > 1) {
                let width = 0;
                columns.forEach((item, index) => {
                  if (
                    index >= columnIndex &&
                    index < columnIndex + rowsColumnsArr[1]
                  ) {
                    width += item.width;
                  }
                });
              }
            }
            cellElement.css("width", (width || column.width) + "pt");
          } else {
            column.field && cellElement.attr("field", column.field);
            column.align && cellElement.css("text-align", column.align);
            column.vAlign && cellElement.css("vertical-align", column.vAlign);
          }
          const columnFormatter = TableExcelHelper.getColumnFormatter(column);
          const formattedValue = columnFormatter
            ? columnFormatter(
                rowData[column.field],
                rowData,
                columnIndex,
                options
              )
            : rowData[column.field];
          const renderFormatter =
            TableExcelHelper.getColumnRenderFormatter(column);
          if (renderFormatter) {
            cellElement.html(
              renderFormatter(
                rowData[column.field],
                rowData,
                columnIndex,
                options,
                rowIndex
              )
            );
          } else if (
            "text" == column.tableTextType ||
            column.tableTextType == void 0
          ) {
            cellElement.html(formattedValue);
          } else {
            if ("barcode" == column.tableTextType) {
              cellElement.html(
                '<svg width="100%" display="block" height="100%" class="hibarcode_imgcode" preserveAspectRatio="none slice"></svg ><div class="hibarcode_displayValue"></div>'
              );
              try {
                formattedValue
                  ? (JsBarcode(
                      cellElement.find(".hibarcode_imgcode")[0],
                      formattedValue,
                      {
                        format: column.tableBarcodeMode || "CODE128A",
                        width: 1,
                        textMargin: -1,
                        lineColor: "#000000",
                        margin: 0,
                        height: parseInt(10),
                        displayValue: !1,
                      }
                    ),
                    cellElement
                      .find(".hibarcode_imgcode")
                      .attr("height", column.tableColumnHeight || 30 + "pt"),
                    cellElement
                      .find(".hibarcode_imgcode")
                      .css("margin", "5pt 10pt"),
                    cellElement
                      .find(".hibarcode_imgcode")
                      .attr("width", "calc(100% - 20pt)"))
                  : cellElement.html("");
                if (column.showCodeTitle) {
                  cellElement
                    .find(".hibarcode_displayValue")
                    .html(formattedValue);
                }
              } catch (error) {
                console.log(error);
                cellElement.html(`${i18n.__("此格式不支持该文本")}`);
              }
            }
            if ("image" == column.tableTextType) {
              cellElement.html("");
              if (formattedValue) {
                const imageBox = $(
                  '<div><img style = "max-width:100%;max-height:100%"/></div>'
                );
                imageBox.find("img").attr("src", formattedValue);
                imageBox
                  .find("img")
                  .attr("height", column.tableColumnHeight || 50 + "pt");
                cellElement.html(imageBox);
              }
            }
            if ("qrcode" == column.tableTextType) {
              cellElement.html("");
              try {
                const qrCodeBox = $(
                  '<div style="margin:2pt 0pt" class="hiqrcode_imgcode"></div>'
                );

                if (formattedValue) {
                  const width = parseInt(
                    column.width || column.targetWidth || 20
                  );
                  const height = parseInt(column.tableColumnHeight || 20);
                  qrCodeBox.css(
                    "height",
                    (width > height ? height : width) + "pt"
                  );
                  new QRCode(qrCodeBox[0], {
                    width: width > height ? height : width,
                    height: width > height ? height : width,
                    colorDark: "#000000",
                    useSVG: !0,
                    correctLevel: column.tableQRCodeLevel || 0,
                  }).makeCode(formattedValue);
                  cellElement.html(qrCodeBox);
                  if (column.showCodeTitle) {
                    cellElement.append(
                      '<div class="hiqrcode_displayValue"></div>'
                    );
                    cellElement
                      .find(".hiqrcode_displayValue")
                      .html(formattedValue);
                  }
                }
              } catch (error) {
                console.log(error);
                cellElement.html(`${i18n.__("二维码生成失败")}`);
              }
            }
            if ("sequence" === column.tableTextType) {
              cellElement.html(rowIndex + 1);
            }
          }
          const columnStyler = TableExcelHelper.getColumnStyler(column);

          if (columnStyler) {
            const styles = columnStyler(
              rowData[column.field],
              rowData,
              columnIndex,
              options
            );
            if (styles) {
              Object.keys(styles).forEach((styleKey) => {
                cellElement.css(styleKey, styles[styleKey]);
              });
            }
          }

          rowElement.append(cellElement);
        });
      const rowStyler = TableExcelHelper.getRowStyler(options, i18nOptions);

      if (rowStyler) {
        const styles = rowStyler(rowData, options);
        if (styles) {
          Object.keys(styles).forEach((styleKey) => {
            rowElement.css(styleKey, styles[styleKey]);
          });
        }
      }

      return rowElement;
    }

    /**
     * 创建空行
     * @param {Object} tableData 表格数据
     * @param {jQuery} tableElement 表格元素
     * @returns {jQuery} 返回空的tr元素
     */
    static createEmptyRowTarget(tableData, tableElement) {
      const columnTree =
        TableExcelHelper.reconsitutionTableColumnTree(tableData);
      const emptyRowElement = $("<tr></tr>");
      columnTree.rowColumns
        .filter((column) => column.checked)
        .forEach((column, columnIndex) => {
          const cellElement = $("<td></td>");
          column.field && cellElement.attr("field", column.field);
          column.align && cellElement.css("text-align", column.align);
          column.vAlign && cellElement.css("vertical-align", column.vAlign);
          emptyRowElement.append(cellElement);
        });
      if (tableElement && tableElement.options.tableBodyRowHeight) {
        emptyRowElement
          .find("td:not([rowspan])")
          .css("height", tableElement.options.tableBodyRowHeight + "pt");
      }
      return emptyRowElement;
    }

    /**
     * 获取列宽度
     * @param {Object} columnTree 列树形结构
     * @param {Number} totalWidth 总宽度
     * @returns {Object} 返回列宽度映射对象
     */
    static getColumnsWidth(columnTree, totalWidth) {
      const columnWidths = {};
      const totalAutoWidth = TableExcelHelper.allAutoWidth(columnTree);
      const totalFixedWidth = TableExcelHelper.allFixedWidth(columnTree);
      columnTree.rowColumns
        .filter((column) => column.checked)
        .forEach((column) => {
          if (column.fixed) {
            columnWidths[column.id] = column.width;
          } else {
            const remainingWidth = totalWidth - totalFixedWidth;
            const calculatedWidth =
              (column.width / totalAutoWidth) *
              (remainingWidth > 0 ? remainingWidth : 0);
            columnWidths[column.id] = calculatedWidth;
          }
        });
      return columnWidths;
    }

    /**
     * 调整表格单元格宽度
     * @param {jQuery} tableElement 表格元素
     * @param {Object} tableData 表格数据
     * @param {Number} totalWidth 总宽度
     */
    static resizeTableCellWidth(tableElement, tableData, totalWidth) {
      const columnTree =
        TableExcelHelper.reconsitutionTableColumnTree(tableData);
      const columnWidths = TableExcelHelper.getColumnsWidth(
        columnTree,
        totalWidth
      );
      tableElement.find("thead tr td[haswidth]").map((index, cell) => {
        const columnId = $(cell).attr("id");
        const columnWidth = columnWidths[columnId];
        $(cell).css("width", columnWidth + "pt");
      });
    }

    /**
     * 计算自动宽度列的总宽度
     * @param {Object} columnTree 列树形结构
     * @returns {Number} 返回自动宽度总和
     */
    static allAutoWidth(columnTree) {
      let totalAutoWidth = 0;
      const columnWidths = {};
      columnTree.rowColumns
        .filter((column) => column.checked)
        .forEach((column) => {
          columnWidths[column.id]
            ? (columnWidths[column.id] = 0)
            : (columnWidths[column.id] = column.width);
          totalAutoWidth += column.fixed ? 0 : columnWidths[column.id];
        });
      return totalAutoWidth;
    }

    /**
     * 计算固定宽度列的总宽度
     * @param {Object} columnTree 列树形结构
     * @returns {Number} 返回固定宽度总和
     */
    static allFixedWidth(columnTree) {
      let totalFixedWidth = 0;
      const columnWidths = {};
      columnTree.rowColumns
        .filter((column) => column.checked)
        .forEach((column) => {
          columnWidths[column.id]
            ? (columnWidths[column.id] = 0)
            : (columnWidths[column.id] = column.width);
          totalFixedWidth += column.fixed ? columnWidths[column.id] : 0;
        });
      return totalFixedWidth;
    }

    /**
     * 重构表格列树形结构
     * @param {Object} tableData 表格���据
     * @param {Object} columnTree 列树形结构
     * @param {Object} options 配置选项
     * @returns {Object} 返回重构后的列树形结构
     */
    static reconsitutionTableColumnTree(tableData, columnTree, options) {
      const columnTreeInstance =
        columnTree || new ReconsitutionTableColumns.a();
      columnTreeInstance.colspan = 0;

      for (let layerIndex = 0; layerIndex < tableData.length; layerIndex++) {
        columnTreeInstance.totalLayer = layerIndex + 1;
        columnTreeInstance[layerIndex] = tableData[layerIndex].columns;
        if (layerIndex == 0) {
          tableData[layerIndex].columns.forEach((column) => {
            if (layerIndex == 0) {
              columnTreeInstance.colspan += column.colspan;
            }
          });
        }
      }

      columnTreeInstance.rowColumns =
        TableExcelHelper.getOrderdColumns(columnTreeInstance);
      return columnTreeInstance;
    }

    /**
     * 同步目标宽度到选项
     * @param {Object} tableData 表格数据
     */
    static syncTargetWidthToOption(tableData) {
      tableData.forEach((layer) => {
        layer.columns.forEach((column) => {
          if (column.hasWidth) {
            column.width = column.targetWidth;
          }
        });
      });
    }

    /**
     * 获取分组字段格式化器
     * @param {Object} options 配置选项
     * @param {Object} tablePrintElementType 表格打印元素类型
     * @returns {Function} 返回分组字段格式化函数
     */
    static getGroupFieldsFormatter(options, tablePrintElementType) {
      let groupFieldsFormatter;
      if (
        tablePrintElementType.groupFields &&
        tablePrintElementType.groupFields.length
      ) {
        const groupFieldsArray =
          typeof tablePrintElementType.groupFields == "string"
            ? tablePrintElementType.groupFields
            : JSON.stringify(tablePrintElementType.groupFields);
        options.groupFieldsFormatter =
          "function(type,options,data){ return " + groupFieldsArray + " }";
      }
      if (tablePrintElementType.groupFieldsFormatter) {
        groupFieldsFormatter = tablePrintElementType.groupFieldsFormatter;
      }
      if (options.groupFieldsFormatter) {
        try {
          const script = "groupFieldsFormatter=" + options.groupFieldsFormatter;
          eval(script);
        } catch (error) {
          console.log(error);
        }
      }
      return groupFieldsFormatter;
    }

    /**
     * 获取分组格式化器
     * @param {Object} options 配置选项
     * @param {Object} tablePrintElementType 表格打印元素类型
     * @returns {Function} 返回分组格式化函数
     */
    static getGroupFormatter(options, tablePrintElementType) {
      let groupFormatter;
      if (tablePrintElementType.groupFormatter) {
        groupFormatter = tablePrintElementType.groupFormatter;
      }
      if (options.groupFormatter) {
        try {
          const script = "groupFormatter=" + options.groupFormatter;
          eval(script);
        } catch (error) {
          console.log(error);
        }
      }
      return groupFormatter;
    }

    /**
     * 获取分组页脚格式化器
     * @param {Object} options 配置选项
     * @param {Object} tablePrintElementType 表格打印元素类型
     * @returns {Function} 返回分组页脚格式化函数
     */
    static getGroupFooterFormatter(options, tablePrintElementType) {
      let groupFooterFormatter;
      if (tablePrintElementType.groupFooterFormatter) {
        groupFooterFormatter = tablePrintElementType.groupFooterFormatter;
      }
      if (options.groupFooterFormatter) {
        try {
          const script = "groupFooterFormatter=" + options.groupFooterFormatter;
          eval(script);
        } catch (error) {
          console.log(error);
        }
      }
      return groupFooterFormatter;
    }

    /**
     * 获取页脚格式化器
     * @param {Object} options 配置选项
     * @param {Object} tablePrintElementType 表格打印元素类型
     * @returns {Function} 返回页脚格式化函数
     */
    static getFooterFormatter(options, tablePrintElementType) {
      let footerFormatter;
      if (tablePrintElementType.footerFormatter) {
        footerFormatter = tablePrintElementType.footerFormatter;
      }
      if (options.footerFormatter) {
        try {
          const script = "footerFormatter=" + options.footerFormatter;
          eval(script);
        } catch (error) {
          console.log(error);
        }
      }
      return footerFormatter;
    }

    /**
     * 获取行样式器
     * @param {Object} options 配置选项
     * @param {Object} tablePrintElementType 表格打印元素类型
     * @returns {Function} 返回行样式函数
     */
    static getRowStyler(options, tablePrintElementType) {
      let rowStyler;
      if (tablePrintElementType.rowStyler) {
        rowStyler = tablePrintElementType.rowStyler;
      }
      if (options.rowStyler) {
        try {
          const script = "rowStyler=" + options.rowStyler;
          eval(script);
        } catch (error) {
          console.log(error);
        }
      }
      return rowStyler;
    }

    /**
     * 获取列表格汇总格式化器
     * @param {Object} column 列配置
     * @returns {Function} 返回列表格汇总格式化函数
     */
    static getColumnTableSummaryFormatter(column) {
      let tableSummaryFormatter;
      if (column.tableSummaryFormatter) {
        tableSummaryFormatter = column.tableSummaryFormatter;
      }
      if (column.tableSummaryFormatter) {
        try {
          const script =
            "tableSummaryFormatter=" + column.tableSummaryFormatter;
          eval(script);
        } catch (error) {
          console.log(error);
        }
      }
      return tableSummaryFormatter;
    }

    /**
     * 获取列样式器
     * @param {Object} column 列配置
     * @returns {Function} 返回列样式函数
     */
    static getColumnStyler(column) {
      let styler;
      if (column.styler) {
        styler = column.styler;
      }
      if (column.styler2) {
        try {
          const script = "styler=" + column.styler2;
          eval(script);
        } catch (error) {
          console.log(error);
        }
      }
      return styler;
    }

    /**
     * 获取表头样式器
     * @param {Object} column 列配置
     * @returns {Function} 返回表头样式函数
     */
    static getHeaderStyler(column) {
      let headerStyler;
      if (column.stylerHeader) {
        headerStyler = column.stylerHeader;
      }
      if (column.stylerHeader) {
        try {
          const script = "stylerHeader=" + column.stylerHeader;
          eval(script);
        } catch (error) {
          console.log(error);
        }
      }
      return headerStyler;
    }

    /**
     * 获取列渲染格式化器
     * @param {Object} column 列配置
     * @returns {Function} 返回列渲染格式化函数
     */
    static getColumnRenderFormatter(column) {
      let renderFormatter;
      if (column.renderFormatter) {
        renderFormatter = column.renderFormatter;
      }
      if (column.renderFormatter) {
        try {
          const script = "renderFormatter=" + column.renderFormatter;
          eval(script);
        } catch (error) {
          console.log(error);
        }
      }
      return renderFormatter;
    }

    /**
     * 获取列格式化器
     * @param {Object} column 列配置
     * @returns {Function} 返回列格式化函数
     */
    static getColumnFormatter(column) {
      let formatter;
      if (column.formatter) {
        formatter = column.formatter;
      }
      if (column.formatter2) {
        try {
          const script = "formatter=" + column.formatter2;
          eval(script);
        } catch (error) {
          console.log(error);
        }
      }
      return formatter;
    }

    /**
     * 获取有序列
     * @param {Object} columnTree 列树形结构
     * @returns {Array} 返回有序的列数组
     */
    static getOrderdColumns(columnTree) {
      let orderedColumns = {};
      for (
        let layerIndex = 0;
        layerIndex < columnTree.totalLayer;
        layerIndex++
      ) {
        orderedColumns[layerIndex] = [];
        columnTree[layerIndex].forEach((column, columnIndex) => {
          orderedColumns[layerIndex].push(
            ...new Array(column.colspan).fill({ ...column, colspan: 1 })
          );
        });
      }
      for (
        let layerIndex = 0;
        layerIndex < columnTree.totalLayer;
        layerIndex++
      ) {
        orderedColumns[layerIndex].forEach((column, columnIndex) => {
          for (let rowIndex = 1; rowIndex < column.rowspan; rowIndex++) {
            orderedColumns[layerIndex + rowIndex].splice(columnIndex, 0, {
              ...column,
              rowspan: 1,
            });
          }
        });
      }
      let lastColumns = [];
      for (
        let layerIndex = 0;
        layerIndex < columnTree.totalLayer;
        layerIndex++
      ) {
        if (layerIndex >= columnTree.totalLayer - 1) {
          orderedColumns[layerIndex].forEach((column, columnIndex) => {
            if (!column.field) {
              column.field = lastColumns[columnIndex];
            }
          });
        } else {
          orderedColumns[layerIndex].forEach((column, columnIndex) => {
            if (layerIndex == 0) {
              lastColumns.push(column.field || "");
            } else {
              column.field && (lastColumns[columnIndex] = column.field);
            }
          });
        }
      }
      this.rowColumns = orderedColumns[columnTree.totalLayer - 1];
      return orderedColumns[columnTree.totalLayer - 1];
    }
  }

  // return TableExcelHelper;
}

export default TableExcelHelperFunction;
