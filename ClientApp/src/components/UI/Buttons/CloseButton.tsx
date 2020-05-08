import React from 'react';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

interface IProps {
	onClick: () => void;
}

const CloseButton = ({ onClick }: IProps) => (
	<IconButton aria-label='close' color='inherit' onClick={onClick}>
		<Close />
	</IconButton>
);

export default CloseButton;
