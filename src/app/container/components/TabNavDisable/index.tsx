import React from 'react'
import { Tabs, Tab } from "@material-ui/core";
import { Link, useLocation } from 'react-router-dom'


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

const TabNavDisable = ({ handleChange, tabs, value, render, link }) => {
    const location = useLocation()
    if (link) {
        return (
            <div>
                <Tabs
                    TabIndicatorProps={{ style: { background: '#8bc34a' } }}
                    value={value}
                    onChange={handleChange}
                    style={{
                        background: 'white'
                    }}
                    aria-label="simple tabs example">
                    {
                        tabs.map((tab, i) => {
                            return (
                                <>
                                    {location.pathname === tab.link ?
                                        (
                                            <Link to={tab.link} className="black-text" style={{
                                                textDecoration: 'none',
                                                color: '#000'
                                            }}>
                                                <Tab key={i} label={tab.name} {...a11yProps(i)} />
                                            </Link>
                                        ) : (
                                            <Tab key={i} label={tab.name} {...a11yProps(i)} disabled style={{
                                                background: '#fafafa'
                                            }}/>
                                        )
                                    }
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
                        if(value === i) {
                            return (
                                <Tab key={i} label={tab.name} {...a11yProps(i)} />
                            )
                        } else {
                            return (
                                <Tab key={i} label={tab.name} {...a11yProps(i)} disabled/>
                            )
                        }
                      
                    })
                }
            </Tabs>
            {render()}
        </div>
    )
}

export default TabNavDisable;