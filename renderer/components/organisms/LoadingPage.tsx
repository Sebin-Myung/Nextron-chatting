import Spinner from "../atoms/Spinner";

const LoadingPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default LoadingPage;
