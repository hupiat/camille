import React, { useEffect, useState } from "react";
import { Pattern } from "../types/Patterns";
import { CircularProgress, makeStyles, Box } from "@material-ui/core";
import Sidebar from "./Sidebar";
import { useSearchTrigger } from "./Helpers/hooks";

const useStyles = makeStyles({
	loader: {
		position: "absolute",
		top: "40%",
		left: 0,
		right: 0,
		marginLeft: "auto",
		marginRight: "auto",
	},
});

interface IProps {
	query: string;
}

const Home = ({ query }: IProps) => {
	const classes = useStyles();
	const [patterns, setPatterns] = useState<Pattern[]>([]);
	const [patternsFiltered, setPatternsFiltered] = useState<Pattern[]>([]);

	const fetchPatterns = async () => {
		const response = await fetch("pattern");
		const data = await response.json();
		setPatterns(data);
		setPatternsFiltered(data);
	};

	useEffect(() => {
		fetchPatterns();
	}, []);

	useSearchTrigger(patterns, query, setPatternsFiltered);

	return (
		<Box>
			{!patterns.length && (
				<CircularProgress size="10rem" className={classes.loader} />
			)}

			{patterns.length ? (
				<>
					<Sidebar patterns={patternsFiltered} />
				</>
			) : (
				""
			)}
		</Box>
	);
};

export default Home;
