import React, { useState, Dispatch } from 'react';
import { Pattern } from '../types/Patterns';
import { makeStyles, Box, Fab, Slide } from '@material-ui/core';
import Sidebar from './Sidebar';
import { useSearchTrigger } from './Hooks/commons';
import { Add } from '@material-ui/icons';
import clsx from 'clsx';
import FabLayout from './UI/Layouts/FabLayout';
import SketchDrawer from './Sketchs/SketchDrawer';
import { WorkflowStep } from '../types/Commons';
import { useRequestEffect } from './Hooks/effects';
import SearchAppBar from './SearchAppBar';
import Loader from './UI/Loader/Loader';

const useStyles = makeStyles({
	container: {
		display: 'flex',
	},
	loader: {
		position: 'absolute',
		top: '25%',
		left: 0,
		right: 0,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	fabIcon: {
		transition: 'all .4s ease-in-out',
	},
	rotate: {
		transform: 'rotate(45deg)',
	},
});

interface IProps {
	query: string;
	setQuery: Dispatch<string>;
	workflow: WorkflowStep;
	setWorkflow: Dispatch<WorkflowStep>;
}

const Home = ({ query, setQuery, workflow, setWorkflow }: IProps) => {
	const classes = useStyles();
	const [patterns, setPatterns] = useState<Pattern[]>([]);
	const [idsPatternsFiltered, setIdsPatternsFiltered] = useState<number[]>([]);

	const isRequestPending = useRequestEffect<void>(async () => {
		const response = await fetch('pattern');
		const data = await response.json();
		setPatterns(data);
		setIdsPatternsFiltered(patterns.map((p) => p.id));
	}, []);

	useSearchTrigger(patterns, query, setIdsPatternsFiltered);

	const handleDelete = (pattern: Pattern) => {
		setPatterns(patterns.filter((p) => p.id !== pattern.id));
		setIdsPatternsFiltered(idsPatternsFiltered.filter((id) => id !== pattern.id));
	};

	return (
		<Box>
			<SearchAppBar query={query} onSearch={setQuery} willShow={workflow !== 'drawing'} />

			{isRequestPending && <Loader className={classes.loader} />}

			{!isRequestPending && (
				<Box className={classes.container}>
					<Sidebar
						patterns={patterns.filter((p) => idsPatternsFiltered.includes(p.id))}
						onDelete={handleDelete}
						isVisible={workflow !== 'drawing'}
					/>
					{workflow === 'drawing' && <SketchDrawer />}
					<FabLayout>
						<Fab
							color='secondary'
							aria-label='add'
							onClick={() => setWorkflow(workflow === 'drawing' ? 'reading' : 'drawing')}
						>
							<Add
								className={clsx(
									classes.fabIcon,
									workflow === 'drawing' && classes.rotate
								)}
							/>
						</Fab>

						<Slide direction='up' in={workflow === 'drawing'} unmountOnExit>
							<Fab
								color='secondary'
								aria-label='add'
								onClick={() =>
									setWorkflow(workflow === 'drawing' ? 'reading' : 'drawing')
								}
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
