import { NamedElement } from '../../types/Patterns';
import { CommonOperation } from '../../types/Commons';
import { useTranslation } from 'react-i18next';

export const useToastOperationMessage = (): ((
	operation: CommonOperation,
	element: NamedElement
) => string) => {
	const { t } = useTranslation();
	return (operation: CommonOperation, element: NamedElement) =>
		`${t(`common.operation.${operation}`)} : ${element.name}`;
};
