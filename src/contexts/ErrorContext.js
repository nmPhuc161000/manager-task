import React, { createContext, useContext, useState, useCallback } from "react";
import { toast } from "react-toastify";

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [errors, setErrors] = useState(new Set());
    const [hasShown, setHasShown] = useState(false); // Trạng thái để kiểm tra xem đã hiển thị thông báo chưa

    const addError = useCallback((errorMessage) => {
        setErrors((prevErrors) => {
            const newErrors = new Set(prevErrors);
            newErrors.add(errorMessage);
            return newErrors;
        });
    }, []);

    const showErrors = useCallback(() => {
        if (errors.size > 0 && !hasShown) {
            const errorMessage = Array.from(errors).join(", ");
            toast.error(errorMessage);
            setHasShown(true); // Đánh dấu là đã hiển thị
            setErrors(new Set()); // Reset errors sau khi hiển thị
        }
    }, [errors, hasShown]);

    const resetErrors = useCallback(() => {
        setErrors(new Set());
        setHasShown(false); // Reset trạng thái để có thể hiển thị thông báo mới
    }, []);

    return (
        <ErrorContext.Provider value={{ addError, showErrors, resetErrors }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useError = () => useContext(ErrorContext);