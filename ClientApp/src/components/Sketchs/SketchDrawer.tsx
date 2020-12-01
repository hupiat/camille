import React, { Dispatch, useState } from 'react';
import SketchPatternElement, { ELEMENTS_SHIFT_RIGHT_PX, ELEMENTS_SHIFT_TOP_PX } from './SketchPatternElement';
import Background from './SketchBackground.svg';
import {
  makeStyles,
  Fade,
  Fab,
  Slide,
  useTheme,
  TextField,
  Box,
  CircularProgress,
} from '@material-ui/core';
import FabLayout from '../UI/Layouts/FabLayout';
import { Add, SaveOutlined, Queue } from '@material-ui/icons';
import clsx from 'clsx';
import { WorkflowStep } from '../../types/Commons';
import { useFormValidation } from 'formook';
import { Pattern, MaybeExisting, PatternElement } from '../../types/Patterns';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import SketchTagsHandler from './SketchTagsHandler';
import { isSketchingView, isSketchingValidationView } from './helpers/commons';
import { useRequest } from '../Hooks/commons';
import { useSnackbarWithMessage } from '../Hooks/strings';
import SnackbarContentLayout from '../UI/Layouts/SnackbarContentLayout';
import { rand } from '../Functions/maths';
import { isExistingElement } from '../Functions/entities';
import { request } from '../Functions/strings';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  titleField: {
    width: '100%',
    margin: 10,
  },
  fabIcon: {
    transition: 'all .4s ease-in-out',
  },
  rotate: {
    transform: 'rotate(45deg)',
  },
});

interface IProps {
  workflow: WorkflowStep;
  setWorkflow: Dispatch<WorkflowStep>;
  isInsertionDisabled: boolean;
}

const SketchDrawer = ({ workflow, setWorkflow, isInsertionDisabled }: IProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const [willExit, setWillExit] = useState<boolean>(false);
  const [willFadeOut, setWillFadeOut] = useState<boolean>(false);
  const [pattern, setPattern] = useState<MaybeExisting<Pattern>>({
    name: '',
    elements: [],
    tags: [],
  });
  const { canValidate } = useFormValidation<MaybeExisting<Pattern>>(
    {
      name: Yup.string(),
      elements: (pattern: MaybeExisting<Pattern>) =>
        pattern.elements.length > 1 && pattern.elements.every((e) => e.name),
      tags: (pattern: MaybeExisting<Pattern>) => !!pattern.tags.length,
    },
    pattern
  );
  const [isRequestPending, savePattern] = useRequest<MaybeExisting<Pattern>>(
    async () =>
      await fetch(request('patterns'), {
        method: workflow === 'adding' ? 'POST' : 'PUT',
        body: JSON.stringify(pattern),
      })
  );
  const {
    enqueueSnackbar,
    closeSnackbar,
    toastOperationMessage,
  } = useSnackbarWithMessage();

  const handleExit = () => {
    if (!willExit && isSketchingView(workflow)) {
      setWillExit(true);
    } else {
      setWorkflow(isSketchingView(workflow) ? 'reading' : 'drawing');
      setWillExit(false);
    }
  };

  const handleElementGeneration = () =>
    setPattern({
      ...pattern,
      elements: [
        ...pattern.elements,
        {
          name: '',
          x: rand(0, window.innerWidth - ELEMENTS_SHIFT_RIGHT_PX),
          y: rand(ELEMENTS_SHIFT_TOP_PX, window.innerHeight - ELEMENTS_SHIFT_TOP_PX),
        } as PatternElement,
      ],
    });

  const handleSave = async () => {
    const casted = pattern as Pattern;
    if (workflow !== 'adding') {
      setWorkflow(isExistingElement(casted) ? 'updating' : 'adding');
    } else {
      const response = await savePattern(pattern);
      const data = await response.json();
      setPattern({
        ...pattern,
        name: data.name,
        tags: data.tags,
        elements: data.elements,
      });
      const snackbar = enqueueSnackbar(
        toastOperationMessage(
          isExistingElement(casted) ? 'update' : 'insertion',
          pattern
        ),
        {
          variant: 'info',
          action: <SnackbarContentLayout onClose={() => closeSnackbar(snackbar)} />,
        }
      );
      setWorkflow('drawing');
    }
  };

  return (
    <>
      {isSketchingView(workflow) && (
        <Box className={classes.container} tabIndex={0} onDragOver={(e) => e.preventDefault()}>
          <Fade
            in={!willFadeOut}
            timeout={{ enter: 5000, exit: 500 }}
            onEnter={() => setWillExit(false)}
          >
            <object type='image/svg+xml' data={Background} className={classes.background}>
              sketch-bg
						</object>
          </Fade>

          <Fade in={!willFadeOut} timeout={{ enter: 6000, exit: 500 }}>
            <TextField
              value={pattern.name}
              onChange={(e) =>
                setPattern({
                  ...pattern,
                  name: e.target.value,
                })
              }
              className={classes.titleField}
              variant='outlined'
              label={t('patterns.creation.titleField')}
            />
          </Fade>

          <SketchTagsHandler
            pattern={pattern}
            setPattern={setPattern}
            willShow={!willFadeOut && isSketchingValidationView(workflow)}
            onClose={() => setWorkflow('drawing')}
          />

          {pattern.elements.map((e, i) => (
            <SketchPatternElement
              key={i}
              element={e}
              pattern={pattern}
              setPattern={setPattern}
            />
          ))}
        </Box>
      )}

      <FabLayout>
        <Fab
          disabled={isRequestPending || isInsertionDisabled}
          color='default'
          onClick={handleExit}
          onMouseEnter={() => setWillFadeOut(true)}
          onMouseLeave={() => setWillFadeOut(false)}
          style={willExit ? { backgroundColor: theme.palette.error.main } : {}}
        >
          <Add
            className={clsx(classes.fabIcon, isSketchingView(workflow) && classes.rotate)}
          />
        </Fab>

        <Slide direction='up' in={isSketchingView(workflow)} unmountOnExit>
          <Fab
            disabled={
              (!canValidate && isSketchingValidationView(workflow)) || isRequestPending
            }
            color='default'
            onClick={handleSave}
          >
            {isRequestPending ? <CircularProgress /> : <SaveOutlined />}
          </Fab>
        </Slide>

        <Slide direction='up' in={isSketchingView(workflow)} unmountOnExit>
          <Fab
            disabled={
              (!canValidate && isSketchingValidationView(workflow)) || isRequestPending
            }
            color='default'
            onClick={handleElementGeneration}
          >
            <Queue />
          </Fab>
        </Slide>
      </FabLayout>
    </>
  );
};

export default SketchDrawer;
