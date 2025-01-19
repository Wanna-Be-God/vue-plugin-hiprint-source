/*
 * @Author: WANAN && 2506179675@qq.com
 * @Date: 2025-01-18 23:40:19
 * @LastEditors: WANAN
 * @LastEditTime: 2025-01-18 23:40:32
 * @Description: 
 */
import { i18n } from "../../i18n/i18n";

export default class ColorTarget {
  constructor() {
    this.name = "color";
  }

  css(element, color) {
    if (element && element.length) {
      if (color) return element.css("color", color), "color:" + color;
      element[0].style.color = "";
    }
    return null;
  }

  createTarget() {
    return (
      (this.target = $(`
        <div class="hiprint-option-item">
          <div class="hiprint-option-item-label">
            ${i18n.__("字体颜色")}
          </div>
          <div class="hiprint-option-item-field">
            <input type="text" class="auto-submit"/>
          </div>
        </div>`)),
      this.target
    );
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return value.toString();
  }

  setValue(value) {
    this.target.find("input").minicolors({
      defaultValue: value || "",
      theme: "bootstrap",
    });
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}
