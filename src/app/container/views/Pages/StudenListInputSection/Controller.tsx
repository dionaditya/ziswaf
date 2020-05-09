import { useReducer, useEffect, Children } from 'react'
import React from 'react'
import { NewStudentInfoEntity, ParentInfo, EducationInfo } from '@/domain/entities/Student'
import moment from 'moment'
import { container } from "tsyringe";
import { ProvincePresenter } from '@/app/infrastructures/Presenter/Province/Presenter';
import { SchoolPresenter } from '@/app/infrastructures/Presenter/School/Presenter';
import { StudentPresenter } from '@/app/infrastructures/Presenter/Student/Presenter';
import { StudentApiRequest, UpdateStudentApiRequest, UpdateStudentApiRequestWithoutImage, CreateStudentApiRequestWithoutImage} from '@/data/payload/api/StudentApiRequest';
import { DistrictPresenter } from '@/app/infrastructures/Presenter/District/Presenter';
import { CityPresenter } from '@/app/infrastructures/Presenter/City/Presenter';
import { VillagePresenter } from '@/app/infrastructures/Presenter/Village/Presenter';
import _ from 'lodash'
import { useParams } from 'react-router-dom'
import { getUserInfo } from '@/app/infrastructures/misc/Cookies';
import axios from 'axios'
import qs from 'qs'
import {useLocation} from 'react-router-dom'
import { useDebounce } from "use-lodash-debounce";

export enum ActionType {
    handleStudentInfoInputData = 'HANDLESTUDENTINFOINPUTDATA',
    handleParentInfoInputData = 'HANDLEPARENTINFOINPUTDATA',
    handleEducationInfoInputData = 'HANDLEEDUCATIONINFOINPUTDATA',
    handleImageUpload = 'HANDLEIMAGEUPLOAD',
    setLoading = 'SETLOADING',
    setError = 'SETERROR',
    handleSubmit = 'HANDLESUBMIT',
    setProvince = 'SETPROVINCE',
    setCity = 'SETCITY',
    setDistrict = 'SETDISTRICT',
    setVillage = 'SETVILLAGE',
    setImagePreview = 'SETIMAGEPREVIEW',
    setExisitingStudentData = 'SETEXISTINGSTUDENTDATA',
    setScholId = 'SETSCHOOLID',
    setSchool = 'SETSCHOOL'
}


export interface IAction {
    type: string,
    payload: any
}





export interface IState {
    statusModal: boolean,
    searchSiswaQuery: string,
    loading: boolean,
    error: boolean,
    data: [],
    province: any,
    school: any,
    city: any,
    district: any,
    village: any,
    ImagePreview: string,
    student_info: any,
    parent_info: any,
    education_info: any,
    handleSubmit: Function,
    handleInput: Function,
    handleImageUpload: Function,
    dispatch: Function
    isUpdateSession: boolean
    setUpdateSession: Function
    userInfo: any
    isDetailSession: boolean
    loadData: Function
    debounce: Function
}

export const initialState: IState = {
    statusModal: false,
    searchSiswaQuery: '',
    loading: false,
    data: [],
    ImagePreview: '',
    error: false,
    province: [],
    school: [],
    city: [],
    district: [],
    village: [],
    student_info: {
        identity_number: '',
        school_id: '',
        name: '',
        age: '',
        place_of_birth: '',
        birth_of_date: '',
        child_row: '',
        total_sibling: '',
        address: '',
        sosial_status: '',
        pos_code: '',
        province_id: '',
        regency_id: '',
        district_id: '',
        village_id: '',
        image: null,
    },
    parent_info: {
        parent_status: 0,
        father_name: '',
        place_of_birth_father: '',
        birth_of_date_father: null,
        father_occupation: '',
        father_phone: '',
        father_status: '',
        mother_name: '',
        place_of_birth_mother: '',
        birth_of_date_mother: null,
        mother_occupation: '',
        mother_phone: '',
        mother_status: '',
    },
    education_info: {
        education_status: '',
        registered_at: null,
        finished_at: null,
        punishment_count: '',
        punishment_start: null,
        punishment_end: null,
        juz_kuran_description: '',
        chapter_kuran_description: '',
        hadist_description: '',
        education_description: '',
    },
    handleSubmit: () => { },
    handleImageUpload: () => { },
    handleInput: () => { },
    dispatch: () => { },
    isUpdateSession: false,
    setUpdateSession: () => { },
    userInfo: {},
    isDetailSession: false,
    loadData: () => {},
    debounce: () => {}

}


