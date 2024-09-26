import { FiLoader } from "react-icons/fi";

const SpinnerLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <FiLoader className="text-[#14bdc6] text-7xl animate-spin" />
    </div>
  );
};

export default SpinnerLoader;
