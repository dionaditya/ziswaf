import Chart from 'react-apexcharts'
import React from 'react';

export function PieChart({ type, width, status, data }) {

  const donutData = {
    options: {
      chart: {
        type: 'donut'
      },
    },
    series: data,
    legend: {
      show: false
    }
  }

  return (
    <div className="app">
    <div className="row">
      <div className="mixed-chart">
        <Chart
          options={donutData}
          series={donutData.series}
          type={type}
          width={width}
        />
      </div>
    </div>
  </div>
  )
}