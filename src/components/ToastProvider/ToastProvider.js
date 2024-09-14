import React from "react";
import useEscapeKey from "../../hooks/useEscapeKey";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);
  const escapeKey = useEscapeKey;

  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });

    setToasts(nextToasts);
  }

  function dismissAllToasts() {
    setToasts([]);
  }

  escapeKey(dismissAllToasts);

  function createToast(message, notification) {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        variant: notification,
        message,
      },
    ];
    setToasts(nextToasts);
  }

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
