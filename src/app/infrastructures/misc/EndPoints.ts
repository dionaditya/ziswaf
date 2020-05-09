require("dotenv").config();

export class Endpoints {
  public static baseUrl = process.env.REACT_APP_BASE_URL;

  loginUrl(): string {
    return "/login";
  }

  managerDivision(id: string = ""): string {
    if (id === "") {
      return "/division";
    }
    return "/division/" + id;
  }

  managerCategory(id: string = ""): string {
    if (id === "") {
      return "/manager/category";
    }
    return "/manager/category/" + id;
  }
  managerStatementCategory(id: string = ""): string {
    return "/manager/statement/category";
  }

  managerUser(id: number = 0): string {
    if (id === 0) {
      return "/manager/users";
    }
    return "/manager/users/" + id;
  }

  managerChangeStatusUser(id: number = 0): string {
    return "/manager/users/" + id + "/status";
  }

  managerDonor(id: number = 0): string {
    if (id === 0) {
      return "/donor";
    }
    return "/donor/" + id;
  }

  updateDonor(id: number = 0): string {
    if (id === 0) {
      return "/donor?type=update";
    }
    return "/donor/" + id;
  }


  managerProvince(id: string = ""): string {
    if (id === "") {
      return "/manager/province";
    }
    return "/manager/province/" + id;
  }

  managerDonation(): string {
    return "/transaction";
  }

  managerDonationManual(): string {
    return "/transaction?type=manual";
  }

  managerDonationDetail(id: number): string {
    return `/transaction/detail/${id}`;
  }

  detailDonation(id: number): string {
    return `manager/transaction/detail/${id}`
  }

  updateDonation(id: number): string {
    return `/manager/transaction/${id}`
  }

  managerPrognosis(id: string = ""): string {
    if (id === "") {
      return "/prognosis";
    }
    return "/prognosis/" + id;
  }

  getListSchool(): string {
    return "/school";
  }

  getAllOperator(id: string = ""): string {
    if (id === "") {
      return "/category";
    }
    return "/category/" + id;
  }

  getDetailSchool(id: number): string {
    return `/school/${id}`;
  }

  postNewSchoolData(): string {
    return "/school";
  }

  updateSchoolData(id: number): string {
    return `/school/${id}`;
  }

  getCityList(): string {
    return `/regency`;
  }

  getProvinceList(): string {
    return `/province`;
  }

  getProvinceDetail(provinceId: number): string {
    return `/province/${provinceId}`;
  }

  getDistrictList(): string {
    return `/district`;
  }

  getVillageList(): string {
    return `/village`;
  }

  getStudentList(): string {
    return "/student";
  }

  getDetailStudent(id: number): string {
    return `/student/${id}`;
  }

  postNewStudentData(): string {
    return "/student";
  }

  updateStudentData(id: number): string {
    return `/student/${id}`;
  }

  getEmployeeList(): string {
    return "/employee";
  }

  getDetailEmployee(id: number): string {
    return `/employee/${id}`;
  }

  postNewEmployeeData(): string {
    return "/employee";
  }

  updateEmployeeData(id: number): string {
    return `/employee/${id}`;
  }

  changePasswordUser(id: number, type: string): string {
    return `users/change-password/${id}?type=${type}`;
  }
  getDashboardAdmin(): string {
    return "manager/transaction/report";
  }

  getDashboardOperator(): string {
    return "/transaction/report-operator";
  }

  getReportDonation(): string {
    return "/transaction/report-donation";
  }

  getRecordSchool(id: number = 0): string {
    return "/record/school/" + id;
  }
  
  deleteStudentData(id: number): string {
    return "/student/" + id;
  }

  deleteSchoolData(id: number): string {
    return "/school/" + id;
  }

  deleteDonorData(id: number): string {
    return "/donor/" + id;
  }

  deleteUserData(id: number): string {
    return "/manager/users/" + id;
  }

  deleteEmployeeData(id: number): string {
    return "/employee/" + id;
  }

  deleteTransaction(id: number): string {
    return "/manager/transaction/" + id;
  }
}
