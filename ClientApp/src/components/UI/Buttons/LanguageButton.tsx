import React, { useState, useEffect } from 'react';
import { Lang } from '../../../types/Commons';
import { useTranslation } from 'react-i18next';
import IconDropdown from '../Inputs/IconDropdown';
import { Language } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	button: {
		marginRight: '25px',
	},
});

const LanguageButton = () => {
	const classes = useStyles();
	const { i18n } = useTranslation();
	const [lang, setLang] = useState<Lang>(i18n.language as Lang);

	useEffect(() => {
		i18n.changeLanguage(lang);
	}, [lang, i18n]);

	return (
		<IconDropdown
			items={[
				{
					value: 'FR',
					onClick: () => setLang('fr'),
				},
				{
					value: 'EN',
					onClick: () => setLang('en'),
				},
			]}
			icon={<Language />}
			menuColor='white'
			className={classes.button}
		/>
	);
};

export default LanguageButton;
