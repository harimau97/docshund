import { toast, ToastContainer } from "react-toastify";

const ToastModal = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="colored"
    />
  );
};

export default ToastModal;
