import { Table, TableHead, TableRow, Typography, TableBody } from '@mui/material';
import { TasksListItem } from './ListItem/TasksListItem';
import { TaskItem } from '.././TasksContext';
import { SmallTableCell } from './TasksList.styles';

type TasksListProps = {
  data: TaskItem[];
  onClick: () => void;
};

export const TasksList = ({ data, onClick }: TasksListProps) => {
  if (!data || data.length === 0) {
    return <Typography>No tasks to display.</Typography>;
  }

  return (
    <Table sx={{ width: '100%' }}>
      <TableHead>
        <TableRow>
          <SmallTableCell>Name</SmallTableCell>
          <SmallTableCell>Start Date</SmallTableCell>
          <SmallTableCell>End Date</SmallTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((task) => (
          <TasksListItem task={task} key={task.id} onClick={onClick} />
        ))}
      </TableBody>
    </Table>
  );
};
