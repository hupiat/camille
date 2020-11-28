import React, { useState, Dispatch, useEffect } from 'react';
import { useDrag } from 'react-use-gesture';
import { makeStyles, TextField, Box, IconButton, Popover, Popper } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { PatternElement, Pattern, MaybeExisting } from '../../types/Patterns';
import { mapElementThenBreak, weakEgality } from '../Functions/entities';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    cursor: 'grab',
    width: 300,
    height: 300,
    zIndex: 5,
    background: theme.palette.primary.main,
    borderRadius: 5,
    boxShadow: '0px 10px 30px -5px rgba(0, 0, 0, 0.3)',
    transition: '0.5s',
    '&:active': {
      cursor: 'grabbing',
    },
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    marginBottom: 10,
  },
  expand: {
    color: 'white',
    position: 'relative',
    width: 130,
    height: 130,
  },
  field: {
    display: 'flex',
    margin: 20,
  },
}));

interface IProps {
  element: MaybeExisting<PatternElement>;
  pattern: MaybeExisting<Pattern>;
  setPattern: Dispatch<MaybeExisting<Pattern>>;
}

const DEBOUNCE_DELAY_MS = 350;

const SketchPatternElement = ({ element, pattern, setPattern }: IProps) => {
  const classes = useStyles();
  const [elementState, setElement] = useState<MaybeExisting<PatternElement>>(element);
  const [willReduce, setWillReduce] = useState<boolean>(true);
  useEffect(() => setElement(element), [element]);
  const bind = useDrag(state => {
    setElement(
      {
        ...elementState,
        x: state.xy[0],
        y: state.xy[1]
      });
  });

  const updateName = (event: any) => {
    setElement({
      ...elementState,
      name: event.target.value
    })
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPattern({
        ...pattern,
        elements: mapElementThenBreak(
          pattern.elements,
          (e) => weakEgality(e, elementState),
          (e) => (e.name = elementState.name)
        ),
      });
    }, DEBOUNCE_DELAY_MS)
    return () => clearTimeout(timeout);
  })

  return (
    <>
        // TODO Indicator when reduced
      <Box
        className={classes.container}
        style={Object.assign(
          willReduce
            ? {
              transform: 'scale(0.2)',
              borderRadius: 400,
              boxShadow: 'unset',
            }
            : {},
          {
            left: `${elementState.x}vw`,
            top: `${elementState.y}vh`,
          }
        )}
      // {...bind()}
      >
        {
          !willReduce &&
          <TextField
            value={elementState.name}
            onChange={updateName}
            className={classes.field}
            color="secondary" />
        }

        <Box className={classes.iconsContainer}>
          <IconButton onClick={() => setWillReduce(!willReduce)}>
            {willReduce ? (
              <Add className={classes.expand} />
            ) : (
                <Remove className={classes.expand} />
              )}
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default SketchPatternElement;
