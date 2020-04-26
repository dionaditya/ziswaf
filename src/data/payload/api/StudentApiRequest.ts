import {
  createStudentInterface,
  updateStudentInterface,
  deleteStudentInterface,
} from "../contracts/StudentContract";
import _ from "lodash";
export class StudentApiRequest implements createStudentInterface {
  identity_number: string;
  school_id: number;
  name: string;
  age: string;
  place_of_birth: string;
  birth_of_date: string;
  child_row: string;
  total_sibling: string;
  address: string;
  sosial_status: number;
  pos_code: number;
  province_id: number;
  regency_id: number;
  district_id: number;
  village_id: number;
  education_status: number;
  registered_at: string;
  finished_at: string;
  punishment_count: number;
  punishment_start: string;
  punishment_end: string;
  juz_kuran_description: string;
  chapter_kuran_description: string;
  hadist_description: string;
  education_description: string;
  parent_status: number;
  father_name: string;
  place_of_birth_father: string;
  birth_of_date_father: string;
  father_occupation: string;
  father_phone: string;
  father_status: number;
  mother_name: string;
  place_of_birth_mother: string;
  birth_of_date_mother: string;
  mother_occupation: string;
  mother_phone: string;
  mother_status: number;
  image?: any;

  constructor(
    identity_number: string,
    school_id: number,
    name: string,
    age: string,
    place_of_birth: string,
    birth_of_date: string,
    child_row: string,
    total_sibling: string,
    address: string,
    sosial_status: number,
    pos_code: number,
    province_id: number,
    regency_id: number,
    district_id: number,
    village_id: number,
    education_status: number,
    registered_at: string,
    finished_at: string,
    punishment_count: number,
    punishment_start: string,
    punishment_end: string,
    juz_kuran_description: string,
    chapter_kuran_description: string,
    hadist_description: string,
    education_description: string,
    parent_status: number,
    father_name: string,
    place_of_birth_father: string,
    birth_of_date_father: string,
    father_occupation: string,
    father_phone: string,
    father_status: number,
    mother_name: string,
    place_of_birth_mother: string,
    birth_of_date_mother: string,
    mother_occupation: string,
    mother_phone: string,
    mother_status: number,
    image?: string
  ) {
    this.identity_number = identity_number;
    this.school_id = school_id;
    this.name = name;
    this.age = age;
    this.place_of_birth = place_of_birth;
    this.birth_of_date = birth_of_date;
    this.child_row = child_row;
    this.total_sibling = total_sibling;
    this.address = address;
    this.sosial_status = sosial_status;
    this.pos_code = pos_code;
    this.province_id = province_id;
    this.regency_id = regency_id;
    this.district_id = district_id;
    this.village_id = village_id;
    this.education_status = education_status;
    this.registered_at = registered_at;
    this.finished_at = finished_at;
    this.punishment_count = punishment_count;
    this.punishment_start = punishment_start;
    this.punishment_end = punishment_end;
    this.juz_kuran_description = juz_kuran_description;
    this.chapter_kuran_description = chapter_kuran_description;
    this.hadist_description = hadist_description;
    this.education_description = education_description;
    this.parent_status = parent_status;
    this.father_name = father_name;
    this.place_of_birth_father = place_of_birth_father;
    this.birth_of_date_father = birth_of_date_father;
    this.father_occupation = father_occupation;
    this.father_phone = father_phone;
    this.father_status = father_status;
    this.mother_name = mother_name;
    this.place_of_birth_mother = place_of_birth_mother;
    this.birth_of_date_mother = birth_of_date_mother;
    this.mother_occupation = mother_occupation;
    this.mother_phone = mother_phone;
    this.mother_status = mother_status;
    this.image = image;
  }

  public toFormData() {
    const data = this;
    const formData = new FormData();
    Object.keys(data).forEach((val) => {
      if (val === "image") {
        const [file, name] = data[val];
        formData.append(val, file, name);
      } else {
        if (data[val] === null) {
          return null;
        } else {
          if(val === 'age') {
            formData.append(val, _.toNumber(this.age))
        }
        formData.append(val, data[val]);
        }
      }
    });

    return formData;
  }
}

