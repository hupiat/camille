import React, { useState, useEffect } from 'react';
import {
	Box,
	MenuItem,
	IconButton,
	FormControl,
	Paper,
	makeStyles,
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

const ID_ICON = 'language-icon';

const Item = ({ onClick, value }: { onClick: () => void; value: string }) => (
	<Box onClick={onClick}>
		<MenuItem>{value}</MenuItem>
	</Box>
);

interface IProps {
	items: {
		value: string;
		onClick?: () => void;
	}[];
}

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

	return (
		<>
			<IconButton className={classes.white} onClick={toggle} onBlur={toggle}>
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
						<Item key={i} value={item.value} onClick={item.onClick || (() => {})} />
					))}
				</Paper>
			)}
		</>
	);
};

export default IconDropdown;
