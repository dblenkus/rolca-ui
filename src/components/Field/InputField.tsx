import React from 'react';

import { TextField } from '@material-ui/core';

export interface IInputChangeEvent {
    name: string;
    value: string;
}

interface InputFieldProps {
    name: string;
    label: string;
    value: string;
    autoComplete: string;
    type: string;
    required: boolean;
    rows: number;
    autoFocus: boolean;
    onChange: (event: IInputChangeEvent) => void;
}

class InputField extends React.Component<InputFieldProps> {
    static defaultProps = {
        type: 'text',
        value: '',
        required: false,
        rows: 1,
        autoFocus: false,
    };

    onChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = target;
        const { onChange, name } = this.props;
        onChange({ name, value });
    };

    render(): React.ReactNode {
        const { autoComplete, autoFocus, label, name, required, rows, type, value } = this.props;

        return (
            <TextField
                name={name}
                variant="outlined"
                margin="normal"
                fullWidth
                label={label}
                type={type}
                required={required}
                multiline={rows > 1}
                rows={rows}
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                onChange={this.onChange}
                value={value}
            />
        );
    }
}

export default InputField;
