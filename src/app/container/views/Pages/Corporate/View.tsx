import React from "react";
import { Link } from "react-router-dom";
import BackNav from "@/app/container/components/BackNav";
import { CorporateController } from './Controller';
import TabNav from '@/app/container/components/TabNav'
import DonorInput from './components/DonorInput';
import DonationInput from './components/DonationInput';
import Receipts from './components/Receipt';
import { useLocation, useParams, useRouteMatch } from 'react-router-dom'
import _ from 'lodash'
import TabNavDisable from '@/app/container/components/TabNavDisable';


const TabContent = ({ value, setValue }) => {
  return (
    <div>
      {value === 0 && <DonorInput index={0} setIndex={setValue} />}
      {value === 1 && <DonationInput index={1} setIndex={setValue} />}
      {value === 2 && <Receipts index={2} setIndex={setValue} />}
    </div>
  )
}


const Corporate: React.FC<{}> = () => {
  const [value, setValue] = React.useState(0)


  const location = useLocation()
  const { id, transaction_id, donor_id } = useParams()
  const donor = useRouteMatch('/dashboard/corporate-transaction/:donor_id')
  const transaction = useRouteMatch('/dashboard/corporate-tanda-terima/:transaction_id')

  const tabs = [
    {
      name: 'Data Donatur',
      link: '/dashboard/corporate/donor'
    },
    {
      name: 'Data Donasi',
      link: `/dashboard/corporate-transaction/${donor_id}`,
    },
    {
      name: 'Tanda Terima',
      link: `/dashboard/corporate-tanda-terima/${transaction_id}`
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
  }, [])

  return (
    <React.Fragment>
      <CorporateController>
        <div className="row">
          <div className="col s12 l12 m12">
            <BackNav title="Input Ziswaf Corporate" />
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
    </React.Fragment>
  );
};

export default Corporate;
