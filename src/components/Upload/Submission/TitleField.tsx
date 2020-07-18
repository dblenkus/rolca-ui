import React from 'react';

import { SubmissionModel, InputChange } from '../../../types/models';

import InputField from '../InputField';

export interface TitleFieldProps {
    submission: SubmissionModel;
    onChange: (payload: InputChange) => void;
}

const TitleField: React.FC<TitleFieldProps> = (props) => {
    const { submission, onChange } = props;

    return (
        <InputField
            name="title"
            value={submission.title}
            error={submission.errors.title}
            label="Title"
            autoComplete=""
            required={submission.meta.titleRequired}
            onChange={onChange}
        />
    );
};

export default TitleField;
