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
  { id: 14, name: "/retail" },
  { id: 15, name: "/upz" },
  { id: 16, name: "/corporate/donor" },
  { id: 17, name: "/users-input" },
  { id: 18, name: "/personel-input" },
  { id: 19, name: "/personel-input/:id" },
  { id: 20, name: "/users-input/:id" },
  { id: 21, name: "/retail-input/:id" },
  { id: 22, name: "/retail-tanda-terima/:transaction_id" },
  { id: 23, name: "/corporate-transaction/:donor_id" },
  { id: 24, name: "/corporate-tanda-terima/:transaction_id" },
  { id: 25, name: "/upz/donor" },
  { id: 26, name: "/upz-transaction/:donor_id" },
  { id: 27, name: "/upz-tanda-terima/:transaction_id" },
  { id: 28, name: "/corporate-tanda-terima" },
  { id: 29, name: "/upz-tanda-terima" },
  { id: 30, name: "/upz-transaction" },
  { id: 31, name: "/corporate-transaction" },
  { id: 32, name: "/madrasah-input" },
  { id: 33, name: "/madrasah-input/:id" },
  { id: 34, name: "/info-madrasah/:id" },
  { id: 35, name: "/report-donation" },
  { id: 36, name: "/student-input" },
  { id: 37, name: "/student-input/:id" },
  { id: 38, name: "/donatur-perusahaan" },
  { id: 39, name: "/donatur-perorangan" },
  { id: 40, name: "/donatur-perusahaan/:id" },
  { id: 41, name: "/donatur-perorangan/:id" },
  { id: 42, name: "/info-personel" },
];

const roleAbilityOperator: { id: number, name: string }[] = [
    { id: 1, name: "/home" },
    { id: 2, name: "/students" },
    { id: 3, name: "/donation" },
    { id: 4, name: "/reports" },
    { id: 5, name: "/personel" },
    { id: 6, name: "/corporate" },
    { id: 7, name: "/upz" },
    { id: 8, name: '/retail'},
    { id: 9, name: '/corporate'},
    { id: 10, name: "/personel-input" },
    { id: 10, name: "/personel-input/:id" },
    { id: 11, name: "/retail-input/:id" },
    { id: 12, name: "/retail-tanda-terima/:transaction_id" },
    { id: 13, name: "/corporate-transaction/:donor_id" },
    { id: 14, name: "/corporate-tanda-terima/:transaction_id" },
    { id: 15, name: "/upz/donor" },
    { id: 16, name: "/upz-transaction/:donor_id" },
    { id: 17, name: "/upz-tanda-terima/:transaction_id" },
    { id: 18, name: "/corporate-tanda-terima" },
    { id: 19, name: "/upz-tanda-terima" },
    { id: 20, name: "/upz-transaction" },
    { id: 21, name: "/corporate-transaction" },
    { id: 22, name: '/student-input'},
    { id: 23, name: '/student-input/:id'},
    { id: 24, name: "/donatur-perusahaan" },
    { id: 25, name: "/donatur-perorangan" },
    { id: 26, name: "/donatur-perusahaan/:id" },
    { id: 27, name: "/donatur-perorangan/:id" },
    { id: 28, name: "/donatur" },
    { id: 29, name: "/corporate/donor" },
];

export { roleAbilityAdmin, roleAbilityOperator };