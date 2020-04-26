import React, { useContext } from "react";
import MUIDataTable from "mui-datatables";
import { DonationContext } from '../Controller';

const columns = [
  "ID Transaksi",
  "Tanggal",
  "Nama Donatur",
  "No HP",
  "Kota",
  "Kategori Donatur",
  "Kategori Sumber",
  "Unit",
  "Jenis Donasi",
  "Bentuk",
  "Deskripsi Donasi",
  "Tunai/Non Tunai",
  "Jumlah",
  "No Ref",
  "Deskripsi Barang",
  "Jumlah Barang",
  "Status Barang",
  "No Kwitansi"
];

const options = {
  filterType: "dropdown",
  responsive: "scroll"
};

export function DonationData() {
  const controller = useContext(DonationContext)
  const dataResponse = controller.data.map((val) => Object.values(val).slice(0, 14))
  
  return (
    <MUIDataTable title={""} data={dataResponse} columns={columns} options={options} />
  );
}
