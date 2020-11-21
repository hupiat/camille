import React, { useState } from 'react';
import { Pattern } from '../types/Patterns';
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Slide,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import UndoButton from './UI/Buttons/UndoButton';
import { useRequest } from './Hooks/commons';
import SnackbarContentLayout from './UI/Layouts/SnackbarContentLayout';
import { useSnackbarWithMessage } from './Hooks/strings';
import { namesWithCommas, request } from './Functions/strings';

const useStyles = makeStyles((theme) => {
  return {
    list: {
      position: 'relative',
      marginTop: 10,
      height: '86.5vh',
      width: '100vw',
      overflow: 'auto',
      willChange: 'transform',
      direction: 'ltr',
      borderRadius: 5,
      backgroundColor: theme.palette.primary.dark,
    },
    white: {
      color: 'white',
    },
  };
});

interface IProps {
  patterns: Pattern[];
  onDelete: (pattern: Pattern) => void;
  isVisible: boolean;
}

const DELAY_REMOVAL_MS = 4000;

const PatternsView = ({ patterns, onDelete, isVisible }: IProps) => {
  const classes = useStyles();
  const [pendingRemoval, setPendingRemoval] = useState<Pattern>();
  const {
    enqueueSnackbar,
    closeSnackbar,
    toastOperationMessage,
  } = useSnackbarWithMessage();

  const [, triggerDeleteRequest] = useRequest<Pattern>(async (pattern: Pattern) => {
    await fetch(request(`patterns?id=${pattern.id}`), {
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    });
    onDelete(pattern);
  });

  const handleRemoval = (pattern: Pattern) => {
    let willRequest = true;
    setPendingRemoval(pattern);
    const snackbar = enqueueSnackbar(toastOperationMessage('deletion', pattern), {
      variant: 'info',
      autoHideDuration: DELAY_REMOVAL_MS,
      onExited: () => {
        willRequest && triggerDeleteRequest(pattern);
        setPendingRemoval(undefined);
      },
      action: (
        <SnackbarContentLayout onClose={() => closeSnackbar(snackbar)}>
          <UndoButton
            onClick={() => {
              closeSnackbar(snackbar);
              willRequest = false;
            }}
            htmlColor='white'
          />
        </SnackbarContentLayout>
      ),
    });
  };

  return (
    <Slide
      in={!!patterns.length && isVisible}
      direction='right'
      unmountOnExit
      appear={false}
    >
      <List className={classes.list}>
        {patterns.map((p) => (
          <ListItem button key={p.id}>
            <ListItemText
              primary={p.name}
              secondary={namesWithCommas(p.tags)}
              secondaryTypographyProps={{
                className: classes.white,
              }}
              className={classes.white}
            />
            {pendingRemoval && pendingRemoval === p ? (
              <CircularProgress className={classes.white} size='1.5rem' />
            ) : (
                !pendingRemoval && (
                  <ListItemSecondaryAction>
                    <IconButton edge='end' onClick={() => handleRemoval(p)}>
                      <Delete htmlColor='white' />
                    </IconButton>
                  </ListItemSecondaryAction>
                )
              )}
          </ListItem>
        ))}
      </List>
    </Slide>
  );
};

export default PatternsView;
