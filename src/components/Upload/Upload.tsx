import React from 'react';

import { Grid } from '@material-ui/core';

import UploadForm from './UploadForm';

const Upload = () => (
    <Grid container>
        <Grid item xs={12}>
            <UploadForm />
        </Grid>
    </Grid>
);

export default Upload;
