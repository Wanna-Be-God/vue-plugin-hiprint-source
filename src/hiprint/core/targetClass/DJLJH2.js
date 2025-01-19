/*
 * @Author: WANAN && 2506179675@qq.com
 * @Date: 2025-01-19 14:16:50
 * @LastEditors: WANAN
 * @LastEditTime: 2025-01-19 14:50:07
 * @Description:
 */
import { i18n } from "../../i18n/i18n";

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

class TableSummaryFormatter {
  constructor() {
    this.name = "tableSummaryFormatter";
  }
  createTarget() {
    return (
      (this.target = $(`
        <div class="hiprint-option-item hiprint-option-item-row">
          <div class="hiprint-option-item-label">
            ${i18n.__("底部聚合格式化函数")}
          </div>
          <div class="hiprint-option-item-field">
            <textarea style="height:80px;" placeholder="function(column,fieldPageData,tableData,options){ return '<td></td>'; }" class="auto-submit"></textarea>
          </div>
        </div>`)),
      this.target
    );
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

class UpperCase {
  constructor() {
    this.name = "upperCase";
  }
  createTarget() {
    const optionsList = [
      { text: "「小写」十点八", value: "0" },
      { text: "「小写」一十点八", value: "1" },
      { text: "「大写」拾点捌", value: "2" },
      { text: "「大写」壹拾点捌", value: "3" },
      { text: "「金额」人民币拾元捌角", value: "4" },
      { text: "「金额」人民币壹拾元捌角", value: "5" },
      { text: "「金额」人民币壹拾元捌角零分", value: "6" },
      { text: "「金额」壹拾元捌角零分", value: "7" },
    ];
    let optionsHTML = `\n<option value="">${i18n.__("默认")}</option>`;
    optionsList.forEach((item) => {
      optionsHTML += `\n<option value='${item.value}'>${item.text}</option>`;
    });
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("转大小写")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit"></select>
        </div>
      </div>`);
    this.target.find(".auto-submit").append($(optionsHTML));
    return this.target;
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

class TableSummary {
  constructor() {
    this.name = "tableSummary";
  }

  createTarget() {
    return (
      (this.target = $(`
        <div class="hiprint-option-item">
          <div class="hiprint-option-item-label">${i18n.__(
            "底部聚合类型"
          )}</div>
          <div class="hiprint-option-item-field">
            <select class="auto-submit">
              <option value="">${i18n.__("不聚合")}</option>
              <option value="count">${i18n.__("计数")}</option>
              <option value="sum">${i18n.__("合计")}</option>
              <option value="avg">${i18n.__("平均值")}</option>
              <option value="min">${i18n.__("最小值")}</option>
              <option value="max">${i18n.__("最大值")}</option>
              <option value="text">${i18n.__("仅文本")}</option>
            </select>
          </div>
        </div>
      `)),
      this.target
    );
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

class TopOffset {
  constructor() {
    this.name = "topOffset";
  }

  createTarget() {
    return (
      (this.target = $(`
        <div class="hiprint-option-item hiprint-option-item-row">
          <div class="hiprint-option-item-label">${i18n.__("顶部偏移")}</div>
          <div class="hiprint-option-item-field">
            <input type="text" placeholder="${i18n.__(
              "偏移量"
            )}pt" class="auto-submit">
          </div>
        </div>
      `)),
      this.target
    );
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

class TableHeaderRepeat {
  constructor() {
    this.name = "tableHeaderRepeat";
  }

  createTarget() {
    return (this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表格头显示")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="page">${i18n.__("每页显示")}</option>
            <option value="first">${i18n.__("首页显示")}</option>
            <option value="none">${i18n.__("不显示")}</option>
          </select>
        </div>
      </div>`));
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

class PaddingLeft {
  constructor() {
    this.name = "paddingLeft";
  }

  css(element, value) {
    if (element && element.length) {
      if (value) {
        return element.css("padding-left", value + "pt"), "padding-left";
      }
      element[0].style.paddingLeft = "";
    }
    return null;
  }

  createTarget() {
    return (this.target = $(
      `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
        "左内边距"
      )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
        "默认"
      )}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`
    ));
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return parseFloat(value.toString());
  }

