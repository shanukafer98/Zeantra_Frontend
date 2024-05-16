import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

function Loss_horizontal_bar(props) {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(props.api)
            .then(response => {

                const data = Object.keys(response.data[props.yaxix]).map(key => ({
                    [props.yaxix]: response.data[props.yaxix][key],
                    [props.xaxix]: response.data[props.xaxix][key]
                }));
                const sortedData = [...data].sort((a, b) => b.sales - a.sales);
                setData(sortedData);
            });
    }, []);
    const colors = [
        '#0d001e', '#14183d', '#1b305b', '#22487a', '#2a6199',
        '#3179b8', '#3891d6', '#3fa9f5', '#86c3fa', '#add8ff'
    ];

    const options = data && {
        chart: {
            type: 'bar',
            


            stacked: true,
        },
        plotOptions: {
            bar: {
                barHeight: '80%',
                horizontal: props.horizontal,
                distributed: true,
            }
        },
        grid: {
            show: false, 
        },
        colors: colors,
        series: data && [{
            name: props.xaxis,
            data: data.map(item => item[props.xaxix])
        }],
        xaxis: {
            categories: data && data.map(item => item[props.yaxix]),
            labels: {
                style: {
                    colors: '#708090',
                    fontSize  : '12px'
                }
            },
            title: {
                text: props.xaxix, 
              
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
        title: {
            text: props.title,
            align: 'center',
            floating: true,
            offsetY: -10,
            margin: 30,
            
            style: {
                color: '#636363',
                fontSize: '24px',

            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: '100%'
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],

        tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
            style: {
                colors: '#636363',
                fontSize: '14px',
            },
            x: {
                show: true,
                formatter: function (value, { seriesIndex, dataPointIndex, w }) {
                    return w.globals.seriesNames[seriesIndex]; // Return the product name of the hovered data point
                }
            },
            y: {
                title: {
                    formatter: function (seriesName) {
                        return 'Sales: ' // Add this line to show 'Sales: ' before the y value in the tooltip
                    }
                },
                formatter: function (value, { seriesIndex, dataPointIndex, w }) {
                    return value.toFixed(2); // format the value to 2 decimal places
                }
            }
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        dataLabels: {
            enabled:true,
            textAnchor: 'middle',
            style: {
                colors: ['#fff']
            },
            formatter: function (val) {
                return val.toFixed(2);
            },
            offsetX: 1,
            dropShadow: {
                enabled: true
            }
        },
       legend:{
        show:false
       }


    };

    return (
        <div>
            {data && <Chart options={options} series={options.series} type="bar" height='400'/>}
        </div>
    );
}

export default Loss_horizontal_bar;