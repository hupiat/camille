import { WorkflowStep } from '../../../types/Commons';

export const isSketchingValidationView = (workflow: WorkflowStep) =>
	workflow === 'adding' || workflow === 'updating';

export const isSketchingView = (workflow: WorkflowStep) =>
	isSketchingValidationView(workflow) || workflow === 'drawing';
