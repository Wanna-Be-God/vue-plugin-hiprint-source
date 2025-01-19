/*
 * @Author: WANAN && 2506179675@qq.com
 * @Date: 2025-01-19 00:01:54
 * @LastEditors: WANAN
 * @LastEditTime: 2025-01-19 00:02:10
 * @Description: 
 */
import { i18n } from "../../i18n/i18n";

export default class WidthHeight {
  constructor() {
    this.name = "widthHeight";
  }

  createTarget(t, o) {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">\n        ${i18n.__(
          "宽高大小"
        )}\n        </div>
        <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">\n
        <input type="number" style="width:48%" placeholder="${i18n.__(
          "宽"
        )}" class="auto-submit" />\n
        <input type="number" style="width:48%" placeholder="${i18n.__(
          "高"
        )}" class="auto-submit" />\n
        </div>\n
        </div>`);
    this.syncLock = o.widthHeightSync || false;
    this.createSyncLock(this.syncLock);
    return this.target;
  }

  createSyncLock(syncLock) {
    this.lockTarget = syncLock
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
      // 仅当前元素被选中才更新宽高大小, 以避免冲突
      if (
        ("block" == element.find(".resize-panel").css("display") ||
          element[0].className.includes("table")) &&
        this.el == element
      ) {
        const value = this.getValue();
        return element
          .css("width", value.width + "pt")
          .css("height", value.height + "pt");
      }
    }
    return null;
  }

  getValue() {
    const value = {
      widthHeightSync: this.syncLock,
      width: 0,
      height: 0,
    };
    value.width = parseFloat(this.target.find("input:first").val() || 0);
    value.height = parseFloat(this.target.find("input:last").val() || 0);
    return value;
  }

  setValue(dimensions, el) {
    this.el = el.designTarget || el;
    this.target.find("input:first").val(dimensions.width);
    this.target.find("input:last").val(dimensions.height);
  }

  destroy() {
    this.target.remove();
  }
}