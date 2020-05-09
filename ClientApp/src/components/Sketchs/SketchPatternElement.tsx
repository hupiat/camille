import React from 'react';
import { makeStyles, Paper, TextField, Container } from '@material-ui/core';

const useStyles = makeStyles({
	paper: {
		width: '550px',
		height: '500px',
		cursor: 'grab',
		zIndex: 5,
		'&:active': {
			cursor: 'grabbing',
		},
	},
	field: {
		display: 'flex',
		margin: '20px',
	},
});

const SketchPatternElement = () => {
	const classes = useStyles();

	return (
		<Paper elevation={24} className={classes.paper}>
			<TextField className={classes.field} />
		</Paper>
	);
};

export default SketchPatternElement;
