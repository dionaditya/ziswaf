import React from 'react';
import Chart from "react-apexcharts";
import { isEmpty } from 'lodash';

export function PieChart({ type, width, status, data, series, total }) {
    // console.log("pieData", pieData)
    const pieColor = data.map(item => {
        return item.color
    });
    const pieLabel = data.map(item => item.label);
    
    const donutData = {
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return total > 0 ? Math.round(val) + "%" : '0%';
        },
      },
      labels: total > 0 ? pieLabel : ['Total Ziswaf'],
      colors: total > 0 ? pieColor : ['#EFF2F5'],
      options: {
        chart: {
          type: 'donut',
        },
      },
      series: total > 0 ? series : [100],
      chartOptions: {
        lables: ["", "", "", ""],
      },
      legend: {
        show: false,
      },
    };
  
    return (
      <Chart
        options={donutData}
        series={donutData.series}
        type={type}
        width={width}
      />
    );
  }

  export default PieChart;