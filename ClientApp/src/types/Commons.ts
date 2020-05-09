import { Theme } from '@material-ui/core';

export type Lang = 'fr' | 'en';

export type CommonOperation = 'deletion' | 'insertion' | 'update';

export type WorkflowStep = 'reading' | 'drawing' | 'adding' | 'updating';

export type Position = {
	x: number;
	y: number;
};

export type Size = {
	width: number;
	height: number;
};

export type Vector = Position & {
	z?: number;
};

export type VerticalPos = 'top' | 'bottom';

export type HorizontalPos = 'left' | 'right';

export type DynamicTheme = Theme & {
	[k: string]: string;
};
