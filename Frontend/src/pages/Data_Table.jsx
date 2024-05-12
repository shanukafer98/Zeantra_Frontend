// src/components/DataTable.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [orderId, setOrderId] = useState(''); // Add this line
  const [productId, setProductId] = useState(''); // Add this line

  const [searchResults, setSearchResults] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  

  const [errorMessage, setErrorMessage] = useState(''); // Add this line
  const [isSearched, setIsSearched] = useState(false); // Add this line

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/DataRetrive');
      if (response.data.length === 0) {
        setHasMore(false);
        return;
      }
      setData(prevData => [...prevData, ...response.data]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  }, [page]); // Add this line

  const loadMore = () => {
    fetchData();
  };


  const search = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');
    setIsSearched(true);
    if (!orderId || !productId) {
      setErrorMessage('Both Order ID and Product ID are required');
      setLoading(false);
      setIsSearched(false);
      return;
    }
  
    try {
      const response = await axios.get(`http://127.0.0.1:8000/search?order_id=${orderId}&product_id=${productId}`);
      setData(response.data);
      setSearchResults(response.data.map(item => item._id));
      setHasMore(false);
  
      // Set the current item to the first item in the search results
      if (response.data.length > 0) {
        setCurrentItem(response.data[0]);
      }
  
    } catch (error) {
      setErrorMessage('Invalid Order ID or Product ID');
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  }, [orderId, productId]); 

  const updateData = useCallback(async () => {
    if (!currentItem) return;
    try {
      // Update the data state variable
      const updatedData = data.map(row => row._id === currentItem._id ? currentItem : row);
      setData(updatedData);
  
      const response = await axios.put(`http://127.0.0.1:8000/update/${currentItem._id}`, currentItem);
  
      if (response.data.message === 'Document updated successfully') {
        // Clear the current item
        setCurrentItem(null);
        // Display success alert
        alert('Row updated successfully');
      } else {
        console.error('Error updating row:', response.data.message);
        // Display error alert
        alert('Error updating row: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error updating row:', error);
      // Display error alert
      alert('Error updating row: ' + error);
    }
  }, [currentItem, data]);
  
  const deleteRows = async () => {
    for (const _id of searchResults) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/delete/${_id}`);
  
        if (response.data.message === 'Row deleted successfully') {
          // Remove the deleted row from the data state variable
          setData(data.filter(row => row._id !== _id));
          // Set the success message
          alert('Row deleted successfully');
        } else if (response.data.message === 'Row not found') {
          console.error('Error deleting row: Row not found');
          // Display an alert box
          alert('Error deleting row: Row not found');
        }
      } catch (error) {
        console.log('Error deleting row:', error);
        // Display an alert box
        alert('Error deleting row: ' + error);
      }
    }
  };
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Data Table" />
        <div style={{ height: '400px', overflowY: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
               
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Order ID</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Ship Date</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Ship Mode</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Customer Name</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Segment</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>State</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Country</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Market</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Region</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Product ID</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Category</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Sub Category</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Product Name</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Sales</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Quantity</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Discount</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Profit</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Shipping Cost</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Order Priority</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Day</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Month</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Year</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item._id}>
                  
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.order_id}</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.ship_date}</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.ship_mode}</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.customer_name}</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.segment}</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.state}</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.country}</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.market}</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.region}</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.product_id}</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.category}</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.sub_category}</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.product_name}</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.sales}</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.quantity}</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.discount}</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.profit}</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.shipping_cost}</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.order_priority}</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.day}</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.month}</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.year}</td>

                </tr>
              ))}
            </tbody>
          </table>
          {loading && <p>Loading...</p>}
          {!hasMore && <p>No more data to load</p>}
          {hasMore && (
            <div style={{ textAlign: 'center', margin: '10px' }}>
              <button onClick={loadMore}>Load More</button>
            </div>
          )}
        </div>

        <input className="border p-2 rounded mt-2 mx-2 " type="text"  value={orderId} onChange={e => setOrderId(e.target.value)} placeholder="Order ID" />
        <input className="border p-2 rounded mt-2 mx-3" type="text" value={productId} onChange={e => setProductId(e.target.value)} placeholder="Product ID" />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mx-2" onClick={search}>Search</button>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {isSearched && (
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 mx-2" onClick={deleteRows}>Delete</button>
        )}

{currentItem && (
  <form onSubmit={updateData} className="space-y-4 my-9">
     <div className="grid grid-cols-3 gap-4">
  
  <input className="border-2 border-gray-300 p-2 w-full" type="text" value={currentItem.order_id} onChange={e => setCurrentItem({...currentItem, order_id: e.target.value})} />
  <input className="border-2 border-gray-300 p-2 w-full" type="text" value={currentItem.ship_date} onChange={e => setCurrentItem({...currentItem, ship_date: e.target.value})} />
  <input className="border-2 border-gray-300 p-2 w-full" type="text" value={currentItem.ship_mode} onChange={e => setCurrentItem({...currentItem, ship_mode: e.target.value})} />
  <input className="border-2 border-gray-300 p-2 w-full" type="text" value={currentItem.customer_name} onChange={e => setCurrentItem({...currentItem, customer_name: e.target.value})} />
  <input className="border-2 border-gray-300 p-2 w-full" type="text" value={currentItem.segment} onChange={e => setCurrentItem({...currentItem, segment: e.target.value})} />
  <input className="border-2 border-gray-300 p-2 w-full" type="text" value={currentItem.state} onChange={e => setCurrentItem({...currentItem, state: e.target.value})} />
  <input className="border-2 border-gray-300 p-2 w-full" type="text" value={currentItem.country} onChange={e => setCurrentItem({...currentItem, country: e.target.value})} />
  <input className="border-2 border-gray-300 p-2 w-full" type="text" value={currentItem.market} onChange={e => setCurrentItem({...currentItem, market: e.target.value})} />
  <input className="border-2 border-gray-300 p-2 w-full" type="text" value={currentItem.region} onChange={e => setCurrentItem({...currentItem, region: e.target.value})} />
  <input className="border-2 border-gray-300 p-2 w-full" type="text" value={currentItem.product_id} onChange={e => setCurrentItem({...currentItem, product_id: e.target.value})} />
  <input className="border-2 border-gray-300 p-2 w-full" type="text" value={currentItem.category} onChange={e => setCurrentItem({...currentItem, category: e.target.value})} />
  <input className="border-2 border-gray-300 p-2 w-full" type="text" value={currentItem.sub_category} onChange={e => setCurrentItem({...currentItem, sub_category: e.target.value})} />
  <input className="border-2 border-gray-300 p-2 w-full" type="text" value={currentItem.product_name} onChange={e => setCurrentItem({...currentItem, product_name: e.target.value})} />
  <input className="border-2 border-gray-300 p-2 w-full" type="number" value={currentItem.sales} onChange={e => setCurrentItem({...currentItem, sales: e.target.value})} />
  <input className="border-2 border-gray-300 p-2 w-full" type="number" value={currentItem.quantity} onChange={e => setCurrentItem({...currentItem, quantity: e.target.value})} />
  <input className="border-2 border-gray-300 p-2 w-full" type="number" value={currentItem.discount} onChange={e => setCurrentItem({...currentItem, discount: e.target.value})} />
  <input className="border-2 border-gray-300 p-2 w-full" type="number" value={currentItem.profit} onChange={e => setCurrentItem({...currentItem, profit: e.target.value})} />
  <input className="border-2 border-gray-300 p-2 w-full" type="number" value={currentItem.shipping_cost} onChange={e => setCurrentItem({...currentItem, shipping_cost: e.target.value})} />
  <input className="border-2 border-gray-300 p-2 w-full" type="text" value={currentItem.order_priority} onChange={e => setCurrentItem({...currentItem, order_priority: e.target.value})} />
  <input className="border-2 border-gray-300 p-2 w-full" type="number" value={currentItem.day} onChange={e => setCurrentItem({...currentItem, day: e.target.value})} />
  <input className="border-2 border-gray-300 p-2 w-full" type="number" value={currentItem.month} onChange={e => setCurrentItem({...currentItem, month: e.target.value})} /> 
  <input className="border-2 border-gray-300 p-2 w-full" type="number" value={currentItem.year} onChange={e => setCurrentItem({...currentItem, year: e.target.value})} />
  </div>
  <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">Update</button>
</form>
)}

      </DefaultLayout>

    </>
  );

}

export default DataTable;

