import { i18n, languages } from "../i18n/i18n.js";
// 条形码
import JsBarcode from "jsbarcode";
// 二维码
import "../plugins/qrcode.js";
import bwipjs from "bwip-js";
// 水印
import watermark from "../plugins/watermark.js";
//引入标尺
import lImg from "../css/image/l_img.svg";
import vImg from "../css/image/v_img.svg";
// pdf
import { jsPDF } from "jspdf";
import html2canvas from "@wtto00/html2canvas";
// 解析svg 到 canvas, 二维码条形码需要
import Canvg from "canvg";
import { _typeof } from "./Utils.js";
export default function (t, e, n) {
  "use strict";

  n.r(e);
  n(22), n(23), n(24), n(25);
  var i,
    o = n(0);
  n(26);
  window.hiLocalStorage =
    ((i = window.localStorage || null),
    {
      saveLocalData: function saveLocalData(t, e) {
        return !(!i || !e || (i.setItem(t, e), 0));
      },
      getLocalData: function getLocalData(t) {
        return i ? i.getItem(t) : null;
      },
      removeItem: function removeItem(t) {
        i && i.removeItem(t);
      },
    });
  n(27), n(32);

  var _r,
    a = (function () {
      function t() {
        this.allElementTypes = [];
      }

      return (
        Object.defineProperty(t, "instance", {
          get: function get() {
            return t._instance || (t._instance = new t()), t._instance;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (t.prototype.addPrintElementTypes = function (t, e) {
          var n = this;
          this[t] ? (this[t] = this[t].concat(e)) : (this[t] = e),
            e.forEach(function (t) {
              n.allElementTypes = n.allElementTypes.concat(t.printElementTypes);
            });
        }),
        (t.prototype.removePrintElementTypes = function (t) {
          var n = this;
          delete n[t],
            (n.allElementTypes = n.allElementTypes.filter(function (e) {
              return !e.tid.startsWith(t);
            }));
        }),
        (t.prototype.getElementTypeGroups = function (t) {
          return this[this.formatterModule(t)] || [];
        }),
        (t.prototype.getElementType = function (t) {
          var e = this.allElementTypes.filter(function (e) {
            return e.tid == t;
          });
          if (e.length > 0) return e[0];
        }),
        (t.prototype.updateElementType = function (t, c) {
          var type = this.getElementType(t);
          if (c) {
            var newType = c(type);
            var idx = this.allElementTypes.findIndex(function (e) {
              return e.tid == t;
            });
            if (idx >= 0) {
              this.allElementTypes.splice(idx, 1, newType);
              return newType;
            }
          }
          return type;
        }),
        (t.prototype.formatterModule = function (t) {
          return t || "_default";
        }),
        t
      );
    })(),
    p = n(1),
    s = n(2),
    l = (function () {
      function t() {}

      return (
        (t.prototype.createPrintElementTypeHtml = function (t, e) {
          var n = $('<ul class="hiprint-printElement-type"></ul>');
          return (
            e.forEach(function (t) {
              var e = $("<li></li>");
              e.append('<span class="title">' + t.name + "</span>");
              var i = $("<ul></ul>");
              e.append(i),
                t.printElementTypes.forEach(function (t) {
                  i.append(
                    '<li><a class="ep-draggable-item" tid="' +
                      t.tid +
                      '">  ' +
                      t.getText() +
                      " </a></li>"
                  );
                }),
                n.append(e);
            }),
            $(t).append(n),
            n.find(".ep-draggable-item")
          );
        }),
        t
      );
    })(),
    u = n(5),
    d = n(15),
    c = (function () {
      return function (t) {
        (this.title = t.title), (this.type = t.type);
      };
    })(),
    ctable = (function () {
      return function (t) {
        (this.title = t.title),
          (this.type = t.type),
          (this.editable = t.editable),
          (this.columnDisplayEditable = t.columnDisplayEditable),
          (this.columnDisplayIndexEditable = t.columnDisplayIndexEditable),
          (this.columnTitleEditable = t.columnTitleEditable),
          (this.columnResizable = t.columnResizable),
          (this.columnAlignEditable = t.columnAlignEditable),
          (this.isEnableEditField = t.isEnableEditField),
          (this.isEnableContextMenu = t.isEnableContextMenu),
          (this.isEnableInsertRow = t.isEnableInsertRow),
          (this.isEnableDeleteRow = t.isEnableDeleteRow),
          (this.isEnableInsertColumn = t.isEnableInsertColumn),
          (this.isEnableDeleteColumn = t.isEnableDeleteColumn),
          (this.isEnableMergeCell = t.isEnableMergeCell);
      };
    })(),
    h = (function () {
      function t(t) {
        var e = this;
        (this.text = t.text),
          (this.field = t.field),
          (this.fields = t.fields),
          (this.title = t.title),
          (this.tid = t.tid),
          (this.data = t.data),
          (this.styler = t.styler),
          (this.formatter = t.formatter),
          (this.type = t.type),
          (this.options = t.options),
          (this.editable = t.editable != void 0 ? t.editable : !0),
          (this.columnDisplayEditable =
            t.columnDisplayEditable != void 0 ? t.columnDisplayEditable : !0),
          (this.columnDisplayIndexEditable =
            t.columnDisplayIndexEditable != void 0
              ? t.columnDisplayIndexEditable
              : !0),
          (this.columnTitleEditable =
            t.columnTitleEditable != void 0 ? t.columnTitleEditable : !0),
          (this.columnResizable =
            t.columnResizable != void 0 ? t.columnResizable : !0),
          (this.columnAlignEditable =
            t.columnAlignEditable != void 0 ? t.columnAlignEditable : !0),
          (this.columns = []),
          (t.columns || []).forEach(function (t, n) {
            e.columns.push(e.createTableColumnArray(t));
          }),
          (this.rowStyler = t.rowStyler),
          (this.striped = t.striped),
          (this.groupFields = t.groupFields || []),
          (this.groupFormatter = t.groupFormatter),
          (this.groupFooterFormatter = t.groupFooterFormatter),
          (this.footerFormatter = t.footerFormatter),
          (this.rowsColumnsMerge = t.rowsColumnsMerge),
          (this.rowsColumnsMergeClean = t.rowsColumnsMergeClean),
          (this.groupSequenceContinue = t.groupSequenceContinue),
          (this.gridColumnsFooterFormatter = t.gridColumnsFooterFormatter),
          (this.isEnableEditField =
            t.isEnableEditField != void 0 ? t.isEnableEditField : !0),
          (this.isEnableContextMenu =
            t.isEnableContextMenu != void 0 ? t.isEnableContextMenu : !0),
          (this.isEnableInsertRow =
            t.isEnableInsertRow != void 0 ? t.isEnableInsertRow : !0),
          (this.isEnableDeleteRow =
            t.isEnableDeleteRow != void 0 ? t.isEnableDeleteRow : !0),
          (this.isEnableInsertColumn =
            t.isEnableInsertColumn != void 0 ? t.isEnableInsertColumn : !0),
          (this.isEnableDeleteColumn =
            t.isEnableDeleteColumn != void 0 ? t.isEnableDeleteColumn : !0),
          (this.isEnableMergeCell =
            t.isEnableMergeCell != void 0 ? t.isEnableMergeCell : !0),
          (this.columnObj = this.makeColumnObj());
      }

      return (
        (t.prototype.getText = function () {
          return this.text || this.title || "";
        }),
        (t.prototype.createPrintElement = function (t) {
          var e = this;
          return (
            this.columns &&
              0 == this.columns.length &&
              (t.columns || []).forEach(function (t, n) {
                e.columns.push(e.createTableColumnArray(t));
              }),
            new d.a(this, t)
          );
        }),
        (t.prototype.getData = function () {
          return [{}];
        }),
        (t.prototype.createTableColumnArray = function (t) {
          var e = [];
          return (
            t.forEach(function (t, n) {
              e.push(new u.a(t));
            }),
            e
          );
        }),
        (t.prototype.getPrintElementTypeEntity = function () {
          if ("table" == this.type) {
            return new ctable({
              title: this.title,
              type: this.type,
              editable: this.editable,
              columnDisplayEditable: this.columnDisplayEditable,
              columnDisplayIndexEditable: this.columnDisplayIndexEditable,
              columnResizable: this.columnResizable,
              columnAlignEditable: this.columnAlignEditable,
              columnTitleEditable: this.columnTitleEditable,
              isEnableEditField: this.isEnableEditField,
              isEnableContextMenu: this.isEnableContextMenu,
              isEnableInsertRow: this.isEnableInsertRow,
              isEnableDeleteRow: this.isEnableDeleteRow,
              isEnableInsertColumn: this.isEnableInsertColumn,
              isEnableDeleteColumn: this.isEnableDeleteColumn,
              isEnableMergeCell: this.isEnableMergeCell,
            });
          }
          return new c({
            title: this.title,
            type: this.type,
          });
        }),
        (t.prototype.getFields = function () {
          return this.fields;
        }),
        (t.prototype.getOptions = function () {
          return this.options || {};
        }),
        (t.prototype.getColumnByColumnId = function (t) {
          return this.columnObj[t];
        }),
        (t.prototype.makeColumnObj = function (columns) {
          var t = {};
          return (
            columns
              ? columns.forEach(function (e) {
                  (e.id || e.columnId) && (t[e.id || e.columnId] = e);
                })
              : this.columns &&
                this.columns.forEach(function (e) {
                  e.forEach(function (e) {
                    (e.id || e.columnId) && (t[e.id || e.columnId] = e);
                  });
                }),
            (this.columnObj = t),
            t
          );
        }),
        t
      );
    })(),
    f = n(4),
    g = n(3),
    m =
      ((_r = function r(t, e) {
        return (_r =
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

        _r(t, e),
          (t.prototype =
            null === e
              ? Object.create(e)
              : ((n.prototype = e.prototype), new n()));
      }),
    v = (function (t) {
      function e(e, n) {
        var i = t.call(this, e) || this;
        return (
          (i.options = new g.a(n)),
          i.options.setDefault(
            new g.a(p.a.instance.image.default).getPrintElementOptionEntity()
          ),
          i
        );
      }

      return (
        m(e, t),
        (e.prototype.getReizeableShowPoints = function () {
          return ["s", "e", "se", "r"];
        }),
        (e.prototype.getData = function (t) {
          var e = "",
            f = this.getField();
          t
            ? (e = f
                ? f.split(".").reduce((a, c) => (a ? a[c] : t[c]), !1) || ""
                : this.options.src || this.printElementType.getData())
            : (e = this.options.src || this.printElementType.getData());
          var n = this.getFormatter();
          return (
            n && (e = n(e, this.options, this._currenttemplateData)), e || ""
          );
        }),
        (e.prototype.createTarget = function (t, e) {
          var n = $(
            '<div  class="hiprint-printElement hiprint-printElement-image" style="position: absolute;"><div class="hiprint-printElement-image-content" style="height:100%;width:100%"></div></div>'
          );
          return this.updateTargetImage(n, t, e), n;
        }),
        (e.prototype.initSizeByHtml = function (e) {
          t.prototype.initSizeByHtml.call(this, e), this.css(e, this.getData());
        }),
        (e.prototype.getConfigOptions = function () {
          return p.a.instance.image;
        }),
        (e.prototype.updateDesignViewFromOptions = function () {
          this.designTarget &&
            (this.css(this.designTarget, this.getData()),
            this.updateTargetImage(
              this.designTarget,
              this.getTitle(),
              this.getData()
            ));
        }),
        (e.prototype.updateTargetImage = function (t, e, n) {
          var i = t.find(".hiprint-printElement-image-content");
          i.find("img").length
            ? i.find("img").attr("src", n)
            : i.html('<img style="width:100%;height:100%;" src="' + n + '">');
          if (n.length)
            i.find("img").css(
              "cssText",
              `width:100%;height:100%;content:url("${n}")!important`
            );
          else i.find("img").css("cssText", "width:100%;height:100%;");
          if (this.options.fit)
            i.find("img").css("object-fit", this.options.fit);
          if (this.options.borderRadius)
            i.find("img").css("border-radius", this.options.borderRadius);
        }),
        (e.prototype.getHtml = function (t, e, n) {
          return this.getHtml2(t, e, n);
        }),
        e
      );
    })(f.a),
    y = (function () {
      var _t4 = function t(e, n) {
        return (_t4 =
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
          })(e, n);
      };

      return function (e, n) {
        function i() {
          this.constructor = e;
        }

        _t4(e, n),
          (e.prototype =
            null === n
              ? Object.create(n)
              : ((i.prototype = n.prototype), new i()));
      };
    })(),
    b = (function (t) {
      function e(e) {
        var n = this;
        return (
          (e = e || {}),
          ((n = t.call(this, e) || this).leftSpaceRemoved = e.leftSpaceRemoved),
          n
        );
      }

      return (
        y(e, t),
        (e.prototype.getHideTitle = function () {
          return null == this.hideTitle
            ? this.defaultOptions.hideTitle
            : this.hideTitle;
        }),
        e
      );
    })(g.a),
    E = n(8),
    T = (function () {
      function t(
        t,
        idx,
        watermarkOptions,
        pr,
        scl,
        e,
        n,
        i,
        r,
        a,
        p,
        s,
        s1,
        l,
        u,
        d
      ) {
        (this.panelPageRule = pr),
          (this.scale = scl),
          (this.watermarkOptions = watermarkOptions),
          (this.defaultPaperNumberFormat = "${paperNo}-${paperCount}"),
          (this.printLine = 0),
          (this.templateId = t),
          (this.panelIdx = idx),
          (this.width = o.a.mm.toPt(e)),
          (this.height = o.a.mm.toPt(n)),
          (this.mmwidth = e),
          (this.mmheight = n),
          (this.paperHeader = i >= 0 ? i : 0),
          (this.paperFooter = r),
          (this.contentHeight = r - i),
          this.createTarget(),
          (this.index = u),
          (this.paperNumberLeft = a || parseInt((this.width - 30).toString())),
          (this.paperNumberTop = p || parseInt((this.height - 22).toString())),
          (this.paperNumberDisabled = s),
          (this.paperNumberContinue = s1),
          (this.paperNumberFormat = l),
          (this.referenceElement = d
            ? $.extend({}, d)
            : new E.a({
                top: 0,
                left: 0,
                height: 0,
                width: 0,
                bottomInLastPaper: 0,
                beginPrintPaperIndex: 0,
                printTopInPaper: 0,
                endPrintPaperIndex: 0,
              }));
      }

      return (
        (t.prototype.subscribePaperBaseInfoChanged = function (t) {
          this.onPaperBaseInfoChanged = t;
        }),
        (t.prototype.triggerOnPaperBaseInfoChanged = function (t) {
          this.onPaperBaseInfoChanged &&
            this.onPaperBaseInfoChanged({
              panelPageRule: this.panelPageRule,
              scale: this.scale,
              paperHeader: this.paperHeader,
              paperFooter: this.paperFooter,
              paperNumberLeft: this.paperNumberLeft,
              paperNumberTop: this.paperNumberTop,
              paperNumberDisabled: this.paperNumberDisabled,
              paperNumberContinue: this.paperNumberContinue,
              paperNumberFormat: this.paperNumberFormat,
            });
          o.a.event.trigger(
            "hiprintTemplateDataChanged_" + this.templateId,
            t || "模板调整"
          );
        }),
        (t.prototype.setFooter = function (t, e, n, i) {
          (this.firstPaperFooter = t),
            (this.evenPaperFooter = e),
            (this.oddPaperFooter = n),
            (this.lastPaperFooter = i);
        }),
        (t.prototype.setOffset = function (t, e) {
          this.setLeftOffset(t), this.setTopOffset(e);
        }),
        (t.prototype.setLeftOffset = function (t) {
          t
            ? this.paperContentTarget.css("left", t + "pt")
            : (this.paperContentTarget[0].style.left = "");
        }),
        (t.prototype.setTopOffset = function (t) {
          t
            ? this.paperContentTarget.css("top", t + "pt")
            : (this.paperContentTarget[0].style.top = "");
        }),
        (t.prototype.createTarget = function () {
          (this.target = $(
            '<div class="hiprint-printPaper"><div class="hiprint-printPaper-content"></div></div>'
          )),
            (this.paperContentTarget = this.target.find(
              ".hiprint-printPaper-content"
            )),
            this.target.css("width", this.mmwidth + "mm"),
            this.target.css(
              "height",
              this.mmheight - p.a.instance.paperHeightTrim + "mm"
            ),
            this.target.attr("original-height", this.mmheight),
            this.zoom(this.scale);
        }),
        (t.prototype.createHeaderLine = function () {
          var t = this;
          (this.headerLinetarget = $(
            '<div class="hiprint-headerLine"  style="position: absolute;width: 100%;border-top: 1px dashed #c9bebe;height: 7pt;"></div>'
          )),
            this.headerLinetarget.css("top", (this.paperHeader || -1) + "pt"),
            0 == this.paperHeader &&
              this.headerLinetarget.addClass("hideheaderLinetarget"),
            this.paperContentTarget.append(this.headerLinetarget),
            this.dragHeadLineOrFootLine(this.headerLinetarget, function (e, n) {
              if (n >= t.paperFooter) {
                n = t.paperFooter - 10;
              }
              (t.paperHeader = n >= 0 ? n : 0),
                t.triggerOnPaperBaseInfoChanged();
            });
        }),
        (t.prototype.createFooterLine = function () {
          var t = this;
          (this.footerLinetarget = $(
            '<div class="hiprint-footerLine"  style="position: absolute;width: 100%;border-top: 1px dashed #c9bebe;height: 7pt;"></div>'
          )),
            this.footerLinetarget.css(
              "top",
              parseInt(this.paperFooter.toString()) + "pt"
            ),
            this.paperFooter == this.height &&
              (this.footerLinetarget.css(
                "top",
                this.mmheight - p.a.instance.paperHeightTrim + "mm"
              ),
              this.footerLinetarget.addClass("hidefooterLinetarget")),
            this.paperContentTarget.append(this.footerLinetarget),
            this.dragHeadLineOrFootLine(this.footerLinetarget, function (e, n) {
              if (n <= t.paperHeader) {
                n = t.paperHeader + 10;
              }
              (t.paperFooter = n), t.triggerOnPaperBaseInfoChanged();
            });
        }),
        (t.prototype.createPaperNumber = function (t, d) {
          var e = this,
            n = this.target.find(".hiprint-paperNumber");
          if (n.length) return n.html(t), n;
          var i = $(
            '<span class="hiprint-paperNumber"  style="position: absolute">' +
              t +
              "</span>"
          );
          return (
            i.css("top", this.paperNumberTop + "pt"),
            i.css("left", this.paperNumberLeft + "pt"),
            this.paperContentTarget.append(i),
            d &&
              this.dragHeadLineOrFootLine(
                i,
                function (t, n) {
                  (e.paperNumberTop = n),
                    (e.paperNumberLeft = t),
                    e.triggerOnPaperBaseInfoChanged();
                },
                !0
              ),
            i
          );
        }),
        (t.prototype.getTarget = function () {
          return this.target;
        }),
        (t.prototype.append = function (t) {
          this.paperContentTarget.append(t);
        }),
        (t.prototype.updateReferenceElement = function (t) {
          t && (this.referenceElement = t);
        }),
        (t.prototype.updatePrintLine = function (t) {
          t >= this.printLine && (this.printLine = t);
        }),
        (t.prototype.design = function (t) {
          var e = this;
          this.createHeaderLine(),
            this.createFooterLine(),
            this.target.addClass("design"),
            t && t.grid && this.target.addClass("grid"),
            (this.paperNumberTarget = this.createPaperNumber(
              this.formatPaperNumber(1, 1),
              true
            )),
            this.createRuler(),
            this.createWaterMark(true, this.panelIdx, this.watermarkOptions),
            this.resetPaperNumber(this.paperNumberTarget),
            $(this.paperNumberTarget).bind("dblclick.hiprint", function () {
              null == e.paperNumberDisabled && (e.paperNumberDisabled = !1),
                (e.paperNumberDisabled = !e.paperNumberDisabled),
                e.resetPaperNumber(e.paperNumberTarget),
                e.triggerOnPaperBaseInfoChanged("初始");
            }),
            $(this.paperNumberTarget).bind("click.hiprint", function () {
              o.a.event.trigger(
                "BuildCustomOptionSettingEventKey_" + e.templateId,
                {
                  options: {
                    paperNumberFormat: e.paperNumberFormat,
                    paperNumberDisabled: e.paperNumberDisabled,
                    paperNumberContinue: e.paperNumberContinue,
                  },
                  callback: function callback(t) {
                    (e.paperNumberDisabled = !!t.paperNumberDisabled || void 0),
                      (e.paperNumberContinue = t.paperNumberContinue),
                      (e.paperNumberFormat = t.paperNumberFormat
                        ? t.paperNumberFormat
                        : void 0),
                      e.createPaperNumber(e.formatPaperNumber(1, 1), true),
                      e.resetPaperNumber(e.paperNumberTarget),
                      e.triggerOnPaperBaseInfoChanged();
                  },
                }
              );
            });
        }),
        (t.prototype.resetPaperNumber = function (t) {
          this.paperNumberDisabled
            ? t.addClass("hiprint-paperNumber-disabled")
            : t.removeClass("hiprint-paperNumber-disabled");
        }),
        (t.prototype.updatePaperNumber = function (t, e, n) {
          var i = this.createPaperNumber(this.formatPaperNumber(t, e));
          this.paperNumberDisabled
            ? i.hide()
            : n &&
              this.index % 2 == 1 &&
              ((i[0].style.left = ""),
              i.css("right", this.paperNumberLeft + "pt"));
        }),
        (t.prototype.formatPaperNumber = function (t, e) {
          this.createWaterMark(false, t, this.watermarkOptions);
          return eval(
            "`" +
              (this.paperNumberFormat
                ? this.paperNumberFormat
                : this.defaultPaperNumberFormat
              )
                .replace("paperNo", t)
                .replace("paperCount", e) +
              "`"
          );
        }),
        (t.prototype.dragHeadLineOrFootLine = function (t, e, n) {
          var i = this;
          t.hidraggable({
            axis: n ? void 0 : "v",
            onDrag: function onDrag(t, n, i) {
              e(n, i);
            },
            moveUnit: "pt",
            minMove: p.a.instance.movingDistance,
            onBeforeDrag: function onBeforeDrag(t) {
              s.a.instance.draging = !0;
            },
            getScale: function getScale() {
              return i.scale || 1;
            },
            onStopDrag: function onStopDrag(t) {
              i.headerLinetarget.css("top", i.paperHeader + "pt");
              i.footerLinetarget.css("top", i.paperFooter + "pt");
              (s.a.instance.draging = !1),
                i.footerLinetarget.removeClass("hidefooterLinetarget"),
                i.headerLinetarget.removeClass("hideheaderLinetarget");
            },
          });
        }),
        (t.prototype.resize = function (t, e) {
          // 获取页脚高度比例
          var parperFooterRatio = this.paperFooter / this.height;
          (this.width = o.a.mm.toPt(t)),
            (this.height = o.a.mm.toPt(e)),
            (this.mmwidth = t),
            (this.mmheight = e),
            this.target.css("width", t + "mm"),
            this.target.css("height", e - p.a.instance.paperHeightTrim + "mm"),
            this.target.attr("original-height", this.mmheight);
          // 按比例计算页脚高度
          var paperFooter = this.height * parperFooterRatio;
          (this.paperFooter = paperFooter || this.height),
            this.footerLinetarget.css("top", paperFooter + "pt"),
            (this.contentHeight = this.paperFooter - this.paperHeader),
            // 设置纸张后, 页码位置重置问题
            (this.paperNumberLeft =
              this.paperNumberLeft > this.width
                ? parseInt((this.width - 30).toString())
                : this.paperNumberLeft);
          this.paperNumberTop =
            this.paperNumberTop > this.height
              ? (this.paperNumberTop = parseInt((this.height - 22).toString()))
              : this.paperNumberTop;
          this.paperNumberTarget.css("top", this.paperNumberTop + "pt"),
            this.paperNumberTarget.css("left", this.paperNumberLeft + "pt"),
            this.triggerOnPaperBaseInfoChanged("调整大小");
        }),
        (t.prototype.zoom = function (s) {
          if (s) {
            (this.scale = s), this.target.css("transform", "scale(" + s + ")");
            if (s > 1) {
              this.target.css("transform-origin", "-" + s + "% -" + s + "%");
            } else {
              this.target.css("transform-origin", "0 0");
            }
            this.triggerOnPaperBaseInfoChanged("缩放");
          }
        }),
        (t.prototype.getPaperFooter = function (t) {
          var e = this.index + t;
          return 0 == e
            ? this.firstPaperFooter
              ? this.firstPaperFooter
              : this.oddPaperFooter
              ? this.oddPaperFooter
              : this.paperFooter
            : e % 2 == 0
            ? this.oddPaperFooter
              ? this.oddPaperFooter
              : this.paperFooter
            : e % 2 == 1
            ? this.evenPaperFooter
              ? this.evenPaperFooter
              : this.paperFooter
            : void 0;
        }),
        (t.prototype.getContentHeight = function (t) {
          return this.getPaperFooter(t) - this.paperHeader;
        }),
        (t.prototype.createRuler = function () {
          this.target.append(
            '<div class="hiprint_rul_wrapper">\n                     <img class="h_img" src="' +
              lImg +
              '" />\n                     <img class="v_img" src="' +
              vImg +
              '" />\n                    </div>'
          );
        }),
        (t.prototype.createWaterMark = function (watch, idx, opts) {
          var e = this;
          var options = Object.assign({}, opts || {}, {
            id: `${e.templateId}_${e.panelIdx}_${idx || 1}_${
              watch ? "design" : e.index
            }`,
            watch: watch,
            container: e.target[0],
          });
          if (!options.container) return;
          if (options.content) {
            if (watch) {
              watermark.destroyWatermark(
                Object.assign({}, options, {
                  id: `${e.templateId}_${e.panelIdx}_${idx || 1}_${e.index}`,
                })
              );
            }
            watermark.createWatermark(options);
          } else {
            watermark.destroyWatermark(options);
          }
        }),
        (t.prototype.displayHeight = function () {
          return this.mmheight - p.a.instance.paperHeightTrim + "mm";
        }),
        (t.prototype.displayWidth = function () {
          return this.mmwidth + "mm";
        }),
        (t.prototype.getPanelTarget = function () {
          return this.target.parent(".hiprint-printPanel ");
        }),
        t
      );
    })(),
    P = n(6),
    _ = (function () {
      var _t5 = function t(e, n) {
        return (_t5 =
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
          })(e, n);
      };

      return function (e, n) {
        function i() {
          this.constructor = e;
        }

        _t5(e, n),
          (e.prototype =
            null === n
              ? Object.create(n)
              : ((i.prototype = n.prototype), new i()));
      };
    })(),
    w = (function (t) {
      function e(e, n) {
        var i = t.call(this, e) || this;
        return (
          (i.options = new b(n)),
          i.options.setDefault(
            new b(p.a.instance.longText.default).getPrintElementOptionEntity()
          ),
          i
        );
      }

      return (
        _(e, t),
        (e.prototype.getDesignTarget = function (e) {
          var n = t.prototype.getDesignTarget.call(this, e);
          return (
            n
              .find(".hiprint-printElement-longText-content")
              .css("border", "1px dashed #cebcbc"),
            n
          );
        }),
        (e.prototype.getProxyTarget = function (t) {
          t && this.SetProxyTargetOption(t);
          var e = this.getData(),
            n = this.createTarget(this.printElementType.getText(!0), e);
          return this.updateTargetSize(n), this.css(n, e), n;
        }),
        (e.prototype.updateDesignViewFromOptions = function () {
          if (this.designTarget) {
            var t = this.getData(),
              e = this.getHtml(this.designPaper)[0].target;
            this.designTarget
              .find(".hiprint-printElement-longText-content")
              .html(e.find(".hiprint-printElement-longText-content").html()),
              this.css(this.designTarget, t);
          }
        }),
        (e.prototype.getConfigOptions = function () {
          return p.a.instance.longText;
        }),
        (e.prototype.getTitle = function () {
          return this.options.title || this.printElementType.title;
        }),
        (e.prototype.getData = function (t) {
          var f = this.getField();
          var e = f
            ? f.split(".").reduce((a, c) => (a ? a[c] : t ? t[c] : ""), !1) ||
              ""
            : "";
          return t
            ? e || ""
            : this.options.testData || this.printElementType.getData() || "";
        }),
        (e.prototype.updateTargetText = function (t, e, n) {
          var i = t.find(".hiprint-printElement-longText-content"),
            o = this.getText(e, n);
          i.html(o);
        }),
        (e.prototype.createTarget = function (t, e) {
          var n = $(
            '<div  class="hiprint-printElement hiprint-printElement-longText" style="position: absolute;"><div class="hiprint-printElement-longText-content hiprint-printElement-content" style="height:100%;width:100%"></div></div>'
          );
          return this.updateTargetText(n, t, e), n;
        }),
        (e.prototype.getText = function (t, e) {
          var n = this.getFormatter();
          e &&
            (e =
              0 != this.options.leftSpaceRemoved
                ? e.toString().replace(/^\s*/, "")
                : e);
          return (
            (this.getField()
              ? (this.options.getHideTitle() ? "" : t ? t + "：" : "") +
                (n ? n(t, e, this.options, this._currenttemplateData) : e)
              : n
              ? n(t, t, this.options, this._currenttemplateData)
              : t || "") || ""
          );
        }),
        (e.prototype.getHtml = function (t, e) {
          this.setCurrenttemplateData(e), this.createTempContainer();
          var n = this.getPaperHtmlResult(t, e);
          return this.removeTempContainer(), n;
        }),
        (e.prototype.getHeightByData = function (t) {
          this.createTempContainer();
          var e = this.getPaperHtmlResult(
            new T(
              "",
              "",
              void 0,
              1e3,
              1e3,
              0,
              25e3,
              0,
              0,
              !0,
              !0,
              void 0,
              0,
              void 0
            ),
            {},
            t
          );
          return (
            this.removeTempContainer(),
            e[0].referenceElement.bottomInLastPaper -
              e[0].referenceElement.printTopInPaper
          );
        }),
        (e.prototype.getLongTextIndent = function () {
          return this.options.longTextIndent
            ? '<span class="long-text-indent" style="margin-left:' +
                this.options.longTextIndent +
                'pt"></span>'
            : '<span class="long-text-indent"></span>';
        }),
        (e.prototype.getPaperHtmlResult = function (t, e, n) {
          var i = this,
            o = [],
            r = 0,
            a = n || this.getData(e),
            p = this.getText(this.getTitle(), a),
            s = this.createTarget(this.getTitle(), this.options.testData || "");
          this.css(s, a),
            e ? this.updateTargetWidth(s) : this.updateTargetSize(s),
            this.getTempContainer().html(""),
            this.getTempContainer().append(s);
          var l = [this.getLongTextIndent()],
            u = p.split(new RegExp("\r|\n", "g"));
          if (
            (u.forEach(function (t, e) {
              var n =
                0 != i.options.leftSpaceRemoved
                  ? (t || "").toString().replace(/^\s*/, "")
                  : t;
              (l = l.concat(n.split(""))),
                e < u.length - 1 && l.push("<br/>" + i.getLongTextIndent());
            }),
            0 == l.length && (l = [""]),
            this.isHeaderOrFooter() || this.isFixed() || !e)
          )
            return (
              (f = this.getStringBySpecificHeight(l, 25e3, s)).target.css(
                "left",
                this.options.displayLeft()
              ),
              f.target.css("top", this.options.displayTop()),
              (f.target[0].height = ""),
              o.push(
                new P.a({
                  target: f.target,
                  printLine: this.options.displayTop() + f.height,
                  referenceElement: new E.a({
                    top: this.options.getTop(),
                    left: this.options.getLeft(),
                    height: this.options.getHeight(),
                    width: this.options.getWidth(),
                    beginPrintPaperIndex: t.index,
                    bottomInLastPaper: this.options.getTop() + f.height,
                    printTopInPaper: this.options.getTop(),
                  }),
                })
              ),
              o
            );

          for (
            var d = this.getBeginPrintTopInPaperByReferenceElement(t);
            l.length > 0;

          ) {
            var c = 0,
              h = t.getPaperFooter(r);
            0 == r &&
              d > h &&
              "none" != t.panelPageRule &&
              ((d = d - h + t.paperHeader),
              o.push(
                new P.a({
                  target: void 0,
                  printLine: void 0,
                })
              ),
              r++,
              (c = t.getContentHeight(r) - (d - t.paperHeader)),
              (h = t.getPaperFooter(r)));
            var f = this.getStringBySpecificHeight(
              l,
              c > 0 ? c : 0 == r ? h - d : t.getContentHeight(r),
              s
            );
            l.splice(0, f.length);
            var g = void 0,
              m = void 0;
            f.target.css("left", this.options.displayLeft()),
              (f.target[0].height = ""),
              0 == r || c > 0
                ? ((m = d),
                  f.target.css("top", m + "pt"),
                  (g =
                    l.length > 0
                      ? d + f.height
                      : null != this.options.lHeight
                      ? d +
                        (f.height > this.options.lHeight
                          ? f.height
                          : this.options.lHeight)
                      : d + f.height))
                : ((m = t.paperHeader),
                  f.target.css("top", m + "pt"),
                  (g = m + f.height)),
              o.push(
                new P.a({
                  target: f.target,
                  printLine: g,
                  referenceElement: new E.a({
                    top: this.options.getTop(),
                    left: this.options.getLeft(),
                    height: this.options.getHeight(),
                    width: this.options.getWidth(),
                    beginPrintPaperIndex: t.index,
                    bottomInLastPaper: g,
                    printTopInPaper: m,
                  }),
                })
              ),
              r++;
            e && this.updatePanelHeight(g + this.options.getHeight(), t);
          }

          return o;
        }),
        (e.prototype.getStringBySpecificHeight = function (t, e, n) {
          var i = o.a.pt.toPx(e);
          var r = void 0;
          var noPaging = "none" == this.panel.panelPageRule;
          if (noPaging) {
            r = this.IsPaginationIndex(t, t.length, -1, n);
          } else {
            r = this.IsPaginationIndex(t, t.length - 1, i, n);
          }
          return r.IsPagination
            ? r
            : this.BinarySearch(t, 0, t.length - 1, i, n);
        }),
        (e.prototype.BinarySearch = function (t, e, n, i, o) {
          var r = Math.floor((e + n) / 2);
          if (e > n)
            return (
              o.find(".hiprint-printElement-longText-content").html(""),
              {
                IsPagination: !0,
                height: 0,
                length: 0,
                target: o.clone(),
              }
            );
          var a = this.IsPaginationIndex(t, r, i, o);
          return a.IsPagination
            ? a
            : "l" == a.move
            ? this.BinarySearch(t, e, r - 1, i, o)
            : this.BinarySearch(t, r + 1, n, i, o);
        }),
        (e.prototype.IsPaginationIndex = function (t, e, n, i) {
          if (-1 == n) {
            i.find(".hiprint-printElement-longText-content").html(
              t.slice(0, e).join("")
            );
            var a = i.height();
            return {
              IsPagination: !0,
              height: o.a.px.toPt(a),
              length: t.length,
              target: i.clone(),
            };
          }
          i.find(".hiprint-printElement-longText-content").html(
            t.slice(0, e + 2).join("")
          );
          var r = i.height();
          i.find(".hiprint-printElement-longText-content").html(
            t.slice(0, e + 1).join("")
          );
          var a = i.height();
          return e >= t.length - 1 && a < n
            ? {
                IsPagination: !0,
                height: o.a.px.toPt(a),
                length: t.length,
                target: i.clone(),
              }
            : a <= n && r >= n
            ? {
                IsPagination: !0,
                height: a,
                length: e + 1,
                target: i.clone(),
              }
            : a >= n
            ? {
                IsPagination: !1,
                move: "l",
              }
            : r <= n
            ? {
                IsPagination: !1,
                move: "r",
              }
            : {
                IsPagination: !0,
                result: 1,
              };
        }),
        e
      );
    })(f.a),
    x = (function () {
      function t() {}

      return (
        (t.replaceEnterAndNewline = function (t, e) {
          return t.replace(new RegExp("\r|\n|/g", "g"), e);
        }),
        (t.replaceTab = function (t, e) {
          return t.replace(new RegExp("\t/g", "g"), e);
        }),
        (t.replaceEnterAndNewlineAndTab = function (t, e) {
          return t.replace(new RegExp("\r|\n|\t|/g", "g"), e);
        }),
        t
      );
    })(),
    C = (function () {
      var _t6 = function t(e, n) {
        return (_t6 =
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
          })(e, n);
      };

      return function (e, n) {
        function i() {
          this.constructor = e;
        }

        _t6(e, n),
          (e.prototype =
            null === n
              ? Object.create(n)
              : ((i.prototype = n.prototype), new i()));
      };
    })(),
    O = (function (t) {
      function e(e) {
        var n = t.call(this, e) || this;
        return (
          n.title && (n.title = x.replaceEnterAndNewlineAndTab(n.title, "")), n
        );
      }

      return (
        C(e, t),
        (e.prototype.getHideTitle = function () {
          return null == this.hideTitle
            ? this.defaultOptions.hideTitle
            : this.hideTitle;
        }),
        (e.prototype.getTextType = function () {
          return (
            (null == this.textType
              ? this.defaultOptions.textType
              : this.textType) || "text"
          );
        }),
        (e.prototype.getFontSize = function () {
          return (
            (null == this.fontSize
              ? this.defaultOptions.fontSize
              : this.fontSize) || 9
          );
        }),
        (e.prototype.getbarcodeMode = function () {
          return (
            (null == this.barcodeMode
              ? this.defaultOptions.barcodeMode
              : this.barcodeMode) || "CODE128"
          );
        }),
        (e.prototype.getBarTextMode = function () {
          return (
            (null == this.barTextMode
              ? this.defaultOptions.barTextMode
              : this.barTextMode) || "text"
          );
        }),
        (e.prototype.getBarWidth = function () {
          return (
            (null == this.barWidth
              ? this.defaultOptions.barWidth
              : this.barWidth) || 1
          );
        }),
        (e.prototype.getBarAutoWidth = function () {
          // 该属性 "true" 为 true，其余一概为 false
          return (
            (null == this.barAutoWidth
              ? this.defaultOptions.barAutoWidth === "true"
              : this.barAutoWidth === "true") ?? true
          );
        }),
        (e.prototype.getQRcodeLevel = function () {
          return (
            (null == this.qrCodeLevel
              ? this.defaultOptions.qrCodeLevel
              : this.qrCodeLevel) || 0
          );
        }),
        e
      );
    })(g.a),
    H = (function () {
      var _t7 = function t(e, n) {
        return (_t7 =
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
          })(e, n);
      };

      return function (e, n) {
        function i() {
          this.constructor = e;
        }

        _t7(e, n),
          (e.prototype =
            null === n
              ? Object.create(n)
              : ((i.prototype = n.prototype), new i()));
      };
    })(),
    D = (function (t) {
      function e(e, n) {
        var i = t.call(this, e) || this;
        return (
          (i.options = new O(n)),
          i.options.setDefault(
            new O(p.a.instance.text.default).getPrintElementOptionEntity()
          ),
          i
        );
      }

      return (
        H(e, t),
        (e.prototype.getDesignTarget = function (e) {
          return t.prototype.getDesignTarget.call(this, e);
        }),
        (e.prototype.getProxyTarget = function (t) {
          t && this.SetProxyTargetOption(t);
          var e = this.getData(),
            n = this.createTarget(this.printElementType.getText(!0), e);
          return this.updateTargetSize(n), this.css(n, e), n;
        }),
        (e.prototype.updateDesignViewFromOptions = function () {
          // ! pub-beta 0.0.57-beta22 这里的处理似乎重复了，影响了 updateTargetText 方法执行，故在此处注释掉
          // var els = this.panel.printElements.filter(function (t) {
          //   return ('block' == t.designTarget.children().last().css('display')
          //     && t.designTarget.children().last().hasClass('selected')) && !t.printElementType.type.includes('table');
          // });
          // els.forEach(ele => {
          //   var t = ele.getData()
          //   ele.css(ele.designTarget, t)
          //   this.updateTargetText(ele.designTarget, ele.getTitle(), t)
          // })
          if (this.designTarget) {
            var t = this.getData();
            this.css(this.designTarget, t),
              this.updateTargetText(this.designTarget, this.getTitle(), t);
          }
        }),
        (e.prototype.getConfigOptions = function () {
          return p.a.instance.text;
        }),
        (e.prototype.getTitle = function () {
          var t = this.options.title || this.printElementType.title || "";
          return t && (t = x.replaceEnterAndNewlineAndTab(t, "")), t;
        }),
        (e.prototype.getData = function (t) {
          var e = void 0;
          var f = this.getField();
          if (
            ((e = t
              ? f
                ? f
                    .split(".")
                    .reduce((a, c) => (a ? a[c] : t ? t[c] : ""), !1) || ""
                : ""
              : this.options.testData || this.printElementType.getData() || ""),
            this.options.format)
          ) {
            if ("datetime" == this.options.dataType)
              return o.a.dateFormat(e, this.options.format);

            if ("boolean" == this.options.dataType) {
              var n = this.options.format.split(":");
              if (n.length > 0) return !0 === e || "true" === e ? n[0] : n[1];
            }
          }
          return e;
        }),
        (e.prototype.updateTargetText = function (t, e, n, i, rowIndex) {
          var r = this.getFormatter(),
            a = t.find(".hiprint-printElement-text-content"),
            p = "";
          p = this.getField()
            ? (this.options.getHideTitle() ? "" : e ? e + "：" : "") +
              hinnn.toUpperCase(
                this.options.upperCase,
                r ? r(e, n, this.options, this._currenttemplateData, t) : n
              )
            : (n = hinnn.toUpperCase(
                this.options.upperCase,
                r ? r(e, e, this.options, this._currenttemplateData, t) : e
              ));
          var s = this.options.getTextType();
          if ("text" == s) a.html(p);
          else {
            if ("barcode" == s) {
              a.css({
                display: "flex",
                "flex-direction": "column",
              });
              // 分离显示条形码文本
              var divMode = this.options.getBarTextMode() == "text";
              // pub-beta 0.0.57-beta22 移除插件通过 div 添加的文本元素，默认使用 JsBarcode 生成条形码文本
              a.html(
                '<svg width="100%" display="block" height="100%" class="hibarcode_imgcode" preserveAspectRatio="none slice"></svg>'
              );
              if (divMode) {
                a.append(
                  `<div class="hibarcode_displayValue" style="white-space:nowrap">`
                );
              }
              try {
                n
                  ? (JsBarcode(a.find(".hibarcode_imgcode")[0], n, {
                      format: this.options.getbarcodeMode(),
                      width: this.options.getBarWidth(),
                      textMargin: -1,
                      lineColor: this.options.color || "#000000",
                      margin: 0,
                      height: parseInt(
                        o.a.pt.toPx(this.options.getHeight() || 10).toString()
                      ),
                      displayValue: divMode ? false : !this.options.hideTitle,
                    }),
                    a.find(".hibarcode_imgcode").attr("height", "100%"),
                    a.find(".hibarcode_imgcode").attr("width", "100%"),
                    divMode &&
                      (this.options.hideTitle ||
                        a.find(".hibarcode_displayValue").html(n)))
                  : a.html("");
                // pub-beta 0.0.57-beta22 解决条形码自动宽度问题
                let svgWidth = a.find(".hibarcode_imgcode rect")[0].attributes
                  .width.value;
                svgWidth = Math.ceil(hinnn.px.toPt(svgWidth * 1.05));
                if (
                  this.options.getBarAutoWidth() &&
                  svgWidth > this.options.width
                ) {
                  a.parent().css("width", svgWidth + "pt");
                  this.options.width = svgWidth;
                }
              } catch (t) {
                console.log(t), a.html(`${i18n.__("此格式不支持该文本")}`);
              }
            }

            if ("qrcode" == s) {
              a.html("");

              try {
                if (n) {
                  a.css({
                    display: "flex",
                    "flex-direction": "column",
                  });
                  var width = this.options.width;
                  var height =
                    this.options.height -
                    (!this.options.hideTitle
                      ? this.options.lineHeight ??
                        (this.options.fontSize ?? 10.5) * 1.5
                      : 0);
                  var box = $('<div class="hiqrcode_imgcode"></div>').css({
                    width: Math.min(width, height) + "pt",
                    height: Math.min(width, height) + "pt",
                    margin: "auto",
                  });
                  new QRCode(box[0], {
                    width: "100%",
                    height: "100%",
                    colorDark: this.options.color || "#000000",
                    useSVG: !0,
                    correctLevel: this.options.getQRcodeLevel(),
                  }).makeCode(n);
                  a.html(box),
                    !this.options.hideTitle &&
                      a.append(
                        `<div class="hiqrcode_displayValue" style="white-space:nowrap">${n}</div>`
                      );
                }
              } catch (t) {
                console.log(t), a.html(`${i18n.__("二维码生成失败")}`);
              }
            }
          }
        }),
        (e.prototype.onResize = function (e, n, i, o, r) {
          t.prototype.onResize.call(this, e, n, i, o, r);
          ("barcode" != this.options.getTextType() &&
            "qrcode" != this.options.getTextType()) ||
            this.updateTargetText(
              this.designTarget,
              this.getTitle(),
              this.getData()
            );
        }),
        (e.prototype.createTarget = function (t, e, n) {
          var i = $(
            '<div tabindex="1" class="hiprint-printElement hiprint-printElement-text" style="position: absolute;"><div class="hiprint-printElement-text-content hiprint-printElement-content" style="height:100%;width:100%"></div></div>'
          );
          return this.updateTargetText(i, t, e, n), i;
        }),
        (e.prototype.getHtml = function (t, e, n) {
          return this.getHtml2(t, e, n);
        }),
        e
      );
    })(f.a),
    I = (function () {
      var _t8 = function t(e, n) {
        return (_t8 =
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
          })(e, n);
      };

      return function (e, n) {
        function i() {
          this.constructor = e;
        }

        _t8(e, n),
          (e.prototype =
            null === n
              ? Object.create(n)
              : ((i.prototype = n.prototype), new i()));
      };
    })(),
    R = (function (t) {
      function e(e) {
        return t.call(this, e) || this;
      }

      return I(e, t), e;
    })(g.a),
    M = (function () {
      var _t9 = function t(e, n) {
        return (_t9 =
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
          })(e, n);
      };

      return function (e, n) {
        function i() {
          this.constructor = e;
        }

        _t9(e, n),
          (e.prototype =
            null === n
              ? Object.create(n)
              : ((i.prototype = n.prototype), new i()));
      };
    })(),
    S = (function (t) {
      function e(e, n) {
        var i = t.call(this, e) || this;
        return (
          (i.options = new R(n)),
          i.options.setDefault(
            new R(p.a.instance.html.default).getPrintElementOptionEntity()
          ),
          i
        );
      }

      return (
        M(e, t),
        (e.prototype.updateDesignViewFromOptions = function () {
          if (this.designTarget) {
            var t = this.getData();
            this.css(this.designTarget, t), this.updateTargetHtml();
          }
        }),
        (e.prototype.updateTargetHtml = function () {
          var t = this.getFormatter();

          if (t) {
            var e = t(this.getData(), this.options, this._currenttemplateData);
            this.designTarget
              .find(".hiprint-printElement-html-content")
              .html(e);
          }
        }),
        (e.prototype.getConfigOptions = function () {
          return p.a.instance.html;
        }),
        (e.prototype.createTarget = function (t, e) {
          var n = $(
              '<div  class="hiprint-printElement hiprint-printElement-html" style="position: absolute;"><div class="hiprint-printElement-html-content" style="height:100%;width:100%"></div></div>'
            ),
            i = this.getFormatter();

          if (i) {
            var o = i(this.getData(), this.options, this._currenttemplateData);
            n.find(".hiprint-printElement-html-content").append(o);
          } else
            this.options.content &&
              n
                .find(".hiprint-printElement-html-content")
                .append(this.options.content);

          return n;
        }),
        (e.prototype.getHtml = function (t, e, n) {
          return this.getHtml2(t, e, n);
        }),
        e
      );
    })(f.a),
    B = (function () {
      var _t10 = function t(e, n) {
        return (_t10 =
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
          })(e, n);
      };

      return function (e, n) {
        function i() {
          this.constructor = e;
        }

        _t10(e, n),
          (e.prototype =
            null === n
              ? Object.create(n)
              : ((i.prototype = n.prototype), new i()));
      };
    })(),
    F = (function (t) {
      function e(e, n) {
        var i = t.call(this, e) || this;
        return (
          (i.options = new g.a(n)),
          i.options.setDefault(
            new g.a(p.a.instance.vline.default).getPrintElementOptionEntity()
          ),
          i
        );
      }

      return (
        B(e, t),
        (e.prototype.updateDesignViewFromOptions = function () {
          if (this.designTarget) {
            var t = this.getData();
            this.css(this.designTarget, t);
          }
        }),
        (e.prototype.getConfigOptions = function () {
          return p.a.instance.vline;
        }),
        (e.prototype.createTarget = function (t, e) {
          return $(
            '<div class="hiprint-printElement hiprint-printElement-vline" style="border-left:1px solid;position: absolute;"></div>'
          );
        }),
        (e.prototype.getReizeableShowPoints = function () {
          return ["s", "r"];
        }),
        (e.prototype.getHtml = function (t, e, n) {
          return this.getHtml2(t, e, n);
        }),
        e
      );
    })(f.a),
    L = (function () {
      var _t11 = function t(e, n) {
        return (_t11 =
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
          })(e, n);
      };

      return function (e, n) {
        function i() {
          this.constructor = e;
        }

        _t11(e, n),
          (e.prototype =
            null === n
              ? Object.create(n)
              : ((i.prototype = n.prototype), new i()));
      };
    })(),
    A = (function (t) {
      function e(e, n) {
        var i = t.call(this, e) || this;
        return (
          (i.options = new g.a(n)),
          i.options.setDefault(
            new g.a(p.a.instance.hline.default).getPrintElementOptionEntity()
          ),
          i
        );
      }

      return (
        L(e, t),
        (e.prototype.updateDesignViewFromOptions = function () {
          if (this.designTarget) {
            var t = this.getData();
            this.css(this.designTarget, t);
          }
        }),
        (e.prototype.getConfigOptions = function () {
          return p.a.instance.hline;
        }),
        (e.prototype.createTarget = function (t, e) {
          return $(
            '<div class="hiprint-printElement hiprint-printElement-hline" style="border-top:1px solid;position: absolute;"></div>'
          );
        }),
        (e.prototype.getReizeableShowPoints = function () {
          return ["e", "r"];
        }),
        e
      );
    })(f.a),
    z = (function () {
      var _t12 = function t(e, n) {
        return (_t12 =
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
          })(e, n);
      };

      return function (e, n) {
        function i() {
          this.constructor = e;
        }

        _t12(e, n),
          (e.prototype =
            null === n
              ? Object.create(n)
              : ((i.prototype = n.prototype), new i()));
      };
    })(),
    k = (function (t) {
      function e(e, n) {
        var i = t.call(this, e) || this;
        return (
          (i.options = new g.a(n)),
          i.options.setDefault(
            new g.a(p.a.instance.rect.default).getPrintElementOptionEntity()
          ),
          i
        );
      }

      return (
        z(e, t),
        (e.prototype.updateDesignViewFromOptions = function () {
          if (this.designTarget) {
            var t = this.getData();
            this.css(this.designTarget, t);
          }
        }),
        (e.prototype.getConfigOptions = function () {
          return p.a.instance.rect;
        }),
        (e.prototype.createTarget = function (t, e) {
          return $(
            '<div class="hiprint-printElement hiprint-printElement-rect" style="border:1px solid;position: absolute;"></div>'
          );
        }),
        (e.prototype.getHtml = function (t, e, n) {
          return this.getHtml2(t, e, n);
        }),
        e
      );
    })(f.a),
    N = (function () {
      var _t13 = function t(e, n) {
        return (_t13 =
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
          })(e, n);
      };

      return function (e, n) {
        function i() {
          this.constructor = e;
        }

        _t13(e, n),
          (e.prototype =
            null === n
              ? Object.create(n)
              : ((i.prototype = n.prototype), new i()));
      };
    })(),
    V = (function (t) {
      function e(e, n) {
        var i = t.call(this, e) || this;
        return (
          (i.options = new g.a(n)),
          i.options.setDefault(
            new g.a(p.a.instance.oval.default).getPrintElementOptionEntity()
          ),
          i
        );
      }

      return (
        N(e, t),
        (e.prototype.updateDesignViewFromOptions = function () {
          if (this.designTarget) {
            var t = this.getData();
            this.css(this.designTarget, t);
          }
        }),
        (e.prototype.getConfigOptions = function () {
          return p.a.instance.oval;
        }),
        (e.prototype.createTarget = function (t, e) {
          return $(
            '<div class="hiprint-printElement hiprint-printElement-oval" style="border:1px solid;position: absolute;border-radius: 50%;"></div>'
          );
        }),
        (e.prototype.getHtml = function (t, e, n) {
          return this.getHtml2(t, e, n);
        }),
        e
      );
    })(f.a),
    barcode = (function (t) {
      function e(e, n) {
        var i = t.call(this, e) || this;
        return (
          (i.options = new g.a(n)),
          i.options.setDefault(
            new g.a(p.a.instance.barcode.default).getPrintElementOptionEntity()
          ),
          i
        );
      }
      return (
        N(e, t),
        (e.prototype.updateDesignViewFromOptions = function () {
          if (this.designTarget) {
            var t = this.getData();
            this.css(this.designTarget, t),
              this.initBarcode(
                this.designTarget,
                this.getTitle(),
                this.getData()
              );
          }
        }),
        (e.prototype.getConfigOptions = function () {
          return p.a.instance.barcode;
        }),
        (e.prototype.getBarAutoWidth = function () {
          return (
            (null == this.options.barAutoWidth
              ? this.options.defaultOptions.barAutoWidth === "true"
              : this.options.barAutoWidth === "true") ?? true
          );
        }),
        (e.prototype.onResize = function (e, n, i, o, r) {
          t.prototype.onResize.call(this, e, n, i, o, r);
          this.initBarcode(this.designTarget, this.getTitle(), this.getData());
        }),
        (e.prototype.getTitle = function () {
          return this.options.title || this.printElementType.title;
        }),
        (e.prototype.getData = function (t) {
          var e = void 0;
          var f = this.getField();
          e = t
            ? f
              ? f.split(".").reduce((a, c) => (a ? a[c] : t ? t[c] : ""), !1) ||
                ""
              : ""
            : this.options.testData || this.printElementType.getData() || "";
          return e;
        }),
        (e.prototype.initBarcode = function (designTarget, title, text) {
          designTarget = designTarget || this.designTarget;
          var content = designTarget.find(
            ".hiprint-printElement-barcode-content"
          );
          try {
            // 计算 barcode 的高度，判断是否需要减去 title，使 title 包含在元素内部
            const height = o.a.pt.toMm(
              this.options.height -
                (!this.options.hideTitle
                  ? this.options.lineHeight ??
                    (this.options.fontSize ?? 10.5) * 1.5
                  : 0)
            );
            var barcode = bwipjs.toSVG({
              bcid: this.options.barcodeType || "code128",
              text: text || this.options.testData || this.options.title,
              scale: this.options.barWidth || 1,
              width: !this.getBarAutoWidth()
                ? parseInt(o.a.pt.toMm(this.options.getWidth()))
                : "",
              height: parseInt(height),
              includetext: !this.options.hideTitle,
              barcolor: this.options.barColor || "#000",
            });
            // pub-beta 0.0.57-beta22 优化了条码自动调整宽度的逻辑，title 文本改为使用 bwipjs 文本内部实现
            barcode = $(barcode);
            // pub-beta 0.0.57-beta22 svg 元素需要添加 preserveAspectRatio 属性，使其横向可以自适应缩放
            barcode.attr("preserveAspectRatio", "none slice");
            let svgWidth = barcode[0].attributes.viewBox.value.split(" ")[2]; // 通过 viewBox 属性获取 bwipjs 内部生成的 svg 宽度
            svgWidth = Math.ceil(hinnn.px.toPt(svgWidth * 1.05));
            if (this.getBarAutoWidth() && svgWidth > this.options.width) {
              content.parent().css("width", svgWidth + "pt");
              barcode.css("height", "100%");
              this.options.width = svgWidth;
            }
            content.html(barcode);
            // if (!this.options.hideTitle) {
            //   const titleText = title ? title + ( text ? ':' : '' ) : '';
            //   const textAlign = this.options.textAlign || 'center';
            //   // 支持type为barcode的textAlign属性
            //   const textStyle = textAlign === 'justify' ? 'text-align-last: justify;text-justify: distribute-all-lines;' : `text-align: ${ textAlign };`
            //   content.append($(`<div class="hiprint-printElement-barcode-content-title" style="${ textStyle }">${ titleText }${ text }</div>`))
            // }
          } catch (error) {
            console.error(error);
            content.html($(`<div>${i18n.__("条形码生成失败")}</div>`));
          }
        }),
        // 设置 barcode 元素 resize 控制点
        (e.prototype.getReizeableShowPoints = function () {
          return ["s", "e", "se", "r"];
        }),
        (e.prototype.createTarget = function (title, data) {
          var designTarget = $(
            '<div class="hiprint-printElement hiprint-printElement-barcode" style="position: absolute;"><div class="hiprint-printElement-barcode-content" style="height:100%;width:100%;display:flex;flex-direction:column"></div></div>'
          );
          this.initBarcode(designTarget, title, data);
          return designTarget;
        }),
        (e.prototype.getHtml = function (t, e, n) {
          return this.getHtml2(t, e, n);
        }),
        e
      );
    })(f.a),
    qrcode = (function (t) {
      function e(e, n) {
        var i = t.call(this, e) || this;
        return (
          (i.options = new g.a(n)),
          i.options.setDefault(
            new g.a(p.a.instance.qrcode.default).getPrintElementOptionEntity()
          ),
          i
        );
      }
      return (
        N(e, t),
        (e.prototype.updateDesignViewFromOptions = function () {
          if (this.designTarget) {
            var t = this.getData();
            this.css(this.designTarget, t),
              this.initQrcode(
                this.designTarget,
                this.getTitle(),
                this.getData()
              );
          }
        }),
        (e.prototype.getConfigOptions = function () {
          return p.a.instance.qrcode;
        }),
        (e.prototype.onResize = function (e, n, i, o, r) {
          t.prototype.onResize.call(this, e, n, i, o, r);
          this.initQrcode(this.designTarget, this.getTitle(), this.getData());
        }),
        (e.prototype.getTitle = function () {
          return this.options.title || this.printElementType.title;
        }),
        (e.prototype.getData = function (t) {
          var e = void 0;
          var f = this.getField();
          e = t
            ? f
              ? f.split(".").reduce((a, c) => (a ? a[c] : t ? t[c] : ""), !1) ||
                ""
              : ""
            : this.options.testData || this.printElementType.getData() || "";
          return e;
        }),
        (e.prototype.initQrcode = function (designTarget, title, text) {
          designTarget = designTarget || this.designTarget;
          var content = designTarget.find(
            ".hiprint-printElement-qrcode-content"
          );
          try {
            const width = o.a.pt.toPx(this.options.getWidth());
            // 计算 qrcode 的高度，判断是否需要减去 title，使 title 包含在元素内部
            const height = o.a.pt.toPx(
              this.options.height -
                (!this.options.hideTitle
                  ? this.options.lineHeight ??
                    (this.options.fontSize ?? 10.5) * 1.5
                  : 0)
            );
            // 根据宽高 判断 qrcode 上下、左右 留白边距
            const paddingwidth =
              width >= height ? Math.abs(parseInt((width - height) / 2)) : 0;
            const paddingheight =
              width >= height ? 0 : Math.abs(parseInt((height - width) / 2));
            var qrcode = bwipjs.toSVG({
              bcid: this.options.qrcodeType || "qrcode",
              text: text || this.options.testData || this.options.title,
              scale: 1,
              paddingwidth,
              paddingheight,
              // 保持 qrcode 始终为正方形
              width: Math.min(
                parseInt(width / 2.835),
                parseInt(height / 2.835)
              ),
              height: Math.min(
                parseInt(width / 2.835),
                parseInt(height / 2.835)
              ),
              includetext: false,
              eclevel: ["M", "L", "H", "Q"][this.options.qrCodeLevel ?? 0],
              barcolor: this.options.barColor || "#000",
            });
            content.html($(qrcode));
            if (!this.options.hideTitle) {
              const titleText = title ? title + (text ? ":" : "") : "";
              const textAlign = this.options.textAlign || "center";
              // 支持type为qrcode的textAlign属性
              const textStyle =
                textAlign === "justify"
                  ? "text-align-last: justify;text-justify: distribute-all-lines;"
                  : `text-align: ${textAlign};`;
              content.append(
                $(
                  `<div class="hiprint-printElement-qrcode-content-title" style="${textStyle}">${titleText}${text}</div>`
                )
              );
            }
          } catch (error) {
            console.error(error);
            content.html($(`<div>${i18n.__("二维码生成失败")}</div>`));
          }
        }),
        // 设置 qrcode 元素 resize 控制点
        (e.prototype.getReizeableShowPoints = function () {
          return ["s", "e", "se", "r"];
        }),
        (e.prototype.createTarget = function (title, data) {
          var designTarget = $(
            '<div class="hiprint-printElement hiprint-printElement-qrcode" style="position: absolute;"><div class="hiprint-printElement-qrcode-content" style="height:100%;width:100%;display:flex;flex-direction:column"></div></div>'
          );
          this.initQrcode(designTarget, title, data);
          return designTarget;
        }),
        (e.prototype.getHtml = function (t, e, n) {
          return this.getHtml2(t, e, n);
        }),
        e
      );
    })(f.a),
    W = (function () {
      function t() {}

      return (
        (t.createPrintElement = function (t, e) {
          return "text" == t.type
            ? new D(t, e)
            : "image" == t.type
            ? new v(t, e)
            : "longText" == t.type
            ? new w(t, e)
            : "table" == t.type
            ? new d.a(t, e)
            : "html" == t.type
            ? new S(t, e)
            : "vline" == t.type
            ? new F(t, e)
            : "hline" == t.type
            ? new A(t, e)
            : "rect" == t.type
            ? new k(t, e)
            : "oval" == t.type
            ? new V(t, e)
            : "barcode" == t.type
            ? new barcode(t, e)
            : "qrcode" == t.type
            ? new qrcode(t, e)
            : void 0;
        }),
        t
      );
    })(),
    j = (function () {
      function t(t) {
        (this.field = t.field),
          (this.fields = t.fields),
          (this.title = t.title),
          (this.text = t.text),
          (this.tid = t.tid),
          (this.data = t.data),
          (this.styler = t.styler),
          (this.formatter = t.formatter),
          (this.type = t.type),
          (this.onRendered = t.onRendered),
          (this.options = t.options);
      }

      return (
        (t.prototype.getText = function (t) {
          return t
            ? this.title || this.text || ""
            : this.text || this.title || "";
        }),
        (t.prototype.getData = function () {
          return this.data;
        }),
        (t.prototype.createPrintElement = function (t) {
          var e = {};
          return $.extend(e, t || {}), W.createPrintElement(this, e);
        }),
        (t.prototype.getPrintElementTypeEntity = function () {
          return new c({
            title: this.title,
            type: this.type,
          });
        }),
        (t.prototype.getFields = function () {
          return this.fields;
        }),
        (t.prototype.getOptions = function () {
          return this.options || {};
        }),
        t
      );
    })(),
    U = n(16),
    K = n(12),
    G = (function () {
      var _t14 = function t(e, n) {
        return (_t14 =
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
          })(e, n);
      };

      return function (e, n) {
        function i() {
          this.constructor = e;
        }

        _t14(e, n),
          (e.prototype =
            null === n
              ? Object.create(n)
              : ((i.prototype = n.prototype), new i()));
      };
    })(),
    q = (function (t) {
      function e(e) {
        var n = t.call(this, e) || this;
        (e = e || {}).columns
          ? ((n.columns = []),
            e.columns.forEach(function (t) {
              n.columns.push(new K.a(t));
            }))
          : (n.columns = [
              new K.a({
                columns: [
                  new u.a({
                    width: 100,
                  }),
                  new u.a({
                    width: 100,
                  }),
                ],
              }),
            ]);
        return (
          (n.lHeight = e.lHeight),
          (n.autoCompletion = e.autoCompletion),
          (n.tableFooterRepeat = e.tableFooterRepeat),
          n
        );
      }

      return (
        G(e, t),
        (e.prototype.getPrintElementOptionEntity = function () {
          var e = t.prototype.getPrintElementOptionEntity.call(this);
          e.fields = this.fields;
          return (
            (e.columns = []),
            this.columns.forEach(function (t) {
              e.columns.push(t.getPrintElementOptionEntity());
            }),
            e
          );
        }),
        e
      );
    })(g.a),
    Q = (function () {
      var _t16 = function t(e, n) {
        return (_t16 =
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
          })(e, n);
      };

      return function (e, n) {
        function i() {
          this.constructor = e;
        }

        _t16(e, n),
          (e.prototype =
            null === n
              ? Object.create(n)
              : ((i.prototype = n.prototype), new i()));
      };
    })(),
    tt = (function () {
      var _t17 = function t(e, n) {
        return (_t17 =
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
          })(e, n);
      };

      return function (e, n) {
        function i() {
          this.constructor = e;
        }

        _t17(e, n),
          (e.prototype =
            null === n
              ? Object.create(n)
              : ((i.prototype = n.prototype), new i()));
      };
    })(),
    et = (function (t) {
      function e(e) {
        return t.call(this, e) || this;
      }

      return (
        tt(e, t),
        (e.prototype.createPrintElement = function (t) {
          var e = {};
          return $.extend(e, t || {}), W.createPrintElement(this, e);
        }),
        (e.prototype.getPrintElementTypeEntity = function () {
          return new c({
            title: this.title,
            type: this.type,
          });
        }),
        e
      );
    })(j),
    nt = (function () {
      function t() {}

      return (
        (t.createPrintElementType = function (t) {
          return (
            (t.type = t.type || "text"),
            "text" == t.type
              ? new et(t)
              : "table" == t.type
              ? new h(t)
              : new j(t)
          );
        }),
        t
      );
    })(),
    it = (function () {
      function t() {}

      return (
        (t.getElementTypeGroups = function (e) {
          var n = t.formatterModule(e);
          return a.instance[n] || [];
        }),
        (t.getElementType = function (t, e) {
          if (t) return a.instance.getElementType(t);
          nt.createPrintElementType({
            type: e,
          });
        }),
        (t.build = function (e, n) {
          var i = t.formatterModule(n),
            o = new l().createPrintElementTypeHtml(
              e,
              this.getElementTypeGroups(i)
            );
          this.enableDrag(o);
        }),
        (t.buildByHtml = function (t) {
          this.enableDrag(t);
        }),
        (t.enableDrag = function (e) {
          e.hidraggable({
            revert: !0,
            proxy: function proxy(t) {
              var e = s.a.instance.getDragingPrintElement(),
                n = e.printElement.getProxyTarget(
                  e.printElement.printElementType.getOptions()
                );
              return n.appendTo("body"), n.css("z-index", "9999"), n;
            },
            moveUnit: "pt",
            minMove: 4,
            onBeforeDrag: function onBeforeDrag(e) {
              s.a.instance.draging = !0;
              var tid = $(e.data.target).attr("tid");
              var n = t.getElementType(tid, $(e.data.target).attr("ptype"));
              if (!n) {
                throw new Error(
                  `${i18n.__(
                    "请检查 hiprint.init 的 provider 是否配置了"
                  )} [${tid}]`
                );
                return !1;
              }
              var ele = n.createPrintElement();
              if (!ele) {
                if (n.type == "tableCustom") {
                  throw new Error(
                    `${i18n.__(
                      "已移除'tableCustom',请替换使用'table'详情见更新记录"
                    )}`
                  );
                  return !1;
                }
              }
              return s.a.instance.setDragingPrintElement(ele), !0;
            },
            onDrag: function onDrag(t, e, n) {
              s.a.instance.getDragingPrintElement().updatePosition(e, n);
            },
            onStopDrag: function onStopDrag(t) {
              s.a.instance.draging = !1;
            },
          });
        }),
        (t.formatterModule = function (t) {
          return t || "_default";
        }),
        t
      );
    })(),
    ot = (function () {
      return function (t, e) {
        var n = this;
        (this.name = t),
          (this.printElementTypes = []),
          e.forEach(function (t) {
            n.printElementTypes.push(nt.createPrintElementType(t));
          });
      };
    })(),
    rt = (function () {
      return function (t) {
        if (
          ((this.index = t.index),
          (this.name = t.name),
          (this.paperType = t.paperType),
          this.paperType)
        ) {
          var e = s.a.instance[this.paperType];
          t.height
            ? ((this.height = t.height), (this.width = t.width))
            : ((this.height = e.height), (this.width = e.width));
        } else (this.height = t.height), (this.width = t.width);

        (this.paperHeader = t.paperHeader || 0),
          (this.paperFooter = t.paperFooter || o.a.mm.toPt(this.height)),
          (this.printElements = t.printElements || []),
          (this.paperNumberLeft = t.paperNumberLeft),
          (this.paperNumberTop = t.paperNumberTop),
          (this.paperNumberDisabled = t.paperNumberDisabled),
          (this.paperNumberContinue = t.paperNumberContinue),
          (this.paperNumberFormat = t.paperNumberFormat),
          (this.panelPaperRule = t.panelPaperRule),
          (this.panelPageRule = t.panelPageRule),
          (this.rotate = t.rotate || void 0),
          (this.firstPaperFooter = t.firstPaperFooter),
          (this.evenPaperFooter = t.evenPaperFooter),
          (this.oddPaperFooter = t.oddPaperFooter),
          (this.lastPaperFooter = t.lastPaperFooter),
          (this.topOffset = t.topOffset),
          (this.fontFamily = t.fontFamily),
          (this.leftOffset = t.leftOffset),
          (this.orient = t.orient),
          (this.scale = t.scale),
          (this.watermarkOptions = t.watermarkOptions),
          (this.panelLayoutOptions = t.panelLayoutOptions);
      };
    })(),
    at = (function () {
      function t(t, e, n, i) {
        (this.bx = t),
          (this.by = e),
          (this.ex = t),
          (this.ey = e),
          (this.startX = this.minX = t),
          (this.startY = this.minY = e),
          (this.maxX = t),
          (this.maxY = e),
          (this.lastLeft = n),
          (this.lastTop = i);
      }

      return (
        (t.prototype.updateRect = function (t, e, i) {
          var scale = i.designPaper.scale || 1.0;
          this.ex = t;
          this.ey = e;
          (this.minX =
            this.startX / scale < t / scale ? this.startX / scale : t / scale),
            (this.minY =
              this.startY / scale < e / scale
                ? this.startY / scale
                : e / scale),
            (this.maxX =
              this.startX / scale < t / scale
                ? t / scale
                : this.startX / scale),
            (this.maxY =
              this.startY / scale < e / scale
                ? e / scale
                : this.startY / scale);
        }),
        (t.prototype.updatePositionByMultipleSelect = function (t, e) {
          null != t && (this.lastLeft = this.lastLeft + t),
            null != e && (this.lastTop = this.lastTop + e),
            this.target.css({
              left: this.lastLeft + "pt",
              top: this.lastTop + "pt",
            });
        }),
        t
      );
    })(),
    pt = (function () {
      function t(t, e) {
        (this.templateId = e),
          (this.index = t.index),
          (this.name = t.name),
          (this.width = t.width),
          (this.height = t.height),
          (this.paperType = t.paperType),
          (this.paperHeader = t.paperHeader),
          (this.paperFooter = t.paperFooter),
          this.initPrintElements(t.printElements),
          (this.paperNumberLeft = t.paperNumberLeft),
          (this.paperNumberTop = t.paperNumberTop),
          (this.paperNumberDisabled = t.paperNumberDisabled),
          (this.paperNumberContinue =
            t.paperNumberContinue == void 0 ? true : t.paperNumberContinue),
          (this.paperNumberFormat = t.paperNumberFormat),
          (this.panelPaperRule = t.panelPaperRule),
          (this.panelPageRule = t.panelPageRule),
          (this.firstPaperFooter = t.firstPaperFooter),
          (this.evenPaperFooter = t.evenPaperFooter),
          (this.oddPaperFooter = t.oddPaperFooter),
          (this.lastPaperFooter = t.lastPaperFooter),
          (this.topOffset = t.topOffset),
          (this.leftOffset = t.leftOffset),
          (this.fontFamily = t.fontFamily),
          (this.orient = t.orient),
          (this.target = this.createTarget()),
          (this.rotate = t.rotate),
          (this.scale = t.scale),
          (this.watermarkOptions = t.watermarkOptions || {}),
          (this.panelLayoutOptions = t.panelLayoutOptions || {});
      }

      return (
        (t.prototype.design = function (t) {
          var e = this;
          this.orderPrintElements(),
            (this.designPaper = this.createNewPage(0)),
            this.target.html(""),
            this.target.append(this.designPaper.getTarget()),
            this.droppablePaper(this.designPaper),
            this.designPaper.design(t),
            this.designPaper.subscribePaperBaseInfoChanged(function (t) {
              (e.paperHeader = t.paperHeader),
                (e.paperFooter = t.paperFooter),
                (e.paperNumberLeft = t.paperNumberLeft),
                (e.paperNumberTop = t.paperNumberTop),
                (e.paperNumberDisabled = t.paperNumberDisabled),
                (e.paperNumberFormat = t.paperNumberFormat);
            }),
            this.printElements.forEach(function (n) {
              e.appendDesignPrintElement(e.designPaper, n),
                n.design(t, e.designPaper);
            }),
            this.target.bind("click.hiprint", function (t) {
              let panelOptions = {
                panelPaperRule: e.panelPaperRule,
                panelPageRule: e.panelPageRule,
                firstPaperFooter: e.firstPaperFooter,
                evenPaperFooter: e.evenPaperFooter,
                oddPaperFooter: e.oddPaperFooter,
                lastPaperFooter: e.lastPaperFooter,
                leftOffset: e.leftOffset,
                topOffset: e.topOffset,
                panelLayoutOptions: e.panelLayoutOptions || {},
                fontFamily: e.fontFamily,
                orient: e.orient,
                paperNumberDisabled: e.paperNumberDisabled,
                paperNumberContinue: e.paperNumberContinue,
                paperNumberFormat: e.paperNumberFormat,
                watermarkOptions: e.watermarkOptions || {},
              };
              if (!p.a.instance.paperNumberContinue) {
                delete panelOptions["paperNumberContinue"];
              }
              o.a.event.trigger(
                "BuildCustomOptionSettingEventKey_" + e.templateId,
                {
                  options: panelOptions,
                  callback: function callback(t) {
                    (e.panelLayoutOptions = t.panelLayoutOptions || {}),
                      (e.watermarkOptions = t.watermarkOptions || void 0),
                      t.watermarkOptions &&
                        e.designPaper.createWaterMark(
                          true,
                          1,
                          t.watermarkOptions
                        );
                    (e.panelPaperRule = t.panelPaperRule),
                      (e.panelPageRule = t.panelPageRule),
                      (e.firstPaperFooter = t.firstPaperFooter),
                      (e.evenPaperFooter = t.evenPaperFooter),
                      (e.oddPaperFooter = t.oddPaperFooter),
                      (e.lastPaperFooter = t.lastPaperFooter),
                      (e.leftOffset = t.leftOffset),
                      (e.topOffset = t.topOffset),
                      (e.fontFamily = t.fontFamily),
                      (e.orient = t.orient),
                      (e.paperNumberDisabled =
                        e.designPaper.paperNumberDisabled =
                          !!t.paperNumberDisabled || void 0),
                      (e.paperNumberContinue =
                        e.designPaper.paperNumberContinue =
                          t.paperNumberContinue),
                      (e.paperNumberFormat = t.paperNumberFormat),
                      (e.designPaper.paperNumberFormat = t.paperNumberFormat),
                      t.paperNumberFormat &&
                        (e.designPaper.paperNumberTarget =
                          e.designPaper.createPaperNumber(
                            e.designPaper.formatPaperNumber(1, 1),
                            true
                          )),
                      e.designPaper.setOffset(e.leftOffset, e.topOffset),
                      e.css(e.target),
                      e.designPaper.resetPaperNumber(
                        e.designPaper.paperNumberTarget
                      ),
                      e.designPaper.triggerOnPaperBaseInfoChanged();
                  },
                }
              );
            }),
            this.bindShortcutKeyEvent();
          this.bingPasteEvent();
          this.bindBatchMoveElement();
        }),
        (t.prototype.update = function (t) {
          try {
            var start = Date.now();
            console.log("start", start);
            var e = this;
            (this.index = t.index),
              (this.name = t.name),
              (this.width = t.width),
              (this.height = t.height),
              (this.paperType = t.paperType),
              (this.paperHeader = t.paperHeader),
              (this.paperFooter = t.paperFooter);
            (this.designPaper.width = o.a.mm.toPt(t.width)),
              (this.designPaper.height = o.a.mm.toPt(this.height)),
              (this.designPaper.paperType = this.paperType),
              (this.designPaper.paperHeader = this.paperHeader),
              (this.designPaper.paperFooter = this.paperFooter);
            (this.designPaper.mmheight = t.height),
              (this.designPaper.mmwidth = t.width);
            // 页眉线
            this.designPaper.headerLinetarget.css(
              "top",
              (this.paperHeader || -1) + "pt"
            ),
              0 == this.paperHeader &&
                this.designPaper.headerLinetarget.addClass(
                  "hideheaderLinetarget"
                );
            // 页脚线
            this.designPaper.footerLinetarget.css(
              "top",
              parseInt(this.paperFooter.toString()) + "pt"
            ),
              this.paperFooter == this.height &&
                this.designPaper.footerLinetarget.css(
                  "top",
                  t.height - p.a.instance.paperHeightTrim + "mm"
                );
            // 水印参数
            this.watermarkOptions = t.watermarkOptions || {};
            this.designPaper.createWaterMark(
              true,
              this.index,
              this.watermarkOptions
            );
            // 页码
            (this.paperNumberLeft = t.paperNumberLeft),
              (this.paperNumberTop = t.paperNumberTop),
              (this.paperNumberDisabled = t.paperNumberDisabled),
              (this.paperNumberContinue = t.paperNumberContinue),
              (this.paperNumberFormat = t.paperNumberFormat);
            (this.designPaper.paperNumberLeft = this.paperNumberLeft),
              (this.designPaper.paperNumberTop = this.paperNumberTop),
              (this.designPaper.paperNumberDisabled = this.paperNumberDisabled),
              (this.designPaper.paperNumberContinue = this.paperNumberContinue),
              (this.designPaper.paperNumberFormat = this.paperNumberFormat);
            this.designPaper.paperNumberTarget
              .css("top", this.paperNumberTop + "pt")
              .css("left", this.paperNumberLeft + "pt"),
              this.designPaper.resetPaperNumber(
                this.designPaper.paperNumberTarget
              );
            // 字体方向
            (this.fontFamily = t.fontFamily),
              (this.orient = t.orient),
              (this.rotate = t.rotate),
              (this.scale = t.scale);
            (this.designPaper.fontFamily = this.fontFamily),
              (this.designPaper.orient = this.orient),
              (this.designPaper.scale = e.designPaper.scale || this.scale);
            // 面板参数
            (this.panelLayoutOptions = t.panelLayoutOptions),
              (this.panelPaperRule = t.panelPaperRule),
              (this.panelPageRule = t.panelPageRule),
              (this.firstPaperFooter = t.firstPaperFooter),
              (this.evenPaperFooter = t.evenPaperFooter),
              (this.oddPaperFooter = t.oddPaperFooter),
              (this.lastPaperFooter = t.lastPaperFooter),
              (this.topOffset = t.topOffset),
              (this.leftOffset = t.leftOffset);
            this.designPaper.setFooter(
              this.firstPaperFooter,
              this.evenPaperFooter,
              this.oddPaperFooter,
              this.lastPaperFooter
            ),
              this.designPaper.setOffset(this.leftOffset, this.topOffset);
            // 宽高
            this.target.css("width", t.width + "mm"),
              this.target.css(
                "height",
                t.height - p.a.instance.paperHeightTrim + "mm"
              ),
              this.target.attr("original-height", t.height),
              this.target.parent().css("width", t.width + "mm"),
              this.target
                .parent()
                .css("height", t.height - p.a.instance.paperHeightTrim + "mm"),
              this.designPaper.target.css("width", t.width + "mm"),
              this.designPaper.target.css(
                "height",
                t.height - p.a.instance.paperHeightTrim + "mm"
              );
            var end = Date.now();
            console.log("更新参数 end", end);
            console.log("更新参数 time:", end - start);
            // 清空面板
            this.printElements.forEach(function (t) {
              t.designTarget &&
                t.designTarget.length &&
                t.designTarget.remove();
            }),
              (this.printElements = []);
            var end = Date.now();
            console.log("清空面板 end", end);
            console.log("清空面板 time:", end - start);
            // 更新面板
            this.initPrintElements(t.printElements);
            var end = Date.now();
            console.log("初始化元素 end", end);
            console.log("初始化元素 time:", end - start);
            this.printElements.forEach(function (n) {
              e.appendDesignPrintElement(e.designPaper, n),
                n.design(t, e.designPaper);
            });
            var end = Date.now();
            console.log("插入面板 end", end);
            console.log("插入面板 time:", end - start);
          } catch (e) {
            console.log("???????");
            console.log(e);
          }
        }),
        (t.prototype.bindShortcutKeyEvent = function () {
          var n = this;
          $(document).keydown(function (e) {
            if ("INPUT" == e.target.tagName) return;
            // ctrl/command + z 撤销 / ctrl/command + shift + z 重做
            if ((e.ctrlKey || e.metaKey) && 90 == e.keyCode) {
              if (e.shiftKey) {
                o.a.event.trigger(
                  "hiprintTemplateDataShortcutKey_" + n.templateId,
                  "redo"
                );
              } else {
                o.a.event.trigger(
                  "hiprintTemplateDataShortcutKey_" + n.templateId,
                  "undo"
                );
              }
              e.preventDefault();
            }
          });
        }),
        (t.prototype.bingPasteEvent = function () {
          var n = this;
          n.designPaper.target.attr("tabindex", "1");
          n.designPaper.target.keydown(function (e) {
            // ctrl + v / command + v
            if ("INPUT" == e.target.tagName) return;
            if ((e.ctrlKey || e.metaKey) && 86 == e.keyCode) {
              n.pasteJson(e);
              e.preventDefault();
            }
          });
        }),
        (t.prototype.pasteJson = function (e) {
          var copyArea = $("#copyArea");
          if (!copyArea.length) return;
          try {
            var json = copyArea.text();
            var objList = JSON.parse(json);
            let operationPasterPosition = null;
            let replacePosition = null;
            var left = null;
            var top = null;
            objList.forEach((obj, index) => {
              if (!obj.printElementType && !obj.templateId) return;
              // 复制使用当前模板内的元素 进行克隆
              // todo: 使用参数创建
              var n = this,
                r = obj.options,
                ele = n.getElementById(obj.id);
              if (!ele) return;
              var a = ele.clone(obj);
              if (!a) return;
              // 判断是否是在元素上进行paste
              if (index === 0) {
                operationPasterPosition = {
                  x: obj.options.left,
                  y: obj.options.top,
                };
                var useMouse = e.currentTarget.className != e.target.className;
                left =
                  (!useMouse &&
                    n.mouseOffsetX &&
                    o.a.px.toPt(n.mouseOffsetX)) ||
                  (r.left += 10);
                top =
                  (!useMouse &&
                    n.mouseOffsetY &&
                    o.a.px.toPt(n.mouseOffsetY)) ||
                  (r.top += 10);
                replacePosition = {
                  x: left,
                  y: top,
                };
              } else {
                const position = {
                  x: obj.options.left,
                  y: obj.options.top,
                };
                const incrementPosition = {
                  x: position.x - operationPasterPosition.x,
                  y: position.y - operationPasterPosition.y,
                };
                left = replacePosition.x + incrementPosition.x;
                top = replacePosition.y + incrementPosition.y;
              }
              a.options.setLeft(left);
              a.options.setTop(top);
              a.setTemplateId(n.templateId), a.setPanel(n);
              n.appendDesignPrintElement(n.designPaper, a, !1);
              // 在复制的地方也重新给他算轮次
              const template = s.a.instance.getPrintTemplateById(n.templateId);
              if (a.options.field && template.qtDesigner) {
                a.options.qid = template.qtDesignderFunction(a.options.field);
              }
              n.printElements.push(a), a.design(void 0, n.designPaper);
              console.log("pasteJson success");
              o.a.event.trigger(
                "hiprintTemplateDataChanged_" + n.templateId,
                "复制"
              );
              // 点击克隆出来的元素
              a.designTarget
                .children(".resize-panel")
                .trigger($.Event("click"));
            });
          } catch (e) {
            console.error("pasteJson error", e);
          }
        }),
        (t.prototype.css = function (t) {
          if (this.fontFamily) t.css("fontFamily", this.fontFamily);
          else t[0].style.fontFamily = "";
        }),
        (t.prototype.getConfig = function () {
          return p.a.instance;
        }),
        (t.prototype.getHtml = function (t, e, n, i, o) {
          var r = this;
          this.orderPrintElements();
          let config = r.getConfig();
          var a,
            p = n || [],
            s = i || this,
            l = void 0;

          if (i) {
            l = p[p.length - 1];
            a = l.getPanelTarget();
            l.updateReferenceElement(
              new E.a({
                top: this.paperHeader,
                left: 0,
                height: 0,
                width: 0,
                bottomInLastPaper: l.referenceElement.bottomInLastPaper,
                beginPrintPaperIndex: p.length - 1,
                printTopInPaper: l.referenceElement.bottomInLastPaper,
                endPrintPaperIndex: p.length - 1,
              })
            );
          } else {
            a = s.createTarget();
            l = s.createNewPage(p.length);
            p.push(l);
            a.append(l.getTarget());
          }
          this.printElements
            .filter(function (t) {
              return !t.isFixed() && !t.isHeaderOrFooter();
            })
            .forEach(function (e) {
              var n = [],
                i = p[p.length - 1];
              if (
                i.referenceElement.isPositionLeftOrRight(e.options.getTop())
              ) {
                l = p[i.referenceElement.beginPrintPaperIndex];
              } else {
                l = p[i.referenceElement.endPrintPaperIndex];
              }
              n = e.getHtml(l, t);
              n.forEach(function (t, i) {
                t.referenceElement &&
                  (t.referenceElement.endPrintPaperIndex =
                    t.referenceElement.beginPrintPaperIndex + n.length - 1);
                if (i > 0) {
                  if (l.index < p.length - 1) {
                    l = p[l.index + 1];
                  } else {
                    l = s.createNewPage(p.length, l.referenceElement);
                    p.push(l);
                  }
                  a.append(l.getTarget());
                }
                // 元素隐藏时不添加到html内
                t.target &&
                  ("none" != e.options.showInPage && l.append(t.target),
                  l.updatePrintLine(t.printLine),
                  e.onRendered(l, t.target));
                i == n.length - 1 &&
                  t.referenceElement &&
                  l.updateReferenceElement(t.referenceElement);
              });
            });
          o &&
            o.templates.forEach(function (t, e) {
              var i = t.data || {},
                o = t.options || {};
              t.template.printPanels.forEach(function (t) {
                t.getHtml(i, o, n, r);
              });
            });
          // config 是否开启页码续排
          if (config.paperNumberContinue) {
            // 面板是否页码续排
            if (r.paperNumberContinue) {
              hinnn._paperList = [...(hinnn._paperList || []), ...p];
            } else {
              hinnn._paperList = [...p];
            }
          }
          if (!i) {
            if (this.lastPaperFooter)
              p[p.length - 1].printLine > this.lastPaperFooter &&
                ((l = s.createNewPage(p.length, l.referenceElement)),
                p.push(l),
                a.append(l.getTarget()));
            // 这里是处理奇偶页设置
            this.panelPaperRule &&
              ("odd" == this.panelPaperRule &&
                p.length % 2 == 0 &&
                ((l = s.createNewPage(p.length, l.referenceElement)),
                p.push(l),
                a.append(l.getTarget())),
              "even" == this.panelPaperRule &&
                p.length % 2 == 1 &&
                ((l = s.createNewPage(p.length, l.referenceElement)),
                p.push(l),
                a.append(l.getTarget())));
            p.forEach(function (n) {
              n.updatePaperNumber(
                n.index + 1,
                p.length,
                e.paperNumberToggleInEven
              ),
                r.fillPaperHeaderAndFooter(n, t, p.length),
                e &&
                  (null != e.leftOffset && n.setLeftOffset(e.leftOffset),
                  null != e.topOffset && n.setTopOffset(e.topOffset));
            });
            a.prepend(this.getPrintStyle());
            // config 是否开启页码续排
            if (config.paperNumberContinue) {
              hinnn._paperList.forEach(function (n, index) {
                n.updatePaperNumber(index + 1, hinnn._paperList.length);
              });
            }
          }

          return a;
        }),
        (t.prototype.resize = function (t, e, n, i) {
          (this.width = e),
            (this.height = n),
            (this.paperType = t),
            (this.rotate = i),
            this.designPaper.resize(e, n);
        }),
        (t.prototype.rotatePaper = function () {
          null == this.rotate && (this.rotate = !1),
            (this.rotate = !this.rotate),
            this.resize(this.paperType, this.height, this.width, this.rotate);
        }),
        (t.prototype.zoom = function (s, p) {
          if (p) {
            this.scale = s;
          } else {
            this.scale = void 0;
          }
          this.designPaper.zoom(s);
        }),
        (t.prototype.getTarget = function () {
          return this.target;
        }),
        (t.prototype.enable = function () {
          this.target.removeClass("hipanel-disable");
        }),
        (t.prototype.disable = function () {
          this.target.addClass("hipanel-disable");
        }),
        (t.prototype.getPanelEntity = function (t) {
          var e = [];
          return (
            this.printElements.forEach(function (n) {
              e.push(n.getPrintElementEntity(t));
            }),
            new rt({
              index: this.index,
              name: this.name || this.index + 1,
              width: this.width,
              height: this.height,
              paperType: this.paperType,
              paperHeader: this.paperHeader,
              paperFooter: this.paperFooter,
              paperNumberDisabled: !!this.paperNumberDisabled || void 0,
              paperNumberContinue:
                this.paperNumberContinue == void 0
                  ? !0
                  : this.paperNumberContinue,
              paperNumberFormat: this.paperNumberFormat
                ? this.paperNumberFormat
                : void 0,
              panelPaperRule: this.panelPaperRule
                ? this.panelPaperRule
                : void 0,
              panelPageRule: this.panelPageRule ? this.panelPageRule : void 0,
              paperNumberLeft: this.paperNumberLeft,
              paperNumberTop: this.paperNumberTop,
              printElements: e,
              rotate: this.rotate,
              firstPaperFooter: this.firstPaperFooter,
              evenPaperFooter: this.evenPaperFooter,
              oddPaperFooter: this.oddPaperFooter,
              lastPaperFooter: this.lastPaperFooter,
              topOffset: this.topOffset,
              fontFamily: this.fontFamily,
              orient: this.orient,
              scale: this.scale,
              watermarkOptions: this.watermarkOptions
                ? this.watermarkOptions
                : void 0,
              leftOffset: this.leftOffset,
              panelLayoutOptions: this.panelLayoutOptions || {},
            })
          );
        }),
        (t.prototype.createTarget = function () {
          var t = $(
            '<div class="hiprint-printPanel panel-index-' +
              this.index +
              '"></div>'
          );
          return this.css(t), t;
        }),
        (t.prototype.droppablePaper = function (t) {
          var e = this;
          t.getTarget().hidroppable({
            accept: ".ep-draggable-item",
            onDrop: function onDrop(n, i) {
              const template = s.a.instance.getPrintTemplateById(e.templateId);
              var r = s.a.instance.getDragingPrintElement(),
                a = r.printElement;
              var ptr = e.designPaper.scale || 1;
              var left =
                  (r.left -
                    o.a.px.toPt(
                      e.target.children(".hiprint-printPaper").offset().left
                    )) /
                  ptr,
                top =
                  (r.top -
                    o.a.px.toPt(
                      e.target.children(".hiprint-printPaper").offset().top
                    )) /
                  ptr;
              a.updateSizeAndPositionOptions(
                e.mathroundToporleft(left),
                e.mathroundToporleft(top)
              );
              a.setTemplateId(e.templateId),
                a.setPanel(e),
                e.appendDesignPrintElement(e.designPaper, a, !0);
              // 如果说编辑器开启qtDesigner,那么就将唯一ID构建唯一ID生成逻辑代码
              if (a.options.field && template.qtDesigner) {
                a.options.qid = template.qtDesignderFunction(a.options.field);
              }
              e.printElements.push(a), a.design(void 0, t);
              o.a.event.trigger(
                "hiprintTemplateDataChanged_" + e.templateId,
                "新增"
              );
            },
          });
        }),
        (t.prototype.initPrintElements = function (t) {
          var e = this;
          (this.printElements = []),
            t &&
              t.forEach(function (n) {
                var i;

                if (
                  (i = n.printElementType
                    ? nt.createPrintElementType(n.printElementType)
                    : a.instance.getElementType(n.tid))
                ) {
                  var o = i.createPrintElement(n.options);
                  o.setTemplateId(e.templateId),
                    o.setPanel(e),
                    e.printElements.push(o);
                } else console.log("miss " + JSON.stringify(t));
              });
        }),
        (t.prototype.mathroundToporleft = function (t) {
          var e = p.a.instance.movingDistance;
          return Math.round(t / e) * e;
        }),
        (t.prototype.appendDesignPrintElement = function (t, e, n) {
          e.setCurrenttemplateData(void 0);
          var i = e.getDesignTarget(t);
          i.addClass("design"), n && e.initSizeByHtml(i), t.append(i);
        }),
        (t.prototype.createNewPage = function (t, e) {
          var n = new T(
            this.templateId,
            this.index,
            this.watermarkOptions,
            this.panelPageRule,
            this.scale,
            this.width,
            this.height,
            this.paperHeader,
            this.paperFooter,
            this.paperNumberLeft,
            this.paperNumberTop,
            this.paperNumberDisabled,
            this.paperNumberContinue,
            this.paperNumberFormat,
            t,
            e
          );
          return (
            n.setFooter(
              this.firstPaperFooter,
              this.evenPaperFooter,
              this.oddPaperFooter,
              this.lastPaperFooter
            ),
            n.setOffset(this.leftOffset, this.topOffset),
            n
          );
        }),
        (t.prototype.orderPrintElements = function () {
          (this.printElements = o.a.orderBy(this.printElements, function (t) {
            return t.options.getLeft();
          })),
            (this.printElements = o.a.orderBy(this.printElements, function (t) {
              return t.options.getTop();
            }));
        }),
        (t.prototype.fillPaperHeaderAndFooter = function (t, e, n) {
          this.printElements
            .filter(function (t) {
              return t.isFixed() || t.isHeaderOrFooter();
            })
            .forEach(function (i) {
              if ((i.isFixed(), i.showInPage(t.index, n))) {
                var o = i.getHtml(t, e);
                o.length && t.append(o[0].target);
              }
            });
        }),
        (t.prototype.clear = function () {
          this.printElements.forEach(function (t) {
            t.designTarget && t.designTarget.length && t.designTarget.remove();
          }),
            (this.printElements = []);
          o.a.event.trigger(
            "hiprintTemplateDataChanged_" + this.templateId,
            "清空"
          );
        }),
        (t.prototype.insertPrintElementToPanel = function (t) {
          var e = this.getPrintElementTypeByEntity(t);

          if (e) {
            var n = e.createPrintElement(t.options);
            n.setTemplateId(this.templateId),
              n.setPanel(this),
              this.printElements.push(n);
          }
        }),
        (t.prototype.addPrintText = function (t) {
          (t.printElementType = t.printElementType || {}),
            (t.printElementType.type = "text"),
            this.insertPrintElementToPanel(t);
        }),
        (t.prototype.addPrintHtml = function (t) {
          (t.printElementType = t.printElementType || {}),
            (t.printElementType.type = "html"),
            this.insertPrintElementToPanel(t);
        }),
        (t.prototype.addPrintTable = function (t) {
          if (
            ((t.printElementType = t.printElementType || {}),
            (t.printElementType.type = "table"),
            t.options && t.options.columns)
          ) {
            var e = $.extend({}, t.options.columns);
            (t.printElementType.columns = e.columns), (e.columns = void 0);
          }

          this.insertPrintElementToPanel(t);
        }),
        (t.prototype.addPrintImage = function (t) {
          (t.printElementType = t.printElementType || {}),
            (t.printElementType.type = "image"),
            this.insertPrintElementToPanel(t);
        }),
        (t.prototype.addPrintLongText = function (t) {
          (t.printElementType = t.printElementType || {}),
            (t.printElementType.type = "longText"),
            this.insertPrintElementToPanel(t);
        }),
        (t.prototype.addPrintVline = function (t) {
          (t.printElementType = t.printElementType || {}),
            (t.printElementType.type = "vline"),
            this.insertPrintElementToPanel(t);
        }),
        (t.prototype.addPrintHline = function (t) {
          (t.printElementType = t.printElementType || {}),
            (t.printElementType.type = "hline"),
            this.insertPrintElementToPanel(t);
        }),
        (t.prototype.addPrintRect = function (t) {
          (t.printElementType = t.printElementType || {}),
            (t.printElementType.type = "rect"),
            this.insertPrintElementToPanel(t);
        }),
        (t.prototype.addPrintOval = function (t) {
          (t.printElementType = t.printElementType || {}),
            (t.printElementType.type = "oval"),
            this.insertPrintElementToPanel(t);
        }),
        (t.prototype.getPrintElementTypeByEntity = function (t) {
          var e;
          return (
            (e = t.tid
              ? a.instance.getElementType(t.tid)
              : nt.createPrintElementType(t.printElementType)) ||
              console.log("miss " + JSON.stringify(t)),
            e
          );
        }),
        (t.prototype.getPrintStyle = function () {
          let layoutStyle = "";
          if (
            this.panelLayoutOptions &&
            this.panelLayoutOptions["layoutType"] === "row"
          ) {
            layoutStyle = `
          <style>
          .hiprint-printTemplate{
            margin: -${
              (Number(this.panelLayoutOptions["layoutRowGap"]) || 0) / 2
            }mm -${
              (Number(this.panelLayoutOptions["layoutColumnGap"]) || 0) / 2
            }mm;
          }
            .hiprint-printTemplate .hiprint-printPanel {
              display:inline-block;
              padding: ${
                (Number(this.panelLayoutOptions["layoutRowGap"]) || 0) / 2
              }mm ${
              (Number(this.panelLayoutOptions["layoutColumnGap"]) || 0) / 2
            }mm;
            }
          </style>
        `;
          }
          return (
            layoutStyle +
            " <style printStyle>\n        @page\n        {\n             border:0;\n             padding:0cm;\n             margin:0cm;\n             " +
            this.getPrintSizeStyle() +
            "\n        }\n        </style>\n"
          );
        }),
        (t.prototype.getPrintSizeStyle = function () {
          return this.paperType
            ? "size:" +
                this.paperType +
                " " +
                (this.height > this.width ? "portrait" : "landscape") +
                ";"
            : "size: " +
                this.width +
                "mm " +
                this.height +
                "mm " +
                (this.orient
                  ? 1 == this.orient
                    ? "portrait"
                    : "landscape"
                  : "") +
                ";";
        }),
        (t.prototype.deletePrintElement = function (t) {
          var e = this;
          this.printElements.filter(function (n, i) {
            n.id == t.id && (t.delete(), e.printElements.splice(i, 1));
          });
        }),
        (t.prototype.getElementByTid = function (t) {
          return this.printElements
            .filter(function (e) {
              return e.printElementType.tid === t;
            })
            .map(function (t, e) {
              return t;
            });
        }),
        (t.prototype.getElementByName = function (t) {
          return this.printElements
            .filter(function (e) {
              return e.options.name === t;
            })
            .map(function (t, e) {
              return t;
            });
        }),
        (t.prototype.getElementById = function (t) {
          return this.printElements.find(function (e) {
            return e.id === t;
          });
        }),
        (t.prototype.getFieldsInPanel = function () {
          var t = [];
          return (
            this.printElements.forEach(function (e) {
              e.options && e.options.field
                ? t.push(e.options.field)
                : e.printElementType.field && t.push(e.printElementType.field);
            }),
            t
          );
        }),
        (t.prototype.getTestData = function () {
          var t = {};
          return (
            this.printElements.forEach(function (e) {
              if ("table" != e.printElementType.type) {
                e.options && e.options.field
                  ? (t[e.options.field] = e.options.testData)
                  : e.printElementType.field
                  ? (t[e.printElementType.field] =
                      e.printElementType.data || e.options.testData)
                  : void 0;
              }
            }),
            t
          );
        }),
        (t.prototype.bindBatchMoveElement = function () {
          var t = this;
          this.designPaper
            .getTarget()
            .on("mousemove", function (e) {
              if (
                e.target.className &&
                _typeof(e.target.className) == "string" &&
                e.target.className.includes("editing")
              ) {
                return;
              }
              if (
                e.currentTarget.className == t.designPaper.target[0].className
              ) {
                (t.mouseOffsetX = e.offsetX), (t.mouseOffsetY = e.offsetY);
              } else {
                t.mouseOffsetX = t.mouseOffsetY = void 0;
              }
              s.a.instance.draging ||
                (1 === e.buttons &&
                  s.a.instance.rectDraging &&
                  t.mouseRect &&
                  (t.mouseRect.updateRect(e.pageX, e.pageY, t),
                  t.updateRectPanel(t.mouseRect)));
            })
            .on("mousedown", function (e) {
              s.a.instance.rectDraging = true;
              if (
                e.target.className &&
                _typeof(e.target.className) == "string" &&
                e.target.className.includes("editing")
              ) {
                return;
              }
              s.a.instance.draging ||
                (t.mouseRect &&
                  t.mouseRect.target &&
                  t.mouseRect.target.remove(),
                1 === e.buttons &&
                  _typeof(e.target.className) == "string" &&
                  e.target.className.includes(
                    "hiprint-printPaper hidroppable design"
                  ) &&
                  (t.mouseRect = new at(
                    e.pageX,
                    e.pageY,
                    s.a.instance.dragLengthCNum(
                      e.pageX - t.designPaper.getTarget().offset().left,
                      p.a.instance.movingDistance
                    ),
                    s.a.instance.dragLengthCNum(
                      e.pageY - t.designPaper.getTarget().offset().top,
                      p.a.instance.movingDistance
                    )
                  )));
            })
            .on("mouseup", function (e) {
              s.a.instance.rectDraging = false;
            });
        }),
        (t.prototype.getElementInRect = function (t) {
          var e = [];
          return (
            this.printElements
              .filter(function (n) {
                return n.options.draggable !== false;
              })
              .forEach(function (n) {
                n.inRect(t) && e.push(n);
              }),
            e
          );
        }),
        (t.prototype.updateRectPanel = function (t) {
          var e = this,
            n = this.designPaper.getTarget();
          var ptr = this.designPaper.scale || 1;
          this.mouseRect.target ||
            ((this.mouseRect.target = $(
              '<div tabindex="1" class="mouseRect" style="z-index:2;position: absolute;opacity:0.2;border: 1px dashed #000;background-color:#31676f;"><span></span></div>'
            )),
            n.find(".hiprint-printPaper-content").append(this.mouseRect.target),
            this.bingKeyboardMoveEvent(this.mouseRect.target),
            this.mouseRect.target.hidraggable({
              onDrag: function onDrag(t, n, i) {
                (e.mouseRect.lastLeft = e.mouseRect.lastLeft
                  ? o.a.px.toPt(e.mouseRect.target[0].offsetLeft)
                  : n / ptr),
                  (e.mouseRect.lastTop = e.mouseRect.lastTop
                    ? o.a.px.toPt(e.mouseRect.target[0].offsetTop)
                    : i / ptr),
                  (e.mouseRect.mouseRectSelectedElement || []).forEach(
                    function (t) {
                      t.updatePositionByMultipleSelect(
                        n - e.mouseRect.lastLeft,
                        i - e.mouseRect.lastTop
                      );
                    }
                  ),
                  (e.mouseRect.lastLeft = n / ptr),
                  (e.mouseRect.lastTop = i / ptr),
                  (s.a.instance.changed = !0);
              },
              moveUnit: "pt",
              minMove: p.a.instance.movingDistance,
              onBeforeDrag: function onBeforeDrag(t) {
                e.mouseRect.target.focus(),
                  (s.a.instance.draging = !0),
                  e.mouseRect.mouseRectSelectedElement ||
                    (e.mouseRect.mouseRectSelectedElement = e.getElementInRect(
                      e.mouseRect
                    ));
                e.mouseRect.target.css({
                  transform: "unset",
                });
              },
              getScale: function getScale() {
                return e.designPaper.scale || 1;
              },
              onStopDrag: function onStopDrag(t) {
                if (s.a.instance.changed)
                  o.a.event.trigger(
                    "hiprintTemplateDataChanged_" + n.templateId,
                    "框选移动"
                  );
                s.a.instance.draging = !1;
                s.a.instance.changed = !1;
              },
            }));
          if (t.ex >= t.bx && t.ey >= t.by) {
            // 终点大于起点
            this.mouseRect.target.css({
              height: t.maxY - t.minY + "px",
              width: t.maxX - t.minX + "px",
              left: t.lastLeft / ptr + "pt",
              top: t.lastTop / ptr + "pt",
              transform: "unset",
            });
          } else if (t.ex < t.bx && t.ey < t.by) {
            this.mouseRect.target.css({
              height: t.maxY - t.minY + "px",
              width: t.maxX - t.minX + "px",
              left: t.lastLeft / ptr + "pt",
              top: t.lastTop / ptr + "pt",
              transform: "rotate(180deg)",
              "transform-origin": "0 0",
            });
            // 左下角
          } else if (t.ex < t.bx && t.ey > t.by) {
            this.mouseRect.target.css({
              height: t.maxY - t.minY + "px",
              width: t.maxX - t.minX + "px",
              left: t.lastLeft / ptr + "pt",
              top: t.lastTop / ptr + "pt",
              transform: "rotateY(180deg)",
              "transform-origin": "0 0",
            });
          } else if (t.ex > t.bx && t.ey < t.by) {
            this.mouseRect.target.css({
              height: t.maxY - t.minY + "px",
              width: t.maxX - t.minX + "px",
              left: t.lastLeft / ptr + "pt",
              top: t.lastTop / ptr + "pt",
              transform: "rotateX(180deg)",
              "transform-origin": "0 0",
            });
          }
          t.target.focus();
        }),
        (t.prototype.bingKeyboardMoveEvent = function (t) {
          var e = this;
          t.attr("tabindex", "1"),
            t.keydown(function (t) {
              e.mouseRect.mouseRectSelectedElement ||
                (e.mouseRect.mouseRectSelectedElement = e.getElementInRect(
                  e.mouseRect
                ));
              var n = e.mouseRect.mouseRectSelectedElement || [];

              switch (t.keyCode) {
                case 37:
                  e.mouseRect.updatePositionByMultipleSelect(
                    0 - p.a.instance.movingDistance,
                    0
                  ),
                    n.forEach(function (t) {
                      t.updatePositionByMultipleSelect(
                        0 - p.a.instance.movingDistance,
                        0
                      );
                    }),
                    t.preventDefault();
                  break;

                case 38:
                  e.mouseRect.updatePositionByMultipleSelect(
                    0,
                    0 - p.a.instance.movingDistance
                  ),
                    n.forEach(function (t) {
                      t.updatePositionByMultipleSelect(
                        0,
                        0 - p.a.instance.movingDistance
                      );
                    }),
                    t.preventDefault();
                  break;

                case 39:
                  e.mouseRect.updatePositionByMultipleSelect(
                    p.a.instance.movingDistance,
                    0
                  ),
                    n.forEach(function (t) {
                      t.updatePositionByMultipleSelect(
                        p.a.instance.movingDistance,
                        0
                      );
                    }),
                    t.preventDefault();
                  break;

                case 40:
                  e.mouseRect.updatePositionByMultipleSelect(
                    0,
                    p.a.instance.movingDistance
                  ),
                    n.forEach(function (t) {
                      t.updatePositionByMultipleSelect(
                        0,
                        p.a.instance.movingDistance
                      );
                    }),
                    t.preventDefault();
              }
              if ([37, 38, 39, 40].includes(t.keyCode)) {
                o.a.event.trigger(
                  "hiprintTemplateDataChanged_" + e.templateId,
                  "框选移动"
                );
              }
            });
        }),
        t
      );
    })(),
    st = (function () {
      return function (t) {
        if (t)
          if (t.panels) {
            this.panels = [];

            for (var e = 0; e < t.panels.length; e++) {
              this.panels.push(new rt(t.panels[e]));
            }
          } else this.panels = [];
      };
    })(),
    lt = n(9),
    ut = (function () {
      function t(t, e) {
        var n = this;
        (this.printElementOptionSettingPanel = {}),
          (this.printTemplate = t),
          (this.settingContainer = $(e)),
          o.a.event.on(t.getPrintElementSelectEventKey(), function (t) {
            n.buildSetting(t);
          }),
          o.a.event.on(t.getBuildCustomOptionSettingEventKey(), function (t) {
            n.buildSettingByCustomOptions(t);
          }),
          o.a.event.on("clearSettingContainer", function () {
            n.clearSettingContainer();
          });
      }

      return (
        (t.prototype.init = function () {}),
        (t.prototype.clearSettingContainer = function () {
          this.clearLastPrintElement(), this.settingContainer.html("");
        }),
        (t.prototype.clearLastPrintElement = function () {
          if (this.lastPrintElement) {
            if (this.lastPrintElement._editing) {
              this.lastPrintElement.updateByContent(true);
            }
            if (this.lastPrintElement._printElementOptionTabs) {
              this.lastPrintElement._printElementOptionTabs.forEach(function (
                t
              ) {
                t.list &&
                  t.list.forEach(function (e) {
                    e.destroy();
                  });
              });
            }
            if (this.lastPrintElement._printElementOptionItems) {
              this.lastPrintElement._printElementOptionItems.forEach(function (
                t
              ) {
                t.destroy();
              });
            }
          }
          this.lastPrintElement = void 0;
        }),
        (t.prototype.buildSetting = function (t) {
          var e = this,
            n = this,
            i = t.printElement,
            o = t.customOptionsInput;
          var tabs = i.getPrintElementOptionTabs();
          e.clearSettingContainer();
          var r;
          if (tabs.length) {
            r = $(
              '<div class="prop-tabs"><ul class="prop-tab-items"></ul></div>'
            );
            tabs
              .filter(
                (e, idx) => e.list.length > 0 || (idx == 2 && o && o.length)
              )
              .forEach(function (tab) {
                var item = $(
                  '<li class="prop-tab-item"><span class="tab-title">' +
                    i18n.__(tab.name) +
                    "</span></li>"
                );
                r.find(".prop-tab-items").append(item);
                var options = $(
                  '<div class="hiprint-option-items" data-title="' +
                    i18n.__(tab.name) +
                    '"></div>'
                );
                tab.list.forEach(function (t) {
                  t.submit = function (t) {
                    i.submitOption();
                  };
                  var n = t.createTarget(i, i.options, i.printElementType);
                  (e.printElementOptionSettingPanel[t.name] = n),
                    options.append(n);
                  // 貌似只有这两个才需要多个参数
                  if (["columns", "dataType"].includes(t.name)) {
                    t.setValue(
                      i.options[t.name],
                      i.options,
                      i.printElementType
                    );
                  } else {
                    // 传入所有参数
                    if (["coordinate", "widthHeight"].includes(t.name)) {
                      t.setValue(i.options, i);
                    } else {
                      // options 没有就取 printElementType内的 (如 table 的 footerFormatter)
                      t.setValue(
                        i.options[t.name] || i.printElementType[t.name]
                      );
                    }
                  }
                  n.find("textarea").bind(
                    "dblclick.textarea",
                    function (event) {
                      if (!$(this).val()) {
                        var placeholder = event.target.placeholder || "";
                        $(this).val(placeholder);
                      }
                    }
                  );
                });
                if (tab.list.length == 0 && o && o.length) {
                  o.forEach(function (t) {
                    var n2 = t.callback;
                    t.callback = function (t) {
                      n2 && n2(t);
                    };
                    var tableColumn = t.optionItems;
                    t.title &&
                      options.append(
                        '<div class="hiprint-option-item hiprint-option-item-row">\n            <div class="hiprint-option-item-label hiprint-option-title">\n              ' +
                          t.title +
                          "\n            </div>\n        </div>"
                      );
                    tableColumn.forEach(function (e) {
                      (e.submit = function (e) {
                        t.callback(n.getValueByOptionItems(tableColumn));
                      }),
                        options.append(
                          e.createTarget(n.printTemplate, t.options, void 0)
                        ),
                        e.setValue(t.options[e.name], t.options, void 0);
                    });
                    options.find(".auto-submit").change(function () {
                      t.callback(n.getValueByOptionItems(tableColumn));
                    });
                    options
                      .find(".auto-submit:input")
                      .bind("keydown.submitOption", function (e) {
                        13 === e.keyCode &&
                          t.callback(n.getValueByOptionItems(tableColumn));
                      });
                    options
                      .find("textarea")
                      .bind("dblclick.textarea", function (event) {
                        if (!$(this).val()) {
                          var placeholder = event.target.placeholder || "";
                          $(this).val(placeholder);
                        }
                      });
                  });
                }
                r.append(options);
              });
          } else {
            r = $('<div class="hiprint-option-items"></div>');
            i.getPrintElementOptionItems().forEach(function (t) {
              t.submit = function (t) {
                i.submitOption();
              };

              var n = t.createTarget(i, i.options, i.printElementType);
              (e.printElementOptionSettingPanel[t.name] = n), r.append(n);
              // 貌似只有这两个才需要多个参数
              if (["columns", "dataType"].includes(t.name)) {
                t.setValue(i.options[t.name], i.options, i.printElementType);
              } else {
                // 传入所有参数
                if (["coordinate", "widthHeight"].includes(t.name)) {
                  t.setValue(i.options, i);
                } else {
                  // options 没有就取 printElementType内的 (如 table 的 footerFormatter)
                  t.setValue(i.options[t.name] || i.printElementType[t.name]);
                }
              }
            });
          }
          var a = $(
              `<button class="hiprint-option-item-settingBtn hiprint-option-item-submitBtn"\n        type="button">${i18n.__(
                "确定"
              )}</button>`
            ),
            p = $(
              `<button  class="hiprint-option-item-settingBtn hiprint-option-item-deleteBtn"\n        type="button">${i18n.__(
                "删除"
              )}</button>`
            );
          r.append(a);
          i.options.draggable != false && r.append(p); // draggable 为 false 时不显示参数面板 删除 按钮
          if (tabs.length) {
            r.on("click", ".prop-tab-item", function () {
              var $li = $(this);
              var index = $li.index();
              // 上次点击tab的index
              e.settingContainer.data("last-index", index);
              $li.addClass("active");
              $li.siblings().removeClass("active");
              var options = r.find(".hiprint-option-items:eq(" + index + ")");
              options.addClass("active");
              options.siblings().removeClass("active");
            });
            var lastIndex = +(e.settingContainer.data("last-index") || 0);
            if (lastIndex >= tabs.length) {
              lastIndex = 0;
            }
            r.find(".prop-tab-item:eq(" + lastIndex + ")").click();
          }
          a.bind("click.submitOption", function () {
            i.submitOption();
          }),
            p.bind("click.deleteBtn", function () {
              hinnn.event.trigger(
                "hiprintTemplateDataChanged_" + i.templateId,
                "删除"
              );
              n.printTemplate.deletePrintElement(i);
              e.clearSettingContainer();
            }),
            r.find(".auto-submit").change(function (t) {
              i.submitOption();
            }),
            r
              .find(".auto-submit:input")
              .bind("keydown.submitOption", function (t) {
                13 == t.keyCode && i.submitOption();
              }),
            this.settingContainer.append(r),
            tabs.length < 1 &&
              o &&
              o.forEach(function (t) {
                var n = t.callback;
                (t.callback = function (t) {
                  n && (n(t), i.submitOption());
                }),
                  e.buildSettingByCustomOptions(t, e.settingContainer);
              }),
            (this.lastPrintElement = i);
        }),
        (t.prototype.buildSettingByCustomOptions = function (t, e) {
          var n = this;
          this.clearLastPrintElement();
          var i = e || this.settingContainer;
          e || this.settingContainer.html("");
          var o = [],
            supportOptions = p.a.instance.panel.supportOptions
              .filter(function (t) {
                return !t.hidden;
              })
              .map(function (e) {
                return e.name;
              });
          t.optionItems
            ? (o = t.optionItems)
            : Object.keys(t.options)
                .filter(function (t) {
                  return supportOptions.includes(t);
                })
                .forEach(function (t) {
                  var e = lt.a.getItem(t);
                  e && o.push(e);
                });
          var r = $('<div class="hiprint-option-items"></div>');
          t.title &&
            r.append(
              '<div class="hiprint-option-item hiprint-option-item-row">\n            <div class="hiprint-option-item-label hiprint-option-title">\n              ' +
                t.title +
                "\n            </div>\n        </div>"
            ),
            o.forEach(function (e) {
              (e.submit = function (e) {
                t.callback(n.getValueByOptionItems(o));
              }),
                r.append(e.createTarget(n.printTemplate, t.options, void 0)),
                e.setValue(t.options[e.name], t.options, void 0);
            });
          var a = $(
            `<button class="hiprint-option-item-settingBtn hiprint-option-item-submitBtn"\n        type="button">${i18n.__(
              "确定"
            )}</button>`
          );
          r.append(a),
            a.bind("click.submitOption", function () {
              t.callback(n.getValueByOptionItems(o));
            }),
            r.find(".auto-submit").change(function (e) {
              t.callback(n.getValueByOptionItems(o));
            }),
            r
              .find(".auto-submit:input")
              .bind("keydown.submitOption", function (e) {
                13 == e.keyCode && t.callback(n.getValueByOptionItems(o));
              }),
            i.append(r);
        }),
        (t.prototype.getValueByOptionItems = function (t) {
          var e = {};
          return (
            t.forEach(function (t) {
              e[t.name] = t.getValue();
            }),
            e
          );
        }),
        t
      );
    })(),
    dt = (function () {
      function t(t, e) {
        (this.paginationContainer = t),
          (this.jqPaginationContainer = $(this.paginationContainer)),
          (this.template = e);
      }

      return (
        (t.prototype.buildPagination = function (t) {
          var e = this.template.getPaneltotal(),
            n = this;
          this.jqPaginationContainer.html("");

          for (
            var i = $('<ul class="hiprint-pagination"></ul>'),
              o = function o() {
                var t = r,
                  name = n.template.printPanels[t].name || t + 1,
                  e = $(
                    "<li><span>" +
                      name +
                      '</span><a href="javascript:void(0);">x</a></li>'
                  );
                e.find("span").click(function () {
                  n.template.selectPanel(t),
                    e.siblings().removeClass("selected"),
                    $(this).parent("li").addClass("selected");
                }),
                  e.find("a").click(function () {
                    n.template.deletePanel(t), n.buildPagination();
                  }),
                  i.append(e);
              },
              r = 0;
            r < e;
            r++
          ) {
            o();
          }

          var a = $("<li><span>+</span></li>");
          i.append(a),
            this.jqPaginationContainer.append(i),
            a.click(function () {
              var createPanel = function (t) {
                n.template.addPrintPanel(t || void 0, !0), n.buildPagination();
                $(".hiprint-pagination li").removeClass("selected");
                $(".hiprint-pagination li:nth-last-child(2)").addClass(
                  "selected"
                );
              };
              if (n.template.onPanelAddClick) {
                var panel = {
                  index: n.template.printPanels.length,
                  paperType: "A4",
                };
                n.template.onPanelAddClick(panel, createPanel);
              } else {
                createPanel();
              }
            });
        }),
        (t.prototype.selectPanel = function (idx) {
          var i = idx || this.template.editingPanel.index;
          var li = $(".hiprint-pagination li:nth(" + i + ")");
          if (li.length) {
            li.siblings().removeClass("selected");
            li.addClass("selected");
          }
          hinnn.event.trigger(
            "onSelectPanel",
            this.template.editingPanel,
            i,
            li
          );
        }),
        t
      );
    })(),
    ct = (function () {
      function t(t) {
        var e = this;
        (this.tempimageBase64 = {}),
          (this.id = s.a.instance.guid()),
          s.a.instance.setPrintTemplateById(this.id, this);
        var n = t || {};
        this.printPanels = [];
        this.dataMode = n.dataMode || 1;
        this.history = n.history != void 0 ? n.history : !0;
        this.willOutOfBounds =
          n.willOutOfBounds != void 0 ? n.willOutOfBounds : !0;
        this.onDataChanged = n.onDataChanged;
        this.onUpdateError = n.onUpdateError;
        this.lastJson = n.template || {};
        this.historyList = [
          { id: s.a.instance.guid(), type: "初始", json: this.lastJson },
        ];
        this.historyPos = 0;
        this.defaultPanelName = n.defaultPanelName;
        this.designOptions = {};
        this.qtDesigner = n.qtDesigner != void 0 ? n.qtDesigner : !0;
        this.qtDesignerMap = {};
        this.qtDesignderFunction = function (field) {
          this.qtDesignerMap = {};
          const fieldTitle = field.split("_")[0];
          for (const item of this.editingPanel.printElements) {
            if (item.options.field === void 0) {
              continue;
            }
            const renderKey = item.options.field.split("_")[0];
            if (this.qtDesignerMap[renderKey] === void 0) {
              this.qtDesignerMap[renderKey] = 1;
            } else {
              this.qtDesignerMap[renderKey] += 1;
            }
          }
          if (
            this.qtDesignerMap[fieldTitle] === 0 ||
            this.qtDesignerMap[fieldTitle] === void 0
          ) {
            return fieldTitle;
          } else {
            return fieldTitle + "_" + this.qtDesignerMap[fieldTitle];
          }
        };
        var i = new st(n.template || []);
        n.template &&
          i.panels.forEach(function (t) {
            e.printPanels.push(new pt(t, e.id));
          }),
          n.fontList && (this.fontList = n.fontList),
          n.fields && (this.fields = n.fields),
          n.onImageChooseClick &&
            (this.onImageChooseClick = n.onImageChooseClick),
          n.onPanelAddClick && (this.onPanelAddClick = n.onPanelAddClick),
          n.settingContainer && new ut(this, n.settingContainer),
          n.paginationContainer &&
            ((this.printPaginationCreator = new dt(
              n.paginationContainer,
              this
            )),
            this.printPaginationCreator.buildPagination()),
          this.initAutoSave();
      }

      return (
        (t.prototype.design = function (t, e) {
          var n = this;

          if ((e || (e = {}), 0 == this.printPanels.length)) {
            var i = this.createDefaultPanel();
            this.printPanels.push(i);
          }

          if (!t) throw new Error("options.container can not be empty");
          n.designOptions = e;
          this.createContainer(t),
            this.printPanels.forEach(function (t, i) {
              n.container.append(t.getTarget()),
                i > 0 && t.disable(),
                t.design(e);
            }),
            this.selectPanel(0);
        }),
        (t.prototype.getSimpleHtml = function (t, e) {
          var n = this;
          e || (e = {});
          var i = $('<div class="hiprint-printTemplate"></div>');
          t && t.constructor === Array
            ? t.forEach(function (data, dataIndex) {
                data &&
                  n.printPanels.forEach(function (n, o) {
                    i.append(n.getHtml(data, e));
                    // 批量打印 续排页码
                    if (dataIndex == t.length - 1) {
                      delete hinnn._paperList;
                    }
                  });
              })
            : this.printPanels.forEach(function (panel, panelIndex) {
                i.append(panel.getHtml(t, e));
                // 多面板打印 续排页码
                if (panelIndex == n.printPanels.length - 1) {
                  delete hinnn._paperList;
                }
              });
          return e && e.imgToBase64 && this.transformImg(i.find("img")), i;
        }),
        (t.prototype.getSimpleHtmlAsync = function (dataItemOrList, e) {
          return new Promise((resolve) => {
            var that = this;
            e || (e = {});
            let rootElement = $('<div class="hiprint-printTemplate"></div>');
            // 将数据转换成列表处理，简化代码
            const dataList = Array.isArray(dataItemOrList)
              ? dataItemOrList
              : [dataItemOrList];
            // 生成参数列表，用于后续递归
            const paramsListToCreateHTML = [];
            dataList.forEach(function (data, dataIndex) {
              data &&
                that.printPanels.forEach(function (panel, o) {
                  paramsListToCreateHTML.push([panel, data, e]);
                });
            });

            function appendElementByParamsList(
              paramsListToCreateHTML,
              onFinish
            ) {
              if (!paramsListToCreateHTML.length) return onFinish();
              const [panel, data, e] = paramsListToCreateHTML.shift();
              rootElement.append(panel.getHtml(data, e));
              // 每次生成Html之间留一些间隔，默认10，通过generateHTMLInterval字段控制
              console.log("e.generateHTMLInterval", e.generateHTMLInterval);
              setTimeout(
                () =>
                  appendElementByParamsList(paramsListToCreateHTML, onFinish),
                e.generateHTMLInterval ?? 10
              );
            }

            function onFinish() {
              delete hinnn._paperList;
              e && e.imgToBase64 && that.transformImg(rootElement.find("img"));
              resolve(rootElement);
            }

            appendElementByParamsList(paramsListToCreateHTML, onFinish);
          });
        }),
        (t.prototype.getHtml = function (t, e) {
          return t || (t = {}), this.getSimpleHtml(t, e);
        }),
        (t.prototype.getHtmlAsync = function (t, e) {
          // 分解生成HTML任务，留下空隙发送socket信息，避免断开连接
          return t || (t = {}), this.getSimpleHtmlAsync(t, e);
        }),
        (t.prototype.getJointHtml = function (t, e, n) {
          var i = $('<div class="hiprint-printTemplate"></div>'),
            o = [];
          return (
            this.printPanels.forEach(function (r, a) {
              i.append(r.getHtml(t, e, o, void 0, n));
            }),
            i
          );
        }),
        (t.prototype.setPaper = function (t, e) {
          if (/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(t))
            this.editingPanel.resize(void 0, parseFloat(t), parseFloat(e), !1);
          else {
            var n = s.a.instance[t];
            if (!n) throw new Error("not found pagetype:" + (t || ""));
            this.editingPanel.resize(t, n.width, n.height, !1);
          }
        }),
        (t.prototype.rotatePaper = function () {
          this.editingPanel.rotatePaper();
        }),
        (t.prototype.zoom = function (s, p) {
          this.editingPanel.zoom(s, p);
        }),
        (t.prototype.addPrintPanel = function (t, e) {
          var n = t ? new pt(new rt(t), this.id) : this.createDefaultPanel();
          return (
            t && (t.index = this.printPanels.length),
            e &&
              (this.container.append(n.getTarget()),
              n.design(this.designOptions)),
            this.printPanels.push(n),
            e && this.selectPanel(n.index),
            n
          );
        }),
        (t.prototype.selectPanel = function (t) {
          var e = this;
          if (t > e.printPanels.length - 1) t = e.printPanels.length - 1;
          this.printPanels.forEach(function (n, i) {
            t == i
              ? (n.enable(),
                (e.editingPanel = n),
                e.printPaginationCreator &&
                  e.printPaginationCreator.selectPanel(t))
              : n.disable();
          });
        }),
        (t.prototype.deletePanel = function (t) {
          this.printPanels[t].clear(),
            this.printPanels[t].getTarget().remove(),
            this.printPanels.splice(t, 1);
        }),
        (t.prototype.getPaneltotal = function () {
          return this.printPanels.length;
        }),
        (t.prototype.createDefaultPanel = function () {
          return new pt(
            new rt({
              index: this.printPanels.length,
              name: this.defaultPanelName,
              paperType: "A4",
            }),
            this.id
          );
        }),
        (t.prototype.createContainer = function (t) {
          t
            ? ((this.container = $(t)),
              this.container.addClass("hiprint-printTemplate"))
            : (this.container = $('<div class="hiprint-printTemplate"></div>'));
        }),
        (t.prototype.getJsonTid = function () {
          var t = [];
          return (
            this.printPanels.forEach(function (e) {
              e.getPanelEntity().printElements.length &&
                t.push(e.getPanelEntity());
            }),
            new st({
              panels: t,
            })
          );
        }),
        (t.prototype.getJson = function () {
          var t = [];
          return (
            this.printPanels.forEach(function (e) {
              t.push(e.getPanelEntity(!0));
            }),
            new st({
              panels: t,
            })
          );
        }),
        (t.prototype.undo = function (t) {
          o.a.event.trigger(
            "hiprintTemplateDataShortcutKey_" + this.id,
            "undo"
          );
        }),
        (t.prototype.redo = function (t) {
          o.a.event.trigger(
            "hiprintTemplateDataShortcutKey_" + this.id,
            "redo"
          );
        }),
        (t.prototype.getPrintElementSelectEventKey = function () {
          return "PrintElementSelectEventKey_" + this.id;
        }),
        (t.prototype.getBuildCustomOptionSettingEventKey = function () {
          return "BuildCustomOptionSettingEventKey_" + this.id;
        }),
        (t.prototype.clear = function () {
          this.printPanels.forEach(function (t) {
            if ((t.clear(), t.index > 0)) {
              var e = t.getTarget();
              e && e.length && e.remove();
            }
          }),
            (this.printPanels = [this.printPanels[0]]),
            this.printPaginationCreator &&
              this.printPaginationCreator.buildPagination();
        }),
        (t.prototype.getPaperType = function (t) {
          return null == t && (t = 0), this.printPanels[0].paperType;
        }),
        (t.prototype.getOrient = function (t) {
          return (
            null == t && (t = 0),
            this.printPanels[t].height > this.printPanels[t].width ? 1 : 2
          );
        }),
        (t.prototype.getPrintStyle = function (t) {
          return this.printPanels[t].getPrintStyle();
        }),
        (t.prototype.print = function (t, e, o) {
          t || (t = {}), this.getHtml(t, e).hiwprint(o);
        }),
        (t.prototype.print2 = function (t, e) {
          if ((t || (t = {}), e || (e = {}), this.clientIsOpened())) {
            var n = this,
              i = 0,
              o = {},
              r = $('link[media=print][href*="print-lock"]'),
              css = "";
            if (e.styleHandler) {
              css += e.styleHandler();
            }
            if (r.length <= 0) {
              throw new Error(
                '请在 入口文件(index.html) 中引入 print-lock.css. 注意: link[media="print"]'
              );
              return;
            }
            r.each(function (a, p) {
              var s = new XMLHttpRequest();
              s.open("GET", $(p).attr("href")),
                (s.onreadystatechange = function () {
                  if (
                    4 === s.readyState &&
                    200 === s.status &&
                    ((o[a + ""] =
                      '<style rel="stylesheet" type="text/css">' +
                      s.responseText +
                      "</style>"),
                    ++i == r.length)
                  ) {
                    for (var p = "", l = 0; l < r.length; l++) {
                      p += o[l + ""];
                    }
                    if (css) p = css + p;
                    n.sentToClient(p, t, e);
                  }
                }),
                s.send();
            });
          } else alert(`${i18n.__("连接客户端失败")}`);
        }),
        (t.prototype.imageToBase64 = function (t) {
          var e = $(t).attr("src");
          if (-1 == e.indexOf("base64"))
            try {
              if (!this.tempimageBase64[e]) {
                var n = document.createElement("canvas"),
                  i = new Image();
                (i.src = t.attr("src")),
                  (n.width = i.width),
                  (n.height = i.height),
                  n.getContext("2d").drawImage(i, 0, 0),
                  e && (this.tempimageBase64[e] = n.toDataURL("image/png"));
              }

              t.attr("src", this.tempimageBase64[e]);
            } catch (e) {
              try {
                this.xhrLoadImage(t);
              } catch (t) {
                console.log(t);
              }
            }
        }),
        (t.prototype.xhrLoadImage = function (t) {}),
        (t.prototype.sentToClient = function (t, e, n) {
          e || (e = {});
          var i = $.extend({}, n || {});
          i.imgToBase64 = i.imgToBase64 ?? false;
          if (i.printByFragments) {
            // 分批打印
            this.getHtmlAsync(e, i).then((rootElement) => {
              var o = t + rootElement[0].outerHTML;
              (i.id = s.a.instance.guid()),
                (i.html = o),
                (i.templateId = this.id),
                hiwebSocket.sendByFragments(i, n);
            });
          } else {
            // 同步打印
            var o = t + this.getHtml(e, i)[0].outerHTML;
            (i.id = s.a.instance.guid()),
              (i.html = o),
              (i.templateId = this.id),
              hiwebSocket.send(i);
          }
        }),
        (t.prototype.printByHtml = function (t) {
          $(t).hiwprint();
        }),
        (t.prototype.printByHtml2 = function (t, e) {
          if ((e || (e = {}), this.clientIsOpened())) {
            var n = this,
              i = 0,
              o = {},
              r = $('link[media=print][href*="print-lock"]');
            if (r.length <= 0) {
              throw new Error(
                '请在 入口文件(index.html) 中引入 print-lock.css. 注意: link[media="print"]'
              );
              return;
            }
            r.each(function (a, p) {
              var l = new XMLHttpRequest();
              l.open("GET", $(p).attr("href")),
                (l.onreadystatechange = function () {
                  if (
                    4 === l.readyState &&
                    200 === l.status &&
                    ((o[a + ""] =
                      '<style rel="stylesheet" type="text/css">' +
                      l.responseText +
                      "</style>"),
                    ++i == r.length)
                  ) {
                    for (var p = "", u = 0; u < r.length; u++) {
                      p += o[u + ""];
                    }

                    var d = p + $(t)[0].outerHTML,
                      c = $.extend({}, e || {});
                    (c.id = s.a.instance.guid()),
                      (c.html = d),
                      (c.templateId = n.id),
                      hiwebSocket.send(c);
                  }
                }),
                l.send();
            });
          } else alert(`${i18n.__("连接客户端失败")}`);
        }),
        (t.prototype.deletePrintElement = function (t) {
          this.printPanels.forEach(function (e) {
            e.deletePrintElement(t);
          });
        }),
        (t.prototype.transformImg = function (t) {
          var e = this;
          t.map(function (t, n) {
            e.imageToBase64($(n));
          });
        }),
        (t.prototype.toPdf = function (t, e, options) {
          var i = this;
          var dtd = $.Deferred();
          var isDownload = true;
          if (this.printPanels.length) {
            var r = o.a.mm.toPt(this.printPanels[0].width),
              a = o.a.mm.toPt(this.printPanels[0].height),
              p = $.extend(
                {
                  scale: 2,
                  width: o.a.pt.toPx(r),
                  x: 0,
                  y: 0,
                  useCORS: !0,
                },
                options || {}
              ),
              s = new jsPDF({
                orientation: 1 == this.getOrient(0) ? "portrait" : "landscape",
                unit: "pt",
                format: this.printPanels[0].paperType
                  ? this.printPanels[0].paperType.toLocaleLowerCase()
                  : [r, a],
              }),
              l = this.getHtml(t, options);
            if (options && undefined != options.isDownload) {
              isDownload = options.isDownload;
            }
            this.createTempContainer();
            var u = this.getTempContainer();
            this.svg2canvas(l), u.html(l[0]);
            var d = u.find(".hiprint-printPanel .hiprint-printPaper").length;
            $(l).css("position:fixed"),
              html2canvas(l[0], p).then(function (t) {
                var n = t.getContext("2d");
                (n.mozImageSmoothingEnabled = !1),
                  (n.webkitImageSmoothingEnabled = !1),
                  (n.msImageSmoothingEnabled = !1),
                  (n.imageSmoothingEnabled = !1);

                for (var o = t.toDataURL("image/jpeg"), p = 0; p < d; p++) {
                  s.addImage(o, "JPEG", 0, 0 - p * a, r, d * a),
                    p < d - 1 && s.addPage();
                }
                if (isDownload) {
                  i.removeTempContainer(),
                    e.indexOf(".pdf") > -1 ? s.save(e) : s.save(e + ".pdf");
                } else {
                  i.removeTempContainer();
                  let type = options.type || "blob";
                  var pdfFile = s.output(type);
                  dtd.resolve(pdfFile);
                }
              });
          }
          return dtd.promise();
        }),
        (t.prototype.createTempContainer = function () {
          this.removeTempContainer(),
            $("body").prepend(
              $(
                '<div class="hiprint_temp_Container" style="overflow:hidden;height: 0px;box-sizing: border-box;"></div>'
              )
            );
        }),
        (t.prototype.removeTempContainer = function () {
          $(".hiprint_temp_Container").remove();
        }),
        (t.prototype.getTempContainer = function () {
          return $(".hiprint_temp_Container");
        }),
        (t.prototype.svg2canvas = function (t) {
          var that = this;
          t.find("svg").each(function (t, e) {
            var n = e.parentNode,
              p = that.parentWidthHeight(n),
              i = document.createElement("canvas");
            (i.width = p.width), (i.height = p.height);
            var ctx = i.getContext("2d"),
              str = new XMLSerializer().serializeToString(e);
            Canvg.fromString(ctx, str).render(),
              $(e).before(i),
              n.removeChild(e);
          });
        }),
        (t.prototype.parentWidthHeight = function (t) {
          if (t.style.width.endsWith("%") || t.style.height.endsWith("%")) {
            if (t.className != "hiprint-printPaper-content") {
              return this.parentWidthHeight(t.parentNode);
            }
            return { width: 10, height: 10 };
          } else {
            return {
              width: o.a.pt.toPx(parseFloat(t.style.width)),
              height: o.a.pt.toPx(parseFloat(t.style.height)),
            };
          }
        }),
        (t.prototype.on = function (t, e) {
          o.a.event.clear(t + "_" + this.id);
          o.a.event.on(t + "_" + this.id, e);
        }),
        (t.prototype.clientIsOpened = function () {
          return hiwebSocket.opened;
        }),
        (t.prototype.getPrinterList = function () {
          var t = hiwebSocket.getPrinterList();
          return t || [];
        }),
        (t.prototype.getElementByTid = function (t, e) {
          return null == e && (e = 0), this.printPanels[e].getElementByTid(t);
        }),
        (t.prototype.getElementByName = function (t, e) {
          return null == e && (e = 0), this.printPanels[e].getElementByName(t);
        }),
        (t.prototype.getPanel = function (t) {
          return null == t && (t = 0), this.printPanels[t];
        }),
        (t.prototype.loadAllImages = function (t, e, n) {
          var i = this;
          null == n && (n = 0);

          for (
            var o = t[0].getElementsByTagName("img"), r = !0, a = 0;
            a < o.length;
            a++
          ) {
            var p = o[a];
            p.src &&
              p.src !== window.location.href &&
              -1 == p.src.indexOf("base64") &&
              ((p &&
                void 0 !== p.naturalWidth &&
                0 !== p.naturalWidth &&
                p.complete) ||
                (r = !1));
          }

          n++,
            !r && n < 10
              ? setTimeout(function () {
                  i.loadAllImages(t, e, n);
                }, 500)
              : e();
        }),
        (t.prototype.setFontList = function (t) {
          this.fontList = t;
        }),
        (t.prototype.getFontList = function () {
          return this.fontList;
        }),
        (t.prototype.setFields = function (t) {
          this.fields = t;
        }),
        (t.prototype.getFields = function () {
          return this.fields;
        }),
        (t.prototype.setOnImageChooseClick = function (t) {
          this.onImageChooseClick = t;
        }),
        (t.prototype.getOnImageChooseClick = function () {
          return this.onImageChooseClick;
        }),
        (t.prototype.getFieldsInPanel = function () {
          var t = [];
          return (
            this.printPanels.forEach(function (e) {
              t = t.concat(e.getFieldsInPanel());
            }),
            t
          );
        }),
        (t.prototype.getTestData = function () {
          var t = {};
          return (
            this.printPanels.forEach(function (e) {
              t = Object.assign(t, e.getTestData());
            }),
            t
          );
        }),
        (t.prototype.update = function (t, idx) {
          var e = this;
          try {
            if (t && "object" == _typeof(t) && t.panels.length > 0) {
              var curLen = e.printPanels.length - 1;
              t.panels.forEach(function (panel, index) {
                if (index > curLen) {
                  e.printPanels.push(new pt(panel, e.id));
                  var t = e.printPanels[index];
                  e.container.append(t.getTarget()),
                    index > 0 && t.disable(),
                    t.design(e.designOptions);
                  e.printPaginationCreator &&
                    e.printPaginationCreator.buildPagination();
                }
                var temp = new rt(panel);
                e.editingPanel = e.printPanels[index];
                e.editingPanel.update(temp);
              });
              e.selectPanel(idx || 0);
            }
          } catch (er) {
            console.log(er);
            e.onUpdateError && e.onUpdateError(er);
          }
        }),
        (t.prototype.getSelectEls = function () {
          var t = this;
          var elements = [];
          // 获取选区元素
          if (
            t.editingPanel.mouseRect &&
            t.editingPanel.mouseRect.target &&
            $(".mouseRect").length
          ) {
            elements = t.editingPanel.getElementInRect(
              t.editingPanel.mouseRect
            );
          } else {
            // 获取多选元素
            elements = t.editingPanel.printElements.filter(function (el) {
              return (
                "block" == el.designTarget.children().last().css("display") &&
                !el.printElementType.type.includes("table")
              );
            });
          }
          return elements;
        }),
        (t.prototype.selectElementsByField = function (fieldsArray) {
          var hiPrintEntity = this;
          var t = $;
          hiPrintEntity.editingPanel.printElements.forEach((e, index) => {
            if (fieldsArray && fieldsArray.includes(e.options.field)) {
              let designTarget = e.designTarget;
              designTarget.children("div[panelindex]").addClass("selected");
              designTarget.children().last().css({
                display: "block",
              });
              designTarget = designTarget[0];
              t.data(
                designTarget,
                "hidraggable"
              ).options.onBeforeSelectAllDrag.call(designTarget, {});
            }
          });
        }),
        (t.prototype.selectAllElements = function () {
          var hiPrintEntity = this;
          var t = $;
          hiPrintEntity.editingPanel.printElements.forEach((e, index) => {
            let designTarget = e.designTarget;
            designTarget.children("div[panelindex]").addClass("selected");
            designTarget.children().last().css({
              display: "block",
            });
            designTarget = designTarget[0];
            t.data(
              designTarget,
              "hidraggable"
            ).options.onBeforeSelectAllDrag.call(designTarget, {});
          });
        }),
        (t.prototype.updateOption = function (option, v) {
          // 批量更新参数
          var elements = this.getSelectEls();
          if (elements && elements.length) {
            elements.forEach(function (e) {
              e.updateOption(option, v, true);
            });
            o.a.event.trigger(
              "hiprintTemplateDataChanged_" + this.id,
              "批量修改"
            );
          }
        }),
        (t.prototype.setElsAlign = function (e) {
          // 设置框选、多选元素对齐api
          var t = this;
          var elements = this.getSelectEls();
          if (elements.length) {
            var minLeft = Math.min.apply(
              null,
              elements.map(function (el) {
                return el.options.left;
              })
            );
            var maxRight = Math.max.apply(
              null,
              elements.map(function (el) {
                return el.options.left + el.options.width;
              })
            );
            var minTop = Math.min.apply(
              null,
              elements.map(function (el) {
                return el.options.top;
              })
            );
            var maxBottom = Math.max.apply(
              null,
              elements.map(function (el) {
                return el.options.top + el.options.height;
              })
            );
            switch (e) {
              case "left": // 左对齐
                elements.forEach(function (el) {
                  el.updateSizeAndPositionOptions(minLeft);
                  el.designTarget.css("left", el.options.displayLeft());
                });
                break;
              case "vertical": // 居中
                var vertical = minLeft + (maxRight - minLeft) / 2;
                elements.forEach(function (el) {
                  el.updateSizeAndPositionOptions(
                    vertical - el.options.width / 2
                  );
                  el.designTarget.css("left", el.options.displayLeft());
                });
                break;
              case "right": // 右对齐
                elements.forEach(function (el) {
                  el.updateSizeAndPositionOptions(maxRight - el.options.width);
                  el.designTarget.css("left", el.options.displayLeft());
                });
                break;
              case "top": // 顶部对齐
                elements.forEach(function (el) {
                  el.updateSizeAndPositionOptions(undefined, minTop);
                  el.designTarget.css("top", el.options.displayTop());
                });
                break;
              case "horizontal": // 垂直居中
                var horizontal = minTop + (maxBottom - minTop) / 2;
                elements.forEach(function (el) {
                  el.updateSizeAndPositionOptions(
                    undefined,
                    horizontal - el.options.height / 2
                  );
                  el.designTarget.css("top", el.options.displayTop());
                });
                break;
              case "bottom": //底部对齐
                elements.forEach(function (el) {
                  el.updateSizeAndPositionOptions(
                    undefined,
                    maxBottom - el.options.height
                  );
                  el.designTarget.css("top", el.options.displayTop());
                });
                break;
              case "distributeHor": // 横向分散
                var sumWidth = [].reduce.call(
                  elements,
                  function (total, el) {
                    return total + el.options.width;
                  },
                  0
                );
                var distributeHor =
                  (maxRight - minLeft - sumWidth) / (elements.length - 1);
                elements.sort(function (prev, curr) {
                  return prev.options.left - curr.options.left;
                });
                elements.forEach(function (el, index) {
                  if (![0, elements.length - 1].includes(index)) {
                    el.updateSizeAndPositionOptions(
                      elements[index - 1].options.left +
                        elements[index - 1].options.width +
                        distributeHor
                    );
                    el.designTarget.css("left", el.options.displayLeft());
                  }
                });
                break;
              case "distributeVer": // 纵向分散
                var sumHeight = [].reduce.call(
                  elements,
                  function (total, el) {
                    return total + el.options.height;
                  },
                  0
                );
                var distributeVer =
                  (maxBottom - minTop - sumHeight) / (elements.length - 1);
                elements.sort(function (prev, curr) {
                  return prev.options.top - curr.options.top;
                });
                elements.forEach(function (el, index) {
                  if (![0, elements.length - 1].includes(index)) {
                    el.updateSizeAndPositionOptions(
                      undefined,
                      elements[index - 1].options.top +
                        elements[index - 1].options.height +
                        distributeVer
                    );
                    el.designTarget.css("top", el.options.displayTop());
                  }
                });
                break;
            }
          }
        }),
        (t.prototype.setElsSpace = function (dis, isHor) {
          var t = this;
          var elements = this.getSelectEls();
          if (elements.length) {
            if (isHor) {
              // 水平距离 →
              elements.sort(function (prev, curr) {
                return prev.options.left - curr.options.left;
              });
              elements.forEach(function (el, index) {
                if (index > 0) {
                  el.updateSizeAndPositionOptions(
                    elements[index - 1].options.left +
                      elements[index - 1].options.width +
                      dis
                  );
                  el.designTarget.css("left", el.options.displayLeft());
                }
              });
            } else {
              // 垂直距离 ↓
              elements.sort(function (prev, curr) {
                return prev.options.top - curr.options.top;
              });
              elements.forEach(function (el, index) {
                if (index > 0) {
                  el.updateSizeAndPositionOptions(
                    undefined,
                    elements[index - 1].options.top +
                      elements[index - 1].options.height +
                      dis
                  );
                  el.designTarget.css("top", el.options.displayTop());
                }
              });
            }
          }
        }),
        (t.prototype.initAutoSave = function () {
          var t = this;
          o.a.event.on(
            "hiprintTemplateDataShortcutKey_" + this.id,
            function (key) {
              if (!t.history) return;
              switch (key) {
                case "undo":
                  if (t.historyPos > 0) {
                    t.historyPos -= 1;
                    var cur = t.historyList[t.historyPos];
                    t.update(cur.json);
                  }
                  break;
                case "redo":
                  if (t.historyPos < t.historyList.length - 1) {
                    t.historyPos += 1;
                    var cur = t.historyList[t.historyPos];
                    t.update(cur.json);
                  }
                  break;
              }
            }
          );
          o.a.event.on(
            "hiprintTemplateDataChanged_" + this.id,
            function (type) {
              if (t.history) {
                var j = 1 == t.dataMode ? t.getJson() : t.getJsonTid();
                t.lastJson = j;
                if (t.historyPos < t.historyList.length - 1) {
                  t.historyList = t.historyList.slice(0, t.historyPos + 1);
                }
                t.historyList.push({
                  id: s.a.instance.guid(),
                  type: type,
                  json: j,
                });
                if (t.historyList.length > 50) {
                  t.historyList = t.historyList
                    .slice(0, 1)
                    .concat(t.historyList.slice(1, 50));
                } else {
                  t.historyPos += 1;
                }
                t.onDataChanged && t.onDataChanged(type, j);
              }
            }
          );
        }),
        t
      );
    })();

  function ht(t) {
    this.getHtml(t).hiwprint();
  }

  function ft(t, e, n) {
    $.extend({}, t || {});
    t.imgToBase64 = t.imgToBase64 ?? false;
    var i = new ct({});
    i.on("printSuccess", e),
      i.on("printError", n),
      i.printByHtml2(this.getHtml(t), t.options);
  }

  function gt(t) {
    var e = void 0;
    return (
      t &&
        t.templates.forEach(function (n, i) {
          var o = $.extend({}, n.options || {});
          t.imgToBase64 && (o.imgToBase64 = o.imgToBase64 ?? false),
            e
              ? e.append(n.template.getHtml(n.data, o).html())
              : (e = n.template.getHtml(n.data, o));
        }),
      e
    );
  }

  function mt(t) {
    p.a.instance.init(t),
      p.a.instance.providers &&
        p.a.instance.providers.forEach(function (t) {
          t.addElementTypes(a.instance);
        });
    if (
      window.autoConnect &&
      (p.a.instance.host != hiwebSocket.host ||
        p.a.instance.token != hiwebSocket.token)
    ) {
      hiwebSocket.stop();
      p.a.instance.host && (hiwebSocket.host = p.a.instance.host);
      p.a.instance.token && (hiwebSocket.token = p.a.instance.token);
      hiwebSocket.start();
    }
    if (
      p.a.instance.lang &&
      Object.keys(languages).includes(p.a.instance.lang)
    ) {
      i18n.lang = p.a.instance.lang;
    } else {
      i18n.lang = "cn";
    }
  }

  function cig(t) {
    if (hiprint._config == void 0) {
      hiprint._config = JSON.stringify(window.HIPRINT_CONFIG);
    }
    const oldConfig = JSON.parse(hiprint._config);
    if (t) {
      t &&
        Object.keys(t).forEach(function (i) {
          if (i == "optionItems" && t.optionItems && t.optionItems.length) {
            p.a.instance.registerItems(t.optionItems);
          } else if (t[i].tabs && t[i].tabs.length) {
            t[i].tabs.forEach(function (tab, idx) {
              if (tab.replace) {
                $.extend(p.a.instance[i].tabs[idx], tab);
              } else {
                var options = tab.options || [],
                  list = oldConfig[i].tabs[idx].options;
                options &&
                  options.forEach(function (o) {
                    var idx = list.findIndex(function (e) {
                      return e.name == o.name;
                    });
                    if (idx > -1) list[idx].hidden = o.hidden;
                    else {
                      if (o.after) {
                        idx = list.findIndex(function (e) {
                          return e.name == o.after;
                        });
                        if (idx > -1) list.splice(idx + 1, 0, o);
                      } else list.push(o);
                    }
                  });
                $.extend(p.a.instance[i].tabs[idx], {
                  name: tab.name,
                  options: list,
                });
              }
            });
            delete t[i].tabs;
          } else if (t[i].supportOptions && t[i].supportOptions.length) {
            var options = t[i].supportOptions,
              list = oldConfig[i].supportOptions;
            options.forEach(function (o) {
              var idx = list.findIndex(function (e) {
                return e.name == o.name;
              });
              if (idx > -1) list[idx].hidden = o.hidden;
              else {
                if (o.after) {
                  idx = list.findIndex(function (e) {
                    return e.name == o.after;
                  });
                  if (idx > -1) list.splice(idx + 1, 0, o);
                } else list.push(o);
              }
            });
            $.extend(p.a.instance[i].supportOptions, list);
            delete t[i].supportOptions;
          } else {
            var keyMap = {};
            keyMap[i] = t[i];
            if (t[i].tabs && t[i].tabs.length == 0) {
              keyMap[i].supportOptions = oldConfig[i].supportOptions;
            }
            $.extend(p.a.instance, keyMap);
          }
        });
    } else {
      $.extend(p.a.instance, JSON.parse(hiprint._config));
    }
  }

  function uep(t, c) {
    return a.instance.updateElementType(t, c);
  }

  function rpl(c) {
    p.a.instance.clear("printerList");
    p.a.instance.on("printerList", c);
    hiwebSocket.refreshPrinterList();
  }

  function getClients(c) {
    p.a.instance.clear("clients");
    p.a.instance.on("clients", c);
    hiwebSocket.getClients();
  }

  function getClientInfo(c) {
    p.a.instance.clear("clientInfo");
    p.a.instance.on("getClientInfo", c);
    hiwebSocket.getClientInfo();
  }

  function getAddr(type, c, ...args) {
    p.a.instance.clear("address_" + type);
    p.a.instance.on("address_" + type, c);
    hiwebSocket.getAddress(type, ...args);
  }

  function ippPrint(options, callback, connected) {
    p.a.instance.clear("ippPrinterCallback");
    p.a.instance.on("ippPrinterCallback", callback);
    p.a.instance.clear("ippPrinterConnected");
    p.a.instance.on("ippPrinterConnected", connected);
    hiwebSocket.ippPrint(options);
  }

  function ippRequest(options, callback) {
    p.a.instance.clear("ippRequestCallback");
    p.a.instance.on("ippRequestCallback", callback);
    hiwebSocket.ippRequest(options);
  }

  n.d(e, "init", function () {
    return mt;
  }),
    n.d(e, "setConfig", function () {
      return cig;
    }),
    n.d(e, "updateElementType", function () {
      return uep;
    }),
    n.d(e, "hiwebSocket", function () {
      return hiwebSocket;
    }),
    n.d(e, "refreshPrinterList", function () {
      return rpl;
    }),
    n.d(e, "getClients", function () {
      return getClients;
    }),
    n.d(e, "getClientInfo", function () {
      return getClientInfo;
    }),
    n.d(e, "getAddress", function () {
      return getAddr;
    }),
    n.d(e, "ippPrint", function () {
      return ippPrint;
    }),
    n.d(e, "ippRequest", function () {
      return ippRequest;
    }),
    n.d(e, "PrintElementTypeManager", function () {
      return it;
    }),
    n.d(e, "PrintElementTypeGroup", function () {
      return ot;
    }),
    n.d(e, "PrintTemplate", function () {
      return ct;
    }),
    n.d(e, "print", function () {
      return ht;
    }),
    n.d(e, "print2", function () {
      return ft;
    }),
    n.d(e, "getHtml", function () {
      return gt;
    }),
    $(document).ready(function () {
      console.log("document ready");
      console.log(window.autoConnect);
      if (hiwebSocket.hasIo() && window.autoConnect) {
        hiwebSocket.start();
      }
    });
}
