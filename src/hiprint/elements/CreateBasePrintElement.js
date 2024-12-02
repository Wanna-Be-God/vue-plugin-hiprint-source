import { _typeof } from "../utils/Utils.js";

/**
 * 创建基础打印元素类
 * @param {object} module - 模块对象
 * @param {object} exports - 导出对象 
 * @param {function} require - require函数
 */
export default function CreateBasePrintElement(module, exports, require) {
  "use strict";

  require.d(exports, "a", function () {
    return BasePrintElement;
  });

  var require_PrintElementEntity = require(17),
    require_HiPrintConfig = require(1),
    require_PrintElementOptionItemManager = require(9),
    require_PaperHtmlResult = require(6),
    require_PrintReferenceElement = require(8),
    require_HiPrintlib = require(2);

  class BasePrintElement {
    /**
     * 基础打印元素构造函数
     * @param {object} printElementType - 打印元素类型对象
     */
    constructor(printElementType) {
      this.printElementType = printElementType;
      this.id = require_HiPrintlib.a.instance.guid();
    }

    /**
     * 根据名称获取配置选项
     * @param {string} name - 配置名称
     * @returns {object} 配置选项对象
     */
    getConfigOptionsByName(name) {
      return require_HiPrintConfig.a.instance[name];
    }

    /**
     * 获取代理目标元素
     * @param {object} options - 选项对象
     * @returns {object} 目标元素
     */
    getProxyTarget(options) {
      if (options) this.setProxyTargetOption(options);
      const data = this.getData();
      const target = this.createTarget(this.getTitle(), data);
      this.updateTargetSize(target);
      this.css(target, data);
      return target;
    }

    /**
     * 设置代理目标选项
     * @param {object} options - 选项对象
     */
    setProxyTargetOption(options) {
      this.options.getPrintElementOptionEntity();
      $.extend(this.options, options);
      this.copyFromType();
    }

    /**
     * 判断元素是否在指定页面显示
     * @param {number} pageIndex - 页面索引
     * @param {number} totalPages - 总页数
     * @returns {boolean} 是否显示
     */
    showInPage(pageIndex, totalPages) {
      const showInPage = this.options.showInPage;
      const unShowInPage = this.options.unShowInPage;

      if (showInPage) {
        if (showInPage === "first") return pageIndex === 0;
        if (pageIndex === totalPages - 1 && unShowInPage === "last")
          return false;
        if (showInPage === "odd")
          return (
            (pageIndex !== 0 || unShowInPage !== "first") && pageIndex % 2 === 0
          );
        if (showInPage === "even") return pageIndex % 2 === 1;
        if (showInPage === "last") return pageIndex === totalPages - 1;
      }

      return (
        (pageIndex !== 0 || unShowInPage !== "first") &&
        (pageIndex !== totalPages - 1 || unShowInPage !== "last")
      );
    }

    /**
     * 设置模板ID
     * @param {string} templateId - 模板ID
     */
    setTemplateId(templateId) {
      this.templateId = templateId;
    }

    /**
     * 设置面板
     * @param {object} panel - 面板对象
     */
    setPanel(panel) {
      this.panel = panel;
    }

    /**
     * 获取字段名
     * @returns {string} 字段名
     */
    getField() {
      return this.options.field || this.printElementType.field;
    }

    /**
     * 获取标题
     * @returns {string} 标题
     */
    getTitle() {
      return this.printElementType.title;
    }

    /**
     * 更新元素的大小和位置选项
     * @param {number} left - 左边距
     * @param {number} top - 上边距 
     * @param {number} width - 宽度
     * @param {number} height - 高度
     */
    updateSizeAndPositionOptions(left, top, width, height) {
      const template = require_HiPrintlib.a.instance.getPrintTemplateById(
        this.templateId
      );
      if (this.panel !== void 0 && !template.willOutOfBounds) {
        const panelWidthPt = hinnn.mm.toPt(this.panel.width);
        const panelHeightPt = hinnn.mm.toPt(this.panel.height);
        if (
          left < 0 ||
          top < 0 ||
          left + this.options.width > panelWidthPt ||
          top + this.options.height > panelHeightPt
        ) {
          return;
        }
      }
      this.options.setLeft(left);
      this.options.setTop(top);
      this.options.copyDesignTopFromTop();
      this.options.setWidth(width);
      this.options.setHeight(height);
    }

    /**
     * 根据HTML元素初始化大小
     * @param {object} htmlElement - HTML元素
     */
    initSizeByHtml(htmlElement) {
      if (htmlElement && htmlElement.length) {
        this.createTempContainer();
        const clonedElement = htmlElement.clone();
        this.getTempContainer().append(clonedElement);
        this.options.initSizeByHtml(
          parseInt(hinnn.px.toPt(clonedElement.width()).toString()),
          parseInt(hinnn.px.toPt(clonedElement.height()).toString())
        );
        this.removeTempContainer();
      }
    }

    /**
     * 更新目标元素大小
     * @param {object} target - 目标元素
     */
    updateTargetSize(target) {
      target.css("width", this.options.displayWidth());
      target.css("height", this.options.displayHeight());
    }

    /**
     * 更新目标元素宽度
     * @param {object} target - 目标元素
     */
    updateTargetWidth(target) {
      target.css("width", this.options.displayWidth());
    }

    /**
     * 获取设计目标元素
     * @param {object} designPaper - 设计纸张对象
     * @returns {object} 设计目标元素
     */
    getDesignTarget(designPaper) {
      const self = this;
      let lastTimeStamp = 0;
      this.designTarget = this.getHtml(designPaper)[0].target;
      this.designPaper = designPaper;
      this.designTarget.click(function (ev) {
        if (ev.timeStamp - lastTimeStamp > 500) {
          hinnn.event.trigger(self.getPrintElementSelectEventKey(), {
            printElement: self,
          });
        }
        lastTimeStamp = ev.timeStamp;
      });
      this.designTarget.dblclick(function (ev) {
        const content = self.designTarget.find(".hiprint-printElement-content");
        if (content) {
          const resizePanel = self.designTarget.find(".resize-panel");
          if (
            self.printElementType.type === "text" &&
            !(self.options.textType && self.options.textType !== "text")
          ) {
            self._editing = true;
            self.designTarget.hidraggable("update", { draggable: false });
            content.css("cursor", "text").addClass("editing");
            self.designTarget.addClass("editing");
            content.click(function (ev) {
              if (self._editing) {
                ev.stopPropagation();
              }
            });
            content.attr("contenteditable", true);
            if (resizePanel) resizePanel.css("display", "none");
            self.selectEnd(content);
          }
        }
      });
      return this.designTarget;
    }

    /**
     * 选择文本末尾
     * @param {object} element - 元素对象
     */
    selectEnd(element) {
      element.focus();
      if (
        typeof window.getSelection !== "undefined" &&
        typeof document.createRange !== "undefined"
      ) {
        const range = document.createRange();
        range.selectNodeContents(element[0]);
        range.collapse(false);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      } else if (typeof document.body.createTextRange !== "undefined") {
        const range = document.body.createTextRange();
        range.moveToElementText(element[0]);
        range.collapse(false);
        range.select();
      }
    }

    /**
     * 根据内容更新元素
     * @param {boolean} clear - 是否清除
     */
    updateByContent(clear) {
      const self = this;
      const content = self.designTarget.find(".hiprint-printElement-content");
      if (self._editing) {
        if (content) {
          content
            .css("cursor", "")
            .removeClass("editing")
            .removeAttr("contenteditable");
        }
        self.designTarget.removeClass("editing");
        const text = content.text();
        const title = self.options.title;
        if (text.startsWith(title) && self.options.field) {
          if (text.length > title.length) {
            self.options.testData = text.split("：")[1];
          } else {
            self.options.title = text;
            self.options.testData = "";
          }
        } else {
          self.options.title = text;
        }
        self.options.title = self.options.title.split("：")[0];
        if (!clear) {
          hinnn.event.trigger(self.getPrintElementSelectEventKey(), {
            printElement: self,
          });
        }
        self.updateDesignViewFromOptions();
        hinnn.event.trigger(
          "hiprintTemplateDataChanged_" + self.templateId,
          "编辑修改"
        );
        self._editing = false;
        const draggable =
          self.options.draggable === undefined ||
          self.options.draggable === true;
        self.designTarget.hidraggable("update", { draggable: draggable });
      }
    }

    /**
     * 获取打印元素选择事件key
     * @returns {string} 事件key
     */
    getPrintElementSelectEventKey() {
      return "PrintElementSelectEventKey_" + this.templateId;
    }

    /**
     * 设计模式相关操作
     * @param {object} designPaper - 设计纸张对象
     * @param {object} event - 事件对象
     */
    design(designPaper, event) {
      const self = this;
      this.designTarget.hidraggable({
        draggable: self.options.draggable,
        axis: self.options.axis ? self.options.axis : void 0,
        designTarget: self,
        onDrag: function onDrag(left, top, offset) {
          const elements = self.panel.printElements.filter(function (element) {
            return (
              element.designTarget.children().last().css("display") ===
                "block" &&
              element.designTarget.children().last().hasClass("selected") &&
              !element.printElementType.type.includes("table")
            );
          });
          const isMultiple = elements.length > 1;
          const notSelected = !self.designTarget
            .children()
            .last()
            .hasClass("selected");
          if (isMultiple) {
            const deltaX = left - self.options.left;
            const deltaY = offset - self.options.top;
            elements.forEach(function (element) {
              element.updateSizeAndPositionOptions(
                deltaX + element.options.getLeft(),
                deltaY + element.options.getTop()
              );
              element.designTarget.css("left", element.options.displayLeft());
              element.designTarget.css("top", element.options.displayTop());
              element.createLineOfPosition(event);
            });
            if (notSelected) {
              self.updateSizeAndPositionOptions(left, offset);
              self.createLineOfPosition(event);
            }
          } else {
            self.updateSizeAndPositionOptions(left, offset);
            self.createLineOfPosition(event);
          }
          require_HiPrintlib.a.instance.changed = true;
        },
        moveUnit: "pt",
        minMove: require_HiPrintConfig.a.instance.movingDistance,
        onBeforeDrag: function onBeforeDrag() {
          require_HiPrintlib.a.instance.draging = true;
          self.designTarget.focus();
          self.createLineOfPosition(event);
        },
        onBeforeSelectAllDrag: function onBeforeSelectAllDrag() {
          require_HiPrintlib.a.instance.draging = true;
          self.designTarget.focus();
        },
        getScale: function getScale() {
          return self.designPaper.scale || 1;
        },
        onStopDrag: function onStopDrag() {
          if (require_HiPrintlib.a.instance.changed) {
            hinnn.event.trigger(
              "hiprintTemplateDataChanged_" + self.templateId,
              "移动"
            );
          }
          require_HiPrintlib.a.instance.draging = false;
          require_HiPrintlib.a.instance.changed = false;
          const elements = self.panel.printElements.filter(function (element) {
            return (
              element.designTarget.children().last().css("display") ===
                "block" && !element.printElementType.type.includes("table")
            );
          });
          if (elements.length > 1) {
            elements.forEach(function (element) {
              element.removeLineOfPosition();
            });
          } else {
            self.removeLineOfPosition();
          }
        },
      });
      this.setResizePanel();
      this.bindCopyEvent(this.designTarget);
      this.bindKeyboardMoveEvent(this.designTarget, event);
    }

    /**
     * 获取打印元素实体
     * @param {boolean} isNew - 是否新建
     * @returns {object} 打印元素实体
     */
    getPrintElementEntity(isNew) {
      return isNew
        ? new require_PrintElementEntity.a(
            void 0,
            this.options.getPrintElementOptionEntity(),
            this.printElementType.getPrintElementTypeEntity()
          )
        : new require_PrintElementEntity.a(
            this.printElementType.tid,
            this.options.getPrintElementOptionEntity()
          );
    }

    /**
     * 提交选项更改
     */
    submitOption() {
      let elements = this.panel.printElements.filter(function (element) {
        return (
          element.designTarget.children().last().css("display") === "block" &&
          element.designTarget.children().last().hasClass("selected") &&
          !element.printElementType.type.includes("table")
        );
      });
      elements = elements.filter(
        (ele) => ele.printElementType.type === this.printElementType.type
      );
      const self = this;
      const configOptions = this.getConfigOptions();
      if (configOptions && configOptions.tabs && configOptions.tabs.length) {
        this.getPrintElementOptionTabs().forEach(function (tab) {
          if (tab.name === "样式" && elements.length) {
            tab.list.forEach(function (optionItem) {
              elements.forEach((ele) => {
                const value = optionItem.getValue();
                const isTextTypeChanged =
                  optionItem.name === "textType" &&
                  ele.options[optionItem.name] !== value;
                const isAxisChanged =
                  optionItem.name === "axis" &&
                  ele.options[optionItem.name] !== value;
                if (value && typeof value === "object") {
                  Object.keys(value).forEach(function (key) {
                    ele.options[key] = value[key];
                  });
                } else {
                  ele.options[optionItem.name] = value;
                }
                if (isTextTypeChanged) {
                  ele.setResizePanel();
                }
                if (isAxisChanged) {
                  ele.designTarget.hidraggable("update", { axis: value });
                }
              });
            });
          } else {
            tab.list.forEach(function (optionItem) {
              const value = optionItem.getValue();
              const isTextTypeChanged =
                optionItem.name === "textType" &&
                self.options[optionItem.name] !== value;
              const isAxisChanged =
                optionItem.name === "axis" &&
                self.options[optionItem.name] !== value;
              if (value && typeof value === "object") {
                Object.keys(value).forEach(function (key) {
                  self.options[key] = value[key];
                });
              } else {
                self.options[optionItem.name] = value;
              }
              if (isTextTypeChanged) {
                self.setResizePanel();
              }
              if (isAxisChanged) {
                self.designTarget.hidraggable("update", { axis: value });
              }
            });
          }
        });
      } else {
        this.getPrintElementOptionItems().forEach(function (optionItem) {
          const value = optionItem.getValue();
          const isTextTypeChanged =
            optionItem.name === "textType" &&
            self.options[optionItem.name] !== value;
          const isAxisChanged =
            optionItem.name === "axis" &&
            self.options[optionItem.name] !== value;
          if (value && typeof value === "object") {
            Object.keys(value).forEach(function (key) {
              self.options[key] = value[key];
            });
          } else {
            self.options[optionItem.name] = value;
          }
          if (isTextTypeChanged) {
            self.setResizePanel();
          }
          if (isAxisChanged) {
            self.designTarget.hidraggable("update", { axis: value });
          }
        });
      }
      this.updateDesignViewFromOptions();
      hinnn.event.trigger(
        "hiprintTemplateDataChanged_" + this.templateId,
        "元素修改"
      );
    }

    /**
     * 更新指定选项
     * @param {string} optionName - 选项名称
     * @param {*} value - 选项值
     * @param {boolean} triggerEvent - 是否触发事件
     */
    updateOption(optionName, value, triggerEvent) {
      try {
        const configOptions = this.getConfigOptions();
        let optionKeys = [];
        if (configOptions && configOptions.tabs && configOptions.tabs.length) {
          configOptions.tabs.forEach(function (tab) {
            tab.options.forEach(function (option) {
              optionKeys.push(option.name);
            });
          });
        } else {
          optionKeys = configOptions.supportOptions.map(function (option) {
            return option.name;
          });
        }
        if (optionKeys && optionKeys.includes(optionName)) {
          this.options[optionName] = value;
          this.updateDesignViewFromOptions();
          if (!triggerEvent) {
            hinnn.event.trigger(
              "hiprintTemplateDataChanged_" + this.templateId,
              "参数修改"
            );
          }
        }
        this._printElementOptionTabs.forEach((tab) => {
          tab.list.forEach((item) => {
            if (item.name === optionName) {
              item.target.find("select")?.val(value.toString());
              item.target.find("input")?.val(value.toString());
            }
          });
        });
      } catch (error) {
        console.log("updateOption error", error);
      }
    }

    /**
     * 获取可调整大小的控制点
     * @returns {string[]} 控制点列表
     */
    getReizeableShowPoints() {
      return ["barcode", "qrcode"].includes(this.options.textType)
        ? ["se", "s", "e", "r"]
        : ["s", "e", "r"];
    }

    /**
     * 设置调整大小面板
     */
    setResizePanel() {
      const self = this;
      const designPaper = this.designPaper;
      this.designTarget.hireizeable({
        showPoints: self.getReizeableShowPoints(),
        draggable: self.options.draggable,
        showSizeBox: require_HiPrintConfig.a.instance.showSizeBox,
        getScale: function getScale() {
          return self.designPaper.scale || 1;
        },
        onBeforeResize: function onBeforeResize() {
          require_HiPrintlib.a.instance.draging = true;
        },
        onResize: function onResize(
          width,
          height,
          left,
          top,
          rotate,
          isRotating
        ) {
          if (isRotating !== undefined) {
            self.onRotate(width, isRotating);
          } else {
            self.onResize(width, height, left, top);
          }
          self.createLineOfPosition(designPaper);
        },
        onStopResize: function onStopResize(isRotating) {
          hinnn.event.trigger(
            "hiprintTemplateDataChanged_" + self.templateId,
            isRotating ? "旋转" : "大小"
          );
          require_HiPrintlib.a.instance.draging = false;
          self.removeLineOfPosition();
        },
      });
    }

    /**
     * 处理元素旋转
     * @param {number} width - 宽度
     * @param {number} rotate - 旋转角度
     */
    onRotate(width, rotate) {
      this.options.setRotate(rotate);
    }

    /**
     * 处理元素大小调整
     * @param {number} width - 宽度
     * @param {number} height - 高度
     * @param {number} left - 左边距
     * @param {number} top - 上边距
     */
    onResize(width, height, left, top) {
      this.updateSizeAndPositionOptions(left, top, width, height);
    }

    /**
     * 获取元素排序索引
     * @returns {number} 排序索引
     */
    getOrderIndex() {
      return this.options.getTop();
    }

    /**
     * 获取元素HTML
     * @param {object} designPaper - 设计纸张对象
     * @param {object} templateData - 模板数据
     * @param {boolean} isNew - 是否新建
     * @returns {array} HTML结果数组
     */
    getHtml(designPaper, templateData, isNew) {
      let pageIndex = 0;
      this.setCurrenttemplateData(templateData);
      const results = [];
      let printTop =
        this.getBeginPrintTopInPaperByReferenceElement(designPaper);
      let paperFooter = designPaper.getPaperFooter(pageIndex);
      if (
        !this.isHeaderOrFooter() &&
        !this.isFixed() &&
        printTop > paperFooter &&
        designPaper.panelPageRule !== "none"
      ) {
        results.push(
          new require_PaperHtmlResult.a({
            target: void 0,
            printLine: void 0,
          })
        );
        printTop = printTop - paperFooter + designPaper.paperHeader;
        pageIndex++;
        paperFooter = designPaper.getPaperFooter(pageIndex);
      }
      const data = this.getData(templateData);
      const target = this.createTarget(this.getTitle(), data, isNew);
      this.updateTargetSize(target);
      this.css(target, data);
      target.css("position", "absolute");
      target.css("left", this.options.displayLeft());
      target.css("top", printTop + "pt");
      results.push(
        new require_PaperHtmlResult.a({
          target: target,
          printLine: printTop + this.options.getHeight(),
          referenceElement: new require_PrintReferenceElement.a({
            top: this.options.getTop(),
            left: this.options.getLeft(),
            height: this.options.getHeight(),
            width: this.options.getWidth(),
            beginPrintPaperIndex: designPaper.index,
            bottomInLastPaper: printTop + this.options.getHeight(),
            printTopInPaper: printTop,
          }),
        })
      );
      if (templateData && this.options.pageBreak) {
        results[0].target.css("top", designPaper.paperHeader + "pt");
        results[0].referenceElement.top =
          this.options.getTop() -
          this.options.getHeight() -
          designPaper.paperHeader;
        results[0].printLine = designPaper.paperHeader;
        results[0].referenceElement.bottomInLastPaper = 0;
        results[0].referenceElement.printTopInPaper = designPaper.paperHeader;
        results.unshift(
          new require_PaperHtmlResult.a({
            target: target,
            printLine: designPaper.height,
            referenceElement: new require_PrintReferenceElement.a({
              top: 0,
              left: 0,
              height: 0,
              width: 0,
              beginPrintPaperIndex: designPaper.index,
              bottomInLastPaper: designPaper.height,
              printTopInPaper: designPaper.paperHeader,
            }),
          })
        );
      }
      return results;
    }

    /**
     * 获取元素HTML(版本2)
     * @param {object} designPaper - 设计纸张对象
     * @param {object} templateData - 模板数据
     * @param {boolean} isNew - 是否新建
     * @returns {array} HTML结果数组
     */
    getHtml2(designPaper, templateData, isNew) {
      let pageIndex = 0;
      this.setCurrenttemplateData(templateData);
      const results = [];
      let printTop =
        this.getBeginPrintTopInPaperByReferenceElement(designPaper);
      let paperFooter = designPaper.getPaperFooter(pageIndex);
      if (
        !this.isHeaderOrFooter() &&
        !this.isFixed() &&
        designPaper.panelPageRule !== "none" &&
        printTop > paperFooter
      ) {
        results.push(
          new require_PaperHtmlResult.a({
            target: void 0,
            printLine: void 0,
          })
        );
        printTop = printTop - paperFooter + designPaper.paperHeader;
        pageIndex++;
        paperFooter = designPaper.getPaperFooter(pageIndex);
      }
      if (
        printTop <= paperFooter &&
        templateData &&
        printTop + this.options.getHeight() > paperFooter &&
        designPaper.panelPageRule !== "none"
      ) {
        results.push(
          new require_PaperHtmlResult.a({
            target: void 0,
            printLine: void 0,
          })
        );
        printTop = designPaper.paperHeader;
        pageIndex++;
        paperFooter = designPaper.getPaperFooter(pageIndex);
      }
      const data = this.getData(templateData);
      const target = this.createTarget(this.getTitle(), data);
      if (
        designPaper.panelPageRule === "none" &&
        printTop + this.options.getHeight() > paperFooter
      ) {
        this.updatePanelHeight(
          printTop + this.options.getHeight(),
          designPaper
        );
      }
      this.updateTargetSize(target);
      this.css(target, data);
      target.css("position", "absolute");
      target.css("left", this.options.displayLeft());
      target.css("top", printTop + "pt");
      results.push(
        new require_PaperHtmlResult.a({
          target: target,
          printLine: printTop + this.options.getHeight(),
          referenceElement: new require_PrintReferenceElement.a({
            top: this.options.getTop(),
            left: this.options.getLeft(),
            height: this.options.getHeight(),
            width: this.options.getWidth(),
            beginPrintPaperIndex: designPaper.index,
            bottomInLastPaper: printTop + this.options.getHeight(),
            printTopInPaper: printTop,
          }),
        })
      );
      if (templateData && this.options.pageBreak) {
        results[0].target.css("top", designPaper.paperHeader + "pt");
        results[0].referenceElement.top =
          this.options.getTop() -
          this.options.getHeight() -
          designPaper.paperHeader;
        results[0].printLine = designPaper.paperHeader;
        results[0].referenceElement.bottomInLastPaper = 0;
        results[0].referenceElement.printTopInPaper = designPaper.paperHeader;
        results.unshift(
          new require_PaperHtmlResult.a({
            target: target,
            printLine: designPaper.height,
            referenceElement: new require_PrintReferenceElement.a({
              top: 0,
              left: 0,
              height: 0,
              width: 0,
              beginPrintPaperIndex: designPaper.index,
              bottomInLastPaper: designPaper.height,
              printTopInPaper: designPaper.paperHeader,
            }),
          })
        );
      }
      return results;
    }

    /**
     * 更新面板高度
     * @param {number} height - 高度
     * @param {object} designPaper - 设计纸张对象
     */
    updatePanelHeight(height, designPaper) {
      if (this.panel.panelPageRule === "none") {
        const newHeightMm = hinnn.pt.toMm(height);
        designPaper.paperFooter = height;
        designPaper.target.css("height", newHeightMm + "mm");
        designPaper.target.attr("original-height", newHeightMm);
      }
    }

    /**
     * 根据参考元素获取打印起始位置
     * @param {object} designPaper - 设计纸张对象
     * @returns {number} 打印起始位置
     */
    getBeginPrintTopInPaperByReferenceElement(designPaper) {
      const top = this.options.getTop();
      return this.isHeaderOrFooter() || this.isFixed()
        ? top
        : designPaper.referenceElement.isPositionLeftOrRight(top)
        ? designPaper.referenceElement.printTopInPaper +
          (top - designPaper.referenceElement.top)
        : designPaper.referenceElement.bottomInLastPaper +
          (top -
            (designPaper.referenceElement.top +
              designPaper.referenceElement.height));
    }

    /**
     * 设置元素样式
     * @param {object} target - 目标元素
     * @param {object} data - 数据对象
     */
    css(target, data) {
      const self = this;
      const cssRules = [];
      const configOptions = this.getConfigOptions();

      if (configOptions) {
        let options;
        if (configOptions.tabs && configOptions.tabs.length) {
          options = [];
          configOptions.tabs.forEach(function (tab) {
            options = options.concat(tab.options);
          });
        } else {
          options = configOptions.supportOptions;
        }
        if (options) {
          options.forEach(function (option) {
            const optionItem = require_PrintElementOptionItemManager.a.getItem(
              option.name
            );
            if (optionItem && optionItem.css) {
              const cssRule = optionItem.css(
                target,
                self.options.getValueFromOptionsOrDefault(option.name)
              );
              if (cssRule) cssRules.push(cssRule);
            }
          });
        }
      }

      this.stylerCss(target, data);
    }

    /**
     * 设置自定义样式
     * @param {object} target - 目标元素
     * @param {object} data - 数据对象
     */
    stylerCss(target, data) {
      const styler = this.getStyler();

      if (styler) {
        const styles = styler(
          data,
          this.options,
          target,
          this._currenttemplateData
        );
        if (styles) {
          Object.keys(styles).forEach(function (styleName) {
            target.css(styleName, styles[styleName]);
          });
        }
      }
    }

    /**
     * 获取数据
     * @param {object} templateData - 模板数据
     * @returns {*} 数据值
     */
    getData(templateData) {
      const field = this.getField();
      return templateData
        ? field
          ? field
              .split(".")
              .reduce(
                (acc, curr) =>
                  acc ? acc[curr] : templateData ? templateData[curr] : "",
                false
              ) || ""
          : ""
        : this.printElementType.getData();
    }

    /**
     * 从类型复制属性
     * @returns {object} 选项对象
     */
    copyFromType() {
      const options = this.options;
      const type = this.printElementType;
      const configOptions = this.getConfigOptions();
      let optionNames = [];
      if (configOptions && configOptions.tabs && configOptions.tabs.length) {
        configOptions.tabs.forEach(function (tab) {
          tab.options.forEach(function (option) {
            optionNames.push(option.name);
          });
        });
      } else {
        optionNames = configOptions.supportOptions.map(function (option) {
          return option.name;
        });
      }
      Object.keys(type).forEach(function (key) {
        if (type[key] && key !== "columns" && optionNames.indexOf(key) > -1) {
          options[key] =
            typeof type[key] === "function" ? type[key].toString() : type[key];
        }
      });
      return options;
    }

    /**
     * 获取打印元素选项标签页
     * @returns {array} 选项标签页数组
     */
    getPrintElementOptionTabs() {
      if (this._printElementOptionTabs) return this._printElementOptionTabs;
      const tabs = [];
      const configOptions = this.getConfigOptions();
      if (configOptions) {
        const tabOptions = configOptions.tabs;
        if (tabOptions) {
          tabOptions.forEach(function (tab, index) {
            tabs.push({ name: tab.name, list: [] });
            tab.options
              .filter(function (option) {
                return !option.hidden;
              })
              .forEach(function (option) {
                const optionItem =
                  require_PrintElementOptionItemManager.a.getItem(option.name);
                tabs[index].list.push(optionItem);
              });
          });
        }
      }
      this._printElementOptionTabs = tabs;
      this._printElementOptionItems = void 0;
      return this._printElementOptionTabs;
    }

    /**
     * 获取打印元素选项列表
     * @returns {array} 选项列表数组
     */
    getPrintElementOptionItems() {
      if (this._printElementOptionItems) return this._printElementOptionItems;
      const items = [];
      const configOptions = this.getConfigOptions();

      if (configOptions) {
        let options;
        if (configOptions.tabs && configOptions.tabs.length) {
          options = [];
          configOptions.tabs.forEach(function (tab) {
            options = options.concat(tab.options);
          });
        } else {
          options = configOptions.supportOptions;
        }
        if (options) {
          options
            .filter(function (option) {
              return !option.hidden;
            })
            .forEach(function (option) {
              const optionItem =
                require_PrintElementOptionItemManager.a.getItem(option.name);
              items.push(optionItem);
            });
        }
      }

      this._printElementOptionItems = this.filterOptionItems(items.concat());
      this._printElementOptionTabs = void 0;
      return this._printElementOptionItems;
    }

    /**
     * 根据名称获取打印元素选项列表
     * @param {string} name - 选项名称
     * @returns {array} 选项列表数组
     */
    getPrintElementOptionItemsByName(name) {
      const items = [];
      const configOptions = this.getConfigOptionsByName(name);

      if (configOptions) {
        let options;
        if (configOptions.tabs && configOptions.tabs.length) {
          options = [];
          configOptions.tabs.forEach(function (tab) {
            options = options.concat(tab.options);
          });
        } else {
          options = configOptions.supportOptions;
        }
        if (options) {
          options
            .filter(function (option) {
              return !option.hidden;
            })
            .forEach(function (option) {
              const optionItem =
                require_PrintElementOptionItemManager.a.getItem(option.name);
              items.push(optionItem);
            });
        }
      }

      return items.concat();
    }

    /**
     * 过滤选项列表
     * @param {array} items - 选项列表
     * @returns {array} 过滤后的选项列表
     */
    filterOptionItems(items) {
      return this.printElementType.field
        ? items.filter(function (item) {
            return item.name !== "field";
          })
        : items;
    }

    /**
     * 创建临时容器
     */
    createTempContainer() {
      this.removeTempContainer();
      $("body").append(
        $(
          '<div class="hiprint_temp_Container hiprint-printPaper" style="overflow:hidden;height: 0px;box-sizing: border-box;"></div>'
        )
      );
    }

    /**
     * 移除临时容器
     */
    removeTempContainer() {
      $(".hiprint_temp_Container").remove();
    }

    /**
     * 获取临时容器
     * @returns {object} 临时容器jQuery对象
     */
    getTempContainer() {
      return $(".hiprint_temp_Container");
    }

    /**
     * 判断是否为页眉或页脚
     * @returns {boolean} 是否为页眉或页脚
     */
    isHeaderOrFooter() {
      return (
        this.options.getTopInDesign() < this.panel.paperHeader ||
        this.options.getTopInDesign() >= this.panel.paperFooter
      );
    }

    /**
     * 删除元素
     */
    delete() {
      if (this.designTarget) this.designTarget.remove();
    }

    /**
     * 设置当前模板数据
     * @param {object} templateData - 模板数据
     */
    setCurrenttemplateData(templateData) {
      this._currenttemplateData = templateData;
    }

    /**
     * 判断是否为固定元素
     * @returns {boolean} 是否为固定元素
     */
    isFixed() {
      return this.options.fixed;
    }

    /**
     * 元素渲染完成回调
     * @param {object} target - 目标元素
     * @param {object} event - 事件对象
     */
    onRendered(target, event) {
      if (this.printElementType && this.printElementType.onRendered) {
        this.printElementType.onRendered(
          event,
          this.options,
          target.getTarget()
        );
      }
    }

    /**
     * 创建元素位置参考线
     * @param {object} designPaper - 设计纸张对象
     */
    createLineOfPosition(designPaper) {
      const topLine = $(".toplineOfPosition.id" + this.id);
      const topPosition = $(".topPosition.id" + this.id);
      const leftLine = $(".leftlineOfPosition.id" + this.id);
      const leftPosition = $(".leftPosition.id" + this.id);
      const rightLine = $(".rightlineOfPosition.id" + this.id);
      const bottomLine = $(".bottomlineOfPosition.id" + this.id);
      const config = require_HiPrintConfig.a.instance;
      if (topLine.length) {
        topLine.css("top", this.options.displayTop(true));
      } else {
        const newTopLine = $(
          '<div class="toplineOfPosition id' +
            this.id +
            '" style="position: absolute; width: 100%;"></div>'
        );
        newTopLine.css("top", this.options.displayTop(true));
        newTopLine.css("width", designPaper.displayWidth());
        this.designTarget
          .parents(".hiprint-printPaper-content")
          .append(newTopLine);
      }
      if (config.showPosition) {
        if (topPosition.length) {
          topPosition.toggleClass(
            "topPosition-lineMode",
            config.positionLineMode
          );
          topPosition.text(
            this.options.posTop() + (config.positionUnit ? "pt" : "")
          );
          topPosition.css(
            "top",
            this.options.posTop() - topPosition.height() + "pt"
          );
          if (config.positionLineMode) {
            topPosition.css(
              "left",
              this.options.posLeft() - topPosition.width() / 2 + "pt"
            );
          } else {
            topPosition.css("left", this.options.posLeft() + 2 + "pt");
          }
          if (this.designTarget.find(".size-box")) {
            this.designTarget.find(".size-box").toggleClass("hide", true);
          }
        } else {
          const newTopPosition = $(
            '<div class="topPosition id' +
              this.id +
              '" style="position: absolute;"></div>'
          );
          newTopPosition.toggleClass(
            "topPosition-lineMode",
            config.positionLineMode
          );
          newTopPosition.text(
            this.options.posTop() + (config.positionUnit ? "pt" : "")
          );
          if (config.positionLineMode) {
            newTopPosition.css(
              "left",
              this.options.posLeft() - newTopPosition.width() / 2 + "pt"
            );
          } else {
            newTopPosition.css("left", this.options.posLeft() + 2 + "pt");
          }
          if (this.designTarget.find(".size-box")) {
            this.designTarget.find(".size-box").toggleClass("hide", true);
          }
          this.designTarget
            .parents(".hiprint-printPaper-content")
            .append(newTopPosition);
          newTopPosition.css(
            "top",
            this.options.posTop() - newTopPosition.height() + "pt"
          );
        }
      }
      if (leftLine.length) {
        leftLine.css("left", this.options.displayLeft(true));
      } else {
        const newLeftLine = $(
          '<div class="leftlineOfPosition id' +
            this.id +
            '" style="position: absolute;height: 100%;"></div>'
        );
        newLeftLine.css("left", this.options.displayLeft(true));
        newLeftLine.css("height", designPaper.displayHeight());
        this.designTarget
          .parents(".hiprint-printPaper-content")
          .append(newLeftLine);
      }
      if (config.showPosition) {
        if (leftPosition.length) {
          leftPosition.text(
            this.options.posLeft() + (config.positionUnit ? "pt" : "")
          );
          leftPosition.toggleClass(
            "leftPosition-lineMode",
            config.positionLineMode
          );
          leftPosition.css(
            "left",
            this.options.posLeft() - leftPosition.width() + "pt"
          );
          if (config.positionLineMode) {
            leftPosition.css(
              "top",
              this.options.posTop() - leftPosition.height() / 3 + "pt"
            );
          } else {
            leftPosition.css("top", this.options.posTop() + 2 + "pt");
          }
        } else {
          const newLeftPosition = $(
            '<div class="leftPosition id' +
              this.id +
              '" style="position: absolute;"></div>'
          );
          newLeftPosition.text(
            this.options.posLeft() + (config.positionUnit ? "pt" : "")
          );
          newLeftPosition.toggleClass(
            "leftPosition-lineMode",
            config.positionLineMode
          );
          if (config.positionLineMode) {
            newLeftPosition.css(
              "top",
              this.options.posTop() - newLeftPosition.height() / 3 + "pt"
            );
          } else {
            newLeftPosition.css("top", this.options.posTop() + 2 + "pt");
          }
          this.designTarget
            .parents(".hiprint-printPaper-content")
            .append(newLeftPosition);
          newLeftPosition.css(
            "left",
            this.options.posLeft() - newLeftPosition.width() + "pt"
          );
        }
      }
      if (rightLine.length) {
        rightLine.css(
          "left",
          this.options.getLeft() + this.options.getWidth() + "pt"
        );
      } else {
        const newRightLine = $(
          '<div class="rightlineOfPosition id' +
            this.id +
            '" style="position: absolute;height: 100%;"></div>'
        );
        newRightLine.css(
          "left",
          this.options.getLeft() + this.options.getWidth() + "pt"
        );
        newRightLine.css("height", designPaper.displayHeight());
        this.designTarget
          .parents(".hiprint-printPaper-content")
          .append(newRightLine);
      }
      if (bottomLine.length) {
        bottomLine.css(
          "top",
          this.options.getTop() + this.options.getHeight() + "pt"
        );
      } else {
        const newBottomLine = $(
          '<div class="bottomlineOfPosition id' +
            this.id +
            '" style="position: absolute;width: 100%;"></div>'
        );
        newBottomLine.css(
          "top",
          this.options.getTop() + this.options.getHeight() + "pt"
        );
        newBottomLine.css("width", designPaper.displayWidth());
        this.designTarget
          .parents(".hiprint-printPaper-content")
          .append(newBottomLine);
      }
    }

    /**
     * 移除元素位置参考线
     */
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

    /**
     * 获取字体列表
     * @returns {array} 字体列表
     */
    getFontList() {
      let fontList = this.options.fontList;
      if (!fontList) {
        fontList = require_HiPrintlib.a.instance
          .getPrintTemplateById(this.templateId)
          .getFontList();
      }
      return fontList;
    }

    /**
     * 获取字段列表
     * @returns {array} 字段列表
     */
    getFields() {
      if (this.printElementType.type === "table") {
        return this.options.tableFields;
      }
      let fields = this.options.fields;
      if (!fields) {
        fields = require_HiPrintlib.a.instance
          .getPrintTemplateById(this.templateId)
          .getFields();
      }
      return fields;
    }

    /**
     * 获取图片选择点击事件
     * @returns {function} 图片选择点击事件处理函数
     */
    getOnImageChooseClick() {
      let onImageChooseClick = this.options.onImageChooseClick;
      if (!onImageChooseClick) {
        onImageChooseClick = require_HiPrintlib.a.instance
          .getPrintTemplateById(this.templateId)
          .getOnImageChooseClick();
      }
      return onImageChooseClick;
    }

    /**
     * 绑定复制事件
     * @param {object} target - 目标元素
     */
    bindCopyEvent(target) {
      const self = this;
      target.keydown(function (event) {
        if (self._editing) {
          if (!event.altKey && event.keyCode === 13) {
            self.updateByContent();
            return;
          }
        }
        if ((event.ctrlKey || event.metaKey) && event.keyCode === 67) {
          self.copyJson();
          event.preventDefault();
        }
      });
    }

    /**
     * 复制元素JSON数据
     */
    copyJson() {
      try {
        const self = this;
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
        self.designTarget.focus();
        console.log("copyJson success");
      } catch (error) {
        console.log("copyJson error", error);
      }
    }

    /**
     * 克隆元素
     * @param {boolean} isNew - 是否新建
     * @returns {object} 克隆的元素对象
     */
    clone(isNew) {
      const self = this;
      const newElement = self.printElementType.createPrintElement();
      Object.keys(self.options).forEach(function (key) {
        newElement.options[key] = self.options[key];
      });
      return newElement;
    }

    /**
     * 获取格式化函数
     * @returns {function} 格式化函数
     */
    getFormatter() {
      let formatter;
      if (this.printElementType.formatter) {
        formatter = this.printElementType.formatter;
      }
      if (this.options.formatter) {
        try {
          const script = "formatter=" + this.options.formatter;
          eval(script);
        } catch (error) {
          console.log(error);
        }
      }
      return formatter;
    }

    /**
     * 获取样式处理函数
     * @returns {function} 样式处理函数
     */
    getStyler() {
      let stylerFunction;
      if (this.printElementType.styler) {
        stylerFunction = this.printElementType.styler;
      }
      if (this.options.styler) {
        try {
          const script = "stylerFunction=" + this.options.styler;
          eval(script);
        } catch (error) {
          console.log(error);
        }
      }
      return stylerFunction;
    }

    /**
     * 绑定键盘移动事件
     * @param {object} target - 目标元素
     * @param {object} event - 事件对象
     */
    bindKeyboardMoveEvent(target, event) {
      const self = this;
      let left;
      let top;
      target.attr("tabindex", "1");
      target.keydown(function (keyEvent) {
        if (keyEvent.target.tagName === "INPUT") {
          return;
        }
        if (self._editing && !keyEvent.altKey) {
          return;
        }
        if (self.options.draggable === false) {
          return;
        }
        const elements = self.panel.printElements.filter(function (element) {
          return (
            element.designTarget.children().last().css("display") === "block" &&
            !element.printElementType.type.includes("table")
          );
        });
        const isMultiple = elements.length > 1;
        const movingDistance = require_HiPrintConfig.a.instance.movingDistance;
        switch (keyEvent.keyCode) {
          case 8:
          case 46:
            const template = require_HiPrintlib.a.instance.getPrintTemplateById(
              self.templateId
            );
            template.deletePrintElement(self);
            hinnn.event.trigger(
              "hiprintTemplateDataChanged_" + self.templateId,
              "删除"
            );
            hinnn.event.trigger("clearSettingContainer");
            elements.forEach((ele) => {
              template.deletePrintElement(ele);
              hinnn.event.trigger(
                "hiprintTemplateDataChanged_" + ele.templateId,
                "删除"
              );
            });
            hinnn.event.trigger("clearSettingContainer");
            break;
          case 37:
            left = self.options.getLeft();
            if (isMultiple) {
              elements.forEach(function (element) {
                element.updatePositionByMultipleSelect(0 - movingDistance, 0);
              });
            } else {
              self.updateSizeAndPositionOptions(left - movingDistance);
              target.css("left", self.options.displayLeft());
            }
            keyEvent.preventDefault();
            break;
          case 38:
            top = self.options.getTop();
            if (isMultiple) {
              elements.forEach(function (element) {
                element.updatePositionByMultipleSelect(0, 0 - movingDistance);
              });
            } else {
              self.updateSizeAndPositionOptions(void 0, top - movingDistance);
              target.css("top", self.options.displayTop());
            }
            keyEvent.preventDefault();
            break;
          case 39:
            left = self.options.getLeft();
            if (isMultiple) {
              elements.forEach(function (element) {
                element.updatePositionByMultipleSelect(movingDistance, 0);
              });
            } else {
              self.updateSizeAndPositionOptions(left + movingDistance);
              target.css("left", self.options.displayLeft());
            }
            keyEvent.preventDefault();
            break;
          case 40:
            top = self.options.getTop();
            if (isMultiple) {
              elements.forEach(function (element) {
                element.updatePositionByMultipleSelect(0, movingDistance);
              });
            } else {
              self.updateSizeAndPositionOptions(void 0, top + movingDistance);
              target.css("top", self.options.displayTop());
            }
            keyEvent.preventDefault();
        }
        if ([37, 38, 39, 40].includes(keyEvent.keyCode)) {
          hinnn.event.trigger(
            "hiprintTemplateDataChanged_" + self.templateId,
            "键盘移动"
          );
        }
      });
    }

    /**
     * 判断元素是否在指定区域内
     * @param {object} event - 事件对象
     * @returns {boolean} 是否在区域内
     */
    inRect(event) {
      const scale = this.designPaper.scale || 1;
      const x1 = this.designTarget[0].offsetLeft;
      const y1 = this.designTarget[0].offsetTop;
      const height = this.designTarget[0].offsetHeight;
      const width = this.designTarget[0].offsetWidth;
      const x2 = x1 + width;
      const y2 = y1 + height;
      const ex1 = $(event.target[0]).position().left / scale;
      const ey1 = $(event.target[0]).position().top / scale;
      const eventHeight = event.target[0].offsetHeight;
      const eventWidth = event.target[0].offsetWidth;
      const ex2 = ex1 + eventWidth;
      const ey2 = ey1 + eventHeight;
      return ex1 < x2 && ex2 > x1 && y1 < ey2 && y2 > ey1;
    }

    /**
     * 多选状态设置
     * @param {boolean} isSelected - 是否选中
     */
    multipleSelect(isSelected) {
      if (isSelected) {
        this.designTarget.addClass("multipleSelect");
      } else {
        this.designTarget.removeClass("multipleSelect");
      }
    }

    /**
     * 多选状态下更新元素位置
     * @param {number} deltaX - X轴位移
     * @param {number} deltaY - Y轴位移
     */
    updatePositionByMultipleSelect(deltaX, deltaY) {
      if (this.options.draggable === false) return;
      this.updateSizeAndPositionOptions(
        deltaX + this.options.getLeft(),
        deltaY + this.options.getTop()
      );
      this.designTarget.css("left", this.options.displayLeft());
      this.designTarget.css("top", this.options.displayTop());
    }
  }

  return BasePrintElement;
}
