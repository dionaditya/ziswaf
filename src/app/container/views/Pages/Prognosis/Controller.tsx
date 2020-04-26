import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { container } from 'tsyringe'
import { PrognosisPresenter } from '@/app/infrastructures/Presenter/Prognosis/Presenter'
import history from '@/app/infrastructures/misc/BrowserHistory'
import { isEmpty } from 'lodash';

/**
 * Initial state
 */
interface IState {
    data: any;
    loading: boolean;
    yearlyOption: Array<Object>;
    selectedYearlyOption: number;
    state: Object;
    isFirst: boolean;
    handleSetState: Function;
    _fetchData: Function;
    _setYearlyOption: Function;
    handleSendData: Function;
}

/**
 * Type for yearly Option
 */
type objectOption = {
  value: number;
  label: string;
}

/**
 * type for data response
 */
type objectResponse = {
    total: number, 
    percentage: number, 
    items: Array<object>
}

/**
 * Type for State
 */
type state = {
    totalPrognosis: 0,
    totalPrognosisRetail: 0
    totalPrognosisCorporate: 0
    totalPrognosisUpz: 0,
    itemPrognosisRetail: [],
    itemPrognosisCorporate: [],
    itemPrognosisUpz: [],
    selectedTab: 0,
    isModalConfirm: false,
    isLoadingSubmit: false
 }

const currentYear = moment().format('YYYY');

const renderYearlyOption = () => {
  let options: Array<any> = [];
  for(let i = 0; i < 4; i++){
    const value = parseInt(currentYear, 10) + i;
    let option =  {} as objectOption;
    option.value = value
    option.label = value.toString();
    options.push(option);
  }

  return options;
}

const defaultState = {
    data: [],
    loading: false,
    selectedYearlyOption: 0,
    _setYearlyOption:  () => {},
    _fetchData: () => {},
    yearlyOption: [],
    state: {},
    isFirst: false,
    handleSetState: () => {},
    handleSendData: () => {}
}

export const PrognosisContext = React.createContext<IState>(defaultState)
export const { Provider: PrognosisProvider, Consumer: PrognosisConsumer } = PrognosisContext

export const PrognosisController = ({ children }) => {
    const prognosisPresenter: PrognosisPresenter = container.resolve(PrognosisPresenter)
    const [data, setData] = useState<objectResponse>({total: 0, percentage: 0, items: []})
    const [loading, setLoading] = useState<boolean>(false)
    const [isFirst, setIsFirst] = useState<boolean>(false)
    const [selectedYearlyOption, setYearlyOption] = useState<number>(parseInt(currentYear, 10))
    const [yearlyOption] = useState<Array<Object>>(renderYearlyOption())
    const [state, setState] = useState<state>({
        totalPrognosis: 0,
        totalPrognosisRetail: 0,
        totalPrognosisCorporate: 0,
        totalPrognosisUpz: 0,
        itemPrognosisRetail: [],
        itemPrognosisCorporate: [],
        itemPrognosisUpz: [],
        selectedTab: 0,
        isModalConfirm: false,
        isLoadingSubmit: false,
    })


    const setDataYearlyOption = async (value) => {
        setYearlyOption(value)
        fetchData(value)
    }

    const fetchData = async (year) => {
        setLoading(true)
        const filter = {
            filter: {
                year
            },
        }
        try {
            setLoading(false)
            let res = await prognosisPresenter.getAll(filter)
            handleSetState('totalPrognosis', res.total)
            handleTotalPerPrognosis(res.items)
            setData(res)
            if(isEmpty(res.items)) {
                setIsFirst(true)
            }
        } catch (error) {
        }
    }

    const handleSetState = (name, value) => {
        setState(prevState => {
            return {...prevState, [name]: value };
          });
    }

    const handleTotalPerPrognosis = (prognosis) => {
        const prognosisRetail = prognosis.filter(progs => progs.division_id === 2);
        const totalPrognosisRetail = prognosisRetail.reduce((accumulator, progs) => {
            return accumulator + progs.total;
          }, 0);
        handleSetState('totalPrognosisRetail',  totalPrognosisRetail)
        handleSetState('itemPrognosisRetail',  prognosisRetail)

        const prognosisCorporate = prognosis.filter(progs => progs.division_id === 3);
        const totalPrognosisCorporate = prognosisCorporate.reduce((accumulator, progs) => {
            return accumulator + progs.total;
          }, 0);
        handleSetState('totalPrognosisCorporate',  totalPrognosisCorporate)
        handleSetState('itemPrognosisCorporate',  prognosisCorporate)

        const prognosisUpz = prognosis.filter(progs => progs.division_id === 1);
        const totalPrognosisUpz = prognosisUpz.reduce((accumulator, progs) => {
            return accumulator + progs.total;
          }, 0);
        handleSetState('totalPrognosisUpz',  totalPrognosisUpz)
        handleSetState('itemPrognosisUpz',  prognosisUpz)
    }

    useEffect(() => {
        fetchData(selectedYearlyOption)
    }, [])

    const handleSendData = async (data) => {
        handleSetState('isLoadingSubmit', true)
        const { Retail, Corporate, Upz} = await data
        let resRetail = await prognosisPresenter.store(Retail);
        let resCorporate = await prognosisPresenter.store(Corporate);
        let resUpz = await prognosisPresenter.store(Upz);
        Promise.all([resRetail, resCorporate, resUpz]).then(function(values){
            handleSetState('isLoadingSubmit', false)
            handleSetState('isModalConfirm', false)
            history.push('/dashboard/prognosis')
            return values
          }).catch(function(err){
            handleSetState('isLoadingSubmit', false)
          })

    }

    return (
        <PrognosisProvider value={{handleSendData, data, state, handleSetState, loading, _fetchData: fetchData , yearlyOption, _setYearlyOption: setDataYearlyOption, selectedYearlyOption, isFirst}}>
            {children}
        </PrognosisProvider>
    )
}
