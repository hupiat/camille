import React, { useState, useEffect } from 'react';
import { Lang } from '../../types/Commons';
import { useTranslation } from 'react-i18next';
import IconDropdown from '../Inputs/IconDropdown';

const LanguageButton = () => {
	const { i18n } = useTranslation();
	const [lang, setLang] = useState<Lang>(i18n.language as Lang);

	useEffect(() => {
		i18n.changeLanguage(lang);
	}, [lang, i18n]);

	return (
		<IconDropdown
			items={[
				{
					value: 'ENGLISH',
					onClick: () => setLang('en'),
				},
				{
					value: 'FRANÇAIS',
					onClick: () => setLang('fr'),
				},
			]}
		/>
	);
};

export default LanguageButton;
