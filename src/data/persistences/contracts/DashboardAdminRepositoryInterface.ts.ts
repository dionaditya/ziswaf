import { DashboardAdmin, StatementReportData } from '@/domain/entities/DashboardAdmin'

export interface DashboardAdminRepositoryInterface {
    getAll(params: Object): Promise<DashboardAdmin>
    getReportStatementDonation(params: Object): Promise<StatementReportData>
}
