export let CoorporateStatus: [number, string][] = [
  [1, "Bapak"],
  [2, "Ibu"],
  [3, "Saudara"],
  [4, "Saudari"],
  [5, "Unit Usaha"],
  [6, "Unit Bisnis"],
  [7, "Institusi"],
  [8, "Organisasi"],
  [9, "Perkumpulan"],
];

export let DonationCategory: [number, string][] = [
  [1, "Zakat Fitrah"],
  [2, "Zakat Maal"],
  [3, "Infak / Shadaqah"],
  [4, "Wakaf"],
  [5, "Qurban"],
  [6, "Penerimaan Lain"],
];

export let EmployeeStatus: [number, string][] = [
  [1, "Pimpinan"],
  [2, "Tenaga Pengajar Tetap"],
  [3, "Tenaga Pengajar Tidak Tetap"],
  [4, "Tenaga Sosial"],
  [5, "Relawan Pendidikan"],
  [6, "Relawan Sosial"],
  [0, "Non Aktif"],
];

export let ParentStatusMaster: [number, string][] = [
  [0, "Orang Tua"],
  [1, "Wali"],
];

export let ParentStatus: [number, string][] = [
  [1, "Almarhum"],
  [2, "Orang Tua Kandung"],
  [3, "Orang Tua Sambung"],
  [4, "Wali Adopsi"],
  [5, "Wali Satu Hubungan Darah"],
];

export let EducationStatus: [number, string][] = [
  [1, "Aktif"],
  [2, "Skorsing"],
  [3, "Diskualifikasi"],
  [4, "Mengundurkan Diri"],
  [5, "Lulus"],
];

export let StudentStatus: [number, string][] = [
  [1, "Dhuafa"],
  [2, "Yatim"],
  [3, "Piatu"],
  [4, "Yatim-Piatu"],
  [5, "Lulus"],
];

export let UserStatus: [number, string][] = [[1, "Aktif"], [2, "Tidak Aktif"]];

export let UserRole: [number, string][] = [[1, "Super admin"], [2, "Operator"]];

export let DonorTableColumn: [string, string][] = [
  ["id", "ID Donatur"],
  ["is_company", "Kategori Donatur"],
  ["status", "Status"],
  ["company_name", "Nama Lengkap"],
  ["address", "Alamat"],
  ["regency_id", "Kota"],
  ["province_id", "Provinsi"],
  ["pos_code", "Kode Pos"],
  ["email", "Email"],
  ["phone", "No HP"],
  ["npwp", "No NPWP"],
  ["name", "Nama CP"],
  ["position", "Jabatan CP"],
  ["contact_number", "No HP CP"],
  ["info", "Info"],
];

export const nonSortAbleDonorColumn = [
  'pos_code',
  'npwp',
  'phone',
  'contact_number'
]

export let StudentListTableColumn: [string, string][] = [
  ["identity_number", "NIS"],
  ["school_id", "Asal Unit"],
  ["name", "Nama Siswa"],
  ["age", "Usia"],
  ["place_of_birth", "Tempat Lahir"],
  ["birth_of_date", "Tanggal Lahir"],
  ["child_row", "Anak ke"],
  ["total_sibling", "Jumlah Saudara"],
  ["address", "alamat"],
  ["sosial_status", "Status sosial"],
  ["pos_code", "Kode Pos"],
  ["province_id", "Provinsi"],
  ["city_id", "Kota"],
  ["district_id", "Kecamatan"],
  ["village_id", "Kelurahan/Desa"],
  ["education_status", "Status Pendidikan"],
  ["registered_at", "Tahun Masuk"],
  ["finished_at", "Tahun Keluar"],
  ["punishment_count", "Jumlah Hukuman"],
  ["punishment_start", "Tanggal Mulai"],
  ["punishment_end", "Hingga"],
  ["juz_kuran_description", "Juz yang telah dihafal"],
  ["chapter_kuran_description", "Surat yang telah dihafal"],
  ["hadist_description", "Hadis yang telah di hafal"],
  ["education_description", "Catatan tambahan"],
  ["parent_status", "Status orang tua"],
  ["father_name", "Nama Ayah"],
  ["place_of_birth_father", "Tempat lahir Ayah"],
  ["birth_of_date_father", "Tanggal lahir Ayah"],
  ["father_occupation", "Pekerjaan Ayah"],
  ["father_phone", "No. HP Ayah"],
  ["father_status", "Status Ayah"],
  ["mother_name", "Nama Ibu"],
  ["place_of_birth_mother", "Tempat lahir Ibu"],
  ["birth_of_date_mother", "Tanggal lahir Ibu"],
  ["mother_occupation", "Pekerjaan Ibu"],
  ["mother_phone", "No. HP Ibu"],
  ["mother_status", "Status Ibu"],
];

