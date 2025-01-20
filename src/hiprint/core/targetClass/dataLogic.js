import { i18n } from "../../i18n/i18n";

class Field {
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
        if (!this.target.find('option[value="' + value + '"]').length) {
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

class TitleTarget {
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
            <textarea style="height:50px;" placeholder="${i18n.__(
              "请输入标题"
            )}" class="auto-submit"></textarea>
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

class TestData {
  constructor() {
    this.name = "testData";
  }

  createTarget() {
    return (
      (this.target = $(
        `<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
          "测试数据"
        )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__(
          "仅字段名称存在时有效"
        )}" class="auto-submit" >\n        </div>\n    </div>`
      )),
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

class ShowCodeTitle {
  constructor() {
    this.name = "showCodeTitle";
  }
  createTarget() {
    return (
      (this.target = $(`
        <div class="hiprint-option-item" title="条形码底部是否显示内容">
          <div class="hiprint-option-item-label">
            ${i18n.__("显示码值")}
          </div>
          <div class="hiprint-option-item-field">
            <select class="auto-submit">
              <option value="">${i18n.__("默认")}</option>
              <option value="true">${i18n.__("显示")}</option>
              <option value="false">${i18n.__("隐藏")}</option>
            </select>
          </div>
        </div>`)),
      this.target
    );
  }
  getValue() {
    if ("true" == this.target.find("select").val()) return true;
  }
  setValue(value) {
    this.target.find("select").val((value == null ? "" : value).toString());
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

class HideTitle {
  constructor() {
    this.name = "hideTitle";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("标题显示隐藏")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="false">${i18n.__("显示")}</option>
            <option value="true">${i18n.__("隐藏")}</option>
          </select>
        </div>
      </div>
    `);
    return this.target;
  }

  getValue() {
    const selectedValue = this.target.find("select").val();
    return selectedValue === "true"; // 返回布尔值
  }

  setValue(value) {
    const valueToSet = value == null ? "" : value.toString();
    this.target.find("select").val(valueToSet);
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

class PanelLayoutOptions {
  constructor() {
    this.name = "panelLayoutOptions";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">${i18n.__("面板排列")}</div>
      </div>
    `);
    this.layoutType = $(`
      <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">
        <div style="width:25%">${i18n.__("排列方式")}:</div>
        <select style="width:75%" class="auto-submit">
          <option value="column">${i18n.__("纵向")}</option>
          <option value="row">${i18n.__("横向")}</option>
        </select>
      </div>
    `);
    this.layoutRowGap = $(`
      <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;margin-top: 4px">
        <div style="width:25%">${i18n.__("垂直间距")}:</div>
        <input style="width:75%" type="text" placeholder="${i18n.__(
          "垂直间距mm"
        )}" class="auto-submit">
      </div>
    `);
    this.layoutColumnGap = $(`
      <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;margin-top: 4px">
        <div style="width:25%">${i18n.__("水平间距")}:</div>
        <input style="width:75%" type="text" placeholder="${i18n.__(
          "水平间距mm"
        )}" class="auto-submit">
      </div>
    `);
    this.target.append(this.layoutType);
    this.target.append(this.layoutRowGap);
    this.target.append(this.layoutColumnGap);
    return this.target;
  }

  getValue() {
    const options = {
      layoutType: this.layoutType.find("select").val() || "column",
      layoutRowGap: parseInt(this.layoutRowGap.find("input").val() || 0),
      layoutColumnGap: parseInt(this.layoutColumnGap.find("input").val() || 0),
    };
    return options;
  }

  setValue(options) {
    this.options = options;
    this.layoutType.find("select").val(options.layoutType || "column");
    this.layoutRowGap.find("input").val(options.layoutRowGap);
    this.layoutColumnGap.find("input").val(options.layoutColumnGap);
  }

  destroy() {
    this.target.remove();
  }
}

class GridColumns {
  constructor() {
    this.name = "gridColumns";
  }

  createTarget() {
    return (this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("一行多组")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="2">${i18n.__("一行二列")}</option>
            <option value="3">${i18n.__("一行三列")}</option>
            <option value="4">${i18n.__("一行四列")}</option>
          </select>
        </div>
      </div>`));
  }

  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return parseFloat(selectedValue.toString());
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

class GridColumnsGutter {
  constructor() {
    this.name = "gridColumnsGutter";
  }

  createTarget() {
    return (this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("一行多组间隔")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="1.5">1.5pt</option>
            <option value="2.25">2.25pt</option>
            <option value="3">3pt</option>
            <option value="3.75">3.75pt</option>
            <option value="4.5">4.5pt</option>
            <option value="5.25">5.25pt</option>
            <option value="6">6pt</option>
            <option value="6.75">6.75pt</option>
            <option value="7.25">7.25pt</option>
            <option value="8.5">8.5pt</option>
            <option value="9">9pt</option>
          </select>
        </div>
      </div>`));
  }

  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return parseFloat(selectedValue.toString());
  }

  css(element, gutterSize) {
    if (element && element.length) {
      if (gutterSize) {
        element
          .find(".table-grid-row")
          .css("margin-left", `-${gutterSize}pt`)
          .css("margin-right", `-${gutterSize}pt`);
        element
          .find(".tableGridColumnsGutterRow")
          .css("padding-left", `${gutterSize}pt`)
          .css("padding-right", `${gutterSize}pt`);
        return null;
      }
      element.find(".table-grid-row").map((index, row) => {
        row.style.marginLeft = "";
        row.style.marginRight = "";
      });
      element.find(".tableGridColumnsGutterRow").map((index, row) => {
        row.style.paddingLeft = "";
        row.style.paddingRight = "";
      });
    }
    return null;
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

class FooterFormatter {
  constructor() {
    this.name = "footerFormatter";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("表格脚函数")}
        </div>
        <div class="hiprint-option-item-field">
          <textarea style="height:80px;" placeholder="function(options,rows,data,pageData,pageIndex){ return '<tr></tr>' }" class="auto-submit"></textarea>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("textarea").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("textarea").val(value ? value.toString() : null);
  }

  destroy() {
    this.target.remove();
  }
}

class GroupSequenceContinue {
  constructor() {
    this.name = "groupSequenceContinue";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("分组序号续编")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="true">${i18n.__("是")}</option>
            <option value="false">${i18n.__("否")}</option>
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

class GroupFieldsFormatter {
  constructor() {
    this.name = "groupFieldsFormatter";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("分组字段函数")}
        </div>
        <div class="hiprint-option-item-field">
          <textarea style="height:80px;" placeholder="function(type,options,data){ return [] }" class="auto-submit"></textarea>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("textarea").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("textarea").val(value ? value.toString() : null);
  }

  destroy() {
    this.target.remove();
  }
}

class GroupFormatter {
  constructor() {
    this.name = "groupFormatter";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("分组头格式化函数")}
        </div>
        <div class="hiprint-option-item-field">
          <textarea style="height:80px;" placeholder="function(colTotal,tableData,printData,groupData,options){ return '${i18n.__(
            "分组头信息"
          )}(html)'; }" class="auto-submit"></textarea>
        </div>
      </div>
    `);
    return this.target;
  }

  getValue() {
    const value = this.target.find("textarea").val();
    return value ? value : undefined;
  }

  setValue(value) {
    this.target.find("textarea").val(value ? value.toString() : null);
  }

  destroy() {
    this.target.remove();
  }
}

class GroupFooterFormatter {
  constructor() {
    this.name = "groupFooterFormatter";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("分组脚格式化函数")}
        </div>
        <div class="hiprint-option-item-field">
          <textarea style="height:80px;" placeholder="function(colTotal,tableData,printData,groupData,options){ return '${i18n.__(
            "分组脚信息"
          )}(html)'; }" class="auto-submit"></textarea>
        </div>
      </div>
    `);
    return this.target;
  }

