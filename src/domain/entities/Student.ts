export class Student {
    id: number = 0;
    identity_number: string = '';
    school_id: string = '';
    name: string = '';
    age: string = '';
    place_of_birth: string = '';
    birth_of_date: string = '';
    child_row: string = '';
    total_sibling: string = '';
    address: string = '';
    sosial_status: string  | number = '';
    pos_code: number = 0;
    province_id: string | number = '';
    city_id: string | number = '';
    district_id: string | number = '';
    village_id: string | number= '';
    education_status: string | number = '' ;
    registered_at: string = '';
    finished_at: string = '';
    punishment_count: number = 0;
    punishment_start: string = '';
    punishment_end: string = '';
    juz_kuran_description: string = '';
    chapter_kuran_description: string = '';
    hadist_description: string = '';
    education_description: string = '';
    parent_status: string | number = '';
    father_name: string = '';
    place_of_birth_father: string = '';
    birth_of_date_father: string = '';
    father_occupation: string = '';
    father_phone: string = '';
    father_status: any = '';
    mother_name: string = '';
    place_of_birth_mother: string = '';
    birth_of_date_mother: string = '';
    mother_occupation: string = '';
    mother_phone: string = '';
    mother_status: any = '';
    image: string = '';
    province: number
    regency: number
    district: number
    village: number


    constructor(
        id: number,
        identity_number: string,
        school_id: string,
        name: string,
        age: string,
        place_of_birth: string,
        birth_of_date: string,
        child_row: string,
        total_sibling: string,
        address: string,
        sosial_status: string | number,
        pos_code: number,
        province_id: string | number,
        city_id: string | number,
        district_id: string | number,
        village_id: string | number,
        education_status: string | number,
        registered_at: string,
        finished_at: string,
        punishment_count: number,
        punishment_start: string,
        punishment_end: string,
        juz_kuran_description: string,
        chapter_kuran_description: string,
        hadist_description: string,
        education_description: string,
        parent_status: string | number,
        father_name: string,
        place_of_birth_father: string,
        birth_of_date_father: string,
        father_occupation: string,
        father_phone: string,
        father_status: any,
        mother_name: string,
        place_of_birth_mother: string,
        birth_of_date_mother: string,
        mother_occupation: string,
        mother_phone: string,
        mother_status: any,
        image: string,
        province: number,
        regency: number,
        district: number,
        village: number,
    ) {
        this.id = id
        this.identity_number = identity_number
        this.school_id = school_id
        this.name = name
        this.age = age
        this.place_of_birth = place_of_birth
        this.birth_of_date = birth_of_date
        this.child_row = child_row
        this.total_sibling = total_sibling
        this.address = address
        this.sosial_status = sosial_status
        this.pos_code = pos_code
        this.province_id = province_id
        this.city_id = city_id
        this.district_id = district_id
        this.village_id = village_id
        this.education_status = education_status
        this.registered_at = registered_at
        this.finished_at = finished_at
        this.punishment_count = punishment_count
        this.punishment_start = punishment_start
        this.punishment_end = punishment_end
        this.juz_kuran_description = juz_kuran_description
        this.chapter_kuran_description = chapter_kuran_description
        this.hadist_description = hadist_description
        this.education_description = education_description
        this.parent_status = parent_status
        this.father_name = father_name
        this.place_of_birth_father = place_of_birth_father
        this.birth_of_date_father = birth_of_date_father
        this.father_occupation = father_occupation
        this.father_phone = father_phone
        this.father_status = father_status
        this.mother_name = mother_name
        this.place_of_birth_mother = place_of_birth_mother
        this.birth_of_date_mother = birth_of_date_mother
        this.mother_occupation = mother_occupation
        this.mother_phone = mother_phone
        this.mother_status = mother_status
        this.image = image
        this.province = province
        this.regency = regency
        this.district = district
        this.village = village
    }
}


export class ParentInfo {
    parent_status: number = 0;
    father_name: string = '';
    place_of_birth_father: string = '';
    birth_of_date_father: string = '';
    father_occupation: string = '';
    father_phone: string = '';
    father_status: number = 0;
    mother_name: string = '';
    place_of_birth_mother: string = '';
    birth_of_date_mother: string = '';
    mother_occupation: string = '';
    mother_phone: string = '';
    mother_status: number = 0;
}

export class EducationInfo {
    education_status: number = 0;
    registered_at: string = '';
    finished_at: string = '';
    punishment_count: number = 0;
    punishment_start: string = '';
    punishment_end: string = '';
    juz_kuran_description: string = '';
    chapter_kuran_description: string = '';
    hadist_description: string = '';
    education_description: string = '';
}


export class NewStudentInfoEntity {
    identity_number: string = '';
    school_name: string = '';
    name: string = '';
    age: string = '';
    place_of_birth: string = '';
    birth_of_date: string = '';
    child_row: string = '';
    total_sibling: string = '';
    address: string = '';
    sosial_status: number = 0;
    pos_code: number = 0;
    province_id: number = 0;
    regency_id: number = 0;
    district_id: number = 0;
    village_id: number = 0;
    image: string = '';
}

