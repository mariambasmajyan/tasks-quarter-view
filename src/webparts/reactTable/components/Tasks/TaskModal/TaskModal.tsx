import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTasksContext } from '../TasksContext';
import { DetailsForm } from './DetailsForm';

type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const TaskModal = ({ isOpen, onClose }: TaskModalProps): JSX.Element => {
  const { selectedTask } = useTasksContext();

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {selectedTask?.id ? 'Edit Task' : 'Add Task'}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DetailsForm selectedTask={selectedTask} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};
