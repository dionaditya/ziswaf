import React, { Children } from "react";
import Modal from "@material-ui/core/Modal";
import {Close} from '@material-ui/icons'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import IconButton from "@material-ui/core/IconButton";

export const ModalFooter = ({ children }) => {
  const xsmall = useMediaQuery("(min-width: 300px)" && "(max-width: 700px");
  if(xsmall) {
    return(
      <div
      className="modal-footer"
      style={{
        flex: 0.5,
        border: "4px solid transparent",
        borderRadius: "20px",
        padding: "10px 20px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        justifyContent: "flex-end",
        gridGap: "10px",
      }}
    >
      {children}
    </div>
    )
  } else {
    return(
      <div
          className="modal-footer"
          style={{
            flex: 0.5,
            border: "4px solid transparent",
            borderRadius: "20px",
            padding: "10px 20px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            justifyContent: "flex-end",
            gridGap: "10px",
            position: 'absolute',
            bottom: 3
          }}
        >
          {children}
        </div>
    )
  }  
};

export const ModalBody = ({ children }) => {
  return <div className="modal-body">{children}</div>;
};

const ModalFilters = ({ onShow, handleClose, children, titleModal }) => {
  const xsmall = useMediaQuery("(min-width: 300px)" && "(max-width: 700px");
  if (onShow) {
    return (
      <Modal 
        open={onShow}
        onClose={handleClose}
        style={{
          display: 'grid',
          placeItems: 'center center'
        }}
        // style={{
        //   top: "0",
        //   left: "0",
        //   position: "fixed",
        //   padding: "20px 0px",
        //   margin: 0,
        //   width: "100%",
        //   height: "100%",
        //   display: "grid",
        //   placeItems: "center center",
        //   zIndex: 1000,
        //   background: "rgba(32, 32, 32, 0.75)",
        // }}
      >
        {
          xsmall ? (
            <div
            style={{
              background: "white",
              width: "100%",
              maxHeight: "100%",
              minHeight: '380px',
              height: '100%',
              padding: '10px 30px 0px 30px',
              maxWidth: "100%",
              display: "flex",
              overflowY: "auto",
              overflowX: "hidden",
              flexDirection: "column",
              border: "4px solid transparent",
              borderRadius: "5px",
              position: 'relative'
            }}
          >
            <div
              className="modal-header"
              style={{
                marginTop: '10px',
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #fafafa",
              }}
            >
              <div>
                <span style={{ fontSize: 20, fontWeight: 800, color: "#757575" }}>
                  {titleModal}
                </span>
              </div>
              <div>
                <IconButton onClick={handleClose}>
                   <Close />
                </IconButton>
              </div>
            </div>
            {children}
          </div>
          ) : (

            <div
              style={{
                background: "white",
                width: "100%",
                maxHeight: "100%",
                minHeight: '380px',
                height: '100%',
                padding: '10px 30px 0px 30px',
                maxWidth: "35%",
                display: "flex",
                overflowY: "auto",
                overflowX: "hidden",
                flexDirection: "column",
                border: "4px solid transparent",
                borderRadius: "5px",
                position: 'relative'
              }}
            >
              <div
                className="modal-header"
                style={{
                  marginTop: '10px',
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #fafafa",
                }}
              >
                <div>
                  <span style={{ fontSize: 20, fontWeight: 800, color: "#757575" }}>
                    {titleModal}
                  </span>
                </div>
                <div>
                <IconButton onClick={handleClose}>
                   <Close />
                </IconButton>
                </div>
              </div>
              {children}
            </div>
          )
        }
      </Modal>
    );
  }

  return (
    <div
      style={{
        top: "0",
        left: "0",
        position: "fixed",
        padding: "20px 0px",
        margin: 0,
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center center",
        zIndex: 1000,
        visibility: "hidden",
        background: "rgba(32, 32, 32, 0.75)",
      }}
    >
      <div
        className="z-depth-2"
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          maxWidth: "350px",
          display: "flex",
          flexDirection: "column",
          border: "4px solid transparent",
          borderRadius: "20px",
        }}
      >
        <div
          className="modal-header"
          style={{
            flex: 0.3,
            border: "4px solid transparent",
            borderRadius: "20px",
            padding: "5px",
          }}
        >
          <div className="row valign-wrapper ">
            <div
              className="col s6 left"
              style={{
                marginLeft: "0px",
              }}
            >
              <h5>Filters</h5>
            </div>
            <div className="col s2 right">
              <i
                className="material-icons prefix"
                style={{
                  cursor: "pointer",
                }}
                onClick={handleClose}
              >
                close
              </i>
            </div>
          </div>
          <hr
            style={{
              border: "1px solid #fafafa",
            }}
          />
        </div>
        <div
          className="modal-body"
          style={{
            flex: 2,
            padding: "10px 20px",
            display: "grid",
            gridTemplateRows: "1fr 1fr",
            gridGap: "40px",
          }}
        >
          {children}
        </div>

        <div
          className="modal-footer"
          style={{
            flex: 0.5,
            border: "4px solid transparent",
            borderRadius: "20px",
            padding: "10px 20px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            justifyContent: "flex-end",
            gridGap: "10px",
          }}
        >
          <button className=" btn-flat blue-text">Kembali</button>
          <button className=" btn waves-effect waves-light gradient-45deg-light-blue-cyan">
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalFilters;
