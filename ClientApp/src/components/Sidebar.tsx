import React, { useState } from 'react';
import { Pattern } from '../types/Patterns';
import {
	List,
	ListItem,
	ListItemText,
	makeStyles,
	Slide,
	ListItemSecondaryAction,
	IconButton,
	CircularProgress,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import UndoButton from './Buttons/UndoButton';
import { useRequest } from './Helpers/hooks';
import SnackbarContentLayout from './Layouts/SnackbarContentLayout';
import { toastOperationMessage } from './Helpers/strings';

const useStyles = makeStyles((theme) => {
	return {
		list: {
			position: 'relative',
			marginTop: '10px',
			height: '85vh',
			width: '300px',
			overflow: 'auto',
			willChange: 'transform',
			direction: 'ltr',
			borderRadius: '5px',
			backgroundColor: theme.palette.primary.dark,
		},
		listItem: {
			color: 'whitesmoke',
		},
	};
});

interface IProps {
	patterns: Pattern[];
	onDelete: (pattern: Pattern) => void;
	isVisible: boolean;
}

const DELAY_REMOVAL_MS = 1500;

const Sidebar = ({ patterns, onDelete, isVisible }: IProps) => {
	const classes = useStyles();
	const [pendingRemoval, setPendingRemoval] = useState<Pattern>();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [, triggerDeleteRequest] = useRequest<Pattern>(async (pattern: Pattern) => {
		await fetch(`pattern?id=${pattern.id}`, {
			method: 'DELETE',
		});
		onDelete(pattern);
		setPendingRemoval(undefined);
	});

	const handleRemoval = (pattern: Pattern) => {
		let willRequest = true;
		setPendingRemoval(pattern);
		const snackbar = enqueueSnackbar(toastOperationMessage('suppression', pattern), {
			variant: 'info',
			autoHideDuration: DELAY_REMOVAL_MS,
			onExited: () => willRequest && triggerDeleteRequest(pattern),
			action: (
				<SnackbarContentLayout onClose={() => closeSnackbar(snackbar)}>
					<UndoButton
						onClick={() => {
							closeSnackbar(snackbar);
							willRequest = false;
						}}
						htmlColor='whitesmoke'
					/>
				</SnackbarContentLayout>
			),
		});
	};

	return (
		<Slide in={!!patterns.length && isVisible} direction='right'>
			<List className={classes.list}>
				{patterns.map((p) => (
					<ListItem button key={p.id}>
						<ListItemText
							primary={p.name}
							secondary={p.tags.map((t) => t.name).join(', ')}
							secondaryTypographyProps={{
								className: classes.listItem,
							}}
							className={classes.listItem}
						/>
						{pendingRemoval && pendingRemoval === p ? (
							<CircularProgress style={{ color: 'whitesmoke' }} size='1.5rem' />
						) : (
							!pendingRemoval && (
								<ListItemSecondaryAction>
									<IconButton
										edge='end'
										aria-label='delete'
										onClick={() => handleRemoval(p)}
									>
										<Delete htmlColor='whitesmoke' />
									</IconButton>
								</ListItemSecondaryAction>
							)
						)}
					</ListItem>
				))}
			</List>
		</Slide>
	);
};

export default Sidebar;
