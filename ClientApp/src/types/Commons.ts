export type Lang = 'fr' | 'en';

export type CommonOperation = 'deletion' | 'insertion' | 'update';

export type WorkflowStep = 'reading' | 'drawing' | 'adding' | 'updating';

export type Position = {
	x: number;
	y: number;
};