const reducer: React.Reducer<IState, IAction> = (state, action) => {
    switch (action.type) {
        case ActionType.handleStudentInfoInputData:
            const listStudentInfoData = { ...state.student_info, [action.payload.name]: action.payload.value }
            return { ...state, student_info: listStudentInfoData }

        case ActionType.handleParentInfoInputData:
            const listParentInfoData = { ...state.parent_info, [action.payload.name]: action.payload.value }
            return { ...state, parent_info: listParentInfoData }

        case ActionType.handleEducationInfoInputData:
            const listEducationInfoData = { ...state.education_info, [action.payload.name]: action.payload.value }
            return { ...state, education_info: listEducationInfoData }

        case ActionType.handleImageUpload:
            return { ...state, student_info: { ...state.student_info, image: action.payload } }

        case ActionType.setProvince:
            return { ...state, province: action.payload  }

        case ActionType.setSchool:
                return { ...state, school: action.payload  }


        case ActionType.setCity:
            return { ...state, city: action.payload }

        case ActionType.setDistrict:
            return { ...state, district: action.payload }

        case ActionType.setVillage:
            return { ...state, village: action.payload }

        case ActionType.setLoading:
            return { ...state, loading: action.payload }

        case ActionType.setImagePreview:
            return { ...state, ImagePreview: action.payload }

        case ActionType.setExisitingStudentData:
            const {
                id,
                identity_number,
                school_id,
                name,
                age,
                place_of_birth,
                birth_of_date,
                child_row,
                total_sibling,
                address,
                sosial_status,
                pos_code,
                education_status,
                registered_at,
                finished_at,
                punishment_count,
                punishment_start,
                punishment_end,
                juz_kuran_description,
                chapter_kuran_description,
                hadist_description,
                education_description,
                parent_status,
                father_name,
                place_of_birth_father,
                birth_of_date_father,
                father_occupation,
                father_phone,
                father_status,
                mother_name,
                place_of_birth_mother,
                birth_of_date_mother,
                mother_occupation,
                mother_phone,
                mother_status,
                image,
                regency,
                province,
                district,
                village
            } = action.payload
            return {
                ...state,
                ImagePreview: image,
                student_info: {
                    id: id,
                    identity_number: identity_number,
                    school_id: school_id,
                    name: name,
                    age: age,
                    place_of_birth: place_of_birth,
                    birth_of_date: birth_of_date,
                    child_row: child_row,
                    total_sibling: total_sibling,
                    address: address,
                    sosial_status: sosial_status,
                    pos_code: pos_code,
                    province_id: province,
                    regency_id: regency,
                    district_id: district,
                    village_id: village,
                },
                education_info: {
                    education_status: education_status,
                    registered_at: registered_at,
                    finished_at: finished_at,
                    punishment_count: punishment_count,
                    punishment_start: punishment_start,
                    punishment_end: punishment_end,
                    juz_kuran_description: juz_kuran_description,
                    chapter_kuran_description: chapter_kuran_description,
                    hadist_description: hadist_description,
                    education_description: education_description,
                },
                parent_info: {
                    parent_status: parent_status,
                    father_name: father_name,
                    place_of_birth_father: place_of_birth_father,
                    birth_of_date_father: birth_of_date_father === null ? null : moment(birth_of_date_father).format('YYYY-MM-DD'),
                    father_occupation: father_occupation,
                    father_phone: father_phone,
                    father_status: father_status,
                    mother_name: mother_name,
                    place_of_birth_mother: place_of_birth_mother,
                    birth_of_date_mother:  birth_of_date_mother === null ? null : moment(birth_of_date_mother).format('YYYY-MM-DD'),
                    mother_occupation: mother_occupation,
                    mother_phone: mother_phone,
                    mother_status: mother_status,
                }

            }

        case ActionType.setScholId:
            return { ...state, student_info: { ...state.student_info, school_id: action.payload } }
        default:
            return state
    }
}


