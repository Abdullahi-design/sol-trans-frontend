import React, { useState, useEffect } from 'react';
import { createInvoice } from '@/utils/action';
import SubmitButton from './SubmitButton';
import SuccessModal from './SuccessModal';
import ErrorModal from './ErrorModal';
import InvoiceModal from './InvoiceModal';
import { useFormState } from 'react-dom';
import { usePaymentContext } from './PaymentContext';
import { useWallet } from '@solana/wallet-adapter-react';

const initialState = {
  successMessage: '',
  errorMessage: '',
  tempAcc: null,
  solAmount: null,
};

const Invoice = () => {
  const [state, formAction] = useFormState(createInvoice, initialState);
  const [isModalOpen, setModalOpen] = useState(false);
  const [solAmount, setSolAmountInput] = useState(''); // State to track solAmount input

  const { publicKey } = useWallet();  
  
    // Access setTempAcc and setSolAmount from PaymentContext
    const { setTempAcc, setSolAmount } = usePaymentContext(); 

  useEffect(() => {
    // Check for stored signature when the component mounts

    // Open the modal when tempAcc is set
    if (state?.successMessage && state?.tempAcc) {
      setModalOpen(true);
      // Store tempAcc and solAmount in the context for global access
      setTempAcc(state.tempAcc); 
      setSolAmount(state.solAmount);
    }

    // Optionally store the signature in state if needed
    if (state?.signature) {
      localStorage.setItem('transactionSignature', state.signature); // Ensure it's saved in localStorage
    }
  }, [state?.successMessage, state?.tempAcc, state?.solAmount, state?.signature, setTempAcc, setSolAmount]);

  const closeModal = () => {
    setModalOpen(false);
  };

    // Function to handle solAmount input change
    const handleSolAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSolAmountInput(e.target.value); // Update solAmount state on input change
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7fa] px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className='block text-lg text-center pb-4 font-medium text-[#063a4f]'>Create an Invoice</h2>
        <form className="space-y-4" action={formAction}>
          <div>
            <label className="block text-sm font-medium text-[#063a4f]">Set your Sol Receiving Address</label>
            <input
              name="publicKey"
              type="text"
              value={publicKey?.toBase58()}
              className="mt-1 px-3 py-2 cursor-not-allowed bg-gray-50 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#14bdc6]"
              placeholder="DRbzgMa*********Dg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#063a4f]">Amount to be paid (Sol)</label>
            <input
              name="solAmount"
              type="number"
              step="any"
              value={solAmount}
              onChange={handleSolAmountChange}
              className="mt-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#14bdc6]"
              placeholder="0.001"
            />
          </div>
          {publicKey?.toBase58() && Number(solAmount) > 0 ? (
            <SubmitButton />
          ):(
            <div className={`w-full px-4 py-2 bg-orange-500 opacity-50 cursor-not-allowed text-white rounded hover:bg-orange-600 flex items-center justify-center`}>
              Create
            </div>
          )}
          <span>
            {state?.successMessage && <SuccessModal msg={state?.successMessage} />}
            {state?.errorMessage && <ErrorModal msg={state?.errorMessage} />}
          </span>
        </form>

        <InvoiceModal
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </div>
  );
};

export default Invoice;
