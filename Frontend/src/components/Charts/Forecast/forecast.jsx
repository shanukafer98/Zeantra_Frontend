import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const Forecast = (props) => {
  const [sales_or_profit_data, setSales_or_ProfitData] = useState({});
  const [startDate, setStartDate] = useState('2011-01');
  const [endDate, setEndDate] = useState('2014-12');
  const [forecastMonths, setForecastMonths] = useState(12); 
  

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${props.api}?step=${forecastMonths}`); // Include forecastMonths in the request
      setSales_or_ProfitData(response.data);
     
    };

    fetchData();
  }, [forecastMonths]); // Add forecastMonths as a dependency

  useEffect(() => {
    const fetchDateRange = async () => {
      const response = await axios.get(`http://127.0.0.1:8000/ValueCounts/FullTimePeriod_Frontend`);
      const [startYear, startMonth, endYear, endMonth] = response.data;
      setStartDate(`${startYear}-${startMonth < 10 ? '0' + startMonth : startMonth}`);
      setEndDate(`${endYear}-${endMonth < 10 ? '0' + endMonth : endMonth}`);
    };

    fetchDateRange();
  }, []);
  const handleButtonClick = (months) => {
    setForecastMonths(months); // Update forecastMonths when a button is clicked
  };

  const indexToYearMonth = (index) => {
    const year = Math.floor(index / 12) + 2011;
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[index % 12];
    return `${year}-${month}`;
  };

  const pastData = Object.keys(sales_or_profit_data).map(Number).map(key => key <= 47 ? parseFloat(sales_or_profit_data[key]).toFixed(2) : null);
  const forecastData = Array(48).fill(null).concat(Object.keys(sales_or_profit_data).map(Number).filter(key => key >= 48).map(key => parseFloat(sales_or_profit_data[key]).toFixed(2)));

  const options = {
    chart: {
      id: 'sales_or_profit_chart',
      offsetY: 20,

    },
    xaxis: {
      categories: Array.from({ length: Object.keys(sales_or_profit_data).length }, (_, i) => indexToYearMonth(i)),
      labels: {
        style: {
          colors: '#708090',
          fontSize: '8px'
        }
      },
      title: {
        text: "Year-Month",
        style: {
          color: '#708090',
          fontSize: '16px',
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#708090',
          fontSize: '12px'
        },

      },
      title: {
        text: props.yaxix,
        style: {
          color: '#708090',
          fontSize: '16px',
        }
      }
    },
    stroke: {
      curve: 'smooth',
      dashArray: [0, 5],
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: `Forecast Chart for ${props.yaxix} data for next ${forecastMonths} months`,
      align: 'center',

      floating: true,
      offsetY: -10,
      margin: 40,
      style: {
        color: '#636363',
        fontSize: '24px',

      }

    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      fontSize: '18px',
      fontFamily: 'Helvetica, Arial',
      fontWeight: 900,
      labels: {
        colors: '#708090',
        useSeriesColors: false
      },

      style: {

        fontSize: '16px',
        useSeriesColors: true
      },
      itemMargin: {
        horizontal: 10,
        vertical: 30
      },
    },
    markers: {
      offsetX: 10,
      offsetY: 10,
      
    },
    tooltip: {
      followCursor: false,
      theme: 'dark',
      fillSeriesColor: false,
      style: {
        colors: '#636363',
        fontSize: '14px',
      },

      x: {
        format: 'yyyy-MMM'
      },
      onDatasetHover: {
        highlightDataSeries: false,
      },
    }
  };

  const series = [
    {
      name: 'Past Sales',
      data: pastData,
    },
    {
      name: 'Forecast Sales',
      data: forecastData,
    },

  ];

  return (
    <>
      <Chart options={options} series={series} type="line" />
      <h3 className='text-blue-700 text-2xl text-center my-3 font-extrabold'>Get forcast based on time frames</h3>
      <div className="flex justify-center items-center flex-wrap my-3">

        <button onClick={() => handleButtonClick(3)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">3 months</button>
        <button onClick={() => handleButtonClick(6)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">6 months</button>
        <button onClick={() => handleButtonClick(9)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">9 months</button>
        <button onClick={() => handleButtonClick(12)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">12 months</button>
        
      </div>
    </>
  );
};

export default Forecast;