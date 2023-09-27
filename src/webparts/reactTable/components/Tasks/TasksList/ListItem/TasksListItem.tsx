import { TaskItem, useTasksContext } from '../../TasksContext';
import { formatDate } from '../../../../utils/utils';
import { HoverableTableRow, SmallTableCell } from '../TasksList.styles';

type TaskListItemProps = {
  task: TaskItem;
  onClick: () => void;
};

export const TasksListItem = ({ task, onClick }: TaskListItemProps) => {
  const { selectTask } = useTasksContext();

  const handleClick = () => {
    selectTask(task);
    onClick();
  };

  return (
    <HoverableTableRow hover onClick={handleClick}>
      <SmallTableCell>{task.name}</SmallTableCell>
      <SmallTableCell>{formatDate(task.startDate)}</SmallTableCell>
      <SmallTableCell>{formatDate(task.endDate)}</SmallTableCell>
    </HoverableTableRow>
  );
};