export const StudentInfo = [
  ["identity_number", "NIS"],
  ["school_id", "Asal Unit"],
  ["name", "Nama Siswa"],
  ["age", "Usia"],
  ["place_of_birth", "Tempat Lahir"],
  ["birth_of_date", "Tanggal Lahir"],
  ["child_row", "Anak ke"],
  ["total_sibling", "Jumlah Saudara"],
  ["address", "alamat"],
  ["sosial_status", "Status sosial"],
  ["pos_code", "Kode Pos"],
  ["province_id", "Provinsi"],
  ["city_id", "Kota"],
  ["district_id", "Kecamatan"],
  ["village_id", "Kelurahan/Desa"],
]

export const EducationInfo = [
  ["education_status", "Status Pendidikan"],
  ["registered_at", "Tahun Masuk"],
  ["finished_at", "Tahun Keluar"],
  ["punishment_count", "Jumlah Hukuman"],
  ["punishment_start", "Tanggal Mulai"],
  ["punishment_end", "Hingga"],
  ["juz_kuran_description", "Juz yang telah dihafal"],
  ["chapter_kuran_description", "Surat yang telah dihafal"],
  ["hadist_description", "Hadis yang telah di hafal"],
  ["education_description", "Catatan tambahan"],
]

export const ParentInfo = [
  ["parent_status", "Status orang tua"],
  ["father_name", "Nama Ayah"],
  ["place_of_birth_father", "Tempat lahir Ayah"],
  ["birth_of_date_father", "Tanggal lahir Ayah"],
  ["father_occupation", "Pekerjaan Ayah"],
  ["father_phone", "No. HP Ayah"],
  ["father_status", "Status Ayah"],
  ["mother_name", "Nama Ibu"],
  ["place_of_birth_mother", "Tempat lahir Ibu"],
  ["birth_of_date_mother", "Tanggal lahir Ibu"],
  ["mother_occupation", "Pekerjaan Ibu"],
  ["mother_phone", "No. HP Ibu"],
  ["mother_status", "Status Ibu"],
]

export const nonSortAbleStudentDataTable = [
  'child_row',
  'total_sibling',
  'juz_kuran_description',
  'chapter_quran_description',
  'hadist_description',
  'father_occupation',
  'mother_occupation',
  'father_phone',
  'mother_phone'
]


export const age = [
  [7, 7],
  [8, 8],
  [9, 9],
  [10, 10],
  [11, 11],
  [12, 12],
  [13, 13],
  [14, 14],
  [15, 15],
  [16, 16],
  [17, 17],
  [18, 18],
  [19, 19],
  [20, 20],
  [21, 21],
];

export const UserDataColumnsTable = [
  ["name", "Nama Personel"],
  ["username", "Username"],
  ["email", "Alamat Surel"],
  ["role", "Role"],
  ["school", "Asal Unit"],
  ["created_at", "Created"],
  ["updated_at", "Last Updated"],
  ["last_login", "Last Login"],
  ["status", "Status"],
];

