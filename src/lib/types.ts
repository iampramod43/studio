export type ColorTheme = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
};

export type Theme = {
  light: ColorTheme;
  dark: ColorTheme;
  font: string;
  radius: number;
};

export type ShowcaseComponents = {
  buttons: boolean;
  cards: boolean;
  alerts: boolean;
  inputs: boolean;
  avatars:boolean;
  tabs: boolean;
};

export type ChartData = {
  month: string;
  totalRevenue?: number;
  subscriptions?: number;
  yourMinutes?: number;
  normalMinutes?: number;
};
