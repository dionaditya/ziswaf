import { DependencyContainer } from "tsyringe";
import { Endpoints } from "../misc/EndPoints";
import { AuthMapper } from '@/data/persistences/mappers/AuthMapper'
import ApiService from "../services/ApiServices";
import { AuthApiRepository } from '@/app/infrastructures/repositories/api/AuthApiRepository';
import { CategoryApiRepository } from '../repositories/api/CategoryApiRepository';
import { CategoryMapper } from '@/data/persistences/mappers/CategoryMapper';
import { DivisionApiRepository } from '../repositories/api/DivisionApiRepository';
import { DivisionMapper } from '@/data/persistences/mappers/DivisionMapper';
import { DonorApiRepository } from '../repositories/api/DonorApiRepository';
import { DonorMapper } from '@/data/persistences/mappers/DonorMapper';
import { MasterApiRepository } from '../repositories/api/MasterApiRepository';
import { MasterMapper } from '@/data/persistences/mappers/MasterMapper';
import { PrognosisApiRepository } from '../repositories/api/PrognosisApiRepository';
import { PrognosisMapper } from '@/data/persistences/mappers/PrognosisMapper';
import { DonationApiRepository } from '../repositories/api/DonationApiRepository';
import { DonationMapper } from '@/data/persistences/mappers/DonationMapper';
import { SchoolApiRepository } from '../repositories/api/SchoolApiRepository';
import { SchoolMapper } from '@/data/persistences/mappers/SchoolMapper';
import { CityMapper } from '@/data/persistences/mappers/CityMapper';
import { CityApiRepository } from '../repositories/api/CityApiRepository';
import { ProvinceApiRepository } from '../repositories/api/ProvinceApiRepository';
import { ProvinceMapper } from '@/data/persistences/mappers/ProvinceMapper';
import { DistrictMapper } from '@/data/persistences/mappers/DistrictMapper';
import { DistrictApiRepository } from '../repositories/api/DistrictApiRepository';
import { VillageApiRepository } from '../repositories/api/VillageApiRepository';
import { VillageMapper } from '@/data/persistences/mappers/VillageMapper';
import { StudentApiRepository } from '../repositories/api/StudentApiRepository';
import { StudentMapper } from '@/data/persistences/mappers/StudentMapper';
import { UserApiRepository } from '../repositories/api/UserApiRepository';
import { UserMapper } from '@/data/persistences/mappers/UserMapper';
import { EmployeeApiRepository } from '../repositories/api/EmployeeApiRepository';
import { EmployeeMapper } from '@/data/persistences/mappers/EmployeeMapper';
import { DashboardAdminApiRepository } from '../repositories/api/DashboardAdminApiRepository';
import { DashboardMapper } from '@/data/persistences/mappers/DashboardAdminMapper';
import { DashboardOperatorApiRepository } from '../repositories/api/DashboardOperatorApiRepository';
import { DashboardOperatorMapper } from '@/data/persistences/mappers/DashboardOperatorMapper';


export class RepositoryModule {

