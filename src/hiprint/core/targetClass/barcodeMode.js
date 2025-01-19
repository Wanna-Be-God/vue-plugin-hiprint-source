/*
 * @Author: WANAN && 2506179675@qq.com
 * @Date: 2025-01-18 23:25:12
 * @LastEditors: WANAN
 * @LastEditTime: 2025-01-18 23:26:26
 * @Description: 
 */
import { i18n } from "../../i18n/i18n";

class BarcodeMode {
  constructor() {
    this.name = "barcodeMode";
  }

  // 创建设置面板
  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("条形码格式")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="CODE128A">CODE128A</option>
            <option value="CODE128B">CODE128B</option>
            <option value="CODE128C">CODE128C</option>
            <option value="CODE39">CODE39</option>
            <option value="EAN13">EAN-13</option>
            <option value="EAN8">EAN-8</option>
            <option value="EAN5">EAN-5</option>
            <option value="EAN2">EAN-2</option>
            <option value="UPC">UPC（A）</option>
            <option value="ITF">ITF</option>
            <option value="ITF14">ITF-14</option>
            <option value="MSI">MSI</option>
            <option value="MSI10">MSI10</option>
            <option value="MSI11">MSI11</option>
            <option value="MSI1010">MSI1010</option>
            <option value="MSI1110">MSI1110</option>
            <option value="Pharmacode">Pharmacode</option>
          </select>
        </div>
      </div>
    `);

    return this.target;
  }

  // 获取当前选择的条形码格式
  getValue() {
    return this.target.find("select").val() || undefined;
  }

  // 设置条形码格式
  setValue(value) {
    this.target.find("select").val(value);
  }

  // 销毁当前设置面板
  destroy() {
    this.target.remove();
  }
}

export default BarcodeMode;