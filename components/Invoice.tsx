import React, { useState, useEffect } from 'react';
import { createInvoice } from '@/utils/action';
import SubmitButton from './SubmitButton';
import SuccessModal from './SuccessModal';
import ErrorModal from './ErrorModal';
import InvoiceModal from './InvoiceModal';
import { useFormState } from 'react-dom';

const initialState = {
  successMessage: '',
  errorMessage: '',
  tempAcc: null,
  solAmount: null,
};

const Invoice = () => {
  const [state, formAction] = useFormState(createInvoice, initialState);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Check for stored signature when the component mounts

    // Open the modal when tempAcc is set
    if (state?.successMessage && state?.tempAcc) {
      setModalOpen(true);
    }

    // Optionally store the signature in state if needed
    if (state?.signature) {
      localStorage.setItem('transactionSignature', state.signature); // Ensure it's saved in localStorage
    }
  }, [state?.successMessage, state?.tempAcc, state?.signature]);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7fa] px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <form className="space-y-4" action={formAction}>
          <div>
            <label className="block text-sm font-medium text-[#063a4f]">Sol Account Address</label>
            <input
              name="publicKey"
              type="text"
              className="mt-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#14bdc6]"
              placeholder="DRbzgMa*********Dg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#063a4f]">Sol Amount</label>
            <input
              name="solAmount"
              type="number"
              step="any"
              className="mt-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#14bdc6]"
              placeholder="0.001"
            />
          </div>
          <SubmitButton />
          <span>
            {state?.successMessage && <SuccessModal msg={state?.successMessage} />}
            {state?.errorMessage && <ErrorModal msg={state?.errorMessage} />}
          </span>
        </form>

        <InvoiceModal
          isOpen={isModalOpen}
          onClose={closeModal}
          tempAcc={state?.tempAcc}
          solAmount={state.solAmount}
        />
      </div>
    </div>
  );
};

export default Invoice;
