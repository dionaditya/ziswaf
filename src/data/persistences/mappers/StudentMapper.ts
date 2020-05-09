import { AxiosResponse } from "axios"
import { singleton } from 'tsyringe'
import { BaseResponseMapper } from './BaseMapper'
import { Student } from '@/domain/entities/Student'
import moment from 'moment'
import { ParentStatus, StudentStatus, EducationStatus, ParentStatusMaster } from '@/domain/entities/AllOptions'
@singleton()
export class StudentMapper extends BaseResponseMapper {
    public convertStudentsFromApi(result: AxiosResponse<any>): Student[] | null {

        const { data } = result
        if(data.data === null) {
            return null
        }

        return data.data.map(val => {
            const educationStatus = EducationStatus.filter(e => e[0] === val.education_status)
            const studentStatus = StudentStatus.filter(e => e[0] === val.sosial_status)
            const fatherStatus = ParentStatus.filter(e => e[0] === val.father_status)
            const motherStatus = ParentStatus.filter(e => e[0] === val.mother_status)

            
            return new Student(
                val.id,
                val.identity_number,
                val.school_name,
                val.name,
                val.age,
                val.place_of_birth,
                moment(val.birth_of_date).format('dddd, DD MMMM YYYY'),
                val.child_row,
                val.total_sibling,
                val.address,
                studentStatus[0][1],
                val.pos_code,
                val.province_name,
                val.regency_name,
                val.district_name,
                val.village_name,
                educationStatus[0][1],
                moment(val.registered_at).format('dddd, DD MMMM YYYY'),
                moment(val.finished_at).format('DD-MM-YYYY') === '01-01-0001' || val.finished_at === null ? '-' :  moment(val.finished_at).format('dddd, DD MMMM YYYY') ,
                val.punishment_count,
                moment(val.punishment_start).format('DD-MM-YYYY') === '01-01-0001' || val.punishment_start === null? '-' :  moment(val.punishment_start).format('dddd, DD MMMM YYYY'),
                moment(val.punishment_end).format('DD-MM-YYYY') === '01-01-0001' || val.punishment_end === null ? '-' : moment(val.punishment_end).format('dddd, DD MMMM YYYY'),
                val.juz_kuran_description,
                val.chapter_kuran_description,
                val.hadist_description,
                val.education_description,
                ParentStatusMaster[0][1],
                val.father_name,
                val.place_of_birth_father,
                val.birth_of_date_father === null ? '-' : moment(val.birth_of_date_father).format('dddd, DD MMMM YYYY'),
                val.father_occupation,
                val.father_phone === '' ? '-' : `+62${val.father_phone}`,
                fatherStatus[0][1],
                val.mother_name,
                val.place_of_birth_mother,
                val.birth_of_date_mother === null ? '-' :  moment(val.birth_of_date_mother).format('dddd, DD MMMM YYYY'),
                val.mother_occupation,
                val.mother_phone === '' ? '-' : `+62${val.mother_phone}`,
                motherStatus[0][1],
                val.image,
                val.province_id,
                val.regency_id,
                val.district_id,
                val.village_id 
            )
        })
    }


    public convertStudentFromApi(result: AxiosResponse<any>): Student | null {
        const { data } = result.data
        if(data === null) {
            return null
        }

        return new Student(
            data.id,
            data.identity_number,
            data.school_name,
            data.name,
            data.age,
            data.place_of_birth,
            moment(data.birth_of_date).format('YYYY-MM-DD'),
            data.child_row,
            data.total_sibling,
            data.address,
            data.sosial_status,
            data.pos_code,
            data.province_name,
            data.regency_name,
            data.district_name,
            data.village_name,
            data.education_status,
            moment(data.registered_at).format('YYYY-MM-DD'),
            data.finished_at === null ? null : moment(data.finished_at).format('YYYY-MM-DD'),
            data.punishment_count,
            data.punishment_start === null ? null : moment(data.punishment_start).format('YYYY-MM-DD'),
            data.punishment_end === null ? null : moment(data.punishment_end).format('YYYY-MM-DD'),
            data.juz_kuran_description,
            data.chapter_kuran_description,
            data.hadist_description,
            data.education_description,
            data.parent_status,
            data.father_name,
            data.place_of_birth_father,
            data.birth_of_date_father === null ? null : moment(data.birth_of_date_father).toDate(),
            data.father_occupation,
            data.father_phone,
            data.father_status,
            data.mother_name,
            data.place_of_birth_mother,
            data.birth_of_date_mother === null ? null : moment(data.birth_of_date_mother).toDate(),
            data.mother_occupation,
            data.mother_phone,
            data.mother_status,
            data.image,
            data.province_id,
            data.regency_id,
            data.district_id,
            data.village_id 
        )
    }

    // public requestStudentToApi(result: AxiosResponse<any>): StudentApiRequestResponse{
    //     const { data } = result
    //     return data
    // }


}