import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

 const ModalSubmit: React.FC<{handleSubmit, handleClose, open, isLoading}> = ({handleSubmit, handleClose, open, isLoading}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Apakah yakin akan menyimpan data?"}</DialogTitle>
        <DialogContent>
          {!isLoading ? (
              <DialogContentText id="alert-dialog-description">
                Data yang sudah diupdate tidak dapat dikembalikan lagi. 
                Untuk itu pastikan kembali data
                yang ingin anda update sudah benar
                </DialogContentText>
          ) : 'Loading...'}
        </DialogContent>
        <DialogActions>
          <Button disabled={isLoading} onClick={handleClose}
                color="primary" style={{
                    background: "#ffffff",
                    color: "#00923F",
                    borderRadius: "2px",
                    border: "1px solid #00923F"
                }}
            >
            Batal
          </Button>
          <Button disabled={isLoading} style={{
                background: "#00923F",
                color: "#ffffff",
                marginLeft: "4px"
              }} onClick={handleSubmit}  autoFocus
            >
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalSubmit;