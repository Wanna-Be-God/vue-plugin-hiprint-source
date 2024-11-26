import { i18n } from "../i18n/i18n";
/**
 * TableExcelHelper类提供了一系列用于处理表格数据的辅助功能，特别是与Excel相关的操作。
 * 该类包含方法用于创建表头、表尾、表行，以及处理列宽、行样式等。
 * 提供了对表格数据的格式化、分组、合计等功能，支持多种数据类型的处理（如文本、条形码、二维码等）。
 * 通过静态方法的形式，确保功能的模块化和可重用性，适合在打印设计和预览解决方案中使用。
 */
function TableExcelHelperFuc(module, exports, require) {
  "use strict";

  require.d(exports, "a", function () {
    return TableExcelHelper;
  });

  var _ReconsitutionTableColumns__WEBPACK_IMPORTED_MODULE_0__ = require(19),
    _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_1__ = require(0),
    TableExcelHelper = (function () {
      function TableExcelHelper() {}

      return (
        (TableExcelHelper.createTableHead = function (t, e) {
          for (
            var n = TableExcelHelper.reconsitutionTableColumnTree(t),
              i = $("<thead></thead>"),
              colgroup = $("<colgroup></colgroup>"),
              o = TableExcelHelper.getColumnsWidth(n, e),
              r = function r(t) {
                var e = $("<tr></tr>");
                // 重置 colgroup，解决多行表头 col 添加错误问题，仅以最后一行添加
                colgroup = $("<colgroup></colgroup>");
                n[t]
                  .filter(function (t) {
                    return t.checked;
                  })
                  .forEach(function (t) {
                    var n = $("<td></td>");
                    t.id && n.attr("id", t.id),
                      t.columnId && n.attr("column-id", t.columnId),
                      (t.align || t.halign) &&
                        n.css("text-align", t.halign || t.align),
                      t.vAlign && n.css("vertical-align", t.vAlign),
                      t.colspan > 1 && n.attr("colspan", t.colspan),
                      t.rowspan > 1 && n.attr("rowspan", t.rowspan),
                      n.html(t.title),
                      o[t.id]
                        ? ((t.hasWidth = !0),
                          (t.targetWidth = o[t.id]),
                          n.attr("haswidth", "haswidth"),
                          n.css("width", o[t.id] + "pt"))
                        : (t.hasWidth = !1);
                    var s = TableExcelHelper.getHeaderStyler(t);
                    if (s) {
                      var l = s(t);
                      if (l)
                        Object.keys(l).forEach(function (t) {
                          n.css(t, l[t]);
                        });
                    }
                    e.append(n);
                    colgroup.append(
                      `<col column-id="${t.columnId}" width="${t.width}pt"></col>`
                    );
                  }),
                  i.append(e);
              },
              a = 0;
            a < n.totalLayer;
            a++
          ) {
            r(a);
          }
          return TableExcelHelper.syncTargetWidthToOption(t), [i, colgroup];
        }),
        (TableExcelHelper.createTableFooter = function (
          t,
          e,
          n,
          i,
          o,
          r,
          pageIndex
        ) {
          // n=>options e=>表格所有数据 o=>所有打印数据 r=>表格每页数据
          var a = $("<tfoot></tfoot>"),
            p = this.getFooterFormatter(n, i);
          var tst = this.tableSummaryTitle;
          let tSumData = n.tableFooterRepeat == "last" ? e : r;
          let idx = n.columns.length - 1;
          var rowColumns = this.rowColumns || n.columns[idx].columns;
          if (
            n.tableFooterRepeat != "no" &&
            rowColumns.some(function (column) {
              return column.tableSummary;
            })
          ) {
            var tableFooter = $("<tr></tr>");
            rowColumns
              .filter(function (t) {
                return t.checked;
              })
              .forEach(function (column) {
                var fieldData = tSumData
                  .filter(function (row) {
                    return row && row[column.field];
                  })
                  .map(function (row) {
                    return new RegExp("^-?(0|[1-9]\\d*)(\\.\\d+)?").test(
                      row[column.field]
                    )
                      ? Number(row[column.field])
                      : 0;
                  });
                var text = column.tableSummaryText;
                var numF = column.tableSummaryNumFormat || 2;
                var style = `text-align: ${
                  column.tableSummaryAlign || "center"
                }`;
                var colspan =
                  column.tableSummaryColspan == void 0
                    ? 1
                    : column.tableSummaryColspan;
                var upperCaseType = column.upperCase;
                let { toUpperCase, numFormat } =
                  _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_1__.a;
                var tableSummaryFormatter =
                  TableExcelHelper.getColumnTableSummaryFormatter(column);
                var formatterResult = tableSummaryFormatter
                  ? tableSummaryFormatter(column, fieldData, e, n)
                  : "";
                if (formatterResult) {
                  tableFooter.append(formatterResult);
                  return;
                }
                switch (column.tableSummary) {
                  case "count":
                    var title = tst(column, text || `${i18n.__("计数")}:`, o);
                    var count = toUpperCase(
                      upperCaseType,
                      tSumData.filter((i) => i).length || 0
                    );
                    tableFooter.append(
                      `<td style="${style}" colspan="${colspan}">${title}${count}</td>`
                    );
                    break;
                  case "sum":
                    var sum = parseFloat(
                      Number(
                        fieldData.reduce(function (prev, cur) {
                          return prev + cur;
                        }, 0)
                      )
                    );
                    sum = toUpperCase(upperCaseType, numFormat(sum, numF));
                    var title = tst(column, text || `${i18n.__("合计")}:`, o);
                    tableFooter.append(
                      `<td style="${style}" colspan="${colspan}">${title}${sum}</td>`
                    );
                    break;
                  case "avg":
                    var sum = parseFloat(
                      Number(
                        fieldData.reduce(function (prev, cur) {
                          return prev + cur;
                        }, 0)
                      )
                    );
                    var avg = parseFloat(Number(sum / (fieldData.length || 1)));
                    avg = toUpperCase(upperCaseType, numFormat(avg, numF));
                    var title = tst(column, text || `${i18n.__("平均值")}:`, o);
                    tableFooter.append(
                      `<td style="${style}" colspan="${colspan}">${title}${avg}</td>`
                    );
                    break;
                  case "min":
                    var min = Math.min(...fieldData) || 0;
                    min == Infinity && (min = 0);
                    min = toUpperCase(upperCaseType, numFormat(min, numF));
                    var title = tst(column, text || `${i18n.__("最小值")}:`, o);
                    tableFooter.append(
                      `<td style="${style}" colspan="${colspan}">${title}${
                        min || 0
                      }</td>`
                    );
                    break;
                  case "max":
                    var max = Math.max(...fieldData);
                    max == -Infinity && (max = 0);
                    max = toUpperCase(upperCaseType, numFormat(max, numF));
                    var title = tst(column, text || `${i18n.__("最大值")}:`, o);
                    tableFooter.append(
                      `<td style="${style}" colspan="${colspan}">${title}${
                        max || 0
                      }</td>`
                    );
                    break;
                  case "text":
                    tableFooter.append(
                      `<td style="${style}" colspan="${colspan}">${
                        text || ""
                      }</td>`
                    );
                    break;
                  default:
                    if (colspan >= 1) {
                      tableFooter.append(
                        `<td style="${style}" colspan="${colspan}">${
                          text || ""
                        }</td>`
                      );
                    }
                    break;
                }
              });
            a.append(tableFooter);
          }
          if (p) {
            // pageIndex: 当前页码(0开始) 如果表格脚最后页显示,则中间回调 undefined
            a.append(p(n, e, o, r, pageIndex));
          }
          return a;
        }),
        (TableExcelHelper.tableSummaryTitle = function (column, title, data) {
          var s =
            column.tableSummaryTitle == undefined ||
            column.tableSummaryTitle == true;
          return s
            ? `${title}`
            : data
            ? ``
            : `<span style="color:firebrick">${title}</span>`;
        }),
        (TableExcelHelper.createTableRow = function (t, e, printData, n, i) {
          var h = this;
          var o = TableExcelHelper.reconsitutionTableColumnTree(t),
            r = $("<tbody></tbody>");
          var gff = h.getGroupFieldsFormatter(n, i);
          var groupRowIndex = 0;
          var groupFields = gff
            ? (n.groupFields = gff(i, n, e))
            : i.groupFields
            ? i.groupFields
            : [];
          (e || (e = []), groupFields.length)
            ? _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_1__.a
                .groupBy(e, groupFields, function (t) {
                  var e = {};
                  return (
                    groupFields.forEach(function (n) {
                      return (e[n] = t[n]);
                    }),
                    e
                  );
                })
                .forEach(function (t) {
                  var groupFormatter = h.getGroupFormatter(n, i);
                  if (groupFormatter) {
                    let result = groupFormatter(o.colspan, e, printData, t, n);
                    if ($(result).is("tr")) {
                      r.append(result);
                    } else if ($(result).is("td")) {
                      r.append(`<tr>${result}</tr>`);
                    } else {
                      r.append(`<tr><td>${result}</td></tr>`);
                    }
                  }
                  var groupFooterFormatter = h.getGroupFooterFormatter(n, i);
                  var groupData = t;
                  if (
                    (groupData.rows.forEach(function (t, rowIndex) {
                      let sequenceIndex = n.groupSequenceContinue
                        ? groupRowIndex
                        : rowIndex;
                      var e = TableExcelHelper.createRowTarget(
                        o,
                        t,
                        n,
                        i,
                        sequenceIndex,
                        groupData.rows,
                        printData
                      );
                      r.append(e);
                      groupRowIndex += 1;
                    }),
                    groupFooterFormatter)
                  ) {
                    let result = groupFooterFormatter(
                      o.colspan,
                      e,
                      printData,
                      t,
                      n
                    );
                    if ($(result).is("tr")) {
                      r.append(result);
                    } else if ($(result).is("td")) {
                      r.append(`<tr>${result}</tr>`);
                    } else {
                      r.append(`<tr><td>${result}</td></tr>`);
                    }
                  }
                })
            : e.forEach(function (t, rowIndex) {
                var row = TableExcelHelper.createRowTarget(
                  o,
                  t,
                  n,
                  i,
                  rowIndex,
                  e,
                  printData
                );
                r.append(row);
              });
          return r;
        }),
        (TableExcelHelper.createRowTarget = function (
          t,
          e,
          n,
          i,
          rowIndex,
          tableData,
          printData
        ) {
          var o = $("<tr></tr>");
          var columns = t.rowColumns.filter(function (t) {
            return t.checked;
          });
          o.data("rowData", e),
            t.rowColumns
              .filter(function (t) {
                return t.checked;
              })
              .forEach(function (t, i) {
                if (!t.checked) return;
                var rowsColumnsMerge = "";
                if (n.rowsColumnsMerge) {
                  eval("rowsColumnsMerge=" + n.rowsColumnsMerge);
                  var rowsColumnsArr = rowsColumnsMerge(
                    e,
                    t,
                    i,
                    rowIndex,
                    tableData,
                    printData
                  ) || [1, 1];
                  var r = $(
                    `<td style = 'display:${
                      !(rowsColumnsArr[0] && rowsColumnsArr[1]) ? "none" : ""
                    }' rowspan = '${rowsColumnsArr[0]}' colspan = '${
                      rowsColumnsArr[1]
                    }'></td>`
                  );
                } else {
                  var r = $("<td></td>");
                }
                // 设计时不去计算宽度
                if (
                  e &&
                  Object.keys(e).length > 0 &&
                  ("first" == n.tableHeaderRepeat ||
                    "none" == n.tableHeaderRepeat)
                ) {
                  t.field && r.attr("field", t.field),
                    t.align && r.css("text-align", t.align),
                    t.vAlign && r.css("vertical-align", t.vAlign);
                  // 无表头时跨行无效，需根据所跨行数重新计算宽度
                  if (n.rowsColumnsMerge) {
                    if (rowsColumnsArr[1] > 1) {
                      var width = 0;
                      columns.forEach((item, index) => {
                        if (index >= i && index < i + rowsColumnsArr[1]) {
                          width += item.width;
                        }
                      });
                    }
                  }
                  r.css("width", (width || t.width) + "pt");
                } else {
                  t.field && r.attr("field", t.field),
                    t.align && r.css("text-align", t.align),
                    t.vAlign && r.css("vertical-align", t.vAlign);
                }
                var a = TableExcelHelper.getColumnFormatter(t),
                  p = a ? a(e[t.field], e, i, n) : e[t.field];
                var rf = TableExcelHelper.getColumnRenderFormatter(t);
                if (rf) {
                  r.html(rf(e[t.field], e, i, n, rowIndex));
                  //表格内容插入二维码等
                } else if (
                  "text" == t.tableTextType ||
                  t.tableTextType == void 0
                )
                  r.html(p);
                else {
                  if ("barcode" == t.tableTextType) {
                    r.html(
                      '<svg width="100%" display="block" height="100%" class="hibarcode_imgcode" preserveAspectRatio="none slice"></svg ><div class="hibarcode_displayValue"></div>'
                    );
                    try {
                      p
                        ? (JsBarcode(r.find(".hibarcode_imgcode")[0], p, {
                            format: t.tableBarcodeMode || "CODE128A",
                            width: 1,
                            textMargin: -1,
                            lineColor: "#000000",
                            margin: 0,
                            height: parseInt(10),
                            displayValue: !1,
                          }),
                          r
                            .find(".hibarcode_imgcode")
                            .attr("height", t.tableColumnHeight || 30 + "pt"),
                          r
                            .find(".hibarcode_imgcode")
                            .css("margin", "5pt 10pt"),
                          r
                            .find(".hibarcode_imgcode")
                            .attr("width", "calc(100% - 20pt)"))
                        : r.html("");
                      // this.options.hideTitle || r.find(".hibarcode_displayValue").html(n)
                      if (t.showCodeTitle) {
                        r.find(".hibarcode_displayValue").html(p);
                      }
                    } catch (t) {
                      console.log(t),
                        r.html(`${i18n.__("此格式不支持该文本")}`);
                    }
                  }
                  if ("image" == t.tableTextType) {
                    r.html("");
                    if (p) {
                      var imagebox = $(
                        '<div><img style = "max-width:100%;max-height:100%"/></div>'
                      );
                      imagebox.find("img").attr("src", p);
                      imagebox
                        .find("img")
                        .attr("height", t.tableColumnHeight || 50 + "pt");
                      console.log(imagebox.find("img").css("width"));
                      r.html(imagebox);
                    }
                  }
                  if ("qrcode" == t.tableTextType) {
                    r.html("");
                    try {
                      var qrcodebox = $(
                        '<div style="margin:2pt 0pt" class="hiqrcode_imgcode"></div>'
                      );

                      if (p) {
                        var l = parseInt(t.width || t.targetWidth || 20),
                          u = parseInt(t.tableColumnHeight || 20);
                        qrcodebox.css("height", (l > u ? u : l) + "pt");
                        new QRCode(qrcodebox[0], {
                          width: l > u ? u : l,
                          height: l > u ? u : l,
                          colorDark: "#000000",
                          useSVG: !0,
                          correctLevel: t.tableQRCodeLevel || 0,
                        }).makeCode(p);
                        // r.find(".hiqrcode_imgcode").css("margin", '5pt 0pt'),
                        r.html(qrcodebox);
                        if (t.showCodeTitle) {
                          r.append('<div class="hiqrcode_displayValue"></div>');
                          r.find(".hiqrcode_displayValue").html(p);
                        }
                      }
                    } catch (t) {
                      console.log(t), r.html(`${i18n.__("二维码生成失败")}`);
                    }
                  }
                  if ("sequence" === t.tableTextType) {
                    r.html(rowIndex + 1);
                  }
                }
                var s = TableExcelHelper.getColumnStyler(t);

                if (s) {
                  var l = s(e[t.field], e, i, n);
                  if (l)
                    Object.keys(l).forEach(function (t) {
                      r.css(t, l[t]);
                    });
                }

                o.append(r);
              });
          var r = TableExcelHelper.getRowStyler(n, i);

          if (r) {
            var a = r(e, n);
            if (a)
              Object.keys(a).forEach(function (t) {
                o.css(t, a[t]);
              });
          }

          return o;
        }),
        (TableExcelHelper.createEmptyRowTarget = function (t, tableElement) {
          var e = TableExcelHelper.reconsitutionTableColumnTree(t),
            n = $("<tr></tr>");
          e.rowColumns
            .filter(function (t) {
              return t.checked;
            })
            .forEach(function (t, e) {
              var i = $("<td></td>");
              t.field && i.attr("field", t.field),
                t.align && i.css("text-align", t.align),
                t.vAlign && i.css("vertical-align", t.vAlign),
                n.append(i);
            });
          if (tableElement && tableElement.options.tableBodyRowHeight) {
            n.find("td:not([rowspan])").css(
              "height",
              tableElement.options.tableBodyRowHeight + "pt"
            );
          }
          return n;
        }),
        (TableExcelHelper.getColumnsWidth = function (t, e) {
          var n = {},
            i = TableExcelHelper.allAutoWidth(t),
            o = TableExcelHelper.allFixedWidth(t);
          return (
            t.rowColumns
              .filter(function (t) {
                return t.checked;
              })
              .forEach(function (t) {
                if (t.fixed) n[t.id] = t.width;
                else {
                  var r = e - o,
                    a = (t.width / i) * (r > 0 ? r : 0);
                  n[t.id] = a;
                }
              }),
            n
          );
        }),
        (TableExcelHelper.resizeTableCellWidth = function (t, e, n) {
          var i = TableExcelHelper.reconsitutionTableColumnTree(e),
            o = TableExcelHelper.getColumnsWidth(i, n);
          t.find("thead tr td[haswidth]").map(function (t, e) {
            var n = $(e).attr("id"),
              i = o[n];
            $(e).css("width", i + "pt");
          });
        }),
        (TableExcelHelper.allAutoWidth = function (t) {
          var e = 0,
            n = {};
          return (
            t.rowColumns
              .filter(function (t) {
                return t.checked;
              })
              .forEach(function (t) {
                n[t.id] ? (n[t.id] = 0) : (n[t.id] = t.width);
                e += t.fixed ? 0 : n[t.id];
              }),
            e
          );
        }),
        (TableExcelHelper.allFixedWidth = function (t) {
          var e = 0,
            n = {};
          return (
            t.rowColumns
              .filter(function (t) {
                return t.checked;
              })
              .forEach(function (t) {
                n[t.id] ? (n[t.id] = 0) : (n[t.id] = t.width);
                e += t.fixed ? n[t.id] : 0;
              }),
            e
          );
        }),
        (TableExcelHelper.reconsitutionTableColumnTree = function (t, e, n) {
          var i =
            e ||
            new _ReconsitutionTableColumns__WEBPACK_IMPORTED_MODULE_0__.a();
          i.colspan = 0;

          for (
            var o = function o(e) {
                (i.totalLayer = e + 1),
                  (i[e] = t[e].columns),
                  0 == e &&
                    t[e].columns.forEach(function (t) {
                      0 == e && (i.colspan += t.colspan);
                    });
              },
              r = 0;
            r < t.length;
            r++
          ) {
            o(r);
          }

          return (i.rowColumns = TableExcelHelper.getOrderdColumns(i)), i;
        }),
        (TableExcelHelper.syncTargetWidthToOption = function (t) {
          t.forEach(function (t) {
            t.columns.forEach(function (t) {
              t.hasWidth && (t.width = t.targetWidth);
            });
          });
        }),
        (TableExcelHelper.getGroupFieldsFormatter = function (
          options,
          tablePrintElementType
        ) {
          var groupFieldsFormatter = void 0;
          if (
            tablePrintElementType.groupFields &&
            tablePrintElementType.groupFields.length
          ) {
            var arr =
              typeof tablePrintElementType.groupFields == "string"
                ? tablePrintElementType.groupFields
                : JSON.stringify(tablePrintElementType.groupFields);
            options.groupFieldsFormatter =
              "function(type,options,data){ return " + arr + " }";
          }
          if (
            (tablePrintElementType.groupFieldsFormatter &&
              (groupFieldsFormatter =
                tablePrintElementType.groupFieldsFormatter),
            options.groupFieldsFormatter)
          )
            try {
              var s = "groupFieldsFormatter=" + options.groupFieldsFormatter;
              eval(s);
            } catch (t) {
              console.log(t);
            }
          return groupFieldsFormatter;
        }),
        (TableExcelHelper.getGroupFormatter = function (
          options,
          tablePrintElementType
        ) {
          var groupFormatter = void 0;
          if (
            (tablePrintElementType.groupFormatter &&
              (groupFormatter = tablePrintElementType.groupFormatter),
            options.groupFormatter)
          )
            try {
              var s = "groupFormatter=" + options.groupFormatter;
              eval(s);
            } catch (t) {
              console.log(t);
            }
          return groupFormatter;
        }),
        (TableExcelHelper.getGroupFooterFormatter = function (
          options,
          tablePrintElementType
        ) {
          var groupFooterFormatter = void 0;
          if (
            (tablePrintElementType.groupFooterFormatter &&
              (groupFooterFormatter =
                tablePrintElementType.groupFooterFormatter),
            options.groupFooterFormatter)
          )
            try {
              var s = "groupFooterFormatter=" + options.groupFooterFormatter;
              eval(s);
            } catch (t) {
              console.log(t);
            }
          return groupFooterFormatter;
        }),
        (TableExcelHelper.getFooterFormatter = function (
          options,
          tablePrintElementType
        ) {
          var footerFormatter = void 0;
          if (
            (tablePrintElementType.footerFormatter &&
              (footerFormatter = tablePrintElementType.footerFormatter),
            options.footerFormatter)
          )
            try {
              var s = "footerFormatter=" + options.footerFormatter;
              eval(s);
            } catch (t) {
              console.log(t);
            }
          return footerFormatter;
        }),
        (TableExcelHelper.getRowStyler = function (
          options,
          tablePrintElementType
        ) {
          var rowStyler = void 0;
          if (
            (tablePrintElementType.rowStyler &&
              (rowStyler = tablePrintElementType.rowStyler),
            options.rowStyler)
          )
            try {
              var s = "rowStyler=" + options.rowStyler;
              eval(s);
            } catch (t) {
              console.log(t);
            }
          return rowStyler;
        }),
        (TableExcelHelper.getColumnTableSummaryFormatter = function (column) {
          var tableSummaryFormatter = void 0;
          if (
            (column.tableSummaryFormatter &&
              (tableSummaryFormatter = column.tableSummaryFormatter),
            column.tableSummaryFormatter)
          )
            try {
              var s = "tableSummaryFormatter=" + column.tableSummaryFormatter;
              eval(s);
            } catch (t) {
              console.log(t);
            }
          return tableSummaryFormatter;
        }),
        (TableExcelHelper.getColumnStyler = function (column) {
          var styler = void 0;
          if ((column.styler && (styler = column.styler), column.styler2))
            try {
              var s = "styler=" + column.styler2;
              eval(s);
            } catch (t) {
              console.log(t);
            }
          return styler;
        }),
        (TableExcelHelper.getHeaderStyler = function (column) {
          var stylerHeader = void 0;
          if (
            (column.stylerHeader && (stylerHeader = column.stylerHeader),
            column.stylerHeader)
          )
            try {
              var s = "stylerHeader=" + column.stylerHeader;
              eval(s);
            } catch (t) {
              console.log(t);
            }
          return stylerHeader;
        }),
        (TableExcelHelper.getColumnRenderFormatter = function (column) {
          var renderFormatter = void 0;
          if (
            (column.renderFormatter &&
              (renderFormatter = column.renderFormatter),
            column.renderFormatter)
          )
            try {
              var s = "renderFormatter=" + column.renderFormatter;
              eval(s);
            } catch (t) {
              console.log(t);
            }
          return renderFormatter;
        }),
        (TableExcelHelper.getColumnFormatter = function (column) {
          var formatter = void 0;
          if (
            (column.formatter && (formatter = column.formatter),
            column.formatter2)
          )
            try {
              var s = "formatter=" + column.formatter2;
              eval(s);
            } catch (t) {
              console.log(t);
            }
          return formatter;
        }),
        (TableExcelHelper.getOrderdColumns = function (t) {
          // 新数据
          let newColumns = {};
          // 遍历所有 rawData columns，先处理 colspan 防止后面 rowspan 插入取下标错误
          for (let i = 0; i < t.totalLayer; i++) {
            newColumns[i] = []; // 新数据中添加对应 columns
            t[i].forEach((column, columnIdx) => {
              newColumns[i].push(
                ...new Array(column.colspan).fill({ ...column, colspan: 1 })
              ); // 创建 colspan 个
            });
          }
          // 再次遍历 rawData columns，处理 rowspan 给后面 columns 插入相同 column
          for (let i = 0; i < t.totalLayer; i++) {
            newColumns[i].forEach((column, columnIdx) => {
              for (let n = 1; n < column.rowspan; n++) {
                newColumns[i + n].splice(columnIdx, 0, {
                  ...column,
                  rowspan: 1,
                });
              }
            });
          }
          // 把上层/其他层的 field 赋值给最下层
          let lastColumns = [];
          for (let i = 0; i < t.totalLayer; i++) {
            if (i >= t.totalLayer - 1) {
              newColumns[i].forEach((column, columnIdx) => {
                if (!column.field) {
                  column.field = lastColumns[columnIdx];
                }
              });
            } else {
              newColumns[i].forEach((column, columnIdx) => {
                if (i == 0) {
                  lastColumns.push(column.field || "");
                } else {
                  column.field && (lastColumns[columnIdx] = column.field);
                }
              });
            }
          }
          this.rowColumns = newColumns[t.totalLayer - 1];
          return newColumns[t.totalLayer - 1];
        }),
        TableExcelHelper
      );
    })();
}

export default TableExcelHelperFuc;
