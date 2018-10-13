import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/grid';
import Paper from '@material-ui/core/Paper';
import Workspace from './workspace';
import initialPixels from '../initialData';

const styles = theme => ({
    paper: {
      height: '100vh',
    },
  });

function App(props) {
    const {classes} = props;
    return (
        <Grid container direction="row" spacing={16} alignItems="stretch" justify="center">
            <Grid item xs={1}><Paper className={classes.paper}>Toolbar</Paper></Grid>
            <Grid item xs={9}>
              <Paper className={classes.paper}>
                <Workspace pixels={initialPixels}/>
              </Paper>
            </Grid>
            <Grid item xs={2}><Paper className={classes.paper}>Options</Paper></Grid>
        </Grid>
    );
}

export default withStyles(styles)(App);
