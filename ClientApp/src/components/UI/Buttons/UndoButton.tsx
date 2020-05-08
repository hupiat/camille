import React from 'react';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

interface IProps {
	onClick: () => void;
	htmlColor?: string;
}

const UndoButton = ({ onClick, htmlColor }: IProps) => {
	const { t } = useTranslation();
	return (
		<Button onClick={onClick} style={{ color: htmlColor }}>
			{t('common.button.undo')}
		</Button>
	);
};

export default UndoButton;
