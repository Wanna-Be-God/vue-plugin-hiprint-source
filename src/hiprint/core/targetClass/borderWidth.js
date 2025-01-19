import { i18n } from "../../i18n/i18n";

class BorderWidth {
  constructor() {
    this.name = "borderWidth";
  }

  // 创建设置面板
  createTarget(printElement) {
    const name = ["hline", "vline", "rect", "oval"].includes(
      printElement.printElementType.type
    )
      ? `${i18n.__("线宽")}`
      : `${i18n.__("边框大小")}`;

    this.target = $(
      `<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${name}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="0.75">0.75pt</option>
            <option value="1.5">1.5pt</option>
            <option value="2.25">2.25pt</option>
            <option value="3">3pt</option>
            <option value="3.75">3.75pt</option>
            <option value="4.5">4.5pt</option>
            <option value="5.25">5.25pt</option>
            <option value="6">6pt</option>
            <option value="6.75">6.75pt</option>
          </select>
        </div>
      </div>`
    );

    return this.target;
  }

  // 设置或清除边框宽度
  css(element, borderWidth) {
    if (element && element.length) {
      if (borderWidth) {
        element.css("border-width", borderWidth + "pt");
        return `border-width:${borderWidth}pt`;
      }
      element[0].style.borderWidth = "";
    }

    return null;
  }

  // 获取当前选择的边框宽度
  getValue() {
    const borderWidth = this.target.find("select").val();
    if (borderWidth) return borderWidth.toString();
  }

  // 设置边框宽度
  setValue(value) {
    if (value) {
      if (
        !this.target.find(`option[value="${value}"]`).length
      ) {
        this.target.find("select").prepend(
          `<option value="${value}">${value}</option>`
        );
      }
      this.target.find("select").val(value);
    }
  }

  // 销毁当前设置面板
  destroy() {
    this.target.remove();
  }
}

export default BorderWidth