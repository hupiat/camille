import React, { useEffect, useState } from "react";
import { Pattern } from "../types/Patterns";
import { Container, CircularProgress, makeStyles } from "@material-ui/core";

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

const Home = () => {
	const classes = useStyles();
	const [patterns, setPatterns] = useState<Pattern[]>([]);

	const fetchPatterns = async () => {
		const response = await fetch("pattern");
		const data = await response.json();
		setPatterns(data);
	};

	useEffect(() => {
		fetchPatterns();
	}, []);

	console.log(patterns);

	return (
		<Container>
			{!patterns.length && (
				<CircularProgress size="10rem" className={classes.loader} />
			)}
		</Container>
	);
};

export default Home;
