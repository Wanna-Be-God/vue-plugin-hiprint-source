import { i18n } from "../../i18n/i18n";

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

class PaperNumberFormat {
  constructor() {
    this.name = "paperNumberFormat";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("页码格式")}
        </div>
        <div class="hiprint-option-item-field">
          <input type="text" placeholder="\${paperNo}-\${paperCount}" class="auto-submit">
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("input").val();
    return value ? value.toString() : undefined;
  }

  setValue(value) {
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class PaperNumberDisabled {
  constructor() {
    this.name = "paperNumberDisabled";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("显示页码")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("显示")}</option>
            <option value="true">${i18n.__("隐藏")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    return this.target.find("select").val() === "true";
  }

  setValue(value) {
    this.target.find("select").val(value == null ? "" : value.toString());
  }

  destroy() {
    this.target.remove();
  }
}

class PaperNumberContinue {
  constructor() {
    this.name = "paperNumberContinue";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("页码续排")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="true">${i18n.__("续排")}</option>
            <option value="reset">${i18n.__("重排")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    return this.target.find("select").val() === "true";
  }

  setValue(value) {
    this.target
      .find("select")
      .val(value === undefined || value ? "true" : "reset");
  }

  destroy() {
    this.target.remove();
  }
}

class LongTextIndent {
  constructor() {
    this.name = "longTextIndent";
  }

  css(element, value) {
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("每行缩进")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="6">6pt</option>
            <option value="6.75">6.75pt</option>
            <option value="7.5">7.5pt</option>
            <option value="8.25">8.25pt</option>
            <option value="9">9pt</option>
            <option value="9.75">9.75pt</option>
            <option value="10.5">10.5pt</option>
            <option value="11.25">11.25pt</option>
            <option value="12">12pt</option>
            <option value="12.75">12.75pt</option>
            <option value="13.5">13pt</option>
            <option value="14.25">14.25pt</option>
            <option value="15">15pt</option>
            <option value="15.75">15.75pt</option>
            <option value="16.5">16.5pt</option>
            <option value="17.25">17.25pt</option>
            <option value="18">18pt</option>
            <option value="18.75">18.75pt</option>
            <option value="19.5">19.5pt</option>
            <option value="20.25">20.25pt</option>
            <option value="21">21pt</option>
            <option value="21.75">21.75pt</option>
            <option value="22.5">22.5pt</option>
            <option value="23.25">23.25pt</option>
            <option value="24">24pt</option>
            <option value="24.75">24.75pt</option>
            <option value="25.5">25.5pt</option>
            <option value="26.25">26.25pt</option>
            <option value="27">27pt</option>
            <option value="27.75">27.75pt</option>
            <option value="28.5">28.5pt</option>
            <option value="29.25">29.25pt</option>
            <option value="30">30pt</option>
            <option value="30.75">30.75pt</option>
            <option value="31.5">31.5pt</option>
            <option value="32.25">32.25pt</option>
            <option value="33">33pt</option>
            <option value="33.75">33.75pt</option>
            <option value="34.5">34.5pt</option>
            <option value="35.25">35.25pt</option>
            <option value="36">36pt</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    return value ? parseFloat(value.toString()) : undefined;
  }

  setValue(value) {
    if (value) {
      if (!this.target.find(`option[value="${value}"]`).length) {
        this.target
          .find("select")
          .prepend(`<option value="${value}">${value}</option>`);
      }
    }
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class ShowInPage {
  constructor() {
    this.name = "showInPage";
  }

  css(element, value) {
    if (element && element.length) {
      if (value && value === "none") {
        return element.addClass("alwaysHide");
      }
      element.removeClass("alwaysHide");
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("显示规则")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="none">${i18n.__("始终隐藏")}</option>
            <option value="first">${i18n.__("首页")}</option>
            <option value="odd">${i18n.__("奇数页")}</option>
            <option value="even">${i18n.__("偶数页")}</option>
            <option value="last">${i18n.__("尾页")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    return value ? value.toString() : undefined;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class PageBreak {
  constructor() {
    this.name = "pageBreak";
  }

  css(element, value) {
    if (element && element.length) {
      if (value && value === "none") {
        return element.addClass("alwaysHide");
      }
      element.removeClass("alwaysHide");
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("强制分页")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="true">${i18n.__("是")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    return this.target.find("select").val() === "true";
  }

  setValue(value) {
    this.target.find("select").val(value == null ? "" : value.toString());
  }

  destroy() {
    this.target.remove();
  }
}

class PanelPaperRule {
  constructor() {
    this.name = "panelPaperRule";
  }

  createTarget() {
    return (this.target = $(
      `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
        "打印规则"
      )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
        "默认"
      )}</option>\n            <option value="odd" >${i18n.__(
        "保持奇数"
      )}</option>\n            <option value="even" >${i18n.__(
        "保持偶数"
      )}</option>\n        </select>\n        </div>\n    </div>`
    ));
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return value.toString();
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class PanelPageRule {
  constructor() {
    this.name = "panelPageRule";
  }

  createTarget() {
    return (this.target = $(
      `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
        "分页规则"
      )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
        "默认"
      )}</option>\n            <option value="none" >${i18n.__(
        "不分页"
      )}</option>\n        </select>\n        </div>\n    </div>`
    ));
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return value.toString();
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class LeftSpaceRemoved {
  constructor() {
    this.name = "leftSpaceRemoved";
  }

  createTarget() {
    return (this.target = $(
      `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
        "移除段落左侧空白"
      )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
        "默认"
      )}</option>\n            <option value="true" >${i18n.__(
        "移除"
      )}</option>\n            <option value="false" >${i18n.__(
        "不移除"
      )}</option>\n        </select>\n        </div>\n    </div>`
    ));
  }

  getValue() {
    if ("false" == this.target.find("select").val()) return false;
  }

  setValue(value) {
    this.target.find("select").val(value == null ? "" : value.toString());
  }

  destroy() {
    this.target.remove();
  }
}

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

class FixedPosition {
  constructor() {
    this.name = "fixed";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("位置固定")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="false">${i18n.__("否")}</option>
            <option value="true">${i18n.__("是")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    if ("true" === this.target.find("select").val()) return true;
  }

  setValue(value) {
    this.target.find("select").val(value == null ? "" : value.toString());
  }

  destroy() {
    this.target.remove();
  }
}

class DragDirection {
  constructor() {
    this.name = "axis";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("拖动方向")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="h">${i18n.__("横向")}</option>
            <option value="v">${i18n.__("竖向")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    return value || undefined;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class LeftOffset {
  constructor() {
    this.name = "leftOffset";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("左偏移")}
        </div>
        <div class="hiprint-option-item-field">
          <input type="text" placeholder="${i18n.__(
            "偏移量"
          )}pt" class="auto-submit">
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

class MinimumHeight {
  constructor() {
    this.name = "lHeight";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("最低高度")}
        </div>
        <div class="hiprint-option-item-field">
          <input type="text" placeholder="${i18n.__(
            "文本过短或为空时的高度"
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

class HideRule {
  constructor() {
    this.name = "unShowInPage";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("隐藏规则")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="first">${i18n.__("首页")}</option>
            <option value="last">${i18n.__("尾页")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class TableBodyRowBorder {
  constructor() {
    this.name = "tableBodyRowBorder";
  }

  css(element, borderType) {
    if (element.find("tbody tr").length) {
      if (borderType === "border" || borderType === undefined) {
        return element
          .find("tbody tr")
          .addClass("hiprint-printElement-tableTarget-border-all");
      }
      if (borderType === "noBorder") {
        element
          .find("tbody tr")
          .addClass("hiprint-printElement-tableTarget-border-none");
      } else if (borderType === "leftBorder") {
        element
          .find("tbody tr")
          .addClass("hiprint-printElement-tableTarget-border-left");
      } else if (borderType === "rightBorder") {
        element
          .find("tbody tr")
          .addClass("hiprint-printElement-tableTarget-border-right");
      } else if (borderType === "leftRightBorder") {
        element
          .find("tbody tr")
          .addClass("hiprint-printElement-tableTarget-border-lr");
      } else if (borderType === "topBorder") {
        element
          .find("tbody tr")
          .addClass("hiprint-printElement-tableTarget-border-top");
      } else if (borderType === "bottomBorder") {
        element
          .find("tbody tr")
          .addClass("hiprint-printElement-tableTarget-border-bottom");
      } else if (borderType === "topBottomBorder") {
        element
          .find("tbody tr")
          .addClass("hiprint-printElement-tableTarget-border-tb");
      } else {
        element.find("tbody tr").removeClass();
      }
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表体行边框")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="border">${i18n.__("有边框")}</option>
            <option value="noBorder">${i18n.__("无边框")}</option>
            <option value="leftBorder">${i18n.__("左边框")}</option>
            <option value="rightBorder">${i18n.__("右边框")}</option>
            <option value="leftRightBorder">${i18n.__("左右边框")}</option>
            <option value="topBorder">${i18n.__("上边框")}</option>
            <option value="bottomBorder">${i18n.__("下边框")}</option>
            <option value="topBottomBorder">${i18n.__("上下边框")}</option>
          </select>
        </div>
      </div>
    `);
    return this.target;
  }

  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return selectedValue.toString();
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class Transform {
  constructor() {
    this.name = "transform";
  }

  css(element, angle) {
    if (element && element.length) {
      let parentElement = element
        .find(".hiprint-printElement-content")
        .parent(".hiprint-printElement");
      if (!parentElement.length) {
        parentElement = element;
      }
      if (angle) {
        parentElement.css("transform", `rotate(${angle}deg)`);
        parentElement.css("-ms-transform", `rotate(${angle}deg)`);
        parentElement.css("-moz-transform", `rotate(${angle}deg)`);
        parentElement.css("-webkit-transform", `rotate(${angle}deg)`);
        parentElement.css("-o-transform", `rotate(${angle}deg)`);
        return `transform:rotate(${angle}deg)`;
      }
      if (parentElement.length) {
        parentElement[0].style.transform = "";
      }
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("旋转角度")}
        </div>
        <div class="hiprint-option-item-field">
          <input type="number" class="auto-submit"/>
        </div>
      </div>
    `);
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

class ZIndex {
  constructor() {
    this.name = "zIndex";
  }

  css(element, zIndexValue) {
    if (element && element.length) {
      if (zIndexValue) return element.css("z-index", zIndexValue);
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("元素层级")}
        </div>
        <div class="hiprint-option-item-field">
          <input type="number" class="auto-submit"/>
        </div>
      </div>
    `);
    return this.target;
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return parseInt(value.toString());
  }

  setValue(value) {
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class BorderRadius {
  constructor() {
    this.name = "borderRadius";
  }

  css(element, radiusValue) {
    if (element && element.length) {
      if (radiusValue) return element.css("border-radius", radiusValue);
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("边框圆角")}
        </div>
        <div class="hiprint-option-item-field">
          <input type="text" class="auto-submit"/>
        </div>
      </div>
    `);
    return this.target;
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class OptionsGroup {
  constructor() {
    this.name = "optionsGroup";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("边框设置")}
        </div>
      </div>`);
    return this.target;
  }

  getValue() {}

  setValue(value) {}

  destroy() {
    this.target.remove();
  }
}

class BorderTop {
  constructor() {
    this.name = "borderTop";
  }

  css(element, style) {
    if (element && element.length) {
      if (style) {
        return element.css("border-top-style", style), "border-top:1px";
      }
      element[0].style.borderTopStyle = "";
      element[0].style.borderTopWidth = "";
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("上边框")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("否")}</option>
            <option value="solid">${i18n.__("实线")}</option>
            <option value="dotted">${i18n.__("虚线")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class BorderLeft {
  constructor() {
    this.name = "borderLeft";
  }

  css(element, style) {
    if (element && element.length) {
      if (style) {
        return element.css("border-left-style", style), "border-left:1px";
      }
      element[0].style.borderLeftStyle = "";
      element[0].style.borderLeftWidth = "";
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("左边框")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("否")}</option>
            <option value="solid">${i18n.__("实线")}</option>
            <option value="dotted">${i18n.__("虚线")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class BorderRight {
  constructor() {
    this.name = "borderRight";
  }

  css(element, style) {
    if (element && element.length) {
      if (style) {
        return element.css("border-right-style", style), "border-right:1px";
      }
      element[0].style.borderRightStyle = "";
      element[0].style.borderRightWidth = "";
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("右边框")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("否")}</option>
            <option value="solid">${i18n.__("实线")}</option>
            <option value="dotted">${i18n.__("虚线")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class BorderBottom {
  constructor() {
    this.name = "borderBottom";
  }

  css(element, value) {
    if (element && element.length) {
      if (value) {
        element.css("border-bottom-style", value);
        return "border-bottom-style:1px solid";
      }
      element[0].style.borderBottomStyle = "";
      element[0].style.borderBottomWidth = "";
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("下边框")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("否")}</option>
            <option value="solid">${i18n.__("实线")}</option>
            <option value="dotted">${i18n.__("虚线")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class ContentPaddingLeft {
  constructor() {
    this.name = "contentPaddingLeft";
  }

  css(element, value) {
    const contentElement = element.find(".hiprint-printElement-content");
    if (contentElement && contentElement.length) {
      if (value) {
        return contentElement.css("padding-left", value + "pt"), "padding-left";
      }
      contentElement[0].style.paddingLeft = "";
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("左内边距")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="0.75">0.75pt</option>
            <option value="1.5">1.5pt</option>
            <option value="2.25">2.25pt</option>
            <option value="3">3pt</option>
            <option value="3.75">3.75pt</option>
            <option value="4.5">4.5pt</option>
            <option value="5.25">5.25pt</option>
            <option value="6">6pt</option>
            <option value="6.75">6.75pt</option>
            <option value="7.5">7.5pt</option>
            <option value="8.25">8.25pt</option>
            <option value="9">9pt</option>
            <option value="9.75">9.75pt</option>
            <option value="10.5">10.5pt</option>
            <option value="11.25">11.25pt</option>
            <option value="12">12pt</option>
            <option value="12.75">12.75pt</option>
            <option value="13.5">13.5pt</option>
            <option value="14.25">14.25pt</option>
            <option value="15">15pt</option>
            <option value="15.75">15.75pt</option>
            <option value="16.5">16.5pt</option>
            <option value="17.25">17.25pt</option>
            <option value="18">18pt</option>
            <option value="18.75">18.75pt</option>
            <option value="19.5">19.5pt</option>
            <option value="20.25">20.25pt</option>
            <option value="21">21pt</option>
            <option value="21.75">21.75pt</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return parseFloat(value.toString());
  }

  setValue(value) {
    if (value) {
      if (!this.target.find(`option[value="${value}"]`).length) {
        this.target
          .find("select")
          .prepend(`<option value="${value}">${value}</option>`);
      }
    }
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class ContentPaddingTop {
  constructor() {
    this.name = "contentPaddingTop";
  }

  css(element, value) {
    const contentElement = element.find(".hiprint-printElement-content");

    if (contentElement && contentElement.length) {
      if (value) {
        return contentElement.css("padding-top", value + "pt"), "padding-top";
      }
      contentElement[0].style.paddingTop = "";
    }

    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("上内边距")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="0.75">0.75pt</option>
            <option value="1.5">1.5pt</option>
            <option value="2.25">2.25pt</option>
            <option value="3">3pt</option>
            <option value="3.75">3.75pt</option>
            <option value="4.5">4.5pt</option>
            <option value="5.25">5.25pt</option>
            <option value="6">6pt</option>
            <option value="6.75">6.75pt</option>
            <option value="7.5">7.5pt</option>
            <option value="8.25">8.25pt</option>
            <option value="9">9pt</option>
            <option value="9.75">9.75pt</option>
            <option value="10.5">10.5pt</option>
            <option value="11.25">11.25pt</option>
            <option value="12">12pt</option>
            <option value="12.75">12.75pt</option>
            <option value="13.5">13.5pt</option>
            <option value="14.25">14.25pt</option>
            <option value="15">15pt</option>
            <option value="15.75">15.75pt</option>
            <option value="16.5">16.5pt</option>
            <option value="17.25">17.25pt</option>
            <option value="18">18pt</option>
            <option value="18.75">18.75pt</option>
            <option value="19.5">19.5pt</option>
            <option value="20.25">20.25pt</option>
            <option value="21">21pt</option>
            <option value="21.75">21.75pt</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return parseFloat(value.toString());
  }

  setValue(value) {
    if (value) {
      if (!this.target.find(`option[value="${value}"]`).length) {
        this.target
          .find("select")
          .prepend(`<option value="${value}">${value}</option>`);
      }
    }
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

// 右内边距类
class ContentPaddingRight {
  constructor() {
    this.name = "contentPaddingRight";
  }

  css(element, value) {
    const contentElement = element.find(".hiprint-printElement-content");

    if (contentElement && contentElement.length) {
      if (value) {
        return (
          contentElement.css("padding-right", value + "pt"), "padding-right"
        );
      }
      contentElement[0].style.paddingRight = "";
    }

    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("右内边距")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="0.75">0.75pt</option>
            <option value="1.5">1.5pt</option>
            <option value="2.25">2.25pt</option>
            <option value="3">3pt</option>
            <option value="3.75">3.75pt</option>
            <option value="4.5">4.5pt</option>
            <option value="5.25">5.25pt</option>
            <option value="6">6pt</option>
            <option value="6.75">6.75pt</option>
            <option value="7.5">7.5pt</option>
            <option value="8.25">8.25pt</option>
            <option value="9">9pt</option>
            <option value="9.75">9.75pt</option>
            <option value="10.5">10.5pt</option>
            <option value="11.25">11.25pt</option>
            <option value="12">12pt</option>
            <option value="12.75">12.75pt</option>
            <option value="13.5">13.5pt</option>
            <option value="14.25">14.25pt</option>
            <option value="15">15pt</option>
            <option value="15.75">15.75pt</option>
            <option value="16.5">16.5pt</option>
            <option value="17.25">17.25pt</option>
            <option value="18">18pt</option>
            <option value="18.75">18.75pt</option>
            <option value="19.5">19.5pt</option>
            <option value="20.25">20.25pt</option>
            <option value="21">21pt</option>
            <option value="21.75">21.75pt</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return parseFloat(value.toString());
  }

  setValue(value) {
    if (value) {
      if (!this.target.find(`option[value="${value}"]`).length) {
        this.target
          .find("select")
          .prepend(`<option value="${value}">${value}</option>`);
      }
    }
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

// 下内边距类
class ContentPaddingBottom {
  constructor() {
    this.name = "contentPaddingBottom";
  }

  css(element, value) {
    const contentElement = element.find(".hiprint-printElement-content");

    if (contentElement && contentElement.length) {
      if (value) {
        return (
          contentElement.css("padding-bottom", value + "pt"), "padding-bottom"
        );
      }
      contentElement[0].style.paddingBottom = "";
    }

    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("下内边距")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="0.75">0.75pt</option>
            <option value="1.5">1.5pt</option>
            <option value="2.25">2.25pt</option>
            <option value="3">3pt</option>
            <option value="3.75">3.75pt</option>
            <option value="4.5">4.5pt</option>
            <option value="5.25">5.25pt</option>
            <option value="6">6pt</option>
            <option value="6.75">6.75pt</option>
            <option value="7.5">7.5pt</option>
            <option value="8.25">8.25pt</option>
            <option value="9">9pt</option>
            <option value="9.75">9.75pt</option>
            <option value="10.5">10.5pt</option>
            <option value="11.25">11.25pt</option>
            <option value="12">12pt</option>
            <option value="12.75">12.75pt</option>
            <option value="13.5">13.5pt</option>
            <option value="14.25">14.25pt</option>
            <option value="15">15pt</option>
            <option value="15.75">15.75pt</option>
            <option value="16.5">16.5pt</option>
            <option value="17.25">17.25pt</option>
            <option value="18">18pt</option>
            <option value="18.75">18.75pt</option>
            <option value="19.5">19.5pt</option>
            <option value="20.25">20.25pt</option>
            <option value="21">21pt</option>
            <option value="21.75">21.75pt</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return parseFloat(value.toString());
  }

  setValue(value) {
    if (value) {
      if (!this.target.find(`option[value="${value}"]`).length) {
        this.target
          .find("select")
          .prepend(`<option value="${value}">${value}</option>`);
      }
    }
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

// 边框样式类
class BorderStyle {
  constructor() {
    this.name = "borderStyle";
  }

  css(element, value) {
    if (element && element.length) {
      if (value) {
        return element.css("border-style", value), "border-style:1px";
      }
      element[0].style.borderStyle = "";
    }

    return null;
  }

  createTarget(printElementType) {
    const name = ["hline", "vline", "rect", "oval"].includes(
      printElementType.type
    )
      ? `${i18n.__("样式")}`
      : `${i18n.__("边框样式")}`;
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${name}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="solid">${i18n.__("实线")}</option>
            <option value="dashed">${i18n.__("长虚线")}</option>
            <option value="dotted">${i18n.__("短虚线")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("select").val(value);
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

class BarColor {
  constructor() {
    this.name = "barColor";
  }

  css(element, color) {
    if (element && element.length) {
      // if (color) return element.css("background-color", color), "background-color:" + color;
      // element[0].style.backgroundColor = "";
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("条码颜色")}
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

class Orientation {
  constructor() {
    this.name = "orient";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("纸张方向(仅自定义纸质有效)")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="1">${i18n.__("纵向")}</option>
            <option value="2">${i18n.__("横向")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return parseFloat(value.toString());
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class TextContentVerticalAlign {
  constructor() {
    this.name = "textContentVerticalAlign";
  }

  createTarget() {
    return (this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("上下对齐")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="middle">${i18n.__("垂直居中")}</option>
            <option value="bottom">${i18n.__("底部")}</option>
          </select>
        </div>
      </div>
    `));
  }

  css(element, alignment) {
    if (element && element.length) {
      element.removeClass("hiprint-text-content-middle");
      element.removeClass("hiprint-text-content-bottom");
      if (alignment) {
        if (alignment === "middle")
          element.addClass("hiprint-text-content-middle");
        if (alignment === "bottom")
          element.addClass("hiprint-text-content-bottom");
      }
    }
    return null;
  }

  getValue() {
    const value = this.target.find("select").val();
    return value ? value.toString() : undefined;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class TextContentWrap {
  constructor() {
    this.name = "textContentWrap";
  }

  createTarget() {
    return (this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("文本换行")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="nowrap">${i18n.__("不换行")}</option>
            <option value="clip">${i18n.__("不换行&隐藏")}</option>
            <option value="ellipsis">${i18n.__("不换行&省略")}</option>
          </select>
        </div>
      </div>
    `));
  }

  css(element, wrapType) {
    if (element && element.length) {
      element.removeClass("hiprint-text-content-wrap");
      element
        .find(".hiprint-printElement-text-content")
        .removeClass("hiprint-text-content-wrap-nowrap");
      element
        .find(".hiprint-printElement-text-content")
        .removeClass("hiprint-text-content-wrap-clip");
      element
        .find(".hiprint-printElement-text-content")
        .removeClass("hiprint-text-content-wrap-ellipsis");
      if (wrapType) {
        element.addClass("hiprint-text-content-wrap");
        element
          .find(".hiprint-printElement-text-content")
          .addClass("hiprint-text-content-wrap-" + wrapType);
      }
    }
    return null;
  }

  getValue() {
    const value = this.target.find("select").val();
    return value ? value.toString() : undefined;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class Columns {
  constructor(requireModule) {
    this.name = "columns";
    this.requireModule = requireModule;
  }

  createTarget() {
    $('<div class="indicator"></div>').appendTo("body");
    return (
      " </ul>\n       </div>\n    </div>",
      (this.target = $(
        ' <div class="hiprint-option-item hiprint-option-item-row">\n       <div>\n            <ul class="hiprint-option-table-selected-columns"> </ul>\n       </div>\n    </div>'
      )),
      this.target
    );
  }

  getValue() {
    return this.buildData();
  }

  setValue(columnData, options, printElementType) {
    this.value = columnData;
    this.options = options;
    this.printElementType = printElementType;

    const availableColumns = printElementType.columns[0]
      .filter((column) => {
        return (
          0 ===
          columnData[0].columns.filter((dataColumn) => {
            return column.columnId === dataColumn.columnId;
          }).length
        );
      })
      .map((column) => {
        const columnInstance = new this.requireModule.a(column);
        columnInstance.checked = false;
        return columnInstance;
      });

    this.allColumns = columnData[0].columns.concat(availableColumns);

    if (columnData && columnData.length === 1) {
      this.target.find("ul").html(
        this.allColumns
          .map((column) => {
            return (
              '<li class="hiprint-option-table-selected-item"> <div class="hi-pretty p-default">\n                ' +
              (column.checked
                ? '<input type="checkbox" checked column-id="' +
                  (column.id || column.columnId) +
                  '" />'
                : '<input type="checkbox" column-id="' +
                  (column.id || column.columnId) +
                  '" />') +
              '\n                <div class="state">\n                    <label></label>\n                </div>\n            </div><span class="column-title">' +
              (column.title || column.descTitle || "") +
              "</span></li>"
            );
          })
          .join("")
      );

      this.target.find("input").change((event) => {
        const isChecked = event.target.checked;
        const columnId = event.target.attributes["column-id"].nodeValue || "";
        const index = this.allColumns.findIndex((col) => {
          return col.field === columnId || col.id === columnId;
        });
        if (index >= 0) {
          this.allColumns[index]["checked"] = isChecked;
        }
        this.submit();
      });

      if (printElementType.columnDisplayIndexEditable) {
        this.target
          .find("li")
          .hidraggable({
            revert: true,
            handle: ".column-title",
            moveUnit: "pt",
            deltaX: 0,
            deltaY: 0,
          })
          .hidroppable({
            onDragOver: function (event, ui) {
              $(this).css("border-top-color", "red");
            },
            onDragLeave: function (event, ui) {
              $(this).css("border-top-color", "");
            },
            onDrop: function (event, ui) {
              $(ui).insertBefore(this);
              $(this).css("border-top-color", "");
              this.submit();
            },
          });
      }
    }
  }

  buildData() {
    const columnData = this;
    const result = [];
    if (columnData.options.columns.length > 1) {
      return this.value;
    }
    columnData.printElementType.makeColumnObj(columnData.allColumns);
    this.target.find("input").map((index, inputElement) => {
      const columnId = $(inputElement).attr("column-id");
      const column = columnData.printElementType.getColumnByColumnId(columnId);
      if (column) {
        const columnInstance = new this.requireModule.a(column);
        columnInstance.checked = column.checked;
        result.push(columnInstance);
      }
    });
    return (this.value[0].columns = result), this.value;
  }

  destroy() {
    this.target.remove();
  }
}

class TextType {
  constructor() {
    this.name = "textType";
  }

  createTarget() {
    return (
      (this.target = $(
        `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
          "打印类型"
        )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
          "默认"
        )}</option>\n        <option value="" >${i18n.__(
          "文本"
        )}</option>\n        <option value="barcode" >${i18n.__(
          "条形码"
        )}</option>\n        <option value="qrcode" >${i18n.__(
          "二维码"
        )}</option>\n        </select>\n        </div>\n    </div>`
      )),
      this.target
    );
  }

  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return selectedValue;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class TableTextType {
  constructor() {
    this.name = "tableTextType";
  }

  createTarget() {
    return (
      (this.target = $(`
        <div class="hiprint-option-item">
          <div class="hiprint-option-item-label">
            ${i18n.__("字段类型")}
          </div>
          <div class="hiprint-option-item-field">
            <select class="auto-submit">
              <option value="">${i18n.__("默认(文本)")}</option>
              <option value="text">${i18n.__("文本")}</option>
              <option value="sequence">${i18n.__("序号")}</option>
              <option value="barcode">${i18n.__("条形码")}</option>
              <option value="qrcode">${i18n.__("二维码")}</option>
              <option value="image">${i18n.__("图片")}</option>
            </select>
          </div>
        </div>`)),
      this.target
    );
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class TableBarcodeMode {
  constructor() {
    this.name = "tableBarcodeMode";
  }

  createTarget() {
    return (
      (this.target = $(`
        <div class="hiprint-option-item">
          <div class="hiprint-option-item-label">
            ${i18n.__("条形码格式")}
          </div>
          <div class="hiprint-option-item-field">
            <select class="auto-submit">
              <option value="">${i18n.__("默认")}(CODE128A)</option>
              <option value="CODE128A">CODE128A</option>
              <option value="CODE128B">CODE128B</option>
              <option value="CODE128C">CODE128C</option>
              <option value="CODE39">CODE39</option>
              <option value="EAN-13">EAN-13</option>
              <option value="EAN-8">EAN-8</option>
              <option value="EAN-5">EAN-5</option>
              <option value="EAN-2">EAN-2</option>
              <option value="UPC（A）">UPC（A）</option>
              <option value="ITF">ITF</option>
              <option value="ITF-14">ITF-14</option>
              <option value="MSI">MSI</option>
              <option value="MSI10">MSI10</option>
              <option value="MSI11">MSI11</option>
              <option value="MSI1010">MSI1010</option>
              <option value="MSI1110">MSI1110</option>
              <option value="Pharmacode">Pharmacode</option>
            </select>
          </div>
        </div>`)),
      this.target
    );
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

class TableQRCodeLevel {
  constructor() {
    this.name = "tableQRCodeLevel";
  }

  createTarget() {
    return (
      (this.target = $(`
        <div class="hiprint-option-item">
          <div class="hiprint-option-item-label">
            ${i18n.__("二维码容错率")}
          </div>
          <div class="hiprint-option-item-field">
            <select class="auto-submit">
              <option value="">${i18n.__("默认")}</option>
              <option value="1">7% L</option>
              <option value="0">15% M</option>
              <option value="3">25% Q</option>
              <option value="2">30% H</option>
            </select>
          </div>
        </div>
      `)),
      this.target
    );
  }

  getValue() {
    const value = this.target.find("select").val();
    return parseInt(value || 0);
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class TableColumnHeight {
  constructor() {
    this.name = "tableColumnHeight";
  }

  createTarget() {
    return (
      (this.target = $(`
        <div class="hiprint-option-item">
          <div class="hiprint-option-item-label">
            ${i18n.__("单元格高度")}
          </div>
          <div class="hiprint-option-item-field">
            <input type="text" placeholder="${i18n.__(
              "条形码、二维码以及图片有效"
            )}" class="auto-submit">
          </div>
        </div>
      `)),
      this.target
    );
  }

  getValue() {
    const value = this.target.find("input").val();
    if (value) return value.toString();
  }

  setValue(value) {
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class TableSummaryTitle {
  constructor() {
    this.name = "tableSummaryTitle";
  }

  createTarget() {
    return (
      (this.target = $(`
        <div class="hiprint-option-item">
          <div class="hiprint-option-item-label">
            ${i18n.__("底部聚合标题")}
          </div>
          <div class="hiprint-option-item-field">
            <select class="auto-submit">
              <option value="">${i18n.__("默认")}</option>
              <option value="true">${i18n.__("显示")}</option>
              <option value="false">${i18n.__("隐藏")}</option>
            </select>
          </div>
        </div>
      `)),
      this.target
    );
  }

  getValue() {
    return !("false" === this.target.find("select").val());
  }

  setValue(value) {
    this.target.find("select").val((value == null ? "" : value).toString());
  }

  destroy() {
    this.target.remove();
  }
}

class TableSummaryText {
  constructor() {
    this.name = "tableSummaryText";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("底部聚合文本")}
        </div>
        <div class="hiprint-option-item-field">
          <input type="text" placeholder="${i18n.__(
            "聚合类型"
          )}:" class="auto-submit">
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("input").val();
    return value ? value.toString() : undefined;
  }

  setValue(value) {
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class TableSummaryColspan {
  constructor() {
    this.name = "tableSummaryColspan";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("底部聚合合并列数")}
        </div>
        <div class="hiprint-option-item-field">
          <input type="number" min="0" step="1" placeholder="${i18n.__(
            "合并列数"
          )}" class="auto-submit">
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("input").val();
    return value ? value.toString() : undefined;
  }

  setValue(value) {
    this.target.find("input").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class TableSummaryAlign {
  constructor() {
    this.name = "tableSummaryAlign";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("底部聚合类型左右对齐")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="left">${i18n.__("居左")}</option>
            <option value="center">${i18n.__("居中")}</option>
            <option value="right">${i18n.__("居右")}</option>
            <option value="justify">${i18n.__("两端对齐")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    return value ? value.toString() : undefined;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class TableSummaryNumFormat {
  constructor() {
    this.name = "tableSummaryNumFormat";
  }

  createTarget() {
    const list = [{ t: `${i18n.__("整数")}`, v: "0" }];
    const num = [1, 2, 3, 4, 5, 6];
    num.forEach((n) => {
      list.push({ t: i18n.__n(`保留%s位`, n), v: "" + n });
    });
    let optionsHtml = `\n            <option value="">${i18n.__(
      "默认"
    )}</option>`;
    list.forEach((e) => {
      optionsHtml += `\n            <option value="${e.v || ""}">${
        e.t || ""
      }</option>`;
    });
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("底部聚合小数")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit"></select>
        </div>
      </div>`);
    this.target.find(".auto-submit").append($(optionsHtml));
    return this.target;
  }

  getValue() {
    const value = this.target.find("select").val();
    return value ? value.toString() : undefined;
  }

  setValue(value) {
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

export {
  BorderColor,
  WatermarkOptions,
  PaperNumberFormat,
  PaperNumberDisabled,
  PaperNumberContinue,
  LongTextIndent,
  ShowInPage,
  PageBreak,
  PanelPaperRule,
  PanelPageRule,
  LeftSpaceRemoved,
  FirstPaperFooter,
  LastPaperFooter,
  EvenPaperFooter,
  OddPaperFooter,
  FixedPosition,
  DragDirection,
  LeftOffset,
  MinimumHeight,
  HideRule,
  TableBodyRowBorder,
  Transform,
  ZIndex,
  BorderRadius,
  OptionsGroup,
  BorderTop,
  BorderLeft,
  BorderRight,
  BorderBottom,
  ContentPaddingLeft,
  ContentPaddingTop,
  ContentPaddingRight,
  ContentPaddingBottom,
  BorderStyle,
  BackgroundColor,
  BarColor,
  Orientation,
  TextContentVerticalAlign,
  TextContentWrap,
  Columns,
  TextType,
  TableTextType,
  TableBarcodeMode,
  TableQRCodeLevel,
  TableColumnHeight,
  TableSummaryTitle,
  TableSummaryText,
  TableSummaryColspan,
  TableSummaryAlign,
  TableSummaryNumFormat,
};
