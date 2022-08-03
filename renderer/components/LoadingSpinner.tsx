const LoadingSpinner = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-10 h-10 border-8 border-t-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
