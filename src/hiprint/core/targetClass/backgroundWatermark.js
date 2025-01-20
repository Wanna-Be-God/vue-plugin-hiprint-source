
import { i18n } from "../../i18n/i18n";

class WatermarkOptions {
  constructor() {
    this.name = "watermarkOptions";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">${i18n.__("水印功能")}</div>
      </div>
    `);
    this.content = $(`
      <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">
        <div style="width:25%">${i18n.__("水印内容")}:</div>
        <input style="width:75%" type="text" placeholder="${i18n.__(
          "水印内容"
        )}" class="auto-submit">
      </div>
    `);
    this.fillStyle = $(`
      <div class="hiprint-option-item-field" style="display: flex;align-items: center;margin-top: 4px">
        <div style="width:25%">${i18n.__("字体颜色")}:</div>
        <input style="width:110%" data-format="rgb" data-opacity="0.3" type="text" placeholder="${i18n.__(
          "字体颜色"
        )}" class="auto-submit">
      </div>
    `);
    this.fontSize = $(`
      <div class="hiprint-option-item-field" style="display: flex;align-items: center;">
        <div style="width:25%">${i18n.__("字体大小")}:</div>
        <input style="width:75%" type="range" min="10" max="80" placeholder="${i18n.__(
          "字体大小"
        )}" class="auto-submit">
      </div>
    `);
    this.rotate = $(`
      <div class="hiprint-option-item-field" style="display: flex;align-items: center;">
        <div style="width:25%">${i18n.__("旋转角度")}:</div>
        <input style="width:75%" type="range" min="0" max="180" placeholder="${i18n.__(
          "旋转角度"
        )}" class="auto-submit">
      </div>
    `);
    this.width = $(`
      <div class="hiprint-option-item-field" style="display: flex;align-items: center;">
        <div style="width:25%">${i18n.__("水平密度")}:</div>
        <input style="width:75%" type="range" min="100" max="800" placeholder="${i18n.__(
          "水平密度"
        )}" class="auto-submit">
      </div>
    `);
    this.height = $(`
      <div class="hiprint-option-item-field" style="display: flex;align-items: center;">
        <div style="width:25%">${i18n.__("垂直密度")}:</div>
        <input style="width:75%" type="range" min="100" max="800" placeholder="${i18n.__(
          "垂直密度"
        )}" class="auto-submit">
      </div>
    `);
    this.timestamp = $(`
      <div class="hiprint-option-item-field" style="display: flex;align-items: center;">
        <div style="width:25%">${i18n.__("水印时间")}:</div>
        <input style="width:18px;height:18px;margin:0 0 4px 0;" type="checkbox" placeholder="${i18n.__(
          "水印时间"
        )}" class="auto-submit">
      </div>
    `);
    let formatlist = [
      "YYYY-MM-DD HH:mm:ss",
      "YYYY-MM-DD HH:mm",
      "YYYY-MM-DD HH",
      "YYYY-MM-DD",
      "YYYY-MMMM",
      "YYYY-MM",
      "YYYY",
    ];
    let timeFormatList = `\n            <option value="" >${i18n.__(
      "默认"
    )}(YYYY-MM-DD HH:mm)</option>`;
    formatlist.forEach(function (format) {
      timeFormatList += `\n            <option value="${format}">${format}</option>`;
    });
    this.format = $(`
      <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">
        <div style="width:25%">${i18n.__("时间格式")}:</div>
        <select style="width:75%" class="auto-submit"></select>
      </div>
    `);
    this.format.find(".auto-submit").append($(timeFormatList));
    this.target.append(this.content);
    this.target.append(this.fillStyle);
    this.target.append(this.fontSize);
    this.target.append(this.rotate);
    this.target.append(this.width);
    this.target.append(this.height);
    this.target.append(this.timestamp);
    this.target.append(this.format);
    return this.target;
  }

  getValue() {
    let opt = {
      content: this.content.find("input").val(),
      fillStyle:
        this.fillStyle.find("input").val() || "rgba(184, 184, 184, 0.3)",
      fontSize: parseInt(this.fontSize.find("input").val() || "14") + "px",
      rotate: parseInt(this.rotate.find("input").val() || "25"),
      width: parseInt(this.width.find("input").val() || "200"),
      height: parseInt(this.height.find("input").val() || "200"),
      timestamp: this.timestamp.find("input").is(":checked"),
      format:
        this.format.find("select").val() == ""
          ? "YYYY-MM-DD HH:mm"
          : this.format.find("select").val(),
    };
    let options = Object.assign({}, this.options, opt);
    return options;
  }

  setValue(options) {
    this.options = options;
    this.content.find("input").val(options.content || "");
    this.fillStyle
      .find("input")
      .val(options.fillStyle || "rgba(184, 184, 184, 0.3)");
    this.fillStyle.find("input").minicolors({
      format: "rgb",
      opacity: true,
      theme: "bootstrap",
    });
    const fontSize = parseInt(options.fontSize || "14");
    this.fontSize.find("input").val(fontSize);
    this.rotate.find("input").val(options.rotate || 25);
    this.width.find("input").val(options.width || 200);
    this.height.find("input").val(options.height || 200);
    this.timestamp
      .find("input")
      .attr("checked", options.timestamp == void 0 ? false : options.timestamp);
    this.format.find("select").val(options.format || "YYYY-MM-DD HH:mm");
  }

  destroy() {
    this.target.remove();
  }
}

export {
  WatermarkOptions,
}