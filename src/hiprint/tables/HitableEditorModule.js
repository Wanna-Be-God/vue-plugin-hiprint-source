import { i18n } from "../i18n/i18n";

export default function HitableEditorModule(module, exports, require) {
  "use strict";

  // 文本编辑器类 - 处理基础文本输入
  class TextEditor {
    // 初始化编辑器
    init(element) {
      this.target = $(
        '<input type="text" class="hitable-editor-text" value="" />'
      );
      element.getTarget().append(this.target);
      this.target.focus();
    }

    // 获取编辑器的值
    getValue() {
      return this.target.val();
    }

    // 设置编辑器的值
    setValue(value) {
      this.target.val(value);
    }

    // 销毁编辑器
    destroy() {
      this.target.remove();
    }
  }

  // 文本编辑器工厂类 - 单例模式
  class TextEditorFactory {
    constructor() {
      this.text = new TextEditor();
    }

    static get Instance() {
      if (!TextEditorFactory._instance) {
        TextEditorFactory._instance = new TextEditorFactory();
      }
      return TextEditorFactory._instance;
    }
  }

  // 下拉选择编辑器类 - 处理字段选择
  class SelectEditor {
    // 初始化下拉选择器
    init(fields, element) {
      let optionsHtml = `<select class="auto-submit" style="width:100%">
                <option value="" disabled>${i18n.__("请选择字段")}</option>`;
      fields.forEach((field) => {
        optionsHtml +=
          field.field == element.field
            ? ` <option value="${field.field || ""}" selected >${
                field.text || ""
              }</option>`
            : ` <option value="${field.field || ""}" >${
                field.text || ""
              }</option>`;
      });
      optionsHtml += " </select>";
      this.target = $(optionsHtml);
      element.getTarget().append(this.target);
      this.target.focus();
    }

    // 获取选中的值和文本
    getValue() {
      const val = this.target.val();
      const text = this.target.find(`option[value="${val}"]`).text();
      return `${text}#${val}`;
    }

    // 设置选中的值
    setValue(value) {
      if (value) {
        if (!this.target.find(`option[value="${value}"]`).length) {
          this.target
            .find("select")
            .prepend(`<option value="${value}" >${value}</option>`);
        }
        this.target.find("select").val(value);
      }
    }

    // 销毁选择器
    destroy() {
      this.target.remove();
    }
  }

  // 选择编辑器工厂类 - 单例模式
  class SelectEditorFactory {
    constructor() {
      this.select = new SelectEditor();
    }

    static get Instance() {
      if (!SelectEditorFactory._instance) {
        SelectEditorFactory._instance = new SelectEditorFactory();
      }

      console.log(SelectEditorFactory._instance);
      return SelectEditorFactory._instance;
    }
  }

  // 编辑器工厂类 - 用于创建不同类型的编辑器
  class EditorFactory {
    static get Instance() {
      if (!EditorFactory._instance) {
        EditorFactory._instance = new EditorFactory();
      }
      return EditorFactory._instance;
    }

    createEditor(type) {
      // return $.extend({}, TextEditorFactory.Instance[type]);
      return Object.create(TextEditorFactory.Instance[type]);
    }

    createSelect(type) {
      // return $.extend({}, SelectEditorFactory.Instance[type]);
      return Object.create(SelectEditorFactory.Instance[type]);
    }
  }

  const Utils = require(10);
  const RectUtils = require(14);
  const IdUtils = require(11);

  // 表格单元格类 - 处理单元格的编辑功能
  class TableCell {
    // 初始化单元格
    init(cell, options) {
      this.tableOptions = options;
      this.title = cell.title;
      this.field = cell.field;
      cell
        .getTarget()
        .unbind("dblclick.hitable")
        .bind("dblclick.hitable", () => {
          cell.isEditing = true;
          this.beginEdit(cell);
        });
    }

    // 获取显示的HTML内容
    getDisplayHtml() {
      return this.title;
    }

    // 开始编辑单元格
    beginEdit(cell) {
      if (
        this.tableOptions.options.fields &&
        this.tableOptions.options.fields.length
      ) {
        this.editor = EditorFactory.Instance.createSelect("select");
        console.log(this.editor);
        cell.getTarget().html("");
        this.editor.init(this.tableOptions.options.fields, cell);
        this.editor.setValue(this.field || "");
        $(this.editor.target).keydown((event) => {
          if (event.keyCode === 13) this.endEdit(cell);
        });
        $(this.editor.target).change(() => {
          this.endEdit(cell);
        });
        $(this.editor.target).blur(() => {
          this.endEdit(cell);
        });
      } else {
        this.editor = EditorFactory.Instance.createEditor("text");
        cell.getTarget().html("");
        this.editor.init(cell);
        if (this.title || this.field) {
          this.tableOptions.options.isEnableEditField
            ? this.editor.setValue(`${this.title || ""}#${this.field || ""}`)
            : this.editor.setValue(this.title || "");
        }
        $(this.editor.target).keydown((event) => {
          if (event.keyCode === 13) this.endEdit(cell);
        });
        $(this.editor.target).blur(() => {
          this.endEdit(cell);
        });
        if (
          this.tableOptions.editingCell &&
          this.tableOptions.editingCell.id !== cell.id
        ) {
          this.tableOptions.editingCell.innerElement.endEdit(
            this.tableOptions.editingCell
          );
        }
        this.tableOptions.editingCell = cell;
      }
    }

    // 结束编辑单元格
    endEdit(cell) {
      cell.isEditing = false;
      const value = this.editor.getValue();
      if (value) {
        if (
          this.tableOptions.options.isEnableEditField ||
          this.tableOptions.options.fields
        ) {
          const parts = value.split("#");
          cell.title = this.title = parts[0];
          if (parts.length > 0) {
            cell.columnId = cell.field = this.field = parts[1];
          }
          if (cell.id) cell.target.attr("id", cell.id);
          if (cell.columnId) cell.target.attr("column-id", cell.columnId);
          hinnn.event.trigger(
            `hiprintTemplateDataChanged_${this.tableOptions.options.templateId}`,
            "调整表格列字段"
          );
        } else {
          cell.title = this.title = value;
        }
      } else {
        if (this.tableOptions.options.isEnableEditField) {
          cell.title = this.title = "";
          cell.field = this.field = "";
        } else {
          cell.title = this.title = "";
        }
      }
      this.editor.destroy();
      cell.getTarget().html(this.title);
    }
  }

  // 表格列类 - 存储列的配置信息
  class TableColumn {
    constructor(column) {
      // 列标题
      this.title = column.title;
      // 列字段名
      this.field = column.field;
      // 列宽度
      this.width = column.width;
      // 水平对齐方式
      this.align = column.align;
      // 表头水平对齐方式
      this.halign = column.halign;
      // 垂直对齐方式
      this.vAlign = column.vAlign;
      this.colspan = column.colspan;
      this.rowspan = column.rowspan;
      this.checked = column.checked;
      this.columnId = column.columnId;
      this.tableSummaryTitle = column.tableSummaryTitle;
      this.tableSummaryText = column.tableSummaryText;
      this.tableSummaryColspan = column.tableSummaryColspan;
      this.tableSummary = column.tableSummary;
      this.tableSummaryAlign = column.tableSummaryAlign;
      this.tableSummaryNumFormat = column.tableSummaryNumFormat;
      this.tableSummaryFormatter = column.tableSummaryFormatter;
      this.showCodeTitle = column.showCodeTitle;
      this.upperCase = column.upperCase;
      this.renderFormatter =
        column.renderFormatter && column.renderFormatter.toString();
      this.formatter2 = column.formatter2 && column.formatter2.toString();
      this.styler2 = column.styler2 && column.styler2.toString();
      this.stylerHeader = column.stylerHeader && column.stylerHeader.toString();
      this.tableColumnHeight = column.tableColumnHeight;
      this.tableTextType = column.tableTextType;
      this.tableBarcodeMode = column.tableBarcodeMode;
      this.tableQRCodeLevel = column.tableQRCodeLevel;
    }
  }

  // 表格单元格基类 - 提供基础的单元格功能
  class TableCellBase {
    constructor() {
      this.id = IdUtils.a.createId();
    }

    // 初始化基础单元格
    init(element, options, rowId, isHead) {
      this.isHead = isHead;
      this.rowId = rowId;
      this.isEditing = false;
      const numberRegex = /^[0-9]*$/;
      this.target = element;
      this.tableOptions = options;
      const colspanAttr = this.target.attr("colspan");
      this.colspan = numberRegex.test(colspanAttr) ? parseInt(colspanAttr) : 1;
      const rowspanAttr = this.target.attr("rowspan");
      this.rowspan = numberRegex.test(rowspanAttr) ? parseInt(rowspanAttr) : 1;
      this.initEvent();
      if (this.isHead) this.initInnerEelement();
    }

    // 开始编辑
    beginEdit() {
      if (
        !this.isEditing &&
        this.tableOptions.isEnableEdit &&
        this.tableOptions.onBeforEdit(this)
      ) {
        const value = this.getValue();
        this.editor = EditorFactory.Instance.createEditor("text");
        this.isEditing = true;
        this.tableOptions.editingCell = this;
        this.target.html("");
        this.editor.init(this);
        this.editor.setValue(value);
      }
    }

    // 结束编辑
    endEdit() {
      this.isEditing = false;
      const value = this.editor.getValue();
      this.editor.destroy();
      this.target.html(value);
    }

    getTarget() {
      return this.target;
    }

    getValue() {
      return this.target.html();
    }

    setValue(value) {}

    initInnerEelement() {
      this.innerElement = new TableCell();
      this.innerElement.init(this, this.tableOptions);
    }

    initEvent() {}

    // 检查坐标是否在单元格内
    isXYinCell(x, y) {
      const rect = new Utils.b({
        x: x,
        y: y,
        height: 0,
        width: 0,
      });
      return this.isOverlap(rect);
    }

    // 获取单元格的矩形区域
    getTableRect() {
      return new Utils.b({
        x: this.target.offset().left,
        y: this.target.offset().top,
        height: this.target[0].offsetHeight,
        width: this.target[0].offsetWidth,
      });
    }

    isOverlap(rect) {
      const tableRect = this.getTableRect();
      return (
        rect.x + rect.width > tableRect.x &&
        tableRect.x + tableRect.width > rect.x &&
        rect.y + rect.height > tableRect.y &&
        tableRect.y + tableRect.height > rect.y
      );
    }

    isInRect(rectInfo) {
      const rect = rectInfo.rect;
      const tableRect = this.getTableRect();

      if (
        tableRect.x >= rect.x &&
        tableRect.x + tableRect.width <= rect.x + rect.width &&
        tableRect.y >= rect.y &&
        tableRect.y + tableRect.height <= rect.y + rect.height
      ) {
        const mergedRect = RectUtils.a.mergeRect(rect, tableRect);
        if (JSON.stringify(rect) === JSON.stringify(mergedRect)) {
          return true;
        } else {
          rectInfo.changed = true;
          rectInfo.rect = mergedRect;
          return true;
        }
      }

      return false;
    }

    isSelected() {
      return this.target.hasClass("selected");
    }

    select() {
      this.target.addClass("selected");
    }

    isHeader() {
      return false;
    }

    setAlign(align) {
      this.align = align;
      if (align) {
        this.target.css("text-align", align);
      } else {
        this.target[0].style.textAlign = "";
      }
    }

    setVAlign(vAlign) {
      this.vAlign = vAlign;
      if (vAlign) {
        this.target.css("vertical-align", vAlign);
      } else {
        this.target[0].style.verticalAlign = "";
      }
    }

    getEntity() {
      return new TableColumn(this);
    }
  }

  require.d(exports, "a", function () {
    return TableColumnExtended;
  });

  // 表格列扩展类 - 提供额外的列功能
  class TableColumnExtended extends TableCellBase {
    constructor(options = {}) {
      super();
      this.width = options.width ? parseFloat(options.width.toString()) : 100;
      this.title = options.title;
      this.descTitle = options.descTitle;
      this.field = options.field;
      this.fixed = options.fixed;
      this.rowspan = options.rowspan ? parseInt(options.rowspan) : 1;
      this.colspan = options.colspan ? parseInt(options.colspan) : 1;
      this.align = options.align;
      this.halign = options.halign;
      this.vAlign = options.vAlign;
      this.formatter = options.formatter;
      this.styler = options.styler;
      this.renderFormatter = options.renderFormatter;
      this.formatter2 = options.formatter2;
      this.styler2 = options.styler2;
      this.stylerHeader = options.stylerHeader;
      this.checkbox = options.checkbox;
      this.checked = options.checked !== 0;
      this.columnId = options.columnId || options.field;
      this.tableColumnHeight = options.tableColumnHeight;
      this.tableTextType = options.tableTextType;
      this.tableBarcodeMode = options.tableBarcodeMode;
      this.tableQRCodeLevel = options.tableQRCodeLevel;
      this.tableSummaryTitle = options.tableSummaryTitle;
      this.tableSummaryText = options.tableSummaryText;
      this.tableSummaryColspan = options.tableSummaryColspan;
      this.tableSummary = options.tableSummary;
      this.tableSummaryAlign = options.tableSummaryAlign;
      this.tableSummaryNumFormat = options.tableSummaryNumFormat;
      this.tableSummaryFormatter = options.tableSummaryFormatter;
      this.showCodeTitle = options.showCodeTitle;
      this.upperCase = options.upperCase;
    }

    css(style) {}
  }
}
