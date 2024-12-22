import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

interface TaskDeleteDialogProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleDelete: () => void;
  
}

const ConfirmDeleteDialog = ({
  open,
  handleOpen,
  handleClose,
  handleDelete,

}: TaskDeleteDialogProps) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='confirm-dialog-title'
        aria-describedby='confirm-dialog-description'
      >
        <DialogTitle id='confirm-dialog-title'>
          {'Confirm Deletion'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='confirm-dialog-description'>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color='primary'
          >
            Cancel
          </Button>

          <Button
            style={{ backgroundColor: 'red' }}
            onClick={() => {
              
              handleDelete();
            }}
            color='error'
            variant='contained'
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDeleteDialog;
