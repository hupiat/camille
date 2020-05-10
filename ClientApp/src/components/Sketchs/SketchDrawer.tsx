import React, { Dispatch, useState } from 'react';
import SketchPatternElement from './SketchPatternElement';
import Background from './SketchBackground.svg';
import {
	makeStyles,
	Fade,
	Fab,
	Slide,
	useTheme,
	TextField,
	Box,
} from '@material-ui/core';
import FabLayout from '../UI/Layouts/FabLayout';
import { Add, SaveOutlined } from '@material-ui/icons';
import clsx from 'clsx';
import { WorkflowStep } from '../../types/Commons';
import { useFormState, useFormValidation } from 'form-hooks-light';
import { Pattern, UnexistingElement } from '../../types/Patterns';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import SketchTagsHandler from './SketchTagsHandler';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
	},
	background: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
	},
	titleField: {
		width: '100%',
		margin: 10,
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
	const theme = useTheme();
	const { t } = useTranslation();
	const [willExit, setWillExit] = useState<boolean>(false);
	const [willFadeOut, setWillFadeOut] = useState<boolean>(false);
	const [pattern, setPattern] = useFormState<UnexistingElement<Pattern>>({
		name: '',
		elements: [],
		tags: [],
	});
	const { canValidate } = useFormValidation<UnexistingElement<Pattern>>(
		{
			name: Yup.string(),
			elements: (pattern: UnexistingElement<Pattern>) => pattern.elements.length > 1,
			tags: (pattern: UnexistingElement<Pattern>) => !!pattern.tags.length,
		},
		pattern
	);

	const onExitClick = () => {
		if (!willExit && (workflow === 'drawing' || workflow === 'adding')) {
			setWillExit(true);
		} else {
			setWorkflow(
				workflow === 'drawing' || workflow === 'adding' ? 'reading' : 'drawing'
			);
			setWillExit(false);
		}
	};

	const handleSave = () => {
		if (workflow !== 'adding') {
			setWorkflow('adding');
			return;
		}
	};

	return (
		<>
			{(workflow === 'drawing' || workflow === 'adding') && (
				<Box className={classes.container}>
					<Fade
						in={!willFadeOut}
						timeout={{ enter: 5000, exit: 500 }}
						onEnter={() => setWillExit(false)}
					>
						<object type='image/svg+xml' data={Background} className={classes.background}>
							sketch-bg
						</object>
					</Fade>

					<Fade in={!willFadeOut} timeout={{ enter: 6000, exit: 500 }}>
						<TextField
							value={pattern.name}
							onChange={(e) => setPattern('name', e.target.value)}
							className={classes.titleField}
							variant='outlined'
							label={t('patterns.creation.titleField')}
						/>
					</Fade>

					<SketchTagsHandler
						pattern={pattern}
						setPattern={setPattern}
						willShow={!willFadeOut && workflow === 'adding'}
						onClose={() => setWorkflow('drawing')}
					/>

					{pattern.elements.map((e, i) => (
						<SketchPatternElement key={i} />
					))}
				</Box>
			)}

			<FabLayout>
				<Fab
					color='default'
					onClick={onExitClick}
					onMouseEnter={() => setWillFadeOut(true)}
					onMouseLeave={() => setWillFadeOut(false)}
					style={willExit ? { backgroundColor: theme.palette.error.main } : {}}
				>
					<Add
						className={clsx(
							classes.fabIcon,
							(workflow === 'drawing' || workflow === 'adding') && classes.rotate
						)}
					/>
				</Fab>

				<Slide
					direction='up'
					in={workflow === 'drawing' || workflow === 'adding'}
					unmountOnExit
				>
					<Fab
						disabled={!canValidate && workflow === 'adding'}
						color='default'
						onClick={handleSave}
					>
						<SaveOutlined />
					</Fab>
				</Slide>
			</FabLayout>
		</>
	);
};

export default SketchDrawer;
