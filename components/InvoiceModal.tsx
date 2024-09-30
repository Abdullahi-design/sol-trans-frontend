import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { FiCopy } from 'react-icons/fi';
import { usePaymentContext } from './PaymentContext';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
//   tempAcc: string| any;
//   solAmount: number | any;
//   onTransactionSuccess: (signature: string) => void;
//   signature?: string;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ isOpen, onClose }) => {
//   const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const { timeLeft, tempAcc, solAmount } = usePaymentContext(); // Access the context
  const [copied, setCopied] = useState(false); // State to handle copy success
  const [signature, setSignature] = useState('');

    useEffect(() => {
        if (isOpen) {
            const interval = setInterval(() => {
                if (timeLeft === 0) {
                  clearInterval(interval);
                  onClose(); // Close the modal when timer expires
                }
            }, 1000);

            const storedSignature = localStorage.getItem('signature');
            if (storedSignature) {
                // console.log("Signature from localStorage:", storedSignature);
                setSignature(storedSignature)
            }

            // Verify that the localstorage is set
            const savedExpiryTimeUTC = localStorage.getItem('expiryTime');
            if(savedExpiryTimeUTC){
                const nowUTC = new Date().toISOString();
                // console.log({savedExpiryTimeUTC, nowUTC});
            }
            

            return () => clearInterval(interval); // Cleanup on unmount
        }
    }, [isOpen, timeLeft, onClose]);

    // Format time to MM:SS
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    // Function to copy tempAcc to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(tempAcc).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        });
    };
        
    const removeSignature = () => {
        localStorage.removeItem('signature');
        onClose();
    }

    // console.log(signature, 'signature');
  

    // Truncate the tempAcc to show first and last few characters
    const truncateAddress = (address: string) => {
        // console.log(address, 'address', solAmount);
        
        return `${address.slice(0, 6)}...${address.slice(-6)}`;
    };

    return isOpen ? (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
            <h2 className="text-lg font-bold mb-4">Payment Request</h2>
            {!signature ? (
            <div>
                <p className="mb-2">Please send <span className='p-2 bg-yellow-500 rounded-lg bg-opacity-50 '>{solAmount}</span> SOL to the following address:</p>
                <div className="flex justify-between items-center font-mono text-lg mb-2">
                <span className="truncate">{truncateAddress(tempAcc)}</span>
                <button
                    onClick={copyToClipboard}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    title="Copy to clipboard"
                >
                    <FiCopy size={20} />
                </button>
                </div>

                {/* Show copy success message */}
                {copied && <p className="text-sm text-green-500">Address copied to clipboard!</p>}

                {/* QR Code */}
                <div className="flex justify-center mb-4">
                <QRCode
                    value={tempAcc}
                    size={128}
                    viewBox={`0 0 256 256`}
                    style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                />
                </div>

                {/* Countdown Timer */}
                <p className="text-sm text-red-500 mb-2">This request will expire in: {formatTime(timeLeft)}</p>

                <div className='flex justify-around'>
                    <button
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                        onClick={onClose}
                    >
                        Cancel Payment
                    </button>

                    <button
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={onClose}
                    >
                        Close Modal
                    </button>
                </div>
            </div>
            ) : (
            <div className="text-center">
                <h3 className="text-green-500 text-lg font-bold mb-2">Transaction Successful!</h3>
                <p>Transaction Hash:</p>
                <p className="font-mono text-sm break-all">{signature}</p>
                <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={removeSignature}
                >
                close
                </button>
            </div>
            )}
        </div>
        </div>
    ) : null;
};

export default InvoiceModal;
