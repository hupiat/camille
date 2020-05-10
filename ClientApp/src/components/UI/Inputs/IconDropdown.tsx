import React, { useState, useEffect, useCallback } from 'react';
import {
	Box,
	MenuItem,
	IconButton,
	FormControl,
	Paper,
	makeStyles,
	ClickAwayListener,
} from '@material-ui/core';
import { useDebounce } from '../../Hooks/commons';
import {
	Position,
	VerticalPos,
	HorizontalPos,
	DynamicTheme,
} from '../../../types/Commons';
import clsx from 'clsx';

let theme: DynamicTheme;

const useStyles = makeStyles((t) => {
	theme = t as DynamicTheme;
	return {
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
	};
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

const ID_ICON = 'language-icon';

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
	const [position, setPosition] = useState<Position>();
	const [isToggled, setIsToggled] = useState<boolean>(false);
	const debounce = useDebounce();

	const toggle = () => setIsToggled(!isToggled);

	const computePosition = useCallback(
		() =>
			debounce(() => {
				const icon = document.getElementById(ID_ICON);
				if (icon) {
					const left = icon.getBoundingClientRect().left || 0;
					const top = icon.getBoundingClientRect().top || 0;
					setPosition({
						x: hPos === 'right' ? left + 20 : left - 50,
						y: vPos === 'bottom' ? top + 35 : top - 85,
					});
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
