import { AxiosResponse } from "axios";
import {
  DashboardOperator,
  DashboardOperatorData,
  DashboardData,
  ZakatMaalData,
  ZakatFitrahData,
  InfaqData,
  WakafData,
  OtherData,
  KurbanData,
  TotalZiswafPerDay,
  CommonReportData,
  DivisionReportData,
  NominalReportData,
  ZiswafPersentData,
  UpzDivision,
  RetailDivision,
  CorporateDivision,
  PercentData,
  TotalPercentageData,
  TotalTransactionLastYearData,
} from "@/domain/entities/DashboardOperator";
import { singleton } from "tsyringe";

@singleton()
export class DashboardOperatorMapper {
  public convertDashboardOperatorFromApi(
    result: AxiosResponse<any>
  ): DashboardOperator {
    const item = result.data;
    return new DashboardOperator(
      item.success,
      item.message,
      new DashboardData(
        new DashboardOperatorData(
          item.data.dashboard_operator.total,
          item.data.dashboard_operator.total_row_count,
          item.data.dashboard_operator.total_row_donor_count,
          item.data.dashboard_operator.total_row_new_donor_count,
          item.data.dashboard_operator.total_zakat_maal,
          item.data.dashboard_operator.total_wakaf,
          item.data.dashboard_operator.total_zakat_fitrah,
          item.data.dashboard_operator.total_infaq,
          item.data.dashboard_operator.total_kurban,
          item.data.dashboard_operator.total_other,
          new TotalTransactionLastYearData(
            item.data.dashboard_operator.total_transaction_last_month.total_up,
            item.data.dashboard_operator.total_transaction_last_month.total_down,
            item.data.dashboard_operator.total_transaction_last_month.count_up,
            item.data.dashboard_operator.total_transaction_last_month.count_down,
            item.data.dashboard_operator.total_transaction_last_month.donor_up,
            item.data.dashboard_operator.total_transaction_last_month.donor_down,
            item.data.dashboard_operator.total_transaction_last_month.new_donor_up,
            item.data.dashboard_operator.total_transaction_last_month.new_donor_down,
          )
        ),
        new CommonReportData(
          item.data.common_report.total,
          item.data.common_report.total_row_count,
          item.data.common_report.total_row_donor_count,
          item.data.common_report.total_zakat_maal,
          item.data.common_report.total_wakaf,
          item.data.common_report.total_zakat_fitrah,
          item.data.common_report.total_infaq,
          item.data.common_report.total_kurban,
          item.data.common_report.total_other,
          item.data.common_report.total_company_donor,
          item.data.common_report.total_person_donor,
          item.data.common_report.total_company_donor_row_count,
          item.data.common_report.total_person_donor_row_count,
          item.data.common_report.total_percent_company_donor,
          item.data.common_report.total_percent_person_donor,
          item.data.common_report.total_retail,
          item.data.common_report.total_corporate,
          item.data.common_report.total_upz,
          new TotalPercentageData(
            item.data.common_report.total_division_percent.total_division_upz_percent,
            item.data.common_report.total_division_percent.total_division_retail_percent,
            item.data.common_report.total_division_percent.total_division_corporate_percent
          ),          
          new ZiswafPersentData(
            item.data.common_report.total_ziswaf_percent.zakat_maal_percent,
            item.data.common_report.total_ziswaf_percent.zakat_fitrah_percent,
            item.data.common_report.total_ziswaf_percent.infaq_percent,
            item.data.common_report.total_ziswaf_percent.waqaf_percent,
            item.data.common_report.total_ziswaf_percent.qurban_percent,
            item.data.common_report.total_ziswaf_percent.other_percent
          )
        ),
        new DivisionReportData(
          item.data.division_report.total,
          item.data.division_report.total_percent_retail,
          item.data.division_report.total_percent_corporate,
          item.data.division_report.total_percent_upz,
          item.data.division_report.total_ritel_zakat_maal,
          item.data.division_report.total_ritel_wakaf,
          item.data.division_report.total_ritel_zakat_fitrah,
          item.data.division_report.total_ritel_infaq,
          item.data.division_report.total_ritel_kurban,
          item.data.division_report.total_ritel_other,
          item.data.division_report.total_corporate_zakat_maal,
          item.data.division_report.total_corporate_wakaf,
          item.data.division_report.total_corporate_zakat_fitrah,
          item.data.division_report.total_corporate_infaq,
          item.data.division_report.total_corporate_kurban,
          item.data.division_report.total_corporate_other,
          item.data.division_report.total_upz_zakat_maal,
          item.data.division_report.total_upz_wakaf,
          item.data.division_report.total_upz_zakat_fitrah,
          item.data.division_report.total_upz_infaq,
          item.data.division_report.total_upz_kurban,
          item.data.division_report.total_upz_other,
          item.data.division_report.total_upz_per_day.day.map(
            (data) => new UpzDivision(data.total)
          ),
          item.data.division_report.total_retail_per_day.day.map(
            (data) => new RetailDivision(data.total)
          ),
          item.data.division_report.total_corporate_per_day.day.map(
            (data) => new CorporateDivision(data.total)
          )
        ),
        new NominalReportData(
          item.data.nominal_report.total_good,
          item.data.nominal_report.total_good_count,
          item.data.nominal_report.total_good_collect,
          item.data.nominal_report.total_good_move_count,
          item.data.nominal_report.total_good_not_move_count,
          item.data.nominal_report.total_good_food_count,
          item.data.nominal_report.total_good_other_count,
          item.data.nominal_report.total_all_cash,
          item.data.nominal_report.total_cash_count,
          item.data.nominal_report.total_cash,
          item.data.nominal_report.total_non_cash_muamalat,
          item.data.nominal_report.total_non_cash_mandiri,
          item.data.nominal_report.total_non_cash_bsm,
          item.data.nominal_report.total_non_cash_bri,
          item.data.nominal_report.total_non_cash_bni_lamp,
          item.data.nominal_report.total_non_cash_bni_sy,
          item.data.nominal_report.total_non_cash_bca,
          new PercentData(
            item.data.nominal_report.total_cash_percent.cash_percent,
            item.data.nominal_report.total_cash_percent.non_cash_muamalat_percent,
            item.data.nominal_report.total_cash_percent.non_cash_mandiri_percent,
            item.data.nominal_report.total_cash_percent.non_cash_bsm_percent,
            item.data.nominal_report.total_cash_percent.non_cash_bri_percent,
            item.data.nominal_report.total_cash_percent.non_cash_bni_lamp_percent,
            item.data.nominal_report.total_cash_percent.non_cash_bni_sy_percent,
            item.data.nominal_report.total_cash_percent.non_cash_bca_percent,
          )
        ),
        item.data.total_ziswaf_per_day.day.map(
          (data) => new TotalZiswafPerDay(data.total)
        ),
        item.data.total_zakat_maal_per_day.day.map(
          (data) => new ZakatMaalData(data.total)
        ),
        item.data.total_zakat_fitrah_per_day.day.map(
          (data) => new ZakatFitrahData(data.total)
        ),
        item.data.total_infaq_per_day.day.map(
          (data) => new InfaqData(data.total)
        ),
        item.data.total_wakaf_per_day.day.map(
          (data) => new WakafData(data.total)
        ),
        item.data.total_other_per_day.day.map(
          (data) => new OtherData(data.total)
        ),
        item.data.total_qurban_per_day.day.map(
          (data) => new KurbanData(data.total)
        )
      )
    );
  }
}
