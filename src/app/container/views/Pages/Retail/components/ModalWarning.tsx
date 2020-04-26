import React from "react";
import { Modal, Button, Icon } from "react-materialize";

interface Props {}

const ModalWarning: React.FC<Props> = () => {
  return (
    <Modal
      actions={[
        <React.Fragment>
          <div className="row">
            <div className="col s12 center">
              <Button
                flat
                modal="close"
                node="button"
                style={{
                  color: "#00923F",
                  fontWeight: "bold",
                  marginRight: "4px"
                }}
              >
                KELUAR
              </Button>
              <Button
                small
                node="button"
                style={{
                  background: "#00923F",
                  color: "#ffffff",
                  fontWeight: "bold",
                  marginLeft: "4px"
                }}
              >
                Tidak, Lanjutkan.
              </Button>
            </div>
          </div>
        </React.Fragment>
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
      <h6 className="center mb-4">Apakah Anda yakin akan keluar ?</h6>
      <span className="center mb-2">
        <p>
          Anda akan keluar sebelum menyelesaikan proses input anda. Data yang
          anda masukkan tidak akan tersimpan.
        </p>
      </span>
      <div className="divider"></div>
    </Modal>
  );
};

export default ModalWarning;
