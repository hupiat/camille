import React from 'react';
import { Button } from '@material-ui/core';

interface IProps {
	onClick: () => void;
	htmlColor?: string;
}

const UndoButton = ({ onClick, htmlColor }: IProps) => (
	<Button onClick={onClick} style={{ color: htmlColor }}>
		ANNULER
	</Button>
);

export default UndoButton;
