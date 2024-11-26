/**
该函数是一个复杂的模块，负责管理和操作表格。
提供了对表格的行和列的插入、删除、合并、拆分等功能。
支持表格单元格的对齐方式设置。
提供了表格的拖拽调整功能，包括行高和列宽的调整。
支持上下文菜单的功能，允许用户通过右键菜单进行表格操作。
该模块还处理了表格的初始化和事件绑定，确保表格在用户交互时能够正确响应
 */
import { i18n } from "../i18n/i18n";
export default function (t, e, n) {
  "use strict";

  var i = (function () {
      return function (t) {
        (this.table = t.table),
          (this.templateId = t.templateId),
          (this.fields = t.fields),
          (this.isEnableEdit = t.isEnableEdit),
          (this.trs = t.trs),
          (this.resizeRow = t.resizeRow),
          (this.resizeColumn = t.resizeColumn),
          (this.isEnableEditField = t.isEnableEditField),
          (this.isEnableContextMenu = t.isEnableContextMenu),
          (this.isEnableEditField = t.isEnableEditField),
          (this.isEnableInsertRow = t.isEnableInsertRow),
          (this.isEnableDeleteRow = t.isEnableDeleteRow),
          (this.isEnableInsertColumn = t.isEnableInsertColumn),
          (this.isEnableDeleteColumn = t.isEnableDeleteColumn),
          (this.isEnableMergeCell = t.isEnableMergeCell),
          (this.columnResizable = t.columnResizable),
          (this.columnAlignEditable = t.columnAlignEditable);
      };
    })(),
    o = (function () {
      function t(t) {
        this.options = new i(t);
      }

      return (
        (t.prototype.enableEidt = function () {
          this.options.isEnableEdit;
        }),
        (t.prototype.disableEdit = function () {
          this.options.isEnableEdit;
        }),
        (t.prototype.isEnableEdit = function () {
          return this.options.isEnableEdit;
        }),
        t
      );
    })(),
    r = n(0),
    a = (function () {
      return function (t) {
        (this.cell = t.cell),
          (this.link = t.link),
          (this.linkType = t.linkType),
          (this.bottom = t.bottom),
          (this.rightMost = t.rightMost),
          (this.rowLevel = t.rowLevel),
          (this.columnLevel = t.columnLevel),
          (this.indexInTableGridRow = t.indexInTableGridRow),
          (this.indexInTableGridColumn = t.indexInTableGridColumn);
      };
    })(),
    p = n(10),
    s = (function () {
      function t() {}

      return (
        (t.getLeftTableCell = function (t, e) {
          var n;
          return (
            t.forEach(function (t, i) {
              t.cell && i < e && (n = t.cell);
            }),
            n
          );
        }),
        (t.getIndex = function (t, e) {
          var n;
          return (
            t.forEach(function (t, i) {
              t.cell && t.cell.id == e && (n = i);
            }),
            n
          );
        }),
        t
      );
    })(),
    l = n(13),
    u = n(11),
    d = (function () {
      return function (t, e) {
        (this.target = t), (this.grips = e);
      };
    })(),
    c = (function () {
      return function (t) {
        this.target = t;
      };
    })(),
    h = (function () {
      return function () {
        this.rowColumns = [];
      };
    })(),
    f = (function () {
      function t() {}

      return (
        (t.getColumnsWidth = function (e, n) {
          var i = {},
            o = t.allAutoWidth(e);
          return (
            e.rowColumns.forEach(function (t) {
              var e = n - 0,
                r = (t.width / o) * (e > 0 ? e : 0);
              i[t.id] = r;
            }),
            i
          );
        }),
        (t.resizeTableCellWeight = function (t) {
          t.forEach(function (t) {
            t.columns.forEach(function (t) {
              t.hasWidth && $(t.getTarget()).css("width", t.width + "pt");
            });
          });
        }),
        (t.allAutoWidth = function (t) {
          var e = 0;
          return (
            t.rowColumns.forEach(function (t) {
              e += t.width;
            }),
            e
          );
        }),
        (t.reconsitutionTableColumnTree = function (t, e, n) {
          for (
            var i = e || new h(),
              o = function o(e) {
                (i.totalLayer = e + 1),
                  (i[e] = t[e].columns),
                  (i.rowColumns = i.rowColumns.concat(
                    i[e].filter(function (n) {
                      return n.rowspan == t.length - e;
                    })
                  ));
              },
              r = 0;
            r < t.length;
            r++
          ) {
            o(r);
          }

          return i;
        }),
        t
      );
    })(),
    g = n(2),
    m = (function () {
      function t(t) {
        (this.signature = "HiTresizer"),
          (this.hitable = t),
          (this.rows = t.rows),
          (this.target = t.target);
      }

      return (
        (t.prototype.init = function () {
          this.addResizeRowAndColumn(),
            this.hitable.optionsCoat.options.resizeColumn &&
              this.createColumnGrips(),
            this.hitable.optionsCoat.options.resizeRow && this.createRowGrips();
        }),
        (t.prototype.resizeTableCellWidth = function () {
          f.resizeTableCellWeight(this.rows);
        }),
        (t.prototype.addResizeRowAndColumn = function () {}),
        (t.prototype.createColumnGrips = function () {
          var t = this,
            e = this,
            n = [],
            i = $('<div class="columngrips"/>');
          i.width(this.target.width()),
            this.rows.forEach(function (o) {
              (o.columns || [])
                .filter(function (column) {
                  return column.checked;
                })
                .forEach(function (o, a) {
                  if (o.getTarget().attr("haswidth")) {
                    var p = $(
                      '<div class="columngrip"><div class="gripResizer"></div></div>'
                    );
                    i.append(p);
                    var s = new c(p);
                    n.length > 0 && (n[n.length - 1].nextGrip = s),
                      n.push(s),
                      t.syncGrips(o, s),
                      $(p).hidraggable({
                        axis: "h",
                        onDrag: function onDrag(t, e, n) {},
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
                        onBeforeDrag: function onBeforeDrag(t) {
                          if (((g.a.instance.draging = !0), !s.nextGrip))
                            return !1;
                          (e.dragingGrip = s),
                            (e.dragingGrip.left = parseFloat(
                              e.dragingGrip.target.css("left").replace("px", "")
                            )),
                            s.target.addClass("columngripDraging");
                        },
                        onStopDrag: function onStopDrag(n) {
                          g.a.instance.draging = !1;
                          var i = parseFloat(
                              e.dragingGrip.target.css("left").replace("px", "")
                            ),
                            o = r.a.px.toPt(i - e.dragingGrip.left);
                          // 表格列宽限制 最小宽度为10pt
                          if (s.cell.width + o < 10) {
                            o = 10 - s.cell.width;
                          } else if (s.nextGrip.cell.width - o < 10) {
                            o = s.nextGrip.cell.width - 10;
                          }
                          (s.cell.width = s.cell.width + o),
                            (s.nextGrip.cell.width = s.nextGrip.cell.width - o),
                            t.resizeTableCellWidth(),
                            s.target.removeClass("columngripDraging"),
                            e.updateColumnGrips();
                        },
                      });
                  }
                });
            }),
            this.target.before(i),
            (this.cgripContariner = new d(i, n));
        }),
        (t.prototype.updateColumnGrips = function () {
          this.cgripContariner &&
            (this.cgripContariner.target.remove(), this.createColumnGrips());
        }),
        (t.prototype.updateRowGrips = function () {
          this.rgripContariner &&
            (this.rgripContariner.target.remove(), this.createRowGrips());
        }),
        (t.prototype.createRowGrips = function () {
          var t = this,
            e = this,
            n = [],
            i = $('<div class="rowgrips"/>');
          this.rows.forEach(function (o, a) {
            var p = $(
              '<div class="rowgrip"><div class="gripResizer"></div></div>'
            );
            i.append(p);
            var s = new c(p);
            n.push(s),
              a > 0 &&
                a < t.rows.length &&
                $(p).hidraggable({
                  axis: "v",
                  onDrag: function onDrag(t, e, n) {},
                  moveUnit: "pt",
                  minMove: 1,
                  onBeforeDrag: function onBeforeDrag(t) {
                    (e.dragingGrip = s),
                      (e.dragingGrip.top = parseFloat(
                        e.dragingGrip.target.css("top").replace("px", "")
                      )),
                      s.target.addClass("rowgripDraging");
                  },
                  onStopDrag: function onStopDrag(t) {
                    var n = parseFloat(
                        e.dragingGrip.target.css("top").replace("px", "")
                      ),
                      i = r.a.px.toPt(
                        n -
                          e.dragingGrip.top +
                          e.rows[a].columns[0].getTarget().height()
                      );
                    e.rows[a].columns[0].getTarget().css("height", i + "pt"),
                      e.syncRowGrips(),
                      s.target.removeClass("rowgripDraging");
                  },
                });
          }),
            this.target.before(i),
            (this.rgripContariner = new d(i, n)),
            this.syncRowGrips();
        }),
        (t.prototype.syncGrips = function (t, e) {
          var n = t.getTarget();
          var scale =
            ($(".hiprint-printPaper")[0].style.transform &&
              parseFloat(
                $(".hiprint-printPaper")[0].style.transform.slice(6, -1)
              )) ||
            1;
          (e.cell = t),
            e.target.css({
              left:
                n.offset().left / scale -
                this.target.offset().left / scale +
                n.outerWidth(!1),
              height: 30,
            });
        }),
        (t.prototype.syncRowGrips = function () {
          var t = this;
          this.rgripContariner.target.height(this.target.height()),
            this.rows.forEach(function (e, n) {
              var i = e.columns[0].getTarget();
              t.rgripContariner.grips[n].target.css({
                top: i.offset().top - t.target.offset().top + i.outerHeight(!1),
                width: 30,
              });
            });
        }),
        (t.prototype.addResizerHeadRow = function () {
          this.target.find("thead").prepend();
        }),
        t
      );
    })(),
    v = (function () {
      function t() {}

      return (
        (t.prototype.init = function () {}),
        (t.prototype.updateRowGrips = function () {}),
        (t.prototype.updateColumnGrips = function () {}),
        t
      );
    })();

  n.d(e, "a", function () {
    return y;
  });

  var y = (function () {
    function t(t) {
      (this.id = u.a.createId()),
        (this.optionsCoat = new o(t)),
        (this.handle = t.handle),
        (this.target = t.table),
        this.initRows(t.rows),
        this.init(t),
        (this.tableCellSelector = new p.a(this.rows, this.target)),
        (this.resizer = this.optionsCoat.options.columnResizable
          ? new m(this)
          : new v()),
        this.resizer.init();
    }

    return (
      (t.prototype.insertRow = function (t, e, n) {
        var i = e || this.tableCellSelector.getSingleSelect(),
          o = i.cell,
          a = this.rows[i.rowIndex],
          p = i.rowIndex,
          s = this.getCellGrid(),
          u = new l.a();
        if (
          (u.init(this.optionsCoat, void 0, a.isHead),
          n && u.getTarget().addClass(n),
          "above" == t)
        )
          s[p].forEach(function (t) {
            var e = t.link ? t.link : t.cell,
              n = e.width / e.colspan;

            if (0 == t.columnLevel) {
              var i = u.createTableCell();
              (i.width = n), u.insertCellToLast(i);
            } else {
              if ("column" == t.linkType) {
                var o = t.link.getTarget();
                (t.link.rowspan += 1), o.attr("rowspan", t.link.rowspan);
              }

              t.linkType;
            }
          }),
            this.rows.splice(p, 0, u),
            a.getTarget().before(u.getTarget()),
            r.a.event.trigger("newRow" + this.id, u);
        else {
          var d = p + o.rowspan - 1;
          s[d].forEach(function (t) {
            var e = t.link ? t.link : t.cell,
              n = e.width / e.colspan;

            if (t.bottom) {
              var i = u.createTableCell();
              (i.width = n), u.insertCellToLast(i);
            } else {
              if (t.cell) {
                var o = t.cell.getTarget();
                (t.cell.rowspan += 1), o.attr("rowspan", t.cell.rowspan);
              }

              if ("column" == t.linkType) {
                o = t.link.getTarget();
                (t.link.rowspan += 1), o.attr("rowspan", t.link.rowspan);
              }
            }
          }),
            this.rows.splice(d + 1, 0, u),
            this.rows[d].getTarget().after(u.getTarget()),
            r.a.event.trigger("newRow" + this.id, u);
        }
      }),
      (t.prototype.insertColumn = function (t, e, n, i) {
        var o = this,
          a = this.rows.concat(this.trRows),
          p = e || this.tableCellSelector.getSingleSelect(),
          s = p.cell,
          l = p.rowIndex,
          u = this.getCellGrid(a),
          d = u[l].filter(function (t) {
            return (
              (t.cell && t.cell.id == s.id) || (t.link && t.link.id == s.id)
            );
          });

        if ("left" == t) {
          var c = d[0].indexInTableGridRow;
          u.forEach(function (t, e) {
            var p = t[c],
              s = t.filter(function (t, e) {
                return e >= c && t.cell;
              });

            if (0 == p.rowLevel) {
              var l = a[e],
                u = a[e].createTableCell();
              n && u.getTarget().addClass(n),
                null != i && (u.width = i),
                s.length
                  ? l.insertToTargetCellLeft(s[0].cell, u)
                  : l.insertCellToLast(u),
                r.a.event.trigger("newCell" + o.id, u);
            } else if ("row" == p.linkType) {
              var d = p.link.getTarget();
              (p.link.colspan += 1), d.attr("colspan", p.link.colspan);
            }
          });
        } else {
          var h = d[d.length - 1].indexInTableGridRow;
          u.forEach(function (t, e) {
            var p = t[h],
              s = t.filter(function (t, e) {
                return e <= h && t.cell;
              });

            if (p.rightMost) {
              var l = a[e],
                u = l.createTableCell();
              n && u.getTarget().addClass(n),
                null != i && (u.width = i),
                s.length
                  ? l.insertToTargetCellRight(s[s.length - 1].cell, u)
                  : l.insertCellToFirst(u),
                r.a.event.trigger("newCell" + o.id, u);
            } else {
              var d = p.link || p.cell;

              if ("row" == p.linkType) {
                var c = d.getTarget();
                (d.colspan += 1), c.attr("colspan", d.colspan);
              }

              if (p.cell) {
                c = d.getTarget();
                (d.colspan += 1), c.attr("colspan", d.colspan);
              }
            }
          });
        }
      }),
      (t.prototype.deleteRow = function () {
        var t = this,
          e = this.tableCellSelector.getSingleSelect(),
          n = (e.cell, this.rows[e.rowIndex], e.rowIndex),
          i = this.getCellGrid(),
          o = this.rows[n];
        i[n].forEach(function (e, r) {
          if (e.cell) {
            if (1 == e.cell.rowspan) o.removeCell(e.cell);
            else {
              o.removeCell(e.cell);
              var a = i[n + 1].filter(function (t, e) {
                  return t.cell && e > r;
                }),
                p = t.rows[n + 1],
                s = p.createTableCell(e.cell.rowspan - 1, e.cell.colspan);
              a.length
                ? p.insertToTargetCellLeft(a[0].cell, s)
                : p.insertCellToLast(s);
            }
          } else if ("column" == e.linkType) {
            var l = e.link;
            (l.rowspan -= 1), l.getTarget().attr("rowspan", l.rowspan);
          }
        }),
          o.getTarget().remove(),
          this.rows.splice(n, 1);
      }),
      (t.prototype.deleteColums = function () {
        var t = this.rows.concat(this.trRows),
          e = this.tableCellSelector.getSingleSelect(),
          n = e.cell,
          i = e.rowIndex,
          o = this.getCellGrid(t),
          r = o[i].filter(function (t) {
            return (
              (t.cell && t.cell.id == n.id) || (t.link && t.link.id == n.id)
            );
          })[0].indexInTableGridRow;
        o.forEach(function (e, n) {
          var i = e[r];
          i.cell
            ? 1 == i.cell.colspan
              ? t[n].removeCell(i.cell)
              : ((i.cell.colspan -= 1),
                i.cell.getTarget().attr("colspan", i.cell.colspan))
            : "row" == i.linkType &&
              ((i.link.colspan -= 1),
              i.link.getTarget().attr("colspan", i.link.colspan));
        });
      }),
      (t.prototype.mergeCell = function () {
        var t = this,
          e = this.tableCellSelector.getSelectedCells();

        if (0 != e.length) {
          var n = e[0][0].cell;
          e.forEach(function (i, o) {
            i.forEach(function (i, r) {
              0 == o
                ? 0 != r &&
                  ((n.colspan += i.cell.colspan),
                  t.rows[i.rowIndex].removeCell(i.cell))
                : t.rows[i.rowIndex].removeCell(i.cell),
                0 == r &&
                  e[0][0].rowIndex + n.rowspan - 1 < i.rowIndex &&
                  (n.rowspan += i.cell.rowspan);
            });
          }),
            n.getTarget().attr("colspan", n.colspan),
            n.getTarget().attr("rowspan", n.rowspan),
            this.tableCellSelector.setSingleSelect(e[0][0]);
        }
      }),
      (t.prototype.splitCell = function () {
        var t = this.tableCellSelector.getSingleSelect(),
          e = this.getCellGrid(),
          n = s.getIndex(e[t.rowIndex], t.cell.id);

        if (t) {
          for (var i = t.rowIndex; i < t.rowIndex + t.cell.rowspan; i++) {
            for (
              var o = this.rows[i],
                r = i == t.rowIndex ? t.cell : s.getLeftTableCell(e[i], n),
                a = 0;
              a < t.cell.colspan;
              a++
            ) {
              (i == t.rowIndex && 0 == a) ||
                (r
                  ? o.insertToTargetCellRight(r, o.createTableCell())
                  : o.insertCellToFirst(o.createTableCell()));
            }
          }

          (t.cell.rowspan = 1),
            (t.cell.colspan = 1),
            t.cell.getTarget().attr("colspan", t.cell.colspan),
            t.cell.getTarget().attr("rowspan", t.cell.rowspan);
        }
      }),
      (t.prototype.init = function (t) {
        var e = this;
        $(this.target).addClass("hitable"),
          (this.optionsCoat.onBeforEdit = function (n) {
            if (e.optionsCoat.options.onBeforEdit && !1 === t.onBeforEdit(n))
              return !1;
            return (
              e.optionsCoat.editingCell && e.optionsCoat.editingCell.endEdit(),
              !0
            );
          }),
          $(this.target).mousedown(function (t) {
            e.optionsCoat.isLeftMouseButtonDown = !0;
          }),
          $(this.target).mouseup(function (t) {
            e.optionsCoat.isLeftMouseButtonDown = !1;
          }),
          this.initContext(),
          this.target
            .on("mousemove", function (t) {
              1 === t.buttons &&
                e.tableCellSelector.multipleSelectByXY(t.pageX, t.pageY);
            })
            .on("mousedown", function (t) {
              1 === t.buttons &&
                e.tableCellSelector.singleSelectByXY(t.pageX, t.pageY);
            });
      }),
      (t.prototype.initRows = function (t) {
        var e = this;

        if (((this.trRows = []), t)) {
          (this.rows = t),
            t.forEach(function (t, n) {
              t.init(e.optionsCoat, e.target.find("tr:eq(" + n + ")"), !0);
            });
          var n = this.optionsCoat.options.trs;
          n &&
            this.initRowsByTrs(n).forEach(function (t) {
              e.trRows.push(t);
            });
        } else this.rows = this.initRowsByTrs(this.target.find("tr"));
      }),
      (t.prototype.initRowsByTrs = function (t) {
        var e = this;
        return t
          .map(function (t, n) {
            var i = new l.a();
            return i.init(e.optionsCoat, $(n)), i;
          })
          .get();
      }),
      (t.prototype.enableEidt = function () {
        this.optionsCoat.enableEidt();
      }),
      (t.prototype.disableEdit = function () {
        this.optionsCoat.disableEdit();
      }),
      (t.prototype.getCellGrid = function (t) {
        var e = t || this.rows,
          n = this.getColumnStep(),
          i = new Array();
        return (
          e.forEach(function (t, e) {
            t.columns.forEach(function (t, o) {
              for (var r = 0; r < t.colspan; r++) {
                for (var p = 0, s = !1; p < n && !s; ) {
                  if (((i[e] = i[e] || []), i[e][p]));
                  else {
                    i[e][p] = new a({
                      cell: 0 == r ? t : void 0,
                      link: 0 != r ? t : void 0,
                      linkType: r > 0 ? "row" : void 0,
                      rightMost: r == t.colspan - 1 || void 0,
                      bottom: 0 == t.rowspan - 1,
                      rowLevel: r,
                      columnLevel: 0,
                      indexInTableGridRow: p,
                      indexInTableGridColumn: e,
                    });

                    for (var l = e + 1, u = 1; u < t.rowspan; u++) {
                      (i[l] = i[l] || []),
                        (i[l][p] = new a({
                          cell: void 0,
                          link: t,
                          linkType: r > 0 ? "rowColumn" : "column",
                          rightMost: r == t.colspan - 1 || void 0,
                          bottom: u == t.rowspan - 1,
                          rowLevel: r,
                          columnLevel: u,
                          indexInTableGridRow: p,
                          indexInTableGridColumn: l,
                        })),
                        (l += 1);
                    }

                    s = !0;
                  }
                  p++;
                }
              }
            });
          }),
          i
        );
      }),
      (t.prototype.setAlign = function (t) {
        var e = this.tableCellSelector.getSingleSelect();
        e && e.cell.setAlign(t);
      }),
      (t.prototype.setVAlign = function (t) {
        var e = this.tableCellSelector.getSingleSelect();
        e && e.cell.setVAlign(t);
      }),
      (t.prototype.getColumnStep = function (t) {
        var e = 0;
        return (
          this.rows.length &&
            this.rows[t || 0].columns.forEach(function (t) {
              e += t.colspan;
            }),
          e
        );
      }),
      (t.prototype.initContext = function () {
        var t = this;
        if (!this.optionsCoat.options.isEnableContextMenu) return !1;
        $(this.handle).hicontextMenu({
          menus: [
            {
              text: `${i18n.__("在上方插入行")}`,
              enabled: this.optionsCoat.options.isEnableInsertRow,
              disable: function disable() {
                return !t.tableCellSelector.getSingleSelect();
              },
              callback: function callback() {
                t.insertRow("above"),
                  t.resizer.updateRowGrips(),
                  r.a.event.trigger("updateTable" + t.id);
              },
            },
            {
              text: `${i18n.__("在下方插入行")}`,
              borderBottom: !0,
              enabled: this.optionsCoat.options.isEnableInsertRow,
              disable: function disable() {
                return !t.tableCellSelector.getSingleSelect();
              },
              callback: function callback() {
                t.insertRow("below"),
                  t.resizer.updateRowGrips(),
                  r.a.event.trigger("updateTable" + t.id);
              },
            },
            {
              text: `${i18n.__("向左方插入列")}`,
              enabled: this.optionsCoat.options.isEnableInsertColumn,
              disable: function disable() {
                return !t.tableCellSelector.getSingleSelect();
              },
              callback: function callback() {
                t.insertColumn("left"),
                  t.resizer.updateColumnGrips(),
                  r.a.event.trigger("updateTable" + t.id);
              },
            },
            {
              text: `${i18n.__("向右方插入列")}`,
              enabled: this.optionsCoat.options.isEnableInsertColumn,
              disable: function disable() {
                return !t.tableCellSelector.getSingleSelect();
              },
              borderBottom: !0,
              callback: function callback() {
                t.insertColumn("right"),
                  t.resizer.updateColumnGrips(),
                  r.a.event.trigger("updateTable" + t.id);
              },
            },
            {
              text: `${i18n.__("删除行")}`,
              enabled: this.optionsCoat.options.isEnableDeleteRow,
              disable: function disable() {
                return (
                  !t.tableCellSelector.getSingleSelect() || t.rows.length <= 1
                );
              },
              callback: function callback() {
                t.deleteRow(),
                  t.resizer.updateRowGrips(),
                  r.a.event.trigger("updateTable" + t.id);
              },
            },
            {
              text: `${i18n.__("删除列")}`,
              borderBottom: !0,
              enabled: this.optionsCoat.options.isEnableDeleteColumn,
              disable: function disable() {
                return (
                  !t.tableCellSelector.getSingleSelect() ||
                  (t.rows.length > 0 && t.rows[0].columns.length <= 1)
                );
              },
              callback: function callback() {
                t.deleteColums(),
                  t.resizer.updateColumnGrips(),
                  r.a.event.trigger("updateTable" + t.id);
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
                    t.setAlign("left");
                  },
                },
                {
                  text: `${i18n.__("左右居中")}`,
                  callback: function callback() {
                    t.setAlign("center");
                  },
                },
                {
                  text: `${i18n.__("右")}`,
                  callback: function callback() {
                    t.setAlign("right");
                  },
                },
                {
                  text: `${i18n.__("默认")}`,
                  borderBottom: !0,
                  callback: function callback() {
                    t.setAlign("");
                  },
                },
                {
                  text: `${i18n.__("上")}`,
                  callback: function callback() {
                    t.setVAlign("top");
                  },
                },
                {
                  text: `${i18n.__("垂直居中")}`,
                  callback: function callback() {
                    t.setVAlign("middle");
                  },
                },
                {
                  text: `${i18n.__("下")}`,
                  callback: function callback() {
                    t.setVAlign("bottom");
                  },
                },
                {
                  text: `${i18n.__("默认")}`,
                  callback: function callback() {
                    t.setVAlign("");
                  },
                },
              ],
            },
            {
              text: `${i18n.__("合并单元格")}`,
              enabled: this.optionsCoat.options.isEnableMergeCell,
              disable: function disable() {
                return t.tableCellSelector.getSingleSelect();
              },
              callback: function callback() {
                t.mergeCell(), r.a.event.trigger("updateTable" + t.id);
              },
            },
            {
              text: `${i18n.__("解开单元格")}`,
              enabled: this.optionsCoat.options.isEnableMergeCell,
              disable: function disable() {
                var e = t.tableCellSelector.getSingleSelect();
                return !e || (1 == e.cell.rowspan && 1 == e.cell.colspan);
              },
              callback: function callback() {
                t.splitCell(), r.a.event.trigger("updateTable" + t.id);
              },
            },
          ].filter(function (t) {
            return t.enabled;
          }),
        });
      }),
      (t.prototype.getTableWidth = function () {
        return r.a.px.toPt(this.target.outerWidth(!1));
      }),
      (t.prototype.updateColumnGrips = function () {
        this.resizer.updateColumnGrips();
      }),
      (t.prototype.updateRowGrips = function () {
        this.resizer.updateRowGrips();
      }),
      t
    );
  })();
}
