/*
 * @Author: WANAN && 2506179675@qq.com
 * @Date: 2025-01-18 23:59:07
 * @LastEditors: WANAN
 * @LastEditTime: 2025-01-18 23:59:47
 * @Description: 
 */
import { i18n } from "../../i18n/i18n";

export default class TestData {
  constructor() {
    this.name = "testData";
  }

  createTarget() {
    return (
      (this.target = $(
        `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
          "测试数据"
        )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__(
          "仅字段名称存在时有效"
        )}" class="auto-submit" >\n        </div>\n    </div>`
      )),
      this.target
    );
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return value.toString();
  }

  setValue(value) {
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}