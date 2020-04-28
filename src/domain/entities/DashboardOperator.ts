export class DashboardOperatorData {
  public total: number;
  public totalRowCount: number;
  public totalRowDonorCount: number;
  public totalRowNewDonorCount: number;
  public totalZakatMaal: number;
  public totalWakaf: number;
  public totalZakatFitrah: number;
  public totalInfaq: number;
  public totalKurban: number;
  public totalOther: number;
  public totalTransactionLastYear?: TotalTransactionLastYearData;
  constructor(
    total: number,
    totalRowCount: number,
    totalRowDonorCount: number,
    totalRowNewDonorCount: number,
    totalZakatMaal: number,
    totalWakaf: number,
    totalZakatFitrah: number,
    totalInfaq: number,
    totalKurban: number,
    totalOther: number,
    totalTransactionLastYear?: TotalTransactionLastYearData
  ) {
    this.total = total;
    this.totalRowCount = totalRowCount;
    this.totalRowDonorCount = totalRowDonorCount;
    this.totalRowNewDonorCount = totalRowNewDonorCount;
    this.totalZakatMaal = totalZakatMaal;
    this.totalWakaf = totalWakaf;
    this.totalZakatFitrah = totalZakatFitrah;
    this.totalInfaq = totalInfaq;
    this.totalKurban = totalKurban;
    this.totalOther = totalOther;
    this.totalTransactionLastYear = totalTransactionLastYear
  }
}

export class TotalTransactionLastYearData {
  public totalUp: number;
  public totalDown: number;
  public countUp: number;
  public countDown: number;
  public donorUp: number;
  public donorDown: number;
  public newDonorUp: number;
  public newDonorDown: number;
  constructor(
    totalUp: number,
    totalDown: number,
    countUp: number,
    countDown: number,
    donorUp: number,
    donorDown: number,
    newDonorUp: number,
    newDonorDown: number
  ) {
    this.totalUp = totalUp;
    this.totalDown = totalDown;
    this.countUp = countUp;
    this.countDown = countDown;
    this.donorUp = donorUp;
    this.donorDown = donorDown;
    this.newDonorUp = newDonorUp;
    this.newDonorDown = newDonorDown;
  }
}

export class ZiswafPersentData {
  public zakatMaalPersent: number;
  public zakatFitrahPersent: number;
  public infaqPersent: number;
  public waqafPersent: number;
  public qurbanPersent: number;
  public otherPersent: number;
  constructor(
    zakatMaalPersent: number,
    zakatFitrahPersent: number,
    infaqPersent: number,
    waqafPersent: number,
    qurbanPersent: number,
    otherPersent: number,
  ) {
    this.zakatMaalPersent = zakatMaalPersent;
    this.zakatFitrahPersent = zakatFitrahPersent;
    this.infaqPersent = infaqPersent;
    this.waqafPersent = waqafPersent;
    this.qurbanPersent = qurbanPersent;
    this.otherPersent = otherPersent;
  }
}

export class TotalPercentageData {
  public percentUpz
  public percentRetail
  public percentCorporate
  constructor(
    percentUpz: number,
    percentRetail: number,
    percentCorporate: number,
  ) {
    this.percentUpz = percentUpz
    this.percentRetail = percentRetail
    this.percentCorporate = percentCorporate
  }
}
export class CommonReportData {
  public total: number
  public total_row_count: number
  public total_row_donor_count: number
  public total_zakat_maal: number
  public total_wakaf: number
  public total_zakat_fitrah: number
  public total_infaq: number
  public total_kurban: number
  public total_other: number
  public total_company_donor: number
  public total_person_donor: number
  public total_company_donor_row_count: number
  public total_person_donor_row_count: number
  public total_percent_company_donor: number
  public total_percent_person_donor: number
  public total_retail: number
  public total_corporate: number
  public total_upz: number
  public total_division_percentage: TotalPercentageData;
  public total_ziswaf_percent?: ZiswafPersentData