  getValue() {
    const value = this.target.find("textarea").val();
    return value ? value : undefined;
  }

  setValue(value) {
    this.target.find("textarea").val(value ? value.toString() : null);
  }

  destroy() {
    this.target.remove();
  }
}

class GridColumnsFooterFormatter {
  constructor() {
    this.name = "gridColumnsFooterFormatter";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("多组表格脚函数")}
        </div>
        <div class="hiprint-option-item-field">
          <textarea style="height:80px;" placeholder="function(options,rows,data,pageData){ return ''; }" class="auto-submit"></textarea>
        </div>
      </div>
    `);
    return this.target;
  }

  getValue() {
    const value = this.target.find("textarea").val();
    return value ? value : undefined;
  }

  setValue(value) {
    this.target.find("textarea").val(value ? value.toString() : null);
  }

  destroy() {
    this.target.remove();
  }
}

class RowStyler {
  constructor() {
    this.name = "rowStyler";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("行样式函数")}
        </div>
        <div class="hiprint-option-item-field">
          <textarea style="height:80px;" placeholder="function(value,options){ return '' }" class="auto-submit"></textarea>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("textarea").val();
    return value ? value : undefined;
  }

  setValue(value) {
    this.target.find("textarea").val(value ? value.toString() : null);
  }

  destroy() {
    this.target.remove();
  }
}

class Styler {
  constructor() {
    this.name = "styler";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("样式函数")}
        </div>
        <div class="hiprint-option-item-field">
          <textarea style="height:80px;" placeholder="function(value, options, target, templateData){}" class="auto-submit"></textarea>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("textarea").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("textarea").val(value ? value.toString() : null);
  }

  destroy() {
    this.target.remove();
  }
}

class Styler2 {
  constructor() {
    this.name = "styler2";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("单元格样式函数")}
        </div>
        <div class="hiprint-option-item-field">
          <textarea style="height:80px;" placeholder="function(value,row,index,options){ return {color:'red' }; }" class="auto-submit"></textarea>
        </div>
      </div>
    `);
    return this.target;
  }

  getValue() {
    const value = this.target.find("textarea").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("textarea").val(value ? value.toString() : null);
  }

  destroy() {
    this.target.remove();
  }
}

