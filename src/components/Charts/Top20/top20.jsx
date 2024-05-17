// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Chart from 'react-apexcharts';

// function Top_20(props) {
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         axios.get(props.api)
//             .then(response => {

//                 const data = Object.keys(response.data[props.yaxix]).map(key => ({
//                     product_name: response.data[props.yaxix][key],
//                     sales: response.data.sales[key]
//                 }));
//                 const sortedData = [...data].sort((a, b) => b.sales - a.sales);
//                 setData(sortedData);
//             });
//     }, []);
//     const colors = [
//         '#0202FF', '#0D0DFF', '#1818FF', '#2323FF', '#2E2EFF', '#3939FF',
//         '#4444FF', '#4F4FFF', '#5A5AFF', '#6565FF', '#7070FF', '#7B7BFF',
//         '#8686FF', '#9191FF', '#9C9CFF', '#A7A7FF', '#B2B2FF', '#BDBDFF',
//         '#C8C8FF', '#D3D3FF'
//     ];

//     const options = data && {
//         chart: {
//             type: 'bar',
//             offsetY: 20,

//             stacked: true,
//         },
//         plotOptions: {
//             bar: {
//                 barHeight: '100%',
//                 horizontal: true,
//                 distributed: true,
//             }
//         },
//         grid: {
//             show: false, // Add this line
//         },
//         colors: colors,
//         series: data && [{
//             name: 'Sales',
//             data: data.map(item => item.sales)
//         }],
//         xaxis: {
//             categories: data && data.map(item => item.product_name),
//             labels: {
//                 style: {
//                     colors: '#708090',
//                     fontSize  : '12px'
//                 }
//             },
//             title: {
//                 text: props.xaxix, 
//                 style: {
//                     color: '#708090',
//                     fontSize: '16px',
//                 }
//             }
//         },

//         yaxis: {
//             labels: {
//                 style: {
//                     colors: '#708090', 
//                     fontSize  : '12px'
//                 },

//             },
//             title: {
//                 text: props.yaxix, 
//                 style: {
//                     color: '#708090',
//                     fontSize: '16px',
//                 }
//             }
//         },
//         title: {
//             text: props.title,
//             align: 'center',
//             floating: true,
//             offsetY: -10,
//             style: {
//                 color: '#636363',
//                 fontSize: '24px',

//             }
//         },
//         tooltip: {
//             style: {
//                 colors: '#636363'
//             }
//         },
//         stroke: {
//             width: 1,
//             colors: ['#fff']
//         },
//         dataLabels: {
//             enabled:true,
//             textAnchor: 'start',
//             style: {
//                 colors: ['#fff']
//             },
//             formatter: function (val) {
//                 return val.toFixed(2);
//             },
//             offsetX: 1,
//             dropShadow: {
//                 enabled: true
//             }
//         },
//        legend:{
//         show:false
//        }


//     };

//     return (
//         <div>
//             {data && <Chart options={options} series={options.series} type="bar" height='400'/>}
//         </div>
//     );
// }

// export default Top_20;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

function Top_20(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(props.api)
            .then(response => {
                const keys = Object.keys(response.data[props.xaxix]);
                const data = keys.map(key => ({
                    xaxix: response.data[props.xaxix][key],
                    sales: response.data.sales[key]
                }));
                const sortedData = [...data].sort((a, b) => b.sales - a.sales);
                setData(sortedData);
                setLoading(false);
            });
    }, [props.api, props.xaxix]);

    const colors = [
        '#0d001e', '#14183d', '#1b305b', '#22487a', '#2a6199',
        '#3179b8', '#3891d6', '#3fa9f5', '#86c3fa', '#add8ff',
    ];
    const chartOptions = {
        chart: {
            type: 'bar',
            
            width: 500,
           
            mode: 'light',
        },
        plotOptions: {
            bar: {
                horizontal: true,
                isFunnel: true,
                barHeight: '100%',
                borderRadius: 10,
                dataLabels: {
                    position: 'center'
                }
            },
        },
        title: {
            text: props.title,
            align: 'center',
            floating: true,
            offsetY: 0,
            style: {
                color: '#636363',
                fontSize: '18px',
            }
        },
        legend: {
            show: true,
            fontSize: '8px',

            fontWeight: 700,
            labels: {
                colors: '#708090',
                useSeriesColors: false
            },
        },
        responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: '80%'
              },
              legend: {
                position: 'bottom'
              },
              plotOptions: {
                bar: {
                  dataLabels: {
                    style: {
                      fontSize: '10px' 
                    }
                  }
                }
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
        dataLabels: {
            enabled: true,
            textAnchor: 'middle',
            style: {
                colors: ['#fff']
            },
            formatter: function (val) {
                return val.toFixed(2);
            },
            offsetX: 0,
        },
        series: data ? data.map((item, index) => ({
            name: item.xaxix,
            data: [{ x: item.xaxix, y: item.sales }],
            color: colors[index % colors.length]
        })) : []
    };

    return (
        <div c>
            <Chart options={chartOptions} series={chartOptions.series} type="bar"  height = "450" />
        </div>
    );
}

export default Top_20;
