import React, { PropsWithChildren, Children } from 'react';
import CloseButton from '../Buttons/CloseButton';

interface IProps {
	onClose: () => void;
}

const SnackbarContentLayout = (props: PropsWithChildren<IProps>) => {
	return (
		<>
			{Children.toArray(props.children)}
			<CloseButton onClick={props.onClose} />
		</>
	);
};

export default SnackbarContentLayout;
