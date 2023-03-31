import { useState } from "react";

const Notify = () => {
  const [notify, setNotify] = useState({
    isOpen: false,
    hide: true,
    message: "",
    type: "",
  });
  const NotifyMessage = ({ isOpen = true, hide = true, message, type }) => {
    setNotify({
      isOpen,
      message,
      type,
      hide,
    });
  };
  return { NotifyMessage, notify, setNotify };
};

export default Notify;
