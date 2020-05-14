import React, { Component } from "react";
import { Link } from "react-router-dom";
import BackNav from "@/app/container/components/BackNav";
import TabNav from '@/app/container/components/TabNav'
import DonorInput from './components/DonorInput';
import DonationInput from './components/DonationInput';
import Receipts from './components/Receipt';
import { RetailController } from './Controller';
import { useLocation, useParams, useRouteMatch } from 'react-router-dom'
import _ from 'lodash'
import { ToastProvider } from 'react-toast-notifications'
import TabNavDisable from '@/app/container/components/TabNavDisable';



const TabContent = ({ value, setValue }) => {
  return (
    <div>
      {value === 0 && <ToastProvider><DonorInput index={0} setIndex={setValue} /></ToastProvider>}
      {value === 1 && <DonationInput index={1} setIndex={setValue} />}
      {value === 2 && <Receipts index={2} setIndex={setValue} />}
    </div>
  )
}

const Retail: React.FC<{}> = () => {
  const [value, setValue] = React.useState(0)
  const location = useLocation()
  const { id, transaction_id } = useParams()
  const donor = useRouteMatch('/dashboard/donation/retail/transaction/:id')
  const transaction = useRouteMatch('/dashboard/donation/retail/tanda-terima/:transaction_id')

  const tabs = [
    {
      name: 'Data Donatur',
      link: '/dashboard/donation/retail'
    },
    {
      name: 'Data Donasi',
      link: `/dashboard/donation/retail/transaction/${id}`
    },
    {
      name: 'Tanda Terima',
      link: `/dashboard/donation/retail/tanda-terima/${transaction_id}`
    },
  ]

  const handleChange = (e, i) => {
    setValue(i)
  }

  React.useEffect(() => {
    if (donor) {
      setValue(1)
    } else if (transaction) {
      setValue(2)
    } else {
      setValue(0)
    }
  }, [location.pathname])

  return (
    <React.Fragment>
      <RetailController>
      <ToastProvider>
        <div className="row">
          <div className="col s12 l12 m12">
            <BackNav title="Input Retail Ziswaf" />
            <TabNavDisable
              link
              value={value}
              handleChange={handleChange}
              tabs={tabs}
              render={(render) =>
              <TabContent value={value} setValue={setValue} />} />
          </div>
        </div>
      </ToastProvider>
        
      </RetailController>
    </React.Fragment>
  );
}

export default Retail