  setValue(value) {
    if (value) {
      if (!this.target.find('option[value="' + value + '"]').length) {
        this.target
          .find("select")
          .prepend('<option value="' + value + '" >' + value + "</option>");
      }
    }
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class PaddingRight {
  constructor() {
    this.name = "paddingRight";
  }

  css(element, value) {
    if (element && element.length) {
      if (value) {
        return element.css("padding-right", value + "pt"), "padding-right";
      }
      element[0].style.paddingRight = "";
    }
    return null;
  }

  createTarget() {
    return (this.target = $(
      `<div class="hiprint-option-item">\n        <div class="hiprint-option-item-label">\n        ${i18n.__(
        "右内边距"
      )}\n        </div>\n        <div class="hiprint-option-item-field">\n        <select class="auto-submit">\n        <option value="" >${i18n.__(
        "默认"
      )}</option>\n        <option value="0.75" >0.75pt</option>\n        <option value="1.5" >1.5pt</option>\n        <option value="2.25" >2.25pt</option>\n        <option value="3" >3pt</option>\n        <option value="3.75" >3.75pt</option>\n        <option value="4.5" >4.5pt</option>\n        <option value="5.25" >5.25pt</option>\n        <option value="6" >6pt</option>\n        <option value="6.75" >6.75pt</option>\n        <option value="7.5" >7.5pt</option>\n        <option value="8.25" >8.25pt</option>\n        <option value="9" >9pt</option>\n        <option value="9.75" >9.75pt</option>\n        <option value="10.5" >10.5pt</option>\n        <option value="11.25" >11.25pt</option>\n        <option value="12" >12pt</option>\n        <option value="12.75" >12.75pt</option>\n        <option value="13.5" >13.5pt</option>\n        <option value="14.25" >14.25pt</option>\n        <option value="15" >15pt</option>\n        <option value="15.75" >15.75pt</option>\n        <option value="16.5" >16.5pt</option>\n        <option value="17.25" >17.25pt</option>\n        <option value="18" >18pt</option>\n        <option value="18.75" >18.75pt</option>\n        <option value="19.5" >19.5pt</option>\n        <option value="20.25" >20.25pt</option>\n        <option value="21" >21pt</option>\n        <option value="21.75" >21.75pt</option>\n        </select>\n        </div>\n    </div>`
    ));
  }

  getValue() {
    const value = this.target.find("select").val();
    if (value) return parseFloat(value.toString());
  }

  setValue(value) {
    if (value) {
      if (!this.target.find('option[value="' + value + '"]').length) {
        this.target
          .find("select")
          .prepend('<option value="' + value + '" >' + value + "</option>");
      }
    }
    this.target.find("select").val(value);
  }

  destroy() {
    this.target.remove();
  }
}

class DataType {
  constructor() {
    this.name = "dataType";
  }

  createTarget() {
    const self = this;
    return (
      (this.target = $(`
        <div class="hiprint-option-item-row">
        <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
        ${i18n.__("数据类型")}
        </div>
        <div class="hiprint-option-item-field">
        <select class="hiprint-option-item-datatype">
        <option value="" >${i18n.__("默认")}</option>
        <option value="datetime" >${i18n.__("日期时间")}</option>
        <option value="boolean" >${i18n.__("布尔")}</option>
        </select>
        </div>
    </div>
    <div class="hiprint-option-item ">
        <div class="hiprint-option-item-label ">
        ${i18n.__("格式")}
        </div>
        <div class="hiprint-option-item-field">
        <select  class="auto-submit hiprint-option-item-datatype-select-format">
        <option value="" >${i18n.__("默认")}</option>
        
        </select>
        <input class="auto-submit  hiprint-option-item-datatype-input-format" type="text" data-type="boolean" placeholder="true:false">
        </div>
    </div>
        </div>
`)),
      $(this.target.find(".hiprint-option-item-datatype")).change(function () {
        const selectedDataType = $(self.target.find(".hiprint-option-item-datatype")).val();
        self.loadFormatSelectByDataType(selectedDataType);
        self.submit(self.getValue());
      }),
      this.target
    );
  }

  getValue() {
    const selectedDataType = this.target.find(".hiprint-option-item-datatype").val();

    if (selectedDataType) {
      const selectedFormat = this.target.find(".hiprint-option-item-datatype-format").val();
      return {
        dataType: selectedDataType,
        format: selectedFormat || undefined,
      };
    }

    return {
      dataType: undefined,
      format: undefined,
    };
  }

  setValue(dataType, format) {
    this.target.find(".hiprint-option-item-datatype").val(format.dataType || "");
    this.loadFormatSelectByDataType(format.dataType);
    this.target.find(".hiprint-option-item-datatype-format").val(format.format || "");
  }

  destroy() {
    this.target.remove();
  }

  loadFormatSelectByDataType(dataType) {
    if (dataType === "boolean") {
      this.target
        .find(".hiprint-option-item-datatype-select-format")
        .removeClass("hiprint-option-item-datatype-format")
        .hide()
        .val("");
      this.target
        .find(".hiprint-option-item-datatype-input-format")
        .addClass("hiprint-option-item-datatype-format")
        .show();
    } else if (dataType === "datetime") {
      this.target
        .find(".hiprint-option-item-datatype-select-format")
        .addClass("hiprint-option-item-datatype-format")
        .show();
      this.target
        .find(".hiprint-option-item-datatype-input-format")
        .removeClass("hiprint-option-item-datatype-format")
        .hide()
        .val("");
      this.target
        .find(".hiprint-option-item-datatype-select-format")
        .html(`
            <option value="" >${i18n.__("默认")}</option>
            <option value="M/d" >M/d</option>
            <option value="MM/dd" >MM/dd</option>
            <option value="yy/M/d" >yy/M/d</option>
            <option value="yy/MM/dd" >yy/MM/dd</option>
            <option value="yyyy/M/d" >yyyy/M/d</option>
            <option value="yyyy/MM/dd" >yyyy/MM/dd</option>
            <option value="yy/M/d H:m" >yy/M/d H:m</option>
            <option value="yy/M/d H:m:s" >yy/M/d H:m:s</option>
            <option value="yy/M/d HH:mm" >yy/M/d HH:mm</option>
            <option value="yy/M/d HH:mm:ss" >yy/M/d HH:mm:ss</option>
            <option value="yy/MM/dd H:m" >yy/MM/dd H:m</option>
            <option value="yy/MM/dd H:m:s" >yy/MM/dd H:m:s</option>
            <option value="yy/MM/dd HH:mm" >yy/MM/dd HH:mm</option>
            <option value="yy/MM/dd HH:mm:ss" >yy/MM/dd HH:mm:ss</option>
            <option value="yyyy/M/d H:m" >yyyy/M/dd H:m</option>
            <option value="yyyy/M/d H:m:s" >yyyy/M/d H:m:s</option>
            <option value="yyyy/M/d HH:mm" >yyyy/M/d HH:mm</option>
            <option value="yyyy/M/d HH:mm:ss" >yyyy/M/d HH:mm:ss</option>
            <option value="yyyy/MM/dd H:m" >yyyy/MM/dd H:m</option>
            <option value="yyyy/MM/dd H:m:s" >yyyy/MM/dd H:m:s</option>
            <option value="yyyy/MM/dd HH:mm" >yyyy/MM/dd HH:mm</option>
            <option value="yyyy/MM/dd HH:mm:ss" >yyyy/MM/dd HH:mm:ss</option>

            <option value="M-d" >M-d</option>
            <option value="MM-dd" >MM-dd</option>
            <option value="yy-M-d" >yy-M-d</option>
            <option value="yy-MM-dd" >yy-MM-dd</option>
            <option value="yyyy-M-d" >yyyy-M-d</option>
            <option value="yyyy-MM-dd" >yyyy-MM-dd</option>
            <option value="yy-M-d H:m" >yy-M-d H:m</option>
            <option value="yy-M-d H:m:s" >yy-M-d H:m:s</option>
            <option value="yy-M-d HH:mm" >yy-M-d HH:mm</option>
            <option value="yy-M-d HH:mm:ss" >yy-M-d HH:mm:ss</option>
            <option value="yy-MM-dd H:m" >yy-MM-dd H:m</option>
            <option value="yy-MM-dd H:m:s" >yy-MM-dd H:m:s</option>
            <option value="yy-MM-dd HH:mm" >yy-MM-dd HH:mm</option>
            <option value="yy-MM-dd HH:mm:ss" >yy-MM-dd HH:mm:ss</option>
            <option value="yyyy-M-d H:m" >yyyy-M-d H:m</option>
            <option value="yyyy-M-d H:m:s" >yyyy-M-d H:m:s</option>
            <option value="yyyy-M-d HH:mm" >yyyy/M/d HH:mm</option>
            <option value="yyyy-M-d HH:mm:ss" >yyyy/M/d HH:mm:ss</option>
            <option value="yyyy-MM-dd H:m" >yyyy-MM-dd H:m</option>
            <option value="yyyy-MM-dd H:m:s" >yyyy-MM-dd H:m:s</option>
            <option value="yyyy-MM-dd HH:mm" >yyyy-MM-dd HH:mm</option>
            <option value="yyyy-MM-dd HH:mm:ss" >yyyy-MM-dd HH:mm:ss</option>
        `);
    } else {
      this.target
        .find(".hiprint-option-item-datatype-select-format")
        .show();
      this.target
        .find(".hiprint-option-item-datatype-input-format")
        .hide()
        .val("");
      this.target
        .find(".hiprint-option-item-datatype-format")
        .html(`
            <option value="" >${i18n.__("默认")}</option>
        `);
    }
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

class RowsColumnsMerge {
  constructor() {
    this.name = "rowsColumnsMerge";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("行/列合并函数")}
        </div>
        <div class="hiprint-option-item-field">
          <textarea style="height:80px;" placeholder="function(data, col, colIndex, rowIndex, tableData, printData){ return [1,1] }" class="auto-submit"></textarea>
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

class RowsColumnsMergeClean {
  constructor() {
    this.name = "rowsColumnsMergeClean";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">
          ${i18n.__("跨页合并是否清除")}
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
    this.target.find("select").val((value == null ? "" : value).toString());
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
          <textarea style="height:80px;" placeholder="function(colTotal,tableData,printData,groupData,options){ return '${i18n.__("分组头信息")}(html)'; }" class="auto-submit"></textarea>
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
          <textarea style="height:80px;" placeholder="function(colTotal,tableData,printData,groupData,options){ return '${i18n.__("分组脚信息")}(html)'; }" class="auto-submit"></textarea>
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

// ... existing code ...

class Align {
  constructor() {
    this.name = "align";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("单元格左右对齐")}
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

// ... existing code ...

class VerticalAlign {
  constructor() {
    this.name = "vAlign";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("单元格上下对齐")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="top">${i18n.__("上")}</option>
            <option value="middle">${i18n.__("中")}</option>
            <option value="bottom">${i18n.__("下")}</option>
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

class HorizontalAlignment {
  constructor() {
    this.name = "halign";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表格头单元格左右对齐")}
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
      </div>
    `);
    return this.target;
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

class TableFooterRepeat {
  constructor() {
    this.name = "tableFooterRepeat";
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表格脚显示")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="no">${i18n.__("不显示")}</option>
            <option value="page">${i18n.__("每页显示")}</option>
            <option value="last">${i18n.__("最后显示")}</option>
          </select>
        </div>
      </div>`);
    return this.target;
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

export {
  ShowCodeTitle,
  TableSummaryFormatter,
  UpperCase,
  TableSummary,
  TopOffset,
  PanelLayoutOptions,
  GridColumns,
  GridColumnsGutter,
  TableHeaderRepeat,
  PaddingLeft,
  PaddingRight,
  DataType,
  Formatter,
  Styler,
  RowsColumnsMerge,
  RowsColumnsMergeClean,
  FooterFormatter,
  GroupSequenceContinue,
  GroupFieldsFormatter,
  GroupFormatter,
  GroupFooterFormatter,
  GridColumnsFooterFormatter,
  RowStyler,
  Align,
  VerticalAlign,
  HorizontalAlignment,
  Styler2,
  StylerHeader,
  Formatter2,
  RenderFormatter,
  AutoCompletion,
  MaxRows,
  TableFooterRepeat
};