export class CreateStudentApiRequestWithoutImage
  implements createStudentInterface {
  identity_number: string;
  school_id: number;
  name: string;
  age: string;
  place_of_birth: string;
  birth_of_date: string;
  child_row: string;
  total_sibling: string;
  address: string;
  sosial_status: number;
  pos_code: number;
  province_id: number;
  regency_id: number;
  district_id: number;
  village_id: number;
  education_status: number;
  registered_at: string;
  finished_at: string;
  punishment_count: number;
  punishment_start: string;
  punishment_end: string;
  juz_kuran_description: string;
  chapter_kuran_description: string;
  hadist_description: string;
  education_description: string;
  parent_status: number;
  father_name: string;
  place_of_birth_father: string;
  birth_of_date_father: string;
  father_occupation: string;
  father_phone: string;
  father_status: number;
  mother_name: string;
  place_of_birth_mother: string;
  birth_of_date_mother: string;
  mother_occupation: string;
  mother_phone: string;
  mother_status: number;

  constructor(
    identity_number: string,
    school_id: number,
    name: string,
    age: string,
    place_of_birth: string,
    birth_of_date: string,
    child_row: string,
    total_sibling: string,
    address: string,
    sosial_status: number,
    pos_code: number,
    province_id: number,
    regency_id: number,
    district_id: number,
    village_id: number,
    education_status: number,
    registered_at: string,
    finished_at: string,
    punishment_count: number,
    punishment_start: string,
    punishment_end: string,
    juz_kuran_description: string,
    chapter_kuran_description: string,
    hadist_description: string,
    education_description: string,
    parent_status: number,
    father_name: string,
    place_of_birth_father: string,
    birth_of_date_father: string,
    father_occupation: string,
    father_phone: string,
    father_status: number,
    mother_name: string,
    place_of_birth_mother: string,
    birth_of_date_mother: string,
    mother_occupation: string,
    mother_phone: string,
    mother_status: number
  ) {
    this.identity_number = identity_number;
    this.school_id = school_id;
    this.name = name;
    this.age = age;
    this.place_of_birth = place_of_birth;
    this.birth_of_date = birth_of_date;
    this.child_row = child_row;
    this.total_sibling = total_sibling;
    this.address = address;
    this.sosial_status = sosial_status;
    this.pos_code = pos_code;
    this.province_id = province_id;
    this.regency_id = regency_id;
    this.district_id = district_id;
    this.village_id = village_id;
    this.education_status = education_status;
    this.registered_at = registered_at;
    this.finished_at = finished_at;
    this.punishment_count = punishment_count;
    this.punishment_start = punishment_start;
    this.punishment_end = punishment_end;
    this.juz_kuran_description = juz_kuran_description;
    this.chapter_kuran_description = chapter_kuran_description;
    this.hadist_description = hadist_description;
    this.education_description = education_description;
    this.parent_status = parent_status;
    this.father_name = father_name;
    this.place_of_birth_father = place_of_birth_father;
    this.birth_of_date_father = birth_of_date_father;
    this.father_occupation = father_occupation;
    this.father_phone = father_phone;
    this.father_status = father_status;
    this.mother_name = mother_name;
    this.place_of_birth_mother = place_of_birth_mother;
    this.birth_of_date_mother = birth_of_date_mother;
    this.mother_occupation = mother_occupation;
    this.mother_phone = mother_phone;
    this.mother_status = mother_status;
  }

  public toFormData() {
    const data = this;
    const formData = new FormData();
    Object.keys(data).forEach((val) => {
      if (data[val] === null) {
        return null;
      } else {
        if(val === 'age') {
          formData.append(val, _.toNumber(this.age))
      }
      formData.append(val, data[val]);
      }
    });

    return formData;
  }
}

export class UpdateStudentApiRequest implements updateStudentInterface {
  identity_number: string;
  school_id: any;
  name: string;
  age: string;
  place_of_birth: string;
  birth_of_date: string;
  child_row: string;
  total_sibling: string;
  address: string;
  sosial_status: number;
  pos_code: number;
  province_id: any;
  regency_id: any;
  district_id: any;
  village_id: any;
  education_status: number;
  registered_at: string;
  finished_at: string;
  punishment_count: number;
  punishment_start: string;
  punishment_end: string;
  juz_kuran_description: string;
  chapter_kuran_description: string;
  hadist_description: string;
  education_description: string;
  parent_status: number;
  father_name: string;
  place_of_birth_father: string;
  birth_of_date_father: string;
  father_occupation: string;
  father_phone: string;
  father_status: number;
  mother_name: string;
  place_of_birth_mother: string;
  birth_of_date_mother: string;
  mother_occupation: string;
  mother_phone: string;
  mother_status: number;
  image: any;

