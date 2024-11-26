export default function (module, exports) {
  // 定义变量
  var jQueryInstance, ContextMenu;

  // 初始化jQuery实例
  window, document, (jQueryInstance = jQuery);

  // 定义ContextMenu构造函数
  ContextMenu = function ContextMenu(element, options) {
    this.init(element, options);
  };

  // ContextMenu原型方法
  ContextMenu.prototype = {
    // 初始化方法，设置默认配置并合并用户传入的配置
    init: function init(element, options) {
      // 设置实例的element和配置
      this.ele = element;
      this.defaults = {
        menu: [
          {
            text: "text", // 菜单项文本
            menus: [{}, {}], // 子菜单
            callback: function callback() {}, // 点击回调
          },
        ],
        target: function target(element) {}, // 目标元素的回调
        width: 100, // 菜单宽度
        itemHeight: 28, // 每个菜单项的高度
        bgColor: "#fff", // 背景色
        color: "#333", // 字体颜色
        fontSize: 14, // 字体大小
        hoverBgColor: "#f5f5f5", // hover时背景色
      };
      // 合并默认配置与用户传入的配置
      this.opts = jQueryInstance.extend(true, {}, this.defaults, options);

      // 生成随机数，用于标识实例
      this.random = new Date().getTime() + parseInt(1e3 * Math.random());

      // 绑定事件
      this.eventBind();
    },

    // 渲染菜单项的方法
    renderMenu: function renderMenu(menuItems, parentElement) {
      var self = this;
      var parent =
        parentElement ||
        $('<ul class="hicontextmenu" style="z-index: 9999;"></ul>');

      // 如果有子菜单
      if (menuItems && menuItems.length) {
        // 为根菜单添加class
        parent.addClass("hicontextmenuroot");

        // 遍历每个菜单项
        $.each(menuItems, function (index, menuItem) {
          // 检查菜单项是否禁用
          var isDisabled = !!menuItem.disable && menuItem.disable();

          // 创建菜单项
          var menuItemElement = $(
            '<li class="hicontextmenuitem"><a href="javascript:void(0);"><span>' +
              (menuItem.text || "") +
              "</span></a></li>"
          );

          // 如果菜单项被禁用，添加disabled类
          if (isDisabled) {
            menuItemElement.addClass("disable");
          }

          // 如果菜单项有底部边框，添加样式
          if (menuItem.borderBottom) {
            menuItemElement.addClass("borderBottom");
          }

          // 如果有子菜单，递归渲染子菜单
          if (menuItem.menus) {
            menuItemElement.addClass("hicontextsubmenu");
            self.renderMenu(menuItem.menus, menuItemElement);
          }

          // 绑定菜单项的点击事件
          if (menuItem.callback) {
            menuItemElement.click(function (event) {
              // 如果菜单项禁用，阻止事件传播
              if ($(this).hasClass("disable")) {
                event.stopPropagation();
              } else {
                // 移除菜单并执行回调
                $(".hicontextmenuroot").remove();
                menuItem.callback();
                event.stopPropagation();
              }
            });
          }

          // 将菜单项添加到菜单列表中
          parent.append(menuItemElement);
        });

        // 如果父元素存在，添加菜单到父元素
        if (parentElement) {
          parentElement.append(parent);
        }
      }

      // 如果没有父元素，添加到body并隐藏
      if (!parentElement) {
        $("body").append(parent).find(".hicontextmenuroot").hide();
      }
    },

    // 设置菜单位置的方法
    setPosition: function setPosition(event) {
      $(".hicontextmenuroot")
        .css({
          left: event.pageX + 2, // x坐标
          top: event.pageY + 2, // y坐标
        })
        .show(); // 显示菜单
    },

    // 绑定事件的方法
    eventBind: function eventBind() {
      var self = this;

      // 绑定右键菜单事件
      this.ele.on("contextmenu", function (event) {
        // 移除已存在的菜单
        $(".hicontextmenuroot").remove();

        // 阻止默认的右键菜单
        event.preventDefault();

        // 渲染新的菜单并设置位置
        self.renderMenu(self.opts.menus);
        self.setPosition(event);

        // 执行目标回调（如果有）
        if (self.opts.target && typeof self.opts.target === "function") {
          self.opts.target(jQueryInstance(this));
        }
      });

      // 绑定body的点击事件，点击后移除菜单
      jQueryInstance("body").on("click", function () {
        jQueryInstance(".hicontextmenuroot").remove();
      });
    },
  };

  // 为jQuery对象添加hicontextMenu插件
  jQueryInstance.fn.hicontextMenu = function (options) {
    new ContextMenu(this, options);
    return this;
  };
}
