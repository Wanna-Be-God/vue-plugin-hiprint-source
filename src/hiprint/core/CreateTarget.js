import LineHeight from "./targetClass/lineHeight";
import FontFamily from "./targetClass/fontFamily";
import FontSize from "./targetClass/fontSize";
import FontWeight from "./targetClass/fontWeight";
import LetterSpacing from "./targetClass/letterSpacing";
import TextAlign from "./targetClass/textAlign";
import HideTitle from "./targetClass/hideTitle";
import TableBorder from "./targetClass/tableBorder";
import TableHeaderBorder from "./targetClass/tableHeaderBorder";
import TableHeaderCellBorder from "./targetClass/tableHeaderCellBorder";
import TableFooterBorder from "./targetClass/tableFooterBorder";
import TableFooterCellBorder from "./targetClass/tableFooterCellBorder";
import TableHeaderRowHeight from "./targetClass/tableHeaderRowHeight";
import TableHeaderFontSize from "./targetClass/tableHeaderFontSize";
import TableHeaderFontWeight from "./targetClass/tableHeaderFontWeight";
import TableBodyCellBorder from "./targetClass/tableBodyCellBorder";
import TableBodyRowHeight from "./targetClass/tableBodyRowHeight";
import TableHeaderBackground from "./targetClass/tableHeaderBackground";
import BorderWidth from "./targetClass/borderWidth";
import BarcodeMode from "./targetClass/barcodeMode";
import BarTextMode from "./targetClass/barTextMode";
import BarcodeWidth from "./targetClass/barWidth";
import BarAutoWidth from "./targetClass/barAutoWidth";
import BarcodeType from "./targetClass/barcodeType";
import QRCodeType from "./targetClass/qrcodeType";
import QRCodeLevel from "./targetClass/qrCodeLevel";
import ColorTarget from "./targetClass/color";
import TextDecoration from "./targetClass/textDecoration";
import Field from "./targetClass/field";
import TitleTarget from "./targetClass/title";
import TestData from "./targetClass/testData";
import Coordinate from "./targetClass/coordinate";
import WidthHeight from "./targetClass/widthHeight";
import SrcTarget from "./targetClass/srcTarget";
import ImageFit from "./targetClass/imageFit";
import {
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
} from "./targetClass/DGLJH";

import {
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
  TableFooterRepeat,
} from "./targetClass/DJLJH2";

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
