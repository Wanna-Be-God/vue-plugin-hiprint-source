import { i18n } from "../../i18n/i18n";

class FirstPaperFooter {
  constructor() {
    this.name = "firstPaperFooter";
  }

  createTarget() {
    return (this.target = $(
      `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
        "首页页尾"
      )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__(
        "首页页尾"
      )}" class="auto-submit">\n        </div>\n    </div>`
    ));
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return parseFloat(value.toString());
  }

  setValue(value) {
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class LastPaperFooter {
  constructor() {
    this.name = "lastPaperFooter";
  }

  createTarget() {
    return (this.target = $(
      `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
        "尾页页尾"
      )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__(
        "尾页页尾"
      )}" class="auto-submit">\n        </div>\n    </div>`
    ));
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return parseFloat(value.toString());
  }

  setValue(value) {
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class EvenPaperFooter {
  constructor() {
    this.name = "evenPaperFooter";
  }

  createTarget() {
    return (this.target = $(
      `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
        "偶数页页尾"
      )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__(
        "偶数页页尾"
      )}" class="auto-submit">\n        </div>\n    </div>`
    ));
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return parseFloat(value.toString());
  }

  setValue(value) {
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class OddPaperFooter {
  constructor() {
    this.name = "oddPaperFooter";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("奇数页页尾")}
        </div>
        <div class="hiprint-option-item-field">
          <input type="text" placeholder="${i18n.__(
            "奇数页页尾"
          )}" class="auto-submit">
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return parseFloat(value.toString());
  }

  setValue(value) {
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export {
  // PaperNumberFormat,
  // PaperNumberDisabled,
  // PaperNumberContinue,
  FirstPaperFooter,
  LastPaperFooter,
  EvenPaperFooter,
  OddPaperFooter,
};
