/*
 * @Author: WANAN && 2506179675@qq.com
 * @Date: 2025-01-20 16:16:03
 * @LastEditors: WANAN
 * @LastEditTime: 2025-01-20 16:23:48
 * @Description:
 */
import { i18n } from "../../i18n/i18n";

class TableBorder {
  constructor() {
    this.name = "tableBorder";
  }

  // 设置表格边框的 CSS 样式
  setCss(element, borderType) {
    const tableElement = element.find("table");
    if (tableElement.length) {
      if (borderType === "border" || borderType === undefined) {
        tableElement.css("border", "1px solid");
        return "border:1px solid";
      }
      if (borderType === "noBorder") {
        tableElement.css("border", "0px solid");
      } else {
        tableElement[0].style.border = "";
      }
    }
    return null;
  }

  // 创建目标元素
  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表格边框")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="border">${i18n.__("有边框")}</option>
            <option value="noBorder">${i18n.__("无边框")}</option>
          </select>
        </div>
      </div>
    `);
    return this.target;
  }

  // 获取选择的值
  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) {
      return selectedValue.toString();
    }
  }

  // 设置选择的值
  setValue(value) {
    this.target.find("select").val(value);
  }

  // 销毁目标元素
  destroy() {
    this.target.remove();
  }
}

class TableHeaderBorder {
  constructor() {
    this.name = "tableHeaderBorder";
    this.target = null;
  }

  // Function to apply the border style to the table header
  applyCss(element, borderType) {
    if (element.find("thead tr").length) {
      if (borderType === "border" || borderType === undefined) {
        return element
          .find("thead tr")
          .addClass("hiprint-printElement-tableTarget-border-all");
      }
      if (borderType === "noBorder") {
        element
          .find("thead tr")
          .addClass("hiprint-printElement-tableTarget-border-none");
      } else if (borderType === "leftBorder") {
        element
          .find("thead tr")
          .addClass("hiprint-printElement-tableTarget-border-left");
      } else if (borderType === "rightBorder") {
        element
          .find("thead tr")
          .addClass("hiprint-printElement-tableTarget-border-right");
      } else if (borderType === "leftRightBorder") {
        element
          .find("thead tr")
          .addClass("hiprint-printElement-tableTarget-border-lr");
      } else if (borderType === "topBorder") {
        element
          .find("thead tr")
          .addClass("hiprint-printElement-tableTarget-border-top");
      } else if (borderType === "bottomBorder") {
        element
          .find("thead tr")
          .addClass("hiprint-printElement-tableTarget-border-bottom");
      } else if (borderType === "topBottomBorder") {
        element
          .find("thead tr")
          .addClass("hiprint-printElement-tableTarget-border-tb");
      } else {
        element.find("thead tr").removeClass();
      }
    }

    return null;
  }

  // Function to create the target DOM element with select options
  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表头边框")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="" >${i18n.__("默认")}</option>
            <option value="border" >${i18n.__("有边框")}</option>
            <option value="noBorder" >${i18n.__("无边框")}</option>
            <option value="leftBorder" >${i18n.__("左边框")}</option>
            <option value="rightBorder" >${i18n.__("右边框")}</option>
            <option value="leftRightBorder" >${i18n.__("左右边框")}</option>
            <option value="topBorder" >${i18n.__("上边框")}</option>
            <option value="bottomBorder" >${i18n.__("下边框")}</option>
            <option value="topBottomBorder" >${i18n.__("上下边框")}</option>
          </select>
        </div>
      </div>
    `);
    return this.target;
  }

  // Function to get the selected value from the dropdown
  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return selectedValue.toString();
  }

  // Function to set the selected value in the dropdown
  setValue(value) {
    this.target.find("select").val(value);
  }

  // Function to remove the target element from DOM
  destroy() {
    this.target.remove();
  }
}

class TableHeaderCellBorder {
  constructor() {
    this.name = "tableHeaderCellBorder";
    this.target = null;
  }

