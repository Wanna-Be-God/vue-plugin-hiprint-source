import { _typeof } from "../utils/Utils.js";
export default function CreateBasePrintElement(module, exports, require) {
  "use strict";

  require.d(exports, "a", function () {
    return BasePrintElement;
  });

  var _entity_PrintElementEntity__WEBPACK_IMPORTED_MODULE_0__ = require(17),
    _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__ = require(1),
    _print_element_option_PrintElementOptionItemManager__WEBPACK_IMPORTED_MODULE_2__ = require(9),
    _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__ = require(6),
    _assets_plugins_hinnn__WEBPACK_IMPORTED_MODULE_4__ = require(0),
    _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_5__ = require(8),
    _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__ = require(2),
    BasePrintElement = (function () {
      function BasePrintElement(t) {
        (this.printElementType = t),
          (this.id =
            _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.guid());
      }

      return (
        (BasePrintElement.prototype.getConfigOptionsByName = function (t) {
          return _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance[t];
        }),
        (BasePrintElement.prototype.getProxyTarget = function (t) {
          t && this.SetProxyTargetOption(t);
          var e = this.getData(),
            n = this.createTarget(this.getTitle(), e);
          return this.updateTargetSize(n), this.css(n, e), n;
        }),
        (BasePrintElement.prototype.SetProxyTargetOption = function (t) {
          this.options.getPrintElementOptionEntity();
          $.extend(this.options, t);
          this.copyFromType();
        }),
        (BasePrintElement.prototype.showInPage = function (t, e) {
          var n = this.options.showInPage,
            i = this.options.unShowInPage;

          if (n) {
            if ("first" == n) return 0 == t;
            if (t == e - 1 && "last" == i) return !1;
            if ("odd" == n) return (0 != t || "first" != i) && t % 2 == 0;
            if ("even" == n) return t % 2 == 1;
            if ("last" == n) return t == e - 1;
          }

          return (0 != t || "first" != i) && (t != e - 1 || "last" != i);
        }),
        (BasePrintElement.prototype.setTemplateId = function (t) {
          this.templateId = t;
        }),
        (BasePrintElement.prototype.setPanel = function (t) {
          this.panel = t;
        }),
        (BasePrintElement.prototype.getField = function () {
          return this.options.field || this.printElementType.field;
        }),
        (BasePrintElement.prototype.getTitle = function () {
          return this.printElementType.title;
        }),
        (BasePrintElement.prototype.updateSizeAndPositionOptions = function (
          t,
          e,
          n,
          i
        ) {
          const template =
            _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.getPrintTemplateById(
              this.templateId
            );
          if (this.panel !== void 0 && !template.willOutOfBounds) {
            const panelWidthPt = hinnn.mm.toPt(this.panel.width);
            const panelHeightPt = hinnn.mm.toPt(this.panel.height);
            if (t < 0) {
              return;
            }
            if (e < 0) {
              return;
            }
            if (t + this.options.width > panelWidthPt) {
              return;
            }
            if (e + this.options.height > panelHeightPt) {
              return;
            }
          }
          this.options.setLeft(t),
            this.options.setTop(e),
            this.options.copyDesignTopFromTop(),
            this.options.setWidth(n),
            this.options.setHeight(i);
        }),
        (BasePrintElement.prototype.initSizeByHtml = function (t) {
          if (t && t.length) {
            this.createTempContainer();
            var e = t.clone();
            this.getTempContainer().append(e),
              this.options.initSizeByHtml(
                parseInt(hinnn.px.toPt(e.width()).toString()),
                parseInt(hinnn.px.toPt(e.height()).toString())
              ),
              this.removeTempContainer();
          }
        }),
        (BasePrintElement.prototype.updateTargetSize = function (t) {
          t.css("width", this.options.displayWidth()),
            t.css("height", this.options.displayHeight());
        }),
        (BasePrintElement.prototype.updateTargetWidth = function (t) {
          t.css("width", this.options.displayWidth());
        }),
        (BasePrintElement.prototype.getDesignTarget = function (t) {
          var e = this,
            lastTimeStamp = 0;
          return (
            (this.designTarget = this.getHtml(t)[0].target),
            (this.designPaper = t),
            this.designTarget.click(function (ev) {
              if (ev.timeStamp - lastTimeStamp > 500) {
                hinnn.event.trigger(e.getPrintElementSelectEventKey(), {
                  printElement: e,
                });
              }
              lastTimeStamp = ev.timeStamp;
            }),
            this.designTarget.dblclick(function (ev) {
              var c = e.designTarget.find(".hiprint-printElement-content");
              if (c) {
                var p = e.designTarget.find(".resize-panel");
                if (
                  e.printElementType.type == "text" &&
                  !(e.options.textType && "text" != e.options.textType)
                ) {
                  e._editing = true;
                  e.designTarget.hidraggable("update", { draggable: false });
                  c.css("cursor", "text"), c.addClass("editing");
                  e.designTarget.addClass("editing");
                  c.click(function (ev) {
                    if (e._editing) {
                      ev.stopPropagation();
                    }
                  });
                  c.attr("contenteditable", true),
                    p && p.css("display", "none");
                  e.selectEnd(c);
                }
              }
            }),
            this.designTarget
          );
        }),
        (BasePrintElement.prototype.selectEnd = function (el) {
          el.focus();
          if (
            typeof window.getSelection != "undefined" &&
            typeof document.createRange != "undefined"
          ) {
            var r = document.createRange();
            r.selectNodeContents(el[0]);
            r.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(r);
          } else if (typeof document.body.createTextRange != "undefined") {
            var r = document.body.createTextRange();
            r.moveToElementText(el[0]), r.collapse(false), r.select();
          }
        }),
        (BasePrintElement.prototype.updateByContent = function (clear) {
          var e = this,
            c = e.designTarget.find(".hiprint-printElement-content");
          if (e._editing) {
            c &&
              c.css("cursor", "") &&
              c.removeClass("editing") &&
              c.removeAttr("contenteditable");
            e.designTarget.removeClass("editing");
            var t = c.text(),
              title = e.options.title;
            if (t.startsWith(title) && e.options.field) {
              if (t.length > title.length) {
                e.options.testData = t.split("：")[1];
              } else {
                e.options.title = t;
                e.options.testData = "";
              }
            } else {
              e.options.title = t;
            }
            e.options.title = e.options.title.split("：")[0];
            if (!clear) {
              hinnn.event.trigger(e.getPrintElementSelectEventKey(), {
                printElement: e,
              });
            }
            e.updateDesignViewFromOptions(),
              hinnn.event.trigger(
                "hiprintTemplateDataChanged_" + e.templateId,
                "编辑修改"
              );
            e._editing = false;
            var draggable =
              e.options.draggable == undefined || true == e.options.draggable;
            e.designTarget.hidraggable("update", { draggable: draggable });
          }
        }),
        (BasePrintElement.prototype.getPrintElementSelectEventKey =
          function () {
            return "PrintElementSelectEventKey_" + this.templateId;
          }),
        (BasePrintElement.prototype.design = function (t, e) {
          var n = this;
          this.designTarget.hidraggable({
            // 添加 draggable 属性
            draggable: n.options.draggable,
            axis: n.options.axis ? n.options.axis : void 0,
            designTarget: n,
            onDrag: function onDrag(t, i, o) {
              // 处理按住 ctrl / command 多选元素
              var els = n.panel.printElements.filter(function (t) {
                return (
                  "block" == t.designTarget.children().last().css("display") &&
                  t.designTarget.children().last().hasClass("selected") &&
                  !t.printElementType.type.includes("table")
                );
              });
              var isMultiple = els.length > 1;
              var notSelected = !n.designTarget
                .children()
                .last()
                .hasClass("selected");
              if (isMultiple) {
                var left = i - n.options.left,
                  top = o - n.options.top;
                els.forEach(function (t) {
                  t.updateSizeAndPositionOptions(
                    left + t.options.getLeft(),
                    top + t.options.getTop()
                  ),
                    t.designTarget.css("left", t.options.displayLeft()),
                    t.designTarget.css("top", t.options.displayTop());
                  t.createLineOfPosition(e);
                });
                if (notSelected) {
                  n.updateSizeAndPositionOptions(i, o),
                    n.createLineOfPosition(e);
                }
              } else {
                n.updateSizeAndPositionOptions(i, o), n.createLineOfPosition(e);
              }
              _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.changed = !0;
            },
            moveUnit: "pt",
            minMove:
              _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance
                .movingDistance,
            onBeforeDrag: function onBeforeDrag(t) {
              (_HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.draging =
                !0),
                n.designTarget.focus(),
                n.createLineOfPosition(e);
            },
            onBeforeSelectAllDrag: function onBeforeSelectAllDrag() {
              (_HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.draging =
                !0),
                n.designTarget.focus();
            },
            getScale: function getScale() {
              return n.designPaper.scale || 1;
            },
            onStopDrag: function onStopDrag(t) {
              // 普通元素拖动结束事件history
              if (_HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.changed)
                hinnn.event.trigger(
                  "hiprintTemplateDataChanged_" + n.templateId,
                  "移动"
                );
              (_HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.draging =
                !1),
                (_HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.changed =
                  !1);
              var els = n.panel.printElements.filter(function (t) {
                return (
                  "block" == t.designTarget.children().last().css("display") &&
                  !t.printElementType.type.includes("table")
                );
              });
              if (els.length > 1) {
                els.forEach(function (t) {
                  t.removeLineOfPosition();
                });
              } else n.removeLineOfPosition();
            },
          }),
            this.setResizePanel(),
            this.bingCopyEvent(this.designTarget),
            this.bingKeyboardMoveEvent(this.designTarget, e);
        }),
        (BasePrintElement.prototype.getPrintElementEntity = function (t) {
          return t
            ? new _entity_PrintElementEntity__WEBPACK_IMPORTED_MODULE_0__.a(
                void 0,
                this.options.getPrintElementOptionEntity(),
                this.printElementType.getPrintElementTypeEntity()
              )
            : new _entity_PrintElementEntity__WEBPACK_IMPORTED_MODULE_0__.a(
                this.printElementType.tid,
                this.options.getPrintElementOptionEntity()
              );
        }),
        (BasePrintElement.prototype.submitOption = function () {
          var els = this.panel.printElements.filter(function (t) {
            return (
              "block" == t.designTarget.children().last().css("display") &&
              t.designTarget.children().last().hasClass("selected") &&
              !t.printElementType.type.includes("table")
            );
          });
          els = els.filter(
            (ele) => ele.printElementType.type == this.printElementType.type
          );
          var t = this,
            o = this.getConfigOptions();
          if (o && o.tabs && o.tabs.length) {
            this.getPrintElementOptionTabs().forEach(function (tab) {
              // 样式更新要应用到其他选中的同种元素
              if (tab.name === "样式" && els.length) {
                tab.list.forEach(function (e) {
                  els.forEach((ele) => {
                    var n = e.getValue(),
                      r = "textType" == e.name && ele.options[e.name] !== n,
                      a = "axis" == e.name && ele.options[e.name] !== n;
                    n && "object" == _typeof(n)
                      ? Object.keys(n).forEach(function (e) {
                          ele.options[e] = n[e];
                        })
                      : (ele.options[e.name] = n);
                    if (r) {
                      ele.setResizePanel();
                    }
                    if (a) {
                      ele.designTarget.hidraggable("update", { axis: n });
                    }
                  });
                });
              } else {
                tab.list.forEach(function (e) {
                  var n = e.getValue(),
                    r = "textType" == e.name && t.options[e.name] !== n,
                    a = "axis" == e.name && t.options[e.name] !== n;
                  n && "object" == _typeof(n)
                    ? Object.keys(n).forEach(function (e) {
                        t.options[e] = n[e];
                      })
                    : (t.options[e.name] = n);
                  if (r) {
                    t.setResizePanel();
                  }
                  if (a) {
                    t.designTarget.hidraggable("update", { axis: n });
                  }
                });
              }
            });
          } else {
            this.getPrintElementOptionItems().forEach(function (e) {
              var n = e.getValue(),
                r = "textType" == e.name && t.options[e.name] !== n,
                a = "axis" == e.name && t.options[e.name] !== n;
              n && "object" == _typeof(n)
                ? Object.keys(n).forEach(function (e) {
                    t.options[e] = n[e];
                  })
                : (t.options[e.name] = n);
              if (r) {
                t.setResizePanel();
              }
              if (a) {
                t.designTarget.hidraggable("update", { axis: n });
              }
            });
          }
          this.updateDesignViewFromOptions(),
            hinnn.event.trigger(
              "hiprintTemplateDataChanged_" + this.templateId,
              "元素修改"
            );
        }),
        (BasePrintElement.prototype.updateOption = function (o, v, b) {
          try {
            var e = this.getConfigOptions();
            var optionKeys = [];
            if (e && e.tabs && e.tabs.length) {
              e.tabs.forEach(function (n) {
                n.options.forEach(function (e) {
                  optionKeys.push(e.name);
                });
              });
            } else {
              optionKeys = e.supportOptions.map(function (e) {
                return e.name;
              });
            }
            if (optionKeys && optionKeys.includes(o)) {
              this.options[o] = v;
              this.updateDesignViewFromOptions();
              if (!b) {
                hinnn.event.trigger(
                  "hiprintTemplateDataChanged_" + this.templateId,
                  "参数修改"
                );
              }
            }
            this._printElementOptionTabs.forEach((tab) => {
              tab.list.forEach((item) => {
                if (item.name === o) {
                  item.target.find("select")?.val(v.toString());
                  item.target.find("input")?.val(v.toString());
                }
              });
            });
          } catch (e) {
            console.log("updateOption error", e);
          }
        }),
        (BasePrintElement.prototype.getReizeableShowPoints = function () {
          return ["barcode", "qrcode"].includes(this.options.textType)
            ? ["se", "s", "e", "r"]
            : ["s", "e", "r"];
        }),
        (BasePrintElement.prototype.setResizePanel = function () {
          var n = this,
            e = this.designPaper;
          this.designTarget.hireizeable({
            showPoints: n.getReizeableShowPoints(),
            draggable: n.options.draggable, // 元素是否可拖拽、删除
            // 是否显示宽高box
            showSizeBox:
              _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance
                .showSizeBox,
            getScale: function getScale() {
              return n.designPaper.scale || 1;
            },
            onBeforeResize: function onBeforeResize() {
              _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.draging = !0;
            },
            onResize: function onResize(t, i, o, r, a, rt) {
              if (undefined != rt) {
                n.onRotate(t, rt);
              } else {
                n.onResize(t, i, o, r, a);
              }
              n.createLineOfPosition(e);
            },
            onStopResize: function onStopResize(r) {
              hinnn.event.trigger(
                "hiprintTemplateDataChanged_" + n.templateId,
                r ? "旋转" : "大小"
              );
              (_HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.draging =
                !1),
                n.removeLineOfPosition();
            },
          });
        }),
        (BasePrintElement.prototype.onRotate = function (t, r) {
          this.options.setRotate(r);
        }),
        (BasePrintElement.prototype.onResize = function (t, e, n, i, o) {
          this.updateSizeAndPositionOptions(o, i, n, e);
        }),
        (BasePrintElement.prototype.getOrderIndex = function () {
          return this.options.getTop();
        }),
        (BasePrintElement.prototype.getHtml = function (t, e, n) {
          var i = 0;
          this.setCurrenttemplateData(e);
          var o = [],
            r = this.getBeginPrintTopInPaperByReferenceElement(t),
            a = t.getPaperFooter(i);
          this.isHeaderOrFooter() ||
            this.isFixed() ||
            (r > a &&
              "none" != t.panelPageRule &&
              (o.push(
                new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
                  target: void 0,
                  printLine: void 0,
                })
              ),
              (r = r - a + t.paperHeader),
              i++,
              (a = t.getPaperFooter(i))));
          var p = this.getData(e),
            s = this.createTarget(this.getTitle(), p, n);
          this.updateTargetSize(s),
            this.css(s, p),
            s.css("position", "absolute"),
            s.css("left", this.options.displayLeft()),
            s.css("top", r + "pt"),
            o.push(
              new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
                target: s,
                printLine: r + this.options.getHeight(),
                referenceElement:
                  new _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_5__.a({
                    top: this.options.getTop(),
                    left: this.options.getLeft(),
                    height: this.options.getHeight(),
                    width: this.options.getWidth(),
                    beginPrintPaperIndex: t.index,
                    bottomInLastPaper: r + this.options.getHeight(),
                    printTopInPaper: r,
                  }),
              })
            );
          if (e && this.options.pageBreak) {
            o[0].target.css("top", t.paperHeader + "pt");
            o[0].referenceElement.top =
              this.options.getTop() - this.options.getHeight() - t.paperHeader;
            o[0].printLine = t.paperHeader;
            o[0].referenceElement.bottomInLastPaper = 0;
            o[0].referenceElement.printTopInPaper = t.paperHeader;
            o.unshift(
              new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
                target: s,
                printLine: t.height,
                referenceElement:
                  new _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_5__.a({
                    top: 0,
                    left: 0,
                    height: 0,
                    width: 0,
                    beginPrintPaperIndex: t.index,
                    bottomInLastPaper: t.height,
                    printTopInPaper: t.paperHeader,
                  }),
              })
            );
          }
          return o;
        }),
        (BasePrintElement.prototype.getHtml2 = function (t, e, n) {
          var i = 0;
          this.setCurrenttemplateData(e);
          var o = [],
            r = this.getBeginPrintTopInPaperByReferenceElement(t),
            a = t.getPaperFooter(i);
          // 处理文本/辅助元素 当高度大于模板高度, 插入的分页...
          this.isHeaderOrFooter() ||
            this.isFixed() ||
            ("none" != t.panelPageRule &&
              r > a &&
              (o.push(
                new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
                  target: void 0,
                  printLine: void 0,
                  // (e && r + this.options.getHeight() > a) --> 设计时拖拽元素高度超过页脚线时,导致报错问题
                })
              ),
              (r = r - a + t.paperHeader),
              i++,
              (a = t.getPaperFooter(i))),
            r <= a &&
              e &&
              r + this.options.getHeight() > a &&
              "none" != t.panelPageRule &&
              (o.push(
                new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
                  target: void 0,
                  printLine: void 0,
                })
              ),
              (r = t.paperHeader),
              i++,
              (a = t.getPaperFooter(i))));
          var p = this.getData(e),
            s = this.createTarget(this.getTitle(), p);
          if ("none" == t.panelPageRule && r + this.options.getHeight() > a)
            this.updatePanelHeight(r + this.options.getHeight(), t);
          this.updateTargetSize(s),
            this.css(s, p),
            s.css("position", "absolute"),
            s.css("left", this.options.displayLeft()),
            s.css("top", r + "pt"),
            o.push(
              new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
                target: s,
                printLine: r + this.options.getHeight(),
                referenceElement:
                  new _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_5__.a({
                    top: this.options.getTop(),
                    left: this.options.getLeft(),
                    height: this.options.getHeight(),
                    width: this.options.getWidth(),
                    beginPrintPaperIndex: t.index,
                    bottomInLastPaper: r + this.options.getHeight(),
                    printTopInPaper: r,
                  }),
              })
            );
          if (e && this.options.pageBreak) {
            o[0].target.css("top", t.paperHeader + "pt");
            o[0].referenceElement.top =
              this.options.getTop() - this.options.getHeight() - t.paperHeader;
            o[0].printLine = t.paperHeader;
            o[0].referenceElement.bottomInLastPaper = 0;
            o[0].referenceElement.printTopInPaper = t.paperHeader;
            o.unshift(
              new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
                target: s,
                printLine: t.height,
                referenceElement:
                  new _PrintReferenceElement__WEBPACK_IMPORTED_MODULE_5__.a({
                    top: 0,
                    left: 0,
                    height: 0,
                    width: 0,
                    beginPrintPaperIndex: t.index,
                    bottomInLastPaper: t.height,
                    printTopInPaper: t.paperHeader,
                  }),
              })
            );
          }
          return o;
        }),
        (BasePrintElement.prototype.updatePanelHeight = function (h, p) {
          if ("none" == this.panel.panelPageRule) {
            var nmh = hinnn.pt.toMm(h);
            // 更改模板高度 paperType, width(mm), height(mm), rotate
            // this.panel.resize(void 0, t.mmwidth, nmh, !1);
            // 这个会更新模板的高度...
            // this.panel.target.css("height", nmh + "mm"), this.panel.target.attr("original-height", nmh);
            p.paperFooter = h;
            p.target.css("height", nmh + "mm"),
              p.target.attr("original-height", nmh);
          }
        }),
        (BasePrintElement.prototype.getBeginPrintTopInPaperByReferenceElement =
          function (t) {
            var e = this.options.getTop();
            return this.isHeaderOrFooter() || this.isFixed()
              ? e
              : t.referenceElement.isPositionLeftOrRight(e)
              ? t.referenceElement.printTopInPaper +
                (e - t.referenceElement.top)
              : t.referenceElement.bottomInLastPaper +
                (e - (t.referenceElement.top + t.referenceElement.height));
          }),
        (BasePrintElement.prototype.css = function (t, e) {
          var n = this,
            i = [],
            o = this.getConfigOptions();

          if (o) {
            var r;
            if (o.tabs && o.tabs.length) {
              r = [];
              o.tabs.forEach(function (n) {
                r = r.concat(n.options);
              });
            } else {
              r = o.supportOptions;
            }
            r &&
              r.forEach(function (e) {
                var o =
                  _print_element_option_PrintElementOptionItemManager__WEBPACK_IMPORTED_MODULE_2__.a.getItem(
                    e.name
                  );

                if (o && o.css) {
                  var r = o.css(
                    t,
                    n.options.getValueFromOptionsOrDefault(e.name)
                  );
                  r && i.push(r);
                }
              });
          }

          this.stylerCss(t, e);
        }),
        (BasePrintElement.prototype.stylerCss = function (t, e) {
          var n = this.getStyler();

          if (n) {
            var i = n(e, this.options, t, this._currenttemplateData);
            if (i)
              Object.keys(i).forEach(function (e) {
                t.css(e, i[e]);
              });
          }
        }),
        (BasePrintElement.prototype.getData = function (t) {
          var f = this.getField();
          return t
            ? f
              ? f.split(".").reduce((a, c) => (a ? a[c] : t ? t[c] : ""), !1) ||
                ""
              : ""
            : this.printElementType.getData();
        }),
        (BasePrintElement.prototype.copyFromType = function () {
          var options = this.options,
            type = this.printElementType;
          var o = this.getConfigOptions();
          var names = [];
          if (o && o.tabs && o.tabs.length) {
            o.tabs.forEach(function (n) {
              n.options.forEach(function (e) {
                names.push(e.name);
              });
            });
          } else {
            names = o.supportOptions.map(function (e) {
              return e.name;
            });
          }
          Object.keys(type).forEach(function (e) {
            if (type[e] && "columns" != e && names.indexOf(e) > -1) {
              options[e] =
                "function" == _typeof(type[e]) ? type[e].toString() : type[e];
            }
          });
          return options;
        }),
        (BasePrintElement.prototype.getPrintElementOptionTabs = function () {
          if (this._printElementOptionTabs) return this._printElementOptionTabs;
          var tabs = [],
            e = this.getConfigOptions();
          if (e) {
            var t = e.tabs;
            t &&
              t.forEach(function (n, i) {
                tabs.push({ name: n.name, list: [] });
                n.options
                  .filter(function (t) {
                    return !t.hidden;
                  })
                  .forEach(function (e) {
                    var n =
                      _print_element_option_PrintElementOptionItemManager__WEBPACK_IMPORTED_MODULE_2__.a.getItem(
                        e.name
                      );
                    tabs[i].list.push(n);
                  });
              });
          }
          return (
            (this._printElementOptionTabs = tabs),
            (this._printElementOptionItems = void 0),
            this._printElementOptionTabs
          );
        }),
        (BasePrintElement.prototype.getPrintElementOptionItems = function () {
          if (this._printElementOptionItems)
            return this._printElementOptionItems;
          var t = [],
            e = this.getConfigOptions();

          if (e) {
            var n;
            if (e.tabs && e.tabs.length) {
              n = [];
              e.tabs.forEach(function (n) {
                n = n.concat(n.options);
              });
            } else {
              n = e.supportOptions;
            }
            n &&
              n
                .filter(function (t) {
                  return !t.hidden;
                })
                .forEach(function (e) {
                  var n =
                    _print_element_option_PrintElementOptionItemManager__WEBPACK_IMPORTED_MODULE_2__.a.getItem(
                      e.name
                    );

                  t.push(n);
                });
          }

          return (
            (this._printElementOptionItems = this.filterOptionItems(
              t.concat()
            )),
            (this._printElementOptionTabs = void 0),
            this._printElementOptionItems
          );
        }),
        (BasePrintElement.prototype.getPrintElementOptionItemsByName =
          function (t) {
            var e = [],
              n = this.getConfigOptionsByName(t);

            if (n) {
              var i;
              if (n.tabs && n.tabs.length) {
                i = [];
                n.tabs.forEach(function (n) {
                  i = i.concat(n.options);
                });
              } else {
                i = n.supportOptions;
              }
              i &&
                i
                  .filter(function (t) {
                    return !t.hidden;
                  })
                  .forEach(function (t) {
                    var n =
                      _print_element_option_PrintElementOptionItemManager__WEBPACK_IMPORTED_MODULE_2__.a.getItem(
                        t.name
                      );

                    e.push(n);
                  });
            }

            return e.concat();
          }),
        (BasePrintElement.prototype.filterOptionItems = function (t) {
          return this.printElementType.field
            ? t.filter(function (t) {
                return "field" != t.name;
              })
            : t;
        }),
        (BasePrintElement.prototype.createTempContainer = function () {
          this.removeTempContainer(),
            $("body").append(
              $(
                '<div class="hiprint_temp_Container hiprint-printPaper" style="overflow:hidden;height: 0px;box-sizing: border-box;"></div>'
              )
            );
        }),
        (BasePrintElement.prototype.removeTempContainer = function () {
          $(".hiprint_temp_Container").remove();
        }),
        (BasePrintElement.prototype.getTempContainer = function () {
          return $(".hiprint_temp_Container");
        }),
        (BasePrintElement.prototype.isHeaderOrFooter = function () {
          return (
            this.options.getTopInDesign() < this.panel.paperHeader ||
            this.options.getTopInDesign() >= this.panel.paperFooter
          );
        }),
        (BasePrintElement.prototype.delete = function () {
          this.designTarget && this.designTarget.remove();
        }),
        (BasePrintElement.prototype.setCurrenttemplateData = function (t) {
          this._currenttemplateData = t;
        }),
        (BasePrintElement.prototype.isFixed = function () {
          return this.options.fixed;
        }),
        (BasePrintElement.prototype.onRendered = function (t, e) {
          this.printElementType &&
            this.printElementType.onRendered &&
            this.printElementType.onRendered(e, this.options, t.getTarget());
        }),
        (BasePrintElement.prototype.createLineOfPosition = function (t) {
          var e = $(".toplineOfPosition.id" + this.id),
            topPos = $(".topPosition.id" + this.id),
            n = $(".leftlineOfPosition.id" + this.id),
            leftPos = $(".leftPosition.id" + this.id),
            i = $(".rightlineOfPosition.id" + this.id),
            o = $(".bottomlineOfPosition.id" + this.id);
          var config = _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance;
          if (e.length) e.css("top", this.options.displayTop(true));
          else {
            var e = $(
              '<div class="toplineOfPosition id' +
                this.id +
                '" style="position: absolute; width: 100%;"></div>'
            );
            e.css("top", this.options.displayTop(true)),
              e.css("width", t.displayWidth()),
              this.designTarget
                .parents(".hiprint-printPaper-content")
                .append(e);
          }
          if (config.showPosition) {
            if (topPos.length) {
              topPos.toggleClass(
                "topPosition-lineMode",
                config.positionLineMode
              );
              topPos.text(
                this.options.posTop() + (config.positionUnit ? "pt" : "")
              );
              topPos.css("top", this.options.posTop() - topPos.height() + "pt");
              if (config.positionLineMode) {
                topPos.css(
                  "left",
                  this.options.posLeft() - topPos.width() / 2 + "pt"
                );
              } else {
                topPos.css("left", this.options.posLeft() + 2 + "pt");
              }
              this.designTarget.find(".size-box") &&
                this.designTarget.find(".size-box").toggleClass("hide", true);
            } else {
              var topPos = $(
                '<div class="topPosition id' +
                  this.id +
                  '" style="position: absolute;"></div>'
              );
              topPos.toggleClass(
                "topPosition-lineMode",
                config.positionLineMode
              );
              topPos.text(
                this.options.posTop() + (config.positionUnit ? "pt" : "")
              );
              if (config.positionLineMode) {
                topPos.css(
                  "left",
                  this.options.posLeft() - topPos.width() / 2 + "pt"
                );
              } else {
                topPos.css("left", this.options.posLeft() + 2 + "pt");
              }
              this.designTarget.find(".size-box") &&
                this.designTarget.find(".size-box").toggleClass("hide", true);
              this.designTarget
                .parents(".hiprint-printPaper-content")
                .append(topPos);
              topPos.css("top", this.options.posTop() - topPos.height() + "pt");
            }
          }
          if (n.length) n.css("left", this.options.displayLeft(true));
          else {
            var r = $(
              '<div class="leftlineOfPosition id' +
                this.id +
                '" style="position: absolute;height: 100%;"></div>'
            );
            r.css("left", this.options.displayLeft(true)),
              r.css("height", t.displayHeight()),
              this.designTarget
                .parents(".hiprint-printPaper-content")
                .append(r);
          }
          if (config.showPosition) {
            if (leftPos.length) {
              leftPos.text(
                this.options.posLeft() + (config.positionUnit ? "pt" : "")
              );
              leftPos.toggleClass(
                "leftPosition-lineMode",
                config.positionLineMode
              );
              leftPos.css(
                "left",
                this.options.posLeft() - leftPos.width() + "pt"
              );
              if (config.positionLineMode) {
                leftPos.css(
                  "top",
                  this.options.posTop() - leftPos.height() / 3 + "pt"
                );
              } else {
                leftPos.css("top", this.options.posTop() + 2 + "pt");
              }
            } else {
              var leftPos = $(
                '<div class="leftPosition id' +
                  this.id +
                  '" style="position: absolute;"></div>'
              );
              leftPos.text(
                this.options.posLeft() + (config.positionUnit ? "pt" : "")
              );
              leftPos.toggleClass(
                "leftPosition-lineMode",
                config.positionLineMode
              );
              if (config.positionLineMode) {
                leftPos.css(
                  "top",
                  this.options.posTop() - leftPos.height() / 3 + "pt"
                );
              } else {
                leftPos.css("top", this.options.posTop() + 2 + "pt");
              }
              this.designTarget
                .parents(".hiprint-printPaper-content")
                .append(leftPos);
              leftPos.css(
                "left",
                this.options.posLeft() - leftPos.width() + "pt"
              );
            }
          }
          if (i.length)
            i.css(
              "left",
              this.options.getLeft() + this.options.getWidth() + "pt"
            );
          else {
            var a = $(
              '<div class="rightlineOfPosition id' +
                this.id +
                '" style="position: absolute;height: 100%;"></div>'
            );
            a.css(
              "left",
              this.options.getLeft() + this.options.getWidth() + "pt"
            ),
              a.css("height", t.displayHeight()),
              this.designTarget
                .parents(".hiprint-printPaper-content")
                .append(a);
          }
          if (o.length)
            o.css(
              "top",
              this.options.getTop() + this.options.getHeight() + "pt"
            );
          else {
            var p = $(
              '<div class="bottomlineOfPosition id' +
                this.id +
                '" style="position: absolute;width: 100%;"></div>'
            );
            p.css(
              "top",
              this.options.getTop() + this.options.getHeight() + "pt"
            ),
              p.css("width", t.displayWidth()),
              this.designTarget
                .parents(".hiprint-printPaper-content")
                .append(p);
          }
        }),
        (BasePrintElement.prototype.removeLineOfPosition = function () {
          $(".toplineOfPosition.id" + this.id).remove(),
            $(".topPosition.id" + this.id).remove(),
            this.designTarget.find(".size-box") &&
              this.designTarget.find(".size-box").toggleClass("hide", false),
            $(".leftlineOfPosition.id" + this.id).remove(),
            $(".leftPosition.id" + this.id).remove(),
            $(".rightlineOfPosition.id" + this.id).remove(),
            $(".bottomlineOfPosition.id" + this.id).remove();
        }),
        (BasePrintElement.prototype.getFontList = function () {
          var t = this.options.fontList;
          return (
            t ||
            (t = _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance
              .getPrintTemplateById(this.templateId)
              .getFontList())
          );
        }),
        (BasePrintElement.prototype.getFields = function () {
          if ("table" == this.printElementType.type) {
            var t = this.options.tableFields;
            return t;
          }
          var t = this.options.fields;
          return (
            t ||
            (t = _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance
              .getPrintTemplateById(this.templateId)
              .getFields())
          );
        }),
        (BasePrintElement.prototype.getOnImageChooseClick = function () {
          var t = this.options.onImageChooseClick;
          return (
            t ||
            (t = _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance
              .getPrintTemplateById(this.templateId)
              .getOnImageChooseClick())
          );
        }),
        (BasePrintElement.prototype.bingCopyEvent = function (t) {
          var n = this;
          t.keydown(function (r) {
            if (n._editing) {
              if (!r.altKey && 13 == r.keyCode) {
                n.updateByContent();
                return;
              }
            }
            // ctrl + c / command + c
            if ((r.ctrlKey || r.metaKey) && 67 == r.keyCode) {
              n.copyJson();
              r.preventDefault();
            }
          });
        }),
        (BasePrintElement.prototype.copyJson = function () {
          try {
            var n = this;
            // 使用textarea 存储复制的元素信息
            var copyArea = $("#copyArea");
            if (!copyArea.length)
              copyArea = $(
                '<textarea id="copyArea" style="position: absolute; left: 0px; top: 0px;opacity: 0"></textarea>'
              );
            $("body").append(copyArea);
            let copyElements = this.panel.printElements.filter((ele) => {
              return (
                "block" == ele.designTarget.children().last().css("display") &&
                !ele.printElementType.type.includes("table")
              );
            });
            copyElements = copyElements.map((ele) => {
              return {
                options: ele.options,
                printElementType: ele.printElementType,
                id: ele.id,
                templateId: ele.templateId,
              };
            });
            var json = JSON.stringify(copyElements);
            // var json = JSON.stringify({
            //   options: n.options,
            //   printElementType: n.printElementType,
            //   id: n.id,
            //   templateId: n.templateId
            // });
            copyArea.text(json);
            // 元素需可见才能选中复制到剪切板
            copyArea.css("visibility", "visible");
            // 尝试修复对复制元素的自动聚焦
            // copyArea.focus();
            if (copyArea.setSelectionRange)
              copyArea.setSelectionRange(0, copyArea.value.length);
            else copyArea.select();
            var flag = false;
            flag = document.execCommand("copy");
            copyArea.css("visibility", "hidden");
            // 获取元素焦点，不然无法粘贴（keydown问题）
            n.designTarget.focus();
            console.log("copyJson success");
          } catch (e) {
            flag = false;
            console.log("copyJson error", e);
          }
          return flag;
        }),
        (BasePrintElement.prototype.clone = function (t) {
          var n = this;
          let newObj = n.printElementType.createPrintElement();
          Object.keys(n.options).forEach(function (key) {
            newObj.options[key] = n.options[key];
          });
          return newObj;
        }),
        (BasePrintElement.prototype.getFormatter = function () {
          var formatter = void 0;
          if (
            (this.printElementType.formatter &&
              (formatter = this.printElementType.formatter),
            this.options.formatter)
          )
            try {
              var s = "formatter=" + this.options.formatter;
              eval(s);
            } catch (t) {
              console.log(t);
            }
          return formatter;
        }),
        (BasePrintElement.prototype.getStyler = function () {
          var fnstyler = void 0;
          if (
            (this.printElementType.styler &&
              (fnstyler = this.printElementType.styler),
            this.options.styler)
          )
            try {
              var s = "fnstyler=" + this.options.styler;
              eval(s);
            } catch (t) {
              console.log(t);
            }
          return fnstyler;
        }),
        (BasePrintElement.prototype.bingKeyboardMoveEvent = function (t, e) {
          var n = this,
            i = void 0,
            o = void 0;
          t.attr("tabindex", "1"),
            t.keydown(function (r) {
              // 处理 table / input 输入时 删除元素问题
              if ("INPUT" == r.target.tagName) {
                return;
              }
              // 元素编辑
              if (n._editing && !r.altKey) {
                return;
              }
              // 元素禁止移动
              if (false === n.options.draggable) {
                return;
              }
              // 处理按住 ctrl / command 多选元素
              var els = n.panel.printElements.filter(function (t) {
                return (
                  "block" == t.designTarget.children().last().css("display") &&
                  !t.printElementType.type.includes("table")
                );
              });
              var isMultiple = els.length > 1;
              var movingDistance =
                _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance
                  .movingDistance;
              switch (r.keyCode) {
                // BackSpace/Delete 删除元素
                case 8:
                case 46:
                  var templete =
                    _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.getPrintTemplateById(
                      n.templateId
                    );
                  templete.deletePrintElement(n);
                  hinnn.event.trigger(
                    "hiprintTemplateDataChanged_" + n.templateId,
                    "删除"
                  );
                  hinnn.event.trigger("clearSettingContainer");
                  // 获取到了template 拿到template里面所有被选中的元素
                  els.forEach((ele) => {
                    templete.deletePrintElement(ele);
                    hinnn.event.trigger(
                      "hiprintTemplateDataChanged_" + ele.templateId,
                      "删除"
                    );
                  });
                  hinnn.event.trigger("clearSettingContainer");
                  break;
                case 37:
                  i = n.options.getLeft();
                  if (isMultiple) {
                    els.forEach(function (t) {
                      t.updatePositionByMultipleSelect(0 - movingDistance, 0);
                    });
                  } else {
                    n.updateSizeAndPositionOptions(i - movingDistance),
                      t.css("left", n.options.displayLeft());
                  }
                  r.preventDefault();
                  break;

                case 38:
                  o = n.options.getTop();
                  if (isMultiple) {
                    els.forEach(function (t) {
                      t.updatePositionByMultipleSelect(0, 0 - movingDistance);
                    });
                  } else {
                    n.updateSizeAndPositionOptions(void 0, o - movingDistance),
                      t.css("top", n.options.displayTop());
                  }
                  r.preventDefault();
                  break;

                case 39:
                  i = n.options.getLeft();
                  if (isMultiple) {
                    els.forEach(function (t) {
                      t.updatePositionByMultipleSelect(movingDistance, 0);
                    });
                  } else {
                    n.updateSizeAndPositionOptions(i + movingDistance),
                      t.css("left", n.options.displayLeft());
                  }
                  r.preventDefault();
                  break;

                case 40:
                  o = n.options.getTop();
                  if (isMultiple) {
                    els.forEach(function (t) {
                      t.updatePositionByMultipleSelect(0, movingDistance);
                    });
                  } else {
                    n.updateSizeAndPositionOptions(void 0, o + movingDistance),
                      t.css("top", n.options.displayTop());
                  }
                  r.preventDefault();
              }
              if ([37, 38, 39, 40].includes(r.keyCode)) {
                hinnn.event.trigger(
                  "hiprintTemplateDataChanged_" + n.templateId,
                  "键盘移动"
                );
              }
            });
        }),
        (BasePrintElement.prototype.inRect = function (t) {
          var ptr = this.designPaper.scale || 1;
          var x1 = this.designTarget[0].offsetLeft,
            y1 = this.designTarget[0].offsetTop,
            h = this.designTarget[0].offsetHeight,
            w = this.designTarget[0].offsetWidth,
            x2 = x1 + w,
            y2 = y1 + h,
            ex1 = $(t.target[0]).position().left / ptr,
            ey1 = $(t.target[0]).position().top / ptr,
            eh = t.target[0].offsetHeight,
            ew = t.target[0].offsetWidth,
            ex2 = ex1 + ew,
            ey2 = ey1 + eh;
          return ex1 < x2 && ex2 > x1 && y1 < ey2 && y2 > ey1;
        }),
        (BasePrintElement.prototype.multipleSelect = function (t) {
          t
            ? this.designTarget.addClass("multipleSelect")
            : this.designTarget.removeClass("multipleSelect");
        }),
        (BasePrintElement.prototype.updatePositionByMultipleSelect = function (
          t,
          e
        ) {
          if (false === this.options.draggable) return;
          this.updateSizeAndPositionOptions(
            t + this.options.getLeft(),
            e + this.options.getTop()
          ),
            this.designTarget.css("left", this.options.displayLeft()),
            this.designTarget.css("top", this.options.displayTop());
        }),
        BasePrintElement
      );
    })();
}
