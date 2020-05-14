import React from 'react';
import Chart from 'react-apexcharts'
import formatPrice from '@/app/infrastructures/misc/Utils';
import convertCurrency from '@/app/infrastructures/misc/LabelCurrency';

export function MyChart({ type, width, colors, series, categories, role, categoriesPerday }) {
  const data = {
    options: {
      chart: {
        type: 'line',
        toolbar: {
          show: false
        }
      },
      colors: colors,
      stroke: {
        curve: 'smooth'
      },
      grid: {
        borderColor: '#EBEDF4',
        row: {
          colors: ['transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 4,
        color: '#3ACA60'
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      },
      xaxis: {
        categories: role === 1 ? categories : categoriesPerday,
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return convertCurrency(value);
          }
        },
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (seriesName) => formatPrice(seriesName),
          title: {
            formatter: (seriesName) => seriesName,
          },
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    series: series
  };

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={data.options}
            series={series}
            type={type}
            width={width}
            height="300vh"
          />
        </div>
      </div>
    </div>
  );
}

export function ChartCategories({ type, width, colors, series, categories }) {
  const data = {
    options: {
      chart: {
        height: 350,
        type: 'line',
        toolbar: {
          show: false
        }
      },
      colors: colors,
      stroke: {
        curve: 'smooth'
      },
      grid: {
        borderColor: '#ffffff',
        row: {
          colors: ['transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 4,
        color: '#3ACA60'
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      },
      xaxis: {},
      yaxis: {
        labels: {
          formatter: function (value) {
            return convertCurrency(value);
          }
        },
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (seriesName) => formatPrice(seriesName),
          title: {
            formatter: (seriesName) => seriesName,
          },
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    series: series
  };

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={data.options}
            series={series}
            type={type}
            width={width}
          />
        </div>
      </div>
    </div>
  );
}

export function PieChart({ type, width, status, data }) {

  const donutData = {
    options: {
      chart: {
        type: 'donut'
      },
    },
    series: data,
    chartOptions: {
      lables: ['Apple', 'Mango', 'Orange', 'Watermelon']
    },
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

export function ComboChartGeneral({ title, title2, type, width, color, dataPrognosis, dataTransaction, role, dataPerDay, dataPerDayProp }) {
  const options = {
    series: [{
      name: title,
      type: 'column',
      data: role !== 2 ? dataTransaction : dataPerDay
    }, {
      name: role === 1 ? title2 : '',
      type: 'line',
      data: role !== 2 ? dataPrognosis : []
    }],
    chart: {
      height: 350,
      type: 'line',
    },
    stroke: {
      width: [0, 4],
      curve: 'smooth'
    },
    title: {
      text: ''
    },
    dataLabels: {
      enabled: false,
      enabledOnSeries: [1],
    },
    labels: role !== 2 ? [' January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] : dataPerDayProp,
    xaxis: {
      type: 'string',
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (seriesName) => formatPrice(seriesName),
        title: {
          formatter: (seriesName) => seriesName,
        },
      }
    },
    colors: color,
    yaxis: {
      min: 0,
      max: dataPrognosis === [] ? 10000000 : Math.round(Math.max(...dataPrognosis)+10000000),
      tickAmount: 4,
      labels: {
        formatter: function (value) {
          return convertCurrency(value);
        }
      },
    },
  };
  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={options.series}
            type={type}
            width={width}
          />
        </div>
      </div>
    </div>
  )
}

export function ComboChartOperator({ title, type, width, color, dataTransaction, dataPerDayProp }) {

  const options = {
    series: [{
      name: '',
      type: 'column',
      data: dataTransaction.map(item => item.total)
    }],
    color: ['#00923F'],
    chart: {
      height: 350,
      type: 'line',
    },
    stroke: {
      width: [0, 4],
      curve: 'smooth'
    },
    title: {
      text: ''
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (seriesName) => formatPrice(seriesName),
        title: {
          formatter: (seriesName) => seriesName,
        },
      }
    },
    labels: dataPerDayProp,
    xaxis: {
      type: 'string',
    },
    colors: color,
    yaxis: {
      labels: {
        formatter: function (value) {
          return convertCurrency(value);
        }
      },
    },
  };
  return (
    <div className="app">
      <Chart
        options={options}
        series={options.series}
        type={type}
        width={width}
      />
    </div>
  )
}

export function ComboCharts({ title, title2, type, width, color, dataPrognosis, dataPerMonth, role, dataPerDay, dataPerDayProp }) {
  const options = {
    series: [{
      name: title,
      type: 'column',
      data: role !== 2 ? dataPerMonth : dataPerDay.map(val => val.total)
    }, {
      name: role === 1 ? title2 : '',
      type: 'line',
      data: role !== 2 ? dataPrognosis : []
    }],
    chart: {
      height: 350,
      type: 'line',
    },
    stroke: {
      width: [0, 4],
      curve: 'smooth'
    },
    title: {
      text: ''
    },
    dataLabels: {
      enabled: false,
      enabledOnSeries: [1],
    },
    labels: role !== 2 ? [' January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] : dataPerDayProp,
    xaxis: {
      type: 'string',
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (seriesName) => formatPrice(seriesName),
        title: {
          formatter: (seriesName) => seriesName,
        },
      }
    },
    colors: color,
    yaxis: {
      min: 0,
      max: dataPrognosis === [] ? 10000000 : Math.round(Math.max(...dataPrognosis)+10000000),
      tickAmount: 4,
      labels: {
        formatter: function (value) {
          return convertCurrency(value);
        }
      },
    },
  };
  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={options.series}
            type={type}
            width={width}
          />
        </div>
      </div>
    </div>
  )
}

export function ComboChartOperatorDivision({ title, title2, type, width, color, dataPrognosis, dataPerMonth, role, dataPerDay, dataPerDayProp }) {
  const options = {
    series: [{
      name: title,
      type: 'column',
      data: role !== 2 ? dataPerMonth : dataPerDay.map(val => val.total)
    }, {
      name: role === 1 ? title2 : '',
      type: 'line',
      data: role !== 2 ? dataPrognosis : []
    }],
    chart: {
      height: 350,
      type: 'line',
    },
    stroke: {
      width: [0, 4],
      curve: 'smooth'
    },
    title: {
      text: ''
    },
    dataLabels: {
      enabled: false,
      enabledOnSeries: [1],
    },
    labels: role !== 2 ? [' January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] : dataPerDayProp,
    xaxis: {
      type: 'string',
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (seriesName) => formatPrice(seriesName),
        title: {
          formatter: (seriesName) => seriesName,
        },
      }
    },
    colors: color,
    yaxis: {
      labels: {
        formatter: function (value) {
          return convertCurrency(value);
        }
      },
    },
  };
  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={options.series}
            type={type}
            width={width}
          />
        </div>
      </div>
    </div>
  )
}

export function ComboChartCorporate({ type, width, color, dataPrognosis, dataPerMonth }) {
  const options = {
    series: [{
      name: 'Realisasi Corporate',
      type: 'column',
      data: dataPerMonth
    }, {
      name: 'Prognosis Corporate',
      type: 'line',
      data: dataPrognosis
    }],
    chart: {
      height: 350,
      type: 'line',
    },
    stroke: {
      width: [0, 4],
      curve: 'smooth'
    },
    title: {
      text: ''
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: [' January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    xaxis: {
      type: 'string',
    },
    colors: color,
    yaxis: [{
      title: {
        text: '',
      },

    }, {
      opposite: true,
      title: {
        text: ''
      }
    }]
  };
  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={options.series}
            type={type}
            width={width}
          />
        </div>
      </div>
    </div>
  )
}