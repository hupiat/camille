import React, { useState, useRef } from 'react';
import { useDrag } from 'react-use-gesture';
import { makeStyles, TextField, Box, IconButton } from '@material-ui/core';
import { AspectRatio, ZoomIn, ZoomOut } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		cursor: 'grab',
		width: 300,
		height: 300,
		zIndex: 5,
		background: theme.palette.secondary.main,
		borderRadius: 5,
		boxShadow: '0px 10px 30px -5px rgba(0, 0, 0, 0.3)',
		transition: '0.5s',
		border: '15px solid white',
		'&:active': {
			cursor: 'grabbing',
		},
	},
	iconsContainer: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		alignSelf: 'flex-end',
		justifyContent: 'center',
		marginBottom: 10,
	},
	expand: {
		color: 'white',
		position: 'relative',
		width: 130,
		height: 130,
	},
	field: {
		display: 'flex',
		margin: 20,
	},
}));

const SketchPatternElement = () => {
	const classes = useStyles();
	const [willReduce, setWillReduce] = useState<boolean>(true);

	return (
		<Box
			className={classes.container}
			style={
				willReduce
					? {
							transform: 'scale(0.2)',
							borderRadius: 400,
							boxShadow: 'unset',
					  }
					: {}
			}
		>
			<Box className={classes.iconsContainer}>
				<IconButton onClick={() => setWillReduce(!willReduce)}>
					{willReduce ? (
						<ZoomIn className={classes.expand} />
					) : (
						<ZoomOut className={classes.expand} />
					)}
				</IconButton>
			</Box>
		</Box>
	);
};

export default SketchPatternElement;
