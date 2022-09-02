import AlertBox from "../atoms/AlertBox";

const BottomAlert = ({ message, visibility }: { message: string; visibility: boolean }) => {
  return (
    <div
      className={`fixed right-1/2 translate-x-1/2 bottom-4 duration-500 ${
        visibility ? "visible opacity-100" : "invisible opacity-0"
      }`}
      style={{ width: "calc(100% - 2rem)" }}
    >
      <AlertBox>{message}</AlertBox>
    </div>
  );
};

export default BottomAlert;
