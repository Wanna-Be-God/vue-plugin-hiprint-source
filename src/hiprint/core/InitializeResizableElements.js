import { _instanceof, _typeof } from "../utils/Utils.js";

export default function (module, exports, require) {
  var jQueryInstance = jQuery;
  var options = { maxPanelIndex: 0 };

  class ResizableElement {
    constructor(event) {
      this.options = jQueryInstance.data(event.target, "hireizeable").options;
      this.init(event.target);
    }
    numHandlerText(value) {
      return this.numHandler(value) + "pt";
    }
    numHandler(value) {
      var minResize = this.options.minResize || 1.5;
      var calculatedValue = 0.75 * value;
      return Math.round(calculatedValue / minResize) * minResize;
    }
    init(target) {
      this.initResizeBox(target);
    }
    initResizeBox(target) {
      var self = this;
      jQueryInstance(target).each(function () {
        var panel;
        options.maxPanelIndex += 1;
        panel = self.options.noContainer
          ? jQueryInstance(target)
          : jQueryInstance(
              `<div panelIndex="${options.maxPanelIndex}" class="resize-panel"></div>`
            ).css({
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              position: "absolute",
              "background-color": "rgba(0,0,0,0.5)",
              cursor: "move",
              display: "none",
            });
        self.appendHandler(panel, jQueryInstance(this));
        var handles = [
          {
            name: "n",
            cursor: "n-resize",
            style: "top: -12px;margin-left: -4px;left: 50%;",
          },
          {
            name: "s",
            cursor: "s-resize",
            style: "bottom: -12px;margin-left: -4px;left: 50%;",
          },
          {
            name: "w",
            cursor: "w-resize",
            style: "left: -12px;margin-top: -4px;top: 50%;",
          },
          {
            name: "e",
            cursor: "e-resize",
            style: "top: 50%; margin-top:-4px;right: -12px;",
          },
          {
            name: "ne",
            cursor: "ne-resize",
            style: "top: -12px;right: -12px;",
          },
          { name: "nw", cursor: "nw-resize", style: "top: -12px;left:-12px;" },
          {
            name: "se",
            cursor: "se-resize",
            style: "bottom:-12px;right: -12px;",
          },
          {
            name: "sw",
            cursor: "sw-resize",
            style: "bottom: -12px;left: -12px;",
          },
          {
            name: "r",
            cursor:
              "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABvUExURUdwTP///9XV1R0dHf///3Nzc////////////////1ZWVq+vr/T09PX19QQEBP///////8XFxf///////////wYGBv///+jo6P///4aGhqioqMzMzP///2BgYP///////////zExMf///wAAAP///xLps0AAAAAjdFJOUwCxxOdixRDmzSDMv8/Z+tz5wWpXWPk3zALCv8KnyXZVMNuNPnv3CwAAAJ1JREFUKM/NkckOwyAMRFkDBMhC9qWr+//fWCIV1WlzrjoXS36yxmMT8hdqqKoUvRAjMtw22kvecem1GjTuK1vApmI+wQMBbQFy5li+QQRaX4AtRX+vbntAJeRl9HTTx4TiwESs61DXNUPmVQeujzVrQwh43TTxpeRBslVfMUhbiXKWyiAwvnIsMcdyJkfJYdpNvG/ltDm+bjP+8KFP8ggL+zQLGxwAAAAASUVORK5CYII=') 14 14,alias;top: -16px;margin-left: -4px;left: 50%;",
          },
        ].map((handle) => ({
          name: handle.name,
          target: jQueryInstance(
            `<div class="${handle.name} resizebtn" style="cursor: ${handle.cursor};${handle.style}"></div>`
          ),
        }));
        var sizeBox = jQueryInstance(
          '<div class="size-box" style="position: absolute;left:-2px;"></div>'
        );
        var deleteBtn = jQueryInstance('<div class="del-btn">✕</div>');
        var getResizeHandles = function () {
          var handles = [];
          var showPoints = self.options.showPoints;
          for (var i = 0; i < handles.length; i++) {
            var handle = handles[i];
            if (jQueryInstance.inArray(handle.name, showPoints) > -1) {
              handles.push(handle.target);
            }
          }
          return handles;
        };
        self.refreshSizeBox(void 0, sizeBox, panel);
        if (self.options.draggable !== false) {
          panel.append(deleteBtn);
          panel.on("mousedown", ".del-btn", () => {
            var keyboardEvent = new KeyboardEvent("keydown", {
              bubbles: true,
              keyCode: 46,
            });
            module.dispatchEvent(keyboardEvent);
          });
        }
        self.addHandlerCss(getResizeHandles());
        self.appendHandler(getResizeHandles(), panel);
        self.bindResizeEvent(panel, jQueryInstance(this));
        var currentElement = jQueryInstance(this);
        jQueryInstance(panel).on("mousedown", ".resizebtn", function () {
          currentElement.addClass("resizeing");
        });
        jQueryInstance(".easyui-droppable").on("mouseup", function () {
          currentElement.removeClass("resizeing");
        });
        self.bindTrigger(jQueryInstance(this));
      });
      self.bindHidePanel();
    }
    addHandlerCss(handles) {
      for (var i = 0; i < handles.length; i++) {
        var handle = handles[i];
        handle.css({
          position: "absolute",
          width: "8px",
          height: "8px",
          background: "#ff6600",
          "border-radius": "50%",
        });
      }
    }
    appendHandler(handles, element) {
      element.find(".resize-panel").remove();
      for (var i = 0; i < handles.length; i++) {
        element.append(handles[i]);
      }
    }
    refreshSizeBox(target, box, panel) {
      if (!this.options.showSizeBox) return;
      if (box) {
        panel.append(box);
      }
      var style, sizeBox;
      if (target && target.length) {
        style = target[0].style;
        sizeBox = target.children("div[panelindex]").find(".size-box");
      } else if (panel && panel.parent()) {
        var parent = panel.parent();
        if (parent.hasClass("hiprint-printPaper-content")) return;
        style = parent[0].style;
        if (!style.width) {
          style.width = hinnn.px.toPt(parent[0].offsetWidth) + "pt";
        }
        if (!style.height) {
          style.height = hinnn.px.toPt(parent[0].offsetHeight) + "pt";
        }
        sizeBox = parent.children("div[panelindex]").find(".size-box");
      }
      if (sizeBox) {
        sizeBox.text(style.width + " x " + style.height);
        sizeBox.css("top", -(sizeBox.outerHeight() || 20));
      }
    }
    triggerResize(target, event) {
      if (!(event.ctrlKey || event.metaKey)) {
        target.siblings().children("div[panelindex]").removeClass("selected");
        target.siblings().children("div[panelindex]").css({
          display: "none",
        });
      }
      target.children("div[panelindex]").addClass("selected");
      target.children("div[panelindex]").css({
        display: "block",
      });
      this.refreshSizeBox(target);
    }
    bindResizeEvent(panel, element) {
      var self = this;
      var startX = 0,
        startY = 0;
      var initialWidth = panel.width(),
        initialHeight = panel.height();
      var initialLeft = panel.offset().left,
        initialTop = panel.offset().top;
      var container = self.options.noContainer
        ? jQueryInstance(element)
        : panel.parent();
      var isResizingRight = false,
        isResizingBottom = false;
      var isResizingLeft = false,
        isResizingTop = false;
      var isResizingTopRight = false,
        isResizingTopLeft = false;
      var isResizingBottomRight = false,
        isResizingBottomLeft = false;
      var isRotating = false,
        isDragging = false;
      panel.on("mousedown", ".e", function (event) {
        startX = event.pageX;
        initialWidth = panel.width();
        isResizingRight = true;
      });
      panel.on("mousedown", ".s", function (event) {
        startY = event.pageY;
        initialHeight = panel.height();
        isResizingBottom = true;
      });
      panel.on("mousedown", ".w", function (event) {
        startX = event.pageX;
        initialWidth = panel.width();
        isResizingLeft = true;
        initialLeft = container.offset().left;
      });
      panel.on("mousedown", ".n", function (event) {
        startY = event.pageY;
        initialHeight = panel.height();
        isResizingTop = true;
        initialTop = container.offset().top;
      });
      panel.on("mousedown", ".ne", function (event) {
        startX = event.pageX;
        startY = event.pageY;
        initialWidth = panel.width();
        initialHeight = panel.height();
        isResizingTopRight = true;
        initialTop = container.offset().top;
      });
      panel.on("mousedown", ".nw", function (event) {
        startX = event.pageX;
        startY = event.pageY;
        initialWidth = panel.width();
        initialHeight = panel.height();
        isResizingTopLeft = true;
        initialTop = container.offset().top;
        initialLeft = container.offset().left;
      });
      panel.on("mousedown", ".se", function (event) {
        startX = event.pageX;
        startY = event.pageY;
        initialWidth = panel.width();
        initialHeight = panel.height();
        isResizingBottomRight = true;
      });
      panel.on("mousedown", ".sw", function (event) {
        startX = event.pageX;
        startY = event.pageY;
        initialWidth = panel.width();
        initialHeight = panel.height();
        isResizingBottomLeft = true;
        initialLeft = container.offset().left;
      });
      panel.on("mousedown", ".r", function (event) {
        startX = event.pageX;
        startY = event.pageY;
        initialWidth = panel.width();
        initialHeight = panel.height();
        isRotating = true;
        initialLeft = initialWidth / 2 + container.offset().left;
        initialTop = initialHeight / 2 + container.offset().top;
      });
      panel.on("dblclick", ".r", function (event) {
        container.css({ transform: "rotate(0deg)" });
        self.options.onResize(event, void 0, void 0, void 0, void 0, 0);
      });
      panel.on("mousedown", function (event) {
        self.options.onBeforeResize();
        startX = event.pageX;
        startY = event.pageY;
        initialTop = container.offset().top;
        initialLeft = container.offset().left;
        isDragging = false;
      });
      jQueryInstance(self.options.stage)
        .on("mousemove", function (event) {
          var deltaX, deltaY;
          if (isResizingRight) {
            deltaX = (event.pageX - startX) / self.options.getScale();
            panel.css({ width: "100%" });
            container.css({
              width: self.numHandlerText(initialWidth + deltaX),
            });
            self.options.onResize(
              event,
              void 0,
              self.numHandler(initialWidth + deltaX),
              void 0,
              void 0
            );
          } else if (isResizingBottom) {
            deltaY = (event.pageY - startY) / self.options.getScale();
            panel.css({ height: "100%" });
            container.css({
              height: self.numHandlerText(initialHeight + deltaY),
            });
            self.options.onResize(
              event,
              self.numHandler(initialHeight + deltaY),
              void 0,
              void 0,
              void 0
            );
          } else if (isRotating) {
            panel.css({ height: "100%" });
            var currentX = event.pageX,
              currentY = event.pageY;
            var rotationDelta = ((currentX - startX) * 360) / 100;
            startX = event.pageX;
            var lastAngle =
              (container[0].style.transform &&
                parseInt(container[0].style.transform.slice(7, -1))) ||
              0;
            var newRotation = lastAngle + rotationDelta;
            if (Math.abs(newRotation) > 360) {
              newRotation = newRotation % 360;
            }
            container.css({ transform: "rotate(" + newRotation + "deg)" });
            self.options.onResize(
              event,
              void 0,
              void 0,
              void 0,
              void 0,
              newRotation
            );
          } else if (isResizingLeft) {
            deltaX = (event.pageX - startX) / self.options.getScale();
            panel.css({ width: "100%" });
            container.css({
              width: self.numHandlerText(initialWidth - deltaX),
              left: self.numHandlerText(
                self.options.noDrag
                  ? void 0
                  : self.numHandler(initialLeft + deltaX)
              ),
            });
            self.options.onResize(
              event,
              void 0,
              self.numHandler(initialWidth - deltaX),
              void 0,
              self.options.noDrag
                ? void 0
                : self.numHandler(initialLeft + deltaX)
            );
          } else if (isResizingTop) {
            deltaY = (event.pageY - startY) / self.options.getScale();
            panel.css({ height: "100%" });
            container.css({
              height: self.numHandlerText(initialHeight - deltaY),
              top: self.numHandlerText(
                self.options.noDrag ? void 0 : initialTop + deltaY
              ),
            });
            self.options.onResize(
              event,
              self.numHandler(initialHeight - deltaY),
              void 0,
              self.options.noDrag
                ? void 0
                : self.numHandler(initialTop + deltaY),
              void 0
            );
          } else if (isResizingTopRight) {
            deltaX = (event.pageX - startX) / self.options.getScale();
            deltaY = (event.pageY - startY) / self.options.getScale();
            panel.css({ height: "100%", width: "100%" });
            container.css({
              height: self.numHandlerText(initialHeight - deltaY),
              top: self.numHandlerText(
                self.options.noDrag ? void 0 : initialTop + deltaY
              ),
              width: self.numHandlerText(initialWidth + deltaX),
            });
            self.options.onResize(
              event,
              self.numHandler(initialHeight - deltaY),
              self.numHandler(initialWidth + deltaX),
              self.options.noDrag
                ? void 0
                : self.numHandler(initialTop + deltaY),
              void 0
            );
          } else if (isResizingTopLeft) {
            deltaX = (event.pageX - startX) / self.options.getScale();
            deltaY = (event.pageY - startY) / self.options.getScale();
            panel.css({ height: "100%", width: "100%" });
            container.css({
              height: self.numHandlerText(initialHeight - deltaY),
              top: self.numHandlerText(
                self.options.noDrag ? void 0 : initialTop + deltaY
              ),
              width: self.numHandlerText(initialWidth - deltaX),
              left: self.numHandlerText(
                self.options.noDrag ? void 0 : initialLeft + deltaX
              ),
            });
            self.options.onResize(
              event,
              self.numHandler(initialHeight - deltaY),
              self.numHandler(initialWidth - deltaX),
              self.options.noDrag
                ? void 0
                : self.numHandler(initialTop + deltaY),
              self.options.noDrag
                ? void 0
                : self.numHandler(initialLeft + deltaX)
            );
          } else if (isResizingBottomRight) {
            deltaX = (event.pageX - startX) / self.options.getScale();
            deltaY = (event.pageY - startY) / self.options.getScale();
            panel.css({ width: "100%", height: "100%" });
            if (event.shiftKey) {
              container.css({
                width: self.numHandlerText(initialWidth + deltaX),
                height: self.numHandlerText(initialHeight + deltaY),
              });
              self.options.onResize(
                event,
                self.numHandler(initialHeight + deltaY),
                self.numHandler(initialWidth + deltaX),
                void 0,
                void 0
              );
            } else {
              var aspectRatio = initialHeight / initialWidth;
              var newWidth = initialWidth + deltaX,
                newHeight = initialHeight + deltaY;
              newHeight = newWidth * aspectRatio;
              container.css({
                width: self.numHandlerText(newWidth),
                height: self.numHandlerText(newHeight),
              });
              self.options.onResize(
                event,
                self.numHandler(newHeight),
                self.numHandler(newWidth),
                void 0,
                void 0
              );
            }
          } else if (isResizingBottomLeft) {
            deltaX = (event.pageX - startX) / self.options.getScale();
            deltaY = (event.pageY - startY) / self.options.getScale();
            panel.css({ width: "100%", height: "100%" });
            container.css({
              width: self.numHandlerText(initialWidth - deltaX),
              left: self.numHandlerText(
                self.options.noDrag ? void 0 : initialLeft + deltaX
              ),
              height: self.numHandlerText(initialHeight + deltaY),
            });
            self.options.onResize(
              event,
              self.numHandler(initialHeight + deltaY),
              self.numHandler(initialWidth - deltaX),
              void 0,
              self.options.noDrag
                ? void 0
                : self.numHandler(initialLeft + deltaX)
            );
          } else {
            isDragging &&
              ((deltaX = (event.pageX - startX) / self.options.getScale()),
              (deltaY = (event.pageY - startY) / self.options.getScale()),
              container.css({
                left: self.numHandlerText(
                  self.options.noDrag ? void 0 : initialLeft + deltaX
                ),
                top: self.numHandlerText(
                  self.options.noDrag ? void 0 : initialTop + deltaY
                ),
              }),
              self.options.onResize(
                event,
                void 0,
                void 0,
                self.options.noDrag
                  ? void 0
                  : self.numHandler(initialTop + deltaY),
                self.options.noDrag
                  ? void 0
                  : self.numHandler(initialLeft + deltaX)
              ));
          }
        })
        .on("mouseup", function (event) {
          if (
            isResizingRight ||
            isResizingBottom ||
            isResizingLeft ||
            isResizingTop ||
            isResizingTopRight ||
            isResizingTopLeft ||
            isResizingBottomLeft ||
            isResizingBottomRight ||
            isDragging ||
            isRotating
          ) {
            self.options.onStopResize(isRotating);
          }
          isResizingRight =
            isResizingBottom =
            isResizingLeft =
            isResizingTop =
            isResizingTopRight =
            isResizingTopLeft =
            isResizingBottomLeft =
            isResizingBottomRight =
            isDragging =
            isRotating =
              false;
        });
    }
    bindTrigger(element) {
      var self = this;
      element.on("click", function (event) {
        event.stopPropagation();
        self.triggerResize(element, event);
        jQueryInstance(".mouseRect").remove();
      });
    }
    bindHidePanel() {
      if (options.maxPanelIndex < 2) {
        var stage = this.options.stage;
        jQueryInstance(stage).bind("click", function (event) {
          if (
            event.target.className &&
            _typeof(event.target.className) == "string" &&
            event.target.className.includes("design")
          ) {
            event.stopPropagation();
            jQueryInstance("div[panelindex]").css({ display: "none" });
            jQueryInstance("div[panelindex]").removeClass("selected");
          }
        });
      }
    }
  }
  jQueryInstance.fn.extend({
    hireizeable: function (options) {
      return this.each(function () {
        var instance;
        var existingData = jQueryInstance.data(this, "hireizeable");
        instance = existingData
          ? jQueryInstance.extend({}, existingData.options, options || {})
          : jQueryInstance.extend(
              {},
              jQueryInstance.fn.hireizeable.defaults,
              options || {}
            );
        jQueryInstance.data(this, "hireizeable", { options: instance });
        new ResizableElement({
          target: this,
          onResize: function (event, height, width, top, left, rotation) {},
          onStopResize: function (isRotating) {},
        });
      });
    },
  });
  jQueryInstance.fn.hireizeable.defaults = {
    stage: document,
    reizeUnit: "pt",
    minResize: 1.5,
    showSizeBox: true,
    showPoints: ["s", "e"],
    noContainer: false,
    onBeforeResize: function (event, height, width, top, left) {},
    onResize: function (event, height, width, top, left, rotation) {},
    onStopResize: function (isRotating) {},
    noDrag: false,
  };
}
