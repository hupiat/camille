import React, { PropsWithChildren, Children } from 'react';
import { makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	fab: {
		position: 'absolute',
		bottom: 30,
		'& svg': {
			fill: theme.palette.secondary.dark,
		},
	},
}));

const FabLayout = (props: PropsWithChildren<{}>) => {
	const classes = useStyles();
	return (
		<>
			{Children.toArray(props.children).map((child, i) => (
				<Box
					key={i}
					className={classes.fab}
					style={{ right: !i ? 120 : 70 + (i + 1) * 100 }}
				>
					{child}
				</Box>
			))}
		</>
	);
};

export default FabLayout;
