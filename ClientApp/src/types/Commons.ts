export type Lang = 'fr' | 'en';

export type CommonOperation = 'deletion' | 'insertion' | 'update';

export type WorkflowStep = 'reading' | 'drawing' | 'adding' | 'updating';

export type Position = {
  x: number;
  y: number;
};

export type Vector = Position;

export type VerticalPos = 'top' | 'bottom';

export type HorizontalPos = 'left' | 'right';

export type Item = {
  value: number;
  label: string;
};
