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
	IconButton,
} from '@material-ui/core';
import FabLayout from '../UI/Layouts/FabLayout';
import { Add, Flag, FormatListBulleted, Backspace } from '@material-ui/icons';
import clsx from 'clsx';
import { WorkflowStep, Item, HorizontalPos } from '../../types/Commons';
import { useFormState, useFormValidation } from 'form-hooks-light';
import { Pattern, UnexistingElement } from '../../types/Patterns';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import TransferList from '../UI/Inputs/TransferList';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
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
	tagsInput: {
		position: 'absolute',
		left: 20,
		bottom: 20,
	},
	tagsIconContainer: {
		position: 'absolute',
		left: 0,
		bottom: 300,
		marginLeft: 5,
	},
	tagsIcon: {
		width: 30,
		height: 30,
		color: theme.palette.secondary.main,
	},
}));

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
	const [willTagsShow, setWillTagsShow] = useState<boolean>(false);
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
		if (!willExit && workflow === 'drawing') {
			setWillExit(true);
		} else {
			setWorkflow(workflow === 'drawing' ? 'reading' : 'drawing');
			setWillExit(false);
		}
	};

	const onTransferTag = (direction: HorizontalPos, items: Item[]) => {
		if (direction === 'left') {
			setPattern(
				'tags',
				pattern.tags.filter((t) => !items.some((i) => i.value === t.id))
			);
		} else {
			setPattern('tags', [...pattern.tags]);
		}
	};

	return (
		<>
			{workflow === 'drawing' && (
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

					<Fade in={!willFadeOut} timeout={{ enter: 6000, exit: 500 }}>
						<IconButton
							onClick={() => setWillTagsShow(!willTagsShow)}
							className={classes.tagsIconContainer}
						>
							{willTagsShow ? (
								<Backspace className={classes.tagsIcon} />
							) : (
								<FormatListBulleted className={classes.tagsIcon} />
							)}
						</IconButton>
					</Fade>

					<Slide in={willTagsShow} direction='right'>
						<Box className={classes.tagsInput}>
							<TransferList
								leftItems={[]}
								rightItems={pattern.tags.map((t, i) => ({
									value: t.id || i,
									label: t.name,
								}))}
								onTransfer={onTransferTag}
							/>
						</Box>
					</Slide>

					{pattern.elements.map((e, i) => (
						<SketchPatternElement key={i} />
					))}
				</Box>
			)}

			<FabLayout>
				<Fab
					color='secondary'
					aria-label='add'
					onClick={onExitClick}
					onMouseEnter={() => setWillFadeOut(true)}
					onMouseLeave={() => setWillFadeOut(false)}
					style={willExit ? { backgroundColor: theme.palette.error.main } : {}}
				>
					<Add
						className={clsx(classes.fabIcon, workflow === 'drawing' && classes.rotate)}
					/>
				</Fab>

				<Slide direction='up' in={workflow === 'drawing'} unmountOnExit>
					<Fab
						disabled={!canValidate}
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
