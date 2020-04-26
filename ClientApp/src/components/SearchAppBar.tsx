import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { useDebouncedEffect } from "./Helpers/hooks";
import { Slide } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "0ch",
			cursor: "pointer",
			"&:focus": {
				width: "20ch",
				cursor: "text",
			},
		},
	},
}));

interface IProps {
	query?: string;
	isVisible: boolean;
	onSearch: (query: string) => void;
}

const SearchAppBar = ({ query, onSearch, isVisible = true }: IProps) => {
	const classes = useStyles();
	const [internalQuery, setInternalQuery] = useState<string>(query || "");

	useDebouncedEffect(() => onSearch(internalQuery), [internalQuery]);

	return (
		<div className={classes.root}>
			<Slide direction="down" in={isVisible}>
				<AppBar position="static">
					<Toolbar>
						<Typography className={classes.title} variant="h6" noWrap>
							Camille
						</Typography>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								value={internalQuery}
								onChange={(e) => setInternalQuery(e.target.value)}
								inputProps={{ "aria-label": "search" }}
							/>
						</div>
					</Toolbar>
				</AppBar>
			</Slide>
		</div>
	);
};

export default SearchAppBar;
