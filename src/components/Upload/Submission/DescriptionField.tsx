import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { SubmissionModel, InputChange } from '../../../types/models';
import { uploadFormStyles } from '../../../styles/general';

import InputField from '../InputField';

export interface DescriptionFieldProps {
    submission: SubmissionModel;
    onChange: (payload: InputChange) => void;
}

const useStyles = makeStyles(uploadFormStyles);

const DescriptionField: React.FC<DescriptionFieldProps> = (props) => {
    const classes = useStyles();
    const { submission, onChange } = props;

    return (
        <InputField
            className={classes.seriesMetaInput}
            name="description"
            value={submission.description}
            error={submission.errors.description}
            label="Description"
            autoComplete=""
            required={submission.meta.descriptionRequired}
            rows={3}
            onChange={onChange}
        />
    );
};

export default DescriptionField;
