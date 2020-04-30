import React from 'react'
import { Tabs, Tab } from "@material-ui/core";
import {Link, useLocation} from 'react-router-dom'


export const TabPanel = ({ render }) => {
    return (
        <div>
            {render}
        </div>
    )
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabNav = (props) => {
    const { handleChange, tabs, value, render, link } = props
    if(link) {
        return (
            <div>
                <Tabs
                    TabIndicatorProps={{ style: { background: '#8bc34a' } }}
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example">
                    {
                        tabs.map((tab, i) => {
                            return (
                               <>
                                        <Link to={tab.link} className="black-text" style={{
                                            textDecoration: 'none',
                                            color: '#000'
                                        }}>
                                                <Tab key={i} label={tab.name} {...a11yProps(i)} />
                                        </Link> 
                               </>
                            )
                        })
                    }
                </Tabs>
                {render()}
            </div>
        )
    }
    return (
        <div>
            <Tabs
                TabIndicatorProps={{ style: { background: '#8bc34a' } }}
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example">
                {
                    tabs.map((tab, i) => {
                        return (
                            <Tab key={i} label={tab.name} {...a11yProps(i)} />
                        )
                    })
                }
            </Tabs>
            {render()}
        </div>
    )
}

export default TabNav;