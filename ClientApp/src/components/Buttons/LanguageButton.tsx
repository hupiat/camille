import React, { useState, useEffect } from 'react';
import {
	FormControl,
	MenuItem,
	IconButton,
	makeStyles,
	Paper,
	Box,
} from '@material-ui/core';
import { Position } from '../../types/Commons';
import { useTranslation } from 'react-i18next';
import { Language } from '@material-ui/icons';
import { useDebounce } from '../Hooks/commons';

const useStyles = makeStyles({
	white: {
		color: 'white',
	},
	hidden: {
		display: 'none',
	},
	menu: {
		position: 'absolute',
		padding: '5px',
	},
});

const ID_ICON = 'language-icon';

const LanguageProposal = ({ onClick, lang }: { onClick: () => void; lang: string }) => (
	<Box onClick={onClick}>
		<MenuItem>{lang}</MenuItem>
	</Box>
);

const LanguageButton = () => {
	const classes = useStyles();
	const { i18n } = useTranslation();
	const [lang, setLang] = useState<string>(i18n.language);
	const [position, setPosition] = useState<Position>();
	const [isToggled, setIsToggled] = useState<boolean>(false);
	const debounce = useDebounce();

	const toggle = () => setIsToggled(!isToggled);

	const updateLang = (lang: string) => {
		setLang(lang);
		toggle();
	};

	const computePosition = () => {
		const icon = document.getElementById(ID_ICON);
		icon &&
			setPosition({
				x: (icon.getBoundingClientRect().left || 0) - 20,
				y: (icon.getBoundingClientRect().top || 0) + 100,
			});
	};

	useEffect(() => {
		i18n.changeLanguage(lang);
	}, [lang, i18n]);

	useEffect(() => {
		const listener = () => debounce(computePosition);
		window.addEventListener('resize', listener);
		return () => window.removeEventListener('resize', listener);
	}, [debounce]);

	useEffect(() => computePosition(), []);

	return (
		<>
			<IconButton className={classes.white} onClick={toggle}>
				<FormControl>
					<Language id={ID_ICON} />
				</FormControl>
			</IconButton>

			{isToggled && (
				<Paper
					onMouseLeave={() => debounce(toggle)}
					className={classes.menu}
					style={position && { left: position.x, top: position.y }}
				>
					<LanguageProposal lang='ENGLISH' onClick={() => updateLang('en')} />
					<LanguageProposal lang='FRANÇAIS' onClick={() => updateLang('fr')} />
				</Paper>
			)}
		</>
	);
};

export default LanguageButton;
