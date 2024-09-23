import React, { useEffect, useState } from 'react';

const ConfirmSignature = () => {
    const [signature, setSignature] = useState(null); // State to store the signature
    const [error, setError] = useState(""); // State to store any WebSocket errors

    useEffect(() => {
        // Connect to the WebSocket server
        const socket = new WebSocket('ws://localhost:YOUR_PORT');

        // Listen for WebSocket messages
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.signature) {
                console.log('Transaction successful! Signature:', data.signature);
                setSignature(data.signature); // Store the signature in the state
            }
        };

        // Handle connection errors
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
            setError('WebSocket error');
        };

        // Handle connection close
        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        // Cleanup function to close the WebSocket when the component unmounts
        return () => {
            socket.close();
        };
    }, []); // Empty dependency array means the effect runs only once when the component mounts

    return (
        <div>
            <h1>Confirm Signature</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {signature ? (
                <p>Transaction successful! Signature: {signature}</p>
            ) : (
                <p>Waiting for transaction confirmation...</p>
            )}
        </div>
    );
};

export default ConfirmSignature;
