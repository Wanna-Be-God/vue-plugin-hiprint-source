/*
 * @Author: WANAN && 2506179675@qq.com
 * @Date: 2025-01-19 00:00:22
 * @LastEditors: WANAN
 * @LastEditTime: 2025-01-19 00:01:11
 * @Description: 
 */
import { i18n } from "../../i18n/i18n";

export default class Coordinate {
  constructor() {
    this.name = "coordinate";
  }

  createTarget(options, syncOptions) {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">\n        ${i18n.__(
          "位置坐标"
        )}\n        </div>
        <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">\n
        <input type="number" style="width:48%" placeholder="${i18n.__(
          "X位置(左)"
        )}" class="auto-submit" />\n
        <input type="number" style="width:48%" placeholder="${i18n.__(
          "Y位置(上)"
        )}" class="auto-submit" />\n
        </div>\n
        </div>`);
    this.syncLock = syncOptions.coordinateSync || false;
    this.createSyncLock(this.syncLock);
    return this.target;
  }

  createSyncLock(sync) {
    this.lockTarget = this.syncLock
      ? $(`<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__(
          "同步"
        )}">🔗</label>`)
      : $(`<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__(
          "不同步"
        )}">🔓</label>`);
    
    this.lockTarget.click(() => {
      if (this.syncLock) {
        this.lockTarget.text("🔓").attr("title", `${i18n.__("不同步")}`);
      } else {
        this.lockTarget.text("🔗").attr("title", `${i18n.__("同步")}`);
      }
      this.syncLock = !this.syncLock;
    });
    
    this.target.find("input:first").after(this.lockTarget);
    // 同步编辑...
    this.target.find("input:first").change(() => {
      if (this.syncLock) {
        this.target.find("input:last").val($(this).val());
      }
    });
    this.target.find("input:last").change(() => {
      if (this.syncLock) {
        this.target.find("input:first").val($(this).val());
      }
    });
    return this.lockTarget;
  }

  css(element) {
    if (element && element.length && this.target) {
      // 仅当前元素被选中才更新坐标位置, 以避免冲突
      if (
        ("block" == element.find(".resize-panel").css("display") ||
          element[0].className.includes("table")) &&
        this.el == element
      ) {
        const value = this.getValue();
        return element.css("left", value.left + "pt").css("top", value.top + "pt");
      }
    }
    return null;
  }

  getValue() {
    const value = {
      coordinateSync: this.syncLock,
      left: 0,
      top: 0,
    };
    value.left = parseFloat(this.target.find("input:first").val() || 0);
    value.top = parseFloat(this.target.find("input:last").val() || 0);
    return value;
  }

  setValue(position, element) {
    this.el = element.designTarget || element;
    this.target.find("input:first").val(position.left);
    this.target.find("input:last").val(position.top);
  }

  destroy() {
    this.target.remove();
  }
}