  // Function to apply the CSS style for table header cell borders
  css(element, borderType) {
    if (element.find("thead tr").length) {
      if (borderType === "border" || borderType === undefined) {
        return element
          .find("thead tr")
          .addClass("hiprint-printElement-tableTarget-border-td-all");
      }
      if (borderType === "noBorder") {
        element
          .find("thead tr")
          .addClass("hiprint-printElement-tableTarget-border-td-none");
      } else {
        element.find("thead tr").removeClass();
      }
    }
    return null;
  }

  // Function to create the target DOM element with select options
  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表头单元格边框")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="border">${i18n.__("有边框")}</option>
            <option value="noBorder">${i18n.__("无边框")}</option>
          </select>
        </div>
      </div>
    `);
    return this.target;
  }

  // Function to get the selected value from the dropdown
  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return selectedValue.toString();
  }

  // Function to set the selected value in the dropdown
  setValue(value) {
    this.target.find("select").val(value);
  }

  // Function to remove the target element from DOM
  destroy() {
    this.target.remove();
  }
}

class TableFooterBorder {
  constructor() {
    this.name = "tableFooterBorder";
  }

  css(element, style) {
    if (element.find("tfoot tr").length) {
      if (style === "border" || style === undefined) {
        return element
          .find("tfoot tr")
          .addClass("hiprint-printElement-tableTarget-border-all");
      }
      if (style === "noBorder") {
        element
          .find("tfoot tr")
          .addClass("hiprint-printElement-tableTarget-border-none");
      } else if (style === "leftBorder") {
        element
          .find("tfoot tr")
          .addClass("hiprint-printElement-tableTarget-border-left");
      } else if (style === "rightBorder") {
        element
          .find("tfoot tr")
          .addClass("hiprint-printElement-tableTarget-border-right");
      } else if (style === "leftRightBorder") {
        element
          .find("tfoot tr")
          .addClass("hiprint-printElement-tableTarget-border-lr");
      } else if (style === "topBorder") {
        element
          .find("tfoot tr")
          .addClass("hiprint-printElement-tableTarget-border-top");
      } else if (style === "bottomBorder") {
        element
          .find("tfoot tr")
          .addClass("hiprint-printElement-tableTarget-border-bottom");
      } else if (style === "topBottomBorder") {
        element
          .find("tfoot tr")
          .addClass("hiprint-printElement-tableTarget-border-tb");
      } else {
        element.find("tfoot tr").removeClass();
      }
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表尾边框")}
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

class TableFooterCellBorder {
  constructor() {
    this.name = "tableFooterCellBorder";
  }

  css(element, style) {
    if (element.find("tfoot tr").length) {
      if (style === "border" || style === undefined) {
        return element
          .find("tfoot tr")
          .addClass("hiprint-printElement-tableTarget-border-td-all");
      }
      if (style === "noBorder") {
        element
          .find("tfoot tr")
          .addClass("hiprint-printElement-tableTarget-border-td-none");
      } else {
        element.find("tfoot tr").removeClass();
      }
    }
    return null;
  }

  createTarget() {
    this.target = $(`
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表尾单元格边框")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="border">${i18n.__("有边框")}</option>
            <option value="noBorder">${i18n.__("无边框")}</option>
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

class TableBodyCellBorder {
  constructor() {
    this.name = "tableBodyCellBorder";
  }

  // 用于设置表体单元格的边框
  css(tableElement, borderType) {
    if (tableElement.find("tbody tr").length) {
      if (borderType === "border" || borderType === undefined) {
        return tableElement
          .find("tbody tr")
          .addClass("hiprint-printElement-tableTarget-border-td-all");
      }

      if (borderType === "noBorder") {
        tableElement
          .find("tbody tr")
          .addClass("hiprint-printElement-tableTarget-border-td-none");
      } else {
        tableElement.find("tbody tr").removeClass();
      }
    }

    return null;
  }

