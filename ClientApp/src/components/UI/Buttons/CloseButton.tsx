import React from 'react';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

interface IProps {
	onClick: () => void;
	className?: string;
}

const CloseButton = ({ onClick, className }: IProps) => (
	<IconButton aria-label='close' color='inherit' onClick={onClick} className={className}>
		<Close />
	</IconButton>
);

export default CloseButton;