class StylerHeader {
  constructor() {
    this.name = "stylerHeader";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("表格头样式函数")}
        </div>
        <div class="hiprint-option-item-field">
          <textarea style="height:80px;" placeholder="function(options){ return {color:'red' }; }" class="auto-submit"></textarea>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("textarea").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("textarea").val(value ? value.toString() : null);
  }

  destroy() {
    this.target.remove();
  }
}

class Formatter {
  constructor() {
    this.name = "formatter";
  }

  createTarget() {
    const targetHTML = `<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
        ${i18n.__("格式化函数")}
        </div>
        <div class="hiprint-option-item-field">
        <textarea style="height:80px;" placeholder="function(title,value,options,templateData,target){}" class="auto-submit"></textarea>
        </div>
    </div>`;
    return (this.target = $(targetHTML)), this.target;
  }

  getValue() {
    const value = this.target.find("textarea").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("textarea").val(value ? value.toString() : null);
  }

  destroy() {
    this.target.remove();
  }
}

class Formatter2 {
  constructor() {
    this.name = "formatter2";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("单元格格式化函数")}
        </div>
        <div class="hiprint-option-item-field">
          <textarea style="height:80px;" placeholder="function(value,row,index,options){ return ''; }" class="auto-submit"></textarea>
        </div>
      </div>`);
    return this.target;
  }

  getValue() {
    const value = this.target.find("textarea").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("textarea").val(value ? value.toString() : null);
  }

  destroy() {
    this.target.remove();
  }
}

class RenderFormatter {
  constructor() {
    this.name = "renderFormatter";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("单元格渲染函数")}
        </div>
        <div class="hiprint-option-item-field">
          <textarea style="height:80px;" placeholder="function(value,row,colIndex,options,rowIndex){ return '<td></td>'; }" class="auto-submit"></textarea>
        </div>
      </div>
    `);
    return this.target;
  }

  getValue() {
    const value = this.target.find("textarea").val();
    if (value) return value;
  }

  setValue(value) {
    this.target.find("textarea").val(value ? value.toString() : null);
  }

  destroy() {
    this.target.remove();
  }
}

class AutoCompletion {
  constructor() {
    this.name = "autoCompletion";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("自动补全")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="true">${i18n.__("是")}</option>
            <option value="false">${i18n.__("否")}</option>
          </select>
        </div>
      </div>
    `);
    return this.target;
  }

  getValue() {
    if (this.target.find("select").val() === "true") return true;
  }

  setValue(value) {
    this.target.find("select").val(value == null ? "" : value.toString());
  }

  destroy() {
    this.target.remove();
  }
}

class MaxRows {
  constructor() {
    this.name = "maxRows";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("每页最大行数")}
        </div>
        <div class="hiprint-option-item-field">
          <input type="number" value="1" step="1" min="1" class="auto-submit"/>
        </div>
      </div>`);
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

export {
  Field,
  TitleTarget,
  TestData,
  PaperNumberFormat,
  PaperNumberDisabled,
  PaperNumberContinue,
  ShowCodeTitle,
  PanelPaperRule,
  PanelPageRule,
  PageBreak,
  Transform,
  OptionsGroup,
  HideTitle,
  HideRule,
  PanelLayoutOptions,
  GridColumns,
  GridColumnsGutter,
  FooterFormatter,
  GroupSequenceContinue,
  GroupFieldsFormatter,
  GroupFormatter,
  GroupFooterFormatter,
  GridColumnsFooterFormatter,
  RowStyler,
  Styler,
  Styler2,
  StylerHeader,
  Formatter,
  Formatter2,
  RenderFormatter,
  AutoCompletion,
  MaxRows,
};
