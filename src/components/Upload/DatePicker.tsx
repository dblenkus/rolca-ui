import React from 'react';

import { DateTime } from 'luxon';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';

export interface DateChangeEvent {
    name: string;
    value: Date;
}

interface DatePickerProps {
    name: string;
    label: string;
    value: Date | null;
    error: string | null;
    required?: boolean;
    autoComplete: string;
    autoFocus?: boolean;
    onChange: (event: DateChangeEvent) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
    name,
    label,
    value,
    error,
    required = false,
    autoComplete,
    autoFocus = false,
    onChange,
}: DatePickerProps) => {
    const handleDateChange = (date: DateTime | null): void => {
        if (date) onChange({ name, value: date.toJSDate() });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterLuxon}>
            <MuiDatePicker
                label={label}
                value={value ? DateTime.fromJSDate(value) : null}
                onChange={handleDateChange}
                views={['year', 'month', 'day']}
                slotProps={{
                    textField: {
                        name,
                        variant: 'outlined',
                        margin: 'normal',
                        fullWidth: true,
                        required,
                        autoComplete,
                        autoFocus,
                        error: error !== null,
                        helperText: error || '',
                    } as React.ComponentProps<typeof TextField>,
                }}
            />
        </LocalizationProvider>
    );
};

export default DatePicker;
