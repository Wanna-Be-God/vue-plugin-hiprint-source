/*
 * @Author: WANAN && 2506179675@qq.com
 * @Date: 2025-01-18 23:33:05
 * @LastEditors: WANAN
 * @LastEditTime: 2025-01-18 23:33:13
 * @Description: 
 */
import { i18n } from "../../i18n/i18n";

class BarcodeWidth {
  constructor() {
    this.name = "barWidth";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">${i18n.__("条码宽度")}</div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>
    `);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    return value || undefined;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export default BarcodeWidth;
