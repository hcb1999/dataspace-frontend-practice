import { HashLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center w-full h-screen bg-white z-[100]">
      <HashLoader color="#8AAAE5" />
    </div>
  );
};

export default Spinner;


