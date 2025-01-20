import {
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
} from "./targetClass/table.js";

import {
  BarcodeMode,
  BarTextMode,
  BarcodeWidth,
  BarAutoWidth,
  BarcodeType,
  QRCodeType,
  QRCodeLevel,
  BarColor,
} from "./targetClass/barcode.js";

import {
  ColorTarget,
  BorderColor,
  BackgroundColor,
} from "./targetClass/color.js";

import {
  LineHeight,
  FontFamily,
  FontSize,
  FontWeight,
  LetterSpacing,
  TextAlign,
  TextDecoration,
  TextContentVerticalAlign,
  TextContentWrap,
  Columns,
  UpperCase,
  Align,
  VerticalAlign,
  HorizontalAlignment,
  LongTextIndent,
  ShowInPage,
  TextType,
} from "./targetClass/textStyles.js";

import {
  Coordinate,
  WidthHeight,
  SrcTarget,
  ImageFit,
  FixedPosition,
  DragDirection,
  LeftOffset,
  TopOffset,
  MinimumHeight,
  LeftSpaceRemoved,
  ZIndex,
  BorderRadius,
  PaddingLeft,
  PaddingRight,
  ContentPaddingLeft,
  ContentPaddingTop,
  ContentPaddingRight,
  ContentPaddingBottom,
} from "./targetClass/layout.js";

import {
  BorderWidth,
  BorderStyle,
  BorderTop,
  BorderLeft,
  BorderRight,
  BorderBottom,
} from "./targetClass/border.js";

import {
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
} from "./targetClass/dataLogic.js";

import { WatermarkOptions } from "./targetClass/backgroundWatermark.js";

import {
  FirstPaperFooter,
  LastPaperFooter,
  EvenPaperFooter,
  OddPaperFooter,
} from "./targetClass/paperSettings.js";

import { DataType, Orientation } from "./targetClass/common.js";

export default function CreateTarget(module, exports, require) {
  "use strict";

  // 加载所需模块
  const requireModule = require(5);

  // 导出 TargetClass 类
  require.d(exports, "a", function () {
    return TargetClass;
  });

  // 定义 TargetClass 类
  class TargetClass {
    // 构造函数
    constructor() {}

    // 初始化方法
    static init() {
      if (!this.printElementOptionItems) {
        this.printElementOptionItems = {};
        this._initializeItems();
      }
    }

    // 注册新项
    static registerItem(item) {
      if (!item.name) {
        throw new Error("styleItem must have a name");
      }
      this.init();
      this.printElementOptionItems[item.name] = item;
    }

    // 获取项
    static getItem(name) {
      this.init();
      return this.printElementOptionItems[name];
    }

    // 初始化预定义的项
    static _initializeItems() {
      this._printElementOptionItems.forEach((item) => {
        this.printElementOptionItems[item.name] = item;
      });
    }

    // 预定义项
    static _printElementOptionItems = [
      new LineHeight(),
      new FontFamily(),
      new FontSize(),
      new FontWeight(),
      new LetterSpacing(),
      new TextAlign(),
      new HideTitle(),
      new TextType(),
      new TableBorder(),
      new TableHeaderBorder(),
      new TableHeaderCellBorder(),
      new TableHeaderRowHeight(),
      new TableHeaderFontSize(),
      new TableHeaderFontWeight(),
      new TableBodyCellBorder(),
      new TableFooterBorder(),
      new TableFooterCellBorder(),
      new TableBodyRowHeight(),
      new TableHeaderBackground(),
      new BorderWidth(),
      new BarcodeMode(),
      new QRCodeLevel(),
      new ColorTarget(),
      new TextDecoration(),
      new Field(),
      new TitleTarget(),
      new TestData(),
      new Coordinate(),
      new WidthHeight(),
      new SrcTarget(),
      new ImageFit(),
      new BorderColor(),
      new PaperNumberFormat(),
      new PaperNumberDisabled(),
      new PaperNumberContinue(),
      new WatermarkOptions(),
      new LongTextIndent(),
      new ShowInPage(),
      new PageBreak(),
      new PanelPaperRule(),
      new PanelPageRule(),
      new LeftSpaceRemoved(),
      new FirstPaperFooter(),
      new LastPaperFooter(),
      new EvenPaperFooter(),
      new OddPaperFooter(),
      new FixedPosition(),
      new DragDirection(),
      new TopOffset(),
      new LeftOffset(),
      new MinimumHeight(),
      new HideRule(),
      new TableBodyRowBorder(),
      new Transform(),
      new BorderRadius(),
      new ZIndex(),
      new OptionsGroup(),
      new BorderTop(),
      new BorderLeft(),
      new BorderRight(),
      new BorderBottom(),
      new ContentPaddingTop(),
      new ContentPaddingLeft(),
      new ContentPaddingRight(),
      new ContentPaddingBottom(),
      new BorderStyle(),
      new BackgroundColor(),
      new Orientation(),
      new TextContentVerticalAlign(),
      new TextContentWrap(),
      new Columns(requireModule),
      new GridColumns(),
      new PanelLayoutOptions(),
      new GridColumnsGutter(),
      new TableHeaderRepeat(),
      new PaddingLeft(),
      new PaddingRight(),
      new DataType(),
      new Formatter(),
      new Styler(),
      new FooterFormatter(),
      new RowsColumnsMerge(),
      new RowsColumnsMergeClean(),
      new GroupSequenceContinue(),
      new GroupFieldsFormatter(),
      new GroupFormatter(),
      new GroupFooterFormatter(),
      new GridColumnsFooterFormatter(),
      new RowStyler(),
      new Align(),
      new HorizontalAlignment(),
      new VerticalAlign(),
      new Styler2(),
      new StylerHeader(),
      new RenderFormatter(),
      new Formatter2(),
      new AutoCompletion(),
      new MaxRows(),
      new TableFooterRepeat(),
      new TableColumnHeight(),
      new TableBarcodeMode(),
      new TableQRCodeLevel(),
      new TableTextType(),
      new TableSummaryTitle(),
      new TableSummaryText(),
      new TableSummaryColspan(),
      new TableSummary(),
      new TableSummaryAlign(),
      new TableSummaryNumFormat(),
      new TableSummaryFormatter(),
      new ShowCodeTitle(),
      new UpperCase(),
      new BarcodeType(),
      new QRCodeType(),
      new BarColor(),
      new BarTextMode(),
      new BarcodeWidth(),
      new BarAutoWidth(),
    ];
  }
}
