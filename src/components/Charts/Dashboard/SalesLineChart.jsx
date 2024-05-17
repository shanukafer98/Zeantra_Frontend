import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const SalesLineChart = (props) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
    
      type: 'line',
      offsetY: 20,
      zoom: {
        enabled: false
      }
    },
    tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
        style: {
            colors: '#636363',
            fontSize: '14px',
        },
        y: {
            formatter: function (val) {
              return `${props.yaxix}: ` + val
            }
          }
       },
       grid: {
        show: true, 
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
        text: `Line Chart for ${props.yaxix} data`,
        align: 'center',
        floating: true,
        offsetY: -10,
        style: {
            color: '#636363',
            fontSize: '24px',
           
        }
        
      },
   
    xaxis: {
        
        labels: {
          style: {
              colors: '#708090',
              fontSize  : '8px'
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
                fontSize  : '12px'
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
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    }
  });

  useEffect(() => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    fetch(props.api) // using the API URL from props
      .then(response => response.json())
      .then(data => {
        const y = Object.values(data[props.yaxix]);
        const x = Object.keys(data.year).map(i => `${data.year[i]}-${monthNames[data.month[i] - 1]}`);
  
        setSeries([{ name: "series", data: y }]);
        setOptions(options => ({
          ...options,
          xaxis: { ...options.xaxis, categories: x }
        }));
      })
      .catch(error => console.error('Error:', error));
  }, [props.api]);

  return (
    <div className='overflow-x-auto'>
      <ReactApexChart options={options} series={series} type="line" width="1100" />
    </div>
  );
};

export default SalesLineChart;