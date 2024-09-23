import { useFormStatus } from "react-dom";
import { FiLoader } from "react-icons/fi";

function SubmitButton() {
    const { pending } = useFormStatus();
    console.log("Form status:", pending);
  
    return (
      <button 
        type="submit" 
        aria-disabled={pending} 
        className={`w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 flex items-center justify-center ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {pending ? (
          <>
            <FiLoader className="animate-spin mr-2" />
            Loading...
          </>
        ) : (
          "Create"
        )}
      </button>
    );
}

export default SubmitButton;