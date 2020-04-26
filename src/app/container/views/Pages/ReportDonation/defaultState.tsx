const defaultState = {
  reportStep: "filter",
  dateSelected: {
    start_date: "",
    end_date: "",
  },
  unitSelected: [],
  citySelected: [],
  donaturSelected: [],
  categorySourceSelected: [],
  donationTypeSelected: [],
  categoryDonationSelected: [],
  fundSourceSelected: [],
  // Unit ma'had Data
  unitData: [],
  unitDataLoading: false,
  // City data
  cityData: [],
  cityDataLoading: false,
  isCityFetching: false,

  donaturData: [
    { name: 2, label: "Semua" },
    { name: 0, label: "Perorangan" },
    { name: 1, label: "Corporate" },
  ],
  categorySourceData: [
    { name: 0, label: "Semua" },
    { name: 1, label: "UPZ" },
    { name: 2, label: "Retail" },
    { name: 3, label: "Corporate" },
  ],
  donationTypeData: [
    { name: 0, label: "Semua" },
    { name: 1, label: "Zakat Fitrah" },
    { name: 2, label: "Zakat Maal" },
    { name: 3, label: "Infaq / Sedekah" },
    { name: 4, label: "Wakaf" },
    { name: 5, label: "Qurban" },
    { name: 6, label: "Penerimaan Lainnya" },
  ],

  // Category donation
  categoryDonationData: [],
  categoryDonationDataLoading: false,

  fundSourceData: [
    { name: 0, label: "Semua" },
    { name: 1, label: "Tunai" },
    { name: 2, label: "NON TUNAI - MUAMALAT" },
    { name: 3, label: "NON TUNAI - MANDIRI" },
    { name: 4, label: "NON TUNAI - BSM" },
    { name: 5, label: "NON TUNAI - BRI SYARIAH" },
    { name: 6, label: "NON TUNAI - BNI SY LAMP" },
    { name: 7, label: "NON TUNAI - BNI SY" },
    { name: 8, label: "NON TUNAI - BCA" },
  ],
  fundSourceDataLoading: false,
  handleMultiSelectedFilter: () => {},
  handleSetState: () => {},
  handleClearFilter: () => {},
  handleCreateReport: () => {},
  isLoadingFetchReport: false,
  statementReportData: [],
  statementReportTotal: {
    total: 0,
    total_row_count: 0,
    donation_report: []
  },
  modalFilter: false,
  handleModalFilter: () => {}
};

export default defaultState;
