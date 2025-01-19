import { i18n } from "../../i18n/i18n";

export default class BarAutoWidth {
  constructor() {
    this.name = "barAutoWidth";
  }

  createTarget() {
    this.target = $(
      `<div class="hiprint-option-item"><div class="hiprint-option-item-label">${i18n.__(
        "条码自动增宽"
      )}</div><div class="hiprint-option-item-field"><select class="auto-submit"><option value="">${i18n.__(
        "默认"
      )}</option><option value="true">${i18n.__(
        "自动"
      )}</option><option value="false">${i18n.__(
        "不自动"
      )}</option></select></div></div>`
    );
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    return value || void 0;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}
