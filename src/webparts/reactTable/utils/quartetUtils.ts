import { startOfMonth, endOfMonth, eachDayOfInterval, isWithinInterval } from 'date-fns';
import { TaskItem } from '../components/Tasks/TasksContext';

const getQuarterRange = (quarter: number): [number, number] => {
  switch (quarter) {
    case 1:
      return [0, 2];
    case 2:
      return [3, 5];
    case 3:
      return [6, 8];
    case 4:
      return [9, 11];
    default:
      throw new Error('Invalid quarter');
  }
};

export const getQuarterData = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const quarter = Math.floor(month / 3) + 1;

  const [startMonth, endMonth] = getQuarterRange(quarter);

  const startDate = startOfMonth(new Date(year, startMonth));
  const endDate = endOfMonth(new Date(year, endMonth));

  return {
    quarter,
    year,
    startDate,
    endDate,
  };
};

export const getTaskColor = (task: TaskItem, date: Date) => {
  if (task.startDate && task.endDate) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (isWithinInterval(date, { start: new Date(task.startDate), end: new Date(task.endDate) })) {
      return 'rgba(0, 123, 255, 0.5)';
    }
  }
  return undefined;
};

export const getTaskColorForWeek = (weekStart: Date, weekEnd: Date, task: TaskItem) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const currentDay = new Date(weekStart);

  while (currentDay <= weekEnd) {
    if (isDateWithinTaskRange(currentDay, task)) {
      return getTaskColor(task, currentDay);
    }
    currentDay.setDate(currentDay.getDate() + 1);
  }
  return 'transparent';
};

export const getDatesArray = (start: Date, end: Date): Date[] => {
  return eachDayOfInterval({ start, end });
};

export const isDateWithinTaskRange = (date: Date, task: TaskItem) => {
  if (task.startDate && task.endDate) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return isWithinInterval(date, { start: new Date(task.startDate), end: new Date(task.endDate) });
  }
  return false;
};

export const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
