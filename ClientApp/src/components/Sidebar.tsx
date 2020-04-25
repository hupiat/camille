import React from "react";
import { Pattern } from "../types/Patterns";
import {
	List,
	ListItem,
	ListItemText,
	Box,
	makeStyles,
	Button,
	Slide,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => {
	return {
		list: {
			position: "relative",
			marginTop: "10px",
			height: "85vh",
			width: "300px",
			overflow: "auto",
			willChange: "transform",
			direction: "ltr",
			borderRadius: "5px",
			backgroundColor: theme.palette.primary.dark,
		},
		listItem: {
			color: "whitesmoke",
		},
	};
});

interface IProps {
	patterns: Pattern[];
}

const Sidebar = ({ patterns }: IProps) => {
	const classes = useStyles();

	return (
		<Slide in={!!patterns.length} direction="right">
			<List className={classes.list}>
				{patterns.map((p) => (
					<ListItem key={p.id} button>
						<ListItemText
							primary={p.name}
							secondary={p.tags.map((t) => t.name).join(", ")}
							secondaryTypographyProps={{
								className: classes.listItem,
							}}
							className={classes.listItem}
						/>
					</ListItem>
				))}
			</List>
		</Slide>
	);
};

export default Sidebar;
