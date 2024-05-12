import React, { useState } from 'react';

const ProcessData = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/autorun', { method: 'GET' });
            const data = await response.json();
            if (data.message === "Data is updated successfully!") {
                window.alert(data.message);
            } else {
                window.alert('No message received from the server');
            }
        } catch (error) {
            console.error('Error:', error);
            window.alert('Error: ' + error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={isLoading}
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        >
            {isLoading ? 'Loading...' : 'Update Data'}
        </button>
    );
};

export default ProcessData;