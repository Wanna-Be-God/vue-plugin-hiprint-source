/*
 * @Author: WANAN && 2506179675@qq.com
 * @Date: 2025-01-18 22:07:36
 * @LastEditors: WANAN
 * @LastEditTime: 2025-01-19 20:29:04
 * @Description: 
 */
import { i18n } from "../../i18n/i18n";

class TableBorder {
  constructor() {
    this.name = "tableBorder";
  }

  // 设置表格边框的 CSS 样式
  setCss(element, borderType) {
    const tableElement = element.find("table");
    if (tableElement.length) {
      if (borderType === "border" || borderType === undefined) {
        tableElement.css("border", "1px solid");
        return "border:1px solid";
      }
      if (borderType === "noBorder") {
        tableElement.css("border", "0px solid");
      } else {
        tableElement[0].style.border = "";
      }
    }
    return null;
  }

  // 创建目标元素
  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表格边框")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="border">${i18n.__("有边框")}</option>
            <option value="noBorder">${i18n.__("无边框")}</option>
          </select>
        </div>
      </div>
    `);
    return this.target;
  }

  // 获取选择的值
  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) {
      return selectedValue.toString();
    }
  }

  // 设置选择的值
  setValue(value) {
    this.target.find("select").val(value);
  }

  // 销毁目标元素
  destroy() {
    this.target.remove();
  }
}

export default TableBorder;
