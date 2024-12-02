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
    _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__ = require(2);

  class BasePrintElement {
    constructor(t) {
      this.printElementType = t;
      this.id = _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.guid();
    }

    getConfigOptionsByName(t) {
      return _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance[t];
    }

    getProxyTarget(t) {
      if (t) this.SetProxyTargetOption(t);
      const e = this.getData();
      const n = this.createTarget(this.getTitle(), e);
      this.updateTargetSize(n);
      this.css(n, e);
      return n;
    }

    SetProxyTargetOption(t) {
      this.options.getPrintElementOptionEntity();
      $.extend(this.options, t);
      this.copyFromType();
    }

    showInPage(t, e) {
      const n = this.options.showInPage;
      const i = this.options.unShowInPage;

      if (n) {
        if (n === "first") return t === 0;
        if (t === e - 1 && i === "last") return false;
        if (n === "odd") return (t !== 0 || i !== "first") && t % 2 === 0;
        if (n === "even") return t % 2 === 1;
        if (n === "last") return t === e - 1;
      }

      return (t !== 0 || i !== "first") && (t !== e - 1 || i !== "last");
    }

    setTemplateId(t) {
      this.templateId = t;
    }

    setPanel(t) {
      this.panel = t;
    }

    getField() {
      return this.options.field || this.printElementType.field;
    }

    getTitle() {
      return this.printElementType.title;
    }

    updateSizeAndPositionOptions(t, e, n, i) {
      const template =
        _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.getPrintTemplateById(
          this.templateId
        );
      if (this.panel !== void 0 && !template.willOutOfBounds) {
        const panelWidthPt = hinnn.mm.toPt(this.panel.width);
        const panelHeightPt = hinnn.mm.toPt(this.panel.height);
        if (
          t < 0 ||
          e < 0 ||
          t + this.options.width > panelWidthPt ||
          e + this.options.height > panelHeightPt
        ) {
          return;
        }
      }
      this.options.setLeft(t);
      this.options.setTop(e);
      this.options.copyDesignTopFromTop();
      this.options.setWidth(n);
      this.options.setHeight(i);
    }

    initSizeByHtml(t) {
      if (t && t.length) {
        this.createTempContainer();
        const e = t.clone();
        this.getTempContainer().append(e);
        this.options.initSizeByHtml(
          parseInt(hinnn.px.toPt(e.width()).toString()),
          parseInt(hinnn.px.toPt(e.height()).toString())
        );
        this.removeTempContainer();
      }
    }

    updateTargetSize(t) {
      t.css("width", this.options.displayWidth());
      t.css("height", this.options.displayHeight());
    }

    updateTargetWidth(t) {
      t.css("width", this.options.displayWidth());
    }

    getDesignTarget(t) {
      const e = this;
      let lastTimeStamp = 0;
      this.designTarget = this.getHtml(t)[0].target;
      this.designPaper = t;
      this.designTarget.click(function (ev) {
        if (ev.timeStamp - lastTimeStamp > 500) {
          hinnn.event.trigger(e.getPrintElementSelectEventKey(), {
            printElement: e,
          });
        }
        lastTimeStamp = ev.timeStamp;
      });
      this.designTarget.dblclick(function (ev) {
        const c = e.designTarget.find(".hiprint-printElement-content");
        if (c) {
          const p = e.designTarget.find(".resize-panel");
          if (
            e.printElementType.type === "text" &&
            !(e.options.textType && e.options.textType !== "text")
          ) {
            e._editing = true;
            e.designTarget.hidraggable("update", { draggable: false });
            c.css("cursor", "text").addClass("editing");
            e.designTarget.addClass("editing");
            c.click(function (ev) {
              if (e._editing) {
                ev.stopPropagation();
              }
            });
            c.attr("contenteditable", true);
            if (p) p.css("display", "none");
            e.selectEnd(c);
          }
        }
      });
      return this.designTarget;
    }

    selectEnd(el) {
      el.focus();
      if (
        typeof window.getSelection !== "undefined" &&
        typeof document.createRange !== "undefined"
      ) {
        const r = document.createRange();
        r.selectNodeContents(el[0]);
        r.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
      } else if (typeof document.body.createTextRange !== "undefined") {
        const r = document.body.createTextRange();
        r.moveToElementText(el[0]);
        r.collapse(false);
        r.select();
      }
    }

    updateByContent(clear) {
      const e = this;
      const c = e.designTarget.find(".hiprint-printElement-content");
      if (e._editing) {
        if (c) {
          c.css("cursor", "")
            .removeClass("editing")
            .removeAttr("contenteditable");
        }
        e.designTarget.removeClass("editing");
        const t = c.text();
        const title = e.options.title;
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
        e.updateDesignViewFromOptions();
        hinnn.event.trigger(
          "hiprintTemplateDataChanged_" + e.templateId,
          "编辑修改"
        );
        e._editing = false;
        const draggable =
          e.options.draggable === undefined || e.options.draggable === true;
        e.designTarget.hidraggable("update", { draggable: draggable });
      }
    }

    getPrintElementSelectEventKey() {
      return "PrintElementSelectEventKey_" + this.templateId;
    }

    design(t, e) {
      const n = this;
      this.designTarget.hidraggable({
        draggable: n.options.draggable,
        axis: n.options.axis ? n.options.axis : void 0,
        designTarget: n,
        onDrag: function onDrag(t, i, o) {
          const els = n.panel.printElements.filter(function (t) {
            return (
              t.designTarget.children().last().css("display") === "block" &&
              t.designTarget.children().last().hasClass("selected") &&
              !t.printElementType.type.includes("table")
            );
          });
          const isMultiple = els.length > 1;
          const notSelected = !n.designTarget
            .children()
            .last()
            .hasClass("selected");
          if (isMultiple) {
            const left = i - n.options.left;
            const top = o - n.options.top;
            els.forEach(function (t) {
              t.updateSizeAndPositionOptions(
                left + t.options.getLeft(),
                top + t.options.getTop()
              );
              t.designTarget.css("left", t.options.displayLeft());
              t.designTarget.css("top", t.options.displayTop());
              t.createLineOfPosition(e);
            });
            if (notSelected) {
              n.updateSizeAndPositionOptions(i, o);
              n.createLineOfPosition(e);
            }
          } else {
            n.updateSizeAndPositionOptions(i, o);
            n.createLineOfPosition(e);
          }
          _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.changed = true;
        },
        moveUnit: "pt",
        minMove:
          _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.movingDistance,
        onBeforeDrag: function onBeforeDrag(t) {
          _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.draging = true;
          n.designTarget.focus();
          n.createLineOfPosition(e);
        },
        onBeforeSelectAllDrag: function onBeforeSelectAllDrag() {
          _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.draging = true;
          n.designTarget.focus();
        },
        getScale: function getScale() {
          return n.designPaper.scale || 1;
        },
        onStopDrag: function onStopDrag(t) {
          if (_HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.changed) {
            hinnn.event.trigger(
              "hiprintTemplateDataChanged_" + n.templateId,
              "移动"
            );
          }
          _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.draging = false;
          _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.changed = false;
          const els = n.panel.printElements.filter(function (t) {
            return (
              t.designTarget.children().last().css("display") === "block" &&
              !t.printElementType.type.includes("table")
            );
          });
          if (els.length > 1) {
            els.forEach(function (t) {
              t.removeLineOfPosition();
            });
          } else {
            n.removeLineOfPosition();
          }
        },
      });
      this.setResizePanel();
      this.bingCopyEvent(this.designTarget);
      this.bingKeyboardMoveEvent(this.designTarget, e);
    }

    getPrintElementEntity(t) {
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
    }

    submitOption() {
      let els = this.panel.printElements.filter(function (t) {
        return (
          t.designTarget.children().last().css("display") === "block" &&
          t.designTarget.children().last().hasClass("selected") &&
          !t.printElementType.type.includes("table")
        );
      });
      els = els.filter(
        (ele) => ele.printElementType.type === this.printElementType.type
      );
      const t = this;
      const o = this.getConfigOptions();
      if (o && o.tabs && o.tabs.length) {
        this.getPrintElementOptionTabs().forEach(function (tab) {
          if (tab.name === "样式" && els.length) {
            tab.list.forEach(function (e) {
              els.forEach((ele) => {
                const n = e.getValue();
                const r = e.name === "textType" && ele.options[e.name] !== n;
                const a = e.name === "axis" && ele.options[e.name] !== n;
                if (n && typeof n === "object") {
                  Object.keys(n).forEach(function (e) {
                    ele.options[e] = n[e];
                  });
                } else {
                  ele.options[e.name] = n;
                }
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
              const n = e.getValue();
              const r = e.name === "textType" && t.options[e.name] !== n;
              const a = e.name === "axis" && t.options[e.name] !== n;
              if (n && typeof n === "object") {
                Object.keys(n).forEach(function (e) {
                  t.options[e] = n[e];
                });
              } else {
                t.options[e.name] = n;
              }
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
          const n = e.getValue();
          const r = e.name === "textType" && t.options[e.name] !== n;
          const a = e.name === "axis" && t.options[e.name] !== n;
          if (n && typeof n === "object") {
            Object.keys(n).forEach(function (e) {
              t.options[e] = n[e];
            });
          } else {
            t.options[e.name] = n;
          }
          if (r) {
            t.setResizePanel();
          }
          if (a) {
            t.designTarget.hidraggable("update", { axis: n });
          }
        });
      }
      this.updateDesignViewFromOptions();
      hinnn.event.trigger(
        "hiprintTemplateDataChanged_" + this.templateId,
        "元素修改"
      );
    }

    updateOption(o, v, b) {
      try {
        const e = this.getConfigOptions();
        let optionKeys = [];
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
    }

    getReizeableShowPoints() {
      return ["barcode", "qrcode"].includes(this.options.textType)
        ? ["se", "s", "e", "r"]
        : ["s", "e", "r"];
    }

    setResizePanel() {
      const n = this;
      const e = this.designPaper;
      this.designTarget.hireizeable({
        showPoints: n.getReizeableShowPoints(),
        draggable: n.options.draggable,
        showSizeBox:
          _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.showSizeBox,
        getScale: function getScale() {
          return n.designPaper.scale || 1;
        },
        onBeforeResize: function onBeforeResize() {
          _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.draging = true;
        },
        onResize: function onResize(t, i, o, r, a, rt) {
          if (rt !== undefined) {
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
          _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.draging = false;
          n.removeLineOfPosition();
        },
      });
    }

    onRotate(t, r) {
      this.options.setRotate(r);
    }

    onResize(t, e, n, i, o) {
      this.updateSizeAndPositionOptions(o, i, n, e);
    }

    getOrderIndex() {
      return this.options.getTop();
    }

    getHtml(t, e, n) {
      let i = 0;
      this.setCurrenttemplateData(e);
      const o = [];
      let r = this.getBeginPrintTopInPaperByReferenceElement(t);
      let a = t.getPaperFooter(i);
      if (
        !this.isHeaderOrFooter() &&
        !this.isFixed() &&
        r > a &&
        t.panelPageRule !== "none"
      ) {
        o.push(
          new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
            target: void 0,
            printLine: void 0,
          })
        );
        r = r - a + t.paperHeader;
        i++;
        a = t.getPaperFooter(i);
      }
      const p = this.getData(e);
      const s = this.createTarget(this.getTitle(), p, n);
      this.updateTargetSize(s);
      this.css(s, p);
      s.css("position", "absolute");
      s.css("left", this.options.displayLeft());
      s.css("top", r + "pt");
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
    }

    getHtml2(t, e, n) {
      let i = 0;
      this.setCurrenttemplateData(e);
      const o = [];
      let r = this.getBeginPrintTopInPaperByReferenceElement(t);
      let a = t.getPaperFooter(i);
      if (
        !this.isHeaderOrFooter() &&
        !this.isFixed() &&
        t.panelPageRule !== "none" &&
        r > a
      ) {
        o.push(
          new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
            target: void 0,
            printLine: void 0,
          })
        );
        r = r - a + t.paperHeader;
        i++;
        a = t.getPaperFooter(i);
      }
      if (
        r <= a &&
        e &&
        r + this.options.getHeight() > a &&
        t.panelPageRule !== "none"
      ) {
        o.push(
          new _dto_PaperHtmlResult__WEBPACK_IMPORTED_MODULE_3__.a({
            target: void 0,
            printLine: void 0,
          })
        );
        r = t.paperHeader;
        i++;
        a = t.getPaperFooter(i);
      }
      const p = this.getData(e);
      const s = this.createTarget(this.getTitle(), p);
      if (t.panelPageRule === "none" && r + this.options.getHeight() > a) {
        this.updatePanelHeight(r + this.options.getHeight(), t);
      }
      this.updateTargetSize(s);
      this.css(s, p);
      s.css("position", "absolute");
      s.css("left", this.options.displayLeft());
      s.css("top", r + "pt");
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
    }

    updatePanelHeight(h, p) {
      if (this.panel.panelPageRule === "none") {
        const nmh = hinnn.pt.toMm(h);
        p.paperFooter = h;
        p.target.css("height", nmh + "mm");
        p.target.attr("original-height", nmh);
      }
    }

    getBeginPrintTopInPaperByReferenceElement(t) {
      const e = this.options.getTop();
      return this.isHeaderOrFooter() || this.isFixed()
        ? e
        : t.referenceElement.isPositionLeftOrRight(e)
        ? t.referenceElement.printTopInPaper + (e - t.referenceElement.top)
        : t.referenceElement.bottomInLastPaper +
          (e - (t.referenceElement.top + t.referenceElement.height));
    }

    css(t, e) {
      const n = this;
      const i = [];
      const o = this.getConfigOptions();

      if (o) {
        let r;
        if (o.tabs && o.tabs.length) {
          r = [];
          o.tabs.forEach(function (n) {
            r = r.concat(n.options);
          });
        } else {
          r = o.supportOptions;
        }
        if (r) {
          r.forEach(function (e) {
            const o =
              _print_element_option_PrintElementOptionItemManager__WEBPACK_IMPORTED_MODULE_2__.a.getItem(
                e.name
              );
            if (o && o.css) {
              const r = o.css(
                t,
                n.options.getValueFromOptionsOrDefault(e.name)
              );
              if (r) i.push(r);
            }
          });
        }
      }

      this.stylerCss(t, e);
    }

    stylerCss(t, e) {
      const n = this.getStyler();

      if (n) {
        const i = n(e, this.options, t, this._currenttemplateData);
        if (i) {
          Object.keys(i).forEach(function (e) {
            t.css(e, i[e]);
          });
        }
      }
    }

    getData(t) {
      const f = this.getField();
      return t
        ? f
          ? f.split(".").reduce((a, c) => (a ? a[c] : t ? t[c] : ""), false) ||
            ""
          : ""
        : this.printElementType.getData();
    }

    copyFromType() {
      const options = this.options;
      const type = this.printElementType;
      const o = this.getConfigOptions();
      let names = [];
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
        if (type[e] && e !== "columns" && names.indexOf(e) > -1) {
          options[e] =
            typeof type[e] === "function" ? type[e].toString() : type[e];
        }
      });
      return options;
    }

    getPrintElementOptionTabs() {
      if (this._printElementOptionTabs) return this._printElementOptionTabs;
      const tabs = [];
      const e = this.getConfigOptions();
      if (e) {
        const t = e.tabs;
        if (t) {
          t.forEach(function (n, i) {
            tabs.push({ name: n.name, list: [] });
            n.options
              .filter(function (t) {
                return !t.hidden;
              })
              .forEach(function (e) {
                const n =
                  _print_element_option_PrintElementOptionItemManager__WEBPACK_IMPORTED_MODULE_2__.a.getItem(
                    e.name
                  );
                tabs[i].list.push(n);
              });
          });
        }
      }
      this._printElementOptionTabs = tabs;
      this._printElementOptionItems = void 0;
      return this._printElementOptionTabs;
    }

    getPrintElementOptionItems() {
      if (this._printElementOptionItems) return this._printElementOptionItems;
      const t = [];
      const e = this.getConfigOptions();

      if (e) {
        let n;
        if (e.tabs && e.tabs.length) {
          n = [];
          e.tabs.forEach(function (n) {
            n = n.concat(n.options);
          });
        } else {
          n = e.supportOptions;
        }
        if (n) {
          n.filter(function (t) {
            return !t.hidden;
          }).forEach(function (e) {
            const n =
              _print_element_option_PrintElementOptionItemManager__WEBPACK_IMPORTED_MODULE_2__.a.getItem(
                e.name
              );
            t.push(n);
          });
        }
      }

      this._printElementOptionItems = this.filterOptionItems(t.concat());
      this._printElementOptionTabs = void 0;
      return this._printElementOptionItems;
    }

    getPrintElementOptionItemsByName(t) {
      const e = [];
      const n = this.getConfigOptionsByName(t);

      if (n) {
        let i;
        if (n.tabs && n.tabs.length) {
          i = [];
          n.tabs.forEach(function (n) {
            i = i.concat(n.options);
          });
        } else {
          i = n.supportOptions;
        }
        if (i) {
          i.filter(function (t) {
            return !t.hidden;
          }).forEach(function (t) {
            const n =
              _print_element_option_PrintElementOptionItemManager__WEBPACK_IMPORTED_MODULE_2__.a.getItem(
                t.name
              );
            e.push(n);
          });
        }
      }

      return e.concat();
    }

    filterOptionItems(t) {
      return this.printElementType.field
        ? t.filter(function (t) {
            return t.name !== "field";
          })
        : t;
    }

    createTempContainer() {
      this.removeTempContainer();
      $("body").append(
        $(
          '<div class="hiprint_temp_Container hiprint-printPaper" style="overflow:hidden;height: 0px;box-sizing: border-box;"></div>'
        )
      );
    }

    removeTempContainer() {
      $(".hiprint_temp_Container").remove();
    }

    getTempContainer() {
      return $(".hiprint_temp_Container");
    }

    isHeaderOrFooter() {
      return (
        this.options.getTopInDesign() < this.panel.paperHeader ||
        this.options.getTopInDesign() >= this.panel.paperFooter
      );
    }

    delete() {
      if (this.designTarget) this.designTarget.remove();
    }

    setCurrenttemplateData(t) {
      this._currenttemplateData = t;
    }

    isFixed() {
      return this.options.fixed;
    }

    onRendered(t, e) {
      if (this.printElementType && this.printElementType.onRendered) {
        this.printElementType.onRendered(e, this.options, t.getTarget());
      }
    }

    createLineOfPosition(t) {
      const e = $(".toplineOfPosition.id" + this.id);
      const topPos = $(".topPosition.id" + this.id);
      const n = $(".leftlineOfPosition.id" + this.id);
      const leftPos = $(".leftPosition.id" + this.id);
      const i = $(".rightlineOfPosition.id" + this.id);
      const o = $(".bottomlineOfPosition.id" + this.id);
      const config = _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance;
      if (e.length) {
        e.css("top", this.options.displayTop(true));
      } else {
        const e = $(
          '<div class="toplineOfPosition id' +
            this.id +
            '" style="position: absolute; width: 100%;"></div>'
        );
        e.css("top", this.options.displayTop(true));
        e.css("width", t.displayWidth());
        this.designTarget.parents(".hiprint-printPaper-content").append(e);
      }
      if (config.showPosition) {
        if (topPos.length) {
          topPos.toggleClass("topPosition-lineMode", config.positionLineMode);
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
          if (this.designTarget.find(".size-box")) {
            this.designTarget.find(".size-box").toggleClass("hide", true);
          }
        } else {
          const topPos = $(
            '<div class="topPosition id' +
              this.id +
              '" style="position: absolute;"></div>'
          );
          topPos.toggleClass("topPosition-lineMode", config.positionLineMode);
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
          if (this.designTarget.find(".size-box")) {
            this.designTarget.find(".size-box").toggleClass("hide", true);
          }
          this.designTarget
            .parents(".hiprint-printPaper-content")
            .append(topPos);
          topPos.css("top", this.options.posTop() - topPos.height() + "pt");
        }
      }
      if (n.length) {
        n.css("left", this.options.displayLeft(true));
      } else {
        const r = $(
          '<div class="leftlineOfPosition id' +
            this.id +
            '" style="position: absolute;height: 100%;"></div>'
        );
        r.css("left", this.options.displayLeft(true));
        r.css("height", t.displayHeight());
        this.designTarget.parents(".hiprint-printPaper-content").append(r);
      }
      if (config.showPosition) {
        if (leftPos.length) {
          leftPos.text(
            this.options.posLeft() + (config.positionUnit ? "pt" : "")
          );
          leftPos.toggleClass("leftPosition-lineMode", config.positionLineMode);
          leftPos.css("left", this.options.posLeft() - leftPos.width() + "pt");
          if (config.positionLineMode) {
            leftPos.css(
              "top",
              this.options.posTop() - leftPos.height() / 3 + "pt"
            );
          } else {
            leftPos.css("top", this.options.posTop() + 2 + "pt");
          }
        } else {
          const leftPos = $(
            '<div class="leftPosition id' +
              this.id +
              '" style="position: absolute;"></div>'
          );
          leftPos.text(
            this.options.posLeft() + (config.positionUnit ? "pt" : "")
          );
          leftPos.toggleClass("leftPosition-lineMode", config.positionLineMode);
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
          leftPos.css("left", this.options.posLeft() - leftPos.width() + "pt");
        }
      }
      if (i.length) {
        i.css("left", this.options.getLeft() + this.options.getWidth() + "pt");
      } else {
        const a = $(
          '<div class="rightlineOfPosition id' +
            this.id +
            '" style="position: absolute;height: 100%;"></div>'
        );
        a.css("left", this.options.getLeft() + this.options.getWidth() + "pt");
        a.css("height", t.displayHeight());
        this.designTarget.parents(".hiprint-printPaper-content").append(a);
      }
      if (o.length) {
        o.css("top", this.options.getTop() + this.options.getHeight() + "pt");
      } else {
        const p = $(
          '<div class="bottomlineOfPosition id' +
            this.id +
            '" style="position: absolute;width: 100%;"></div>'
        );
        p.css("top", this.options.getTop() + this.options.getHeight() + "pt");
        p.css("width", t.displayWidth());
        this.designTarget.parents(".hiprint-printPaper-content").append(p);
      }
    }

    removeLineOfPosition() {
      $(".toplineOfPosition.id" + this.id).remove();
      $(".topPosition.id" + this.id).remove();
      if (this.designTarget.find(".size-box")) {
        this.designTarget.find(".size-box").toggleClass("hide", false);
      }
      $(".leftlineOfPosition.id" + this.id).remove();
      $(".leftPosition.id" + this.id).remove();
      $(".rightlineOfPosition.id" + this.id).remove();
      $(".bottomlineOfPosition.id" + this.id).remove();
    }

    getFontList() {
      let t = this.options.fontList;
      if (!t) {
        t = _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance
          .getPrintTemplateById(this.templateId)
          .getFontList();
      }
      return t;
    }

    getFields() {
      if (this.printElementType.type === "table") {
        return this.options.tableFields;
      }
      let t = this.options.fields;
      if (!t) {
        t = _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance
          .getPrintTemplateById(this.templateId)
          .getFields();
      }
      return t;
    }

    getOnImageChooseClick() {
      let t = this.options.onImageChooseClick;
      if (!t) {
        t = _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance
          .getPrintTemplateById(this.templateId)
          .getOnImageChooseClick();
      }
      return t;
    }

    bingCopyEvent(t) {
      const n = this;
      t.keydown(function (r) {
        if (n._editing) {
          if (!r.altKey && r.keyCode === 13) {
            n.updateByContent();
            return;
          }
        }
        if ((r.ctrlKey || r.metaKey) && r.keyCode === 67) {
          n.copyJson();
          r.preventDefault();
        }
      });
    }

    copyJson() {
      try {
        const n = this;
        let copyArea = $("#copyArea");
        if (!copyArea.length) {
          copyArea = $(
            '<textarea id="copyArea" style="position: absolute; left: 0px; top: 0px;opacity: 0"></textarea>'
          );
        }
        $("body").append(copyArea);
        let copyElements = this.panel.printElements.filter((ele) => {
          return (
            ele.designTarget.children().last().css("display") === "block" &&
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
        const json = JSON.stringify(copyElements);
        copyArea.text(json);
        copyArea.css("visibility", "visible");
        if (copyArea.setSelectionRange) {
          copyArea.setSelectionRange(0, copyArea.value.length);
        } else {
          copyArea.select();
        }
        let flag = false;
        flag = document.execCommand("copy");
        copyArea.css("visibility", "hidden");
        n.designTarget.focus();
        console.log("copyJson success");
      } catch (e) {
        console.log("copyJson error", e);
      }
    }

    clone(t) {
      const n = this;
      const newObj = n.printElementType.createPrintElement();
      Object.keys(n.options).forEach(function (key) {
        newObj.options[key] = n.options[key];
      });
      return newObj;
    }

    getFormatter() {
      let formatter;
      if (this.printElementType.formatter) {
        formatter = this.printElementType.formatter;
      }
      if (this.options.formatter) {
        try {
          const s = "formatter=" + this.options.formatter;
          eval(s);
        } catch (t) {
          console.log(t);
        }
      }
      return formatter;
    }

    getStyler() {
      let fnstyler;
      if (this.printElementType.styler) {
        fnstyler = this.printElementType.styler;
      }
      if (this.options.styler) {
        try {
          const s = "fnstyler=" + this.options.styler;
          eval(s);
        } catch (t) {
          console.log(t);
        }
      }
      return fnstyler;
    }

    bingKeyboardMoveEvent(t, e) {
      const n = this;
      let i;
      let o;
      t.attr("tabindex", "1");
      t.keydown(function (r) {
        if (r.target.tagName === "INPUT") {
          return;
        }
        if (n._editing && !r.altKey) {
          return;
        }
        if (n.options.draggable === false) {
          return;
        }
        const els = n.panel.printElements.filter(function (t) {
          return (
            t.designTarget.children().last().css("display") === "block" &&
            !t.printElementType.type.includes("table")
          );
        });
        const isMultiple = els.length > 1;
        const movingDistance =
          _HiPrintConfig__WEBPACK_IMPORTED_MODULE_1__.a.instance.movingDistance;
        switch (r.keyCode) {
          case 8:
          case 46:
            const templete =
              _HiPrintlib__WEBPACK_IMPORTED_MODULE_6__.a.instance.getPrintTemplateById(
                n.templateId
              );
            templete.deletePrintElement(n);
            hinnn.event.trigger(
              "hiprintTemplateDataChanged_" + n.templateId,
              "删除"
            );
            hinnn.event.trigger("clearSettingContainer");
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
              n.updateSizeAndPositionOptions(i - movingDistance);
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
              n.updateSizeAndPositionOptions(void 0, o - movingDistance);
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
              n.updateSizeAndPositionOptions(i + movingDistance);
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
              n.updateSizeAndPositionOptions(void 0, o + movingDistance);
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
    }

    inRect(t) {
      const ptr = this.designPaper.scale || 1;
      const x1 = this.designTarget[0].offsetLeft;
      const y1 = this.designTarget[0].offsetTop;
      const h = this.designTarget[0].offsetHeight;
      const w = this.designTarget[0].offsetWidth;
      const x2 = x1 + w;
      const y2 = y1 + h;
      const ex1 = $(t.target[0]).position().left / ptr;
      const ey1 = $(t.target[0]).position().top / ptr;
      const eh = t.target[0].offsetHeight;
      const ew = t.target[0].offsetWidth;
      const ex2 = ex1 + ew;
      const ey2 = ey1 + eh;
      return ex1 < x2 && ex2 > x1 && y1 < ey2 && y2 > ey1;
    }

    multipleSelect(t) {
      if (t) {
        this.designTarget.addClass("multipleSelect");
      } else {
        this.designTarget.removeClass("multipleSelect");
      }
    }

    updatePositionByMultipleSelect(t, e) {
      if (this.options.draggable === false) return;
      this.updateSizeAndPositionOptions(
        t + this.options.getLeft(),
        e + this.options.getTop()
      );
      this.designTarget.css("left", this.options.displayLeft());
      this.designTarget.css("top", this.options.displayTop());
    }
  }

  return BasePrintElement;
}
