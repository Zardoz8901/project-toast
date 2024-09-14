import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });

    setToasts(nextToasts);
  }

  function dismissAllToasts() {
    setToasts([]);
  }

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === "Escape") {
        dismissAllToasts();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
    <ToastContext.Provider
      value={{ toasts, createToast, dismissToast, dismissAllToasts }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
