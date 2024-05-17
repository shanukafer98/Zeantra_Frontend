import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

function LossPieOrDonutChart(props) {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(props.api)
            .then(response => {
                const data = Object.keys(response.data[props.xaxix]).map(key => ({
                    [props.xaxix]: response.data[props.xaxix][key],
                    [props.yaxix]: Math.abs(parseFloat(response.data[props.yaxix][key])) // take absolute value
                }));
                setData(data);
            });
    }, [props.api]);

    const options = data && {
        chart: {
            type: props.chart_type,
            offsetY: 10,
        },
        labels: data.map(item => item[props.xaxix]),
        series: data.map(item => item[props.yaxix]),
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val.toFixed(2);
            },
        },
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
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: '100%'
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
        colors: ['#0d001e', '#14183d', '#1b305b', '#22487a', '#2a6199'] // Add your colors here
    };

    return (
        <div>
            {data && <Chart options={options} series={options.series} type= {props.chart_type} height='450'/>}
        </div>
    );
}

export default LossPieOrDonutChart;