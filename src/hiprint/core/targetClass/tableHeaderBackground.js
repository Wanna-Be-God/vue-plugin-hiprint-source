import { i18n } from "../../i18n/i18n";

class TableHeaderBackground {
  constructor() {
    this.name = "tableHeaderBackground";
  }

  // 设置或清除表头背景颜色
  css(element, background) {
    const tableHeader = element.find("thead");

    if (tableHeader.length) {
      if (background) {
        tableHeader.css("background", background);
        return `background:${background}`;
      }

      tableHeader.map(function (index, header) {
        header.style.background = "";
      });
    }

    return null;
  }

  // 创建表头背景颜色设置面板
  createTarget() {
    this.target = $(
      `<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表头背景")}
        </div>
        <div class="hiprint-option-item-field">
          <input type="text" class="auto-submit" />
        </div>
      </div>`
    );

    return this.target;
  }

  // 获取当前选定的背景颜色值
  getValue() {
    const backgroundValue = this.target.find("input").val();
    if (backgroundValue) {
      return backgroundValue.toString();
    }
  }

  // 设置背景颜色
  setValue(value) {
    this.target.find("input").minicolors({
      defaultValue: value || "",
      theme: "bootstrap",
    });

    this.target.find("input").val(value);
  }

  // 销毁当前设置
  destroy() {
    this.target.remove();
  }
}

export default TableHeaderBackground;
