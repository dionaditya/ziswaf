import { AxiosResponse } from "axios";
import { isEmpty } from 'lodash';

import {
  DashboardAdmin,
  DashboardAdminData,
  DashboardData,
  CommonReportData,
  DivisionReportData,
  NominalReportData,
  PrognosisUPZData,
  PrognosisRetailData,
  PrognosisCorporateData,
  UpzPerMonthData,
  RetailPerMonthData,
  CorporatePerMonthData,
  PrognosisPerMonthData,
  TransactionPerMonthData,
  ZakatMaalData,
  ZakatFitrahData,
  WakafData,
  InfaqData,
  KurbanData,
  OtherData,
  TotalTransactionLastYearData,
  ZiswafPersentData,
  ZiswafTotalData,
  TotalPercentageData,
  StatementReportData,
  StatementReportSubData,
} from "@/domain/entities/DashboardAdmin";
import { singleton } from "tsyringe";
import { PercentData } from '@/domain/entities/DashboardOperator';

@singleton()
export class DashboardMapper {
  public convertDashboardAdminFromApi(
    result: AxiosResponse<any>
  ): DashboardAdmin {
    const item = result.data;
    return new DashboardAdmin(
      item.success,
      item.message,
      new DashboardData(
        new DashboardAdminData(
          item.data.dashboard_admin.total,
          item.data.dashboard_admin.total_row_count,
          item.data.dashboard_admin.total_row_donor_count,
          item.data.dashboard_admin.total_row_new_donor_count,
          item.data.dashboard_admin.total_zakat_maal,
          item.data.dashboard_admin.total_wakaf,
          item.data.dashboard_admin.total_zakat_fitrah,
          item.data.dashboard_admin.total_infaq,
          item.data.dashboard_admin.total_kurban,
          item.data.dashboard_admin.total_other,
          item.data.dashboard_admin.total_retail,
          item.data.dashboard_admin.total_retail_row_count,
          item.data.dashboard_admin.total_corporate,
          item.data.dashboard_admin.total_corporate_row_count,
          item.data.dashboard_admin.total_upz,
          item.data.dashboard_admin.total_upz_row_count,
          item.data.dashboard_admin.total_prognosis_retail,
          item.data.dashboard_admin.total_prognosis_corporate,
          item.data.dashboard_admin.total_prognosis_upz,
          item.data.dashboard_admin.total_percent_retail,
          item.data.dashboard_admin.total_percent_corporate,
          item.data.dashboard_admin.total_percent_upz,
          new TotalTransactionLastYearData(
            item.data.dashboard_admin.total_transaction_last_year.total_up,
            item.data.dashboard_admin.total_transaction_last_year.total_down,
            item.data.dashboard_admin.total_transaction_last_year.count_up,
            item.data.dashboard_admin.total_transaction_last_year.count_down,
            item.data.dashboard_admin.total_transaction_last_year.donor_up,
            item.data.dashboard_admin.total_transaction_last_year.donor_down,
            item.data.dashboard_admin.total_transaction_last_year.new_donor_up,
            item.data.dashboard_admin.total_transaction_last_year.new_donor_down,
          ),
          item.data.dashboard_admin.total_ziswaf_per_month.month.map(
            (data) => new ZiswafTotalData(data.total)
          ),
          item.data.dashboard_admin.total_zakat_maal_per_month.month.map(
            (data) => new ZakatMaalData(data.total)
          ),
          item.data.dashboard_admin.total_zakat_fitrah_per_month.month.map(
            (data) => new ZakatFitrahData(data.total)
          ),
       
          item.data.dashboard_admin.total_Infaq_per_month.month.map(
            (data) => new InfaqData(data.total)
          ),
          item.data.dashboard_admin.total_wakaf_per_month.month.map(
            (data) => new WakafData(data.total)
          ),
          item.data.dashboard_admin.total_other_per_month.month.map(
            (data) => new OtherData(data.total)
          ),
          item.data.dashboard_admin.total_qurban_per_month.month.map(
            (data) => new KurbanData(data.total)
          ),
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
          item.data.common_report.total_retail,
          item.data.common_report.total_company_donor,
          item.data.common_report.total_corporate,
          item.data.common_report.total_person_donor,
          item.data.common_report.total_upz,
          item.data.common_report.total_company_donor_row_count,
          item.data.common_report.total_person_donor_row_count,
          item.data.common_report.total_percent_company_donor,
          item.data.common_report.total_percent_person_donor,
          new TotalPercentageData(
            item.data.common_report.total_division_percent.total_division_upz_percent,
            item.data.common_report.total_division_percent.total_division_retail_percent,
            item.data.common_report.total_division_percent.total_division_corporate_percent,
          ),
          new ZiswafPersentData(
            item.data.common_report.total_ziswaf_percent.zakat_maal_percent,
            item.data.common_report.total_ziswaf_percent.zakat_fitrah_percent,
            item.data.common_report.total_ziswaf_percent.infaq_percent,
            item.data.common_report.total_ziswaf_percent.waqaf_percent,
            item.data.common_report.total_ziswaf_percent.qurban_percent,
            item.data.common_report.total_ziswaf_percent.other_percent,
          ),
          new PrognosisPerMonthData(
            item.data.common_report.total_prognosis_per_month.january,
            item.data.common_report.total_prognosis_per_month.february,
            item.data.common_report.total_prognosis_per_month.march,
            item.data.common_report.total_prognosis_per_month.april,
            item.data.common_report.total_prognosis_per_month.may,
            item.data.common_report.total_prognosis_per_month.june,
            item.data.common_report.total_prognosis_per_month.july,
            item.data.common_report.total_prognosis_per_month.august,
            item.data.common_report.total_prognosis_per_month.september,
            item.data.common_report.total_prognosis_per_month.october,
            item.data.common_report.total_prognosis_per_month.november,
            item.data.common_report.total_prognosis_per_month.december
          ),
          new TransactionPerMonthData(
            item.data.common_report.total_transaction_per_month.january,
            item.data.common_report.total_transaction_per_month.february,
            item.data.common_report.total_transaction_per_month.march,
            item.data.common_report.total_transaction_per_month.april,
            item.data.common_report.total_transaction_per_month.may,
            item.data.common_report.total_transaction_per_month.june,
            item.data.common_report.total_transaction_per_month.july,
            item.data.common_report.total_transaction_per_month.august,
            item.data.common_report.total_transaction_per_month.september,
            item.data.common_report.total_transaction_per_month.october,
            item.data.common_report.total_transaction_per_month.november,
            item.data.common_report.total_transaction_per_month.december
          )
        ),
        new DivisionReportData(
          item.data.division_report.total,
          item.data.division_report.total_prognosis_retail,
          item.data.division_report.total_prognosis_corporate,
          item.data.division_report.total_prognosis_upz,
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
          item.data.division_report.total_upz_other
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
          ),
        ),
        new PrognosisUPZData(
          item.data.prognosis_upz.january,
          item.data.prognosis_upz.february,
          item.data.prognosis_upz.march,
          item.data.prognosis_upz.april,
          item.data.prognosis_upz.may,
          item.data.prognosis_upz.june,
          item.data.prognosis_upz.july,
          item.data.prognosis_upz.august,
          item.data.prognosis_upz.september,
          item.data.prognosis_upz.october,
          item.data.prognosis_upz.november,
          item.data.prognosis_upz.december
        ),
        new PrognosisRetailData(
          item.data.prognosis_retail.january,
          item.data.prognosis_retail.february,
          item.data.prognosis_retail.march,
          item.data.prognosis_retail.april,
          item.data.prognosis_retail.may,
          item.data.prognosis_retail.june,
          item.data.prognosis_retail.july,
          item.data.prognosis_retail.august,
          item.data.prognosis_retail.september,
          item.data.prognosis_retail.october,
          item.data.prognosis_retail.november,
          item.data.prognosis_retail.december
        ),
        new PrognosisCorporateData(
          item.data.prognosis_corporate.january,
          item.data.prognosis_corporate.february,
          item.data.prognosis_corporate.march,
          item.data.prognosis_corporate.april,
          item.data.prognosis_corporate.may,
          item.data.prognosis_corporate.june,
          item.data.prognosis_corporate.july,
          item.data.prognosis_corporate.august,
          item.data.prognosis_corporate.september,
          item.data.prognosis_corporate.october,
          item.data.prognosis_corporate.november,
          item.data.prognosis_corporate.december
        ),
        new UpzPerMonthData(
          item.data.upz_per_month.total_upz_january,
          item.data.upz_per_month.total_upz_february,
          item.data.upz_per_month.total_upz_march,
          item.data.upz_per_month.total_upz_april,
          item.data.upz_per_month.total_upz_may,
          item.data.upz_per_month.total_upz_june,
          item.data.upz_per_month.total_upz_july,
          item.data.upz_per_month.total_upz_august,
          item.data.upz_per_month.total_upz_september,
          item.data.upz_per_month.total_upz_october,
          item.data.upz_per_month.total_upz_november,
          item.data.upz_per_month.total_upz_december
        ),
        new RetailPerMonthData(
          item.data.retail_per_month.total_retail_january,
          item.data.retail_per_month.total_retail_february,
          item.data.retail_per_month.total_retail_march,
          item.data.retail_per_month.total_retail_april,
          item.data.retail_per_month.total_retail_may,
          item.data.retail_per_month.total_retail_june,
          item.data.retail_per_month.total_retail_july,
          item.data.retail_per_month.total_retail_august,
          item.data.retail_per_month.total_retail_september,
          item.data.retail_per_month.total_retail_october,
          item.data.retail_per_month.total_retail_november,
          item.data.retail_per_month.total_retail_december
        ),
        new CorporatePerMonthData(
          item.data.corporate_per_month.total_corporate_january,
          item.data.corporate_per_month.total_corporate_february,
          item.data.corporate_per_month.total_corporate_march,
          item.data.corporate_per_month.total_corporate_april,
          item.data.corporate_per_month.total_corporate_may,
          item.data.corporate_per_month.total_corporate_june,
          item.data.corporate_per_month.total_corporate_july,
          item.data.corporate_per_month.total_corporate_august,
          item.data.corporate_per_month.total_corporate_september,
          item.data.corporate_per_month.total_corporate_october,
          item.data.corporate_per_month.total_corporate_november,
          item.data.corporate_per_month.total_corporate_december
        )
      )
    );
  }

  public convertReportDonationApi(result: AxiosResponse<any>): StatementReportData {
        const item = result.data;
        let donationReport = new StatementReportData(
            item.data.total,
            item.data.total_row_count,
        );
        
        let subData = Array<StatementReportSubData>();
        if(!isEmpty(item.data.donation_report)) {
          item.data.donation_report.forEach((sub: any) => {
              subData.push(new StatementReportSubData(
                  sub.statement_category_id,
                      sub.name,
                      sub.total,
                      sub.total_percent,
              ));
          })
        }
        donationReport.donation_report = subData;
        return donationReport;        
}
}
