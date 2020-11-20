import React, { useState, Dispatch } from 'react';
import { Box, makeStyles, Grow } from '@material-ui/core';
import { Pattern, UnexistingElement, Tag } from '../../types/Patterns';
import { useRequestEffect } from '../Hooks/effects';
import AddableList from '../UI/Inputs/AddableList';
import { weakEgality } from '../Functions/entities';
import { useTranslation } from 'react-i18next';
import { request } from '../Functions/strings';

const useStyles = makeStyles({
  tagsInput: {
    position: 'absolute',
    top: '15vh',
    width: '60vw',
  },
});

interface IProps {
  pattern: UnexistingElement<Pattern>;
  setPattern: Dispatch<UnexistingElement<Pattern>>;
  willShow: boolean;
  onClose?: () => void;
}

// TODO : laggy when adding an element without closing

const SketchTagsHandler = ({ pattern, setPattern, willShow, onClose }: IProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [tags, setTags] = useState<Tag[]>([]);

  const isRequestPending = useRequestEffect<void>(async () => {
    const response = await fetch(request('tags'));
    const data = await response.json();
    setTags(data);
  }, []);

  const populate = (tag: Tag) => {
    setPattern({
      ...pattern,
      tags: [...pattern.tags, tag],
    });
    if (!tags.some((t) => weakEgality(t, tag))) {
      setTags([...tags, tag]);
    }
  };

  const remove = (tag: Tag) =>
    setPattern({
      ...pattern,
      tags: pattern.tags.filter((t) => !weakEgality(t, tag)),
    });

  return (
    <>
      {!isRequestPending && (
        <Grow in={willShow} timeout={{ enter: 500, exit: 500 }} unmountOnExit>
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
