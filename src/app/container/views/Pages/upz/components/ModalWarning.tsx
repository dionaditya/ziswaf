import React from "react";
import { Modal, Button, Icon } from "react-materialize";

interface Props {}

const ModalWarning: React.FC<Props> = () => {
  return (
    <Modal
      actions={[
        <div className="center">
          <Button className="left ml-2" flat modal="close" node="button">
            Keluar
          </Button>
          <Button
            className="right mr-2"
            small
            node="button"
            style={{
              background: "#00923F"
            }}
          >
            Perbaiki
          </Button>
        </div>
      ]}
      bottomSheet={false}
      fixedFooter={false}
      header=""
      id="modal-warn"
      options={{
        dismissible: true,
        endingTop: "10%",
        inDuration: 250,
        onCloseEnd: null,
        onCloseStart: null,
        onOpenEnd: null,
        onOpenStart: null,
        opacity: 0.5,
        outDuration: 250,
        preventScrolling: true,
        startingTop: "10%"
      }}
    >
      <div className="center">
        <Icon medium>error_outline</Icon>
      </div>
      <h6 className="center mb-4">Data tidak dapat disimpan.</h6>
      <span className="center mb-2">
        <p>
          Nomor kuitansi yang anda masukkan telah ada dalam database. Mohon
          periksa kembali.
        </p>
      </span>
      <div className="divider"></div>
    </Modal>
  );
};

export default ModalWarning;
