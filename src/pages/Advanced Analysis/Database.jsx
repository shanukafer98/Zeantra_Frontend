import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DataTable() {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        fetchData();
    }, [startDate, endDate]);

    const fetchData = async () => {
        const result = await axios.get(`${process.env.ENDPOINT}/Database/items?start=${startDate.toISOString()}&end=${endDate.toISOString()}`);
        if (result.data) {
            setData(result.data);
        } else {
            console.error('No data returned from API');
        }
    };

    const addItem = async () => {
        const newItem = prompt('Enter new item');
        if (newItem) {
            await axios.post(`${process.env.ENDPOINT}/Database/items`, { item: newItem });
            fetchData();
        }
    };

    const updateItem = async (itemId) => {
        const updatedItem = prompt('Enter updated item');
        if (updatedItem) {
            await axios.put(`${process.env.ENDPOINT}/Database/items/${itemId}`, { item: updatedItem });
            fetchData();
        }
    };

    const deleteItem = async (itemId) => {
        await axios.delete(`${process.env.ENDPOINT}/Database/items/${itemId}`);
        fetchData();
    };

    const columns = Object.keys(data[0]).map(key => ({
        Header: key,
        accessor: key
    }));

    columns.push({
        Header: 'Actions',
        accessor: '_id',
        Cell: ({ value }) => (
            <div>
                <button onClick={() => updateItem(value)}>Update</button>
                <button onClick={() => deleteItem(value)}>Delete</button>
            </div>
        )
    });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <div>
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
            <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
            <button onClick={addItem}>Add Item</button>
            <table {...getTableProps()} style={{ width: '100%', margin: '0 auto' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;