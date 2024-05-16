import React, { useState } from 'react';

const ProcessData = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/autorun', { method: 'GET' });
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
        <>
        </>
    );
};

export default ProcessData;