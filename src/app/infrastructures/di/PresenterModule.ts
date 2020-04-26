import { DependencyContainer } from "tsyringe";
import { LoginPresenter } from "@/app/container/views/Login/Presenter";
import { AuthApiRepository } from "@/app/infrastructures/repositories/api/AuthApiRepository";
import { SchoolPresenter } from "@/app/infrastructures/Presenter/School/Presenter";
import { SchoolApiRepository } from "../repositories/api/SchoolApiRepository";
import { CityPresenter } from "../Presenter/City/Presenter";
import { CityApiRepository } from "../repositories/api/CityApiRepository";
import { ProvincePresenter } from "../Presenter/Province/Presenter";
import { ProvinceApiRepository } from "../repositories/api/ProvinceApiRepository";
import { DistrictPresenter } from "../Presenter/District/Presenter";
import { DistrictApiRepository } from "../repositories/api/DistrictApiRepository";
import { VillagePresenter } from "../Presenter/Village/Presenter";
import { VillageApiRepository } from "../repositories/api/VillageApiRepository";
import { StudentPresenter } from "../Presenter/Student/Presenter";
import { StudentApiRepository } from "../repositories/api/StudentApiRepository";
import { DonorPresenter } from "@/app/infrastructures/Presenter/Donor/Presenter";
import { DonorApiRepository } from "@/app/infrastructures/repositories/api/DonorApiRepository";
import { DonationPresenter } from "../Presenter/Donation/Presenter";
import { DonationApiRepository } from "../repositories/api/DonationApiRepository";
import { UserPresenter } from '../Presenter/User/Presenter';
import { UserApiRepository } from '../repositories/api/UserApiRepository';
import { EmployeePresenter } from '../Presenter/Employee/Presenter';
import { EmployeeApiRepository } from '../repositories/api/EmployeeApiRepository';
import { DashboardAdminPresenter } from '../Presenter/DashboardAdmin/Presenter';
import { DashboardAdminApiRepository } from '../repositories/api/DashboardAdminApiRepository';
import { DashboardOperatorPresenter } from '../Presenter/DashboardOperator/Presenter';
import { DashboardOperatorApiRepository } from '../repositories/api/DashboardOperatorApiRepository';
import { CategoryPresenter } from '../Presenter/Category/Presenter';
import { CategoryApiRepository } from '../repositories/api/CategoryApiRepository';
import { PrognosisPresenter } from '../Presenter/Prognosis/Presenter';
import { PrognosisApiRepository } from '../repositories/api/PrognosisApiRepository';

export class PresenterModule {
  public static init(container: DependencyContainer) {
    container.register<LoginPresenter>(LoginPresenter, {
      useFactory: d => {
        return new LoginPresenter(d.resolve(AuthApiRepository));
      }
    });
    container.register<SchoolPresenter>(SchoolPresenter, {
      useFactory: d => {
        return new SchoolPresenter(d.resolve(SchoolApiRepository));
      }
    });

    container.register<CityPresenter>(CityPresenter, {
      useFactory: d => {
        return new CityPresenter(d.resolve(CityApiRepository));
      }
    });

    container.register<ProvincePresenter>(ProvincePresenter, {
      useFactory: d => {
        return new ProvincePresenter(d.resolve(ProvinceApiRepository));
      }
    });

    container.register<DistrictPresenter>(DistrictPresenter, {
      useFactory: d => {
        return new DistrictPresenter(d.resolve(DistrictApiRepository));
      }
    });

    container.register<VillagePresenter>(VillagePresenter, {
      useFactory: d => {
        return new VillagePresenter(d.resolve(VillageApiRepository));
      }
    });

    container.register<StudentPresenter>(StudentPresenter, {
      useFactory: d => {
        return new StudentPresenter(d.resolve(StudentApiRepository));
      }
    });

    container.register<EmployeePresenter>(EmployeePresenter, {
      useFactory: d => {
        return new EmployeePresenter(d.resolve(EmployeeApiRepository));
      }
    });

    container.register<DonorPresenter>(DonorPresenter, {
      useFactory: d => {
        return new DonorPresenter(d.resolve(DonorApiRepository));
      }
    });

    container.register<DonationPresenter>(DonationPresenter, {
      useFactory: d => {
        return new DonationPresenter(d.resolve(DonationApiRepository));
      }
    });

    container.register<UserPresenter>(UserPresenter, {
      useFactory: d => {
        return new UserPresenter(d.resolve(UserApiRepository));
      }
    });

    container.register<DashboardAdminPresenter>(DashboardAdminPresenter, {
      useFactory: d => {
        return new DashboardAdminPresenter(d.resolve(DashboardAdminApiRepository));
      }
    });

    container.register<DashboardOperatorPresenter>(DashboardOperatorPresenter, {
      useFactory: d => {
        return new DashboardOperatorPresenter(d.resolve(DashboardOperatorApiRepository));
      }
    });
    
    container.register<CategoryPresenter>(CategoryPresenter, {
      useFactory: d => {
        return new CategoryPresenter(d.resolve(CategoryApiRepository));
      }
    });

    container.register<PrognosisPresenter>(PrognosisPresenter, {
      useFactory: d => {
        return new PrognosisPresenter(d.resolve(PrognosisApiRepository));
      }
    });


  }
}
