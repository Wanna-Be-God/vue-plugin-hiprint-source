import { i18n } from "../../i18n/i18n";

class ColorTarget {
  constructor() {
    this.name = "color";
  }

  css(element, color) {
    if (element && element.length) {
      if (color) return element.css("color", color), "color:" + color;
      element[0].style.color = "";
    }
    return null;
  }

  createTarget() {
    return (
      (this.target = $(`
        <div class="hiprint-option-item">
          <div class="hiprint-option-item-label">
            ${i18n.__("字体颜色")}
          </div>
          <div class="hiprint-option-item-field">
            <input type="text" class="auto-submit"/>
          </div>
        </div>`)),
      this.target
    );
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return value.toString();
  }

  setValue(value) {
    this.target.find("input").minicolors({
      defaultValue: value || "",
      theme: "bootstrap",
    });
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class BorderColor {
  constructor() {
    this.name = "borderColor";
  }

  css(element, color) {
    if (element && element.length) {
      if (color)
        return element.css("border-color", color), "border-color:" + color;
      element[0].style.borderColor = "";
    }
    return null;
  }

  createTarget(printElementType) {
    const name = ["hline", "vline", "rect", "oval"].includes(
      printElementType.type
    )
      ? `${i18n.__("颜色")}`
      : `${i18n.__("边框颜色")}`;
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">${name}</div>
        <div class="hiprint-option-item-field">
          <input type="text" class="auto-submit" />
        </div>
      </div>
    `);
    return this.target;
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return value.toString();
  }

  setValue(value) {
    this.target.find("input").minicolors({
      defaultValue: value || "",
      theme: "bootstrap",
    });
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class BackgroundColor {
  constructor() {
    this.name = "backgroundColor";
  }

  css(element, color) {
    if (element && element.length) {
      if (color)
        return (
          element.css("background-color", color), "background-color:" + color
        );
      element[0].style.backgroundColor = "";
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("背景颜色")}
        </div>
        <div class="hiprint-option-item-field">
          <input type="text" class="auto-submit"/>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return value.toString();
  }

  setValue(value) {
    this.target.find("input").minicolors({
      defaultValue: value || "",
      theme: "bootstrap",
    });
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export { ColorTarget, BorderColor, BackgroundColor };
