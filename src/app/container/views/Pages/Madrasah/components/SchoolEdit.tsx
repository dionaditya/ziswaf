import React, { useState } from "react";
import ContentBar from "./ContentBar";
import { Input, Textarea } from "@/app/container/components/index";
import SelectOptions from "@/app/container/components/SelectOptions";
import { Button } from "react-materialize";

const SchoolEdit: React.FC<{}> = () => {
  const [option, setOption] = useState({
    province: ["Jateng", "Jabar", "Jatim"],
    regency: ["Semarang", "Bandung", "Surabaya"]
  });
  const [fields, setFields] = useState({
    id: "",
    name: "",
    address: "",
    pos_code: "",
    oepened_at: "",
    phone: "",
    email: "",
    info: ""
  });

  const onChange = (e: any) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleChange = (e: any) => {
    setOption({ ...option, [e.target.name]: e.target.value });
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col s12 l12 m12">
          <div className="card">
            <ContentBar />
            <form>
              <div className="row">
                <div className="col s12 m6 l6">
                  <div
                    className="card-content"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #D8D8D8",
                      margin: "12px 6px 12px 6px"
                    }}
                  >
                    <div className="row mb-2">
                      <div className="col s12">
                        <label htmlFor="id" className="black-text">
                          ID Madrasah
                        </label>
                        <Input
                          id="id"
                          name="id"
                          type="text"
                          placeholder="ID Madrasah"
                          value={fields.id}
                          onChange={onChange}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col s12">
                        <label htmlFor="name" className="black-text">
                          Nama Madrasah
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Nama Madrasah"
                          value={fields.name}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col s12">
                        <label htmlFor="address" className="black-text">
                          Alamat Madrasah
                        </label>
                        <Textarea
                          className="text-area"
                          id="address"
                          name="address"
                          placeholder="Alamat Madrasah"
                          value={fields.address}
                          onChange={onChange}
                          style={{
                            minHeight: "100px"
                          }}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col s12">
                        <SelectOptions
                          onChange={handleChange}
                          value={option}
                          options={option.province}
                          label="Provinsi"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s12">
                        <SelectOptions
                          onChange={handleChange}
                          value={option}
                          options={option.regency}
                          label="Kota"
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col s6">
                        <label htmlFor="pos_code" className="black-text">
                          Kode Pos
                        </label>
                        <Input
                          id="pos_code"
                          name="pos_code"
                          type="number"
                          placeholder="Kode Pos"
                          value={fields.pos_code}
                          onChange={onChange}
                        />
                      </div>
                      <div className="col s6">
                        <label htmlFor="opened_at" className="black-text">
                          Tanggal Dibuka
                        </label>
                        <Input
                          id="opened_at"
                          name="opened_at"
                          type="date"
                          placeholder="Tanggal Dibuka"
                          value={fields.oepened_at}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col s12 m6 l6">
                  <div
                    className="card-content"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #D8D8D8",
                      margin: "12px 6px 12px 6px"
                    }}
                  >
                    <div className="row mb-2">
                      <div className="col s12">
                        <h6 className="black-text">Kontak Madrasah</h6>
                      </div>
                    </div>

                    <div className="row mb-2">
                      <div className="col s12">
                        <label htmlFor="phone" className="black-text">
                          No Telepon / HP
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="No Telp/HP"
                          value={fields.phone}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col s12">
                        <label htmlFor="email" className="black-text">
                          Alamat Surel
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Alamat Surel"
                          value={fields.email}
                          onChange={onChange}
                        />
                      </div>
                    </div>

                    <div className="row mb-2">
                      <div className="col s12">
                        <label htmlFor="info" className="black-text">
                          Info Lain
                        </label>
                        <Textarea
                          className="text-area"
                          id="info"
                          name="info"
                          placeholder="Info Lain"
                          value={fields.info}
                          onChange={onChange}
                          style={{
                            minHeight: "100px"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="right mt-4 mr-4 mb-4 ml-4">
                  <Button
                    className="modal-trigger"
                    href="#modal-warn"
                    small
                    node="button"
                    style={{
                      background: "#D8D8D8",
                      color: "#828282",
                      fontWeight: "bold"
                    }}
                    waves="green"
                  >
                    Simpan
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SchoolEdit;
