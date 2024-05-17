import React from 'react';
import DatePicker from 'react-datepicker';
import ReactApexChart from 'react-apexcharts';
import "react-datepicker/dist/react-datepicker.css";

class SalesPieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            series: [],
            options: {
                
                labels: [],
                dataLabels: {
                    enabled: true,
                    formatter: function (val, opts) {
                        return opts.w.config.series[opts.seriesIndex]
                    },
                },
                colors: ['#011f4b', '#03396c', '#005b96', '#6497b1', '#b3cde0', '#000000', '#023e7d', '#0077b6'],
               
                title: {
                    text: props.title,
                    align: 'center',
                    floating: true,
                   
                    offsetY: -10,
                    margin: 40,
                    style: {
                        color: '#636363',
                        fontSize: '24px',
        
                    }
                },
                tooltip: {
                 theme: 'dark',
                 fillSeriesColor: false,
                 style: {
                     colors: '#636363',
                     fontSize: '14px',
                 },
                },

                animations: {
                    enabled: true,
                    easing: 'easein',  // can be 'linear', 'easeout', 'easein', 'easeinout'
                    speed: 8000,  // animation speed in milliseconds
                    animateGradually: {
                        enabled: true,
                        delay: 150 // delay in milliseconds
                    },
                    dynamicAnimation: {
                        enabled: false,
                        speed: 350 // dynamic animation speed in milliseconds
                    }
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: '80%'
                            },
                            legend: {
                                position: 'bottom'
                            },
                            title: {
                                style: {
                                    fontSize: '18px'
                                }
                            }
                        }
                    }
                ],

                legend: {
                    show: true, // set to false to hide the legend
                    position: 'bottom', // can be 'top', 'bottom', 'left', 'right'
               
                        labels: {
                            colors: '#708090',
                            useSeriesColors: false
                        },
                    
                    horizontalAlign: 'center', // can be 'left', 'center', 'right'
                    floating: false,
                    fontSize: '16px',
                    fontWeight: 'bold',
                    offsetY: 7,
                    markers: {
                        width: 15,
                        height: 15,
                        strokeWidth: 9,
                        strokeColor: '#fff',
                        fillColors: undefined,
                        radius: 12,
                        customHTML: undefined,
                        onClick: undefined,
                        offsetX: 0,
                        offsetY: 0
                    },
                    itemMargin: {
                        horizontal: 10,
                        vertical: 5
                    },
                    onItemClick: {
                        toggleDataSeries: true
                    },
                    onItemHover: {
                        highlightDataSeries: true
                    },
                },


            }
        };
    }

    componentDidMount() {
        fetch(`${process.env.ENDPOINT}/ValueCounts/FullTimePeriod_Frontend`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    startDate: new Date(data[0], data[1] - 1),
                    endDate: new Date(data[2], data[3] - 1)
                }, this.fetchData);  // Call fetchData after the state is updated
            });
    }
    fetchData = () => {
        const startYear = this.state.startDate.getFullYear();
        const startMonth = this.state.startDate.getMonth() + 1;
        const endYear = this.state.endDate.getFullYear();
        const endMonth = this.state.endDate.getMonth() + 1;

        fetch(`${this.props.url}?start_year=${startYear}&start_month=${startMonth}&end_year=${endYear}&end_month=${endMonth}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.message) {
                    // No data was found for the specified time period
                    // Set the state to reflect this and display a message to the user
                    this.setState({
                        series: [],
                        options: { ...this.state.options, labels: [] }
                    });
                    alert(data.message);
                } else {
                    const series = Object.values(data);
                    const labels = Object.keys(data);
                    this.setState({ series, options: { ...this.state.options, labels } });
                }
            })
    }

    render() {
        return (
            <div className="flex flex-col items-center space-y-5 h-[700px]">
                <ReactApexChart options={this.state.options} series={this.state.series} type={this.props.chart_type}  width = "500" />
                <div className="flex space-x-2 flex-col sm:flex-row">
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={date => this.setState({ startDate: date })}
                        dateFormat="yyyy/MM"
                        showMonthYearPicker
                        className="p-2 border border-gray-300 rounded-md"
                    />
                    <DatePicker
                        selected={this.state.endDate}
                        onChange={date => this.setState({ endDate: date })}
                        dateFormat="yyyy/MM"
                        showMonthYearPicker
                        className="p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button onClick={this.fetchData} className="px-4 py-2 bg-blue-500 text-white font-bold text-xl  rounded-md hover:bg-blue-900">Filter</button>

            </div>
        );
    }
}

export default SalesPieChart;