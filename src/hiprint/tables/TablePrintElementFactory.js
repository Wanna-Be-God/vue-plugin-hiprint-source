import { i18n } from "../i18n/i18n.js";
import { _instanceof } from "../utils/Utils.js";
export default function TablePrintElementFactory(module, exports, require) {
  "use strict";

  require.d(exports, "a", function () {
    return TablePrintElement;
  });

  var _BasePrintElement__WEBPACK_IMPORTED_MODULE_0__ = require(4),
    _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__ = require(1),
    _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_2__ = require(6),
    _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__ = require(0),
    _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_4__ = require(8),
    _option_TablePrintElementOption__WEBPACK_IMPORTED_MODULE_5__ = require(18),
    _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__ = require(7),
    _hitable_HiTale__WEBPACK_IMPORTED_MODULE_7__ = require(16),
    _table_GridColumnsStructure__WEBPACK_IMPORTED_MODULE_8__ = require(20),
    _HiPrintlib__WEBPACK_IMPORTED_MODULE_9__ = require(2),
    __extends =
      ((_extendStatics = function extendStatics(t, e) {
        return (_extendStatics =
          Object.setPrototypeOf ||
          (_instanceof(
            {
              __proto__: [],
            },
            Array
          ) &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) {
              e.hasOwnProperty(n) && (t[n] = e[n]);
            }
          })(t, e);
      }),
      function (t, e) {
        function n() {
          this.constructor = t;
        }

        _extendStatics(t, e),
          (t.prototype =
            null === e
              ? Object.create(e)
              : ((n.prototype = e.prototype), new n()));
      }),
    _extendStatics,
    TablePrintElement = (function (_super) {
      function TablePrintElement(t, e) {
        var n = _super.call(this, t) || this;
        return (
          (n.gridColumnsFooterCss = "hiprint-gridColumnsFooter"),
          (n.tableGridRowCss = "table-grid-row"),
          (n.options =
            new _option_TablePrintElementOption__WEBPACK_IMPORTED_MODULE_5__.a(
              e,
              n.printElementType
            )),
          n.options.setDefault(
            new _option_TablePrintElementOption__WEBPACK_IMPORTED_MODULE_5__.a(
              _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.table.default
            ).getPrintElementOptionEntity()
          ),
          n
        );
      }

      return (
        __extends(TablePrintElement, _super),
        (TablePrintElement.prototype.getColumns = function () {
          return this.options.columns;
        }),
        (TablePrintElement.prototype.getColumnByColumnId = function (t) {
          return this.options.getColumnByColumnId(t);
        }),
        (TablePrintElement.prototype.updateDesignViewFromOptions = function () {
          if (this.designTarget) {
            var t = this.designTarget.find(
                ".hiprint-printElement-table-content"
              ),
              e = this.getHtml(this.designPaper);
            t.html(""),
              t.append(e[0].target.find(".table-grid-row")),
              this.printElementType.editable && this.setHitable(),
              this.setColumnsOptions();
            // 渲染完再处理样式 ==> fix 表脚边框参数设置问题
            this.css(this.designTarget, this.getData());
          }
        }),
        (TablePrintElement.prototype.css = function (t, e) {
          if (
            (this.getField() || !this.options.content) &&
            !this.printElementType.formatter
          )
            return _super.prototype.css.call(this, t, e);
        }),
        (TablePrintElement.prototype.getDesignTarget = function (t) {
          return (
            (this.designTarget = this.getHtml(t)[0].target),
            this.css(this.designTarget, this.getData()),
            (this.designPaper = t),
            this.designTarget.find("td").hidroppable({
              accept: ".rn-draggable-item",
              onDrop: function onDrop(t, e) {},
              onDragEnter: function onDragEnter(t, e) {
                $(e).removeClass("rn-draggable-item");
              },
              onDragLeave: function onDragLeave(t, e) {
                $(e).addClass("rn-draggable-item");
              },
            }),
            this.designTarget
          );
        }),
        (TablePrintElement.prototype.getConfigOptions = function () {
          return _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.table;
        }),
        (TablePrintElement.prototype.createTarget = function (t, e, n) {
          for (
            var i = $(
                '<div class="hiprint-printElement hiprint-printElement-table" style="position: absolute;"><div class="hiprint-printElement-table-handle"></div><div class="hiprint-printElement-table-content" style="height:100%;width:100%"></span></div>'
              ),
              o = this.createGridColumnsStructure(n),
              r = 0;
            r < o.gridColumns;
            r++
          ) {
            o.getByIndex(r).append(this.getTableHtml(e, n));
          }

          return (
            i.find(".hiprint-printElement-table-content").append(o.target), i
          );
        }),
        (TablePrintElement.prototype.createGridColumnsStructure = function (t) {
          for (
            var e = $('<div class="hi-grid-row table-grid-row"></div>'), n = 0;
            n < this.options.getGridColumns();
            n++
          ) {
            var i = $(
              '<div class="tableGridColumnsGutterRow hi-grid-col" style="width:' +
                100 / this.options.getGridColumns() +
                '%;"></div>'
            );
            e.append(i);
          }

          var o = this.getGridColumnsFooterFormatter();

          if (o) {
            var r = $('<div class="hiprint-gridColumnsFooter"></div>');
            r.append(o(this.options, this.getData(t), t, [])), e.append(r);
          }

          return new _table_GridColumnsStructure__WEBPACK_IMPORTED_MODULE_8__.a(
            this.options.getGridColumns(),
            e
          );
        }),
        (TablePrintElement.prototype.createtempEmptyRowsTargetStructure =
          function (t) {
            if (this.getField())
              return this.createTarget(this.printElementType.title, []);
            var e = this.createTarget(this.printElementType.title, []).clone();
            return (
              e.find(".hiprint-printElement-tableTarget tbody tr").remove(), e
            );
          }),
        (TablePrintElement.prototype.getTableHtml = function (t, e) {
          var n, i;
          if (!this.getField() && this.options.content)
            return (
              (n = $("<div></div>")).append(this.options.content),
              (i = n.find("table")).addClass(
                "hiprint-printElement-tableTarget"
              ),
              i
            );
          if (this.printElementType.formatter)
            return (
              (n = $("<div></div>")).append(this.printElementType.formatter(t)),
              (i = n.find("table")).addClass(
                "hiprint-printElement-tableTarget"
              ),
              i
            );
          var o = $(
            '<table class="hiprint-printElement-tableTarget" style="border-collapse: collapse;"></table>'
          );
          let headerList =
            _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a.createTableHead(
              this.getColumns(),
              this.options.getWidth() / this.options.getGridColumns()
            );
          return (
            this.isNotDesign ? o.append(headerList) : o.append(headerList[0]),
            o.append(
              _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a.createTableRow(
                this.getColumns(),
                t,
                e,
                this.options,
                this.printElementType
              )
            ),
            "no" == this.options.tableFooterRepeat ||
              _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a
                .createTableFooter(
                  this.printElementType.columns,
                  t,
                  this.options,
                  this.printElementType,
                  e,
                  t
                )
                .insertBefore(o.find("tbody")),
            o
          );
        }),
        (TablePrintElement.prototype.getEmptyRowTarget = function () {
          return _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a.createEmptyRowTarget(
            this.getColumns(),
            this
          );
        }),
        (TablePrintElement.prototype.getHtml = function (t, e) {
          this.createTempContainer();
          this.isNotDesign = e != void 0;
          var n = this.getPaperHtmlResult(t, e);
          return this.removeTempContainer(), n;
        }),
        (TablePrintElement.prototype.getPaperHtmlResult = function (t, e) {
          var n = [],
            i = this.getData(e),
            o = this.getTableHtml(i, e),
            r = this.createtempEmptyRowsTargetStructure(e);
          e ? this.updateTargetWidth(r) : this.updateTargetSize(r),
            this.css(r, i),
            this.css(o, i),
            this.getTempContainer().html(""),
            this.getTempContainer().append(r);
          // 页脚导致 分页高度的问题, -> 获取到表格脚高度后移除避免重复
          var tfh = r.find("tfoot").outerHeight() || 0;
          r.find("tfoot").remove();
          for (
            var a,
              p = this.getBeginPrintTopInPaperByReferenceElement(t),
              s = 0,
              l = !1;
            !l;

          ) {
            var u = 0,
              d = t.getPaperFooter(s);
            0 == s &&
              p > d &&
              "none" != t.panelPageRule &&
              ((p = p - d + t.paperHeader),
              n.push(
                new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_2__.a({
                  target: void 0,
                  printLine: void 0,
                })
              ),
              (u = t.getContentHeight(s) - (p - t.paperHeader)),
              s++,
              (d = t.getPaperFooter(s)));
            var c = n.length > 0 ? n[n.length - 1].target : void 0,
              h = this.getRowsInSpecificHeight(
                e,
                u > 0 ? u : 0 == s ? d - p : t.getContentHeight(s),
                r,
                o,
                s,
                c,
                tfh
              );
            l = h.isEnd;
            if (u < 0) {
              n[0].target = $(
                `<div style="position:absolute;background: red;color: white;padding: 0px 4px;">${i18n.__(
                  "没有足够空间进行表格分页，请调整页眉/页脚线"
                )}</div>`
              );
              n[0].printLine = p;
              n[0].referenceElement =
                new _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_4__.a({
                  top: this.options.getTop(),
                  left: this.options.getLeft(),
                  height: this.options.getHeight(),
                  width: this.options.getWidth(),
                  beginPrintPaperIndex: t.index,
                  bottomInLastPaper: p + this.options.lHeight,
                  printTopInPaper: p,
                });
              n[0].target.css("top", p + "pt");
              n[0].target.css("left", this.options.displayLeft());
              break;
            }
            var f = void 0;
            h.target &&
              (h.target.css("left", this.options.displayLeft()),
              (h.target[0].height = ""));
            if (0 == s || u > 0) {
              h.target && ((a = p), h.target.css("top", p + "pt")),
                (f =
                  l && null != this.options.lHeight
                    ? p +
                      (h.height > this.options.lHeight
                        ? h.height
                        : this.options.lHeight)
                    : p + h.height);
            } else {
              h.target &&
                ((a = t.paperHeader),
                h.target.css("top", t.paperHeader + "pt")),
                (f = t.paperHeader + h.height);
            }
            n.push(
              new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_2__.a({
                target: h.target,
                printLine: f,
                referenceElement:
                  new _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_4__.a({
                    top: this.options.getTop(),
                    left: this.options.getLeft(),
                    height: this.options.getHeight(),
                    width: this.options.getWidth(),
                    beginPrintPaperIndex: t.index,
                    bottomInLastPaper: f,
                    printTopInPaper: a,
                  }),
              })
            ),
              s++;
            e && this.updatePanelHeight(f + this.options.getHeight(), t);
          }

          return n;
        }),
        (TablePrintElement.prototype.getRowsInSpecificHeight = function (
          t,
          e,
          n,
          i,
          o,
          r,
          tfh
        ) {
          var that = this;
          var a = i.find("tbody"),
            p = _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.pt.toPx(e);

          n.find(".hiprint-printElement-tableTarget tbody").html("");
          // 不是最后显示页脚
          if ("last" != this.options.tableFooterRepeat) {
            n.find(".hiprint-printElement-tableTarget tfoot").remove();
          }
          // 仅首页显示表头
          if ("first" == this.options.tableHeaderRepeat && o > 0) {
            n.find(".hiprint-printElement-tableTarget thead").remove();
          } else if ("none" == this.options.tableHeaderRepeat) {
            // 有数据（不是design）
            if (t) {
              n.find(".hiprint-printElement-tableTarget thead").remove();
            } else {
              n.find(".hiprint-printElement-tableTarget thead").css(
                "background",
                "firebrick"
              );
              n.find(".hiprint-printElement-tableTarget thead tr").css(
                "background",
                "firebrick"
              );
            }
          }
          var noPaging = "none" == this.panel.panelPageRule;
          // 不分页, 且不是设计时, 移除 thead
          var headTr;
          if (t && noPaging) {
            var headStyle = n
              .find(".hiprint-printElement-tableTarget thead")
              .attr("style");
            headTr = n
              .find(".hiprint-printElement-tableTarget thead tr")
              .clone();
            if (headStyle) {
              headTr.attr("style", headStyle);
            } else {
              headTr.css({ background: "#e8e8e8" });
            }
            n.find(".hiprint-printElement-tableTarget thead").remove();
          }
          var s = n.outerHeight();
          if (!noPaging && s > p)
            return {
              target: void 0,
              length: 0,
              height: 0,
              isEnd: !1,
            };
          var getGridColumns = this.options.getGridColumns();
          for (var l = [], u = 0; u < getGridColumns; u++) {
            for (
              var d = n.find(".hiprint-printElement-tableTarget:eq(" + u + ")"),
                c = void 0,
                h = [];
              ;

            ) {
              // 不分页处理
              if (noPaging) {
                var trLen = a.find("tr").length;
                if (0 == trLen)
                  (c = {
                    height:
                      _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(
                        s
                      ),
                    isEnd: !0,
                  }),
                    t &&
                      this.options.autoCompletion &&
                      (this.autoCompletion(p, d, tfh), (s = n.outerHeight()));
                else {
                  var f = a.find("tr:lt(1)");
                  if (h.length == 0 && headTr) {
                    d.find("tbody").append(headTr);
                  }
                  d.find("tbody").append(f);
                  var g = f.data("rowData");
                  l.push(g), h.push(g), (s = n.outerHeight());
                  0 == trLen &&
                    (a.prepend(f),
                    l.pop(),
                    h.pop(),
                    (c = {
                      height:
                        _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(
                          s
                        ),
                      isEnd: !1,
                    }));
                }
              } else {
                if (s <= p)
                  if (0 == a.find("tr").length)
                    (c = {
                      height:
                        _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(
                          s
                        ),
                      isEnd: !0,
                    }),
                      t &&
                        this.options.autoCompletion &&
                        (this.autoCompletion(p, d, tfh), (s = d.outerHeight()));
                  else {
                    var f = a.find("tr:lt(1)");
                    if (
                      that.options.rowsColumnsMerge &&
                      (o > 0 || u > 0) &&
                      h.length == 0
                    ) {
                      f = that.fixMergeSpan(f, a);
                    }
                    d.find("tbody").append(f);
                    var g = f.data("rowData");
                    l.push(g),
                      h.push(g),
                      (((s = d.outerHeight()),
                      "last" == this.options.tableFooterRepeat
                        ? s
                        : (s += tfh)) > p ||
                        (this.options.maxRows &&
                          h.length > +this.options.maxRows)) &&
                        (a.prepend(f),
                        l.pop(),
                        h.pop(),
                        (s = d.outerHeight()),
                        (c = {
                          height:
                            _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(
                              s
                            ),
                          isEnd: !1,
                        }));
                  }
              }

              if (c) {
                // 这里是table 没有tfoot, 后面再看什么原因...
                if ("last" == this.options.tableFooterRepeat && !c.isEnd) break;
                if ("no" !== this.options.tableFooterRepeat) {
                  if (noPaging) {
                    d.find("tbody").append(
                      _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a
                        .createTableFooter(
                          this.printElementType.columns,
                          this.getData(t),
                          this.options,
                          this.printElementType,
                          t,
                          h,
                          o
                        )
                        .children()
                    );
                  } else {
                    _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a
                      .createTableFooter(
                        this.printElementType.columns,
                        this.getData(t),
                        this.options,
                        this.printElementType,
                        t,
                        h,
                        o
                      )
                      .insertBefore(d.find("tbody"));
                  }
                  that.css(d, t);
                }
                break;
              }
            }
          }

          var m = n.find(".hiprint-printElement-tableTarget tbody tr").length,
            v = this.getGridColumnsFooterFormatter();
          v &&
            n
              .find(this.gridColumnsFooterCss)
              .html(v(this.options, this.getData(t), t, l));
          s = n.outerHeight();
          // 当每一页数据,都无法容纳表格行内容时:
          let curRow = a.find("tr:lt(1)");
          if (m == 0 && curRow.length && g == curRow.data("rowData")) {
            d.find("tbody").append(curRow);
            let height = d.find("tbody tr").outerHeight();
            a.prepend(curRow);
            return {
              target: $(
                `<div style="position:absolute;background: red;color: white;padding: 0px 4px;">${i18n.__(
                  "没有足够空间,显示下方内容, 可分页高度"
                )}: ` +
                  p +
                  `px < ${i18n.__("当前需要高度")}: ` +
                  height +
                  "px</div>"
              ).append(curRow.css("background", "blue")),
              length: m,
              height:
                _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(s),
              isEnd: !1,
            };
          }
          // 方便调试看 值...
          var zz =
            0 == a.find("tr").length
              ? 0 == m && r
                ? {
                    target: void 0,
                    length: 0,
                    height: 0,
                    isEnd: !0,
                  }
                : {
                    target: n.clone(),
                    length: m,
                    height:
                      _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(
                        s
                      ),
                    isEnd: !0,
                  }
              : {
                  target: n.clone(),
                  length: m,
                  height:
                    _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.px.toPt(
                      s
                    ),
                  isEnd: !1,
                };
          return zz;
        }),
        (TablePrintElement.prototype.fixMergeSpan = function (tr, tbody) {
          const nextRowMap = new Map();
          tr.children().each((_, td) => {
            var field = $(td).attr("field");
            nextRowMap.set(field, {
              rowSpan: 1,
              rowEnd: false,
            });
            tr.nextAll().each((_, nextTr) => {
              if (
                $(nextTr).has(`td[field=${field}][rowspan=0]`).length &&
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

            if ($(td).attr("rowspan") < 1) {
              $(td).attr("rowspan", nextRowMap.get(field).rowSpan);
              $(td).css("display", "");
              if (this.options.rowsColumnsMergeClean) {
                $(td).text("");
              }
            }
          });
          return tr;
        }),
        (TablePrintElement.prototype.autoCompletion = function (t, e, tfh) {
          var that = this;
          for (
            var n, i = this.getEmptyRowTarget(), o = e.outerHeight() + tfh;
            t > o;

          ) {
            (n = i.clone()),
              e.find("tbody").append(n),
              (o = e.outerHeight() + tfh);
            if (
              that.options.maxRows &&
              e.find("tbody").children().length > that.options.maxRows
            ) {
              break;
            }
          }

          n && n.remove();
        }),
        (TablePrintElement.prototype.getData = function (t) {
          if (!t) {
            // 设计时表格 测试数据
            try {
              let testData = this.options.testData || "[{}]";
              return JSON.parse(testData);
            } catch (e) {
              console.log("table testData parse error", e);
              return [{}];
            }
          }
          var f = this.getField();
          var e = f
            ? f.split(".").reduce((a, c) => (a ? a[c] : t ? t[c] : ""), !1) ||
              ""
            : "";
          return e ? JSON.parse(JSON.stringify(e)) : [];
        }),
        (TablePrintElement.prototype.onResize = function (t, e, n, i, o) {
          _super.prototype.updateSizeAndPositionOptions.call(this, o, i, n, e),
            _table_TableExcelHelper__WEBPACK_IMPORTED_MODULE_6__.a.resizeTableCellWidth(
              this.designTarget,
              this.getColumns(),
              this.options.getWidth()
            );
        }),
        (TablePrintElement.prototype.getReizeableShowPoints = function () {
          return ["s", "e"];
        }),
        (TablePrintElement.prototype.design = function (t, e) {
          var n = this;
          this.designTarget.hidraggable({
            handle: this.designTarget.find(
              ".hiprint-printElement-table-handle"
            ),
            axis: n.options.axis ? n.options.axis : void 0,
            designTarget: n,
            onDrag: function onDrag(t, i, o) {
              n.updateSizeAndPositionOptions(i, o), n.createLineOfPosition(e);
              _HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.changed = !0;
            },
            moveUnit: "pt",
            minMove:
              _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance
                .movingDistance,
            onBeforeDrag: function onBeforeDrag(t) {
              (_HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.draging =
                !0),
                n.createLineOfPosition(e);
            },
            getScale: function getScale() {
              return n.designPaper.scale || 1;
            },
            onStopDrag: function onStopDrag(t) {
              if (_HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.changed)
                _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.event.trigger(
                  "hiprintTemplateDataChanged_" + n.templateId,
                  "移动"
                );
              (_HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.draging =
                !1),
                (_HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.changed =
                  !1),
                n.removeLineOfPosition();
            },
          }),
            this.printElementType.editable && this.setHitable(),
            this.setColumnsOptions(),
            this.designTarget.hireizeable({
              showPoints: n.getReizeableShowPoints(),
              // 是否显示宽高box
              showSizeBox:
                _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance
                  .showSizeBox,
              noContainer: !0,
              onBeforeResize: function onBeforeResize() {
                _HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.draging =
                  !0;
              },
              getScale: function getScale() {
                return n.designPaper.scale || 1;
              },
              onResize: function onResize(t, i, o, r, a) {
                n.onResize(t, i, o, r, a),
                  n.hitable && n.hitable.updateColumnGrips(),
                  n.createLineOfPosition(e);
              },
              onStopResize: function onStopResize(r) {
                _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.event.trigger(
                  "hiprintTemplateDataChanged_" + n.templateId,
                  r ? "旋转" : "大小"
                );
                (_HiPrintlib__WEBPACK_IMPORTED_MODULE_9__.a.instance.draging =
                  !1),
                  n.removeLineOfPosition();
              },
            }),
            this.bingKeyboardMoveEvent(this.designTarget, e);
        }),
        (TablePrintElement.prototype.setHitable = function () {
          var t = this;
          (this.hitable = new _hitable_HiTale__WEBPACK_IMPORTED_MODULE_7__.a({
            templateId: t.templateId,
            table: this.designTarget.find(
              ".hiprint-printElement-tableTarget:eq(0)"
            ),
            rows: this.getColumns(),
            resizeRow: !1,
            resizeColumn: !0,
            fields: this.options.fields,
            trs: this.designTarget
              .find(".hiprint-printElement-tableTarget:eq(0)")
              .find("tbody tr"),
            handle: this.designTarget
              .find(".hiprint-printElement-tableTarget:eq(0)")
              .find("thead"),
            isEnableEdit: this.printElementType.editable
              ? this.printElementType.editable
              : !0,
            columnDisplayEditable:
              this.printElementType.columnDisplayEditable != undefined
                ? this.printElementType.columnDisplayEditable
                : !0,
            columnDisplayIndexEditable:
              this.printElementType.columnDisplayIndexEditable != undefined
                ? this.printElementType.columnDisplayIndexEditable
                : !0,
            columnResizable:
              this.printElementType.columnResizable != undefined
                ? this.printElementType.columnResizable
                : !0,
            columnAlignEditable:
              this.printElementType.columnAlignEditable != undefined
                ? this.printElementType.columnAlignEditable
                : !0,
            isEnableEditText:
              this.printElementType.columnTitleEditable != undefined
                ? this.printElementType.columnTitleEditable
                : !0,
            isEnableEditField:
              this.printElementType.isEnableEditField != undefined
                ? this.printElementType.isEnableEditField
                : !0,
            isEnableContextMenu:
              this.printElementType.isEnableContextMenu != undefined
                ? this.printElementType.isEnableContextMenu
                : !0,
            isEnableInsertRow:
              this.printElementType.isEnableInsertRow != undefined
                ? this.printElementType.isEnableInsertRow
                : !0,
            isEnableDeleteRow:
              this.printElementType.isEnableDeleteRow != undefined
                ? this.printElementType.isEnableDeleteRow
                : !0,
            isEnableInsertColumn:
              this.printElementType.isEnableInsertColumn != undefined
                ? this.printElementType.isEnableInsertColumn
                : !0,
            isEnableDeleteColumn:
              this.printElementType.isEnableDeleteColumn != undefined
                ? this.printElementType.isEnableDeleteColumn
                : !0,
            isEnableMergeCell:
              this.printElementType.isEnableMergeCell != undefined
                ? this.printElementType.isEnableMergeCell
                : !0,
          })),
            _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.event.on(
              "updateTable" + this.hitable.id,
              function () {
                t.updateDesignViewFromOptions();
                _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.event.trigger(
                  "hiprintTemplateDataChanged_" + t.templateId,
                  "调整表头"
                );
              }
            );
        }),
        (TablePrintElement.prototype.setColumnsOptions = function () {
          var t = this;
          this.designTarget
            .find(".hiprint-printElement-tableTarget:eq(0)")
            .find("thead td")
            .bind("click.hiprint", function (e) {
              var n = $(e.target).attr("id") || $(e.target).attr("column-id"),
                i = t.getColumnByColumnId(n);

              if (i) {
                var o = t.getPrintElementOptionItemsByName("tableColumn");

                _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.event.trigger(
                  t.getPrintElementSelectEventKey(),
                  {
                    printElement: t,
                    customOptionsInput: [
                      {
                        title:
                          (i.title || `${i.id}(id)`) + `-${i18n.__("列属性")}`,
                        optionItems: o,
                        options: i,
                        callback: function callback(t) {
                          o.forEach(function (t) {
                            var e = t.getValue();
                            if (
                              "title" == t.name &&
                              e &&
                              !e.trim().endsWith("#") &&
                              !e.trim().startsWith("#")
                            ) {
                              var n = e ? e.split("#") : "";
                              (i.title = n[0]),
                                n.length > 1 && (i.columnId = i.field = n[1]);
                              i.columnId &&
                                i.target.attr("column-id", i.columnId);
                              t.target.find("textarea").val(n[0]);
                              return;
                            }
                            i[t.name] = e;
                          });
                        },
                      },
                    ],
                  }
                );
              } else
                _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_3__.a.event.trigger(
                  t.getPrintElementSelectEventKey(),
                  {
                    printElement: t,
                  }
                );
            });
        }),
        (TablePrintElement.prototype.filterOptionItems = function (t) {
          var e = _super.prototype.filterOptionItems.call(this, t);

          return this.printElementType.editable &&
            1 == this.options.columns.length
            ? e
            : t.filter(function (t) {
                return "columns" != t.name;
              });
        }),
        (TablePrintElement.prototype.getFooterFormatter = function () {
          var footerFormatter = void 0;
          if (
            (this.printElementType.footerFormatter &&
              (footerFormatter = this.printElementType.footerFormatter),
            this.options.footerFormatter)
          )
            try {
              var s = "footerFormatter=" + this.options.footerFormatter;
              eval(s);
            } catch (t) {
              console.log(t);
            }
          return footerFormatter;
        }),
        (TablePrintElement.prototype.getGridColumnsFooterFormatter =
          function () {
            var gridColumnsFooterFormatter = void 0;
            if (
              (this.printElementType.gridColumnsFooterFormatter &&
                (gridColumnsFooterFormatter =
                  this.printElementType.gridColumnsFooterFormatter),
              this.options.gridColumnsFooterFormatter)
            )
              try {
                var s =
                  "gridColumnsFooterFormatter=" +
                  this.options.gridColumnsFooterFormatter;
                eval(s);
              } catch (t) {
                console.log(t);
              }
            return gridColumnsFooterFormatter;
          }),
        TablePrintElement
      );
    })(_BasePrintElement__WEBPACK_IMPORTED_MODULE_0__.a);
}
