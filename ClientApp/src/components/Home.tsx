import React, { useEffect, useState } from "react";
import { Pattern } from "../types/Patterns";

const Home = () => {
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

	return <>coucou</>;
};

export default Home;
