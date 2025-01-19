/*
 * @Author: WANAN && 2506179675@qq.com
 * @Date: 2025-01-18 22:45:36
 * @LastEditors: WANAN
 * @LastEditTime: 2025-01-19 20:35:01
 * @Description: 
 */
import { i18n } from "../../i18n/i18n";

export default class TableFooterBorder {
  constructor() {
    this.name = "tableFooterBorder";
  }

  css(element, style) {
    if (element.find("tfoot tr").length) {
      if (style === "border" || style === undefined) {
        return element.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-all");
      }
      if (style === "noBorder") {
        element.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-none");
      } else if (style === "leftBorder") {
        element.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-left");
      } else if (style === "rightBorder") {
        element.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-right");
      } else if (style === "leftRightBorder") {
        element.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-lr");
      } else if (style === "topBorder") {
        element.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-top");
      } else if (style === "bottomBorder") {
        element.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-bottom");
      } else if (style === "topBottomBorder") {
        element.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-tb");
      } else {
        element.find("tfoot tr").removeClass();
      }
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表尾边框")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="border">${i18n.__("有边框")}</option>
            <option value="noBorder">${i18n.__("无边框")}</option>
            <option value="leftBorder">${i18n.__("左边框")}</option>
            <option value="rightBorder">${i18n.__("右边框")}</option>
            <option value="leftRightBorder">${i18n.__("左右边框")}</option>
            <option value="topBorder">${i18n.__("上边框")}</option>
            <option value="bottomBorder">${i18n.__("下边框")}</option>
            <option value="topBottomBorder">${i18n.__("上下边框")}</option>
          </select>
        </div>
      </div>
    `);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return value.toString();
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}