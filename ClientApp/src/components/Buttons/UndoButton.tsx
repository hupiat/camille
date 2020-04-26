import React from "react";
import { Button, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";

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
