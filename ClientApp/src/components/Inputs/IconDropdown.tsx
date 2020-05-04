import React, { useState, useEffect } from 'react';
import {
	Box,
	MenuItem,
	IconButton,
	FormControl,
	Paper,
	makeStyles,
	ClickAwayListener,
} from '@material-ui/core';
import { useDebounce } from '../Hooks/commons';
import { Position } from '../../types/Commons';
import { Language } from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => {
	return {
		white: {
			color: 'white',
		},
		hidden: {
			display: 'none',
		},
		menu: {
			position: 'absolute',
			padding: '5px',
			backgroundColor: theme.palette.primary.main,
		},
	};
});

type Item = {
	value: string;
	onClick?: () => void;
};

interface IProps {
	items: Item[];
}

const ID_ICON = 'language-icon';

const IconDropdown = ({ items }: IProps) => {
	const classes = useStyles();
	const [position, setPosition] = useState<Position>();
	const [isToggled, setIsToggled] = useState<boolean>(false);
	const debounce = useDebounce();

	const toggle = () => setIsToggled(!isToggled);

	const computePosition = () => {
		const icon = document.getElementById(ID_ICON);
		icon &&
			setPosition({
				x: (icon.getBoundingClientRect().left || 0) - 20,
				y: (icon.getBoundingClientRect().top || 0) + 110,
			});
	};

	useEffect(() => {
		const listener = () => debounce(computePosition);
		window.addEventListener('resize', listener);
		return () => window.removeEventListener('resize', listener);
	}, [debounce]);

	useEffect(() => computePosition(), []);

	const onItemClick = (item: Item) => {
		item.onClick && item.onClick();
		toggle();
	};

	return (
		<ClickAwayListener onClickAway={toggle}>
			{/* The fragment is needed for the ClickAwayListener */}
			<>
				<IconButton className={classes.white} onClick={toggle}>
					<FormControl>
						<Language id={ID_ICON} />
					</FormControl>
				</IconButton>

				{isToggled && (
					<Paper
						className={clsx(classes.menu, classes.white)}
						style={position && { left: position.x, top: position.y }}
					>
						{items.map((item, i) => (
							<Box key={i} onClick={() => onItemClick(item)}>
								<MenuItem>{item.value}</MenuItem>
							</Box>
						))}
					</Paper>
				)}
			</>
		</ClickAwayListener>
	);
};

export default IconDropdown;
