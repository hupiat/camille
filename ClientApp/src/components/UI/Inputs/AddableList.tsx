import React, { useState, useMemo } from 'react';
import {
	Paper,
	TextField,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	Checkbox,
	makeStyles,
	Box,
	IconButton,
	InputAdornment,
	Typography,
	ClickAwayListener,
} from '@material-ui/core';
import { UnexistingElement, BaseElement } from '../../../types/Patterns';
import { Add, LocalOffer } from '@material-ui/icons';
import { weakEgality } from '../../Functions/entities';
import clsx from 'clsx';
import CloseButton from '../Buttons/CloseButton';

const useStyles = makeStyles({
	container: {
		overflow: 'auto',
	},
	topBarContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: '20px 3px 3px 15px',
	},
	limitHeight: {
		height: 500,
	},
	insertionContainer: {
		display: 'flex',
		padding: 17,
	},
	insertionField: {
		width: '100%',
		display: 'flex',
		marginRight: 20,
		marginLeft: 20,
	},
});

interface IProps<T extends BaseElement> {
	title: string;
	items: T[];
	initialItemsPicked?: T[];
	onPick: (item: T) => void;
	onUnpick: (item: T) => void;
	onInsert: (item: T) => void;
	onClose?: () => void;
}

function AddableList<T extends BaseElement>({
	title,
	items,
	initialItemsPicked,
	onPick,
	onUnpick,
	onInsert,
	onClose,
}: IProps<T>) {
	const classes = useStyles();
	const [itemsPicked, setItemsPicked] = useState<T[]>(initialItemsPicked || []);
	const [insertingItem, setInsertingItem] = useState<UnexistingElement<T>>({
		name: '',
	} as UnexistingElement<T>);
	const isInsertionDisabled = useMemo(
		() => !insertingItem.name || items.some((i) => weakEgality(i, insertingItem)),
		[items, insertingItem]
	);

	const handleCheck = (item: T, isChecked: boolean) => {
		if (isChecked) {
			onPick(item);
			setItemsPicked([...itemsPicked, item]);
		} else {
			onUnpick(item);
			setItemsPicked(itemsPicked.filter((picked) => !weakEgality(picked, item)));
		}
	};

	const handleInsert = () => {
		onInsert(insertingItem as T);
		setItemsPicked([...itemsPicked, insertingItem as T]);
		setInsertingItem({
			name: '',
		} as UnexistingElement<T>);
	};

	const handleClose = onClose || (() => {});

	return (
		<ClickAwayListener onClickAway={handleClose}>
			<Paper elevation={24} className={clsx(classes.limitHeight, classes.container)}>
				<Box className={classes.topBarContainer}>
					<Typography component='h5' variant='h5'>
						{title}
					</Typography>
					{handleClose && <CloseButton onClick={handleClose} />}
				</Box>

				<Box className={classes.insertionContainer}>
					<TextField
						value={insertingItem.name}
						onChange={(e) =>
							setInsertingItem({
								name: e.target.value,
							} as UnexistingElement<T>)
						}
						className={classes.insertionField}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<LocalOffer color='primary' />
								</InputAdornment>
							),
						}}
					/>

					<IconButton onClick={handleInsert} disabled={isInsertionDisabled}>
						<Add />
					</IconButton>

					<Checkbox
						edge='end'
						onChange={(e) => setItemsPicked(e.target.checked ? items : [])}
						checked={itemsPicked.length === items.length}
					/>
				</Box>

				<List className={classes.limitHeight}>
					{items.map((item, i) => (
						<ListItem key={i} button>
							<ListItemText primary={item.name} />
							<ListItemSecondaryAction>
								<Checkbox
									edge='end'
									onChange={(e) => handleCheck(item, e.target.checked)}
									checked={itemsPicked.some((picked) => weakEgality(item, picked))}
								/>
							</ListItemSecondaryAction>
						</ListItem>
					))}
				</List>
			</Paper>
		</ClickAwayListener>
	);
}

export default AddableList;
