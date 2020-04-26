import React, { PropsWithChildren, Children } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	fab: {
		position: "absolute",
		bottom: "30px",
	},
});

const FabLayout = (props: PropsWithChildren<{}>) => {
	const classes = useStyles();
	return (
		<>
			{Children.toArray(props.children).map((child, i) => (
				<div
					className={classes.fab}
					style={{ right: `${i === 0 ? 50 : (i + 1) * 80}px` }}
				>
					{child}
				</div>
			))}
		</>
	);
};

export default FabLayout;
