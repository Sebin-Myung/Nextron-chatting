import CloseButton from "./CloseButton";

interface ModalAreaProps {
  visibility: boolean;
  closeButtonClick: Function;
  children: JSX.Element;
}

const ModalArea = ({ visibility, closeButtonClick, children }: ModalAreaProps) => {
  return (
    <div
      className={`fixed left-[14rem] right-0 h-full bg-black/40 duration-75 ${
        visibility ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 aspect-[4/6] min-h-[16rem] h-3/5 flex flex-col bg-white rounded-xl">
        <CloseButton onClick={() => closeButtonClick()} />
        {children}
      </div>
    </div>
  );
};

export default ModalArea;