  constructor(
    total: number,
    total_row_count: number,
    total_row_donor_count: number,
    total_zakat_maal: number,
    total_wakaf: number,
    total_zakat_fitrah: number,
    total_infaq: number,
    total_kurban: number,
    total_other: number,
    total_company_donor: number,
    total_person_donor: number,
    total_company_donor_row_count: number,
    total_person_donor_row_count: number,
    total_percent_company_donor: number,
    total_percent_person_donor: number,
    total_retail: number,
    total_corporate: number,
    total_upz: number,
    total_division_percentage: TotalPercentageData,
    total_ziswaf_percent: ZiswafPersentData,
  ) {
    this.total = total
    this.total_row_count = total_row_count
    this.total_row_donor_count = total_row_donor_count
    this.total_zakat_maal = total_zakat_maal
    this.total_wakaf = total_wakaf
    this.total_zakat_fitrah = total_zakat_fitrah
    this.total_infaq = total_infaq
    this.total_kurban = total_kurban
    this.total_other = total_other
    this.total_company_donor = total_company_donor
    this.total_person_donor = total_person_donor
    this.total_company_donor_row_count = total_company_donor_row_count
    this.total_person_donor_row_count = total_person_donor_row_count
    this.total_percent_company_donor = total_percent_company_donor
    this.total_percent_person_donor = total_percent_person_donor
    this.total_retail = total_retail
    this.total_corporate = total_corporate
    this.total_upz = total_upz
    this.total_division_percentage = total_division_percentage
    this.total_ziswaf_percent = total_ziswaf_percent
  }
}
export class UpzDivision {
  public total: number;
  constructor(total: number) {
    this.total = total;
  }
}

export class RetailDivision {
  public total: number;
  constructor(total: number) {
    this.total = total;
  }
}

export class CorporateDivision {
  public total: number;
  constructor(total: number) {
    this.total = total;
  }
}

export class DivisionReportData {
  public totalOperator: number
  public total_percent_retailDivision: number
  public total_percent_corporateDivision: number
  public total_percent_upzDivision: number
  public total_ritel_zakat_maalDivision: number
  public total_ritel_wakafDivision: number
  public total_ritel_zakat_fitrahDivision: number
  public total_ritel_infaqDivision: number
  public total_ritel_kurbanDivision: number
  public total_ritel_otherDivision: number
  public total_corporate_zakat_maalDivision: number
  public total_corporate_wakafDivision: number
  public total_corporate_zakat_fitrahDivision: number
  public total_corporate_infaqDivision: number
  public total_corporate_kurbanDivision: number
  public total_corporate_otherDivision: number
  public total_upz_zakat_maalDivision: number
  public total_upz_wakafDivision: number
  public total_upz_zakat_fitrahDivision: number
  public total_upz_infaqDivision: number
  public total_upz_kurbanDivision: number
  public total_upz_otherDivision: number
  public total_retail_per_dayDivision?: RetailDivision[]
  public total_corporate_per_day?: CorporateDivision[]
  public total_upz_per_dayDivision?: UpzDivision[]
  constructor(
    totalOperator: number,
    total_percent_retailDivision: number,
    total_percent_corporateDivision: number,
    total_percent_upzDivision: number,
    total_ritel_zakat_maalDivision: number,
    total_ritel_wakafDivision: number,
    total_ritel_zakat_fitrahDivision: number,
    total_ritel_infaqDivision: number,
    total_ritel_kurbanDivision: number,
    total_ritel_otherDivision: number,
    total_corporate_zakat_maalDivision: number,
    total_corporate_wakafDivision: number,
    total_corporate_zakat_fitrahDivision: number,
    total_corporate_infaqDivision: number,
    total_corporate_kurbanDivision: number,
    total_corporate_otherDivision: number,
    total_upz_zakat_maalDivision: number,
    total_upz_wakafDivision: number,
    total_upz_zakat_fitrahDivision: number,
    total_upz_infaqDivision: number,
    total_upz_kurbanDivision: number,
    total_upz_otherDivision: number,
    total_upz_per_dayDivision?: UpzDivision[],
    total_retail_per_dayDivision?: RetailDivision[],
    total_corporate_per_day?: CorporateDivision[],
  ) {
    this.totalOperator = totalOperator
    this.total_percent_retailDivision = total_percent_retailDivision
    this.total_percent_corporateDivision = total_percent_corporateDivision
    this.total_percent_upzDivision = total_percent_upzDivision
    this.total_ritel_zakat_maalDivision = total_ritel_zakat_maalDivision
    this.total_ritel_wakafDivision = total_ritel_wakafDivision
    this.total_ritel_zakat_fitrahDivision = total_ritel_zakat_fitrahDivision
    this.total_ritel_infaqDivision = total_ritel_infaqDivision
    this.total_ritel_kurbanDivision = total_ritel_kurbanDivision
    this.total_ritel_otherDivision = total_ritel_otherDivision
    this.total_corporate_zakat_maalDivision = total_corporate_zakat_maalDivision
    this.total_corporate_wakafDivision = total_corporate_wakafDivision
    this.total_corporate_zakat_fitrahDivision = total_corporate_zakat_fitrahDivision
    this.total_corporate_infaqDivision = total_corporate_infaqDivision
    this.total_corporate_kurbanDivision = total_corporate_kurbanDivision
    this.total_corporate_otherDivision = total_corporate_otherDivision
    this.total_upz_zakat_maalDivision = total_upz_zakat_maalDivision
    this.total_upz_wakafDivision = total_upz_wakafDivision
    this.total_upz_zakat_fitrahDivision = total_upz_zakat_fitrahDivision
    this.total_upz_infaqDivision = total_upz_infaqDivision
    this.total_upz_kurbanDivision = total_upz_kurbanDivision
    this.total_upz_otherDivision = total_upz_otherDivision
    this.total_upz_per_dayDivision = total_upz_per_dayDivision
    this.total_retail_per_dayDivision = total_retail_per_dayDivision
    this.total_corporate_per_day = total_corporate_per_day
  }
}

