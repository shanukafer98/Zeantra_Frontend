import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

function LossTreeMap(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(props.api)
            .then(response => {
                const data = Object.keys(response.data[props.xaxix]).map(key => ({
                    x: response.data[props.xaxix][key],
                    y: parseFloat(response.data[props.yaxix][key])
                }));
                setData(data);
            });
    }, []);

    const options = {
        chart: {
            type: 'treemap',
           offsetX: 15,
            offsetY: 10,
           
        },
        plotOptions: {
            treemap: {
                distributed: true,
                enableShades: false
            }
        },
        colors: [
            '#0d001e', '#14183d', '#1b305b', '#22487a', '#2a6199',
            '#3179b8', '#3891d6', '#3fa9f5', '#86c3fa', '#add8ff',
            '#c4edff', '#dbefff'
        ],
        title: {
            text: props.title,
            align: 'center',
            floating: true,
            offsetY: -20,
            margin: 30,
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
    };

    const series = [
        {
            data: data
        }
    ];

    return (
        <div>
            <Chart options={options} series={series} type="treemap" height='500' width = "550"/>
        </div>
    );
}

export default LossTreeMap;