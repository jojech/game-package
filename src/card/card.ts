

export interface CardOptions {
  title: string;
  subtitle?: string;
  primary?: CardStatOptions[];
  secondary?: CardStatOptions[];
  flavorText?: string;
  imageUrl?: string;
  suits?: string[];
  cost?: CardCost[];
  tags?: string[];
  setIdentifier?: string;

  // Stuff like sentinel
  traits?: string[];
  onReveal?: string;
  onPlay?: string;
  onDiscard?: string;
  onExhaust?: string;

  imageHints?: string[];
}

export interface CardStatOptions {
  icon?: string;
  label?: string;
  value?: string | number;
  color?: string;
  class?: string;
}

export interface CardCost {
  icon?: string;
  value: number;
  suit?: string;
}

export default class Card {
  config: CardOptions;

  constructor(config: CardOptions) {
    this.config = config;
  }
}