export class PercentData {
  public cash_percent: number
  public non_cash_muamalat_percent: number
  public non_cash_mandiri_percent: number
  public non_cash_bsm_percent: number
  public non_cash_bri_percent: number
  public non_cash_bni_lamp_percent: number
  public non_cash_bni_sy_percent: number
  public non_cash_bca_percent: number
  constructor(
    cash_percent: number,
    non_cash_muamalat_percent: number,
    non_cash_mandiri_percent: number,
    non_cash_bsm_percent: number,
    non_cash_bri_percent: number,
    non_cash_bni_lamp_percent: number,
    non_cash_bni_sy_percent: number,
    non_cash_bca_percent: number,
  ) {
    this.cash_percent = cash_percent
    this.non_cash_muamalat_percent = non_cash_muamalat_percent
    this.non_cash_mandiri_percent = non_cash_mandiri_percent
    this.non_cash_bsm_percent = non_cash_bsm_percent
    this.non_cash_bri_percent = non_cash_bri_percent
    this.non_cash_bni_lamp_percent = non_cash_bni_lamp_percent
    this.non_cash_bni_sy_percent = non_cash_bni_sy_percent
    this.non_cash_bca_percent = non_cash_bca_percent
  }
}

export class NominalReportData {
  public total_good: number
  public total_good_count: number
  public total_good_collect: number
  public total_good_move_count: number
  public total_good_not_move_count: number
  public total_good_food_count: number
  public total_good_other_count: number
  public total_all_cash: number
  public total_cash_count: number
  public total_cash: number
  public total_non_cash_muamalat: number
  public total_non_cash_mandiri: number
  public total_non_cash_bsm: number
  public total_non_cash_bri: number
  public total_non_cash_bni_lamp: number
  public total_non_cash_bni_sy: number
  public total_non_cash_bca: number
  public total_cash_percent: PercentData
    constructor(
      total_good: number,
      total_good_count: number,
      total_good_collect: number,
      total_good_move_count: number,
      total_good_not_move_count: number,
      total_good_food_count: number,
      total_good_other_count: number,
      total_all_cash: number,
      total_cash_count: number,
      total_cash: number,
      total_non_cash_muamalat: number,
      total_non_cash_mandiri: number,
      total_non_cash_bsm: number,
      total_non_cash_bri: number,
      total_non_cash_bni_lamp: number,
      total_non_cash_bni_sy: number,
      total_non_cash_bca: number,
      total_cash_percent: PercentData
    ) {
      this.total_good = total_good
      this.total_good_count = total_good_count
      this.total_good_collect = total_good_collect
      this.total_good_move_count = total_good_move_count
      this.total_good_not_move_count = total_good_not_move_count
      this.total_good_food_count = total_good_food_count
      this.total_good_other_count = total_good_other_count
      this.total_all_cash = total_all_cash
      this.total_cash_count = total_cash_count
      this.total_cash = total_cash
      this.total_non_cash_muamalat = total_non_cash_muamalat
      this.total_non_cash_mandiri = total_non_cash_mandiri
      this.total_non_cash_bsm = total_non_cash_bsm
      this.total_non_cash_bri = total_non_cash_bri
      this.total_non_cash_bni_lamp = total_non_cash_bni_lamp
      this.total_non_cash_bni_sy = total_non_cash_bni_sy
      this.total_non_cash_bca = total_non_cash_bca
      this.total_cash_percent= total_cash_percent
    }
}