  constructor(
    identity_number: string,
    school_id: number,
    name: string,
    age: string,
    place_of_birth: string,
    birth_of_date: string,
    child_row: string,
    total_sibling: string,
    address: string,
    sosial_status: number,
    pos_code: number,
    province_id: any,
    regency_id: any,
    district_id: any,
    village_id: any,
    education_status: number,
    registered_at: string,
    finished_at: string,
    punishment_count: number,
    punishment_start: string,
    punishment_end: string,
    juz_kuran_description: string,
    chapter_kuran_description: string,
    hadist_description: string,
    education_description: string,
    parent_status: number,
    father_name: string,
    place_of_birth_father: string,
    birth_of_date_father: string,
    father_occupation: string,
    father_phone: string,
    father_status: number,
    mother_name: string,
    place_of_birth_mother: string,
    birth_of_date_mother: string,
    mother_occupation: string,
    mother_phone: string,
    mother_status: number,
    image: any
  ) {
    this.identity_number = identity_number;
    this.school_id = school_id;
    this.name = name;
    this.age = age;
    this.place_of_birth = place_of_birth;
    this.birth_of_date = birth_of_date;
    this.child_row = child_row;
    this.total_sibling = total_sibling;
    this.address = address;
    this.sosial_status = sosial_status;
    this.pos_code = pos_code;
    this.province_id = province_id;
    this.regency_id = regency_id;
    this.district_id = district_id;
    this.village_id = village_id;
    this.education_status = education_status;
    this.registered_at = registered_at;
    this.finished_at = finished_at;
    this.punishment_count = punishment_count;
    this.punishment_start = punishment_start;
    this.punishment_end = punishment_end;
    this.juz_kuran_description = juz_kuran_description;
    this.chapter_kuran_description = chapter_kuran_description;
    this.hadist_description = hadist_description;
    this.education_description = education_description;
    this.parent_status = parent_status;
    this.father_name = father_name;
    this.place_of_birth_father = place_of_birth_father;
    this.birth_of_date_father = birth_of_date_father;
    this.father_occupation = father_occupation;
    this.father_phone = father_phone;
    this.father_status = father_status;
    this.mother_name = mother_name;
    this.place_of_birth_mother = place_of_birth_mother;
    this.birth_of_date_mother = birth_of_date_mother;
    this.mother_occupation = mother_occupation;
    this.mother_phone = mother_phone;
    this.mother_status = mother_status;
    this.image = image;
  }

  public toFormData() {
    const data = this;
    const formData = new FormData();
    Object.keys(data).forEach((val) => {
      if (
        data[val] === null 
      ) {
        return null;
      } else {
        if(val === 'age') {
            formData.append(val, _.toNumber(this.age))
        } else {
          if(val === "school_id" ) {
            if(_.isNumber(data[val]) === true) {
              formData.append(val, data[val])
            } else {
              return null;
            }
          } else if(val === "province_id") {
            if(_.isNumber(data[val]) === true) {
              formData.append(val, data[val])
            } else {
              return null;
            }
          } else if(val === "regency_id") {
            if(_.isNumber(data[val]) === true) {
              formData.append(val, data[val])
            } else {
              return null;
            }
          } else if(val === "district_id") {
            if(_.isNumber(data[val]) === true) {
              formData.append(val, data[val])
            } else {
              return null;
            }
          } else if(val === "village_id") {
            if(_.isNumber(data[val]) === true) {
              formData.append(val, data[val])
            } else {
              return null;
            }
          } else {
            formData.append(val, data[val]);
          }
          

        }
      }
    });

    return formData;
  }
}

