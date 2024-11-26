/**
 * 元素提供可拖拽的功能
 * 通过 jQuery 插件的方式实现，允许用户在页面上拖动元素。函数支持配置代理元素、拖拽的轴向限制、对齐线的显示、以及拖拽的回调函数等。它还处理了拖拽过程中与其他可放置元素的交互逻辑，如进入、悬停和离开事件。
 */
export default function (module, exports, require) {
  !(function ($) {
    function updatePosition(event) {
      const draggableData = $.data(event.data.target, "hidraggable");
      const options = draggableData.options;
      const proxy = draggableData.proxy;
      const eventData = event.data;
      const scale = draggableData.options.getScale() || 1;
      let newLeft =
        eventData.startLeft + (event.pageX - eventData.startX) / scale;
      let newTop =
        eventData.startTop + (event.pageY - eventData.startY) / scale;
      if (proxy) {
        if (proxy.parent()[0] === document.body) {
          newLeft =
            options.deltaX != null
              ? event.pageX + options.deltaX
              : event.pageX - event.data.offsetWidth;
          newTop =
            options.deltaY != null
              ? event.pageY + options.deltaY
              : event.pageY - event.data.offsetHeight;
        } else {
          if (options.deltaX != null)
            newLeft += event.data.offsetWidth + options.deltaX;
          if (options.deltaY != null)
            newTop += event.data.offsetHeight + options.deltaY;
        }
      }
      if (event.data.parent !== document.body) {
        newLeft += $(event.data.parent).scrollLeft();
        newTop += $(event.data.parent).scrollTop();
      }
      if (options.axis === "h") {
        eventData.left = newLeft;
      } else if (options.axis === "v") {
        eventData.top = newTop;
      } else if (event.shiftKey && event.altKey) {
        eventData.top = newTop;
      } else if (event.shiftKey) {
        eventData.left = newLeft;
      } else {
        eventData.left = newLeft;
        eventData.top = newTop;
      }
    }
    function updateProxyPosition(event) {
      const draggableData = $.data(event.data.target, "hidraggable");
      const options = draggableData.options;
      let proxy = draggableData.proxy || $(event.data.target);
      proxy.css({
        left: $.fn.dragLengthC(event.data.left, options),
        top: $.fn.dragLengthC(event.data.top, options),
      });
      $("body").css("cursor", options.cursor);
    }
    function startDrag(event) {
      $.fn.hidraggable.isDragging = true;
      const draggableData = $.data(event.data.target, "hidraggable");
      const options = draggableData.options;
      const droppables = $(".hidroppable")
        .filter(function () {
          return event.data.target !== this;
        })
        .filter(function () {
          const accept = $.data(this, "hidroppable").options.accept;
          return (
            !accept ||
            $(accept).filter(function () {
              return this === event.data.target;
            }).length > 0
          );
        });
      draggableData.hidroppables = droppables;
      let proxy = draggableData.proxy;
      if (!proxy) {
        if (options.proxy) {
          proxy =
            options.proxy === "clone"
              ? $(event.data.target).clone().insertAfter(event.data.target)
              : options.proxy.call(event.data.target, event.data.target);
          draggableData.proxy = proxy;
        } else {
          proxy = $(event.data.target);
        }
      }
      proxy.css("position", "absolute");
      updatePosition(event);
      updateProxyPosition(event);
      options.onStartDrag.call(event.data.target, event);
      return false;
    }
    function createVerticalLine(op, cp, t, tt, height, parentContainer) {
      if (Math.abs(op[t] - cp[tt]) <= HIPRINT_CONFIG.adsorbLineMin) {
        if (op.v.length) {
          op.v.css("left", `${op[t]}pt`);
        } else {
          op.v = $(`<div class='verLine id-${op.id}'></div>`);
          op.v.css("height", `${height}pt`);
          op.v.css("left", `${op[t]}pt`);
          parentContainer.append(op.v);
        }
      } else {
        op.v && op.v.remove();
      }
    }
    function removeVerticalLine(op) {
      if (op) op.v && op.v.remove();
      $(".verLine").remove();
    }
    function createHorizontalLine(op, cp, t, tt, width, parentContainer) {
      if (Math.abs(op[t] - cp[tt]) <= HIPRINT_CONFIG.adsorbLineMin) {
        if (op.h.length) {
          op.h.css("top", `${op[t]}pt`);
        } else {
          op.h = $(`<div class='horLine id-${op.id}'></div>`);
          op.h.css("width", `${width}pt`);
          op.h.css("top", `${op[t]}pt`);
          parentContainer.append(op.h);
        }
      } else {
        op.h && op.h.remove();
      }
    }
    function removeHorizontalLine(op) {
      if (op) op.h && op.h.remove();
      $(".horLine").remove();
    }
    function onDrag(event) {
      const draggableData = $.data(event.data.target, "hidraggable");
      updatePosition(event);
      if (
        !(event.ctrlKey || event.metaKey) &&
        (event.data.target.className.startsWith("resize-panel") ||
          event.data.target.style.zIndex === "2" ||
          event.data.target.className.startsWith("hiprint-printElement"))
      ) {
        const data = event.data;
        if (
          $(".mouseRect").length === 0 &&
          draggableData.options.designTarget &&
          draggableData.options.designTarget.panel.printElements.filter(
            (el) => {
              return (
                el.designTarget.children().last().css("display") === "block" &&
                !el.printElementType.type.includes("table")
              );
            }
          ).length <= 1
        ) {
          let left = window.hinnn.px.toPt(data.left);
          let top = window.hinnn.px.toPt(data.top);
          let currentPosition = draggableData.options.designTarget.options;
          currentPosition.left = left;
          currentPosition.top = top;
          currentPosition.right = left + currentPosition.width;
          currentPosition.bottom = top + currentPosition.height;
          currentPosition.vCenter = left + currentPosition.width / 2;
          currentPosition.hCenter = top + currentPosition.height / 2;
          (() => {
            let otherPositions =
              draggableData.options.designTarget.panel.printElements
                .filter((el) => el.id !== draggableData.options.designTarget.id)
                .map((el) => {
                  let { left, top, width, height } = el.options;
                  let right = left + width;
                  let vCenter = left + width / 2;
                  let hCenter = top + height / 2;
                  let currentVCenter =
                    currentPosition.left + currentPosition.width / 2;
                  let currentHCenter =
                    currentPosition.top + currentPosition.height / 2;
                  let currentRight =
                    currentPosition.left + currentPosition.width;
                  let distance, d1, d2, d3;
                  d1 = Math.sqrt(
                    Math.pow(left - currentPosition.left, 2) +
                      Math.pow(hCenter - currentHCenter, 2)
                  );
                  d2 = Math.sqrt(
                    Math.pow(vCenter - currentVCenter, 2) +
                      Math.pow(hCenter - currentHCenter, 2)
                  );
                  d3 = Math.sqrt(
                    Math.pow(right - currentRight, 2) +
                      Math.pow(hCenter - currentHCenter, 2)
                  );
                  distance = Math.min(d1, d2, d3);
                  return {
                    ...el.options,
                    distance,
                    h: $(`.horLine.id-${el.id}`),
                    v: $(`.verLine.id-${el.id}`),
                    bottom: top + height,
                    right: left + width,
                    vCenter,
                    hCenter,
                  };
                })
                .sort((a, b) => a.distance - b.distance)
                .slice(0, 1);
            let paper = draggableData.options.designTarget.designPaper;
            let paperContent = paper.target.find(".hiprint-printPaper-content");
            let paperWidth = paper.width;
            let paperHeight = paper.height;
            let showAlignmentLine = HIPRINT_CONFIG.showAdsorbLine;
            let adsorbMin = HIPRINT_CONFIG.adsorbMin;
            let adsorbLineMin = HIPRINT_CONFIG.adsorbLineMin;
            otherPositions.forEach((item, idx) => {
              // 元素左边线
              if (
                Math.abs(otherPositions[idx].left - currentPosition.left) <=
                adsorbMin
              ) {
                currentPosition.left = otherPositions[idx].left;
                removeVerticalLine(otherPositions[idx]);
              } else if (
                Math.abs(otherPositions[idx].vCenter - currentPosition.left) <=
                adsorbMin
              ) {
                currentPosition.left = otherPositions[idx].vCenter;
                removeVerticalLine(otherPositions[idx]);
              } else if (
                Math.abs(otherPositions[idx].right - currentPosition.left) <=
                adsorbMin
              ) {
                currentPosition.left = otherPositions[idx].right;
                removeVerticalLine(otherPositions[idx]);
              }
              // 元素垂直中线
              if (
                Math.abs(otherPositions[idx].left - currentPosition.vCenter) <=
                adsorbMin
              ) {
                currentPosition.left =
                  otherPositions[idx].left - currentPosition.width / 2;
                removeVerticalLine(otherPositions[idx]);
              } else if (
                Math.abs(
                  otherPositions[idx].vCenter - currentPosition.vCenter
                ) <= adsorbMin
              ) {
                currentPosition.left =
                  otherPositions[idx].vCenter - currentPosition.width / 2;
                removeVerticalLine(otherPositions[idx]);
              } else if (
                Math.abs(otherPositions[idx].right - currentPosition.vCenter) <=
                adsorbMin
              ) {
                currentPosition.left =
                  otherPositions[idx].right - currentPosition.width / 2;
                removeVerticalLine(otherPositions[idx]);
              }
              // 元素右边线
              if (
                Math.abs(otherPositions[idx].left - currentPosition.right) <=
                adsorbMin
              ) {
                currentPosition.left =
                  otherPositions[idx].left - currentPosition.width;
                removeVerticalLine(otherPositions[idx]);
              } else if (
                Math.abs(otherPositions[idx].vCenter - currentPosition.right) <=
                adsorbMin
              ) {
                currentPosition.left =
                  otherPositions[idx].vCenter - currentPosition.width;
                removeVerticalLine(otherPositions[idx]);
              } else if (
                Math.abs(otherPositions[idx].right - currentPosition.right) <=
                adsorbMin
              ) {
                currentPosition.left =
                  otherPositions[idx].right - currentPosition.width;
                removeVerticalLine(otherPositions[idx]);
              }
              // 元素顶边线
              if (
                Math.abs(otherPositions[idx].top - currentPosition.top) <=
                adsorbMin
              ) {
                currentPosition.top = otherPositions[idx].top;
                removeHorizontalLine(otherPositions[idx]);
              } else if (
                Math.abs(otherPositions[idx].hCenter - currentPosition.top) <=
                adsorbMin
              ) {
                currentPosition.top = otherPositions[idx].hCenter;
                removeHorizontalLine(otherPositions[idx]);
              } else if (
                Math.abs(otherPositions[idx].bottom - currentPosition.top) <=
                adsorbMin
              ) {
                currentPosition.top = otherPositions[idx].bottom;
                removeHorizontalLine(otherPositions[idx]);
              }
              // 元素水平中线
              if (
                Math.abs(otherPositions[idx].top - currentPosition.hCenter) <=
                adsorbMin
              ) {
                currentPosition.top =
                  otherPositions[idx].top - currentPosition.height / 2;
                removeHorizontalLine(otherPositions[idx]);
              } else if (
                Math.abs(
                  otherPositions[idx].hCenter - currentPosition.hCenter
                ) <= adsorbMin
              ) {
                currentPosition.top =
                  otherPositions[idx].hCenter - currentPosition.height / 2;
                removeHorizontalLine(otherPositions[idx]);
              } else if (
                Math.abs(
                  otherPositions[idx].bottom - currentPosition.hCenter
                ) <= adsorbMin
              ) {
                currentPosition.top =
                  otherPositions[idx].bottom - currentPosition.height / 2;
                removeHorizontalLine(otherPositions[idx]);
              }
              // 元素底边线
              if (
                Math.abs(otherPositions[idx].top - currentPosition.bottom) <=
                adsorbMin
              ) {
                currentPosition.top =
                  otherPositions[idx].top - currentPosition.height;
                removeHorizontalLine(otherPositions[idx]);
              } else if (
                Math.abs(
                  otherPositions[idx].hCenter - currentPosition.bottom
                ) <= adsorbMin
              ) {
                currentPosition.top =
                  otherPositions[idx].hCenter - currentPosition.height;
                removeHorizontalLine(otherPositions[idx]);
              } else if (
                Math.abs(otherPositions[idx].bottom - currentPosition.bottom) <=
                adsorbMin
              ) {
                currentPosition.top =
                  otherPositions[idx].bottom - currentPosition.height;
                removeHorizontalLine(otherPositions[idx]);
              }
              if (showAlignmentLine) {
                if (
                  Math.abs(otherPositions[idx].left - currentPosition.left) >
                    adsorbMin &&
                  Math.abs(otherPositions[idx].left - currentPosition.left) <=
                    adsorbLineMin
                ) {
                  // 左
                  createVerticalLine(
                    otherPositions[idx],
                    currentPosition,
                    "left",
                    "left",
                    paperHeight,
                    paperContent
                  );
                } else if (
                  Math.abs(otherPositions[idx].vCenter - currentPosition.left) >
                    adsorbMin &&
                  Math.abs(
                    otherPositions[idx].vCenter - currentPosition.left
                  ) <= adsorbLineMin
                ) {
                  createVerticalLine(
                    otherPositions[idx],
                    currentPosition,
                    "vCenter",
                    "left",
                    paperHeight,
                    paperContent
                  );
                } else if (
                  Math.abs(otherPositions[idx].right - currentPosition.left) >
                    adsorbMin &&
                  Math.abs(otherPositions[idx].right - currentPosition.left) <=
                    adsorbLineMin
                ) {
                  createVerticalLine(
                    otherPositions[idx],
                    currentPosition,
                    "right",
                    "left",
                    paperHeight,
                    paperContent
                  );
                } else if (
                  Math.abs(otherPositions[idx].left - currentPosition.vCenter) >
                    adsorbMin &&
                  Math.abs(
                    otherPositions[idx].left - currentPosition.vCenter
                  ) <= adsorbLineMin
                ) {
                  // 中
                  createVerticalLine(
                    otherPositions[idx],
                    currentPosition,
                    "left",
                    "vCenter",
                    paperHeight,
                    paperContent
                  );
                } else if (
                  Math.abs(
                    otherPositions[idx].vCenter - currentPosition.vCenter
                  ) > adsorbMin &&
                  Math.abs(
                    otherPositions[idx].vCenter - currentPosition.vCenter
                  ) <= adsorbLineMin
                ) {
                  createVerticalLine(
                    otherPositions[idx],
                    currentPosition,
                    "vCenter",
                    "vCenter",
                    paperHeight,
                    paperContent
                  );
                } else if (
                  Math.abs(
                    otherPositions[idx].right - currentPosition.vCenter
                  ) > adsorbMin &&
                  Math.abs(
                    otherPositions[idx].right - currentPosition.vCenter
                  ) <= adsorbLineMin
                ) {
                  createVerticalLine(
                    otherPositions[idx],
                    currentPosition,
                    "right",
                    "vCenter",
                    paperHeight,
                    paperContent
                  );
                } else if (
                  Math.abs(otherPositions[idx].left - currentPosition.right) >
                    adsorbMin &&
                  Math.abs(otherPositions[idx].left - currentPosition.right) <=
                    adsorbLineMin
                ) {
                  // 右
                  createVerticalLine(
                    otherPositions[idx],
                    currentPosition,
                    "left",
                    "right",
                    paperHeight,
                    paperContent
                  );
                } else if (
                  Math.abs(
                    otherPositions[idx].vCenter - currentPosition.right
                  ) > adsorbMin &&
                  Math.abs(
                    otherPositions[idx].vCenter - currentPosition.right
                  ) <= adsorbLineMin
                ) {
                  createVerticalLine(
                    otherPositions[idx],
                    currentPosition,
                    "vCenter",
                    "right",
                    paperHeight,
                    paperContent
                  );
                } else if (
                  Math.abs(otherPositions[idx].right - currentPosition.right) >
                    adsorbMin &&
                  Math.abs(otherPositions[idx].right - currentPosition.right) <=
                    adsorbLineMin
                ) {
                  createVerticalLine(
                    otherPositions[idx],
                    currentPosition,
                    "right",
                    "right",
                    paperHeight,
                    paperContent
                  );
                } else if (
                  Math.abs(otherPositions[idx].top - currentPosition.top) >
                    adsorbMin &&
                  Math.abs(otherPositions[idx].top - currentPosition.top) <=
                    adsorbLineMin
                ) {
                  // 上
                  createHorizontalLine(
                    otherPositions[idx],
                    currentPosition,
                    "top",
                    "top",
                    paperWidth,
                    paperContent
                  );
                } else if (
                  Math.abs(otherPositions[idx].hCenter - currentPosition.top) >
                    adsorbMin &&
                  Math.abs(otherPositions[idx].hCenter - currentPosition.top) <=
                    adsorbLineMin
                ) {
                  createHorizontalLine(
                    otherPositions[idx],
                    currentPosition,
                    "hCenter",
                    "top",
                    paperWidth,
                    paperContent
                  );
                } else if (
                  Math.abs(otherPositions[idx].bottom - currentPosition.top) >
                    adsorbMin &&
                  Math.abs(otherPositions[idx].bottom - currentPosition.top) <=
                    adsorbLineMin
                ) {
                  createHorizontalLine(
                    otherPositions[idx],
                    currentPosition,
                    "bottom",
                    "top",
                    paperWidth,
                    paperContent
                  );
                } else if (
                  Math.abs(otherPositions[idx].top - currentPosition.hCenter) >
                    adsorbMin &&
                  Math.abs(otherPositions[idx].top - currentPosition.hCenter) <=
                    adsorbLineMin
                ) {
                  // 中
                  createHorizontalLine(
                    otherPositions[idx],
                    currentPosition,
                    "top",
                    "hCenter",
                    paperWidth,
                    paperContent
                  );
                } else if (
                  Math.abs(
                    otherPositions[idx].hCenter - currentPosition.hCenter
                  ) > adsorbMin &&
                  Math.abs(
                    otherPositions[idx].hCenter - currentPosition.hCenter
                  ) <= adsorbLineMin
                ) {
                  createHorizontalLine(
                    otherPositions[idx],
                    currentPosition,
                    "hCenter",
                    "hCenter",
                    paperWidth,
                    paperContent
                  );
                } else if (
                  Math.abs(
                    otherPositions[idx].bottom - currentPosition.hCenter
                  ) > adsorbMin &&
                  Math.abs(
                    otherPositions[idx].bottom - currentPosition.hCenter
                  ) <= adsorbLineMin
                ) {
                  createHorizontalLine(
                    otherPositions[idx],
                    currentPosition,
                    "bottom",
                    "hCenter",
                    paperWidth,
                    paperContent
                  );
                } else if (
                  Math.abs(otherPositions[idx].top - currentPosition.bottom) >
                    adsorbMin &&
                  Math.abs(otherPositions[idx].top - currentPosition.bottom) <=
                    adsorbLineMin
                ) {
                  // 下
                  createHorizontalLine(
                    otherPositions[idx],
                    currentPosition,
                    "top",
                    "bottom",
                    paperWidth,
                    paperContent
                  );
                } else if (
                  Math.abs(
                    otherPositions[idx].hCenter - currentPosition.bottom
                  ) > adsorbMin &&
                  Math.abs(
                    otherPositions[idx].hCenter - currentPosition.bottom
                  ) <= adsorbLineMin
                ) {
                  createHorizontalLine(
                    otherPositions[idx],
                    currentPosition,
                    "hCenter",
                    "bottom",
                    paperWidth,
                    paperContent
                  );
                } else if (
                  Math.abs(
                    otherPositions[idx].bottom - currentPosition.bottom
                  ) > adsorbMin &&
                  Math.abs(
                    otherPositions[idx].bottom - currentPosition.bottom
                  ) <= adsorbLineMin
                ) {
                  createHorizontalLine(
                    otherPositions[idx],
                    currentPosition,
                    "bottom",
                    "bottom",
                    paperWidth,
                    paperContent
                  );
                } else {
                  removeVerticalLine(otherPositions[idx]);
                  removeHorizontalLine(otherPositions[idx]);
                }
              }
            });
          })();
          event.data.left = window.hinnn.pt.toPx(currentPosition.left);
          event.data.top = window.hinnn.pt.toPx(currentPosition.top);
        }
        const parent = data.parent.className.endsWith("design")
          ? data.parent
          : data.parent.offsetParent;
        const paperWidth = parent.clientWidth;
        const paperHeight = parent.clientHeight;
        const elementWidth = data.target.clientWidth;
        const elementHeight = data.target.clientHeight;
        let diffLeft = 0;
        let diffTop = 0;
        if (
          draggableData.options.designTarget &&
          draggableData.options.designTarget.options.transform
        ) {
          const info = draggableData.options.designTarget.options.getRectInfo();
          diffLeft = window.hinnn.pt.toPx(info.diffW);
          diffTop = window.hinnn.pt.toPx(info.diffH);
        }
        if (data.left < 0 - diffLeft) {
          data.left = 0 - diffLeft;
        } else if (data.left >= paperWidth - elementWidth + diffLeft) {
          data.left = paperWidth - elementWidth + diffLeft;
        }
        if (data.top < 0 - diffTop) {
          data.top = 0 - diffTop;
        } else if (data.top >= paperHeight - elementHeight + diffTop) {
          data.top = paperHeight - elementHeight + diffTop;
        }
        event.data = data;
      }
      if (
        draggableData.options.onDrag.call(
          event.data.target,
          event,
          $.fn.dragLengthCNum(event.data.left, draggableData.options),
          $.fn.dragLengthCNum(event.data.top, draggableData.options)
        ) !== 0
      ) {
        updateProxyPosition(event);
      }
      const target = event.data.target;
      draggableData.hidroppables.each(function () {
        const droppable = $(this);
        if (!droppable.hidroppable("options").disabled) {
          const offset = droppable.offset();
          if (
            event.pageX > offset.left &&
            event.pageX < offset.left + droppable.outerWidth() &&
            event.pageY > offset.top &&
            event.pageY < offset.top + droppable.outerHeight()
          ) {
            if (!this.entered) {
              droppable.trigger("_dragenter", [target]);
              this.entered = true;
            }
            droppable.trigger("_dragover", [target]);
          } else if (this.entered) {
            droppable.trigger("_dragleave", [target]);
            this.entered = false;
          }
        }
      });
      return false;
    }
    function stopDrag(event) {
      $.fn.hidraggable.isDragging = false;
      removeVerticalLine();
      removeHorizontalLine();
      const draggableData = $.data(event.data.target, "hidraggable");
      const proxy = draggableData.proxy;
      const options = draggableData.options;
      if (options.revert) {
        if (revert() === 1) {
          $(event.data.target).css({
            position: event.data.startPosition,
            left: event.data.startLeft,
            top: event.data.startTop,
          });
        } else if (proxy) {
          const newLeft =
            proxy.parent()[0] === document.body
              ? event.data.startX - event.data.offsetWidth
              : event.data.startLeft;
          const newTop =
            proxy.parent()[0] === document.body
              ? event.data.startY - event.data.offsetHeight
              : event.data.startTop;
          proxy.animate({ left: newLeft, top: newTop }, removeProxy);
        } else {
          $(event.data.target).animate(
            { left: event.data.startLeft, top: event.data.startTop },
            function () {
              $(event.data.target).css("position", event.data.startPosition);
            }
          );
        }
      } else {
        $(event.data.target).css({
          position: "absolute",
          left: $.fn.dragLengthC(event.data.left, options),
          top: $.fn.dragLengthC(event.data.top, options),
        });
        revert();
      }
      function removeProxy() {
        if (proxy) proxy.remove();
        draggableData.proxy = null;
      }
      function revert() {
        let dropped = false;
        draggableData.hidroppables.each(function () {
          const droppable = $(this);
          if (!droppable.hidroppable("options").disabled) {
            const offset = droppable.offset();
            const scale =
              (this.style.transform &&
                parseFloat(this.style.transform.slice(6, -1))) ||
              1;
            if (
              event.pageX > offset.left &&
              event.pageX < offset.left + droppable.outerWidth() * scale &&
              event.pageY > offset.top &&
              event.pageY < offset.top + droppable.outerHeight() * scale
            ) {
              if (options.revert) {
                $(event.data.target).css({
                  position: event.data.startPosition,
                  left: event.data.startLeft,
                  top: event.data.startTop,
                });
              }
              droppable.trigger("_drop", [event.data.target]);
              removeProxy();
              dropped = true;
              this.entered = false;
              return false;
            }
          }
        });
        if (!dropped && !options.revert) removeProxy();
        return dropped;
      }
      options.onStopDrag.call(event.data.target, event);
      $(document).unbind(".hidraggable");
      setTimeout(() => {
        $("body").css("cursor", "");
      }, 100);
      return false;
    }
    $.fn.hidraggable = function (method, options) {
      if (typeof method === "string") {
        return $.fn.hidraggable.methods[method](this, options);
      }
      return this.each(function () {
        let instance;
        const draggableData = $.data(this, "hidraggable");
        if (draggableData) {
          draggableData.handle.unbind(".hidraggable");
          instance = $.extend(draggableData.options, method);
        } else {
          instance = $.extend(
            {},
            $.fn.hidraggable.defaults,
            $.fn.hidraggable.parseOptions(this),
            method || {}
          );
        }
        const handle = instance.handle
          ? typeof instance.handle === "string"
            ? $(instance.handle, this)
            : instance.handle
          : $(this);
        function isEdge(event) {
          const draggableData = $.data(event.data.target, "hidraggable");
          const handle = draggableData.handle;
          const offset = $(handle).offset();
          const transform =
            $(handle)[0].style.transform &&
            parseInt($(handle)[0].style.transform.slice(7, -1));
          const scale = draggableData.options.getScale();
          let width = $(handle).outerWidth();
          let height = $(handle).outerHeight();
          if (transform) {
            const rad = (transform * Math.PI) / 180;
            const originalWidth = $(handle).outerWidth();
            const originalHeight = $(handle).outerHeight();
            const sin = Math.sin(rad);
            const cos = Math.cos(rad);
            width =
              Math.abs(originalWidth * cos) + Math.abs(originalHeight * sin);
            height =
              Math.abs(originalWidth * sin) + Math.abs(originalHeight * cos);
          }
          if (scale) {
            width *= scale;
            height *= scale;
          }
          const topDistance = event.pageY - offset.top;
          const rightDistance = offset.left + width - event.pageX;
          const bottomDistance = offset.top + height - event.pageY;
          const leftDistance = event.pageX - offset.left;
          return (
            Math.min(topDistance, rightDistance, bottomDistance, leftDistance) >
            draggableData.options.edge
          );
        }
        $.data(this, "hidraggable", {
          options: instance,
          handle: handle,
        });
        if (instance.disabled) {
          $(this).css("cursor", "");
        } else {
          handle
            .unbind(".hidraggable")
            .bind("mousemove.hidraggable", { target: this }, function (event) {
              if (!$.fn.hidraggable.isDragging) {
                const options = $.data(
                  event.data.target,
                  "hidraggable"
                ).options;
                isEdge(event)
                  ? $(this).css("cursor", options.cursor)
                  : $(this).css("cursor", "");
              }
            })
            .bind("mouseleave.hidraggable", { target: this }, function () {
              $(this).css("cursor", "");
            })
            .bind("mousedown.hidraggable", { target: this }, function (event) {
              if (isEdge(event) !== 0) {
                $(this).css("cursor", "");
                const position = $(event.data.target).position();
                const offset = $(event.data.target).offset();
                const eventData = {
                  startPosition: $(event.data.target).css("position"),
                  startLeft: position.left,
                  startTop: position.top,
                  left: position.left,
                  top: position.top,
                  startX: event.pageX,
                  startY: event.pageY,
                  offsetWidth: event.pageX - offset.left,
                  offsetHeight: event.pageY - offset.top,
                  target: event.data.target,
                  parent: $(event.data.target).parent()[0],
                };
                const draggableData = $.data(event.data.target, "hidraggable");
                if (draggableData.options.draggable === false) {
                  return;
                }
                if (event.target.className === "r resizebtn") {
                  return;
                }
                const scale = draggableData.options.getScale();
                if (scale) {
                  eventData.left /= scale;
                  eventData.top /= scale;
                  eventData.startLeft /= scale;
                  eventData.startTop /= scale;
                }
                const transform =
                  eventData.target.style.transform &&
                  parseInt(eventData.target.style.transform.slice(7, -1));
                if (transform) {
                  const rad = (transform * Math.PI) / 180;
                  const originalWidth = $(event.data.target).outerWidth();
                  const originalHeight = $(event.data.target).outerHeight();
                  const sin = Math.sin(rad);
                  const cos = Math.cos(rad);
                  const width =
                    Math.abs(originalWidth * cos) +
                    Math.abs(originalHeight * sin);
                  const height =
                    Math.abs(originalWidth * sin) +
                    Math.abs(originalHeight * cos);
                  const diffWidth = (width - originalWidth) / 2;
                  const diffHeight = (height - originalHeight) / 2;
                  eventData.left += diffWidth;
                  eventData.top += diffHeight;
                  eventData.startLeft += diffWidth;
                  eventData.startTop += diffHeight;
                }
                $.extend(event.data, eventData);
                if (
                  $.data(
                    event.data.target,
                    "hidraggable"
                  ).options.onBeforeDrag.call(event.data.target, event) !== 0
                ) {
                  $(document).bind(
                    "mousedown.hidraggable",
                    event.data,
                    startDrag
                  );
                  $(document).bind("mousemove.hidraggable", event.data, onDrag);
                  $(document).bind("mouseup.hidraggable", event.data, stopDrag);
                }
              }
            });
        }
      });
    };
    $.fn.hidraggable.methods = {
      options: function (element) {
        return $.data(element[0], "hidraggable").options;
      },
      update: function (element, newOptions) {
        if (newOptions && typeof newOptions === "object") {
          const draggableData = $.data(element[0], "hidraggable");
          if (draggableData) {
            Object.keys(newOptions).forEach((key) => {
              draggableData.options[key] = newOptions[key];
            });
          }
        }
      },
      proxy: function (element) {
        return $.data(element[0], "hidraggable").proxy;
      },
      enable: function (element) {
        return element.each(function () {
          $(this).hidraggable({ disabled: false });
        });
      },
      disable: function (element) {
        return element.each(function () {
          $(this).hidraggable({ disabled: true });
        });
      },
    };
    $.fn.hidraggable.parseOptions = function (element) {
      const $element = $(element);
      return $.extend(
        {},
        $.hiprintparser.parseOptions(element, [
          "cursor",
          "handle",
          "axis",
          {
            revert: "boolean",
            deltaX: "number",
            deltaY: "number",
            edge: "number",
          },
        ]),
        {
          disabled: !!$element.attr("disabled") || undefined,
        }
      );
    };
    $.fn.hidraggable.defaults = {
      proxy: null,
      revert: false,
      cursor: "move",
      deltaX: null,
      deltaY: null,
      handle: null,
      disabled: false,
      edge: 0,
      axis: null,
      getScale: function () {},
      onBeforeDrag: function () {},
      onStartDrag: function () {},
      onDrag: function () {},
      onStopDrag: function () {},
    };
    $.fn.hidraggable.isDragging = false;
  })(jQuery);
}
