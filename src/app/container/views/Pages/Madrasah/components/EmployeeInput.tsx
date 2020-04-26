import React, { useState } from "react";
import { Link } from "react-router-dom";
import BackNav from "@/app/container/components/BackNav";
import { Input } from "@/app/container/components/index";
import SelectOptions from "@/app/container/components/SelectOptions";
import { Button } from "react-materialize";

const EmployeeInput = () => {
  const [option, setOption] = useState({
    province: ["Jateng", "Jabar", "Jatim"],
    regency: ["Semarang", "Bandung", "Surabaya"],
    state: [
      "Pimpinan",
      "Tenaga Pengajar Tetap",
      "Tenaga Pengajar Tidak Tetap",
      "Tenaga Sosial",
      "Relawan Pendidikan",
      "Relawan Sosial",
      "Non Aktif"
    ],
    school: ["A", "B", "C"]
  });

  const [fields, setFields] = useState({
    id: "",
    name: "",
    place_of_birth: "",
    birth_of_date: "",
    address: "",
    pos_code: "",
    registered_year: "",
    phone: "",
    email: ""
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
        <div className="col s12 m12 l12">
          <div className="card z-depth-0">
            <div className="card-content" style={{ background: "#6DB400" }}>
              <div className="row">
                <Link to="/dashboard">
                  <div className="white-text ml-1">
                    <BackNav />
                  </div>
                </Link>
              </div>
              <div className="row">
                <h5 className="white-text font-weight-700 ml-1">
                  Input Tenaga Ma'had
                </h5>
              </div>
            </div>
            <form action="">
              <div className="card-content" style={{ height: "310px" }}>
                <div className="row">
                  <div className="col s2">
                    <div className="daftar-siswa-container__sub-nav__tab-nav__tab-content__image-content-box">
                      <i className="fa fa-image fa-2x"></i>
                    </div>
                    <div className="daftar-siswa-container__sub-nav__tab-nav__tab-content__upload-button">
                      <button className="btn btn-flat">Tambahkan Foto</button>
                    </div>
                  </div>
                  <div className="col s5">
                    <div
                      className="card-content z-depth-0"
                      style={{
                        borderRadius: "5px",
                        border: "1px solid #D8D8D8"
                      }}
                    >
                      <div className="row mb-2">
                        <div className="col s12">
                          <label htmlFor="name" className="black-text">
                            Nama Lengkap
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Nama Lengkap"
                            value={fields.name}
                            onChange={onChange}
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col s6">
                          <label
                            htmlFor="place_of_birth"
                            className="black-text"
                          >
                            Tempat Lahir
                          </label>
                          <Input
                            id="place_of_birth"
                            name="place_of_birth"
                            type="text"
                            placeholder="Tempat Lahir"
                            value={fields.place_of_birth}
                            onChange={onChange}
                          />
                        </div>
                        <div className="col s6">
                          <label htmlFor="birth_of_date" className="black-text">
                            Tanggal Lahir
                          </label>
                          <Input
                            id="birth_of_date"
                            name="birth_of_date"
                            type="date"
                            placeholder="Tanggal Lahir"
                            value={fields.birth_of_date}
                            onChange={onChange}
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col s12">
                          <label htmlFor="address" className="black-text">
                            Alamat
                          </label>
                          <textarea
                            className="text-area"
                            id="address"
                            name="address"
                            placeholder="Alamat"
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
                        <div className="col s7">
                          <SelectOptions
                            onChange={handleChange}
                            value={option}
                            options={option.regency}
                            label="Kota"
                          />
                        </div>
                        <div className="col s5">
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
                      </div>
                    </div>
                  </div>
                  <div className="col s5">
                    <div
                      className="card-content z-depth-0"
                      style={{
                        borderRadius: "5px",
                        border: "1px solid #D8D8D8"
                      }}
                    >
                      <div className="row mb-2">
                        <div className="col s12">
                          <h6 className="black-text">Info Kepegawaian</h6>
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col s12">
                          <label htmlFor="id" className="black-text">
                            ID Pegawai
                          </label>
                          <Input
                            id="id"
                            name="id"
                            type="text"
                            placeholder="ID Pegawai"
                            value={fields.id}
                            onChange={onChange}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col s12">
                          <SelectOptions
                            onChange={handleChange}
                            value={option}
                            options={option.school}
                            label="Asal Unit"
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col s12">
                          <SelectOptions
                            onChange={handleChange}
                            value={option}
                            options={option.state}
                            label="Status Pegawai"
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col s12">
                          <label
                            htmlFor="registered_year"
                            className="black-text"
                          >
                            Tahun Masuk
                          </label>
                          <Input
                            id="registered_year"
                            name="registered_year"
                            type="date"
                            placeholder="Tahun Masuk"
                            value={fields.registered_year}
                            onChange={onChange}
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col s12">
                          <h6 className="black-text">Kontak Person</h6>
                        </div>
                      </div>

                      <div className="row mb-2">
                        <div className="col s12">
                          <label htmlFor="phone" className="black-text">
                            No Telepon/HP
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="No Handphone"
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
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="right mt-4 mr-4 mb-4 ml-4">
                  <Button
                    node="button"
                    style={{
                      background: "#D8D8D8",
                      color: "#828282",
                      fontWeight: "bold"
                    }}
                    waves="default"
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

export default EmployeeInput;
