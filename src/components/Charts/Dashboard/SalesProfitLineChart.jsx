import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const SalesProfitLineChart = () => {
  const [options, setOptions] = useState({
    chart: {
    fontFamily: 'Satoshi, sans-serif',
  
    type: 'line',
    
    toolbar: {
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
       
      },
      autoSelected: 'zoom' 
    },
    title: {
      text: "Sales and Profit Line Chart",
      align: 'center',
      floating: true,
     
      offsetY: -10,
      margin: 40,
      style: {
          color: '#636363',
          fontSize: '24px',

      }
    },

    dropShadow: {
      enabled: false,
      color: '#000000',
      top: 10,
      blur: 4,
      left: 2,
      opacity: 0.9,
    },

      zoom: {
        enabled: true,
        type: 'xy', // or 'y' or 'xy'
        
      },

    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth'
    },
    grid: {
      show: true,
      borderColor: 'rgba(128, 128, 128, 0.5)',
      
      
      strokeDashArray: 0,
      
      position: 'back',
      xaxis: {
        lines: {
          show: true,
          

        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },

    },
    
    title: {
      text: 'Sales and Profit Line Chart',
      align: 'center',
      offsetY: -10,
      margin: 40,
      style: {
        fontSize:  '24px',
        color: '#636363'
      },
    },
    markers: {
      size: 2,
      style: 'filled',
      colors: '#fff',
    },
    xaxis: {
      type: 'numeric',
      categories: [],
      tickPlacement: 'between',
      labels:{ 
        style: {
          colors: 'rgba(128,128,128)', // Set the color of the y-axis labels
      },},
      axisBorder: {
        show: true,
        color: 'rgba(128,128,128)', // Set the color of the Sales y-axis line
      },
    },
    yaxis: [
      
      {
        seriesName: 'Sales',
        opposite: true,
        title: {
          text: 'Sales(in Million)',
          style: {
            color: 'rgba(128,128,128)', // Set the color of the Profit y-axis title
            fontSize: '16px', // Set the font size of the Profit y-axis title
            fontFamily: 'Arial', // Set the font family of the Profit y-axis title
          },
         
        },
        labels: {
          style: {
            colors: 'rgba(128,128,128)', // Set the color of the Sales y-axis labels
          },
        },

      },
      {
        seriesName: 'Profit',
        title: {
          text: 'Profit(in Million)',
          style: {
            color: 'rgba(128,128,128)', // Set the color of the Profit y-axis title
            fontSize: '16px', // Set the font size of the Profit y-axis title
            fontFamily: 'Arial', // Set the font family of the Profit y-axis title
          },
         
          
        },
        labels: {
          style: {
            colors: 'rgba(128,128,128)', // Set the color of the Profit y-axis labels
          },
        },
        
      },
      
    ],
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
      style: {
          colors: '#636363',
          fontSize: '14px',
      },
     },
     
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '16px',
      labels: {
        useSeriesColors: true
    },

      
    },
  });

  const [series, setSeries] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('http://127.0.0.1:8000/Sales/Sales_Frontend'),
      fetch('http://127.0.0.1:8000/Sales/Profit_Frontend')
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([salesData, profitData]) => {
        const data = {};
        let cumulativeSales = 0;
        let cumulativeProfit = 0;
  
        for (let i in salesData.year) {
          if (!data[salesData.year[i]]) {
            data[salesData.year[i]] = { sales: 0, profit: 0 };
          }
          cumulativeSales += salesData.sales[i];
          data[salesData.year[i]].sales = cumulativeSales;
        }
  
        if (profitData && profitData.year) {
          for (let i in profitData.year) {
            if (!data[profitData.year[i]]) {
              data[profitData.year[i]] = { sales: 0, profit: 0 };
            }
            cumulativeProfit += profitData.profit[i];
            data[profitData.year[i]].profit = cumulativeProfit;
          }
        }
  
        setSeries([
          {
            name: "Sales",
            data: Object.values(data).map(d => Number((d.sales / 1000000).toFixed(2))),
            yAxisIndex: 0
          },
          {
            name: "Profit",
            data: Object.values(data).map(d => Number((d.profit / 1000000).toFixed(2))),
            yAxisIndex: 1
          }
        ]);
  
        setOptions(prevOptions => ({
          ...prevOptions,
          xaxis: {
            ...prevOptions.xaxis,
            type: 'category',
            categories: Object.keys(data)
          }
        }));
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
  
      <ReactApexChart options={options} series={series} type="line"  height = "600"/>
   
  );
}

export default SalesProfitLineChart;