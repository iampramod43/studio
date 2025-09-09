export type Theme = {
  primary: string;
  background: string;
  accent: string;
  font: string;
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
