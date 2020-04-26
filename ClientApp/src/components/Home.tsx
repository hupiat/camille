import React, { useEffect, useState, Dispatch } from "react";
import { Pattern } from "../types/Patterns";
import {
	CircularProgress,
	makeStyles,
	Box,
	Fab,
	Slide,
} from "@material-ui/core";
import Sidebar from "./Sidebar";
import { useSearchTrigger, useRequestEffect } from "./Helpers/hooks";
import { Add } from "@material-ui/icons";
import clsx from "clsx";
import FabLayout from "./Layouts/FabLayout";
import SketchDrawer from "./Sketchs/SketchDrawer";

const useStyles = makeStyles({
	container: {
		display: "flex",
	},
	loader: {
		position: "absolute",
		top: "40%",
		left: 0,
		right: 0,
		marginLeft: "auto",
		marginRight: "auto",
	},
	fabIcon: {
		transition: "all .4s ease-in-out",
	},
	rotate: {
		transform: "rotate(45deg)",
	},
});

interface IProps {
	query: string;
	isDrawing: boolean;
	setIsDrawing: Dispatch<boolean>;
}

const Home = ({ query, isDrawing, setIsDrawing }: IProps) => {
	const classes = useStyles();
	const [patterns, setPatterns] = useState<Pattern[]>([]);
	const [patternsFiltered, setPatternsFiltered] = useState<Pattern[]>([]);

	const isRequestPending = useRequestEffect<void>(async () => {
		const response = await fetch("pattern");
		const data = await response.json();
		setPatterns(data);
		setPatternsFiltered(data);
	}, []);

	useSearchTrigger(patterns, query, setPatternsFiltered);

	const handleDelete = (pattern: Pattern) => {
		setPatterns(patterns.filter((p) => p.id != pattern.id));
		setPatternsFiltered(patternsFiltered.filter((p) => p.id != pattern.id));
	};

	return (
		<Box>
			{isRequestPending && (
				<CircularProgress
					size="10rem"
					className={classes.loader}
					color="primary"
				/>
			)}

			{!isRequestPending && (
				<Box className={classes.container}>
					<Sidebar
						patterns={patternsFiltered}
						onDelete={handleDelete}
						isVisible={!isDrawing}
					/>
					{isDrawing && <SketchDrawer />}
					<FabLayout>
						<Fab
							color="secondary"
							aria-label="add"
							onClick={() => setIsDrawing(!isDrawing)}
						>
							<Add
								className={clsx(classes.fabIcon, isDrawing && classes.rotate)}
							/>
						</Fab>

						<Slide direction="up" in={isDrawing}>
							<Fab
								color="secondary"
								aria-label="add"
								onClick={() => setIsDrawing(!isDrawing)}
							>
								<Add />
							</Fab>
						</Slide>
					</FabLayout>
				</Box>
			)}
		</Box>
	);
};

export default Home;