  public static init(container: DependencyContainer) {
    
    container.register<AuthApiRepository>(AuthApiRepository, {
      useFactory: d => {
        return new AuthApiRepository(
          d.resolve(ApiService),
          d.resolve(AuthMapper),
          d.resolve(Endpoints)
        );
      }
    });

    container.register<CategoryApiRepository>(CategoryApiRepository, {
      useFactory: d => {
        return new CategoryApiRepository(
          d.resolve(ApiService),
          d.resolve(CategoryMapper),
          d.resolve(Endpoints)
        );
      }
    });

    container.register<DivisionApiRepository>(DivisionApiRepository, {
      useFactory: d => {
        return new DivisionApiRepository(
          d.resolve(ApiService),
          d.resolve(DivisionMapper),
          d.resolve(Endpoints)
        );
      }
    });

    container.register<DonorApiRepository>(DonorApiRepository, {
      useFactory: d => {
        return new DonorApiRepository(
          d.resolve(ApiService),
          d.resolve(DonorMapper),
          d.resolve(Endpoints)
        );
      }
    });

    container.register<MasterApiRepository>(MasterApiRepository, {
      useFactory: d => {
        return new MasterApiRepository(
          d.resolve(ApiService),
          d.resolve(MasterMapper),
          d.resolve(Endpoints)
        );
      }
    });

    container.register<PrognosisApiRepository>(PrognosisApiRepository, {
      useFactory: d => {
        return new PrognosisApiRepository(
          d.resolve(ApiService),
          d.resolve(PrognosisMapper),
          d.resolve(Endpoints)
        );
      }
    });

    container.register<DonationApiRepository>(DonationApiRepository, {
      useFactory: d => {
        return new DonationApiRepository(
          d.resolve(ApiService),
          d.resolve(DonationMapper),
          d.resolve(Endpoints)
        );
      }
    });

    container.register<UserApiRepository>(UserApiRepository, {
      useFactory: d => {
        return new UserApiRepository(
          d.resolve(ApiService),
          d.resolve(UserMapper),
          d.resolve(Endpoints)
        );
      }
    });


    // container.register<TransactionApiRepository>(TransactionApiRepository, {
    //   useFactory: d => {
    //     return new TransactionApiRepository(
    //       d.resolve(ApiService),
    //       d.resolve(TransactionMapper),
    //       d.resolve(Endpoints)
    //     );
    //   }
    // });

    container.register<SchoolApiRepository>(SchoolApiRepository, {
      useFactory: d => {
        return new SchoolApiRepository(
          d.resolve(ApiService),
          d.resolve(SchoolMapper),
          d.resolve(Endpoints)
        );
      }
    });

    container.register<CityApiRepository>(CityApiRepository, {
      useFactory: d => {
        return new CityApiRepository(
          d.resolve(ApiService),
          d.resolve(CityMapper),
          d.resolve(Endpoints)
        );
      }
    });

    container.register<ProvinceApiRepository>(ProvinceApiRepository, {
      useFactory: d => {
        return new ProvinceApiRepository(
          d.resolve(ApiService),
          d.resolve(ProvinceMapper),
          d.resolve(Endpoints)
        );
      }
    });  

    container.register<DistrictApiRepository>(DistrictApiRepository, {
      useFactory: d => {
        return new DistrictApiRepository(
          d.resolve(ApiService),
          d.resolve(DistrictMapper),
          d.resolve(Endpoints)
        );
      }
    });  

    container.register<VillageApiRepository>(VillageApiRepository, {
      useFactory: d => {
        return new VillageApiRepository(
          d.resolve(ApiService),
          d.resolve(VillageMapper),
          d.resolve(Endpoints)
        );
      }
    });  

    container.register<StudentApiRepository>(StudentApiRepository, {
      useFactory: d => {
        return new StudentApiRepository(
          d.resolve(ApiService),
          d.resolve(StudentMapper),
          d.resolve(Endpoints)
        );
      }
    });  


    container.register<EmployeeApiRepository>(EmployeeApiRepository, {
      useFactory: d => {
        return new EmployeeApiRepository(
          d.resolve(ApiService),
          d.resolve(EmployeeMapper),
          d.resolve(Endpoints)
        );
      }
    });  

    container.register<DashboardAdminApiRepository>(DashboardAdminApiRepository, {
      useFactory: d => {
        return new DashboardAdminApiRepository(
          d.resolve(ApiService),
          d.resolve(DashboardMapper),
          d.resolve(Endpoints)
        );
      }
    }); 

    container.register<DashboardOperatorApiRepository>(DashboardOperatorApiRepository, {
      useFactory: d => {
        return new DashboardOperatorApiRepository(
          d.resolve(ApiService),
          d.resolve(DashboardOperatorMapper),
          d.resolve(Endpoints)
        );
      }
    }); 

  }
}
