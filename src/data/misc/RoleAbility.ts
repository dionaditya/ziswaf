const roleAbilityAdmin: { id: number; name: string }[] = [
  { id: 1, name: "/home" },
  { id: 2, name: "/users" },
  { id: 3, name: "/prognosis" },
  { id: 4, name: "/division" },
  { id: 5, name: "/categories" },
  { id: 6, name: "/school" },
  { id: 7, name: "/employee" },
  { id: 8, name: "/students" },
  { id: 9, name: "/reports" },
  { id: 10, name: "/donation" },
  { id: 11, name: "/madrasah" },
  { id: 12, name: "/personel" },
  { id: 13, name: "/donatur" },
  { id: 14, name: "/users-input" },
  { id: 15, name: "/personel-input" },
  { id: 16, name: "/personel-input/:id" },
  { id: 17, name: "/users-input/:id" },
  { id: 18, name: "/madrasah-input" },
  { id: 19, name: "/madrasah-input/:id" },
  { id: 20, name: "/info-madrasah/:id" },
  { id: 21, name: "/report-donation" },
  { id: 22, name: "/student-input" },
  { id: 23, name: "/student-input/:id" },
  { id: 24, name: "/donatur-perusahaan" },
  { id: 25, name: "/donatur-perorangan" },
  { id: 26, name: "/donatur-perusahaan/:id" },
  { id: 27, name: "/donatur-perorangan/:id" },
  { id: 28, name: "/info-personel" },
  { id: 28, name: "/info-personel/:id" },
  { id: 29, name: "/donation/upz" },
  { id: 30, name: "/donation/retail" },
  { id: 31, name: "/donation/corporate" },
  { id: 32, name: "/donation/retail/transaction/:id" },
  { id: 33, name: "/donation/retail/tanda-terima/:transaction_id" },
  { id: 34, name: "/donation/corporate/transaction/:donor_id" },
  { id: 35, name: "/donation/corporate/tanda-terima/:transaction_id" },
  { id: 36, name: "/donation/upz/donatur" },
  { id: 37, name: "/donation/upz/transaction/:donor_id" },
  { id: 38, name: "/donation/upz/tanda-terima/:transaction_id" },
];

const roleAbilityOperator: { id: number; name: string }[] = [
  { id: 1, name: "/home" },
  { id: 2, name: "/students" },
  { id: 3, name: "/donation" },
  { id: 4, name: "/reports" },
  { id: 5, name: "/personel" },
  { id: 6, name: "/corporate" },
  { id: 7, name: "/donation/upz" },
  { id: 8, name: "/donation/retail" },
  { id: 9, name: "/donation/corporate" },
  { id: 10, name: "/personel-input" },
  { id: 10, name: "/personel-input/:id" },
  { id: 11, name: "/donation/retail/transaction/:id" },
  { id: 12, name: "/donation/retail/tanda-terima/:transaction_id" },
  { id: 13, name: "/donation/corporate/transaction/:donor_id" },
  { id: 14, name: "/donation/corporate/tanda-terima/:transaction_id" },
  { id: 15, name: "/donation/upz/donatur" },
  { id: 16, name: "/donation/upz/transaction/:donor_id" },
  { id: 17, name: "/donation/upz/tanda-terima/:transaction_id" },
  { id: 18, name: "/student-input" },
  { id: 19, name: "/student-input/:id" },
  { id: 20, name: "/donatur-perusahaan" },
  { id: 21, name: "/donatur-perorangan" },
  { id: 22, name: "/donatur-perusahaan/:id" },
  { id: 23, name: "/donatur-perorangan/:id" },
  { id: 24, name: "/donatur" },
  { id: 25, name: "/info-personel" },
  { id: 26, name: "/info-personel/:id" },
];

export { roleAbilityAdmin, roleAbilityOperator };
