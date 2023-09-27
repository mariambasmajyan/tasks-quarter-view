import { useState, useCallback } from 'react';
import { MainLayout } from '../components/MainLayout';
import { Button, Grid } from '@mui/material';
import { TasksList } from '../components/Tasks/TasksList';
import { TaskModal } from '../components/Tasks/TaskModal';
import { TasksContextProvider, useTasksContext } from './Tasks/TasksContext';
import { QuarterTable } from '../components/QuarterTable';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasks, selectTask } = useTasksContext();

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    selectTask(null);
  }, [selectTask]);

  return (
    <MainLayout>
      <Grid container alignItems="center" marginBottom={3}>
        <Button variant="contained" size="small" color="primary" onClick={openModal}>
          Add Task
        </Button>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={12} md={4} mt={9.4}>
          <TasksList data={tasks} onClick={openModal} />
        </Grid>
        <Grid item xs={12} md={8}>
          <QuarterTable />
        </Grid>
      </Grid>
      <TaskModal isOpen={isModalOpen} onClose={closeModal} />
    </MainLayout>
  );
};

export const ReactTable = () => {
  return (
    <TasksContextProvider>
      <App />
    </TasksContextProvider>
  );
};
