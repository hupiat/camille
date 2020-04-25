import React from "react";
import { Button, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";

interface IProps {
	onUndo?: () => void;
	onClose?: () => void;
	htmlColor?: string;
}

const UndoButton = ({ onUndo, onClose, htmlColor }: IProps) => (
	<>
		<Button onClick={onUndo} style={{ color: htmlColor }}>
			ANNULER
		</Button>
		<IconButton aria-label="close" color="inherit" onClick={onClose}>
			<Close />
		</IconButton>
	</>
);

export default UndoButton;
