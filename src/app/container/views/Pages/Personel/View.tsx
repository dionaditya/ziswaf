import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DataTables } from "@/app/container/components/DataTables";
import { Input } from "@/app/container/components/index";
import { Dropdown, Button, Icon } from "react-materialize";

const Personel: React.FC<{}> = () => {
  const [value, setValue] = useState("");
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <div className="row">
        <div className="col s12 l12 m12">
          <div className="card">
            <div className="card-content" style={{ background: "#f7f9fa" }}>
              <div className="row">
                <div className="col s2">
                  <Button
                    href="#modal-filter"
                    className="modal-trigger"
                    node="button"
                    style={{
                      color: "#3A3B3F",
                      background: "#ffffff"
                    }}
                    waves="green"
                  >
                    Filter
                    <Icon left>filter_list</Icon>
                  </Button>
                </div>
                <div className="col s10">
                  <Input
                    id="search"
                    name="search"
                    type="search"
                    placeholder="Cari Personel"
                    value={value}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col s12">
                  <h5 className="black-text" style={{ fontWeight: "bold" }}>
                    Personel Ma'had
                  </h5>
                </div>
              </div>
              <div className="row">
                <div className="col s6">
                  <span className="mr-4">Column to display</span>
                  <Dropdown
                    style={{ color: "#109CF1" }}
                    options={{
                      alignment: "right",
                      autoTrigger: true,
                      closeOnClick: true,
                      constrainWidth: true,
                      container: null,
                      coverTrigger: true,
                      hover: false,
                      inDuration: 150,
                      onCloseEnd: null,
                      onCloseStart: null,
                      onOpenEnd: null,
                      onOpenStart: null,
                      outDuration: 250
                    }}
                    trigger={
                      <Button
                        className="btn-flat"
                        small
                        node="button"
                        style={{
                          background: "#F2F2F2",
                          color: "#4B4B4B"
                        }}
                      >
                        <Icon right>expand_more</Icon>9 of 13 selected
                      </Button>
                    }
                  ></Dropdown>
                </div>
                <div className="col s6">
                  <Link to="/input-pegawai">
                    <Button
                      node="button"
                      className="right"
                      style={{
                        background: "#6DB400"
                      }}
                      waves="default"
                    >
                      Tambah Personel
                      <Icon left>add</Icon>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <DataTables />
        </div>
      </div>
    </div>
  );
};

export default Personel;
