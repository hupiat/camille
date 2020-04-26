import React, { useState } from "react";
import { makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles({
	paper: {
		width: "100%",
		height: "100%",
		cursor: "grab",
		"&:active": {
			cursor: "grabbing",
		},
	},
});

const SketchPatternElement = () => {
	const classes = useStyles();

	return <Paper elevation={24} className={classes.paper}></Paper>;
};

export default SketchPatternElement;