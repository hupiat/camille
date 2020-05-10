import React, { PropsWithChildren, Children } from 'react';
import { makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles({
	fab: {
		position: 'absolute',
		bottom: 30,
	},
});

const FabLayout = (props: PropsWithChildren<{}>) => {
	const classes = useStyles();
	return (
		<>
			{Children.toArray(props.children).map((child, i) => (
				<Box key={i} className={classes.fab} style={{ right: !i ? 50 : (i + 1) * 80 }}>
					{child}
				</Box>
			))}
		</>
	);
};

export default FabLayout;