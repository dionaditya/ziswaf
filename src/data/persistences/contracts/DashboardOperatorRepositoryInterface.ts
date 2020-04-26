import { DashboardOperator } from '@/domain/entities/DashboardOperator'

export interface DashboardOperatorRepositoryInterface {
    getAllData(params: object): Promise<DashboardOperator>
}
