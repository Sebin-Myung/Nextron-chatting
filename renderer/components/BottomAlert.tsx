const BottomAlert = ({ message, visibility }: { message: string; visibility: boolean }) => {
  return (
    <div
      className={`fixed inset-x-0 bottom-0 m-5 alert justify-center bg-rose-100 shadow-lg duration-500 ${
        visibility ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default BottomAlert;
