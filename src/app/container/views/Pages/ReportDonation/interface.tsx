export interface ReportDonationInterface  {
    reportStep: string,
    dateSelected: object,
    unitSelected: Array<object>,
    citySelected: Array<object>,
    donaturSelected: Array<object>,
    categorySourceSelected: Array<object>,
    donationTypeSelected: Array<object>,
    categoryDonationSelected: Array<object>,
    fundSourceSelected: Array<object>,
    // Unit ma'had Data
    unitData: Array<object>,
    unitDataLoading: boolean,
    // City data
    cityData: Array<object>,
    cityDataLoading: boolean,
    isCityFetching: boolean,
    
    donaturData: Array<object>,
    categorySourceData: Array<object>,
    donationTypeData: Array<object>,

    // Category donation
    categoryDonationData: Array<object>,
    categoryDonationDataLoading: boolean,

    fundSourceData: Array<object>,
    fundSourceDataLoading: boolean,

    handleMultiSelectedFilter: Function,
    handleSetState: Function,
    handleClearFilter: Function,
    handleCreateReport: Function,

    isLoadingFetchReport: boolean,
    statementReportData: Array<object>,
    statementReportTotal: object,
    modalFilter: boolean,
    handleModalFilter: Function,
}