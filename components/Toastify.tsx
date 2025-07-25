"use client";

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

interface ToastProviderProps {
    children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
    return (
        <>
            {children}
            <ToastContainer
                className="relative  min-h-10 rounded-md justify-between overflow-hidden cursor-pointer text-sm  font-med block p-3"
                position="bottom-right"
                autoClose={3000}
            />
        </>
    );
}