export const StudentListInputContext = React.createContext<IState>(initialState);

export const { Provider: StudentListInputProvider } = StudentListInputContext;



export const StudentListInputController = ({ children }) => {
    const [state, dispatch] = useReducer<React.Reducer<IState, IAction>>(reducer, initialState)
    const [userInfo, setUserInfo] = React.useState<any>({})
    const [isUpdateSession, setUpdateSession] = React.useState(false)
    const studentPresenter: StudentPresenter = container.resolve(StudentPresenter)
    const provincePresenter: ProvincePresenter = container.resolve(ProvincePresenter);
    const schoolPresenter: SchoolPresenter = container.resolve(SchoolPresenter)
    const cityPresenter: CityPresenter = container.resolve(CityPresenter)
    const districtPresenter: DistrictPresenter = container.resolve(DistrictPresenter)
    const villagePresenter: VillagePresenter = container.resolve(VillagePresenter)
    const useraccess = getUserInfo()
    const [isDetailSession, setDetailSession] = React.useState(false)
    const { id } = useParams()
    
    const location = useLocation()

    const query = qs.parse(location.search)

    const [querySchool, setQuerySchool] = React.useState("");

    const debouncedSchool = useDebounce(querySchool, 40);
  
    const formatPhone: any = (phoneNumber) => {
        const formatValue = phoneNumber
        .slice(3, phoneNumber.length)
        .replace(/\s+/g, "")
        .match(/(\d+)/);

        if(formatValue === null) {
            return ''
        } else {
            return formatValue[0]
        }
    }


    useEffect(() => {

        const getData = async () => {
            if (id !== undefined) {
                dispatch({ type: ActionType.setLoading, payload: true })
                let studentData = await studentPresenter.loadDataDetail(_.toNumber(id))
                dispatch({ type: ActionType.setExisitingStudentData, payload: studentData.data.data })
                
                let listProvincePresenter = await provincePresenter.loadData()
                let listCity = await cityPresenter.loadData({
                    filter: {
                        province_id: studentData.data.data.province
                    }
                })
                let listDistrict = await districtPresenter.loadData({
                    filter: {
                        regency_id: studentData.data.data.regency
                    }
                })
                let listVillage = await villagePresenter.loadData({
                    filter: {
                        district_id: studentData.data.data.district
                    }
                })
                dispatch({
                    type: ActionType.setProvince, payload: listProvincePresenter
                })
                dispatch({
                    type: ActionType.setCity,
                    payload: listCity
                })
                dispatch({
                    type: ActionType.setDistrict,
                    payload: listDistrict
                })
                dispatch({
                    type: ActionType.setVillage,
                    payload: listVillage
                })

                setUserInfo(useraccess)

                setUpdateSession(true)
                dispatch({ type: ActionType.setLoading, payload: false })

            } else {
                dispatch({ type: ActionType.setLoading, payload: true })
                let listProvincePresenter = await provincePresenter.loadData()
                dispatch({
                    type: ActionType.setProvince, payload: listProvincePresenter
                })
                setUserInfo(useraccess)
                dispatch({ type: ActionType.setLoading, payload: false })
            }
        }

        getData()

        if(query['?is_detail'] !== undefined) {
            setDetailSession(true)
        } else {
            setDetailSession(false)
        }
        
    }, [])

    React.useEffect(() => {
        if (debouncedSchool !== "") {
          (async () => {
            const school: any = await schoolPresenter.loadData({
              search: debouncedSchool,
            });
            dispatch({
              type: ActionType.setSchool,
              payload: school.data.data,
            });
          })();
        } else {
          (async () => {
            const school: any = await schoolPresenter.loadData({
              paging: {
                page: 1,
                limit: 10,
              },
            });
            dispatch({
              type: ActionType.setSchool,
              payload: school.data.data,
            });
          })();
        }
      }, [debouncedSchool]);

    const handleSubmit = controller => async dispatch => {

        if (id === undefined) {
            try {
                if(state.student_info.image !== null && _.isNil(state.student_info.image) === false) {
                    const {
                        identity_number,
                        school_id,
                        name,
                        age,
                        place_of_birth,
                        birth_of_date,
                        child_row,
                        total_sibling,
                        address,
                        sosial_status,
                        pos_code,
                        province_id,
                        regency_id,
                        district_id,
                        village_id,
                        image,
                    } = state.student_info
                    const {
                        education_status,
                        registered_at,
                        finished_at,
                        punishment_count,
                        punishment_start,
                        punishment_end,
                        juz_kuran_description,
                        chapter_kuran_description,
                        hadist_description,
                        education_description,
                    } = state.education_info
                    const {
                        parent_status,
                        father_name,
                        place_of_birth_father,
                        birth_of_date_father,
                        father_occupation,
                        father_phone,
                        father_status,
                        mother_name,
                        place_of_birth_mother,
                        birth_of_date_mother,
                        mother_occupation,
                        mother_phone,
                        mother_status,
                    } = state.parent_info
                    let postStudent = await studentPresenter.postNewStudentData(new StudentApiRequest(
                        identity_number,
                        school_id,
                        name,
                        _.toNumber(age),
                        place_of_birth,
                        moment(birth_of_date).toISOString(),
                        _.toNumber(child_row),
                        _.toNumber(total_sibling),
                        address,
                        sosial_status,
                        pos_code,
                        province_id,
                        regency_id,
                        district_id,
                        village_id,
                        education_status,
                        moment(registered_at).toISOString(),
                        moment(finished_at).toISOString(),
                        punishment_count,
                        moment(punishment_start).toISOString(),
                        moment(punishment_end).toISOString(),
                        juz_kuran_description,
                        chapter_kuran_description,
                        hadist_description,
                        education_description,
                        parent_status,
                        father_name,
                        place_of_birth_father,
                        moment(birth_of_date_father).toISOString(),
                        father_occupation,
                        formatPhone(father_phone),
                        father_status,
                        mother_name,
                        place_of_birth_mother,
                        moment(birth_of_date_mother).toISOString(),
                        mother_occupation,
                        formatPhone(mother_phone),
                        mother_status,
                        image,
    
                    ))
                    return postStudent
                } else {
                    const {
                        identity_number,
                        school_id,
                        name,
                        age,
                        place_of_birth,
                        birth_of_date,
                        child_row,
                        total_sibling,
                        address,
                        sosial_status,
                        pos_code,
                        province_id,
                        regency_id,
                        district_id,
                        village_id,
                    } = state.student_info
                    const {
                        education_status,
                        registered_at,
                        finished_at,
                        punishment_count,
                        punishment_start,
                        punishment_end,
                        juz_kuran_description,
                        chapter_kuran_description,
                        hadist_description,
                        education_description,
                    } = state.education_info
                    const {
                        parent_status,
                        father_name,
                        place_of_birth_father,
                        birth_of_date_father,
                        father_occupation,
                        father_phone,
                        father_status,
                        mother_name,
                        place_of_birth_mother,
                        birth_of_date_mother,
                        mother_occupation,
                        mother_phone,
                        mother_status,
                    } = state.parent_info
                    let postStudent = await studentPresenter.postNewStudentData(new CreateStudentApiRequestWithoutImage(
                        identity_number,
                        school_id,
                        name,
                        _.toNumber(age),
                        place_of_birth,
                        moment(birth_of_date).toISOString(),
                        _.toNumber(child_row),
                        _.toNumber(total_sibling),
                        address,
                        sosial_status,
                        pos_code,
                        province_id,
                        regency_id,
                        district_id,
                        village_id,
                        education_status,
                        moment(registered_at).toISOString(),
                        moment(finished_at).toISOString(),
                        punishment_count,
                        moment(punishment_start).toISOString(),
                        moment(punishment_end).toISOString(),
                        juz_kuran_description,
                        chapter_kuran_description,
                        hadist_description,
                        education_description,
                        parent_status,
                        father_name,
                        place_of_birth_father,
                        moment(birth_of_date_father).toISOString(),
                        father_occupation,
                        formatPhone(father_phone),
                        father_status,
                        mother_name,
                        place_of_birth_mother,
                        moment(birth_of_date_mother).toISOString(),
                        mother_occupation,
                        formatPhone(mother_phone),
                        mother_status,
    
                    ))
                    return postStudent
                }
            } catch (error) {
                return error.response
            }


        } else {
            
            try {
                if (state.student_info.image !== null && _.isNil(state.student_info.image) === false) {

                    const {
                        identity_number,
                        school_id,
                        name,
                        age,
                        place_of_birth,
                        birth_of_date,
                        child_row,
                        total_sibling,
                        address,
                        sosial_status,
                        pos_code,
                        province_id,
                        regency_id,
                        district_id,
                        village_id,
                        image
                    } = state.student_info
                    const {
                        education_status,
                        registered_at,
                        finished_at,
                        punishment_count,
                        punishment_start,
                        punishment_end,
                        juz_kuran_description,
                        chapter_kuran_description,
                        hadist_description,
                        education_description,
                    } = state.education_info
                    const {
                        parent_status,
                        father_name,
                        place_of_birth_father,
                        birth_of_date_father,
                        father_occupation,
                        father_phone,
                        father_status,
                        mother_name,
                        place_of_birth_mother,
                        birth_of_date_mother,
                        mother_occupation,
                        mother_phone,
                        mother_status,
                    } = state.parent_info
                    
                    let updateStudent = await studentPresenter.updateStudentData(new UpdateStudentApiRequest(
                        identity_number,
                        school_id,
                        name,
                        _.toNumber(age),
                        place_of_birth,
                        moment(birth_of_date).toISOString(),
                        _.toNumber(child_row),
                        _.toNumber(total_sibling),
                        address,
                        sosial_status,
                        pos_code,
                        province_id,
                        regency_id,
                        district_id,
                        village_id,
                        education_status,
                        moment(registered_at).toISOString(),
                        moment(finished_at).toISOString(),
                        punishment_count,
                        moment(punishment_start).toISOString(),
                        moment(punishment_end).toISOString(),
                        juz_kuran_description,
                        chapter_kuran_description,
                        hadist_description,
                        education_description,
                        parent_status,
                        father_name,
                        place_of_birth_father,
                        moment(birth_of_date_father).toISOString(),
                        father_occupation,
                        formatPhone(father_phone),
                        father_status,
                        mother_name,
                        place_of_birth_mother,
                        moment(birth_of_date_mother).toISOString(),
                        mother_occupation,
                        formatPhone(mother_phone),
                        mother_status,
                        image,
                    ), parseInt(id))
                    return updateStudent
                } else {
                    const {
                        identity_number,
                        school_id,
                        name,
                        age,
                        place_of_birth,
                        birth_of_date,
                        child_row,
                        total_sibling,
                        address,
                        sosial_status,
                        pos_code,
                        province_id,
                        regency_id,
                        district_id,
                        village_id,

                    } = state.student_info
                    const {
                        education_status,
                        registered_at,
                        finished_at,
                        punishment_count,
                        punishment_start,
                        punishment_end,
                        juz_kuran_description,
                        chapter_kuran_description,
                        hadist_description,
                        education_description,
                    } = state.education_info
                    const {
                        parent_status,
                        father_name,
                        place_of_birth_father,
                        birth_of_date_father,
                        father_occupation,
                        father_phone,
                        father_status,
                        mother_name,
                        place_of_birth_mother,
                        birth_of_date_mother,
                        mother_occupation,
                        mother_phone,
                        mother_status,
                    } = state.parent_info
                    let updateStudent = await studentPresenter.updateStudentData(new UpdateStudentApiRequestWithoutImage(
                        identity_number,
                        school_id,
                        name,
                        _.toNumber(age),
                        place_of_birth,
                        moment(birth_of_date).toISOString(),
                        _.toNumber(child_row),
                        _.toNumber(total_sibling),
                        address,
                        sosial_status,
                        pos_code,
                        province_id,
                        regency_id,
                        district_id,
                        village_id,
                        education_status,
                        moment(registered_at).toISOString(),
                        moment(finished_at).toISOString(),
                        punishment_count,
                        moment(punishment_start).toISOString(),
                        moment(punishment_end).toISOString(),
                        juz_kuran_description,
                        chapter_kuran_description,
                        hadist_description,
                        education_description,
                        parent_status,
                        father_name,
                        place_of_birth_father,
                        moment(birth_of_date_father).toISOString(),
                        father_occupation,
                        formatPhone(father_phone),
                        father_status,
                        mother_name,
                        place_of_birth_mother,
                        moment(birth_of_date_mother).toISOString(),
                        mother_occupation,
                        formatPhone(mother_phone),
                        mother_status,
                    ), parseInt(id))
                    return updateStudent
                }

            } catch (error) {
                return error.response
            }
        }
    }

    const handleInput = (e) =>
        dispatch => async actiontype => {
            if (e.target.name === 'province_id') {
                dispatch({
                    type: actiontype, payload: {
                        name: e.target.name,
                        value: e.target.value
                    }
                })
                let city = await cityPresenter.loadData({
                    filter: {
                        province_id: e.target.value
                    }
                })
                dispatch({
                    type: ActionType.setCity,
                    payload: city
                })


            } else if (e.target.name === "regency_id") {
                dispatch({
                    type: actiontype, payload: {
                        name: e.target.name,
                        value: e.target.value
                    }
                })
                let district = await districtPresenter.loadData({
                    filter: {
                        regency_id: e.target.value
                    }
                })
                dispatch({
                    type: ActionType.setDistrict,
                    payload: district
                })

            } else if (e.target.name === "district_id") {
                dispatch({
                    type: actiontype, payload: {
                        name: e.target.name,
                        value: e.target.value
                    }
                })
                let village = await villagePresenter.loadData({
                    filter: {
                        district_id: e.target.value
                    }
                })
                dispatch({
                    type: ActionType.setVillage,
                    payload: village
                })

            } else {
                dispatch({
                    type: actiontype, payload: {
                        name: e.target.name,
                        value: e.target.value
                    }
                })
            }

        }

    const handleImageUpload = (e) =>
        dispatch => actiontype => {
            dispatch({ type: actiontype, payload: [e.target.files[0], e.target.files[0].name] })
        }

        const loadData = (newValue, callback) => {
            const transformData = state.school.map((val) => {
              return {
                value: val.id,
                label: val.name,
              };
            });
            console.log(transformData);
            const witHDefaultValue = [
              {
                value: "",
                label: "SEMUA",
              },
              ...transformData,
            ];
        
            return callback(witHDefaultValue);
          };
        
          const debounce = async (inputValue) => {
            setQuerySchool(inputValue);
          };

    return (
        <StudentListInputProvider value={{
            ...state,
            handleSubmit: handleSubmit,
            handleInput: handleInput,
            handleImageUpload: handleImageUpload,
            dispatch: dispatch,
            isUpdateSession: isUpdateSession,
            setUpdateSession: setUpdateSession,
            userInfo: useraccess,
            isDetailSession,
            loadData,
            debounce
        }}>
            {children}
        </StudentListInputProvider>
    )
}

