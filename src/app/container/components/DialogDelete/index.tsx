import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";

export default function DialogDelete(props) {
  const { handleDelete, handleClose, open, loading, ...rest} = props

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Apakah yakin untuk menghapus data?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Data yang sudah dihapus tidak dapat dikembalikan lagi. Untuk itu
            pastikan kembali data yang ingin dihapus sudah benar
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              backgroundColor: "transparent !important",
              color: "#00923F",
            }}
            color="transparent"
            onClick={handleClose}
            {...rest}
          >
            Batal
          </Button>
          <Button
            color="primary"
            onClick={handleDelete}
            loading={loading}
          >
             <span style={{ fontSize: "14px" }}>Hapus</span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
