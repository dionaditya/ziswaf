import React from "react";
import BackNav from "@/app/container/components/BackNav";
import { CorporateController } from './Controller';
import TabNav from '@/app/container/components/TabNav'
import DonorInput from './components/DonorInput';
import DonationInput from './components/DonationInput';
import Receipts from './components/Receipt';
import { useLocation, useParams, useRouteMatch } from 'react-router-dom'
import _ from 'lodash'
import UpzInput from './components/UpzInput';
import TabNavDisable from '@/app/container/components/TabNavDisable';

const TabContent = ({ value, setValue }) => {
  return (
    <div>
      {value === 0 && <UpzInput index={0} setIndex={setValue} />}
      {value === 1 && <DonorInput index={1} setIndex={setValue} />}
      {value === 2 && <DonationInput index={2} setIndex={setValue} />}
      {value === 3 && <Receipts index={3} setIndex={setValue} />}
    </div>
  )
}


const Corporate: React.FC<{}> = () => {
  const [value, setValue] = React.useState(0)


  const { transaction_id, donor_id } = useParams()
  const location = useLocation()
  const donor = useRouteMatch('/dashboard/upz-transaction/:donor_id')
  const transaction = useRouteMatch('/dashboard/upz-tanda-terima/:transaction_id')
  const upz = useRouteMatch('/dashboard/upz/donor')


  const tabs = [
    {
      name: 'Data UPZ',
      link: '/dashboard/upz',
    },
    {
      name: 'Data Donatur',
      link: '/dashboard/upz/donor'
    },
    {
      name: 'Data Donasi',
      link: `/dashboard/upz-transaction/${donor_id}`,
    },
    {
      name: 'Tanda Terima',
      link: `/dashboard/upz-tanda-terima/${transaction_id}`
    },
  ]
  const handleChange = (e, i) => {
    setValue(i)
  }

  React.useEffect(() => {
    if (upz) {
      setValue(1)
    } else if (donor) {
      setValue(2)
    } else if (transaction) {
      setValue(3)
    } else {
      setValue(0)
    }
  }, [location.pathname])

  return (
    <React.Fragment>
      <CorporateController>
        <div className="row">
          <div className="col s12 l12 m12">
            <BackNav title="Input Ziswaf UPZ" />
            <TabNavDisable
              link
              value={value}
              handleChange={handleChange}
              tabs={tabs}
              render={(render) =>
                <TabContent value={value} setValue={setValue} />} />
          </div>
        </div>
      </CorporateController>
    </React.Fragment >
  );
};

export default Corporate;
