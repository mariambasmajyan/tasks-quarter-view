import React, { ReactNode, useState, useCallback } from 'react';

export type TaskItem = {
  id?: number;
  name: string;
  startDate: Date | null;
  endDate: Date | null;
};

const date1 = new Date();
date1.setDate(date1.getDate() + 5);

const date2 = new Date();
date2.setDate(date2.getDate() + 10);

const initialTasks: TaskItem[] = [
  {
    id: 1,
    name: 'Task 1',
    startDate: new Date(),
    endDate: date1,
  },
  {
    id: 2,
    name: 'Task 2',
    startDate: new Date(),
    endDate: date2,
  },
];

type TasksContext = {
  tasks: TaskItem[];
  selectedTask: TaskItem | null;
  addTask: (task: TaskItem) => void;
  editTask: (taskId: number, updatedTask: TaskItem) => void;
  selectTask: (task: TaskItem | null) => void;
};

const TasksContext = React.createContext({} as TasksContext);

type TasksContextProviderProps = {
  children: ReactNode;
};

export const TasksContextProvider = ({ children }: TasksContextProviderProps): JSX.Element => {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);

  const addTask = useCallback((task: TaskItem) => {
    setTasks((prevTasks) => {
      const maxId = Math.max(...prevTasks.map((t) => t.id || 0), 0);
      const newTask = {
        ...task,
        id: maxId + 1,
        startDate:
          task.startDate instanceof Date
            ? task.startDate
            : task.startDate
            ? new Date(task.startDate)
            : null,
        endDate:
          task.endDate instanceof Date
            ? task.endDate
            : task.endDate
            ? new Date(task.endDate)
            : null,
      };
      return [...prevTasks, newTask];
    });
  }, []);

  const editTask = useCallback((taskId: number, updatedTask: TaskItem) => {
    setTasks((prevTasks) => {
      return prevTasks.map((t) => (t.id === taskId ? { ...t, ...updatedTask } : t));
    });
  }, []);

  const selectTask = useCallback((task: TaskItem | null) => {
    setSelectedTask(task);
  }, []);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        selectedTask,
        selectTask,
        addTask,
        editTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = (): TasksContext => React.useContext(TasksContext);