  // 创建设置边框样式的目标界面
  createTarget() {
    this.target = $(
      `<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表体单元格边框")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="border">${i18n.__("有边框")}</option>
            <option value="noBorder">${i18n.__("无边框")}</option>
          </select>
        </div>
      </div>`
    );
    return this.target;
  }

  // 获取用户选择的边框类型
  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return selectedValue.toString();
  }

  // 设置边框类型的值
  setValue(value) {
    this.target.find("select").val(value);
  }

  // 销毁界面元素
  destroy() {
    this.target.remove();
  }
}

class TableHeaderRowHeight {
  constructor() {
    this.name = "tableHeaderRowHeight";
    this.target = null;
  }

  css(element, height) {
    if (element.find("thead tr td").length) {
      if (height) {
        element.find("thead tr td:not([rowspan])").css("height", height + "pt");
        return "height:" + height + "pt";
      }
      element.find("thead tr td").map((index, td) => {
        td.style.height = "";
      });
    }

    return null;
  }

  createTarget() {
    this.target = $(
      `<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表头行高")}
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
      </div>`
    );
    return this.target;
  }

  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) {
      return parseFloat(selectedValue.toString());
    }
  }

  setValue(value) {
    if (value) {
      const optionExists = this.target.find(`option[value="${value}"]`).length;
      if (!optionExists) {
        this.target
          .find("select")
          .prepend(`<option value="${value}">${value}</option>`);
      }
      this.target.find("select").val(value);
    }
  }

  destroy() {
    if (this.target) {
      this.target.remove();
    }
  }
}

class TableHeaderFontSize {
  constructor() {
    this.name = "tableHeaderFontSize";
  }

  css(element, size) {
    if (element.find("thead").length) {
      if (size) {
        return (
          element.find("thead").css("font-size", size + "pt"),
          "font-size:" + size + "pt"
        );
      }
      element.find("thead").map(function (index, header) {
        header.style.fontSize = "";
      });
    }

    return null;
  }

  createTarget() {
    this.target = $(
      `<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表头字体大小")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="" >${i18n.__("默认")}</option>
            <option value="6" >6pt</option>
            <option value="6.75" >6.75pt</option>
            <option value="7.5" >7.5pt</option>
            <option value="8.25" >8.25pt</option>
            <option value="9" >9pt</option>
            <option value="9.75" >9.75pt</option>
            <option value="10.5" >10.5pt</option>
            <option value="11.25" >11.25pt</option>
            <option value="12" >12pt</option>
            <option value="12.75" >12.75pt</option>
            <option value="13.5" >13.5pt</option>
            <option value="14.25" >14.25pt</option>
            <option value="15" >15pt</option>
            <option value="15.75" >15.75pt</option>
            <option value="16.5" >16.5pt</option>
            <option value="17.25" >17.25pt</option>
            <option value="18" >18pt</option>
            <option value="18.75" >18.75pt</option>
            <option value="19.5" >19.5pt</option>
            <option value="20.25" >20.25pt</option>
            <option value="21" >21pt</option>
            <option value="21.75" >21.75pt</option>
          </select>
        </div>
      </div>`
    );
    return this.target;
  }

  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return parseFloat(selectedValue.toString());
  }

  setValue(value) {
    if (value) {
      if (this.target.find('option[value="' + value + '"]').length === 0) {
        this.target
          .find("select")
          .prepend('<option value="' + value + '" >' + value + "</option>");
      }
      this.target.find("select").val(value);
    }
  }

  destroy() {
    this.target.remove();
  }
}

class TableHeaderFontWeight {
  constructor() {
    this.name = "tableHeaderFontWeight";
  }

  css(element, weight) {
    if (element.find("thead").length) {
      if (weight) {
        return (
          element.find("thead tr td").css("font-weight", weight),
          "font-weight:" + weight
        );
      }
      element.find("thead tr td").map(function (index, header) {
        header.style.fontWeight = "";
      });
    }

    return null;
  }

