import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
	Box,
	MenuItem,
	IconButton,
	FormControl,
	Paper,
	makeStyles,
	ClickAwayListener,
	useTheme,
} from '@material-ui/core';
import { useDebounce } from '../../Hooks/commons';
import { Position, VerticalPos, HorizontalPos } from '../../../types/Commons';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles({
	white: {
		color: 'white',
	},
	hidden: {
		display: 'none',
	},
	menu: {
		position: 'absolute',
		padding: 5,
		zIndex: 10,
	},
});

type Item = {
	value: string;
	onClick?: () => void;
};

interface IProps {
	items: Item[];
	icon: JSX.Element;
	vPos?: VerticalPos;
	hPos?: HorizontalPos;
	menuColor?: 'primary' | 'secondary' | 'white';
	menuColorAccent?: 'light' | 'main' | 'dark' | 'contrastText';
	className?: string;
}

const IconDropdown = ({
	items,
	icon,
	vPos = 'bottom',
	hPos = 'right',
	menuColor = 'primary',
	menuColorAccent = 'main',
	className,
}: IProps) => {
	const classes = useStyles();
	const theme = useTheme();
	const [position, setPosition] = useState<Position>();
	const [isToggled, setIsToggled] = useState<boolean>(false);
	const debounce = useDebounce();

	const toggle = () => setIsToggled(!isToggled);

	const ID_ICON = useMemo(() => `icon-${uuid()}`, []);

	const computePosition = useCallback(
		() =>
			debounce(() => {
				const icon = document.getElementById(ID_ICON);
				if (icon) {
					const left = icon.getBoundingClientRect().left || 0;
					const top = icon.getBoundingClientRect().top || 0;
					const position = {
						x: hPos === 'right' ? left + 20 : left - 50,
						y: vPos === 'bottom' ? top + 35 : top - 85,
					};

					// Adjusting to deal with any text

					setPosition(position);
				}
			}),
		[debounce, setPosition, hPos, vPos]
	);

	useEffect(() => {
		if (!position) {
			computePosition();
		}
		window.addEventListener('resize', computePosition);
		return () => window.removeEventListener('resize', computePosition);
	}, [computePosition, position]);

	const onItemClick = (item: Item) => {
		item.onClick && item.onClick();
		toggle();
	};

	return (
		<ClickAwayListener onClickAway={() => isToggled && toggle()}>
			<Box>
				<IconButton
					className={clsx(classes.white, className)}
					onClick={toggle}
					id={ID_ICON}
				>
					<FormControl>{icon}</FormControl>
				</IconButton>

				{isToggled && (
					<Paper
						className={classes.menu}
						style={Object.assign(position && { left: position.x, top: position.y }, {
							color: menuColor !== 'white' && 'white',
							backgroundColor:
								menuColor !== 'white'
									? theme.palette[menuColor][menuColorAccent]
									: 'white',
						})}
					>
						{items.map((item, i) => (
							<Box key={i} onClick={() => onItemClick(item)}>
								<MenuItem>{item.value}</MenuItem>
							</Box>
						))}
					</Paper>
				)}
			</Box>
		</ClickAwayListener>
	);
};

export default IconDropdown;