export class TotalZiswafPerDay {
  public total: number;
  constructor(total: number) {
    this.total = total;
  }
}

export class ZakatMaalData {
  public total: number;
  constructor(total: number) {
    this.total = total;
  }
}

export class ZakatFitrahData {
  public total: number;
  constructor(total: number) {
    this.total = total;
  }
}

export class InfaqData {
  public total: number;
  constructor(total: number) {
    this.total = total;
  }
}

export class WakafData {
  public total: number;
  constructor(total: number) {
    this.total = total;
  }
}

export class OtherData {
  public total: number;
  constructor(total: number) {
    this.total = total;
  }
}

export class KurbanData {
  public total: number;
  constructor(total: number) {
    this.total = total;
  }
}

export class DashboardData {
  public dashboardOperator?: DashboardOperatorData;
  public commonReport?: CommonReportData
  public divisionReport?: DivisionReportData
  public nominalReport?: NominalReportData
  public totalZiswafPerDay?: TotalZiswafPerDay[]
  public zakatMaalPerDay?: ZakatMaalData[];
  public zakatFitrahPerDay?: ZakatFitrahData[];
  public infaqPerDay?: InfaqData[];
  public wakafPerDay?: WakafData[];
  public otherPerDay?: OtherData[];
  public kurbanPerDay?: KurbanData[];
  constructor(
    dashboardOperator?: DashboardOperatorData,
    commonReport?: CommonReportData,
    divisionReport?: DivisionReportData,
    nominalReport?: NominalReportData,
    totalZiswafPerDay?: TotalZiswafPerDay[],
    zakatMaalPerDay?: ZakatMaalData[],
    zakatFitrahPerDay?: ZakatFitrahData[],
    infaqPerDay?: InfaqData[],
    wakafPerDay?: WakafData[],
    otherPerDay?: OtherData[],
    kurbanPerDay?: KurbanData[]
  ) {
    this.dashboardOperator = dashboardOperator;
    this.commonReport = commonReport;
    this.divisionReport = divisionReport;
    this.nominalReport = nominalReport;
    this.totalZiswafPerDay = totalZiswafPerDay;
    this.zakatMaalPerDay = zakatMaalPerDay;
    this.zakatFitrahPerDay = zakatFitrahPerDay;
    this.infaqPerDay = infaqPerDay;
    this.wakafPerDay = wakafPerDay;
    this.otherPerDay = otherPerDay;
    this.kurbanPerDay = kurbanPerDay;
  }
}

export class DashboardOperator {
  public success: boolean;
  public message: string;
  public data?: DashboardData;
  constructor(success: boolean, message: string, data?: DashboardData) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
