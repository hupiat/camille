import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { Item, HorizontalPos } from '../../../types/Commons';
import clsx from 'clsx';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 'auto',
		zIndex: 5,
	},
	list: {
		width: 200,
		height: 230,
		overflow: 'auto',
		backgroundColor: 'white',
	},
	button: {
		margin: theme.spacing(0.5, 0),
	},
}));

function not(a: Item[], b: Item[]) {
	return a.filter((item) => b.indexOf(item) === -1);
}

function intersection(a: Item[], b: Item[]) {
	return a.filter((item) => b.indexOf(item) !== -1);
}

interface IProps {
	leftItems: Item[];
	rightItems: Item[];
	onTransfer: (to: HorizontalPos, items: Item[]) => void;
	className?: string;
}

export default function TransferList({
	leftItems,
	rightItems,
	onTransfer,
	className,
}: IProps) {
	const classes = useStyles();
	const [checked, setChecked] = React.useState<Item[]>([]);
	const [left, setLeft] = React.useState<Item[]>(leftItems);
	const [right, setRight] = React.useState(rightItems);

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	const handleToggle = (item: Item) => () => {
		const currentIndex = checked.indexOf(item);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(item);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const handleAllRight = () => {
		const items = right.concat(left);
		setRight(items);
		setLeft([]);
		onTransfer('right', items);
	};

	const handleCheckedRight = () => {
		const items = right.concat(leftChecked);
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));
		onTransfer('right', items);
	};

	const handleCheckedLeft = () => {
		const items = left.concat(rightChecked);
		setLeft(items);
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));
		onTransfer('left', items);
	};

	const handleAllLeft = () => {
		const items = left.concat(right);
		setLeft(items);
		setRight([]);
		onTransfer('left', items);
	};

	const customList = (items: Item[]) => (
		<Box className={classes.list}>
			<List dense component='div' role='list'>
				{items.map((item) => {
					const labelId = `transfer-list-item-${item.value}-label`;

					return (
						<ListItem
							key={item.value}
							role='listitem'
							button
							onClick={handleToggle(item)}
						>
							<ListItemIcon>
								<Checkbox
									checked={checked.indexOf(item) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{ 'aria-labelledby': labelId }}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={item.label} />
						</ListItem>
					);
				})}
				<ListItem />
			</List>
		</Box>
	);

	return (
		<Grid container spacing={2} className={clsx(classes.root, className)}>
			<Grid item>{customList(left)}</Grid>
			<Grid item>
				<Grid container direction='column' alignItems='center'>
					<Button
						variant='outlined'
						size='small'
						className={classes.button}
						onClick={handleAllRight}
						disabled={left.length === 0}
						aria-label='move all right'
					>
						≫
					</Button>
					<Button
						variant='outlined'
						size='small'
						className={classes.button}
						onClick={handleCheckedRight}
						disabled={leftChecked.length === 0}
						aria-label='move selected right'
					>
						&gt;
					</Button>
					<Button
						variant='outlined'
						size='small'
						className={classes.button}
						onClick={handleCheckedLeft}
						disabled={rightChecked.length === 0}
						aria-label='move selected left'
					>
						&lt;
					</Button>
					<Button
						variant='outlined'
						size='small'
						className={classes.button}
						onClick={handleAllLeft}
						disabled={right.length === 0}
						aria-label='move all left'
					>
						≪
					</Button>
				</Grid>
			</Grid>
			<Grid item>{customList(right)}</Grid>
		</Grid>
	);
}
