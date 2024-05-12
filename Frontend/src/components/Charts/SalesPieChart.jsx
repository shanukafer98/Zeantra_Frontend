import React from 'react';
import ReactApexChart from 'react-apexcharts';

class SalesPieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {
        labels: [],
        colors: ['#011f4b', '#03396c', '#005b96', '#6497b1', '#b3cde0', '#000000'],
        
        tooltip: {
          enabled: true,
          shared: true,
          followCursor: true,
          
          x: {
            show: true
          },
          y: {
            formatter: function(val) {
              return "$" + (val/1000000).toFixed(2) + "Mn";
              
            }
          },
          fillSeriesColor: true,
          
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom', // or 'top', 'left', 'right'
              horizontalAlign: 'center', // or 'left', 'right'
              verticalAlign: 'middle', 
              
            }
          }
        }]
      }
    };
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/Sales/Sales_Frontend') 
      .then(response => response.json())
      .then(data => {
        let salesData = {};

        for (let i in data.year) {
          if (!salesData[data.year[i]]) {
            salesData[data.year[i]] = 0;
          }
          salesData[data.year[i]] += data.fsales[i];
        }

        this.setState({
          series: Object.values(salesData),
          options: {
            ...this.state.options,
            labels: Object.keys(salesData)
          }
        });
      })
      .catch(error => console.error('Error:', error));
  }

  render() {
    return (
      <div className='text-black dark:text-white'>
        <p className='text-center text-2xl font-bold text-gray-900 my-4 '>Sales (Year Wise)</p>
        <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width="400"  />
      </div>
    );
  }
}

export default SalesPieChart;