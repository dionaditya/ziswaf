import { DependencyContainer } from "tsyringe";
import { AuthMapper } from '@/data/persistences/mappers/AuthMapper'
import { CategoryMapper } from '@/data/persistences/mappers/CategoryMapper';
import { DivisionMapper } from '@/data/persistences/mappers/DivisionMapper';
import { DonorMapper } from '@/data/persistences/mappers/DonorMapper';
import { MasterMapper } from '@/data/persistences/mappers/MasterMapper';
import { PrognosisMapper } from '@/data/persistences/mappers/PrognosisMapper';
import { DonationMapper } from '@/data/persistences/mappers/DonationMapper';
import { UserMapper } from '@/data/persistences/mappers/UserMapper';
import { SchoolMapper } from '@/data/persistences/mappers/SchoolMapper';
import { CityMapper } from '@/data/persistences/mappers/CityMapper';
import { ProvinceMapper } from '@/data/persistences/mappers/ProvinceMapper';
import { DistrictMapper } from '@/data/persistences/mappers/DistrictMapper';
import { VillageMapper } from '@/data/persistences/mappers/VillageMapper';
import { StudentMapper } from '@/data/persistences/mappers/StudentMapper';
import { EmployeeMapper } from '@/data/persistences/mappers/EmployeeMapper';
// import { EmployeeMapper } from '@/data/persistences/mappers/EmployeeMapper';
import { DashboardMapper } from '@/data/persistences/mappers/DashboardAdminMapper';
import { DashboardOperatorMapper } from '@/data/persistences/mappers/DashboardOperatorMapper';



export class MapperModule {
  public static init(container: DependencyContainer) {
    container.register<AuthMapper>(AuthMapper, {
      useClass: AuthMapper
    });

    container.register<CategoryMapper>(CategoryMapper, {
      useClass: CategoryMapper
    });

    container.register<DivisionMapper>(DivisionMapper, {
      useClass: DivisionMapper
    });

    container.register<DonorMapper>(DonorMapper, {
      useClass: DonorMapper
    });

    container.register<MasterMapper>(MasterMapper, {
      useClass: MasterMapper
    });

    container.register<PrognosisMapper>(PrognosisMapper, {
      useClass: PrognosisMapper
    });

    container.register<DonationMapper>(DonationMapper, {
      useClass: DonationMapper
    });

    container.register<UserMapper>(UserMapper, {
      useClass: UserMapper
    });

    container.register<SchoolMapper>(SchoolMapper, {
      useClass: SchoolMapper
    });

    container.register<CityMapper>(CityMapper, {
      useClass: CityMapper
    });

    container.register<ProvinceMapper>(ProvinceMapper, {
      useClass: ProvinceMapper
    });

    container.register<DistrictMapper>(DistrictMapper, {
      useClass: DistrictMapper
    });

    container.register<VillageMapper>(VillageMapper, {
      useClass: VillageMapper
    });

    container.register<StudentMapper>(StudentMapper, {
      useClass: StudentMapper
    });

    container.register<EmployeeMapper>(EmployeeMapper, {
      useClass: EmployeeMapper
    });
    
    container.register<DashboardMapper>(DashboardMapper, {
      useClass: DashboardMapper
    });

    container.register<DashboardOperatorMapper>(DashboardOperatorMapper, {
      useClass: DashboardOperatorMapper
    });

  }
}
