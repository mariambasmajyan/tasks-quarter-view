import { Controller, Control } from 'react-hook-form';
import { Grid } from '@mui/material';
import { DatePicker, defaultDatePickerStrings } from '@fluentui/react';

type DatePickerComponentProps = {
  control: Control<any>;
  name: 'startDate' | 'endDate';
  label: string;
  defaultValue?: Date | null;
};

// Used here the DatePicker from @fluentui/react
// because of Sharepoint errors for LocalizationProvider from @mui/x-date-pickers
// and AdapterDayjs from '@mui/x-date-pickers/AdapterDayjs'

export const renderDatePicker = ({
  control,
  name,
  label,
  defaultValue,
}: DatePickerComponentProps) => {
  return (
    <Grid item xs={6}>
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field }) => (
          <DatePicker
            value={defaultValue ?? new Date()}
            label={label}
            onSelectDate={(date) => field.onChange(date)}
            placeholder="Select a date..."
            ariaLabel="Select a date"
            strings={defaultDatePickerStrings}
          />
        )}
      />
    </Grid>
  );
};