export class UpdateStudentApiRequestWithoutImage {
  identity_number: string;
  school_id: any;
  name: string;
  age: string;
  place_of_birth: string;
  birth_of_date: string;
  child_row: string;
  total_sibling: string;
  address: string;
  sosial_status: number;
  pos_code: number;
  province_id: any;
  regency_id: any;
  district_id: any;
  village_id: any;
  education_status: number;
  registered_at: string;
  finished_at: string;
  punishment_count: number;
  punishment_start: string;
  punishment_end: string;
  juz_kuran_description: string;
  chapter_kuran_description: string;
  hadist_description: string;
  education_description: string;
  parent_status: number;
  father_name: string;
  place_of_birth_father: string;
  birth_of_date_father: string;
  father_occupation: string;
  father_phone: string;
  father_status: number;
  mother_name: string;
  place_of_birth_mother: string;
  birth_of_date_mother: string;
  mother_occupation: string;
  mother_phone: string;
  mother_status: number;

  constructor(
    identity_number: string,
    school_id: any,
    name: string,
    age: string,
    place_of_birth: string,
    birth_of_date: string,
    child_row: string,
    total_sibling: string,
    address: string,
    sosial_status: number,
    pos_code: number,
    province_id: any,
    regency_id: any,
    district_id: any,
    village_id: any,
    education_status: number,
    registered_at: string,
    finished_at: string,
    punishment_count: number,
    punishment_start: string,
    punishment_end: string,
    juz_kuran_description: string,
    chapter_kuran_description: string,
    hadist_description: string,
    education_description: string,
    parent_status: number,
    father_name: string,
    place_of_birth_father: string,
    birth_of_date_father: string,
    father_occupation: string,
    father_phone: string,
    father_status: number,
    mother_name: string,
    place_of_birth_mother: string,
    birth_of_date_mother: string,
    mother_occupation: string,
    mother_phone: string,
    mother_status: number
  ) {
    this.identity_number = identity_number;
    this.school_id = school_id;
    this.name = name;
    this.age = age;
    this.place_of_birth = place_of_birth;
    this.birth_of_date = birth_of_date;
    this.child_row = child_row;
    this.total_sibling = total_sibling;
    this.address = address;
    this.sosial_status = sosial_status;
    this.pos_code = pos_code;
    this.province_id = province_id;
    this.regency_id = regency_id;
    this.district_id = district_id;
    this.village_id = village_id;
    this.education_status = education_status;
    this.registered_at = registered_at;
    this.finished_at = finished_at;
    this.punishment_count = punishment_count;
    this.punishment_start = punishment_start;
    this.punishment_end = punishment_end;
    this.juz_kuran_description = juz_kuran_description;
    this.chapter_kuran_description = chapter_kuran_description;
    this.hadist_description = hadist_description;
    this.education_description = education_description;
    this.parent_status = parent_status;
    this.father_name = father_name;
    this.place_of_birth_father = place_of_birth_father;
    this.birth_of_date_father = birth_of_date_father;
    this.father_occupation = father_occupation;
    this.father_phone = father_phone;
    this.father_status = father_status;
    this.mother_name = mother_name;
    this.place_of_birth_mother = place_of_birth_mother;
    this.birth_of_date_mother = birth_of_date_mother;
    this.mother_occupation = mother_occupation;
    this.mother_phone = mother_phone;
    this.mother_status = mother_status;
  }

  public toFormData() {
    const data = this;
    const formData = new FormData();
    Object.keys(data).forEach((val) => {
        if (
            data[val] === null 
          ) {
            return null;
          } else {
            if(val === 'age') {
                formData.append(val, _.toNumber(this.age))
            } else {
              if(val === "school_id" ) {
                if(_.isNumber(data[val])) {
                  formData.append(val, data[val])
                } else {
                  return null;
                }
              } else if(val === "province_id") {
                if(_.isNumber(data[val])) {
                  formData.append(val, data[val])
                } else {
                  return null;
                }
              } else if(val === "regency_id") {
                if(_.isNumber(data[val])) {
                  formData.append(val, data[val])
                } else {
                  return null;
                }
              } else if(val === "district_id") {
                if(_.isNumber(data[val])) {
                  formData.append(val, data[val])
                } else {
                  return null;
                }
              } else if(val === "village_id") {
                if(_.isNumber(data[val])) {
                  formData.append(val, data[val])
                } else {
                  return null;
                }
              } else {
                formData.append(val, data[val])
              }
              

            }
          }
    });

    return formData;
  }
}

export class DeleteStudentApiRequest implements deleteStudentInterface {
  private id: number;

  constructor(id: number) {
    this.id = id;
  }

  toJson(): string {
    return JSON.stringify(this);
  }
}
