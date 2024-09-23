import { useEffect, useState } from 'react';

interface msgProps {
    msg: string;
}

const ErrorModal = ({ msg }: msgProps) => {
    const [showModal, setShowModal] = useState(true);
    console.log({'errrormsg': msg});
    

    useEffect(() => {
        const timer = setTimeout(() => {
        setShowModal(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    if (!showModal) return null;

    return (
        <div className={`bg-red-200 text-slate-700 text-sm font-satoshi rounded-md mx-4 md:mx-auto fixed top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center p-3 px-8 py-4 w-fit transition-opacity duration-500`}>
            <span>{msg}</span>
        </div>
    );
};

export default ErrorModal;
