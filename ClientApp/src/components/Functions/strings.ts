import { NamedElement } from '../../types/Patterns';

export const namesWithCommas = (elements: NamedElement[]) =>
	elements.map((e) => e.name).join(', ');
