import React, { createContext, useContext, useState, ReactNode } from "react";
import Toast from "../components/Toast";


// Define the toast types
type ToastType = "success" | "error" | "info" | "warning";

// Define the toast object structure
interface ToastMessage {
  message: string;
  type: ToastType;
}

// Define the ToastContext type
interface ToastContextType {
  addToast: (message: string, type: ToastType) => void;
  removeToast: () => void;
}

// Create the ToastContext with a default value of undefined
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Custom hook to use the ToastContext
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// ToastProvider component
interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const addToast = (message: string, type: ToastType) => {
    setToast({ message, type });
  };

  const removeToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 space-y-4">
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={removeToast}
          />
          
        )}
      </div>
    </ToastContext.Provider>
  );
};
