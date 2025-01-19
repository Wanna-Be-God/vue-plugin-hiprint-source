/*
 * @Author: WANAN && 2506179675@qq.com
 * @Date: 2025-01-18 23:45:35
 * @LastEditors: WANAN
 * @LastEditTime: 2025-01-18 23:45:43
 * @Description: 
 */
import { i18n } from "../../i18n/i18n";

export default class Field {
  constructor() {
    this.name = "field";
  }

  createTarget(target) {
    let fields = void 0;

    if ((target && (fields = target.getFields()), fields)) {
      this.isSelect = true;
      let html = `<div class="hiprint-option-item hiprint-option-item-row">\n            <div class="hiprint-option-item-label">\n            ${i18n.__(
        "字段名"
      )}\n            </div>\n            <div class="hiprint-option-item-field">\n            <select class="auto-submit">\n                <option value="" >${i18n.__(
        "请选择字段"
      )}</option>`;
      fields.forEach((field) => {
        html +=
          ' <option value="' +
          (field.field || "") +
          '" >' +
          (field.text || "") +
          "</option>";
      });
      html += " </select>\n            </div>\n        </div>";
      this.target = $(html);
    } else {
      this.isSelect = false;
      this.target = $(
        `<div class="hiprint-option-item hiprint-option-item-row">\n            <div class="hiprint-option-item-label">\n            ${i18n.__(
          "字段名"
        )}\n            </div>\n            <div class="hiprint-option-item-field">\n            <input type="text" placeholder="${i18n.__(
          "请输入字段名"
        )}" class="auto-submit">\n            </div>\n        </div>`
      );
    }

    return this.target;
  }

  getValue() {
    return (
      (this.isSelect
        ? this.target.find("select").val()
        : this.target.find("input").val()) || void 0
    );
  }

  setValue(value) {
    if (this.isSelect) {
      if (value) {
        if (
          !this.target.find('option[value="' + value + '"]').length
        ) {
          this.target
            .find("select")
            .prepend('<option value="' + value + '" >' + value + "</option>");
        }
        this.target.find("select").val(value);
      }
    } else {
      this.target.find("input").val(value);
    }
  }

  destroy() {
    this.target.remove();
  }
}