  createTarget() {
    this.target = $(
      `<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表头字体粗细")}
        </div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="">${i18n.__("默认")}</option>
            <option value="lighter">${i18n.__("更细")}</option>
            <option value="bold">${i18n.__("粗体")}</option>
            <option value="bolder">${i18n.__("粗体+")}</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
            <option value="600">600</option>
            <option value="700">700</option>
            <option value="800">800</option>
            <option value="900">900</option>
          </select>
        </div>
      </div>`
    );
    return this.target;
  }

  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) return selectedValue;
  }

  setValue(value) {
    if (value) {
      if (this.target.find('option[value="' + value + '"]').length === 0) {
        this.target
          .find("select")
          .prepend('<option value="' + value + '" >' + value + "</option>");
      }
      this.target.find("select").val(value);
    }
  }

  destroy() {
    this.target.remove();
  }
}

class TableBodyRowHeight {
  constructor() {
    this.name = "tableBodyRowHeight";
  }

  // 设置或清除表格行高
  css(element, height) {
    const tableCells = element.find("tbody tr td");

    if (tableCells.length) {
      if (height) {
        tableCells.css("height", `${height}pt`);
        return `height:${height}pt`;
      }

      tableCells.map(function (index, cell) {
        cell.style.height = "";
      });
    }

    return null;
  }

  // 创建行高设置选项面板
  createTarget() {
    this.target = $(
      `<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表体行高")}
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
      </div>`
    );

    return this.target;
  }

  // 获取选定的行高值
  getValue() {
    const selectedValue = this.target.find("select").val();
    if (selectedValue) {
      return parseFloat(selectedValue.toString());
    }
  }

  // 设置选定的行高值
  setValue(value) {
    if (value) {
      const optionExists = this.target.find(`option[value="${value}"]`).length;
      if (!optionExists) {
        this.target
          .find("select")
          .prepend(`<option value="${value}">${value}</option>`);
      }
    }
    this.target.find("select").val(value);
  }

  // 销毁当前设置
  destroy() {
    this.target.remove();
  }
}

class TableHeaderBackground {
  constructor() {
    this.name = "tableHeaderBackground";
  }

  // 设置或清除表头背景颜色
  css(element, background) {
    const tableHeader = element.find("thead");

    if (tableHeader.length) {
      if (background) {
        tableHeader.css("background", background);
        return `background:${background}`;
      }

      tableHeader.map(function (index, header) {
        header.style.background = "";
      });
    }

    return null;
  }

  // 创建表头背景颜色设置面板
  createTarget() {
    this.target = $(
      `<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">
          ${i18n.__("表头背景")}
        </div>
        <div class="hiprint-option-item-field">
          <input type="text" class="auto-submit" />
        </div>
      </div>`
    );

    return this.target;
  }

  // 获取当前选定的背景颜色值
  getValue() {
    const backgroundValue = this.target.find("input").val();
    if (backgroundValue) {
      return backgroundValue.toString();
    }
  }

  // 设置背景颜色
  setValue(value) {
    this.target.find("input").minicolors({
      defaultValue: value || "",
      theme: "bootstrap",
    });

    this.target.find("input").val(value);
  }

  // 销毁当前设置
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

export {
  TableBorder,
  TableHeaderBorder,
  TableHeaderCellBorder,
  TableFooterBorder,
  TableFooterCellBorder,
  TableBodyCellBorder,
  TableHeaderRowHeight,
  TableHeaderFontSize,
  TableHeaderFontWeight,
  TableBodyRowHeight,
  TableHeaderBackground,
  TableBodyRowBorder,
  TableSummaryTitle,
  TableSummaryText,
  TableSummaryColspan,
  TableSummaryAlign,
  TableSummaryNumFormat,
  TableHeaderRepeat,
  TableFooterRepeat,
  TableColumnHeight,
  RowsColumnsMerge,
  RowsColumnsMergeClean,
  TableSummaryFormatter,
  TableSummary,
  TableTextType,
  TableBarcodeMode,
  TableQRCodeLevel,
};
