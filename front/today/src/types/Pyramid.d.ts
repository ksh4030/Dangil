export type PyramidItem = {
  left: number;
  right: number;
  leftBarColor?: ColorValue;
  rightBarColor?: ColorValue;
  leftBarBorderColor?: ColorValue;
  rightBarBorderColor?: ColorValue;
  barBorderWidth?: number;
  leftBarBorderWidth?: number;
  rightBarBorderWidth?: number;
  barBorderRadius?: number;
  leftBarBorderRadius?: number;
  rightBarBorderRadius?: number;

  barLabelWidth?: number;
  barLabelFontSize?: number;
  barLabelColor?: ColorValue;
  barLabelFontStyle?: FontStyle;
  barLabelFontWeight?: FontWeight;
  barLabelFontFamily?: string;

  leftBarLabel?: string;
  leftBarLabelWidth?: number;
  leftBarLabelFontSize?: number;
  leftBarLabelColor?: ColorValue;
  leftBarLabelFontStyle?: FontStyle;
  leftBarLabelFontWeight?: FontWeight;
  leftBarLabelFontFamily?: string;
  leftBarLabelShift?: number;

  rightBarLabel?: string;
  rightBarLabelWidth?: number;
  rightBarLabelFontSize?: number;
  rightBarLabelColor?: ColorValue;
  rightBarLabelFontStyle?: FontStyle;
  rightBarLabelFontWeight?: FontWeight;
  rightBarLabelFontFamily?: string;
  rightBarLabelShift?: number;

  xAxisLabels?: string;
  yAxisLabels?: string;
  showMidAxi?: boolean;
  midAxisLabel?: string;
  midAxisLabelFontSize?: number;
  midAxisLabelColor?: ColorValue;
  midAxisLabelFontStyle?: FontStyle;
  midAxisLabelFontWeight?: FontWeight;
  midAxisLabelFontFamily?: string;

  hideRules?: boolean;
  hideYAxis?: boolean;
  showVerticalLines?: boolean;
  showSurplus?: boolean;
  showSurplusLeft?: boolean;
  showSurplusRight?: boolean;
  leftSurplusColor?: ColorValue;
  leftSurplusBorderColor?: ColorValue;
  rightSurplusColor?: ColorValue;
  rightSurplusBorderColor?: ColorValue;
  leftSurplusBorderWidth?: number;
  rightSurplusBorderWidth?: number;
};
