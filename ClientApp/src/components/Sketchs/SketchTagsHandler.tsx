import React, { useState } from 'react';
import { Box, makeStyles, Grow } from '@material-ui/core';
import { Pattern, UnexistingElement, Tag } from '../../types/Patterns';
import { useRequestEffect } from '../Hooks/effects';
import AddableList from '../UI/Inputs/AddableList';
import { weakEgality } from '../Functions/commons';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
	tagsInput: {
		position: 'absolute',
		margin: 50,
		top: '10vh',
		width: '60vw',
	},
}));

interface IProps {
	pattern: UnexistingElement<Pattern>;
	setPattern: (key: keyof UnexistingElement<Pattern>, attribute: any) => void;
	willShow: boolean;
	onClose?: () => void;
}

const SketchTagsHandler = ({ pattern, setPattern, willShow, onClose }: IProps) => {
	const { t } = useTranslation();
	const classes = useStyles();
	const [tags, setTags] = useState<Tag[]>([]);

	const isRequestPending = useRequestEffect<void>(async () => {
		const response = await fetch('pattern/tags');
		const data = await response.json();
		setTags(data);
	}, []);

	const populate = (tag: Tag) => {
		if (!pattern.tags.some((t) => weakEgality(t, tag))) {
			setPattern('tags', [...pattern.tags, tag]);
			if (!tag.id) {
				setTags([...tags, tag]);
			}
		}
	};

	const remove = (tag: Tag) =>
		setPattern(
			'tags',
			pattern.tags.filter((t) => !weakEgality(t, tag))
		);

	return (
		<>
			{!isRequestPending && (
				<Grow in={willShow} mountOnEnter timeout={{ enter: 500, exit: 500 }}>
					<Box className={classes.tagsInput}>
						<AddableList
							title={t('patterns.creation.tagsPickTitle')}
							items={tags}
							initialItemsPicked={pattern.tags}
							onPick={populate}
							onUnpick={remove}
							onInsert={populate}
							onClose={onClose}
						/>
					</Box>
				</Grow>
			)}
		</>
	);
};

export default SketchTagsHandler;
