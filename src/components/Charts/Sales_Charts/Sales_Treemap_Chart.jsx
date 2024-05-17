import React from 'react';
import DatePicker from 'react-datepicker';
import ReactApexChart from 'react-apexcharts';
import "react-datepicker/dist/react-datepicker.css";

class SalesTreeMapChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            series: [],
            options: {
                chart: {
                    type: 'treemap'
                },
                plotOptions: {
                    treemap: {
                        distributed: true,
                        enableShades: false
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
                colors: [
                    '#0d001e', '#14183d', '#1b305b', '#22487a', '#2a6199',
                    '#3179b8', '#3891d6', '#3fa9f5', '#86c3fa', '#add8ff',
                    '#c4edff', '#dbefff'
                ],
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
                        series: []
                    });
                    alert(data.message);
                } else {
                    const series = [{
                        name: "Sales",
                        data: Object.entries(data).map(([name, value]) => ({ x: name, y: value }))
                    }];
                    this.setState({ series });
                }
            })
    }

    render() {
        return (
            <div className="flex flex-col items-center space-y-5 h-[700px]">
                <ReactApexChart options={this.state.options} series={this.state.series} type="treemap" height="500" width="550" />
                <div className="flex space-x-2">
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

export default SalesTreeMapChart;