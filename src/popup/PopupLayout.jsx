
import { useSelector } from "react-redux";
import { ConfirmPopup, FailurePopup, SuccessPopup } from "./PopupComponents";

const PopupLayout = () => {
  const { type, message } = useSelector((state) => state.model.selectedModel);
          
  function selectCurrentModalBox() {
  switch (type) {
    case "success":
      return <SuccessPopup message={message} />;
    case "failure":
      return <FailurePopup message={message} />;
     case 'confirm':
      return <ConfirmPopup message={message}/>; 
    default:
      return <div>ram ram</div>;
  }
}
  return (
    <div className="inset-0  fixed flex justify-center items-center w-screen h-screen bg-black/50 z-[999]">
    {selectCurrentModalBox()}
    </div>
  );
};

export default PopupLayout;
