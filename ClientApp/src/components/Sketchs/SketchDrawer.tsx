import React from 'react';
import SketchPatternElement from './SketchPatternElement';
import Background from './SketchBackground.svg';
import { makeStyles, Box, Fade } from '@material-ui/core';

const useStyles = makeStyles({
	background: {
		position: 'absolute',
	},
});

const SketchDrawer = () => {
	const classes = useStyles();
	return (
		<Box>
			<Fade in timeout={{ enter: 5000 }}>
				<object type='image/svg+xml' data={Background} className={classes.background}>
					sketch-bg
				</object>
			</Fade>
		</Box>
	);
};

export default SketchDrawer;
