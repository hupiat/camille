import React, { useState, Dispatch, useEffect, useRef } from 'react';
import { makeStyles, TextField, Box } from '@material-ui/core';
import { PatternElement, Pattern, MaybeExisting } from '../../types/Patterns';
import { mapElementThenBreak, weakEgality } from '../Functions/entities';
import { Vector } from '../../types/Commons';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    cursor: 'grab',
    zIndex: 5,
    height: '100px',
    width: '200px',
    background: theme.palette.primary.main,
    borderRadius: 5,
    boxShadow: '0px 10px 30px -5px rgba(0, 0, 0, 0.3)',
    transition: '0.5s',
    '&:active': {
      cursor: 'grabbing',
    },
  },
  field: {
    display: 'flex',
    margin: 20,
    '& input': {
      color: 'white'
    }
  },
}));

interface IProps {
  element: MaybeExisting<PatternElement>;
  pattern: MaybeExisting<Pattern>;
  setPattern: Dispatch<MaybeExisting<Pattern>>;
}

const DEBOUNCE_DELAY_MS = 350;

export const ELEMENTS_SHIFT_TOP_PX = 100;
export const ELEMENTS_SHIFT_RIGHT_PX = 200;

const SketchPatternElement = ({ element, pattern, setPattern }: IProps) => {
  const classes = useStyles();
  const positionRef = useRef<Vector>({
    x: element.x,
    y: element.y
  });
  const [elementState, setElement] = useState<MaybeExisting<PatternElement>>(element);
  useEffect(() => setElement(element), [element]);

  const updateName = (event: any) => {
    setElement({
      ...elementState,
      name: event.target.value
    })
  }

  const handleDrag = (e: React.DragEvent<HTMLElement>) => {
    positionRef.current.x = e.pageX;
    positionRef.current.y = e.pageY;
  }

  const handleDrop = () => {
    let x = positionRef.current.x;
    let y = positionRef.current.y;
    if (positionRef.current.x > window.innerWidth - ELEMENTS_SHIFT_RIGHT_PX) {
      x = window.innerWidth - ELEMENTS_SHIFT_RIGHT_PX;
    }
    if (y < ELEMENTS_SHIFT_TOP_PX) {
      y = ELEMENTS_SHIFT_TOP_PX;
    } else if (y > window.innerHeight - ELEMENTS_SHIFT_TOP_PX) {
      y = window.innerHeight - ELEMENTS_SHIFT_TOP_PX;
    }
    setElement({
      ...elementState,
      x,
      y
    });
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
  }, [elementState, pattern, setPattern]);

  return (
    <Box
      className={classes.container}
      style={{
        left: `${elementState.x}px`,
        top: `${elementState.y}px`,
      }}
      onDrag={handleDrag}
      onDragEnd={handleDrop}
      draggable
    >
      <TextField
        value={elementState.name}
        onChange={updateName}
        className={classes.field}
        color="secondary"
      />
    </Box>
  );
};

export default SketchPatternElement;
