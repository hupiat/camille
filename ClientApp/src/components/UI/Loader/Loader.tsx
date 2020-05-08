import React from 'react';
import LoaderSvg from './Loader.svg';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
	loader: {
		width: '400px',
		height: '400px',
	},
});

interface IProps {
	className?: string;
}

const Loader = ({ className }: IProps) => {
	const classes = useStyles();
	return (
		<object
			type='image/svg+xml'
			data={LoaderSvg}
			className={clsx(classes.loader, className)}
		>
			eye-loader
		</object>
	);
};

export default Loader;
