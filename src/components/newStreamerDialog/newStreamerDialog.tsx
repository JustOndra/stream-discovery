import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { BaseSyntheticEvent, ReactNode } from 'react';

interface IProps {
  visible: boolean;
  close: () => void;
  children: ReactNode;
  formLoading: boolean;
  saveButtonProps: {
    disabled: boolean;
    onClick: (e: BaseSyntheticEvent<object, any, any>) => void;
  };
}

const NewStreamerDialog = ({
  visible,
  close,
  children,
  saveButtonProps,
  formLoading,
}: IProps) => {
  return (
    <Dialog open={visible} onClose={close} fullWidth>
      <DialogTitle>New Streamer</DialogTitle>
      <DialogContent>
        <DialogContentText>Create new streamer</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button type="submit" {...saveButtonProps}>
          {formLoading ? 'Loading' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewStreamerDialog;
