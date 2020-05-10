import { IdentifiedElement, NamedElement } from '../../types/Patterns';

export const weakEgality = (
	item1: Partial<IdentifiedElement & NamedElement>,
	item2: Partial<IdentifiedElement & NamedElement>
) => item1.name === item2.name || (item1.id && item1.id === item2.id);
