import { NamedElement } from '../../types/Patterns';
import { CommonOperation } from '../../types/Commons';
import { useTranslation } from 'react-i18next';
import { useSnackbar, ProviderContext } from 'notistack';

type ToastOperationMessage = (
	operation: CommonOperation,
	element: NamedElement
) => string;

export const useToastOperationMessage = (): ToastOperationMessage => {
	const { t } = useTranslation();
	const toastOperationMessage = (operation: CommonOperation, element: NamedElement) =>
		`${t(`common.operation.${operation}`)} : ${element.name}`;
	return toastOperationMessage;
};

type SnackbarWithMessage = ProviderContext & {
	toastOperationMessage: ToastOperationMessage;
};

export const useSnackbarWithMessage = (): SnackbarWithMessage => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const toastOperationMessage = useToastOperationMessage();
	return {
		enqueueSnackbar,
		closeSnackbar,
		toastOperationMessage,
	};
};
