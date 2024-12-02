import { i18n } from "../i18n/i18n";

function TableExcelHelperFuc(module, exports, require) {
  "use strict";

  require.d(exports, "a", function () {
    return TableExcelHelper;
  });

  var _ReconsitutionTableColumns__WEBPACK_IMPORTED_MODULE_0__ = require(19),
    _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_1__ = require(0);

  class TableExcelHelper {
    static createTableHead(t, e) {
      const n = TableExcelHelper.reconsitutionTableColumnTree(t);
      const i = $("<thead></thead>");
      let colgroup = $("<colgroup></colgroup>");
      const o = TableExcelHelper.getColumnsWidth(n, e);

      const r = function (t) {
        const e = $("<tr></tr>");
        colgroup = $("<colgroup></colgroup>");
        n[t]
          .filter((t) => t.checked)
          .forEach((t) => {
            const n = $("<td></td>");
            t.id && n.attr("id", t.id);
            t.columnId && n.attr("column-id", t.columnId);
            (t.align || t.halign) && n.css("text-align", t.halign || t.align);
            t.vAlign && n.css("vertical-align", t.vAlign);
            t.colspan > 1 && n.attr("colspan", t.colspan);
            t.rowspan > 1 && n.attr("rowspan", t.rowspan);
            n.html(t.title);
            if (o[t.id]) {
              t.hasWidth = true;
              t.targetWidth = o[t.id];
              n.attr("haswidth", "haswidth");
              n.css("width", o[t.id] + "pt");
            } else {
              t.hasWidth = false;
            }
            const s = TableExcelHelper.getHeaderStyler(t);
            if (s) {
              const l = s(t);
              if (l) {
                Object.keys(l).forEach((t) => {
                  n.css(t, l[t]);
                });
              }
            }
            e.append(n);
            colgroup.append(
              `<col column-id="${t.columnId}" width="${t.width}pt"></col>`
            );
          });
        i.append(e);
      };

      for (let a = 0; a < n.totalLayer; a++) {
        r(a);
      }
      TableExcelHelper.syncTargetWidthToOption(t);
      return [i, colgroup];
    }

    static createTableFooter(t, e, n, i, o, r, pageIndex) {
      const a = $("<tfoot></tfoot>");
      const p = this.getFooterFormatter(n, i);
      const tst = this.tableSummaryTitle;
      let tSumData = n.tableFooterRepeat == "last" ? e : r;
      let idx = n.columns.length - 1;
      const rowColumns = this.rowColumns || n.columns[idx].columns;

      if (
        n.tableFooterRepeat != "no" &&
        rowColumns.some((column) => column.tableSummary)
      ) {
        const tableFooter = $("<tr></tr>");
        rowColumns
          .filter((t) => t.checked)
          .forEach((column) => {
            const fieldData = tSumData
              .filter((row) => row && row[column.field])
              .map((row) =>
                new RegExp("^-?(0|[1-9]\\d*)(\\.\\d+)?").test(row[column.field])
                  ? Number(row[column.field])
                  : 0
              );
            const text = column.tableSummaryText;
            const numF = column.tableSummaryNumFormat || 2;
            const style = `text-align: ${column.tableSummaryAlign || "center"}`;
            const colspan =
              column.tableSummaryColspan == void 0
                ? 1
                : column.tableSummaryColspan;
            const upperCaseType = column.upperCase;
            const { toUpperCase, numFormat } =
              _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_1__.a;
            const tableSummaryFormatter =
              TableExcelHelper.getColumnTableSummaryFormatter(column);
            const formatterResult = tableSummaryFormatter
              ? tableSummaryFormatter(column, fieldData, e, n)
              : "";
            if (formatterResult) {
              tableFooter.append(formatterResult);
              return;
            }
            switch (column.tableSummary) {
              case "count":
                const title = tst(column, text || `${i18n.__("计数")}:`, o);
                const count = toUpperCase(
                  upperCaseType,
                  tSumData.filter((i) => i).length || 0
                );
                tableFooter.append(
                  `<td style="${style}" colspan="${colspan}">${title}${count}</td>`
                );
                break;
              case "sum":
                let sum = parseFloat(
                  Number(fieldData.reduce((prev, cur) => prev + cur, 0))
                );
                sum = toUpperCase(upperCaseType, numFormat(sum, numF));
                const sumTitle = tst(column, text || `${i18n.__("合计")}:`, o);
                tableFooter.append(
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
                  numFormat(avg, numF)
                );
                const avgTitle = tst(
                  column,
                  text || `${i18n.__("平均值")}:`,
                  o
                );
                tableFooter.append(
                  `<td style="${style}" colspan="${colspan}">${avgTitle}${avgFormatted}</td>`
                );
                break;
              case "min":
                let min = Math.min(...fieldData) || 0;
                min == Infinity && (min = 0);
                const minFormatted = toUpperCase(
                  upperCaseType,
                  numFormat(min, numF)
                );
                const minTitle = tst(
                  column,
                  text || `${i18n.__("最小值")}:`,
                  o
                );
                tableFooter.append(
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
                  numFormat(max, numF)
                );
                const maxTitle = tst(
                  column,
                  text || `${i18n.__("最大值")}:`,
                  o
                );
                tableFooter.append(
                  `<td style="${style}" colspan="${colspan}">${maxTitle}${
                    max || 0
                  }</td>`
                );
                break;
              case "text":
                tableFooter.append(
                  `<td style="${style}" colspan="${colspan}">${text || ""}</td>`
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
        a.append(p(n, e, o, r, pageIndex));
      }
      return a;
    }

    static tableSummaryTitle(column, title, data) {
      const s =
        column.tableSummaryTitle == undefined ||
        column.tableSummaryTitle == true;
      return s
        ? `${title}`
        : data
        ? ``
        : `<span style="color:firebrick">${title}</span>`;
    }

    static createTableRow(t, e, printData, n, i) {
      const h = this;
      const o = TableExcelHelper.reconsitutionTableColumnTree(t);
      const r = $("<tbody></tbody>");
      const gff = h.getGroupFieldsFormatter(n, i);
      let groupRowIndex = 0;
      const groupFields = gff
        ? (n.groupFields = gff(i, n, e))
        : i.groupFields
        ? i.groupFields
        : [];
      (e || (e = []), groupFields.length)
        ? _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_1__.a
            .groupBy(e, groupFields, (t) => {
              const e = {};
              groupFields.forEach((n) => (e[n] = t[n]));
              return e;
            })
            .forEach((t) => {
              const groupFormatter = h.getGroupFormatter(n, i);
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
              const groupFooterFormatter = h.getGroupFooterFormatter(n, i);
              const groupData = t;
              if (
                (groupData.rows.forEach((t, rowIndex) => {
                  let sequenceIndex = n.groupSequenceContinue
                    ? groupRowIndex
                    : rowIndex;
                  const e = TableExcelHelper.createRowTarget(
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
        : e.forEach((t, rowIndex) => {
            const row = TableExcelHelper.createRowTarget(
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
    }

    static createRowTarget(t, e, n, i, rowIndex, tableData, printData) {
      const o = $("<tr></tr>");
      const columns = t.rowColumns.filter((t) => t.checked);
      o.data("rowData", e);
      t.rowColumns
        .filter((t) => t.checked)
        .forEach((t, i) => {
          if (!t.checked) return;
          let rowsColumnsMerge = "";
          if (n.rowsColumnsMerge) {
            eval("rowsColumnsMerge=" + n.rowsColumnsMerge);
            const rowsColumnsArr = rowsColumnsMerge(
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
          if (
            e &&
            Object.keys(e).length > 0 &&
            ("first" == n.tableHeaderRepeat || "none" == n.tableHeaderRepeat)
          ) {
            t.field && r.attr("field", t.field);
            t.align && r.css("text-align", t.align);
            t.vAlign && r.css("vertical-align", t.vAlign);
            if (n.rowsColumnsMerge) {
              if (rowsColumnsArr[1] > 1) {
                let width = 0;
                columns.forEach((item, index) => {
                  if (index >= i && index < i + rowsColumnsArr[1]) {
                    width += item.width;
                  }
                });
              }
            }
            r.css("width", (width || t.width) + "pt");
          } else {
            t.field && r.attr("field", t.field);
            t.align && r.css("text-align", t.align);
            t.vAlign && r.css("vertical-align", t.vAlign);
          }
          const a = TableExcelHelper.getColumnFormatter(t);
          const p = a ? a(e[t.field], e, i, n) : e[t.field];
          const rf = TableExcelHelper.getColumnRenderFormatter(t);
          if (rf) {
            r.html(rf(e[t.field], e, i, n, rowIndex));
          } else if ("text" == t.tableTextType || t.tableTextType == void 0) {
            r.html(p);
          } else {
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
                    r.find(".hibarcode_imgcode").css("margin", "5pt 10pt"),
                    r
                      .find(".hibarcode_imgcode")
                      .attr("width", "calc(100% - 20pt)"))
                  : r.html("");
                if (t.showCodeTitle) {
                  r.find(".hibarcode_displayValue").html(p);
                }
              } catch (t) {
                console.log(t);
                r.html(`${i18n.__("此格式不支持该文本")}`);
              }
            }
            if ("image" == t.tableTextType) {
              r.html("");
              if (p) {
                const imagebox = $(
                  '<div><img style = "max-width:100%;max-height:100%"/></div>'
                );
                imagebox.find("img").attr("src", p);
                imagebox
                  .find("img")
                  .attr("height", t.tableColumnHeight || 50 + "pt");
                r.html(imagebox);
              }
            }
            if ("qrcode" == t.tableTextType) {
              r.html("");
              try {
                const qrcodebox = $(
                  '<div style="margin:2pt 0pt" class="hiqrcode_imgcode"></div>'
                );

                if (p) {
                  const l = parseInt(t.width || t.targetWidth || 20);
                  const u = parseInt(t.tableColumnHeight || 20);
                  qrcodebox.css("height", (l > u ? u : l) + "pt");
                  new QRCode(qrcodebox[0], {
                    width: l > u ? u : l,
                    height: l > u ? u : l,
                    colorDark: "#000000",
                    useSVG: !0,
                    correctLevel: t.tableQRCodeLevel || 0,
                  }).makeCode(p);
                  r.html(qrcodebox);
                  if (t.showCodeTitle) {
                    r.append('<div class="hiqrcode_displayValue"></div>');
                    r.find(".hiqrcode_displayValue").html(p);
                  }
                }
              } catch (t) {
                console.log(t);
                r.html(`${i18n.__("二维码生成失败")}`);
              }
            }
            if ("sequence" === t.tableTextType) {
              r.html(rowIndex + 1);
            }
          }
          const s = TableExcelHelper.getColumnStyler(t);

          if (s) {
            const l = s(e[t.field], e, i, n);
            if (l) {
              Object.keys(l).forEach((t) => {
                r.css(t, l[t]);
              });
            }
          }

          o.append(r);
        });
      const r = TableExcelHelper.getRowStyler(n, i);

      if (r) {
        const a = r(e, n);
        if (a) {
          Object.keys(a).forEach((t) => {
            o.css(t, a[t]);
          });
        }
      }

      return o;
    }

    static createEmptyRowTarget(t, tableElement) {
      const e = TableExcelHelper.reconsitutionTableColumnTree(t);
      const n = $("<tr></tr>");
      e.rowColumns
        .filter((t) => t.checked)
        .forEach((t, e) => {
          const i = $("<td></td>");
          t.field && i.attr("field", t.field);
          t.align && i.css("text-align", t.align);
          t.vAlign && i.css("vertical-align", t.vAlign);
          n.append(i);
        });
      if (tableElement && tableElement.options.tableBodyRowHeight) {
        n.find("td:not([rowspan])").css(
          "height",
          tableElement.options.tableBodyRowHeight + "pt"
        );
      }
      return n;
    }

    static getColumnsWidth(t, e) {
      const n = {};
      const i = TableExcelHelper.allAutoWidth(t);
      const o = TableExcelHelper.allFixedWidth(t);
      t.rowColumns
        .filter((t) => t.checked)
        .forEach((t) => {
          if (t.fixed) {
            n[t.id] = t.width;
          } else {
            const r = e - o;
            const a = (t.width / i) * (r > 0 ? r : 0);
            n[t.id] = a;
          }
        });
      return n;
    }

    static resizeTableCellWidth(t, e, n) {
      const i = TableExcelHelper.reconsitutionTableColumnTree(e);
      const o = TableExcelHelper.getColumnsWidth(i, n);
      t.find("thead tr td[haswidth]").map((t, e) => {
        const n = $(e).attr("id");
        const i = o[n];
        $(e).css("width", i + "pt");
      });
    }

    static allAutoWidth(t) {
      let e = 0;
      const n = {};
      t.rowColumns
        .filter((t) => t.checked)
        .forEach((t) => {
          n[t.id] ? (n[t.id] = 0) : (n[t.id] = t.width);
          e += t.fixed ? 0 : n[t.id];
        });
      return e;
    }

    static allFixedWidth(t) {
      let e = 0;
      const n = {};
      t.rowColumns
        .filter((t) => t.checked)
        .forEach((t) => {
          n[t.id] ? (n[t.id] = 0) : (n[t.id] = t.width);
          e += t.fixed ? n[t.id] : 0;
        });
      return e;
    }

    static reconsitutionTableColumnTree(t, e, n) {
      const i =
        e || new _ReconsitutionTableColumns__WEBPACK_IMPORTED_MODULE_0__.a();
      i.colspan = 0;

      for (let r = 0; r < t.length; r++) {
        i.totalLayer = r + 1;
        i[r] = t[r].columns;
        if (r == 0) {
          t[r].columns.forEach((t) => {
            if (r == 0) {
              i.colspan += t.colspan;
            }
          });
        }
      }

      i.rowColumns = TableExcelHelper.getOrderdColumns(i);
      return i;
    }

    static syncTargetWidthToOption(t) {
      t.forEach((t) => {
        t.columns.forEach((t) => {
          if (t.hasWidth) {
            t.width = t.targetWidth;
          }
        });
      });
    }

    static getGroupFieldsFormatter(options, tablePrintElementType) {
      let groupFieldsFormatter;
      if (
        tablePrintElementType.groupFields &&
        tablePrintElementType.groupFields.length
      ) {
        const arr =
          typeof tablePrintElementType.groupFields == "string"
            ? tablePrintElementType.groupFields
            : JSON.stringify(tablePrintElementType.groupFields);
        options.groupFieldsFormatter =
          "function(type,options,data){ return " + arr + " }";
      }
      if (tablePrintElementType.groupFieldsFormatter) {
        groupFieldsFormatter = tablePrintElementType.groupFieldsFormatter;
      }
      if (options.groupFieldsFormatter) {
        try {
          const s = "groupFieldsFormatter=" + options.groupFieldsFormatter;
          eval(s);
        } catch (t) {
          console.log(t);
        }
      }
      return groupFieldsFormatter;
    }

    static getGroupFormatter(options, tablePrintElementType) {
      let groupFormatter;
      if (tablePrintElementType.groupFormatter) {
        groupFormatter = tablePrintElementType.groupFormatter;
      }
      if (options.groupFormatter) {
        try {
          const s = "groupFormatter=" + options.groupFormatter;
          eval(s);
        } catch (t) {
          console.log(t);
        }
      }
      return groupFormatter;
    }

    static getGroupFooterFormatter(options, tablePrintElementType) {
      let groupFooterFormatter;
      if (tablePrintElementType.groupFooterFormatter) {
        groupFooterFormatter = tablePrintElementType.groupFooterFormatter;
      }
      if (options.groupFooterFormatter) {
        try {
          const s = "groupFooterFormatter=" + options.groupFooterFormatter;
          eval(s);
        } catch (t) {
          console.log(t);
        }
      }
      return groupFooterFormatter;
    }

    static getFooterFormatter(options, tablePrintElementType) {
      let footerFormatter;
      if (tablePrintElementType.footerFormatter) {
        footerFormatter = tablePrintElementType.footerFormatter;
      }
      if (options.footerFormatter) {
        try {
          const s = "footerFormatter=" + options.footerFormatter;
          eval(s);
        } catch (t) {
          console.log(t);
        }
      }
      return footerFormatter;
    }

    static getRowStyler(options, tablePrintElementType) {
      let rowStyler;
      if (tablePrintElementType.rowStyler) {
        rowStyler = tablePrintElementType.rowStyler;
      }
      if (options.rowStyler) {
        try {
          const s = "rowStyler=" + options.rowStyler;
          eval(s);
        } catch (t) {
          console.log(t);
        }
      }
      return rowStyler;
    }

    static getColumnTableSummaryFormatter(column) {
      let tableSummaryFormatter;
      if (column.tableSummaryFormatter) {
        tableSummaryFormatter = column.tableSummaryFormatter;
      }
      if (column.tableSummaryFormatter) {
        try {
          const s = "tableSummaryFormatter=" + column.tableSummaryFormatter;
          eval(s);
        } catch (t) {
          console.log(t);
        }
      }
      return tableSummaryFormatter;
    }

    static getColumnStyler(column) {
      let styler;
      if (column.styler) {
        styler = column.styler;
      }
      if (column.styler2) {
        try {
          const s = "styler=" + column.styler2;
          eval(s);
        } catch (t) {
          console.log(t);
        }
      }
      return styler;
    }

    static getHeaderStyler(column) {
      let stylerHeader;
      if (column.stylerHeader) {
        stylerHeader = column.stylerHeader;
      }
      if (column.stylerHeader) {
        try {
          const s = "stylerHeader=" + column.stylerHeader;
          eval(s);
        } catch (t) {
          console.log(t);
        }
      }
      return stylerHeader;
    }

    static getColumnRenderFormatter(column) {
      let renderFormatter;
      if (column.renderFormatter) {
        renderFormatter = column.renderFormatter;
      }
      if (column.renderFormatter) {
        try {
          const s = "renderFormatter=" + column.renderFormatter;
          eval(s);
        } catch (t) {
          console.log(t);
        }
      }
      return renderFormatter;
    }

    static getColumnFormatter(column) {
      let formatter;
      if (column.formatter) {
        formatter = column.formatter;
      }
      if (column.formatter2) {
        try {
          const s = "formatter=" + column.formatter2;
          eval(s);
        } catch (t) {
          console.log(t);
        }
      }
      return formatter;
    }

    static getOrderdColumns(t) {
      let newColumns = {};
      for (let i = 0; i < t.totalLayer; i++) {
        newColumns[i] = [];
        t[i].forEach((column, columnIdx) => {
          newColumns[i].push(
            ...new Array(column.colspan).fill({ ...column, colspan: 1 })
          );
        });
      }
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
    }
  }

  // return TableExcelHelper;
}

export default TableExcelHelperFuc;
