import { NamedElement } from '../../types/Patterns';
import { CommonOperation } from '../../types/Commons';

export const toastOperationMessage = (
	operationStr: CommonOperation,
	element: NamedElement
) => `${operationStr.toUpperCase()} : ${element.name}`;
