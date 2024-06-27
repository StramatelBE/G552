import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

function DuplicateMediaDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Media Duplication</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This media file seems to have already been uploaded. Do you want to upload it again?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "secondary.main" }}  onClick={onClose} >
          No
        </Button>
        <Button sx={{ color: "secondary.main" }}  onClick={onConfirm} >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DuplicateMediaDialog;