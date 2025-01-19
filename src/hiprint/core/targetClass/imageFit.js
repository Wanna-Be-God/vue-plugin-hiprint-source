import { i18n } from "../../i18n/i18n";

class ImageFit {
  constructor() {
    this.name = "fit";
  }

  css(element, value) {
    if (element && element.length) {
      if (value) {
        return element.find("img").css("object-fit", value), "object-fit:" + value;
      }
      element.find("img")[0].style["object-fit"] = "";
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("图片缩放")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="contain">${i18n.__("等比")}</option>
            <option value="cover">${i18n.__("剪裁")}</option>
            <option value="fill">${i18n.__("填充")}</option>
            <option value="none">${i18n.__("原始尺寸")}</option>
          </select>
        </div>
      </div>
    `);
    return this.target;
  }

  getValue() {
    return this.target.find("select").val();
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export default ImageFit;