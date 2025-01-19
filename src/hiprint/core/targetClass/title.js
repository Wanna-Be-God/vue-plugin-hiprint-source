/*
 * @Author: WANAN && 2506179675@qq.com
 * @Date: 2025-01-18 23:58:17
 * @LastEditors: WANAN
 * @LastEditTime: 2025-01-18 23:58:23
 * @Description: 
 */
import { i18n } from "../../i18n/i18n";

export default class TitleTarget {
  constructor() {
    this.name = "title";
  }

  createTarget() {
    return (
      (this.target = $(`
        <div class="hiprint-option-item hiprint-option-item-row">
          <div class="hiprint-option-item-label">
            ${i18n.__("标题")}
          </div>
          <div class="hiprint-option-item-field">
            <textarea style="height:50px;" placeholder="${i18n.__("请输入标题")}" class="auto-submit"></textarea>
          </div>
        </div>
      `)),
      this.target
    );
  }

  getValue() {
    const value = this.target.find("textarea").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("textarea").val(value);
  }

  destroy() {
    this.target.remove();
  }
}