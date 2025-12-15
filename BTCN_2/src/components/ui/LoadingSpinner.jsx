const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[50vh] w-full">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-gray-700 opacity-30"></div>
        <div className="w-12 h-12 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent absolute inset-0 animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;