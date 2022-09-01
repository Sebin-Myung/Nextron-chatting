import Button from "../atoms/Button";

interface PopupAreaProps {
  visibility: boolean;
  closeButtonClick: Function;
  children: JSX.Element;
}

const PopupArea = ({ visibility, closeButtonClick, children }: PopupAreaProps) => {
  return (
    <div
      className={`fixed left-[14rem] right-0 min-w-[22rem] h-full bg-black/40 duration-75 ${
        visibility ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 aspect-[4/6] min-h-[16rem] h-3/5 flex flex-col bg-white rounded-xl">
        <div className="absolute top-[-2.5rem] right-[-2.5rem] m-2">
          <Button btnType="close" onClick={closeButtonClick} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default PopupArea;
