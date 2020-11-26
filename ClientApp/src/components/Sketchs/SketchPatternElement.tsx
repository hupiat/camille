import React, { useState, Dispatch, SetStateAction } from 'react';
import { useDrag } from 'react-use-gesture';
import { makeStyles, TextField, Box, IconButton } from '@material-ui/core';
import { ZoomIn, ZoomOut } from '@material-ui/icons';
import { PatternElement, Pattern, UnexistingElement } from '../../types/Patterns';
import { mapElementThenBreak } from '../Functions/entities';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    display: 'flex',
    cursor: 'grab',
    width: 300,
    height: 300,
    zIndex: 5,
    background: theme.palette.primary.main,
    borderRadius: 5,
    boxShadow: '0px 10px 30px -5px rgba(0, 0, 0, 0.3)',
    transition: '0.5s',
    border: '15px solid white',
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
  element: UnexistingElement<PatternElement>;
  setElement: SetStateAction<Dispatch<UnexistingElement<PatternElement>>>;
  pattern: UnexistingElement<Pattern>;
  setPattern: Dispatch<UnexistingElement<Pattern>>;
}

const SketchPatternElement = ({ element, setElement, pattern, setPattern }: IProps) => {
  const classes = useStyles();
  const [willReduce, setWillReduce] = useState<boolean>(true);
  const bind = useDrag(state => setElement((element: UnexistingElement<PatternElement>) => {
    element.x = state.xy[0];
    element.y = state.xy[1];
    return element;
  }))

  const updateName = (event: any) =>
    setPattern({
      ...pattern,
      elements: mapElementThenBreak(
        pattern.elements,
        (e) => e.name === element.name,
        (e) => (e.name = event.target.value)
      ),
    });

  return (
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
          left: `${element.x}vw`,
          top: `${element.y}vh`,
        }
      )}
      {...bind()}
    >
      <TextField value={element.name} onChange={updateName} />

      <Box className={classes.iconsContainer}>
        <IconButton onClick={() => setWillReduce(!willReduce)}>
          {willReduce ? (
            <ZoomIn className={classes.expand} />
          ) : (
              <ZoomOut className={classes.expand} />
            )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default SketchPatternElement;
