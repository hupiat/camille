import React, { Dispatch, useState } from 'react';
import SketchPatternElement from './SketchPatternElement';
import Background from './SketchBackground.svg';
import { makeStyles, Box, Fade, Fab, Slide } from '@material-ui/core';
import FabLayout from '../UI/Layouts/FabLayout';
import { Add } from '@material-ui/icons';
import clsx from 'clsx';
import { WorkflowStep } from '../../types/Commons';

const useStyles = makeStyles({
	background: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
	},
	fabIcon: {
		transition: 'all .4s ease-in-out',
	},
	rotate: {
		transform: 'rotate(45deg)',
	},
});

interface IProps {
	workflow: WorkflowStep;
	setWorkflow: Dispatch<WorkflowStep>;
}

const SketchDrawer = ({ workflow, setWorkflow }: IProps) => {
	const classes = useStyles();
	const [willFadeOut, setWillFadeOut] = useState<boolean>(false);
	return (
		<>
			{workflow === 'drawing' && (
				<>
					<Fade in={!willFadeOut} timeout={{ enter: 5000, exit: 500 }}>
						<object type='image/svg+xml' data={Background} className={classes.background}>
							sketch-bg
						</object>
					</Fade>

					<SketchPatternElement />
				</>
			)}

			<FabLayout>
				<Fab
					color='secondary'
					aria-label='add'
					onClick={() => setWorkflow(workflow === 'drawing' ? 'reading' : 'drawing')}
					onMouseEnter={() => setWillFadeOut(true)}
					onMouseLeave={() => setWillFadeOut(false)}
				>
					<Add
						className={clsx(classes.fabIcon, workflow === 'drawing' && classes.rotate)}
					/>
				</Fab>

				<Slide direction='up' in={workflow === 'drawing'} unmountOnExit>
					<Fab
						color='secondary'
						aria-label='add'
						onClick={() => setWorkflow(workflow === 'drawing' ? 'reading' : 'drawing')}
					>
						<Add />
					</Fab>
				</Slide>
			</FabLayout>
		</>
	);
};

export default SketchDrawer;
