import { Button, Grid, Stack } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TaskItem, useTasksContext } from '../TasksContext';
import { useEffect } from 'react';
import { renderDatePicker } from '../../../helpers/DatePickerComponent';
import { TextField } from '@fluentui/react';

type FormValues = {
  startDate: Date;
  endDate: Date;
  name: string;
};

type DetailsFormProps = {
  selectedTask: TaskItem | null;
  onClose: () => void;
};

//Used here TextField because of changes in DatePicker, to have fields in form from one lib.

export const DetailsForm = ({ selectedTask, onClose }: DetailsFormProps) => {
  const { addTask, editTask } = useTasksContext();
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      name: selectedTask?.name || '',
      startDate: selectedTask?.startDate || new Date(),
      endDate: selectedTask?.endDate || new Date(),
    },
  });

  const convertDateStringsToDateObjects = (data: FormValues) => {
    const convertToDate = (date: Date | string) =>
      typeof date === 'string' ? new Date(date) : date;

    return {
      ...data,
      startDate: convertToDate(data.startDate),
      endDate: convertToDate(data.endDate),
    };
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (selectedTask?.id) {
      editTask(selectedTask.id, data);
    } else {
      const taskToAdd = convertDateStringsToDateObjects(data);
      addTask(taskToAdd as TaskItem);
    }

    onClose();
  };

  useEffect(() => {
    reset();
  }, [selectedTask]);

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} py={2} gap={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField {...field} label="Task Name" required />}
          />
        </Grid>
        {renderDatePicker({
          control,
          name: 'startDate',
          label: 'Start date',
          defaultValue: selectedTask?.startDate,
        })}
        {renderDatePicker({
          control,
          name: 'endDate',
          label: 'End date',
          defaultValue: selectedTask?.endDate,
        })}
      </Grid>
      <Grid container justifyContent="center" mt={2}>
        <Button type="submit" variant="contained" color="primary">
          {selectedTask?.id ? 'Update Task' : 'Add Task'}
        </Button>
      </Grid>
    </Stack>
  );
};
