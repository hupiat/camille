import React, { PropsWithChildren, useState, ReactText, Children } from 'react';
import CloseButton from '../Buttons/CloseButton';
import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

interface IProps {
	onClose: () => void;
	details?: string;
}

const SnackbarContentLayout = (props: PropsWithChildren<IProps>) => {
	const { t } = useTranslation();
	const [snackbarInstance, setSnackbarInstance] = useState<ReactText>();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const handleCloseDetails = () => {
		closeSnackbar(snackbarInstance);
		setSnackbarInstance(undefined);
	};

	const handleOpenDetails = () =>
		setSnackbarInstance(
			enqueueSnackbar(props.details, {
				variant: 'error',
				persist: true,
				anchorOrigin: {
					horizontal: 'right',
					vertical: 'top',
				},
				action: <SnackbarContentLayout onClose={handleCloseDetails} />,
			})
		);

	return (
		<>
			{Children.toArray(props.children)}
			{props.details && (
				<Button
					color='inherit'
					onClick={() => (snackbarInstance ? handleCloseDetails() : handleOpenDetails())}
				>
					{snackbarInstance ? t('common.button.undo.less') : t('common.button.undo.plus')}
				</Button>
			)}
			<CloseButton onClick={props.onClose} />
		</>
	);
};

export default SnackbarContentLayout;
