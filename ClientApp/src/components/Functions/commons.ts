import { IdentifiedElement, NamedElement, BaseElement } from '../../types/Patterns';
import { WorkflowStep } from '../../types/Commons';

export const weakEgality = (
	item1: Partial<IdentifiedElement & NamedElement>,
	item2: Partial<IdentifiedElement & NamedElement>
): boolean => !!(item1.name === item2.name || (item1.id && item1.id === item2.id));

export const mapElementThenBreak = <T extends IdentifiedElement>(
	elements: T[],
	finder: (element: T) => boolean,
	mapper: (element: T) => void
): T[] => {
	for (const element of elements) {
		if (finder(element)) {
			mapper(element);
			break;
		}
	}
	return elements;
};

export const rand = (min: number, max: number) => Math.random() * (max - min) + min;

export const namesWithCommas = (elements: NamedElement[]) =>
	elements.map((e) => e.name).join(', ');

export const isSketchingValidationView = (workflow: WorkflowStep) =>
	workflow === 'adding' || workflow === 'updating';

export const isSketchingView = (workflow: WorkflowStep) =>
	isSketchingValidationView(workflow) || workflow === 'drawing';

export const isExistingElement = (element: BaseElement) =>
	element.id && element.dateCreation && element.name;
