import React, { PropsWithChildren, Children } from 'react';
import { makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    right: 70,
    display: 'flex',
    flexDirection: 'row-reverse',
    bottom: 30
  },
  fab: {
    marginLeft: 20,
    marginRight: 20,
    '& svg': {
      fill: theme.palette.secondary.dark,
    },
  },
}));

const FabLayout = (props: PropsWithChildren<{}>) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      {Children.toArray(props.children).map((child, i) => (
        <Box
          key={i}
          className={classes.fab}
          style={{ right: !i ? 70 : (i + 1) * 100 }}
        >
          {child}
        </Box>
      ))}
    </Box>
  );
};

export default FabLayout;