export const SchoolDataColumnsTable = [
  ["id", "No Id"],
  ["name", "Nama Ma'had"],
  ["address", "Alamat"],
  ["province_name", "Provinsi"],
  ["regency_name", "Kota"],
  ["phone", "Nomor Telp."],
  ["head_master", "Nama pimpinan"],
  ["total_teacher", "Jumlah Ust"],
  ["total_student", "Jumlah Siswa"],
];



export const EmployeeDataTable = [
  ["id", "No ID Pegawai"],
  ["name", "Nama Lengkap"],
  ["address", "Alamat"],
  ["province_id", "Provinsi"],
  ["regency_id", "Kota"],
  ["pos_code", "Kode Pos"],
  ["place_of_birth", "Tempat Lahir"],
  ["birth_of_date", "Tanggal lahir"],
  ["phone", "No HP"],
  ["email", "Alamat Surel"],
  ["school_id", "Asal Unit"],
  ["status", "Status"],
  ["registered_year", "Tahun Masuk"],
];

export const nonSoratAbleEmployeeDataTable = [
  'email',
  'pos_code',
  'phone'
]


export const CashCategories = [
  [1, "TUNAI"],
  [2, "NON TUNAI - MUAMALAT"],
  [3, "NON TUNAI - MANDIRI"],
  [4, "NON TUNAI - BSM"],
  [5, "NON TUNAI - BRI SYARIAH"],
  [6, "NON TUNAI - BNI SYARIAH LAMP"],
  [7, "NON TUNAI - BNI SY"],
  [8, "NON TUNAI - BCA"],
];

export const GoodsCategories = [
  [1, "Aset Tidak Bergerak"],
  [2, "Aset Bergerak"],
  [3, "Makanan / Minuman"],
  [4, "Bentuk Lainnya"],
  [5, 'Hewan Kurban']

];

export const GoodsStatus = [
  [0, "-"],
  [1, "Diterima Petugas"],
  [2, "Konfirmasi Donatur Untuk Pengiriman"],
  [3, "Perlu Pemeriksaan Lanjutan"],
  [4, "Dokumen / Atribut Barang Masih Kurang"],
];

export const DonationTableColumns = [
  ["id", "ID Transaksi"],
  ["created_at", "Tanggal Transaksi"],
  ["donor_id", "Nama Donatur"],
  ["donor_category", "Kategori Donatur"],
  ["division_id", "Kategori Sumber"],
  ["category_id", "Jenis Donasi"],
  ["item_type", "Bentuk"],
  ["description", "Deskripsi Donasi"],
  ["total", "Jumlah"],
  ["ref_number", "No Ref"],
  ["item_id", "Tunai / Non Tunai"],
  ["status", "Status"],
  ["kwitansi", "No Kwitansi"],
  ["phone", "No HP"],
  ["regency", "Kota"],
  ["school_id", "Unit"],
  ["good_description", "Deskripsi Barang"],
  ["quantity_good", "Jumlah Barang"],
  ["good_status", "Status Barang"],
];

export const statement_category = [
  [1, "Program Sosial"],
  [2, "Program Eknonomi"],
  [3, "Program Sosial"],
  [4, "Program Lingkungan"],
  [5, "Perdagangan"],
  [6, "Penghasilan"],
  [7, "Emas dan Perak"],
  [8, "Simpanan"],
  [9, "Masukan Jumlah Orang"],
  [10, "Wakaf Masjid"],
  [11, "Aset Produktif"],
  [12, "Wakaf Pendidikan"],
  [13, "Wakaf Kesehatan"],
  [14, "Wakaf Ekonomi"],
];

export const donatur_category = [[0, "Perorangan"], [1, "Perusahaan"]];


export const Division =  [
  [1, 'UPZ'],
  [2, 'RETAIL'],
  [3, 'CORPORATE']
]


export const PaymentTypeFilter = [
  [1, 'TUNAI'],
  [2, 'NON TUNAI']
]